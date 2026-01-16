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
 *   B --> C["loadConfigurationWithHotReload()"]
 *   C --> D["parseOpenAPI(input)"]
 *   D --> E["runAllGenerationTasks()"]
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
type Configuration = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

/**
 * Minimal Vite dev-server interface.
 *
 * Defines only the surface area needed by this plugin, avoiding
 * direct dependency on Vite's types for better compatibility.
 */
type ViteDevServer = {
  watcher: {
    add: (paths: string | readonly string[]) => void
    on: (event: 'all', callback: (eventType: string, filePath: string) => void) => void
  }
  ws: { send: (payload: { type: string; [key: string]: unknown }) => void }
  pluginContainer: { resolveId: (moduleId: string) => Promise<{ id: string } | null> }
  moduleGraph: {
    invalidateModule: (module: { id?: string } | null) => void
    invalidateAll: () => void
    getModuleById: (moduleId: string) => { id?: string } | null
  }
  ssrLoadModule: (moduleId: string) => Promise<unknown>
}

/* ──────────────────────────────────────────────────────────────
 * Small helpers (no `as` cast)
 * ────────────────────────────────────────────────────────────── */

/**
 * Type guard for configuration objects.
 *
 * @param value - Value to check
 * @returns True if value is a valid configuration object
 */
const isConfiguration = (value: unknown): value is Configuration =>
  typeof value === 'object' && value !== null

/**
 * Converts a relative path to an absolute path.
 *
 * @param relativePath - Relative path
 * @returns Absolute path resolved from current working directory
 */
const toAbsolutePath = (relativePath: string) => path.resolve(process.cwd(), relativePath)

/**
 * Type guard for TypeScript file paths.
 *
 * @param filePath - Path to check
 * @returns True if path ends with .ts
 */
const isTypeScriptFile = (filePath: string): filePath is `${string}.ts` => filePath.endsWith('.ts')

/**
 * Hot-loads the hono-takibi configuration file.
 *
 * Invalidates the module cache and reloads the config file to pick up
 * changes during development. Uses Vite's SSR module loading.
 *
 * @param server - Vite dev server instance
 * @returns Promise resolving to parsed config or error
 */
const loadConfigurationWithHotReload = async (
  server: ViteDevServer,
): Promise<{ ok: true; value: Configuration } | { ok: false; error: string }> => {
  const absoluteConfigPath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  try {
    const resolved = await server.pluginContainer.resolveId(absoluteConfigPath)
    const moduleId = resolved?.id
    if (moduleId) {
      const moduleNode = server.moduleGraph.getModuleById(moduleId)
      if (moduleNode) server.moduleGraph.invalidateModule(moduleNode)
    } else {
      server.moduleGraph.invalidateAll()
    }

    const loadedModule = await server.ssrLoadModule(`${absoluteConfigPath}?t=${Date.now()}`)
    const defaultExport = isRecord(loadedModule) ? Reflect.get(loadedModule, 'default') : undefined
    if (!isConfiguration(defaultExport))
      return { ok: false, error: 'Config must export default object' }
    const parsed = parseConfig(defaultExport)
    return parsed.ok ? { ok: true, value: parsed.value } : { ok: false, error: parsed.error }
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : String(error) }
  }
}

/* ──────────────────────────────────────────────────────────────
 * Purge helpers (shallow .ts file cleanup)
 * ────────────────────────────────────────────────────────────── */

/**
 * Lists TypeScript files in a directory (shallow, non-recursive).
 *
 * @param directoryPath - Directory path to scan
 * @returns Promise resolving to array of absolute file paths
 */
const listTypeScriptFilesShallow = async (directoryPath: string): Promise<string[]> =>
  fsp
    .stat(directoryPath)
    .then((fileStats) =>
      fileStats.isDirectory()
        ? fsp
            .readdir(directoryPath, { withFileTypes: true })
            .then((directoryEntries) =>
              directoryEntries
                .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
                .map((entry) => path.join(directoryPath, entry.name)),
            )
        : [],
    )
    .catch((): string[] => [])

/**
 * Deletes all TypeScript files in a directory (shallow, non-recursive).
 *
 * Used to clean up stale generated files before regeneration.
 *
 * @param directoryPath - Directory path to clean
 * @returns Promise resolving to array of deleted file paths
 */
