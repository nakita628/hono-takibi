import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { honoTakibiVite } from './index.js'

// No `vi.mock` here, unlike the main plugin suite: the point is what the real
// generators leave on disk once the split cleanup has run.

function noop() {}

function makeServer(configuration: unknown) {
  let resolveReload: () => void = noop
  const reloaded = new Promise<void>((resolve) => {
    resolveReload = resolve
  })
  const server = {
    watcher: { add: noop, on: noop },
    ws: {
      send: (payload: { type: string }) => {
        if (payload.type === 'full-reload') resolveReload()
      },
    },
    pluginContainer: { resolveId: (id: string) => Promise.resolve({ id }) },
    moduleGraph: {
      invalidateModule: noop,
      invalidateAll: noop,
      getModuleById: (id: string) => ({ id }),
    },
    ssrLoadModule: () => Promise.resolve({ default: configuration }),
  }
  return { server, reloaded }
}

const openapi = {
  openapi: '3.1.0',
  info: { title: 'Cleanup', version: '1.0.0' },
  paths: {
    '/items': { get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } } },
  },
}

const originalCwd = process.cwd()
afterEach(() => {
  process.chdir(originalCwd)
})

describe('split cleanup', { timeout: 30_000 }, () => {
  // `cleanupSplitOutput` empties every `.ts` in a split directory, so a single-file
  // output that lives inside one is deleted and has to be rewritten by its own job.
  // That only holds while every cleanup precedes every write; the plugin sequences them
  // that way, and this pins it — the previous interleaving happened to win the race in
  // practice, but nothing made it do so.
  it('keeps a single-file output that lives inside another job split directory', async () => {
    const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), 'vite-cleanup-')))
    process.chdir(dir)
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(openapi))
    const { server, reloaded } = makeServer({
      input: path.join(dir, 'openapi.json'),
      routes: { split: true, output: './gen', import: '../gen' },
      type: { output: './gen/types.ts' },
    })

    honoTakibiVite().configureServer(server)
    await reloaded

    expect(fs.readdirSync(path.join(dir, 'gen')).sort()).toStrictEqual([
      'getItems.ts',
      'index.ts',
      'types.ts',
    ])
  })
})
