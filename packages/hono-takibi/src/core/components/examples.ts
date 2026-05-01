import path from 'node:path'

import { emit } from '../../emit/index.js'
import { makeExportConst } from '../../helper/code.js'
import { makeRef } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase, uncapitalize } from '../../utils/index.js'

/**
 * Generates example component files.
 *
 * @param examples - OpenAPI examples object
 * @param output - Output file path or directory
 * @param split - Whether to split into multiple files
 * @param readonly - Whether to add `as const` assertion to the output.
 * @returns Promise resolving to success message or error
 *
 * @example
 * ```ts
 * // Generate examples in single file
 * await examples(
 *   { UserExample: { value: { id: 1, name: 'John' } } },
 *   'src/examples.ts',
 *   false
 * )
 *
 * // Generate examples in split mode
 * await examples(
 *   { UserExample: {...}, PostExample: {...} },
 *   'src/examples',
 *   true
 * )
 * // Creates: src/examples/userExample.ts, src/examples/postExample.ts, src/examples/index.ts
 * ```
 */
export async function examples(
  examples: Components['examples'],
  output: string,
  split: boolean,
  readonly?: boolean,
) {
  if (!examples) return { ok: false, error: 'No examples found' } as const
  const keys = Object.keys(examples)
  if (keys.length === 0) return { ok: true, value: 'No examples found' } as const
  const asConst = readonly ? ' as const' : ''
  if (split) {
    const outDir = output.replace(/\.ts$/, '')
    const indexCode = `${keys
      .sort()
      .map((v) => `export * from './${uncapitalize(v)}.ts'`)
      .join('\n')}\n`
    const results = await Promise.all([
      ...keys.map((k) => {
        const v = examples[k]
        const name = toIdentifierPascalCase(ensureSuffix(k, 'Example'))
        const filePath = path.join(outDir, `${uncapitalize(k)}.ts`)
        if (typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string') {
          const refName = makeRef(v.$ref)
          const refKey = v.$ref.split('/').at(-1) ?? ''
          const importPath = `./${uncapitalize(refKey)}.ts`
          const body = `import { ${refName} } from '${importPath}'\n\nexport const ${name} = ${refName}\n`
          return emit(body, path.dirname(filePath), filePath)
        }
        const body = `export const ${name} = ${JSON.stringify(v)}${asConst}\n`
        return emit(body, path.dirname(filePath), filePath)
      }),
      emit(indexCode, path.dirname(path.join(outDir, 'index.ts')), path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated Example code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const code = makeExportConst(examples, 'Example', readonly)
  const emitResult = await emit(code, path.dirname(output), output)
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated examples code written to ${output}` } as const
}
