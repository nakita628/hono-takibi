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
  openapi?: string
  servers?: string | { url: string }[]
  components?: Components
} & {
  paths: OpenAPIPaths
}

/**
 * OpenAPI paths with PathItem definitions
 */
export type OpenAPIPaths = {
  [P in keyof NonNullable<BaseOpenAPI['paths']>]: PathItem
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
  [k: string]: {
    schema: Schemas
    example?: unknown
    examples?: {
      [k: string]: {
        summary?: string
        value?: unknown
        $ref?: string
      }
    }
  }
}

/**
 * Path item definition with HTTP methods and parameters
 */

export type PathItem = {
  summary?: string
  description?: string
  parameters?: string[]
} & {
  [Method in 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options' | 'trace']?: Operation
}

/**
 * Operation definition
 */
export type Operation = {
  tags?: string[]
  summary?: string
  description?: string
  operationId?: string
  security?: {
    [k: string]: string[]
  }[]
  parameters?: Parameters[]
  requestBody?: RequestBodies
  callbacks?: Record<string, unknown>
  responses: Responses
}

/**
 * Response definition with description and content
 */
export type ResponseDefinition = {
  description?: string
  content?: Content
  $ref?: string
  headers?: Headers
  links?: {
    [k: string]: {
      operationId?: string
      parameters?: Record<string, string>
      description?: string
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
  [k: string]: {
    description?: string
    schema: Schemas
    $ref?: Ref
  }
}

/**
 * Schema definition for OpenAPI
 */
export type Schemas = {
  name?: string
  description?: string
  type?: Type | [Type, ...Type[]]
  format?: Format
  pattern?: string
  minLength?: number
  maxLength?: number
  minimum?: number
  maximum?: number
  exclusiveMinimum?: number | boolean
  exclusiveMaximum?: number | boolean
  multipleOf?: number
  minItems?: number
  maxItems?: number
  default?: unknown
  example?: unknown
  examples?: unknown
  properties?: Record<string, Schemas>
  required?: string[] | boolean
  items?: Schemas
  enum?: (string | number | boolean | null | (string | number | boolean | null)[])[]
  nullable?: boolean
  additionalProperties?: Schemas | boolean
  $ref?: Ref
  xml?: {
    name?: string
    wrapped?: boolean
  }
  security?: {
    [k: string]: string[]
  }[]
  oneOf?: Schemas[]
  allOf?: Schemas[]
  anyOf?: Schemas[]
  not?: Schemas
  discriminator?: {
    propertyName?: string
  }
  externalDocs?: {
    url?: string
  }
  const?: unknown
}

/**
 * Components section of OpenAPI spec
 */
export type Components = {
  schemas?: Record<string, Schemas>
  parameters?: Record<string, Parameters>
  requestBodies?: Record<string, RequestBodies>
  responses?: Record<string, ResponseDefinition>
  headers?: Record<
    string,
    {
      required: boolean | undefined
      description?: string
      schema: Schemas
    }
  >
  examples?: Record<
    string,
    {
      summary?: string
      value?: unknown
      description?: string
    }
  >
  links?: Record<
    string,
    {
      operationId?: string
      parameters?: Record<string, string>
      description?: string
    }
  >
  callbacks?: Record<string, unknown>
  securitySchemes?: {
    [k: string]: {
      type?: string
      name?: string
      scheme?: string
      bearerFormat?: string
    }
  }
}

/**
 * Parameter definition
 */
export type Parameters = {
  schema: Schemas
  description?: string
  required?: boolean
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  style?: 'matrix' | 'label' | 'simple' | 'form' | 'spaceDelimited' | 'pipeDelimited' | 'deepObject'
  explode?: boolean
  $ref?: Ref
}

/**
 * Request body definition
 */
export type RequestBodies = {
  description?: string
  required?: boolean
  content?: Content
}
