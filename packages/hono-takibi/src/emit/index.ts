import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'

export async function emit(code: string, dir: string, output: string) {
  const [fmtResult, mkdirResult] = await Promise.all([fmt(code), mkdir(dir)])
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error } as const
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error } as const
  const writeResult = await writeFile(output, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error } as const
  return { ok: true, value: undefined } as const
}
