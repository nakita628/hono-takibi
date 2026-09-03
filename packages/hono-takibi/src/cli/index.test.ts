import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeServices from '@effect/platform-node/NodeServices'
import { Cause, Console, Effect, Exit, Option } from 'effect'
import type { CliError } from 'effect/unstable/cli'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { execute, resolvePlan, run } from './index.js'

const openapi = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi',
    version: 'v1',
  },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

const brandOpenapi = {
  openapi: '3.1.0',
  info: { title: 'Brand Test', version: '1.0.0' },
  paths: {
    '/items': {
      get: {
        operationId: 'getItems',
        responses: {
          200: {
            description: 'OK',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
          },
        },
      },
    },
  },
  components: {
    schemas: {
      ItemId: { type: 'string', format: 'uuid', 'x-brand': 'ItemId' },
      Item: {
        type: 'object',
        required: ['id', 'name'],
        properties: { id: { $ref: '#/components/schemas/ItemId' }, name: { type: 'string' } },
      },
    },
  },
}

const minimalOpenapi = {
  openapi: '3.1.0',
  info: { title: 'Cfg', version: '1.0.0' },
  paths: {
    '/items': { get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } } },
  },
}

// SGR escapes the CLI formatter emits when stdout is a TTY, stripped so the
// assertions below compare plain text either way.
const ANSI = new RegExp(`${String.fromCodePoint(27)}\\[[0-9;]*m`, 'gu')

/**
 * Runs the CLI exactly as `dist/cli.js` does — same command, same platform services —
 * with the `Console` service swapped for a recorder. Help, errors and the success
 * message all go through `Console`, so this captures everything a user would see.
 */
async function runCli(argv: readonly string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const recorder: Console.Console = Object.assign(Object.create(console), {
    log: (...args: readonly unknown[]) => stdout.push(args.map(String).join(' ')),
    error: (...args: readonly unknown[]) => stderr.push(args.map(String).join(' ')),
  })
  const exit = await Effect.runPromiseExit(
    run(argv, '0.0.0-test').pipe(
      Effect.provideService(Console.Console, recorder),
      Effect.provide(NodeServices.layer),
    ),
  )
  return {
    ok: Exit.isSuccess(exit),
    stdout: stdout.join('\n').replaceAll(ANSI, ''),
    stderr: stderr.join('\n').replaceAll(ANSI, ''),
  }
}

const originalCwd = process.cwd.bind(process)
let tmpDir = ''

/** Fresh temp directory that stands in for `process.cwd()` until the test ends. */
function useTmpDir(prefix: string) {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), prefix))
  tmpDir = dir
  process.cwd = () => dir
  return dir
}

afterEach(() => {
  process.cwd = originalCwd
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
  tmpDir = ''
})

/** `resolvePlan` over plain strings, run to an `Exit` so both channels can be asserted. */
function plan(input?: string, output?: string, config?: string) {
  return Effect.runSyncExit(
    resolvePlan({
      input: Option.fromNullishOr(input as `${string}.yaml` | undefined),
      output: Option.fromNullishOr(output as `${string}.ts` | undefined),
      config: Option.fromNullishOr(config),
    }),
  )
}

/** The rendered message of the `UserError` a failed plan carries. */
function planError(exit: Exit.Exit<unknown, CliError.UserError>) {
  return Exit.isFailure(exit)
    ? Option.getOrElse(
        Option.map(Cause.findErrorOption(exit.cause), (error) => error.message),
        () => '',
      )
    : ''
}

describe('resolvePlan', () => {
  it('pairs <input> with -o into a one-shot run', () => {
    expect(plan('openapi.yaml', 'routes.ts')).toStrictEqual(
      Exit.succeed({ kind: 'OneShot', input: 'openapi.yaml', output: 'routes.ts' }),
    )
  })

  it('falls back to the default config file when nothing is given', () => {
    expect(plan()).toStrictEqual(
      Exit.succeed({ kind: 'Config', path: 'hono-takibi.config.ts', explicit: false }),
    )
  })

  it('runs the config file named by --config', () => {
    expect(plan(undefined, undefined, 'api.config.ts')).toStrictEqual(
      Exit.succeed({ kind: 'Config', path: 'api.config.ts', explicit: true }),
    )
  })

  it('rejects <input> without -o', () => {
    expect(planError(plan('openapi.yaml'))).toContain('<input> requires -o <output.ts>')
  })

  it('rejects -o without <input>', () => {
    expect(planError(plan(undefined, 'routes.ts'))).toContain(
      '-o <output.ts> requires an <input> document',
    )
  })

  it('rejects --config alongside the one-shot flags', () => {
    expect(planError(plan('openapi.yaml', 'routes.ts', 'api.config.ts'))).toContain(
      '--config cannot be combined',
    )
  })
})

