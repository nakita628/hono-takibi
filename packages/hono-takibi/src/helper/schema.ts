import { zodType } from '../generator/zod-to-openapi/type/index.js'
import type { Schema } from '../openapi/index.js'
import {
  ensureSuffix,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
} from '../utils/index.js'

export function makeSchemaInfo(
  schemaName: string,
  schema: Schema,
  analysis: {
    readonly zSchemaMap: ReadonlyMap<string, string>
    readonly depsMap: ReadonlyMap<string, readonly string[]>
    readonly cyclicSchemas: ReadonlySet<string>
    readonly extendedCyclicSchemas: ReadonlySet<string>
    readonly cyclicGroupPascal: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
  },
) {
  const zSchema = analysis.zSchemaMap.get(schemaName) ?? ''
  const safeSchemaName = toIdentifierPascalCase(schemaName)
  const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
  const isCircular = analysis.cyclicSchemas.has(schemaName)
  const isSelfReferencing = zSchema.includes(variableName)
  const needsLazy = isCircular || isSelfReferencing
  const needsTypeDef = needsLazy || analysis.extendedCyclicSchemas.has(schemaName)
  return {
    schemaName,
    schema,
    zSchema,
    safeSchemaName,
    variableName,
    needsLazy,
    needsTypeDef,
  } as const
}

export function makeSchemaInfos(
  schemas: { readonly [k: string]: Schema },
  schemaNames: readonly string[],
  analysis: {
    readonly zSchemaMap: ReadonlyMap<string, string>
    readonly depsMap: ReadonlyMap<string, readonly string[]>
    readonly cyclicSchemas: ReadonlySet<string>
    readonly extendedCyclicSchemas: ReadonlySet<string>
    readonly cyclicGroupPascal: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
  },
) {
  return schemaNames.map((name) => makeSchemaInfo(name, schemas[name], analysis))
}

export function makeSchemaCode(
  info: {
    readonly schemaName: string
    readonly schema: Schema
    readonly zSchema: string
    readonly safeSchemaName: string
    readonly variableName: string
    readonly needsLazy: boolean
    readonly needsTypeDef: boolean
  },
  options: {
    readonly exportKeyword: string
    readonly exportType: boolean
    readonly readonly?: boolean
  },
) {
  const zExpr = info.needsLazy ? `z.lazy(()=>${info.zSchema})` : info.zSchema
  const returnType = info.needsTypeDef ? `:z.ZodType<${info.safeSchemaName}Type>` : ''
  const schemaCode = `${options.exportKeyword}const ${info.variableName}${returnType}=${zExpr}.openapi('${info.safeSchemaName}')`
  const zodInferCode = options.exportType
    ? `\n\nexport type ${info.safeSchemaName}=z.infer<typeof ${info.variableName}>`
    : ''
  return `${schemaCode}${zodInferCode}`
}

export function makeTypeDefinition(
  info: {
    readonly schemaName: string
    readonly schema: Schema
    readonly zSchema: string
    readonly safeSchemaName: string
    readonly variableName: string
    readonly needsLazy: boolean
    readonly needsTypeDef: boolean
  },
  cyclicGroupPascal: ReadonlySet<string>,
  readonly?: boolean,
) {
  return zodType(info.schema, info.safeSchemaName, cyclicGroupPascal, readonly)
}

export function makeTypeDefinitions(
  infos: readonly {
    readonly schemaName: string
    readonly schema: Schema
    readonly zSchema: string
    readonly safeSchemaName: string
    readonly variableName: string
    readonly needsLazy: boolean
    readonly needsTypeDef: boolean
  }[],
  schemas: { readonly [k: string]: Schema },
  cyclicGroupPascal: ReadonlySet<string>,
  readonly?: boolean,
) {
  const initialTypeDefs = infos
    .filter((info) => info.needsTypeDef)
    .map((info) => makeTypeDefinition(info, cyclicGroupPascal, readonly))
  const generatedTypeNames = new Set(
    infos.filter((info) => info.needsTypeDef).map((info) => `${info.safeSchemaName}Type`),
  )
  const referencedTypes = new Set(
    initialTypeDefs.flatMap((typeDef) =>
      Array.from(typeDef.matchAll(/(\w+Type)\b/g), (match) => match[1]).filter(
        (t): t is string => t !== undefined,
      ),
    ),
  )
  const additionalTypeDefs = Array.from(referencedTypes)
    .filter((refType) => !generatedTypeNames.has(refType))
    .flatMap((refType) => {
      const schemaName = refType.replace(/Type$/, '')
      const schema = schemas[schemaName]
      return schema ? [zodType(schema, schemaName, cyclicGroupPascal, readonly)] : []
    })
  return [...initialTypeDefs, ...additionalTypeDefs] as const
}

export function findSchemaRefs(code: string, selfName: string) {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const found = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base && base !== selfName) found.add(base)
  }
  return [...found] as const
}

export function makeSplitSchemaFile(
  schemaName: string,
  schema: Schema,
  schemas: { readonly [k: string]: Schema },
  analysis: {
    readonly zSchemaMap: ReadonlyMap<string, string>
    readonly depsMap: ReadonlyMap<string, readonly string[]>
    readonly cyclicSchemas: ReadonlySet<string>
    readonly extendedCyclicSchemas: ReadonlySet<string>
    readonly cyclicGroupPascal: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
  },
  exportType: boolean,
  readonly?: boolean,
) {
  const info = makeSchemaInfo(schemaName, schema, analysis)
  const typeDefinition = info.needsTypeDef
    ? `${makeTypeDefinition(info, analysis.cyclicGroupPascal, readonly)}\n\n`
    : ''
  const schemaCode = makeSchemaCode(info, {
    exportKeyword: 'export ',
    exportType,
    ...(readonly !== undefined ? { readonly } : {}),
  })
  const content = `${typeDefinition}${schemaCode}`
  const deps = findSchemaRefs(content, schemaName).filter((d) => d in schemas)
  const depImports =
    deps.length > 0
      ? deps.map((d) => renderNamedImport([`${d}Schema`], `./${uncapitalize(d)}`)).join('\n')
      : ''
  const importZ = renderNamedImport(['z'], '@hono/zod-openapi')
  return [importZ, depImports, '\n', content].filter(Boolean).join('\n')
}
