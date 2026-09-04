// oxlint-disable no-console -- the plugin reports generation progress to the Vite terminal
import crypto from 'node:crypto'
import path from 'node:path'

import { Effect, FileSystem, Option, Result } from 'effect'

import { parseConfig } from '../config/index.js'
import type { Config } from '../config/index.js'
import { fileSystemLayer } from '../file/index.js'
import { FormatOptions } from '../format/index.js'
import { isRecord } from '../guard/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { appEntryOutput, cleanSplitOutputs, makeJob } from '../shared/index.js'

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
      return Result.fail('Config must export default object')
    }
    const parsed = await Effect.runPromise(Effect.result(parseConfig(defaultExport)))
    return Result.mapError(parsed, (error) => error.message)
  } catch (error) {
    return Result.fail(error instanceof Error ? error.message : String(error))
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

/**
 * `stat`, or `null` when the path cannot be read.
 *
 * Every filesystem question the plugin asks is advisory — it decides whether to skip a
 * regeneration or clean a path up, never whether the build is valid. So a path it cannot
 * see reads as absent, and a dev server keeps running. That is a wider net than
 * `file/index.ts` casts for the generators, where only "not found" is absorbed.
 */
function statOrNull(target: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    return yield* fs.stat(target).pipe(Effect.orElseSucceed(() => null))
  })
}

/**
 * Directory entries with each one's kind.
 *
 * `FileSystem.readDirectory` answers with names only, so the `withFileTypes` the callers
 * below want is a `stat` per entry.
 */
function readEntries(directory: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const names = yield* fs
      .readDirectory(directory)
      .pipe(Effect.orElseSucceed((): readonly string[] => []))
    const paths = names.map((name) => path.join(directory, name))
    const infos = yield* Effect.all(paths.map(statOrNull), { concurrency: 'unbounded' })
    return names.map((name, index) => ({
      name,
      path: paths[index] ?? path.join(directory, name),
      type: infos[index]?.type,
    }))
  })
}

function listWatchedInputFiles(
  directory: string,
): Effect.Effect<readonly string[], never, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    const entries = yield* readEntries(directory)
    const here = entries
      .filter((entry) => entry.type === 'File' && isWatchedInputFile(entry.path))
      .map((entry) => entry.path)
    const nested = yield* Effect.all(
      entries
        .filter(
          (entry) =>
            entry.type === 'Directory' &&
            entry.name !== 'node_modules' &&
            !entry.name.startsWith('.'),
        )
        .map((entry) => listWatchedInputFiles(entry.path)),
      { concurrency: 'unbounded' },
    )
    return [...here, ...nested.flat()]
  })
}

/**
 * Hashes the contents of all watched input files under the input directory.
 *
 * Returns null when the set cannot be read reliably, so callers treat
 * "unknown" as "changed" and regenerate.
 */
function hashWatchedInputs(directory: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const files = [...(yield* listWatchedInputFiles(directory))].toSorted()
    if (files.length === 0) return null
    const contents = yield* Effect.all(
      files.map((file) => fs.readFileString(file).pipe(Effect.orElseSucceed(() => null))),
      { concurrency: 'unbounded' },
    )
    if (contents.some((content) => content === null)) return null
    const hash = crypto.createHash('sha256')
    for (const [index, file] of files.entries()) {
      hash.update(file)
      hash.update('\0')
      hash.update(contents[index] ?? '')
      hash.update('\0')
    }
    return hash.digest('hex')
  })
}

function listOutputFiles(
  target: string,
): Effect.Effect<
  readonly { readonly file: string; readonly mtimeMs: number }[],
  never,
  FileSystem.FileSystem
> {
  return Effect.gen(function* () {
    const info = yield* statOrNull(target)
    if (info === null) return []
    if (info.type === 'File') {
      return [{ file: target, mtimeMs: Option.getOrElse(info.mtime, () => new Date(0)).getTime() }]
    }
    if (info.type !== 'Directory') return []
    const entries = yield* readEntries(target)
    const nested = yield* Effect.all(
      entries.map((entry) => listOutputFiles(entry.path)),
      { concurrency: 'unbounded' },
    )
    return nested.flat()
  })
}

/**
 * Snapshots mtimes of all files under the job output paths.
 *
 * `writeFile` skips identical content, so an unchanged mtime means the file
 * was not rewritten. For `.ts` outputs the sibling split directory
 * (`dir/name/` derived from `dir/name.ts`) is included as well.
 */
