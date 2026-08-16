// Verifies that every case's generated code typechecks against its host libraries:
// runs scripts/typecheck.mjs, which executes `tsc -p cases/<name>` for all cases.
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vite-plus/test'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// Bounded-parallel tsc across all cases (scripts/typecheck.mjs caps at half the
// cores, so a 2-core CI runner stays sequential to bound peak memory).
it('generated code typechecks against host libraries (tsc -p per case)', () => {
  const result = spawnSync(process.execPath, [path.join(testRoot, 'scripts', 'typecheck.mjs')], {
    stdio: 'inherit',
  })
  expect(result.status).toBe(0)
}, 600_000)
