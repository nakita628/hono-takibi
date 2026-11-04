import type * as Mock from 'hono-takibi/mock'
import type { Program, Statement } from 'oxc-parser'

type OpenAPI = Parameters<(typeof Mock)['makeMock']>[0]

// The reference is configured with a server whose URL is empty, so it shows
// each operation as a bare path (`GET /pets`) and sends its requests to that
// path on this page's own origin. Nothing on the server answers them:
// `customFetch` hands every same-origin request to `MockServer.fetch`.
export const MOCK_SERVER_URL = ''

export type MockServer = {
  /** The generated mock module, before the types are stripped. */
  readonly code: string
  /** Answers a request the way the generated Hono app does. */
  readonly fetch: (input: string | URL | Request, init?: RequestInit) => Promise<Response>
}

export type MockOptions = NonNullable<Parameters<(typeof Mock)['makeMock']>[2]>

// The faker locales the Mock view offers. Each is its own chunk, loaded when a
// mock is first built with it; the full faker bundle with every locale would
// be several times the size of the two.
export const MOCK_LOCALES = ['en', 'ja'] as const

export type MockLocale = (typeof MOCK_LOCALES)[number]

export function isMockLocale(value: unknown): value is MockLocale {
  return MOCK_LOCALES.some((locale) => locale === value)
}

const LOCALE_MODULES: { readonly [locale in MockLocale]: () => Promise<object> } = {
  en: () => import('@faker-js/faker/locale/en'),
  ja: () => import('@faker-js/faker/locale/ja'),
}

// The packages the generated module imports, keyed by the specifier it uses.
// They stay behind dynamic imports so the playground chunk never carries hono
// or faker. Without a locale the generator imports `@faker-js/faker`, whose
// default locale is English, so that specifier maps to the `en` chunk; with
// one it imports `@faker-js/faker/locale/<locale>`.
async function loadRuntime(
  locale: MockLocale | undefined,
): Promise<{ readonly [specifier: string]: object }> {
  const [zodOpenAPI, faker, cookie, httpException] = await Promise.all([
    import('@hono/zod-openapi'),
    LOCALE_MODULES[locale ?? 'en'](),
    import('hono/cookie'),
    import('hono/http-exception'),
  ])
  return {
    '@hono/zod-openapi': zodOpenAPI,
    [locale === undefined ? '@faker-js/faker' : `@faker-js/faker/locale/${locale}`]: faker,
    'hono/cookie': cookie,
    'hono/http-exception': httpException,
  }
}

function moduleName(name: {
  readonly type: string
  readonly name?: string
  readonly value?: string
}) {
  return name.type === 'Literal' ? (name.value ?? '') : (name.name ?? '')
}

// A bare specifier can only be resolved by an import map, and the page has none
// for these packages, so each import becomes a read from the `__runtime` object
// the wrapper receives. The statement text comes back as JavaScript, not a span
// edit, so it is assembled from the parsed specifiers alone.
function importToBinding(statement: Statement) {
  if (statement.type !== 'ImportDeclaration') return null
  const source = JSON.stringify(statement.source.value)
  const bindings = statement.specifiers.map((specifier) => {
    if (specifier.type === 'ImportDefaultSpecifier') {
      return `const ${specifier.local.name} = __runtime[${source}].default`
    }
    if (specifier.type === 'ImportNamespaceSpecifier') {
      return `const ${specifier.local.name} = __runtime[${source}]`
    }
    const imported = moduleName(specifier.imported)
    return imported === specifier.local.name
      ? `const { ${imported} } = __runtime[${source}]`
      : `const { ${JSON.stringify(imported)}: ${specifier.local.name} } = __runtime[${source}]`
  })
  return bindings.join('\n')
}

