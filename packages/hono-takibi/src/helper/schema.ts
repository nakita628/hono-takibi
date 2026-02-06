import { zodType } from '../generator/zod-to-openapi/type/index.js'
import type { Schema } from '../openapi/index.js'
import {
  ensureSuffix,
  renderNamedImport,
  toIdentifierPascalCase,
  uncapitalize,
} from '../utils/index.js'
import type { analyzeCircularSchemas } from './ast.js'

/**
 * Creates metadata for a single OpenAPI schema.
 *
 * Analyzes the schema to determine if it requires lazy evaluation (for circular references)
 * or explicit type definitions.
 *
 * @param schemaName - The original name of the schema from OpenAPI spec.
 * @param schema - The OpenAPI schema object.
 * @param analysis - The result of circular dependency analysis.
 * @returns An object containing schema metadata including variable names and lazy/type flags.
 *
 * @example
 * ```ts
 * const info = makeSchemaInfo('User', userSchema, analysis)
 * // info.variableName → 'UserSchema'
 * // info.needsLazy → true if circular
 * ```
 */
export function makeSchemaInfo(
  schemaName: string,
  schema: Schema,
  analysis: ReturnType<typeof analyzeCircularSchemas>,
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

/**
 * Creates metadata for multiple OpenAPI schemas.
 *
 * @param schemas - Record of schema name to OpenAPI schema objects.
 * @param schemaNames - Array of schema names to process.
 * @param analysis - The result of circular dependency analysis.
 * @returns An array of schema metadata objects.
 *
 * @example
 * ```ts
 * const infos = makeSchemaInfos(schemas, ['User', 'Post'], analysis)
 * // Returns array of schema info objects
 * ```
 */
export function makeSchemaInfos(
  schemas: Record<string, Schema>,
  schemaNames: readonly string[],
  analysis: ReturnType<typeof analyzeCircularSchemas>,
): readonly ReturnType<typeof makeSchemaInfo>[] {
  return schemaNames.map((name) => makeSchemaInfo(name, schemas[name], analysis))
}

/**
 * Generates Zod schema code from schema metadata.
 *
 * Produces a schema constant with optional lazy wrapping for circular references,
 * optional readonly modifier, and optional type inference export.
 *
 * @param info - Schema metadata from `makeSchemaInfo`.
 * @param options - Generation options including export keyword, type export flag, and readonly flag.
 * @returns The generated Zod schema code string.
 *
 * @example
 * ```ts
 * makeSchemaCode(info, { exportKeyword: 'export ', exportType: true, readonly: false })
 * // → 'export const UserSchema = z.object({...}).openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 *
 * makeSchemaCode(info, { exportKeyword: 'export ', exportType: true, readonly: true })
 * // → 'export const UserSchema = z.object({...}).readonly().openapi("User")\n\nexport type User = z.infer<typeof UserSchema>'
 * ```
 */
export function makeSchemaCode(
  info: ReturnType<typeof makeSchemaInfo>,
  options: {
    readonly exportKeyword: string
    readonly exportType: boolean
    readonly readonly?: boolean | undefined
  },
): string {
  const zExpr = info.needsLazy ? `z.lazy(()=>${info.zSchema})` : info.zSchema
  const returnType = info.needsTypeDef ? `:z.ZodType<${info.safeSchemaName}Type>` : ''
  const readonlyModifier = options.readonly ? '.readonly()' : ''

  const schemaCode = `${options.exportKeyword}const ${info.variableName}${returnType}=${zExpr}${readonlyModifier}.openapi('${info.safeSchemaName}')`
  const zodInferCode = options.exportType
    ? `\n\nexport type ${info.safeSchemaName}=z.infer<typeof ${info.variableName}>`
    : ''

  return `${schemaCode}${zodInferCode}`
}

/**
 * Generates a TypeScript type definition for a schema.
 *
 * Used for schemas that require explicit type definitions (circular or extended cyclic).
 *
 * @param info - Schema metadata from `makeSchemaInfo`.
 * @param cyclicGroupPascal - Set of PascalCase names for cyclic schemas.
 * @param readonly - Whether to generate readonly array types.
 * @returns The generated TypeScript type definition string.
 *
 * @example
 * ```ts
 * makeTypeDefinition(info, cyclicGroupPascal)
 * // → 'type UserType = { name: string; posts: PostType[] }'
 *
 * makeTypeDefinition(info, cyclicGroupPascal, true)
 * // → 'type UserType = { name: string; posts: readonly PostType[] }'
 * ```
 */
export function makeTypeDefinition(
  info: ReturnType<typeof makeSchemaInfo>,
  cyclicGroupPascal: ReadonlySet<string>,
  readonly?: boolean,
): string {
  return zodType(info.schema, info.safeSchemaName, cyclicGroupPascal, readonly)
}

/**
 * Generates TypeScript type definitions for multiple schemas.
 *
 * Includes initial type definitions for schemas that need them,
 * plus additional definitions for any referenced types.
 *
 * @param infos - Array of schema metadata from `makeSchemaInfos`.
 * @param schemas - Record of schema name to OpenAPI schema objects.
 * @param cyclicGroupPascal - Set of PascalCase names for cyclic schemas.
 * @param readonly - Whether to generate readonly array types.
 * @returns An array of TypeScript type definition strings.
 *
 * @example
 * ```ts
 * makeTypeDefinitions(infos, schemas, cyclicGroupPascal)
 * // → ['type UserType = {...}', 'type PostType = {...}']
 * ```
 */
export function makeTypeDefinitions(
  infos: readonly ReturnType<typeof makeSchemaInfo>[],
  schemas: Record<string, Schema>,
  cyclicGroupPascal: ReadonlySet<string>,
  readonly?: boolean,
): readonly string[] {
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

  return [...initialTypeDefs, ...additionalTypeDefs]
}

/**
 * Finds schema references in generated code, excluding self-references.
 *
 * Searches for patterns like `UserSchema` and extracts the base name (`User`).
 *
 * @param code - The generated code to search.
 * @param selfName - The name of the current schema to exclude from results.
 * @returns An array of unique schema base names referenced in the code.
 *
 * @example
 * ```ts
 * findSchemaRefs('UserSchema, PostSchema, UserSchema', 'User')
 * // → ['Post']
 * ```
 */
export function findSchemaRefs(code: string, selfName: string): readonly string[] {
  const re = /\b([A-Za-z_$][A-Za-z0-9_$]*)Schema\b/g
  const found = new Set<string>()
  for (const m of code.matchAll(re)) {
    const base = m[1] ?? ''
    if (base && base !== selfName) found.add(base)
  }
  return [...found]
}

/**
 * Generates a complete split schema file content.
 *
 * Creates a standalone TypeScript file with imports, type definitions (if needed),
 * and the schema constant with OpenAPI registration.
 *
 * @param schemaName - The name of the schema.
 * @param schema - The OpenAPI schema object.
 * @param schemas - Record of all schemas for dependency resolution.
 * @param analysis - The result of circular dependency analysis.
 * @param exportType - Whether to export the inferred type alias.
 * @param readonly - Whether to add `.readonly()` modifier to the schema.
 * @returns The complete file content as a string.
 *
 * @example
 * ```ts
 * makeSplitSchemaFile('User', userSchema, schemas, analysis, true, false)
 * // → "import { z } from '@hono/zod-openapi'\nimport { PostSchema } from './post'\n\nexport const UserSchema = z.object({...}).openapi('User')\n\nexport type User = z.infer<typeof UserSchema>"
 *
 * makeSplitSchemaFile('User', userSchema, schemas, analysis, true, true)
 * // → "import { z } from '@hono/zod-openapi'\nimport { PostSchema } from './post'\n\nexport const UserSchema = z.object({...}).readonly().openapi('User')\n\nexport type User = z.infer<typeof UserSchema>"
 * ```
 */
export function makeSplitSchemaFile(
  schemaName: string,
  schema: Schema,
  schemas: Record<string, Schema>,
  analysis: ReturnType<typeof analyzeCircularSchemas>,
  exportType: boolean,
  readonly?: boolean,
): string {
  const info = makeSchemaInfo(schemaName, schema, analysis)

  const typeDefinition = info.needsTypeDef
    ? `${makeTypeDefinition(info, analysis.cyclicGroupPascal, readonly)}\n\n`
    : ''

  const schemaCode = makeSchemaCode(info, { exportKeyword: 'export ', exportType, readonly })
  const content = `${typeDefinition}${schemaCode}`

  const deps = findSchemaRefs(content, schemaName).filter((d) => d in schemas)
  const depImports =
    deps.length > 0
      ? deps.map((d) => renderNamedImport([`${d}Schema`], `./${uncapitalize(d)}`)).join('\n')
      : ''

  const importZ = renderNamedImport(['z'], '@hono/zod-openapi')
  return [importZ, depImports, '\n', content].filter(Boolean).join('\n')
}
