import { ts } from 'ts-morph'

import { zodToOpenAPI } from '../generator/zod-to-openapi/index.js'
import { isDiscriminableBranch, isRefOnly } from '../guard/index.js'
import type { Schema } from '../openapi/index.js'
import { cyclicNodes, ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'

function makeSourceFile(code: string) {
  return ts.createSourceFile('temp.ts', code, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)
}

function getChildren(node: ts.Node): readonly ts.Node[] {
  const syntaxChildren = node.getChildren()
  if (syntaxChildren.length > 0) return syntaxChildren
  const semanticChildren: ts.Node[] = [] as const
  ts.forEachChild(node, (child) => {
    semanticChildren[semanticChildren.length] = child
  })
  return semanticChildren
}

function collectIdentifiers(node: ts.Node): readonly string[] {
  const identifiers: string[] = []
  const visit = (n: ts.Node): void => {
    if (ts.isIdentifier(n)) identifiers.push(n.text)
    for (const child of getChildren(n)) {
      visit(child)
    }
  }
  visit(node)
  return identifiers
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

// A branch of a `z.discriminatedUnion` has to stay discriminable at the type level.
// A recursive branch is declared as `z.ZodType<XType>`, which erases `_zod.propValues`,
// so it also needs the `$ZodTypeDiscriminable` half of its annotation to stay a member.
function findDiscriminatedBranches(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
) {
  return new Set(
    schemaNames.flatMap((n) => {
      const schema = schemas[n]
      const discriminator = schema?.discriminator?.propertyName
      if (discriminator === undefined || schema?.oneOf === undefined) return []
      return schema.oneOf.flatMap((branch) => {
        if (!(isRefOnly(branch) && branch.$ref?.startsWith('#/components/schemas/'))) return []
        const name = decodeURIComponent(branch.$ref.slice('#/components/schemas/'.length))
        const target = schemas[name]
        return target && isDiscriminableBranch(target, discriminator) ? [name] : []
      })
    }),
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
  const batchedSource = makeSourceFile(
    schemaNames
      .map(
        (n) => `const ${toIdentifierPascalCase(ensureSuffix(n, 'Schema'))} = ${zSchemaMap.get(n)}`,
      )
      .join('\n'),
  )
  const initializerIdentifiers = new Map(
    batchedSource.statements.flatMap((statement) => {
      if (!ts.isVariableStatement(statement)) return []
      const declaration = statement.declarationList.declarations[0]
      if (!(declaration && ts.isIdentifier(declaration.name) && declaration.initializer)) return []
      return [[declaration.name.text, collectIdentifiers(declaration.initializer)] as const]
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
  kind: 'variable' | 'type' | 'interface',
) {
  return {
    name,
    fullText,
    refs,
    kind,
  } as const
}

function getDeclarationName(statement: ts.Statement) {
  if (ts.isVariableStatement(statement)) {
    const declaration = statement.declarationList.declarations[0]
    return declaration && ts.isIdentifier(declaration.name) ? declaration.name.text : undefined
  }
  if (ts.isTypeAliasDeclaration(statement)) {
    return statement.name.text
  }
  if (ts.isInterfaceDeclaration(statement)) {
    return statement.name.text
  }
  return undefined
}

function getDeclarationKind(statement: ts.Statement) {
  if (ts.isVariableStatement(statement)) return 'variable'
  if (ts.isTypeAliasDeclaration(statement)) return 'type'
  if (ts.isInterfaceDeclaration(statement)) return 'interface'
  return undefined
}

function isLazySchema(statement: ts.Statement) {
  if (!ts.isVariableStatement(statement)) return false
  const declaration = statement.declarationList.declarations[0]
  if (!declaration?.initializer) return false
  const initText = declaration.initializer.getText()
  return /^z\.lazy\s*\(/.test(initText)
}

function getStatementReferences(
  statement: ts.Statement,
  declNames: ReadonlySet<string>,
  selfName: string,
  selfKind: 'variable' | 'type' | 'interface',
) {
  if (isLazySchema(statement)) return [] as const
  const identifiers = collectIdentifiers(statement)
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

function parseStatements(sourceFile: ts.SourceFile) {
  const statements = sourceFile.statements.filter(
    (s) =>
      ts.isVariableStatement(s) || ts.isTypeAliasDeclaration(s) || ts.isInterfaceDeclaration(s),
  )
  const declNames = new Set(statements.map(getDeclarationName).filter((n) => n !== undefined))
  return statements
    .map((statement): ReturnType<typeof createDeclaration> | undefined => {
      const name = getDeclarationName(statement)
      const kind = getDeclarationKind(statement)
      if (!(name && kind)) return undefined
      const fullText = statement.getText(sourceFile)
      const refs = getStatementReferences(statement, declNames, name, kind)
      return createDeclaration(name, fullText, refs, kind)
    })
    .filter((d) => d !== undefined)
}

function makeKey(kind: 'variable' | 'type' | 'interface', name: string): string {
  return `${kind}:${name}`
}

function topoSort(
  decls: readonly {
    readonly name: string
    readonly fullText: string
    readonly refs: readonly string[]
    readonly kind: 'variable' | 'type' | 'interface'
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
  const sourceFile = makeSourceFile(code)
  const decls = parseStatements(sourceFile)
  if (decls.length === 0) return code
  return topoSort(decls)
    .map((d) => d.fullText)
    .join('\n\n')
}
