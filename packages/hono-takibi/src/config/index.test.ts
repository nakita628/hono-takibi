import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { runGenerator, runGeneratorError } from '../testing/index.js'
import { defineConfig, parseConfig, readConfig } from './index.js'

describe('readConfig', () => {
  it('returns error with path when no config file exists', async () => {
    const originalCwd = process.cwd.bind(process)
    const fakeCwd = `/tmp/hono-takibi-test-no-config-${Date.now()}`
    process.cwd = () => fakeCwd
    try {
      const result = await runGeneratorError(readConfig())
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
      const result = await runGeneratorError(readConfig())
      expect(result.message.endsWith('hono-takibi.config.ts')).toBe(true)
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
      const result = await runGenerator(readConfig())
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
      const result = await runGeneratorError(readConfig())
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
      const result = await runGeneratorError(readConfig())
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
      const result = await runGeneratorError(readConfig())
      expect(typeof result.message).toBe('string')
      expect(result.message.length).toBeGreaterThan(0)
      // Should NOT be the missing-file message — the file exists.
      expect(result.message.startsWith('Config not found')).toBe(false)
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('parseConfig()', () => {
  describe('normalizes output path to /index.ts when split is false', () => {
    it.concurrent('normalizes routes.output when split is undefined', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'routes' },
        }),
      )
      expect(result.routes?.output).toBe('routes/index.ts')
    })

    it.concurrent('normalizes routes.output when split is false', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'routes', split: false },
        }),
      )
      expect(result.routes?.output).toBe('routes/index.ts')
    })

    it.concurrent('keeps routes.output unchanged when already ends with .ts', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'routes/custom.ts' },
        }),
      )
      expect(result.routes?.output).toBe('routes/custom.ts')
    })

    it.concurrent('keeps routes.output as directory when split is true', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'routes', split: true },
        }),
      )
      expect(result.routes?.output).toBe('routes')
    })

    it.concurrent('normalizes a directory rpc.output', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc', import: '../client' },
        }),
      )
      expect(result.rpc?.output).toBe('rpc/index.ts')
    })

    it.concurrent('normalizes components.schemas.output when split is undefined', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: 'schemas' },
          },
        }),
      )
      expect(result.components?.schemas?.output).toBe('schemas/index.ts')
    })

    it.concurrent('normalizes components.parameters.output when split is false', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            parameters: { output: 'parameters', split: false },
          },
        }),
      )
      expect(result.components?.parameters?.output).toBe('parameters/index.ts')
    })

    it.concurrent('keeps components.schemas.output as directory when split is true', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: 'schemas', split: true },
          },
        }),
      )
      expect(result.components?.schemas?.output).toBe('schemas')
    })

    it.concurrent('normalizes multiple components at once', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: 'schemas' },
            parameters: { output: 'parameters' },
            responses: { output: 'responses/index.ts' },
            headers: { output: 'headers', split: true },
          },
        }),
      )
      expect(result.components?.schemas?.output).toBe('schemas/index.ts')
      expect(result.components?.parameters?.output).toBe('parameters/index.ts')
      expect(result.components?.responses?.output).toBe('responses/index.ts')
      expect(result.components?.headers?.output).toBe('headers')
    })
  })

  describe('readonly option', () => {
    it.concurrent('accepts readonly: true', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          readonly: true,
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        }),
      )
      expect(result.readonly).toBe(true)
    })

    it.concurrent('accepts readonly: false', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          readonly: false,
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        }),
      )
      expect(result.readonly).toBe(false)
    })

    it.concurrent('accepts undefined readonly (optional)', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        }),
      )
      expect(result.readonly).toBeUndefined()
    })
  })

  describe('mock option', () => {
    it.concurrent('accepts the orval-aligned mock options', async () => {
      const result = await runGenerator(
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
      )
      expect(result.mock?.output).toBe('src/mock.ts')
      expect(result.mock?.useExamples).toBe(false)
      expect(result.mock?.locale).toBe('ja')
      expect(result.mock?.delay).toBe(500)
      expect(result.mock?.arrayMin).toBe(2)
      expect(result.mock?.arrayMax).toBe(10)
    })

    it.concurrent('accepts delay as a { min, max } range', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', delay: { min: 100, max: 500 } },
        }),
      )
      expect(result.mock?.delay).toStrictEqual({ min: 100, max: 500 })
    })

    it.concurrent('rejects a delay range with min greater than max', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', delay: { min: 500, max: 100 } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: mock.delay: delay.min must be <= delay.max. Swap the values or remove one.',
      )
    })

    it.concurrent('accepts delay: false', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', delay: false },
        }),
      )
      expect(result.mock?.delay).toBe(false)
    })

    it.concurrent('accepts arrayMin equal to arrayMax', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            mock: { output: 'src/mock.ts', arrayMin: 5, arrayMax: 5 },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('rejects arrayMin greater than arrayMax', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', arrayMin: 6, arrayMax: 5 },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: mock: arrayMin must be <= arrayMax. Swap the values or remove one.',
      )
    })

    it.concurrent('rejects a locale that could break out of the import path', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', locale: '../../../etc/passwd' },
        }),
      )
      expect(result.message).toBe(
        "Invalid config: mock.locale: Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
      )
    })

    it.concurrent("accepts useExamples: 'all'", async () => {
      const result = await runGenerator(
        parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', useExamples: 'all' } }),
      )
      expect(result.mock?.useExamples).toBe('all')
    })

    it.concurrent('rejects an unknown useExamples mode', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'src/mock.ts', useExamples: 'some' },
        }),
      )
      expect(result.message).toContain('Invalid config: mock.useExamples')
    })

    it.concurrent('accepts a numeric seed and an array seed', async () => {
      const single = await runGenerator(
        parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', seed: 42 } }),
      )
      expect(single.mock?.seed).toBe(42)
      const array = await runGenerator(
        parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', seed: [1, 2, 3] } }),
      )
      expect(array.mock?.seed).toStrictEqual([1, 2, 3])
    })

    it.concurrent.each([[-1], [1.5], [4_294_967_296], [[]], ['42']])(
      'rejects the seed %j',
      async (seed) => {
        const result = await runGeneratorError(
          parseConfig({ input: 'openapi.yaml', mock: { output: 'src/mock.ts', seed } }),
        )
        expect(result.message).toContain('Invalid config: mock.seed')
      },
    )
  })

  describe('routes.import and webhooks.import', () => {
    it.concurrent('preserves routes.import through parsing', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'src/routes.ts', import: '@packages/routes' },
        }),
      )
      expect(result.routes?.import).toBe('@packages/routes')
      expect(result.routes?.output).toBe('src/routes.ts')
    })

    it.concurrent('preserves routes.import with split and pathAlias', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          template: { pathAlias: '@/' },
          routes: { output: 'src/routes', split: true, import: '@packages/routes' },
        }),
      )
      expect(result.routes?.import).toBe('@packages/routes')
      expect(result.routes?.output).toBe('src/routes')
      expect(result.template?.pathAlias).toBe('@/')
    })

    it.concurrent('routes without import field works (backward compat)', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'src/routes.ts' },
        }),
      )
      expect(result.routes?.import).toBeUndefined()
    })

    it.concurrent('preserves webhooks.import through parsing', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          webhooks: { output: 'src/webhooks.ts', import: '@packages/webhooks' },
        }),
      )
      expect(result.webhooks?.import).toBe('@packages/webhooks')
    })
  })

  describe('validation errors', () => {
    it.concurrent('fails when split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'routes/index.ts', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: routes: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when rpc still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('fails when input is not .yaml, .json, or .tsp', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.txt' as `${string}.yaml`,
        }),
      )
      expect(result.message).toBe('Invalid config: input: must be .yaml | .json | .tsp')
    })

    it.concurrent('accepts rpc with custom client name', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc/index.ts', import: '../api', client: 'authClient' },
        }),
      )
      expect(result.rpc?.client).toBe('authClient')
    })

    it.concurrent('fails when rpc client is not a string', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc/index.ts', import: '../client', client: 123 as unknown as string },
        }),
      )
      expect(result.message).toBe('Invalid config: rpc.client: Expected string')
    })

    // `client` lands in `import { <client> } from '...'`; without this the failure
    // surfaces as an oxfmt syntax error about the generated file.
    it.concurrent('fails when rpc client is not a JavaScript identifier', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc.ts', import: '../client', client: '1bad' },
        }),
      )
      expect(result.message).toBe('Invalid config: rpc.client: must be a JavaScript identifier')
    })

    it.concurrent('fails when an import specifier is empty', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc.ts', import: '' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.import: must be a module specifier, with no whitespace or quotes',
      )
    })

    it.concurrent('fails when an import specifier carries a quote', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          swr: { output: 'swr.ts', import: "../lib'" },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: swr.import: must be a module specifier, with no whitespace or quotes',
      )
    })
  })

  // Every generator runs concurrently against its own output, so two of them aimed at
  // one path means whichever finishes last wins — and both still report success.
  describe('output path collisions', () => {
    it.concurrent('fails when two generators declare the same output file', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: './src/api.ts',
          type: { output: 'src/api.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: type.output and output both write to src/api.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when a directory output normalizes onto another output', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/api/index.ts',
          mock: { output: 'src/api' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: mock.output and output both write to src/api/index.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when two component sections share a split directory', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: './src/gen', split: true },
            responses: { output: 'src/gen', split: true },
          },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.responses.output and components.schemas.output both write to src/gen. Give each generator its own output path.',
      )
    })

    it.concurrent('accepts distinct outputs across every generator', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          type: { output: 'src/types.ts' },
          rpc: { output: 'src/rpc.ts', import: '../lib' },
          mock: { output: 'src/mock.ts' },
          docs: { output: 'docs/api.md' },
        }),
      )
      expect(result.output).toBe('src/routes.ts')
    })
  })

  describe('format option', () => {
    it.concurrent('accepts format with standard options', async () => {
      const result = await runGenerator(
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
      )
      expect(result.format?.printWidth).toBe(80)
      expect(result.format?.semi).toBe(true)
      expect(result.format?.singleQuote).toBe(false)
      expect(result.format?.arrowParens).toBe('avoid')
    })

    it.concurrent('accepts format with sort options', async () => {
      const result = await runGenerator(
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
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'routes.ts',
        }),
      )
      expect(result.format).toBeUndefined()
    })

    it.concurrent('accepts any format value (delegated to oxfmt)', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            format: { unknownOption: true },
          }),
        ),
      ).resolves.toBeDefined()
    })
  })

  describe('output and routes mutual exclusivity', () => {
    it.concurrent('fails when both output and routes are specified', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          routes: { output: 'src/routes' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
      )
    })

    it.concurrent('passes with output only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/routes.ts',
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes with routes only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            routes: { output: 'src/routes.ts' },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes with neither output nor routes', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            exportSchemas: true,
          }),
        ),
      ).resolves.toBeDefined()
    })
  })

  describe('template define / routeHandler mutual exclusivity', () => {
    it.concurrent('selects the define variant and drops routeHandler when define is true', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/index.ts',
          template: { define: true, routeHandler: true },
        }),
      )
      expect(result.template?.define).toBe(true)
    })

    it.concurrent('passes when define is true and output is omitted', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          template: { define: true },
        }),
      )
      expect(result.output).toBe(undefined)
      expect(result.template?.define).toBe(true)
    })

    it.concurrent('fails when define is true and output is not an index.ts file', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: './src/routes.ts',
          template: { define: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, output is the app entry and must be an index.ts file (e.g. ./src/index.ts), or omitted to default to src/index.ts. Other names collide with the derived routes/ directory.',
      )
    })

    it.concurrent('passes when define is true and output is a relocated index.ts', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: './server/index.ts',
            template: { define: true },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes when define is true and output is a bare index.ts', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: 'index.ts',
            template: { define: true },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('fails when define is true and a per-type component output is specified', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          template: { define: true },
          components: { schemas: { output: 'src/schemas', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, per-type component outputs (components.schemas, components.responses, ...) are not supported. Use components.output for a single components file.',
      )
    })

    it.concurrent('passes when define is true and components.output is specified', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            template: { define: true },
            components: { output: 'shared/components.ts' },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('fails when define is true and components.output hits the app entry', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: './src/index.ts',
          template: { define: true },
          components: { output: 'src/index.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when define is true and components.output is inside the derived routes dir', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          template: { define: true },
          components: { output: './src/routes/index.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('passes when define is true with both output and a non-colliding components.output', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true },
            components: { output: 'shared/components.ts' },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes when define is true and only components.output anchors the layout', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            template: { define: true },
            components: { output: './server/components/index.ts' },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('fails when the anchor derived from components.output puts components inside routes/', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          template: { define: true },
          components: { output: './server/routes/index.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when a bare components.output collides with the derived app entry', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          template: { define: true },
          components: { output: 'index.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
      )
    })

    it.concurrent('fails when define is true and routes is specified', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          routes: { output: 'src/routes.ts' },
          template: { define: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: template.define and routes are mutually exclusive. define derives routes/ next to the app entry (output, default src/index.ts).',
      )
    })

    it.concurrent('passes with define only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { define: true },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes with routeHandler only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            output: 'src/index.ts',
            template: { routeHandler: true },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('ignores a removed template.output key in both variants', async () => {
      const defineResult = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/index.ts',
          template: { define: true, output: 'src/controllers' },
        }),
      )
      expect('output' in (defineResult.template ?? {})).toBe(false)
      const nonDefineResult = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/index.ts',
          template: { output: 'src/controllers' },
        }),
      )
      expect(nonDefineResult.template?.define).toBe(false)
      expect('output' in (nonDefineResult.template ?? {})).toBe(false)
    })
  })

  describe('components.output / per-type mutual exclusivity', () => {
    it.concurrent('fails when both output and a per-type component are specified', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            output: 'src/components/index.ts',
            schemas: { output: 'src/schemas' },
          },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components: components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
      )
    })

    it.concurrent('passes with components.output only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            components: { output: 'src/components/index.ts' },
          }),
        ),
      ).resolves.toBeDefined()
    })

    it.concurrent('passes with per-type components only', async () => {
      await expect(
        runGenerator(
          parseConfig({
            input: 'openapi.yaml',
            components: { schemas: { output: 'src/schemas' } },
          }),
        ),
      ).resolves.toBeDefined()
    })
  })

  describe('basePath option', () => {
    it.concurrent('accepts top-level basePath', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          basePath: '/api',
          output: 'src/routes.ts',
        }),
      )
      expect(result.basePath).toBe('/api')
    })

    it.concurrent('defaults basePath to "/" when omitted', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
        }),
      )
      expect(result.basePath).toBe('/')
    })

    // The value reaches the app as `new OpenAPIHono().basePath('<basePath>')`, so a
    // missing slash mounts nothing and a quote ends the literal early.
    it.concurrent('fails when basePath has no leading slash', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          basePath: 'api',
          output: 'src/routes.ts',
        }),
      )
      expect(result.message).toBe(
        "Invalid config: basePath: must start with '/' and contain no whitespace or quotes",
      )
    })

    it.concurrent('fails when basePath would close the generated string literal', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          basePath: "/a')\nconsole.log('pwned",
          output: 'src/routes.ts',
        }),
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
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          test: { output: 'src/index.test.ts', import: './index' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: test: test was removed: hono-takibi no longer generates test files.',
      )
    })

    it.concurrent('fails when template still sets the removed test', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { test: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: template.test: test was removed: hono-takibi no longer generates test files. The `.test.ts` files a previous run wrote are yours to keep or delete.',
      )
    })

    it.concurrent('fails when template still sets the removed testFramework', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { testFramework: 'bun' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: template.testFramework: testFramework was removed: hono-takibi no longer generates test files.',
      )
    })
  })

  describe('input accepts all supported extensions', () => {
    it.concurrent('accepts .json input', async () => {
      const result = await runGenerator(parseConfig({ input: 'openapi.json' }))
      expect(result.input).toBe('openapi.json')
    })

    it.concurrent('accepts .tsp input', async () => {
      const result = await runGenerator(parseConfig({ input: 'main.tsp' }))
      expect(result.input).toBe('main.tsp')
    })
  })

  describe('minimal config (input only)', () => {
    it.concurrent('accepts config with only input field', async () => {
      const result = await runGenerator(parseConfig({ input: 'openapi.yaml' }))
      expect(result.input).toBe('openapi.yaml')
      expect(result.rpc).toBeUndefined()
    })
  })

  describe('parseConfig error formatting', () => {
    it.concurrent('includes path in error message when path is present', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc/index.ts', import: '../client', client: 123 },
        }),
      )
      expect(result.message).toBe('Invalid config: rpc.client: Expected string')
    })

    it.concurrent('omits path prefix when path is empty', async () => {
      const result = await runGeneratorError(parseConfig(null))
      expect(result.message).toBe('Invalid config: Expected object')
    })
  })

  describe('type option', () => {
    it.concurrent('accepts type with output', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          type: { output: 'types/index.ts' },
        }),
      )
      expect(result.type?.output).toBe('types/index.ts')
    })

    it.concurrent('accepts type with readonly', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          type: { output: 'types/index.ts', readonly: true },
        }),
      )
      expect(result.type?.readonly).toBe(true)
    })

    it.concurrent('fails when type output is not .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          type: { output: 'types/index.js' },
        }),
      )
      expect(result.message).toBe('Invalid config: type.output: must be .ts file')
    })
  })

  describe('docs option', () => {
    it.concurrent('accepts docs with .md output', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          docs: { output: 'docs/api.md' },
        }),
      )
      expect(result.docs?.output).toBe('docs/api.md')
    })

    it.concurrent('accepts docs with entry', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          docs: { output: 'docs/api.md', entry: './src/index.ts' },
        }),
      )
      expect(result.docs?.entry).toBe('./src/index.ts')
    })

    it.concurrent('accepts docs with curl and baseUrl', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          docs: { output: 'docs/api.md', curl: true, baseUrl: 'https://api.example.com' },
        }),
      )
      expect(result.docs?.curl).toBe(true)
      expect(result.docs?.baseUrl).toBe('https://api.example.com')
    })

    it.concurrent('fails when docs output is not .md', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          docs: { output: 'docs/api.txt' },
        }),
      )
      expect(result.message).toBe('Invalid config: docs.output: must be .md file')
    })

    it.concurrent('fails when curl is true and entry is specified', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          docs: {
            output: 'docs/api.md',
            curl: true,
            baseUrl: 'https://api.example.com',
            entry: './src/index.ts',
          },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: docs.entry: entry cannot be specified when curl is true',
      )
    })

    it.concurrent('fails when curl is true and baseUrl is missing', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          docs: { output: 'docs/api.md', curl: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: docs.baseUrl: baseUrl is required when curl is true',
      )
    })
  })

  describe('mock option shorthands', () => {
    it.concurrent('accepts mock with output', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'mock' },
        }),
      )
      expect(result.mock?.output).toBe('mock/index.ts')
    })

    it.concurrent('keeps mock output when already .ts', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          mock: { output: 'mock/index.ts' },
        }),
      )
      expect(result.mock?.output).toBe('mock/index.ts')
    })
  })

  describe('query client options', () => {
    it.concurrent('accepts swr config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          swr: { output: 'swr', import: '../client' },
        }),
      )
      expect(result.swr?.output).toBe('swr/index.ts')
    })

    it.concurrent('accepts swr with custom client', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          swr: { output: 'swr/index.ts', import: '../client', client: 'apiClient' },
        }),
      )
      expect(result.swr?.client).toBe('apiClient')
    })

    // A generator that calls the client has to be told where the client is.
    // クライアントを呼び出す生成器には、クライアントの場所を伝える必要がある。
    it.concurrent('fails when rpc names no import and no client is generated', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.import is required: name the module that exports the Hono client, or set the client block, with template, to generate the client.',
      )
    })

    // The same for a hook library.
    // フックのライブラリも同様である。
    it.concurrent('fails when tanstack-query names no import and no client is generated', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'tanstack-query': { output: 'query.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: tanstack-query.import is required: name the module that exports the Hono client, or set the client block, with template, to generate the client.',
      )
    })

    // Without template, rpc is generated against the client the import names.
    // template がなくても、rpc は import が指すクライアントに対して生成される。
    it.concurrent('accepts rpc without template when it names an import', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc.ts', import: '../client' },
        }),
      )
      expect(result.rpc?.import).toBe('../client')
      expect(result.rpc?.client).toBe(undefined)
    })

    // Without template, the name of the client is the one the config gives.
    // template がなければ、クライアントの名前は設定で指定したものになる。
    it.concurrent('accepts a client name for rpc without template', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc.ts', import: '../client', client: 'apiClient' },
        }),
      )
      expect(result.rpc?.client).toBe('apiClient')
    })

    // With template and without the client block, rpc calls the client the import names.
    // template があり client ブロックがなければ、rpc は import が指すクライアントを呼び出す。
    it.concurrent('accepts rpc with template and without client', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          rpc: { output: 'src/rpc.ts', import: '../client', client: 'apiClient' },
        }),
      )
      expect(result.rpc?.import).toBe('../client')
      expect(result.rpc?.client).toBe('apiClient')
    })

    // The same for a hook library.
    // フックのライブラリも同様である。
    it.concurrent('accepts swr with template and without client', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          swr: { output: 'src/swr.ts', import: '../client' },
        }),
      )
      expect(result.swr?.import).toBe('../client')
    })

    // With template and without the client block, the import is still required.
    // template があっても client ブロックがなければ、import は必須である。
    it.concurrent('fails when rpc names no import with template and without client', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          rpc: { output: 'src/rpc.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.import is required: name the module that exports the Hono client, or set the client block, with template, to generate the client.',
      )
    })

    // The client block cannot stand alone: it needs template.
    // client ブロックは単体では指定できず、template が必要である。
    it.concurrent('fails when client is set without template and with rpc', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          client: { output: 'src/client.ts' },
          rpc: { output: 'src/rpc.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: client needs template: the client is typed by the app the template scaffolds.',
      )
    })

    // With the client block the client has a fixed name, so rpc cannot choose one.
    // client ブロックがあるとクライアントの名前が決まっているため、rpc では指定できない。
    it.concurrent('fails when rpc names the client with the client block', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          client: { output: 'src/client.ts' },
          rpc: { output: 'src/rpc.ts', client: 'apiClient' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.client cannot be set with the client block: the generated client is exported as `client`, and a group of a split app as `<group>Client`. Remove rpc.client.',
      )
    })

    // Naming it `client`, the name it already has, is refused as well.
    // すでにその名前である `client` を指定しても、同様に拒否される。
    it.concurrent('fails when tanstack-query names the client `client` with the client block', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          client: { output: 'src/client.ts' },
          'tanstack-query': { output: 'src/query.ts', client: 'client' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: tanstack-query.client cannot be set with the client block: the generated client is exported as `client`, and a group of a split app as `<group>Client`. Remove tanstack-query.client.',
      )
    })

    // With template and client, rpc and a hook library are accepted together.
    // template と client があれば、rpc とフックのライブラリは併せて受け付けられる。
    it.concurrent('accepts rpc and swr with template and client', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          client: { output: 'src/client.ts' },
          rpc: { output: 'src/rpc.ts' },
          swr: { output: 'src/swr.ts' },
        }),
      )
      expect(result.rpc?.client).toBe(undefined)
      expect(result.swr?.client).toBe(undefined)
    })

    // With a client to generate, the import is worked out from where the files are written.
    // 生成するクライアントがあれば、import は出力先から自動で計算される。
    it.concurrent('accepts rpc without an import when a client is generated', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true },
          client: { output: 'src/client.ts' },
          rpc: { output: 'src/rpc.ts' },
        }),
      )
      expect(result.rpc?.import).toBeUndefined()
      expect(result.client).toStrictEqual({ output: 'src/client.ts', baseUrl: '/' })
    })

    // The client is typed by the app the template scaffolds.
    // クライアントは、template が生成するアプリで型付けされる。
    it.concurrent('fails when a client is set without a template', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          client: { output: 'src/client.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: client needs template: the client is typed by the app the template scaffolds.',
      )
    })

    // split is off unless it is asked for, in every mode of the template.
    // split は、template のどのモードでも、指定しない限り無効である。
    it.concurrent('defaults template.split to false', async () => {
      const inline = await runGenerator(
        parseConfig({ input: 'openapi.yaml', output: 'src/routes.ts', template: {} }),
      )
      const defined = await runGenerator(
        parseConfig({ input: 'openapi.yaml', output: 'src/index.ts', template: { define: true } }),
      )
      expect(inline.template?.split).toBe(false)
      expect(defined.template?.split).toBe(false)
    })

    // split is taken in every mode of the template.
    // split は、template のどのモードでも指定できる。
    it.concurrent('accepts template.split in every mode', async () => {
      const handler = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: { routeHandler: true, split: true },
        }),
      )
      const inline = await runGenerator(
        parseConfig({ input: 'openapi.yaml', output: 'src/routes.ts', template: { split: true } }),
      )
      const defined = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/index.ts',
          template: { define: true, split: true },
        }),
      )
      expect(handler.template?.split).toBe(true)
      expect(inline.template?.split).toBe(true)
      expect(defined.template?.split).toBe(true)
    })

    // A URL is written into the client as it stands.
    // URL は、そのままクライアントに書き込まれる。
    it.concurrent('accepts client.baseUrl as a URL', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: 'http://localhost:3000' },
        }),
      )
      expect(result.client?.baseUrl).toBe('http://localhost:3000')
    })

    // A variable is read from import.meta.env unless the config says otherwise.
    // 変数は、設定で指定しない限り import.meta.env から読み取られる。
    it.concurrent('reads a variable from import.meta.env by default', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: { env: 'VITE_API_URL' } },
        }),
      )
      expect(result.client?.baseUrl).toStrictEqual({
        env: 'VITE_API_URL',
        source: 'import.meta.env',
      })
    })

    // process.env is what Node.js reads the environment from.
    // process.env は、Node.js が環境を読み取る場所である。
    it.concurrent('reads a variable from process.env when the config says so', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', source: 'process.env' } },
        }),
      )
      expect(result.client?.baseUrl).toStrictEqual({ env: 'API_URL', source: 'process.env' })
    })

    // An object that names a module is read as one, and the export is env by default.
    // モジュールを指定したオブジェクトは、そのとおりに読み取られる。export 名のデフォルトは
    // env である。
    it.concurrent('reads a property of an environment a module exports', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', import: '@/env' } },
        }),
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
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: {
            output: 'src/client.ts',
            baseUrl: { env: 'API_URL', import: '../config', name: 'config' },
          },
        }),
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
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: { env: 'API-URL', source: 'process.env' } },
        }),
      )
      expect(result.message).toContain('Invalid config: client.baseUrl')
    })

    // A URL with a quote in it would end the string it is written into.
    // 引用符を含む URL は、書き込まれる先の文字列を途中で終わらせてしまう。
    it.concurrent('fails when the URL holds a quote', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts', baseUrl: "http://x'" },
        }),
      )
      expect(result.message).toContain('Invalid config: client.baseUrl')
    })

    // The client is a TypeScript file.
    // クライアントは、TypeScript のファイルである。
    it.concurrent('fails when client.output is no .ts file', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client' },
        }),
      )
      expect(result.message).toBe('Invalid config: client.output: must be .ts file')
    })

    // Two generators cannot write the same file.
    // 2つの生成器が、同じファイルに書き出すことはできない。
    it.concurrent('fails when the client and rpc are written to the same file', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'src/routes.ts',
          template: {},
          client: { output: 'src/client.ts' },
          rpc: { output: 'src/client.ts' },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: rpc.output and client.output both write to src/client.ts. Give each generator its own output path.',
      )
    })

    it.concurrent('fails when swr still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          swr: { output: 'swr', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: swr.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts tanstack-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'tanstack-query': { output: 'tanstack', import: '../client' },
        }),
      )
      expect(result['tanstack-query']?.output).toBe('tanstack/index.ts')
    })

    it.concurrent('fails when tanstack-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'tanstack-query': { output: 'tanstack', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: tanstack-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts svelte-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'svelte-query': { output: 'svelte', import: '../client' },
        }),
      )
      expect(result['svelte-query']?.output).toBe('svelte/index.ts')
    })

    it.concurrent('fails when svelte-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'svelte-query': { output: 'svelte', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: svelte-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts vue-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'vue-query': { output: 'vue', import: '../client' },
        }),
      )
      expect(result['vue-query']?.output).toBe('vue/index.ts')
    })

    it.concurrent('fails when vue-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'vue-query': { output: 'vue', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: vue-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts preact-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'preact-query': { output: 'preact', import: '../client' },
        }),
      )
      expect(result['preact-query']?.output).toBe('preact/index.ts')
    })

    it.concurrent('fails when preact-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'preact-query': { output: 'preact', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: preact-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts solid-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'solid-query': { output: 'solid', import: '../client' },
        }),
      )
      expect(result['solid-query']?.output).toBe('solid/index.ts')
    })

    it.concurrent('fails when solid-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'solid-query': { output: 'solid', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: solid-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })

    it.concurrent('accepts angular-query config', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          'angular-query': { output: 'angular', import: '../client' },
        }),
      )
      expect(result['angular-query']?.output).toBe('angular/index.ts')
    })

    it.concurrent('fails when angular-query still sets the removed split', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          'angular-query': { output: 'angular', import: '../client', split: true },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: angular-query.split: split was removed: rpc and hooks are always generated into a single file. Set output to a .ts file path and delete the directory the previous run wrote.',
      )
    })
  })

  describe('rpc.parseResponse option', () => {
    it.concurrent('accepts parseResponse: true', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc/index.ts', import: '../client', parseResponse: true },
        }),
      )
      expect(result.rpc?.parseResponse).toBe(true)
    })

    it.concurrent('parseResponse defaults to false when omitted', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          rpc: { output: 'rpc/index.ts', import: '../client' },
        }),
      )
      expect(result.rpc?.parseResponse).toBe(false)
    })
  })

  describe('output validation', () => {
    it.concurrent('fails when output is not .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          output: 'routes/index.js',
        }),
      )
      expect(result.message).toBe('Invalid config: output: must be .ts file')
    })
  })

  describe('components split validation', () => {
    it.concurrent('fails when schemas split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { schemas: { output: 'schemas/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.schemas: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when securitySchemes split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { securitySchemes: { output: 'schemes/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.securitySchemes: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when requestBodies split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { requestBodies: { output: 'bodies/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.requestBodies: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when responses split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { responses: { output: 'responses/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.responses: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when examples split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { examples: { output: 'examples/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.examples: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when links split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { links: { output: 'links/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.links: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when callbacks split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { callbacks: { output: 'callbacks/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.callbacks: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when pathItems split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { pathItems: { output: 'items/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.pathItems: split mode requires directory, not .ts file',
      )
    })

    it.concurrent('fails when mediaTypes split is true but output ends with .ts', async () => {
      const result = await runGeneratorError(
        parseConfig({
          input: 'openapi.yaml',
          components: { mediaTypes: { output: 'media/index.ts', split: true } },
        }),
      )
      expect(result.message).toBe(
        'Invalid config: components.mediaTypes: split mode requires directory, not .ts file',
      )
    })
  })

  describe('components full value normalization', () => {
    it.concurrent('split=false: normalizes every component output and applies defaults', async () => {
      const result = await runGenerator(
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
      const result = await runGenerator(
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

    it.concurrent('preserves exportTypes: true and import on a split component', async () => {
      const result = await runGenerator(
        parseConfig({
          input: 'openapi.yaml',
          components: {
            schemas: { output: 'schemas', split: true, exportTypes: true, import: '@/schemas' },
          },
        }),
      )
      expect(result.components?.schemas).toStrictEqual({
        split: true,
        output: 'schemas',
        import: '@/schemas',
        exportTypes: true,
      })
    })
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
      template: { define: true, split: true },
      components: { output: 'src/components/index.ts' },
      type: { output: 'src/types.ts' },
      client: { output: 'src/client.ts', baseUrl: { env: 'API_URL', import: '@/env' } },
      rpc: { output: 'src/rpc.ts' },
      swr: { output: 'src/swr.ts' },
      mock: { output: 'src/mock.ts', delay: { min: 100, max: 800 } },
      docs: { output: 'docs/api.md', curl: true, baseUrl: 'http://localhost:3000' },
    })
    expect(config.output).toBe('src/index.ts')
  })

  it('returns the config object as-is', () => {
    const config = {
      input: 'openapi.yaml' as const,
      output: 'routes.ts' as const,
    }
    expect(defineConfig(config)).toBe(config)
  })

  // Without template, rpc names the module and the export of the client.
  // template がなければ、rpc はクライアントのモジュールとエクスポート名を指定する。
  it('accepts a client name for rpc without template', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      rpc: { output: 'src/rpc.ts', import: '../client', client: 'apiClient' },
    })
    expect(config.rpc?.client).toBe('apiClient')
  })

  // With template and client, rpc and the hooks are given without a client name.
  // template と client があれば、rpc とフックはクライアント名なしで指定する。
  it('accepts rpc and hooks with template and client', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      client: { output: 'src/client.ts' },
      rpc: { output: 'src/rpc.ts' },
      'tanstack-query': { output: 'src/query.ts' },
    })
    expect(config.client?.output).toBe('src/client.ts')
  })

  // With the client block, naming the client in rpc does not compile.
  // client ブロックがあると、rpc でクライアント名を指定するとコンパイルできない。
  it('is a type error to name the client in rpc with the client block', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- the generated client is exported as `client`
      rpc: { output: 'src/rpc.ts', client: 'apiClient' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The same for a hook library.
  // フックのライブラリも同様である。
  it('is a type error to name the client in swr with the client block', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      client: { output: 'src/client.ts' },
      // @ts-expect-error -- the generated client is exported as `client`
      swr: { output: 'src/swr.ts', client: 'client' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // With template and without the client block, rpc names the client itself.
  // template があり client ブロックがなければ、rpc はクライアントを自分で指定する。
  it('accepts rpc with template and without client', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      template: { routeHandler: true },
      rpc: { output: 'src/rpc.ts', import: '../client', client: 'apiClient' },
    })
    expect(config.rpc.client).toBe('apiClient')
  })

  // Without the client block, rpc without an import does not compile.
  // client ブロックがなければ、import のない rpc はコンパイルできない。
  it('is a type error to leave out the import of rpc without the client block', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- without the client block, rpc names the module of the client
      rpc: { output: 'src/rpc.ts' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // output and routes together do not compile.
  // output と routes を併せて指定すると、コンパイルできない。
  it('is a type error to set output and routes together', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- output and routes are mutually exclusive
      output: 'src/routes.ts',
      // @ts-expect-error -- output and routes are mutually exclusive
      routes: { output: 'src/routes' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // A split output that is a .ts file does not compile.
  // split の出力先が .ts ファイルだと、コンパイルできない。
  it('is a type error to split routes into a .ts file', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- split mode requires a directory
      routes: { output: 'src/routes.ts', split: true },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The same for a component output.
  // コンポーネントの出力先も同様である。
  it('is a type error to split schemas into a .ts file', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- split mode requires a directory
      components: { schemas: { output: 'src/schemas.ts', split: true } },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // With template.define, an output that is not an index.ts does not compile.
  // template.define では、index.ts でない output はコンパイルできない。
  it('is a type error to name an output other than index.ts with template.define', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- with template.define, output is the app entry
      output: 'src/app.ts',
      template: { define: true },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // With template.define, routes does not compile.
  // template.define では、routes はコンパイルできない。
  it('is a type error to set routes with template.define', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      template: { define: true },
      // @ts-expect-error -- define derives routes/ next to the app entry
      routes: { output: 'src/routes' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // With template.define, the output of one component type does not compile.
  // template.define では、コンポーネントの種類ごとの出力はコンパイルできない。
  it('is a type error to set components.schemas with template.define', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/index.ts',
      template: { define: true },
      // @ts-expect-error -- use components.output for a single file
      components: { schemas: { output: 'src/schemas' } },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // components.output with the output of one type does not compile.
  // components.output と種類ごとの出力を併せて指定すると、コンパイルできない。
  it('is a type error to set components.output with components.schemas', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- components.output and the outputs of each type are mutually exclusive
      components: { output: 'src/components.ts', schemas: { output: 'src/schemas' } },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // Two generators writing to one path do not compile.
  // 2 つの生成器が同じパスに書き出すと、コンパイルできない。
  it('is a type error to give two generators one output', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      // @ts-expect-error -- every generator needs its own output path
      output: 'src/routes.ts',
      // @ts-expect-error -- every generator needs its own output path
      type: { output: 'src/routes.ts' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // A basePath without the leading slash does not compile.
  // 先頭にスラッシュのない basePath は、コンパイルできない。
  it('is a type error to set a basePath without the leading slash', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- basePath must start with '/'
      basePath: 'api',
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // An option that does not exist does not compile.
  // 存在しないオプションは、コンパイルできない。
  it('is a type error to set an option that does not exist', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- imprt is not an option
      rpc: { output: 'src/rpc.ts', import: '../client', imprt: '../client' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The test option does not compile: test code generation is deprecated.
  // test オプションはコンパイルできない。テストコード生成は廃止された。
  it('is a type error to set test', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- test was removed
      test: { output: 'src/test.ts', import: '.' },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // Neither does template.test.
  // template.test も同様である。
  it('is a type error to set template.test', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- test was removed
      template: { test: true },
    })
    expect(config.input).toBe('openapi.yaml')
  })

  // The client block without template does not compile either.
  // template のない client ブロックも、コンパイルできない。
  it('is a type error to set client without template', () => {
    const config = defineConfig({
      input: 'openapi.yaml',
      output: 'src/routes.ts',
      // @ts-expect-error -- the client is typed by the app the template scaffolds
      client: { output: 'src/client.ts' },
    })
    expect(config.input).toBe('openapi.yaml')
  })
})
