import { COMPONENT_REF_PREFIX, HTTP_METHODS } from '../constants/index.js'
import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { uniqueComponentNames } from './names.js'
import { hoistRecursivePointers, inlinePointerRefs, resolveEmbeddedRefs } from './pointer.js'

/**
 * The document as every generator reads it: the pointers of an embedded schema resource read
 * against the resource, inline pointers written out where they stand, recursive ones declared
 * as components, components whose names would make one identifier
 * told apart, the Specification Extensions of the Paths, Responses and Callback Objects
 * left out, and the parameters a path template names without declaring them declared. A
 * document none of this touches comes back as it is.
 */
export function normalizeOpenAPI(document: OpenAPI): OpenAPI {
  return withTemplateParameters(
    withoutExtensions(
      uniqueComponentNames(
        inlinePointerRefs(hoistRecursivePointers(resolveEmbeddedRefs(document))),
      ),
    ),
  )
}

/**
 * The operations whose path template names a parameter that neither the operation nor its
 * path item declares as `in: path`: `GET /users/{id}` with no `id` in `parameters` (#508).
 * OpenAPI says every template expression MUST correspond to a path parameter, so such a
 * document is invalid, but it is met (Knock).
 */
function undeclaredTemplateParameters(document: OpenAPI): readonly {
  readonly path: string
  readonly method: (typeof HTTP_METHODS)[number]
  readonly names: readonly string[]
}[] {
  if (!isRecord(document.paths)) return []
  return Object.entries(document.paths).flatMap(([path, entry]) => {
    const template = templateNames(path)
    if (template.length === 0) return []
    const item = resolvedPathItem(entry, document)
    if (item === undefined) return []
    const shared = declaredPathNames(item.parameters, document)
    return HTTP_METHODS.flatMap((method) => {
      const operation = item[method]
      if (!isRecord(operation)) return []
      const declared = new Set([...shared, ...declaredPathNames(operation.parameters, document)])
      const names = template.filter((name) => !declared.has(name))
      return names.length === 0 ? [] : [{ path, method, names }]
    })
  })
}

/**
 * The document with every parameter a path template names declared (#508): one that neither
 * the operation nor its path item declares is added to the operation as a required string
 * `in: path` parameter, which is what the template says of it. Hono types `param` from the
 * path only when a route declares none, so a route that left one out took `undefined` or
 * could not be given the segment; with the names taken from the template, the route, the
 * client type and the URL agree.
 *
 * A path item that is a `$ref` has its operations in the component, which other paths may
 * share: the parameters are added beside the `$ref`, to the path item, where an operation
 * that declares one of its own still overrides it.
 */
export function withTemplateParameters(document: OpenAPI): OpenAPI {
  const undeclared = undeclaredTemplateParameters(document)
  if (undeclared.length === 0 || !isRecord(document.paths)) return document
  const paths: { readonly [k: string]: unknown } = Object.fromEntries(
    Object.entries<unknown>(document.paths).map(([path, item]): readonly [string, unknown] => {
      const found = undeclared.filter((operation) => operation.path === path)
      if (found.length === 0 || !isRecord(item)) return [path, item]
      if (typeof item.$ref === 'string') {
        const names = [...new Set(found.flatMap((operation) => operation.names))]
        return [
          path,
          {
            ...item,
            parameters: withAdded(resolvedPathItem(item, document)?.parameters, names),
          },
        ]
      }
      return [
        path,
        {
          ...item,
          ...Object.fromEntries(
            found.map(({ method, names }): readonly [string, unknown] => {
              const operation = item[method]
              return [
                method,
                isRecord(operation)
                  ? { ...operation, parameters: withAdded(operation.parameters, names) }
                  : operation,
              ]
            }),
          ),
        },
      ]
    }),
  )
  const result = { ...document, paths }
  return isOpenAPI(result) ? result : document
}

function withAdded(parameters: unknown, names: readonly string[]): readonly unknown[] {
  const declared: readonly unknown[] = Array.isArray(parameters) ? parameters : []
  return [
    ...declared,
    ...names.map((name) => ({ name, in: 'path', required: true, schema: { type: 'string' } })),
  ]
}

/** The names in the template expressions of a path, `id` for `/users/{id}`, each once. */
function templateNames(path: string): readonly string[] {
  return [...new Set([...path.matchAll(/\{([^}]+)\}/gu)].flatMap((match) => match[1] ?? []))]
}

/** The path item of a `paths` entry, a `$ref` into `components.pathItems` resolved as the routes resolve it. */
function resolvedPathItem(
  item: unknown,
  document: OpenAPI,
): { readonly [k: string]: unknown } | undefined {
  if (!isRecord(item)) return undefined
  const ref = item.$ref
  if (typeof ref !== 'string' || !ref.startsWith(COMPONENT_REF_PREFIX.pathItems)) return item
  const pathItems: unknown = isRecord(document.components)
    ? document.components.pathItems
    : undefined
  const component = isRecord(pathItems) ? pathItems[ref.slice(ref.lastIndexOf('/') + 1)] : undefined
  if (!isRecord(component)) return item
  const { $ref: _, ...siblings } = item
  return { ...component, ...siblings }
}

