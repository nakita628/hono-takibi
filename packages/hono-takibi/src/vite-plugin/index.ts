import fsp from 'node:fs/promises'
import path from 'node:path'
import { parseConfig } from '../config/index.js'
import {
  callbacks,
  docs,
  examples,
  headers,
  links,
  mediaTypes,
  mock,
  parameters,
  pathItems,
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
  test,
  type,
  vueQuery,
  webhooks,
} from '../core/index.js'
import { isRecord } from '../guard/index.js'
import { parseOpenAPI } from '../openapi/index.js'

/**
 * Parsed configuration type extracted from parseConfig result.
 */
type Config = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

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
const isConfiguration = (value: unknown): value is Config =>
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
const readConfigurationWithHotReload = async (
  server: ViteDevServer,
): Promise<
  { readonly ok: true; readonly value: Config } | { readonly ok: false; readonly error: string }
> => {
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
 * Runs all code generation tasks in parallel based on the provided configuration.
 *
 * @param config - Parsed configuration object
 * @returns Promise resolving to object containing log messages
 */
const runAllGenerationTasks = async (
  config: Config,
): Promise<{ readonly logs: readonly string[] }> => {
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { logs: [`❌ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  /**
   * Runs a generation job with split-mode file cleanup.
   */
  const runSplitAwareJob = async (
    name: string,
    output: string,
    isSplit: boolean,
    generate: (
      absOutput: string,
    ) => Promise<
      { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
    >,
  ): Promise<string> => {
    const absOutput = toAbsolutePath(output)
    if (isSplit) {
      const beforeFiles = await listTypeScriptFilesShallow(absOutput)
      await deleteTypeScriptFiles(beforeFiles)
    }
    const result = await generate(absOutput)
    if (!result.ok) return `❌ ${name}: ${result.error}`
    return `✅ ${name}${isSplit ? '(split)' : ''} -> ${absOutput}`
  }

  // --- zod-openapi (monolithic output) ---

  const makeZodOpenAPIJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.output) return undefined
    const outputPath = toAbsolutePath(config['zod-openapi']?.output)
    return (async () => {
      if (!isTypeScriptFile(outputPath))
        return `❌ zod-openapi: Invalid output format: ${outputPath}`
      const result = await takibi(
        openAPI,
        outputPath,
        !!config['zod-openapi']?.template,
        config['zod-openapi']?.template?.test ?? false,
        config['zod-openapi']?.basePath ?? '/',
        config['zod-openapi']?.template?.pathAlias,
        config['zod-openapi']?.routes?.import,
        {
          readonly: config['zod-openapi']?.readonly,
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
          exportPathItems: config['zod-openapi']?.exportPathItems ?? false,
          exportMediaTypes: config['zod-openapi']?.exportMediaTypes ?? false,
          exportMediaTypesTypes: config['zod-openapi']?.exportMediaTypesTypes ?? false,
        },
        config['zod-openapi']?.template?.routeHandler ?? false,
      )
      return result.ok ? `✅ zod-openapi -> ${outputPath}` : `❌ zod-openapi: ${result.error}`
    })()
  }

  // --- Component jobs ---

  const makeSchemaJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.schemas) return undefined
    return runSplitAwareJob(
      'schemas',
      config['zod-openapi']?.components?.schemas?.output,
      config['zod-openapi']?.components?.schemas?.split === true,
      (out) =>
        schemas(
          openAPI.components?.schemas,
          out,
          config['zod-openapi']?.components?.schemas?.split === true,
          config['zod-openapi']?.components?.schemas?.exportTypes === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeParametersJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.parameters) return undefined
    return runSplitAwareJob(
      'parameters',
      config['zod-openapi']?.components?.parameters?.output,
      config['zod-openapi']?.components?.parameters?.split === true,
      (out) =>
        parameters(
          openAPI.components?.parameters,
          out,
          config['zod-openapi']?.components?.parameters?.split === true,
          config['zod-openapi']?.components?.parameters?.exportTypes === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeHeadersJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.headers) return undefined
    return runSplitAwareJob(
      'headers',
      config['zod-openapi']?.components?.headers?.output,
      config['zod-openapi']?.components?.headers?.split === true,
      (out) =>
        headers(
          openAPI.components?.headers,
          out,
          config['zod-openapi']?.components?.headers?.split === true,
          config['zod-openapi']?.components?.headers?.exportTypes === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeExamplesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.examples) return undefined
    return runSplitAwareJob(
      'examples',
      config['zod-openapi']?.components?.examples?.output,
      config['zod-openapi']?.components?.examples?.split === true,
      (out) =>
        examples(
          openAPI.components?.examples,
          out,
          config['zod-openapi']?.components?.examples?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeLinksJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.links) return undefined
    return runSplitAwareJob(
      'links',
      config['zod-openapi']?.components?.links?.output,
      config['zod-openapi']?.components?.links?.split === true,
      (out) =>
        links(
          openAPI.components?.links,
          out,
          config['zod-openapi']?.components?.links?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeCallbacksJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.callbacks) return undefined
    return runSplitAwareJob(
      'callbacks',
      config['zod-openapi']?.components?.callbacks?.output,
      config['zod-openapi']?.components?.callbacks?.split === true,
      (out) =>
        callbacks(
          openAPI.components?.callbacks,
          out,
          config['zod-openapi']?.components?.callbacks?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeSecuritySchemesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.securitySchemes) return undefined
    return runSplitAwareJob(
      'securitySchemes',
      config['zod-openapi']?.components?.securitySchemes?.output,
      config['zod-openapi']?.components?.securitySchemes?.split === true,
      (out) =>
        securitySchemes(
          openAPI.components?.securitySchemes,
          out,
          config['zod-openapi']?.components?.securitySchemes?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeRequestBodiesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.requestBodies) return undefined
    return runSplitAwareJob(
      'requestBodies',
      config['zod-openapi']?.components?.requestBodies?.output,
      config['zod-openapi']?.components?.requestBodies?.split === true,
      (out) =>
        requestBodies(
          openAPI.components?.requestBodies,
          out,
          config['zod-openapi']?.components?.requestBodies?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeResponsesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.responses) return undefined
    return runSplitAwareJob(
      'responses',
      config['zod-openapi']?.components?.responses?.output,
      config['zod-openapi']?.components?.responses?.split === true,
      (out) =>
        responses(
          openAPI.components?.responses,
          out,
          config['zod-openapi']?.components?.responses?.split === true,
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makePathItemsJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.pathItems) return undefined
    return runSplitAwareJob(
      'pathItems',
      config['zod-openapi']?.components?.pathItems?.output,
      config['zod-openapi']?.components?.pathItems?.split === true,
      (out) =>
        pathItems(
          openAPI.components ?? {},
          { output: out, split: config['zod-openapi']?.components?.pathItems?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeMediaTypesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.mediaTypes) return undefined
    return runSplitAwareJob(
      'mediaTypes',
      config['zod-openapi']?.components?.mediaTypes?.output,
      config['zod-openapi']?.components?.mediaTypes?.split === true,
      (out) =>
        mediaTypes(
          openAPI.components?.mediaTypes,
          out,
          config['zod-openapi']?.components?.mediaTypes?.split === true,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  const makeWebhooksJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.components?.webhooks) return undefined
    return runSplitAwareJob(
      'webhooks',
      config['zod-openapi']?.components?.webhooks?.output,
      config['zod-openapi']?.components?.webhooks?.split === true,
      (out) =>
        webhooks(
          openAPI,
          { output: out, split: config['zod-openapi']?.components?.webhooks?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  // --- Routes ---

  const makeRoutesJob = (): Promise<string> | undefined => {
    if (!config['zod-openapi']?.routes) return undefined
    return runSplitAwareJob(
      'routes',
      config['zod-openapi']?.routes?.output,
      config['zod-openapi']?.routes?.split === true,
      (out) =>
        route(
          openAPI,
          { output: out, split: config['zod-openapi']?.routes?.split ?? false },
          config['zod-openapi']?.components,
          config['zod-openapi']?.readonly,
        ),
    )
  }

  // --- Type ---

  const makeTypeJob = (): Promise<string> | undefined => {
    if (!config.type) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.type?.output ?? '')
      if (!isTypeScriptFile(outputPath)) return `❌ type: Invalid output format: ${outputPath}`
      const result = await type(openAPI, outputPath)
      return result.ok ? `✅ type -> ${outputPath}` : `❌ type: ${result.error}`
    })()
  }

  // --- RPC ---

  const makeRpcJob = (): Promise<string> | undefined => {
    if (!config.rpc) return undefined
    return runSplitAwareJob('rpc', config.rpc?.output ?? '', config.rpc?.split === true, (out) =>
      rpc(
        openAPI,
        out,
        config.rpc?.import ?? '',
        config.rpc?.split === true,
        config.rpc?.client ?? 'client',
        config.rpc?.parseResponse ?? false,
      ),
    )
  }

  // --- Query clients ---

  const makeQueryJob = (
    name: string,
    cfg: typeof config.swr,
    fn: typeof swr,
  ): Promise<string> | undefined => {
    if (!cfg) return undefined
    return runSplitAwareJob(name, cfg.output, cfg.split === true, (out) =>
      fn(openAPI, out, cfg.import, cfg.split === true, cfg.client ?? 'client'),
    )
  }

  // --- Test & Mock ---

  const makeTestJob = (): Promise<string> | undefined => {
    if (!config.test) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.test?.output ?? '')
      const result = await test(openAPI, outputPath, config.test?.import ?? '')
      return result.ok ? `✅ test -> ${outputPath}` : `❌ test: ${result.error}`
    })()
  }

  const makeMockJob = (): Promise<string> | undefined => {
    if (!config.mock) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.mock?.output ?? '')
      const result = await mock(
        openAPI,
        outputPath,
        config['zod-openapi']?.basePath ?? '/',
        config['zod-openapi']?.readonly,
      )
      return result.ok ? `✅ mock -> ${outputPath}` : `❌ mock: ${result.error}`
    })()
  }

  const makeDocsJob = (): Promise<string> | undefined => {
    if (!config.docs) return undefined
    return (async () => {
      const outputPath = toAbsolutePath(config.docs?.output ?? '')
      const result = await docs(
        openAPI,
        outputPath,
        config.docs?.entry ?? 'src/index.ts',
        config['zod-openapi']?.basePath ?? '/',
      )
      return result.ok ? `✅ docs -> ${outputPath}` : `❌ docs: ${result.error}`
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
    makePathItemsJob(),
    makeMediaTypesJob(),
    makeWebhooksJob(),
    makeRoutesJob(),
    makeTypeJob(),
    makeRpcJob(),
    makeQueryJob('swr', config.swr, swr),
    makeQueryJob('tanstack-query', config['tanstack-query'], tanstackQuery),
    makeQueryJob('svelte-query', config['svelte-query'], svelteQuery),
    makeQueryJob('vue-query', config['vue-query'], vueQuery),
    makeTestJob(),
    makeMockJob(),
    makeDocsJob(),
  ].filter((job) => job !== undefined)

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
 * Watches OpenAPI spec and config files for changes and
 * automatically regenerates TypeScript code with hot reload.
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
 * @param config - The configuration object
 * @returns Array of absolute output paths
 */
const extractOutputPaths = (config: Config): string[] => {
  return [
    config['zod-openapi']?.output,
    config['zod-openapi']?.components?.schemas?.output,
    config['zod-openapi']?.components?.parameters?.output,
    config['zod-openapi']?.components?.headers?.output,
    config['zod-openapi']?.components?.examples?.output,
    config['zod-openapi']?.components?.links?.output,
    config['zod-openapi']?.components?.callbacks?.output,
    config['zod-openapi']?.components?.securitySchemes?.output,
    config['zod-openapi']?.components?.requestBodies?.output,
    config['zod-openapi']?.components?.responses?.output,
    config['zod-openapi']?.components?.pathItems?.output,
    config['zod-openapi']?.components?.mediaTypes?.output,
    config['zod-openapi']?.components?.webhooks?.output,
    config['zod-openapi']?.routes?.output,
    config.type?.output,
    config.rpc?.output,
    config.swr?.output,
    config['tanstack-query']?.output,
    config['svelte-query']?.output,
    config['vue-query']?.output,
    config.test?.output,
    config.mock?.output,
    config.docs?.output,
  ]
    .filter((outputPath) => outputPath !== undefined)
    .map(toAbsolutePath)
}

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
  previousConfiguration: Config,
  currentConfiguration: Config,
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
      if (fileStats.isFile() && (stalePath.endsWith('.ts') || stalePath.endsWith('.md'))) {
        await fsp.unlink(stalePath).catch(() => {})
        return stalePath
      }
      return null
    }),
  )
  return cleanupResults.filter((result) => result !== null)
}

// biome-ignore lint: plugin returns any for Vite compatibility
export function honoTakibiVite(): any {
  const pluginState: {
    current: Config | null
    previous: Config | null
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
    const nextConfiguration = await readConfigurationWithHotReload(server)
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
        const initialConfiguration = await readConfigurationWithHotReload(server)
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

        // 200ms debounce: editors emit multiple fs events on save, and batch file changes
        // (e.g. git checkout) would otherwise trigger redundant regeneration cycles.
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
