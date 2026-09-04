import type { Effect as EffectType, FileSystem } from 'effect'
import { Effect, Result } from 'effect'

import { fileSystemLayer } from '../file/index.js'

/**
 * Runs a generator against the real filesystem, the way the CLI does, and reports the
 * outcome as a plain object.
 *
 * The generators speak in `Effect`; assertions read better over a value, and collapsing
 * the error channel to its message here is exactly what the CLI does before printing.
 * Test-only — nothing in `dist` imports it.
 */
export async function runGenerator<A, E extends { readonly message: string }>(
  effect: EffectType.Effect<A, E, FileSystem.FileSystem>,
) {
  const result = await Effect.runPromise(
    Effect.result(effect.pipe(Effect.provide(fileSystemLayer))),
  )
  return Result.isSuccess(result)
    ? ({ ok: true, value: result.success } as const)
    : ({ ok: false, error: result.failure.message } as const)
}
