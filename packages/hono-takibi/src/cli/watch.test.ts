import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import * as NodeServices from '@effect/platform-node/NodeServices'
import { Console, Effect, Fiber } from 'effect'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { honoTakibi } from './index.js'

// Its own file: every case here forks a watcher that has to be interrupted, which does
// not fit the run-to-completion shape of the rest of the CLI suite.

const ENTRY_URL = new URL('../index.ts', import.meta.url).href
const ANSI = new RegExp(`${String.fromCodePoint(27)}\\[[0-9;]*m`, 'gu')

const minimalOpenapi = {
  openapi: '3.1.0',
  info: { title: 'Watch', version: '1.0.0' },
  paths: {
    '/items': { get: { operationId: 'getItems', responses: { '200': { description: 'OK' } } } },
  },
}

const originalCwd = process.cwd()
let tmpDir = ''

function useTmpDir(prefix: string) {
  const dir = fs.realpathSync(fs.mkdtempSync(path.join(os.tmpdir(), prefix)))
  tmpDir = dir
  process.chdir(dir)
  return dir
}

afterEach(() => {
  process.chdir(originalCwd)
  if (tmpDir) fs.rmSync(tmpDir, { recursive: true, force: true })
  tmpDir = ''
})

/**
 * Starts the CLI in the background and hands back the lines it has printed so far.
 *
 * A watch run never completes on its own, so the fiber is what the test interrupts —
 * the same thing Ctrl-C does to the real command.
 */
function startCli(argv: readonly string[]) {
  const lines: string[] = []
  const recorder: Console.Console = Object.assign(Object.create(console), {
    log: (...args: readonly unknown[]) => lines.push(args.map(String).join(' ')),
    error: (...args: readonly unknown[]) => lines.push(args.map(String).join(' ')),
  })
  const fiber = Effect.runFork(
    honoTakibi(argv, ENTRY_URL).pipe(
      Effect.provideService(Console.Console, recorder),
      Effect.provide(NodeServices.layer),
    ),
  )
  return { fiber, output: () => lines.join('\n').replaceAll(ANSI, '') }
}

/** Polls until `condition` holds, so a test waits on the watcher rather than on a clock. */
async function until(condition: () => boolean, timeoutMs = 15_000) {
  const deadline = Date.now() + timeoutMs
  const poll = async (): Promise<boolean> => {
    if (condition()) return true
    if (Date.now() >= deadline) return false
    await new Promise((resolve) => setTimeout(resolve, 50))
    return poll()
  }
  return poll()
}

describe('hono-takibi --watch', { timeout: 40_000 }, () => {
  it('regenerates when the input document changes', async () => {
    const dir = useTmpDir('cli-watch-input-')
    const routes = path.join(dir, 'routes.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './openapi.json', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)
      expect(fs.readFileSync(routes, 'utf-8')).toContain('getItemsRoute')

      fs.writeFileSync(
        path.join(dir, 'openapi.json'),
        JSON.stringify({
          ...minimalOpenapi,
          paths: {
            '/widgets': {
              get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
            },
          },
        }),
      )

      expect(await until(() => fs.readFileSync(routes, 'utf-8').includes('getWidgetsRoute'))).toBe(
        true,
      )
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  it('picks up a change to the config file itself', async () => {
    const dir = useTmpDir('cli-watch-config-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, `export default { input: './openapi.json', output: './a.ts' }`)

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)

      fs.writeFileSync(config, `export default { input: './openapi.json', output: './b.ts' }`)

      expect(await until(() => fs.existsSync(path.join(dir, 'b.ts')))).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // A watcher that exits on the first bad edit is worse than one that waits for the next.
  it('keeps watching after a failing pass', async () => {
    const dir = useTmpDir('cli-watch-recover-')
    const input = path.join(dir, 'openapi.json')
    const routes = path.join(dir, 'routes.ts')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      path.join(dir, 'hono-takibi.config.ts'),
      `export default { input: './openapi.json', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)

      fs.writeFileSync(input, '{ not json')
      expect(await until(() => cli.output().includes('❌'))).toBe(true)

      fs.writeFileSync(
        input,
        JSON.stringify({
          ...minimalOpenapi,
          paths: {
            '/widgets': {
              get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
            },
          },
        }),
      )
      expect(await until(() => fs.readFileSync(routes, 'utf-8').includes('getWidgetsRoute'))).toBe(
        true,
      )
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  it('rejects --watch alongside the one-shot flags', async () => {
    const dir = useTmpDir('cli-watch-one-shot-')
    const input = path.join(dir, 'openapi.json')
    fs.writeFileSync(input, JSON.stringify(minimalOpenapi))

    const cli = startCli([input, '-o', path.join(dir, 'out.ts'), '--watch'])
    const exit = await Effect.runPromise(Fiber.await(cli.fiber))

    expect(exit._tag).toBe('Failure')
    expect(cli.output()).toContain('--watch runs a config file')
  })
})
