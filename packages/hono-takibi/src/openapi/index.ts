/**
 * OpenAPI specification types and parser.
 *
 * Provides TypeScript type definitions for OpenAPI 3.x specifications
 * and a parser that supports both YAML/JSON and TypeSpec inputs.
 *
 * ```mermaid
 * flowchart TD
 *   A["parseOpenAPI(input)"] --> B{"File extension?"}
 *   B -->|.tsp| C["TypeSpec compile"]
 *   B -->|.yaml/.json| D["SwaggerParser.bundle"]
 *   C --> E["getOpenAPI3"]
 *   E --> D
 *   D --> F["Return OpenAPI object"]
 * ```
 *
 * @module openapi
 */
import path from 'node:path'
/**
 * @apidevtools/swagger-parser is used for parsing and bundling OpenAPI specs.
 *
 * ## Actual Processing Flow
 *
 * ```
 * User's openapi.yaml                    After bundle()                  hono-takibi output
 * ─────────────────────────────────────────────────────────────────────────────────────────
 * schemas:                               schemas:                        export const UserSchema = z.object({...})
 *   User: { type: object }                 User: { type: object }
 *   Company:                               Company:                      export const CompanySchema = z.object({
 *     employees:                             employees:                    employees: z.array(UserSchema)  ← Variable ref
 *       items:                                 items:
 *         $ref: '#/.../User'    ───────────►   $ref: '#/.../User'  ─────► (detected, generates variable)
 *
 * examples:                              examples:
 *   CompanyExample:                        CompanyExample:               export const CompanyExample = {
 *     value:                                 value:                        "value": {
 *       employees:                             employees:                    "employees": [{"$ref":"#/..."}]  ← Literal
 *         - $ref: '#/...User'  ───────────►      - $ref: '#/...User' ────► (NOT resolved, JSON.stringify)
 * ```
 *
 * ## Why bundle() Was Necessary (Problems Solved)
 *
 * **Problem 1: Code duplication without preserved $refs**
 * ```ts
 * // If dereference() was used, every User reference becomes duplicated:
 * export const CompanySchema = z.object({
 *   employees: z.array(z.object({ id: z.string(), name: z.string() }))  // ✗ Duplicated
 * })
 * // With bundle(), we get clean variable references:
 * export const CompanySchema = z.object({
 *   employees: z.array(UserSchema)  // ✓ Single source of truth
 * })
 * ```
 *
 * **Problem 2: Circular references would break without bundle()**
 * ```ts
 * // Self-referencing schema (e.g., tree node):
 * // bundle() preserves $ref → hono-takibi can generate z.lazy()
 * export const NodeSchema = z.object({
 *   children: z.array(z.lazy(() => NodeSchema))  // ✓ Works
 * })
 * ```
 *
 * **Problem 3: Dependency ordering requires $ref information**
 * - bundle() preserves $refs in components section
 * - hono-takibi parses $refs to build dependency graph
 * - Topological sort ensures UserSchema defined before CompanySchema
 *
 * ## SwaggerParser Methods Comparison
 *
 * | Method        | External $ref | Internal $ref | Use Case                    |
 * |---------------|---------------|---------------|-----------------------------|
 * | `parse()`     | Not resolved  | Not resolved  | Just parse YAML/JSON        |
 * | `resolve()`   | Resolved      | Not resolved  | Get $Refs map               |
 * | `bundle()`    | Resolved      | **Preserved** | Code generation (we use this)|
 * | `dereference()`| Resolved     | Resolved      | Full inline expansion       |
 * | `validate()`  | Not resolved  | Not resolved  | Schema validation           |
 *
 * ## What bundle() Does NOT Resolve (By Design)
 *
 * - `$ref` inside example `value` properties → remains as literal JSON
 *   - OpenAPI spec doesn't support $ref inside values (user error)
 *   - Correct usage: inline values or reference entire example object
 *
 * - Sibling properties alongside `$ref` → preserved but generator ignores them
 *   - OpenAPI 3.0: siblings should be ignored when $ref present
 *   - OpenAPI 3.1: siblings allowed (future enhancement potential)
 *
 * - Custom extensions (x-*) like `x-extends` → treated as opaque data
 *   - `x-extends.$ref` is NOT resolved - custom extensions are tool-specific
 *   - bundle() only processes standard OpenAPI $ref locations
 *   - Example: `{ x-extends: { $ref: '#/.../UserMinimal' } }` stays as-is
 *   - For schema inheritance, use standard `allOf` instead of custom extensions
 *
 * @see https://github.com/APIDevTools/swagger-parser
 * @see https://apitools.dev/swagger-parser/docs/
 */
