/**
 * Link component generation module.
 *
 * Handles generation of JSON exports from OpenAPI link components
 * with support for split mode.
 *
 * @module core/components/links
 */
import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

/**
 * Generates link component files.
 *
 * @param links - OpenAPI links object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate links in single file
 * await links(
 *   { GetUserById: { operationId: 'getUser', parameters: { userId: '$response.body#/id' } } },
 *   'src/links.ts',
 *   false
 * )
 *
 * // Generate links in split mode
 * await links(
 *   { GetUserById: {...}, GetPostById: {...} },
 *   'src/links',
 *   true
 * )
 * // Creates: src/links/getUserById.ts, src/links/getPostById.ts, src/links/index.ts
 * ```
 */
export async function links(
  links: Components['links'],
  output: string,
  split: boolean,
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!links) return { ok: false, error: 'No links found' }

  const keys = Object.keys(links)
  if (keys.length === 0) return { ok: true, value: 'No links found' }

  if (split) {
    const exportsResult = await makeExports(links, 'Link', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const code = makeExportConst(links, 'Link', readonly)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated links code written to ${output}` }
}
