// Memory-isolated type check. The consolidated all-features doc produces one
// large output dir whose mock.ts / test.ts (faker mapping over every route)
// dominate tsc's heap. A single `tsc --noEmit` over the whole dir can OOM, so
// this checks the dir in separate child processes (process = heap isolation),
// grouping the two heavy files apart, then aggregates.
import { spawnSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const ROOT = path.resolve(__dirname, '..')
const OUTPUT = path.join(ROOT, 'output')
const HEAP = process.env.TSC_HEAP_MB ?? '4096'

const dirs = fs
  .readdirSync(OUTPUT, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)

function groupsFor(dir) {
  const base = `output/${dir}`
  return [
    { label: `${dir}:mock`, include: [`${base}/mock.ts`] },
    { label: `${dir}:test`, include: [`${base}/test.ts`] },
    {
      label: `${dir}:rest`,
      include: [`${base}/**/*.ts`],
      exclude: [`${base}/mock.ts`, `${base}/test.ts`],
    },
  ]
}

function run(group) {
  const cfg = path.join(ROOT, '.tsc-group.tmp.json')
  fs.writeFileSync(
    cfg,
    JSON.stringify({
      extends: './tsconfig.json',
      include: group.include,
      ...(group.exclude ? { exclude: group.exclude } : {}),
    }),
  )
  const res = spawnSync(
    process.execPath,
    [`--max-old-space-size=${HEAP}`, path.join(ROOT, 'node_modules/typescript/bin/tsc'), '-p', cfg],
    { cwd: ROOT, encoding: 'utf8' },
  )
  fs.rmSync(cfg, { force: true })
  const out = `${res.stdout ?? ''}${res.stderr ?? ''}`
  const typeErrors = out.includes('error TS')
  const oom = res.status === 134 || res.status === 137 || /heap out of memory/i.test(out)
  return { label: group.label, ok: res.status === 0, typeErrors, oom, out }
}

console.log(`=== typecheck (heap ${HEAP}MB/process) ===\n`)
const results = dirs.flatMap(groupsFor).map(run)

let failed = 0
for (const r of results) {
  if (r.ok) {
    console.log(`  ok   ${r.label}`)
  } else if (r.oom && !r.typeErrors) {
    console.log(`  OOM  ${r.label} (raise TSC_HEAP_MB)`)
    failed++
  } else {
    console.log(`  FAIL ${r.label}`)
    console.log(
      r.out
        .split('\n')
        .filter((l) => l.includes('error TS'))
        .slice(0, 20)
        .join('\n'),
    )
    failed++
  }
}

console.log(`\n${results.length - failed}/${results.length} groups passed`)
if (failed > 0) process.exit(1)