import SwaggerParser from '@apidevtools/swagger-parser'
import { compile, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'

/**
 * Parses input into an OpenAPI document.
 *
 * Supports multiple input formats:
 * - `.yaml` / `.json`: Direct OpenAPI specification files
 * - `.tsp`: TypeSpec files (compiled to OpenAPI first)
 *
 * ```mermaid
 * flowchart LR
 *   subgraph Input
 *     A["openapi.yaml"]
 *     B["openapi.json"]
 *     C["main.tsp"]
 *   end
 *   subgraph Output
 *     D["OpenAPI Object"]
 *   end
 *   A --> D
 *   B --> D
 *   C --> D
 * ```
 *
 * @param input - Path to OpenAPI file (.yaml, .json) or TypeSpec file (.tsp)
 * @returns Result object with parsed OpenAPI or error message
 *
 * @example
 * ```ts
 * const result = await parseOpenAPI('api.yaml')
 * if (result.ok) {
 *   console.log(result.value.paths) // Access OpenAPI paths
 * }
 *
 * // TypeSpec input
 * const tspResult = await parseOpenAPI('main.tsp')
 * ```
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
      const program = await compile(NodeHost, path.resolve(input), {
        noEmit: true,
      })
      if (program.diagnostics.length) {
        // Extract error messages from diagnostics (avoid circular reference in JSON.stringify)
        const errors = program.diagnostics.map((d) => d.message).join('\n')
        return {
          ok: false,
          error: `TypeSpec compile failed:\n${errors}`,
        }
      }
      const [record] = await getOpenAPI3(program)
      const tsp = 'document' in record ? record.document : record.versions[0].document
      const openAPI = (await SwaggerParser.bundle(JSON.parse(JSON.stringify(tsp)))) as OpenAPI
      return { ok: true, value: openAPI }
    }
    // `Awaited<ReturnType<typeof SwaggerParser.parse>>` therefore cannot be narrowed to our `OpenAPI` type.
    // The parser validates the spec at runtime but does not express this guarantee in its type definition,
    // so we assert `OpenAPI` here to enable typed access in the generator.
    const openAPI = (await SwaggerParser.bundle(input)) as OpenAPI
    return { ok: true, value: openAPI }
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
  readonly $self?: string
  readonly info?: {
    readonly title?: string
    readonly summary?: string
    readonly description?: string
    readonly termsOfService?: string
    readonly contact?: {
      readonly name?: string
      readonly url?: string
      readonly email?: string
    }
    readonly license?: {
      readonly name?: string
      readonly identifier?: string
      readonly url?: string
    }
    readonly version?: string
  }
  readonly jsonSchemaDialect?: string
  readonly servers?: readonly Server[]
  readonly paths: PathItem
  readonly webhooks?: {
    readonly [k: string]: PathItem
  }
  readonly components?: Components
  readonly security?: {
    readonly name?: readonly string[]
  }
  readonly tags?: {
    readonly name: string
    readonly summary?: string
    readonly description?: string
    readonly externalDocs?: ExternalDocs
    readonly parent?: string
    readonly kind?: string
  }[]
  readonly externalDocs?: ExternalDocs
} & {
  paths: OpenAPIPaths
}

export type Components = {
  readonly schemas?: {
    readonly [k: string]: Schema
  }
  readonly responses?: {
    readonly [k: string]: Responses
  }
  readonly parameters?: {
    readonly [k: string]: Parameter
  }
  readonly examples?: {
    readonly [k: string]:
      | {
          readonly summary?: string
          readonly description?: string
          readonly dataValue?: unknown
          readonly serializedValue?: string
          readonly externalValue?: string
          readonly value?: unknown
        }
      | Reference
  }
  readonly requestBodies?: {
    readonly [k: string]: RequestBody
  }
  readonly headers?: {
    readonly [k: string]: Header | Reference
  }
  readonly securitySchemes?: {
    readonly [k: string]:
      | {
          readonly type?: string
          readonly description?: string
          readonly name?: string
          readonly in?: string
          readonly scheme?: string
          readonly bearerFormat?: string
          readonly flows?: OAuthFlow
          readonly password?: OAuthFlow
          readonly clientCredentials?: OAuthFlow
          readonly authorizationCode?: OAuthFlow
          readonly deviceAuthorization?: OAuthFlow
          readonly openIdConnectUrl?: string
          readonly oauth2MetadataUrl?: string
          readonly deprecated?: boolean
        }
      | Reference
  }
  readonly links?: {
    readonly [k: string]: Link | Reference
  }
  readonly callbacks?: {
    readonly [k: string]: Callbacks | Reference
  }
  readonly pathItems?: {
    readonly [k: string]: PathItem
  }
  readonly mediaTypes?: {
    readonly [k: string]: Media | Reference
  }
}

type OAuthFlow = {
  readonly implicit?: {
    readonly authorizationUrl: string
    readonly deviceAuthorizationUrl: string
    readonly tokenUrl: string
    readonly refreshUrl: string
    readonly scopes: {
      readonly [k: string]: string
    }
  }
}
/**
 * OpenAPI paths with PathItem definitions
 */
export type OpenAPIPaths = {
  readonly [P in keyof NonNullable<BaseOpenAPI['paths']>]: PathItem
}

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
  | 'hex'
  | 'jwt'
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
  readonly examples?: {
    readonly [k: string]:
      | {
          readonly summary?: string
          readonly description?: string
          readonly defaultValue?: unknown
          readonly serializedValue?: string
          readonly externalValue?: string
          readonly value?: unknown
        }
      | Reference
  }
  style?: string
  explode?: boolean
  schema?: Schema
  content?: Content
}

