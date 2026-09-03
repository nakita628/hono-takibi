import { Console, Effect, Option, Result, Schema } from 'effect'
import { Argument, CliError, Command, Flag } from 'effect/unstable/cli'

/** Config file `hono-takibi` picks up from the working directory when `--config` is omitted. */
const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

const USAGE = `Usage:
  hono-takibi <input.{yaml,json,tsp}> -o <output.ts>   generate a single routes file
  hono-takibi [--config <file>]                        run every generator the config opts into`

/**
 * The document formats `parseOpenAPI` reads, kept as a template literal so a parsed
 * `<input>` reaches the generators already narrowed to what they accept.
 */
const DocumentPathSchema = Schema.TemplateLiteral([
  Schema.String,
  Schema.Literals(['.yaml', '.json', '.tsp']),
])

/** Every generated module is TypeScript, so `--output` always names a `.ts` file. */
const TypeScriptPathSchema = Schema.TemplateLiteral([Schema.String, '.ts'])

// `Schema.is` derives the guard from the schema above, so the suffix list is written
// once; `Schema.refine` is what carries the narrowed type through `withSchema` and
// gives the rejection a sentence instead of "matching template literal parts".
const DocumentSchema = Schema.String.pipe(
  Schema.refine(Schema.is(DocumentPathSchema), {
    message: 'an OpenAPI (.yaml, .json) or TypeSpec (.tsp) document',
  }),
)

const TypeScriptFileSchema = Schema.String.pipe(
  Schema.refine(Schema.is(TypeScriptPathSchema), {
    message: 'a TypeScript file path ending in .ts',
  }),
)

type Document = typeof DocumentSchema.Type
type TypeScriptFile = typeof TypeScriptFileSchema.Type

const inputArgument = Argument.file('input', { mustExist: true }).pipe(
  Argument.withSchema(DocumentSchema),
  Argument.withDescription('OpenAPI (.yaml, .json) or TypeSpec (.tsp) document to generate from'),
  Argument.withMetavar('input.{yaml,json,tsp}'),
  Argument.optional,
)

// `Flag.string`, not `Flag.file`: the file primitive rewrites its value to an
// absolute path, and `--output` is echoed back in the "Generated code written to"
// message, which should read as the path the caller typed.
const outputFlag = Flag.string('output').pipe(
  Flag.withAlias('o'),
  Flag.withSchema(TypeScriptFileSchema),
  Flag.withDescription('TypeScript file the generated routes are written to'),
  Flag.withMetavar('output.ts'),
  Flag.optional,
)

