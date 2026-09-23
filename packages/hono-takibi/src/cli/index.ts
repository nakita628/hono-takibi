import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { PlatformError } from 'effect'
import { Console, Effect, FileSystem, Option, Ref, Result, Runtime, Schema, Stream } from 'effect'
import { Argument, CliError, CliOutput, Command, Flag } from 'effect/unstable/cli'

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

function runConfigPass(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const [{ readConfig }, { parseOpenAPI }, { FormatOptions }, { cleanSplitOutputs, makeJob }] =
      yield* Effect.promise(() =>
        Promise.all([
          import('../config/index.js'),
          import('../openapi/index.js'),
          import('../format/index.js'),
          import('../shared/index.js'),
        ]),
      )
    const config = yield* readConfig(configPath, reload)
    const jobs = makeJob(yield* parseOpenAPI(config.input), config)
    yield* cleanSplitOutputs(jobs.filter((job) => job.split).map((job) => job.output))
    const messages = yield* Effect.all(
      jobs.map((job) => job.run(job.output)),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    return { config, report: messages.filter((message) => message !== '').join('\n') }
  })
}

function reportConfigPass(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const result = yield* Effect.result(runConfigPass(configPath, reload))
    if (Result.isFailure(result)) {
      yield* Console.error(`❌ ${result.failure.message}`)
      return undefined
    }
    yield* Console.log(result.success.report)
    return path.dirname(path.resolve(process.cwd(), result.success.config.input))
  })
}

function watchRound(configPath: string, inputDirectory: string | undefined) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const configFile = path.basename(configPath)
    const nextDirectory = yield* Ref.make<string | undefined>(inputDirectory)
    const configEvents = fs
      .watch(path.dirname(configPath))
      .pipe(Stream.filter((event) => event.path === configFile))
    const events =
      inputDirectory === undefined
        ? configEvents
        : Stream.merge(
            fs
              .watch(inputDirectory, { recursive: true })
              .pipe(
                Stream.filter((event) =>
                  INPUT_EXTENSIONS.some((extension) => event.path.endsWith(extension)),
                ),
              ),
            configEvents,
          )
    yield* events.pipe(
      Stream.debounce('200 millis'),
      Stream.runForEachWhile(() =>
        reportConfigPass(configPath, true).pipe(
          Effect.tap((directory) => Ref.set(nextDirectory, directory ?? inputDirectory)),
          Effect.map((directory) => directory === undefined || directory === inputDirectory),
        ),
      ),
    )
    return yield* Ref.get(nextDirectory)
  })
}

function watchConfig(
  configPath: string,
  inputDirectory: string | undefined,
): Effect.Effect<void, PlatformError.PlatformError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    yield* Console.log(
      inputDirectory === undefined
        ? `\n👀 Watching ${configPath} — Ctrl-C to stop`
        : `\n👀 Watching ${inputDirectory} and ${configPath} — Ctrl-C to stop`,
    )
    return yield* watchConfig(configPath, yield* watchRound(configPath, inputDirectory))
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

function makeCli(description: string) {
  return Command.make(COMMAND_NAME, commandLine, generate).pipe(
    Command.withDescription(description),
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

function reportBrokenInstall(cause: { readonly message: string }) {
  return Effect.gen(function* () {
    const error = new CliError.UserError({
      cause,
      userMessage: `Cannot read the version and description from package.json: ${cause.message}`,
    })
    error[Runtime.errorReported] = false
    const formatter = yield* CliOutput.Formatter
    yield* Console.error(formatter.formatError(error))
    return yield* error
  })
}

export function honoTakibi(argv: readonly string[], entryUrl: string) {
  return Effect.gen(function* () {
    const manifestPath = fileURLToPath(new URL('../package.json', entryUrl))
    const fs = yield* FileSystem.FileSystem
    const source = yield* fs.readFileString(manifestPath)
    const manifest = yield* Effect.try({
      try: (): unknown => JSON.parse(source),
      catch: (cause) => new Error(`${manifestPath} is not valid JSON`, { cause }),
    })
    const { version, description } = yield* Schema.decodeUnknownEffect(
      Schema.Struct({
        version: Schema.String.annotate({
          description: 'What `--version` prints.',
          examples: ['1.2.3'],
        }),
        description: Schema.String.annotate({
          description: 'The sentence `--help` prints under DESCRIPTION.',
          examples: ['Hono Takibi is a code generator from OpenAPI to @hono/zod-openapi'],
        }),
      }).annotate({
        title: 'Package manifest',
        description: 'The fields `hono-takibi` reads from the package.json beside its entry.',
      }),
    )(manifest)
    return yield* Command.runWith(makeCli(description), { version })(argv)
  }).pipe(Effect.catchIf((error) => !CliError.isCliError(error), reportBrokenInstall))
}
