import { createRoute, z } from '@hono/zod-openapi'

const Int32Schema = z
  .int32()
  .min(-2147483648)
  .max(2147483647)
  .openapi({ example: 42 })
  .openapi('Int32')

const Int64Schema = z
  .int64()
  .min(-9223372036854776000n)
  .max(9223372036854776000n)
  .openapi({ example: '-9223372036854776000n' })
  .openapi('Int64')

const BigIntSchema = z
  .bigint()
  .min(BigInt(-1e38))
  .max(BigInt(1e38))
  .openapi({ example: '123456789012345678901234567890n' })
  .openapi('BigInt')

const Float32Schema = z
  .float32()
  .min(-3.4e38)
  .max(3.4e38)
  .openapi({ example: 6.2831855 })
  .openapi('Float32')

const Float64Schema = z
  .float64()
  .min(-1.7e308)
  .max(1.7e308)
  .openapi({ example: 2.718281828459045 })
  .openapi('Float64')

const DecimalSchema = z
  .number()
  .min(-9999999999.9999)
  .max(9999999999.9999)
  .openapi({ example: 12345.6789 })
  .openapi('Decimal')

const NullableInt32Schema = z
  .int32()
  .min(-2147483648)
  .max(2147483647)
  .nullable()
  .openapi({ example: null })
  .openapi('NullableInt32')

const JwtTokenSchema = z
  .jwt()
  .min(20)
  .max(4096)
  .openapi({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9. eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikpv aG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ. TJVA95OrM7E2cBab30RMHrHDcEfxjoYZgeFONFh7HgQ\n',
  })
  .openapi('JwtToken')

const UuidV7Schema = z
  .uuidv7()
  .length(36)
  .openapi({ example: '018f38a8-fa52-7d23-b2d4-c2bb9e9a8c2e' })
  .openapi('UuidV7')

const Base64UrlSchema = z
  .base64url()
  .min(4)
  .max(8192)
  .openapi({ example: 'U2l6dWt1LUVuY29kZWQ' })
  .openapi('Base64Url')

const IsoDurationSchema = z.iso
  .duration()
  .min(3)
  .max(64)
  .openapi({ example: 'P3Y6M4DT12H30M5S' })
  .openapi('IsoDuration')

const ShortCodeSchema = z.string().min(3).max(8).openapi({ example: 'aB3x5' }).openapi('ShortCode')

const NullableShortCodeSchema = z
  .string()
  .min(3)
  .max(8)
  .nullable()
  .openapi({ example: null })
  .openapi('NullableShortCode')

const CustomFormatModelSchema = z
  .object({
    int32Value: Int32Schema,
    int64Value: Int64Schema,
    bigIntValue: BigIntSchema,
    float32Value: Float32Schema,
    float64Value: Float64Schema,
    decimalValue: DecimalSchema.optional(),
    jwtValue: JwtTokenSchema,
    uuidV7Value: UuidV7Schema.optional(),
    base64UrlValue: Base64UrlSchema.optional(),
    durationValue: IsoDurationSchema.optional(),
    shortCode: ShortCodeSchema.optional(),
    nullableInt32Value: NullableInt32Schema.optional(),
    nullableShortCode: NullableShortCodeSchema.optional(),
  })
  .openapi('CustomFormatModel')

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
