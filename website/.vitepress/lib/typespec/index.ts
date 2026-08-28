import type { MonacoEditor } from '@guolao/vue-monaco-editor'
import type * as TypeSpecCompiler from '@typespec/compiler'
import type * as TypeSpecOpenAPI3 from '@typespec/openapi3'
import type { editor, languages, Position } from 'monaco-editor'
import { TextDocument } from 'vscode-languageserver-textdocument'

// config.ts evaluates the two constants below at VitePress config time; keep
// them at the top. The compiler/LSP wiring further down is dynamic-import /
// import-type only and never runs during node config evaluation.
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

export const MAIN_URI = 'file:///main.tsp'

const MAIN_PATH = '/main.tsp'

// Bare specifiers resolve through the page importmap (see config.ts) to the
// self-contained bundles emitted by @typespec/bundler. The specifier is always
// a member of TYPESPEC_LIBRARIES — never user input.
function importBundled(name: (typeof TYPESPEC_LIBRARIES)[number]) {
  return import(/* @vite-ignore */ name)
}

async function createTypeSpecContext() {
  const modules = await Promise.all(
    TYPESPEC_LIBRARIES.map(async (name) => {
      // _TypeSpecLibrary_ is injected into each bundle by @typespec/bundler;
      // it is not part of the libraries' public typings.
      const mod: {
        readonly _TypeSpecLibrary_: {
          readonly typespecSourceFiles: { readonly [path: string]: string }
          readonly jsSourceFiles: { readonly [path: string]: unknown }
        }
      } = await importBundled(name)
      return [name, mod] as const
    }),
  )
  const files = new Map<string, string>()
  const jsModules = new Map<string, unknown>()
  for (const [name, mod] of modules) {
    for (const [path, content] of Object.entries(mod._TypeSpecLibrary_.typespecSourceFiles)) {
      files.set(`/node_modules/${name}/${path}`, content)
    }
    for (const [path, jsModule] of Object.entries(mod._TypeSpecLibrary_.jsSourceFiles)) {
      files.set(`/node_modules/${name}/${path}`, '')
      jsModules.set(`/node_modules/${name}/${path}`, jsModule)
    }
  }
  const compiler: typeof TypeSpecCompiler = await importBundled('@typespec/compiler')
  const openapi3: typeof TypeSpecOpenAPI3 = await importBundled('@typespec/openapi3')
  return { compiler, openapi3, assets: { files, jsModules } }
}

type TypeSpecContext = Awaited<ReturnType<typeof createTypeSpecContext>>

const cache: { promise?: ReturnType<typeof createTypeSpecContext> } = {}

export function loadTypeSpecContext() {
  cache.promise ??= createTypeSpecContext()
  return cache.promise
}

function notFound(path: string) {
  return Object.assign(new Error(`File not found: ${path}`), { code: 'ENOENT' })
}

function parentDirsOf(path: string) {
  const segments = path.split('/').filter((s) => s.length > 0)
  return segments.slice(0, -1).map((_, index) => `/${segments.slice(0, index + 1).join('/')}`)
}

