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

/** The extensions of an input document: OpenAPI as YAML or JSON, or a TypeSpec entry. */
export const INPUT_EXTENSIONS = ['.yaml', '.json', '.tsp'] as const

/** A JavaScript identifier that can be written bare: as a binding, or a key or member access. */
export const IDENTIFIER_PATTERN = /^[A-Za-z_$][A-Za-z0-9_$]*$/u

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