function snapshotOutputs(outputPaths: readonly string[]) {
  return Effect.gen(function* () {
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
    const collected = yield* Effect.all(targets.map(listOutputFiles), {
      concurrency: 'unbounded',
    })
    return new Map(collected.flat().map((entry) => [entry.file, entry.mtimeMs]))
  })
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
/**
 * Runs one generation pass and reports a log line per job.
 *
 * The generators are Effects; this is the plugin's boundary, so it provides the
 * filesystem and the config's oxfmt options here and hands Vite plain values back.
 * A job that fails logs and does not stop its siblings — a dev server keeps running.
 */
function runAllGenerationTasks(config: Config) {
  return Effect.gen(function* () {
    const openAPIResult = yield* Effect.result(parseOpenAPI(config.input))
    if (Result.isFailure(openAPIResult)) {
      return { logs: [`❌ parseOpenAPI: ${openAPIResult.failure.message}`], changed: false }
    }
    const jobs = makeJob(openAPIResult.success, config)
    const targets = jobs.map((job) => ({ job, absOutput: path.resolve(process.cwd(), job.output) }))
    const outputPaths = targets.map(({ absOutput }) => absOutput)
    const beforeSnapshot = yield* snapshotOutputs(outputPaths)
    // The same clean the CLI runs, so one config cannot leave two different directories
    // behind depending on which entry point produced it.
    yield* cleanSplitOutputs(
      targets.filter(({ job }) => job.split).map(({ absOutput }) => absOutput),
    )
    // `Effect.result` per job is what keeps a failure from cancelling its siblings — a
    // dev server keeps running — so the array that comes back is one log line per job.
    const logs = yield* Effect.all(
      targets.map(({ job, absOutput }) =>
        Effect.result(job.run(absOutput)).pipe(
          Effect.map((result) =>
            Result.isSuccess(result)
              ? `✅ ${job.name}${job.split ? '(split)' : ''} -> ${absOutput}`
              : `❌ ${job.name}: ${result.failure.message}`,
          ),
        ),
      ),
      { concurrency: 'unbounded' },
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    const afterSnapshot = yield* snapshotOutputs(outputPaths)
    return { logs, changed: !sameOutputSnapshot(beforeSnapshot, afterSnapshot) }
  })
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

function allOutputsExist(config: Config) {
  return Effect.gen(function* () {
    const infos = yield* Effect.all(extractOutputPaths(config).map(statOrNull), {
      concurrency: 'unbounded',
    })
    return infos.every((info) => info !== null)
  })
}

/**
 * Removes what the previous config generated and the next one no longer names.
 *
 * A stale path is only removed when it is a directory or a generated file — a `.ts` or
 * `.md` the plugin would have written. Anything else the config used to point at is left
 * alone rather than deleted on a config edit.
 */
function cleanupStaleOutputs(previousConfiguration: Config, currentConfiguration: Config) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const currentPaths = new Set(extractOutputPaths(currentConfiguration))
    const stalePaths = [...new Set(extractOutputPaths(previousConfiguration))].filter(
      (stalePath) => !currentPaths.has(stalePath),
    )
    const infos = yield* Effect.all(stalePaths.map(statOrNull), { concurrency: 'unbounded' })
    const removable = stalePaths.filter((stalePath, index) => {
      const type = infos[index]?.type
      return (
        type === 'Directory' ||
        (type === 'File' && (stalePath.endsWith('.ts') || stalePath.endsWith('.md')))
      )
    })
    yield* Effect.all(
      removable.map((stalePath) =>
        fs
          .remove(stalePath, { recursive: true, force: true })
          .pipe(Effect.orElseSucceed(() => undefined)),
      ),
      { concurrency: 'unbounded' },
    )
    return removable
  })
}

/**
 * Every path this config declares an output at.
 *
 * Hand-listed rather than read off `makeJob`, which needs the parsed document these
 * callers do not have. The two entries a caller cannot read straight off the config —
 * `components.output` and the derived app entry — come from `shared` so they cannot
 * disagree with what the generators actually write.
 */
