import { createRequire } from 'node:module'
import path from 'node:path'

import { Effect } from 'effect'
import type { FileSystem } from 'effect'

import type { Config } from '../config/index.js'
import { GenerateError } from '../error/index.js'
import { exists, readFile } from '../file/index.js'
import { isRecord } from '../guard/index.js'
import { appEntryDirectory, appEntryOutput } from '../helper/path.js'

/** What tsconfig replaces with the directory of the tsconfig a project is built from. */
// oxlint-disable-next-line no-template-curly-in-string -- the literal token tsconfig writes, not a template
const CONFIG_DIR = '${configDir}'

/** One `"<prefix>/*": "<dir>/*"` mapping, with the directory resolved. */
type Mapping = { readonly prefix: string; readonly directory: string }

/** The `paths` a tsconfig ends up with and the directory they resolve against. */
type Paths = { readonly paths: { readonly [k: string]: unknown }; readonly base: string }

/**
 * Parses JSONC the way tsconfig is written: `//` and `/* *\/` comments and trailing commas
 * are dropped outside strings. A comment opener inside a string (`"@/*"`) is text.
 */
export function parseJsonc(text: string): unknown {
  let out = ''
  let index = 0
  while (index < text.length) {
    const char = text[index]
    if (char === '"') {
      let end = index + 1
      while (end < text.length && text[end] !== '"') end += text[end] === '\\' ? 2 : 1
      out += text.slice(index, end + 1)
      index = end + 1
    } else if (text.startsWith('//', index)) {
      while (index < text.length && text[index] !== '\n') index += 1
    } else if (text.startsWith('/*', index)) {
      const end = text.indexOf('*/', index + 2)
      index = end === -1 ? text.length : end + 2
    } else {
      out += char
      index += 1
    }
  }
  return JSON.parse(removeTrailingCommas(out))
}

/** Drops a `,` that closes an object or array, outside strings. */
function removeTrailingCommas(text: string) {
  let out = ''
  let index = 0
  while (index < text.length) {
    const char = text[index]
    if (char === '"') {
      let end = index + 1
      while (end < text.length && text[end] !== '"') end += text[end] === '\\' ? 2 : 1
      out += text.slice(index, end + 1)
      index = end + 1
      continue
    }
    if (char === ',') {
      let next = index + 1
      while (next < text.length && /\s/u.test(text[next] ?? '')) next += 1
      if (text[next] === '}' || text[next] === ']') {
        index += 1
        continue
      }
    }
    out += char
    index += 1
  }
  return out
}

/**
 * A `"<prefix>/*"` key with one `"<dir>/*"` target, as a mapping. Anything else is not one
 * directory: several targets are tried in turn, a conditional target resolves differently
 * per condition, and a target ending in `.ts` cannot name the `index.ts` of a directory.
 */
function toMapping(
  key: string,
  target: unknown,
  base: string,
  configDir?: string,
): Mapping | undefined {
  const targets: readonly unknown[] = Array.isArray(target) ? target : [target]
  const single = targets.length === 1 ? targets[0] : undefined
  if (typeof single !== 'string') return undefined
  const expanded = configDir === undefined ? single : single.replaceAll(CONFIG_DIR, configDir)
  if (!key.endsWith('/*') || !expanded.endsWith('/*')) return undefined
  return { prefix: key.slice(0, -1), directory: path.resolve(base, expanded.slice(0, -2)) }
}

/** `file` as the user would write it from the working directory. */
function shown(file: string) {
  const relative = path.relative(process.cwd(), file).split(path.sep).join('/')
  return relative === '' ? '.' : relative.startsWith('..') ? file : relative
}

/** The nearest `name` at or above `directory`. */
function findUp(directory: string, name: string) {
  return Effect.gen(function* () {
    for (let dir = path.resolve(directory); ; dir = path.dirname(dir)) {
      const file = path.join(dir, name)
      if (yield* exists(file).pipe(Effect.orElseSucceed(() => false))) return file
      if (path.dirname(dir) === dir) return undefined
    }
  })
}

