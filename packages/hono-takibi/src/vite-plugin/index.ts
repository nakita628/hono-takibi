import fsp from 'node:fs/promises'
import path from 'node:path'
import { callbacks } from '../core/callbacks.js'
import { examples } from '../core/examples.js'
import { headers } from '../core/headers.js'
import { links } from '../core/links.js'
import { parameter } from '../core/parameter.js'
import { moduleSpecFrom } from '../core/rel-import.js'
import { requestBodies } from '../core/request-bodies.js'
import { responses } from '../core/responses.js'
import { route } from '../core/route.js'
import { rpc } from '../core/rpc.js'
import { schema } from '../core/schema.js'
import { securitySchemes } from '../core/security-schemes.js'
import { takibi } from '../core/takibi.js'
import { type } from '../core/type.js'
import { parseConfig } from '../utils/index.js'

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

const isRecord = (v: unknown): v is Record<string, unknown> => typeof v === 'object' && v !== null
const isConf = (v: unknown): v is Conf => isRecord(v)
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
  const importMap = zo?.imports

  const withImport = (
    target: { readonly output: string | `${string}.ts`; readonly split?: boolean },
    spec: string | undefined,
  ): {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
    readonly import?: string
  } => (spec !== undefined ? { ...target, import: spec } : target)

  const schemaTarget =
    zo?.schemas !== undefined
      ? withImport(
          { output: toAbs(zo.schemas.output), split: zo.schemas.split === true },
          importMap?.schemas,
        )
      : undefined
  const examplesTarget =
    zo?.examples !== undefined
      ? withImport(
          { output: toAbs(zo.examples.output), split: zo.examples.split === true },
          importMap?.examples,
        )
      : undefined
  const headersTarget =
    zo?.headers !== undefined
      ? withImport(
          { output: toAbs(zo.headers.output), split: zo.headers.split === true },
          importMap?.headers,
        )
      : undefined
  const linksTarget =
    zo?.links !== undefined
      ? withImport(
          { output: toAbs(zo.links.output), split: zo.links.split === true },
          importMap?.links,
        )
      : undefined

  // zod-openapi top-level output (non-split)
  if (zo && !(zo.schemas || zo.routes) && zo.output) {
    const runZo = async () => {
      const out = toAbs(zo.output)
      if (!isTsFile(out))
        return `✗ zod-openapi: Invalid output format for zod-openapi: ${String(zo.output)}`
      const result = await takibi(
        c.input,
        out,
        zo.exportSchema ?? false,
        zo.exportType ?? false,
        false,
        false,
      )
      return result.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi: ${result.error}`
    }
    jobs.push(runZo())
  }

  // zod-openapi.schemas
  if (zo?.schemas) {
    const s = zo.schemas
    const runSchema = async () => {
      if (s.split === true) {
        const outDir = toAbs(s.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await schema(c.input, outDir, s.exportType === true, true)
        if (!r.ok) return `✗ schemas(split): ${r.error}`
        return removed.length > 0
          ? `✓ schemas(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ schemas(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(s.output)
      const r = await schema(c.input, out, s.exportType === true, false)
      return r.ok ? `✓ schemas -> ${out}` : `✗ schemas: ${r.error}`
    }
    jobs.push(runSchema())
  }

  // zod-openapi.parameter
  if (zo?.parameter) {
    const p = zo.parameter
    const runParameter = async () => {
      if (p.split === true) {
        const outDir = toAbs(p.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await parameter(
          c.input,
          outDir,
          p.exportType === true,
          true,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
        if (!r.ok) return `✗ parameter(split): ${r.error}`
        return removed.length > 0
          ? `✓ parameter(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ parameter(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(p.output)
      const r = await parameter(
        c.input,
        out,
        p.exportType === true,
        false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
      return r.ok ? `✓ parameter -> ${out}` : `✗ parameter: ${r.error}`
    }
    jobs.push(runParameter())
  }

  // zod-openapi.headers
  if (zo?.headers) {
    const h = zo.headers
    const runHeaders = async () => {
      if (h.split === true) {
        const outDir = toAbs(h.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await headers(
          c.input,
          outDir,
          h.exportType === true,
          true,
          schemaTarget ? { schemas: schemaTarget } : undefined,
        )
        if (!r.ok) return `✗ headers(split): ${r.error}`
        return removed.length > 0
          ? `✓ headers(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ headers(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(h.output)
      const r = await headers(
        c.input,
        out,
        h.exportType === true,
        false,
        schemaTarget ? { schemas: schemaTarget } : undefined,
      )
      return r.ok ? `✓ headers -> ${out}` : `✗ headers: ${r.error}`
    }
    jobs.push(runHeaders())
  }

  // zod-openapi.examples
  if (zo?.examples) {
    const e = zo.examples
    const runExamples = async () => {
      if (e.split === true) {
        const outDir = toAbs(e.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await examples(c.input, outDir, true)
        if (!r.ok) return `✗ examples(split): ${r.error}`
        return removed.length > 0
          ? `✓ examples(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ examples(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(e.output)
      const r = await examples(c.input, out, false)
      return r.ok ? `✓ examples -> ${out}` : `✗ examples: ${r.error}`
    }
    jobs.push(runExamples())
  }

  // zod-openapi.links
  if (zo?.links) {
    const l = zo.links
    const runLinks = async () => {
      if (l.split === true) {
        const outDir = toAbs(l.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await links(c.input, outDir, true)
        if (!r.ok) return `✗ links(split): ${r.error}`
        return removed.length > 0
          ? `✓ links(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ links(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(l.output)
      const r = await links(c.input, out, false)
      return r.ok ? `✓ links -> ${out}` : `✗ links: ${r.error}`
    }
    jobs.push(runLinks())
  }

  // zod-openapi.callbacks
  if (zo?.callbacks) {
    const cb = zo.callbacks
    const runCallbacks = async () => {
      if (cb.split === true) {
        const outDir = toAbs(cb.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await callbacks(c.input, outDir, true)
        if (!r.ok) return `✗ callbacks(split): ${r.error}`
        return removed.length > 0
          ? `✓ callbacks(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ callbacks(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(cb.output)
      const r = await callbacks(c.input, out, false)
      return r.ok ? `✓ callbacks -> ${out}` : `✗ callbacks: ${r.error}`
    }
    jobs.push(runCallbacks())
  }

  // zod-openapi.securitySchemes
  if (zo?.securitySchemes) {
    const s = zo.securitySchemes
    const runSecuritySchemes = async () => {
      if (s.split === true) {
        const outDir = toAbs(s.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await securitySchemes(c.input, outDir, s.exportType === true, true)
        if (!r.ok) return `✗ securitySchemes(split): ${r.error}`
        return removed.length > 0
          ? `✓ securitySchemes(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ securitySchemes(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(s.output)
      const r = await securitySchemes(c.input, out, s.exportType === true, false)
      return r.ok ? `✓ securitySchemes -> ${out}` : `✗ securitySchemes: ${r.error}`
    }
    jobs.push(runSecuritySchemes())
  }

  // zod-openapi.requestBodies
  if (zo?.requestBodies) {
    const b = zo.requestBodies
    const runRequestBodies = async () => {
      const imports =
        schemaTarget || examplesTarget
          ? { schemas: schemaTarget, examples: examplesTarget }
          : undefined

      if (b.split === true) {
        const outDir = toAbs(b.output)
        const removed = await deleteAllTsShallow(outDir)
        const r = await requestBodies(c.input, outDir, true, imports)
        if (!r.ok) return `✗ requestBodies(split): ${r.error}`
        return removed.length > 0
          ? `✓ requestBodies(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ requestBodies(split) -> ${outDir}/*.ts`
      }

      const out = toAbs(b.output)
      const r = await requestBodies(c.input, out, false, imports)
      return r.ok ? `✓ requestBodies -> ${out}` : `✗ requestBodies: ${r.error}`
    }
    jobs.push(runRequestBodies())
  }

  // zod-openapi.responses
  if (zo?.responses) {
    const r = zo.responses
    const runResponses = async () => {
      const imports =
        schemaTarget || headersTarget || examplesTarget || linksTarget
          ? {
              schemas: schemaTarget,
              headers: headersTarget,
              examples: examplesTarget,
              links: linksTarget,
            }
          : undefined

      if (r.split === true) {
        const outDir = toAbs(r.output)
        const removed = await deleteAllTsShallow(outDir)
        const rr = await responses(c.input, outDir, true, imports)
        if (!rr.ok) return `✗ responses(split): ${rr.error}`
        return removed.length > 0
          ? `✓ responses(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ responses(split) -> ${outDir}/*.ts`
      }

      const out = toAbs(r.output)
      const rr = await responses(c.input, out, false, imports)
      return rr.ok ? `✓ responses -> ${out}` : `✗ responses: ${rr.error}`
    }
    jobs.push(runResponses())
  }

  // zod-openapi.routes
  if (zo?.routes && zo.schemas) {
    const r = zo.routes
    const runRoutes = async () => {
      const out = toAbs(r.output)
      const fromFile = r.split === true ? path.join(out, 'index.ts') : out
      const schemasImport =
        importMap?.schemas ??
        moduleSpecFrom(fromFile, {
          output: toAbs(zo.schemas.output),
          split: zo.schemas.split === true,
        })

      const removed = r.split === true ? await deleteAllTsShallow(out) : []

      const rr = await route(
        c.input,
        out,
        schemasImport,
        r.split ?? false,
        zo.parameter || zo.headers || zo.requestBodies || zo.responses || zo.links || zo.callbacks
          ? {
              useComponentRefs:
                zo.requestBodies !== undefined ||
                zo.responses !== undefined ||
                zo.links !== undefined ||
                zo.callbacks !== undefined ||
                zo.headers !== undefined,
              imports: {
                parameter:
                  zo.parameter !== undefined
                    ? withImport(
                        { output: toAbs(zo.parameter.output), split: zo.parameter.split === true },
                        importMap?.parameters,
                      )
                    : undefined,
                headers:
                  zo.headers !== undefined
                    ? withImport(
                        { output: toAbs(zo.headers.output), split: zo.headers.split === true },
                        importMap?.headers,
                      )
                    : undefined,
                requestBodies:
                  zo.requestBodies !== undefined
                    ? withImport(
                        {
                          output: toAbs(zo.requestBodies.output),
                          split: zo.requestBodies.split === true,
                        },
                        importMap?.requestBodies,
                      )
                    : undefined,
                responses:
                  zo.responses !== undefined
                    ? withImport(
                        { output: toAbs(zo.responses.output), split: zo.responses.split === true },
                        importMap?.responses,
                      )
                    : undefined,
                links:
                  zo.links !== undefined
                    ? withImport(
                        { output: toAbs(zo.links.output), split: zo.links.split === true },
                        importMap?.links,
                      )
                    : undefined,
                callbacks:
                  zo.callbacks !== undefined
                    ? withImport(
                        { output: toAbs(zo.callbacks.output), split: zo.callbacks.split === true },
                        importMap?.callbacks,
                      )
                    : undefined,
                examples:
                  zo.examples !== undefined
                    ? withImport(
                        { output: toAbs(zo.examples.output), split: zo.examples.split === true },
                        importMap?.examples,
                      )
                    : undefined,
              },
            }
          : undefined,
      )
      if (!rr.ok) return r.split === true ? `✗ routes(split): ${rr.error}` : `✗ routes: ${rr.error}`
      if (r.split === true) {
        return removed.length > 0
          ? `✓ routes(split) -> ${out}/*.ts (cleaned ${removed.length})`
          : `✓ routes(split) -> ${out}/*.ts`
      }
      return `✓ routes -> ${out}`
    }
    jobs.push(runRoutes())
  }

  // type
  if (c.type) {
    const runType = async () => {
      const out = toAbs(c.type.output)
      if (!isTsFile(out)) return `✗ type: Invalid type output format: ${String(c.type?.output)}`
      const result = await type(c.input, out)
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
        const rr = await rpc(c.input, outDir, r.import, true)
        if (!rr.ok) return `✗ rpc(split): ${rr.error}`
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(r.output)
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

type OutputKind =
  | 'schemas'
  | 'routes'
  | 'parameter'
  | 'securitySchemes'
  | 'requestBodies'
  | 'responses'
  | 'headers'
  | 'examples'
  | 'links'
  | 'callbacks'
  | 'rpc'
  | 'type'

const pickSplitSpec = (c: Conf, kind: OutputKind): SplitSpec => {
  if (kind === 'rpc') {
    const r = c.rpc
    return r ? { present: true, split: r.split === true, out: toAbs(r.output) } : { present: false }
  }
  if (kind === 'type') {
    const t = c.type
    return t ? { present: true, split: false, out: toAbs(t.output) } : { present: false }
  }

  const zo = c['zod-openapi']
  if (!zo) return { present: false }

  if (kind === 'schemas') {
    const s = zo.schemas
    return s ? { present: true, split: s.split === true, out: toAbs(s.output) } : { present: false }
  }
  if (kind === 'routes') {
    const r = zo.routes
    return r ? { present: true, split: r.split === true, out: toAbs(r.output) } : { present: false }
  }
  if (kind === 'parameter') {
    const p = zo.parameter
    return p ? { present: true, split: p.split === true, out: toAbs(p.output) } : { present: false }
  }
  if (kind === 'securitySchemes') {
    const s = zo.securitySchemes
    return s ? { present: true, split: s.split === true, out: toAbs(s.output) } : { present: false }
  }
  if (kind === 'requestBodies') {
    const b = zo.requestBodies
    return b ? { present: true, split: b.split === true, out: toAbs(b.output) } : { present: false }
  }
  if (kind === 'responses') {
    const r = zo.responses
    return r ? { present: true, split: r.split === true, out: toAbs(r.output) } : { present: false }
  }
  if (kind === 'headers') {
    const h = zo.headers
    return h ? { present: true, split: h.split === true, out: toAbs(h.output) } : { present: false }
  }
  if (kind === 'examples') {
    const e = zo.examples
    return e ? { present: true, split: e.split === true, out: toAbs(e.output) } : { present: false }
  }
  if (kind === 'links') {
    const l = zo.links
    return l ? { present: true, split: l.split === true, out: toAbs(l.output) } : { present: false }
  }
  const cb = zo.callbacks
  return cb
    ? { present: true, split: cb.split === true, out: toAbs(cb.output) }
    : { present: false }
}

const pickZoTopNonSplit = (c: Conf): ZoTopSpec => {
  const zo = c['zod-openapi']
  if (!zo) return { present: false }
  const hasSchemas = !!zo.schemas
  const hasRoutes = !!zo.routes
  return !(hasSchemas || hasRoutes) && zo.output
    ? { present: true, out: toAbs(zo.output) }
    : { present: false }
}

const reconcileSplitTransition = async (prevC: Conf, nextC: Conf): Promise<string[]> => {
  const kinds: readonly OutputKind[] = [
    'schemas',
    'routes',
    'parameter',
    'securitySchemes',
    'requestBodies',
    'responses',
    'headers',
    'examples',
    'links',
    'callbacks',
    'rpc',
    'type',
  ]
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

  const zodDirs: Array<{ readonly output: string | `${string}.ts`; readonly split?: boolean }> = [
    ...(zo?.schemas ? [zo.schemas] : []),
    ...(zo?.routes ? [zo.routes] : []),
    ...(zo?.parameter ? [zo.parameter] : []),
    ...(zo?.securitySchemes ? [zo.securitySchemes] : []),
    ...(zo?.requestBodies ? [zo.requestBodies] : []),
    ...(zo?.responses ? [zo.responses] : []),
    ...(zo?.headers ? [zo.headers] : []),
    ...(zo?.examples ? [zo.examples] : []),
    ...(zo?.links ? [zo.links] : []),
    ...(zo?.callbacks ? [zo.callbacks] : []),
  ]
  for (const t of zodDirs) if (t.split === true) dirs.push(toAbs(t.output))

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