/** The names of the `in: path` parameters of a `parameters` list, `$ref`s into `components.parameters` resolved. */
function declaredPathNames(parameters: unknown, document: OpenAPI): readonly string[] {
  if (!Array.isArray(parameters)) return []
  const components: unknown = isRecord(document.components)
    ? document.components.parameters
    : undefined
  return parameters.flatMap((parameter: unknown) => {
    if (!isRecord(parameter)) return []
    const ref = parameter.$ref
    const resolved =
      'name' in parameter && 'in' in parameter
        ? parameter
        : typeof ref === 'string' &&
            ref.startsWith(COMPONENT_REF_PREFIX.parameters) &&
            isRecord(components)
          ? components[ref.slice(ref.lastIndexOf('/') + 1)]
          : undefined
    return isRecord(resolved) && resolved.in === 'path' && typeof resolved.name === 'string'
      ? [resolved.name]
      : []
  })
}

/**
 * The document without the Specification Extensions (`x-` keys) of the Paths Object, of the
 * Responses Object of every operation and of every Callback Object (OpenAPI 3.1 §4.8.8,
 * §4.8.16, §4.8.18). Those objects are maps that may be extended, so an `x-` key there is not
 * a path, a status code or a callback expression (#416): read as one, `paths.x-vendor` became
 * a route at the path `x-vendor`, and `responses.x-vendor` a response. The webhooks and the
 * component maps are not extensible: a key of theirs is a name, whatever it starts with.
 */
export function withoutExtensions(document: OpenAPI): OpenAPI {
  if (!hasExtensionEntry(document)) return document
  const paths = isRecord(document.paths)
    ? Object.fromEntries(
        Object.entries(document.paths)
          .filter(([key]) => !isExtensionKey(key))
          .map(([key, item]) => [key, pathItemWithoutExtensions(item)]),
      )
    : document.paths
  const webhooks = isRecord(document.webhooks)
    ? Object.fromEntries(
        Object.entries(document.webhooks).map(([key, item]) => [
          key,
          pathItemWithoutExtensions(item),
        ]),
      )
    : document.webhooks
  const components = isRecord(document.components)
    ? {
        ...document.components,
        ...(isRecord(document.components.pathItems)
          ? {
              pathItems: Object.fromEntries(
                Object.entries(document.components.pathItems).map(([key, item]) => [
                  key,
                  pathItemWithoutExtensions(item),
                ]),
              ),
            }
          : {}),
        ...(isRecord(document.components.callbacks)
          ? {
              callbacks: Object.fromEntries(
                Object.entries(document.components.callbacks).map(([key, callback]) => [
                  key,
                  callbackWithoutExtensions(callback),
                ]),
              ),
            }
          : {}),
      }
    : document.components
  const result = {
    ...document,
    paths,
    ...(webhooks === undefined ? {} : { webhooks }),
    ...(components === undefined ? {} : { components }),
  }
  return isOpenAPI(result) ? result : document
}

function isOpenAPI(value: unknown): value is OpenAPI {
  return isRecord(value) && 'paths' in value
}

function isExtensionKey(key: string) {
  return key.startsWith('x-')
}

function pathItemWithoutExtensions(item: unknown): unknown {
  if (!isRecord(item)) return item
  return Object.fromEntries(
    Object.entries(item).map(([key, value]) =>
      HTTP_METHODS.some((method) => method === key)
        ? [key, operationWithoutExtensions(value)]
        : [key, value],
    ),
  )
}

function operationWithoutExtensions(operation: unknown): unknown {
  if (!isRecord(operation)) return operation
  const responses = isRecord(operation.responses)
    ? Object.fromEntries(
        Object.entries(operation.responses).filter(([key]) => !isExtensionKey(key)),
      )
    : operation.responses
  const callbacks = isRecord(operation.callbacks)
    ? Object.fromEntries(
        Object.entries(operation.callbacks).map(([key, callback]) => [
          key,
          callbackWithoutExtensions(callback),
        ]),
      )
    : operation.callbacks
  return {
    ...operation,
    ...(responses === undefined ? {} : { responses }),
    ...(callbacks === undefined ? {} : { callbacks }),
  }
}

// A Callback Object maps expressions to path items; a `$ref` is a reference to one.
function callbackWithoutExtensions(callback: unknown): unknown {
  if (!isRecord(callback) || typeof callback.$ref === 'string') return callback
  return Object.fromEntries(
    Object.entries(callback)
      .filter(([key]) => !isExtensionKey(key))
      .map(([key, item]) => [key, pathItemWithoutExtensions(item)]),
  )
}

/** Whether any of the maps `withoutExtensions` reads has an `x-` key: most documents have none. */
function hasExtensionEntry(document: OpenAPI) {
  return (
    (isRecord(document.paths) &&
      (Object.keys(document.paths).some(isExtensionKey) ||
        Object.values(document.paths).some(hasExtensionInPathItem))) ||
    hasExtensionInMap(document.webhooks, hasExtensionInPathItem) ||
    hasExtensionInMap(document.components?.pathItems, hasExtensionInPathItem) ||
    hasExtensionInMap(document.components?.callbacks, hasExtensionInCallback)
  )
}

function hasExtensionInMap(map: unknown, each: (item: unknown) => boolean) {
  return isRecord(map) && Object.values(map).some(each)
}

function hasExtensionInPathItem(item: unknown): boolean {
  return (
    isRecord(item) &&
    HTTP_METHODS.some((method) => {
      const operation = item[method]
      return (
        isRecord(operation) &&
        ((isRecord(operation.responses) && Object.keys(operation.responses).some(isExtensionKey)) ||
          (isRecord(operation.callbacks) &&
            Object.values(operation.callbacks).some(hasExtensionInCallback)))
      )
    })
  )
}

function hasExtensionInCallback(callback: unknown): boolean {
  return (
    isRecord(callback) &&
    typeof callback.$ref !== 'string' &&
    (Object.keys(callback).some(isExtensionKey) ||
      Object.values(callback).some(hasExtensionInPathItem))
  )
}
