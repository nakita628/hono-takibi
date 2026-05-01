import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeExportConst } from '../../helper/code.js'
import { makeExports } from '../../helper/index.js'
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
  readonly?: boolean,
) {
  if (!links) return { ok: false, error: 'No links found' } as const
  const keys = Object.keys(links)
  if (keys.length === 0) return { ok: true, value: 'No links found' } as const
  if (split) {
    const exportsResult = await makeExports(links, 'Link', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error } as const
    return { ok: true, value: exportsResult.value } as const
  }
  const code = makeExportConst(links, 'Link', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated links code written to ${output}` } as const
}
