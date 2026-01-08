import { spawn } from 'node:child_process'
import { readdir, writeFile } from 'node:fs/promises'
import { availableParallelism } from 'node:os'
import path, { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'
import SwaggerParser from '@apidevtools/swagger-parser'
import { compile, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'
import { rpc } from 'hono-takibi/rpc'
import { type as generateType } from 'hono-takibi/type'

type OpenAPI = Parameters<typeof generateType>[0]

async function parseOpenAPI(
  input: string,
): Promise<
  { readonly ok: true; readonly value: OpenAPI } | { readonly ok: false; readonly error: string }
> {
  try {
    if (input.endsWith('.tsp')) {
      const program = await compile(NodeHost, path.resolve(input), {
        noEmit: true,
      })
      if (program.diagnostics.length) {
        return {
          ok: false,
          error: 'TypeSpec compile failed',
        }
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

const __dirname = dirname(fileURLToPath(import.meta.url))
const WORKERS = availableParallelism()

type Result = { file: string; success: true } | { file: string; success: false; stderr: string }

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
  const files = (await readdir(join(__dirname, '../openapi'))).filter((f) =>
    /\.(yaml|json|tsp)$/i.test(f),
  )

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

  if (routeFailures.length > 0) {
    console.error(`\n${routeFailures.length}/${routeResults.length} route files failed:\n`)
    for (const { file, stderr } of routeFailures) {
      console.error(`--- ${file} ---`)
      console.error(stderr || '(no stderr output)')
    }
    process.exit(1)
  }

  console.log(`${routeResults.length} routes generated successfully`)

  // Type, Client, RPC generation (parallel)
  console.log('Generating types, clients, and rpcs...')
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

      // Generate Client file
      const clientOutput = join(__dirname, '../clients', `${baseName}.ts`)
      const clientCode = `import { hc } from 'hono/client'
import routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
      await writeFile(clientOutput, clientCode)

      return { file, success: true }
    }),
  )

  const genFailures = generateResults.filter(
    (r): r is { file: string; success: false; error: string } => !r.success,
  )

  if (genFailures.length > 0) {
    console.error(`\n${genFailures.length}/${generateResults.length} files failed:\n`)
    for (const { file, error } of genFailures) {
      console.error(`--- ${file} ---`)
      console.error(error)
    }
    process.exit(1)
  }

  console.log(`${generateResults.length} type/rpc sets generated successfully`)
}

main()
