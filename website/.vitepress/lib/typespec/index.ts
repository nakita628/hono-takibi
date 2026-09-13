import type { Diagnostic } from '@typespec/compiler'
import type * as TypeSpecOpenAPI3 from '@typespec/openapi3'
import type { BrowserHost } from '@typespec/playground'

// config.ts evaluates the two constants below at VitePress config time; keep
// them at the top. Everything further down is dynamic-import / import-type
// only and never runs during node config evaluation.
export const TYPESPEC_LIBRARIES = [
  '@typespec/compiler',
  '@typespec/http',
  '@typespec/rest',
  '@typespec/openapi',
  '@typespec/openapi3',
  '@typespec/versioning',
  '@typespec/streams',
  '@typespec/events',
  '@typespec/sse',
  '@typespec/json-schema',
  '@typespec/xml',
] as const

export const TYPESPEC_BUNDLES_DIR = 'typespec-bundles'

export const TYPESPEC_COMPILE_FAILED_PREFIX = 'TypeSpec compile failed'

// @typespec/playground's browser host roots its virtual file system at /test
// and maps paths to `inmemory:/` URLs, so the editor model has to live at this
// URI for the language server to read it live.
export const MAIN_URI = 'inmemory://test/main.tsp'

const MAIN_PATH = '/test/main.tsp'

// @typespec/playground statically imports monaco-editor; keeping it behind a
// dynamic import keeps both out of the page chunk (see lib/monaco).
async function createTypeSpecContext() {
  const { createBrowserHost, registerMonacoLanguage } = await import('@typespec/playground')
  // The host resolves each name through the page importmap (see config.ts) to
  // the self-contained bundle emitted by @typespec/bundler, and so does the
  // openapi3 import below — the specifier is a member of TYPESPEC_LIBRARIES,
  // never user input.
  const host = await createBrowserHost(TYPESPEC_LIBRARIES)
  const openapi3: typeof TypeSpecOpenAPI3 = await import(/* @vite-ignore */ '@typespec/openapi3')
  // Language registration, LSP-backed completion / hover / formatting /
  // semantic tokens, and the `typespec` / `typespec-dark` editor themes.
  await registerMonacoLanguage(host)
  return { host, openapi3 }
}

type TypeSpecContext = Awaited<ReturnType<typeof createTypeSpecContext>>

const cache: { promise?: ReturnType<typeof createTypeSpecContext> } = {}

export function loadTypeSpecContext() {
  cache.promise ??= createTypeSpecContext()
  return cache.promise
}

export type TypeSpecMarker = {
  readonly severity: Diagnostic['severity']
  readonly message: string
  readonly startLineNumber: number
  readonly startColumn: number
  readonly endLineNumber: number
  readonly endColumn: number
}

// The language server only paints tag markers (unused / deprecated); error and
// warning markers come from the playground's own compilation, as upstream does.
function toMarker(compiler: BrowserHost['compiler'], diagnostic: Diagnostic): TypeSpecMarker {
  const location = compiler.getSourceLocation(diagnostic.target, { locateId: true })
  const inMain = location?.file.path === MAIN_PATH
  const start = inMain
    ? location.file.getLineAndCharacterOfPosition(location.pos)
    : { line: 0, character: 0 }
  const end = inMain
    ? location.file.getLineAndCharacterOfPosition(location.end)
    : { line: 0, character: 0 }
  return {
    severity: diagnostic.severity,
    message: diagnostic.message,
    startLineNumber: start.line + 1,
    startColumn: start.character + 1,
    endLineNumber: end.line + 1,
    endColumn: end.character + 1,
  }
}

export async function compileTypeSpec(source: string, context: TypeSpecContext) {
  const { host, openapi3 } = context
  try {
    await host.writeFile(MAIN_PATH, source)
    const program = await host.compiler.compile(host, MAIN_PATH, { noEmit: true })
    const markers = program.diagnostics.map((diagnostic) => toMarker(host.compiler, diagnostic))
    const errors = program.diagnostics.filter((d) => d.severity === 'error')
    if (errors.length > 0) {
      const messages = errors.map((d) => `${d.code}: ${d.message}`).join('\n')
      return {
        ok: false,
        error: `${TYPESPEC_COMPILE_FAILED_PREFIX}:\n${messages}`,
        markers,
      } as const
    }
    const [record] = await openapi3.getOpenAPI3(program)
    if (!record) {
      return { ok: false, error: 'TypeSpec compile produced no OpenAPI document', markers } as const
    }
    const tsp = 'document' in record ? record.document : record.versions[0]?.document
    if (!tsp) {
      return { ok: false, error: 'TypeSpec compile produced no OpenAPI document', markers } as const
    }
    // JSON round-trip drops non-serializable values the emitter may leave in
    // the document and yields a plain-object clone.
    const document: unknown = JSON.parse(JSON.stringify(tsp))
    if (typeof document !== 'object' || document === null || Array.isArray(document)) {
      return {
        ok: false,
        error: 'TypeSpec compile produced an invalid OpenAPI document',
        markers,
      } as const
    }
    return { ok: true, value: document, markers } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e), markers: [] } as const
  }
}
