import { spawnSync } from 'node:child_process'
import { cpSync, existsSync, readdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const bin = path.join(testRoot, 'node_modules', '.bin', 'hono-takibi')
// Cases without a config (e.g. handwritten-only reference cases) have nothing to generate.
const cases = readdirSync(path.join(testRoot, 'cases'))
  .filter((name) => existsSync(path.join(testRoot, 'cases', name, 'hono-takibi.config.ts')))
  .sort()

const results = cases.map((name) => {
  const ok =
    spawnSync(bin, [], {
      cwd: path.join(testRoot, 'cases', name),
      stdio: 'inherit',
    }).status === 0
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
