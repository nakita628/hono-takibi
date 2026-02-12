import path from 'node:path'
import { webhookCode } from '../../generator/zod-openapi-hono/openapi/webhooks/index.js'
import { core, makeImports } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

/**
 * Generates webhook files from OpenAPI specification.
 *
 * @param openAPI - OpenAPI specification object
 * @param webhooksConfig - Webhook output configuration
 * @param components - Component import configuration
 * @param readonly - Whether to add `as const` assertion to the output
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate webhooks in single file
 * await webhooks(openAPI, { output: 'src/webhooks.ts' })
 *
 * // Generate webhooks in split mode
 * await webhooks(openAPI, { output: 'src/webhooks', split: true })
 * // Creates: src/webhooks/newOrder.ts, src/webhooks/index.ts
 * ```
 */
export async function webhooks(
  openAPI: OpenAPI,
  webhooks?: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
  components?: {
    readonly [k: string]: {
      readonly output: string | `${string}.ts`
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!webhooks?.output) return { ok: false, error: 'webhooks.output is required' }
  if (!openAPI.webhooks) return { ok: false, error: 'No webhooks found' }

  const { output, split = false } = webhooks
  const webhooksSrc = webhookCode(openAPI, readonly)

  if (!webhooksSrc) return { ok: true, value: 'No webhooks found' }

  // Write a single webhook file
  const writeFile = async (filePath: string, src: string) => {
    const code = makeImports(src, filePath, components)
    const result = await core(code, path.dirname(filePath), filePath)
    return result.ok ? { ok: true as const, value: filePath } : result
  }

  // Non-split mode: single file
  if (!split) {
    const result = await writeFile(output, webhooksSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated webhooks code written to ${output}` }
  }

  // Split mode: extract webhook blocks from source
  const outDir = output.replace(/\.ts$/, '')
  const hits = Array.from(
    webhooksSrc.matchAll(/export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)Webhook\s*=/g),
  )
    .map((m) => ({ name: (m[1] ?? '').trim(), start: m.index ?? 0 }))
    .filter((h) => h.name.length > 0)
  const blocks = hits.map((h, i) => ({
    name: h.name,
    block: webhooksSrc.slice(h.start, hits[i + 1]?.start ?? webhooksSrc.length).trim(),
  }))

  // No blocks found: write as single file
  if (blocks.length === 0) {
    const result = await writeFile(String(output), webhooksSrc)
    if (!result.ok) return result
    return { ok: true, value: `Generated webhooks code written to ${output}` }
  }

  // Write each webhook block and barrel file in parallel
  const allResults = await Promise.all([
    ...blocks.map(({ name, block }) => writeFile(`${outDir}/${uncapitalize(name)}.ts`, block)),
    core(
      makeBarrel(Object.fromEntries(blocks.map((b) => [b.name, null]))),
      outDir,
      `${outDir}/index.ts`,
    ),
  ])

  const firstError = allResults.find((r) => !r.ok)
  if (firstError) return firstError

  return {
    ok: true,
    value: `Generated webhooks code written to ${outDir}/*.ts (index.ts included)`,
  }
}
