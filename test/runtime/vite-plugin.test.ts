// The Vite plugin (cases/vite-plugin, with the TypeSpec input specs/vite-plugin.tsp).
//
// A dev server started with `honoTakibiVite()` reads hono-takibi.config.ts from its
// working directory and generates on startup. The test deletes the generated output,
// starts a server, and waits for the output to come back.
//
// The plugin finds its config through `process.cwd()`, so the test has to change
// directory. That is why the vitest pool is 'forks' in vite.config.ts: each test file runs
// in a process of its own, and the change cannot leak into another file.
//
// Vite プラグインの検証(cases/vite-plugin。入力は TypeSpec の specs/vite-plugin.tsp)。
//
// `honoTakibiVite()` を指定して起動した開発サーバーは、作業ディレクトリから
// hono-takibi.config.ts を読み込み、起動時にコード生成を行う。このテストでは、生成済みの
// 出力を削除してからサーバーを起動し、出力が再び生成されるのを待つ。
//
// プラグインは `process.cwd()` を基準に設定ファイルを探すため、テスト内でディレクトリを
// 移動する必要がある。vite.config.ts で vitest の pool を 'forks' にしているのは、
// このためである。各テストファイルが専用のプロセスで実行されるので、ディレクトリの変更が
// 他のファイルに漏れることはない。
import { existsSync, readFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { createServer } from 'vite'
import { afterAll, expect, it, vi } from 'vite-plus/test'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const caseDir = path.join(testRoot, 'cases', 'vite-plugin')
const routesFile = path.join(testRoot, '__generated__', 'vite-plugin', 'routes.ts')
const originalCwd = process.cwd()

// Back to the directory the run started in, whatever the test did.
// テストの結果にかかわらず、実行開始時のディレクトリに戻す。
afterAll(() => {
  process.chdir(originalCwd)
})

// The output directory is removed first, so the file that appears can only have been written by
// the plugin. The generated file has to hold the route of the TypeSpec input, not merely exist.
// 最初に出力ディレクトリを削除するため、その後に現れるファイルは、
// プラグインが書き出したものに限られる。生成されたファイルは、存在するだけでなく、
// TypeSpec 入力のルートを含んでいなければならない。
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
  await vi.waitFor(
    () => {
      expect(existsSync(routesFile)).toBe(true)
    },
    { timeout: 30_000 },
  )
  await server.close()

  // Every path of the TypeSpec input is there, compiled to OpenAPI and then to routes.
  // TypeSpec 入力のすべてのパスが、OpenAPI を経てルートにコンパイルされている。
  const routes = readFileSync(routesFile, 'utf8')
  expect(routes).toContain("path: '/todos'")
  expect(routes).toContain("path: '/todos/{id}'")
  expect(routes).toContain("path: '/health'")
}, 60_000)
