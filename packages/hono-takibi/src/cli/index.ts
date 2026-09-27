import path from 'node:path'

import type { PlatformError } from 'effect'
import { Console, Effect, FileSystem, Option, Ref, Result, Schema, Stream } from 'effect'
import { Argument, CliError, Command, Flag } from 'effect/unstable/cli'

import manifest from '../../package.json' with { type: 'json' }

const COMMAND_NAME = 'hono-takibi'

const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

const DocumentPathSchema = Schema.String.pipe(
  Schema.refine(
    Schema.is(Schema.TemplateLiteral([Schema.String, Schema.Literals(['.yaml', '.json', '.tsp'])])),
    { message: 'an OpenAPI (.yaml, .json) or TypeSpec (.tsp) document' },
  ),
).annotate({
  title: 'Input document',
  description: 'OpenAPI or TypeSpec document the one-shot mode generates from.',
  examples: ['openapi.yaml', './spec/openapi.json', './spec/main.tsp'],
})

const TypeScriptPathSchema = Schema.String.pipe(
  Schema.refine(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])), {
    message: 'a TypeScript file path ending in .ts',
  }),
).annotate({
  title: 'Routes output file',
  description: 'TypeScript file the one-shot mode writes the generated routes to.',
  examples: ['./src/routes.ts', 'src/api/routes.ts'],
})

const commandLine = {
  input: Argument.File('input', { mustExist: true }).pipe(
    Argument.withSchema(DocumentPathSchema),
    Argument.withDescription('OpenAPI (.yaml, .json) or TypeSpec (.tsp) document to generate from'),
    Argument.withMetavar('input.{yaml,json,tsp}'),
    Argument.optional,
  ),
  output: Flag.String('output').pipe(
    Flag.withAlias('o'),
    Flag.withSchema(TypeScriptPathSchema),
    Flag.withDescription('TypeScript file the generated routes are written to'),
    Flag.withMetavar('output.ts'),
    Flag.optional,
  ),
  config: Flag.File('config', { mustExist: true }).pipe(
    Flag.withAlias('c'),
    Flag.withDescription(`Config file to run (default: ./${DEFAULT_CONFIG_FILE})`),
    Flag.withMetavar('file'),
    Flag.optional,
  ),
  watch: Flag.Boolean('watch').pipe(
    Flag.withAlias('w'),
    Flag.withDescription('Rerun the config on every change to its documents or itself'),
    Flag.withDefault(false),
  ),
} as const

const INPUT_EXTENSIONS = ['.yaml', '.json', '.tsp'] as const

function loadConfig(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const { readConfig } = yield* Effect.promise(() => import('../config/index.js'))
    return yield* readConfig(configPath, reload)
  })
}

function runJobs(config: Effect.Success<ReturnType<typeof loadConfig>>) {
  return Effect.gen(function* () {
    const [{ parseOpenAPI }, { FormatOptions }, { cleanSplitOutputs, makeJob }] =
      yield* Effect.promise(() =>
        Promise.all([
          import('../openapi/index.js'),
          import('../format/index.js'),
          import('../shared/index.js'),
        ]),
      )
    const jobs = makeJob(yield* parseOpenAPI(config.input), config)
    yield* cleanSplitOutputs(jobs.filter((job) => job.split).map((job) => job.output))
    const messages = yield* Effect.all(
      jobs.map((job) => job.run(job.output)),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    return messages.filter((message) => message !== '').join('\n')
  })
}

function runConfigPass(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const config = yield* loadConfig(configPath, reload)
    return { config, report: yield* runJobs(config) }
  })
}

/**
 * Runs one pass and answers the directory the config keeps its documents in.
 *
 * The directory comes from the config alone, so a pass that fails after the config was
 * read — a document that does not parse, say — still names it. Otherwise the very edit
 * that fixes the document would never be seen. It is `undefined` only when the config
 * itself could not be read.
 */
function reportConfigPass(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const config = yield* Effect.result(loadConfig(configPath, reload))
    if (Result.isFailure(config)) {
      yield* Console.error(`❌ ${config.failure.message}`)
      return undefined
    }
    const report = yield* Effect.result(runJobs(config.success))
    if (Result.isSuccess(report)) {
      yield* Console.log(report.success)
    } else {
      yield* Console.error(`❌ ${report.failure.message}`)
    }
    return path.dirname(path.resolve(process.cwd(), config.success.input))
  })
}

/**
 * `directory`, or the closest directory above it that exists.
 *
 * A directory that is not there cannot be watched, but the one it will appear in can.
 */
function nearestExisting(directory: string): Effect.Effect<string, never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const exists = yield* fs.exists(directory).pipe(Effect.orElseSucceed(() => false))
    const parent = path.dirname(directory)
    return exists || parent === directory ? directory : yield* nearestExisting(parent)
  })
}

/**
 * One pass inside a round; answers whether the round's watchers are still the right ones.
 */
function watchPass(
  configPath: string,
  inputDirectory: string | undefined,
  watched: string | undefined,
  nextDirectory: Ref.Ref<string | undefined>,
) {
  return Effect.gen(function* () {
    const directory = (yield* reportConfigPass(configPath, true)) ?? inputDirectory
    yield* Ref.set(nextDirectory, directory)
    if (directory !== inputDirectory) return false
    return directory === undefined || (yield* nearestExisting(directory)) === watched
  })
}

