import fs from 'node:fs'
import path from 'node:path'
import { afterEach, describe, expect, it } from 'vitest'
import { config } from './index.js'

// Test run
// pnpm vitest run ./src/config/index.test.ts

describe('cnfig', () => {
  const testFilePath = path.join(process.cwd(), 'hono-takibi.json')

  afterEach(() => {
    if (fs.existsSync(testFilePath)) {
      fs.unlinkSync(testFilePath)
    }
  })

  it('should return the default config', () => {
    const testConfig = {
      'hono-takibi': {
        input: 'openapi.yaml',
        output: 'test.ts',
        exportType: true,
        exportSchema: true,
      },
      rpc: {
        input: 'openapi.yaml',
        output: 'test.ts',
        import: 'openapi.yaml',
      },
    }

    fs.writeFileSync(testFilePath, JSON.stringify(testConfig), 'utf-8')

    expect(config()).toStrictEqual({
      ok: true,
      value: {
        'hono-takibi': {
          input: 'openapi.yaml',
          output: 'test.ts',
          exportType: true,
          exportSchema: true,
        },
        rpc: {
          input: 'openapi.yaml',
          output: 'test.ts',
          import: 'openapi.yaml',
        },
      },
    })
  })

  it('should return an error if the config file does not exist', () => {
    expect(config()).toStrictEqual({
      ok: false,
      error: "ENOENT: no such file or directory, open 'hono-takibi.json'",
    })
  })
})
