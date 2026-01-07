import fsp from 'node:fs/promises'
import path from 'node:path'
import { componentsCore } from '../core/index.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { takibi } from '../core/takibi.js'
import { type } from '../core/type.js'
import { parseOpenAPI } from '../openapi/index.js'
import { isRecord, parseConfig } from '../utils/index.js'

type Conf = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

// Minimal dev-server surface so we do not depend on Vite's types directly
type DevServerLike = {
  watcher: {
    add: (paths: string | readonly string[]) => void
    on: (event: 'all', cb: (evt: string, file: string) => void) => void
  }
  ws: { send: (payload: { type: string; [k: string]: unknown }) => void }
  pluginContainer: { resolveId: (id: string) => Promise<{ id: string } | null> }
  moduleGraph: {
    invalidateModule: (mod: { id?: string } | null) => void
    invalidateAll: () => void
    getModuleById: (id: string) => { id?: string } | null
  }
  ssrLoadModule: (id: string) => Promise<unknown>
}

/* ──────────────────────────────────────────────────────────────
 * Small helpers (no `as` cast)
 * ────────────────────────────────────────────────────────────── */

const isConf = (v: unknown): v is Conf => typeof v === 'object' && v !== null
const toAbs = (p: string) => path.resolve(process.cwd(), p)
const isTsFile = (p: string): p is `${string}.ts` => p.endsWith('.ts')

