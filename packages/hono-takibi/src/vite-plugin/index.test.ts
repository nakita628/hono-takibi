import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'

import { afterEach, beforeEach, describe, expect, it, vi } from 'vite-plus/test'

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

const fileExists = async (filePath: string) => !!(await fsp.stat(filePath).catch(() => null))

const createMockViteDevServer = (configuration: unknown) => {
  const reloadedDeferred = createDeferred<void>()

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
      resolveId: async (moduleId: string) => ({ id: moduleId }),
    },
    moduleGraph: {
      invalidateModule: (_module: { id?: string } | null) => {},
      invalidateAll: () => {},
      getModuleById: (moduleId: string) => ({ id: moduleId }),
    },
    ssrLoadModule: async (_moduleId: string) => ({ default: configuration }),
  }

  return { server, reloaded: reloadedDeferred.promise }
}

vi.mock('../core/index.js', () => ({
  callbacks: vi.fn(async () => ({ ok: true, value: 'callbacks' })),
  docs: vi.fn(async () => ({ ok: true, value: 'docs' })),
  examples: vi.fn(async () => ({ ok: true, value: 'examples' })),
  headers: vi.fn(async () => ({ ok: true, value: 'headers' })),
  links: vi.fn(async () => ({ ok: true, value: 'links' })),
  mediaTypes: vi.fn(async () => ({ ok: true, value: 'mediaTypes' })),
  mock: vi.fn(async () => ({ ok: true, value: 'mock' })),
  parameters: vi.fn(async () => ({ ok: true, value: 'parameters' })),
  pathItems: vi.fn(async () => ({ ok: true, value: 'pathItems' })),
  requestBodies: vi.fn(async () => ({ ok: true, value: 'requestBodies' })),
  responses: vi.fn(async () => ({ ok: true, value: 'responses' })),
  schemas: vi.fn(async (_schemas: unknown, outputDir: string, split: boolean) => {
    if (split) {
      await fsp.mkdir(outputDir, { recursive: true })
      await fsp.writeFile(path.join(outputDir, 'Pet.ts'), '// Pet', 'utf8')
      await fsp.writeFile(path.join(outputDir, 'User.ts'), '// User', 'utf8')
      await fsp.writeFile(path.join(outputDir, 'index.ts'), '// index', 'utf8')
    }
    return { ok: true, value: 'schemas' }
  }),
  securitySchemes: vi.fn(async () => ({ ok: true, value: 'securitySchemes' })),
  svelteQuery: vi.fn(async () => ({ ok: true, value: 'svelteQuery' })),
  swr: vi.fn(async () => ({ ok: true, value: 'swr' })),
  route: vi.fn(async (_openAPI: unknown, config: { output: string; split: boolean }) => {
    if (config.split) {
      await fsp.mkdir(config.output, { recursive: true })
      await fsp.writeFile(path.join(config.output, 'getPets.ts'), '// getPets', 'utf8')
      await fsp.writeFile(path.join(config.output, 'postUsers.ts'), '// postUsers', 'utf8')
      await fsp.writeFile(path.join(config.output, 'index.ts'), '// index', 'utf8')
    }
    return { ok: true, value: 'route' }
  }),
  rpc: vi.fn(async (_openAPI: unknown, outputDir: string, _importPath: string, split: boolean) => {
    if (split) {
      await fsp.mkdir(outputDir, { recursive: true })
      await fsp.writeFile(path.join(outputDir, 'getPets.ts'), '// getPets', 'utf8')
      await fsp.writeFile(path.join(outputDir, 'postUsers.ts'), '// postUsers', 'utf8')
      await fsp.writeFile(path.join(outputDir, 'index.ts'), '// index', 'utf8')
    }
    return { ok: true, value: 'rpc' }
  }),
  takibi: vi.fn(async () => ({ ok: true, value: 'takibi' })),
  tanstackQuery: vi.fn(async () => ({ ok: true, value: 'tanstackQuery' })),
  template: vi.fn(async () => ({ ok: true, value: 'template' })),
  test: vi.fn(async () => ({ ok: true, value: 'test' })),
  type: vi.fn(async () => ({ ok: true, value: 'type' })),
  vueQuery: vi.fn(async () => ({ ok: true, value: 'vueQuery' })),
  webhooks: vi.fn(async () => ({ ok: true, value: 'webhooks' })),
}))

