// export { mkdir } from './mkdir.js'
// export { readdir } from './readdir.js'
// export { writeFile } from './write-file.js'

import fsp from 'node:fs/promises'
import { ok, err } from '../result/index.js'
import type { Result } from '../result/index.js'

/**
 * @param { string } dir - The directory to create.
 * @returns { Promise<Result<void, string>> } - A promise that resolves to a Result indicating success or an error message.
 */
export async function mkdir(dir: string): Promise<Result<void, string>> {
  try {
    await fsp.mkdir(dir, { recursive: true })
    return ok(undefined)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}

/**
 * @param { string } dir - The directory to read.
 * @returns { Promise<Result<string[], string>> } - A promise that resolves to a Result containing an array of file names or an error message.
 */
export async function readdir(dir: string): Promise<Result<string[], string>> {
  try {
    const files = await fsp.readdir(dir)
    return ok(files)
  } catch (e) {
    return err(e instanceof Error ? e.message : String(e))
  }
}

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