// Rewrites the module's imports and exports so its body can run inside one
// function: imports read from `__runtime`, named exports become plain
// declarations and the default export is handed back as the return value.
function toFunctionBody(code: string, program: Program) {
  const parts: string[] = []
  let cursor = 0
  for (const statement of program.body) {
    parts.push(code.slice(cursor, statement.start))
    cursor = statement.end
    if (statement.type === 'ImportDeclaration') {
      parts.push(importToBinding(statement) ?? '')
    } else if (statement.type === 'ExportNamedDeclaration') {
      // `export const x = …` keeps its declaration; `export { x }` lists have
      // nothing to bind here and are dropped.
      parts.push(
        statement.declaration ? code.slice(statement.declaration.start, statement.end) : '',
      )
    } else if (statement.type === 'ExportDefaultDeclaration') {
      parts.push(`__default = ${code.slice(statement.declaration.start, statement.end)}`)
    } else if (statement.type === 'ExportAllDeclaration') {
      parts.push('')
    } else {
      parts.push(code.slice(statement.start, statement.end))
    }
  }
  parts.push(code.slice(cursor))
  return parts.join('')
}

// Strips the types with oxc-transform, rewrites the module boundary, and loads
// the result as a blob module whose default export builds the app.
async function compileModule(code: string) {
  const [{ transform }, { parseSync }] = await Promise.all([
    import('oxc-transform'),
    import('oxc-parser'),
  ])
  const transformed = await transform('mock.ts', code, { lang: 'ts', sourceType: 'module' })
  if (transformed.errors.length > 0) {
    throw new Error(transformed.errors.map((error) => error.message).join('\n'))
  }
  const { program, errors } = parseSync('mock.js', transformed.code, {
    lang: 'js',
    sourceType: 'module',
  })
  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.message).join('\n'))
  }
  const body = toFunctionBody(transformed.code, program)
  return `export default async (__runtime) => {\nlet __default\n${body}\nreturn __default\n}\n`
}

function isInstantiate(value: unknown): value is (runtime: object) => Promise<unknown> {
  return typeof value === 'function'
}

function isHonoApp(
  value: unknown,
): value is { fetch(request: Request): Response | Promise<Response> } {
  return (
    typeof value === 'object' &&
    value !== null &&
    'fetch' in value &&
    typeof value.fetch === 'function'
  )
}

async function instantiate(module: string, runtime: object) {
  const url = URL.createObjectURL(new Blob([module], { type: 'text/javascript' }))
  try {
    const loaded: unknown = await import(/* @vite-ignore */ url)
    const factory =
      typeof loaded === 'object' && loaded !== null && 'default' in loaded ? loaded.default : null
    if (!isInstantiate(factory)) throw new Error('The mock module has no default export')
    const app = await factory(runtime)
    if (!isHonoApp(app)) throw new Error('The mock module does not export a Hono app')
    return app
  } finally {
    URL.revokeObjectURL(url)
  }
}

/**
 * Generates the mock server for `document` with hono-takibi's own generator and
 * runs it in this page. Every step that can fail answers with `ok: false`; the
 * generated code runs only when this is called, never on page load.
 */
export async function createMockServer(
  document: OpenAPI,
  options: MockOptions & { readonly locale?: MockLocale } = {},
) {
  try {
    const [{ makeMock }, runtime] = await Promise.all([
      import('hono-takibi/mock'),
      loadRuntime(options.locale),
    ])
    const code = makeMock(document, '', options)
    const app = await instantiate(await compileModule(code), runtime)
    const server: MockServer = {
      code,
      fetch: async (input, init) => app.fetch(new Request(input, init)),
    }
    return { ok: true, value: server } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

/** Whether `input` is a request to this page's origin, i.e. one for the mock. */
export function isMockRequest(input: string | URL | Request) {
  const url = typeof input === 'string' ? input : input instanceof URL ? input.href : input.url
  return new URL(url, location.href).origin === location.origin
}

/** The answer for a mock request when there is no server to ask. */
export function unavailableResponse(detail: string) {
  return new Response(
    JSON.stringify({ type: 'about:blank', title: 'Mock server unavailable', status: 503, detail }),
    { status: 503, headers: { 'Content-Type': 'application/problem+json' } },
  )
}