vi.mock('../openapi/index.js', () => ({
  parseOpenAPI: vi.fn(async () => ({
    ok: true,
    value: {
      paths: {
        '/pets': { get: { responses: {} } },
        '/users': { post: { responses: {} } },
      },
      components: { schemas: { Pet: {}, User: {} } },
    },
  })),
}))

vi.mock('../format/index.js', () => ({
  fmt: vi.fn(async (source: string) => ({ ok: true as const, value: String(source) })),
  setFormatOptions: vi.fn(),
}))
vi.mock('../fsp/index.js', () => ({
  mkdir: vi.fn(async () => ({ ok: true })),
  writeFile: vi.fn(async (filePath: string, content: string) => {
    await fsp.mkdir(path.dirname(filePath), { recursive: true })
    await fsp.writeFile(filePath, content, 'utf8')
    return { ok: true }
  }),
}))

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

  await fsp.mkdir('out/schema', { recursive: true })
  await fsp.mkdir('out/route', { recursive: true })
  await fsp.mkdir('out/rpc', { recursive: true })
  await fsp.writeFile('out/schema/extra.ts', '// should be pruned', 'utf8')
  await fsp.writeFile('out/route/extra.ts', '// should be pruned', 'utf8')
  await fsp.writeFile('out/rpc/extra.ts', '// should be pruned', 'utf8')

  await fsp.writeFile('out/schema/README.md', 'keep', 'utf8')
  await fsp.writeFile('out/route/README.md', 'keep', 'utf8')
  await fsp.writeFile('out/rpc/README.md', 'keep', 'utf8')
})

afterEach(async () => {
  process.chdir(testState.previousWorkingDirectory)
  await fsp.rm(testState.sandboxDirectory, { recursive: true, force: true })
})

