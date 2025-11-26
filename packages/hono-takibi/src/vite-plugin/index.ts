import fsp from 'node:fs/promises'
import path from 'node:path'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schema } from '../core/schema.js'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { zodOpenAPIHono } from '../generator/zod-openapi-hono/openapi/index.js'
import { routeCode } from '../generator/zod-openapi-hono/openapi/route/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { methodPath, parseConfig } from '../utils/index.js'

type Conf = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
const HTTP_METHODS: readonly HttpMethod[] = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
]

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

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const asRecord = (v: unknown): Record<string, unknown> => (isRecord(v) ? v : {})
const isOperationLike = (v: unknown): v is { readonly responses?: unknown } =>
  isRecord(v) && 'responses' in v
const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s)
const toAbs = (p: string) => path.resolve(process.cwd(), p)

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
    if (def === undefined) return { ok: false, error: 'Config must export default object' }
    // as unknown as Conf
    const parsed = parseConfig(def as Conf)
    return parsed.ok ? { ok: true, value: parsed.value } : { ok: false, error: parsed.error }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/* ──────────────────────────────────────────────────────────────
 * Purge helpers (NEVER generate a marker file)
 * ────────────────────────────────────────────────────────────── */

// Delete all .ts files one level below the directory
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

// Unlink the given .ts files (shallow)
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

// Remove unexpected .ts files (shallow) based on an expected set
const pruneDir = async (dir: string, expected: ReadonlySet<string>): Promise<string[]> =>
  fsp
    .stat(dir)
    .then((st) =>
      st.isDirectory()
        ? fsp.readdir(dir, { withFileTypes: true }).then(async (ents) => {
            const targets = ents
              .filter((e) => e.isFile() && e.name.endsWith('.ts') && !expected.has(e.name))
              .map((e) => path.join(dir, e.name))
            const res = await Promise.all(
              targets.map((f) =>
                fsp
                  .unlink(f)
                  .then(() => f)
                  .catch(() => null),
              ),
            )
            return res.filter((x) => x !== null)
          })
        : [],
    )
    .catch((): string[] => [])

// Remove directory if it is empty
const removeDirIfEmpty = async (dir: string): Promise<string[]> =>
  fsp
    .stat(dir)
    .then((st) =>
      st.isDirectory()
        ? fsp.readdir(dir).then((ents) =>
            ents.length === 0
              ? fsp
                  .rmdir(dir)
                  .then(() => [dir])
                  .catch((): string[] => [])
              : [],
          )
        : [],
    )
    .catch((): string[] => [])

// Remove parent directory if it becomes empty after a file removal
const removeEmptyParentDir = async (fileOrDir: string): Promise<string[]> =>
  fsp
    .stat(fileOrDir)
    .then((st) =>
      st.isDirectory() ? removeDirIfEmpty(fileOrDir) : removeDirIfEmpty(path.dirname(fileOrDir)),
    )
    .catch((): string[] => [])

/**
 * Always shallow-prune .ts files and try to remove the directory if it becomes empty.
 * We never create or rely on a marker file.
 */
const rmrfIfGeneratedOrShallow = async (dir: string): Promise<string[]> =>
  deleteAllTsShallow(dir).then((removed) => removeDirIfEmpty(dir).then((d) => removed.concat(d)))

/**
 * Purge an output path (file or directory) with safe policies.
 * - Directory: shallow-prune .ts and try to remove if empty
 * - File: unlink and try to remove empty parent directory
 */
const purgePath = async (out: string, expected?: ReadonlySet<string>): Promise<string[]> =>
  fsp
    .stat(out)
    .then(async (st) => {
      if (st.isDirectory()) {
        return expected ? pruneDir(out, expected) : rmrfIfGeneratedOrShallow(out)
      }
      if (st.isFile()) {
        const removedFile: string[] = await fsp
          .unlink(out)
          .then((): string[] => [out])
          .catch((): string[] => [])
        const removedParent: string[] = await removeEmptyParentDir(out)
        return removedFile.concat(removedParent)
      }
      return []
    })
    .catch(async (): Promise<string[]> => {
      const removedParent: string[] = await removeEmptyParentDir(out)
      return removedParent
    })

/* ──────────────────────────────────────────────────────────────
 * Route block extractor (used by computeRouteSplitFiles)
 * ────────────────────────────────────────────────────────────── */

const extractRouteBlocks = (src: string): { name: string; block: string }[] => {
  const re = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Route\s*=/g
  const hits: Array<{ name: string; start: number }> = []
  for (const m of src.matchAll(re)) {
    const name = (m[1] ?? '').trim()
    const start = m.index ?? 0
    if (name) hits.push({ name, start })
  }
  return hits.map((h, i) => {
    const start = h.start
    const end = i + 1 < hits.length ? (hits[i + 1]?.start ?? src.length) : src.length
    return { name: h.name, block: src.slice(start, end).trim() }
  })
}

