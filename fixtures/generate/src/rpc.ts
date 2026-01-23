import { join } from 'node:path'
import { rpc } from 'hono-takibi/rpc'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating rpcs...')
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

        const rpcOutput = join(__dirname, '../rpcs', `${baseName}.ts`)
        const rpcResult = await rpc(parseResult.value, rpcOutput, `../clients/${baseName}`, false)
        if (!rpcResult.ok) {
          return { ok: false, error: `${file}: RPC generation error: ${rpcResult.error}` }
        }

        return { ok: true, value: file }
      },
    ),
  )

  const failures = results.filter((r): r is { readonly ok: false; readonly error: string } => !r.ok)
  printFailures(failures, results.length, 'rpc files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} rpcs generated successfully`)
}

main()
