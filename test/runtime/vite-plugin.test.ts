// Verifies the Vite plugin (cases/vite-plugin): a dev server with honoTakibiVite()
// generates routes from the .tsp input on startup. Uses process.chdir, which is why
// the vitest pool is 'forks' (per-file process isolation) in the root vite.config.ts.
import { existsSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { createServer } from 'vite'
import { afterAll, expect, it, vi } from 'vite-plus/test'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const caseDir = path.join(testRoot, 'cases', 'vite-plugin')
const routesFile = path.join(testRoot, '__generated__', 'vite-plugin', 'routes.ts')
const originalCwd = process.cwd()

afterAll(() => {
  process.chdir(originalCwd)
})

it('the vite plugin generates from the .tsp input when the dev server starts', async () => {
  process.chdir(caseDir)
  rmSync(path.dirname(routesFile), { recursive: true, force: true })
  expect(existsSync(routesFile)).toBe(false)

  const server = await createServer({
    root: caseDir,
    logLevel: 'silent',
    server: { middlewareMode: true },
    plugins: [honoTakibiVite()],
  })
  await vi.waitFor(() => expect(existsSync(routesFile)).toBe(true), { timeout: 30_000 })
  await server.close()
}, 60_000)