const configFlag = Flag.file('config', { mustExist: true }).pipe(
  Flag.withAlias('c'),
  Flag.withDescription(
    `Config file to run (default: ./${DEFAULT_CONFIG_FILE}). Paths inside it resolve against the current directory.`,
  ),
  Flag.withMetavar('file'),
  Flag.optional,
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
 * Runs one step of the generator pipeline.
 *
 * The pipeline predates this CLI and still answers with `{ ok }` objects rather than
 * the error channel, so this is the single place that translation happens: a rejected
 * promise or an `ok: false` both become a rendered `UserError`.
 */
function step<A>(
  attempt: () => Promise<
    { readonly ok: true; readonly value: A } | { readonly ok: false; readonly error: string }
  >,
) {
  return Effect.gen(function* () {
    const outcome = yield* Effect.tryPromise({
      try: attempt,
      catch: (cause) => new CliError.UserError({ cause }),
    })
    if (!outcome.ok) return yield* userError(outcome.error)
    return outcome.value
  })
}

/**
 * What the parsed command line resolved to. Keeping the two modes apart as data
 * means the handler never has to re-read the command line to know which one it is in.
 */
type Plan =
  | { readonly kind: 'OneShot'; readonly input: Document; readonly output: TypeScriptFile }
  | { readonly kind: 'Config'; readonly path: string; readonly explicit: boolean }

/**
 * Decides which mode the flags describe.
 *
 * `--config` and `<input>` are mutually exclusive, and each of `<input>` / `--output`
 * is meaningless without the other. Anything left over is config mode against the
 * default config file.
 */
export function resolvePlan(args: {
  readonly input: Option.Option<Document>
  readonly output: Option.Option<TypeScriptFile>
  readonly config: Option.Option<string>
}): Effect.Effect<Plan, CliError.UserError> {
  return Effect.gen(function* () {
    const input = Option.getOrUndefined(args.input)
    const output = Option.getOrUndefined(args.output)
    const config = Option.getOrUndefined(args.config)
    if (config !== undefined) {
      if (input !== undefined || output !== undefined) {
        return yield* userError(
          `--config cannot be combined with <input> or --output. A config file already names its own input and outputs.\n\n${USAGE}`,
        )
      }
      return { kind: 'Config', path: config, explicit: true }
    }
    if (input !== undefined) {
      if (output === undefined) {
        return yield* userError(`<input> requires -o <output.ts>.\n\n${USAGE}`)
      }
      return { kind: 'OneShot', input, output }
    }
    if (output !== undefined) {
      return yield* userError(`-o <output.ts> requires an <input> document.\n\n${USAGE}`)
    }
    return { kind: 'Config', path: DEFAULT_CONFIG_FILE, explicit: false }
  })
}

/**
 * Generates a single routes file from one document, with no config file involved.
 *
 * The generator pipeline is imported here rather than at module scope: it pulls in
 * the OpenAPI parser, the TypeSpec compiler and ts-morph, none of which `--help`,
 * `--version`, `--completions` or a rejected command line ever needs.
 */
function generateOneShot(input: Document, output: TypeScriptFile) {
  return Effect.gen(function* () {
    const [{ parseOpenAPI }, { takibi }] = yield* Effect.promise(() =>
      Promise.all([import('../openapi/index.js'), import('../core/index.js')]),
    )
    const openAPI = yield* step(() => parseOpenAPI(input))
    return yield* step(() => takibi(openAPI, output, ONE_SHOT_COMPONENTS))
  })
}

/**
 * Runs every generator the config opts into and joins their messages.
 *
 * A config the caller never asked for is the "ran `hono-takibi` with nothing" case,
 * the one place where a missing file is worth explaining rather than just reporting.
 */
function generateFromConfig(path: string, explicit: boolean) {
  return Effect.gen(function* () {
    // Deferred for the same reason as `generateOneShot`.
    const [{ readConfig }, { setFormatOptions }, { parseOpenAPI }, { makeJob }] =
      yield* Effect.promise(() =>
        Promise.all([
          import('../config/index.js'),
          import('../format/index.js'),
          import('../openapi/index.js'),
          import('../shared/index.js'),
        ]),
      )
    const config = yield* step(() => readConfig(path)).pipe(
      Effect.catchTag('UserError', (e) =>
        explicit ? Effect.fail(e) : userError(`${e.message}\n\n${USAGE}`),
      ),
    )
    const format = config.format
    if (format) {
      yield* Effect.sync(() => {
        setFormatOptions(format)
      })
    }
    const openAPI = yield* step(() => parseOpenAPI(config.input))
    // Every job is run to completion before the first failure is reported, so a
    // generator that would have succeeded still writes its output.
    const outcomes = yield* Effect.forEach(
      makeJob(openAPI, config),
      (job) => Effect.result(step(() => job.run(job.output))),
      { concurrency: 'unbounded' },
    )
    const failed = outcomes.find(Result.isFailure)
    if (failed !== undefined) return yield* Effect.fail(failed.failure)
    return outcomes
      .map((outcome) => Result.getOrElse(outcome, () => ''))
      .filter((message) => message !== '')
      .join('\n')
  })
}

/** Runs a resolved plan, answering with the message the CLI prints on success. */
export function execute(plan: Plan) {
  return plan.kind === 'OneShot'
    ? generateOneShot(plan.input, plan.output)
    : generateFromConfig(plan.path, plan.explicit)
}

function handle(args: {
  readonly input: Option.Option<Document>
  readonly output: Option.Option<TypeScriptFile>
  readonly config: Option.Option<string>
}) {
  return Effect.gen(function* () {
    const plan = yield* resolvePlan(args)
    const message = yield* execute(plan)
    return yield* Console.log(message)
  })
}

/**
 * The `hono-takibi` command.
 *
 * Parsing, validation, `--help`, `--version` and shell completions are owned by
 * `effect/unstable/cli`; everything below the handler is the generator pipeline.
 */
export const cli = Command.make(
  'hono-takibi',
  { input: inputArgument, output: outputFlag, config: configFlag },
  handle,
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
