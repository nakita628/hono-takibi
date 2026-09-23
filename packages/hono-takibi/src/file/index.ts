import { Effect, FileSystem } from 'effect'

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

export function writeFile(path: string, data: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const existing = yield* fs.readFileString(path).pipe(Effect.orElseSucceed(() => null))
    if (existing === data) return
    yield* fs.writeFileString(path, data)
  })
}
