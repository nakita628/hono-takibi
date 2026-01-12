/**
 * Zod schema wrapper with OpenAPI metadata.
 *
 * Wraps generated Zod schemas with OpenAPI-specific metadata
 * like default values, nullable, and custom openapi() properties.
 *
 * ```mermaid
 * flowchart LR
 *   A["Base Zod schema"] --> B["wrap()"]
 *   B --> C["Add .default()"]
 *   C --> D["Add .nullable()"]
 *   D --> E["Add .openapi({...})"]
 *   E --> F["Final schema string"]
 * ```
 *
 * @module helper/wrap
 */
import type { Header, Parameter, Schema } from '../openapi/index.js'
import { makeExamples } from './openapi.js'

/**
 * Wraps a Zod schema string with OpenAPI metadata.
 *
 * Applies default values, nullable modifiers, and OpenAPI-specific
 * properties to a base Zod schema string.
 *
 * ```mermaid
 * flowchart TD
 *   A["wrap(zod, schema, meta)"] --> B{"Has default?"}
 *   B -->|Yes| C["zod.default(value)"]
 *   B -->|No| D["zod"]
 *   C --> E{"Is nullable?"}
 *   D --> E
 *   E -->|Yes| F[".nullable()"]
 *   E -->|No| G["(unchanged)"]
 *   F --> H{"Has openapi props?"}
 *   G --> H
 *   H -->|Yes| I[".openapi({...})"]
 *   H -->|No| J["Return as-is"]
 * ```
 *
 * @param zod - Base Zod schema string (e.g., "z.string()")
 * @param schema - OpenAPI schema with metadata
 * @param meta - Optional parameter/header metadata
 * @returns Wrapped Zod schema string with modifiers
 *
 * @example
 * ```ts
 * wrap('z.string()', { default: 'hello', nullable: true })
 * // → 'z.string().default("hello").nullable()'
 *
 * wrap('z.number()', { description: 'User age' })
 * // → 'z.number().openapi({description:"User age"})'
 * ```
 */
