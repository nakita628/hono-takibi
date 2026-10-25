import { basename } from 'node:path'

import { isHttpMethod, isOperation } from '../../../guard/index.js'
import {
  entryNames,
  groupNameOf,
  handlerGroupOf,
  makeHandlerFileName,
} from '../../../helper/index.js'
import type { OpenAPI } from '../../../openapi/index.js'
import { routeName as makeRouteName } from '../../../utils/index.js'

/** The handler files the operations of a document are written to, in document order. */
function handlerFilesOf(openapi: OpenAPI) {
  return [
    ...new Set(
      Object.entries(openapi.paths).flatMap(([path, pathItem]) =>
        Object.entries(pathItem).flatMap(([method, operation]) =>
          isHttpMethod(method) && isOperation(operation)
            ? [makeHandlerFileName(path, operation.tags)]
            : [],
        ),
      ),
    ),
  ]
}

/**
 * The groups of a split app, in the order their first route stands in the document: the
 * handler files where the handlers register their routes themselves, and the group of each
 * path otherwise, `__root` among them when the root has a route. Empty when the app is not
 * split.
 *
 * `app` and the merge of its file name the bindings of the entry from these, through
 * `entryNames`, so that no group is shadowed by one.
 */
export function appGroups(
  openapi: OpenAPI,
  inline: boolean,
  inlineHandlerFileNames: readonly string[] | undefined,
  split: boolean,
): readonly string[] {
  if (!split) return []
  const names = inline
    ? (inlineHandlerFileNames ?? handlerFilesOf(openapi)).map((file) =>
        groupNameOf(basename(file, '.ts')),
      )
    : Object.entries(openapi.paths).flatMap(([path, pathItem]) =>
        Object.keys(pathItem).flatMap((method) =>
          isHttpMethod(method) ? [handlerGroupOf(path)] : [],
        ),
      )
  return [...new Set(names)]
}

/**
 * Generates a Hono app with OpenAPI integration.
 *
 *
 * @example
 * ```ts
 * const code = app(openapiSpec, 'routes.ts', '/api')
 * // Returns generated Hono app code with route handlers
 * ```
 */
