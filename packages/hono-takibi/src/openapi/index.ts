import path from 'node:path'

/**
 * Uses `bundle()` to resolve external $refs while preserving internal ones.
 * This enables variable references (e.g., `UserSchema`) instead of duplicated inline schemas,
 * supports circular references via `z.lazy()`, and allows dependency-aware topological sorting.
 *
 * @see https://apitools.dev/swagger-parser/docs/
 */
import SwaggerParser from '@apidevtools/swagger-parser'
import { compile, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'

/**
 * Parses input into an OpenAPI document.
 *
 * Supports `.yaml`, `.json`, and `.tsp` (TypeSpec) inputs.
 *
 * @param input - Path to OpenAPI file (.yaml, .json) or TypeSpec file (.tsp)
 * @returns Result object with parsed OpenAPI or error message
 */
export async function parseOpenAPI(input: string) {
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
        } as const
      }
      const [record] = await getOpenAPI3(program)
      const tsp = 'document' in record ? record.document : record.versions[0].document
      const openAPI = (await SwaggerParser.bundle(JSON.parse(JSON.stringify(tsp)))) as OpenAPI
      return { ok: true, value: openAPI } as const
    }
    // `Awaited<ReturnType<typeof SwaggerParser.parse>>` therefore cannot be narrowed to our `OpenAPI` type.
    // The parser validates the spec at runtime but does not express this guarantee in its type definition,
    // so we assert `OpenAPI` here to enable typed access in the generator.
    const openAPI = (await SwaggerParser.bundle(input)) as OpenAPI
    return { ok: true, value: openAPI } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

type BaseOpenAPI = Awaited<ReturnType<typeof SwaggerParser.bundle>>

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
  readonly security?: readonly { readonly [name: string]: readonly string[] }[]
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
  | 'email'
  | 'uuid'
  | 'uuidv4'
  | 'uuidv6'
  | 'uuidv7'
  | 'url' /* Zod-aligned canonical name */
  | 'uri' /* OpenAPI/JSON Schema standard, kept for backward compatibility */
  | 'httpUrl'
  | 'hostname'
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
  | 'date' /* ISO date format (YYYY-MM-DD) */
  | 'time' /* ISO time format (HH:mm:ss[.SSSSSS]) */
  | 'date-time' /* ISO 8601; by default only `Z` timezone allowed */
  | 'duration' /* ISO 8601 duration */
  | 'binary'
  | 'mac' /* MAC address */
  | 'hash' /* hash digest — requires x-hashAlg */
  | 'e164' /* E.164 phone */
  | 'guid' /* UUID-like without strict RFC check */
  /* transforms */
  | 'toLowerCase' /* toLowerCase */
  | 'toUpperCase' /* toUpperCase */
  | 'trim' /* trim whitespace */

export type FormatNumber = 'int32' | 'int64' | 'bigint' | 'float' | 'float32' | 'float64' | 'double'

