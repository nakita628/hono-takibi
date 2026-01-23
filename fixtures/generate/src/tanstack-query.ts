import { join } from 'node:path'
import { tanstackQuery } from 'hono-takibi/tanstack-query'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures, type Result } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating tanstack-query hooks...')
  const results = await Promise.all(
    files.map(async (file): Promise<Result> => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
      const openAPIPath = join(__dirname, '../openapi', file)

      const parseResult = await parseOpenAPI(openAPIPath)
      if (!parseResult.ok) {
        return { file, success: false, error: `Parse error: ${parseResult.error}` }
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
          file,
          success: false,
          error: `TanStack Query generation error: ${tanstackQueryResult.error}`,
        }
      }

      return { file, success: true }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'tanstack-query files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} tanstack-query hooks generated successfully`)
}

main()
