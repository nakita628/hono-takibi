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
  svelteQuery,
  swr,
  takibi,
  tanstackQuery,
  type,
  vueQuery,
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
 * Deletes specified TypeScript files.
 *
 * @param filePaths - Array of file paths to delete
 * @returns Promise resolving to array of deleted file paths
 */
const deleteTypeScriptFiles = async (filePaths: string[]): Promise<string[]> =>
  Promise.all(
    filePaths.map((filePath) =>
      fsp
        .unlink(filePath)
        .then(() => filePath)
        .catch(() => null),
    ),
  ).then((results) => results.filter((result) => result !== null))

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
  if (!openAPIResult.ok) return { logs: [`❌ parseOpenAPI: ${openAPIResult.error}`] }
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
        return `❌ zod-openapi: Invalid output format: ${outputPath}`
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
      return result.ok ? `✅ zod-openapi -> ${outputPath}` : `❌ zod-openapi: ${result.error}`
    })()
  }

  const makeSchemaJob = (): Promise<string> | undefined => {
    const schemaConfig = configuration['zod-openapi']?.components?.schemas
    if (!schemaConfig) return undefined
    return (async () => {
      if (schemaConfig.split === true) {
        const outputDirectory = toAbsolutePath(schemaConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const schemaResult = await schemas(
          openAPI.components?.schemas,
          outputDirectory,
          true,
          schemaConfig.exportTypes === true,
        )
        if (!schemaResult.ok) return `❌ schemas(split): ${schemaResult.error}`
        return beforeFiles.length > 0
          ? `✅ schemas(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ schemas(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(schemaConfig.output)
      const schemaResult = await schemas(
        openAPI.components?.schemas,
        outputPath,
        false,
        schemaConfig.exportTypes === true,
      )
      return schemaResult.ok ? `✅ schemas -> ${outputPath}` : `❌ schemas: ${schemaResult.error}`
    })()
  }

  const makeParametersJob = (): Promise<string> | undefined => {
    const parametersConfig = configuration['zod-openapi']?.components?.parameters
    if (!parametersConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(parametersConfig.output)
      const beforeFiles =
        parametersConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (parametersConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const parameterResult = await parameters(
        openAPI.components?.parameters,
        outputDirectory,
        parametersConfig.split === true,
        parametersConfig.exportTypes === true,
        configuration['zod-openapi']?.components,
      )
      if (!parameterResult.ok) return `❌ parameters: ${parameterResult.error}`
      return `✅ parameters${parametersConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeHeadersJob = (): Promise<string> | undefined => {
    const headersConfig = configuration['zod-openapi']?.components?.headers
    if (!headersConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(headersConfig.output)
      const beforeFiles =
        headersConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (headersConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const headersResult = await headers(
        openAPI.components?.headers,
        outputDirectory,
        headersConfig.split === true,
        headersConfig.exportTypes === true,
        configuration['zod-openapi']?.components,
      )
      if (!headersResult.ok) return `❌ headers: ${headersResult.error}`
      return `✅ headers${headersConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeExamplesJob = (): Promise<string> | undefined => {
    const examplesConfig = configuration['zod-openapi']?.components?.examples
    if (!examplesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(examplesConfig.output)
      const beforeFiles =
        examplesConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (examplesConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const examplesResult = await examples(
        openAPI.components?.examples,
        outputDirectory,
        examplesConfig.split === true,
      )
      if (!examplesResult.ok) return `❌ examples: ${examplesResult.error}`
      return `✅ examples${examplesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeLinksJob = (): Promise<string> | undefined => {
    const linksConfig = configuration['zod-openapi']?.components?.links
    if (!linksConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(linksConfig.output)
      const beforeFiles =
        linksConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (linksConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const linksResult = await links(
        openAPI.components?.links,
        outputDirectory,
        linksConfig.split === true,
      )
      if (!linksResult.ok) return `❌ links: ${linksResult.error}`
      return `✅ links${linksConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeCallbacksJob = (): Promise<string> | undefined => {
    const callbacksConfig = configuration['zod-openapi']?.components?.callbacks
    if (!callbacksConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(callbacksConfig.output)
      const beforeFiles =
        callbacksConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (callbacksConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const callbacksResult = await callbacks(
        openAPI.components?.callbacks,
        outputDirectory,
        callbacksConfig.split === true,
      )
      if (!callbacksResult.ok) return `❌ callbacks: ${callbacksResult.error}`
      return `✅ callbacks${callbacksConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeSecuritySchemesJob = (): Promise<string> | undefined => {
    const securitySchemesConfig = configuration['zod-openapi']?.components?.securitySchemes
    if (!securitySchemesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(securitySchemesConfig.output)
      const beforeFiles =
        securitySchemesConfig.split === true
          ? await listTypeScriptFilesShallow(outputDirectory)
          : []
      if (securitySchemesConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const securitySchemesResult = await securitySchemes(
        openAPI.components?.securitySchemes,
        outputDirectory,
        securitySchemesConfig.split === true,
      )
      if (!securitySchemesResult.ok) return `❌ securitySchemes: ${securitySchemesResult.error}`
      return `✅ securitySchemes${securitySchemesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeRequestBodiesJob = (): Promise<string> | undefined => {
    const requestBodiesConfig = configuration['zod-openapi']?.components?.requestBodies
    if (!requestBodiesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(requestBodiesConfig.output)
      const beforeFiles =
        requestBodiesConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (requestBodiesConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const requestBodiesResult = await requestBodies(
        openAPI.components?.requestBodies,
        outputDirectory,
        requestBodiesConfig.split === true,
        configuration['zod-openapi']?.components,
      )
      if (!requestBodiesResult.ok) return `❌ requestBodies: ${requestBodiesResult.error}`
      return `✅ requestBodies${requestBodiesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeResponsesJob = (): Promise<string> | undefined => {
    const responsesConfig = configuration['zod-openapi']?.components?.responses
    if (!responsesConfig) return undefined
    return (async () => {
      const outputDirectory = toAbsolutePath(responsesConfig.output)
      const beforeFiles =
        responsesConfig.split === true ? await listTypeScriptFilesShallow(outputDirectory) : []
      if (responsesConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const responsesResult = await responses(
        openAPI.components?.responses,
        outputDirectory,
        responsesConfig.split === true,
        configuration['zod-openapi']?.components,
      )
      if (!responsesResult.ok) return `❌ responses: ${responsesResult.error}`
      return `✅ responses${responsesConfig.split === true ? '(split)' : ''} -> ${outputDirectory}`
    })()
  }

  const makeRoutesJob = (): Promise<string> | undefined => {
    const routesConfig = configuration['zod-openapi']?.routes
    if (!routesConfig) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(routesConfig.output)
      const beforeFiles =
        routesConfig.split === true ? await listTypeScriptFilesShallow(outputPath) : []
      if (routesConfig.split === true) await deleteTypeScriptFiles(beforeFiles)
      const routeResult = await route(
        openAPI,
        { output: outputPath, split: routesConfig.split ?? false },
        configuration['zod-openapi']?.components,
      )
      if (!routeResult.ok) return `❌ routes: ${routeResult.error}`
      return `✅ routes${routesConfig.split === true ? '(split)' : ''} -> ${outputPath}`
    })()
  }

  const makeTypeJob = (): Promise<string> | undefined => {
    const typeConfig = configuration.type
    if (!typeConfig) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(typeConfig.output)
      if (!isTypeScriptFile(outputPath)) return `❌ type: Invalid output format: ${outputPath}`
      const typeResult = await type(openAPI, outputPath)
      return typeResult.ok ? `✅ type -> ${outputPath}` : `❌ type: ${typeResult.error}`
    })()
  }

  const makeRpcJob = (): Promise<string> | undefined => {
    const rpcConfig = configuration.rpc
    if (!rpcConfig) return undefined
    return (async () => {
      if (rpcConfig.split === true) {
        const outputDirectory = toAbsolutePath(rpcConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const rpcResult = await rpc(
          openAPI,
          outputDirectory,
          rpcConfig.import,
          true,
          rpcConfig.client ?? 'client',
        )
        if (!rpcResult.ok) return `❌ rpc(split): ${rpcResult.error}`
        return beforeFiles.length > 0
          ? `✅ rpc(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ rpc(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(rpcConfig.output)
      const rpcResult = await rpc(
        openAPI,
        outputPath,
        rpcConfig.import,
        false,
        rpcConfig.client ?? 'client',
      )
      return rpcResult.ok ? `✅ rpc -> ${outputPath}` : `❌ rpc: ${rpcResult.error}`
    })()
  }

  const makeSwrJob = (): Promise<string> | undefined => {
    const swrConfig = configuration.swr
    if (!swrConfig) return undefined
    return (async () => {
      if (swrConfig.split === true) {
        const outputDirectory = toAbsolutePath(swrConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const swrResult = await swr(
          openAPI,
          outputDirectory,
          swrConfig.import,
          true,
          swrConfig.client ?? 'client',
        )
        if (!swrResult.ok) return `❌ swr(split): ${swrResult.error}`
        return beforeFiles.length > 0
          ? `✅ swr(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ swr(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(swrConfig.output)
      const swrResult = await swr(
        openAPI,
        outputPath,
        swrConfig.import,
        false,
        swrConfig.client ?? 'client',
      )
      return swrResult.ok ? `✅ swr -> ${outputPath}` : `❌ swr: ${swrResult.error}`
    })()
  }

  const makeTanstackQueryJob = (): Promise<string> | undefined => {
    const tanstackQueryConfig = configuration['tanstack-query']
    if (!tanstackQueryConfig) return undefined
    return (async () => {
      if (tanstackQueryConfig.split === true) {
        const outputDirectory = toAbsolutePath(tanstackQueryConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const tanstackQueryResult = await tanstackQuery(
          openAPI,
          outputDirectory,
          tanstackQueryConfig.import,
          true,
          tanstackQueryConfig.client ?? 'client',
        )
        if (!tanstackQueryResult.ok) return `❌ tanstack-query(split): ${tanstackQueryResult.error}`
        return beforeFiles.length > 0
          ? `✅ tanstack-query(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ tanstack-query(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(tanstackQueryConfig.output)
      const tanstackQueryResult = await tanstackQuery(
        openAPI,
        outputPath,
        tanstackQueryConfig.import,
        false,
        tanstackQueryConfig.client ?? 'client',
      )
      return tanstackQueryResult.ok
        ? `✅ tanstack-query -> ${outputPath}`
        : `❌ tanstack-query: ${tanstackQueryResult.error}`
    })()
  }

  const makeSvelteQueryJob = (): Promise<string> | undefined => {
    const svelteQueryConfig = configuration['svelte-query']
    if (!svelteQueryConfig) return undefined
    return (async () => {
      if (svelteQueryConfig.split === true) {
        const outputDirectory = toAbsolutePath(svelteQueryConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const svelteQueryResult = await svelteQuery(
          openAPI,
          outputDirectory,
          svelteQueryConfig.import,
          true,
          svelteQueryConfig.client ?? 'client',
        )
        if (!svelteQueryResult.ok) return `❌ svelte-query(split): ${svelteQueryResult.error}`
        return beforeFiles.length > 0
          ? `✅ svelte-query(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ svelte-query(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(svelteQueryConfig.output)
      const svelteQueryResult = await svelteQuery(
        openAPI,
        outputPath,
        svelteQueryConfig.import,
        false,
        svelteQueryConfig.client ?? 'client',
      )
      return svelteQueryResult.ok
        ? `✅ svelte-query -> ${outputPath}`
        : `❌ svelte-query: ${svelteQueryResult.error}`
    })()
  }

  const makeVueQueryJob = (): Promise<string> | undefined => {
    const vueQueryConfig = configuration['vue-query']
    if (!vueQueryConfig) return undefined
    return (async () => {
      if (vueQueryConfig.split === true) {
        const outputDirectory = toAbsolutePath(vueQueryConfig.output)
        const beforeFiles = await listTypeScriptFilesShallow(outputDirectory)
        await deleteTypeScriptFiles(beforeFiles)
        const vueQueryResult = await vueQuery(
          openAPI,
          outputDirectory,
          vueQueryConfig.import,
          true,
          vueQueryConfig.client ?? 'client',
        )
        if (!vueQueryResult.ok) return `❌ vue-query(split): ${vueQueryResult.error}`
        return beforeFiles.length > 0
          ? `✅ vue-query(split) -> ${outputDirectory}/*.ts (cleaned ${beforeFiles.length})`
          : `✅ vue-query(split) -> ${outputDirectory}/*.ts`
      }
      const outputPath = toAbsolutePath(vueQueryConfig.output)
      const vueQueryResult = await vueQuery(
        openAPI,
        outputPath,
        vueQueryConfig.import,
        false,
        vueQueryConfig.client ?? 'client',
      )
      return vueQueryResult.ok
        ? `✅ vue-query -> ${outputPath}`
        : `❌ vue-query: ${vueQueryResult.error}`
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
    makeSwrJob(),
    makeTanstackQueryJob(),
    makeSvelteQueryJob(),
    makeVueQueryJob(),
  ].filter((job): job is Promise<string> => job !== undefined)

  return Promise.all(generationJobs).then((logs) => ({ logs }))
}

/* ──────────────────────────────────────────────────────────────
 * Watch helpers
 * ────────────────────────────────────────────────────────────── */

/**
 * Checks if a file path matches input file patterns.
 *
 * @param filePath - Absolute path to check
 * @param inputDirectory - Directory containing input files
 * @returns True if the file is an input file (yaml/json/tsp)
 */
const isInputFile = (filePath: string, inputDirectory: string): boolean => {
  if (!filePath.startsWith(inputDirectory)) return false
  return filePath.endsWith('.yaml') || filePath.endsWith('.json') || filePath.endsWith('.tsp')
}

/**
 * Adds glob patterns to the Vite file watcher.
 *
 * Watches the input file and related files (.yaml, .json, .tsp) in the
 * same directory for changes.
 *
 * @param server - Vite dev server instance
 * @param absoluteInputPath - Absolute path to the input OpenAPI file
 * @returns The input directory path for use in change detection
 */
const addInputGlobsToWatcher = (server: ViteDevServer, absoluteInputPath: string): string => {
  const inputDirectory = path.dirname(absoluteInputPath)
  const watchPatterns: string[] = [
    absoluteInputPath,
    path.join(inputDirectory, '**/*.yaml'),
    path.join(inputDirectory, '**/*.json'),
    path.join(inputDirectory, '**/*.tsp'),
  ]
  server.watcher.add(watchPatterns)
  return inputDirectory
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
    configuration.swr?.output,
    configuration['tanstack-query']?.output,
    configuration['svelte-query']?.output,
    configuration['vue-query']?.output,
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
  const pluginState: {
    current: Configuration | null
    previous: Configuration | null
    inputDirectory: string | null
  } = {
    current: null,
    previous: null,
    inputDirectory: null,
  }
  const absoluteConfigFilePath = path.resolve(process.cwd(), 'hono-takibi.config.ts')

  const runGeneration = async () => {
    if (!pluginState.current) return
    console.log('🔥 hono-takibi')
    const { logs } = await runAllGenerationTasks(pluginState.current)
    for (const logMessage of logs) console.log(logMessage)
  }

  const runGenerationAndReload = async (server?: ViteDevServer) => {
    await runGeneration()
    if (server) server.ws.send({ type: 'full-reload' })
  }

  const handleConfigurationChange = async (server: ViteDevServer) => {
    const nextConfiguration = await loadConfigurationWithHotReload(server)
    if (!nextConfiguration.ok) {
      console.error(`❌ config: ${nextConfiguration.error}`)
      return
    }

    if (pluginState.current) {
      const cleanedPaths = await cleanupStaleOutputs(pluginState.current, nextConfiguration.value)
      for (const cleanedPath of cleanedPaths) console.log(`✅ cleanup: ${cleanedPath}`)
    }

    pluginState.previous = pluginState.current
    pluginState.current = nextConfiguration.value
    pluginState.inputDirectory = addInputGlobsToWatcher(
      server,
      toAbsolutePath(pluginState.current.input),
    )
    await runGenerationAndReload(server)
  }

  const vitePlugin = {
    name: 'hono-takibi-vite',

    handleHotUpdate(context: { file: string; server: ViteDevServer }) {
      const absoluteFilePath = path.resolve(context.file)
      if (absoluteFilePath === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        console.log('config changed (hot-update)')
        handleConfigurationChange(context.server).catch((error) =>
          console.error('❌ hot-update error:', error),
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
          console.error(`❌ config: ${initialConfiguration.error}`)
          return
        }
        pluginState.current = initialConfiguration.value

        pluginState.inputDirectory = addInputGlobsToWatcher(
          server,
          toAbsolutePath(pluginState.current.input),
        )
        server.watcher.add(absoluteConfigFilePath)

        const debouncedRunGeneration = debounce(200, () => void runGenerationAndReload(server))

        server.watcher.on('all', async (_eventType, filePath) => {
          const absoluteChangedPath = path.resolve(filePath)
          if (absoluteChangedPath === absoluteConfigFilePath) {
            console.log('config changed (watch)')
            await handleConfigurationChange(server)
            return
          }
          if (
            pluginState.inputDirectory &&
            isInputFile(absoluteChangedPath, pluginState.inputDirectory)
          ) {
            debouncedRunGeneration()
          }
        })

        await runGenerationAndReload(server)
      })().catch((error) => console.error('❌ watch error:', error))
    },
  }

  return vitePlugin
}
