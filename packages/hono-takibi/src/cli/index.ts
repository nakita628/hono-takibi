import { Console, Effect, Option, Schema } from 'effect'
import { Argument, CliError, Command, Flag } from 'effect/unstable/cli'

/** Config file `hono-takibi` picks up from the working directory when `--config` is omitted. */
const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

const USAGE = `Usage:
  hono-takibi <input.{yaml,json,tsp}> -o <output.ts>   generate a single routes file
  hono-takibi [--config <file>]                        run every generator the config opts into`

// `Schema.is` over a template literal is what carries the extension into the parsed
// type, so the generators receive a `${string}.ts` without a cast; `Schema.refine` is
// what replaces "matching template literal parts" with a sentence.
const DocumentSchema = Schema.String.pipe(
  Schema.refine(
    Schema.is(Schema.TemplateLiteral([Schema.String, Schema.Literals(['.yaml', '.json', '.tsp'])])),
    { message: 'an OpenAPI (.yaml, .json) or TypeSpec (.tsp) document' },
  ),
)

const TypeScriptFileSchema = Schema.String.pipe(
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

/** A failure the CLI renders as a message; `Command.run` prints it and exits non-zero. */
function userError(message: string) {
  return new CliError.UserError({ cause: new Error(message), userMessage: message })
}

/**
 * Everything `hono-takibi` does, in the order it does it.
 *
 * A command line resolves to one of two modes and nothing else: an `<input>` with an
 * `-o` writes a single routes file, and anything else runs a config file — which is what
 * opts in the routes, components, webhooks, types, mock, docs, test and tanstack-query
 * generators. `--config` and `<input>` are mutually exclusive, and each of `<input>` /
 * `--output` is meaningless without the other.
 *
 * Everything past the guard clauses fails with something carrying a `message`, so the
 * single `mapError` at the end is where all of it turns into rendered CLI output. The
 * `FileSystem` the generators write through comes from the environment the caller
 * provides.
 */
export function honoTakibi(args: {
  readonly input: Option.Option<typeof DocumentSchema.Type>
  readonly output: Option.Option<typeof TypeScriptFileSchema.Type>
  readonly config: Option.Option<string>
}) {
  return Effect.gen(function* () {
    const input = Option.getOrUndefined(args.input)
    const output = Option.getOrUndefined(args.output)
    const configPath = Option.getOrUndefined(args.config)

    if (configPath !== undefined && (input !== undefined || output !== undefined)) {
      return yield* userError(
        `--config cannot be combined with <input> or --output. A config file already names its own input and outputs.\n\n${USAGE}`,
      )
    }
    if (input !== undefined && output === undefined) {
      return yield* userError(`<input> requires -o <output.ts>.\n\n${USAGE}`)
    }
    if (output !== undefined && input === undefined) {
      return yield* userError(`-o <output.ts> requires an <input> document.\n\n${USAGE}`)
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
      // A config the caller never asked for is the "ran `hono-takibi` with nothing"
      // case, the one place where a missing file is worth explaining.
      Effect.mapError((error) =>
        configPath === undefined ? userError(`${error.message}\n\n${USAGE}`) : error,
      ),
    )
    const messages = yield* Effect.all(
      makeJob(yield* parseOpenAPI(config.input), config).map((job) => job.run(job.output)),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    return yield* Console.log(messages.filter((message) => message !== '').join('\n'))
  }).pipe(
    Effect.mapError((error) =>
      error instanceof CliError.UserError ? error : userError(error.message),
    ),
  )
}

/**
 * The `hono-takibi` command.
 *
 * Parsing, validation, `--help`, `--version` and shell completions are owned by
 * `effect/unstable/cli`; {@link honoTakibi} is everything after a valid command line.
 */
export const cli = Command.make(
  'hono-takibi',
  {
    input: Argument.file('input', { mustExist: true }).pipe(
      Argument.withSchema(DocumentSchema),
      Argument.withDescription(
        'OpenAPI (.yaml, .json) or TypeSpec (.tsp) document to generate from',
      ),
      Argument.withMetavar('input.{yaml,json,tsp}'),
      Argument.optional,
    ),
    // `Flag.string`, not `Flag.file`: the file primitive rewrites its value to an
    // absolute path, and `--output` is echoed back in the "Generated code written to"
    // message, which should read as the path the caller typed.
    output: Flag.string('output').pipe(
      Flag.withAlias('o'),
      Flag.withSchema(TypeScriptFileSchema),
      Flag.withDescription('TypeScript file the generated routes are written to'),
      Flag.withMetavar('output.ts'),
      Flag.optional,
    ),
    config: Flag.file('config', { mustExist: true }).pipe(
      Flag.withAlias('c'),
      Flag.withDescription(
        `Config file to run (default: ./${DEFAULT_CONFIG_FILE}). Paths inside it resolve against the current directory.`,
      ),
      Flag.withMetavar('file'),
      Flag.optional,
    ),
  },
  honoTakibi,
).pipe(
  Command.withDescription(
    `Generate @hono/zod-openapi code from an OpenAPI or TypeSpec document. With an <input> the CLI writes a single routes file; with no <input> it runs ./${DEFAULT_CONFIG_FILE} (or --config), which opts in the routes, components, webhooks, types, mock, docs, test and tanstack-query generators.`,
  ),
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

/** Runs {@link cli} against an explicit argument list. */
export function run(argv: readonly string[], version: string) {
  return Command.runWith(cli, { version })(argv)
}
