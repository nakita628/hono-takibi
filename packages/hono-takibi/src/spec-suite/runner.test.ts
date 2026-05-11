/**
 * JSON Schema 2020-12 Official Test Suite runner.
 *
 * Loads test cases from `json-schema-test-suite/draft2020-12/*.json`,
 * generates Zod source code via `zodToOpenAPI`, evaluates it with Zod in
 * scope, and reports pass/fail rates per file.
 *
 * Reports objective conformance rate to back the "JSON Schema 2020-12
 * coverage" claim in `takibi-lab/hono-takibi/2026/05/10.md`.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vite-plus/test'
import { z } from 'zod'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import type { Schema } from '../openapi/index.js'

type TestCase = { description: string; data: unknown; valid: boolean }
type TestGroup = {
  description: string
  schema: Schema | boolean
  tests: readonly TestCase[]
  $comment?: string
}

const SUITE_DIR = join(
  fileURLToPath(new URL('../../json-schema-test-suite/draft2020-12', import.meta.url)),
)

// Files we know hono-takibi cannot fully cover (documented limitations).
// These are EXCLUDED from the conformance score and reported separately.
const KNOWN_INCOMPATIBLE = new Set([
  // Reference resolution: handled by SwaggerParser bundle, not zodToOpenAPI directly.
  'ref.json',
  'refRemote.json',
  'dynamicRef.json',
  'anchor.json',
  'defs.json',
  // Vocabulary / meta: pass-through only, no semantic enforcement.
  'vocabulary.json',
  'unknownKeyword.json',
  // Boolean schemas (true/false at top level) — non-standard input shape.
  'boolean_schema.json',
  // Infinite-loop detection requires runtime self-reference; out of scope for static codegen.
  'infinite-loop-detection.json',
  // Format assertion vs annotation vocabulary distinction — not implemented.
  'format.json',
])

type FileStats = {
  file: string
  groups: number
  tests: number
  passed: number
  failed: number
  errored: number
  skipped: number
}

function evalZod(src: string): z.ZodTypeAny | null {
  try {
    // Strip .openapi({...}) calls — metadata only, irrelevant for validation.
    const cleaned = src.replace(/\.openapi\([^)]*\)/g, '')
    // biome-ignore lint/security/noGlobalEval: trusted internal source from generator
    const fn = new Function('z', `return ${cleaned}`) as (zodNs: typeof z) => z.ZodTypeAny
    return fn(z)
  } catch {
    return null
  }
}

function runFile(filePath: string): FileStats {
  const file = filePath.split('/').pop() ?? filePath
  const content = readFileSync(filePath, 'utf-8')
  const groups = JSON.parse(content) as readonly TestGroup[]
  const stats: FileStats = {
    file,
    groups: groups.length,
    tests: 0,
    passed: 0,
    failed: 0,
    errored: 0,
    skipped: 0,
  }

  for (const group of groups) {
    if (typeof group.schema === 'boolean') {
      stats.skipped += group.tests.length
      stats.tests += group.tests.length
      continue
    }
    let zodSchema: z.ZodTypeAny | null = null
    try {
      const src = zodToOpenAPI(group.schema)
      zodSchema = evalZod(src)
    } catch {
      // Generator threw — count all tests as errored.
      stats.errored += group.tests.length
      stats.tests += group.tests.length
      continue
    }
    if (zodSchema === null) {
      stats.errored += group.tests.length
      stats.tests += group.tests.length
      continue
    }
    for (const tc of group.tests) {
      stats.tests += 1
      try {
        const result = zodSchema.safeParse(tc.data)
        if (result.success === tc.valid) stats.passed += 1
        else stats.failed += 1
      } catch {
        stats.errored += 1
      }
    }
  }
  return stats
}

// v3.0 Phase 1: re-run with runtime annotation tracking for unevaluatedProperties
describe('JSON Schema 2020-12 Official Test Suite — objective conformance', () => {
  const allFiles = readdirSync(SUITE_DIR).filter((f) => f.endsWith('.json'))
  const targetFiles = allFiles.filter((f) => !KNOWN_INCOMPATIBLE.has(f))

  it('reports per-file pass rate', () => {
    const results: FileStats[] = targetFiles.map((f) => runFile(join(SUITE_DIR, f)))
    const total = results.reduce(
      (acc, r) => ({
        tests: acc.tests + r.tests,
        passed: acc.passed + r.passed,
        failed: acc.failed + r.failed,
        errored: acc.errored + r.errored,
        skipped: acc.skipped + r.skipped,
      }),
      { tests: 0, passed: 0, failed: 0, errored: 0, skipped: 0 },
    )

    const passRate = total.tests > 0 ? ((total.passed / total.tests) * 100).toFixed(2) : '0.00'

    // Print structured summary for human inspection (vitest captures stdout).
    console.log(
      `\n[JSON Schema Suite] files=${targetFiles.length} groups=${results.reduce((a, r) => a + r.groups, 0)} tests=${total.tests}`,
    )
    console.log(
      `[JSON Schema Suite] passed=${total.passed} failed=${total.failed} errored=${total.errored} skipped=${total.skipped}`,
    )
    console.log(`[JSON Schema Suite] pass rate = ${passRate}%`)
    console.log(
      `[JSON Schema Suite] excluded files (known limitations): ${[...KNOWN_INCOMPATIBLE].join(', ')}`,
    )

    // Per-file breakdown for the worst 10 files
    const sorted = [...results]
      .filter((r) => r.tests > 0)
      .sort((a, b) => a.passed / a.tests - b.passed / b.tests)
      .slice(0, 10)
    console.log('[JSON Schema Suite] Worst 10 files:')
    for (const r of sorted) {
      const pct = ((r.passed / r.tests) * 100).toFixed(0)
      console.log(`  ${pct.padStart(3)}%  ${r.file.padEnd(40)} ${r.passed}/${r.tests}`)
    }

    // Best 10 files
    const best = [...results]
      .filter((r) => r.tests > 0)
      .sort((a, b) => b.passed / b.tests - a.passed / a.tests)
      .slice(0, 10)
    console.log('[JSON Schema Suite] Best 10 files:')
    for (const r of best) {
      const pct = ((r.passed / r.tests) * 100).toFixed(0)
      console.log(`  ${pct.padStart(3)}%  ${r.file.padEnd(40)} ${r.passed}/${r.tests}`)
    }

    // Persist a Markdown report for takibi-lab consumption.
    const lines: string[] = [
      `# JSON Schema 2020-12 Official Test Suite — hono-takibi conformance`,
      ``,
      `Files: ${targetFiles.length} | Groups: ${results.reduce((a, r) => a + r.groups, 0)} | Tests: ${total.tests}`,
      `Passed: ${total.passed} | Failed: ${total.failed} | Errored: ${total.errored} | Skipped: ${total.skipped}`,
      `**Pass rate: ${passRate}%**`,
      ``,
      `Excluded (known limitations): ${[...KNOWN_INCOMPATIBLE].join(', ')}`,
      ``,
      `## Per-file results`,
      ``,
      `| File | Pass | Total | % |`,
      `|---|---|---|---|`,
    ]
    const sortedAll = [...results]
      .filter((r) => r.tests > 0)
      .sort((a, b) => a.file.localeCompare(b.file))
    for (const r of sortedAll) {
      const pct = ((r.passed / r.tests) * 100).toFixed(0)
      lines.push(`| ${r.file} | ${r.passed} | ${r.tests} | ${pct}% |`)
    }
    writeFileSync(join(SUITE_DIR, '..', 'conformance-report.md'), lines.join('\n'), 'utf-8')

    // Sanity: at least 1 test ran.
    expect(total.tests).toBeGreaterThan(0)
  })
})
