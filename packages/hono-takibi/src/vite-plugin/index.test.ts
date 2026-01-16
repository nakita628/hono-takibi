import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
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
  examples: vi.fn(async () => ({ ok: true, value: 'examples' })),
  headers: vi.fn(async () => ({ ok: true, value: 'headers' })),
  links: vi.fn(async () => ({ ok: true, value: 'links' })),
  parameters: vi.fn(async () => ({ ok: true, value: 'parameters' })),
  requestBodies: vi.fn(async () => ({ ok: true, value: 'requestBodies' })),
  responses: vi.fn(async () => ({ ok: true, value: 'responses' })),
  schemas: vi.fn(async () => ({ ok: true, value: 'schemas' })),
  securitySchemes: vi.fn(async () => ({ ok: true, value: 'securitySchemes' })),
  route: vi.fn(async () => ({ ok: true, value: 'route' })),
  rpc: vi.fn(async () => ({ ok: true, value: 'rpc' })),
  takibi: vi.fn(async () => ({ ok: true, value: 'takibi' })),
  type: vi.fn(async () => ({ ok: true, value: 'type' })),
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
}))
vi.mock('../fsp/index.js', () => ({
  mkdir: vi.fn(async () => ({ ok: true })),
  writeFile: vi.fn(async () => ({ ok: true })),
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
})
