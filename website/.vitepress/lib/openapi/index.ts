import type * as ZodOpenAPIHono from 'hono-takibi/zod-openapi-hono'
import { load } from 'js-yaml'

import { compileTypeSpec, loadTypeSpecContext, type TypeSpecMarker } from '../typespec'

export const MODES = ['typespec', 'yaml', 'json'] as const

export function isMode(value: unknown): value is (typeof MODES)[number] {
  return MODES.some((mode) => mode === value)
}

type OpenAPI = Parameters<(typeof ZodOpenAPIHono)['zodOpenAPIHono']>[0]

function isOpenAPIDocument(value: unknown): value is { readonly [key: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

async function parseDocument(source: string, mode: (typeof MODES)[number]) {
  if (mode === 'typespec') {
    return compileTypeSpec(source, await loadTypeSpecContext())
  }
  const document: unknown = mode === 'json' ? JSON.parse(source) : load(source)
  const markers: readonly TypeSpecMarker[] = []
  if (!isOpenAPIDocument(document)) {
    return { ok: false, error: 'Input must be an OpenAPI document (object)', markers } as const
  }
  return { ok: true, value: document, markers } as const
}

// Single entry point for $ref resolution, shared by every input mode so the
// playground preprocesses documents exactly like the hono-takibi CLI.
// External resolvers stay disabled: in the browser json-schema-ref-parser
// skips its unsafe-URL guard, so external $refs would let a pasted spec probe
// arbitrary URLs from the visitor's browser. Internal #/... refs need no I/O.
async function bundleDocument(document: { readonly [key: string]: unknown }) {
  try {
    const { default: SwaggerParser } = await import('@apidevtools/swagger-parser')
    // json-schema-ref-parser only calls Buffer.isBuffer on the paths this
    // playground exercises (object input + internal refs), and no Node Buffer
    // can reach browser input — the stub is behaviorally identical to a full
    // polyfill. Re-verify Buffer usage stays isBuffer-only when updating
    // @apidevtools/swagger-parser.
    const globalScope: { Buffer?: { isBuffer: (value: unknown) => boolean } } = globalThis
    globalScope.Buffer ??= { isBuffer: () => false }
    const bundled = await SwaggerParser.bundle(
      document as Awaited<ReturnType<typeof SwaggerParser.bundle>>,
      { resolve: { external: false } },
    )
    return { ok: true, value: bundled } as const
  } catch (e) {
    const message = e instanceof Error ? (e.message.split('\n')[0] ?? e.message) : String(e)
    return { ok: false, error: `OpenAPI bundle failed: ${message}` } as const
  }
}

async function formatCode(code: string) {
  try {
    const [prettier, pluginEstree, pluginTs] = await Promise.all([
      import('prettier/standalone'),
      import('prettier/plugins/estree'),
      import('prettier/plugins/typescript'),
    ])
    // The standalone build resolves no parsers on its own; estree and
    // typescript must be passed explicitly.
    const formatted = await prettier.format(code, {
      parser: 'typescript',
      plugins: [pluginEstree, pluginTs],
      printWidth: 100,
      singleQuote: true,
      semi: false,
    })
    return { ok: true, value: formatted } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

// `markers` are the TypeSpec compile diagnostics for the editor (empty for the
// other modes); they travel with every outcome so the editor stays in sync.
export async function generate(
  source: string,
  mode: (typeof MODES)[number],
  options: Parameters<(typeof ZodOpenAPIHono)['zodOpenAPIHono']>[1],
) {
  const noMarkers: readonly TypeSpecMarker[] = []
  try {
    const parsed = await parseDocument(source, mode)
    const { markers } = parsed
    if (!parsed.ok) {
      return { ok: false, error: parsed.error, markers } as const
    }
    if (!isOpenAPIDocument(parsed.value)) {
      return { ok: false, error: 'Input did not produce an OpenAPI document', markers } as const
    }
    const bundled = await bundleDocument(parsed.value)
    if (!bundled.ok) {
      return { ok: false, error: bundled.error, markers } as const
    }
    const { zodOpenAPIHono } = await import('hono-takibi/zod-openapi-hono')
    const formatted = await formatCode(zodOpenAPIHono(bundled.value as OpenAPI, options))
    return formatted.ok
      ? ({ ok: true, value: formatted.value, markers } as const)
      : ({ ok: false, error: formatted.error, markers } as const)
  } catch (e) {
    return {
      ok: false,
      error: e instanceof Error ? e.message : String(e),
      markers: noMarkers,
    } as const
  }
}
