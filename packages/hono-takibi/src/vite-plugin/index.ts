// oxlint-disable no-console -- the plugin reports generation progress to the Vite terminal
import crypto from 'node:crypto'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect, FileSystem, Option, Result } from 'effect'

import { parseConfig } from '../config/index.js'
import type { Config } from '../config/index.js'
import { INPUT_EXTENSIONS } from '../constants/index.js'
import { FormatOptions } from '../format/index.js'
import { isRecord } from '../guard/index.js'
import { appEntryOutput, isInsideDirectory } from '../helper/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import {
  cleanSplitOutputs,
  makeJob,
  withImportStyle,
  openAPI3,
  outsideSources,
  packageRoots,
} from '../shared/index.js'

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

const DEFAULT_CONFIG_FILE = 'hono-takibi.config.ts'

/**
 * The config with every `output` at any depth resolved from `root`.
 *
 * Found by key rather than listed, so an output kind added to the schema is resolved
 * without being named here.
 */
function resolveOutputs(
  root: string,
  node: { readonly [key: string]: unknown },
): { readonly [key: string]: unknown } {
  return Object.fromEntries(
    Object.entries(node).map(([key, value]) => {
      if (key === 'output' && typeof value === 'string') return [key, path.resolve(root, value)]
      return [key, isRecord(value) ? resolveOutputs(root, value) : value]
    }),
  )
}

/**
 * Checks the default export of a loaded config module, with its paths resolved from `root`.
 *
 * The generators resolve a relative path from the working directory, which is not Vite's
 * root under `vite --root app` or a monorepo run from the top. Absolute paths mean the
 * same file wherever the process runs, so nothing after this reads the working directory.
 * An `http(s)` input is not a path and stays as written.
 */
async function parseConfigModule(root: string, loadedModule: unknown) {
  const defaultExport = isRecord(loadedModule) ? Reflect.get(loadedModule, 'default') : undefined
  if (!(typeof defaultExport === 'object' && defaultExport !== null)) {
    return Result.fail('Config must export default object')
  }
  const input = isRecord(defaultExport) ? defaultExport.input : undefined
  const fromRoot = isRecord(defaultExport)
    ? {
        ...resolveOutputs(root, defaultExport),
        ...(typeof input === 'string' && !/^https?:\/\//u.test(input)
          ? { input: path.resolve(root, input) }
          : {}),
      }
    : defaultExport
  const result = await Effect.runPromise(Effect.result(parseConfig(fromRoot)))
  return Result.mapError(result, (error) => error.message)
}

async function readConfigurationWithHotReload(
  server: ViteDevServer,
  root: string,
  absoluteConfigPath: string,
) {
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
    return await parseConfigModule(root, loadedModule)
  } catch (error) {
    return Result.fail(error instanceof Error ? error.message : String(error))
  }
}

/**
 * Creates a debounced version of a function.
 *
 * Delays invocation until after the specified milliseconds have elapsed
 * since the last call. Uses WeakMap for cleanup.
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

function isWatchedInputFile(filePath: string) {
  return INPUT_EXTENSIONS.some((extension) => filePath.endsWith(extension))
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
 * Hashes the contents of all watched input files: those under the input directory and
 * the ones the document reads from `outside` it.
 *
 * Returns null when the set cannot be read reliably, so callers treat
 * "unknown" as "changed" and regenerate.
 */
function hashWatchedInputs(directory: string, outside: readonly string[]) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const files = [
      ...new Set([...(yield* listWatchedInputFiles(directory)), ...outside]),
    ].toSorted()
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
) {
  return (
    before.size === after.size &&
    [...before].every(([file, mtimeMs]) => after.get(file) === mtimeMs)
  )
}

/**
 * Runs one generation pass and reports a log line per job.
 *
 * The generators are Effects; this is the plugin's boundary, so it provides the
 * filesystem and the config's oxfmt options here and hands Vite plain values back.
 * A job that fails logs and does not stop its siblings — a dev server keeps running.
 */