describe('hono-takibi <input> -o <output>', { timeout: 30_000 }, () => {
  it('generates the routes file and reports the path it wrote', async () => {
    const dir = useTmpDir('cli-one-shot-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'zod-openapi-hono.ts')
    fs.writeFileSync(input, JSON.stringify(openapi))

    const result = await runCli([input, '-o', output])

    expect(result.ok).toBe(true)
    expect(result.stdout).toBe(`🔥 Generated code written to ${output}`)
    expect(fs.readFileSync(output, 'utf-8'))
      .toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const getHonoRoute = createRoute({
  method: 'get',
  path: '/hono',
  tags: ['Hono'],
  summary: 'Hono',
  description: 'Hono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'Hono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getHonoXRoute = createRoute({
  method: 'get',
  path: '/hono-x',
  tags: ['HonoX'],
  summary: 'HonoX',
  description: 'HonoX',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'HonoX' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})

export const getZodOpenapiHonoRoute = createRoute({
  method: 'get',
  path: '/zod-openapi-hono',
  tags: ['ZodOpenAPIHono'],
  summary: 'ZodOpenAPIHono',
  description: 'ZodOpenAPIHono',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z
            .object({ message: z.string().openapi({ example: 'ZodOpenAPIHono' }) })
            .openapi({ required: ['message'] }),
        },
      },
    },
  },
})
`)
  })

  it('generates branded types with .brand<"X">()', async () => {
    const dir = useTmpDir('cli-brand-')
    const input = path.join(dir, 'brand-test.json')
    const output = path.join(dir, 'brand-test-output.ts')
    fs.writeFileSync(input, JSON.stringify(brandOpenapi))

    const result = await runCli([input, '-o', output])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(output, 'utf-8'))
      .toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemIdSchema = z.uuid().brand<'ItemId'>().openapi('ItemId')

const ItemSchema = z
  .object({ id: ItemIdSchema, name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('Item')

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'getItems',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ItemSchema } } },
  },
})
`)
  })

  it('surfaces a generator failure instead of throwing', async () => {
    const dir = useTmpDir('cli-one-shot-fail-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    // A directory occupying the output path forces the write to fail (EISDIR).
    fs.mkdirSync(output)

    const result = await runCli([input, '-o', output])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('ERROR')
  })
})

describe('hono-takibi argument validation', () => {
  it('rejects an input whose extension is not .yaml/.json/.tsp', async () => {
    const dir = useTmpDir('cli-bad-input-ext-')
    const input = path.join(dir, 'spec.txt')
    fs.writeFileSync(input, '{}')

    const result = await runCli([input, '-o', path.join(dir, 'out.ts')])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('an OpenAPI (.yaml, .json) or TypeSpec (.tsp) document')
  })

  it('rejects an input file that does not exist', async () => {
    const dir = useTmpDir('cli-missing-input-')
    const input = path.join(dir, 'this-file-does-not-exist.yaml')

    const result = await runCli([input, '-o', path.join(dir, 'out.ts')])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Path does not exist')
  })

  it('rejects an output whose extension is not .ts', async () => {
    const dir = useTmpDir('cli-bad-output-ext-')
    const input = path.join(dir, 'openapi.json')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))

    const result = await runCli([input, '-o', 'out.js'])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('a TypeScript file path ending in .ts')
  })

  it('rejects an unknown flag', async () => {
    useTmpDir('cli-unknown-flag-')

    const result = await runCli(['--nope'])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('--nope')
  })

  it('explains that -o needs an input document', async () => {
    useTmpDir('cli-output-only-')

    const result = await runCli(['-o', 'out.ts'])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('-o <output.ts> requires an <input> document')
  })
})

