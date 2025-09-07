import fs from 'node:fs'
import fsp from 'node:fs/promises'
import os from 'node:os'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Test run
// pnpm vitest run ./src/vite-plugin/index.test.ts

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

// biome-ignore lint: test
const makeDevServerMock = (conf: any) => {
  const reloaded = createDeferred<void>()

  const server = {
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
    // loadConfigHot returns a module with default export = conf
    ssrLoadModule: async (_id: string) => ({ default: conf }),
  }

  return { server, reloaded: reloaded.promise }
}

// ──────────────────────────────────────────────────────────────
// Mocks
// ──────────────────────────────────────────────────────────────

vi.mock('../core/schema.js', () => ({
  schema: vi.fn(async () => ({ ok: true })),
}))
vi.mock('../core/route.js', () => ({
  route: vi.fn(async () => ({ ok: true })),
}))
vi.mock('../core/rpc.js', () => ({
  rpc: vi.fn(async () => ({ ok: true })),
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

vi.mock('../generator/zod-openapi-hono/openapi/route/index.js', () => ({
  routeCode: vi.fn(
    () => `
// fake routeCode
export const PetsRoute = {};
export const UsersRoute = {};
`,
  ),
}))

vi.mock('../format/index.js', () => ({
  fmt: vi.fn(async (s: string) => ({ ok: true as const, value: String(s) })),
}))
vi.mock('../fsp/index.js', () => ({
  mkdir: vi.fn(async () => ({ ok: true })),
  writeFile: vi.fn(async () => ({ ok: true })),
}))

// ──────────────────────────────────────────────────────────────
// SUT import (after mocks)
// ──────────────────────────────────────────────────────────────
import { HonoTakibiVite } from './index'

// ──────────────────────────────────────────────────────────────
// Sandbox lifecycle (no let; mutate a const state object)
// ──────────────────────────────────────────────────────────────
const state: { cwdBefore: string; sandbox: string } = { cwdBefore: '', sandbox: '' }

beforeEach(async () => {
  state.cwdBefore = process.cwd()
  state.sandbox = await fsp.mkdtemp(path.join(os.tmpdir(), 'takibi-test-'))
  process.chdir(state.sandbox)

  // Prepare split output dirs with stray .ts files (to be pruned)
  await fsp.mkdir('out/schema', { recursive: true })
  await fsp.mkdir('out/route', { recursive: true })
  await fsp.mkdir('out/rpc', { recursive: true })
  await fsp.writeFile('out/schema/extra.ts', '// should be pruned', 'utf8')
  await fsp.writeFile('out/route/extra.ts', '// should be pruned', 'utf8')
  await fsp.writeFile('out/rpc/extra.ts', '// should be pruned', 'utf8')

  // Non-TS files should remain
  await fsp.writeFile('out/schema/README.md', 'keep', 'utf8')
  await fsp.writeFile('out/route/README.md', 'keep', 'utf8')
  await fsp.writeFile('out/rpc/README.md', 'keep', 'utf8')
})

afterEach(async () => {
  process.chdir(state.cwdBefore)
  await fsp.rm(state.sandbox, { recursive: true, force: true })
})

// ──────────────────────────────────────────────────────────────
// Tests
// ──────────────────────────────────────────────────────────────

describe('HonoTakibiVite (no marker behavior)', () => {
  it('does not create .hono-takibi.generated in split outputs and shallow-prunes stray .ts files', async () => {
    const conf = {
      input: 'openapi.yaml',
      'zod-openapi': {
        schema: { output: 'out/schema', split: true, exportType: true },
        route: { output: 'out/route', split: true, import: '@routes' },
      },
      rpc: { output: 'out/rpc', split: true, import: '@rpc' },
    }

    const { server, reloaded } = makeDevServerMock(conf)
    const plugin = HonoTakibiVite()

    plugin.configureServer(server)
    await reloaded

    const marker = '.hono-takibi.generated'
    expect(await exists(path.join('out/schema', marker))).toBe(false)
    expect(await exists(path.join('out/route', marker))).toBe(false)
    expect(await exists(path.join('out/rpc', marker))).toBe(false)

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
})
