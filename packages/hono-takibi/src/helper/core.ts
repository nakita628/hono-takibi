import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'

/**
 * Generate core code.
 *
 * @param code
 * @param dir
 * @param output
 */
export async function core(
  code: string,
  dir: string,
  output: string,
): Promise<
  | {
      readonly ok: true
      readonly value: undefined
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  const fmtResult = await fmt(code)
  if (!fmtResult.ok) return { ok: false, error: fmtResult.error }
  const mkdirResult = await mkdir(dir)
  if (!mkdirResult.ok) return { ok: false, error: mkdirResult.error }
  const writeResult = await writeFile(output, fmtResult.value)
  if (!writeResult.ok) return { ok: false, error: writeResult.error }
  return { ok: true, value: undefined }
}
