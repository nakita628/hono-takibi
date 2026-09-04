import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import type { FileSystem } from 'effect'
import { Effect } from 'effect'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

import * as FormatModule from '../format/index.js'
import * as OpenAPIModule from '../openapi/index.js'
import { honoTakibiVite } from './index.js'

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

const createDeferred = <T = void>() => {
  const deferredBox: {
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: unknown) => void
  } = {
    resolve: () => {},
    reject: () => {},
  }
  const promise = new Promise<T>((resolve, reject) => {
    deferredBox.resolve = resolve
    deferredBox.reject = reject
  })
  return { promise, resolve: deferredBox.resolve, reject: deferredBox.reject }
}

const fileExists = async (filePath: string) => Boolean(await fsp.stat(filePath).catch(() => null))

const createMockViteDevServer = (configuration: unknown) => {
  const reloadedDeferred = createDeferred()

  const server: ViteDevServer = {
    watcher: {
      add: (_paths: string | readonly string[]) => {},
      on: (_event: 'all', _callback: (eventType: string, filePath: string) => void) => {},
    },
    ws: {
      send: (payload: { type: string }) => {
        if (payload?.type === 'full-reload') reloadedDeferred.resolve()
      },
    },
    pluginContainer: {
      resolveId: (moduleId: string) => Promise.resolve({ id: moduleId }),
    },
    moduleGraph: {
      invalidateModule: (_module: { id?: string } | null) => {},
      invalidateAll: () => {},
      getModuleById: (moduleId: string) => ({ id: moduleId }),
    },
    ssrLoadModule: (_moduleId: string) => Promise.resolve({ default: configuration }),
  }

  return { server, reloaded: reloadedDeferred.promise }
}

vi.mock('../core/index.js', () => ({
  callbacks: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('callbacks')),
  docs: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('docs')),
  examples: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('examples')),
  headers: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('headers')),
  links: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('links')),
  mediaTypes: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('mediaTypes')),
  mock: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('mock')),
  parameters: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('parameters')),
  pathItems: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('pathItems')),
  requestBodies: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('requestBodies')),
  responses: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('responses')),
  schemas: vi.fn<(schemas: unknown, outputDir: string, split: boolean) => Effect.Effect<string>>(
    (_schemas: unknown, outputDir: string, split: boolean) =>
      Effect.promise(async () => {
        if (split) {
          await fsp.mkdir(outputDir, { recursive: true })
          await fsp.writeFile(path.join(outputDir, 'Pet.ts'), '// Pet', 'utf8')
          await fsp.writeFile(path.join(outputDir, 'User.ts'), '// User', 'utf8')
          await fsp.writeFile(path.join(outputDir, 'index.ts'), '// index', 'utf8')
        }
        return 'schemas'
      }),
  ),
  hooks: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('hooks')),
  securitySchemes: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('securitySchemes')),
  route: vi.fn<
    (openAPI: unknown, config: { output: string; split: boolean }) => Effect.Effect<string>
  >((_openAPI: unknown, config: { output: string; split: boolean }) =>
    Effect.promise(async () => {
      if (config.split) {
        await fsp.mkdir(config.output, { recursive: true })
        await fsp.writeFile(path.join(config.output, 'getPets.ts'), '// getPets', 'utf8')
        await fsp.writeFile(path.join(config.output, 'postUsers.ts'), '// postUsers', 'utf8')
        await fsp.writeFile(path.join(config.output, 'index.ts'), '// index', 'utf8')
      }
      return 'route'
    }),
  ),
  rpc: vi.fn<
    (
      openAPI: unknown,
      outputDir: string,
      importPath: string,
      split: boolean,
    ) => Effect.Effect<string>
  >((_openAPI: unknown, outputDir: string, _importPath: string, split: boolean) =>
    Effect.promise(async () => {
      if (split) {
        await fsp.mkdir(outputDir, { recursive: true })
        await fsp.writeFile(path.join(outputDir, 'getPets.ts'), '// getPets', 'utf8')
        await fsp.writeFile(path.join(outputDir, 'postUsers.ts'), '// postUsers', 'utf8')
        await fsp.writeFile(path.join(outputDir, 'index.ts'), '// index', 'utf8')
      }
      return 'rpc'
    }),
  ),
  // Writes through the real fsp writeFile with the received document embedded,
  // so an identical document produces byte-identical output and no rewrite.
  takibi: vi.fn<
    (openAPI: unknown, output: string) => Effect.Effect<string, never, FileSystem.FileSystem>
  >((openAPI: unknown, output: string) =>
    Effect.gen(function* () {
      const { writeFile } = yield* Effect.promise(() => import('../file/index.js'))
      yield* Effect.promise(() => fsp.mkdir(path.dirname(output), { recursive: true }))
      yield* writeFile(output, `// ${JSON.stringify(openAPI)}`).pipe(Effect.orDie)
      return 'takibi'
    }),
  ),
  template: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('template')),
  test: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('test')),
  type: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('type')),
  webhooks: vi.fn<() => Effect.Effect<string>>(() => Effect.succeed('webhooks')),
}))

