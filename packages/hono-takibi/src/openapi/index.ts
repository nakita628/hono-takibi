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

type Examples = {
  readonly [k: string]:
    | {
        readonly summary?: string
        readonly description?: string
        readonly value?: unknown
        readonly externalValue?: string
      }
    | Reference
}

type Server = {
  readonly url: string
  readonly description?: string
  readonly name: string
  readonly variables?: {
    readonly [k: string]: {
      readonly enum?: readonly string[]
      readonly default?: string
      readonly description?: string
    }
  }
}

export type Header = {
  readonly description?: string
  readonly required?: boolean
  readonly deprecated?: boolean
  readonly example?: unknown
  readonly examples?: Examples
}

type Link = {
  readonly operationRef?: string
  readonly operationId?: string
  readonly parameters?: {
    readonly [k: string]: unknown
  }
  readonly requestBody?: unknown
  readonly description?: string
  readonly server?: Server
}

type Reference = {
  readonly $ref?: Ref
  readonly summary?: string
  readonly description?: string
}

type Encoding = {
  readonly contentType?: string
  readonly headers?: {
    readonly [k: string]:
      | {
          readonly $ref?: Ref
          readonly summary?: string
          readonly description?: string
        }
      | Reference
  }
  readonly encoding?: {
    readonly [k: string]: Encoding
  }[]
  readonly prefixEncoding?: Encoding
  readonly itemEncoding?: Encoding
}[]

/**
 * Content type definitions with their schemas
 */
export type Content = {
  readonly [k: string]:
    | {
        readonly schema: Schema
        readonly itemSchema?: Schema
        readonly example?: unknown
        readonly examples?: {
          readonly [k: string]: {
            readonly summary?: string
            readonly description?: string
            readonly value?: unknown
            readonly externalValue?: string
          }
        }
        readonly encoding?: {
          readonly [k: string]: Encoding
        }
        readonly prefixEncoding?: Encoding
        readonly itemEncoding?: Encoding
      }
    | Reference
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
  readonly externalDocs?: {
    readonly description?: string
    readonly url: string
  }
  readonly operationId?: string
  readonly parameters?: readonly Parameter[] | Reference
  readonly requestBody?: RequestBody | Reference
  readonly responses: Responses
  readonly callbacks?: Record<
    string,
    {
      $ref?: string
      summary?: string
      description?: string
    }
  >
  readonly deprecated?: boolean
  readonly security?: {
    readonly [k: string]: readonly string[]
  }[]
  readonly servers?: readonly {
    readonly url: string
    readonly description?: string
    readonly variables?: Record<
      string,
      {
        enum?: readonly string[]
        default?: string
        description?: string
      }
    >
  }[]
}

/**
 * Response definition with description and content
 */
// export type ResponseDefinition = {
//   description?: string
//   content?: Content
//   $ref?: string
//   readonly headers?: Headers
//   readonly links?: {
//     readonly [k: string]: {
//       readonly required?: boolean
//       readonly operationId?: string
//       readonly parameters?: Record<string, string>
//       readonly description?: string
//       $ref?: string
//     }
//   }
// }


export type Responses = {
  readonly summary?: string
  readonly description?: string
  readonly content?: {
    [k: string]: Media | Reference
  }
  readonly headers?: {
    readonly [k: string]: Header | Reference
  },
  readonly links?: {
    readonly [k: string]: Link | Reference
  }

}

type Discriminator = {
  readonly propertyName?: string
  readonly mapping?: Record<string, string>
  readonly defaultMapping?: string
}

type ExternalDocs = {
  readonly url: string
  readonly description?: string
}

/**
 * Schema definition for OpenAPI
 */
export type Schema = {
  readonly discriminator?: Discriminator
  readonly xml?: {
    readonly nodeType?: string
    readonly name?: string
    readonly namespace?: string
    readonly prefix?: string
    readonly attribute?: boolean
    readonly wrapped?: boolean
  }
  readonly externalDocs?: ExternalDocs
  readonly example?: unknown
  //
  readonly examples?: Examples
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
  readonly properties?: Record<string, Schema>
  readonly required?: string[] | boolean
  readonly items?: Schema
  readonly enum?: (string | number | boolean | null | (string | number | boolean | null)[])[]
  readonly nullable?: boolean
  readonly additionalProperties?: Schema | boolean
  readonly $ref?: Ref
  readonly security?: {
    readonly [k: string]: readonly string[]
  }[]
  readonly oneOf?: readonly Schema[]
  readonly allOf?: readonly Schema[]
  readonly anyOf?: readonly Schema[]
  readonly not?: Schema

  readonly const?: unknown
}

/**
 * Components section of OpenAPI spec
 */
export type Components = {
  readonly schemas?: Record<string, Schema>
  readonly parameters?: Record<string, Parameter>
  readonly requestBodies?: Record<string, RequestBody>
  readonly responses?: Record<string, Responses>
  readonly headers?: Record<
    string,
    {
      readonly required: boolean | undefined
      readonly description?: string
      readonly schema: Schema
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
export type Parameter = {
  readonly name: string
  readonly in: 'path' | 'query' | 'header' | 'cookie'
  readonly description?: string
  readonly required?: boolean
  readonly deprecated?: boolean
  readonly allowEmptyValue?: boolean
  readonly example?: unknown
  readonly examples?: Examples
}

/**
 * Request body definition
 */
export type RequestBody = {
  readonly description?: string
  readonly rcontent?: {
    readonly [k: string]: Media | Reference
  }
  readonly required?: boolean
}

type Media = {
  readonly schema: Schema
  readonly itemSchema?: Schema
  readonly example?: unknown
  readonly examples?: Examples
  readonly encoding?: {
    readonly [k: string]: Encoding
  }
  readonly prefixEncoding?: Encoding[]
  readonly itemEncoding?: Encoding[]
}
