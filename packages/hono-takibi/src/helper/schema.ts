import { zodType } from '../generator/zod-to-openapi/type/index.js'
import type { Schema } from '../openapi/index.js'
import {
  ensureSuffix,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
} from '../utils/index.js'
import { identifierNames, parseModule } from './syntax.js'

export function makeSchemaInfo(
  schemaName: string,
  schema: Schema,
  analysis: {
    readonly zSchemaMap: ReadonlyMap<string, string>
    readonly depsMap: ReadonlyMap<string, readonly string[]>
    readonly cyclicSchemas: ReadonlySet<string>
    readonly extendedCyclicSchemas: ReadonlySet<string>
    readonly cyclicGroupPascal: ReadonlySet<string>
    readonly deepSchemas: ReadonlySet<string>
    readonly discriminatedBranches: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
    readonly selfReferencing: ReadonlySet<string>
  },
) {
  const zSchema = analysis.zSchemaMap.get(schemaName) ?? ''
  const safeSchemaName = toIdentifierPascalCase(schemaName)
  const variableName = toIdentifierPascalCase(ensureSuffix(schemaName, 'Schema'))
  const isCircular = analysis.cyclicSchemas.has(schemaName)
  // An identifier of the emitted code, as the parser read it: the name inside a description
  // is not a reference (#605).
  const needsLazy = isCircular || analysis.selfReferencing.has(schemaName)
  // A deeply nested component is typed by name too, so that what refers to it stays cheap to
  // infer (#407).
  const needsTypeDef =
    needsLazy ||
    analysis.extendedCyclicSchemas.has(schemaName) ||
    analysis.deepSchemas.has(schemaName)
  return {
    schemaName,
    schema,
    zSchema,
    safeSchemaName,
    variableName,
    needsLazy,
    needsTypeDef,
    isDiscriminatedBranch: analysis.discriminatedBranches.has(schemaName),
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
    readonly deepSchemas: ReadonlySet<string>
    readonly discriminatedBranches: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
    readonly selfReferencing: ReadonlySet<string>
  },
) {
  return schemaNames.map((name) => makeSchemaInfo(name, schemas[name] ?? {}, analysis))
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
    readonly isDiscriminatedBranch: boolean
  },
  options: {
    readonly exportKeyword: string
    readonly exportType: boolean
    readonly readonly?: boolean
  },
) {
  const zExpr = info.needsLazy ? `z.lazy(()=>${info.zSchema})` : info.zSchema
  // `z.ZodType<T>` erases `_zod.propValues`, which is how `z.discriminatedUnion`
  // routes; a branch that needs the annotation has to declare it back.
  const discriminable = info.isDiscriminatedBranch ? '&z.core.$ZodTypeDiscriminable' : ''
  const returnType = info.needsTypeDef
    ? `:z.ZodType<${info.safeSchemaName}Type>${discriminable}`
    : ''
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
  schemas?: { readonly [k: string]: Schema },
) {
  return zodType(info.schema, info.safeSchemaName, cyclicGroupPascal, readonly, schemas)
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
    .map((info) => makeTypeDefinition(info, cyclicGroupPascal, readonly, schemas))
  const generatedTypeNames = new Set(
    infos.filter((info) => info.needsTypeDef).map((info) => `${info.safeSchemaName}Type`),
  )
  const referencedTypes = new Set(
    initialTypeDefs.flatMap((typeDef) =>
      Array.from(typeDef.matchAll(/(\w+Type)\b/gu), (match) => match[1]).filter(
        (value): value is string => value !== undefined,
      ),
    ),
  )
  const additionalTypeDefs = [...referencedTypes]
    .filter((refType) => !generatedTypeNames.has(refType))
    .flatMap((refType) => {
      const schemaName = refType.replace(/Type$/u, '')
      const schema = schemas[schemaName]
      return schema ? [zodType(schema, schemaName, cyclicGroupPascal, readonly, schemas)] : []
    })
  return [...initialTypeDefs, ...additionalTypeDefs] as const
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
    readonly deepSchemas: ReadonlySet<string>
    readonly discriminatedBranches: ReadonlySet<string>
    readonly varNameToName: ReadonlyMap<string, string>
    readonly selfReferencing: ReadonlySet<string>
  },
  exportType: boolean,
  readonly?: boolean,
) {
  const info = makeSchemaInfo(schemaName, schema, analysis)
  const typeDefinition = info.needsTypeDef
    ? `${makeTypeDefinition(info, analysis.cyclicGroupPascal, readonly, schemas)}\n\n`
    : ''
  const schemaCode = makeSchemaCode(info, {
    exportKeyword: 'export ',
    exportType,
    ...(readonly !== undefined ? { readonly } : {}),
  })
  const content = `${typeDefinition}${schemaCode}`
  // The components the file names, read as identifiers and looked up by the name each was
  // declared under: `UserProfileSchema` is the component `user-profile`, in `./user-profile`
  // (#605).
  const deps = [...new Set(identifierNames(parseModule(content)))].flatMap((identifier) => {
    const dependency = analysis.varNameToName.get(identifier)
    return dependency === undefined || dependency === schemaName
      ? []
      : [renderNamedImport([identifier], `./${uncapitalize(dependency)}`)]
  })
  const depImports = deps.join('\n')
  const importZ = renderNamedImport(['z'], '@hono/zod-openapi')
  return [importZ, depImports, '\n', content].filter(Boolean).join('\n')
}
