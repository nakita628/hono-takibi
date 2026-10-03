import { Console, Effect, FileSystem, Option, Path, Ref, Schema, Stream } from 'effect'
import { Argument, CliError, Command, Flag } from 'effect/cli'

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
    const messages = yield* Effect.forEach(jobs, (job) => job.run(job.output), {
      concurrency: 'unbounded',
    }).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
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
 * What a watch session has to keep an eye on for the documents.
 *
 * `outside` names the files the document reads from that do not sit under
 * `inputDirectory` — a `$ref` or an `import` can point anywhere on disk.
 */
type WatchTarget = {
  readonly inputDirectory: string
  readonly outside: readonly string[]
}

function isSameTarget(left: WatchTarget | undefined, right: WatchTarget | undefined) {
  return (
    left?.inputDirectory === right?.inputDirectory &&
    left?.outside.join('\n') === right?.outside.join('\n')
  )
}

/**
 * Generates from a config that was read, and answers what to watch for its documents.
 *
 * The directory comes from the config alone, so a pass that fails here — a document
 * that does not parse, say — still names it. Otherwise the very edit that fixes the
 * document would never be seen.
 *
 * The files outside the directory come from the document, and a broken document cannot
 * list them. `previous` is what stands in then: the fix may well belong in one of the
 * files the last readable version pointed at.
 */
function reportJobs(
  config: Effect.Success<ReturnType<typeof loadConfig>>,
  previous: WatchTarget | undefined,
) {
  return Effect.gen(function* () {
    const path = yield* Path.Path
    yield* runJobs(config).pipe(
      Effect.matchEffect({
        onFailure: (error) => Console.error(`❌ ${error.message}`),
        onSuccess: (report) => Console.log(report),
      }),
    )
    const { outsideSources } = yield* Effect.promise(() => import('../shared/index.js'))
    const inputDirectory = path.dirname(path.resolve(config.input))
    const outside = yield* outsideSources(config.input).pipe(
      Effect.orElseSucceed(() =>
        previous?.inputDirectory === inputDirectory ? previous.outside : [],
      ),
    )
    const target: WatchTarget = { inputDirectory, outside }
    return target
  })
}

/**
 * Runs one pass and answers what to watch for the documents.
 *
 * Two separate things happen to the document here. `runJobs` generates from it, reading
 * it the way every other mode does. `outsideSources` then only asks which files it was
 * read from, so that an edit to any of them brings the session back to this function;
 * what it answers never reaches a generator.
 *
 * The answer is `undefined` only when the config itself could not be read.
 */
function reportConfigPass(configPath: string, reload: boolean, previous: WatchTarget | undefined) {
  return loadConfig(configPath, reload).pipe(
    Effect.matchEffect({
      onFailure: (error) => Console.error(`❌ ${error.message}`).pipe(Effect.as(undefined)),
      onSuccess: (config) => reportJobs(config, previous),
    }),
  )
}

/**
 * `directory`, or the closest directory above it that exists.
 *
 * A directory that is not there cannot be watched, but the one it will appear in can.
 */
function nearestExisting(
  directory: string,
): Effect.Effect<string, never, FileSystem.FileSystem | Path.Path> {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
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
  target: WatchTarget | undefined,
  watched: string | undefined,
  nextTarget: Ref.Ref<WatchTarget | undefined>,
) {
  return Effect.gen(function* () {
    const next = (yield* reportConfigPass(configPath, true, target)) ?? target
    yield* Ref.set(nextTarget, next)
    if (!isSameTarget(next, target)) return false
    return next === undefined || (yield* nearestExisting(next.inputDirectory)) === watched
  })
}

/**
 * The edits to the files a document reads from outside its own directory.
 *
 * Each one is watched through the directory it sits in, which is how an editor's
 * write-then-rename save is still seen. A directory that is not there is skipped rather
 * than failed on: the pass that follows reports the missing file in its own words.
 */
function outsideEvents(outside: readonly string[]) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const directories = [...new Set(outside.map((file) => path.dirname(file)))]
    const present = yield* Effect.forEach(
      directories,
      (directory) => fs.exists(directory).pipe(Effect.orElseSucceed(() => false)),
      { concurrency: 'unbounded' },
    )
    return directories
      .filter((_, index) => present[index])
      .map((directory) =>
        fs
          .watch(directory)
          .pipe(Stream.filter((event) => outside.includes(path.join(directory, event.path)))),
      )
  })
}

/**
 * Watches until what has to be watched changes, and answers the next target.
 *
 * `watched` is where the watcher for the input directory actually sits. It is that
 * directory while it exists; once it is removed — or before it is created — it is the
 * closest directory above, and the only event that matters there is the missing path
 * coming into being. A watcher left on a removed directory reports nothing, even after
 * the directory is back, so the round ends whenever `watched` stops being the right place.
 */
function watchRound(
  configPath: string,
  target: WatchTarget | undefined,
  watched: string | undefined,
) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const path = yield* Path.Path
    const configFile = path.basename(configPath)
    const nextTarget = yield* Ref.make(target)
    const configEvents = fs
      .watch(path.dirname(configPath))
      .pipe(Stream.filter((event) => event.path === configFile))
    const inputEvents =
      target === undefined || watched === undefined
        ? []
        : [
            watched === target.inputDirectory
              ? fs
                  .watch(target.inputDirectory, { recursive: true })
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
                        event.path ===
                        path.relative(watched, target.inputDirectory).split(path.sep)[0],
                    ),
                  ),
          ]
    yield* Stream.mergeAll(
      [configEvents, ...inputEvents, ...(yield* outsideEvents(target?.outside ?? []))],
      { concurrency: 'unbounded' },
    ).pipe(
      Stream.debounce('200 millis'),
      Stream.runForEachWhile(() => watchPass(configPath, target, watched, nextTarget)),
    )
    return yield* Ref.get(nextTarget)
  })
}

/**
 * Announces what a round watches, runs it, and leaves the next target in `current`.
 */
function watchCycle(configPath: string, current: Ref.Ref<WatchTarget | undefined>) {
  return Effect.gen(function* () {
    const target = yield* Ref.get(current)
    const watched = target === undefined ? undefined : yield* nearestExisting(target.inputDirectory)
    const documents = [target?.inputDirectory, ...(target?.outside ?? [])]
      .filter((entry) => entry !== undefined)
      .join(', ')
    yield* Console.log(
      target === undefined
        ? `\n👀 Watching ${configPath} — Ctrl-C to stop`
        : watched === target.inputDirectory
          ? `\n👀 Watching ${documents} and ${configPath} — Ctrl-C to stop`
          : `\n👀 Watching ${configPath}, waiting for ${target.inputDirectory} — Ctrl-C to stop`,
    )
    yield* Ref.set(current, yield* watchRound(configPath, target, watched))
  })
}

function watchConfig(configPath: string, target: WatchTarget | undefined) {
  return Effect.gen(function* () {
    const current = yield* Ref.make(target)
    return yield* Effect.forever(watchCycle(configPath, current))
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
      return yield* watchConfig(
        resolvedConfig,
        yield* reportConfigPass(resolvedConfig, false, undefined),
      )
    }
    const first = yield* runConfigPass(resolvedConfig, false).pipe(
      Effect.catchTag('ConfigError', (error) =>
        Effect.fail(
          configPath === undefined && error.notFound === true
            ? new CliError.ShowHelp({
                commandPath: [COMMAND_NAME],
                errors: [new CliError.UserError({ cause: error, userMessage: error.message })],
              })
            : error,
        ),
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

export function honoTakibi() {
  return Command.run(makeCli(), { version: manifest.version })
}
