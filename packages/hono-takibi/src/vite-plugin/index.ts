// oxlint-disable no-console -- the plugin reports generation progress to the Vite terminal
import crypto from 'node:crypto'
import fsp from 'node:fs/promises'
import path from 'node:path'

import { Effect, Result } from 'effect'

import { parseConfig } from '../config/index.js'
import { FormatOptions } from '../format/index.js'
import { fileSystemLayer } from '../file/index.js'
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

function isWatchedInputFile(filePath: string): boolean {
  return filePath.endsWith('.yaml') || filePath.endsWith('.json') || filePath.endsWith('.tsp')
}

async function listWatchedInputFiles(directory: string): Promise<readonly string[]> {
  const entries = await fsp.readdir(directory, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map(async (entry) => {
      const entryPath = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        return entry.name === 'node_modules' || entry.name.startsWith('.')
          ? []
          : listWatchedInputFiles(entryPath)
      }
      return entry.isFile() && isWatchedInputFile(entryPath) ? [entryPath] : []
    }),
  )
  return nested.flat()
}

/**
 * Hashes the contents of all watched input files under the input directory.
 *
 * Returns null when the set cannot be read reliably, so callers treat
 * "unknown" as "changed" and regenerate.
 */
async function hashWatchedInputs(directory: string) {
  const files = [...(await listWatchedInputFiles(directory))].toSorted()
  if (files.length === 0) return null
  const contents = await Promise.all(
    files.map(async (file) => ({
      file,
      content: await fsp.readFile(file, 'utf-8').catch(() => null),
    })),
  )
  if (contents.some((entry) => entry.content === null)) return null
  const hash = crypto.createHash('sha256')
  for (const entry of contents) {
    hash.update(entry.file)
    hash.update('\0')
    hash.update(entry.content ?? '')
    hash.update('\0')
  }
  return hash.digest('hex')
}

async function listOutputFiles(
  target: string,
): Promise<readonly { readonly file: string; readonly mtimeMs: number }[]> {
  const stats = await fsp.stat(target).catch(() => null)
  if (!stats) return []
  if (stats.isFile()) return [{ file: target, mtimeMs: stats.mtimeMs }]
  if (!stats.isDirectory()) return []
  const entries = await fsp.readdir(target, { withFileTypes: true }).catch(() => [])
  const nested = await Promise.all(
    entries.map((entry) => listOutputFiles(path.join(target, entry.name))),
  )
  return nested.flat()
}

/**
 * Snapshots mtimes of all files under the job output paths.
 *
 * `writeFile` skips identical content, so an unchanged mtime means the file
 * was not rewritten. For `.ts` outputs the sibling split directory
 * (`dir/name/` derived from `dir/name.ts`) is included as well.
 */
async function snapshotOutputs(outputPaths: readonly string[]) {
  const targets = [
    ...new Set(
      outputPaths.flatMap((outputPath) => [
        outputPath,
        ...(outputPath.endsWith('.ts')
          ? [path.join(path.dirname(outputPath), path.basename(outputPath, '.ts'))]
          : []),
      ]),
    ),
  ]
  const collected = await Promise.all(targets.map((target) => listOutputFiles(target)))
  return new Map(collected.flat().map((entry) => [entry.file, entry.mtimeMs]))
}

function sameOutputSnapshot(
  before: ReadonlyMap<string, number>,
  after: ReadonlyMap<string, number>,
): boolean {
  return (
    before.size === after.size &&
    [...before].every(([file, mtimeMs]) => after.get(file) === mtimeMs)
  )
}

/**
 * Runs all code generation tasks in parallel based on the provided configuration.
 *
 * @param config - Parsed configuration object
 * @returns Promise resolving to object containing log messages and whether any output file changed
 */
async function cleanupSplitOutput(absOutput: string): Promise<void> {
  const stat = await fsp.stat(absOutput).catch(() => null)
  if (!stat?.isDirectory()) return
  const entries = await fsp.readdir(absOutput, { withFileTypes: true }).catch(() => [])
  await Promise.all(
    entries
      .filter((entry) => entry.isFile() && entry.name.endsWith('.ts'))
      .map((entry) => fsp.unlink(path.join(absOutput, entry.name)).catch(() => undefined)),
  )
}

/**
 * Runs one generation pass and reports a log line per job.
 *
 * The generators are Effects; this is the plugin's boundary, so it provides the
 * filesystem and the config's oxfmt options here and hands Vite plain values back.
 * A job that fails logs and does not stop its siblings — a dev server keeps running.
 */
