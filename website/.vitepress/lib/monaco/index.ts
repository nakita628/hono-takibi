import type { MonacoEditor } from '@guolao/vue-monaco-editor'

// Pinned to the versions hono-takibi generates for; bump together with the
// hono-takibi devDependency.
const HONO_VERSION = '4.12.22'
const ZOD_VERSION = '4.4.3'
const HONO_ZOD_OPENAPI_VERSION = '1.4.0'

const ZOD_OPENAPI_AUGMENT_BODY = `
  interface ZodType {
    openapi(refId: string, metadata?: { readonly [k: string]: unknown }): this
    openapi(metadata: { readonly [k: string]: unknown }): this
  }
`

const EXTRA_LIB_MODULES = [
  {
    alias: '@hono/zod-openapi',
    spec: `@hono/zod-openapi@${HONO_ZOD_OPENAPI_VERSION}?deps=hono@${HONO_VERSION},zod@${ZOD_VERSION}`,
    path: 'file:///node_modules/@hono/zod-openapi/index.d.ts',
    augmentBody: '',
    augmentTargetMarker: '',
    excludeModulePrefixes: ['zod'],
  },
  {
    alias: 'zod',
    spec: `zod@${ZOD_VERSION}`,
    path: 'file:///node_modules/zod/index.d.ts',
    augmentBody: ZOD_OPENAPI_AUGMENT_BODY,
    augmentTargetMarker: 'interface ZodType',
    excludeModulePrefixes: [],
  },
]

// The monaco-editor package and its workers stay behind this dynamic import so
// statically importing this module never pulls them into the page chunk.
export async function loadMonaco() {
  const [monaco, editorWorker, jsonWorker, tsWorker] = await Promise.all([
    import('monaco-editor'),
    import('monaco-editor/esm/vs/editor/editor.worker?worker'),
    import('monaco-editor/esm/vs/language/json/json.worker?worker'),
    import('monaco-editor/esm/vs/language/typescript/ts.worker?worker'),
  ])
  self.MonacoEnvironment = {
    getWorker: (_workerId: string, label: string) => {
      if (label === 'typescript' || label === 'javascript') return new tsWorker.default()
      if (label === 'json') return new jsonWorker.default()
      return new editorWorker.default()
    },
  }
  return monaco
}

export function registerTypeSpecLanguage(monaco: MonacoEditor) {
  monaco.languages.register({ id: 'typespec', extensions: ['.tsp'] })
  monaco.editor.defineTheme('typespec', {
    base: 'vs',
    inherit: true,
    colors: {},
    rules: [
      { token: 'macro', foreground: '#800000' },
      { token: 'function', foreground: '#795E26' },
    ],
  })
  monaco.editor.defineTheme('typespec-dark', {
    base: 'vs-dark',
    inherit: true,
    colors: {},
    rules: [
      { token: 'macro', foreground: '#E06C75' },
      { token: 'function', foreground: '#E06C75' },
    ],
  })
  monaco.languages.setMonarchTokensProvider('typespec', {
    keywords: [
      'import',
      'using',
      'namespace',
      'model',
      'interface',
      'op',
      'enum',
      'union',
      'alias',
      'scalar',
      'extends',
      'is',
      'extern',
      'dec',
      'fn',
      'const',
      'if',
      'else',
      'valueof',
      'void',
      'never',
      'unknown',
    ],
    tokenizer: {
      root: [
        [/@@?[a-zA-Z_][\w]*/, 'tag'],
        [/[a-zA-Z_][\w]*/, { cases: { '@keywords': 'keyword', '@default': 'identifier' } }],
        [/"""/, 'string', '@tripleString'],
        [/"([^"\\]|\\.)*"/, 'string'],
        [/\/\/.*$/, 'comment'],
        [/\/\*/, 'comment', '@comment'],
        [/\d+(\.\d+)?/, 'number'],
        [/[{}()[\]<>|=?:;,.]/, 'delimiter'],
      ],
      comment: [
        [/\*\//, 'comment', '@pop'],
        [/./, 'comment'],
      ],
      tripleString: [
        [/"""/, 'string', '@pop'],
        [/./, 'string'],
      ],
    },
  })
}

