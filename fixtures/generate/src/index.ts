import { spawn } from 'node:child_process'
import { readdir, writeFile } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import SwaggerParser from '@apidevtools/swagger-parser'
import { compile, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'
import { rpc } from 'hono-takibi/rpc'
import { svelteQuery } from 'hono-takibi/svelte-query'
import { swr } from 'hono-takibi/swr'
import { tanstackQuery } from 'hono-takibi/tanstack-query'
import { type as generateType } from 'hono-takibi/type'
import { vueQuery } from 'hono-takibi/vue-query'

/**
 * Parallel fixture generation using worker pool pattern
 *
 * References:
 * - Node.js availableParallelism: https://nodejs.org/api/os.html#osavailableparallelism
 * - Promise.all parallelism: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
 */

/* ─────────────────────────────── Types ─────────────────────────────── */

type OpenAPI = Parameters<typeof generateType>[0]

type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string }

type GeneratorKind = 'type' | 'rpc' | 'swr' | 'tanstack' | 'svelte' | 'vue' | 'client'

type GenerationTask = {
  readonly file: string
  readonly baseName: string
  readonly kind: GeneratorKind
  readonly openAPI: OpenAPI
}

/* ─────────────────────────────── Constants ─────────────────────────────── */

const __dirname = dirname(fileURLToPath(import.meta.url))
const WORKERS = availableParallelism()

/* ─────────────────────────────── Utilities ─────────────────────────────── */

async function parseOpenAPI(input: string): Promise<Result<OpenAPI>> {
  try {
    if (input.endsWith('.tsp')) {
      const program = await compile(NodeHost, path.resolve(input), { noEmit: true })
      if (program.diagnostics.length) {
        return { ok: false, error: 'TypeSpec compile failed' }
      }
      const [record] = await getOpenAPI3(program)
      const tsp = 'document' in record ? record.document : record.versions[0].document
      const bundled = await SwaggerParser.bundle(JSON.parse(JSON.stringify(tsp)))
      return { ok: true, value: bundled as unknown as OpenAPI }
    }
    const bundled = await SwaggerParser.bundle(input)
    return { ok: true, value: bundled as unknown as OpenAPI }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

async function getOpenAPIFiles(): Promise<string[]> {
  return (await readdir(join(__dirname, '../openapi'))).filter((f) => /\.(yaml|json|tsp)$/i.test(f))
}

function printFailures(
  failures: { readonly ok: false; readonly error: string }[],
  total: number,
  label: string,
): void {
  if (failures.length > 0) {
    console.error(`\n${failures.length}/${total} ${label} failed:\n`)
    for (const f of failures) {
      console.error(f.error || '(no output)')
    }
  }
}

/* ─────────────────────────────── Route generation (spawn) ─────────────────────────────── */

const runRoute = (file: string): Promise<Result<string>> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = []
    const child = spawn(
      'hono-takibi',
      [`openapi/${file}`, '-o', `routes/${file.replace(/\.(yaml|json|tsp)$/i, '.ts')}`],
      { stdio: ['ignore', 'ignore', 'pipe'], shell: false },
    )
    child.stderr.on('data', (chunk: Buffer) => chunks.push(chunk))
    child.on('close', (code) => {
      resolve(
        code === 0
          ? { ok: true, value: file }
          : { ok: false, error: `${file}: ${Buffer.concat(chunks).toString()}` },
      )
    })
  })

/* ─────────────────────────────── Individual generators ─────────────────────────────── */

