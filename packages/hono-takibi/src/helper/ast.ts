import type { Node, Program, Statement } from 'oxc-parser'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { isSchemaArray } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { cyclicNodes, ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'
import { discriminatedBranches } from './discriminator.js'
import { declarationOf, identifierNames, parseModule, textOf } from './syntax.js'

type DeclarationKind = 'variable' | 'type' | 'interface'

/** A top-level declaration the sort places: what it is named, what it is, and its statement. */
type Declared = {
  readonly name: string
  readonly kind: DeclarationKind
  readonly statement: Statement
  readonly initializer: Node | undefined
}

function declaredOf(statement: Statement): Declared | undefined {
  const { node } = declarationOf(statement)
  if (node.type === 'VariableDeclaration') {
    const [declaration] = node.declarations
    if (declaration?.id.type !== 'Identifier') return undefined
    return {
      name: declaration.id.name,
      kind: 'variable',
      statement,
      initializer: declaration.init ?? undefined,
    }
  }
  if (node.type === 'TSTypeAliasDeclaration') {
    return { name: node.id.name, kind: 'type', statement, initializer: undefined }
  }
  if (node.type === 'TSInterfaceDeclaration') {
    return { name: node.id.name, kind: 'interface', statement, initializer: undefined }
  }
  return undefined
}

function findCyclicSchemas(names: readonly string[], deps: ReadonlyMap<string, readonly string[]>) {
  const var2name = new Map(names.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]))
  const nameDeps = new Map(
    names.map((n) => [
      n,
      (deps.get(n) ?? []).map((v) => var2name.get(v)).filter((x) => x !== undefined),
    ]),
  )
  return cyclicNodes(nameDeps)
}

/** Every schema under `schema`, itself first: the shapes a schema nests another in. */
function nestedSchemas(schema: Schema | boolean | undefined): readonly Schema[] {
  if (schema === undefined || typeof schema === 'boolean') return []
  const items = isSchemaArray(schema.items) ? schema.items : [schema.items]
  const children: readonly (Schema | boolean | undefined)[] = [
    ...Object.values(schema.properties ?? {}),
    ...Object.values(schema.patternProperties ?? {}),
    ...(schema.prefixItems ?? []),
    ...items,
    schema.additionalProperties,
    ...(schema.allOf ?? []),
    ...(schema.anyOf ?? []),
    ...(schema.oneOf ?? []),
    schema.not,
  ]
  return [schema, ...children.flatMap(nestedSchemas)]
}

// A branch of a `z.discriminatedUnion` has to stay discriminable at the type level.
// A recursive branch is declared as `z.ZodType<XType>`, which erases `_zod.propValues`,
// so it also needs the `$ZodTypeDiscriminable` half of its annotation to stay a member.
// The union may sit anywhere in a component (`CompoundFilter.filters.items`), so every
// nested schema is looked at, and the same test decides as the one that emits the union.
function findDiscriminatedBranches(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
) {
  return new Set(
    schemaNames
      .flatMap((n) => nestedSchemas(schemas[n]))
      .flatMap((schema) => discriminatedBranches(schema, schemas) ?? [])
      .flatMap(({ name }) => (name === undefined ? [] : [name])),
  )
}

