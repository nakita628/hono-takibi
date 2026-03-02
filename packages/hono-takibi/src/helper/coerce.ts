const constraintPattern =
  /^(?:\.(?:min|max|gt|lt|positive|negative|nonnegative|nonpositive|multipleOf)\([^)]*\))*/

function pipeCoerce(coerceBase: string, typeBase: string, baseSchema: string): string {
  const afterType = baseSchema.slice(typeBase.length)
  const match = afterType.match(constraintPattern)
  const constraints = match ? match[0] : ''
  const rest = afterType.slice(constraints.length)
  return `${coerceBase}.pipe(${typeBase}${constraints})${rest}`
}

export function applyNumberCoerce(
  baseSchema: string,
  schemaType: string,
  format?: string,
): string {
  if (schemaType === 'number') {
    if (format === 'float' || format === 'float32')
      return pipeCoerce('z.coerce.number()', 'z.float32()', baseSchema)
    if (format === 'float64')
      return pipeCoerce('z.coerce.number()', 'z.float64()', baseSchema)
    return baseSchema.replace('z.number()', 'z.coerce.number()')
  }
  if (schemaType === 'integer') {
    if (format === 'int32')
      return pipeCoerce('z.coerce.number()', 'z.int32()', baseSchema)
    if (format === 'int64')
      return pipeCoerce('z.coerce.bigint()', 'z.int64()', baseSchema)
    if (format === 'bigint')
      return baseSchema.replace('z.bigint()', 'z.coerce.bigint()')
    return pipeCoerce('z.coerce.number()', 'z.int()', baseSchema)
  }
  return baseSchema
}