function runAllGenerationTasks(config: Config) {
  return Effect.gen(function* () {
    const parsed = yield* Effect.result(parseOpenAPI(config.input))
    if (Result.isFailure(parsed)) {
      return { logs: [`❌ parseOpenAPI: ${parsed.failure.message}`], changed: false }
    }
    const openAPIResult = yield* Effect.result(openAPI3(parsed.success, config.input))
    if (Result.isFailure(openAPIResult)) {
      return { logs: [`❌ parseOpenAPI: ${openAPIResult.failure.message}`], changed: false }
    }
    const packagesResult = yield* Effect.result(packageRoots(openAPIResult.success, config))
    if (Result.isFailure(packagesResult)) {
      return { logs: [`❌ config: ${packagesResult.failure.message}`], changed: false }
    }
    const jobs = makeJob(openAPIResult.success, config, packagesResult.success)
    const outputPaths = jobs.map((job) => job.output)
    const beforeSnapshot = yield* snapshotOutputs(outputPaths)
    // The same clean the CLI runs, so one config cannot leave two different directories
    // behind depending on which entry point produced it.
    yield* cleanSplitOutputs(jobs.filter((job) => job.split).map((job) => job.output))
    // `Effect.result` per job is what keeps a failure from cancelling its siblings — a
    // dev server keeps running — so the array that comes back is one log line per job.
    const logs = yield* withImportStyle(
      config,
      Effect.all(
        jobs.map((job) =>
          Effect.result(job.run(job.output)).pipe(
            Effect.map((result) =>
              Result.isSuccess(result)
                ? `✅ ${job.name}${job.split ? '(split)' : ''} -> ${job.output}`
                : `❌ ${job.name}: ${result.failure.message}`,
            ),
          ),
        ),
        { concurrency: 'unbounded' },
      ),
    ).pipe(Effect.provideService(FormatOptions, config.format ?? {}))
    const afterSnapshot = yield* snapshotOutputs(outputPaths)
    return { logs, changed: !sameOutputSnapshot(beforeSnapshot, afterSnapshot) }
  })
}

/**
 * Adds glob patterns to the Vite file watcher.
 *
 * Watches the input file and every file with an input extension under its directory.
 * The globs are written with `/` on every platform: chokidar reads `\` as an escape, so
 * a Windows path joined with `path.join` matches nothing.
 */
function addInputGlobsToWatcher(server: ViteDevServer, absoluteInputPath: string) {
  const inputDirectory = path.dirname(absoluteInputPath)
  const globDirectory = inputDirectory.split(path.sep).join('/')
  server.watcher.add([
    absoluteInputPath,
    ...INPUT_EXTENSIONS.map((extension) => `${globDirectory}/**/*${extension}`),
  ])
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
 * `components.output` and the derived app entry — come from where the generators take
 * them, so they cannot disagree with what the generators actually write.
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
    config.client?.output,
    config.rpc?.output,
    config.swr?.output,
    config['tanstack-query']?.output,
    config['svelte-query']?.output,
    config['vue-query']?.output,
    config['preact-query']?.output,
    config['solid-query']?.output,
    config['angular-query']?.output,
    config.mock?.output,
    config.docs?.output,
  ].filter((outputPath) => outputPath !== undefined)
}

/**
 * @param options.config - The config file, from Vite's root. Default: `hono-takibi.config.ts`.
 */
