/**
 * Webhook component generation module.
 *
 * Handles generation of webhook exports from OpenAPI webhooks
 * with support for split mode.
 *
 * @module core/components/webhooks
 */
import path from 'node:path'
import { webhookCode } from '../../generator/zod-openapi-hono/openapi/webhooks/index.js'
import { core } from '../../helper/index.js'
import type { OpenAPI, PathItem } from '../../openapi/index.js'
import { lowerFirst } from '../../utils/index.js'

/**
 * Generates webhook component files.
 *
 * @param openapi - Full OpenAPI specification (webhooks are at top level)
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate webhooks in single file
 * await webhooks(
 *   openapiSpec,
 *   'src/webhooks.ts',
 *   false
 * )
 *
 * // Generate webhooks in split mode
 * await webhooks(
 *   openapiSpec,
 *   'src/webhooks',
 *   true
 * )
 * // Creates: src/webhooks/newOrder.ts, src/webhooks/orderStatusChanged.ts, src/webhooks/index.ts
 * ```
 */
export async function webhooks(
  openapi: OpenAPI,
  output: string,
  split: boolean,
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!openapi.webhooks) return { ok: false, error: 'No webhooks found' }

  const webhookEntries = Object.entries(openapi.webhooks)
  if (webhookEntries.length === 0) return { ok: true, value: 'No webhooks found' }

  if (split) {
    const outDir = output.replace(/\.ts$/, '')

    // Generate index.ts with exports
    const indexCode = `${webhookEntries
      .map(([name]) => `export * from './${lowerFirst(name)}.ts'`)
      .sort()
      .join('\n')}\n`

    // Generate individual webhook files
    const results = await Promise.all([
      ...webhookEntries.map(([name, pathItem]) => {
        // Create a minimal OpenAPI spec for this single webhook
        const singleWebhookOpenAPI = {
          ...openapi,
          webhooks: { [name]: pathItem },
        } as OpenAPI
        const code = `import{createRoute,z}from'@hono/zod-openapi'\n\n${webhookCode(singleWebhookOpenAPI, readonly)}\n`
        const filePath = path.join(outDir, `${lowerFirst(name)}.ts`)
        return core(code, path.dirname(filePath), filePath)
      }),
      core(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])

    const firstError = results.find((r) => !r.ok)
    if (firstError) return firstError

    return {
      ok: true,
      value: `Generated Webhook code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  // Single file mode
  const code = `import{createRoute,z}from'@hono/zod-openapi'\n\n${webhookCode(openapi, readonly)}\n`
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated webhooks code written to ${output}` }
}
