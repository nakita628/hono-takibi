import { zodType } from '../generator/zod-to-openapi/type/index.js'
import type { Schema } from '../openapi/index.js'
import { ensureSuffix, toIdentifierPascalCase } from '../utils/index.js'
import type { CircularAnalysis } from './ast.js'

export function makeSchemaInfo(
  schemaName: string,
  schema: Schema,
  analysis: CircularAnalysis,
): {
  readonly schemaName: string
  readonly schema: Schema
  readonly zSchema: string
  readonly safeSchemaName: string
  readonly variableName: string
  readonly needsLazy: boolean
  readonly needsTypeDef: boolean
} {
  const zSchema = analysis.zSchemaMap.get(schemaName) ?? ''
  const safeSchemaName = toIdentifierPascalCase(schemaName)
  const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))

  const isCircular = analysis.cyclicSchemas.has(schemaName)
  const isSelfReferencing = zSchema.includes(variableName)
  const needsLazy = isCircular || isSelfReferencing
  const needsTypeDef = needsLazy || analysis.extendedCyclicSchemas.has(schemaName)

  return { schemaName, schema, zSchema, safeSchemaName, variableName, needsLazy, needsTypeDef }
}

export function makeSchemaInfos(
  schemas: Record<string, Schema>,
  schemaNames: readonly string[],
  analysis: CircularAnalysis,
): readonly ReturnType<typeof makeSchemaInfo>[] {
  return schemaNames.map((name) => makeSchemaInfo(name, schemas[name], analysis))
}

export function makeSchemaCode(
  info: ReturnType<typeof makeSchemaInfo>,
  options: { readonly exportKeyword: string; readonly exportType: boolean },
): string {
  const zExpr = info.needsLazy ? `z.lazy(() => ${info.zSchema})` : info.zSchema
  const returnType = info.needsTypeDef ? `:z.ZodType<${info.safeSchemaName}Type>` : ''

  const schemaCode = `${options.exportKeyword}const ${info.variableName}${returnType}=${zExpr}.openapi('${info.safeSchemaName}')`
  const zodInferCode = options.exportType
    ? `\n\nexport type ${info.safeSchemaName}=z.infer<typeof ${info.variableName}>`
    : ''

  return `${schemaCode}${zodInferCode}`
}

export function makeTypeDefinition(
  info: ReturnType<typeof makeSchemaInfo>,
  cyclicGroupPascal: ReadonlySet<string>,
): string {
  return zodType(info.schema, info.safeSchemaName, cyclicGroupPascal)
}

export function makeTypeDefinitions(
  infos: readonly ReturnType<typeof makeSchemaInfo>[],
  schemas: Record<string, Schema>,
  cyclicGroupPascal: ReadonlySet<string>,
): readonly string[] {
  const typeDefs: string[] = []
  const generatedTypeNames = new Set<string>()

  for (const info of infos) {
    if (info.needsTypeDef) {
      typeDefs.push(makeTypeDefinition(info, cyclicGroupPascal))
      generatedTypeNames.add(`${info.safeSchemaName}Type`)
    }
  }

  const referencedTypes = new Set<string>()
  for (const typeDef of typeDefs) {
    for (const match of typeDef.matchAll(/(\w+Type)\b/g)) {
      if (match[1]) referencedTypes.add(match[1])
    }
  }

  for (const refType of referencedTypes) {
    if (!generatedTypeNames.has(refType)) {
      const schemaName = refType.replace(/Type$/, '')
      const schema = schemas[schemaName]
      if (schema) {
        typeDefs.push(zodType(schema, schemaName, cyclicGroupPascal))
        generatedTypeNames.add(refType)
      }
    }
  }

  return typeDefs
}