export type Ref =
  | `#/components/schemas/${string}`
  | `#/components/responses/${string}`
  | `#/components/parameters/${string}`
  | `#/components/examples/${string}`
  | `#/components/requestBodies/${string}`
  | `#/components/headers/${string}`
  | `#/components/securitySchemes/${string}`
  | `#/components/links/${string}`
  | `#/components/callbacks/${string}`
  | `#/components/pathItems/${string}`
  | `#/components/mediaTypes/${string}`

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
  allowReserved?: boolean
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
  readonly security?: readonly { readonly [scheme: string]: readonly string[] }[]
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
  readonly 'x-pagination'?: boolean
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
  /**
   * JSON Schema 2020-12 §10.3.1.2: `items` may be a schema, a tuple of schemas
   * (Draft-04 compat), or a boolean schema (`true` = any item allowed,
   * `false` = no trailing items / length cap). Boolean form is exercised when
   * paired with `prefixItems` to enforce a strict tuple shape.
   */
  readonly items?: Schema | readonly Schema[] | boolean
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
  readonly oneOf?: readonly Schema[]
  readonly allOf?: readonly Schema[]
  readonly anyOf?: readonly Schema[]
  readonly not?: Schema
  readonly const?: unknown
  readonly patternProperties?: {
    readonly [k: string]: Schema
  }
  readonly propertyNames?: Schema
  readonly dependentRequired?: {
    readonly [k: string]: readonly string[]
  }
  // Vendor extensions for custom validation messages (OpenAPI Generator compatible).
  // Per-slot precedence: x-<keyword>-message > x-error-message > Zod default.
  // See `helper/zod.ts#messageFor` for the resolution chain.
  readonly 'x-error-message'?: string
  readonly 'x-length-message'?: string
  readonly 'x-pattern-message'?: string // string `pattern` only
  readonly 'x-minimum-message'?: string // numeric `minimum` (inclusive) only
  readonly 'x-maximum-message'?: string // numeric `maximum` (inclusive) only
  readonly 'x-exclusiveMinimum-message'?: string // numeric `exclusiveMinimum` (>)
  readonly 'x-exclusiveMaximum-message'?: string // numeric `exclusiveMaximum` (<)
  readonly 'x-multipleOf-message'?: string
  readonly 'x-dependentRequired-message'?: string
  /**
   * Overrides the validation message for `dependentSchemas` violations
   * (JSON Schema 2020-12 §10.2.2.4). The inner sub-schema's `code` / `path`
   * / `expected` are preserved; only `message` is replaced. Falls back to
   * `x-error-message`.
   */
  readonly 'x-dependentSchemas-message'?: string
  readonly 'x-propertyNames-message'?: string
  readonly 'x-allOf-message'?: string
  readonly 'x-anyOf-message'?: string
  readonly 'x-oneOf-message'?: string
  readonly 'x-not-message'?: string
  /**
   * Semantic alias for the implication pattern (`A → B`) encoded as
   * `anyOf:[{not:A},{required:B}]`. Takes precedence over `x-anyOf-message`
   * in the anyOf code path, then falls back to `x-error-message`. Acts as a
   * documentation aid — explicitly marking the schema author's intent — and
   * is silently ignored on schemas without `anyOf`.
   */
  readonly 'x-implication-message'?: string
  readonly 'x-required-message'?: string
  readonly 'x-additionalProperties-message'?: string
  readonly 'x-uniqueItems-message'?: string
  readonly 'x-const-message'?: string
  readonly 'x-enum-message'?: string
  readonly 'x-minLength-message'?: string // string minLength
  readonly 'x-maxLength-message'?: string // string maxLength
  readonly 'x-minItems-message'?: string // array minItems
  readonly 'x-maxItems-message'?: string // array maxItems
  readonly 'x-minProperties-message'?: string // object minProperties
  readonly 'x-maxProperties-message'?: string // object maxProperties
  readonly 'x-patternProperties-message'?: string // object patternProperties
  readonly 'x-contains-message'?: string // array contains (type-match presence)
  readonly 'x-minContains-message'?: string // array minContains (count lower bound)
  readonly 'x-maxContains-message'?: string // array maxContains (count upper bound)
  // schemas so generated validators stop emitting hardcoded English defaults.
  // Slot absent → `ctx.addIssue` omits `message` → Zod's built-in default
  // ('Invalid input') is used, picking up future locale config automatically.
  //
  readonly 'x-properties-message'?: string // failed per-property validation in a typeless object
  readonly 'x-prefixItems-message'?: string // failed tuple position validation
  readonly 'x-items-message'?: string // failed trailing items validation (incl. `items: false`)
  readonly 'x-unevaluatedProperties-message'?: string // unevaluatedProperties violation
  readonly 'x-unevaluatedItems-message'?: string // unevaluatedItems violation
  readonly 'x-if-message'?: string // failed `then`/`else` branch under `if` (shared fallback)
  readonly 'x-then-message'?: string // failed `then` branch (overrides x-if-message for then)
  readonly 'x-else-message'?: string // failed `else` branch (overrides x-if-message for else)
  readonly $comment?: string
  // array contains validation (JSON Schema standard)
  readonly contains?: Schema
  readonly minContains?: number
  readonly maxContains?: number
  readonly contentEncoding?:
    | 'base64'
    | 'base64url'
    | 'binary'
    | '7bit'
    | '8bit'
    | 'quoted-printable'
  readonly contentMediaType?: string
  readonly contentSchema?: Schema
  readonly dependentSchemas?: { readonly [k: string]: Schema }
  // if / then / else (JSON Schema standard conditional)
  readonly if?: Schema
  readonly then?: Schema
  readonly else?: Schema
  readonly unevaluatedProperties?: boolean | Schema
  readonly unevaluatedItems?: boolean | Schema
  // JSON Schema 2020-12 Core meta keywords (pass-through to .openapi())
  // These have no validation effect — they're documentation/identification only.
  readonly $schema?: string
  readonly $id?: string
  readonly $anchor?: string
  readonly $dynamicAnchor?: string
  readonly $dynamicRef?: string
  readonly $vocabulary?: { readonly [k: string]: boolean }
  readonly $defs?: { readonly [k: string]: Schema }
  readonly 'x-brand'?: string
  readonly 'x-trim'?: boolean
  readonly 'x-toLowerCase'?: boolean
  readonly 'x-toUpperCase'?: boolean
  readonly 'x-lowercase'?: boolean
  readonly 'x-uppercase'?: boolean
  readonly 'x-normalize'?: 'NFC' | 'NFD' | 'NFKC' | 'NFKD'
  readonly 'x-coerce'?: boolean
  /**
   * Opt into `z.stringbool()` for boolean schemas. Use `true` for the default
   * truthy/falsy lists, or pass an object to customize. Mutually exclusive
   * with `x-coerce: true` on the same schema (build error).
   * @see https://zod.dev/api?id=stringbool
   */
  readonly 'x-stringbool'?:
    | true
    | {
        readonly truthy?: readonly string[]
        readonly falsy?: readonly string[]
        readonly case?: 'sensitive' | 'insensitive'
      }
  readonly 'x-emailPattern'?: 'html5' | 'rfc5322' | 'unicode'
  readonly 'x-emailRegex'?: string
  readonly 'x-uuidVersion'?: 'v1' | 'v2' | 'v3' | 'v4' | 'v5' | 'v6' | 'v7' | 'v8'
  readonly 'x-urlHostname'?: string
  readonly 'x-urlProtocol'?: string
  readonly 'x-urlNormalize'?: boolean
  readonly 'x-isoPrecision'?: number
  readonly 'x-isoOffset'?: boolean
  readonly 'x-isoLocal'?: boolean
  readonly 'x-macDelimiter'?: string
  readonly 'x-jwtAlg'?: string
  readonly 'x-hashAlg'?: 'sha1' | 'sha256' | 'sha384' | 'sha512' | 'md5'
  readonly 'x-hashEnc'?: 'hex' | 'base64' | 'base64url'
  readonly 'x-catch'?: unknown
  readonly 'x-prefault'?: unknown
  readonly 'x-freeze'?: boolean
  readonly 'x-includes'?: string
  readonly 'x-startsWith'?: string
  readonly 'x-endsWith'?: string
  // Custom validation. Complete `.refine(...)` / `.superRefine(...)` chain
  // fragment string appended to the schema verbatim. Multiple checks are
  // written as a chain: `.refine(...).refine(...)`. Paste Zod docs examples
  // directly.
  readonly 'x-refine'?: string
  readonly 'x-superRefine'?: string
  /**
   * Bidirectional codec. The value is a complete `z.codec(...)` expression
   * string and replaces the base schema verbatim. Authors can paste the Zod
   * docs example directly: `z.codec(z.iso.datetime(), z.date(), {...})`.
   *
   * Applied to any schema type. The author is responsible for ensuring the
   * codec's input side matches the surrounding wire shape; the generator does
   * not introspect the expression. Precedence among replacing extensions
   * (outermost wins): `x-preprocess` > `x-transform` > `x-pipe` > `x-codec`.
   * On `type: 'string'` with `format: ^sha\\d+$` or `x-coerce: true`, the
   * string emitter consumes the codec first — those exclusions are intentional.
   *
   * @see https://zod.dev/codecs
   */
  readonly 'x-codec'?: string
  // Pre-validation normalization. The value is a complete `z.preprocess(...)`
  // expression string and replaces the base schema verbatim (same convention
  // as x-codec). Paste Zod docs example directly.
  readonly 'x-preprocess'?: string
  // Post-validation transform. The value is a complete Zod expression string
  // (e.g. `z.string().transform((val) => ...)`) and replaces the base schema
  // verbatim (same convention as x-codec).
  readonly 'x-transform'?: string
  // Schema-level pipe. The value is a complete Zod expression string (e.g.
  // `z.string().pipe(z.number())`) and replaces the base schema verbatim
  // (same convention as x-codec).
  readonly 'x-pipe'?: string
}

export type Parameter = {
  readonly $ref?: Ref
  readonly name: string
  readonly in: 'path' | 'query' | 'header' | 'cookie'
  readonly description?: string
  readonly required?: boolean
  readonly deprecated?: boolean
  readonly allowEmptyValue?: boolean
  readonly style?: string
  readonly explode?: boolean
  readonly allowReserved?: boolean
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
