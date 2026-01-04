import path from 'node:path'
import { core, makeBarell, makeFileCode, makeResponses } from '../helper/index.js'
import type { Components } from '../openapi/index.js'
import {
  ensureSuffix,
  findTokensBySuffix,
  lowerFirst,
  renderNamedImport,
  toIdentifierPascalCase,
} from '../utils/index.js'

/**
 * Makes import lines for examples and links.
 */
const makeExtraImports = (code: string, prefix: string): string => {
  const examples = findTokensBySuffix(code, 'Example')
  const links = findTokensBySuffix(code, 'Link')
  const importExamples =
    examples.length > 0 ? renderNamedImport(examples, `${prefix}/examples`) : ''
  const importLinks = links.length > 0 ? renderNamedImport(links, `${prefix}/links`) : ''
  return [importExamples, importLinks].filter(Boolean).join('\n')
}

/**
 * Generates `components.responses` constants (objects containing Zod schemas).
 */
export async function responses(
  components: Components,
  output: string | `${string}.ts`,
  split?: boolean,
): Promise<
  { readonly ok: true; readonly value: string } | { readonly ok: false; readonly error: string }
> {
  const { responses } = components
  if (!responses) return { ok: false, error: 'No responses found' }

  const makeOne = (key: string): { name: string; code: string } => {
    const res = responses[key]
    const expr = res ? makeResponses(res) : '{}'
    const name = toIdentifierPascalCase(ensureSuffix(key, 'Response'))
    return { name, code: `export const ${name} = ${expr}` }
  }

  if (split) {
    const outDir = String(output).replace(/\.ts$/, '')

    for (const key of Object.keys(responses)) {
      const one = makeOne(key)
      const filePath = path.join(outDir, `${lowerFirst(key)}.ts`)
      const baseCode = makeFileCode(one.code, '../schemas', 'HeaderSchema')
      const extraImports = makeExtraImports(one.code, '..')
      const fileCode = extraImports
        ? `${baseCode.split('\n')[0]}\n${extraImports}\n${baseCode.split('\n').slice(1).join('\n')}`
        : baseCode
      const coreResult = await core(fileCode, path.dirname(filePath), filePath)
      if (!coreResult.ok) return { ok: false, error: coreResult.error }
    }

    const coreResult = await core(
      makeBarell(responses),
      path.dirname(path.join(outDir, 'index.ts')),
      path.join(outDir, 'index.ts'),
    )
    if (!coreResult.ok) return { ok: false, error: coreResult.error }

    return {
      ok: true,
      value: `Generated responses code written to ${outDir}/*.ts (index.ts included)`,
    }
  }

  const defs = Object.keys(responses)
    .map((key) => {
      const res = responses[key]
      const expr = res ? makeResponses(res) : '{}'
      return `export const ${toIdentifierPascalCase(ensureSuffix(key, 'Response'))} = ${expr}`
    })
    .join('\n\n')

  const outFile = String(output)
  const baseCode = makeFileCode(defs, './schemas', 'HeaderSchema')
  const extraImports = makeExtraImports(defs, '.')
  const fileCode = extraImports
    ? `${baseCode.split('\n')[0]}\n${extraImports}\n${baseCode.split('\n').slice(1).join('\n')}`
    : baseCode
  const coreResult = await core(fileCode, path.dirname(outFile), outFile)
  if (!coreResult.ok) return { ok: false, error: coreResult.error }

  return { ok: true, value: `Generated responses code written to ${outFile}` }
}
