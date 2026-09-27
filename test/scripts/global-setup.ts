import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

/**
 * Regenerates every case before the suite runs.
 *
 * `HONO_TAKIBI_SKIP_GENERATE=1` skips it, for running one file against output that is
 * already there: regeneration rewrites all of `__generated__`, so two runs at once would
 * read each other's half-written files.
 *
 * スイート実行前に、すべてのケースを再生成する。
 *
 * `HONO_TAKIBI_SKIP_GENERATE=1` を指定すると再生成をスキップし、既存の生成物に対して
 * 単一ファイルを実行できる。再生成は `__generated__` 全体を書き換えるため、複数の実行が
 * 重なると、書き込み途中のファイルを互いに読んでしまう。
 */
export default function setup() {
  if (process.env['HONO_TAKIBI_SKIP_GENERATE'] === '1') return
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
