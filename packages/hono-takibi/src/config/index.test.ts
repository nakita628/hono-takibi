// src/config/index.test.ts
import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { config } from './index'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('config()', () => {
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

    await expect(config()).resolves.toStrictEqual({
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
    const result = await config()
    expect(result.ok).toBe(false)
    if (!result.ok) {
      expect(result.error).toMatch(/Config not found:/)
    }
  })
})
