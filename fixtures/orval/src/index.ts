import { exec } from 'node:child_process'
import { readdir } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import { promisify } from 'node:util'

const execAsync = promisify(exec)

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/* ─────────────────────────────── Types ─────────────────────────────── */

type Result<T> =
  | { readonly ok: true; readonly value: T }
  | { readonly ok: false; readonly error: string }

type ClientType = 'swr' | 'react-query' | 'svelte-query' | 'vue-query'

type GenerationTask = {
  readonly file: string
  readonly baseName: string
  readonly client: ClientType
}

/* ─────────────────────────────── Constants ─────────────────────────────── */

const WORKERS = availableParallelism()
const OPENAPI_DIR = join(__dirname, '../../generate/openapi')

const CLIENT_OUTPUT_MAP: Record<ClientType, string> = {
  swr: 'swr-axios',
  'react-query': 'tanstack-query-axios',
  'svelte-query': 'svelte-query-axios',
  'vue-query': 'vue-query-axios',
}

/* ─────────────────────────────── Utilities ─────────────────────────────── */

async function getOpenAPIFiles(): Promise<string[]> {
  try {
    const dirents = await readdir(OPENAPI_DIR, { withFileTypes: true })
    return dirents
      .filter((dirent) => dirent.isFile() && /\.(yaml|json)$/i.test(dirent.name))
      .map((dirent) => dirent.name)
  } catch (error) {
    console.error('Failed to read OpenAPI directory:', error)
    return []
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

/* ─────────────────────────────── Orval generator ─────────────────────────────── */

async function runOrval(task: GenerationTask): Promise<Result<string>> {
  const { file, baseName, client } = task
  const label = `${file}:${client}`
  const outputDir = CLIENT_OUTPUT_MAP[client]
  const inputPath = join(OPENAPI_DIR, file)
  const outputPath = join(__dirname, '..', outputDir, `${baseName}.ts`)

  const command = `orval --input "${inputPath}" --output "${outputPath}" --client ${client}`

  try {
    await execAsync(command)
    return { ok: true, value: label }
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error)
    return { ok: false, error: `${label}: ${message}` }
  }
}

/* ─────────────────────────────── Main ─────────────────────────────── */

async function main(): Promise<void> {
  const startTime = performance.now()
  const files = await getOpenAPIFiles()

  if (files.length === 0) {
    console.error('No OpenAPI files found')
    process.exit(1)
  }

  console.log(`Found ${files.length} OpenAPI files, using ${WORKERS} workers`)

  const clients: ClientType[] = ['swr', 'react-query', 'svelte-query', 'vue-query']
  const allTasks: GenerationTask[] = []

  for (const file of files) {
    const baseName = file.replace(/\.(yaml|json)$/i, '')
    for (const client of clients) {
      allTasks.push({ file, baseName, client })
    }
  }

  console.log(`\nProcessing ${allTasks.length} generation tasks...`)

  const results = await executeWithWorkerPool(allTasks, runOrval, WORKERS)
  const failures = results.filter((r) => !r.ok)

  if (failures.length > 0) {
    console.error(`\n${failures.length}/${results.length} tasks failed:`)
    for (const f of failures) {
      if (!f.ok) console.error(`  ${f.error}`)
    }
  }

  const elapsed = ((performance.now() - startTime) / 1000).toFixed(2)
  const successCount = results.length - failures.length
  console.log(`\n✓ ${successCount}/${results.length} files generated in ${elapsed}s`)
  console.log(`  - ${files.length} SWR hooks`)
  console.log(`  - ${files.length} TanStack Query hooks`)
  console.log(`  - ${files.length} Svelte Query hooks`)
  console.log(`  - ${files.length} Vue Query hooks`)
}

main()
