import { ast } from '../../../../helper/ast.js'
import { makeConst } from '../../../../helper/code.js'
import { makeRef } from '../../../../helper/openapi.js'
import type { Components } from '../../../../openapi/index.js'

/**
 * Generates TypeScript code for OpenAPI example components.
 *
 * Handles both inline examples and `$ref` references. When `$ref` is present,
 * sibling properties are ignored (per OpenAPI 3.0 spec) and a direct variable
 * reference is generated.
 *
 * @param components - OpenAPI components object
 * @param exportExamples - Whether to export the example constants
 * @param readonly - Whether to add `as const` assertion to example constants
 * @returns Generated TypeScript code string
 */
export function examplesCode(
  components: Components,
  exportExamples: boolean,
  readonly?: boolean | undefined,
): string {
  const { examples } = components
  if (!examples) return ''

  const hasRef = (v: unknown): v is { readonly $ref: string } =>
    typeof v === 'object' && v !== null && '$ref' in v && typeof v.$ref === 'string'

  const code = Object.keys(examples)
    .map((k) => {
      const example = examples[k]
      const asConst = readonly ? ' as const' : ''

      // $ref: generate variable reference (siblings ignored per OpenAPI 3.0 spec)
      if (hasRef(example)) {
        return `${makeConst(exportExamples, k, 'Example')}${makeRef(example.$ref)}${asConst}`
      }

      // Inline: serialize entire object
      return `${makeConst(exportExamples, k, 'Example')}${JSON.stringify(example)}${asConst}`
    })
    .join('\n\n')

  return ast(code)
}