export function honoTakibiVite(options: { readonly config?: string } = {}): any {
  const pluginState: {
    current: Config | null
    inputDirectory: string | null
    outside: readonly string[]
    lastInputHash: string | null
    runQueue: Promise<void>
  } = {
    current: null,
    inputDirectory: null,
    outside: [],
    lastInputHash: null,
    runQueue: Promise.resolve(),
  }
  // Vite's root once `configResolved` has run; the working directory until then, which
  // is what Vite's root defaults to.
  const vite: { root: string; command: string } = { root: process.cwd(), command: 'serve' }
  const configFilePath = () => path.resolve(vite.root, options.config ?? DEFAULT_CONFIG_FILE)
  let pendingConfigurationServer: ViteDevServer | null = null
  const runGeneration = async () => {
    if (!pluginState.current) return false
    console.log('🔥 hono-takibi')
    const { logs, changed } = await Effect.runPromise(
      runAllGenerationTasks(pluginState.current).pipe(Effect.provide(NodeFileSystem.layer)),
    )
    for (const logMessage of logs) {
      console.log(logMessage)
    }
    return changed
  }
  // Generation is over by the time this runs and nothing here feeds it: the list only
  // decides which edits bring the next generation about. The document is what names the
  // files, so the list is known once it has been read; one that cannot be read keeps the
  // list it had. The hash is taken again because it has to cover the same files the next
  // comparison will.
  const watchOutsideSources = async (server?: ViteDevServer) => {
    if (!pluginState.current || !pluginState.inputDirectory) return
    const outside = await Effect.runPromise(
      outsideSources(pluginState.current.input).pipe(
        Effect.orElseSucceed(() => pluginState.outside),
        Effect.provide(NodeFileSystem.layer),
      ),
    )
    if (outside.join('\n') === pluginState.outside.join('\n')) return
    pluginState.outside = outside
    if (server && outside.length > 0) server.watcher.add(outside)
    pluginState.lastInputHash = await Effect.runPromise(
      hashWatchedInputs(pluginState.inputDirectory, outside).pipe(
        Effect.provide(NodeFileSystem.layer),
      ),
    )
  }
  const runGenerationAndReload = async (server?: ViteDevServer) => {
    const changed = await runGeneration()
    await watchOutsideSources(server)
    if (server && changed) server.ws.send({ type: 'full-reload' })
  }
  // Skipping additionally requires every declared output to exist, so deleting
  // a generated file and touching the input still regenerates it.
  const runIfInputsChanged = async (server: ViteDevServer) => {
    if (!pluginState.inputDirectory || !pluginState.current) return
    const { inputHash, outputsExist } = await Effect.runPromise(
      Effect.all({
        inputHash: hashWatchedInputs(pluginState.inputDirectory, pluginState.outside),
        outputsExist: allOutputsExist(pluginState.current),
      }).pipe(Effect.provide(NodeFileSystem.layer)),
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
    const nextConfiguration = await readConfigurationWithHotReload(
      server,
      vite.root,
      configFilePath(),
    )
    if (Result.isFailure(nextConfiguration)) {
      console.error(`❌ config: ${nextConfiguration.failure}`)
      return
    }
    if (pluginState.current) {
      const cleanedPaths = await Effect.runPromise(
        cleanupStaleOutputs(pluginState.current, nextConfiguration.success).pipe(
          Effect.provide(NodeFileSystem.layer),
        ),
      )
      for (const cleanedPath of cleanedPaths) {
        console.log(`✅ cleanup: ${cleanedPath}`)
      }
    }
    pluginState.current = nextConfiguration.success
    const inputDirectory = addInputGlobsToWatcher(server, pluginState.current.input)
    // The list belongs to the document the previous config named; a document somewhere
    // else starts from nothing until it has been read.
    if (inputDirectory !== pluginState.inputDirectory) pluginState.outside = []
    pluginState.inputDirectory = inputDirectory
    pluginState.lastInputHash = await Effect.runPromise(
      hashWatchedInputs(inputDirectory, pluginState.outside).pipe(
        Effect.provide(NodeFileSystem.layer),
      ),
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
      if (absoluteFilePath === configFilePath()) {
        queueConfigurationChange(context.server)
        return []
      }
      return undefined
    },
    configResolved(resolved: { readonly root: string; readonly command: string }) {
      vite.root = path.resolve(resolved.root)
      vite.command = resolved.command
    },
    /**
     * Generates once for `vite build`, where there is no dev server to do it.
     *
     * Vite calls this hook for the dev server as well, and there `configureServer`
     * generates. A build that could not generate fails: what it would bundle is stale.
     */
    async buildStart() {
      if (vite.command !== 'build') return
      const loadedModule: unknown = await import(pathToFileURL(configFilePath()).href)
      const configuration = await parseConfigModule(vite.root, loadedModule)
      if (Result.isFailure(configuration)) throw new Error(`config: ${configuration.failure}`)
      console.log('🔥 hono-takibi')
      const { logs } = await Effect.runPromise(
        runAllGenerationTasks(configuration.success).pipe(Effect.provide(NodeFileSystem.layer)),
      )
      for (const logMessage of logs) {
        console.log(logMessage)
      }
      const failures = logs.filter((logMessage) => logMessage.startsWith('❌'))
      if (failures.length > 0) throw new Error(failures.join('\n'))
    },
    configureServer(server: ViteDevServer) {
      const absoluteConfigFilePath = configFilePath()
      // 200ms debounce: editors emit multiple fs events on save, and batch file changes
      // (e.g. git checkout) would otherwise trigger redundant regeneration cycles.
      const debouncedRunGeneration = debounce(200, () => {
        void enqueueRun(() => runIfInputsChanged(server))
      })
      // Registered before the config is read, not after: a config that fails to load at
      // startup is fixed by an edit, and the inputs that edit names still have to be seen.
      server.watcher.add(absoluteConfigFilePath)
      server.watcher.on('all', (_eventType, filePath) => {
        const absoluteChangedPath = path.resolve(filePath)
        if (absoluteChangedPath === absoluteConfigFilePath) {
          queueConfigurationChange(server)
          return
        }
        if (
          pluginState.outside.includes(absoluteChangedPath) ||
          (pluginState.inputDirectory &&
            isInsideDirectory(pluginState.inputDirectory, absoluteChangedPath) &&
            isWatchedInputFile(absoluteChangedPath))
        ) {
          debouncedRunGeneration()
        }
      })
      ;(async () => {
        const initialConfiguration = await readConfigurationWithHotReload(
          server,
          vite.root,
          absoluteConfigFilePath,
        )
        if (Result.isFailure(initialConfiguration)) {
          console.error(`❌ config: ${initialConfiguration.failure}`)
          return
        }
        pluginState.current = initialConfiguration.success
        const inputDirectory = addInputGlobsToWatcher(server, pluginState.current.input)
        pluginState.inputDirectory = inputDirectory
        pluginState.lastInputHash = await Effect.runPromise(
          hashWatchedInputs(inputDirectory, pluginState.outside).pipe(
            Effect.provide(NodeFileSystem.layer),
          ),
        )
        await enqueueRun(() => runGenerationAndReload(server))
      })().catch((error: unknown) => {
        console.error('❌ watch error:', error)
      })
    },
  }
  return vitePlugin
}
