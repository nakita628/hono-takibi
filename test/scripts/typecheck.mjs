import { spawn } from 'node:child_process'
import { readdirSync } from 'node:fs'
import { createRequire } from 'node:module'
import os from 'node:os'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
// Resolve tsc as a file and run it with node instead of the .bin shim:
// shims can be missing when a stale node_modules cache is restored in CI.
const tsc = createRequire(path.join(testRoot, 'package.json')).resolve('typescript/lib/tsc.js')
const cases = readdirSync(path.join(testRoot, 'cases')).sort()

const typecheckCase = (name) =>
  new Promise((resolve) => {
    const child = spawn(process.execPath, [tsc, '-p', path.join(testRoot, 'cases', name)], {
      // Faker-heavy outputs (all-features mock/test) need more headroom than
      // the default old-space limit; each case is heap-isolated per process.
      env: { ...process.env, NODE_OPTIONS: '--max-old-space-size=4096' },
    })
    const chunks = []
    child.stdout.on('data', (chunk) => chunks.push(chunk))
    child.stderr.on('data', (chunk) => chunks.push(chunk))
    child.on('error', (error) => resolve({ name, ok: false, output: error.message }))
    child.on('close', (status) => {
      console.log(`typecheck: ${name} ${status === 0 ? 'ok' : 'FAILED'}`)
      resolve({ name, ok: status === 0, output: Buffer.concat(chunks).toString() })
    })
  })

// Faker-heavy projects peak at multiple GB each; running them alongside other tsc
// processes (and the vitest workers that invoke this script) gets them OOM-killed
// on small machines, so they run sequentially after the parallel light phase.
const heavyCases = new Set(['all-features-mock', 'all-features-test'])

// Bounded parallelism: tsc processes are heap-isolated but memory- and I/O-hungry.
// Cap at 2 — node_modules can sit on a host bind mount (devcontainer) where more
// parallel readers thrash the page cache and stall unrelated test spawns; a 2-core
// CI runner stays sequential to bound peak memory.
const queue = cases.filter((name) => !heavyCases.has(name))
const results = []
const concurrency = Math.max(1, Math.min(2, Math.floor(os.availableParallelism() / 2)))
await Promise.all(
  Array.from({ length: concurrency }, async () => {
    while (queue.length > 0) {
      const name = queue.shift()
      if (name) {
        results.push(await typecheckCase(name))
      }
    }
  }),
)
for (const name of cases.filter((caseName) => heavyCases.has(caseName))) {
  results.push(await typecheckCase(name))
}

const failed = results.filter((result) => !result.ok)
for (const result of failed) {
  console.error(`--- ${result.name} ---\n${result.output}`)
}
if (failed.length > 0) {
  console.error(`typecheck failed: ${failed.map((result) => result.name).join(', ')}`)
  process.exit(1)
}
console.log(`typecheck passed for ${cases.length} cases`)
