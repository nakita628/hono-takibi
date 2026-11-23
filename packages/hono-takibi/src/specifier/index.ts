import path from 'node:path'

import { Context, Effect, FileSystem } from 'effect'

import { parseSource } from '../helper/syntax.js'

/** The alias a `#` `pathAlias` stands for: its prefix and the directory it maps. */
type Alias = { readonly prefix: string; readonly directory: string }

/**
 * How the files of a run spell the modules they import from one another.
 *
 * With a `#` `pathAlias` (package.json `imports`, which Node resolves), every specifier that
 * names a generated file is fully specified — `#/handlers/index.ts`, `./users.ts` — because
 * Node, tsc and esbuild neither search for extensions nor resolve a directory to its
 * `index.ts`. `written` collects the files of the run, which are respecified once every one
 * of them exists (`respecifyWritten`).
 */
export const ImportStyle = Context.Reference<{
  readonly fullySpecified: boolean
  readonly alias?: Alias
  readonly written?: Set<string>
}>('hono-takibi/ImportStyle', { defaultValue: () => ({ fullySpecified: false }) })

/** Whether `pathAlias` is a package.json `imports` alias, which Node resolves. */
export function isImportsAlias(pathAlias: string | undefined) {
  return pathAlias?.startsWith('#') === true
}

/**
 * The module a specifier names, for telling the spelling full specification writes from the
 * one the generator writes: `./users.ts` is `./users`, `#/handlers/index.ts` is `#/handlers`,
 * `./index.ts` is `.`. A specifier without an extension is returned as it is, so spellings
 * that predate full specification (`..` and `../index`) stay apart as they always were.
 */
export function canonicalSpecifier(specifier: string) {
  const bare = specifier.replace(/\.(?:ts|js|mts|mjs|cts|cjs)$/u, '')
  if (bare === specifier) return specifier
  if (bare === './index') return '.'
  if (bare === '../index') return '..'
  return bare.replace(/\/index$/u, '')
}

/** A specifier that already names a file by its extension. */
function hasExtension(specifier: string) {
  return /\.[cm]?[jt]sx?$|\.json$/u.test(specifier)
}

/** The path a specifier in `file` stands for, when it is relative or under the alias. */
function targetOf(specifier: string, file: string, alias: Alias | undefined) {
  if (specifier === '.' || specifier === '..') return path.resolve(path.dirname(file), specifier)
  if (specifier.startsWith('./') || specifier.startsWith('../')) {
    return path.resolve(path.dirname(file), specifier)
  }
  if (alias === undefined) return undefined
  // `#/api` names the directory the alias stands for; `#/api/routes` a path inside it.
  const bare = alias.prefix.replace(/\/$/u, '')
  if (specifier === bare) return alias.directory
  if (specifier.startsWith(`${bare}/`)) {
    return path.join(alias.directory, specifier.slice(bare.length + 1))
  }
  return undefined
}

/**
 * `code` with every relative and alias specifier that names a TypeScript module completed to
 * its file: `X` → `X.ts` when that file exists, `X/index.ts` when that does. Specifiers of
 * packages, ones with an extension and ones that name nothing on disk are left as they are,
 * and so is a module that does not parse.
 */
export function fullySpecify(code: string, file: string, alias: Alias | undefined) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const { program, errors } = parseSource(code)
    if (errors.length > 0) return code
    const sources = program.body.flatMap((statement) =>
      (statement.type === 'ImportDeclaration' ||
        statement.type === 'ExportAllDeclaration' ||
        statement.type === 'ExportNamedDeclaration') &&
      statement.source !== null
        ? [statement.source]
        : [],
    )
    const isFile = (candidate: string) =>
      fs.stat(candidate).pipe(
        Effect.map((info) => info.type === 'File'),
        Effect.orElseSucceed(() => false),
      )
    const edits: { readonly start: number; readonly end: number; readonly text: string }[] = []
    for (const source of sources) {
      const specifier = source.value
      if (hasExtension(specifier)) continue
      const target = targetOf(specifier, file, alias)
      if (target === undefined) continue
      const completed = (yield* isFile(`${target}.ts`))
        ? `${specifier}.ts`
        : (yield* isFile(path.join(target, 'index.ts')))
          ? `${specifier.replace(/\/$/u, '')}/index.ts`
          : undefined
      if (completed === undefined) continue
      const quote = code[source.start] ?? "'"
      edits.push({ start: source.start, end: source.end, text: `${quote}${completed}${quote}` })
    }
    return edits
      .toSorted((a, b) => b.start - a.start)
      .reduce(
        (text, edit) => `${text.slice(0, edit.start)}${edit.text}${text.slice(edit.end)}`,
        code,
      )
  })
}

/**
 * Respecifies the files a run wrote, now that every one of them exists: a file written
 * before the module it imports was there keeps that specifier as written until this pass.
 */
export function respecifyWritten() {
  return Effect.gen(function* () {
    const style = yield* ImportStyle
    if (!style.fullySpecified || style.written === undefined) return
    const fs = yield* FileSystem.FileSystem
    for (const file of style.written) {
      const code = yield* fs.readFileString(file).pipe(Effect.orElseSucceed(() => null))
      if (code === null) continue
      const respecified = yield* fullySpecify(code, file, style.alias)
      if (respecified !== code) yield* fs.writeFileString(file, respecified)
    }
  })
}
