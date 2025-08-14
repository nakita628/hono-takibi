import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { config } from './index.js'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('config', () => {
  const origCwd = process.cwd()

  beforeEach(() => {
    vi.resetModules()
    const tmpdir = fs.mkdtempSync(path.join(os.tmpdir(), 'hono-takibi-config-'))
    process.chdir(tmpdir)
  })

  afterEach(() => {
    const cwd = process.cwd()
    process.chdir(origCwd)
    fs.rmSync(cwd, { recursive: true, force: true })
  })

  it('should return the default config', async () => {
    const testFilePath = path.join(process.cwd(), 'hono-takibi.config.ts')
    const testConfig = `import { defineConfig } from '../hono-takibi/src/config'

export default defineConfig({
  'hono-takibi': {
    input: 'openapi.yaml',
    output: 'routes/index.ts',
    exportType: true,
    exportSchema: true,
  },
  rpc: {
    input: 'openapi.yaml',
    output: 'rpc/index.ts',
    import: "import { client } from '../index.ts'",
  },
})`
    fs.writeFileSync(testFilePath, testConfig, 'utf-8')

    await expect(config()).resolves.toStrictEqual({
      ok: true,
      value: {
        'hono-takibi': {
          input: 'openapi.yaml',
          output: 'routes/index.ts',
          exportType: true,
          exportSchema: true,
        },
        rpc: {
          input: 'openapi.yaml',
          output: 'rpc/index.ts',
          import: "import { client } from '../index.ts'",
        },
      },
    })
  })

  it('should return an error if the config file does not exist', async () => {
    const result = await config()
    expect(result.ok).toBe(false)
  })
})
