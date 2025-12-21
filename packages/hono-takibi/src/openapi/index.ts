import SwaggerParser from '@apidevtools/swagger-parser'
import { typeSpecToOpenAPI } from '../typespec/index.js'

/**
 * Parses input into an OpenAPI document and returns `{ ok, value | error }`.
 *
 * - If `input` ends with `.tsp`, it is first converted from TypeSpec to OpenAPI.
 * - Otherwise, it is parsed directly as an OpenAPI YAML/JSON string.
 *
 * ```mermaid
 * flowchart TD
 *   A["parseOpenAPI(input)"] --> B{"input endsWith '.tsp'?"}
 *   B -->|Yes| C["typeSpecToOpenAPI(input)"]
 *   C --> D{"tsp.ok?"}
 *   D -->|No| E["return { ok:false, error }"]
 *   D -->|Yes| F["SwaggerParser.bundle(tsp.value)"]
 *   F --> G["return { ok:true, value: OpenAPI }"]
 *   B -->|No| H["SwaggerParser.bundle(input)"]
 *   H --> I["return { ok:true, value: OpenAPI }"]
 *   A -.->|catch| J["return { ok:false, error }"]
 * ```
 *
 * Note: `SwaggerParser.parse` has a broad return type, so we assert
 * `as OpenAPI` after successful parsing to enable type-safe access
 * in downstream code.
 */
export async function parseOpenAPI(input: string): Promise<
  | {
      readonly ok: true
      readonly value: OpenAPI
    }
  | {
      readonly ok: false
      readonly error: string
    }