describe('honoTakibiVite', () => {
  it('prunes stray .ts files in split outputs and preserves non-.ts files', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        components: {
          schemas: { output: 'out/schema', split: true, exportTypes: true },
        },
        routes: { output: 'out/route', split: true },
      },
      rpc: { output: 'out/rpc', split: true, import: '@rpc' },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(await fileExists('out/schema/extra.ts')).toBe(false)
    expect(await fileExists('out/route/extra.ts')).toBe(false)
    expect(await fileExists('out/rpc/extra.ts')).toBe(false)

    expect(await fileExists('out/schema/README.md')).toBe(true)
    expect(await fileExists('out/route/README.md')).toBe(true)
    expect(await fileExists('out/rpc/README.md')).toBe(true)

    expect(fs.existsSync('out/schema')).toBe(true)
    expect(fs.existsSync('out/route')).toBe(true)
    expect(fs.existsSync('out/rpc')).toBe(true)
  })

  it('runs routes even without schema outputs', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
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
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    const reloadDeferred = createDeferred<void>()
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
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
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
    await fsp.mkdir('out/stale-schema', { recursive: true })
    await fsp.writeFile('out/stale-schema/User.ts', '// stale', 'utf8')
    await fsp.writeFile('out/stale-schema/Pet.ts', '// stale', 'utf8')

    const initialConfiguration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        components: {
          schemas: { output: 'out/stale-schema', split: true, exportTypes: true },
        },
        routes: { output: 'out/route', split: true },
      },
    }

    const { server, reloaded } = createMockViteDevServer(initialConfiguration)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(fs.existsSync('out/stale-schema')).toBe(true)

    const newConfiguration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const { server: newServer, reloaded: newReloaded } = createMockViteDevServer(newConfiguration)
    newServer.ssrLoadModule = async (_moduleId: string) => {
      const callCount = (newServer as unknown as { callCount?: number }).callCount ?? 0
      ;(newServer as unknown as { callCount: number }).callCount = callCount + 1
      return callCount === 0 ? { default: initialConfiguration } : { default: newConfiguration }
    }

    const newPlugin = honoTakibiVite()
    newPlugin.configureServer(newServer)
    await newReloaded

    const { server: changeServer, reloaded: changeReloaded } =
      createMockViteDevServer(newConfiguration)

    const moduleLoadState = { loadCount: 0 }
    changeServer.ssrLoadModule = async (_moduleId: string) => {
      moduleLoadState.loadCount++
      return moduleLoadState.loadCount === 1
        ? { default: initialConfiguration }
        : { default: newConfiguration }
    }

    const changePlugin = honoTakibiVite()
    changePlugin.configureServer(changeServer)
    await changeReloaded

    changeServer.ssrLoadModule = async (_moduleId: string) => ({ default: newConfiguration })

    await changePlugin.handleHotUpdate({ file: 'hono-takibi.config.ts', server: changeServer })

    await new Promise((resolve) => setTimeout(resolve, 100))

    expect(fs.existsSync('out/stale-schema')).toBe(false)
  })

  it('watcher.add is called during configureServer', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const addSpy = vi.fn()
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
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const onSpy = vi.fn()
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
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const sendSpy = vi.fn()
    const reloadedDeferred = createDeferred<void>()
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
    server.ssrLoadModule = async () => ({ default: 'not-an-object' })

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
    server.ssrLoadModule = async () => ({ default: { input: 'invalid.txt' } })

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('❌ config:'))
    errorSpy.mockRestore()
  })

  it('logs config error when ssrLoadModule throws', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { server } = createMockViteDevServer({})
    server.ssrLoadModule = async () => {
      throw new Error('module load failure')
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('module load failure'))
    errorSpy.mockRestore()
  })

  it('invalidates all modules when resolveId returns null', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const invalidateAllSpy = vi.fn()
    const { server, reloaded } = createMockViteDevServer(configuration)
    server.pluginContainer.resolveId = async () => null
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
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback as typeof watcherCallback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded
    expect(watcherCallback).toBeDefined()

    const reloadDeferred = createDeferred<void>()
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
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback as typeof watcherCallback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const sendSpy = vi.fn()
    server.ws.send = (payload) => sendSpy(payload)
    if (watcherCallback) await watcherCallback('change', '/some/other/place/file.yaml')
    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(sendSpy).not.toHaveBeenCalled()
  })

  it('ignores non-yaml/json/tsp files inside input directory', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback as typeof watcherCallback
    }

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const sendSpy = vi.fn()
    server.ws.send = (payload) => sendSpy(payload)
    const txtPath = path.resolve(process.cwd(), 'note.txt')
    if (watcherCallback) await watcherCallback('change', txtPath)
    await new Promise((resolve) => setTimeout(resolve, 250))

    expect(sendSpy).not.toHaveBeenCalled()
  })

  it('handles config file change via watcher callback', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    let watcherCallback: ((eventType: string, filePath: string) => void | Promise<void>) | undefined
    server.watcher.on = (_event: 'all', callback) => {
      watcherCallback = callback as typeof watcherCallback
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

  it('logs error when parseOpenAPI fails', async () => {
    const { parseOpenAPI } = await import('../openapi/index.js')
    vi.mocked(parseOpenAPI).mockImplementationOnce(async () => ({
      ok: false,
      error: 'parse failure',
    }))

    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { server, reloaded } = createMockViteDevServer(configuration)

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    expect(logSpy).toHaveBeenCalledWith(expect.stringContaining('❌ parseOpenAPI: parse failure'))
    logSpy.mockRestore()
  })

  it('logs config error when zod-openapi output path is not .ts', async () => {
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { output: 'out/routes.json' as const },
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
      'zod-openapi': {
        output: 'out/single.ts',
      },
      type: { output: 'out/types.ts' },
      mock: { output: 'out/mock.ts' },
      docs: { output: 'out/api.md' },
      test: { output: 'out/api.test.ts', import: './api' },
      rpc: { output: 'out/rpc/index.ts', import: '@rpc' },
      swr: { output: 'out/swr/index.ts', import: '@swr' },
      'tanstack-query': { output: 'out/tanstack/index.ts', import: '@tan' },
      'svelte-query': { output: 'out/svelte/index.ts', import: '@svl' },
      'vue-query': { output: 'out/vue/index.ts', import: '@vue' },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const core = await import('../core/index.js')
    expect(core.takibi).toHaveBeenCalled()
    expect(core.type).toHaveBeenCalled()
    expect(core.mock).toHaveBeenCalled()
    expect(core.docs).toHaveBeenCalled()
    expect(core.test).toHaveBeenCalled()
    expect(core.rpc).toHaveBeenCalled()
    expect(core.swr).toHaveBeenCalled()
    expect(core.tanstackQuery).toHaveBeenCalled()
    expect(core.svelteQuery).toHaveBeenCalled()
    expect(core.vueQuery).toHaveBeenCalled()
  })

  it('runs every component generator branch', async () => {
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': {
        components: {
          schemas: { output: 'out/schemas.ts' },
          parameters: { output: 'out/parameters.ts' },
          headers: { output: 'out/headers.ts' },
          securitySchemes: { output: 'out/security.ts' },
          requestBodies: { output: 'out/bodies.ts' },
          responses: { output: 'out/responses.ts' },
          examples: { output: 'out/examples.ts' },
          links: { output: 'out/links.ts' },
          callbacks: { output: 'out/callbacks.ts' },
          pathItems: { output: 'out/pathItems.ts' },
          mediaTypes: { output: 'out/mediaTypes.ts' },
          webhooks: { output: 'out/webhooks.ts' },
        },
      },
    }
    const { server, reloaded } = createMockViteDevServer(configuration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    const core = await import('../core/index.js')
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

  it('logs error when a generator returns failure result', async () => {
    const core = await import('../core/index.js')
    vi.mocked(core.takibi).mockImplementationOnce(async () => ({
      ok: false as const,
      error: 'takibi internal failure',
    }))
    const configuration = {
      input: 'openapi.yaml',
      'zod-openapi': { output: 'out/single.ts' as const },
    }
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const { server, reloaded } = createMockViteDevServer(configuration)

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    expect(logSpy.mock.calls.some(([msg]) => /takibi internal failure/.test(String(msg)))).toBe(
      true,
    )
    logSpy.mockRestore()
  })

  it('handleHotUpdate logs config error when invalid config is loaded later', async () => {
    const initialConfiguration = {
      input: 'openapi.yaml',
      'zod-openapi': { routes: { output: 'out/route', split: true } },
    }
    const { server, reloaded } = createMockViteDevServer(initialConfiguration)
    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    server.ssrLoadModule = async () => ({ default: { input: 'broken.txt' } })
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    plugin.handleHotUpdate({ file: 'hono-takibi.config.ts', server })
    await new Promise((resolve) => setTimeout(resolve, 50))

    expect(errorSpy).toHaveBeenCalledWith(expect.stringContaining('❌ config:'))
    errorSpy.mockRestore()
  })

  it('skips generation when config has no outputs', async () => {
    const configuration = { input: 'openapi.yaml' }
    const { server, reloaded } = createMockViteDevServer(configuration)

    const plugin = honoTakibiVite()
    plugin.configureServer(server)
    await reloaded

    // No throw → success path covered. Verify ws.send still called.
    // (Falls into runGenerationAndReload which still triggers full-reload.)
  })
})
