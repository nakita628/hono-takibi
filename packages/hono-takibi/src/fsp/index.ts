import fsp from 'node:fs/promises'

export async function unlink(path: string) {
  try {
    await fsp.unlink(path)
    return { ok: true, value: undefined } as const
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: true, value: undefined } as const
    }
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

export async function mkdir(dir: string) {
  try {
    await fsp.mkdir(dir, { recursive: true })
    return {
      ok: true,
      value: undefined,
    } as const
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    } as const
  }
}

export async function readdir(dir: string) {
  try {
    const files = await fsp.readdir(dir)
    return { ok: true, value: files } as const
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: false, error: e.message, notFound: true } as const
    }
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    } as const
  }
}

export async function readFile(path: string) {
  try {
    const content = await fsp.readFile(path, 'utf-8')
    return { ok: true, value: content } as const
  } catch (e) {
    if (e instanceof Error && 'code' in e && e.code === 'ENOENT') {
      return { ok: true, value: null } as const
    }
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

export async function writeFile(path: string, data: string) {
  try {
    const existing = await fsp.readFile(path, 'utf-8').catch(() => null)
    if (existing === data) return { ok: true, value: undefined } as const
    await fsp.writeFile(path, data, 'utf-8')
    return { ok: true, value: undefined } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}
