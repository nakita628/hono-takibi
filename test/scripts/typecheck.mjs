import { spawnSync } from 'node:child_process'
import { readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const tsc = path.join(testRoot, 'node_modules', '.bin', 'tsc')
const cases = readdirSync(path.join(testRoot, 'cases')).sort()

const results = cases.map((name) => {
  console.log(`typecheck: ${name}`)
  return {
    name,
    ok:
      spawnSync(tsc, ['-p', path.join(testRoot, 'cases', name)], { stdio: 'inherit' }).status === 0,
  }
})
const failed = results.filter((result) => !result.ok).map((result) => result.name)

if (failed.length > 0) {
  console.error(`typecheck failed: ${failed.join(', ')}`)
  process.exit(1)
}
console.log(`typecheck passed for ${cases.length} cases`)