> {
  try {
    if (typeof input === 'string' && input.endsWith('.tsp')) {
      const tsp = await typeSpecToOpenAPI(input)
      if (!tsp.ok) {
        return { ok: false, error: tsp.error }
      }
      const spec = (await SwaggerParser.bundle(JSON.parse(JSON.stringify(tsp.value)))) as OpenAPI
      return { ok: true, value: spec }
    }
    // `Awaited<ReturnType<typeof SwaggerParser.parse>>` therefore cannot be narrowed to our `OpenAPI` type.
    // The parser validates the spec at runtime but does not express this guarantee in its type definition,
    // so we assert `OpenAPI` here to enable typed access in the generator.
    const spec = (await SwaggerParser.bundle(input)) as OpenAPI
    return { ok: true, value: spec }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Base OpenAPI type derived from SwaggerParser
 */
type BaseOpenAPI = Awaited<ReturnType<typeof SwaggerParser.bundle>>

/**
 * Extended OpenAPI specification with required components and paths
 */
export type OpenAPI = BaseOpenAPI & {
  readonly openapi?: string
  readonly servers?: string | readonly { readonly url: string }[]
  readonly components?: Components
} & {
  paths: OpenAPIPaths
}

/**
 * OpenAPI paths with PathItem definitions
 */
export type OpenAPIPaths = {
  readonly [P in keyof NonNullable<BaseOpenAPI['paths']>]: PathItem
}

/**
 * Data types supported in OpenAPI schemas
 */
export type Type =
  | 'string'
  | 'number'
  | 'integer'
  | 'date'
  | 'boolean'
  | 'array'
  | 'object'
  | 'null'

export type Format = FormatString | FormatNumber

/**
 * Format specifications for string types
 */
export type FormatString =
  // validations
  // | 'max'
  // | 'min'
  // | 'length'
  | 'email'
  | 'uuid'
  | 'uuidv4'
  | 'uuidv6'
  | 'uuidv7'
  | 'uri'
  | 'emoji'
  | 'base64'
  | 'base64url'
  | 'nanoid'
  | 'cuid'
  | 'cuid2'
  | 'ulid'
  | 'ipv4'
  | 'ipv6'
  | 'cidrv4'
  | 'cidrv6'
  | 'date' // ISO date format (YYYY-MM-DD)
  | 'time' // ISO time format (HH:mm:ss[.SSSSSS])
  | 'date-time' // ISO 8601; by default only `Z` timezone allowed
  | 'duration' // ISO 8601 duration
  | 'binary'
  // transforms
  | 'toLowerCase' // toLowerCase
  | 'toUpperCase' // toUpperCase
  | 'trim' // trim whitespace
  | 'jwt' // JSON Web Token

export type FormatNumber = 'int32' | 'int64' | 'bigint' | 'float' | 'float32' | 'float64' | 'double'

export type Ref =
  | `#/components/schemas/${string}`
  | `#/components/parameters/${string}`
  | `#/components/securitySchemes/${string}`
  | `#/components/requestBodies/${string}`
  | `#/components/responses/${string}`
  | `#/components/headers/${string}`
  | `#/components/examples/${string}`
  | `#/components/links/${string}`
  | `#/components/callbacks/${string}`

/**
 * Content type definitions with their schemas
 */

export type Content = {
  readonly [k: string]: {
    readonly schema: Schemas
    readonly example?: unknown
    readonly examples?: {
      readonly [k: string]: {
        readonly summary?: string
        readonly value?: unknown
        readonly $ref?: string
      }
    }
  }
}

/**
 * Path item definition with HTTP methods and parameters
 */

export type PathItem = {
  readonly summary?: string
  readonly description?: string
  readonly parameters?: readonly string[]
} & {
  [Method in 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace']?: Operation
}

/**
 * Operation definition
 */
export type Operation = {
  readonly tags?: readonly string[]
  readonly summary?: string
  readonly description?: string
  readonly operationId?: string
  readonly security?: {
    readonly [k: string]: readonly string[]
  }[]
  readonly parameters?: readonly Parameters[]
  readonly requestBody?: RequestBodies
  readonly callbacks?: Record<string, unknown>
  readonly responses: Responses
}

/**
 * Response definition with description and content
 */
export type ResponseDefinition = {
  description?: string
  content?: Content
  $ref?: string
  readonly headers?: Headers
  readonly links?: {
    readonly [k: string]: {
      readonly required?: boolean
      readonly operationId?: string
      readonly parameters?: Record<string, string>
      readonly description?: string
      $ref?: string
    }
  }
}

/**
 * Response object with status codes
 */
export type Responses = {
  [statusCode: string]: ResponseDefinition
}

export type Headers = {
  readonly [k: string]: {
    readonly description?: string
    readonly schema: Schemas
    readonly $ref?: Ref
  }
}

/**
 * Schema definition for OpenAPI
 */
export type Schemas = {
  readonly name?: string
  readonly description?: string
  readonly type?: Type | [Type, ...Type[]]
  readonly format?: Format
  readonly pattern?: string
  readonly minLength?: number
  readonly maxLength?: number
  readonly minimum?: number
  readonly maximum?: number
  readonly exclusiveMinimum?: number | boolean
  readonly exclusiveMaximum?: number | boolean
  readonly multipleOf?: number
  readonly minItems?: number
  readonly maxItems?: number
  readonly default?: unknown
  readonly example?: unknown
  readonly examples?: unknown
  readonly properties?: Record<string, Schemas>
  readonly required?: string[] | boolean
  readonly items?: Schemas
  readonly enum?: (string | number | boolean | null | (string | number | boolean | null)[])[]
  readonly nullable?: boolean
  readonly additionalProperties?: Schemas | boolean
  readonly $ref?: Ref
  readonly xml?: {
    readonly name?: string
    readonly wrapped?: boolean
  }
  readonly security?: {
    readonly [k: string]: readonly string[]
  }[]
  readonly oneOf?: readonly Schemas[]
  readonly allOf?: readonly Schemas[]
  readonly anyOf?: readonly Schemas[]
  readonly not?: Schemas
  readonly discriminator?: {
    readonly propertyName?: string
  }
  readonly externalDocs?: {
    readonly url: string
  }
  readonly const?: unknown
}

/**
 * Components section of OpenAPI spec
 */
export type Components = {
  readonly schemas?: Record<string, Schemas>
  readonly parameters?: Record<string, Parameters>
  readonly requestBodies?: Record<string, RequestBodies>
  readonly responses?: Record<string, ResponseDefinition>
  readonly headers?: Record<
    string,
    {
      readonly required: boolean | undefined
      readonly description?: string
      readonly schema: Schemas
    }
  >
  readonly examples?: Record<
    string,
    {
      readonly summary?: string
      readonly value?: unknown
      readonly description?: string
    }
  >
  readonly links?: Record<
    string,
    {
      readonly operationId?: string
      readonly parameters?: Record<string, string>
      readonly description?: string
    }
  >
  readonly callbacks?: Record<string, unknown>
  readonly securitySchemes?: {
    readonly [k: string]: {
      readonly type?: string
      readonly name?: string
      readonly scheme?: string
      readonly bearerFormat?: string
    }
  }
}

/**
 * Parameter definition
 */
export type Parameters = {
  readonly schema: Schemas
  readonly description?: string
  readonly required?: boolean
  readonly name: string
  readonly in: 'path' | 'query' | 'header' | 'cookie'
  readonly style?:
    | 'matrix'
    | 'label'
    | 'simple'
    | 'form'
    | 'spaceDelimited'
    | 'pipeDelimited'
    | 'deepObject'
  readonly explode?: boolean
  readonly $ref?: Ref
}

/**
 * Request body definition
 */
export type RequestBodies = {
  readonly description?: string
  readonly required?: boolean
  readonly content?: Content
}
