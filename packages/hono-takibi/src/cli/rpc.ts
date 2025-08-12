import path from 'node:path'
import { fmt } from '../format/index.js'
import { mkdir, writeFile } from '../fsp/index.js'
import { honoRpc } from '../generator/rpc/index.js'
import { parseOpenAPI } from '../openapi/index.js'

const HELP_TEXT = 'Usage: hono-takibi-rpc <input.{yaml,json,tsp}> -o <rpc.ts>'

export async function honoTakibiRpc() {
  // Slice the arguments to remove the first two (node and script path)
  const args = process.argv.slice(2)
  const isHelpRequested = (args: readonly string[]): boolean => {
    return args.length === 1 && (args[0] === '--help' || args[0] === '-h')
  }
  if (isHelpRequested(args)) {
    return {
      ok: true,
      value: HELP_TEXT,
    }
  }

  const input = args[0]
  const oIdx = args.indexOf('-o')
  const output = oIdx !== -1 ? args[oIdx + 1] : undefined
  const isYamlOrJsonOrTsp = (
    i: string,
  ): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` =>
    i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
  const isTs = (o: string): o is `${string}.ts` => o.endsWith('.ts')
  if (!(input && output && isYamlOrJsonOrTsp(input) && isTs(output))) {
    return {
      ok: false,
      error: 'Usage: hono-takibi-rpc <input.{yaml,json,tsp}> -o <rpc.ts>',
    }
  }

  const openAPIResult = await parseOpenAPI(input)
  if (!openAPIResult.ok) {
    return { ok: false, error: openAPIResult.error }
  }
  const openAPI = openAPIResult.value
  const honoRpcResult = await fmt(honoRpc(openAPI))
  if (!honoRpcResult.ok) {
    return { ok: false, error: honoRpcResult.error }
  }
  const mkdirResult = await mkdir(path.dirname(output))
  if (!mkdirResult.ok) {
    return { ok: false, error: mkdirResult.error }
  }
  const writeResult = await writeFile(output, honoRpcResult.value)
  if (!writeResult.ok) {
    return { ok: false, error: writeResult.error }
  }
  return {
    ok: true,
    value: `Generated RPC code written to ${output}`,
  }
}
