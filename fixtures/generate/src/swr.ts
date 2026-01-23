import { join } from 'node:path'
import { swr } from 'hono-takibi/swr'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating swr hooks...')
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

        const swrOutput = join(__dirname, '../swrs', `${baseName}.ts`)
        const swrResult = await swr(parseResult.value, swrOutput, `../clients/${baseName}`, false)
        if (!swrResult.ok) {
          return { ok: false, error: `${file}: SWR generation error: ${swrResult.error}` }
        }

        return { ok: true, value: file }
      },
    ),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'swr files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} swr hooks generated successfully`)
}

main()
