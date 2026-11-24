import path from 'node:path'
import { stripVTControlCharacters } from 'node:util'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect } from 'effect'
import { describe, expect, it } from 'vite-plus/test'

import { defineConfig, parseConfig, readConfig } from './index.js'

// What parseConfig fills in for every option a config leaves out.
const PARSED_DEFAULTS = {
  basePath: '/',
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
}

describe('readConfig', () => {
  it('returns error with path when no config file exists', async () => {
    const originalCwd = process.cwd.bind(process)
    const fakeCwd = `/tmp/hono-takibi-test-no-config-${Date.now()}`
    process.cwd = () => fakeCwd
    try {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(readConfig(), NodeFileSystem.layer)),
      )
      const expectedPath = path.resolve(fakeCwd, 'hono-takibi.config.ts')
      expect(result.message).toBe(`Config not found: ${expectedPath}`)
    } finally {
      process.cwd = originalCwd
    }
  })

  it('error message references hono-takibi.config.ts filename', async () => {
    const originalCwd = process.cwd.bind(process)
    const fakeCwd = `/tmp/hono-takibi-test-filename-${Date.now()}`
    process.cwd = () => fakeCwd
    try {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(readConfig(), NodeFileSystem.layer)),
      )
      expect(result.message).toBe(
        `Config not found: ${path.resolve(fakeCwd, 'hono-takibi.config.ts')}`,
      )
    } finally {
      process.cwd = originalCwd
    }
  })

  it('returns ok:true with parsed config when file has a valid default export', async () => {
    const fs = await import('node:fs')
    const dir = fs.mkdtempSync('/tmp/hono-takibi-test-happy-')
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: 'openapi.yaml', output: 'src/routes.ts' }`,
    )
    const originalCwd = process.cwd.bind(process)
    process.cwd = () => dir
    try {
      const result = await Effect.runPromise(Effect.provide(readConfig(), NodeFileSystem.layer))
      expect(result.input).toBe('openapi.yaml')
      expect(result.output).toBe('src/routes.ts')
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('rejects a config file with no default export', async () => {
    const fs = await import('node:fs')
    const dir = fs.mkdtempSync('/tmp/hono-takibi-test-no-default-')
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      // Named export only — no `default`. The dynamic-import branch
      // should refuse with the documented "must export default" string.
      `export const config = { input: 'openapi.yaml' }`,
    )
    const originalCwd = process.cwd.bind(process)
    process.cwd = () => dir
    try {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(readConfig(), NodeFileSystem.layer)),
      )
      expect(result.message).toBe('Config must export default object')
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('rejects a config whose default export is undefined', async () => {
    const fs = await import('node:fs')
    const dir = fs.mkdtempSync('/tmp/hono-takibi-test-undefined-default-')
    // `default` is present, so a shape check that only asks whether the key exists would
    // let this through and hand `undefined` to the config schema.
    fs.writeFileSync(path.join(dir, 'hono-takibi.config.ts'), `export default undefined`)
    const originalCwd = process.cwd.bind(process)
    process.cwd = () => dir
    try {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(readConfig(), NodeFileSystem.layer)),
      )
      expect(result.message).toBe('Config must export default object')
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })

  it('catches a thrown ImportError and surfaces it as an error string', async () => {
    const fs = await import('node:fs')
    const dir = fs.mkdtempSync('/tmp/hono-takibi-test-throws-')
    // Syntactically invalid TS forces the dynamic `import()` to throw —
    // the catch arm should turn that into `{ ok: false, error: <string> }`
    // rather than letting the exception escape to the CLI.
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: 'openapi.yaml' invalid syntax here }`,
    )
    const originalCwd = process.cwd.bind(process)
    process.cwd = () => dir
    try {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(readConfig(), NodeFileSystem.layer)),
      )
      // The parse error, not the missing-file message — the file exists. The transformer
      // colours its report and names the file from the real working directory.
      expect(stripVTControlCharacters(result.message)).toBe(
        [
          'Transform failed with 1 error:',
          '',
          '[PARSE_ERROR] Expected `,` or `}` but found `Identifier`',
          `   ╭─[ ${path.relative(originalCwd(), path.join(dir, 'hono-takibi.config.ts'))}:1:40 ]`,
          '   │',
          " 1 │ export default { input: 'openapi.yaml' invalid syntax here }",
          '   │                ┬                       ───┬───  ',
          '   │                ╰──────────────────────────────── Opened here',
          '   │                                           │     ',
          '   │                                           ╰───── `,` or `}` expected',
          '───╯',
          '',
        ].join('\n'),
      )
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('parseConfig()', () => {
  describe('normalizes output path to /index.ts when split is false', () => {
    it.concurrent('normalizes routes.output when split is undefined', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'routes' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.output).toBe('routes/index.ts')
    })

    it.concurrent('normalizes routes.output when split is false', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'routes', split: false },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.output).toBe('routes/index.ts')
    })

    it.concurrent('keeps routes.output unchanged when already ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'routes/custom.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.output).toBe('routes/custom.ts')
    })

    it.concurrent('keeps routes.output as directory when split is true', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'routes', split: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.output).toBe('routes')
    })

    it.concurrent('normalizes a directory rpc.output', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            rpc: { output: 'rpc' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.rpc?.output).toBe('rpc/index.ts')
    })

    it.concurrent('normalizes components.schemas.output when split is undefined', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: { output: 'schemas' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components?.schemas?.output).toBe('schemas/index.ts')
    })

    it.concurrent('normalizes components.parameters.output when split is false', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              parameters: { output: 'parameters', split: false },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components?.parameters?.output).toBe('parameters/index.ts')
    })

    it.concurrent('keeps components.schemas.output as directory when split is true', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: { output: 'schemas', split: true },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components?.schemas?.output).toBe('schemas')
    })

    it.concurrent('normalizes multiple components at once', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: { output: 'schemas' },
              parameters: { output: 'parameters' },
              responses: { output: 'responses/index.ts' },
              headers: { output: 'headers', split: true },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components?.schemas?.output).toBe('schemas/index.ts')
      expect(result.components?.parameters?.output).toBe('parameters/index.ts')
      expect(result.components?.responses?.output).toBe('responses/index.ts')
      expect(result.components?.headers?.output).toBe('headers')
    })
  })

  describe('readonly option', () => {
    it.concurrent('accepts readonly: true', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            readonly: true,
            components: {
              schemas: { output: 'schemas/index.ts' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.readonly).toBe(true)
    })

    it.concurrent('accepts readonly: false', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            readonly: false,
            components: {
              schemas: { output: 'schemas/index.ts' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.readonly).toBe(false)
    })

    it.concurrent('accepts undefined readonly (optional)', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: { output: 'schemas/index.ts' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.readonly).toBeUndefined()
    })
  })

  describe('mock option', () => {
    it.concurrent('accepts the orval-aligned mock options', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: {
              output: 'src/mock.ts',
              useExamples: false,
              locale: 'ja',
              delay: 500,
              arrayMin: 2,
              arrayMax: 10,
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.output).toBe('src/mock.ts')
      expect(result.mock?.useExamples).toBe(false)
      expect(result.mock?.locale).toBe('ja')
      expect(result.mock?.delay).toBe(500)
      expect(result.mock?.arrayMin).toBe(2)
      expect(result.mock?.arrayMax).toBe(10)
    })

    it.concurrent('accepts delay as a { min, max } range', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'src/mock.ts', delay: { min: 100, max: 500 } },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.delay).toStrictEqual({ min: 100, max: 500 })
    })

    it.concurrent('rejects a delay range with min greater than max', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              mock: { output: 'src/mock.ts', delay: { min: 500, max: 100 } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: mock.delay: delay.min must be <= delay.max. Swap the values or remove one.',
      )
    })

    it.concurrent('accepts delay: false', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'src/mock.ts', delay: false },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.delay).toBe(false)
    })

    it.concurrent('accepts arrayMin equal to arrayMax', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              mock: { output: 'src/mock.ts', arrayMin: 5, arrayMax: 5 },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        mock: { output: 'src/mock.ts', arrayMin: 5, arrayMax: 5 },
      })
    })

    it.concurrent('rejects arrayMin greater than arrayMax', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              mock: { output: 'src/mock.ts', arrayMin: 6, arrayMax: 5 },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: mock: arrayMin must be <= arrayMax. Swap the values or remove one.',
      )
    })

    it.concurrent('rejects a locale that could break out of the import path', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              mock: { output: 'src/mock.ts', locale: '../../../etc/passwd' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        "Invalid config: mock.locale: Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
      )
    })

    it.concurrent("accepts useExamples: 'all'", async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'src/mock.ts', useExamples: 'all' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.useExamples).toBe('all')
    })

    it.concurrent('rejects an unknown useExamples mode', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              mock: { output: 'src/mock.ts', useExamples: 'some' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: mock.useExamples: Expected boolean | "all"')
    })

    it.concurrent('accepts a numeric seed and an array seed', async () => {
      const single = await Effect.runPromise(
        Effect.provide(
          parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', seed: 42 } }),
          NodeFileSystem.layer,
        ),
      )
      expect(single.mock?.seed).toBe(42)
      const array = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'src/mock.ts', seed: [1, 2, 3] },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(array.mock?.seed).toStrictEqual([1, 2, 3])
    })

    it.concurrent.each([
      [-1, 'Invalid config: mock.seed: Expected a value greater than or equal to 0'],
      [1.5, 'Invalid config: mock.seed: Expected an integer'],
      [
        4_294_967_296,
        'Invalid config: mock.seed: Expected a value less than or equal to 4294967295',
      ],
      [[], 'Invalid config: mock.seed.0: Missing key'],
      ['42', 'Invalid config: mock.seed: Expected number | array'],
    ])('rejects the seed %j', async (seed, message) => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', seed } }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(message)
    })
  })

  describe('routes.package and webhooks.package', () => {
    it.concurrent('preserves routes.package through parsing', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'src/routes.ts', package: '@packages/routes' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.package).toBe('@packages/routes')
      expect(result.routes?.output).toBe('src/routes.ts')
    })

    it.concurrent('preserves routes.package with split and pathAlias', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            pathAlias: '@/',
            routes: { output: 'src/routes', split: true, package: '@packages/routes' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.package).toBe('@packages/routes')
      expect(result.routes?.output).toBe('src/routes')
      expect(result.pathAlias).toBe('@/')
    })

    // A generated file imports another one relatively, under the alias, or by package:
    // the module is not named by hand any more.
    // 生成ファイルは相対パス、エイリアス、または package でほかのファイルを import する。
    // モジュール名を手で指定することはなくなった。
    it.concurrent('fails when routes still sets the removed import', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              routes: { output: 'src/routes.ts', import: '@packages/routes' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: routes.import: import was removed: a generated file imports another one relatively, under pathAlias inside the directory of the app entry, or by package from another package.',
      )
    })

    // The alias applies to every generated file of the package, so it is no option of the
    // scaffold any more.
    // エイリアスはパッケージの生成ファイルすべてに効くため、scaffold のオプションではなくなった。
    it.concurrent('fails when template still sets the moved pathAlias', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: { pathAlias: '@/' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: template.pathAlias: pathAlias was moved to the top level: it applies to every generated file of this package, not only to the scaffold.',
      )
    })

    it.concurrent('routes without import field works (backward compat)', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'src/routes.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.routes?.import).toBeUndefined()
    })

    it.concurrent('preserves webhooks.package through parsing', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            webhooks: { output: 'src/webhooks.ts', package: '@packages/webhooks' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.webhooks?.package).toBe('@packages/webhooks')
    })
  })

  describe('validation errors', () => {
    it.concurrent('fails when split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              routes: { output: 'routes/index.ts', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: routes: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when rpc still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              rpc: { output: 'rpc', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('fails when input is not .yaml, .yml, .json, or .tsp', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.txt' as `${string}.yaml`,
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: input: must be .yaml | .yml | .json | .tsp, or an http(s) URL',
      )
    })

    // #373: a document served without an extension is OpenAPI by content.
    it.concurrent('accepts an http(s) URL whatever its path looks like', async () => {
      const url = 'https://example.com/openapi/'
      const withSlash = await Effect.runPromise(
        Effect.provide(parseConfig({ input: url }), NodeFileSystem.layer),
      )
      expect(withSlash.input).toBe(url)
      const plain = 'http://localhost:3000/openapi'
      const withoutExtension = await Effect.runPromise(
        Effect.provide(parseConfig({ input: plain }), NodeFileSystem.layer),
      )
      expect(withoutExtension.input).toBe(plain)
    })

    // #362: `.yml` is the extension many published documents use (LINE's, for one).
    it.concurrent('accepts a .yml document, local or by URL', async () => {
      const local = await Effect.runPromise(
        Effect.provide(parseConfig({ input: 'openapi.yml' }), NodeFileSystem.layer),
      )
      expect(local.input).toBe('openapi.yml')
      const url = 'https://raw.githubusercontent.com/line/line-openapi/main/shop.yml'
      const remote = await Effect.runPromise(
        Effect.provide(parseConfig({ input: url }), NodeFileSystem.layer),
      )
      expect(remote.input).toBe(url)
    })

    // rpc and the hooks call the client the client block generates: they no longer name
    // the module or the export of a client of their own.
    // rpc とフックは client ブロックが生成するクライアントを呼び出す。独自のクライアントの
    // モジュールやエクスポート名は指定できない。
    it.concurrent('fails when rpc still sets the removed client', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              rpc: { output: 'rpc/index.ts', client: 'authClient' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.client: client was removed: the generated client is exported as `client`, and a group of a split app as `<group>Client`.',
      )
    })

    it.concurrent('fails when rpc still sets the removed import', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              rpc: { output: 'rpc.ts', import: '../client' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.import: import was removed: rpc and the hooks import the client the client block generates. A file written into another package imports it by client.package.',
      )
    })

    it.concurrent('fails when swr still sets the removed import', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              swr: { output: 'swr.ts', import: '../lib' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: swr.import: import was removed: rpc and the hooks import the client the client block generates. A file written into another package imports it by client.package.',
      )
    })

    it.concurrent('fails when client.import carries a quote', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts', import: "@packages/server'" },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: client.import: must be a module specifier, with no whitespace or quotes',
      )
    })

    it.concurrent('fails when client.package is empty', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts', package: '' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: client.package: must be a module specifier, with no whitespace or quotes',
      )
    })
  })

  // Every generator runs concurrently against its own output, so two of them aimed at
  // one path means whichever finishes last wins — and both still report success.
  describe('output path collisions', () => {
    it.concurrent('fails when two generators declare the same output file', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: './src/api.ts',
              type: { output: 'src/api.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: type.output and output both write to src/api.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when a directory output normalizes onto another output', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/api/index.ts',
              mock: { output: 'src/api' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: mock.output and output both write to src/api/index.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when two component sections share a split directory', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: {
                schemas: { output: './src/gen', split: true },
                responses: { output: 'src/gen', split: true },
              },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.responses.output and components.schemas.output both write to src/gen. Give each generator its own output path.',
      )
    })

    it.concurrent('accepts distinct outputs across every generator', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            type: { output: 'src/types.ts' },
            rpc: { output: 'src/rpc.ts' },
            mock: { output: 'src/mock.ts' },
            docs: { output: 'docs/api.md' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.output).toBe('src/routes.ts')
    })
  })

  describe('format option', () => {
    it.concurrent('accepts format with standard options', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            format: {
              printWidth: 80,
              semi: true,
              singleQuote: false,
              tabWidth: 4,
              useTabs: false,
              trailingComma: 'es5',
              arrowParens: 'avoid',
              bracketSpacing: true,
              bracketSameLine: false,
              objectWrap: 'collapse',
              endOfLine: 'lf',
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.format?.printWidth).toBe(80)
      expect(result.format?.semi).toBe(true)
      expect(result.format?.singleQuote).toBe(false)
      expect(result.format?.arrowParens).toBe('avoid')
    })

    it.concurrent('accepts format with sort options', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            format: {
              sortImports: {
                order: 'asc',
                newlinesBetween: true,
                ignoreCase: true,
              },
              sortPackageJson: true,
              sortTailwindcss: {
                functions: ['clsx', 'cva'],
                attributes: ['myClass'],
              },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(
        typeof result.format?.sortImports === 'object'
          ? result.format.sortImports.order
          : undefined,
      ).toBe('asc')
      expect(result.format?.sortPackageJson).toBe(true)
      expect(
        typeof result.format?.sortTailwindcss === 'object'
          ? result.format.sortTailwindcss.functions
          : undefined,
      ).toStrictEqual(['clsx', 'cva'])
    })

    it.concurrent('accepts config without format (optional)', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'routes.ts',
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.format).toBeUndefined()
    })

    it.concurrent('accepts any format value (delegated to oxfmt)', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              format: { unknownOption: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        format: { unknownOption: true },
      })
    })
  })

  describe('output and routes mutual exclusivity', () => {
    it.concurrent('fails when both output and routes are specified', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              routes: { output: 'src/routes' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
      )
    })

    it.concurrent('passes with output only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: 'src/routes.ts',
      })
    })

    it.concurrent('passes with routes only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              routes: { output: 'src/routes.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        routes: { output: 'src/routes.ts', split: false },
      })
    })

    it.concurrent('passes with neither output nor routes', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              exportSchemas: true,
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({ input: 'openapi.yaml', ...PARSED_DEFAULTS, exportSchemas: true })
    })
  })

  describe('template define / routeHandler mutual exclusivity', () => {
    it.concurrent('selects the define variant and drops routeHandler when define is true', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true, routeHandler: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.template?.define).toBe(true)
    })

    it.concurrent('passes when define is true and output is omitted', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            template: { define: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.output).toBeUndefined()
      expect(result.template?.define).toBe(true)
    })

    it.concurrent('fails when define is true and output is not an index.ts file', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: './src/routes.ts',
              template: { define: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, output is the app entry and must be an index.ts file (e.g. ./src/index.ts), or omitted to default to src/index.ts. Other names collide with the derived routes/ directory.',
      )
    })

    it.concurrent('passes when define is true and output is a relocated index.ts', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: './server/index.ts',
              template: { define: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: './server/index.ts',
        template: { define: true, split: false },
      })
    })

    it.concurrent('passes when define is true and output is a bare index.ts', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'index.ts',
              template: { define: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: 'index.ts',
        template: { define: true, split: false },
      })
    })

    it.concurrent('fails when define is true and a per-type component output is specified', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { schemas: { output: 'src/schemas', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, per-type component outputs (components.schemas, components.responses, ...) are not supported. Use components.output for a single components file.',
      )
    })

    it.concurrent('passes when define is true and components.output is specified', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { output: 'shared/components.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        template: { define: true, split: false },
        components: { output: 'shared/components.ts' },
      })
    })

    it.concurrent('fails when define is true and components.output hits the app entry', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: './src/index.ts',
              template: { define: true },
              components: { output: 'src/index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when define is true and components.output is inside the derived routes dir', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { output: './src/routes/index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('passes when define is true with both output and a non-colliding components.output', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/index.ts',
              template: { define: true },
              components: { output: 'shared/components.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: 'src/index.ts',
        template: { define: true, split: false },
        components: { output: 'shared/components.ts' },
      })
    })

    it.concurrent('passes when define is true and only components.output anchors the layout', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { output: './server/components/index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        template: { define: true, split: false },
        components: { output: './server/components/index.ts' },
      })
    })

    it.concurrent('fails when the anchor derived from components.output puts components inside routes/', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { output: './server/routes/index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when a bare components.output collides with the derived app entry', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              template: { define: true },
              components: { output: 'index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when define is true and routes is specified', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              routes: { output: 'src/routes.ts' },
              template: { define: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: template.define and routes are mutually exclusive. define derives routes/ next to the app entry (output, default src/index.ts).',
      )
    })

    it.concurrent('passes with define only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/index.ts',
              template: { define: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: 'src/index.ts',
        template: { define: true, split: false },
      })
    })

    it.concurrent('passes with routeHandler only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/index.ts',
              template: { routeHandler: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        output: 'src/index.ts',
        template: { define: false, routeHandler: true, split: false },
      })
    })

    it.concurrent('ignores a removed template.output key in both variants', async () => {
      const defineResult = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true, output: 'src/controllers' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect('output' in (defineResult.template ?? {})).toBe(false)
      const nonDefineResult = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { output: 'src/controllers' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(nonDefineResult.template?.define).toBe(false)
      expect('output' in (nonDefineResult.template ?? {})).toBe(false)
    })
  })

  describe('components.output / per-type mutual exclusivity', () => {
    it.concurrent('fails when both output and a per-type component are specified', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: {
                output: 'src/components/index.ts',
                schemas: { output: 'src/schemas' },
              },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components: components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
      )
    })

    it.concurrent('passes with components.output only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { output: 'src/components/index.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        components: { output: 'src/components/index.ts' },
      })
    })

    it.concurrent('passes with per-type components only', async () => {
      await expect(
        Effect.runPromise(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { schemas: { output: 'src/schemas' } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      ).resolves.toStrictEqual({
        input: 'openapi.yaml',
        ...PARSED_DEFAULTS,
        components: {
          schemas: { output: 'src/schemas/index.ts', split: false, exportTypes: false },
        },
      })
    })
  })

  describe('basePath option', () => {
    it.concurrent('accepts top-level basePath', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            basePath: '/api',
            output: 'src/routes.ts',
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.basePath).toBe('/api')
    })

    it.concurrent('defaults basePath to "/" when omitted', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.basePath).toBe('/')
    })

    // The value reaches the app as `new OpenAPIHono().basePath('<basePath>')`, so a
    // missing slash mounts nothing and a quote ends the literal early.
    it.concurrent('fails when basePath has no leading slash', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              basePath: 'api',
              output: 'src/routes.ts',
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        "Invalid config: basePath: must start with '/' and contain no whitespace or quotes",
      )
    })

    it.concurrent('fails when basePath would close the generated string literal', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              basePath: "/a')\nconsole.log('pwned",
              output: 'src/routes.ts',
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        "Invalid config: basePath: must start with '/' and contain no whitespace or quotes",
      )
    })
  })

  describe('test option', () => {
    // Test code generation is deprecated: hono-takibi no longer generates test files.
    // テストコード生成は廃止された。hono-takibi はテストファイルを生成しない。
    it.concurrent('fails when test is set', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              test: { output: 'src/index.test.ts', import: './index' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: test: test was removed: hono-takibi no longer generates test files.',
      )
    })

    it.concurrent('fails when template still sets the removed test', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: { test: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: template.test: test was removed: hono-takibi no longer generates test files. The `.test.ts` files a previous run wrote are yours to keep or delete.',
      )
    })

    it.concurrent('fails when template still sets the removed testFramework', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: { testFramework: 'bun' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: template.testFramework: testFramework was removed: hono-takibi no longer generates test files.',
      )
    })
  })

  describe('input accepts all supported extensions', () => {
    it.concurrent('accepts .json input', async () => {
      const result = await Effect.runPromise(
        Effect.provide(parseConfig({ input: 'openapi.json' }), NodeFileSystem.layer),
      )
      expect(result.input).toBe('openapi.json')
    })

    it.concurrent('accepts .tsp input', async () => {
      const result = await Effect.runPromise(
        Effect.provide(parseConfig({ input: 'main.tsp' }), NodeFileSystem.layer),
      )
      expect(result.input).toBe('main.tsp')
    })
  })

  describe('minimal config (input only)', () => {
    it.concurrent('accepts config with only input field', async () => {
      const result = await Effect.runPromise(
        Effect.provide(parseConfig({ input: 'openapi.yaml' }), NodeFileSystem.layer),
      )
      expect(result.input).toBe('openapi.yaml')
      expect(result.rpc).toBeUndefined()
    })
  })

  describe('parseConfig error formatting', () => {
    it.concurrent('includes path in error message when path is present', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              rpc: { output: 'rpc/index.ts', parseResponse: 123 },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: rpc.parseResponse: Expected boolean | undefined')
    })

    it.concurrent('omits path prefix when path is empty', async () => {
      const result = await Effect.runPromise(
        Effect.flip(Effect.provide(parseConfig(null), NodeFileSystem.layer)),
      )
      expect(result.message).toBe('Invalid config: Expected object')
    })
  })

  describe('type option', () => {
    it.concurrent('accepts type with output', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            type: { output: 'types/index.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.type?.output).toBe('types/index.ts')
    })

    it.concurrent('accepts type with readonly', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            type: { output: 'types/index.ts', readonly: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.type?.readonly).toBe(true)
    })

    it.concurrent('fails when type output is not .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              type: { output: 'types/index.js' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: type.output: must be .ts file')
    })
  })

  describe('docs option', () => {
    it.concurrent('accepts docs with .md output', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            docs: { output: 'docs/api.md' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.docs?.output).toBe('docs/api.md')
    })

    it.concurrent('accepts docs with entry', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            docs: { output: 'docs/api.md', entry: './src/index.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.docs?.entry).toBe('./src/index.ts')
    })

    it.concurrent('accepts docs with curl and baseUrl', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            docs: { output: 'docs/api.md', curl: true, baseUrl: 'https://api.example.com' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.docs?.curl).toBe(true)
      expect(result.docs?.baseUrl).toBe('https://api.example.com')
    })

    it.concurrent('fails when docs output is not .md', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              docs: { output: 'docs/api.txt' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: docs.output: must be .md file')
    })

    it.concurrent('fails when curl is true and entry is specified', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              docs: {
                output: 'docs/api.md',
                curl: true,
                baseUrl: 'https://api.example.com',
                entry: './src/index.ts',
              },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: docs.entry: entry cannot be specified when curl is true',
      )
    })

    it.concurrent('fails when curl is true and baseUrl is missing', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              docs: { output: 'docs/api.md', curl: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: docs.baseUrl: baseUrl is required when curl is true',
      )
    })
  })

  describe('mock option shorthands', () => {
    it.concurrent('accepts mock with output', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'mock' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.output).toBe('mock/index.ts')
    })

    it.concurrent('keeps mock output when already .ts', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'mock/index.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.mock?.output).toBe('mock/index.ts')
    })
  })

  describe('query client options', () => {
    it.concurrent('accepts swr config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            swr: { output: 'swr' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.swr?.output).toBe('swr/index.ts')
    })

    // A generator that calls the client needs the client block, whatever else is set.
    // クライアントを呼び出す生成器には、ほかに何があっても client ブロックが必要である。
    it.concurrent('fails when rpc has no client block', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              rpc: { output: 'rpc.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc needs client: rpc and the hooks call the client the client block generates, with template.',
      )
    })

    // The same for a hook library.
    // フックのライブラリも同様である。
    it.concurrent('fails when tanstack-query has no client block', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              'tanstack-query': { output: 'query.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: tanstack-query needs client: rpc and the hooks call the client the client block generates, with template.',
      )
    })

    // template alone scaffolds no client.
    // template だけではクライアントは生成されない。
    it.concurrent('fails when rpc has template and no client block', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: { routeHandler: true },
              rpc: { output: 'src/rpc.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc needs client: rpc and the hooks call the client the client block generates, with template.',
      )
    })

    // The client block cannot stand alone: it needs template.
    // client ブロックは単体では指定できず、template が必要である。
    it.concurrent('fails when client is set without template and with rpc', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              client: { output: 'src/client.ts' },
              rpc: { output: 'src/rpc.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: client needs template: the client is typed by the app the template scaffolds.',
      )
    })

    // With template and client, rpc and a hook library are accepted together.
    // template と client があれば、rpc とフックのライブラリは併せて受け付けられる。
    it.concurrent('accepts rpc and swr with template and client', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: { routeHandler: true },
            client: { output: 'src/client.ts' },
            rpc: { output: 'src/rpc.ts' },
            swr: { output: 'src/swr.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.rpc?.output).toBe('src/rpc.ts')
      expect(result.swr?.output).toBe('src/swr.ts')
      expect(result.client).toStrictEqual({ output: 'src/client.ts', baseUrl: '/' })
    })

    // The client names the module of the app, and the package other packages import it by.
    // client は、アプリのモジュールと、他のパッケージが client を import するパッケージ名を指定する。
    it.concurrent('accepts client.import and client.package', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true },
            client: {
              output: '../client/src/lib/client.ts',
              import: '@packages/server',
              package: '@packages/client',
            },
            'tanstack-query': { output: '../web/src/api/hooks.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.client).toStrictEqual({
        output: '../client/src/lib/client.ts',
        baseUrl: '/',
        import: '@packages/server',
        package: '@packages/client',
      })
    })

    // The client is typed by the app the template scaffolds.
    // クライアントは、template が生成するアプリで型付けされる。
    it.concurrent('fails when a client is set without a template', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              client: { output: 'src/client.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: client needs template: the client is typed by the app the template scaffolds.',
      )
    })

    // split is off unless it is asked for, in every mode of the template.
    // split は、template のどのモードでも、指定しない限り無効である。
    it.concurrent('defaults template.split to false', async () => {
      const inline = await Effect.runPromise(
        Effect.provide(
          parseConfig({ input: 'openapi.yaml', output: 'src/routes.ts', template: {} }),
          NodeFileSystem.layer,
        ),
      )
      const defined = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(inline.template?.split).toBe(false)
      expect(defined.template?.split).toBe(false)
    })

    // split is taken in every mode of the template.
    // split は、template のどのモードでも指定できる。
    it.concurrent('accepts template.split in every mode', async () => {
      const handler = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: { routeHandler: true, split: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      const inline = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: { split: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      const defined = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true, split: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(handler.template?.split).toBe(true)
      expect(inline.template?.split).toBe(true)
      expect(defined.template?.split).toBe(true)
    })

    // A URL differs between environments, so it is read from one and never written in.
    // URL は環境ごとに違うので、環境から読む。ファイルに書き込むことはない。
    it.concurrent('refuses a fixed URL as client.baseUrl', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts', baseUrl: 'http://localhost:3000' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        "Invalid config: client.baseUrl: a fixed URL was removed: leave baseUrl out (or set '/') for the same origin, or read it from the environment with { env } or { env, import }",
      )
    })

    // A variable is read from import.meta.env unless the config says otherwise.
    // 変数は、設定で指定しない限り import.meta.env から読み取られる。
    it.concurrent('reads a variable from import.meta.env by default', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts', baseUrl: { env: 'VITE_API_URL' } },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.client?.baseUrl).toStrictEqual({
        env: 'VITE_API_URL',
        source: 'import.meta.env',
      })
    })

    // process.env is what Node.js reads the environment from.
    // process.env は、Node.js が環境を読み取る場所である。
    it.concurrent('reads a variable from process.env when the config says so', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', source: 'process.env' } },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.client?.baseUrl).toStrictEqual({ env: 'API_URL', source: 'process.env' })
    })

    // An object that names a module is read as one, and the export is env by default.
    // モジュールを指定したオブジェクトは、そのとおりに読み取られる。export 名のデフォルトは
    // env である。
    it.concurrent('reads a property of an environment a module exports', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', import: '@/env' } },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.client?.baseUrl).toStrictEqual({
        env: 'API_URL',
        import: '@/env',
        name: 'env',
      })
    })

    // The name of the export is the one the config gives.
    // export の名前は、設定で指定されたものになる。
    it.concurrent('imports the environment under the name the config gives', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: {
              output: 'src/client.ts',
              baseUrl: { env: 'API_URL', import: '../config', name: 'config' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.client?.baseUrl).toStrictEqual({
        env: 'API_URL',
        import: '../config',
        name: 'config',
      })
    })

    // The name is written after a dot, so it has to be one a dot can be followed by.
    // 名前はドットの後ろに書かれるため、ドットに続けて書ける名前でなければならない。
    it.concurrent('fails when the name of the variable is no identifier', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: {
                output: 'src/client.ts',
                baseUrl: { env: 'API-URL', source: 'process.env' },
              },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: client.baseUrl.env: must be the name of an environment variable',
      )
    })

    // A URL with a quote in it would end the string it is written into.
    // 引用符を含む URL は、書き込まれる先の文字列を途中で終わらせてしまう。
    it.concurrent('fails when the URL holds a quote', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts', baseUrl: "http://x'" },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        "Invalid config: client.baseUrl: a fixed URL was removed: leave baseUrl out (or set '/') for the same origin, or read it from the environment with { env } or { env, import }",
      )
    })

    // The client is a TypeScript file.
    // クライアントは、TypeScript のファイルである。
    it.concurrent('fails when client.output is no .ts file', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: client.output: must be .ts file')
    })

    // Two generators cannot write the same file.
    // 2つの生成器が、同じファイルに書き出すことはできない。
    it.concurrent('fails when the client and rpc are written to the same file', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              rpc: { output: 'src/client.ts' },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.output and client.output both write to src/client.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when swr still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              swr: { output: 'swr', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: swr.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts tanstack-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'tanstack-query': { output: 'tanstack' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['tanstack-query']?.output).toBe('tanstack/index.ts')
    })

    it.concurrent('fails when tanstack-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'tanstack-query': { output: 'tanstack', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: tanstack-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts svelte-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'svelte-query': { output: 'svelte' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['svelte-query']?.output).toBe('svelte/index.ts')
    })

    it.concurrent('fails when svelte-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'svelte-query': { output: 'svelte', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: svelte-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts vue-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'vue-query': { output: 'vue' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['vue-query']?.output).toBe('vue/index.ts')
    })

    it.concurrent('fails when vue-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'vue-query': { output: 'vue', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: vue-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts preact-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'preact-query': { output: 'preact' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['preact-query']?.output).toBe('preact/index.ts')
    })

    it.concurrent('fails when preact-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'preact-query': { output: 'preact', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: preact-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts solid-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'solid-query': { output: 'solid' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['solid-query']?.output).toBe('solid/index.ts')
    })

    it.concurrent('fails when solid-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'solid-query': { output: 'solid', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: solid-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts angular-query config', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            'angular-query': { output: 'angular' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result['angular-query']?.output).toBe('angular/index.ts')
    })

    it.concurrent('fails when angular-query still sets the removed split', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              client: { output: 'src/client.ts' },
              'angular-query': { output: 'angular', split: true },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: angular-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })
  })

  describe('rpc.parseResponse option', () => {
    it.concurrent('accepts parseResponse: true', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            rpc: { output: 'rpc/index.ts', parseResponse: true },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.rpc?.parseResponse).toBe(true)
    })

    it.concurrent('parseResponse defaults to false when omitted', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            rpc: { output: 'rpc/index.ts' },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.rpc?.parseResponse).toBe(false)
    })
  })

  describe('output validation', () => {
    it.concurrent('fails when output is not .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'routes/index.js',
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe('Invalid config: output: must be .ts file')
    })
  })

  describe('components split validation', () => {
    it.concurrent('fails when schemas split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { schemas: { output: 'schemas/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.schemas: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when securitySchemes split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { securitySchemes: { output: 'schemes/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.securitySchemes: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when requestBodies split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { requestBodies: { output: 'bodies/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.requestBodies: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when responses split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { responses: { output: 'responses/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.responses: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when examples split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { examples: { output: 'examples/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.examples: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when links split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { links: { output: 'links/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.links: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when callbacks split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { callbacks: { output: 'callbacks/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.callbacks: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when pathItems split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { pathItems: { output: 'items/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.pathItems: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when mediaTypes split is true but output ends with .ts', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { mediaTypes: { output: 'media/index.ts', split: true } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.mediaTypes: split mode requires directory, not .ts file',
      )
    })
  })

  describe('components full value normalization', () => {
    it.concurrent('split=false: normalizes every component output and applies defaults', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'routes.ts',
            components: {
              schemas: { output: 'schemas' },
              responses: { output: 'responses' },
              parameters: { output: 'parameters' },
              examples: { output: 'examples' },
              requestBodies: { output: 'requestBodies' },
              headers: { output: 'headers' },
              securitySchemes: { output: 'securitySchemes' },
              links: { output: 'links' },
              callbacks: { output: 'callbacks' },
              pathItems: { output: 'pathItems' },
              mediaTypes: { output: 'mediaTypes' },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components).toStrictEqual({
        schemas: { split: false, output: 'schemas/index.ts', exportTypes: false },
        responses: { split: false, output: 'responses/index.ts' },
        parameters: { split: false, output: 'parameters/index.ts', exportTypes: false },
        examples: { split: false, output: 'examples/index.ts' },
        requestBodies: { split: false, output: 'requestBodies/index.ts' },
        headers: { split: false, output: 'headers/index.ts', exportTypes: false },
        securitySchemes: { split: false, output: 'securitySchemes/index.ts' },
        links: { split: false, output: 'links/index.ts' },
        callbacks: { split: false, output: 'callbacks/index.ts' },
        pathItems: { split: false, output: 'pathItems/index.ts' },
        mediaTypes: { split: false, output: 'mediaTypes/index.ts', exportTypes: false },
      })
    })

    it.concurrent('split=true: keeps every component output as directory and applies defaults', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: { output: 'schemas', split: true },
              responses: { output: 'responses', split: true },
              parameters: { output: 'parameters', split: true },
              examples: { output: 'examples', split: true },
              requestBodies: { output: 'requestBodies', split: true },
              headers: { output: 'headers', split: true },
              securitySchemes: { output: 'securitySchemes', split: true },
              links: { output: 'links', split: true },
              callbacks: { output: 'callbacks', split: true },
              pathItems: { output: 'pathItems', split: true },
              mediaTypes: { output: 'mediaTypes', split: true },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components).toStrictEqual({
        schemas: { split: true, output: 'schemas', exportTypes: false },
        responses: { split: true, output: 'responses' },
        parameters: { split: true, output: 'parameters', exportTypes: false },
        examples: { split: true, output: 'examples' },
        requestBodies: { split: true, output: 'requestBodies' },
        headers: { split: true, output: 'headers', exportTypes: false },
        securitySchemes: { split: true, output: 'securitySchemes' },
        links: { split: true, output: 'links' },
        callbacks: { split: true, output: 'callbacks' },
        pathItems: { split: true, output: 'pathItems' },
        mediaTypes: { split: true, output: 'mediaTypes', exportTypes: false },
      })
    })

    it.concurrent('preserves exportTypes: true and package on a split component', async () => {
      const result = await Effect.runPromise(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: {
              schemas: {
                output: 'schemas',
                split: true,
                exportTypes: true,
                package: '@packages/schemas',
              },
            },
          }),
          NodeFileSystem.layer,
        ),
      )
      expect(result.components?.schemas).toStrictEqual({
        split: true,
        output: 'schemas',
        package: '@packages/schemas',
        exportTypes: true,
      })
    })

    it.concurrent('fails when a split component still sets the removed import', async () => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              components: { schemas: { output: 'schemas', split: true, import: '@/schemas' } },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        'Invalid config: components.schemas.import: import was removed: a generated file imports another one relatively, under pathAlias inside the directory of the app entry, or by package from another package.',
      )
    })
  })
})

