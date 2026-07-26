import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Invoke the CLI entry directly (node + file path) instead of the .bin shim:
// shims can be missing when a stale node_modules cache is restored in CI.
const cli = path.resolve(testRoot, '..', 'packages', 'hono-takibi', 'dist', 'cli.js')
if (!existsSync(cli)) {
  console.error(`missing ${cli} — build the CLI first: vp run hono-takibi#build`)
  process.exit(1)
}
// Cases without a config (e.g. handwritten-only reference cases) have nothing to generate.
const cases = readdirSync(path.join(testRoot, 'cases'))
  .filter((name) => existsSync(path.join(testRoot, 'cases', name, 'hono-takibi.config.ts')))
  .sort()

const results = cases.map((name) => {
  const result = spawnSync(process.execPath, [cli], {
    cwd: path.join(testRoot, 'cases', name),
    stdio: 'inherit',
  })
  if (result.error) {
    console.error(`${name}: ${result.error.message}`)
  }
  const ok = result.status === 0
  // Scaffold templates emit empty handler stubs that intentionally fail tsc until
  // implemented. An overlay/ dir supplies implemented copies (same import lines as
  // the generated stubs) so the case stays typecheckable while routes/index/tests
  // remain purely generated.
  const overlay = path.join(testRoot, 'cases', name, 'overlay')
  if (ok && existsSync(overlay)) {
    cpSync(overlay, path.join(testRoot, '__generated__', name), { recursive: true })
  }
  return { name, ok }
})
const failed = results.filter((result) => !result.ok).map((result) => result.name)

if (failed.length > 0) {
  console.error(`generate failed: ${failed.join(', ')}`)
  process.exit(1)
}
console.log(`generated ${cases.length} cases: ${cases.join(', ')}`)
