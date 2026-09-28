import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { readFile } from '../../file/index.js'
import { isHttpMethod, isOpenAPIPaths, isOperation } from '../../guard/index.js'
import { groupClientName } from '../../helper/index.js'
import type { Grouping } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

function capitalizeFirst(name: string) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`
}

// A client is typed by the routes of its app, base path included, and is handed out from
// below the base path: `hc('/').api` for `/api`.
function makeBasePathAccess(basePath: string) {
  return basePath
    .split('/')
    .filter((segment) => segment !== '')
    .map((segment) =>
      /^[A-Za-z_$][A-Za-z0-9_$]*$/u.test(segment)
        ? `.${segment}`
        : `['${segment.replaceAll('\\', '\\\\').replaceAll("'", "\\'")}']`,
    )
    .join('')
}

type BaseUrl =
  | string
  | { readonly env: string; readonly source: 'import.meta.env' | 'process.env' }
  | { readonly env: string; readonly import: string; readonly name: string }

// A URL written into the file is a literal. One read from the environment is read once,
// into `baseUrl`, with `/` in its place when the variable is not set. One read from an
// environment a module exports is that property, which the module answers for.
function makeBaseUrl(baseUrl: BaseUrl) {
  if (typeof baseUrl === 'string') {
    return { imports: [], declaration: [], url: JSON.stringify(baseUrl) }
  }
  if ('import' in baseUrl) {
    return {
      imports: [`import{${baseUrl.name}}from'${baseUrl.import}'`],
      declaration: [],
      url: `${baseUrl.name}.${baseUrl.env}`,
    }
  }
  return {
    imports: [],
    declaration: [`const baseUrl=${baseUrl.source}.${baseUrl.env}??'/'`],
    url: 'baseUrl',
  }
}

/**
 * The typed client, as the `hcWithType` of the Hono guide: the type of the client is
 * declared once, so that it is worked out when this file is compiled and not again by every
 * file that calls `hc`.
 */
function makeClient(name: string, app: string, url: string, access = '') {
  const typeName = capitalizeFirst(name)
  const factory = app === 'api' ? 'hcWithType' : `hc${capitalizeFirst(app)}WithType`
  return [
    `type ${typeName}=ReturnType<typeof hc<typeof ${app}>>`,
    `const ${factory}=(...args:Parameters<typeof hc>):${typeName}=>hc<typeof ${app}>(...args)`,
    `export const ${name}=${factory}(${url})${access}`,
  ].join('\n\n')
}

/**
 * Generates the file of typed clients: `client` for the application, and one client for
 * each group of a split application, `booksClient` for `books`.
 */
export function client(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  baseUrl: BaseUrl,
  basePath: string,
  grouping: Grouping | undefined,
  // The `index.ts` beside the client, which re-exports it, when the client has one.
  barrel?: string,
) {
  return Effect.gen(function* () {
    const paths = openAPI.paths
    if (!isOpenAPIPaths(paths)) {
      return yield* new GenerateError({ message: 'Invalid OpenAPI paths' })
    }
    // The clients are written in the order their first route stands in the document. Of a
    // split application `api` holds the routes that belong to no group, and there is a
    // client of it when there are any.
    const apps =
      grouping === undefined
        ? ['api']
        : [
            ...new Set(
              Object.entries(paths).flatMap(([route, pathItem]) =>
                Object.entries(pathItem).flatMap(([method, operation]) =>
                  isHttpMethod(method) && isOperation(operation)
                    ? [grouping(route, operation.tags) ?? 'api']
                    : [],
                ),
              ),
            ),
          ]
    const { imports: environment, declaration, url } = makeBaseUrl(baseUrl)
    const imports = [
      "import{hc}from'hono/client'",
      `import type{${apps.join(',')}}from'${importPath}'`,
      ...environment,
    ].join('\n')
    const access = makeBasePathAccess(basePath)
    const clients = [
      ...declaration,
      ...apps.map((name) =>
        makeClient(name === 'api' ? 'client' : groupClientName(name), name, url, access),
      ),
    ]
    const code = `${imports}\n\n${clients.join('\n\n')}\n`
    yield* emit(code, path.dirname(output), output)
    if (barrel !== undefined) {
      // A barrel that is there already keeps what it exports and gains the client.
      const line = `export * from './${path.basename(output, '.ts')}'`
      const existing = (yield* readFile(barrel)) ?? ''
      const lines = existing.split('\n').map((text) => text.trim().replace(/;$/u, ''))
      if (!lines.some((text) => text.replaceAll('"', "'") === line)) {
        yield* emit(`${existing.trimEnd()}\n${line}\n`, path.dirname(barrel), barrel)
      }
    }
    return `Generated client code written to ${output}`
  })
}