describe('hono-takibi global flags', () => {
  it('renders help for --help', async () => {
    useTmpDir('cli-help-')

    const result = await runCli(['--help'])

    expect(result.ok).toBe(true)
    expect(result.stdout).toContain('hono-takibi [flags] [<input>]')
    expect(result.stdout).toContain('--output, -o')
    expect(result.stdout).toContain('--config, -c')
  })

  it('renders help for -h', async () => {
    useTmpDir('cli-help-short-')

    const result = await runCli(['-h'])

    expect(result.ok).toBe(true)
    expect(result.stdout).toContain('hono-takibi [flags] [<input>]')
  })

  it('prints the version for --version', async () => {
    useTmpDir('cli-version-')

    const result = await runCli(['--version'])

    expect(result.ok).toBe(true)
    expect(result.stdout).toContain('hono-takibi v0.0.0-test')
  })

  it('prints a shell completion script for --completions', async () => {
    useTmpDir('cli-completions-')

    const result = await runCli(['--completions', 'zsh'])

    expect(result.ok).toBe(true)
    expect(result.stdout).toContain('#compdef hono-takibi')
  })
})

// The config-driven branch: with no positional input the CLI runs
// `hono-takibi.config.ts` from the working directory and fans out to the
// per-feature generators. Each case isolates cwd to a fresh tmp dir so the
// orchestration runs against real files, never the repo.
describe('hono-takibi config-driven', { timeout: 30_000 }, () => {
  it('reads config from cwd and generates the single-file routes output', async () => {
    const dir = useTmpDir('cli-config-min-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: ${JSON.stringify(input)}, output: ${JSON.stringify(output)} }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(output, 'utf-8').includes('getItemsRoute')).toBe(true)
  })

  it('runs the config file named by --config', async () => {
    const dir = useTmpDir('cli-config-explicit-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'routes.ts')
    const config = path.join(dir, 'nested', 'api.config.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.mkdirSync(path.dirname(config))
    fs.writeFileSync(
      config,
      `export default { input: ${JSON.stringify(input)}, output: ${JSON.stringify(output)} }`,
    )

    const result = await runCli(['--config', config])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(output, 'utf-8').includes('getItemsRoute')).toBe(true)
  })

  it('explains both usages when there is no input and no config file', async () => {
    useTmpDir('cli-config-absent-')

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Config not found')
    expect(result.stderr).toContain('hono-takibi <input.{yaml,json,tsp}> -o <output.ts>')
  })

  it('rejects a --config file that does not exist', async () => {
    const dir = useTmpDir('cli-config-missing-')

    const result = await runCli(['--config', path.join(dir, 'nope.config.ts')])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Path does not exist')
  })

  it('fans out to every generator named in the config and aggregates the results', async () => {
    const dir = useTmpDir('cli-config-rich-')
    const input = path.join(dir, 'openapi.json')
    const routes = path.join(dir, 'routes.ts')
    const types = path.join(dir, 'types.ts')
    const mockOut = path.join(dir, 'mock.ts')
    const docsOut = path.join(dir, 'docs.md')
    const testOut = path.join(dir, 'routes.test.ts')
    const queryOut = path.join(dir, 'query.ts')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Cfg', version: '1.0.0' },
        paths: {
          '/items': {
            get: {
              operationId: 'getItems',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'string' } },
                        required: ['id'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }),
    )
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: ${JSON.stringify(input)},
        basePath: '/',
        output: ${JSON.stringify(routes)}, template: { test: false, routeHandler: false },
        type: { output: ${JSON.stringify(types)} },
        mock: { output: ${JSON.stringify(mockOut)} },
        docs: { output: ${JSON.stringify(docsOut)} },
        test: { output: ${JSON.stringify(testOut)}, import: './routes' },
        'tanstack-query': { output: ${JSON.stringify(queryOut)}, import: './client' },
      }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.existsSync(routes)).toBe(true)
    expect(fs.existsSync(types)).toBe(true)
    expect(fs.existsSync(mockOut)).toBe(true)
    expect(fs.existsSync(docsOut)).toBe(true)
    expect(fs.existsSync(testOut)).toBe(true)
    expect(fs.existsSync(queryOut)).toBe(true)
    // The `template` block in zod-openapi triggers the app/handler scaffold.
    expect(fs.existsSync(path.join(dir, 'index.ts'))).toBe(true)
  })

  it('generates split routes, webhooks and components from the advanced config', async () => {
    const dir = useTmpDir('cli-config-split-')
    const input = path.join(dir, 'openapi.json')
    const routesDir = path.join(dir, 'routes')
    const webhooksDir = path.join(dir, 'webhooks')
    const schemasDir = path.join(dir, 'schemas')
    const parametersDir = path.join(dir, 'parameters')
    const responsesDir = path.join(dir, 'responses')
    fs.writeFileSync(
      input,
      JSON.stringify({
        openapi: '3.1.0',
        info: { title: 'Adv', version: '1.0.0' },
        paths: {
          '/items': {
            get: {
              operationId: 'getItems',
              parameters: [{ $ref: '#/components/parameters/Limit' }],
              responses: { '200': { $ref: '#/components/responses/ItemList' } },
            },
          },
        },
        webhooks: {
          itemCreated: {
            post: {
              operationId: 'itemCreated',
              requestBody: {
                content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
              },
              responses: { '200': { description: 'OK' } },
            },
          },
        },
        components: {
          schemas: {
            Item: {
              type: 'object',
              properties: { id: { type: 'string' }, name: { type: 'string' } },
              required: ['id'],
            },
          },
          parameters: { Limit: { name: 'limit', in: 'query', schema: { type: 'integer' } } },
          responses: {
            ItemList: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: { type: 'array', items: { $ref: '#/components/schemas/Item' } },
                },
              },
            },
          },
        },
      }),
    )
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: ${JSON.stringify(input)},
        basePath: '/',
        routes: { output: ${JSON.stringify(routesDir)}, split: true, import: '../routes' },
        webhooks: { output: ${JSON.stringify(webhooksDir)}, split: true, import: '../webhooks' },
        components: {
          schemas: { output: ${JSON.stringify(schemasDir)}, split: true, exportTypes: true, import: '../schemas' },
          parameters: { output: ${JSON.stringify(parametersDir)}, split: true, exportTypes: true, import: '../parameters' },
          responses: { output: ${JSON.stringify(responsesDir)}, split: true, import: '../responses' },
        },
      }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.existsSync(routesDir) && fs.readdirSync(routesDir).length > 0).toBe(true)
    expect(fs.existsSync(webhooksDir) && fs.readdirSync(webhooksDir).length > 0).toBe(true)
    expect(fs.existsSync(schemasDir) && fs.readdirSync(schemasDir).length > 0).toBe(true)
  })

  it('returns the first generator failure when an output path is not writable', async () => {
    const dir = useTmpDir('cli-config-fail-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    // A directory occupying the output path forces writeFile to fail (EISDIR),
    // so the generator returns { ok: false } and the CLI must surface it.
    fs.mkdirSync(output)
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: ${JSON.stringify(input)}, output: ${JSON.stringify(output)} }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('ERROR')
  })

  it('reports an invalid config without running any generator', async () => {
    const dir = useTmpDir('cli-config-invalid-')
    fs.writeFileSync(path.join(dir, 'hono-takibi.config.ts'), 'export default { input: 42 }')

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Invalid config')
  })
})

describe('execute', { timeout: 30_000 }, () => {
  it('propagates a parse failure from the input document', async () => {
    const dir = useTmpDir('cli-execute-parse-')
    const input = path.join(dir, 'broken.json')
    fs.writeFileSync(input, '{ not json')

    const exit = await Effect.runPromiseExit(
      execute({
        kind: 'OneShot',
        input: input as `${string}.json`,
        output: path.join(dir, 'out.ts') as `${string}.ts`,
      }),
    )

    expect(Exit.isFailure(exit)).toBe(true)
  })

  it('reports the generated file on the success channel', async () => {
    const dir = useTmpDir('cli-execute-ok-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))

    const message = await Effect.runPromise(
      execute({
        kind: 'OneShot',
        input: input as `${string}.json`,
        output: output as `${string}.ts`,
      }),
    )

    expect(message).toBe(`🔥 Generated code written to ${output}`)
  })
})
