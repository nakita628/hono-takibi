// src/core.test.ts
import { beforeEach, describe, expect, it, vi } from 'vitest'

// System under test (ESM)
import core from './core.ts'

// Test run
// pnpm vitest run ./src/core/core.test.ts

// --- Mocks ---
vi.mock('../openapi/index.js', () => ({
  parseOpenAPI: vi.fn(),
  // re-export type placeholder if your TS config needs it; not used at runtime
}))
vi.mock('../format/index.js', () => ({
  fmt: vi.fn(),
}))
vi.mock('../fsp/index.js', () => ({
  mkdir: vi.fn(),
  writeFile: vi.fn(),
}))

// Narrow typed helpers for Result-like returns
type Ok<T> = { ok: true; value: T }
type Err = { ok: false; error: string }
const ok = <T>(value: T): Ok<T> => ({ ok: true, value })
const err = (error: string): Err => ({ ok: false, error })

// Grab mocked fns
const mockedParse = vi.mocked(await import('../openapi/index.js')).parseOpenAPI
const mockedFmt = vi.mocked(await import('../format/index.js')).fmt
const { mkdir: mockedMkdir, writeFile: mockedWriteFile } = vi.mocked(
  await import('../fsp/index.js'),
)

describe('core()', () => {
  const input = 'spec.yaml' as const
  const output = 'out/generated.ts' as const
  const importCode = "import { z } from 'zod'"
  const valuePrefix = 'Generated code written to'
  // biome-ignore lint: test
  const fakeOpenAPI = { openapi: '3.1.0' } as any
  // biome-ignore lint: test
  const gen = vi.fn<(o: any, i: string) => string>()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('success: parses → formats → mkdir → writeFile and returns ok', async () => {
    mockedParse.mockResolvedValueOnce(ok(fakeOpenAPI))
    gen.mockReturnValueOnce('// GENERATED')
    mockedFmt.mockResolvedValueOnce(ok('// FORMATTED'))
    mockedMkdir.mockResolvedValueOnce(ok(undefined))
    mockedWriteFile.mockResolvedValueOnce(ok(undefined))
    const res = await core(input, output, importCode, valuePrefix, gen)
    expect(res).toStrictEqual({ ok: true, value: `${valuePrefix} ${output}` })
    expect(mockedParse).toHaveBeenCalledWith(input)
    expect(gen).toHaveBeenCalledWith(fakeOpenAPI, importCode)
    expect(mockedFmt).toHaveBeenCalledWith('// GENERATED')
    expect(mockedMkdir).toHaveBeenCalledWith('out')
    expect(mockedWriteFile).toHaveBeenCalledWith(output, '// FORMATTED')
  })

  it('failure: parseOpenAPI error short-circuits', async () => {
    mockedParse.mockResolvedValueOnce(err('parse error'))
    const res = await core(input, output, importCode, valuePrefix, gen)
    expect(res).toStrictEqual({ ok: false, error: 'parse error' })
    expect(gen).not.toHaveBeenCalled()
    expect(mockedFmt).not.toHaveBeenCalled()
    expect(mockedMkdir).not.toHaveBeenCalled()
    expect(mockedWriteFile).not.toHaveBeenCalled()
  })

  it('failure: fmt error short-circuits', async () => {
    mockedParse.mockResolvedValueOnce(ok(fakeOpenAPI))
    gen.mockReturnValueOnce('// GENERATED')
    mockedFmt.mockResolvedValueOnce(err('format error'))
    const res = await core(input, output, importCode, valuePrefix, gen)
    expect(res).toStrictEqual({ ok: false, error: 'format error' })
    expect(mockedMkdir).not.toHaveBeenCalled()
    expect(mockedWriteFile).not.toHaveBeenCalled()
  })

  it('failure: mkdir error short-circuits', async () => {
    mockedParse.mockResolvedValueOnce(ok(fakeOpenAPI))
    gen.mockReturnValueOnce('// GENERATED')
    mockedFmt.mockResolvedValueOnce(ok('// FORMATTED'))
    mockedMkdir.mockResolvedValueOnce(err('mkdir error'))
    const res = await core(input, output, importCode, valuePrefix, gen)
    expect(res).toStrictEqual({ ok: false, error: 'mkdir error' })
    expect(mockedWriteFile).not.toHaveBeenCalled()
  })

  it('failure: writeFile error', async () => {
    mockedParse.mockResolvedValueOnce(ok(fakeOpenAPI))
    gen.mockReturnValueOnce('// GENERATED')
    mockedFmt.mockResolvedValueOnce(ok('// FORMATTED'))
    mockedMkdir.mockResolvedValueOnce(ok(undefined))
    mockedWriteFile.mockResolvedValueOnce(err('write error'))
    const res = await core(input, output, importCode, valuePrefix, gen)
    expect(res).toStrictEqual({ ok: false, error: 'write error' })
  })
})
