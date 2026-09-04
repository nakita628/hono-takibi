import path from 'node:path'
import { fileURLToPath } from 'node:url'

import type { PlatformError } from 'effect'
import { Console, Effect, FileSystem, Option, Ref, Result, Runtime, Schema, Stream } from 'effect'
import { Argument, CliError, CliOutput, Command, Flag } from 'effect/unstable/cli'

const COMMAND_NAME = 'hono-takibi'

/** Config file `hono-takibi` picks up from the working directory when `--config` is omitted. */
const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

// `Schema.refine` both rejects the value at runtime and narrows the parsed type, so a
// wrong extension never reaches the generators and the ones it does reach arrive as
// `${string}.ts` without a cast. The template literal alone would do the same check but
// reports "Expected a string matching template literal parts"; wrapping it in
// `Schema.is` and refining with it is what buys the sentence below.
const DocumentPathSchema = Schema.String.pipe(
  Schema.refine(
    Schema.is(Schema.TemplateLiteral([Schema.String, Schema.Literals(['.yaml', '.json', '.tsp'])])),
    { message: 'an OpenAPI (.yaml, .json) or TypeSpec (.tsp) document' },
  ),
)

const TypeScriptPathSchema = Schema.String.pipe(
  Schema.refine(Schema.is(Schema.TemplateLiteral([Schema.String, '.ts'])), {
    message: 'a TypeScript file path ending in .ts',
  }),
)

/**
 * One-shot mode generates routes only; every component export stays off. The
 * config file is what turns those on, one field at a time.
 */
const ONE_SHOT_COMPONENTS = {
  readonly: false,
  exportSchemas: false,
  exportSchemasTypes: false,
  exportResponses: false,
  exportParameters: false,
  exportParametersTypes: false,
  exportExamples: false,
  exportRequestBodies: false,
  exportHeaders: false,
  exportHeadersTypes: false,
  exportSecuritySchemes: false,
  exportLinks: false,
  exportCallbacks: false,
  exportPathItems: false,
  exportMediaTypes: false,
  exportMediaTypesTypes: false,
} as const

/**
 * The command line itself: what `hono-takibi` accepts, what each piece means, and the
 * schema every value is decoded through before {@link generate} ever sees it.
 */
const commandLine = {
  input: Argument.file('input', { mustExist: true }).pipe(
    Argument.withSchema(DocumentPathSchema),
    Argument.withDescription('OpenAPI (.yaml, .json) or TypeSpec (.tsp) document to generate from'),
    Argument.withMetavar('input.{yaml,json,tsp}'),
    Argument.optional,
  ),
  // `Flag.string`, not `Flag.file`: the file primitive rewrites its value to an
  // absolute path, and `--output` is echoed back in the "Generated code written to"
  // message, which should read as the path the caller typed.
  output: Flag.string('output').pipe(
    Flag.withAlias('o'),
    Flag.withSchema(TypeScriptPathSchema),
    Flag.withDescription('TypeScript file the generated routes are written to'),
    Flag.withMetavar('output.ts'),
    Flag.optional,
  ),
  config: Flag.file('config', { mustExist: true }).pipe(
    Flag.withAlias('c'),
    Flag.withDescription(`Config file to run (default: ./${DEFAULT_CONFIG_FILE})`),
    Flag.withMetavar('file'),
    Flag.optional,
  ),
  // `Flag.boolean` is still a required flag until it is given a default — without this,
  // every invocation is rejected for not passing `--watch`.
  watch: Flag.boolean('watch').pipe(
    Flag.withAlias('w'),
    Flag.withDescription('Rerun the config on every change to its documents or itself'),
    Flag.withDefault(false),
  ),
}

/** Extensions a change has to carry to be worth regenerating for. */
const INPUT_EXTENSIONS = ['.yaml', '.json', '.tsp'] as const

function isInputDocument(changed: string) {
  return INPUT_EXTENSIONS.some((extension) => changed.endsWith(extension))
}

/**
 * One pass over a config file: read it, parse the document it names, and run every
 * generator it opts into.
 *
 * `reload` is for the passes after the first, where the config file may have been edited
 * since it was imported.
 *
 * The generator pipeline pulls in the OpenAPI parser, the TypeSpec compiler and ts-morph.
 * `--help`, `--version`, `--completions` and every rejected command line must not pay for
 * that, so it is loaded here rather than at module scope. After the first pass the loader
 * answers from cache, so a watch tick pays nothing.
 */
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
    // Every split directory is emptied first, so an entry the document no longer names
    // does not survive as an orphaned file that still imports what it defined.
    yield* cleanSplitOutputs(jobs.filter((job) => job.split).map((job) => job.output))
    const messages = yield* Effect.all(
      jobs.map((job) => job.run(job.output)),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    return { config, report: messages.filter((message) => message !== '').join('\n') }
  })
}

/** Where the documents named by a config live, which is the directory worth watching. */
function inputDirectoryOf(config: { readonly input: string }) {
  return path.dirname(path.resolve(process.cwd(), config.input))
}

