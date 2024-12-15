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
  | 'email'
  | 'uri'
  | 'emoji'
  | 'uuid'
  | 'cuid'
  | 'cuid2'
  | 'ulid'
  | 'date-time'
  | 'ip'
  | 'int32'
  | 'int64'
  | 'float'
  | 'double'

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
 * Operation definition
 */
export type Operation = {
  tags: string[]
  summary?: string
  description?: string
  operationId?: string
  security?: string[]
  parameters?: PathParameters[]
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
}

/**
 * Components section of OpenAPI spec
 */
export type Components = {
  schemas: Record<string, Schema>
  parameters?: Record<
    string,
    {
      name: string
      in: string
      description?: string
      required?: boolean
      schema: Schema
      explode?: boolean
    }
  >
  requestBodies?: Record<
    string,
    {
      description: string
      content: Content
    }
  >
  securitySchemes?: {
    petstore_auth?: {
      type: string
      flows: {
        implicit: {
          authorizationUrl: string
          scopes: Record<string, string>
        }
      }
    }
    api_key?: {
      type: string
      name: string
      in: string
    }
  }
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
 * Path parameter definition
 */
export type PathParameters = {
  schema: Schema
  description?: string
  required: boolean
  name: string
  in: Parameter
}

/**
 * Request body definition
 */
export type RequestBody = {
  description?: string
  required: boolean
  content?: Content
}

/**
 * Response definitions mapped by status code
 */
export type Responses = Record<string, ResponseDefinition>
