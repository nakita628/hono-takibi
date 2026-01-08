import { join } from 'node:path'
import { type as generateType } from 'hono-takibi/type'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures, type Result } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating types...')
  const results = await Promise.all(
    files.map(async (file): Promise<Result> => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
      const openAPIPath = join(__dirname, '../openapi', file)

      const parseResult = await parseOpenAPI(openAPIPath)
      if (!parseResult.ok) {
        return { file, success: false, error: `Parse error: ${parseResult.error}` }
      }

      const typeOutput = join(__dirname, '../types', `${baseName}.ts`) as `${string}.ts`
      const typeResult = await generateType(parseResult.value, typeOutput)
      if (!typeResult.ok) {
        return { file, success: false, error: `Type generation error: ${typeResult.error}` }
      }

      return { file, success: true }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'type files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} types generated successfully`)
}

main()
