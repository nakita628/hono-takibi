/** The kinds of the OpenAPI Components Object, in declaration and config-field order. */
export const COMPONENT_NAMES = [
  'schemas',
  'responses',
  'parameters',
  'examples',
  'requestBodies',
  'headers',
  'securitySchemes',
  'links',
  'callbacks',
  'pathItems',
  'mediaTypes',
] as const

/** The extensions of an input document: OpenAPI as YAML (`.yaml` or `.yml`) or JSON, or a TypeSpec entry. */
export const INPUT_EXTENSIONS = ['.yaml', '.yml', '.json', '.tsp'] as const

/** A path or URL of an input document, by its extension. */
export type InputPath = `${string}${(typeof INPUT_EXTENSIONS)[number]}`

/** A JavaScript identifier that can be written bare: as a binding, or a key or member access. */
export const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/u

/**
 * A message option written as an arrow function, `(issue) => ...`, rather than as text.
 * Such a message is spliced into the generated code as an expression instead of a string.
 */
export const ARROW_FUNCTION_PATTERN = /^\s*\(.*?\)\s*=>/u

/** The media type of a JSON body, the default of a request or response body. */
export const JSON_MEDIA_TYPE = 'application/json'

/** The media type of a plain-text body. */
export const TEXT_MEDIA_TYPE = 'text/plain'

/** The media type of a URL-encoded form body. */
export const FORM_URLENCODED_MEDIA_TYPE = 'application/x-www-form-urlencoded'

/** The media type of a multipart form body. */
export const MULTIPART_MEDIA_TYPE = 'multipart/form-data'

/** The media type of an opaque binary body. */
export const OCTET_STREAM_MEDIA_TYPE = 'application/octet-stream'

/** The media types of a form body: every field arrives as text, or as a file. */
export const FORM_MEDIA_TYPES = [
  'application/x-www-form-urlencoded',
  'multipart/form-data',
] as const

/** The `$ref` prefix of each kind of component: `#/components/schemas/` for `schemas`. */
export const COMPONENT_REF_PREFIX = {
  schemas: '#/components/schemas/',
  responses: '#/components/responses/',
  parameters: '#/components/parameters/',
  examples: '#/components/examples/',
  requestBodies: '#/components/requestBodies/',
  headers: '#/components/headers/',
  securitySchemes: '#/components/securitySchemes/',
  links: '#/components/links/',
  callbacks: '#/components/callbacks/',
  pathItems: '#/components/pathItems/',
  mediaTypes: '#/components/mediaTypes/',
} as const satisfies {
  readonly [K in (typeof COMPONENT_NAMES)[number]]: `#/components/${K}/`
}

/** The query libraries the hooks are generated for, each a config key of its own. */
export const HOOK_LIBRARIES = [
  'swr',
  'tanstack-query',
  'preact-query',
  'solid-query',
  'vue-query',
  'svelte-query',
  'angular-query',
] as const

/**
 * The HTTP methods an OpenAPI path item can hold, in the order the specification lists
 * them: OpenAPI 3.2 adds `query`. Operations of one path are generated in this order.
 */
export const HTTP_METHODS = [
  'get',
  'put',
  'post',
  'delete',
  'options',
  'head',
  'patch',
  'trace',
  'query',
] as const
