import { Effect, FileSystem } from 'effect'

import { ImportStyle, fullySpecify } from '../helper/specifier.js'

export function unlink(path: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    yield* fs.remove(path, { force: true })
  })
}

export function mkdir(dir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    yield* fs.makeDirectory(dir, { recursive: true })
  })
}

export function readdir(dir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const entries: readonly string[] = yield* fs.readDirectory(dir).pipe(
      Effect.catchIf(
        (error) => error.reason._tag === 'NotFound',
        () => Effect.succeed<string[]>([]),
      ),
    )
    return entries
  })
}

export function exists(path: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    return yield* fs.exists(path)
  })
}

export function readFile(path: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    return yield* fs.readFileString(path).pipe(
      Effect.catchIf(
        (error) => error.reason._tag === 'NotFound',
        () => Effect.succeed(null),
      ),
    )
  })
}

/**
 * Writes `content` to `path` unless the file already holds it. Under a fully specified
 * import style (a `#` `pathAlias`) a module's specifiers are completed to their files first,
 * and the file is recorded for the pass that completes the ones whose target came later.
 */
export function writeFile(path: string, content: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const style = yield* ImportStyle
    const isModule = style.fullySpecified && path.endsWith('.ts')
    const final = isModule ? yield* fullySpecify(content, path, style.alias) : content
    if (isModule) style.written?.add(path)
    const existing = yield* fs.readFileString(path).pipe(Effect.orElseSucceed(() => null))
    if (existing === final) return
    yield* fs.writeFileString(path, final)
  })
}
