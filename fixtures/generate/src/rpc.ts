import { join } from 'node:path'
import { rpc } from 'hono-takibi/rpc'
import { __dirname, getOpenAPIFiles, parseOpenAPI, printFailures, type Result } from './common'

async function main() {
  const files = await getOpenAPIFiles()

  console.log('Generating rpcs...')
  const results = await Promise.all(
    files.map(async (file): Promise<Result> => {
      const baseName = file.replace(/\.(yaml|json|tsp)$/i, '')
      const openAPIPath = join(__dirname, '../openapi', file)

      const parseResult = await parseOpenAPI(openAPIPath)
      if (!parseResult.ok) {
        return { file, success: false, error: `Parse error: ${parseResult.error}` }
      }

      const rpcOutput = join(__dirname, '../rpcs', `${baseName}.ts`)
      const rpcResult = await rpc(parseResult.value, rpcOutput, `../clients/${baseName}`, false)
      if (!rpcResult.ok) {
        return { file, success: false, error: `RPC generation error: ${rpcResult.error}` }
      }

      return { file, success: true }
    }),
  )

  const failures = results.filter((r): r is Extract<Result, { success: false }> => !r.success)
  printFailures(failures, results.length, 'rpc files')

  if (failures.length > 0) {
    process.exit(1)
  }

  console.log(`${results.length} rpcs generated successfully`)
}

main()
