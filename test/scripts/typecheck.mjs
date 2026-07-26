import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Resolve tsc as a file and run it with node instead of the .bin shim:
// shims can be missing when a stale node_modules cache is restored in CI.
const tsc = createRequire(path.join(testRoot, 'package.json')).resolve('typescript/lib/tsc.js')
const cases = readdirSync(path.join(testRoot, 'cases')).sort()

const results = cases.map((name) => {
  console.log(`typecheck: ${name}`)
  const result = spawnSync(process.execPath, [tsc, '-p', path.join(testRoot, 'cases', name)], {
    stdio: 'inherit',
    // Faker-heavy outputs (all-features mock/test) need more headroom than
    // the default old-space limit; each case is heap-isolated per process.
    env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
  })
  if (result.error) {
    console.error(`${name}: ${result.error.message}`)
  }
  return { name, ok: result.status === 0 }
})
const failed = results.filter((result) => !result.ok).map((result) => result.name)

if (failed.length > 0) {
  console.error(`typecheck failed: ${failed.join(', ')}`)
  process.exit(1)
}
console.log(`typecheck passed for ${cases.length} cases`)
