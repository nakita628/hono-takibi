import fs from 'node:fs'

export function readFileSync(path: string):
  | {
      ok: true
      value: string
    }
  | {
      ok: false
      error: string
    } {
  try {
    const result = fs.readFileSync(path, 'utf-8')
    return {
      ok: true,
      value: result,
    }
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
    }
  }
}
