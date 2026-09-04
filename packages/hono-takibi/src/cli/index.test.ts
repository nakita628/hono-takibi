import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeServices from '@effect/platform-node/NodeServices'
import { Console, Effect, Exit } from 'effect'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { honoTakibi } from './index.js'

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

// `honoTakibi` reads `--version` from the `package.json` one directory above its entry,
// so the tests hand it the URL the real entry has: `src/index.ts`.
const ENTRY_URL = new URL('../index.ts', import.meta.url).href
const { version } = JSON.parse(
  fs.readFileSync(new URL('../../package.json', import.meta.url), 'utf-8'),
) as { readonly version: string }

// SGR escapes the CLI formatter emits when stdout is a TTY, stripped so the
// assertions below compare plain text either way.
const ANSI = new RegExp(`${String.fromCodePoint(27)}\\[[0-9;]*m`, 'gu')

/**
 * Runs the CLI exactly as `dist/cli.js` does — same command, same platform services —
 * with the `Console` service swapped for a recorder. Help, errors and the success
 * message all go through `Console`, so this captures everything a user would see.
 */
async function runCli(argv: readonly string[], entryUrl: string = ENTRY_URL) {
  const stdout: string[] = []
  const stderr: string[] = []
  const recorder: Console.Console = Object.assign(Object.create(console), {
    log: (...args: readonly unknown[]) => stdout.push(args.map(String).join(' ')),
    error: (...args: readonly unknown[]) => stderr.push(args.map(String).join(' ')),
  })
  const exit = await Effect.runPromiseExit(
    honoTakibi(argv, entryUrl).pipe(
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

const originalCwd = process.cwd()
let tmpDir = ''

/**
 * Fresh temp directory, entered for the length of the test.
 *
 * `chdir` rather than a stubbed `process.cwd`: a generator resolves its output through
 * the real working directory, so a config that names a relative output only lands in the
 * temp directory if the process is actually in it.
 */
function useTmpDir(prefix: string) {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), prefix)))
  tmpDir = dir
  process.chdir(dir)
  return dir
}

afterEach(() => {
  process.chdir(originalCwd)
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
  tmpDir = ''
})