/**
 * A pass whose failure is printed rather than raised, so the watch loop survives it, and
 * which answers with the input directory the config now names.
 *
 * `undefined` means the pass did not get far enough to say — the config is missing, will
 * not import, or does not validate. The loop keeps watching the config either way.
 */
function reportConfigPass(configPath: string, reload: boolean) {
  return Effect.gen(function* () {
    const result = yield* Effect.result(runConfigPass(configPath, reload))
    if (Result.isFailure(result)) {
      yield* Console.error(`❌ ${result.failure.message}`)
      return undefined
    }
    yield* Console.log(result.success.report)
    return inputDirectoryOf(result.success.config)
  })
}

/**
 * Regenerates on every change to the input documents or the config, until interrupted.
 *
 * Two watchers, because two things can invalidate the output. The input document's
 * directory is watched recursively — a TypeSpec entry imports its siblings and a `$ref`
 * can point at one, so the file named by `input` is rarely the only one that matters. The
 * config file is watched through its directory rather than directly, so an editor that
 * saves by renaming does not take the watcher down with it.
 *
 * `WatchEvent.path` is relative to the directory it came from, which is why each stream
 * is filtered before the merge rather than after.
 *
 * `debounce` collapses the burst an editor emits on save into one pass — a plain write
 * already reports twice. Generated files are `.ts` and `.md`, so a pass cannot trigger
 * the next one.
 */
