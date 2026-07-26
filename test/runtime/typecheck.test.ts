import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Sequential tsc across all cases: a 2-core CI runner needs far more than the
// local wall time (heap-isolated processes are kept serial to bound memory).
it('generated code typechecks against host libraries (tsc -p per case)', () => {
  const result = spawnSync(process.execPath, [path.join(testRoot, 'scripts', 'typecheck.mjs')], {
    stdio: 'inherit',
  })
  expect(result.status).toBe(0)
}, 600_000)
