import { join } from 'node:path'
import { swr } from 'hono-takibi/swr'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures, type Result } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating swr hooks...')
  const results = await Promise.all(
    files.map(async (file): Promise<Result> => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
      const openAPIPath = join(__dirname, '../openapi', file)

      const parseResult = await parseOpenAPI(openAPIPath)
      if (!parseResult.ok) {
        return { file, success: false, error: `Parse error: ${parseResult.error}` }
      }

      const swrOutput = join(__dirname, '../swrs', `${baseName}.ts`)
      const swrResult = await swr(parseResult.value, swrOutput, `../clients/${baseName}`, false)
      if (!swrResult.ok) {
        return { file, success: false, error: `SWR generation error: ${swrResult.error}` }
      }

      return { file, success: true }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'swr files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} swr hooks generated successfully`)
}

main()
