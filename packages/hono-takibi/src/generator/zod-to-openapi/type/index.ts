import type { Schema } from '../../../openapi/index.js'

export function zodType(schema: Schema, typeName: string): string {
  return `type ${typeName}Type=${schemaToTypeString(schema, typeName)}`
}

function schemaToTypeString(schema: Schema, selfTypeName: string): string {
  if (schema.$ref) {
    const refName = schema.$ref.split('/').pop() ?? ''
    // Self-reference uses Type suffix, others use z.infer
    return refName === selfTypeName ? `${refName}Type` : `z.infer<typeof ${refName}Schema>`
  }

  if (schema.oneOf && schema.oneOf.length > 0) {
    const types = schema.oneOf.map((s) => schemaToTypeString(s, selfTypeName))
    return types.length === 1 ? types[0] : `(${types.join('|')})`
  }

  if (schema.anyOf && schema.anyOf.length > 0) {
    const types = schema.anyOf.map((s) => schemaToTypeString(s, selfTypeName))
    return types.length === 1 ? types[0] : `(${types.join('|')})`
  }

  if (schema.allOf && schema.allOf.length > 0) {
    const types = schema.allOf.map((s) => schemaToTypeString(s, selfTypeName))
    return types.length === 1 ? types[0] : `(${types.join('&')})`
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
  const baseType = generateBaseType(schema, nonNullTypes, selfTypeName)

  return isNullable ? `(${baseType}|null)` : baseType
}

function normalizeType(schema: Schema): string[] {
  if (!schema.type) return ['object']
  return Array.isArray(schema.type) ? [...schema.type] : [schema.type]
}

function generateBaseType(schema: Schema, types: string[], selfTypeName: string): string {
  if (types.length > 1) {
    return types.map((t) => generateSingleType(schema, t, selfTypeName)).join('|')
  }
  return generateSingleType(schema, types[0] ?? 'object', selfTypeName)
}

function generateSingleType(schema: Schema, type: string, selfTypeName: string): string {
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
      return generateArrayType(schema, selfTypeName)
    case 'object':
      return generateObjectType(schema, selfTypeName)
    default:
      return 'unknown'
  }
}

function generateArrayType(schema: Schema, selfTypeName: string): string {
  if (!schema.items) return 'unknown[]'
  if (Array.isArray(schema.items)) {
    return `[${schema.items.map((item) => schemaToTypeString(item, selfTypeName)).join(',')}]`
  }
  const itemType = schemaToTypeString(schema.items ? schema.items[0] : schema.items, selfTypeName)
  return `${itemType}[]`
}

function generateObjectType(schema: Schema, selfTypeName: string): string {
  const { properties, additionalProperties, required } = schema

  if (!properties || Object.keys(properties).length === 0) {
    if (additionalProperties === true) return 'Record<string,unknown>'
    if (typeof additionalProperties === 'object') {
      return `Record<string,${schemaToTypeString(additionalProperties, selfTypeName)}>`
    }
    return 'Record<string,unknown>'
  }

  const requiredSet = new Set(Array.isArray(required) ? required : [])

  const propertyStrings = Object.entries(properties).map(([key, propSchema]) => {
    const propType = schemaToTypeString(propSchema, selfTypeName)
    const isRequired = requiredSet.has(key)
    const safeKey = /^[a-zA-Z_$][a-zA-Z0-9_$]*$/.test(key) ? key : `'${key}'`
    return `${safeKey}${isRequired ? '' : '?'}:${propType}`
  })

  if (additionalProperties === true) {
    propertyStrings.push('[key:string]:unknown')
  } else if (typeof additionalProperties === 'object') {
    propertyStrings.push(`[key:string]:${schemaToTypeString(additionalProperties, selfTypeName)}`)
  }

  return `{${propertyStrings.join(';')}}`
}