// Every generator that calls the client, and every component output, is held to the same
// rules; the loops keep a kind from being left out when one is added.
// クライアントを呼び出す生成器と、コンポーネントの出力は、すべて同じ規則に従う。ループは、
// 種類が増えたときに取りこぼしを防ぐ。
const CALLERS = [
  'rpc',
  'swr',
  'tanstack-query',
  'preact-query',
  'solid-query',
  'vue-query',
  'svelte-query',
  'angular-query',
] as const

const COMPONENT_NAMES = [
  'schemas',
  'responses',
  'parameters',
  'examples',
  'requestBodies',
  'headers',
  'securitySchemes',
  'links',
  'callbacks',
  'pathItems',
  'mediaTypes',
] as const

describe('every generator that calls the client', () => {
  it.concurrent.each(CALLERS)('%s fails without the client block', async (kind) => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig({ input: 'openapi.yaml', [kind]: { output: `src/${kind}.ts` } }),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      `Invalid config: ${kind} needs client: rpc and the hooks call the client the client block generates, with template.`,
    )
  })

  it.concurrent.each(CALLERS)(
    '%s fails with template and without the client block',
    async (kind) => {
      const result = await Effect.runPromise(
        Effect.flip(
          Effect.provide(
            parseConfig({
              input: 'openapi.yaml',
              output: 'src/routes.ts',
              template: {},
              [kind]: { output: `src/${kind}.ts` },
            }),
            NodeFileSystem.layer,
          ),
        ),
      )
      expect(result.message).toBe(
        `Invalid config: ${kind} needs client: rpc and the hooks call the client the client block generates, with template.`,
      )
    },
  )

  it.concurrent.each(CALLERS)('%s is accepted with template and client', async (kind) => {
    const result = await Effect.runPromise(
      Effect.provide(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts' },
          [kind]: { output: `src/${kind}.ts` },
        }),
        NodeFileSystem.layer,
      ),
    )
    expect(result[kind]?.output).toBe(`src/${kind}.ts`)
  })

  it.concurrent.each(CALLERS)('%s refuses the removed import', async (kind) => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            [kind]: { output: `src/${kind}.ts`, import: '../lib' },
          }),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      `Invalid config: ${kind}.import: import was removed: rpc and the hooks import the client the client block generates. A file written into another package imports it by client.package.`,
    )
  })

  it.concurrent.each(CALLERS)('%s refuses the removed client name', async (kind) => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
            template: {},
            client: { output: 'src/client.ts' },
            [kind]: { output: `src/${kind}.ts`, client: 'apiClient' },
          }),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      `Invalid config: ${kind}.client: client was removed: the generated client is exported as \`client\`, and a group of a split app as \`<group>Client\`.`,
    )
  })
})

