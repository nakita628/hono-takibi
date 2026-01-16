import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'
import { __dirname, getOpenAPIFiles, printFailures, type Result } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating clients...')
  const results = await Promise.all(
    files.map(async (file): Promise<Result> => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')

      try {
        const clientOutput = join(__dirname, '../clients', `${baseName}.ts`)
        const clientCode = `import { hc } from 'hono/client'
import type routes from '../types/${baseName}'

export const client = hc<typeof routes>('/')
`
        await writeFile(clientOutput, clientCode)
        return { file, success: true }
      } catch (e) {
        return { file, success: false, error: e instanceof Error ? e.message : String(e) }
      }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'client files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} clients generated successfully`)
}

main()
