import { spawn } from 'node:child_process'
import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { rpc } from 'hono-takibi/rpc'
import { svelteQuery } from 'hono-takibi/svelte-query'
import { swr } from 'hono-takibi/swr'
import { tanstackQuery } from 'hono-takibi/tanstack-query'
import { type as generateType } from 'hono-takibi/type'
import {
  __dirname,
  getOpenAPIFiles,
  parseOpenAPI,
  printFailures,
  type Result,
  WORKERS,
} from './common'

/* ─────────────────────────────── Route generation (spawn) ─────────────────────────────── */

const runRoute = (file: string): Promise<Result> =>
  new Promise((resolve) => {
    const chunks: Buffer[] = []
    const child = spawn(
      'hono-takibi',
      [`openapi/${file}`, '-o', `routes/${file.replace(/\.(yaml|json|tsp)$/i, '.ts')}`],
      {
        stdio: ['ignore', 'ignore', 'pipe'],
        shell: false,
      },
    )
    child.stderr.on('data', (chunk: Buffer) => chunks.push(chunk))
    child.on('close', (code) => {
      resolve(
        code === 0
          ? { file, success: true }
          : { file, success: false, stderr: Buffer.concat(chunks).toString() },
      )
    })
  })

/* ─────────────────────────────── Main ─────────────────────────────── */

async function main() {
  const files = await getOpenAPIFiles()

  const queue = [...files]
  const routeResults: Result[] = []

  // Route generation (parallel spawn)
  console.log('Generating routes...')
  await Promise.all(
    Array.from({ length: Math.min(WORKERS, files.length) }, async () => {
      while (queue.length > 0) {
        const file = queue.pop()
        if (file) routeResults.push(await runRoute(file))
      }
    }),
  )

  const routeFailures = routeResults.filter(
    (r): r is Extract<Result, { success: false }> => !r.success,
  )

  printFailures(routeFailures, routeResults.length, 'route files')

  if (routeFailures.length > 0) {
    process.exit(1)
  }

  console.log(`${routeResults.length} routes generated successfully`)

  // Type, Client, RPC, SWR, TanStack Query, Svelte Query generation (parallel)
  console.log('Generating types, clients, rpcs, swrs, tanstack-querys, and svelte-querys...')
  const generateResults = await Promise.all(
    files.map(async (file) => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
      const openAPIPath = join(__dirname, '../openapi', file)

      const parseResult = await parseOpenAPI(openAPIPath)
      if (!parseResult.ok) {
        return { file, success: false, error: `Parse error: ${parseResult.error}` }
      }

      const openAPI = parseResult.value

      // Generate type file using hono-takibi type function
      const typeOutput = join(__dirname, '../types', `${baseName}.ts`) as `${string}.ts`
      const typeResult = await generateType(openAPI, typeOutput)
      if (!typeResult.ok) {
        return { file, success: false, error: `Type generation error: ${typeResult.error}` }
      }

      // Generate RPC file
      const rpcOutput = join(__dirname, '../rpcs', `${baseName}.ts`)
      const rpcResult = await rpc(openAPI, rpcOutput, `../clients/${baseName}`, false)
      if (!rpcResult.ok) {
        return { file, success: false, error: `RPC generation error: ${rpcResult.error}` }
      }

      // Generate SWR hooks file
      const swrOutput = join(__dirname, '../swrs', `${baseName}.ts`)
      const swrResult = await swr(openAPI, swrOutput, `../clients/${baseName}`, false)
      if (!swrResult.ok) {
        return { file, success: false, error: `SWR generation error: ${swrResult.error}` }
      }

      // Generate TanStack Query hooks file
      const tanstackQueryOutput = join(__dirname, '../tanstack-querys', `${baseName}.ts`)
      const tanstackQueryResult = await tanstackQuery(
        openAPI,
        tanstackQueryOutput,
        `../clients/${baseName}`,
        false,
      )
      if (!tanstackQueryResult.ok) {
        return {
          file,
          success: false,
          error: `TanStack Query generation error: ${tanstackQueryResult.error}`,
        }
      }

      // Generate Svelte Query hooks file
      const svelteQueryOutput = join(__dirname, '../svelte-querys', `${baseName}.ts`)
      const svelteQueryResult = await svelteQuery(
        openAPI,
        svelteQueryOutput,
        `../clients/${baseName}`,
        false,
      )
      if (!svelteQueryResult.ok) {
        return {
          file,
          success: false,
          error: `Svelte Query generation error: ${svelteQueryResult.error}`,
        }
      }

      // Generate Client file with simple hc pattern
      const clientOutput = join(__dirname, '../clients', `${baseName}.ts`)
      const clientCode = `import { hc } from 'hono/client'
import type routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
      await writeFile(clientOutput, clientCode)

      return { file, success: true }
    }),
  )

  const genFailures = generateResults.filter(
    (r): r is { file: string; success: false; error: string } => !r.success,
  )

  printFailures(
    genFailures,
    generateResults.length,
    'type/rpc/swr/tanstack-query/svelte-query files',
  )

  if (genFailures.length > 0) {
    process.exit(1)
  }

  console.log(
    `${generateResults.length} type/rpc/swr/tanstack-query/svelte-query sets generated successfully`,
  )
}

main()
