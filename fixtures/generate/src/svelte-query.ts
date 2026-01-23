import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { svelteQuery } from 'hono-takibi/svelte-query'
import {
  __dirname,
  getOpenAPIFiles,
  parseOpenAPI,
  printFailures,
  type Result,
  WORKERS,
} from './common'

/* ─────────────────────────────── Main ─────────────────────────────── */

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating Svelte Query hooks...')
  const queue = [...files]
  const results: Result[] = []

  await Promise.all(
    Array.from({ length: Math.min(WORKERS, files.length) }, async () => {
      while (queue.length > 0) {
        const file = queue.pop()
        if (!file) continue

        const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
        const openAPIPath = join(__dirname, '../openapi', file)

        const parseResult = await parseOpenAPI(openAPIPath)
        if (!parseResult.ok) {
          results.push({ file, success: false, error: `Parse error: ${parseResult.error}` })
          continue
        }

        const openAPI = parseResult.value

        // Generate Svelte Query hooks file
        const svelteQueryOutput = join(__dirname, '../svelte-querys', `${baseName}.ts`)
        const svelteQueryResult = await svelteQuery(
          openAPI,
          svelteQueryOutput,
          `../clients/${baseName}`,
          false,
        )
        if (!svelteQueryResult.ok) {
          results.push({
            file,
            success: false,
            error: `Svelte Query generation error: ${svelteQueryResult.error}`,
          })
          continue
        }

        // Generate Client file with simple hc pattern
        const clientOutput = join(__dirname, '../clients', `${baseName}.ts`)
        const clientCode = `import { hc } from 'hono/client'
import type routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
        await writeFile(clientOutput, clientCode)

        results.push({ file, success: true })
      }
    }),
  )

  const failures = results.filter(
    (r): r is { file: string; success: false; error: string } => !r.success,
  )

  printFailures(failures, results.length, 'svelte-query files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} Svelte Query sets generated successfully`)
}

main()
