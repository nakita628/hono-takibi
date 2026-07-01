import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { defineConfig, parseConfig, readConfig } from './index.js'

describe('readConfig', () => {
  it('returns error with path when no config file exists', async () => {
    const originalCwd = process.cwd.bind(process)
    const fakeCwd = `/tmp/hono-takibi-test-no-config-${Date.now()}`
    process.cwd = () => fakeCwd
    try {
      const result = await readConfig()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        const expectedPath = path.resolve(fakeCwd, 'hono-takibi.config.ts')
        expect(result.error).toBe(`Config not found: ${expectedPath}`)
      }
    } finally {
      process.cwd = originalCwd
    }
  })

  it('error message references hono-takibi.config.ts filename', async () => {
    const originalCwd = process.cwd.bind(process)
    const fakeCwd = `/tmp/hono-takibi-test-filename-${Date.now()}`
    process.cwd = () => fakeCwd
    try {
      const result = await readConfig()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error.endsWith('hono-takibi.config.ts')).toBe(true)
      }
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
      const result = await readConfig()
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.input).toBe('openapi.yaml')
        expect(result.value.output).toBe('src/routes.ts')
      }
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
      const result = await readConfig()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Config must export default object')
      }
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
      const result = await readConfig()
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(typeof result.error).toBe('string')
        expect(result.error.length).toBeGreaterThan(0)
        // Should NOT be the missing-file message — the file exists.
        expect(result.error.startsWith('Config not found')).toBe(false)
      }
    } finally {
      process.cwd = originalCwd
      fs.rmSync(dir, { recursive: true, force: true })
    }
  })
})

