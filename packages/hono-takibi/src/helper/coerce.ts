export function coerce(schema: string, schemaType: string, format?: string) {
  const pipeCoerce = (coerceBase: string, type: string, schema: string) => {
    const afterType = schema.slice(type.length)
    const match = afterType.match(
      /^(?:\.(?:min|max|gt|lt|positive|negative|nonnegative|nonpositive|multipleOf)\([^)]*\))*/,
    )
    const constraints = match ? match[0] : ''
    const rest = afterType.slice(constraints.length)
    return `${coerceBase}.pipe(${type}${constraints})${rest}`
  }
  if (schemaType === 'number') {
    if (format === 'float' || format === 'float32') {
      return pipeCoerce('z.coerce.number()', 'z.float32()', schema)
    }
    if (format === 'float64') {
      return pipeCoerce('z.coerce.number()', 'z.float64()', schema)
    }
    return schema.replace('z.number()', 'z.coerce.number()')
  }
  if (schemaType === 'integer') {
    if (format === 'int32') return pipeCoerce('z.coerce.number()', 'z.int32()', schema)
    if (format === 'int64') return pipeCoerce('z.coerce.bigint()', 'z.int64()', schema)
    if (format === 'bigint') return schema.replace('z.bigint()', 'z.coerce.bigint()')
    return pipeCoerce('z.coerce.number()', 'z.int()', schema)
  }
  return schema
}
