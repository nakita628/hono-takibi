/**
 * Vite plugin module for hono-takibi.
 *
 * Provides a Vite plugin that automatically regenerates TypeScript code
 * from OpenAPI specifications during development. Watches for changes
 * in the OpenAPI spec and config file, triggering hot reloads.
 *
 * ```mermaid
 * flowchart TD
 *   A["honoTakibiVite()"] --> B["configureServer()"]
 *   B --> C["loadConfigHot()"]
 *   C --> D["parseOpenAPI(input)"]
 *   D --> E["runAllWithConf()"]
 *   E --> F["Generate schemas"]
 *   E --> G["Generate routes"]
 *   E --> H["Generate types/rpc"]
 *   F --> I["Write files"]
 *   G --> I
 *   H --> I
 *   I --> J["Hot reload"]
 * ```
 *
 * @module vite-plugin
 */
import fsp from 'node:fs/promises'
import path from 'node:path'
import { parseConfig } from '../config/index.js'
import {
  callbacks,
  examples,
  headers,
  links,
  parameters,
  requestBodies,
  responses,
  route,
  rpc,
  schemas,
  securitySchemes,
  takibi,
  type,
} from '../core/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { isRecord } from '../utils/index.js'

/**
 * Parsed configuration type extracted from parseConfig result.
 */
type Conf = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

/**
 * Minimal Vite dev-server interface.
 *
 * Defines only the surface area needed by this plugin, avoiding
 * direct dependency on Vite's types for better compatibility.
 */
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

/**
 * Type guard for configuration objects.
 *
 * @param v - Value to check
 * @returns True if value is a valid configuration object
 */
const isConf = (v: unknown): v is Conf => typeof v === 'object' && v !== null

/**
 * Converts a relative path to an absolute path.
 *
 * @param p - Relative path
 * @returns Absolute path resolved from current working directory
 */
const toAbs = (p: string) => path.resolve(process.cwd(), p)

/**
 * Type guard for TypeScript file paths.
 *
 * @param p - Path to check
 * @returns True if path ends with .ts
 */
const isTsFile = (p: string): p is `${string}.ts` => p.endsWith('.ts')

/**
 * Hot-loads the hono-takibi configuration file.
 *
 * Invalidates the module cache and reloads the config file to pick up
 * changes during development. Uses Vite's SSR module loading.
 *
 * @param server - Vite dev server instance
 * @returns Promise resolving to parsed config or error
 */
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

/**
 * Lists TypeScript files in a directory (shallow, non-recursive).
 *
 * @param dir - Directory path to scan
 * @returns Promise resolving to array of absolute file paths
 */
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

/**
 * Deletes all TypeScript files in a directory (shallow, non-recursive).
 *
 * Used to clean up stale generated files before regeneration.
 *
 * @param dir - Directory path to clean
 * @returns Promise resolving to array of deleted file paths
 */
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

/**
 * Creates a debounced version of a function.
 *
 * Delays invocation until after the specified milliseconds have elapsed
 * since the last call. Uses WeakMap for cleanup.
 *
 * @param ms - Delay in milliseconds
 * @param fn - Function to debounce
 * @returns Debounced function
 */
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

/**
 * Runs all code generation tasks based on the provided configuration.
 *
 * Executes generation tasks in parallel for optimal performance.
 * Each task handles a specific component type (schemas, routes, etc.).
 *
 * ```mermaid
 * flowchart LR
 *   A["runAllWithConf"] --> B["parseOpenAPI"]
 *   B --> C["Promise.all"]
 *   C --> D["schemas"]
 *   C --> E["routes"]
 *   C --> F["parameters"]
 *   C --> G["headers"]
 *   C --> H["responses"]
 *   C --> I["...others"]
 * ```
 *
 * @param c - Parsed configuration object
 * @returns Promise resolving to object containing log messages
 */
