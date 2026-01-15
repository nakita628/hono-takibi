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
const runAllWithConf = async (config: Conf): Promise<{ logs: string[] }> => {
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { logs: [`✗ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  // Job makers - each returns undefined if not applicable
  const makeZodOpenAPIJob = (): Promise<string> | undefined => {
    if (
      !(
        config['zod-openapi'] &&
        !(config['zod-openapi'].components?.schemas || config['zod-openapi'].routes) &&
        config['zod-openapi'].output
      )
    )
      return undefined
    const out = toAbs(config['zod-openapi'].output)
    return (async () => {
      if (!isTsFile(out)) return `✗ zod-openapi: Invalid output format: ${out}`
      const result = await takibi(openAPI, out, false, false, '/', {
        exportSchemasTypes: config['zod-openapi']?.exportSchemasTypes ?? false,
        exportSchemas: config['zod-openapi']?.exportSchemas ?? false,
        exportParametersTypes: config['zod-openapi']?.exportParametersTypes ?? false,
        exportParameters: config['zod-openapi']?.exportParameters ?? false,
        exportSecuritySchemes: config['zod-openapi']?.exportSecuritySchemes ?? false,
        exportRequestBodies: config['zod-openapi']?.exportRequestBodies ?? false,
        exportResponses: config['zod-openapi']?.exportResponses ?? false,
        exportHeadersTypes: config['zod-openapi']?.exportHeadersTypes ?? false,
        exportHeaders: config['zod-openapi']?.exportHeaders ?? false,
        exportExamples: config['zod-openapi']?.exportExamples ?? false,
        exportLinks: config['zod-openapi']?.exportLinks ?? false,
        exportCallbacks: config['zod-openapi']?.exportCallbacks ?? false,
      })
      return result.ok ? `✓ zod-openapi -> ${out}` : `✗ zod-openapi: ${result.error}`
    })()
  }

  const makeSchemaJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.schemas
    if (!cfg) return undefined
    return (async () => {
      if (cfg.split === true) {
        const outDir = toAbs(cfg.output)
        const removed = await deleteAllTsShallow(outDir)
        const schemaResult = await schemas(
          openAPI.components?.schemas,
          outDir,
          true,
          cfg.exportTypes === true,
        )
        if (!schemaResult.ok) return `✗ schemas(split): ${schemaResult.error}`
        return removed.length > 0
          ? `✓ schemas(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ schemas(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(cfg.output)
      const schemaResult = await schemas(
        openAPI.components?.schemas,
        out,
        false,
        cfg.exportTypes === true,
      )
      return schemaResult.ok ? `✓ schemas -> ${out}` : `✗ schemas: ${schemaResult.error}`
    })()
  }

  const makeParametersJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.parameters
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const parameterResult = await parameters(
        openAPI.components?.parameters,
        outDir,
        cfg.split === true,
        cfg.exportTypes === true,
        config['zod-openapi']?.components,
      )
      return parameterResult.ok
        ? `✓ parameters${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ parameters: ${parameterResult.error}`
    })()
  }

  const makeHeadersJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.headers
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const headersResult = await headers(
        openAPI.components?.headers,
        outDir,
        cfg.split === true,
        cfg.exportTypes === true,
        config['zod-openapi']?.components,
      )
      return headersResult.ok
        ? `✓ headers${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ headers: ${headersResult.error}`
    })()
  }

  const makeExamplesJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.examples
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const examplesResult = await examples(
        openAPI.components?.examples,
        outDir,
        cfg.split === true,
      )
      return examplesResult.ok
        ? `✓ examples${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ examples: ${examplesResult.error}`
    })()
  }

  const makeLinksJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.links
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const linksResult = await links(openAPI.components?.links, outDir, cfg.split === true)
      return linksResult.ok
        ? `✓ links${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ links: ${linksResult.error}`
    })()
  }

  const makeCallbacksJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.callbacks
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const callbacksResult = await callbacks(
        openAPI.components?.callbacks,
        outDir,
        cfg.split === true,
      )
      return callbacksResult.ok
        ? `✓ callbacks${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ callbacks: ${callbacksResult.error}`
    })()
  }

  const makeSecuritySchemesJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.securitySchemes
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const securitySchemesResult = await securitySchemes(
        openAPI.components?.securitySchemes,
        outDir,
        cfg.split === true,
      )
      return securitySchemesResult.ok
        ? `✓ securitySchemes${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ securitySchemes: ${securitySchemesResult.error}`
    })()
  }

  const makeRequestBodiesJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.requestBodies
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const requestBodiesResult = await requestBodies(
        openAPI.components?.requestBodies,
        outDir,
        cfg.split === true,
        config['zod-openapi']?.components,
      )
      return requestBodiesResult.ok
        ? `✓ requestBodies${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ requestBodies: ${requestBodiesResult.error}`
    })()
  }

  const makeResponsesJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.components?.responses
    if (!cfg) return undefined
    return (async () => {
      const outDir = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(outDir)
      const responsesResult = await responses(
        openAPI.components?.responses,
        outDir,
        cfg.split === true,
        config['zod-openapi']?.components,
      )
      return responsesResult.ok
        ? `✓ responses${cfg.split === true ? '(split)' : ''} -> ${outDir}`
        : `✗ responses: ${responsesResult.error}`
    })()
  }

  const makeRoutesJob = (): Promise<string> | undefined => {
    const cfg = config['zod-openapi']?.routes
    if (!cfg) return undefined
    return (async () => {
      const out = toAbs(cfg.output)
      if (cfg.split === true) await deleteAllTsShallow(out)
      const routeResult = await route(
        openAPI,
        { output: out, split: cfg.split ?? false },
        config['zod-openapi']?.components,
      )
      return routeResult.ok
        ? `✓ routes${cfg.split === true ? '(split)' : ''} -> ${out}`
        : `✗ routes: ${routeResult.error}`
    })()
  }

  const makeTypeJob = (): Promise<string> | undefined => {
    const cfg = config.type
    if (!cfg) return undefined
    return (async () => {
      const out = toAbs(cfg.output)
      if (!isTsFile(out)) return `✗ type: Invalid output format: ${out}`
      const typeResult = await type(openAPI, out)
      return typeResult.ok ? `✓ type -> ${out}` : `✗ type: ${typeResult.error}`
    })()
  }

  const makeRpcJob = (): Promise<string> | undefined => {
    const cfg = config.rpc
    if (!cfg) return undefined
    return (async () => {
      if (cfg.split === true) {
        const outDir = toAbs(cfg.output)
        const removed = await deleteAllTsShallow(outDir)
        const rpcResult = await rpc(openAPI, outDir, cfg.import, true)
        if (!rpcResult.ok) return `✗ rpc(split): ${rpcResult.error}`
        return removed.length > 0
          ? `✓ rpc(split) -> ${outDir}/*.ts (cleaned ${removed.length})`
          : `✓ rpc(split) -> ${outDir}/*.ts`
      }
      const out = toAbs(cfg.output)
      const rpcResult = await rpc(openAPI, out, cfg.import, false)
      return rpcResult.ok ? `✓ rpc -> ${out}` : `✗ rpc: ${rpcResult.error}`
    })()
  }

  // Build jobs array immutably - filter out undefined
  const jobs = [
    makeZodOpenAPIJob(),
    makeSchemaJob(),
    makeParametersJob(),
    makeHeadersJob(),
    makeExamplesJob(),
    makeLinksJob(),
    makeCallbacksJob(),
    makeSecuritySchemesJob(),
    makeRequestBodiesJob(),
    makeResponsesJob(),
    makeRoutesJob(),
    makeTypeJob(),
    makeRpcJob(),
  ].filter((job): job is Promise<string> => job !== undefined)

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
/**
 * Extracts all output paths from a configuration.
 */
