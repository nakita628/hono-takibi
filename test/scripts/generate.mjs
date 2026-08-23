import { spawn } from 'node:child_process'
import { cpSync, existsSync, readdirSync } from 'node:fs'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

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
const cases = readdirSync(path.join(testRoot, 'cases'))
  .filter((name) => existsSync(path.join(testRoot, 'cases', name, 'hono-takibi.config.ts')))
  .sort()

const generateCase = (name) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [cli], { cwd: path.join(testRoot, 'cases', name) })
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
      const overlay = path.join(testRoot, 'cases', name, 'overlay')
      if (ok && existsSync(overlay)) {
        cpSync(overlay, path.join(testRoot, '__generated__', name), { recursive: true })
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
      const name = queue.shift()
      if (name) {
        // oxlint-disable-next-line no-await-in-loop -- each worker drains the queue sequentially to bound concurrency
        results.push(await generateCase(name))
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
console.log(`generated ${cases.length} cases: ${cases.join(', ')}`)
