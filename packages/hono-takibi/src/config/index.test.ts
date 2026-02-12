import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { parseConfig, readConfig } from './index.js'

describe('loadConfig()', () => {
  const origCwd = process.cwd()

  beforeEach(() => {
    vi.resetModules()
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'hono-takibi-config-ts-'))
    process.chdir(tmpdir)
  })

  afterEach(() => {
    const cwd = process.cwd()
    process.chdir(origCwd)
    fs.rmSync(cwd, { recursive: true, force: true })
  })

  it('passes: legacy top-level output mode', async () => {
    const p = path.join(process.cwd(), 'hono-takibi.config.ts')
    const c = `
export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    output: 'routes/index.ts',
    exportSchemasTypes: true,
    exportSchemas: true
  },
  rpc: {
    output: 'rpc/index.ts',
    import: '../client'
  }
}
`
    fs.writeFileSync(p, c, 'utf-8')

    await expect(readConfig()).resolves.toStrictEqual({
      ok: true,
      value: {
        input: 'openapi.yaml',
        'zod-openapi': {
          output: 'routes/index.ts',
          exportSchemasTypes: true,
          exportSchemas: true,
        },
        rpc: {
          output: 'rpc/index.ts',
          import: '../client',
        },
      },
    })
  })

  it('fails: config file missing', async () => {
    const result = await readConfig()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Config not found:/)
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
          pathAlias: '@/',
          routes: { output: 'src/routes', split: true, import: '@packages/routes' },
        },
      })
      expect(result.ok).toBe(true)
      if (result.ok) {
        expect(result.value['zod-openapi']?.routes?.import).toBe('@packages/routes')
        expect(result.value['zod-openapi']?.routes?.output).toBe('src/routes')
        expect(result.value['zod-openapi']?.pathAlias).toBe('@/')
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
        expect(result.value['zod-openapi']?.components?.webhooks?.import).toBe(
          '@packages/webhooks',
        )
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
        expect(result.error).toMatch(/split mode requires directory/)
      }
    })

    it.concurrent('fails when rpc split is true but output ends with .ts', () => {
      const result = parseConfig({
        input: 'openapi.yaml',
        rpc: { output: 'rpc/index.ts', import: '../client', split: true },
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toMatch(/split mode requires directory/)
      }
    })

    it.concurrent('fails when input is not .yaml, .json, or .tsp', () => {
      const result = parseConfig({
        input: 'openapi.txt' as `${string}.yaml`,
      })
      expect(result.ok).toBe(false)
      if (!result.ok) {
        expect(result.error).toMatch(/must be \.yaml \| \.json \| \.tsp/)
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
        expect(result.error).toMatch(/rpc\.client.*expected string/)
      }
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
        expect(result.error).toMatch(/output and routes are mutually exclusive/)
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
})