export function wrap(
  zod: string,
  schema: Schema,
  meta?: {
    parameters?: Parameter
    headers?: Header
    isOptional?: boolean
  },
): string {
  // Properties not supported or causing type issues with zod-to-openapi
  const unsupportedProps = new Set([
    'contains',
    'minContains',
    'maxContains',
    'patternProperties',
    'dependentRequired',
    'dependentSchemas',
    'unevaluatedProperties',
    'unevaluatedItems',
    'if',
    'then',
    'else',
    'prefixItems',
    'propertyNames',
    'contentSchema',
    'contentEncoding',
    'contentMediaType',
    '$schema',
    '$id',
  ])

  // Type guard for objects with 'not' property
  const hasNotProperty = (v: unknown): v is { not: unknown } =>
    typeof v === 'object' && v !== null && 'not' in v

  const filterUnsupportedProps = (obj: unknown): unknown => {
    if (obj === null || typeof obj !== 'object') {
      return obj
    }
    if (Array.isArray(obj)) {
      return obj.map(filterUnsupportedProps)
    }
    const filtered: Record<string, unknown> = {}
    for (const [key, value] of Object.entries(obj)) {
      if (unsupportedProps.has(key)) {
        continue
      }
      // Filter out items if boolean or array (OpenAPI expects SchemaObject | ReferenceObject)
      if (key === 'items' && (typeof value === 'boolean' || Array.isArray(value))) {
        continue
      }
      // Filter out not.not (nested not with boolean)
      if (key === 'not' && hasNotProperty(value) && typeof value.not === 'boolean') {
        continue
      }
      // Convert non-string values in required array to strings (YAML may parse null/true/false as literals)
      if (key === 'required' && Array.isArray(value)) {
        filtered[key] = value.map((v) => (typeof v === 'string' ? v : String(v)))
        continue
      }
      filtered[key] = filterUnsupportedProps(value)
    }
    return filtered
  }

  const formatLiteral = (v: unknown): string => {
    /* boolean true or false */
    if (typeof v === 'boolean') {
      return `${v}`
    }
    /* number */
    if (typeof v === 'number') {
      if (schema.format === 'int64') {
        return `${v}n`
      }
      if (schema.format === 'bigint') {
        return `BigInt(${v})`
      }
      return `${v}`
    }
    /* date */
    if (schema.type === 'date' && typeof v === 'string') {
      return `new Date(${JSON.stringify(v)})`
    }
    /* string */
    if (typeof v === 'string') {
      return JSON.stringify(v)
    }
    /* other */
    return JSON.stringify(v)
  }

  /* why schema.default !== undefined becasue schema.default === 0  // → falsy */
  const s = schema.default !== undefined ? `${zod}.default(${formatLiteral(schema.default)})` : zod

  const isNullable =
    schema.nullable === true ||
    (Array.isArray(schema.type) ? schema.type.includes('null') : schema.type === 'null')

  const z = isNullable ? `${s}.nullable()` : s

  // zod method chain already expressed properties (to prevent double management)
  const zodExpressedProps = new Set([
    'type',
    'format',
    'default',
    'minLength',
    'maxLength',
    'minimum',
    'maximum',
    'exclusiveMinimum',
    'exclusiveMaximum',
    'pattern',
    'enum',
    'items',
    'minItems',
    'maxItems',
    'properties',
    'additionalProperties',
    'oneOf',
    'anyOf',
    'allOf',
    'multipleOf',
    'uniqueItems',
    'nullable',
    'const',
    '$ref',
  ])

  const baseArgs = Object.fromEntries(
    Object.entries(schema).filter(
      ([k, v]) => !(zodExpressedProps.has(k) || (k === 'required' && typeof v === 'boolean')),
    ),
  )
  const args = filterUnsupportedProps(baseArgs)

  const headerMetaProps = meta?.headers
    ? [
        meta.headers.description
          ? `description:${JSON.stringify(meta.headers.description)}`
          : undefined,
        // meta.headers.required ? `required:${JSON.stringify(meta.headers.required)}` : undefined,
        meta.headers.deprecated
          ? `deprecated:${JSON.stringify(meta.headers.deprecated)}`
          : undefined,
        meta.headers.example ? `example:${JSON.stringify(meta.headers.example)}` : undefined,
        meta.headers.examples ? `examples:${makeExamples(meta.headers.examples)}` : undefined,
        meta.headers.style ? `style:${JSON.stringify(meta.headers.style)}` : undefined,
        meta.headers.explode ? `explode:${JSON.stringify(meta.headers.explode)}` : undefined,
        // meta.headers.schema
        //   ? `schema:${JSON.stringify(meta.headers.schema)}`
        //   : undefined,
        meta.headers.content ? `content:${JSON.stringify(meta.headers.content)}` : undefined,
      ].filter((v) => v !== undefined)
    : []

  const openapiSchema = args ? JSON.stringify(args) : undefined
  // Strip outer braces from JSON object to embed directly in openapi({...}) call
  // e.g. '{"description":"foo"}' → '"description":"foo"'
  // This allows seamless integration with other openapi props like param:...
  // If empty object '{}' becomes '', which is filtered out below
  const openapiSchemaBody =
    openapiSchema?.startsWith('{') && openapiSchema?.endsWith('}')
      ? openapiSchema.slice(1, -1)
      : openapiSchema

  const isRecord = (v: unknown): v is Record<string, unknown> =>
    typeof v === 'object' && v !== null && !Array.isArray(v)

  /**
   * Serializes a media object with examples handled as code references.
   */
  const serializeMedia = (mediaObj: unknown): string => {
    if (!isRecord(mediaObj)) return JSON.stringify(mediaObj)
    const { examples: mediaExamples, ...mediaRest } = mediaObj
    const restEntries = Object.entries(mediaRest).map(
      ([k, v]) => `${JSON.stringify(k)}:${JSON.stringify(v)}`,
    )
    const examplesEntry = isRecord(mediaExamples)
      ? `"examples":${makeExamples(mediaExamples as Parameters<typeof makeExamples>[0])}`
      : undefined
    const entries = examplesEntry ? [...restEntries, examplesEntry] : restEntries
    return `{${entries.join(',')}}`
  }

  /**
   * Serializes content object with examples handled as code references.
   */
  const serializeContent = (content: Record<string, unknown>): string => {
    const entries = Object.entries(content).map(
      ([mediaType, mediaObj]) => `${JSON.stringify(mediaType)}:${serializeMedia(mediaObj)}`,
    )
    return `{${entries.join(',')}}`
  }

  /**
   * Serializes parameter object with examples as code references (not JSON strings).
   */
  const serializeParam = (param: Parameter): string => {
    const entries = Object.entries(param).map(([key, value]) => {
      if (key === 'examples' && isRecord(value)) {
        return `"examples":${makeExamples(value as Parameters<typeof makeExamples>[0])}`
      }
      if (key === 'content' && isRecord(value)) {
        return `"content":${serializeContent(value)}`
      }
      return `${JSON.stringify(key)}:${JSON.stringify(value)}`
    })
    return `{${entries.join(',')}}`
  }

  const openapiProps = [
    meta?.parameters ? `param:${serializeParam(meta.parameters)}` : undefined,
    ...headerMetaProps,
    openapiSchemaBody && openapiSchemaBody.length > 0 ? openapiSchemaBody : undefined,
  ].filter((v) => v !== undefined)

  // https://github.com/OAI/OpenAPI-Specification/issues/2385
  if (meta?.parameters || meta?.headers) {
    if (meta?.parameters?.required === true || meta?.headers?.required === true) {
      return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
    }
    return openapiProps.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${openapiProps.join(',')}})`
  }
  // Handle optional object properties
  if (meta?.isOptional === true) {
    return openapiProps.length === 0
      ? `${z}.exactOptional()`
      : `${z}.exactOptional().openapi({${openapiProps.join(',')}})`
  }
  return openapiProps.length === 0 ? z : `${z}.openapi({${openapiProps.join(',')}})`
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/wrap.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  describe('wrap', () => {
    describe('string', () => {
      it.concurrent('adds .default and .nullable for z.string() when default and nullable=true', () => {
        expect(
          wrap('z.string()', {
            type: 'string',
            default: 'test',
            nullable: true,
          }),
        ).toBe('z.string().default("test").nullable()')
      })

      it.concurrent('marks schema as nullable and adds default when type includes null', () => {
        expect(
          wrap('z.string()', {
            type: ['string', 'null'],
            default: 'test',
          }),
        ).toBe('z.string().default("test").nullable()')
      })
    })

    describe('number', () => {
      it.concurrent('adds .default and .nullable for z.number() when default and nullable=true', () => {
        expect(
          wrap('z.number()', {
            type: 'number',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.number().default(0).nullable()')
      })

      it.concurrent('marks schema as nullable and adds default when type includes null', () => {
        expect(
          wrap('z.number()', {
            type: ['number', 'null'],
            default: 0,
          }),
        ).toBe('z.number().default(0).nullable()')
      })
    })

    describe('int32', () => {
      it.concurrent('adds .default and .nullable for z.int32() with format int32 when default and nullable=true', () => {
        expect(
          wrap('z.int32()', {
            type: 'integer',
            format: 'int32',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.int32().default(0).nullable()')
      })

      it.concurrent('marks schema as nullable and adds default for z.int32() when type includes null', () => {
        expect(
          wrap('z.int32()', {
            type: ['integer', 'null'],
            format: 'int32',
            default: 0,
          }),
        ).toBe('z.int32().default(0).nullable()')
      })
    })

    describe('int64', () => {
      it.concurrent('converts default number to BigInt and adds .nullable for z.int64()', () => {
        expect(
          wrap('z.int64()', {
            type: 'integer',
            format: 'int64',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.int64().default(0n).nullable()')
      })

      it.concurrent('handles default number and marks schema nullable when type includes null', () => {
        expect(
          wrap('z.int64()', {
            type: ['integer', 'null'],
            format: 'int64',
            default: 0,
          }),
        ).toBe('z.int64().default(0n).nullable()')
      })

      it.concurrent('uses BigInt default and adds .nullable for z.int64()', () => {
        expect(
          wrap('z.int64()', {
            type: 'integer',
            format: 'int64',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.int64().default(0n).nullable()')
      })

      it.concurrent('uses BigInt default and marks schema nullable when type includes null', () => {
        expect(
          wrap('z.int64()', {
            type: ['integer', 'null'],
            format: 'int64',
            default: 0,
          }),
        ).toBe('z.int64().default(0n).nullable()')
      })
    })

    describe('bigint', () => {
      it.concurrent('adds .default with BigInt and .nullable for z.bigint()', () => {
        expect(
          wrap('z.bigint()', {
            type: 'integer',
            format: 'bigint',
            default: 0,
            nullable: true,
          }),
        ).toBe('z.bigint().default(BigInt(0)).nullable()')
      })

      it.concurrent('handles BigInt default and marks schema nullable when type includes null', () => {
        expect(
          wrap('z.bigint()', {
            type: ['integer', 'null'],
            format: 'bigint',
            default: 0,
          }),
        ).toBe('z.bigint().default(BigInt(0)).nullable()')
      })
    })

    describe('boolean', () => {
      it.concurrent('adds .default and .nullable for z.boolean() when default and nullable=true', () => {
        expect(
          wrap('z.boolean()', {
            type: 'boolean',
            default: true,
            nullable: true,
          }),
        ).toBe('z.boolean().default(true).nullable()')
      })

      it.concurrent('marks schema as nullable and adds default when type includes null', () => {
        expect(
          wrap('z.boolean()', {
            type: ['boolean', 'null'],
            default: true,
          }),
        ).toBe('z.boolean().default(true).nullable()')
      })
    })

    it('zodToOpenAPI not exists openapi()', () => {
      const result = wrap('z.string()', { type: 'string' })
      const expected = 'z.string()'
      expect(result).toBe(expected)
    })

    it('should include only example and description in order', () => {
      const result = wrap('z.string()', {
        type: 'string',
        example: 'hello',
        description: 'Example string',
      })
      const expected = 'z.string().openapi({"example":"hello","description":"Example string"})'
      expect(result).toBe(expected)
    })

    it('should insert param first when param info is provided', () => {
      const result = wrap(
        'z.string()',
        {
          type: 'string',
          example: 'uuid-example',
          description: 'UUID parameter',
        },
        {
          parameters: {
            name: 'id',
            in: 'path',
            // biome-ignore lint: test
          } as any,
        },
      )
      const expected =
        'z.string().exactOptional().openapi({param:{"name":"id","in":"path"},"example":"uuid-example","description":"UUID parameter"})'
      expect(result).toBe(expected)
    })

    it('should handle non-required query param correctly', () => {
      const result = wrap(
        'z.string()',
        {
          type: 'string',
          example: 'query-value',
          description: 'Optional query parameter',
        },
        {
          parameters: {
            name: 'q',
            in: 'query',
            // biome-ignore lint: test
          } as any,
        },
      )
      const expected =
        'z.string().exactOptional().openapi({param:{"name":"q","in":"query"},"example":"query-value","description":"Optional query parameter"})'
      expect(result).toBe(expected)
    })

    it('should handle non-required query param correctly when required is true', () => {
      const result = wrap(
        'z.string()',
        {
          type: 'string',
          example: 'query-value',
          description: 'Optional query parameter',
        },
        {
          parameters: {
            name: 'q',
            in: 'query',
            required: true,
            // biome-ignore lint: test
          } as any,
        },
      )
      const expected =
        'z.string().openapi({param:{"name":"q","in":"query","required":true},"example":"query-value","description":"Optional query parameter"})'
      expect(result).toBe(expected)
    })

    it('should insert only param if no example or description is given', () => {
      const result = wrap(
        'z.string()',
        { type: 'string' },
        // biome-ignore lint: test
        { parameters: { name: 'x', in: 'header' } as any },
      )
      const expected = 'z.string().exactOptional().openapi({param:{"name":"x","in":"header"}})'
      expect(result).toBe(expected)
    })

    it('should return examples', () => {
      const result = wrap(
        'z.string()',
        // biome-ignore lint/suspicious/noExplicitAny: test data
        { type: 'string', examples: ['example1', 'example2'] } as any,
      )
      const expected = 'z.string().openapi({"examples":["example1","example2"]})'
      expect(result).toBe(expected)
    })

    it('should resolve $ref in parameter examples', () => {
      const testParameter: Parameter = {
        name: 'id',
        in: 'path',
        required: true,
        schema: { type: 'string' },
        examples: {
          laptop: { $ref: '#/components/examples/LaptopId' },
          tshirt: { value: 'tshirt-123' },
        },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      const expected =
        'z.string().openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"string"},"examples":{"laptop":LaptopIdExample,"tshirt":{value:"tshirt-123"}}}})'
      expect(result).toBe(expected)
    })

    it('should handle Unicode characters in parameter examples', () => {
      const testParameter: Parameter = {
        name: 'filter',
        in: 'query',
        required: false,
        schema: { type: 'string' },
        examples: {
          japanese: { value: '日本語テスト' },
          emoji: { value: '🔥炎のテスト🔥' },
        },
      }
      const result = wrap('z.string()', { type: 'string' }, { parameters: testParameter })
      const expected =
        'z.string().exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"string"},"examples":{"japanese":{value:"日本語テスト"},"emoji":{value:"🔥炎のテスト🔥"}}}})'
      expect(result).toBe(expected)
    })

    it('should handle content with examples containing Unicode', () => {
      const testParameter: Parameter = {
        name: 'filter',
        in: 'query',
        required: false,
        schema: { type: 'object' },
        content: {
          'application/json': {
            schema: { type: 'object' },
            examples: {
              japanese: { value: { name: '田中太郎', description: '参照地獄テスト' } },
            },
          },
        },
      }
      const result = wrap('z.object({})', { type: 'object' }, { parameters: testParameter })
      const expected =
        'z.object({}).exactOptional().openapi({param:{"name":"filter","in":"query","required":false,"schema":{"type":"object"},"content":{"application/json":{"schema":{"type":"object"},"examples":{"japanese":{value:{"name":"田中太郎","description":"参照地獄テスト"}}}}}}})'
      expect(result).toBe(expected)
    })
  })
}
