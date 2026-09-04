import { Effect, Exit } from 'effect'
import { describe, expect, it, vi } from 'vite-plus/test'

// Its own file because `vi.mock` is hoisted to module scope: every other `fmt` test
// needs the real oxfmt.
vi.mock('oxfmt', () => ({
  format: () => Promise.reject(new Error('oxfmt panicked')),
}))

const { fmt } = await import('./index.js')

describe('fmt when oxfmt rejects', () => {
  it('fails through the error channel rather than dying', async () => {
    const exit = await Effect.runPromiseExit(fmt('const x = 1'))

    expect(Exit.isFailure(exit)).toBe(true)
    const error = await Effect.runPromise(Effect.flip(fmt('const x = 1')))
    expect(error._tag).toBe('FormatError')
    expect(error.message).toBe('oxfmt panicked')
  })

  // The template generators keep a merged app file when oxfmt will not parse it; a
  // defect would walk straight past that fallback and lose the hand-written edit.
  it('is recoverable by orElseSucceed', async () => {
    const kept = await Effect.runPromise(
      fmt('const x = 1').pipe(Effect.orElseSucceed(() => 'const x = 1')),
    )

    expect(kept).toBe('const x = 1')
  })
})
