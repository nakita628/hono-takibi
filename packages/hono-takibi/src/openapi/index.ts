import SwaggerParser from '@apidevtools/swagger-parser'
import { typeSpecToOpenAPI } from '../typespec/index.js'

/**
 * Parses an OpenAPI document from a file path (YAML, JSON, or TypeSpec).
 *
 * @param input - File path to the OpenAPI or TypeSpec document
 * @returns A promise resolving to a Result with the parsed OpenAPI or error string
 */
export async function parseOpenAPI(input: string): Promise<
  | {
      ok: true
      value: OpenAPI
    }
  | {
      ok: false
      error: string
    }
> {
  try {
    if (typeof input === 'string' && input.endsWith('.tsp')) {
      const tsp = await typeSpecToOpenAPI(input)
      if (!tsp.ok) {
        return { ok: false, error: tsp.error }
      }
      const spec = (await SwaggerParser.parse(tsp.value as unknown as string)) as OpenAPI
      return { ok: true, value: spec }
    }
    const spec = (await SwaggerParser.parse(input)) as OpenAPI
    return { ok: true, value: spec }
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) }
  }
}

/**
 * Base OpenAPI type derived from SwaggerParser
 */
type BaseOpenAPI = Awaited<ReturnType<typeof SwaggerParser.parse>>

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

/**
 * Content type definitions with their schemas
 */

export type Content = {
  [key: string]: {
    schema: Schema
    example?: unknown
    examples?: {
      [exampleKey: string]: {
        summary?: string
        value?: unknown
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
    [key: string]: string[]
  }[]
  parameters?: Parameters[]
  requestBody?: RequestBody
  responses: Response
}

/**
 * Response definition with description and content
 */
export type ResponseDefinition = {
  description?: string
  content?: Content
  $ref?: string
  headers?: {
    [key: string]: {
      description?: string
      schema: Schema
    }
  }
}

/**
 * Response object with status codes
 */
type Response = {
  [statusCode: string]: ResponseDefinition
}

/**
 * Schema definition for OpenAPI
 */
export type Schema = {
  name?: string
  description?: string
  type?: Type | [Type, ...Type[]]
  format?: Format | FormatString | FormatNumber
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
  properties?: Record<string, Schema>
  required?: string[] | boolean
  items?: Schema
  enum?: (string | number | boolean | null | (string | number | boolean | null)[])[]
  nullable?: boolean
  additionalProperties?: Schema | boolean
  $ref?: `#/components/schemas/${string}`
  xml?: {
    name?: string
    wrapped?: boolean
  }
  security?: {
    [key: string]: string[]
  }[]
  oneOf?: Schema[]
  allOf?: Schema[]
  anyOf?: Schema[]
  not?: Schema
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
  schemas?: Record<string, Schema>
  parameters?: Record<string, Parameters>
  requestBodies?: Record<string, RequestBody>
  securitySchemes?: {
    [key: string]: {
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
  schema: Schema
  description?: string
  required?: boolean
  name: string
  in: 'path' | 'query' | 'header' | 'cookie'
  explode?: boolean
}

/**
 * Request body definition
 */
export type RequestBody = {
  description?: string
  required?: boolean
  content?: Content
}

/**
 * Response definitions mapped by status code
 */
export type Responses = Record<string, ResponseDefinition>
