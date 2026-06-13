import path from 'node:path'

import { ensureSuffix, renderNamedImport, toIdentifierPascalCase } from '../utils/index.js'

export function makeModuleSpec(
  fromFile: string,
  target: { readonly output: string; readonly split?: boolean },
) {
  const rel = path.relative(path.dirname(fromFile), target.output).replace(/\\/g, '/')
  const stripped = rel.replace(/\.ts$/, '').replace(/\/index$/, '')
  return stripped === '' ? '.' : stripped.startsWith('.') ? stripped : `./${stripped}`
}

export function makeConst(exportVariable: boolean, text: string, suffix: string) {
  return `${exportVariable ? 'export const ' : 'const '}${toIdentifierPascalCase(ensureSuffix(text, suffix))}=`
}

export function makeExportConst(
  value: { readonly [k: string]: unknown },
  suffix: string,
  readonly?: boolean,
) {
  const asConst = readonly ? ' as const' : ''
  return Object.keys(value)
    .map(
      (k) =>
        `export const ${toIdentifierPascalCase(ensureSuffix(k, suffix))}=${JSON.stringify(value[k])}${asConst}`,
    )
    .join('\n\n')
}

const JS_IDENT = '[A-Za-z_$][A-Za-z0-9_$]*'
const EXPORT_CONST_PATTERN = /export\s+const\s+([A-Za-z_$][A-Za-z0-9_$]*)/g

// OpenAPI 3.0/3.1/3.2 Components Object fields → identifier suffix used in generated code.
// `classifyRef` picks the longest match so `*ParamsSchema` is parameters, not schemas.
// @see https://spec.openapis.org/oas/v3.2.0.html#components-object
const COMPONENT_SUFFIXES = [
  ['schemas', 'Schema'],
  ['responses', 'Response'],
  ['parameters', 'ParamsSchema'],
  ['examples', 'Example'],
  ['requestBodies', 'RequestBody'],
  ['headers', 'HeaderSchema'],
  ['securitySchemes', 'SecurityScheme'],
  ['links', 'Link'],
  ['callbacks', 'Callback'],
  ['pathItems', 'PathItem'],
  ['mediaTypes', 'MediaTypeSchema'],
] as const

// String/comment alternatives consume their content whole so identifier-shape
// tokens inside (e.g. `'userCreatedCallback'`) don't get captured.
const SCAN = new RegExp(
  [
    String.raw`"(?:\\.|[^"\\])*"`,
    String.raw`'(?:\\.|[^'\\])*'`,
    String.raw`\`(?:\\.|[^\`\\])*\``,
    String.raw`//[^\n]*`,
    String.raw`/\*[\s\S]*?\*/`,
    `\\b(${JS_IDENT}(?:${COMPONENT_SUFFIXES.map(([, suf]) => suf).join('|')}))\\b`,
  ].join('|'),
  'g',
)

const classifyRef = (name: string): string | undefined =>
  COMPONENT_SUFFIXES.reduce<readonly [string, string] | undefined>(
    (best, entry) =>
      name.endsWith(entry[1]) && (!best || entry[1].length > best[1].length) ? entry : best,
    undefined,
  )?.[0]

export function makeImports(
  code: string,
  fromFile: string,
  components:
    | {
        readonly [k: string]: {
          readonly output: string
          readonly split?: boolean
          readonly import?: string
        }
      }
    | undefined,
  split = false,
  honoExtras: readonly string[] = [],
) {
  const fallbackPrefix = split ? '..' : '.'
  const resolvePath = (k: string): string => {
    const target = components?.[k]
    return target?.import ?? (target ? makeModuleSpec(fromFile, target) : `${fallbackPrefix}/${k}`)
  }
  const defined = new Set(
    Array.from(code.matchAll(EXPORT_CONST_PATTERN), (m) => m[1]).filter(Boolean),
  )
  const grouped = Array.from(code.matchAll(SCAN), (m) => m[1])
    .filter((name): name is string => Boolean(name) && !defined.has(name))
    .reduce<ReadonlyMap<string, ReadonlySet<string>>>((acc, name) => {
      const kind = classifyRef(name)
      if (!kind) return acc
      return new Map(acc).set(kind, new Set([...(acc.get(kind) ?? []), name]))
    }, new Map())
  const needsCreateRoute = code.includes('createRoute(')
  const needsZ = code.includes('z.')
  const honoImports = [needsCreateRoute && 'createRoute', ...honoExtras, needsZ && 'z'].filter(
    Boolean,
  )
  const honoLine =
    honoImports.length > 0 ? `import{${honoImports.join(',')}}from'@hono/zod-openapi'` : ''
  // Emit import lines in `COMPONENT_SUFFIXES` declaration order — same as
  // the OpenAPI 3.x components / hono-takibi config field order — instead
  // of scan-encounter order which varies with source layout.
  const componentImports = COMPONENT_SUFFIXES.flatMap(([kind]) => {
    const names = grouped.get(kind)
    return names ? [renderNamedImport([...names].toSorted(), resolvePath(kind))] : []
  })
  return [honoLine, ...componentImports, '\n', code, ''].filter(Boolean).join('\n')
}
