import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeExportConst } from '../../helper/code.js'
import { makeExports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'

/**
 * Generates securityScheme component files.
 *
 * @param securitySchemes - OpenAPI securitySchemes object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate securitySchemes in single file
 * await securitySchemes(
 *   { bearerAuth: { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' } },
 *   'src/securitySchemes.ts',
 *   false
 * )
 *
 * // Generate securitySchemes in split mode
 * await securitySchemes(
 *   { bearerAuth: {...}, apiKey: {...} },
 *   'src/securitySchemes',
 *   true
 * )
 * // Creates: src/securitySchemes/bearerAuth.ts, src/securitySchemes/apiKey.ts, src/securitySchemes/index.ts
 * ```
 */
export async function securitySchemes(
  securitySchemes: Components['securitySchemes'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  if (!securitySchemes) return { ok: false, error: 'No securitySchemes found' } as const
  const keys = Object.keys(securitySchemes)
  if (keys.length === 0) return { ok: true, value: 'No securitySchemes found' } as const
  if (split) {
    const exportsResult = await makeExports(securitySchemes, 'SecurityScheme', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error } as const
    return { ok: true, value: exportsResult.value } as const
  }
  const code = makeExportConst(securitySchemes, 'SecurityScheme', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated securitySchemes code written to ${output}` } as const
}
