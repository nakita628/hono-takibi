import { createRoute, z } from '@hono/zod-openapi'

const Int32Schema = z
  .int32()
  .min(-2147483648)
  .max(2147483647)
  .default(2147483647)
  .optional()
  .openapi({
    type: 'integer',
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    default: 2147483647,
    example: 42,
  })

const Int64Schema = z
  .int64()
  .min(-9223372036854776000n)
  .max(9223372036854776000n)
  .default(9223372036854776000n)
  .optional()
  .openapi({
    type: 'integer',
    format: 'int64',
    minimum: -9223372036854776000,
    maximum: 9223372036854776000,
    default: 9223372036854776000,
    example: '-9223372036854776000',
  })

const BigIntSchema = z
  .bigint()
  .min(BigInt(-1e38))
  .max(BigInt(1e38))
  .default(BigInt(1.2345678901234568e29))
  .optional()
  .openapi({
    type: 'integer',
    format: 'bigint',
    minimum: -1e38,
    maximum: 1e38,
    default: 1.2345678901234568e29,
    example: '123456789012345678901234567890',
  })

const Float32Schema = z
  .float32()
  .min(-3.4e38)
  .max(3.4e38)
  .default(3.1415927)
  .optional()
  .openapi({
    type: 'number',
    format: 'float32',
    minimum: -3.4e38,
    maximum: 3.4e38,
    default: 3.1415927,
    example: 6.2831855,
  })

const Float64Schema = z
  .float64()
  .min(-1.7e308)
  .max(1.7e308)
  .default(3.141592653589793)
  .optional()
  .openapi({
    type: 'number',
    format: 'float64',
    minimum: -1.7e308,
    maximum: 1.7e308,
    default: 3.141592653589793,
    example: 2.718281828459045,
  })

const DecimalSchema = z
  .number()
  .min(-9999999999.9999)
  .max(9999999999.9999)
  .default(9999999999.9999)
  .optional()
  .openapi({
    type: 'number',
    format: 'decimal',
    minimum: -9999999999.9999,
    maximum: 9999999999.9999,
    default: 9999999999.9999,
    example: 12345.6789,
  })

const NullableInt32Schema = z
  .int32()
  .min(-2147483648)
  .max(2147483647)
  .default(2147483647)
  .nullable()
  .optional()
  .openapi({
    type: ['integer', 'null'],
    format: 'int32',
    minimum: -2147483648,
    maximum: 2147483647,
    default: 2147483647,
    example: null,
  })

const JwtTokenSchema = z
  .jwt()
  .min(20)
  .max(4096)
  .optional()
  .openapi({
    type: 'string',
    format: 'jwt',
    minLength: 20,
    maxLength: 4096,
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv aG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ. TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\n',
  })

const UuidV7Schema = z
  .uuidv7()
  .length(36)
  .optional()
  .openapi({
    type: 'string',
    format: 'uuidv7',
    minLength: 36,
    maxLength: 36,
    example: '018f38a8-fa52-7d23-b2d4-c2bb9e9a8c2e',
  })

const Base64UrlSchema = z
  .base64url()
  .min(4)
  .max(8192)
  .optional()
  .openapi({
    type: 'string',
    format: 'base64url',
    minLength: 4,
    maxLength: 8192,
    example: 'U2l6dWt1LUVuY29kZWQ',
  })

const IsoDurationSchema = z.iso
  .duration()
  .min(3)
  .max(64)
  .optional()
  .openapi({
    type: 'string',
    format: 'duration',
    minLength: 3,
    maxLength: 64,
    example: 'P3Y6M4DT12H30M5S',
  })

const ShortCodeSchema = z
  .string()
  .min(3)
  .max(8)
  .optional()
  .openapi({ type: 'string', minLength: 3, maxLength: 8, example: 'aB3x5' })

const NullableShortCodeSchema = z
  .string()
  .min(3)
  .max(8)
  .nullable()
  .optional()
  .openapi({ type: ['string', 'null'], minLength: 3, maxLength: 8, example: null })

const CustomFormatModelSchema = z
  .object({
    int32Value: Int32Schema,
    int64Value: Int64Schema,
    bigIntValue: BigIntSchema,
    float32Value: Float32Schema,
    float64Value: Float64Schema,
    decimalValue: DecimalSchema,
    jwtValue: JwtTokenSchema,
    uuidV7Value: UuidV7Schema,
    base64UrlValue: Base64UrlSchema,
    durationValue: IsoDurationSchema,
    shortCode: ShortCodeSchema,
    nullableInt32Value: NullableInt32Schema,
    nullableShortCode: NullableShortCodeSchema,
  })
  .openapi({
    type: 'object',
    properties: {
      int32Value: { $ref: '#/components/schemas/Int32' },
      int64Value: { $ref: '#/components/schemas/Int64' },
      bigIntValue: { $ref: '#/components/schemas/BigInt' },
      float32Value: { $ref: '#/components/schemas/Float32' },
      float64Value: { $ref: '#/components/schemas/Float64' },
      decimalValue: { $ref: '#/components/schemas/Decimal' },
      jwtValue: { $ref: '#/components/schemas/JwtToken' },
      uuidV7Value: { $ref: '#/components/schemas/UuidV7' },
      base64UrlValue: { $ref: '#/components/schemas/Base64Url' },
      durationValue: { $ref: '#/components/schemas/IsoDuration' },
      shortCode: { $ref: '#/components/schemas/ShortCode' },
      nullableInt32Value: { $ref: '#/components/schemas/NullableInt32' },
      nullableShortCode: { $ref: '#/components/schemas/NullableShortCode' },
    },
    required: [
      'int32Value',
      'int64Value',
      'bigIntValue',
      'float32Value',
      'float64Value',
      'jwtValue',
    ],
  })

export const getSampleRoute = createRoute({
  method: 'get',
  path: '/sample',
  summary: 'Returns a payload exercising every custom format, constraint, and nullable case',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: CustomFormatModelSchema } },
    },
  },
})
