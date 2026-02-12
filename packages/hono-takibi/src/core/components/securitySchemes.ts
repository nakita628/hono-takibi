import path from 'node:path'
import { makeExportConst } from '../../helper/code.js'
import { core, makeExports } from '../../helper/index.js'
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
  readonly?: boolean | undefined,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  if (!securitySchemes) return { ok: false, error: 'No securitySchemes found' }

  const keys = Object.keys(securitySchemes)
  if (keys.length === 0) return { ok: true, value: 'No securitySchemes found' }

  if (split) {
    const exportsResult = await makeExports(securitySchemes, 'SecurityScheme', output, readonly)
    if (!exportsResult.ok) return { ok: false, error: exportsResult.error }
    return { ok: true, value: exportsResult.value }
  }

  const code = makeExportConst(securitySchemes, 'SecurityScheme', readonly)
  const coreResult = await core(code, path.dirname(output), output)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }
  return { ok: true, value: `Generated securitySchemes code written to ${output}` }
}
