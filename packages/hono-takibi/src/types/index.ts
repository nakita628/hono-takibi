import SwaggerParser from '@apidevtools/swagger-parser'

/**
 * Base OpenAPI type derived from SwaggerParser
 */
export type OpenAPI = Awaited<ReturnType<typeof SwaggerParser.parse>>

/**
 * Extended OpenAPI specification with required components and paths
 */
export type OpenAPISpec = OpenAPI & {
  components: Components
} & {
  paths: OpenAPIPaths
}

/**
 * OpenAPI paths with PathItem definitions
 */
export type OpenAPIPaths = {
  [P in keyof NonNullable<OpenAPI['paths']>]: PathItem
}

/**
 * HTTP methods supported in OpenAPI
 */
export type HttpMethod = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'options' | 'head'

/**
 * Parameter types in OpenAPI
 */
export type Parameter = 'query' | 'path' | 'header' | 'body'

/**
 * Data types supported in OpenAPI schemas
 */
export type Type =
  | 'string'
  | 'number'
  | 'integer'
  | 'bigint'
  | 'boolean'
  | 'date'
  | 'null'
  | 'any'
  | 'unknown'
  | 'array'
  | 'object'

/**
 * Format specifications for string types
 */
export type Format =
  // validations
  // | 'max'
  // | 'min'
  // | 'length'
  | 'email'
  | 'uri'
  | 'emoji'
  | 'uuid'
  // | 'nanoid'
  | 'cuid'
  | 'cuid2'
  | 'ulid'
  | 'date-time' // ISO 8601; by default only `Z` timezone allowed
  | 'ip' // defaults to allow both IPv4 and IPv6
  | 'cidr' // defaults to allow both IPv4 and IPv6
  // transforms
  | 'trim' // trim whitespace
  | 'toLowerCase' // toLowerCase
  | 'toUpperCase' // toUpperCase
  | 'date' // ISO date format (YYYY-MM-DD)
  | 'time' // ISO time format (HH:mm:ss[.SSSSSS])
  | 'duration' // ISO 8601 duration
  | 'base64'
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'
  | 'binary'

/**
 * Content type definitions with their schemas
 */
type Content = {
  'application/json'?: {
    schema: Schema
  }
  'application/xml'?: {
    schema: Schema
  }
  'application/x-www-form-urlencoded'?: {
    schema: Schema
  }
  'application/octet-stream'?: {
    schema: {
      type: Type
      format?: Format
      items?: Schema
    }
  }
}

/**
 * Path item definition with HTTP methods and parameters
 */
export type PathItem = {
  summary?: string
  description?: string
  parameters?: Parameter[]
} & {
  [Method in HttpMethod]?: Operation
}

/**
 * Security requirement object definition
 */
type SecurityRequirementObject = {
  [key: string]: string[]
}

/**
 * Operation definition
 */
export type Operation = {
  tags: string[]
  summary?: string
  description?: string
  operationId?: string
  security?: SecurityRequirementObject[]
  parameters?: Parameters[]
  requestBody?: RequestBody
  responses: Response
}

/**
 * Response definition with description and content
 */
type ResponseDefinition = {
  description: string
  content?: Content
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
  type?: Type
  format?: Format
  pattern?: string
  minLength?: number
  maxLength?: number
  example?: string | number | Array<string | number>
  properties?: Record<string, Schema>
  required?: string[]
  items?: Schema
  enum?: string[]
  additionalProperties?: {
    type: Type
    format: Format
  }
  $ref?: string
  xml?: {
    name?: string
    wrapped?: boolean
  }
  security?: SecurityRequirementObject[]
}

/**
 * Components section of OpenAPI spec
 */
export type Components = {
  schemas: Record<string, Schema>
  parameters?: Record<string, Parameters>
  requestBodies?: Record<string, RequestBody>
}

/**
 * Object containing different types of parameters
 */
export type ParamsObject = {
  query: Record<string, string>
  params: Record<string, string>
  headers: Record<string, string>
  body: Record<string, string>
}

/**
 * Parameter definition
 */
export type Parameters = {
  schema: Schema
  description?: string
  required?: boolean
  name: string
  in: Parameter
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