async function runAllGenerationTasks(config: Config) {
  const openAPIResult = await Effect.runPromise(
    Effect.result(parseOpenAPI(config.input).pipe(Effect.provide(fileSystemLayer))),
  )
  if (Result.isFailure(openAPIResult)) {
    return { logs: [`❌ parseOpenAPI: ${openAPIResult.failure.message}`], changed: false }
  }
  const jobs = makeJob(openAPIResult.success, config)
  const outputPaths = jobs.map((job) => path.resolve(process.cwd(), job.output))
  const beforeSnapshot = await snapshotOutputs(outputPaths)
  const logs = await Promise.all(
    jobs.map(async (job) => {
      const absOutput = path.resolve(process.cwd(), job.output)
      if (job.split) await cleanupSplitOutput(absOutput)
      const result = await Effect.runPromise(
        Effect.result(
          job
            .run(absOutput)
            .pipe(
              Effect.provideService(FormatOptions, config.format ?? {}),
              Effect.provide(fileSystemLayer),
            ),
        ),
      )
      return Result.isSuccess(result)
        ? `✅ ${job.name}${job.split ? '(split)' : ''} -> ${absOutput}`
        : `❌ ${job.name}: ${result.failure.message}`
    }),
  )
  const afterSnapshot = await snapshotOutputs(outputPaths)
  return { logs, changed: !sameOutputSnapshot(beforeSnapshot, afterSnapshot) }
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

async function allOutputsExist(config: Config) {
  const stats = await Promise.all(
    extractOutputPaths(config).map((outputPath) => fsp.stat(outputPath).catch(() => null)),
  )
  return stats.every((stat) => stat !== null)
}

function extractOutputPaths(config: Config): readonly string[] {
  return [
    config.output,
    config.components?.schemas?.output,
    config.components?.parameters?.output,
    config.components?.headers?.output,
    config.components?.examples?.output,
    config.components?.links?.output,
    config.components?.callbacks?.output,
    config.components?.securitySchemes?.output,
    config.components?.requestBodies?.output,
    config.components?.responses?.output,
    config.components?.pathItems?.output,
    config.components?.mediaTypes?.output,
    config.routes?.output,
    config.webhooks?.output,
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
    lastInputHash: string | null
    runQueue: Promise<void>
  } = {
    current: null,
    previous: null,
    inputDirectory: null,
    lastInputHash: null,
    runQueue: Promise.resolve(),
  }
  const absoluteConfigFilePath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  const runGeneration = async () => {
    if (!pluginState.current) return false
    console.log('🔥 hono-takibi')
    const { logs, changed } = await runAllGenerationTasks(pluginState.current)
    for (const logMessage of logs) {
      console.log(logMessage)
    }
    return changed
  }
  const runGenerationAndReload = async (server?: ViteDevServer) => {
    const changed = await runGeneration()
    if (server && changed) server.ws.send({ type: 'full-reload' })
  }
  // Skipping additionally requires every declared output to exist, so deleting
  // a generated file and touching the input still regenerates it.
  const runIfInputsChanged = async (server: ViteDevServer) => {
    if (!pluginState.inputDirectory || !pluginState.current) return
    const inputHash = await hashWatchedInputs(pluginState.inputDirectory)
    if (
      inputHash !== null &&
      inputHash === pluginState.lastInputHash &&
      (await allOutputsExist(pluginState.current))
    ) {
      console.log('⏭️ input unchanged - skipped regeneration')
      return
    }
    pluginState.lastInputHash = inputHash
    await runGenerationAndReload(server)
  }
  // Serializes generation runs: a config-change run bypasses the debounce and
  // could otherwise interleave its cleanup with another run's writes.
  const enqueueRun = (task: () => Promise<void>) => {
    const queued = pluginState.runQueue.then(task).catch((e: unknown) => {
      console.error('❌ run error:', e)
    })
    pluginState.runQueue = queued
    return queued
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
              await fsp.rm(stalePath, { recursive: true, force: true }).catch(() => undefined)
              return stalePath
            }
            if (fileStats.isFile() && (stalePath.endsWith('.ts') || stalePath.endsWith('.md'))) {
              await fsp.unlink(stalePath).catch(() => undefined)
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
    const inputDirectory = addInputGlobsToWatcher(
      server,
      path.resolve(process.cwd(), pluginState.current.input),
    )
    pluginState.inputDirectory = inputDirectory
    pluginState.lastInputHash = await hashWatchedInputs(inputDirectory)
    await runGenerationAndReload(server)
  }
  const vitePlugin = {
    name: 'hono-takibi-vite',
    handleHotUpdate(context: { file: string; server: ViteDevServer }) {
      const absoluteFilePath = path.resolve(context.file)
      if (absoluteFilePath === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        console.log('config changed (hot-update)')
        void enqueueRun(() => handleConfigurationChange(context.server))
        return []
      }
      return undefined
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
        const inputDirectory = addInputGlobsToWatcher(
          server,
          path.resolve(process.cwd(), pluginState.current.input),
        )
        pluginState.inputDirectory = inputDirectory
        pluginState.lastInputHash = await hashWatchedInputs(inputDirectory)
        server.watcher.add(absoluteConfigFilePath)
        // 200ms debounce: editors emit multiple fs events on save, and batch file changes
        // (e.g. git checkout) would otherwise trigger redundant regeneration cycles.
        const debouncedRunGeneration = debounce(200, () => {
          void enqueueRun(() => runIfInputsChanged(server))
        })

        server.watcher.on('all', (_eventType, filePath) => {
          const absoluteChangedPath = path.resolve(filePath)
          if (absoluteChangedPath === absoluteConfigFilePath) {
            console.log('config changed (watch)')
            void enqueueRun(() => handleConfigurationChange(server))
            return
          }
          if (
            pluginState.inputDirectory &&
            absoluteChangedPath.startsWith(pluginState.inputDirectory) &&
            isWatchedInputFile(absoluteChangedPath)
          ) {
            debouncedRunGeneration()
          }
        })
        await enqueueRun(() => runGenerationAndReload(server))
      })().catch((e: unknown) => {
        console.error('❌ watch error:', e)
      })
    },
  }
  return vitePlugin
}
