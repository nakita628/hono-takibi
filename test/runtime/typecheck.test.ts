import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vitest'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

it('generated code typechecks against host libraries (tsc -p per case)', () => {
  const result = spawnSync(process.execPath, [path.join(testRoot, 'scripts', 'typecheck.mjs')], {
    stdio: 'inherit',
  })
  expect(result.status).toBe(0)
}, 120_000)