const loadConfigHot = async (
  server: DevServerLike,
): Promise<{ ok: true; value: Conf } | { ok: false; error: string }> => {
  const abs = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  try {
    const resolved = await server.pluginContainer.resolveId(abs)
    const id = resolved?.id
    if (id) {
      const node = server.moduleGraph.getModuleById(id)
      if (node) server.moduleGraph.invalidateModule(node)
    } else {
      server.moduleGraph.invalidateAll()
    }

    const mod = await server.ssrLoadModule(`${abs}?t=${Date.now()}`)
    const def = isRecord(mod) ? Reflect.get(mod, 'default') : undefined
    if (!isConf(def)) return { ok: false, error: 'Config must export default object' }
    const parsed = parseConfig(def)
    return parsed.ok ? { ok: true, value: parsed.value } : { ok: false, error: parsed.error }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/* ──────────────────────────────────────────────────────────────
 * Purge helpers (shallow .ts file cleanup)
 * ────────────────────────────────────────────────────────────── */

const listTsShallow = async (dir: string): Promise<string[]> =>
  fsp
    .stat(dir)
    .then((st) =>
      st.isDirectory()
        ? fsp
            .readdir(dir, { withFileTypes: true })
            .then((ents) =>
              ents
                .filter((e) => e.isFile() && e.name.endsWith('.ts'))
                .map((e) => path.join(dir, e.name)),
            )
        : [],
    )
    .catch((): string[] => [])

const deleteAllTsShallow = async (dir: string): Promise<string[]> =>
  listTsShallow(dir).then((files) =>
    Promise.all(
      files.map((f) =>
        fsp
          .unlink(f)
          .then(() => f)
          .catch(() => null),
      ),
    ).then((res) => res.filter((x) => x !== null)),
  )

const debounce = (ms: number, fn: () => void): (() => void) => {
  const bucket = new WeakMap<() => void, ReturnType<typeof setTimeout>>()
  const wrapped = (): void => {
    const prev = bucket.get(wrapped)
    if (prev !== undefined) clearTimeout(prev)
    bucket.set(wrapped, setTimeout(fn, ms))
  }
  return wrapped
}

/* ──────────────────────────────────────────────────────────────
 * Run generation with current config
 * ────────────────────────────────────────────────────────────── */

const runAllWithConf = async (c: Conf): Promise<{ logs: string[] }> => {
  const openAPIResult = await parseOpenAPI(c.input)
  if (!openAPIResult.ok) return { logs: [`✗ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  const jobs: Array<Promise<string>> = []

  const zo = c['zod-openapi']
  const components = zo?.components

  // zod-openapi top-level output (non-split)
  if (zo && !(components?.schemas || zo.routes) && zo.output) {
    const out = toAbs(zo.output)
    const runZo = async () => {
      if (!isTsFile(out)) return `✗ zod-openapi: Invalid output format: ${out}`
      const result = await takibi(openAPI, out, false, false, '/', {
        exportSchemasTypes: zo.exportSchemasTypes ?? false,
        exportSchemas: zo.exportSchemas ?? false,
        exportParametersTypes: zo.exportParametersTypes ?? false,
        exportParameters: zo.exportParameters ?? false,
        exportSecuritySchemes: zo.exportSecuritySchemes ?? false,
        exportRequestBodies: zo.exportRequestBodies ?? false,
        exportResponses: zo.exportResponses ?? false,
        exportHeadersTypes: zo.exportHeadersTypes ?? false,
        exportHeaders: zo.exportHeaders ?? false,
        exportExamples: zo.exportExamples ?? false,
        exportLinks: zo.exportLinks ?? false,
        exportCallbacks: zo.exportCallbacks ?? false,
      })
      return result.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi: ${result.error}`
    }
    jobs.push(runZo())
  }

  // components.schemas
  if (components?.schemas) {
    const s = components.schemas
    const runSchema = async () => {
      if (s.split === true) {
        const outDir = toAbs(s.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await componentsCore(
          { schemas: openAPI.components?.schemas ?? {} },
          'Schema',
          outDir,
          true,
          s.exportTypes === true,
        )
        if (!r.ok) return `✗ schemas(split): ${r.error}`
        return removed.length > 0
          ? `✓ schemas(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ schemas(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(s.output)
      const r = await componentsCore(
        { schemas: openAPI.components?.schemas ?? {} },
        'Schema',
        out,
        false,
        s.exportTypes === true,
      )
      return r.ok ? `✓ schemas -> ${out}` : `✗ schemas: ${r.error}`
    }
    jobs.push(runSchema())
  }

  // components.parameters
  if (components?.parameters) {
    const p = components.parameters
    const runParameters = async () => {
      const outDir = p.split === true ? toAbs(p.output) : toAbs(p.output)
      if (p.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { parameters: openAPI.components?.parameters ?? {} },
        'Parameter',
        outDir,
        p.split === true,
        p.exportTypes === true,
        components?.schemas ? { schemas: components.schemas } : undefined,
      )
      return r.ok
        ? `✓ parameters${p.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ parameters: ${r.error}`
    }
    jobs.push(runParameters())
  }

  // components.headers
  if (components?.headers) {
    const h = components.headers
    const runHeaders = async () => {
      const outDir = h.split === true ? toAbs(h.output) : toAbs(h.output)
      if (h.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { headers: openAPI.components?.headers ?? {} },
        'Header',
        outDir,
        h.split === true,
        h.exportTypes === true,
        components?.schemas ? { schemas: components.schemas } : undefined,
      )
      return r.ok
        ? `✓ headers${h.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ headers: ${r.error}`
    }
    jobs.push(runHeaders())
  }

  // components.examples
  if (components?.examples) {
    const e = components.examples
    const runExamples = async () => {
      const outDir = e.split === true ? toAbs(e.output) : toAbs(e.output)
      if (e.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { examples: openAPI.components?.examples ?? {} },
        'Example',
        outDir,
        e.split === true,
      )
      return r.ok
        ? `✓ examples${e.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ examples: ${r.error}`
    }
    jobs.push(runExamples())
  }

  // components.links
  if (components?.links) {
    const l = components.links
    const runLinks = async () => {
      const outDir = l.split === true ? toAbs(l.output) : toAbs(l.output)
      if (l.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { links: openAPI.components?.links ?? {} },
        'Link',
        outDir,
        l.split === true,
      )
      return r.ok
        ? `✓ links${l.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ links: ${r.error}`
    }
    jobs.push(runLinks())
  }

  // components.callbacks
  if (components?.callbacks) {
    const cb = components.callbacks
    const runCallbacks = async () => {
      const outDir = cb.split === true ? toAbs(cb.output) : toAbs(cb.output)
      if (cb.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { callbacks: openAPI.components?.callbacks ?? {} },
        'Callback',
        outDir,
        cb.split === true,
      )
      return r.ok
        ? `✓ callbacks${cb.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ callbacks: ${r.error}`
    }
    jobs.push(runCallbacks())
  }

  // components.securitySchemes
  if (components?.securitySchemes) {
    const s = components.securitySchemes
    const runSecuritySchemes = async () => {
      const outDir = s.split === true ? toAbs(s.output) : toAbs(s.output)
      if (s.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { securitySchemes: openAPI.components?.securitySchemes ?? {} },
        'SecurityScheme',
        outDir,
        s.split === true,
      )
      return r.ok
        ? `✓ securitySchemes${s.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ securitySchemes: ${r.error}`
    }
    jobs.push(runSecuritySchemes())
  }

  // components.requestBodies
  if (components?.requestBodies) {
    const b = components.requestBodies
    const runRequestBodies = async () => {
      const outDir = b.split === true ? toAbs(b.output) : toAbs(b.output)
      if (b.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { requestBodies: openAPI.components?.requestBodies ?? {} },
        'RequestBody',
        outDir,
        b.split === true,
        undefined,
        components?.schemas ? { schemas: components.schemas } : undefined,
      )
      return r.ok
        ? `✓ requestBodies${b.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ requestBodies: ${r.error}`
    }
    jobs.push(runRequestBodies())
  }

  // components.responses
  if (components?.responses) {
    const resp = components.responses
    const runResponses = async () => {
      const outDir = resp.split === true ? toAbs(resp.output) : toAbs(resp.output)
      if (resp.split === true) await deleteAllTsShallow(outDir)
      const r = await componentsCore(
        { responses: openAPI.components?.responses ?? {} },
        'Response',
        outDir,
        resp.split === true,
        undefined,
        components?.schemas ? { schemas: components.schemas } : undefined,
      )
      return r.ok
        ? `✓ responses${resp.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ responses: ${r.error}`
    }
    jobs.push(runResponses())
  }

  // zod-openapi.routes
  if (zo?.routes) {
    const r = zo.routes
    const runRoutes = async () => {
      const out = toAbs(r.output)
      if (r.split === true) await deleteAllTsShallow(out)
      const rr = await route(openAPI, { output: out, split: r.split ?? false }, components)
      return rr.ok
        ? `✓ routes${r.split === true ? '(split)' : ''} -> ${out}`
        : `✗ routes: ${rr.error}`
    }
    jobs.push(runRoutes())
  }

  // type
  if (c.type) {
    const t = c.type
    const out = toAbs(t.output)
    const runType = async () => {
      if (!isTsFile(out)) return `✗ type: Invalid output format: ${out}`
      const result = await type(openAPI, out)
      return result.ok ? `✓ type -> ${out}` : `✗ type: ${result.error}`
    }
    jobs.push(runType())
  }

  // rpc
  if (c.rpc) {
    const r = c.rpc
    const runRpc = async () => {
      if (r.split === true) {
        const outDir = toAbs(r.output)
        const removed = await deleteAllTsShallow(outDir)
        const rr = await rpc(openAPI, outDir, r.import, true)
        if (!rr.ok) return `✗ rpc(split): ${rr.error}`
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(r.output)
      const rr = await rpc(openAPI, out, r.import, false)
      return rr.ok ? `✓ rpc -> ${out}` : `✗ rpc: ${rr.error}`
    }
    jobs.push(runRpc())
  }

  return Promise.all(jobs).then((logs) => ({ logs }))
}

/* ──────────────────────────────────────────────────────────────
 * Watch helpers
 * ────────────────────────────────────────────────────────────── */

const addInputGlobs = (server: DevServerLike, absInput: string) => {
  const dir = path.dirname(absInput)
  const globs: string[] = [
    absInput,
    path.join(dir, '**/*.yaml'),
    path.join(dir, '**/*.json'),
    path.join(dir, '**/*.tsp'),
  ]
  server.watcher.add(globs)
}

/* ──────────────────────────────────────────────────────────────
 * Plugin
 * ────────────────────────────────────────────────────────────── */

// biome-ignore lint: plugin returns any for Vite compatibility
export function honoTakibiVite(): any {
  const state: { current: Conf | null } = { current: null }
  const absConfig = path.resolve(process.cwd(), 'hono-takibi.config.ts')

  const run = async () => {
    if (!state.current) return
    const { logs } = await runAllWithConf(state.current)
    for (const line of logs) console.log(`[hono-takibi] ${line}`)
  }

  const runAndReload = async (server?: DevServerLike) => {
    await run()
    if (server) server.ws.send({ type: 'full-reload' })
  }

  const onConfigChange = async (server: DevServerLike) => {
    const next = await loadConfigHot(server)
    if (!next.ok) {
      console.error(`[hono-takibi] ✗ config: ${next.error}`)
      return
    }
    state.current = next.value
    addInputGlobs(server, toAbs(state.current.input))
    await runAndReload(server)
  }

  const pluginLike = {
    name: 'hono-takibi-vite',

    handleHotUpdate(ctx: { file: string; server: DevServerLike }) {
      const abs = path.resolve(ctx.file)
      if (abs === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        console.log('[hono-takibi] config changed (hot-update)')
        onConfigChange(ctx.server).catch((e) => console.error('[hono-takibi] hot-update error:', e))
        return []
      }
      return
    },

    async buildStart() {
      // Dev-only: handled by configureServer
    },

    configureServer(server: DevServerLike) {
      ;(async () => {
        const first = await loadConfigHot(server)
        if (!first.ok) {
          console.error(`[hono-takibi] ✗ config: ${first.error}`)
          return
        }
        state.current = first.value

        addInputGlobs(server, toAbs(state.current.input))
        server.watcher.add(absConfig)

        const runDebounced = debounce(200, () => void runAndReload(server))

        server.watcher.on('all', async (_evt, file) => {
          const abs = path.resolve(file)
          if (abs === absConfig) {
            console.log('[hono-takibi] config changed (watch)')
            await onConfigChange(server)
            return
          }
          runDebounced()
        })

        await runAndReload(server)
      })().catch((e) => console.error('[hono-takibi] watch error:', e))
    },
  }

  return pluginLike
}
