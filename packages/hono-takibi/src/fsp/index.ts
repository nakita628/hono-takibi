import fsp from 'node:fs/promises'

export async function unlink(path: string): Promise<
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
    await fsp.unlink(path)
    return { ok: true, value: undefined }
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: true, value: undefined }
    }
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

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

export async function readdir(dir: string): Promise<
  | {
      readonly ok: false
      readonly error: string
      readonly notFound?: true
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
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: false, error: e.message, notFound: true }
    }
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}

export async function readFile(path: string): Promise<
  | {
      readonly ok: true
      readonly value: string | null
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  try {
    const content = await fsp.readFile(path, 'utf-8')
    return { ok: true, value: content }
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: true, value: null }
    }
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

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
    const existing = await fsp.readFile(path, 'utf-8').catch(() => null)
    if (existing === data) return { ok: true, value: undefined }
    await fsp.writeFile(path, data, 'utf-8')
    return { ok: true, value: undefined }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}
