import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { __dirname, getOpenAPIFiles, printFailures } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating clients...')
  const results = await Promise.all(
    files.map(
      async (
        file,
      ): Promise<
        | { readonly ok: true; readonly value: string }
        | { readonly ok: false; readonly error: string }
      > => {
        const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')

        try {
          const clientOutput = join(__dirname, '../clients', `${baseName}.ts`)
          const clientCode = `import { hc } from 'hono/client'
import type routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
          await writeFile(clientOutput, clientCode)
          return { ok: true, value: file }
        } catch (e) {
          return { ok: false, error: `${file}: ${e instanceof Error ? e.message : String(e)}` }
        }
      },
    ),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'client files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} clients generated successfully`)
}

main()