/**
 * Watches until what has to be watched changes, and answers the next input directory.
 *
 * `watched` is where the watcher actually sits. It is `inputDirectory` while that
 * exists; once it is removed — or before it is created — it is the closest directory
 * above, and the only event that matters there is the missing path coming into being.
 * A watcher left on a removed directory reports nothing, even after the directory is
 * back, so the round ends whenever `watched` stops being the right place.
 */
function watchRound(
  configPath: string,
  inputDirectory: string | undefined,
  watched: string | undefined,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const configFile = path.basename(configPath)
    const nextDirectory = yield* Ref.make<string | undefined>(inputDirectory)
    const configEvents = fs
      .watch(path.dirname(configPath))
      .pipe(Stream.filter((event) => event.path === configFile))
    const events =
      inputDirectory === undefined || watched === undefined
        ? configEvents
        : Stream.merge(
            watched === inputDirectory
              ? fs
                  .watch(inputDirectory, { recursive: true })
                  .pipe(
                    Stream.filter((event) =>
                      INPUT_EXTENSIONS.some((extension) => event.path.endsWith(extension)),
                    ),
                  )
              : fs
                  .watch(watched)
                  .pipe(
                    Stream.filter(
                      (event) =>
                        event.path === path.relative(watched, inputDirectory).split(path.sep)[0],
                    ),
                  ),
            configEvents,
          )
    yield* events.pipe(
      Stream.debounce('200 millis'),
      Stream.runForEachWhile(() => watchPass(configPath, inputDirectory, watched, nextDirectory)),
    )
    return yield* Ref.get(nextDirectory)
  })
}

function watchConfig(
  configPath: string,
  inputDirectory: string | undefined,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const watched =
      inputDirectory === undefined ? undefined : yield* nearestExisting(inputDirectory)
    yield* Console.log(
      inputDirectory === undefined
        ? `\n👀 Watching ${configPath} — Ctrl-C to stop`
        : watched === inputDirectory
          ? `\n👀 Watching ${inputDirectory} and ${configPath} — Ctrl-C to stop`
          : `\n👀 Watching ${configPath}, waiting for ${inputDirectory} — Ctrl-C to stop`,
    )
    return yield* watchConfig(configPath, yield* watchRound(configPath, inputDirectory, watched))
  })
}

function generate(args: Command.Command.Config.Infer<typeof commandLine>) {
  return Effect.gen(function* () {
    const input = Option.getOrUndefined(args.input)
    const output = Option.getOrUndefined(args.output)
    const configPath = Option.getOrUndefined(args.config)
    const conflicts: readonly (readonly [rejected: boolean, message: string])[] = [
      [
        configPath !== undefined && (input !== undefined || output !== undefined),
        '--config cannot be combined with <input> or --output. A config file already names its own input and outputs.',
      ],
      [input !== undefined && output === undefined, '<input> requires -o <output.ts>.'],
      [output !== undefined && input === undefined, '-o <output.ts> requires an <input> document.'],
      [
        args.watch && (input !== undefined || output !== undefined),
        '--watch runs a config file, so it cannot be combined with <input> or --output.',
      ],
    ]
    const conflict = conflicts.find(([rejected]) => rejected)?.[1]
    if (conflict !== undefined) {
      return yield* new CliError.ShowHelp({
        commandPath: [COMMAND_NAME],
        errors: [new CliError.UserError({ cause: new Error(conflict), userMessage: conflict })],
      })
    }
    if (input !== undefined && output !== undefined) {
      const [{ parseOpenAPI }, { takibi }] = yield* Effect.promise(() =>
        Promise.all([import('../openapi/index.js'), import('../core/index.js')]),
      )
      return yield* Console.log(yield* takibi(yield* parseOpenAPI(input), output))
    }
    const resolvedConfig = configPath ?? DEFAULT_CONFIG_FILE
    if (args.watch) {
      return yield* watchConfig(resolvedConfig, yield* reportConfigPass(resolvedConfig, false))
    }
    const first = yield* runConfigPass(resolvedConfig, false).pipe(
      Effect.mapError((error) =>
        configPath === undefined && error._tag === 'ConfigError' && error.notFound === true
          ? new CliError.ShowHelp({
              commandPath: [COMMAND_NAME],
              errors: [new CliError.UserError({ cause: error, userMessage: error.message })],
            })
          : error,
      ),
    )
    yield* Console.log(first.report)
    return undefined
  }).pipe(
    Effect.mapError((error) =>
      CliError.isCliError(error)
        ? error
        : new CliError.UserError({ cause: error, userMessage: error.message }),
    ),
  )
}

function makeCli() {
  return Command.make(COMMAND_NAME, commandLine, generate).pipe(
    Command.withDescription(manifest.description),
    Command.withExamples([
      {
        command: 'hono-takibi openapi.yaml -o src/routes.ts',
        description: 'Generate a single routes file',
      },
      {
        command: 'hono-takibi',
        description: `Run every generator declared in ./${DEFAULT_CONFIG_FILE}`,
      },
      {
        command: 'hono-takibi --config config/api.config.ts',
        description: 'Run a config file from another location',
      },
      {
        command: 'hono-takibi --watch',
        description: 'Rerun on every change to the input documents or the config',
      },
    ]),
  )
}

export function honoTakibi(argv: readonly string[]) {
  return Command.runWith(makeCli(), { version: manifest.version })(argv)
}