describe('every component output', () => {
  it.concurrent.each(COMPONENT_NAMES)('%s takes a package', async (kind) => {
    const result = await Effect.runPromise(
      Effect.provide(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            [kind]: { output: `src/${kind}`, split: true, package: `@packages/${kind}` },
          },
        }),
        NodeFileSystem.layer,
      ),
    )
    expect(result.components?.[kind]?.package).toBe(`@packages/${kind}`)
  })

  it.concurrent.each(COMPONENT_NAMES)('%s refuses the removed import', async (kind) => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: { [kind]: { output: `src/${kind}`, split: true, import: `../${kind}` } },
          }),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      `Invalid config: components.${kind}.import: import was removed: a generated file imports another one relatively, under pathAlias inside the directory of the app entry, or by package from another package.`,
    )
  })

  it.concurrent('components.output takes a package', async () => {
    const result = await Effect.runPromise(
      Effect.provide(
        parseConfig({
          input: 'openapi.yaml',
          components: { output: 'src/components/index.ts', package: '@packages/components' },
        }),
        NodeFileSystem.layer,
      ),
    )
    expect(result.components?.package).toBe('@packages/components')
  })

  it.concurrent('fails when components.package is set without components.output', async () => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig({
            input: 'openapi.yaml',
            components: { package: '@packages/components', schemas: { output: 'src/schemas' } },
          }),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      'Invalid config: components: components.package goes with components.output: a per-type output names its package in its own block.',
    )
  })

  it.concurrent.each(['routes', 'webhooks'] as const)('%s takes a package', async (kind) => {
    const result = await Effect.runPromise(
      Effect.provide(
        parseConfig({
          input: 'openapi.yaml',
          [kind]: { output: `src/${kind}`, split: true, package: `@packages/${kind}` },
        }),
        NodeFileSystem.layer,
      ),
    )
    expect(result[kind]?.package).toBe(`@packages/${kind}`)
  })
})