function createVirtualHost(
  assets: TypeSpecContext['assets'],
  compiler: TypeSpecContext['compiler'],
): TypeSpecCompiler.CompilerHost {
  const allPaths = [...assets.files.keys(), ...assets.jsModules.keys()]
  const directories = new Set(allPaths.flatMap(parentDirsOf))

  function isFile(path: string) {
    return assets.files.has(path) || assets.jsModules.has(path)
  }

  return {
    readUrl: async (url) => {
      throw notFound(url)
    },
    readFile: async (path) => {
      const content = assets.files.get(path)
      if (content === undefined) throw notFound(path)
      return compiler.createSourceFile(content, path)
    },
    writeFile: async () => {},
    readDir: async (dir) => {
      const prefix = dir.endsWith('/') ? dir : `${dir}/`
      const names = allPaths
        .filter((p) => p.startsWith(prefix))
        .map((p) => p.slice(prefix.length).split('/')[0] ?? '')
      return [...new Set(names)].filter((n) => n.length > 0)
    },
    rm: async () => {},
    mkdirp: async (path) => path,
    stat: async (path) => {
      if (isFile(path)) return { isFile: () => true, isDirectory: () => false }
      if (directories.has(path)) return { isFile: () => false, isDirectory: () => true }
      throw notFound(path)
    },
    realpath: async (path) => path,
    getExecutionRoot: () => '/node_modules/@typespec/compiler',
    getLibDirs: () => ['/node_modules/@typespec/compiler/lib/std'],
    getJsImport: async (path) => {
      const mod = assets.jsModules.get(path)
      if (mod === undefined) throw notFound(path)
      if (typeof mod !== 'object' || mod === null) throw notFound(path)
      return { ...mod }
    },
    getSourceFileKind: (path) => compiler.getSourceFileKindFromExt(path),
    fileURLToPath: (url) => url.replace(/^file:\/\//, ''),
    pathToFileURL: (path) => `file://${path}`,
    logSink: { log: () => {} },
  }
}

export async function compileTypeSpec(source: string, context: TypeSpecContext) {
  try {
    const files = new Map(context.assets.files).set(MAIN_PATH, source)
    const host = createVirtualHost({ files, jsModules: context.assets.jsModules }, context.compiler)
    const program = await context.compiler.compile(host, MAIN_PATH, { noEmit: true })
    const errors = program.diagnostics.filter((d) => d.severity === 'error')
    if (errors.length > 0) {
      const messages = errors.map((d) => `${d.code}: ${d.message}`).join('\n')
      return {
        ok: false,
        error: `${TYPESPEC_COMPILE_FAILED_PREFIX}:\n${messages}`,
      } as const
    }
    const [record] = await context.openapi3.getOpenAPI3(program)
    if (!record) {
      return { ok: false, error: 'TypeSpec compile produced no OpenAPI document' } as const
    }
    const tsp = 'document' in record ? record.document : record.versions[0]?.document
    if (!tsp) {
      return { ok: false, error: 'TypeSpec compile produced no OpenAPI document' } as const
    }
    // JSON round-trip drops non-serializable values the emitter may leave in
    // the document and yields a plain-object clone.
    const document: unknown = JSON.parse(JSON.stringify(tsp))
    if (typeof document !== 'object' || document === null || Array.isArray(document)) {
      return { ok: false, error: 'TypeSpec compile produced an invalid OpenAPI document' } as const
    }
    return { ok: true, value: document } as const
  } catch (e) {
    return { ok: false, error: e instanceof Error ? e.message : String(e) } as const
  }
}

function textDocumentForModel(model: editor.ITextModel) {
  return TextDocument.create(
    model.uri.toString(),
    'typespec',
    model.getVersionId(),
    model.getValue(),
  )
}

function toMonacoRange(range: {
  readonly start: { readonly line: number; readonly character: number }
  readonly end: { readonly line: number; readonly character: number }
}) {
  return {
    startLineNumber: range.start.line + 1,
    startColumn: range.start.character + 1,
    endLineNumber: range.end.line + 1,
    endColumn: range.end.character + 1,
  }
}

function toDocString(doc: unknown) {
  if (typeof doc === 'string') return doc
  if (typeof doc === 'object' && doc !== null && 'value' in doc && typeof doc.value === 'string') {
    return doc.value
  }
  return undefined
}

function toIndentAction(monaco: MonacoEditor, indent: string) {
  if (indent === 'indent') return monaco.languages.IndentAction.Indent
  if (indent === 'indentOutdent') return monaco.languages.IndentAction.IndentOutdent
  if (indent === 'outdent') return monaco.languages.IndentAction.Outdent
  return monaco.languages.IndentAction.None
}

// The compiler ships its language configuration as plain data ({ pattern }
// objects); monaco wants RegExp instances and IndentAction enum members. The
// upstream playground converts onEnterRules only (and drops afterText) — both
// indentationRules and afterText matter for doc-comment continuation.
function toLanguageConfiguration(
  monaco: MonacoEditor,
  config: TypeSpecContext['compiler']['TypeSpecLanguageConfiguration'],
): languages.LanguageConfiguration {
  return {
    comments: {
      lineComment: config.comments.lineComment,
      blockComment: [config.comments.blockComment[0], config.comments.blockComment[1]],
    },
    brackets: config.brackets.map(([open, close]): [string, string] => [open, close]),
    autoClosingPairs: config.autoClosingPairs.map((pair) => ({
      open: pair.open,
      close: pair.close,
      ...('notIn' in pair ? { notIn: [...pair.notIn] } : {}),
    })),
    surroundingPairs: config.surroundingPairs.map((pair) => ({
      open: pair.open,
      close: pair.close,
    })),
    indentationRules: {
      decreaseIndentPattern: new RegExp(config.indentationRules.decreaseIndentPattern.pattern),
      increaseIndentPattern: new RegExp(config.indentationRules.increaseIndentPattern.pattern),
      ...(config.indentationRules.unIndentedLinePattern
        ? {
            unIndentedLinePattern: new RegExp(
              config.indentationRules.unIndentedLinePattern.pattern,
            ),
          }
        : {}),
    },
    onEnterRules: config.onEnterRules.map((rule) => ({
      beforeText: new RegExp(rule.beforeText.pattern),
      ...('afterText' in rule ? { afterText: new RegExp(rule.afterText.pattern) } : {}),
      ...('previousLineText' in rule
        ? { previousLineText: new RegExp(rule.previousLineText.pattern) }
        : {}),
      action: {
        indentAction: toIndentAction(monaco, rule.action.indent),
        ...('appendText' in rule.action ? { appendText: rule.action.appendText } : {}),
        ...('removeText' in rule.action ? { removeText: rule.action.removeText } : {}),
      },
    })),
  }
}

export async function initTypeSpecMonaco(monaco: MonacoEditor, context: TypeSpecContext) {
  function mainModel() {
    return monaco.editor.getModel(monaco.Uri.parse(MAIN_URI))
  }

  // /main.tsp is a first-class member of the virtual fs (stat / readDir /
  // realpath all see it); only its content is served live from the editor.
  const base = createVirtualHost(
    {
      files: new Map(context.assets.files).set(MAIN_PATH, ''),
      jsModules: context.assets.jsModules,
    },
    context.compiler,
  )
  const compilerHost = {
    ...base,
    readFile: async (path: string) =>
      path === MAIN_PATH
        ? context.compiler.createSourceFile(mainModel()?.getValue() ?? '', path)
        : base.readFile(path),
  }
  const serverHost: TypeSpecCompiler.ServerHost = {
    compilerHost,
    getOpenDocumentByURL(url) {
      const model = monaco.editor.getModel(monaco.Uri.parse(url))
      return model ? textDocumentForModel(model) : undefined
    },
    // Unlike the upstream playground (which splits error markers off to its
    // own compilation), all diagnostics render here — this playground has no
    // other marker source.
    sendDiagnostics({ uri, diagnostics }) {
      if (uri !== MAIN_URI) return
      const model = mainModel()
      if (model?.getLanguageId() !== 'typespec') return
      const severityMap: { readonly [k: number]: number } = {
        1: monaco.MarkerSeverity.Error,
        2: monaco.MarkerSeverity.Warning,
        3: monaco.MarkerSeverity.Info,
        4: monaco.MarkerSeverity.Hint,
      }
      monaco.editor.setModelMarkers(
        model,
        'typespec',
        diagnostics.map((d) => ({
          severity: severityMap[d.severity ?? 1] ?? monaco.MarkerSeverity.Error,
          message: d.message,
          ...(d.code === undefined ? {} : { code: String(d.code) }),
          ...(d.source === undefined ? {} : { source: d.source }),
          ...toMonacoRange(d.range),
        })),
      )
    },
    log: () => {},
    applyEdit: async () => ({ applied: false }),
  }

  const server = context.compiler.createServer(serverHost)
  const initResult = await server.initialize({
    capabilities: {},
    processId: 1,
    workspaceFolders: [],
    // oxlint-disable-next-line typescript/no-deprecated -- the TypeSpec server still reads rootUri; keep the initialize params the upstream playground sends
    rootUri: 'inmemory://',
  })
  server.initialized({})

  // The server debounces recompiles internally (update-manager), so content
  // changes feed checkChange directly — no client-side debounce.
  function watchModel(model: editor.ITextModel) {
    if (model.getLanguageId() !== 'typespec') return
    model.onDidChangeContent(() => {
      server.checkChange({ document: textDocumentForModel(model) })
    })
    server.checkChange({ document: textDocumentForModel(model) })
  }
  for (const model of monaco.editor.getModels()) {
    watchModel(model)
  }
  monaco.editor.onDidCreateModel(watchModel)

  monaco.languages.setLanguageConfiguration(
    'typespec',
    toLanguageConfiguration(monaco, context.compiler.TypeSpecLanguageConfiguration),
  )

  function documentArgs(model: editor.ITextModel) {
    return { textDocument: textDocumentForModel(model) }
  }

  function positionArgs(model: editor.ITextModel, position: Position) {
    return {
      ...documentArgs(model),
      position: { line: position.lineNumber - 1, character: position.column - 1 },
    }
  }

  const completionKindMap: { readonly [k: number]: number } = {
    1: monaco.languages.CompletionItemKind.Text,
    2: monaco.languages.CompletionItemKind.Method,
    3: monaco.languages.CompletionItemKind.Function,
    4: monaco.languages.CompletionItemKind.Constructor,
    5: monaco.languages.CompletionItemKind.Field,
    6: monaco.languages.CompletionItemKind.Variable,
    7: monaco.languages.CompletionItemKind.Class,
    8: monaco.languages.CompletionItemKind.Interface,
    9: monaco.languages.CompletionItemKind.Module,
    10: monaco.languages.CompletionItemKind.Property,
    11: monaco.languages.CompletionItemKind.Unit,
    12: monaco.languages.CompletionItemKind.Value,
    13: monaco.languages.CompletionItemKind.Enum,
    14: monaco.languages.CompletionItemKind.Keyword,
    15: monaco.languages.CompletionItemKind.Snippet,
    16: monaco.languages.CompletionItemKind.Color,
    17: monaco.languages.CompletionItemKind.File,
    18: monaco.languages.CompletionItemKind.Reference,
    19: monaco.languages.CompletionItemKind.Folder,
    20: monaco.languages.CompletionItemKind.EnumMember,
    21: monaco.languages.CompletionItemKind.Constant,
    22: monaco.languages.CompletionItemKind.Struct,
    23: monaco.languages.CompletionItemKind.Event,
    24: monaco.languages.CompletionItemKind.Operator,
    25: monaco.languages.CompletionItemKind.TypeParameter,
  }

  monaco.languages.registerCompletionItemProvider('typespec', {
    triggerCharacters: [
      ...(initResult.capabilities.completionProvider?.triggerCharacters ?? ['.', '@', '/']),
    ],
    async provideCompletionItems(model: editor.ITextModel, position: Position) {
      if (model.uri.toString() !== MAIN_URI) return { suggestions: [] }
      const result = await server.complete(positionArgs(model, position))
      const word = model.getWordUntilPosition(position)
      const defaultRange = {
        startLineNumber: position.lineNumber,
        endLineNumber: position.lineNumber,
        startColumn: word.startColumn,
        endColumn: word.endColumn,
      }
      return {
        suggestions: result.items.map((item) => {
          const textEdit = item.textEdit && 'range' in item.textEdit ? item.textEdit : undefined
          return {
            label: item.label,
            kind: completionKindMap[item.kind ?? 1] ?? monaco.languages.CompletionItemKind.Text,
            detail: item.detail,
            documentation: toDocString(item.documentation),
            insertText: textEdit ? textEdit.newText : (item.insertText ?? item.label),
            range: textEdit ? toMonacoRange(textEdit.range) : defaultRange,
            insertTextRules:
              item.insertTextFormat === 2
                ? monaco.languages.CompletionItemInsertTextRule.InsertAsSnippet
                : undefined,
            commitCharacters:
              item.commitCharacters ??
              initResult.capabilities.completionProvider?.allCommitCharacters,
            tags: item.tags,
          }
        }),
      }
    },
  })

  monaco.languages.registerHoverProvider('typespec', {
    async provideHover(model: editor.ITextModel, position: Position) {
      if (model.uri.toString() !== MAIN_URI) return null
      const hover = await server.getHover(positionArgs(model, position))
      const value = toDocString(hover.contents)
      if (value === undefined) return null
      return {
        contents: [{ value }],
        range: hover.range ? toMonacoRange(hover.range) : undefined,
      }
    },
  })

  monaco.languages.registerSignatureHelpProvider('typespec', {
    signatureHelpTriggerCharacters: ['(', ',', '<'],
    signatureHelpRetriggerCharacters: [')'],
    async provideSignatureHelp(model: editor.ITextModel, position: Position) {
      if (model.uri.toString() !== MAIN_URI) return null
      const help = await server.getSignatureHelp(positionArgs(model, position))
      if (!help) return null
      return {
        value: {
          signatures: help.signatures.map((signature) => ({
            label: signature.label,
            documentation: toDocString(signature.documentation),
            parameters: (signature.parameters ?? []).map((parameter) => ({
              label: parameter.label,
              documentation: toDocString(parameter.documentation),
            })),
          })),
          activeSignature: help.activeSignature ?? 0,
          activeParameter: help.activeParameter ?? 0,
        },
        dispose: () => {},
      }
    },
  })

  monaco.languages.registerDocumentFormattingEditProvider('typespec', {
    async provideDocumentFormattingEdits(
      model: editor.ITextModel,
      options: languages.FormattingOptions,
    ) {
      if (model.uri.toString() !== MAIN_URI) return []
      const edits = await server.formatDocument({
        ...documentArgs(model),
        options: { tabSize: options.tabSize, insertSpaces: options.insertSpaces },
      })
      return edits.map((edit) => ({ range: toMonacoRange(edit.range), text: edit.newText }))
    },
  })

  monaco.languages.registerFoldingRangeProvider('typespec', {
    async provideFoldingRanges(model: editor.ITextModel) {
      if (model.uri.toString() !== MAIN_URI) return []
      const ranges = await server.getFoldingRanges(documentArgs(model))
      return ranges.map((range) => ({ start: range.startLine + 1, end: range.endLine + 1 }))
    },
  })

  // Compiler-driven highlighting; the Monarch tokenizer stays as the instant
  // fallback until tokens arrive. Requires 'semanticHighlighting.enabled' on
  // the editor options.
  const semanticTokensLegend = initResult.capabilities.semanticTokensProvider?.legend
  if (semanticTokensLegend) {
    monaco.languages.registerDocumentSemanticTokensProvider('typespec', {
      getLegend() {
        return {
          tokenModifiers: [...semanticTokensLegend.tokenModifiers],
          tokenTypes: semanticTokensLegend.tokenTypes.map((entry) => {
            switch (entry) {
              case 'namespace':
              case 'class':
              case 'enum':
              case 'typeParameter':
              case 'struct':
              case 'interface':
                return 'type'
              case 'property':
              case 'enumMember':
                return 'variable'
              case 'docCommentTag':
                return 'keyword'
              default:
                return entry
            }
          }),
        }
      },
      async provideDocumentSemanticTokens(model: editor.ITextModel) {
        if (model.uri.toString() !== MAIN_URI) return null
        const result = await server.buildSemanticTokens(documentArgs(model))
        return { resultId: result.resultId, data: new Uint32Array(result.data) }
      },
      releaseDocumentSemanticTokens() {},
    })
  }
}
