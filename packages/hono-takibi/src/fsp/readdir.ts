import fsp from 'node:fs/promises'
import type { Result } from '../result/index.js'

/**
 * @param { string } dir - The directory to read.
 * @returns { Promise<Result<string[], string>> } - A promise that resolves to a Result containing an array of file names or an error message.
 */
export async function readdir(dir: string): Promise<Result<string[], string>> {
  try {
    const files = await fsp.readdir(dir)
    return { ok: true, value: files }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
