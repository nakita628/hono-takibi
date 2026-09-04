import { fileURLToPath } from 'node:url'

import { Console, Effect, FileSystem, Option, Schema } from 'effect'
import { Argument, CliError, Command, Flag } from 'effect/unstable/cli'

/** Config file `hono-takibi` picks up from the working directory when `--config` is omitted. */
const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

const USAGE = `Usage:
  hono-takibi <input.{yaml,json,tsp}> -o <output.ts>   generate a single routes file
  hono-takibi [--config <file>]                        run every generator the config opts into`

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

    // Neither mode is described. `userMessage` is what the CLI formatter renders and
    // `cause` is what a `--log-level` dump shows, so both carry the same sentence
    // followed by the usage block.
    if (configPath !== undefined && (input !== undefined || output !== undefined)) {
      const message = `--config cannot be combined with <input> or --output. A config file already names its own input and outputs.\n\n${USAGE}`
      return yield* new CliError.UserError({ cause: new Error(message), userMessage: message })
    }
    if (input !== undefined && output === undefined) {
      const message = `<input> requires -o <output.ts>.\n\n${USAGE}`
      return yield* new CliError.UserError({ cause: new Error(message), userMessage: message })
    }
    if (output !== undefined && input === undefined) {
      const message = `-o <output.ts> requires an <input> document.\n\n${USAGE}`
      return yield* new CliError.UserError({ cause: new Error(message), userMessage: message })
    }

    // The generator pipeline pulls in the OpenAPI parser, the TypeSpec compiler and
    // ts-morph. `--help`, `--version`, `--completions` and every rejected command line
    // above must not pay for that, so it is loaded here rather than at module scope.
    const { parseOpenAPI } = yield* Effect.promise(() => import('../openapi/index.js'))

    // One-shot: no config file is consulted, even when one sits in the working directory.
    if (input !== undefined && output !== undefined) {
      const { takibi } = yield* Effect.promise(() => import('../core/index.js'))
      return yield* Console.log(
        yield* takibi(yield* parseOpenAPI(input), output, ONE_SHOT_COMPONENTS),
      )
    }

    const [{ readConfig }, { FormatOptions }, { makeJob }] = yield* Effect.promise(() =>
      Promise.all([
        import('../config/index.js'),
        import('../format/index.js'),
        import('../shared/index.js'),
      ]),
    )
    const config = yield* readConfig(configPath ?? DEFAULT_CONFIG_FILE).pipe(
      // A config that is absent and was never asked for is the "ran `hono-takibi` with
      // nothing" case, the one place where the usage block is the answer. A config that
      // is present and wrong already names the field, and the usage block only buries it.
      Effect.mapError((error) =>
        configPath === undefined && error.notFound === true
          ? new CliError.UserError({ cause: error, userMessage: `${error.message}\n\n${USAGE}` })
          : error,
      ),
    )
    const messages = yield* Effect.all(
      makeJob(yield* parseOpenAPI(config.input), config).map((job) => job.run(job.output)),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    return yield* Console.log(messages.filter((message) => message !== '').join('\n'))
  }).pipe(
    Effect.mapError((error) =>
      error instanceof CliError.UserError
        ? error
        : new CliError.UserError({ cause: error, userMessage: error.message }),
    ),
  )
}

/**
 * The `hono-takibi` command: parsing, validation, `--help`, `--version` and shell
 * completions are owned by `effect/unstable/cli`, {@link generate} is the rest.
 */
const cli = Command.make('hono-takibi', commandLine, generate).pipe(
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
  }).pipe(
    Effect.mapError((error) =>
      CliError.isCliError(error)
        ? error
        : new CliError.UserError({
            cause: error,
            userMessage: `Cannot read the version from package.json: ${error.message}`,
          }),
    ),
  )
}
