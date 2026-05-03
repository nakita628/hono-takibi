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
})

describe('parseConfig()', () => {
  describe('normalizes output path to /index.ts when split is false', () => {
    it.concurrent('normalizes routes.output when split is undefined', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'routes' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.output).toBe('routes/index.ts')
      }
    })

    it.concurrent('normalizes routes.output when split is false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'routes', split: false },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.output).toBe('routes/index.ts')
      }
    })

    it.concurrent('keeps routes.output unchanged when already ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'routes/custom.ts' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.output).toBe('routes/custom.ts')
      }
    })

    it.concurrent('keeps routes.output as directory when split is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'routes', split: true },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.output).toBe('routes')
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
        'zod-openapi': {
          components: {
            schemas: { output: 'schemas' },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.components?.schemas?.output).toBe('schemas/index.ts')
      }
    })

    it.concurrent('normalizes components.parameters.output when split is false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: {
            parameters: { output: 'parameters', split: false },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.components?.parameters?.output).toBe(
          'parameters/index.ts',
        )
      }
    })

    it.concurrent('keeps components.schemas.output as directory when split is true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: {
            schemas: { output: 'schemas', split: true },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.components?.schemas?.output).toBe('schemas')
      }
    })

    it.concurrent('normalizes multiple components at once', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: {
            schemas: { output: 'schemas' },
            parameters: { output: 'parameters' },
            responses: { output: 'responses/index.ts' },
            headers: { output: 'headers', split: true },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.components?.schemas?.output).toBe('schemas/index.ts')
        expect(result.value['zod-openapi']?.components?.parameters?.output).toBe(
          'parameters/index.ts',
        )
        expect(result.value['zod-openapi']?.components?.responses?.output).toBe(
          'responses/index.ts',
        )
        expect(result.value['zod-openapi']?.components?.headers?.output).toBe('headers')
      }
    })
  })

  describe('readonly option', () => {
    it.concurrent('accepts readonly: true', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          readonly: true,
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.readonly).toBe(true)
      }
    })

    it.concurrent('accepts readonly: false', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          readonly: false,
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.readonly).toBe(false)
      }
    })

    it.concurrent('accepts undefined readonly (optional)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: {
            schemas: { output: 'schemas/index.ts' },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.readonly).toBeUndefined()
      }
    })
  })

  describe('routes.import and webhooks.import', () => {
    it.concurrent('preserves routes.import through parsing', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'src/routes.ts', import: '@packages/routes' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.import).toBe('@packages/routes')
        expect(result.value['zod-openapi']?.routes?.output).toBe('src/routes.ts')
      }
    })

    it.concurrent('preserves routes.import with split and pathAlias', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          template: { pathAlias: '@/' },
          routes: { output: 'src/routes', split: true, import: '@packages/routes' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.import).toBe('@packages/routes')
        expect(result.value['zod-openapi']?.routes?.output).toBe('src/routes')
        expect(result.value['zod-openapi']?.template?.pathAlias).toBe('@/')
      }
    })

    it.concurrent('routes without import field works (backward compat)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'src/routes.ts' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.import).toBeUndefined()
      }
    })

    it.concurrent('preserves webhooks.import through parsing', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: {
            webhooks: { output: 'src/webhooks.ts', import: '@packages/webhooks' },
          },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.components?.webhooks?.import).toBe('@packages/webhooks')
      }
    })
  })

  describe('validation errors', () => {
    it.concurrent('fails when split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'routes/index.ts', split: true },
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.routes.output: split mode requires directory, not .ts file',
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
        'zod-openapi': { output: 'routes.ts' },
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
        'zod-openapi': {
          output: 'src/routes.ts',
          routes: { output: 'src/routes' },
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi: output and routes are mutually exclusive. Use output for single-file mode, or routes for separate route output.',
        )
      }
    })

    it.concurrent('passes with output only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'src/routes.ts',
        },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with routes only', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          routes: { output: 'src/routes.ts' },
        },
      })
      expect(result.ok).toBe(true)
    })

    it.concurrent('passes with neither output nor routes', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          exportSchemas: true,
        },
      })
      expect(result.ok).toBe(true)
    })
  })

  describe('basePath option', () => {
    it.concurrent('accepts top-level basePath', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        basePath: '/api',
        'zod-openapi': {
          output: 'src/routes.ts',
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.basePath).toBe('/api')
      }
    })

    it.concurrent('basePath is optional (undefined by default)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'src/routes.ts',
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.basePath).toBeUndefined()
      }
    })

    it.concurrent('strips basePath inside zod-openapi (not preserved)', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'src/routes.ts',
          basePath: '/api',
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect('basePath' in (result.value['zod-openapi'] ?? {})).toBe(false)
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
        'zod-openapi': {
          output: 'src/routes.ts',
          template: { test: true, testFramework: 'bun' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.template?.testFramework).toBe('bun')
      }
    })

    it.concurrent('template.testFramework defaults to vitest when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'src/routes.ts',
          template: { test: true },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.template?.testFramework).toBe('vitest')
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
        expect(result.value['zod-openapi']).toBeUndefined()
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

    it.concurrent('parseResponse is undefined when omitted', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client' },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value.rpc?.parseResponse).toBeUndefined()
      }
    })
  })

  describe('zod-openapi.output validation', () => {
    it.concurrent('fails when zod-openapi output is not .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { output: 'routes/index.js' },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe('Invalid config: zod-openapi.output: must be .ts file')
      }
    })
  })

  describe('components split validation', () => {
    it.concurrent('fails when schemas split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { schemas: { output: 'schemas/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.schemas.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when securitySchemes split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: { securitySchemes: { output: 'schemes/index.ts', split: true } },
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.securitySchemes.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when requestBodies split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': {
          components: { requestBodies: { output: 'bodies/index.ts', split: true } },
        },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.requestBodies.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when responses split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { responses: { output: 'responses/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.responses.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when examples split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { examples: { output: 'examples/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.examples.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when links split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { links: { output: 'links/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.links.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when callbacks split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { callbacks: { output: 'callbacks/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.callbacks.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when pathItems split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { pathItems: { output: 'items/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.pathItems.output: split mode requires directory, not .ts file',
        )
      }
    })

    it.concurrent('fails when mediaTypes split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        'zod-openapi': { components: { mediaTypes: { output: 'media/index.ts', split: true } } },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toBe(
          'Invalid config: zod-openapi.components.mediaTypes.output: split mode requires directory, not .ts file',
        )
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
      'zod-openapi': { output: 'routes.ts' as const },
    }
    expect(defineConfig(config)).toBe(config)
  })
})