export function configureTypeScriptDefaults(monaco: MonacoEditor) {
  const { typescriptDefaults, ScriptTarget, ModuleKind, ModuleResolutionKind } =
    monaco.languages.typescript
  typescriptDefaults.setCompilerOptions({
    target: ScriptTarget.ES2020,
    module: ModuleKind.ESNext,
    moduleResolution: ModuleResolutionKind.NodeJs,
    esModuleInterop: true,
    allowSyntheticDefaultImports: true,
    skipLibCheck: true,
    noEmit: true,
    strict: true,
  })
}

async function getBundledDts(
  module: { readonly spec: string; readonly alias: string },
  augmentBody = '',
  augmentTargetMarker = '',
  excludeModulePrefixes: readonly string[] = [],
) {
  const ESM_URL_PATTERN =
    /^https:\/\/esm\.sh\/(?:v\d+\/)?(@?[\w.-]+(?:\/[\w.-]+)?)(?:@[\w.\-+]+)?(\/[^?]*)?(?:\?.*)?$/

  function normalizeModulePath(url: string) {
    const matched = ESM_URL_PATTERN.exec(url)
    if (!matched) return (url.split('?')[0] ?? url).replace(/\.d\.[mc]?ts$/, '')
    const pkg = matched[1] ?? ''
    const subpath = (matched[2] ?? '').replace(/\.d\.[mc]?ts$/, '')
    return `${pkg}${subpath}`
  }

  function fetchWithTimeout(url: string) {
    return fetch(url, { signal: AbortSignal.timeout(8000) })
  }

  async function walkDts(
    rootUrl: string,
    visited: ReadonlyMap<string, string>,
  ): Promise<ReadonlyMap<string, string>> {
    if (visited.has(rootUrl)) return visited
    const res = await fetchWithTimeout(rootUrl)
    const dts = res.ok ? await res.text() : ''
    const dtsImports = Array.from(dts.matchAll(/from\s+["']([^"']+)["']/g))
      .map((match) => match[1] ?? '')
      .filter((p) => /\.d\.[mc]?ts$/.test(p))
    const resolvedUrls = dtsImports.map((p) => new URL(p, rootUrl).toString())
    const rewritten = dtsImports.reduce(
      (acc, original, index) =>
        acc.replace(original, normalizeModulePath(resolvedUrls[index] ?? '')),
      dts,
    )
    const next = new Map(visited).set(rootUrl, rewritten)
    return resolvedUrls.reduce<Promise<ReadonlyMap<string, string>>>(
      async (accPromise, childUrl) => walkDts(childUrl, await accPromise),
      Promise.resolve(next),
    )
  }

  const res = await fetchWithTimeout(`https://esm.sh/${module.spec}`)
  if (!res.ok) return ''
  const indexDtsUrl = res.headers.get('x-typescript-types')
  if (!indexDtsUrl) return ''
  const files = await walkDts(indexDtsUrl, new Map())
  const indexModulePath = normalizeModulePath(indexDtsUrl)
  const declarations = Array.from(files.entries())
    .filter(([url]) => {
      const path = normalizeModulePath(url)
      return !excludeModulePrefixes.some(
        (prefix) => path === prefix || path.startsWith(`${prefix}/`),
      )
    })
    .map(([url, dts]) => `declare module "${normalizeModulePath(url)}"{${dts}}`)
    .join('\n')
  const augmentTargetUrl = augmentTargetMarker
    ? Array.from(files.entries()).find(([_url, dts]) => dts.includes(augmentTargetMarker))?.[0]
    : undefined
  const augmentTarget = augmentTargetUrl ? normalizeModulePath(augmentTargetUrl) : indexModulePath
  const augment = augmentBody ? `declare module "${augmentTarget}"{${augmentBody}}` : ''
  return `${declarations}\n${augment}\ndeclare module "${module.alias}" {export * from "${indexModulePath}"}`
}

// Type-acquisition only: the fetched text feeds addExtraLib (monaco's TS
// worker) and nothing else. Failures degrade to no type info — generation
// never depends on it.
export function loadOutputEditorTypes(monaco: MonacoEditor) {
  const { typescriptDefaults } = monaco.languages.typescript
  return Promise.all(
    EXTRA_LIB_MODULES.map(async (mod) => {
      const dts = await getBundledDts(
        { spec: mod.spec, alias: mod.alias },
        mod.augmentBody,
        mod.augmentTargetMarker,
        mod.excludeModulePrefixes,
      )
      if (dts) {
        typescriptDefaults.addExtraLib(dts, mod.path)
      }
    }),
  )
    .then(() => {})
    .catch(() => {})
}
