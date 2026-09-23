import * as NodeFileSystem from '@effect/platform-node/NodeFileSystem'
import type { Effect as EffectType, FileSystem } from 'effect'
import { Effect } from 'effect'

/**
 * Runs a generator against the real filesystem, the way the CLI does, and answers with
 * what it produced.
 *
 * A failure rejects, so a test that only cares that generation worked needs no assertion
 * at all — and when it does fail, the report carries the generator's own error rather
 * than `expected false to be true`.
 *
 * Test-only — nothing in `dist` imports it.
 */
export function runGenerator<A, E>(effect: EffectType.Effect<A, E, FileSystem.FileSystem>) {
  return Effect.runPromise(effect.pipe(Effect.provide(NodeFileSystem.layer)))
}

/** The same, for a generator that is expected to fail: answers with the error it failed with. */
export function runGeneratorError<A, E>(effect: EffectType.Effect<A, E, FileSystem.FileSystem>) {
  return Effect.runPromise(Effect.flip(effect.pipe(Effect.provide(NodeFileSystem.layer))))
}