/** The JSONC in `file`, or `undefined` when it cannot be read. */
function readJsonc(file: string) {
  return Effect.gen(function* () {
    const text = yield* readFile(file).pipe(
      Effect.catchTag('PlatformError', () => Effect.succeed(null)),
    )
    if (text === null) return undefined
    return yield* Effect.try({
      try: () => parseJsonc(text),
      catch: (error) =>
        new GenerateError({
          message: `pathAlias: cannot read ${file}: ${error instanceof Error ? error.message : String(error)}`,
        }),
    })
  })
}

/** The file an `extends` entry names: a path relative to `from`, or a package. */
function resolveExtends(from: string, specifier: string) {
  if (specifier.startsWith('.') || path.isAbsolute(specifier)) {
    const file = path.resolve(path.dirname(from), specifier)
    return file.endsWith('.json') ? file : `${file}.json`
  }
  const require = createRequire(from)
  for (const candidate of [specifier, `${specifier}.json`, `${specifier}/tsconfig.json`]) {
    try {
      return require.resolve(candidate)
    } catch {
      // try the next form
    }
  }
  return undefined
}

/**
 * The `paths` a tsconfig ends up with, following `extends`, and the directory they resolve
 * against: the `baseUrl` when one is set (TypeScript before 7), the directory of the file that
 * declares `paths` otherwise. `${configDir}` stands for the directory of the first file.
 */
function tsconfigPaths(
  file: string,
  configDir = path.dirname(file),
  seen: ReadonlySet<string> = new Set(),
): Effect.Effect<Paths | undefined, GenerateError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    if (seen.has(file)) return undefined
    const json = yield* readJsonc(file)
    if (!isRecord(json)) return undefined
    const extended = typeof json.extends === 'string' ? [json.extends] : json.extends
    let inherited: Paths | undefined = undefined
    if (Array.isArray(extended)) {
      for (const specifier of extended) {
        if (typeof specifier !== 'string') continue
        const parent = resolveExtends(file, specifier.replaceAll(CONFIG_DIR, configDir))
        if (parent === undefined) continue
        inherited = (yield* tsconfigPaths(parent, configDir, new Set([...seen, file]))) ?? inherited
      }
    }
    const options = isRecord(json.compilerOptions) ? json.compilerOptions : {}
    const baseUrl =
      typeof options.baseUrl === 'string'
        ? path.resolve(path.dirname(file), options.baseUrl.replaceAll(CONFIG_DIR, configDir))
        : undefined
    if (isRecord(options.paths)) {
      return { paths: options.paths, base: baseUrl ?? path.dirname(file) }
    }
    if (inherited !== undefined && baseUrl !== undefined) return { ...inherited, base: baseUrl }
    return inherited
  })
}

/**
 * The tsconfig files a project is made of: `file` itself, then the projects its `references`
 * name, depth first. A solution-style tsconfig.json (`"files": []` with references to
 * `tsconfig.app.json` and `tsconfig.node.json`, as Vite scaffolds it) holds no `paths` of its
 * own; the referenced project does. References are not inherited through `extends`.
 */
function projectFiles(
  file: string,
  seen = new Set<string>(),
): Effect.Effect<readonly string[], GenerateError, FileSystem.FileSystem> {
  return Effect.gen(function* () {
    if (seen.has(file)) return []
    seen.add(file)
    const json = yield* readJsonc(file)
    if (!isRecord(json)) return []
    const files = [file]
    const references = Array.isArray(json.references) ? json.references : []
    for (const reference of references) {
      if (!isRecord(reference) || typeof reference.path !== 'string') continue
      const target = path.resolve(path.dirname(file), reference.path)
      // A reference names a tsconfig file, or a directory holding tsconfig.json.
      const referenced = target.endsWith('.json') ? target : path.join(target, 'tsconfig.json')
      files.push(...(yield* projectFiles(referenced, seen)))
    }
    return files
  })
}

