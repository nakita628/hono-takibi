import fsp from 'node:fs/promises'
import path from 'node:path'

import { parseConfig } from '../config/index.js'
import { setFormatOptions } from '../format/index.js'
import { isRecord } from '../guard/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { makeJob } from '../shared/index.js'

type Config = Extract<ReturnType<typeof parseConfig>, { ok: true }>['value']

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

async function readConfigurationWithHotReload(server: ViteDevServer) {
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
    const loadedModule = await server.ssrLoadModule(`${absoluteConfigPath}?t=${String(Date.now())}`)
    const defaultExport = isRecord(loadedModule) ? Reflect.get(loadedModule, 'default') : undefined
    if (!(typeof defaultExport === 'object' && defaultExport !== null)) {
      return { ok: false, error: 'Config must export default object' } as const
    }
    const parsed = parseConfig(defaultExport)
    return parsed.ok
      ? ({ ok: true, value: parsed.value } as const)
      : ({ ok: false, error: parsed.error } as const)
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

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
function debounce(delayMilliseconds: number, callback: () => void): () => void {
  const timerStorage = new WeakMap<() => void, ReturnType<typeof setTimeout>>()
  const wrappedFunction = (): void => {
    const previousTimer = timerStorage.get(wrappedFunction)
    if (previousTimer !== undefined) clearTimeout(previousTimer)
    timerStorage.set(wrappedFunction, setTimeout(callback, delayMilliseconds))
  }
  return wrappedFunction
}

/**
 * Runs all code generation tasks in parallel based on the provided configuration.
 *
 * @param config - Parsed configuration object
 * @returns Promise resolving to object containing log messages
 */
async function runAllGenerationTasks(config: Config) {
  if (config.format) setFormatOptions(config.format)
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { logs: [`❌ parseOpenAPI: ${openAPIResult.error}`] }
  const openAPI = openAPIResult.value

  const cleanupSplitOutput = async (absOutput: string): Promise<void> => {
    const stat = await fsp.stat(absOutput).catch(() => null)
    if (!stat?.isDirectory()) return
    const entries = await fsp.readdir(absOutput, { withFileTypes: true }).catch(() => [])
    await Promise.all(
      entries
        .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
        .map((entry) => fsp.unlink(path.join(absOutput, entry.name)).catch(() => undefined)),
    )
  }

  const logs = await Promise.all(
    makeJob(openAPI, config).map(async (job) => {
      const absOutput = path.resolve(process.cwd(), job.output)
      if (job.split) await cleanupSplitOutput(absOutput)
      const result = await job.run(absOutput)
      return result.ok
        ? `✅ ${job.name}${job.split ? '(split)' : ''} -> ${absOutput}`
        : `❌ ${job.name}: ${result.error}`
    }),
  )
  return { logs }
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
function addInputGlobsToWatcher(server: ViteDevServer, absoluteInputPath: string): string {
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

function extractOutputPaths(config: Config): readonly string[] {
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
    config['zod-openapi']?.routes?.output,
    config['zod-openapi']?.webhooks?.output,
    config.type?.output,
    config.rpc?.output,
    config.swr?.output,
    config['tanstack-query']?.output,
    config['svelte-query']?.output,
    config['vue-query']?.output,
    config['preact-query']?.output,
    config['solid-query']?.output,
    config['angular-query']?.output,
    config.test?.output,
    config.mock?.output,
    config.docs?.output,
  ]
    .filter((outputPath) => outputPath !== undefined)
    .map((outputPath) => path.resolve(process.cwd(), outputPath))
}

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
    for (const logMessage of logs) {
      console.log(logMessage)
    }
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
      const cleanupStaleOutputs = async (
        previousConfiguration: Config,
        currentConfiguration: Config,
      ) => {
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
      const cleanedPaths = await cleanupStaleOutputs(pluginState.current, nextConfiguration.value)
      for (const cleanedPath of cleanedPaths) {
        console.log(`✅ cleanup: ${cleanedPath}`)
      }
    }
    pluginState.previous = pluginState.current
    pluginState.current = nextConfiguration.value
    pluginState.inputDirectory = addInputGlobsToWatcher(
      server,
      path.resolve(process.cwd(), pluginState.current.input),
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
          path.resolve(process.cwd(), pluginState.current.input),
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
            absoluteChangedPath.startsWith(pluginState.inputDirectory) &&
            (absoluteChangedPath.endsWith('.yaml') ||
              absoluteChangedPath.endsWith('.json') ||
              absoluteChangedPath.endsWith('.tsp'))
          ) {
            debouncedRunGeneration()
          }
        })
        await runGenerationAndReload(server)
      })().catch((e) => console.error('❌ watch error:', e))
    },
  }
  return vitePlugin
}