const deleteAllTypeScriptFilesShallow = async (directoryPath: string): Promise<string[]> =>
  listTypeScriptFilesShallow(directoryPath).then((files) =>
    Promise.all(
      files.map((filePath) =>
        fsp
          .unlink(filePath)
          .then(() => filePath)
          .catch(() => null),
      ),
    ).then((results) => results.filter((result) => result !== null)),
  )

/**
 * Creates a debounced version of a function.
 *
 * Delays invocation until after the specified milliseconds have elapsed
 * since the last call. Uses WeakMap for cleanup.
 *
 * @param delayMilliseconds - Delay in milliseconds
 * @param callback - Function to debounce
 * @returns Debounced function
 */
const debounce = (delayMilliseconds: number, callback: () => void): (() => void) => {
  const timerStorage = new WeakMap<() => void, ReturnType<typeof setTimeout>>()
  const wrappedFunction = (): void => {
    const previousTimer = timerStorage.get(wrappedFunction)
    if (previousTimer !== undefined) clearTimeout(previousTimer)
    timerStorage.set(wrappedFunction, setTimeout(callback, delayMilliseconds))
  }
  return wrappedFunction
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
 *   A["runAllGenerationTasks"] --> B["parseOpenAPI"]
 *   B --> C["Promise.all"]
 *   C --> D["schemas"]
 *   C --> E["routes"]
 *   C --> F["parameters"]
 *   C --> G["headers"]
 *   C --> H["responses"]
 *   C --> I["...others"]
 * ```
 *
 * @param configuration - Parsed configuration object
 * @returns Promise resolving to object containing log messages
 */
const runAllGenerationTasks = async (configuration: Configuration): Promise<{ logs: string[] }> => {
  const openAPIResult = await parseOpenAPI(configuration.input)
  if (!openAPIResult.ok) return { logs: [`✗ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  const makeZodOpenAPIJob = (): Promise<string> | undefined => {
    if (
      !(
        configuration['zod-openapi'] &&
        !(
          configuration['zod-openapi'].components?.schemas || configuration['zod-openapi'].routes
        ) &&
        configuration['zod-openapi'].output
      )
    )
      return undefined
    const outputPath = toAbsolutePath(configuration['zod-openapi'].output)
    return (async () => {
      if (!isTypeScriptFile(outputPath))
        return `✗ zod-openapi: Invalid output format: ${outputPath}`
      const result = await takibi(openAPI, outputPath, false, false, '/', {
        exportSchemasTypes: configuration['zod-openapi']?.exportSchemasTypes ?? false,
        exportSchemas: configuration['zod-openapi']?.exportSchemas ?? false,
        exportParametersTypes: configuration['zod-openapi']?.exportParametersTypes ?? false,
        exportParameters: configuration['zod-openapi']?.exportParameters ?? false,
        exportSecuritySchemes: configuration['zod-openapi']?.exportSecuritySchemes ?? false,
        exportRequestBodies: configuration['zod-openapi']?.exportRequestBodies ?? false,
        exportResponses: configuration['zod-openapi']?.exportResponses ?? false,
        exportHeadersTypes: configuration['zod-openapi']?.exportHeadersTypes ?? false,
        exportHeaders: configuration['zod-openapi']?.exportHeaders ?? false,
        exportExamples: configuration['zod-openapi']?.exportExamples ?? false,
        exportLinks: configuration['zod-openapi']?.exportLinks ?? false,
        exportCallbacks: configuration['zod-openapi']?.exportCallbacks ?? false,
      })
      return result.ok ? `✓ zod-openapi -> ${outputPath}` : `✗ zod-openapi: ${result.error}`
    })()
  }

  const makeSchemaJob = (): Promise<string> | undefined => {
    const schemaConfig = configuration['zod-openapi']?.components?.schemas
    if (!schemaConfig) return undefined
    return (async () => {
      if (schemaConfig.split === true) {
        const outputDirectory = toAbsolutePath(schemaConfig.output)
        const removedFiles = await deleteAllTypeScriptFilesShallow(outputDirectory)
        const schemaResult = await schemas(
          openAPI.components?.schemas,
          outputDirectory,
          true,
          schemaConfig.exportTypes === true,
        )
        if (!schemaResult.ok) return `✗ schemas(split): ${schemaResult.error}`
        return removedFiles.length > 0
          ? `✓ schemas(split) -> ${outputDirectory}/*.ts (cleaned ${removedFiles.length})`
          : `✓ schemas(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(schemaConfig.output)
      const schemaResult = await schemas(
        openAPI.components?.schemas,
        outputPath,
        false,
        schemaConfig.exportTypes === true,
      )
      return schemaResult.ok ? `✓ schemas -> ${outputPath}` : `✗ schemas: ${schemaResult.error}`
    })()
  }

  const makeParametersJob = (): Promise<string> | undefined => {
    const parametersConfig = configuration['zod-openapi']?.components?.parameters
    if (!parametersConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(parametersConfig.output)
      if (parametersConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const parameterResult = await parameters(
        openAPI.components?.parameters,
        outputDirectory,
        parametersConfig.split === true,
        parametersConfig.exportTypes === true,
        configuration['zod-openapi']?.components,
      )
      return parameterResult.ok
        ? `✓ parameters${parametersConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ parameters: ${parameterResult.error}`
    })()
  }

  const makeHeadersJob = (): Promise<string> | undefined => {
    const headersConfig = configuration['zod-openapi']?.components?.headers
    if (!headersConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(headersConfig.output)
      if (headersConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const headersResult = await headers(
        openAPI.components?.headers,
        outputDirectory,
        headersConfig.split === true,
        headersConfig.exportTypes === true,
        configuration['zod-openapi']?.components,
      )
      return headersResult.ok
        ? `✓ headers${headersConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ headers: ${headersResult.error}`
    })()
  }

  const makeExamplesJob = (): Promise<string> | undefined => {
    const examplesConfig = configuration['zod-openapi']?.components?.examples
    if (!examplesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(examplesConfig.output)
      if (examplesConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const examplesResult = await examples(
        openAPI.components?.examples,
        outputDirectory,
        examplesConfig.split === true,
      )
      return examplesResult.ok
        ? `✓ examples${examplesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ examples: ${examplesResult.error}`
    })()
  }

  const makeLinksJob = (): Promise<string> | undefined => {
    const linksConfig = configuration['zod-openapi']?.components?.links
    if (!linksConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(linksConfig.output)
      if (linksConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const linksResult = await links(
        openAPI.components?.links,
        outputDirectory,
        linksConfig.split === true,
      )
      return linksResult.ok
        ? `✓ links${linksConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ links: ${linksResult.error}`
    })()
  }

  const makeCallbacksJob = (): Promise<string> | undefined => {
    const callbacksConfig = configuration['zod-openapi']?.components?.callbacks
    if (!callbacksConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(callbacksConfig.output)
      if (callbacksConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const callbacksResult = await callbacks(
        openAPI.components?.callbacks,
        outputDirectory,
        callbacksConfig.split === true,
      )
      return callbacksResult.ok
        ? `✓ callbacks${callbacksConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ callbacks: ${callbacksResult.error}`
    })()
  }

  const makeSecuritySchemesJob = (): Promise<string> | undefined => {
    const securitySchemesConfig = configuration['zod-openapi']?.components?.securitySchemes
    if (!securitySchemesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(securitySchemesConfig.output)
      if (securitySchemesConfig.split === true)
        await deleteAllTypeScriptFilesShallow(outputDirectory)
      const securitySchemesResult = await securitySchemes(
        openAPI.components?.securitySchemes,
        outputDirectory,
        securitySchemesConfig.split === true,
      )
      return securitySchemesResult.ok
        ? `✓ securitySchemes${securitySchemesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ securitySchemes: ${securitySchemesResult.error}`
    })()
  }

  const makeRequestBodiesJob = (): Promise<string> | undefined => {
    const requestBodiesConfig = configuration['zod-openapi']?.components?.requestBodies
    if (!requestBodiesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(requestBodiesConfig.output)
      if (requestBodiesConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const requestBodiesResult = await requestBodies(
        openAPI.components?.requestBodies,
        outputDirectory,
        requestBodiesConfig.split === true,
        configuration['zod-openapi']?.components,
      )
      return requestBodiesResult.ok
        ? `✓ requestBodies${requestBodiesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ requestBodies: ${requestBodiesResult.error}`
    })()
  }

  const makeResponsesJob = (): Promise<string> | undefined => {
    const responsesConfig = configuration['zod-openapi']?.components?.responses
    if (!responsesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(responsesConfig.output)
      if (responsesConfig.split === true) await deleteAllTypeScriptFilesShallow(outputDirectory)
      const responsesResult = await responses(
        openAPI.components?.responses,
        outputDirectory,
        responsesConfig.split === true,
        configuration['zod-openapi']?.components,
      )
      return responsesResult.ok
        ? `✓ responses${responsesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
        : `✗ responses: ${responsesResult.error}`
    })()
  }

  const makeRoutesJob = (): Promise<string> | undefined => {
    const routesConfig = configuration['zod-openapi']?.routes
    if (!routesConfig) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(routesConfig.output)
      if (routesConfig.split === true) await deleteAllTypeScriptFilesShallow(outputPath)
      const routeResult = await route(
        openAPI,
        { output: outputPath, split: routesConfig.split ?? false },
        configuration['zod-openapi']?.components,
      )
      return routeResult.ok
        ? `✓ routes${routesConfig.split === true ? '(split)' : ''} -> ${outputPath}`
        : `✗ routes: ${routeResult.error}`
    })()
  }

  const makeTypeJob = (): Promise<string> | undefined => {
    const typeConfig = configuration.type
    if (!typeConfig) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(typeConfig.output)
      if (!isTypeScriptFile(outputPath)) return `✗ type: Invalid output format: ${outputPath}`
      const typeResult = await type(openAPI, outputPath)
      return typeResult.ok ? `✓ type -> ${outputPath}` : `✗ type: ${typeResult.error}`
    })()
  }

  const makeRpcJob = (): Promise<string> | undefined => {
    const rpcConfig = configuration.rpc
    if (!rpcConfig) return undefined
    return (async () => {
      if (rpcConfig.split === true) {
        const outputDirectory = toAbsolutePath(rpcConfig.output)
        const removedFiles = await deleteAllTypeScriptFilesShallow(outputDirectory)
        const rpcResult = await rpc(openAPI, outputDirectory, rpcConfig.import, true)
        if (!rpcResult.ok) return `✗ rpc(split): ${rpcResult.error}`
        return removedFiles.length > 0
          ? `✓ rpc(split) -> ${outputDirectory}/*.ts (cleaned ${removedFiles.length})`
          : `✓ rpc(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(rpcConfig.output)
      const rpcResult = await rpc(openAPI, outputPath, rpcConfig.import, false)
      return rpcResult.ok ? `✓ rpc -> ${outputPath}` : `✗ rpc: ${rpcResult.error}`
    })()
  }

  const generationJobs = [
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

  return Promise.all(generationJobs).then((logs) => ({ logs }))
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
 * @param absoluteInputPath - Absolute path to the input OpenAPI file
 */
const addInputGlobsToWatcher = (server: ViteDevServer, absoluteInputPath: string) => {
  const inputDirectory = path.dirname(absoluteInputPath)
  const watchPatterns: string[] = [
    absoluteInputPath,
    path.join(inputDirectory, '**/*.yaml'),
    path.join(inputDirectory, '**/*.json'),
    path.join(inputDirectory, '**/*.tsp'),
  ]
  server.watcher.add(watchPatterns)
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
 *   P->>C: loadConfigurationWithHotReload()
 *   C-->>P: config
 *   P->>G: runAllGenerationTasks()
 *   G-->>P: logs
 *   P->>V: hot reload
 *
 *   Note over V,G: On file change
 *   V->>P: handleHotUpdate()
 *   P->>G: runAllGenerationTasks()
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
 *
 * @param configuration - The configuration object
 * @returns Array of absolute output paths
 */
const extractOutputPaths = (configuration: Configuration): string[] =>
  [
    configuration['zod-openapi']?.output,
    configuration['zod-openapi']?.components?.schemas?.output,
    configuration['zod-openapi']?.components?.parameters?.output,
    configuration['zod-openapi']?.components?.headers?.output,
    configuration['zod-openapi']?.components?.examples?.output,
    configuration['zod-openapi']?.components?.links?.output,
    configuration['zod-openapi']?.components?.callbacks?.output,
    configuration['zod-openapi']?.components?.securitySchemes?.output,
    configuration['zod-openapi']?.components?.requestBodies?.output,
    configuration['zod-openapi']?.components?.responses?.output,
    configuration['zod-openapi']?.routes?.output,
    configuration.type?.output,
    configuration.rpc?.output,
  ]
    .filter((outputPath): outputPath is string => outputPath !== undefined)
    .map(toAbsolutePath)

/**
 * Cleans up output paths that exist in previous config but not in current config.
 *
 * When an output path is removed from the configuration, this function
 * removes the corresponding file or directory completely.
 *
 * @param previousConfiguration - Previous configuration
 * @param currentConfiguration - Current configuration
 * @returns Array of cleaned up paths
 */
const cleanupStaleOutputs = async (
  previousConfiguration: Configuration,
  currentConfiguration: Configuration,
): Promise<string[]> => {
  const previousPaths = new Set(extractOutputPaths(previousConfiguration))
  const currentPaths = new Set(extractOutputPaths(currentConfiguration))
  const stalePaths = [...previousPaths].filter((stalePath) => !currentPaths.has(stalePath))

  const cleanupResults = await Promise.all(
    stalePaths.map(async (stalePath): Promise<string | null> => {
      const fileStats = await fsp.stat(stalePath).catch(() => null)
      if (!fileStats) return null

      if (fileStats.isDirectory()) {
        await fsp.rm(stalePath, { recursive: true, force: true }).catch(() => {})
        return stalePath
      }
      if (fileStats.isFile() && stalePath.endsWith('.ts')) {
        await fsp.unlink(stalePath).catch(() => {})
        return stalePath
      }
      return null
    }),
  )
  return cleanupResults.filter((result): result is string => result !== null)
}

// biome-ignore lint: plugin returns any for Vite compatibility
export function honoTakibiVite(): any {
  const pluginState: { current: Configuration | null; previous: Configuration | null } = {
    current: null,
    previous: null,
  }
  const absoluteConfigFilePath = path.resolve(process.cwd(), 'hono-takibi.config.ts')

  const runGeneration = async () => {
    if (!pluginState.current) return
    const { logs } = await runAllGenerationTasks(pluginState.current)
    for (const logMessage of logs) console.log(`[hono-takibi] ${logMessage}`)
  }

  const runGenerationAndReload = async (server?: ViteDevServer) => {
    await runGeneration()
    if (server) server.ws.send({ type: 'full-reload' })
  }

  const handleConfigurationChange = async (server: ViteDevServer) => {
    const nextConfiguration = await loadConfigurationWithHotReload(server)
    if (!nextConfiguration.ok) {
      console.error(`[hono-takibi] ✗ config: ${nextConfiguration.error}`)
      return
    }

    if (pluginState.current) {
      const cleanedPaths = await cleanupStaleOutputs(pluginState.current, nextConfiguration.value)
      for (const cleanedPath of cleanedPaths) console.log(`[hono-takibi] ✓ cleanup: ${cleanedPath}`)
    }

    pluginState.previous = pluginState.current
    pluginState.current = nextConfiguration.value
    addInputGlobsToWatcher(server, toAbsolutePath(pluginState.current.input))
    await runGenerationAndReload(server)
  }

  const vitePlugin = {
    name: 'hono-takibi-vite',

    handleHotUpdate(context: { file: string; server: ViteDevServer }) {
      const absoluteFilePath = path.resolve(context.file)
      if (absoluteFilePath === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        console.log('[hono-takibi] config changed (hot-update)')
        handleConfigurationChange(context.server).catch((error) =>
          console.error('[hono-takibi] hot-update error:', error),
        )
        return []
      }
      return
    },

    async buildStart() {
      // Dev-only: handled by configureServer
    },

    configureServer(server: ViteDevServer) {
      ;(async () => {
        const initialConfiguration = await loadConfigurationWithHotReload(server)
        if (!initialConfiguration.ok) {
          console.error(`[hono-takibi] ✗ config: ${initialConfiguration.error}`)
          return
        }
        pluginState.current = initialConfiguration.value

        addInputGlobsToWatcher(server, toAbsolutePath(pluginState.current.input))
        server.watcher.add(absoluteConfigFilePath)

        const debouncedRunGeneration = debounce(200, () => void runGenerationAndReload(server))

        server.watcher.on('all', async (_eventType, filePath) => {
          const absoluteChangedPath = path.resolve(filePath)
          if (absoluteChangedPath === absoluteConfigFilePath) {
            console.log('[hono-takibi] config changed (watch)')
            await handleConfigurationChange(server)
            return
          }
          debouncedRunGeneration()
        })

        await runGenerationAndReload(server)
      })().catch((error) => console.error('[hono-takibi] watch error:', error))
    },
  }

  return vitePlugin
}
