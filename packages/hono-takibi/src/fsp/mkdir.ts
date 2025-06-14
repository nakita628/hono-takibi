import fsp from 'node:fs/promises'
import { ok, err } from '../result/index.js'
import type { Result } from '../result/index.js'

export async function mkdir(dir: string): Promise<Result<void, string>> {
  try {
    await fsp.mkdir(dir, { recursive: true })
    return ok(undefined)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}