export function app(
  openapi: OpenAPI,
  output: string,
  basePath: string,
  pathAlias: string | undefined,
  routeImport?: string,
  routeHandler = false,
  define = false,
  handlerModuleOverride?: string,
  inlineHandlerFileNames?: readonly string[],
  split = false,
) {
  const getRouteMaps = () => {
    const paths = openapi.paths
    return Object.entries(paths).flatMap(([path, pathItem]) =>
      Object.entries(pathItem).flatMap(([method]) => {
        if (!isHttpMethod(method)) return [] as const
        return {
          routeName: `${makeRouteName(method, path, paths)}Route`,
          handlerName: `${makeRouteName(method, path, paths)}RouteHandler`,
          path,
        } as const
      }),
    )
  }
  const routeMappings = getRouteMaps()
  const isIndexFile = output.endsWith('/index.ts')
  const routeBasename = isIndexFile
    ? basename(output.replace(/\/index\.ts$/u, ''))
    : basename(output, '.ts')
  const aliasPrefix = pathAlias?.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
  const inline = !define && !routeHandler
  // The entry binds `app` and `OpenAPIHono` for itself, under names no group has.
  const groups = appGroups(openapi, inline, inlineHandlerFileNames, split)
  const { app: appVar, hono } = entryNames(groups)
  const honoImport = `import{${hono === 'OpenAPIHono' ? hono : `OpenAPIHono as ${hono}`}}from'@hono/zod-openapi'`
  const appInit =
    basePath !== '/'
      ? `const ${appVar}=new ${hono}().basePath('${basePath}')`
      : `const ${appVar}=new ${hono}()`
  const appExport = `export default ${appVar}`
  if (define) {
    const routeNames = [...new Set(routeMappings.map((m) => m.routeName))]
    const handlerModule =
      handlerModuleOverride ?? (aliasPrefix ? `${aliasPrefix}/handlers` : './handlers')
    const routesImport =
      routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${handlerModule}'` : ''
    const importSection = [honoImport, routesImport].filter(Boolean).join('\n')
    if (split) {
      // Every group is the app registering its routes, in the order their first route
      // stands in the document.
      const inits = groups.map((name) => {
        const routes = [
          ...new Set(
            routeMappings
              .filter(({ path }) => handlerGroupOf(path) === name)
              .map(({ routeName }) => routeName),
          ),
        ]
        return `export const ${name}=${appVar}.openapiRoutes([${routes.join(',')}] as const)`
      })
      return [importSection, appInit, ...inits, appExport].join('\n\n')
    }
    const apiInit =
      routeNames.length > 0
        ? `export const api=${appVar}.openapiRoutes([${routeNames.join(',')}] as const)`
        : ''
    return [importSection, appInit, apiInit, appExport].filter(Boolean).join('\n\n')
  }
  if (!routeHandler) {
    const handlerFileNames = inlineHandlerFileNames ?? handlerFilesOf(openapi)
    const handlerExportNames = handlerFileNames.map((fn) => `${basename(fn, '.ts')}Handler`)
    const handlerModule =
      handlerModuleOverride ?? (aliasPrefix ? `${aliasPrefix}/handlers` : './handlers')
    const handlerImport =
      handlerExportNames.length > 0
        ? `import{${handlerExportNames.join(',')}}from'${handlerModule}'`
        : ''
    const importSection = [honoImport, handlerImport].filter(Boolean).join('\n')
    if (split) {
      // A handler file is a sub-app, and mounting it on the app is what types the group:
      // the app is declared without routes, so what it returns is typed by that file alone.
      // A handler file is a group under its own name, `__root` included.
      const files = handlerFileNames.map((file) => basename(file, '.ts'))
      const inits = groups.map(
        (name) =>
          `export const ${name}=${appVar}${files
            .filter((file) => groupNameOf(file) === name)
            .map((file) => `.route('/',${file}Handler)`)
            .join('')}`,
      )
      return [importSection, appInit, ...inits, appExport].join('\n\n')
    }
    const apiInit =
      handlerExportNames.length > 0
        ? `export const api=${appVar}${handlerExportNames.map((name) => `.route('/',${name})`).join('')}`
        : ''
    return [importSection, appInit, apiInit, appExport].filter(Boolean).join('\n\n')
  }
  const routeNames = [...new Set(routeMappings.map((m) => m.routeName))]
  const routeModule =
    routeImport ?? (aliasPrefix ? `${aliasPrefix}/${routeBasename}` : `./${routeBasename}`)
  const routesImport =
    routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${routeModule}'` : ''
  const handlerNames = [...new Set(routeMappings.map((m) => m.handlerName))]
  const handlerModule =
    handlerModuleOverride ?? (aliasPrefix ? `${aliasPrefix}/handlers` : './handlers')
  const handlerImport =
    handlerNames.length > 0 ? `import{${handlerNames.join(',')}}from'${handlerModule}'` : ''
  const importSection = [honoImport, routesImport, handlerImport].filter(Boolean).join('\n')
  if (!split) {
    const apiInit = `export const api=${appVar}${routeMappings
      .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
      .join('\n')}`
    return [importSection, appInit, apiInit, appExport].join('\n\n')
  }
  // Every group registers its routes on the one app. What divides them is the type: the
  // app is declared without routes, so each group is typed by the routes it registers and
  // a client of it resolves those alone.
  const inits = groups.map(
    (name) =>
      `export const ${name}=${appVar}${routeMappings
        .filter(({ path }) => handlerGroupOf(path) === name)
        .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
        .join('\n')}`,
  )
  return [importSection, appInit, ...inits, appExport].join('\n\n')
}
