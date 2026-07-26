import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

export default function setup() {
  const dir = path.dirname(fileURLToPath(import.meta.url))
  const result = spawnSync(process.execPath, [path.join(dir, 'generate.mjs')], {
    stdio: 'inherit',
  })
  if (result.status !== 0) {
    throw new Error(
      'hono-takibi code generation failed. Build the CLI first: vp run hono-takibi#build',
    )
  }
}
