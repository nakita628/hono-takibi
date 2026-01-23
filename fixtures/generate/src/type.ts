import { join } from 'node:path'
import { type as generateType } from 'hono-takibi/type'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating types...')
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

        const typeOutput = join(__dirname, '../types', `${baseName}.ts`) as `${string}.ts`
        const typeResult = await generateType(parseResult.value, typeOutput)
        if (!typeResult.ok) {
          return { ok: false, error: `${file}: Type generation error: ${typeResult.error}` }
        }

        return { ok: true, value: file }
      },
    ),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'type files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} types generated successfully`)
}

main()
