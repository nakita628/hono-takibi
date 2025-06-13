import fsp from 'node:fs/promises'
import { ok, err } from '../result/index.js'
import type { Result } from '../result/index.js'

/**
 * @param path
 * @param data
 * @returns
 */
export async function writeFile(path: string, data: string): Promise<Result<void, string>> {
  try {
    await fsp.writeFile(path, data, 'utf-8')
    return ok(undefined)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}