const extractOutputPaths = (conf: Conf): string[] =>
  [
    conf['zod-openapi']?.output,
    conf['zod-openapi']?.components?.schemas?.output,
    conf['zod-openapi']?.components?.parameters?.output,
    conf['zod-openapi']?.components?.headers?.output,
    conf['zod-openapi']?.components?.examples?.output,
    conf['zod-openapi']?.components?.links?.output,
    conf['zod-openapi']?.components?.callbacks?.output,
    conf['zod-openapi']?.components?.securitySchemes?.output,
    conf['zod-openapi']?.components?.requestBodies?.output,
    conf['zod-openapi']?.components?.responses?.output,
    conf['zod-openapi']?.routes?.output,
    conf.type?.output,
    conf.rpc?.output,
  ]
    .filter((p): p is string => p !== undefined)
    .map(toAbs)

/**
 * Cleans up output paths that exist in previous config but not in current config.
 */
const cleanupStaleOutputs = async (prev: Conf, curr: Conf): Promise<string[]> => {
  const prevPaths = new Set(extractOutputPaths(prev))
  const currPaths = new Set(extractOutputPaths(curr))
  const stalePaths = [...prevPaths].filter((p) => !currPaths.has(p))

  const results = await Promise.all(
    stalePaths.map(async (p): Promise<string | null> => {
      const stat = await fsp.stat(p).catch(() => null)
      if (!stat) return null

      if (stat.isDirectory()) {
        const removed = await deleteAllTsShallow(p)
        return removed.length > 0 ? `${p}/*.ts (${removed.length} files)` : null
      }
      if (stat.isFile() && p.endsWith('.ts')) {
        await fsp.unlink(p).catch(() => {})
        return p
      }
      return null
    }),
  )
  return results.filter((r): r is string => r !== null)
}

// biome-ignore lint: plugin returns any for Vite compatibility
export function honoTakibiVite(): any {
  const state: { current: Conf | null; previous: Conf | null } = { current: null, previous: null }
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

    // Cleanup stale outputs from previous config
    if (state.current) {
      const cleaned = await cleanupStaleOutputs(state.current, next.value)
      for (const p of cleaned) console.log(`[hono-takibi] ✓ cleanup: ${p}`)
    }

    state.previous = state.current
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