const computeRpcSplitFiles = async (input: Conf['input']): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const acc = new Set<string>()
  const paths = asRecord(spec.value.paths)
  for (const p in paths) {
    const itemRec = asRecord(paths[p])
    for (const m of HTTP_METHODS) {
      const op = itemRec[m]
      if (isOperationLike(op)) acc.add(`${methodPath(m, p)}.ts`)
    }
  }
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

const computeRouteSplitFiles = async (input: Conf['input']): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const code = routeCode(spec.value.paths)
  const blocks = extractRouteBlocks(code)
  const acc = new Set<string>(blocks.map((b) => `${lowerFirst(b.name)}.ts`))
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

const computeSchemaSplitFiles = async (input: Conf['input']): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const schemas = asRecord(spec.value.components?.schemas)
  const names = Object.keys(schemas)
  const acc = new Set<string>(names.map((n) => `${lowerFirst(n)}.ts`))
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

const debounce = (ms: number, fn: () => void): (() => void) => {
  const bucket = new WeakMap<() => void, ReturnType<typeof setTimeout>>()
  const wrapped = (): void => {
    const prev = bucket.get(wrapped)
    if (prev !== undefined) clearTimeout(prev)
    bucket.set(wrapped, setTimeout(fn, ms))
  }
  return wrapped
}

