import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { vueQuery } from 'hono-takibi/vue-query'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures, WORKERS } from './common'

/* ─────────────────────────────── Main ─────────────────────────────── */

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating Vue Query hooks...')
  const queue = [...files]
  const results: (
    | { readonly ok: true; readonly value: string }
    | { readonly ok: false; readonly error: string }
  )[] = []

  await Promise.all(
    Array.from({ length: Math.min(WORKERS, files.length) }, async () => {
      while (queue.length > 0) {
        const file = queue.pop()
        if (!file) continue

        const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
        const openAPIPath = join(__dirname, '../openapi', file)

        const parseResult = await parseOpenAPI(openAPIPath)
        if (!parseResult.ok) {
          results.push({ ok: false, error: `${file}: Parse error: ${parseResult.error}` })
          continue
        }

        const openAPI = parseResult.value

        // Generate Vue Query hooks file
        const vueQueryOutput = join(__dirname, '../vue-querys', `${baseName}.ts`)
        const vueQueryResult = await vueQuery(
          openAPI,
          vueQueryOutput,
          `../clients/${baseName}`,
          false,
        )
        if (!vueQueryResult.ok) {
          results.push({
            ok: false,
            error: `${file}: Vue Query generation error: ${vueQueryResult.error}`,
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

        results.push({ ok: true, value: file })
      }
    }),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)

  printFailures(failures, results.length, 'vue-query files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} Vue Query sets generated successfully`)
}

main()
