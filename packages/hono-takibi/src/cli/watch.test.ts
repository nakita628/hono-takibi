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

/**
 * Polls until `condition` holds, so a test waits on the watcher rather than on a clock.
 *
 * The budget is a starvation allowance, not an expectation. Each of these tests waits on
 * two real generation passes — oxfmt and ts-morph over real files — while eighty other
 * test files do the same across eight workers. Alone the whole file finishes in three
 * seconds; under the full suite a single pass has been measured at 38s. So the number is
 * large on purpose, and the cost is only paid when the watcher is genuinely broken.
 *
 * Raising it is what worked; the alternative — running this file outside the parallel
 * suite — is not something vite-plus exposes per file.
 */
async function until(condition: () => boolean, timeoutMs = 90_000) {
  const deadline = Date.now() + timeoutMs
  const poll = async (): Promise<boolean> => {
    if (condition()) return true
    if (Date.now() >= deadline) return false
    await new Promise((resolve) => setTimeout(resolve, 50))
    return poll()
  }
  return poll()
}

/** How long a written edit is given to reach the watcher before it is written again. */
const REWRITE_AFTER = 5000

/**
 * Writes `content` to `file` until `condition` holds, and answers whether it ever did.
 *
 * `👀 Watching` is printed before anything is being watched: registering the OS watcher
 * is a `stat` and several async hops behind the message, and an edit that lands in that
 * window is not delivered late, it is never delivered at all. Writing once and waiting
 * would therefore be a coin flip whose odds are set by how loaded the machine is — the
 * window has been measured at 8ms idle here, and the full suite runs eight workers deep.
 *
 * So the edit is repeated rather than assumed. Every attempt is a real edit and a real
 * pass, which is what these tests are about; the repeat only costs anything when the
 * first one lost the race.
 */
async function writeUntil(
  file: string,
  content: string,
  condition: () => boolean,
  timeoutMs = 90_000,
) {
  const deadline = Date.now() + timeoutMs
  const attempt = async (): Promise<boolean> => {
    fs.writeFileSync(file, content)
    if (await until(condition, REWRITE_AFTER)) return true
    if (Date.now() >= deadline) return false
    return attempt()
  }
  return attempt()
}

// Long enough for every `until` in the slowest case to spend its full budget, so a real
// failure still reports as the assertion that failed rather than as a suite timeout.
describe('hono-takibi --watch', { timeout: 300_000 }, () => {
  it('picks up a change to the config file itself', async () => {
    const dir = useTmpDir('cli-watch-config-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, `export default { input: './openapi.json', output: './a.ts' }`)

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)

      expect(
        await writeUntil(
          config,
          `export default { input: './openapi.json', output: './b.ts' }`,
          () => fs.existsSync(path.join(dir, 'b.ts')),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // Also the plain "the document changed, so regenerate" case: the recovery write adds an
  // operation and the assertion is that it reached the output.
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

      expect(await writeUntil(input, '{ not json', () => cli.output().includes('❌'))).toBe(true)

      expect(
        await writeUntil(
          input,
          JSON.stringify({
            ...minimalOpenapi,
            paths: {
              '/widgets': {
                get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
              },
            },
          }),
          () => fs.readFileSync(routes, 'utf-8').includes('getWidgetsRoute'),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // A command asked to stay up and react to edits has to treat the first pass as a pass
  // like any other; otherwise one typo in the config ends the session.
  it('stays up when the config does not validate at startup', async () => {
    const dir = useTmpDir('cli-watch-bad-config-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.writeFileSync(path.join(dir, 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(
      config,
      `export default { input: './openapi.json', basePath: 'api', output: './routes.ts' }`,
    )

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes('👀 Watching'))).toBe(true)
      expect(cli.output()).toContain("basePath: must start with '/'")
      expect(fs.existsSync(path.join(dir, 'routes.ts'))).toBe(false)

      expect(
        await writeUntil(
          config,
          `export default { input: './openapi.json', basePath: '/api', output: './routes.ts' }`,
          () => fs.existsSync(path.join(dir, 'routes.ts')),
        ),
      ).toBe(true)
    } finally {
      await Effect.runPromise(Fiber.interrupt(cli.fiber))
    }
  })

  // The directory to watch comes from the config, so a config that moves `input` has to
  // move the watcher with it rather than leaving it on the old directory.
  it('follows input to another directory when the config moves it', async () => {
    const dir = useTmpDir('cli-watch-moved-input-')
    const config = path.join(dir, 'hono-takibi.config.ts')
    fs.mkdirSync(path.join(dir, 'a'))
    fs.mkdirSync(path.join(dir, 'b'))
    fs.writeFileSync(path.join(dir, 'a', 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(path.join(dir, 'b', 'openapi.json'), JSON.stringify(minimalOpenapi))
    fs.writeFileSync(config, `export default { input: './a/openapi.json', output: './routes.ts' }`)

    const cli = startCli(['--watch'])
    try {
      expect(await until(() => cli.output().includes(path.join(dir, 'a')))).toBe(true)

      expect(
        await writeUntil(
          config,
          `export default { input: './b/openapi.json', output: './routes.ts' }`,
          () => cli.output().includes(path.join(dir, 'b')),
        ),
      ).toBe(true)

      // Editing the document in the directory the config now names has to rerun. The
      // round restarted to follow it, so this is a second watcher with its own window.
      expect(
        await writeUntil(
          path.join(dir, 'b', 'openapi.json'),
          JSON.stringify({
            ...minimalOpenapi,
            paths: {
              '/widgets': {
                get: { operationId: 'getWidgets', responses: { '200': { description: 'OK' } } },
              },
            },
          }),
          () => fs.readFileSync(path.join(dir, 'routes.ts'), 'utf-8').includes('getWidgetsRoute'),
        ),
      ).toBe(true)
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