// The two modes are mutually exclusive and each flag is meaningless alone; these are the
// ways a caller can describe neither mode. Driven through argv, so the guards are reached
// the way a user reaches them — past `mustExist` and the extension schemas.
describe('hono-takibi mode resolution', { timeout: 30_000 }, () => {
  it('rejects <input> without -o', async () => {
    const dir = useTmpDir('cli-mode-input-only-')
    const input = path.join(dir, 'openapi.json')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))

    const result = await runCli([input])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('<input> requires -o <output.ts>')
  })

  it('rejects --config alongside the one-shot flags', async () => {
    const dir = useTmpDir('cli-mode-config-and-input-')
    const input = path.join(dir, 'openapi.json')
    const config = path.join(dir, 'api.config.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, 'export default {}')

    const result = await runCli([input, '-o', path.join(dir, 'out.ts'), '--config', config])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('--config cannot be combined')
  })

  it('rejects --config alongside -o alone', async () => {
    const dir = useTmpDir('cli-mode-config-and-output-')
    const config = path.join(dir, 'api.config.ts')
    fs.writeFileSync(config, 'export default {}')

    const result = await runCli(['-o', path.join(dir, 'out.ts'), '--config', config])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('--config cannot be combined')
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
    expect(result.stdout).toContain(`hono-takibi v${version}`)
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
    // The usage block answers "there is no config here", not "the config here is wrong".
    expect(result.stderr).not.toContain('hono-takibi <input.{yaml,json,tsp}>')
  })

  it('resolves a relative --config, and the paths inside it, against the working directory', async () => {
    const dir = useTmpDir('cli-config-relative-')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.mkdirSync(path.join(dir, 'config'))
    fs.writeFileSync(
      path.join(dir, 'config', 'api.config.ts'),
      // Relative to the working directory, not to the config file: `openapi.json` sits
      // beside the config here but is named from the directory the CLI was run in.
      `export default { input: './openapi.json', output: './src/routes.ts' }`,
    )

    const result = await runCli(['--config', 'config/api.config.ts'])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(dir, 'src', 'routes.ts'), 'utf-8')).toContain('getItemsRoute')
  })

  it('applies the config format block to what it writes', async () => {
    const dir = useTmpDir('cli-config-format-')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: './openapi.json',
        output: './routes.ts',
        format: { semi: true, singleQuote: false },
      }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(dir, 'routes.ts'), 'utf-8')).toContain(
      'import { createRoute, z } from "@hono/zod-openapi";',
    )
  })

  it('surfaces a config module that throws while loading', async () => {
    const dir = useTmpDir('cli-config-throws-')
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `throw new Error('config blew up')
export default {}`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('config blew up')
  })

  it('rejects a config module with no default export', async () => {
    const dir = useTmpDir('cli-config-no-default-')
    fs.writeFileSync(path.join(dir, 'hono-takibi.config.ts'), `export const config = {}`)

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Config must export default object')
  })

  it('surfaces a config whose input document is missing', async () => {
    const dir = useTmpDir('cli-config-missing-input-')
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './nope.yaml', output: './routes.ts' }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('ERROR')
    expect(fs.existsSync(path.join(dir, 'routes.ts'))).toBe(false)
  })

  // The schema rejects the values that would otherwise be spliced into generated code.
  // What matters here is that the failure reaches the caller naming the config field,
  // rather than as an oxfmt complaint about a file they never wrote.
  it.each([
    ['basePath', `basePath: 'api', output: './routes.ts'`, 'basePath: must start with'],
    [
      'rpc.client',
      `rpc: { output: './rpc.ts', import: '../lib', client: '1bad' }`,
      'rpc.client: must be a JavaScript identifier',
    ],
    [
      'rpc.import',
      `rpc: { output: './rpc.ts', import: '' }`,
      'rpc.import: must be a module specifier',
    ],
  ])('rejects a config whose %s cannot be generated from', async (_field, body, expected) => {
    const dir = useTmpDir('cli-config-field-')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './openapi.json', ${body} }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain(expected)
    expect(fs.readdirSync(dir).sort()).toStrictEqual(['hono-takibi.config.ts', 'openapi.json'])
  })

  it('generates rpc wrappers that import the configured client', async () => {
    const dir = useTmpDir('cli-config-rpc-')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: './openapi.json',
        rpc: { output: './rpc.ts', import: '../lib', client: 'apiClient' },
      }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.readFileSync(path.join(dir, 'rpc.ts'), 'utf-8')).toContain(
      "import { apiClient } from '../lib'",
    )
  })

  it('rejects a config that points two generators at one output path', async () => {
    const dir = useTmpDir('cli-config-collision-')
    const input = path.join(dir, 'openapi.json')
    const output = path.join(dir, 'api.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: ${JSON.stringify(input)},
        output: ${JSON.stringify(output)},
        type: { output: ${JSON.stringify(output)} },
      }`,
    )

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('type.output and output both write to')
    expect(fs.existsSync(output)).toBe(false)
  })
})

// The version is read before the command runs, so `Command.runWith` never sees this
// failure. It still has to reach the caller as the `ERROR` block every other failure
// prints, not as a runtime cause dump.
describe('hono-takibi broken install', () => {
  it('renders a package.json it cannot parse through the CLI formatter', async () => {
    const dir = useTmpDir('cli-broken-manifest-')
    fs.mkdirSync(path.join(dir, 'sub'))
    fs.writeFileSync(path.join(dir, 'package.json'), 'not json')

    const result = await runCli(
      ['--help'],
      new URL(`file://${path.join(dir, 'sub', 'index.ts')}`).href,
    )

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('ERROR')
    expect(result.stderr).toContain('Cannot read the version from package.json')
  })

  it('reports a package.json with no version field', async () => {
    const dir = useTmpDir('cli-versionless-manifest-')
    fs.mkdirSync(path.join(dir, 'sub'))
    fs.writeFileSync(path.join(dir, 'package.json'), JSON.stringify({ name: 'x' }))

    const result = await runCli(
      ['--help'],
      new URL(`file://${path.join(dir, 'sub', 'index.ts')}`).href,
    )

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('Cannot read the version from package.json')
  })
})

describe('hono-takibi one-shot failures', { timeout: 30_000 }, () => {
  it('propagates a parse failure from the input document', async () => {
    const dir = useTmpDir('cli-parse-failure-')
    const input = path.join(dir, 'broken.json')
    fs.writeFileSync(input, '{ not json')

    const result = await runCli([input, '-o', path.join(dir, 'out.ts')])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain('ERROR')
  })
})
