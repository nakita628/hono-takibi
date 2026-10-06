import { spawn } from 'node:child_process'
import { cpSync, existsSync, readdirSync, readFileSync, writeFileSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { listGeneratedCases } from './cases.mjs'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Invoke the CLI entry directly (node + file path) instead of the .bin shim:
// shims can be missing when a stale node_modules cache is restored in CI.
const cli = path.resolve(testRoot, '..', 'packages', 'hono-takibi', 'dist', 'cli.js')
if (!existsSync(cli)) {
  // oxlint-disable-next-line no-console -- CLI script reports the missing build to the operator
  console.error(`missing ${cli} — build the CLI first: vp run hono-takibi#build`)
  process.exit(1)
}
// Cases without a config (e.g. handwritten-only reference cases) have nothing to generate.
const cases = listGeneratedCases(testRoot)

// A scaffold's handler stubs are empty, which tsc rejects until they are implemented. A
// case whose runtime goes through a host of its own (or has no runtime at all) brings no
// overlay; its stubs are filled so the scaffold, and the client typed by it, typecheck.
// scaffold のハンドラスタブは空であり、実装するまで tsc が拒否する。実行時に独自のホストを通る
// (あるいは実行時テストを持たない)ケースは overlay を持たない。そのスタブを埋めて、scaffold と
// それで型付けされるクライアントが typecheck を通るようにする。
const fillStubs = (dir) => {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name)
    if (entry.isDirectory()) {
      fillStubs(file)
    } else if (entry.name.endsWith('.ts')) {
      const source = readFileSync(file, 'utf8')
      // oxfmt breaks a long stub across lines: `async (\n  c,\n) => {}`.
      // oxfmt は長いスタブを `async (\n  c,\n) => {}` のように複数行に分ける。
      const filled = source.replaceAll(
        /(async )?\(\s*c,?\s*\) => \{\}/gu,
        (_, async_ = '') => `${async_}(c) => c.notFound() as never`,
      )
      if (filled !== source) writeFileSync(file, filled)
    }
  }
}

const generateCase = ({ name, dir }) =>
  new Promise((resolve) => {
    // A seed/ dir holds what must be there before the generator runs — a package.json
    // that makes an output directory a package of its own, for `client.package`.
    // seed/ には、生成器の実行前に存在していなければならないものを置く。出力ディレクトリを
    // 独立したパッケージにする package.json などで、`client.package` のためにある。
    const seed = path.join(dir, 'seed')
    if (existsSync(seed)) {
      cpSync(seed, path.join(testRoot, '__generated__', name), { recursive: true })
    }
    const child = spawn(process.execPath, [cli], { cwd: dir })
    const chunks = []
    child.stdout.on('data', (chunk) => chunks.push(chunk))
    child.stderr.on('data', (chunk) => chunks.push(chunk))
    child.on('error', (error) => {
      resolve({ name, ok: false, output: error.message })
    })
    child.on('close', (status) => {
      const ok = status === 0
      // Scaffold templates emit empty handler stubs that intentionally fail tsc until
      // implemented. An overlay/ dir supplies implemented copies (same import lines as
      // the generated stubs) so the case stays typecheckable while routes/index/tests
      // remain purely generated.
      const overlay = path.join(dir, 'overlay')
      if (ok && existsSync(overlay)) {
        cpSync(overlay, path.join(testRoot, '__generated__', name), { recursive: true })
      } else if (ok && existsSync(path.join(testRoot, '__generated__', name))) {
        fillStubs(path.join(testRoot, '__generated__', name))
      }
      resolve({ name, ok, output: Buffer.concat(chunks).toString() })
    })
  })

// Each CLI run is independent (own cwd, own output files), so run them concurrently.
const queue = [...cases]
const results = []
const concurrency = Math.max(1, Math.min(8, os.availableParallelism() - 1))
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const entry = queue.shift()
      if (entry) {
        // oxlint-disable-next-line no-await-in-loop -- each worker drains the queue sequentially to bound concurrency
        results.push(await generateCase(entry))
      }
    }
  }),
)

const failed = results.filter((result) => !result.ok)
for (const result of failed) {
  // oxlint-disable-next-line no-console -- CLI script surfaces per-case generator output
  console.error(`--- ${result.name} ---\n${result.output}`)
}
if (failed.length > 0) {
  // oxlint-disable-next-line no-console -- CLI script reports the failure summary
  console.error(`generate failed: ${failed.map((result) => result.name).join(', ')}`)
  process.exit(1)
}
// oxlint-disable-next-line no-console -- CLI script reports progress
console.log(`generated ${cases.length} cases: ${cases.map(({ name }) => name).join(', ')}`)