describe('defineConfig', () => {
  // A value that is not a literal is left to the check made when the config is read.
  // リテラルでない値は、設定を読み込むときの検証に委ねられる。
  it('accepts values that are not literals', () => {
    const output = ['src', 'routes'].join('/')
    const basePath = ['', 'api'].join('/')
    const config = defineConfig({
      input: 'openapi.yaml',
      basePath,
      routes: { output, split: true },
      webhooks: { output },
    })
    expect(config.routes?.output).toBe('src/routes')
  })

  // Every generator together, as the documentation lists them, compiles.
  // ドキュメントに載せているとおり、すべての生成器を併せて指定してもコンパイルできる。
  it('accepts every generator with template.define and client', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/index.ts',
      basePath: '/api',
      pathAlias: '@/',
      template: { define: true, split: true },
      components: { output: 'src/components/index.ts' },
      type: { output: 'src/types.ts' },
      client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', import: '@/env' } },
      rpc: { output: 'src/rpc.ts' },
      swr: { output: 'src/swr.ts' },
      'tanstack-query': { output: 'src/tanstack-query.ts' },
      'preact-query': { output: 'src/preact-query.ts' },
      'solid-query': { output: 'src/solid-query.ts' },
      'vue-query': { output: 'src/vue-query.ts' },
      'svelte-query': { output: 'src/svelte-query.ts' },
      'angular-query': { output: 'src/angular-query.ts' },
      mock: { output: 'src/mock.ts', delay: { min: 100, max: 800 } },
      docs: { output: 'docs/api.md', curl: true, baseUrl: 'http://localhost:3000' },
    })
    expect(config.output).toBe('src/index.ts')
  })

  // The single components file names its package beside its output.
  // 単一の components ファイルは、output の隣で package を指定する。
  it('accepts components.package with components.output', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      routes: { output: 'src/routes', split: true },
      components: { output: 'src/components/index.ts', package: '@packages/components' },
    })
    expect(config.components?.package).toBe('@packages/components')
  })

  // The split outputs with their packages compile.
  // 分割出力と、その package の指定はコンパイルできる。
  it('accepts a package on every split output', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      routes: { output: 'src/routes', split: true, package: '@packages/routes' },
      webhooks: { output: 'src/webhooks', split: true, package: '@packages/webhooks' },
      components: {
        schemas: { output: 'src/schemas', split: true, package: '@packages/schemas' },
        securitySchemes: {
          output: 'src/securitySchemes',
          split: true,
          package: '@packages/securitySchemes',
        },
      },
    })
    expect(config.components?.schemas?.package).toBe('@packages/schemas')
  })

  it('returns the config object as-is', () => {
    const config = {
      input: 'openapi.yaml' as const,
      output: 'routes.ts' as const,
    }
    expect(defineConfig(config)).toBe(config)
  })

  // The client names the module of the app and the package it is imported by.
  // client は、アプリのモジュールと、それを import するパッケージ名を指定する。
  it('accepts client.import and client.package', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/index.ts',
      template: { define: true },
      client: {
        output: '../client/src/client.ts',
        import: '@packages/server',
        package: '@packages/client',
      },
      'tanstack-query': { output: '../web/src/hooks.ts' },
    })
    expect(config.client?.package).toBe('@packages/client')
  })

  // With template and client, rpc and the hooks are given without a client name.
  // template と client があれば、rpc とフックはクライアント名なしで指定する。
  it('accepts rpc and hooks with template and client', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      client: { output: 'src/client.ts', baseUrl: '/' },
      rpc: { output: 'src/rpc.ts' },
      'tanstack-query': { output: 'src/query.ts' },
    })
    expect(config.client?.output).toBe('src/client.ts')
  })

  // Without the client block, nothing that calls the client compiles: not rpc, not a hook.
  // client ブロックがなければ、クライアントを呼び出すものはコンパイルできない。rpc もフックも。
  it('is a type error to set rpc without the client block', () => {
    // @ts-expect-error -- rpc calls the client the client block generates
    const config = defineConfig({ input: 'openapi.yaml', rpc: { output: 'src/rpc.ts' } })
    expect(config.input).toBe('openapi.yaml')
  })

  it('is a type error to set a hook without the client block', () => {
    // @ts-expect-error -- the hooks call the client the client block generates
    const swr = defineConfig({ input: 'openapi.yaml', swr: { output: 'src/swr.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const tanstack = defineConfig({ input: 'openapi.yaml', 'tanstack-query': { output: 'q.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const preact = defineConfig({ input: 'openapi.yaml', 'preact-query': { output: 'q.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const solid = defineConfig({ input: 'openapi.yaml', 'solid-query': { output: 'q.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const vue = defineConfig({ input: 'openapi.yaml', 'vue-query': { output: 'q.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const svelte = defineConfig({ input: 'openapi.yaml', 'svelte-query': { output: 'q.ts' } })
    // @ts-expect-error -- the hooks call the client the client block generates
    const angular = defineConfig({ input: 'openapi.yaml', 'angular-query': { output: 'q.ts' } })
    expect([swr, tanstack, preact, solid, vue, svelte, angular].map((c) => c.input)).toHaveLength(7)
  })

  // With template and without the client block, rpc does not compile either.
  // template があっても client ブロックがなければ、rpc はコンパイルできない。
  it('is a type error to set rpc with template and without the client block', () => {
    // @ts-expect-error -- rpc calls the client the client block generates
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      rpc: { output: 'src/rpc.ts' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The client without template does not compile.
  // template のない client は、コンパイルできない。
  it('is a type error to set client without template', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- the client is typed by the app the template scaffolds
      client: { output: 'src/client.ts' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The removed options do not compile: the client name and import of rpc and the hooks,
  // the import of the split outputs, the test options, and template.pathAlias.
  // 廃止されたオプションはコンパイルできない。rpc とフックのクライアント名と import、
  // 分割出力の import、テストのオプション、template.pathAlias である。
  it('is a type error to set a removed option', () => {
    const rpcClient = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: {},
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- client was removed
      rpc: { output: 'src/rpc.ts', client: 'apiClient' },
    })
    const rpcImport = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: {},
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- import was removed
      rpc: { output: 'src/rpc.ts', import: '../client' },
    })
    const swrClient = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: {},
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- client was removed
      swr: { output: 'src/swr.ts', client: 'client' },
    })
    const routes = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- import was removed
      routes: { output: 'src/routes', import: '@packages/routes' },
    })
    const schemas = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- import was removed
      components: { schemas: { output: 'src/schemas', import: '@/schemas' } },
    })
    const test = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- test was removed
      test: { output: 'src/test.ts', import: '.' },
    })
    const templateTest = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- test was removed
      template: { test: true },
    })
    const templateAlias = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- pathAlias was moved to the top level
      template: { pathAlias: '@/' },
    })
    const fixedUrl = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: {},
      // @ts-expect-error -- a fixed URL was removed
      client: { output: 'src/client.ts', baseUrl: 'http://localhost:3000' },
    })
    expect(
      [
        rpcClient,
        rpcImport,
        swrClient,
        routes,
        schemas,
        test,
        templateTest,
        templateAlias,
        fixedUrl,
      ].map((c) => c.input),
    ).toHaveLength(9)
  })

  // An option that does not exist does not compile.
  // 存在しないオプションは、コンパイルできない。
  it('is a type error to set an option that does not exist', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: {},
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- imprt is not an option
      rpc: { output: 'src/rpc.ts', imprt: '../client' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // What the types no longer say, the schema says when the config is read: output and
  // routes together, a split output that is a .ts file, an output of template.define that
  // is not an index.ts, two generators on one path, a basePath without the leading slash.
  // 型が言わなくなったことは、設定を読み込むときにスキーマが言う。output と routes の併用、
  // .ts ファイルへの分割出力、index.ts でない template.define の output、同じパスへの 2 つの
  // 生成器、先頭にスラッシュのない basePath である。
  it('leaves the rules of the outputs to the schema', async () => {
    const result = await Effect.runPromise(
      Effect.flip(
        Effect.provide(
          parseConfig(
            defineConfig({ input: 'openapi.yaml', output: 'src/routes.ts', basePath: 'api' }),
          ),
          NodeFileSystem.layer,
        ),
      ),
    )
    expect(result.message).toBe(
      "Invalid config: basePath: must start with '/' and contain no whitespace or quotes",
    )
  })
})
