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
