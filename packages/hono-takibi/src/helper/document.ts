import { HTTP_METHODS } from '../constants/index.js'
import { isRecord } from '../guard/index.js'
import type { OpenAPI } from '../openapi/index.js'
import { uniqueComponentNames } from './names.js'
import { hoistRecursivePointers, inlinePointerRefs, resolveEmbeddedRefs } from './pointer.js'

/**
 * The document as every generator reads it: the pointers of an embedded schema resource read
 * against the resource, inline pointers written out where they stand, recursive ones declared
 * as components, components whose names would make one identifier
 * told apart, and the Specification Extensions of the Paths, Responses and Callback Objects
 * left out. A document none of this touches comes back as it is.
 */
export function normalizeOpenAPI(document: OpenAPI): OpenAPI {
  return withoutExtensions(
    uniqueComponentNames(inlinePointerRefs(hoistRecursivePointers(resolveEmbeddedRefs(document)))),
  )
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