/**
 * Watches the config, and the input documents when a pass has said where they are, until
 * the answer changes — then hands the new directory back so {@link watchConfig} restarts.
 *
 * `runForEachWhile` is what ends the round: a pass that reports a different directory
 * returns `false`, and the directory it reported is in the `Ref` for the caller. The
 * `Ref` is what carries a value out of a stream that otherwise only returns `void`.
 */
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
              .pipe(Stream.filter((event) => isInputDocument(event.path))),
            configEvents,
          )
    yield* events.pipe(
      Stream.debounce('200 millis'),
      // A pass that failed says nothing about where the documents are, so the round
      // carries on watching what it was watching. Only a pass that succeeded and named a
      // different directory ends the round.
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

/**
 * Regenerates on every change to the input documents or the config, until interrupted.
 *
 * Two watchers, because two things can invalidate the output. The input document's
 * directory is watched recursively — a TypeSpec entry imports its siblings and a `$ref`
 * can point at one, so the file named by `input` is rarely the only one that matters. The
 * config file is watched through its directory rather than directly, so an editor that
 * saves by renaming does not take the watcher down with it.
 *
 * `WatchEvent.path` is relative to the directory it came from, which is why each stream
 * is filtered before the merge rather than after.
 *
 * `debounce` collapses the burst an editor emits on save into one pass — a plain write
 * already reports twice. Generated files are `.ts` and `.md`, so a pass cannot trigger
 * the next one.
 *
 * `inputDirectory` is `undefined` until a pass has read a config far enough to name one;
 * only the config is watched until then, which is what keeps a config that does not
 * validate at startup from ending the command the caller asked to keep running.
 */
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

/**
 * Everything the command does once the command line has parsed.
 *
 * It resolves to one of two modes and nothing else: an `<input>` with an `-o` writes a
 * single routes file, and anything else runs a config file — which is what opts in the
 * routes, components, webhooks, types, mock, docs, test and tanstack-query generators.
 * `--config` and `<input>` are mutually exclusive, and each of `<input>` / `--output` is
 * meaningless without the other.
 *
 * Everything past the guard clauses fails with something carrying a `message`, so the
 * single `mapError` at the end is where all of it turns into rendered CLI output. The
 * `FileSystem` the generators write through comes from the environment the caller
 * provides.
 */
function generate(args: Command.Command.Config.Infer<typeof commandLine>) {
  return Effect.gen(function* () {
    const input = Option.getOrUndefined(args.input)
    const output = Option.getOrUndefined(args.output)
    const configPath = Option.getOrUndefined(args.config)

    // Neither mode is described. `ShowHelp` is how the runner is asked for the help it
    // renders for a parse failure, so a failure caught here reads the same as one caught
    // a layer earlier — and the command describes itself in exactly one place.
    if (configPath !== undefined && (input !== undefined || output !== undefined)) {
      const message =
        '--config cannot be combined with <input> or --output. A config file already names its own input and outputs.'
      return yield* new CliError.ShowHelp({
        commandPath: [COMMAND_NAME],
        errors: [new CliError.UserError({ cause: new Error(message), userMessage: message })],
      })
    }
    if (input !== undefined && output === undefined) {
      const message = '<input> requires -o <output.ts>.'
      return yield* new CliError.ShowHelp({
        commandPath: [COMMAND_NAME],
        errors: [new CliError.UserError({ cause: new Error(message), userMessage: message })],
      })
    }
    if (output !== undefined && input === undefined) {
      const message = '-o <output.ts> requires an <input> document.'
      return yield* new CliError.ShowHelp({
        commandPath: [COMMAND_NAME],
        errors: [new CliError.UserError({ cause: new Error(message), userMessage: message })],
      })
    }
    // One-shot writes one file from one document and is done; there is no second pass for
    // a change to trigger.
    if (args.watch && (input !== undefined || output !== undefined)) {
      const message =
        '--watch runs a config file, so it cannot be combined with <input> or --output.'
      return yield* new CliError.ShowHelp({
        commandPath: [COMMAND_NAME],
        errors: [new CliError.UserError({ cause: new Error(message), userMessage: message })],
      })
    }

    // One-shot: no config file is consulted, even when one sits in the working directory.
    // The generator pipeline pulls in the OpenAPI parser, the TypeSpec compiler and
    // ts-morph. `--help`, `--version`, `--completions` and every rejected command line
    // above must not pay for that, so it is loaded here rather than at module scope.
    if (input !== undefined && output !== undefined) {
      const [{ parseOpenAPI }, { takibi }] = yield* Effect.promise(() =>
        Promise.all([import('../openapi/index.js'), import('../core/index.js')]),
      )
      return yield* Console.log(
        yield* takibi(yield* parseOpenAPI(input), output, ONE_SHOT_COMPONENTS),
      )
    }

    const resolvedConfig = configPath ?? DEFAULT_CONFIG_FILE
    // Under `--watch` the first pass is a pass like any other: the caller asked for a
    // command that stays up and reacts to edits, and a config that does not validate yet
    // is the first edit to react to. Without it, one typo ends the session.
    if (args.watch) {
      return yield* watchConfig(resolvedConfig, yield* reportConfigPass(resolvedConfig, false))
    }
    const first = yield* runConfigPass(resolvedConfig, false).pipe(
      // A config that is absent and was never asked for is the "ran `hono-takibi` with
      // nothing" case, the one place where the usage block is the answer. A config that
      // is present and wrong already names the field, and the usage block only buries it.
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
    // A `CliError` is already something the runner knows how to render — `ShowHelp` in
    // particular, which it answers with the generated help. Everything else is a
    // generator or filesystem failure that only carries a sentence.
    Effect.mapError((error) =>
      CliError.isCliError(error)
        ? error
        : new CliError.UserError({ cause: error, userMessage: error.message }),
    ),
  )
}

/**
 * The `hono-takibi` command: parsing, validation, `--help`, `--version` and shell
 * completions are owned by `effect/unstable/cli`, {@link generate} is the rest.
 */
const cli = Command.make(COMMAND_NAME, commandLine, generate).pipe(
  Command.withDescription('Generate @hono/zod-openapi code from OpenAPI or TypeSpec'),
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

/**
 * Runs `hono-takibi` against an argument list.
 *
 * `entryUrl` is the `import.meta.url` of the executable, and `--version` is read from the
 * `package.json` beside it. The entry has to supply that: it is the only module whose
 * depth is the same in source and in the bundle (`src/index.ts` and the `dist/cli.js` it
 * is packed into both sit one directory below the manifest), so a relative URL written
 * anywhere else resolves to two different files.
 *
 * A manifest that is missing or malformed is a broken install, so it fails rather than
 * reporting a placeholder version — but through the error channel, which prints a
 * sentence instead of an unhandled `SchemaError` and its whole AST.
 */
export function honoTakibi(argv: readonly string[], entryUrl: string) {
  return Effect.gen(function* () {
    const manifestPath = fileURLToPath(new URL('../package.json', entryUrl))
    const fs = yield* FileSystem.FileSystem
    const source = yield* fs.readFileString(manifestPath)
    const manifest = yield* Effect.try({
      try: (): unknown => JSON.parse(source),
      catch: (cause) => new Error(`${manifestPath} is not valid JSON`, { cause }),
    })
    const { version } = yield* Schema.decodeUnknownEffect(
      Schema.Struct({ version: Schema.String }),
    )(manifest)
    return yield* Command.runWith(cli, { version })(argv)
  }).pipe(Effect.catchIf((error) => !CliError.isCliError(error), reportBrokenInstall))
}

/**
 * The version could not be read: the manifest beside the entry is missing, is not JSON,
 * or carries no `version`. That is a broken install, not anything the caller typed.
 *
 * `Command.runWith` renders the errors raised inside the command, but this one is raised
 * before it runs. So it is rendered here through the same formatter — the `ERROR` block
 * every other failure prints — and marked as already reported, so `runMain` does not
 * print it a second time in its own shape.
 */
function reportBrokenInstall(cause: { readonly message: string }) {
  return Effect.gen(function* () {
    const error = new CliError.UserError({
      cause,
      userMessage: `Cannot read the version from package.json: ${cause.message}`,
    })
    error[Runtime.errorReported] = false
    const formatter = yield* CliOutput.Formatter
    yield* Console.error(formatter.formatError(error))
    return yield* error
  })
}