/**
 * The prefix a mapping gives the directory of the app entry: the mapping's prefix when it
 * maps that directory, followed by the rest of the way when it maps an ancestor.
 */
function prefixFor(mapping: Mapping, entryDirectory: string) {
  const rest = path.relative(mapping.directory, entryDirectory)
  if (rest.startsWith('..') || path.isAbsolute(rest)) return undefined
  return rest === '' ? mapping.prefix : `${mapping.prefix}${rest.split(path.sep).join('/')}/`
}

/**
 * Picks the alias for the directory of the app entry from package.json `imports` and tsconfig
 * `paths`, in that order — only `imports` is resolved by Node at runtime — and within each in
 * the order the mappings are declared.
 */
function selectPathAlias(
  entryDirectory: string,
  imports: readonly Mapping[],
  paths: readonly Mapping[],
) {
  for (const mapping of [...imports, ...paths]) {
    const prefix = prefixFor(mapping, entryDirectory)
    if (prefix !== undefined) return prefix
  }
  return undefined
}

/**
 * The path alias the generated files use for one another, or `undefined` for relative
 * imports. With `pathAlias: true` it is read from the package.json `imports` nearest above the
 * app entry, then the tsconfig.json `paths` nearest above it and nearest above the working
 * directory. A config with no app entry has nothing to alias.
 */
export function resolvePathAlias(config: Config) {
  return Effect.gen(function* () {
    if (config.pathAlias !== true) return undefined
    const appOutput = appEntryOutput(config)
    if (appOutput === undefined) return undefined
    const entryDirectory = path.resolve(
      appEntryDirectory(appOutput, config.template?.define === true),
    )

    const packageFile = yield* findUp(entryDirectory, 'package.json')
    const packageJson = packageFile === undefined ? undefined : yield* readJsonc(packageFile)
    const imports =
      packageFile !== undefined && isRecord(packageJson) && isRecord(packageJson.imports)
        ? Object.entries(packageJson.imports).flatMap(([key, target]) => {
            const mapping = toMapping(key, target, path.dirname(packageFile))
            return mapping === undefined ? [] : [mapping]
          })
        : []

    // The tsconfig above the app entry, then the one above the working directory — where the
    // config file is, which may hold the project's tsconfig while the output is elsewhere.
    // Each with the projects it references.
    const tsconfigFiles = [
      ...new Set(
        [
          yield* findUp(entryDirectory, 'tsconfig.json'),
          yield* findUp(process.cwd(), 'tsconfig.json'),
        ].filter((file) => file !== undefined),
      ),
    ]
    const projects = new Set<string>()
    for (const file of tsconfigFiles) {
      for (const project of yield* projectFiles(file)) projects.add(project)
    }
    const paths: Mapping[] = []
    for (const file of projects) {
      const resolved = yield* tsconfigPaths(file)
      if (resolved === undefined) continue
      for (const [key, target] of Object.entries(resolved.paths)) {
        const mapping = toMapping(key, target, resolved.base, path.dirname(file))
        if (mapping !== undefined) paths.push(mapping)
      }
    }

    const alias = selectPathAlias(entryDirectory, imports, paths)
    if (alias !== undefined) return alias
    // The mapping to suggest, written from the project root the files would be in.
    const root = path.dirname(packageFile ?? tsconfigFiles[0] ?? path.join(process.cwd(), 'x'))
    const fromRoot = path.relative(root, entryDirectory).split(path.sep).join('/')
    const target = fromRoot === '' ? './*' : `./${fromRoot}/*`
    return yield* new GenerateError({
      message: `pathAlias: no alias maps ${shown(entryDirectory)}, the directory of the app entry. Map it in package.json "imports" ("#/*": "${target}") or tsconfig.json "paths" ("@/*": ["${target}"]), or remove pathAlias to import relatively.`,
    })
  })
}
