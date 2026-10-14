import path from 'node:path'

import { Effect } from 'effect'

import { emit } from '../../emit/index.js'
import { GenerateError } from '../../error/index.js'
import { readFile } from '../../file/index.js'
import { isHttpMethod, isOpenAPIPaths, isOperation, isValidIdent } from '../../guard/index.js'
import { freeName, groupClientName, operationTags } from '../../helper/index.js'
import type { Grouping } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'

// `books` to `Books`, and `__root` to `__Root`: the letter is what is capitalized.
function capitalizeFirst(name: string) {
  return name.replace(
    /^([_$]*)(.)/u,
    (_, lead: string, first: string) => `${lead}${first.toUpperCase()}`,
  )
}

// A client is typed by the routes of its app, base path included, and is handed out from
// below the base path: `hc('/').api` for `/api`.
function makeBasePathAccess(basePath: string) {
  return basePath
    .split('/')
    .filter((segment) => segment !== '')
    .map((segment) =>
      isValidIdent(segment)
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
// into `baseUrl`, and asserted present: the variable is the deployment's to set, and a
// fallback would only hide its absence. One read from an environment a module exports is
// that property, which the module answers for.
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
    declaration: [`const baseUrl=${baseUrl.source}.${baseUrl.env}!`],
    url: 'baseUrl',
  }
}

/**
 * The typed client, as the `hcWithType` of the Hono guide: the type of the client is
 * declared once, so that it is worked out when this file is compiled and not again by every
 * file that calls `hc`.
 */
function makeClient(
  name: string,
  app: string,
  url: string,
  access = '',
  imported = app,
  whole = false,
) {
  const typeName = capitalizeFirst(name)
  const factory = whole ? 'hcWithType' : `hc${capitalizeFirst(app)}WithType`
  return [
    `type ${typeName}=ReturnType<typeof hc<typeof ${imported}>>`,
    `const ${factory}=(...args:Parameters<typeof hc>):${typeName}=>hc<typeof ${imported}>(...args)`,
    `export const ${name}=${factory}(${url})${access}`,
  ].join('\n\n')
}

// The names the client file binds for itself: `hc`, the base URL, and for each app its client,
// the type of it and its factory (`client`, `Client`, `hcWithType` for the whole application;
// `booksClient`, `BooksClient`, `hcBooksWithType` for the group `books`).
function ownNames(apps: readonly string[], environment: readonly string[], whole: boolean) {
  return [
    'hc',
    ...environment,
    ...apps.flatMap((app) =>
      whole
        ? ['client', 'Client', 'hcWithType']
        : [
            groupClientName(app),
            capitalizeFirst(groupClientName(app)),
            `hc${capitalizeFirst(app)}WithType`,
          ],
    ),
  ]
}

// The app of a group is imported under its own name, unless the client file binds that name
// itself: a group `hc`, beside the `hc` of Hono. The app is then imported as `hcApp`.
function importedName(app: string, apps: readonly string[], own: readonly string[]) {
  return own.includes(app) ? freeName(`${app}App`, [...own, ...apps]) : app
}

/**
 * Generates the file of typed clients: `client` for the application, or one client for
 * each group of a split application, `booksClient` for `books` and `__rootClient` for `__root`.
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
    // The whole application is `api`. The groups of a split one are written in the order
    // their first route stands in the document.
    const whole = grouping === undefined
    const apps = whole
      ? ['api']
      : [
          ...new Set(
            Object.entries(paths).flatMap(([route, pathItem]) =>
              Object.entries(pathItem).flatMap(([method, operation]) =>
                isHttpMethod(method) && isOperation(operation)
                  ? [grouping(route, operationTags(operation))]
                  : [],
              ),
            ),
          ),
        ]
    const { imports: environment, declaration, url } = makeBaseUrl(baseUrl)
    const own = ownNames(
      apps,
      typeof baseUrl === 'string' ? [] : 'import' in baseUrl ? [baseUrl.name] : ['baseUrl'],
      whole,
    )
    const specifiers = apps.map((name) => {
      const imported = importedName(name, apps, own)
      return imported === name ? name : `${name} as ${imported}`
    })
    const imports = [
      "import{hc}from'hono/client'",
      `import type{${specifiers.join(',')}}from'${importPath}'`,
      ...environment,
    ].join('\n')
    const access = makeBasePathAccess(basePath)
    const clients = [
      ...declaration,
      ...apps.map((name) =>
        makeClient(
          whole ? 'client' : groupClientName(name),
          name,
          url,
          access,
          importedName(name, apps, own),
          whole,
        ),
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
