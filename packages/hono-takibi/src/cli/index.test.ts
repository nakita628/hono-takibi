import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeServices from '@effect/platform-node/NodeServices'
import { Console, Effect, Exit, Fiber } from 'effect'
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
async function runCli(argv: readonly string[]) {
  const stdout: string[] = []
  const stderr: string[] = []
  const recorder: Console.Console = Object.assign(Object.create(console), {
    log: (...args: readonly unknown[]) => stdout.push(args.map(String).join(' ')),
    error: (...args: readonly unknown[]) => stderr.push(args.map(String).join(' ')),
  })
  const exit = await Effect.runPromiseExit(
    honoTakibi(argv).pipe(
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

/**
 * Two decisions in `cli/index.ts` that nothing else would notice being undone: they are
 * about what the command does *not* do, so no output changes when they break.
 */
describe('hono-takibi invariants', () => {
  // The comment above the one-shot branch says a config file is never consulted. Merging
  // the two branches during a refactor would make this config win and write to `b.ts`.
  it('ignores a config file sitting in the working directory in one-shot mode', async () => {
    const dir = useTmpDir('cli-one-shot-ignores-config-')
    const input = path.join(dir, 'openapi.json')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: ${JSON.stringify(input)}, output: './b.ts' }`,
    )

    const result = await runCli([input, '-o', path.join(dir, 'a.ts')])

    expect(result.ok).toBe(true)
    expect(fs.existsSync(path.join(dir, 'a.ts'))).toBe(true)
    expect(fs.existsSync(path.join(dir, 'b.ts'))).toBe(false)
  })

  /**
   * The generator pipeline is loaded through `import()` inside the handler, so `--help`,
   * `--version`, `--completions` and every rejected command line do not pay for the
   * TypeSpec compiler, the OpenAPI parser and ts-morph. Measured at the time: `--help`
   * takes ~190ms this way and ~1100ms with the imports hoisted to module scope.
   *
   * A refactor that tidies them into ordinary imports changes no behaviour and no output,
   * which is exactly why it needs a test. Reading the source rather than timing anything
   * keeps this from being a flaky benchmark.
   */
  it('loads the generators lazily, so the built-in flags stay fast', () => {
    const source = fs.readFileSync(new URL('./index.ts', import.meta.url), 'utf-8')
    const header = source.slice(0, source.indexOf('const commandLine'))

    for (const heavy of ['../openapi/index.js', '../core/index.js', '../shared/index.js']) {
      expect(header).not.toContain(`from '${heavy}'`)
      expect(source).toContain(`import('${heavy}')`)
    }
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

/**
 * `--help` is the command's own account of itself, and three other things claim to say
 * the same: the `USAGE` block the mode errors print, the CLI Reference in the README, and
 * the examples. Nothing makes them agree, so each is checked against the rendered help
 * rather than described a second time.
 *
 * The assertions name the lines this repository writes — the description, the argument,
 * our three flags, the examples — and not the frame `effect/unstable/cli` draws around
 * them: `GLOBAL FLAGS`, the column widths and the wording of `--help` itself belong to
 * the library, and pinning those would fail on a dependency bump rather than on drift
 * here.
 */
describe('hono-takibi --help', () => {
  it('lists every flag the command defines, with its alias and description', async () => {
    useTmpDir('cli-help-flags-')

    const result = await runCli(['--help'])

    const flags = result.stdout
      .slice(result.stdout.indexOf('FLAGS\n'), result.stdout.indexOf('GLOBAL FLAGS'))
      .split('\n')
      .filter((line) => line.startsWith('  --'))
      .map((line) => line.trim().replaceAll(/ {2,}/gu, '  '))

    expect(flags).toStrictEqual([
      '--output, -o output.ts  TypeScript file the generated routes are written to',
      '--config, -c file  Config file to run (default: ./hono-takibi.config.ts)',
      '--watch, -w  Rerun the config on every change to its documents or itself',
    ])
  })

  it('is what the website prints in its CLI section', async () => {
    useTmpDir('cli-help-docs-')
    const docs = fs.readFileSync(
      new URL('../../../../website/docs/index.md', import.meta.url),
      'utf-8',
    )
    const marker = '`hono-takibi --help`:\n\n```\n'
    const opening = docs.indexOf(marker)
    expect(opening).toBeGreaterThan(-1)
    const body = opening + marker.length
    const block = docs.slice(body, docs.indexOf('\n```', body))

    const result = await runCli(['--help'])

    expect(result.stdout.trimEnd()).toBe(block)
  })
})

describe('hono-takibi --version', () => {
  it('prints the version from package.json', async () => {
    useTmpDir('cli-version-')

    const result = await runCli(['--version'])

    expect(result.ok).toBe(true)
    expect(result.stdout.trim()).toBe(`hono-takibi v${version}`)
  })
})

/**
 * The command describes itself in one place — the help `effect/unstable/cli` generates —
 * and every failure that leaves the caller without a command to run asks for it by
 * raising `ShowHelp`, whether the parser caught it or the handler did.
 *
 * The help goes to stdout and the error to stderr; only a terminal interleaves them.
 */

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

  it('names the config it looked for when there is no input and no config file', async () => {
    const dir = useTmpDir('cli-config-absent-')

    const result = await runCli([])

    expect(result.ok).toBe(false)
    expect(result.stderr).toContain(`Config not found: ${path.join(dir, 'hono-takibi.config.ts')}`)
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
    // A config that is present and wrong already names the field that is wrong; the help
    // the mode failures ask for would only bury it.
    expect(result.stdout).toBe('')
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

  // A split generator writes one file per entry and knows only what it writes, so nothing
  // downstream can notice an entry that left the document. The orphan is not inert: it
  // still imports the schema the document no longer defines.
  it('removes split files for entries the document no longer names', async () => {
    const dir = useTmpDir('cli-config-stale-split-')
    const spec = {
      openapi: '3.1.0',
      info: { title: 'Stale', version: '1.0.0' },
      paths: {
        '/items': { get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } } },
        '/widgets': {
          get: {
            operationId: 'getWidgets',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Widget' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Widget: { type: 'object', properties: { id: { type: 'string' } }, required: ['id'] },
        },
      },
    }
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(spec))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default {
        input: './openapi.json',
        routes: { split: true, output: './src/routes', import: '../routes' },
        components: { schemas: { split: true, output: './src/schemas', import: '../schemas' } },
      }`,
    )

    const initial = await runCli([])
    expect(initial.ok).toBe(true)
    expect(fs.readdirSync(path.join(dir, 'src', 'routes')).sort()).toStrictEqual([
      'getItems.ts',
      'getWidgets.ts',
      'index.ts',
    ])

    fs.writeFileSync(
      path.join(dir, 'openapi.json'),
      JSON.stringify({
        ...spec,
        paths: { '/items': spec.paths['/items'] },
        components: { schemas: {} },
      }),
    )
    const result = await runCli([])

    expect(result.ok).toBe(true)
    expect(fs.readdirSync(path.join(dir, 'src', 'routes')).sort()).toStrictEqual([
      'getItems.ts',
      'index.ts',
    ])
    // The whole section left the document, so the generator writes nothing — the previous
    // directory, barrel included, has to go rather than stand as the current answer.
    expect(fs.readdirSync(path.join(dir, 'src', 'schemas'))).toStrictEqual([])
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

/**
 * Starts the CLI in the background and hands back the lines it has printed so far.
 *
 * A watch run never completes on its own, so the fiber is what the test interrupts —
 * the same thing Ctrl-C does to the real command.
 */
function startCli(argv: readonly string[]) {
  const lines: string[] = []
  const recorder: Console.Console = Object.assign(Object.create(console), {
    log: (...args: readonly unknown[]) => lines.push(args.map(String).join(' ')),
    error: (...args: readonly unknown[]) => lines.push(args.map(String).join(' ')),
  })
  const fiber = Effect.runFork(
    honoTakibi(argv).pipe(
      Effect.provideService(Console.Console, recorder),
      Effect.provide(NodeServices.layer),
    ),
  )
  return { fiber, output: () => lines.join('\n').replaceAll(ANSI, '') }
}

/**
 * Polls until `condition` holds, so a test waits on the watcher rather than on a clock.
 *
 * The budget is a starvation allowance, not an expectation. Each of these tests waits on
 * two real generation passes — oxfmt and ts-morph over real files — while eighty other
 * test files do the same across eight workers. Alone the whole file finishes in three
 * seconds; under the full suite a single pass has been measured at 38s. So the number is
 * large on purpose, and the cost is only paid when the watcher is genuinely broken.
 *
 * Raising it is what worked; the alternative — running this file outside the parallel
 * suite — is not something vite-plus exposes per file.
 */
async function until(condition: () => boolean, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs
  const poll = async (): Promise<boolean> => {
    if (condition()) return true
    if (Date.now() >= deadline) return false
    await new Promise((resolve) => setTimeout(resolve, 50))
    return poll()
  }
  return poll()
}

/** How long a written edit is given to reach the watcher before it is written again. */
const REWRITE_AFTER = 5000

/**
 * Writes `content` to `file` until `condition` holds, and answers whether it ever did.
 *
 * `👀 Watching` is printed before anything is being watched: registering the OS watcher
 * is a `stat` and several async hops behind the message, and an edit that lands in that
 * window is not delivered late, it is never delivered at all. Writing once and waiting
 * would therefore be a coin flip whose odds are set by how loaded the machine is — the
 * window has been measured at 8ms idle here, and the full suite runs eight workers deep.
 *
 * So the edit is repeated rather than assumed. Every attempt is a real edit and a real
 * pass, which is what these tests are about; the repeat only costs anything when the
 * first one lost the race.
 */
async function writeUntil(
  file: string,
  content: string,
  condition: () => boolean,
  timeoutMs = 90_000,
) {
  const deadline = Date.now() + timeoutMs
  const attempt = async (): Promise<boolean> => {
    fs.writeFileSync(file, content)
    if (await until(condition, REWRITE_AFTER)) return true
    if (Date.now() >= deadline) return false
    return attempt()
  }
  return attempt()
}

// Long enough for every `until` in the slowest case to spend its full budget, so a real
// failure still reports as the assertion that failed rather than as a suite timeout.
describe('hono-takibi --watch', { timeout: 300_000 }, () => {
  it('picks up a change to the config file itself', async () => {
    const dir = useTmpDir('cli-watch-config-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, `export default { input: './openapi.json', output: './a.ts' }`)

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)

      expect(
        await writeUntil(
          config,
          `export default { input: './openapi.json', output: './b.ts' }`,
          () => fs.existsSync(path.join(dir, 'b.ts')),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // Also the plain "the document changed, so regenerate" case: the recovery write adds an
  // operation and the assertion is that it reached the output.
  it('keeps watching after a failing pass', async () => {
    const dir = useTmpDir('cli-watch-recover-')
    const input = path.join(dir, 'openapi.json')
    const routes = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './openapi.json', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)

      expect(await writeUntil(input, '{ not json', () => cli.output().includes('❌'))).toBe(true)

      expect(
        await writeUntil(
          input,
          JSON.stringify({
            ...minimalOpenapi,
            paths: {
              '/widgets': {
                get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
              },
            },
          }),
          () => fs.readFileSync(routes, 'utf-8').includes('getWidgetsRoute'),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // A command asked to stay up and react to edits has to treat the first pass as a pass
  // like any other; otherwise one typo in the config ends the session.
  it('stays up when the config does not validate at startup', async () => {
    const dir = useTmpDir('cli-watch-bad-config-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      config,
      `export default { input: './openapi.json', basePath: 'api', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)
      expect(cli.output()).toContain("basePath: must start with '/'")
      expect(fs.existsSync(path.join(dir, 'routes.ts'))).toBe(false)

      expect(
        await writeUntil(
          config,
          `export default { input: './openapi.json', basePath: '/api', output: './routes.ts' }`,
          () => fs.existsSync(path.join(dir, 'routes.ts')),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // The config is fine here and only the document is broken, so the directory to watch
  // is already known. Watching the config alone would leave the fix — an edit to the
  // document — unseen, and the session would sit on the first error forever.
  // ここでは config は正常で、壊れているのはドキュメントだけなので、監視すべき
  // ディレクトリは既に分かっている。config だけを監視すると、修正（ドキュメントの
  // 編集）が検知されず、セッションは最初のエラーのまま止まってしまう。
  it('watches the input when the first pass fails on the document', async () => {
    const dir = useTmpDir('cli-watch-bad-input-')
    const input = path.join(dir, 'openapi.json')
    const routes = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, '{ not json')
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './openapi.json', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)
      expect(cli.output()).toContain('❌')
      expect(cli.output()).toContain(`👀 Watching ${dir} and hono-takibi.config.ts`)
      expect(fs.existsSync(routes)).toBe(false)

      expect(
        await writeUntil(input, JSON.stringify(minimalOpenapi), () => fs.existsSync(routes)),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // The directory to watch comes from the config, so a config that moves `input` has to
  // move the watcher with it rather than leaving it on the old directory.
  it('follows input to another directory when the config moves it', async () => {
    const dir = useTmpDir('cli-watch-moved-input-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.mkdirSync(path.join(dir, 'a'))
    fs.mkdirSync(path.join(dir, 'b'))
    fs.writeFileSync(path.join(dir, 'a', 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(path.join(dir, 'b', 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, `export default { input: './a/openapi.json', output: './routes.ts' }`)

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes(path.join(dir, 'a')))).toBe(true)

      expect(
        await writeUntil(
          config,
          `export default { input: './b/openapi.json', output: './routes.ts' }`,
          () => cli.output().includes(path.join(dir, 'b')),
        ),
      ).toBe(true)

      // Editing the document in the directory the config now names has to rerun. The
      // round restarted to follow it, so this is a second watcher with its own window.
      expect(
        await writeUntil(
          path.join(dir, 'b', 'openapi.json'),
          JSON.stringify({
            ...minimalOpenapi,
            paths: {
              '/widgets': {
                get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
              },
            },
          }),
          () => fs.readFileSync(path.join(dir, 'routes.ts'), 'utf-8').includes('getWidgetsRoute'),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  it('rejects --watch alongside the one-shot flags', async () => {
    const dir = useTmpDir('cli-watch-one-shot-')
    const input = path.join(dir, 'openapi.json')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))

    const cli = startCli([input, '-o', path.join(dir, 'out.ts'), '--watch'])
    const exit = await Effect.runPromise(Fiber.await(cli.fiber))

    expect(exit._tag).toBe('Failure')
    expect(cli.output()).toContain('--watch runs a config file')
  })
})