describe('parseConfig()', () => {
  describe('normalizes output path to /index.ts when split is false', () => {
    it.concurrent('normalizes routes.output when split is undefined', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'routes' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.output).toBe('routes/index.ts')
      }
    })

    it.concurrent('normalizes routes.output when split is false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'routes', split: false },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.output).toBe('routes/index.ts')
      }
    })

    it.concurrent('keeps routes.output unchanged when already ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'routes/custom.ts' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.output).toBe('routes/custom.ts')
      }
    })

    it.concurrent('keeps routes.output as directory when split is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'routes', split: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.output).toBe('routes')
      }
    })

    it.concurrent('normalizes rpc.output when split is undefined', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.output).toBe('rpc/index.ts')
      }
    })

    it.concurrent('normalizes rpc.output when split is false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc', import: '../client', split: false },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.output).toBe('rpc/index.ts')
      }
    })

    it.concurrent('keeps rpc.output as directory when split is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc', import: '../client', split: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.output).toBe('rpc')
      }
    })

    it.concurrent('normalizes components.schemas.output when split is undefined', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          schemas: { output: 'schemas' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components?.schemas?.output).toBe('schemas/index.ts')
      }
    })

    it.concurrent('normalizes components.parameters.output when split is false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          parameters: { output: 'parameters', split: false },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components?.parameters?.output).toBe('parameters/index.ts')
      }
    })

    it.concurrent('keeps components.schemas.output as directory when split is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          schemas: { output: 'schemas', split: true },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components?.schemas?.output).toBe('schemas')
      }
    })

    it.concurrent('normalizes multiple components at once', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          schemas: { output: 'schemas' },
          parameters: { output: 'parameters' },
          responses: { output: 'responses/index.ts' },
          headers: { output: 'headers', split: true },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components?.schemas?.output).toBe('schemas/index.ts')
        expect(result.value.components?.parameters?.output).toBe('parameters/index.ts')
        expect(result.value.components?.responses?.output).toBe('responses/index.ts')
        expect(result.value.components?.headers?.output).toBe('headers')
      }
    })
  })

  describe('readonly option', () => {
    it.concurrent('accepts readonly: true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        readonly: true,
        components: {
          schemas: { output: 'schemas/index.ts' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.readonly).toBe(true)
      }
    })

    it.concurrent('accepts readonly: false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        readonly: false,
        components: {
          schemas: { output: 'schemas/index.ts' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.readonly).toBe(false)
      }
    })

    it.concurrent('accepts undefined readonly (optional)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          schemas: { output: 'schemas/index.ts' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.readonly).toBeUndefined()
      }
    })
  })

  describe('mock option', () => {
    it.concurrent('accepts the orval-aligned mock options', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: {
          output: 'src/mock.ts',
          useExamples: false,
          locale: 'ja',
          delay: 500,
          arrayMin: 2,
          arrayMax: 10,
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.mock?.output).toBe('src/mock.ts')
        expect(result.value.mock?.useExamples).toBe(false)
        expect(result.value.mock?.locale).toBe('ja')
        expect(result.value.mock?.delay).toBe(500)
        expect(result.value.mock?.arrayMin).toBe(2)
        expect(result.value.mock?.arrayMax).toBe(10)
      }
    })

    it.concurrent('accepts delay as a { min, max } range', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', delay: { min: 100, max: 500 } },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.mock?.delay).toStrictEqual({ min: 100, max: 500 })
      }
    })

    it.concurrent('rejects a delay range with min greater than max', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', delay: { min: 500, max: 100 } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: mock.delay: delay.min must be <= delay.max. Swap the values or remove one.',
        )
      }
    })

    it.concurrent('accepts delay: false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', delay: false },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.mock?.delay).toBe(false)
      }
    })

    it.concurrent('accepts arrayMin equal to arrayMax', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', arrayMin: 5, arrayMax: 5 },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('rejects arrayMin greater than arrayMax', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', arrayMin: 6, arrayMax: 5 },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: mock: arrayMin must be <= arrayMax. Swap the values or remove one.',
        )
      }
    })

    it.concurrent('rejects a locale that could break out of the import path', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'src/mock.ts', locale: '../../../etc/passwd' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          "Invalid config: mock.locale: Invalid faker locale. Use a code like 'ja', 'en', or 'zh_CN'.",
        )
      }
    })
  })

  describe('routes.import and webhooks.import', () => {
    it.concurrent('preserves routes.import through parsing', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'src/routes.ts', import: '@packages/routes' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.import).toBe('@packages/routes')
        expect(result.value.routes?.output).toBe('src/routes.ts')
      }
    })

    it.concurrent('preserves routes.import with split and pathAlias', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        template: { pathAlias: '@/' },
        routes: { output: 'src/routes', split: true, import: '@packages/routes' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.import).toBe('@packages/routes')
        expect(result.value.routes?.output).toBe('src/routes')
        expect(result.value.template?.pathAlias).toBe('@/')
      }
    })

    it.concurrent('routes without import field works (backward compat)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'src/routes.ts' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.routes?.import).toBeUndefined()
      }
    })

    it.concurrent('preserves webhooks.import through parsing', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        webhooks: { output: 'src/webhooks.ts', import: '@packages/webhooks' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.webhooks?.import).toBe('@packages/webhooks')
      }
    })
  })

  describe('validation errors', () => {
    it.concurrent('fails when split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'routes/index.ts', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: routes.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when rpc split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: rpc.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when input is not .yaml, .json, or .tsp', () => {
      const result = parseConfig({
        input: 'openapi.txt' as `${string}.yaml`,
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: input: must be .yaml | .json | .tsp')
      }
    })

    it.concurrent('accepts rpc with custom client name', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../api', client: 'authClient' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.client).toBe('authClient')
      }
    })

    it.concurrent('fails when rpc client is not a string', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client', client: 123 as unknown as string },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: rpc.client: Invalid input: expected string, received number',
        )
      }
    })
  })

  describe('format option', () => {
    it.concurrent('accepts format with standard options', () => {
      const result = parseConfig({
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
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.format?.printWidth).toBe(80)
        expect(result.value.format?.semi).toBe(true)
        expect(result.value.format?.singleQuote).toBe(false)
        expect(result.value.format?.arrowParens).toBe('avoid')
      }
    })

    it.concurrent('accepts format with sort options', () => {
      const result = parseConfig({
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
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(
          typeof result.value.format?.sortImports === 'object'
            ? result.value.format.sortImports.order
            : undefined,
        ).toBe('asc')
        expect(result.value.format?.sortPackageJson).toBe(true)
        expect(
          typeof result.value.format?.sortTailwindcss === 'object'
            ? result.value.format.sortTailwindcss.functions
            : undefined,
        ).toStrictEqual(['clsx', 'cva'])
      }
    })

    it.concurrent('accepts config without format (optional)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'routes.ts',
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.format).toBeUndefined()
      }
    })

    it.concurrent('accepts any format value (delegated to oxfmt)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        format: { unknownOption: true },
      })
      expect(result.ok).toBe(true)
    })
  })

  describe('output and routes mutual exclusivity', () => {
    it.concurrent('fails when both output and routes are specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/routes.ts',
        routes: { output: 'src/routes' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok)
        expect(result.error).toBe(
          'Invalid config: output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
        )
    })

    it.concurrent('passes with output only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/routes.ts',
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with routes only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'src/routes.ts' },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with neither output nor routes', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        exportSchemas: true,
      })
      expect(result.ok).toBe(true)
    })
  })

  describe('template define / routeHandler mutual exclusivity', () => {
    it.concurrent('selects the define variant and drops routeHandler when define is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { define: true, routeHandler: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.template?.define).toBe(true)
      }
    })

    it.concurrent('passes when define is true and output is omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.output).toBe(undefined)
        expect(result.value.template?.define).toBe(true)
      }
    })

    it.concurrent('fails when define is true and output is not an index.ts file', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: './src/routes.ts',
        template: { define: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: with template.define, output is the app entry and must be an index.ts file (e.g. ./src/index.ts), or omitted to default to src/index.ts. Other names collide with the derived routes/ directory.',
        )
      }
    })

    it.concurrent('passes when define is true and output is a relocated index.ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: './server/index.ts',
        template: { define: true },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes when define is true and output is a bare index.ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'index.ts',
        template: { define: true },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('fails when define is true and a per-type component output is specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { schemas: { output: 'src/schemas', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: with template.define, per-type component outputs (components.schemas, components.responses, ...) are not supported. Use components.output for a single components file.',
        )
      }
    })

    it.concurrent('passes when define is true and components.output is specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { output: 'shared/components.ts' },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('fails when define is true and components.output hits the app entry', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: './src/index.ts',
        template: { define: true },
        components: { output: 'src/index.ts' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
        )
      }
    })

    it.concurrent('fails when define is true and components.output is inside the derived routes dir', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        template: { define: true },
        components: { output: './src/routes/index.ts' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: with template.define, components.output must not point at the app entry or inside the derived routes/ directory (it would be overwritten). Choose another path, e.g. src/components/index.ts.',
        )
      }
    })

    it.concurrent('fails when define is true and routes is specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        routes: { output: 'src/routes.ts' },
        template: { define: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: template.define and routes are mutually exclusive. define derives routes/ next to the app entry (output, default src/index.ts).',
        )
      }
    })

    it.concurrent('passes with define only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { define: true },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with routeHandler only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { routeHandler: true },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('ignores a removed template.output key in both variants', () => {
      const defineResult = parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { define: true, output: 'src/controllers' },
      })
      expect(defineResult.ok).toBe(true)
      if (defineResult.ok) {
        expect('output' in (defineResult.value.template ?? {})).toBe(false)
      }
      const nonDefineResult = parseConfig({
        input: 'openapi.yaml',
        output: 'src/index.ts',
        template: { output: 'src/controllers' },
      })
      expect(nonDefineResult.ok).toBe(true)
      if (nonDefineResult.ok) {
        expect(nonDefineResult.value.template?.define).toBe(false)
        expect('output' in (nonDefineResult.value.template ?? {})).toBe(false)
      }
    })
  })

  describe('components.output / per-type mutual exclusivity', () => {
    it.concurrent('fails when both output and a per-type component are specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          output: 'src/components/index.ts',
          schemas: { output: 'src/schemas' },
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components: components.output is mutually exclusive with per-type component outputs (schemas, responses, ...). Use output for single-file mode, or per-type fields for split mode.',
        )
      }
    })

    it.concurrent('passes with components.output only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { output: 'src/components/index.ts' },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with per-type components only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { schemas: { output: 'src/schemas' } },
      })
      expect(result.ok).toBe(true)
    })
  })

  describe('basePath option', () => {
    it.concurrent('accepts top-level basePath', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        basePath: '/api',
        output: 'src/routes.ts',
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.basePath).toBe('/api')
      }
    })

    it.concurrent('defaults basePath to "/" when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/routes.ts',
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.basePath).toBe('/')
      }
    })
  })

  describe('testFramework option', () => {
    it.concurrent('accepts test.testFramework: bun', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        test: { output: 'src/index.test.ts', import: './index', testFramework: 'bun' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.test?.testFramework).toBe('bun')
      }
    })

    it.concurrent('accepts test.testFramework: vitest', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        test: { output: 'src/index.test.ts', import: './index', testFramework: 'vitest' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.test?.testFramework).toBe('vitest')
      }
    })

    it.concurrent('test.testFramework defaults to vitest when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        test: { output: 'src/index.test.ts', import: './index' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.test?.testFramework).toBe('vitest')
      }
    })

    it.concurrent('accepts template.testFramework: bun', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/routes.ts',
        template: { test: true, testFramework: 'bun' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.template?.testFramework).toBe('bun')
      }
    })

    it.concurrent('template.testFramework defaults to vitest when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'src/routes.ts',
        template: { test: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.template?.testFramework).toBe('vitest')
      }
    })
  })

  describe('input accepts all supported extensions', () => {
    it.concurrent('accepts .json input', () => {
      const result = parseConfig({ input: 'openapi.json' })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.input).toBe('openapi.json')
      }
    })

    it.concurrent('accepts .tsp input', () => {
      const result = parseConfig({ input: 'main.tsp' })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.input).toBe('main.tsp')
      }
    })
  })

  describe('minimal config (input only)', () => {
    it.concurrent('accepts config with only input field', () => {
      const result = parseConfig({ input: 'openapi.yaml' })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.input).toBe('openapi.yaml')
        expect(result.value.rpc).toBeUndefined()
      }
    })
  })

  describe('parseConfig error formatting', () => {
    it.concurrent('includes path in error message when path is present', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client', client: 123 },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: rpc.client: Invalid input: expected string, received number',
        )
      }
    })

    it.concurrent('omits path prefix when path is empty', () => {
      const result = parseConfig(null)
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: Invalid input: expected object, received null')
      }
    })
  })

  describe('type option', () => {
    it.concurrent('accepts type with output', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        type: { output: 'types/index.ts' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.type?.output).toBe('types/index.ts')
      }
    })

    it.concurrent('accepts type with readonly', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        type: { output: 'types/index.ts', readonly: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.type?.readonly).toBe(true)
      }
    })

    it.concurrent('fails when type output is not .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        type: { output: 'types/index.js' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: type.output: must be .ts file')
      }
    })
  })

  describe('docs option', () => {
    it.concurrent('accepts docs with .md output', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: { output: 'docs/api.md' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.docs?.output).toBe('docs/api.md')
      }
    })

    it.concurrent('accepts docs with entry', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: { output: 'docs/api.md', entry: './src/index.ts' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.docs?.entry).toBe('./src/index.ts')
      }
    })

    it.concurrent('accepts docs with curl and baseUrl', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: { output: 'docs/api.md', curl: true, baseUrl: 'https://api.example.com' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.docs?.curl).toBe(true)
        expect(result.value.docs?.baseUrl).toBe('https://api.example.com')
      }
    })

    it.concurrent('fails when docs output is not .md', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: { output: 'docs/api.txt' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: docs.output: must be .md file')
      }
    })

    it.concurrent('fails when curl is true and entry is specified', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: {
          output: 'docs/api.md',
          curl: true,
          baseUrl: 'https://api.example.com',
          entry: './src/index.ts',
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: docs.entry: entry cannot be specified when curl is true',
        )
      }
    })

    it.concurrent('fails when curl is true and baseUrl is missing', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        docs: { output: 'docs/api.md', curl: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: docs.baseUrl: baseUrl is required when curl is true',
        )
      }
    })
  })

  describe('mock option', () => {
    it.concurrent('accepts mock with output', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'mock' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.mock?.output).toBe('mock/index.ts')
      }
    })

    it.concurrent('keeps mock output when already .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        mock: { output: 'mock/index.ts' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.mock?.output).toBe('mock/index.ts')
      }
    })
  })

  describe('query client options', () => {
    it.concurrent('accepts swr config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        swr: { output: 'swr', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.swr?.output).toBe('swr/index.ts')
      }
    })

    it.concurrent('accepts swr with custom client', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        swr: { output: 'swr/index.ts', import: '../client', client: 'apiClient' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.swr?.client).toBe('apiClient')
      }
    })

    it.concurrent('fails when swr split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        swr: { output: 'swr/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: swr.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts tanstack-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'tanstack-query': { output: 'tanstack', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['tanstack-query']?.output).toBe('tanstack/index.ts')
      }
    })

    it.concurrent('fails when tanstack-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'tanstack-query': { output: 'tanstack/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: tanstack-query.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts svelte-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'svelte-query': { output: 'svelte', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['svelte-query']?.output).toBe('svelte/index.ts')
      }
    })

    it.concurrent('fails when svelte-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'svelte-query': { output: 'svelte/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: svelte-query.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts vue-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'vue-query': { output: 'vue', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['vue-query']?.output).toBe('vue/index.ts')
      }
    })

    it.concurrent('fails when vue-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'vue-query': { output: 'vue/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: vue-query.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts preact-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'preact-query': { output: 'preact', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['preact-query']?.output).toBe('preact/index.ts')
      }
    })

    it.concurrent('fails when preact-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'preact-query': { output: 'preact/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: preact-query.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts solid-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'solid-query': { output: 'solid', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['solid-query']?.output).toBe('solid/index.ts')
      }
    })

    it.concurrent('fails when solid-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'solid-query': { output: 'solid/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: solid-query.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('accepts angular-query config', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'angular-query': { output: 'angular', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['angular-query']?.output).toBe('angular/index.ts')
      }
    })

    it.concurrent('fails when angular-query split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'angular-query': { output: 'angular/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: angular-query.output: split mode requires directory, not .ts file',
        )
      }
    })
  })

  describe('rpc.parseResponse option', () => {
    it.concurrent('accepts parseResponse: true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client', parseResponse: true },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.parseResponse).toBe(true)
      }
    })

    it.concurrent('parseResponse defaults to false when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.parseResponse).toBe(false)
      }
    })
  })

  describe('output validation', () => {
    it.concurrent('fails when output is not .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        output: 'routes/index.js',
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: output: must be .ts file')
      }
    })
  })

  describe('components split validation', () => {
    it.concurrent('fails when schemas split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { schemas: { output: 'schemas/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.schemas.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when securitySchemes split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { securitySchemes: { output: 'schemes/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.securitySchemes.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when requestBodies split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { requestBodies: { output: 'bodies/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.requestBodies.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when responses split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { responses: { output: 'responses/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.responses.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when examples split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { examples: { output: 'examples/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.examples.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when links split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { links: { output: 'links/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.links.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when callbacks split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { callbacks: { output: 'callbacks/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.callbacks.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when pathItems split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { pathItems: { output: 'items/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.pathItems.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when mediaTypes split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: { mediaTypes: { output: 'media/index.ts', split: true } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: components.mediaTypes.output: split mode requires directory, not .ts file',
        )
      }
    })
  })

  describe('components full value normalization', () => {
    it.concurrent('split=false: normalizes every component output and applies defaults', () => {
      const result = parseConfig({
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
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components).toStrictEqual({
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
      }
    })

    it.concurrent('split=true: keeps every component output as directory and applies defaults', () => {
      const result = parseConfig({
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
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components).toStrictEqual({
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
      }
    })

    it.concurrent('preserves exportTypes: true and import on a split component', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        components: {
          schemas: { output: 'schemas', split: true, exportTypes: true, import: '@/schemas' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.components?.schemas).toStrictEqual({
          split: true,
          output: 'schemas',
          import: '@/schemas',
          exportTypes: true,
        })
      }
    })
  })

  describe('test option normalization', () => {
    it.concurrent('normalizes test output', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        test: { output: 'tests', import: './index' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.test?.output).toBe('tests/index.ts')
      }
    })

    it.concurrent('keeps test output when already .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        test: { output: 'tests/api.test.ts', import: './index' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.test?.output).toBe('tests/api.test.ts')
      }
    })
  })
})

describe('defineConfig', () => {
  it('returns the config object as-is', () => {
    const config = {
      input: 'openapi.yaml' as const,
      output: 'routes.ts' as const,
    }
    expect(defineConfig(config)).toBe(config)
  })
})
