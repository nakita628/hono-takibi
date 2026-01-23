import { join } from 'node:path'
import { tanstackQuery } from 'hono-takibi/tanstack-query'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating tanstack-query hooks...')
  const results = await Promise.all(
    files.map(
      async (
        file,
      ): Promise<
        | { readonly ok: true; readonly value: string }
        | { readonly ok: false; readonly error: string }
      > => {
        const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
        const openAPIPath = join(__dirname, '../openapi', file)

        const parseResult = await parseOpenAPI(openAPIPath)
        if (!parseResult.ok) {
          return { ok: false, error: `${file}: Parse error: ${parseResult.error}` }
        }

        const tanstackQueryOutput = join(__dirname, '../tanstack-querys', `${baseName}.ts`)
        const tanstackQueryResult = await tanstackQuery(
          parseResult.value,
          tanstackQueryOutput,
          `../clients/${baseName}`,
          false,
        )
        if (!tanstackQueryResult.ok) {
          return {
            ok: false,
            error: `${file}: TanStack Query generation error: ${tanstackQueryResult.error}`,
          }
        }

        return { ok: true, value: file }
      },
    ),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'tanstack-query files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} tanstack-query hooks generated successfully`)
}

main()