export function analyzeCircularSchemas(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
  readonly?: boolean,
) {
  const varNameSet = new Set(
    schemaNames.map((n) => toIdentifierPascalCase(ensureSuffix(n, 'Schema'))),
  )
  const varNameToName = new Map(
    schemaNames.map((n) => [toIdentifierPascalCase(ensureSuffix(n, 'Schema')), n]),
  )
  const zSchemaMap = new Map(
    schemaNames.map((n) => [
      n,
      zodToOpenAPI(schemas[n], undefined, {
        schemas,
        ...(readonly === true ? { readonly: true } : {}),
      }),
    ]),
  )
  const batched = parseModule(
    schemaNames
      .map(
        (n) => `const ${toIdentifierPascalCase(ensureSuffix(n, 'Schema'))} = ${zSchemaMap.get(n)}`,
      )
      .join('\n'),
  )
  const initializerIdentifiers = new Map(
    batched.body.flatMap((statement) => {
      const declared = declaredOf(statement)
      if (declared?.kind !== 'variable' || declared.initializer === undefined) return []
      return [[declared.name, identifierNames(declared.initializer)] as const]
    }),
  )
  const depsMap = new Map(
    schemaNames.map((n) => {
      const selfVar = toIdentifierPascalCase(ensureSuffix(n, 'Schema'))
      const identifiers = initializerIdentifiers.get(selfVar) ?? []
      return [
        n,
        [...new Set(identifiers.filter((id) => varNameSet.has(id)))].filter((v) => v !== selfVar),
      ]
    }),
  )
  const cyclicSchemas = findCyclicSchemas(schemaNames, depsMap)
  const extendedCyclicSchemas = new Set([
    ...cyclicSchemas,
    ...[...cyclicSchemas].flatMap((n) =>
      (depsMap.get(n) ?? []).map((v) => varNameToName.get(v)).filter((x) => x !== undefined),
    ),
  ])
  return {
    zSchemaMap,
    depsMap,
    cyclicSchemas,
    extendedCyclicSchemas,
    cyclicGroupPascal: new Set([...extendedCyclicSchemas].map(toIdentifierPascalCase)),
    discriminatedBranches: findDiscriminatedBranches(schemas, schemaNames),
    varNameToName,
  } as const
}

function createDeclaration(
  name: string,
  fullText: string,
  refs: readonly string[],
  kind: DeclarationKind,
) {
  return {
    name,
    fullText,
    refs,
    kind,
  } as const
}

function isLazySchema(code: string, declared: Declared) {
  if (declared.initializer === undefined) return false
  return /^z\.lazy\s*\(/u.test(textOf(code, declared.initializer))
}

function getStatementReferences(
  code: string,
  declared: Declared,
  declNames: ReadonlySet<string>,
  selfName: string,
  selfKind: DeclarationKind,
) {
  if (isLazySchema(code, declared)) return [] as const
  const identifiers = identifierNames(declared.statement)
  return [
    ...new Set(
      identifiers.filter((id) => {
        if (!declNames.has(id)) return false
        if (id === selfName && (selfKind === 'type' || selfKind === 'interface')) {
          return true
        }
        return id !== selfName
      }),
    ),
  ] as const
}

function parseStatements(code: string, program: Program) {
  const declared = program.body.map(declaredOf).filter((d) => d !== undefined)
  const declNames = new Set(declared.map((d) => d.name))
  return declared.map((d) =>
    createDeclaration(
      d.name,
      textOf(code, d.statement),
      getStatementReferences(code, d, declNames, d.name, d.kind),
      d.kind,
    ),
  )
}

function makeKey(kind: DeclarationKind, name: string) {
  return `${kind}:${name}`
}

function topoSort(
  decls: readonly {
    readonly name: string
    readonly fullText: string
    readonly refs: readonly string[]
    readonly kind: DeclarationKind
  }[],
) {
  const map = new Map(decls.map((d) => [makeKey(d.kind, d.name), d]))
  const findByName = (name: string): ReturnType<typeof createDeclaration> | undefined =>
    map.get(makeKey('variable', name)) ??
    map.get(makeKey('type', name)) ??
    map.get(makeKey('interface', name))
  const sorted: ReturnType<typeof createDeclaration>[] = []
  const perm = new Set<string>()
  const temp = new Set<string>()
  const visit = (key: string): void => {
    if (perm.has(key) || temp.has(key)) return
    const decl = map.get(key)
    if (!decl) return
    temp.add(key)
    for (const ref of decl.refs) {
      const found = findByName(ref)
      if (found) visit(makeKey(found.kind, found.name))
    }
    temp.delete(key)
    perm.add(key)
    sorted.push(decl)
  }
  for (const decl of decls) {
    visit(makeKey(decl.kind, decl.name))
  }
  return sorted
}

export function ast(code: string) {
  const decls = parseStatements(code, parseModule(code))
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}