const runGenerator = async (task: GenerationTask): Promise<Result<string>> => {
  const { file, baseName, kind, openAPI } = task
  const label = `${file}:${kind}`

  switch (kind) {
    case 'type': {
      const output = join(__dirname, '../types', `${baseName}.ts`) as `${string}.ts`
      const result = await generateType(openAPI, output)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'rpc': {
      const output = join(__dirname, '../rpcs', `${baseName}.ts`)
      const result = await rpc(openAPI, output, `../clients/${baseName}`, false)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'swr': {
      const output = join(__dirname, '../swrs', `${baseName}.ts`)
      const result = await swr(openAPI, output, `../clients/${baseName}`, false)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'tanstack': {
      const output = join(__dirname, '../tanstack-querys', `${baseName}.ts`)
      const result = await tanstackQuery(openAPI, output, `../clients/${baseName}`, false)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'svelte': {
      const output = join(__dirname, '../svelte-querys', `${baseName}.ts`)
      const result = await svelteQuery(openAPI, output, `../clients/${baseName}`, false)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'vue': {
      const output = join(__dirname, '../vue-querys', `${baseName}.ts`)
      const result = await vueQuery(openAPI, output, `../clients/${baseName}`, false)
      return result.ok
        ? { ok: true, value: label }
        : { ok: false, error: `${label}: ${result.error}` }
    }
    case 'client': {
      const output = join(__dirname, '../clients', `${baseName}.ts`)
      const code = `import { hc } from 'hono/client'
import type routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
      await writeFile(output, code)
      return { ok: true, value: label }
    }
  }
}

/* ─────────────────────────────── Worker pool executor ─────────────────────────────── */

const executeWithWorkerPool = async <T, R>(
  items: readonly T[],
  worker: (item: T) => Promise<R>,
  concurrency: number,
): Promise<R[]> => {
  const queue = [...items]
  const results: R[] = []

  await Promise.all(
    Array.from({ length: Math.min(concurrency, items.length) }, async () => {
      while (queue.length > 0) {
        const item = queue.pop()
        if (item) results.push(await worker(item))
      }
    }),
  )

  return results
}

/* ─────────────────────────────── Main ─────────────────────────────── */

async function main() {
  const startTime = performance.now()
  const files = await getOpenAPIFiles()

  console.log(`Found ${files.length} OpenAPI files, using ${WORKERS} workers`)

  // Phase 1: Route generation (parallel spawn with worker pool)
  console.log('\n[Phase 1] Generating routes...')
  const routeResults = await executeWithWorkerPool(files, runRoute, WORKERS)

  const routeFailures = routeResults.filter((r): r is Result<string> & { ok: false } => !r.ok)
  printFailures(routeFailures, routeResults.length, 'route files')

  if (routeFailures.length > 0) {
    process.exit(1)
  }

  console.log(`  ✓ ${routeResults.length} routes generated`)

  // Phase 2: Parse all OpenAPI files in parallel
  console.log('\n[Phase 2] Parsing OpenAPI files...')
  const parseResults = await Promise.all(
    files.map(async (file) => {
      const openAPIPath = join(__dirname, '../openapi', file)
      const result = await parseOpenAPI(openAPIPath)
      return { file, result }
    }),
  )

  const parseFailures = parseResults.filter((p) => !p.result.ok)
  if (parseFailures.length > 0) {
    for (const f of parseFailures) {
      if (!f.result.ok) {
        console.error(`${f.file}: ${f.result.error}`)
      }
    }
    process.exit(1)
  }

  console.log(`  ✓ ${parseResults.length} files parsed`)

  // Build cache of parsed OpenAPI
  const openAPICache = new Map<string, OpenAPI>()
  for (const p of parseResults) {
    if (p.result.ok) {
      openAPICache.set(p.file, p.result.value)
    }
  }

  // Phase 3: Generate all files in fully parallel manner
  // Total tasks: files × 7 kinds (type, rpc, swr, tanstack, svelte, vue, client)
  console.log('\n[Phase 3] Generating all hook files (fully parallel)...')

  const kinds: GeneratorKind[] = ['type', 'rpc', 'swr', 'tanstack', 'svelte', 'vue', 'client']
  const allTasks: GenerationTask[] = []

  for (const file of files) {
    const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
    const openAPI = openAPICache.get(file)
    if (openAPI) {
      for (const kind of kinds) {
        allTasks.push({ file, baseName, kind, openAPI })
      }
    }
  }

  console.log(`  Processing ${allTasks.length} generation tasks...`)

  const genResults = await executeWithWorkerPool(allTasks, runGenerator, WORKERS)

  const genFailures = genResults.filter((r): r is Result<string> & { ok: false } => !r.ok)
  printFailures(genFailures, genResults.length, 'generation tasks')

  if (genFailures.length > 0) {
    process.exit(1)
  }

  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2)
  console.log(`\n✓ All ${genResults.length} files generated successfully in ${elapsed}s`)
  console.log(`  - ${files.length} routes`)
  console.log(`  - ${files.length} types`)
  console.log(`  - ${files.length} rpcs`)
  console.log(`  - ${files.length} swrs`)
  console.log(`  - ${files.length} tanstack-querys`)
  console.log(`  - ${files.length} svelte-querys`)
  console.log(`  - ${files.length} vue-querys`)
  console.log(`  - ${files.length} clients`)
}

main()
