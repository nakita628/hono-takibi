import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import { Effect, FileSystem } from 'effect'
import type { PlatformError } from 'effect'

/**
 * Node's `FileSystem` implementation.
 *
 * Every function below reads the service out of the environment, so a program that
 * uses them provides this once at its boundary — the CLI folds it in through
 * `NodeServices.layer`, the Vite plugin provides it directly.
 */
export const fileSystemLayer = NodeFileSystem.layer

/** Whether a platform failure is "the path is not there", the one case worth absorbing. */
function isNotFound(e: PlatformError.PlatformError) {
  return e.reason._tag === 'NotFound'
}

/** Removes a file. A path that is already gone is not an error. */
export function unlink(path: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    yield* fs.remove(path, { force: true })
  })
}

/** Creates the directory and its parents. An existing directory is not an error. */
export function mkdir(dir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    yield* fs.makeDirectory(dir, { recursive: true })
  })
}

/** Entry names of a directory. A directory that does not exist reads as empty. */
export function readdir(dir: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const entries: readonly string[] = yield* fs
      .readDirectory(dir)
      .pipe(Effect.catchIf(isNotFound, () => Effect.succeed<string[]>([])))
    return entries
  })
}

/** Contents of a UTF-8 file, or `null` when the file does not exist. */
export function readFile(path: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    return yield* fs
      .readFileString(path)
      .pipe(Effect.catchIf(isNotFound, () => Effect.succeed(null)))
  })
}

/**
 * Writes a UTF-8 file, leaving it untouched when the contents already match.
 *
 * Skipping the identical write is what keeps the Vite plugin's own watcher from
 * seeing a change it just caused, so it is part of the contract, not an optimisation.
 * An unreadable existing file falls through to the write rather than failing here.
 */
export function writeFile(path: string, data: string) {
  return Effect.gen(function* () {
    const fs = yield* FileSystem.FileSystem
    const existing = yield* fs.readFileString(path).pipe(Effect.orElseSucceed(() => null))
    if (existing === data) return
    yield* fs.writeFileString(path, data)
  })
}