function extractOutputPaths(config: Config): readonly string[] {
  return [
    config.output,
    appEntryOutput(config),
    config.components?.output,
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
    inputDirectory: string | null
    lastInputHash: string | null
    runQueue: Promise<void>
  } = {
    current: null,
    inputDirectory: null,
    lastInputHash: null,
    runQueue: Promise.resolve(),
  }
  const absoluteConfigFilePath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
  let pendingConfigurationServer: ViteDevServer | null = null
  const runGeneration = async () => {
    if (!pluginState.current) return false
    console.log('🔥 hono-takibi')
    const { logs, changed } = await Effect.runPromise(
      runAllGenerationTasks(pluginState.current).pipe(Effect.provide(fileSystemLayer)),
    )
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
    const { inputHash, outputsExist } = await Effect.runPromise(
      Effect.all({
        inputHash: hashWatchedInputs(pluginState.inputDirectory),
        outputsExist: allOutputsExist(pluginState.current),
      }).pipe(Effect.provide(fileSystemLayer)),
    )
    if (inputHash !== null && inputHash === pluginState.lastInputHash && outputsExist) {
      console.log('⏭️ input unchanged - skipped regeneration')
      return
    }
    pluginState.lastInputHash = inputHash
    await runGenerationAndReload(server)
  }
  // Serializes generation runs: a config-change run bypasses the debounce and
  // could otherwise interleave its cleanup with another run's writes.
  const enqueueRun = (task: () => Promise<void>) => {
    const queued = pluginState.runQueue.then(task).catch((error: unknown) => {
      console.error('❌ run error:', error)
    })
    pluginState.runQueue = queued
    return queued
  }
  const handleConfigurationChange = async (server: ViteDevServer) => {
    console.log('config changed')
    const nextConfiguration = await readConfigurationWithHotReload(server)
    if (Result.isFailure(nextConfiguration)) {
      console.error(`❌ config: ${nextConfiguration.failure}`)
      return
    }
    if (pluginState.current) {
      const cleanedPaths = await Effect.runPromise(
        cleanupStaleOutputs(pluginState.current, nextConfiguration.success).pipe(
          Effect.provide(fileSystemLayer),
        ),
      )
      for (const cleanedPath of cleanedPaths) {
        console.log(`✅ cleanup: ${cleanedPath}`)
      }
    }
    pluginState.current = nextConfiguration.success
    const inputDirectory = addInputGlobsToWatcher(
      server,
      path.resolve(process.cwd(), pluginState.current.input),
    )
    pluginState.inputDirectory = inputDirectory
    pluginState.lastInputHash = await Effect.runPromise(
      hashWatchedInputs(inputDirectory).pipe(Effect.provide(fileSystemLayer)),
    )
    await runGenerationAndReload(server)
  }
  const debouncedConfigurationChange = debounce(200, () => {
    const server = pendingConfigurationServer
    if (server) void enqueueRun(() => handleConfigurationChange(server))
  })
  /**
   * One entry point for a config edit, however it was noticed.
   *
   * Both hooks see the same save — Vite calls `handleHotUpdate` for the config module and
   * the raw watcher reports the file too — so one edit used to arrive twice and run two
   * full generation passes. Debounced for the same reason the input side is: an editor
   * emits several events per save.
   */
  const queueConfigurationChange = (server: ViteDevServer) => {
    pendingConfigurationServer = server
    debouncedConfigurationChange()
  }
  const vitePlugin = {
    name: 'hono-takibi-vite',
    handleHotUpdate(context: { file: string; server: ViteDevServer }) {
      const absoluteFilePath = path.resolve(context.file)
      if (absoluteFilePath === path.resolve(process.cwd(), 'hono-takibi.config.ts')) {
        queueConfigurationChange(context.server)
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
        if (Result.isFailure(initialConfiguration)) {
          console.error(`❌ config: ${initialConfiguration.failure}`)
          return
        }
        pluginState.current = initialConfiguration.success
        const inputDirectory = addInputGlobsToWatcher(
          server,
          path.resolve(process.cwd(), pluginState.current.input),
        )
        pluginState.inputDirectory = inputDirectory
        pluginState.lastInputHash = await Effect.runPromise(
          hashWatchedInputs(inputDirectory).pipe(Effect.provide(fileSystemLayer)),
        )
        server.watcher.add(absoluteConfigFilePath)
        // 200ms debounce: editors emit multiple fs events on save, and batch file changes
        // (e.g. git checkout) would otherwise trigger redundant regeneration cycles.
        const debouncedRunGeneration = debounce(200, () => {
          void enqueueRun(() => runIfInputsChanged(server))
        })

        server.watcher.on('all', (_eventType, filePath) => {
          const absoluteChangedPath = path.resolve(filePath)
          if (absoluteChangedPath === absoluteConfigFilePath) {
            queueConfigurationChange(server)
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
      })().catch((error: unknown) => {
        console.error('❌ watch error:', error)
      })
    },
  }
  return vitePlugin
}
