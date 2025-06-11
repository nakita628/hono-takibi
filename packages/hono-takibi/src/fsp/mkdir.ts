import type { Result } from '../result/index.js'
import fsp from 'node:fs/promises'

export async function mkdir(dir: string): Promise<Result<void, string>> {
  try {
    await fsp.mkdir(dir, { recursive: true })
    return { ok: true, value: undefined }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
