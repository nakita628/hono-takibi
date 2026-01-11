import fsp from 'node:fs/promises'

/**
 * Creates a directory if it does not already exist.
 *
 * @param dir - Directory path to create.
 * @returns A `Result` that is `ok` on success, otherwise an error message.
 */
export async function mkdir(dir: string): Promise<
  | {
      readonly ok: false
      readonly error: string
    }
  | {
      readonly ok: true
      readonly value: undefined
    }
> {
  try {
    await fsp.mkdir(dir, { recursive: true })
    return {
      ok: true,
      value: undefined,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

/**
 * Reads the contents of a directory.
 *
 * @param dir - Directory to read.
 * @returns A `Result` with the file list on success, otherwise an error message.
 */
export async function readdir(dir: string): Promise<
  | {
      readonly ok: false
      error: string
    }
  | {
      readonly ok: true
      readonly value: string[]
    }
> {
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

/**
 * Writes UTF-8 text to a file, creating it if necessary.
 *
 * @param path - File path to write.
 * @param data - Text data to write.
 * @returns A `Result` that is `ok` on success, otherwise an error message.
 */
export async function writeFile(
  path: string,
  data: string,
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
  try {
    await fsp.writeFile(path, data, 'utf-8')
    return { ok: true, value: undefined }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/fsp/index.ts
if (import.meta.vitest) {
  const { describe, it, expect, afterEach, beforeAll, beforeEach } = import.meta.vitest
  const fs = await import('node:fs')
  const path = await import('node:path')

  const TEST_DIR = path.join(process.cwd(), 'test-tmp-dir')

  describe('fsp', () => {
    afterEach(async () => {
      if (fs.existsSync(TEST_DIR)) {
        await fsp.rm(TEST_DIR, { recursive: true })
      }
    })

    describe('mkdir', () => {
      it('returns ok when directory is created', async () => {
        const result = await mkdir(TEST_DIR)
        expect(result).toEqual({ ok: true, value: undefined })
        expect(fs.existsSync(TEST_DIR)).toBe(true)
      })

      it('returns ok when directory already exists (recursive:true)', async () => {
        await fsp.mkdir(TEST_DIR, { recursive: true })
        const result = await mkdir(TEST_DIR)
        expect(result).toEqual({ ok: true, value: undefined })
      })

      it('returns err for invalid path', async () => {
        const filePath = path.join(TEST_DIR, 'foo.txt')
        await fsp.mkdir(TEST_DIR, { recursive: true })
        await fsp.writeFile(filePath, 'dummy')
        const badPath = path.join(filePath, 'bar')
        const result = await mkdir(badPath)
        expect(result.ok).toBe(false)
        if (!result.ok) {
          expect(typeof result.error).toBe('string')
          expect(result.error.length).toBeGreaterThan(0)
        }
      })
    })

    describe('readdir', () => {
      beforeAll(async () => {
        await fsp.mkdir(TEST_DIR, { recursive: true })
        await fsp.writeFile(path.join(TEST_DIR, 'a.txt'), 'A')
        await fsp.writeFile(path.join(TEST_DIR, 'b.txt'), 'B')
      })

      it('returns files for a valid directory', async () => {
        const result = await readdir(TEST_DIR)
        expect(result.ok).toBe(true)
        if (result.ok) {
          expect(Array.isArray(result.value)).toBe(true)
          expect(result.value).toContain('a.txt')
          expect(result.value).toContain('b.txt')
        }
      })

      it('returns err for non-existent directory', async () => {
        const nonExist = path.join(TEST_DIR, 'no-such-dir')
        const result = await readdir(nonExist)
        expect(result.ok).toBe(false)
        if (!result.ok) {
          expect(typeof result.error).toBe('string')
          expect(result.error.length).toBeGreaterThan(0)
        }
      })
    })

    describe('writeFile', () => {
      beforeEach(async () => {
        await fsp.mkdir(TEST_DIR, { recursive: true })
      })

      it('writes file successfully', async () => {
        const filePath = path.join(TEST_DIR, 'ok.txt')
        const result = await writeFile(filePath, 'hello')
        expect(result.ok).toBe(true)
        const text = await fsp.readFile(filePath, 'utf-8')
        expect(text).toBe('hello')
      })

      it('returns err for invalid path', async () => {
        const filePath = path.join(TEST_DIR, 'foo.txt')
        await fsp.writeFile(filePath, 'dummy')
        const badPath = path.join(filePath, 'bar.txt')
        const result = await writeFile(badPath, 'fail')
        expect(result.ok).toBe(false)
        if (!result.ok) {
          expect(typeof result.error).toBe('string')
          expect(result.error.length).toBeGreaterThan(0)
        }
      })
    })
  })
}
