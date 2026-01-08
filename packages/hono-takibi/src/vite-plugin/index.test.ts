import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

const createDeferred = <T = void>() => {
  const box: {
    resolve: (value: T | PromiseLike<T>) => void
    reject: (reason?: unknown) => void
  } = {
    resolve: () => {},
    reject: () => {},
  }
  const promise = new Promise<T>((resolve, reject) => {
    box.resolve = resolve
    box.reject = reject
  })
  return { promise, resolve: box.resolve, reject: box.reject }
}

const exists = async (p: string) => !!(await fsp.stat(p).catch(() => null))

type DevServerLike = {
  watcher: {
    add: (paths: string | readonly string[]) => void
    on: (event: 'all', cb: (evt: string, file: string) => void) => void
  }
  ws: { send: (payload: { type: string; [k: string]: unknown }) => void }
  pluginContainer: { resolveId: (id: string) => Promise<{ id: string } | null> }
  moduleGraph: {
    invalidateModule: (mod: { id?: string } | null) => void
    invalidateAll: () => void
    getModuleById: (id: string) => { id?: string } | null
  }
  ssrLoadModule: (id: string) => Promise<unknown>
}

const makeDevServerMock = (conf: unknown) => {
  const reloaded = createDeferred<void>()

  const server: DevServerLike = {
    watcher: {
      add: (_paths: string | readonly string[]) => {},
      on: (_event: 'all', _cb: (evt: string, file: string) => void) => {},
    },
    ws: {
      send: (payload: { type: string }) => {
        if (payload?.type === 'full-reload') reloaded.resolve()
      },
    },
    pluginContainer: {
      resolveId: async (_id: string) => ({ id: _id }),
    },
    moduleGraph: {
      invalidateModule: (_mod: { id?: string } | null) => {},
      invalidateAll: () => {},
      getModuleById: (_id: string) => ({ id: _id }),
    },
    ssrLoadModule: async (_id: string) => ({ default: conf }),
  }

  return { server, reloaded: reloaded.promise }
}

vi.mock('../core/index.js', () => ({
  // Component functions
  callbacks: vi.fn(async () => ({ ok: true, value: 'callbacks' })),
  examples: vi.fn(async () => ({ ok: true, value: 'examples' })),
  headers: vi.fn(async () => ({ ok: true, value: 'headers' })),
  links: vi.fn(async () => ({ ok: true, value: 'links' })),
  parameters: vi.fn(async () => ({ ok: true, value: 'parameters' })),
  requestBodies: vi.fn(async () => ({ ok: true, value: 'requestBodies' })),
  responses: vi.fn(async () => ({ ok: true, value: 'responses' })),
  schemas: vi.fn(async () => ({ ok: true, value: 'schemas' })),
  securitySchemes: vi.fn(async () => ({ ok: true, value: 'securitySchemes' })),
  // Generation functions
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
  fmt: vi.fn(async (s: string) => ({ ok: true as const, value: String(s) })),
}))
vi.mock('../fsp/index.js', () => ({
  mkdir: vi.fn(async () => ({ ok: true })),
  writeFile: vi.fn(async () => ({ ok: true })),
}))

import { route } from '../core/index.js'
import { honoTakibiVite } from './index.js'

const state: { cwdBefore: string; sandbox: string } = { cwdBefore: '', sandbox: '' }

beforeEach(async () => {
  vi.clearAllMocks()
  state.cwdBefore = process.cwd()
  state.sandbox = await fsp.mkdtemp(path.join(os.tmpdir(), 'takibi-test-'))
  process.chdir(state.sandbox)

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
  process.chdir(state.cwdBefore)
  await fsp.rm(state.sandbox, { recursive: true, force: true })
})

describe('honoTakibiVite', () => {
  it('prunes stray .ts files in split outputs and preserves non-.ts files', async () => {
    const conf = {
      input: 'openapi.yaml',
      'zod-openapi': {
        components: {
          schemas: { output: 'out/schema', split: true, exportTypes: true },
        },
        routes: { output: 'out/route', split: true },
      },
      rpc: { output: 'out/rpc', split: true, import: '@rpc' },
    }

    const { server, reloaded } = makeDevServerMock(conf)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(await exists('out/schema/extra.ts')).toBe(false)
    expect(await exists('out/route/extra.ts')).toBe(false)
    expect(await exists('out/rpc/extra.ts')).toBe(false)

    expect(await exists('out/schema/README.md')).toBe(true)
    expect(await exists('out/route/README.md')).toBe(true)
    expect(await exists('out/rpc/README.md')).toBe(true)

    expect(fs.existsSync('out/schema')).toBe(true)
    expect(fs.existsSync('out/route')).toBe(true)
    expect(fs.existsSync('out/rpc')).toBe(true)
  })

  it('runs routes even without schema outputs', async () => {
    const conf = {
      input: 'openapi.yaml',
      'zod-openapi': {
        routes: { output: 'out/route', split: true },
      },
    }

    const { server, reloaded } = makeDevServerMock(conf)
    const plugin = honoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    expect(route).toHaveBeenCalled()
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
})
