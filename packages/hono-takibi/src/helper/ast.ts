import type { Node, Program, Statement } from 'oxc-parser'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { isRecord, isSchemaArray } from '../guard/index.js'
import type { OpenAPI, Schema } from '../openapi/index.js'
import { cyclicNodes, decodePercent, ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'
import { discriminatedBranches } from './discriminator.js'
import { declarationOf, identifierNames, parseModule, textOf } from './syntax.js'
import { resolveSchemaRef } from './wire.js'

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
// A union in a request or response body of the document is emitted the same way, with the
// component schemas at hand, so the rest of the document is looked at too when it is given.
function findDiscriminatedBranches(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
  document?: OpenAPI,
) {
  const inDocument = document === undefined ? [] : unionNodes(document)
  return new Set(
    [...schemaNames.flatMap((n) => nestedSchemas(schemas[n])), ...inDocument]
      .flatMap((schema) => discriminatedBranches(schema, schemas) ?? [])
      .flatMap(({ name }) => (name === undefined ? [] : [name])),
  )
}

/** Every object under `node` that has a `oneOf` and a `discriminator`: a union the generator may route by key. */
function unionNodes(node: unknown): readonly Schema[] {
  if (Array.isArray(node)) return node.flatMap(unionNodes)
  if (!isRecord(node)) return []
  const below = Object.values(node).flatMap(unionNodes)
  return isDiscriminatedUnion(node) ? [node, ...below] : below
}

function isDiscriminatedUnion(node: { readonly [k: string]: unknown }): node is Schema {
  return Array.isArray(node.oneOf) && isRecord(node.discriminator)
}

/**
 * How deep a component schema nests before it is declared with an explicit type. A chain of
 * 15 components, each an object with a property of the next, makes `createRoute` instantiate
 * a type TypeScript gives up on (TS2589, #407); 14 do not. Past this depth a component is
 * annotated `z.ZodType<XType>`, as a recursive one is, so that what refers to it reads a
 * named type instead of the whole inferred one. Half the limit leaves room for what a route
 * and its handler add around the schema.
 */
const DEEP_SCHEMA_DEPTH = 8

/**
 * How many objects and arrays a value of the schema nests, at most: a property or an item is
 * one level deeper than the schema it belongs to, a member of `allOf` / `oneOf` / `anyOf`
 * is as deep as the schema itself, and a reference is as deep as the component it names. A
 * reference back into a component being measured is a cycle, which is typed in its own right.
 */
function schemaDepth(
  schema: Schema | boolean | undefined,
  schemas: { readonly [k: string]: Schema },
  depths: Map<string, number>,
  measuring: ReadonlySet<string>,
): number {
  if (schema === undefined || typeof schema === 'boolean') return 0
  if (schema.$ref !== undefined) {
    const name =
      resolveSchemaRef(schema.$ref, schemas) === undefined ? undefined : refName(schema.$ref)
    if (name === undefined || measuring.has(name)) return 0
    return componentDepth(name, schemas, depths, measuring)
  }
  const depth = (s: Schema | boolean | undefined) => schemaDepth(s, schemas, depths, measuring)
  const nested = [
    ...Object.values(schema.properties ?? {}),
    ...Object.values(schema.patternProperties ?? {}),
    ...(schema.prefixItems ?? []),
    ...(isSchemaArray(schema.items) ? schema.items : [schema.items]),
    schema.additionalProperties,
  ].map((s) => (s === undefined || typeof s === 'boolean' ? 0 : 1 + depth(s)))
  const beside = [...(schema.allOf ?? []), ...(schema.anyOf ?? []), ...(schema.oneOf ?? [])].map(
    depth,
  )
  return Math.max(0, ...nested, ...beside)
}

function componentDepth(
  name: string,
  schemas: { readonly [k: string]: Schema },
  depths: Map<string, number>,
  measuring: ReadonlySet<string>,
) {
  const known = depths.get(name)
  if (known !== undefined) return known
  const depth = schemaDepth(schemas[name], schemas, depths, new Set([...measuring, name]))
  depths.set(name, depth)
  return depth
}

function refName($ref: string) {
  const name = $ref.split('/').at(-1)
  return name === undefined ? undefined : decodePercent(name)
}

/** The component schemas nested at least `DEEP_SCHEMA_DEPTH` levels deep (#407). */
function findDeepSchemas(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
) {
  const depths = new Map<string, number>()
  return new Set(
    schemaNames.filter(
      (name) => componentDepth(name, schemas, depths, new Set()) >= DEEP_SCHEMA_DEPTH,
    ),
  )
}

export function analyzeCircularSchemas(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
  readonly?: boolean,
  // The whole document, when the components are generated as part of it.
  document?: OpenAPI,
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
    deepSchemas: findDeepSchemas(schemas, schemaNames),
    discriminatedBranches: findDiscriminatedBranches(schemas, schemaNames, document),
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
