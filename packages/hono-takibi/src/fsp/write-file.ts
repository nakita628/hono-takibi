import fsp from 'node:fs/promises'
import type { Result } from '../result/index.js'

/**
 * @param path
 * @param data
 * @returns
 */
export async function writeFile(path: string, data: string): Promise<Result<void, string>> {
  try {
    await fsp.writeFile(path, data, 'utf-8')
    return { ok: true, value: undefined }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
