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

import { methodPath } from '../utils/index.js'

/* ──────────────────────────────────────────────────────────────
 * Types
 * ────────────────────────────────────────────────────────────── */

type HttpMethod = 'get' | 'put' | 'post' | 'delete' | 'options' | 'head' | 'patch' | 'trace'
const HTTP_METHODS: ReadonlyArray<HttpMethod> = [
  'get', 'put', 'post', 'delete', 'options', 'head', 'patch', 'trace',
] as const

// Minimal dev-server surface so we don't depend on Vite's types directly.
interface DevServerLike {
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

// Keep the same shape as `hono-takibi.config.ts` (key is 'zod-openapi').
type Conf = {
  readonly input: `${string}.yaml` | `${string}.json` | `${string}.tsp`
  readonly 'zod-openapi'?: {
    readonly output?: `${string}.ts`
    readonly exportType?: boolean
    readonly exportSchema?: boolean
    readonly schema?: {
      readonly output: string | `${string}.ts`
      readonly exportType?: boolean
      readonly split?: boolean
    }
    readonly route?: {
      readonly output: string | `${string}.ts`
      readonly import: string
      readonly split?: boolean
    }
  }
  readonly rpc?: {
    readonly output: string | `${string}.ts`
    readonly import: string
    readonly split?: boolean
  }
}

/* ──────────────────────────────────────────────────────────────
 * Small utils
 * ────────────────────────────────────────────────────────────── */

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isOperationLike = (v: unknown): v is { readonly responses?: unknown } => isRecord(v) && 'responses' in v
const lowerFirst = (s: string) => (s ? s.charAt(0).toLowerCase() + s.slice(1) : s)
const exists = (p: string) => fsp.stat(p).then(() => true).catch(() => false)
const isTsPath = (p: string) => p.endsWith('.ts')
const isYamlJsonOrTsp = (p: string) => /\.ya?ml$|\.json$|\.tsp$/.test(p)

/* ──────────────────────────────────────────────────────────────
 * Config hot-loader
 *   - Always re-load TS config via ssrLoadModule (bypass Node import cache)
 * ────────────────────────────────────────────────────────────── */

const loadConfigHot = async (
  server: DevServerLike,
): Promise<{ ok: true; value: Conf } | { ok: false; error: string }> => {
  const abs = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  try {
    const resolved = await server.pluginContainer.resolveId(abs)
    if (resolved?.id) {
      const node = server.moduleGraph.getModuleById(resolved.id)
      if (node) server.moduleGraph.invalidateModule(node)
    } else {
      server.moduleGraph.invalidateAll()
    }
    const mod = await server.ssrLoadModule(`${abs}?t=${Date.now()}`)
    const maybe = mod as { default?: unknown }
    if (!('default' in maybe) || typeof maybe.default !== 'object' || maybe.default === null) {
      return { ok: false, error: 'Config must export default object' }
    }
    return { ok: true, value: maybe.default as Conf }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/* ──────────────────────────────────────────────────────────────
 * Strict validation (block invalid/unsafe shapes early)
 * ────────────────────────────────────────────────────────────── */

type Valid = { ok: true } | { ok: false; error: string }

const validateConfStrict = (c: Conf): Valid => {
  if (!isYamlJsonOrTsp(c.input)) {
    return { ok: false, error: `Invalid input: ${c.input} (must be .yaml/.yml/.json/.tsp)` }
  }
  const zo = c['zod-openapi']
  if (zo) {
    const hasSchema = !!zo.schema
    const hasRoute = !!zo.route

    // When using nested schema/route, top-level output must not be set.
    if ((hasSchema || hasRoute) && typeof zo.output !== 'undefined') {
      return {
        ok: false,
        error:
          "Invalid config: When using 'zod-openapi.schema' or 'zod-openapi.route', do NOT set 'zod-openapi.output'.",
      }
    }

    // If neither schema nor route is specified, output must be a .ts file (non-split).
    if (!(hasSchema || hasRoute)) {
      if (!(zo.output && isTsPath(zo.output))) {
        return {
          ok: false,
          error: "Invalid 'zod-openapi.output': non-split mode requires a .ts file path",
        }
      }
    }

    // schema block
    if (hasSchema) {
      const s = zo.schema!
      if (s.split === true) {
        if (isTsPath(s.output)) {
          return {
            ok: false,
            error: `Invalid schema.output for split mode (must be a directory, not .ts): ${s.output}`,
          }
        }
      } else {
        if (!isTsPath(s.output)) {
          return {
            ok: false,
            error: `Invalid schema.output for non-split mode (must be .ts): ${s.output}`,
          }
        }
      }
    }

    // route block
    if (hasRoute) {
      const r = zo.route!
      if (!r.import || typeof r.import !== 'string') {
        return { ok: false, error: "Invalid 'zod-openapi.route.import': must be a string" }
      }
      if (r.split === true) {
        if (isTsPath(r.output)) {
          return {
            ok: false,
            error: `Invalid route.output for split mode (must be a directory, not .ts): ${r.output}`,
          }
        }
      } else {
        if (!isTsPath(r.output)) {
          return {
            ok: false,
            error: `Invalid route.output for non-split mode (must be .ts): ${r.output}`,
          }
        }
      }
    }
  }

  // rpc block
  if (c.rpc) {
    const r = c.rpc
    if (!r.import || typeof r.import !== 'string') {
      return { ok: false, error: "Invalid 'rpc.import': must be a string" }
    }
    if (r.split === true) {
      if (isTsPath(r.output)) {
        return {
          ok: false,
          error: `Invalid rpc.output for split mode (must be a directory, not .ts): ${r.output}`,
        }
      }
    } else {
      if (!isTsPath(r.output)) {
        return {
          ok: false,
          error: `Invalid rpc.output for non-split mode (must be .ts): ${r.output}`,
        }
      }
    }
  }

  return { ok: true }
}

/* ──────────────────────────────────────────────────────────────
 * Pruning helpers
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
    const end = i + 1 < hits.length ? hits[i + 1]!.start : src.length
    return { name: h.name, block: src.slice(start, end).trim() }
  })
}

const deleteFileIfExists = async (filePath: string): Promise<string[]> =>
  exists(filePath)
    .then((ok) => ok ? fsp.unlink(filePath).then(() => [filePath]).catch(() => []) : [])
    .catch(() => [])

/** List direct `.ts` files under a directory (non-recursive). */
const listTsShallow = async (dir: string): Promise<string[]> =>
  fsp.stat(dir)
    .then((st) => st.isDirectory()
      ? fsp.readdir(dir, { withFileTypes: true })
          .then((ents) => ents.filter((e) => e.isFile() && e.name.endsWith('.ts')).map((e) => path.join(dir, e.name)))
      : [])
    .catch(() => [])

/** Remove all `.ts` files directly under the directory (non-recursive). Return removed paths. */
const deleteAllTsShallow = async (dir: string): Promise<string[]> =>
  listTsShallow(dir)
    .then((files) =>
      Promise.all(files.map((f) => fsp.unlink(f).then(() => f).catch(() => null)))
        .then((res) => res.filter((x): x is string => x !== null)),
    )

/** Remove unexpected `.ts` files (non-recursive) based on an expected set of names. Return removed paths. */
const pruneDir = async (dir: string, expected: ReadonlySet<string>): Promise<string[]> =>
  fsp.stat(dir).then(
    (st) =>
      st.isDirectory()
        ? fsp.readdir(dir, { withFileTypes: true }).then((ents) => {
            const targets = ents
              .filter((e) => e.isFile() && e.name.endsWith('.ts') && !expected.has(e.name))
              .map((e) => path.join(dir, e.name))
            return Promise.all(targets.map((f) => fsp.unlink(f).then(() => f).catch(() => null)))
              .then((res) => res.filter((x): x is string => x !== null))
          })
        : [],
  ).catch(() => [])

/** Remove the directory itself if it becomes empty (single level). Return removed dir path if removed. */
const removeDirIfEmpty = async (dir: string): Promise<string[]> =>
  fsp.stat(dir).then(
    (st) =>
      st.isDirectory()
        ? fsp.readdir(dir).then((ents) =>
            ents.length === 0 ? fsp.rmdir(dir).then(() => [dir]).catch(() => []) : [],
          )
        : [],
  ).catch(() => [])

/** If the given path is a file, check its parent; if a dir, check itself; remove if empty. Return removed dir path if removed. */
const removeEmptyParentDir = async (fileOrDir: string): Promise<string[]> =>
  fsp.stat(fileOrDir)
    .then((st) => (st.isDirectory() ? removeDirIfEmpty(fileOrDir) : removeDirIfEmpty(path.dirname(fileOrDir))))
    .catch(() => [])

/** Generic purge:
 *  - If `out` is a file: delete it if exists; then try to remove empty parent directory.
 *  - If `out` is a directory: delete shallow `.ts` files; then remove the directory if empty.
 *  - If `expected` is provided and `out` is a directory: only remove unexpected `.ts` files.
 *  Returns every removed path (files and possibly directory).
 */
const purgePath = async (out: string, expected?: ReadonlySet<string>): Promise<string[]> =>
  fsp.stat(out).then(async (st) => {
    if (st.isDirectory()) {
      const removed = expected ? await pruneDir(out, expected) : await deleteAllTsShallow(out)
      const removedDir = await removeDirIfEmpty(out)
      return removed.concat(removedDir)
    }
    if (st.isFile()) {
      const removedFile = await deleteFileIfExists(out)
      const removedParent = await removeEmptyParentDir(out)
      return removedFile.concat(removedParent)
    }
    return []
  }).catch(async () => {
    // If stat fails, try as file parent (e.g., non-existent file path was given)
    const removedParent = await removeEmptyParentDir(out)
    return removedParent
  })

/* ──────────────────────────────────────────────────────────────
 * Split-mode filename calculators
 * ────────────────────────────────────────────────────────────── */

const computeRpcSplitFiles = async (
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const acc = new Set<string>()
  const paths = isRecord(spec.value.paths) ? (spec.value.paths as Record<string, unknown>) : {}
  for (const p in paths) {
    const itemRec = isRecord(paths[p]) ? (paths[p] as Record<string, unknown>) : {}
    for (const m of HTTP_METHODS) {
      const op = (itemRec as Record<string, unknown>)[m]
      if (isOperationLike(op)) acc.add(`${methodPath(m, p)}.ts`)
    }
  }
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

const computeRouteSplitFiles = async (
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const code = routeCode(spec.value.paths)
  const blocks = extractRouteBlocks(code)
  const acc = new Set<string>(blocks.map((b) => `${lowerFirst(b.name)}.ts`))
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

const computeSchemaSplitFiles = async (
  input: `${string}.yaml` | `${string}.json` | `${string}.tsp`,
): Promise<ReadonlySet<string>> => {
  const spec = await parseOpenAPI(input)
  if (!spec.ok) return new Set<string>()
  const schemas = spec.value.components?.schemas ?? {}
  const names = Object.keys(schemas)
  const acc = new Set<string>(names.map((n) => `${lowerFirst(n)}.ts`))
  if (acc.size > 0) acc.add('index.ts')
  return acc
}

/* ──────────────────────────────────────────────────────────────
 * Debounce helper (no `let`)
 * ────────────────────────────────────────────────────────────── */

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
 * Execute generation for a given config
 * ────────────────────────────────────────────────────────────── */

const runAllWithConf = async (c: Conf): Promise<{ logs: string[] }> => {
  const v = validateConfStrict(c)
  if (!v.ok) return { logs: [`✗ config: ${v.error}`] }

  const jobs: Array<Promise<string>> = []

  // zod-openapi
  const zo = c['zod-openapi']
  if (zo) {
    const exportType = zo.exportType === true
    const exportSchema = zo.exportSchema !== false
    const hasSchema = !!zo.schema
    const hasRoute = !!zo.route

    if (!(hasSchema || hasRoute)) {
      const runZo = async () => {
        const spec = await parseOpenAPI(c.input)
        if (!spec.ok) return `✗ zod-openapi: ${spec.error}`
        const code = await fmt(zodOpenAPIHono(spec.value, exportSchema, exportType))
        if (!code.ok) return `✗ zod-openapi fmt: ${code.error}`
        const out = zo.output as `${string}.ts`
        const mk = await mkdir(path.dirname(out))
        if (!mk.ok) return `✗ zod-openapi mkdir: ${mk.error}`
        const wr = await writeFile(out, code.value)
        return wr.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi write: ${wr.error}`
      }
      jobs.push(runZo())
    }

    if (hasSchema) {
      const s = zo.schema!
      const runSchema = async () => {
        if (s.split === true) {
          const r = await schema(c.input, s.output, s.exportType === true, true)
          if (!r.ok) return `✗ schema(split): ${r.error}`
          const want = await computeSchemaSplitFiles(c.input)
          const removed = await pruneDir(s.output, want)
          return removed.length > 0
            ? `✓ schema(split) -> ${s.output}/*.ts (pruned ${removed.length})`
            : `✓ schema(split) -> ${s.output}/*.ts`
        }
        const out = s.output as `${string}.ts`
        const r = await schema(c.input, out, s.exportType === true, false)
        return r.ok ? `✓ schema -> ${out}` : `✗ schema: ${r.error}`
      }
      jobs.push(runSchema())
    }

    if (hasRoute) {
      const r = zo.route!
      const runRoute = async () => {
        if (r.split === true) {
          const outDir = r.output
          const rr = await route(c.input, outDir, r.import, true)
          if (!rr.ok) return `✗ route(split): ${rr.error}`
          const want = await computeRouteSplitFiles(c.input)
          const removed = await pruneDir(outDir, want)
          return removed.length > 0
            ? `✓ route(split) -> ${outDir}/*.ts (pruned ${removed.length})`
            : `✓ route(split) -> ${outDir}/*.ts`
        }
        const out = r.output as `${string}.ts`
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
        const outDir = r.output
        const rr = await rpc(c.input, outDir, r.import, true)
        if (!rr.ok) return `✗ rpc(split): ${rr.error}`
        const want = await computeRpcSplitFiles(c.input)
        const removed = await pruneDir(outDir, want)
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (pruned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const out = r.output as `${string}.ts`
      const rr = await rpc(c.input, out, r.import, false)
      return rr.ok ? `✓ rpc -> ${out}` : `✗ rpc: ${rr.error}`
    }
    jobs.push(runRpc())
  }

  return Promise.all(jobs).then((logs) => ({ logs }))
}

/* ──────────────────────────────────────────────────────────────
 * Cleanup when split/non-split flips or output path changes
 *   - Use generic purgePath() to handle both files and directories.
 *   - Return log lines with removed paths for better UX.
 * ────────────────────────────────────────────────────────────── */

type SplitSpec = { present: false } | { present: true; split: boolean; out: string }

const pickSplitSpec = (c: Conf, kind: 'schema' | 'route' | 'rpc'): SplitSpec => {
  if (kind === 'schema') {
    const s = c['zod-openapi']?.schema
    return s ? { present: true, split: s.split === true, out: s.output } : { present: false }
  }
  if (kind === 'route') {
    const r = c['zod-openapi']?.route
    return r ? { present: true, split: r.split === true, out: r.output } : { present: false }
  }
  const rc = c.rpc
  return rc ? { present: true, split: rc.split === true, out: rc.output } : { present: false }
}

/** Reconcile transitions and return detailed removal logs. */
const reconcileSplitTransition = async (prevC: Conf, nextC: Conf): Promise<string[]> => {
  const kinds: ReadonlyArray<'schema' | 'route' | 'rpc'> = ['schema', 'route', 'rpc']
  return Promise.all(
    kinds.map(async (kind) => {
      const prev = pickSplitSpec(prevC, kind)
      const next = pickSplitSpec(nextC, kind)

      // Decide which old path to purge and with what strategy.
      const tasks: Promise<string[]>[] = []

      // split -> non-split or removed
      if (prev.present && prev.split && (!next.present || (next.present && !next.split))) {
        tasks.push(purgePath(prev.out)) // remove old dir .ts and maybe the dir
      }

      // non-split -> split
      if (prev.present && !prev.split && next.present && next.split) {
        tasks.push(purgePath(prev.out)) // remove old single .ts and maybe empty parent
      }

      // split -> split but output dir changed
      if (prev.present && prev.split && next.present && next.split && prev.out !== next.out) {
        tasks.push(purgePath(prev.out)) // remove old dir content and maybe the dir
      }

      // non-split -> non-split but output file changed
      if (prev.present && !prev.split && next.present && !next.split && prev.out !== next.out) {
        tasks.push(purgePath(prev.out))
      }

      // present -> not present (remove outputs entirely)
      if (prev.present && !next.present) {
        tasks.push(purgePath(prev.out))
      }

      const removed = (await Promise.all(tasks)).flat()
      return removed.map((p) => `- removed: ${p}`).join('\n')
    }),
  ).then((blocks) => blocks.filter((b) => b.length > 0))
}

/* ──────────────────────────────────────────────────────────────
 * Watch target helpers
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
  if (zo?.schema?.split === true) dirs.push(zo.schema.output)
  if (zo?.route?.split === true) dirs.push(zo.route.output)
  if (c.rpc?.split === true) dirs.push(c.rpc.output)
  return dirs
}

/* ──────────────────────────────────────────────────────────────
 * Plugin (no `let`; state via const object)
 * ────────────────────────────────────────────────────────────── */

export function HonoTakibiVite(): any {
  // Keep mutable state inside a const object (avoid `let`).
  const state: { current: Conf | null } = { current: null }
  const absConfig = path.resolve(process.cwd(), 'hono-takibi.config.ts')

  // Run generators for the current config.
  const run = async () => {
    if (!state.current) return
    const { logs } = await runAllWithConf(state.current)
    for (const line of logs) {
      // eslint-disable-next-line no-console
      console.log(`[hono-takibi] ${line}`)
    }
  }

  // Run and trigger a full reload.
  const runAndReload = async (server?: DevServerLike) => {
    await run()
    if (server) server.ws.send({ type: 'full-reload' })
  }

  // React to config change: validate, reconcile split/non-split, rewatch, rerun.
  const onConfigChange = async (server: DevServerLike) => {
    const prev = state.current
    const next = await loadConfigHot(server)
    if (!next.ok) {
      // eslint-disable-next-line no-console
      console.error(`[hono-takibi] ✗ config: ${next.error}`)
      return
    }
    const valid = validateConfStrict(next.value)
    if (!valid.ok) {
      // eslint-disable-next-line no-console
      console.error(`[hono-takibi] ✗ config: ${valid.error}`)
      return
    }

    if (prev) {
      const removedLogs = await reconcileSplitTransition(prev, next.value)
      for (const block of removedLogs) {
        if (block) console.log(`[hono-takibi]\n${block}`)
      }
    }
    state.current = next.value

    addInputGlobs(server, path.resolve(process.cwd(), state.current.input))
    const dirs = outputDirsFromConf(state.current)
    for (const d of dirs) server.watcher.add(path.resolve(d))

    await runAndReload(server)
  }

  // Return a plain object; the caller may cast to `Plugin`.
  const pluginLike = {
    name: 'hono-takibi-vite',
    async buildStart() {
      // No-op: dev mode handles hot config loading in `configureServer`.
    },
    configureServer(server: DevServerLike) {
      ;(async () => {
        // Initial hot load of config.
        const first = await loadConfigHot(server)
        if (!first.ok) {
          // eslint-disable-next-line no-console
          console.error(`[hono-takibi] ✗ config: ${first.error}`)
          return
        }
        const valid = validateConfStrict(first.value)
        if (!valid.ok) {
          // eslint-disable-next-line no-console
          console.error(`[hono-takibi] ✗ config: ${valid.error}`)
          return
        }
        state.current = first.value

        // Watch input spec and its directory (to catch $ref, etc.)
        addInputGlobs(server, path.resolve(process.cwd(), state.current.input))

        // Watch split output directories so we can react to unlink events.
        const outDirs = outputDirsFromConf(state.current)
        for (const d of outDirs) server.watcher.add(path.resolve(d))

        // Watch the config itself.
        server.watcher.add(absConfig)

        // Debounced runner for normal file changes.
        const runDebounced = debounce(200, () => void runAndReload(server))

        // Single chokidar 'all' handler covers add/change/unlink.
        server.watcher.on('all', async (_evt, file) => {
          const abs = path.resolve(file)
          if (abs === absConfig) {
            // eslint-disable-next-line no-console
            console.log('[hono-takibi] config changed (hot reload)')
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
