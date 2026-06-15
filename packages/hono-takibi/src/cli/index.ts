import { existsSync } from 'node:fs'
import { resolve } from 'node:path'

import { readConfig } from '../config/index.js'
import { takibi } from '../core/index.js'
import { setFormatOptions } from '../format/index.js'
import { parseOpenAPI } from '../openapi/index.js'
import { makeJob } from '../shared/index.js'

const HELP_TEXT = `Usage: hono-takibi <input.{yaml,json,tsp}> -o <output.ts>

Options:
  -h, --help                  display help for command`

function parseCli(args: readonly string[]) {
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
      error: HELP_TEXT,
    } as const
  }
  return {
    ok: true,
    value: {
      input,
      output,
    },
  } as const
}

export async function honoTakibi() {
  const args = process.argv.slice(2)
  if (args.length === 1 && (args[0] === '--help' || args[0] === '-h')) {
    return { ok: true, value: HELP_TEXT } as const
  }
  const abs = resolve(process.cwd(), 'hono-takibi.config.ts')
  if (!existsSync(abs)) {
    const cliResult = parseCli(args)
    if (!cliResult.ok) return { ok: false, error: cliResult.error } as const
    const { input, output } = cliResult.value
    const openAPIResult = await parseOpenAPI(input)
    if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error } as const
    const openAPI = openAPIResult.value
    const takibiResult = await takibi(openAPI, output, {
      readonly: false,
      exportSchemas: false,
      exportSchemasTypes: false,
      exportResponses: false,
      exportParameters: false,
      exportParametersTypes: false,
      exportExamples: false,
      exportRequestBodies: false,
      exportHeaders: false,
      exportHeadersTypes: false,
      exportSecuritySchemes: false,
      exportLinks: false,
      exportCallbacks: false,
      exportPathItems: false,
      exportMediaTypes: false,
      exportMediaTypesTypes: false,
    })
    if (!takibiResult.ok) return { ok: false, error: takibiResult.error } as const
    return { ok: true, value: takibiResult.value } as const
  }
  const readConfigResult = await readConfig()
  if (!readConfigResult.ok) return { ok: false, error: readConfigResult.error } as const
  const config = readConfigResult.value
  if (config.format) setFormatOptions(config.format)
  const openAPIResult = await parseOpenAPI(config.input)
  if (!openAPIResult.ok) return { ok: false, error: openAPIResult.error } as const
  const openAPI = openAPIResult.value
  const jobs = makeJob(openAPI, config)
  const results = await Promise.all(jobs.map((job) => job.run(job.output)))
  const e = results.find((result) => !result.ok)
  if (e) return e
  const value = results
    .map((result) => (result.ok ? result.value : ''))
    .filter((v) => v !== '')
    .join('\n')
  return { ok: true, value } as const
}