vi.mock('../openapi/index.js', async () => {
  const actual = await vi.importActual<typeof OpenAPIModule>('../openapi/index.js')
  return {
    OpenAPIError: actual.OpenAPIError,
    parseOpenAPI: vi.fn<() => Effect.Effect<unknown>>(() =>
      Effect.succeed({
        paths: {
          '/pets': { get: { responses: {} } },
          '/users': { post: { responses: {} } },
        },
        components: { schemas: { Pet: {}, User: {} } },
      }),
    ),
  }
})

vi.mock('../format/index.js', async () => {
  const actual = await vi.importActual<typeof FormatModule>('../format/index.js')
  return {
    FormatError: actual.FormatError,
    FormatOptions: actual.FormatOptions,
    fmt: vi.fn<(source: string) => Effect.Effect<string>>((source: string) =>
      Effect.succeed(source),
    ),
  }
})
const { route: routeMock } = await import('../core/index.js')

const testState: { previousWorkingDirectory: string; sandboxDirectory: string } = {
  previousWorkingDirectory: '',
  sandboxDirectory: '',
}

beforeEach(async () => {
  vi.clearAllMocks()
  testState.previousWorkingDirectory = process.cwd()
  testState.sandboxDirectory = await fsp.mkdtemp(path.join(os.tmpdir(), 'takibi-test-'))
  process.chdir(testState.sandboxDirectory)

  await fsp.mkdir(path.join(testState.sandboxDirectory, 'out/schema'), { recursive: true })
  await fsp.mkdir(path.join(testState.sandboxDirectory, 'out/route'), { recursive: true })
  await fsp.mkdir(path.join(testState.sandboxDirectory, 'out/rpc'), { recursive: true })
  await fsp.writeFile(
    path.join(testState.sandboxDirectory, 'out/schema/extra.ts'),
    '// should be pruned',
    'utf8',
  )
  await fsp.writeFile(
    path.join(testState.sandboxDirectory, 'out/route/extra.ts'),
    '// should be pruned',
    'utf8',
  )
  await fsp.writeFile(
    path.join(testState.sandboxDirectory, 'out/rpc/extra.ts'),
    '// should be pruned',
    'utf8',
  )

  await fsp.writeFile(path.join(testState.sandboxDirectory, 'out/schema/README.md'), 'keep', 'utf8')
  await fsp.writeFile(path.join(testState.sandboxDirectory, 'out/route/README.md'), 'keep', 'utf8')
  await fsp.writeFile(path.join(testState.sandboxDirectory, 'out/rpc/README.md'), 'keep', 'utf8')
})

afterEach(async () => {
  process.chdir(testState.previousWorkingDirectory)
  // In-flight generation tasks may still write into the sandbox; retry until
  // the removal wins over the last write.
  await vi.waitFor(async () => {
    await fsp.rm(testState.sandboxDirectory, { recursive: true, force: true })
  })
})

