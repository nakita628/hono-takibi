import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import SwaggerParser from '@apidevtools/swagger-parser'
import { rpc } from 'hono-takibi/rpc'
import { svelteQuery } from 'hono-takibi/svelte-query'
import { swr } from 'hono-takibi/swr'
import { tanstackQuery } from 'hono-takibi/tanstack-query'
import { type } from 'hono-takibi/type'
import { vueQuery } from 'hono-takibi/vue-query'
import { docs, mock, takibi, test } from '../../../packages/hono-takibi/src/core/index.js'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const OPENAPI_DIR = path.resolve(__dirname, '..', 'openapi')
const OUTPUT_DIR = path.resolve(__dirname, '..', 'output')

const ALL_EXPORTS = {
  exportSchemas: true,
  exportSchemasTypes: true,
  exportResponses: true,
  exportParameters: true,
  exportParametersTypes: true,
  exportExamples: true,
  exportRequestBodies: true,
  exportHeaders: true,
  exportHeadersTypes: true,
  exportSecuritySchemes: true,
  exportLinks: true,
  exportCallbacks: true,
  exportPathItems: true,
  exportMediaTypes: true,
  exportMediaTypesTypes: true,
} as const

const NO_EXPORTS = {
  exportSchemas: false,
  exportSchemasTypes: false,
  exportResponses: false,
  exportParameters: false,
  exportParametersTypes: false,
  exportExamples: false,
  exportRequestBodies: false,
  exportHeaders: false,
  exportHeadersTypes: false,
  exportSecuritySchemes: false,
  exportLinks: false,
  exportCallbacks: false,
  exportPathItems: false,
  exportMediaTypes: false,
  exportMediaTypesTypes: false,
} as const

const SPECS = [
  { name: '01-minimal', yaml: '01-minimal.yaml', flags: NO_EXPORTS },
  { name: '02-all-exports', yaml: '02-all-exports.yaml', flags: ALL_EXPORTS },
  { name: '03-circular-refs', yaml: '03-circular-refs.yaml', flags: NO_EXPORTS },
  { name: '04-security-schemes', yaml: '04-security-schemes.yaml', flags: { ...NO_EXPORTS, exportSecuritySchemes: true } },
  { name: '05-content-types', yaml: '05-content-types.yaml', flags: NO_EXPORTS },
  { name: '06-parameters-merge', yaml: '06-parameters-merge.yaml', flags: { ...NO_EXPORTS, exportParameters: true, exportParametersTypes: true } },
  { name: '07-schema-edge-cases', yaml: '07-schema-edge-cases.yaml', flags: { ...NO_EXPORTS, exportSchemas: true, exportSchemasTypes: true } },
  { name: '08-callbacks-links', yaml: '08-callbacks-links.yaml', flags: { ...NO_EXPORTS, exportCallbacks: true, exportLinks: true } },
  { name: '09-readonly-split', yaml: '09-readonly-split.yaml', flags: NO_EXPORTS },
  { name: '10-comprehensive', yaml: '10-comprehensive.yaml', flags: ALL_EXPORTS },
  { name: '11-composition-keywords', yaml: '11-composition-keywords.yaml', flags: { ...NO_EXPORTS, exportSchemas: true, exportSchemasTypes: true } },
  { name: '12-callbacks-field', yaml: '12-callbacks-field.yaml', flags: { ...NO_EXPORTS, exportCallbacks: true } },
  { name: '13-array-object-constraints', yaml: '13-array-object-constraints.yaml', flags: NO_EXPORTS },
] as const

const CLIENT_STUB = `import { hc } from 'hono/client'
import type routes from './type'

export const client = hc<typeof routes>('http://localhost')
`

function makeClientStub(outDir: string) {
  fs.writeFileSync(path.join(outDir, 'client.ts'), CLIENT_STUB)
}

function makeTasks(openAPI: Parameters<typeof type>[0], outDir: string, flags: (typeof SPECS)[number]['flags']) {
  return [
    { mode: 'routes', fn: () => takibi(openAPI, `${outDir}/routes.ts`, false, false, '/', flags) },
    { mode: 'readonly-routes', fn: () => takibi(openAPI, `${outDir}/readonly-routes.ts`, false, false, '/', { ...flags, readonly: true }) },
    { mode: 'type', fn: () => type(openAPI, `${outDir}/type.ts`) },
    { mode: 'rpc', fn: () => rpc(openAPI, `${outDir}/rpc.ts`, './client', false, 'client', false) },
    { mode: 'swr', fn: () => swr(openAPI, `${outDir}/swr.ts`, './client', false, 'client') },
    { mode: 'tanstack-query', fn: () => tanstackQuery(openAPI, `${outDir}/tanstack-query.ts`, './client', false, 'client') },
    { mode: 'svelte-query', fn: () => svelteQuery(openAPI, `${outDir}/svelte-query.ts`, './client', false, 'client') },
    { mode: 'vue-query', fn: () => vueQuery(openAPI, `${outDir}/vue-query.ts`, './client', false, 'client') },
    { mode: 'mock', fn: () => mock(openAPI, `${outDir}/mock.ts`) },
    { mode: 'test', fn: () => test(openAPI, `${outDir}/test.ts`, './mock') },
    { mode: 'parse-response', fn: () => rpc(openAPI, `${outDir}/parse-response.ts`, './client', false, 'client', true) },
    { mode: 'docs', fn: () => docs(openAPI, `${outDir}/docs.md`, 'src/index.ts') },
  ]
}

async function makeResults(spec: (typeof SPECS)[number]) {
  const openAPI = (await SwaggerParser.bundle(path.join(OPENAPI_DIR, spec.yaml))) as Parameters<typeof type>[0]
  const outDir = path.join(OUTPUT_DIR, spec.name)
  fs.mkdirSync(outDir, { recursive: true })
  makeClientStub(outDir)

  return Promise.all(
    makeTasks(openAPI, outDir, spec.flags).map(async ({ mode, fn }) => {
      try {
        const r = await fn()
        return r.ok ? { spec: spec.name, mode, ok: true as const } : { spec: spec.name, mode, ok: false as const, error: r.error }
      } catch (e) {
        return { spec: spec.name, mode, ok: false as const, error: e instanceof Error ? e.message : String(e) }
      }
    }),
  )
}

async function main() {
  console.log(`=== fixtures/generate ===\n`)

  let passed = 0
  let failed = 0

  for (const spec of SPECS) {
    const results = await makeResults(spec)
    const failures = results.filter((r) => !r.ok)

    if (failures.length > 0) {
      for (const f of failures) {
        console.log(`  FAIL ${spec.name}/${f.mode}: ${f.error}`)
        failed++
      }
    }

    passed += results.length - failures.length
    console.log(`${spec.name}: ${results.length - failures.length}/${results.length}`)
  }

  console.log(`\nTotal: ${passed + failed} | Passed: ${passed} | Failed: ${failed}`)
  if (failed > 0) process.exit(1)
}

main()