export type Link = {
  readonly operationRef?: string
  readonly operationId?: string
  readonly parameters?: {
    readonly [k: string]: unknown
  }
  readonly requestBody?: unknown
  readonly description?: string
  readonly server?: Server
}

export type Reference = {
  readonly $ref?: Ref
  readonly summary?: string
  readonly description?: string
}

export type Encoding = {
  readonly contentType?: string
  readonly headers?: {
    readonly [k: string]: Header | Reference
  }
  readonly encoding?: {
    readonly [k: string]: Encoding
  }
  readonly prefixEncoding?: Encoding
  readonly itemEncoding?: Encoding
}

export type Content = {
  readonly [k: string]: Media
}

export type PathItem = {
  readonly $ref?: Ref
  readonly summary?: string
  readonly description?: string
  readonly get?: Operation
  readonly put?: Operation
  readonly post?: Operation
  readonly delete?: Operation
  readonly options?: Operation
  readonly head?: Operation
  readonly patch?: Operation
  readonly trace?: Operation
  readonly query?: Operation
  readonly additionalOperations?: {
    readonly [k: string]: Operation
  }
  readonly servers?: readonly Server[]
  readonly parameters?: readonly Parameter[] | readonly Reference[]
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
  readonly parameters?: readonly Parameter[]
  readonly requestBody?: RequestBody | Reference
  readonly responses: {
    readonly [k: string]: Responses
  }
  readonly callbacks?: {
    readonly [k: string]: {
      readonly $ref?: string
      readonly summary?: string
      readonly description?: string
    }
  }
  readonly deprecated?: boolean
  readonly security?: {
    readonly name?: readonly string[]
  }
  readonly servers?: readonly {
    readonly url: string
    readonly description?: string
    readonly variables?: {
      readonly [k: string]: {
        readonly enum?: readonly string[]
        readonly default?: string
        readonly description?: string
      }
    }
  }[]
}

export type Responses = {
  readonly $ref?: Ref
  readonly summary?: string
  readonly description?: string
  readonly content?: Content
  readonly headers?: {
    readonly [k: string]: Header | Reference
  }
  readonly links?: {
    readonly [k: string]: Link | Reference
  }
}

type Discriminator = {
  readonly propertyName?: string
  readonly mapping?: {
    readonly [k: string]: string
  }
  readonly defaultMapping?: string
}

type ExternalDocs = {
  readonly url: string
  readonly description?: string
}

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
  // search properties
  readonly examples?: {
    readonly [k: string]:
      | {
          readonly summary?: string
          readonly description?: string
          readonly defaultValue?: unknown
          readonly serializedValue?: string
          readonly externalValue?: string
          readonly value?: unknown
        }
      | Reference
  }
  readonly title?: string
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
  readonly uniqueItems?: boolean
  readonly minProperties?: number
  readonly maxProperties?: number
  readonly default?: unknown
  readonly properties?: {
    readonly [k: string]: Schema
  }
  readonly required?: readonly string[]
  readonly items?: Schema | readonly Schema[]
  /** JSON Schema 2020-12: Tuple validation */
  readonly prefixItems?: readonly Schema[]
  readonly enum?: readonly (
    | string
    | number
    | boolean
    | null
    | readonly (string | number | boolean | null)[]
  )[]
  readonly nullable?: boolean
  readonly readOnly?: boolean
  readonly writeOnly?: boolean
  readonly deprecated?: boolean
  readonly additionalProperties?: Schema | boolean
  readonly $ref?: Ref
  readonly security?: {
    readonly name?: readonly string[]
  }[]
  readonly oneOf?: readonly Schema[]
  readonly allOf?: readonly Schema[]
  readonly anyOf?: readonly Schema[]
  readonly not?: Schema
  readonly const?: unknown
}

export type Parameter = {
  readonly $ref?: Ref
  readonly name: string
  readonly in: 'path' | 'query' | 'header' | 'cookie'
  readonly description?: string
  readonly required?: boolean
  readonly deprecated?: boolean
  readonly allowEmptyValue?: boolean
  readonly schema: Schema
  readonly content?: Content
  readonly example?: unknown
  readonly examples?: {
    readonly [k: string]:
      | {
          readonly summary?: string
          readonly description?: string
          readonly defaultValue?: unknown
          readonly serializedValue?: string
          readonly externalValue?: string
          readonly value?: unknown
        }
      | Reference
  }
}

export type RequestBody = {
  readonly description?: string
  readonly content?: {
    readonly [k: string]: Media | Reference
  }
  readonly required?: boolean
}

export type Media = {
  readonly schema: Schema
  readonly itemSchema?: Schema
  readonly example?: unknown
  readonly examples?: {
    readonly [k: string]:
      | {
          readonly summary?: string
          readonly description?: string
          readonly defaultValue?: unknown
          readonly serializedValue?: string
          readonly externalValue?: string
          readonly value?: unknown
        }
      | Reference
  }
  readonly encoding?: {
    readonly [k: string]: Encoding
  }
  readonly prefixEncoding?: Encoding
  readonly itemEncoding?: Encoding
}

export type Callbacks = {
  readonly [k: string]: PathItem
}