describe('honoTakibiVite', () => {
  it('prunes stray .ts files in split outputs and preserves non-.ts files', async () => {
    const configuration = {
      input: 'openapi.yaml',
      components: {
        schemas: {
          output: path.join(testState.sandboxDirectory, 'out/schema'),
          split: true,
          exportTypes: true,
        },
      },
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
      rpc: {
        output: path.join(testState.sandboxDirectory, 'out/rpc'),
        split: true,
        import: '@rpc',
      },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/schema/extra.ts'))).toBe(
      false,
    )
    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/route/extra.ts'))).toBe(
      false,
    )
    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/rpc/extra.ts'))).toBe(false)

    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/schema/README.md'))).toBe(
      true,
    )
    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/route/README.md'))).toBe(
      true,
    )
    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/rpc/README.md'))).toBe(true)

    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/schema'))).toBe(true)
    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/route'))).toBe(true)
    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/rpc'))).toBe(true)
  })

  it('runs routes even without schema outputs', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(routeMock).toHaveBeenCalled()
  })

  it('returns plugin with correct name', () => {
    const plugin = honoTakibiVite()
    expect(plugin.name).toBe('hono-takibi-vite')
  })

  it('has handleHotUpdate method', () => {
    const plugin = honoTakibiVite()
    expect(typeof plugin.handleHotUpdate).toBe('function')
  })

  it('has configureServer method', () => {
    const plugin = honoTakibiVite()
    expect(typeof plugin.configureServer).toBe('function')
  })

  it('has buildStart method', () => {
    const plugin = honoTakibiVite()
    expect(typeof plugin.buildStart).toBe('function')
  })

  it('handleHotUpdate returns empty array for config file changes', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    const reloadDeferred = createDeferred()
    const originalSend = server.ws.send
    server.ws.send = (payload: { type: string; [key: string]: unknown }) => {
      originalSend(payload)
      if (payload?.type === 'full-reload') reloadDeferred.resolve()
    }

    const result = plugin.handleHotUpdate({ file: 'hono-takibi.config.ts', server })
    expect(result).toStrictEqual([])

    await reloadDeferred.promise
  })

  it('handleHotUpdate returns undefined for non-config files', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    const result = plugin.handleHotUpdate({ file: 'some-other-file.ts', server })
    expect(result).toBe(undefined)
  })

  it('creates independent plugin instances', () => {
    const plugin1 = honoTakibiVite()
    const plugin2 = honoTakibiVite()
    expect(plugin1).not.toBe(plugin2)
    expect(plugin1.name).toBe(plugin2.name)
  })

  it('cleans up stale directories when config changes', async () => {
    await fsp.mkdir(path.join(testState.sandboxDirectory, 'out/stale-schema'), { recursive: true })
    await fsp.writeFile(
      path.join(testState.sandboxDirectory, 'out/stale-schema/User.ts'),
      '// stale',
      'utf8',
    )
    await fsp.writeFile(
      path.join(testState.sandboxDirectory, 'out/stale-schema/Pet.ts'),
      '// stale',
      'utf8',
    )

    const initialConfiguration = {
      input: 'openapi.yaml',
      components: {
        schemas: {
          output: path.join(testState.sandboxDirectory, 'out/stale-schema'),
          split: true,
          exportTypes: true,
        },
      },
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const { server, reloaded } = createMockViteDevServer(initialConfiguration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/stale-schema'))).toBe(true)

    const newConfiguration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const { server: newServer, reloaded: newReloaded } = createMockViteDevServer(newConfiguration)
    newServer.ssrLoadModule = (_moduleId: string) => {
      const callCount = (newServer as unknown as { callCount?: number }).callCount ?? 0
      ;(newServer as unknown as { callCount: number }).callCount = callCount + 1
      return Promise.resolve(
        callCount === 0 ? { default: initialConfiguration } : { default: newConfiguration },
      )
    }

    const newPlugin = honoTakibiVite()
    newPlugin.configureServer(newServer)
    await newReloaded

    const { server: changeServer, reloaded: changeReloaded } =
      createMockViteDevServer(newConfiguration)

    const moduleLoadState = { loadCount: 0 }
    changeServer.ssrLoadModule = (_moduleId: string) => {
      moduleLoadState.loadCount += 1
      return Promise.resolve(
        moduleLoadState.loadCount === 1
          ? { default: initialConfiguration }
          : { default: newConfiguration },
      )
    }

    const changePlugin = honoTakibiVite()
    changePlugin.configureServer(changeServer)
    await changeReloaded

    changeServer.ssrLoadModule = (_moduleId: string) =>
      Promise.resolve({ default: newConfiguration })

    await changePlugin.handleHotUpdate({ file: 'hono-takibi.config.ts', server: changeServer })

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/stale-schema'))).toBe(false)
  })

  it('watcher.add is called during configureServer', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const addSpy = vi.fn<(paths: string | readonly string[]) => void>()
    const { server, reloaded } = createMockViteDevServer(configuration)
    server.watcher.add = addSpy

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    expect(addSpy).toHaveBeenCalled()
  })

  it('watcher.on is called to register file change handler', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const onSpy =
      vi.fn<(event: 'all', callback: (eventType: string, filePath: string) => void) => void>()
    const { server, reloaded } = createMockViteDevServer(configuration)
    server.watcher.on = onSpy

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    expect(onSpy).toHaveBeenCalledTimes(1)
    expect(onSpy.mock.calls[0][0]).toBe('all')
    expect(typeof onSpy.mock.calls[0][1]).toBe('function')
  })

  it('sends full-reload via ws after generation', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }

    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    const reloadedDeferred = createDeferred()
    const { server } = createMockViteDevServer(configuration)
    server.ws.send = (payload: { type: string }) => {
      sendSpy(payload)
      if (payload?.type === 'full-reload') reloadedDeferred.resolve()
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloadedDeferred.promise

    expect(sendSpy).toHaveBeenCalledWith({ type: 'full-reload' })
  })

  // --- error paths in readConfigurationWithHotReload ---

  it('logs config error when default export is not an object', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { server } = createMockViteDevServer({})
    server.ssrLoadModule = () => Promise.resolve({ default: 'not-an-object' })

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('Config must export default object'),
    )
    errorSpy.mockRestore()
  })

  it('logs config error when parseConfig fails', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { server } = createMockViteDevServer({})
    server.ssrLoadModule = () => Promise.resolve({ default: { input: 'invalid.txt' } })

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('❌ config:'))
    errorSpy.mockRestore()
  })

  it('logs config error when ssrLoadModule throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { server } = createMockViteDevServer({})
    server.ssrLoadModule = () => Promise.reject(new Error('module load failure'))

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('module load failure'))
    errorSpy.mockRestore()
  })

  it('invalidates all modules when resolveId returns null', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const invalidateAllSpy = vi.fn<() => void>()
    const { server, reloaded } = createMockViteDevServer(configuration)
    server.pluginContainer.resolveId = () => Promise.resolve(null)
    server.moduleGraph.invalidateAll = invalidateAllSpy

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    expect(invalidateAllSpy).toHaveBeenCalled()
  })

  // --- watcher.on 'all' callback paths ---

  it('regenerates when input .yaml file changes inside input directory', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded
    expect(watcherCallback).toBeDefined()

    const reloadDeferred = createDeferred()
    server.ws.send = (payload) => {
      if (payload?.type === 'full-reload') reloadDeferred.resolve()
    }
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await reloadDeferred.promise
  })

  it('ignores file changes outside input directory', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }
    if (watcherCallback) await watcherCallback('change', '/some/other/place/file.yaml')
    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(sendSpy).not.toHaveBeenCalled()
  })

  it('ignores non-yaml/json/tsp files inside input directory', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }
    const txtPath = path.resolve(process.cwd(), 'note.txt')
    if (watcherCallback) await watcherCallback('change', txtPath)
    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(sendSpy).not.toHaveBeenCalled()
  })

  it('handles config file change via watcher callback', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const configPath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
    if (watcherCallback) await watcherCallback('change', configPath)

    expect(logSpy).toHaveBeenCalledWith('config changed (watch)')
    logSpy.mockRestore()
  })

  // --- runAllGenerationTasks: error paths ---

  it('logs error and does not send full-reload when parseOpenAPI fails', async () => {
    const { parseOpenAPI } = await import('../openapi/index.js')
    vi.mocked(parseOpenAPI).mockImplementationOnce(() =>
      Effect.fail(new OpenAPIModule.OpenAPIError({ message: 'parse failure' })),
    )

    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { server } = createMockViteDevServer(configuration)
    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await vi.waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('❌ parseOpenAPI: parse failure'))
    })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(sendSpy).not.toHaveBeenCalledWith({ type: 'full-reload' })
    logSpy.mockRestore()
  })

  it('logs config error when output path is not .ts', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const configuration = {
      input: 'openapi.yaml',
      output: path.join(testState.sandboxDirectory, 'out/routes.json'),
    }
    const { server } = createMockViteDevServer(configuration)

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('❌ config:'))
    errorSpy.mockRestore()
  })

  // --- generators broader coverage ---

  it('runs full pipeline: type/mock/docs/test/template + all clients', async () => {
    const configuration = {
      input: 'openapi.yaml',
      output: path.join(testState.sandboxDirectory, 'out/single.ts'),
      type: { output: path.join(testState.sandboxDirectory, 'out/types.ts') },
      mock: { output: path.join(testState.sandboxDirectory, 'out/mock.ts') },
      docs: { output: path.join(testState.sandboxDirectory, 'out/api.md') },
      test: { output: path.join(testState.sandboxDirectory, 'out/api.test.ts'), import: './api' },
      rpc: { output: path.join(testState.sandboxDirectory, 'out/rpc/index.ts'), import: '@rpc' },
      swr: { output: path.join(testState.sandboxDirectory, 'out/swr/index.ts'), import: '@swr' },
      'tanstack-query': {
        output: path.join(testState.sandboxDirectory, 'out/tanstack/index.ts'),
        import: '@tan',
      },
      'svelte-query': {
        output: path.join(testState.sandboxDirectory, 'out/svelte/index.ts'),
        import: '@svl',
      },
      'vue-query': {
        output: path.join(testState.sandboxDirectory, 'out/vue/index.ts'),
        import: '@vue',
      },
    }
    const { server } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)

    const core = await import('../core/index.js')
    await vi.waitFor(() => {
      expect(core.takibi).toHaveBeenCalled()
      expect(core.type).toHaveBeenCalled()
      expect(core.mock).toHaveBeenCalled()
      expect(core.docs).toHaveBeenCalled()
      expect(core.test).toHaveBeenCalled()
      expect(core.rpc).toHaveBeenCalled()
    })
    const hookLibraries = vi.mocked(core.hooks).mock.calls.map((call) => call[3])
    expect(hookLibraries).toContain('swr')
    expect(hookLibraries).toContain('tanstack-query')
    expect(hookLibraries).toContain('svelte-query')
    expect(hookLibraries).toContain('vue-query')
  })

  it('runs every component generator branch', async () => {
    const configuration = {
      input: 'openapi.yaml',
      webhooks: { output: path.join(testState.sandboxDirectory, 'out/webhooks.ts') },
      components: {
        schemas: { output: path.join(testState.sandboxDirectory, 'out/schemas.ts') },
        parameters: { output: path.join(testState.sandboxDirectory, 'out/parameters.ts') },
        headers: { output: path.join(testState.sandboxDirectory, 'out/headers.ts') },
        securitySchemes: { output: path.join(testState.sandboxDirectory, 'out/security.ts') },
        requestBodies: { output: path.join(testState.sandboxDirectory, 'out/bodies.ts') },
        responses: { output: path.join(testState.sandboxDirectory, 'out/responses.ts') },
        examples: { output: path.join(testState.sandboxDirectory, 'out/examples.ts') },
        links: { output: path.join(testState.sandboxDirectory, 'out/links.ts') },
        callbacks: { output: path.join(testState.sandboxDirectory, 'out/callbacks.ts') },
        pathItems: { output: path.join(testState.sandboxDirectory, 'out/pathItems.ts') },
        mediaTypes: { output: path.join(testState.sandboxDirectory, 'out/mediaTypes.ts') },
      },
    }
    const { server } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)

    const core = await import('../core/index.js')
    await vi.waitFor(() => {
      expect(core.parameters).toHaveBeenCalled()
      expect(core.headers).toHaveBeenCalled()
      expect(core.securitySchemes).toHaveBeenCalled()
      expect(core.requestBodies).toHaveBeenCalled()
      expect(core.responses).toHaveBeenCalled()
      expect(core.examples).toHaveBeenCalled()
      expect(core.links).toHaveBeenCalled()
      expect(core.callbacks).toHaveBeenCalled()
      expect(core.pathItems).toHaveBeenCalled()
      expect(core.mediaTypes).toHaveBeenCalled()
      expect(core.webhooks).toHaveBeenCalled()
    })
  })

  it('logs error when a generator returns failure result', async () => {
    const core = await import('../core/index.js')
    // Any error in `takibi`'s channel will do; the plugin only reads `.message`.
    vi.mocked(core.takibi).mockImplementationOnce(() =>
      Effect.fail(new FormatModule.FormatError({ message: 'takibi internal failure' })),
    )
    const configuration = {
      input: 'openapi.yaml',
      output: path.join(testState.sandboxDirectory, 'out/single.ts'),
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { server } = createMockViteDevServer(configuration)

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await vi.waitFor(() => {
      expect(
        logSpy.mock.calls.some(([msg]) => String(msg).includes('takibi internal failure')),
      ).toBe(true)
    })
    logSpy.mockRestore()
  })

  it('handleHotUpdate logs config error when invalid config is loaded later', async () => {
    const initialConfiguration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(initialConfiguration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    server.ssrLoadModule = () => Promise.resolve({ default: { input: 'broken.txt' } })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    plugin.handleHotUpdate({ file: 'hono-takibi.config.ts', server })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('❌ config:'))
    errorSpy.mockRestore()
  })

  it('does not send full-reload when config has no outputs', async () => {
    const configuration = { input: 'openapi.yaml' }
    const { server } = createMockViteDevServer(configuration)
    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)

    const { parseOpenAPI } = await import('../openapi/index.js')
    await vi.waitFor(() => {
      expect(parseOpenAPI).toHaveBeenCalled()
    })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(sendSpy).not.toHaveBeenCalledWith({ type: 'full-reload' })
  })

  // --- input content hash short-circuit ---

  it('skips regeneration (including split cleanup) when watched input contents are unchanged', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    // A skipped run must not run the split cleanup either, or this file would vanish.
    await fsp.writeFile(
      path.join(testState.sandboxDirectory, 'out/route/marker.ts'),
      '// not produced by generators',
      'utf8',
    )
    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await vi.waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('⏭️ input unchanged - skipped regeneration')
    })

    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun)
    expect(await fileExists(path.join(testState.sandboxDirectory, 'out/route/marker.ts'))).toBe(
      true,
    )
    expect(sendSpy).not.toHaveBeenCalledWith({ type: 'full-reload' })
    logSpy.mockRestore()
  })

  it('regenerates when a declared output is missing even if input is unchanged', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    await fsp.rm(path.join(testState.sandboxDirectory, 'out/route'), {
      recursive: true,
      force: true,
    })
    const reloadDeferred = createDeferred()
    server.ws.send = (payload) => {
      if (payload?.type === 'full-reload') reloadDeferred.resolve()
    }
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await reloadDeferred.promise

    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)
    expect(fs.existsSync(path.join(testState.sandboxDirectory, 'out/route'))).toBe(true)
  })

  it('config change regenerates even when input is unchanged, then unchanged input skips', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const configPath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
    if (watcherCallback) await watcherCallback('change', configPath)
    await vi.waitFor(() => {
      expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)
    })

    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await vi.waitFor(() => {
      expect(logSpy).toHaveBeenCalledWith('⏭️ input unchanged - skipped regeneration')
    })
    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)
    logSpy.mockRestore()
  })

  it('regenerates on every event when watched input files are absent', async () => {
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    const firstReload = createDeferred()
    server.ws.send = (payload) => {
      if (payload?.type === 'full-reload') firstReload.resolve()
    }
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await firstReload.promise
    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)

    const secondReload = createDeferred()
    server.ws.send = (payload) => {
      if (payload?.type === 'full-reload') secondReload.resolve()
    }
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await secondReload.promise
    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 2)
  })

  it('serializes an overlapping config-change run with an in-flight input-change run', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const configLoadState = { count: 0 }
    server.ssrLoadModule = (_moduleId: string) => {
      configLoadState.count += 1
      return Promise.resolve({ default: configuration })
    }
    const gate = createDeferred()
    vi.mocked(routeMock).mockImplementationOnce(() =>
      Effect.promise(() => gate.promise).pipe(
        Effect.as('Generated route code written to out/route'),
      ),
    )

    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0\ninfo:\n  title: changed', 'utf8')
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await vi.waitFor(() => {
      expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)
    })

    const configPath = path.resolve(process.cwd(), 'hono-takibi.config.ts')
    const configEvent = watcherCallback ? watcherCallback('change', configPath) : undefined
    await new Promise((resolve) => setTimeout(resolve, 100))
    expect(configLoadState.count).toBe(0)

    gate.resolve()
    await vi.waitFor(() => {
      expect(configLoadState.count).toBe(1)
    })
    await configEvent
  })

  it('regenerates when watched input content changes', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      routes: { output: path.join(testState.sandboxDirectory, 'out/route'), split: true },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const callsAfterInitialRun = vi.mocked(routeMock).mock.calls.length
    const reloadDeferred = createDeferred()
    server.ws.send = (payload) => {
      if (payload?.type === 'full-reload') reloadDeferred.resolve()
    }
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0\ninfo:\n  title: changed', 'utf8')
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await reloadDeferred.promise

    expect(vi.mocked(routeMock).mock.calls.length).toBe(callsAfterInitialRun + 1)
  })

  // --- output snapshot: reload only when output files change ---

  it('does not send full-reload when regenerated outputs are byte-identical', async () => {
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0', 'utf8')
    const configuration = {
      input: 'openapi.yaml',
      output: path.join(testState.sandboxDirectory, 'out/single.ts'),
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const core = await import('../core/index.js')
    const callsAfterInitialRun = vi.mocked(core.takibi).mock.calls.length
    const sendSpy = vi.fn<(payload: { type: string }) => void>()
    server.ws.send = (payload) => {
      sendSpy(payload)
    }
    // Input bytes change (hash short-circuit does not engage) but the parsed
    // document is identical, so the regenerated output is byte-identical and
    // the real writeFile leaves the file untouched.
    await fsp.writeFile('openapi.yaml', 'openapi: 3.1.0 # comment only', 'utf8')
    const yamlPath = path.resolve(process.cwd(), 'openapi.yaml')
    if (watcherCallback) await watcherCallback('change', yamlPath)
    await vi.waitFor(() => {
      expect(vi.mocked(core.takibi).mock.calls.length).toBe(callsAfterInitialRun + 1)
    })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(sendSpy).not.toHaveBeenCalledWith({ type: 'full-reload' })
  })
})