const runAllWithConf = async (c: Conf): Promise<{ logs: string[] }> => {
  const openAPIResult = await parseOpenAPI(c.input)
  if (!openAPIResult.ok) return { logs: [`✗ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  const jobs: Array<Promise<string>> = []

  const zodOpenAPI = c['zod-openapi']
  const components = zodOpenAPI?.components

  // zod-openapi top-level output (non-split)
  if (zodOpenAPI && !(components?.schemas || zodOpenAPI.routes) && zodOpenAPI.output) {
    const out = toAbs(zodOpenAPI.output)
    const runZodOpenAPI = async () => {
      if (!isTsFile(out)) return `✗ zod-openapi: Invalid output format: ${out}`
      const result = await takibi(openAPI, out, false, false, '/', {
        exportSchemasTypes: zodOpenAPI.exportSchemasTypes ?? false,
        exportSchemas: zodOpenAPI.exportSchemas ?? false,
        exportParametersTypes: zodOpenAPI.exportParametersTypes ?? false,
        exportParameters: zodOpenAPI.exportParameters ?? false,
        exportSecuritySchemes: zodOpenAPI.exportSecuritySchemes ?? false,
        exportRequestBodies: zodOpenAPI.exportRequestBodies ?? false,
        exportResponses: zodOpenAPI.exportResponses ?? false,
        exportHeadersTypes: zodOpenAPI.exportHeadersTypes ?? false,
        exportHeaders: zodOpenAPI.exportHeaders ?? false,
        exportExamples: zodOpenAPI.exportExamples ?? false,
        exportLinks: zodOpenAPI.exportLinks ?? false,
        exportCallbacks: zodOpenAPI.exportCallbacks ?? false,
      })
      return result.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi: ${result.error}`
    }
    jobs.push(runZodOpenAPI())
  }

  // components.schemas
  if (components?.schemas) {
    const schemasConfig = components.schemas
    const runSchema = async () => {
      if (schemasConfig.split === true) {
        const outDir = toAbs(schemasConfig.output)
        const removed = await deleteAllTsShallow(outDir)
        const schemaResult = await schemas(
          openAPI.components?.schemas,
          outDir,
          true,
          schemasConfig.exportTypes === true,
        )
        if (!schemaResult.ok) return `✗ schemas(split): ${schemaResult.error}`
        return removed.length > 0
          ? `✓ schemas(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ schemas(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(schemasConfig.output)
      const schemaResult = await schemas(
        openAPI.components?.schemas,
        out,
        false,
        schemasConfig.exportTypes === true,
      )
      return schemaResult.ok ? `✓ schemas -> ${out}` : `✗ schemas: ${schemaResult.error}`
    }
    jobs.push(runSchema())
  }

  // components.parameters
  if (components?.parameters) {
    const parametersConfig = components.parameters
    const runParameters = async () => {
      const outDir = toAbs(parametersConfig.output)
      if (parametersConfig.split === true) await deleteAllTsShallow(outDir)
      const parameterResult = await parameters(
        openAPI.components?.parameters,
        outDir,
        parametersConfig.split === true,
        parametersConfig.exportTypes === true,
        components?.schemas,
      )
      return parameterResult.ok
        ? `✓ parameters${parametersConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ parameters: ${parameterResult.error}`
    }
    jobs.push(runParameters())
  }

  // components.headers
  if (components?.headers) {
    const headersConfig = components.headers
    const runHeaders = async () => {
      const outDir = toAbs(headersConfig.output)
      if (headersConfig.split === true) await deleteAllTsShallow(outDir)
      const headersResult = await headers(
        openAPI.components?.headers,
        outDir,
        headersConfig.split === true,
        headersConfig.exportTypes === true,
        components?.schemas,
      )
      return headersResult.ok
        ? `✓ headers${headersConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ headers: ${headersResult.error}`
    }
    jobs.push(runHeaders())
  }

  // components.examples
  if (components?.examples) {
    const examplesConfig = components.examples
    const runExamples = async () => {
      const outDir = toAbs(examplesConfig.output)
      if (examplesConfig.split === true) await deleteAllTsShallow(outDir)
      const examplesResult = await examples(
        openAPI.components?.examples,
        outDir,
        examplesConfig.split === true,
      )
      return examplesResult.ok
        ? `✓ examples${examplesConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ examples: ${examplesResult.error}`
    }
    jobs.push(runExamples())
  }

  // components.links
  if (components?.links) {
    const linksConfig = components.links
    const runLinks = async () => {
      const outDir = toAbs(linksConfig.output)
      if (linksConfig.split === true) await deleteAllTsShallow(outDir)
      const linksResult = await links(openAPI.components?.links, outDir, linksConfig.split === true)
      return linksResult.ok
        ? `✓ links${linksConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ links: ${linksResult.error}`
    }
    jobs.push(runLinks())
  }

  // components.callbacks
  if (components?.callbacks) {
    const callbacksConfig = components.callbacks
    const runCallbacks = async () => {
      const outDir = toAbs(callbacksConfig.output)
      if (callbacksConfig.split === true) await deleteAllTsShallow(outDir)
      const callbacksResult = await callbacks(
        openAPI.components?.callbacks,
        outDir,
        callbacksConfig.split === true,
      )
      return callbacksResult.ok
        ? `✓ callbacks${callbacksConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ callbacks: ${callbacksResult.error}`
    }
    jobs.push(runCallbacks())
  }

  // components.securitySchemes
  if (components?.securitySchemes) {
    const securitySchemesConfig = components.securitySchemes
    const runSecuritySchemes = async () => {
      const outDir = toAbs(securitySchemesConfig.output)
      if (securitySchemesConfig.split === true) await deleteAllTsShallow(outDir)
      const securitySchemesResult = await securitySchemes(
        openAPI.components?.securitySchemes,
        outDir,
        securitySchemesConfig.split === true,
      )
      return securitySchemesResult.ok
        ? `✓ securitySchemes${securitySchemesConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ securitySchemes: ${securitySchemesResult.error}`
    }
    jobs.push(runSecuritySchemes())
  }

  // components.requestBodies
  if (components?.requestBodies) {
    const requestBodiesConfig = components.requestBodies
    const runRequestBodies = async () => {
      const outDir = toAbs(requestBodiesConfig.output)
      if (requestBodiesConfig.split === true) await deleteAllTsShallow(outDir)
      const requestBodiesResult = await requestBodies(
        openAPI.components?.requestBodies,
        outDir,
        requestBodiesConfig.split === true,
        components?.schemas,
      )
      return requestBodiesResult.ok
        ? `✓ requestBodies${requestBodiesConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ requestBodies: ${requestBodiesResult.error}`
    }
    jobs.push(runRequestBodies())
  }

  // components.responses
  if (components?.responses) {
    const responsesConfig = components.responses
    const runResponses = async () => {
      const outDir = toAbs(responsesConfig.output)
      if (responsesConfig.split === true) await deleteAllTsShallow(outDir)
      const responsesResult = await responses(
        openAPI.components?.responses,
        outDir,
        responsesConfig.split === true,
        components?.schemas,
      )
      return responsesResult.ok
        ? `✓ responses${responsesConfig.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ responses: ${responsesResult.error}`
    }
    jobs.push(runResponses())
  }

  // zod-openapi.routes
  if (zodOpenAPI?.routes) {
    const routesConfig = zodOpenAPI.routes
    const runRoutes = async () => {
      const out = toAbs(routesConfig.output)
      if (routesConfig.split === true) await deleteAllTsShallow(out)
      const routeResult = await route(
        openAPI,
        { output: out, split: routesConfig.split ?? false },
        components,
      )
      return routeResult.ok
        ? `✓ routes${routesConfig.split === true ? '(split)' : ''} -> ${out}`
        : `✗ routes: ${routeResult.error}`
    }
    jobs.push(runRoutes())
  }

  // type
  if (c.type) {
    const typeConfig = c.type
    const out = toAbs(typeConfig.output)
    const runType = async () => {
      if (!isTsFile(out)) return `✗ type: Invalid output format: ${out}`
      const typeResult = await type(openAPI, out)
      return typeResult.ok ? `✓ type -> ${out}` : `✗ type: ${typeResult.error}`
    }
    jobs.push(runType())
  }

  // rpc
  if (c.rpc) {
    const rpcConfig = c.rpc
    const runRpc = async () => {
      if (rpcConfig.split === true) {
        const outDir = toAbs(rpcConfig.output)
        const removed = await deleteAllTsShallow(outDir)
        const rpcResult = await rpc(openAPI, outDir, rpcConfig.import, true)
        if (!rpcResult.ok) return `✗ rpc(split): ${rpcResult.error}`
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(rpcConfig.output)
      const rpcResult = await rpc(openAPI, out, rpcConfig.import, false)
      return rpcResult.ok ? `✓ rpc -> ${out}` : `✗ rpc: ${rpcResult.error}`
    }
    jobs.push(runRpc())
  }

  return Promise.all(jobs).then((logs) => ({ logs }))
}

/* ──────────────────────────────────────────────────────────────
 * Watch helpers
 * ────────────────────────────────────────────────────────────── */

/**
 * Adds glob patterns to the Vite file watcher.
 *
 * Watches the input file and related files (.yaml, .json, .tsp) in the
 * same directory for changes.
 *
 * @param server - Vite dev server instance
 * @param absInput - Absolute path to the input OpenAPI file
 */
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

/**
 * Creates a Vite plugin for hono-takibi code generation.
 *
 * This plugin automatically regenerates TypeScript code from OpenAPI
 * specifications during development. It watches for changes in:
 * - The OpenAPI spec file (yaml/json/tsp)
 * - The hono-takibi.config.ts configuration file
 *
 * ```mermaid
 * sequenceDiagram
 *   participant V as Vite
 *   participant P as Plugin
 *   participant C as Config
 *   participant G as Generator
 *
 *   V->>P: configureServer()
 *   P->>C: loadConfigHot()
 *   C-->>P: config
 *   P->>G: runAllWithConf()
 *   G-->>P: logs
 *   P->>V: hot reload
 *
 *   Note over V,G: On file change
 *   V->>P: handleHotUpdate()
 *   P->>G: runAllWithConf()
 *   G-->>P: logs
 *   P->>V: full-reload
 * ```
 *
 * @returns Vite plugin object
 *
 * @example
 * ```ts
 * // vite.config.ts
 * import { honoTakibiVite } from 'hono-takibi/vite-plugin'
 *
 * export default defineConfig({
 *   plugins: [honoTakibiVite()]
 * })
 * ```
 */
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