const runAllWithConf = async (c: Conf): Promise<{ logs: string[] }> => {
  const jobs: Array<Promise<string>> = []

  const zo = c['zod-openapi']
  if (zo) {
    const exportType = zo.exportType === true
    const exportSchema = zo.exportSchema !== false
    const hs = !!zo.schema
    const hr = !!zo.route

    // top-level zod-openapi (non-split)
    if (!(hs || hr)) {
      const runZo = async () => {
        try {
          const spec = await parseOpenAPI(c.input)
          if (!spec.ok) return `✗ zod-openapi: ${spec.error}`
          const code = await fmt(zodOpenAPIHono(spec.value, exportSchema, exportType))
          if (!code.ok) return `✗ zod-openapi fmt: ${code.error}`

          const outputMaybe = zo.output
          if (typeof outputMaybe !== 'string') {
            return `✗ zod-openapi: Invalid output format for zod-openapi: ${String(outputMaybe)}`
          }
          const out = toAbs(outputMaybe)
          const mk = await mkdir(path.dirname(out))
          if (!mk.ok) return `✗ zod-openapi mkdir: ${mk.error}`
          const wr = await writeFile(out, code.value)
          return wr.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi write: ${wr.error}`
        } catch (e) {
          return `✗ zod-openapi: ${e instanceof Error ? e.message : String(e)}`
        }
      }
      jobs.push(runZo())
    }

    // zod-openapi.schema
    if (zo.schema) {
      const s = zo.schema
      const runSchema = async () => {
        if (s.split === true) {
          const outDir = toAbs(s.output)
          const r = await schema(c.input, outDir, s.exportType === true, true)
          if (!r.ok) return `✗ schema(split): ${r.error}`
          const want = await computeSchemaSplitFiles(c.input)
          const removed = await pruneDir(outDir, want)
          return removed.length > 0
            ? `✓ schema(split) -> ${outDir}/*.ts (pruned ${removed.length})`
            : `✓ schema(split) -> ${outDir}/*.ts`
        }
        const outputMaybe = s.output
        if (typeof outputMaybe !== 'string')
          return `✗ schema: Invalid schema output path: ${String(outputMaybe)}`
        const out = toAbs(outputMaybe)
        const r = await schema(c.input, out, s.exportType === true, false)
        return r.ok ? `✓ schema -> ${out}` : `✗ schema: ${r.error}`
      }
      jobs.push(runSchema())
    }

    // zod-openapi.route
    if (zo.route) {
      const r = zo.route
      const runRoute = async () => {
        if (r.split === true) {
          const outDir = toAbs(r.output)
          const rr = await route(c.input, outDir, r.import, true)
          if (!rr.ok) return `✗ route(split): ${rr.error}`
          const want = await computeRouteSplitFiles(c.input)
          const removed = await pruneDir(outDir, want)
          return removed.length > 0
            ? `✓ route(split) -> ${outDir}/*.ts (pruned ${removed.length})`
            : `✓ route(split) -> ${outDir}/*.ts`
        }
        const outputMaybe = r.output
        if (typeof outputMaybe !== 'string')
          return `✗ route: Invalid route output path: ${String(outputMaybe)}`
        const out = toAbs(outputMaybe)
        const rr = await route(c.input, out, r.import, false)
        return rr.ok ? `✓ route -> ${out}` : `✗ route: ${rr.error}`
      }
      jobs.push(runRoute())
    }
  }

  // rpc
  if (c.rpc) {
    const r = c.rpc
    const runRpc = async () => {
      if (r.split === true) {
        const outDir = toAbs(r.output)
        const rr = await rpc(c.input, outDir, r.import, true)
        if (!rr.ok) return `✗ rpc(split): ${rr.error}`
        const want = await computeRpcSplitFiles(c.input)
        const removed = await pruneDir(outDir, want)
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (pruned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const outputMaybe = r.output
      if (typeof outputMaybe !== 'string') {
        return `✗ rpc: Invalid output format for rpc (non-split mode must be .ts file): ${String(outputMaybe)}`
      }
      const out = toAbs(outputMaybe)
      const rr = await rpc(c.input, out, r.import, false)
      return rr.ok ? `✓ rpc -> ${out}` : `✗ rpc: ${rr.error}`
    }
    jobs.push(runRpc())
  }

  return Promise.all(jobs).then((logs) => ({ logs }))
}

/* ──────────────────────────────────────────────────────────────
 * Reconcile transitions (HMR) and report removals
 * ────────────────────────────────────────────────────────────── */

type SplitSpec = { present: false } | { present: true; split: boolean; out: string }
type ZoTopSpec = { present: false } | { present: true; out: string }

const pickSplitSpec = (c: Conf, kind: 'schema' | 'route' | 'rpc'): SplitSpec => {
  if (kind === 'schema') {
    const s = c['zod-openapi']?.schema
    return s ? { present: true, split: s.split === true, out: toAbs(s.output) } : { present: false }
  }
  if (kind === 'route') {
    const r = c['zod-openapi']?.route
    return r ? { present: true, split: r.split === true, out: toAbs(r.output) } : { present: false }
  }
  const rc = c.rpc
  return rc
    ? { present: true, split: rc.split === true, out: toAbs(rc.output) }
    : { present: false }
}

const pickZoTopNonSplit = (c: Conf): ZoTopSpec => {
  const zo = c['zod-openapi']
  if (!zo) return { present: false }
  const hasSchema = !!zo.schema
  const hasRoute = !!zo.route
  return !(hasSchema || hasRoute) && zo.output
    ? { present: true, out: toAbs(zo.output) }
    : { present: false }
}

const reconcileSplitTransition = async (prevC: Conf, nextC: Conf): Promise<string[]> => {
  const kinds: readonly ('schema' | 'route' | 'rpc')[] = ['schema', 'route', 'rpc'] as const
  const perKind = await Promise.all(
    kinds.map(async (kind) => {
      const prev = pickSplitSpec(prevC, kind)
      const next = pickSplitSpec(nextC, kind)
      const tasks: Array<Promise<string[]>> = []

      if (prev.present && prev.split && (!next.present || (next.present && !next.split)))
        tasks.push(purgePath(prev.out))
      if (prev.present && !prev.split && next.present && next.split) tasks.push(purgePath(prev.out))
      if (prev.present && prev.split && next.present && next.split && prev.out !== next.out)
        tasks.push(purgePath(prev.out))
      if (prev.present && !prev.split && next.present && !next.split && prev.out !== next.out)
        tasks.push(purgePath(prev.out))
      if (prev.present && !next.present) tasks.push(purgePath(prev.out))

      const removed = (await Promise.all(tasks)).flat()
      return removed.map((p) => `- removed: ${p}`).join('\n')
    }),
  )

  const prevTop = pickZoTopNonSplit(prevC)
  const nextTop = pickZoTopNonSplit(nextC)
  const topLogs =
    prevTop.present && (!nextTop.present || prevTop.out !== nextTop.out)
      ? (await purgePath(prevTop.out)).map((p) => `- removed: ${p}`).join('\n')
      : ''

  return [...perKind, topLogs].filter((s) => s.length > 0)
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

const outputDirsFromConf = (c: Conf): string[] => {
  const zo = c['zod-openapi']
  const dirs: string[] = []

  const s = zo?.schema
  if (s?.split === true) dirs.push(toAbs(s.output))

  const r = zo?.route
  if (r?.split === true) dirs.push(toAbs(r.output))

  const rp = c.rpc
  if (rp?.split === true) dirs.push(toAbs(rp.output))

  return dirs
}

/* ──────────────────────────────────────────────────────────────
 * Plugin (return `any`, no `let`)
 * ────────────────────────────────────────────────────────────── */

// biome-ignore lint: plugin
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
    const prev = state.current
    const next = await loadConfigHot(server)
    if (!next.ok) {
      console.error(`[hono-takibi] ✗ config: ${next.error}`)
      return
    }

    if (prev) {
      const removedLogs = await reconcileSplitTransition(prev, next.value)
      for (const block of removedLogs) if (block) console.log(`[hono-takibi]\n${block}`)
    }
    state.current = next.value

    addInputGlobs(server, toAbs(state.current.input))
    const dirs = outputDirsFromConf(state.current)
    for (const d of dirs) server.watcher.add(d)

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
        const outDirs = outputDirsFromConf(state.current)
        for (const d of outDirs) server.watcher.add(d)

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
