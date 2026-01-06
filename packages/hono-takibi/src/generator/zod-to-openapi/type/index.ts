import type { Schema } from '../../../openapi/index.js'
import { toIdentifierPascalCase } from '../../../utils/index.js'

export function zodType(
  schema: Schema,
  typeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  // Check if this is a Record-like type (object with only additionalProperties)
  // For cyclic groups, use interface to support circular references
  const typeIsObject = Array.isArray(schema.type)
    ? schema.type.includes('object')
    : schema.type === 'object'
  const isRecordLike =
    typeIsObject &&
    schema.additionalProperties &&
    (!schema.properties || Object.keys(schema.properties).length === 0)

  if (cyclicGroup && cyclicGroup.size > 0 && isRecordLike) {
    const valueType = schemaToTypeString(
      typeof schema.additionalProperties === 'object' ? schema.additionalProperties : {},
      typeName,
      cyclicGroup,
    )
    return `interface ${typeName}Type{[key:string]:${valueType}}`
  }

  return `type ${typeName}Type=${schemaToTypeString(schema, typeName, cyclicGroup)}`
}

function schemaToTypeString(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (!schema) return 'unknown'

  if (schema.$ref) {
    // Handle nested property references (e.g., #/components/schemas/X/properties/Y)
    // These reference a property within a schema, use the parent schema type
    const propertiesMatch = schema.$ref.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
    if (propertiesMatch) {
      const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
      // Use Type suffix for self-reference or cyclic group members
      if (parentName === selfTypeName || cyclicGroup?.has(parentName)) {
        return `${parentName}Type`
      }
      return `z.infer<typeof ${parentName}Schema>`
    }
    const rawRef = schema.$ref.split('/').pop() ?? ''
    const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
    // Use Type suffix for self-reference or cyclic group members
    if (refName === selfTypeName || cyclicGroup?.has(refName)) {
      return `${refName}Type`
    }
    return `z.infer<typeof ${refName}Schema>`
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    const types = schema.oneOf
      .filter(Boolean)
      .map((s) => schemaToTypeString(s, selfTypeName, cyclicGroup))
    return types.length === 0 ? 'unknown' : types.length === 1 ? types[0] : `(${types.join('|')})`
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    const types = schema.anyOf
      .filter(Boolean)
      .map((s) => schemaToTypeString(s, selfTypeName, cyclicGroup))
    return types.length === 0 ? 'unknown' : types.length === 1 ? types[0] : `(${types.join('|')})`
  }

  if (schema.allOf && schema.allOf.length > 0) {
    const types = schema.allOf
      .filter(Boolean)
      .map((s) => schemaToTypeString(s, selfTypeName, cyclicGroup))
    return types.length === 0 ? 'unknown' : types.length === 1 ? types[0] : `(${types.join('&')})`
  }

  if (schema.enum && schema.enum.length > 0) {
    return schema.enum.map((v) => (typeof v === 'string' ? `'${v}'` : String(v))).join('|')
  }

  if (schema.const !== undefined) {
    return typeof schema.const === 'string' ? `'${schema.const}'` : String(schema.const)
  }

  const types = normalizeType(schema)
  const isNullable = schema.nullable === true || types.includes('null')
  const nonNullTypes = types.filter((t) => t !== 'null')
  const baseType = generateBaseType(schema, nonNullTypes, selfTypeName, cyclicGroup)

  return isNullable ? `(${baseType}|null)` : baseType
}

function normalizeType(schema: Schema): string[] {
  if (!schema.type) return ['object']
  return Array.isArray(schema.type) ? [...schema.type] : [schema.type]
}

function generateBaseType(
  schema: Schema,
  types: string[],
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (types.length > 1) {
    return types.map((t) => generateSingleType(schema, t, selfTypeName, cyclicGroup)).join('|')
  }
  return generateSingleType(schema, types[0] ?? 'object', selfTypeName, cyclicGroup)
}

function generateSingleType(
  schema: Schema,
  type: string,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  switch (type) {
    case 'string':
      return 'string'
    case 'number':
    case 'integer':
      return 'number'
    case 'boolean':
      return 'boolean'
    case 'null':
      return 'null'
    case 'array':
      return generateArrayType(schema, selfTypeName, cyclicGroup)
    case 'object':
      return generateObjectType(schema, selfTypeName, cyclicGroup)
    default:
      return 'unknown'
  }
}

function generateArrayType(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  if (!schema.items) return 'unknown[]'

  const items = schema.items
  const firstItem = items[0]

  // Multiple elements (tuple)
  if (items.length > 1) {
    return `[${items
      .filter(Boolean)
      .map((item) => schemaToTypeString(item, selfTypeName, cyclicGroup))
      .join(',')}]`
  }

  // Single element array
  if (firstItem !== undefined) {
    return `${schemaToTypeString(firstItem, selfTypeName, cyclicGroup)}[]`
  }

  // items[0] is undefined = items might be a Schema object (not an array)
  // Type says readonly Schema[] but runtime might be a single Schema
  // Use Object.getOwnPropertyDescriptor to access $ref without type assertion
  const refValue = Object.getOwnPropertyDescriptor(items, '$ref')?.value
  if (typeof refValue === 'string') {
    // Handle nested property references
    const propertiesMatch = refValue.match(/^#\/components\/schemas\/([^/]+)\/properties\//)
    if (propertiesMatch) {
      const parentName = toIdentifierPascalCase(decodeURIComponent(propertiesMatch[1]))
      // Use Type suffix for self-reference or cyclic group members
      if (parentName === selfTypeName || cyclicGroup?.has(parentName)) {
        return `${parentName}Type[]`
      }
      return `z.infer<typeof ${parentName}Schema>[]`
    }
    const rawRef = refValue.split('/').pop() ?? ''
    const refName = toIdentifierPascalCase(decodeURIComponent(rawRef))
    // Use Type suffix for self-reference or cyclic group members
    if (refName === selfTypeName || cyclicGroup?.has(refName)) {
      return `${refName}Type[]`
    }
    return `z.infer<typeof ${refName}Schema>[]`
  }

  return 'unknown[]'
}

function generateObjectType(
  schema: Schema,
  selfTypeName: string,
  cyclicGroup?: ReadonlySet<string>,
): string {
  const { properties, additionalProperties, required } = schema

  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === true) return '{[key:string]:unknown}'
    if (typeof additionalProperties === 'object') {
      return `{[key:string]:${schemaToTypeString(additionalProperties, selfTypeName, cyclicGroup)}}`
    }
    return '{[key:string]:unknown}'
  }

  const requiredSet = new Set(Array.isArray(required) ? required : [])

  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = schemaToTypeString(propSchema, selfTypeName, cyclicGroup)
    const isRequired = requiredSet.has(key)
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return `${safeKey}${isRequired ? '' : '?'}:${propType}`
  })

  // Note: Index signatures on interfaces with other properties need careful handling
  // For simplicity, we don't add them here as they conflict with typed properties
  if (additionalProperties === true || typeof additionalProperties === 'object') {
    // Skip adding index signature when there are typed properties
    // as it creates TypeScript compatibility issues
  }

  return `{${propertyStrings.join(';')}}`
}
