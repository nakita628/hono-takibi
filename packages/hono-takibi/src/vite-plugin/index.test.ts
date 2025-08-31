import fs from 'node:fs/promises'
import path from 'node:path'
import { afterEach, describe, expect, it, vi } from 'vitest'
import HonoTakibiVite from './index.js'

// Test run
// pnpm vitest run ./src/vite-plugin/index.test.ts

vi.mock('../format/index.js', () => ({
  fmt: vi.fn(async (code) => ({ ok: true, value: code })),
}))

vi.mock('../generator/zod-openapi-hono/openapi/index.js', () => ({
  zodOpenAPIHono: vi.fn(() => 'export const dummy = true'),
}))

vi.mock('../openapi/index.js', () => ({
  parseOpenAPI: vi.fn(async (_input) => ({
    ok: true,
    value: { info: { title: 'Mock' } },
  })),
}))

const tmpOut = path.resolve('./tmp/test-output.ts') as `${string}.ts`

describe('HonoTakibiVite', () => {
  afterEach(async () => {
    try {
      await fs.unlink(tmpOut)
    } catch {}
  })

  it('writes generated file on buildStart', async () => {
    const plugin = await HonoTakibiVite({
      input: './example.tsp',
      output: tmpOut,
    })

    await plugin.buildStart()
    const code = await fs.readFile(tmpOut, 'utf-8')
    expect(code).toContain('export const dummy = true')
  })

  it('returns false if parseOpenAPI fails', async () => {
    const { parseOpenAPI } = await import('../openapi/index.js')
    vi.mocked(parseOpenAPI).mockResolvedValueOnce({ ok: false, error: String(new Error('fail')) })

    const plugin = await HonoTakibiVite({
      input: './example.tsp',
      output: tmpOut,
    })

    const result = await plugin.buildStart()
    expect(result).toBeUndefined()
  })
})
