import { readFileSync } from '../fs/index.js'

export type Config = {
  'hono-takibi'?: {
    input?: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output?: `${string}.ts`
    exportType?: boolean
    exportSchema?: boolean
  }
  rpc?: {
    input?: `${string}.yaml` | `${string}.json` | `${string}.tsp`
    output?: `${string}.ts`
    import?: string
  }
}

export function config():
  | {
      ok: true
      value: Config
    }
  | {
      ok: false
      error: string
    } {
  const readFileSyncResult = readFileSync('hono-takibi.json')
  if (!readFileSyncResult.ok) {
    return {
      ok: false,
      error: readFileSyncResult.error,
    }
  }
  const config: Config = JSON.parse(readFileSyncResult.value)
  return {
    ok: true,
    value: config,
  }
}
