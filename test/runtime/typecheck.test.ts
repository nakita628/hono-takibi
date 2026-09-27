// Every case typechecks against its host libraries.
//
// Runs scripts/typecheck.mjs, which runs `tsc -p` on the tsconfig.json of every case: the
// generated code, the hosts and the tests each case lists. Generated code that a test
// never imports is still compiled here, and so are the type-level assertions in
// types/*.ts and in the `types.test.ts` files, which prove nothing at run time.
//
// The script bounds its own parallelism (at most half the cores, and the heavy case on
// its own), so a small CI runner stays within its memory.
//
// すべてのケースが、ホスト側のライブラリに対して型チェックを通過することを検証する。
//
// scripts/typecheck.mjs を実行する。このスクリプトは、各ケースの tsconfig.json に対して
// `tsc -p` を実行し、そのケースが列挙する生成コード・ホスト・テストをコンパイルする。
// テストから import されていない生成コードも、ここでコンパイルされる。types/*.ts や
// `types.test.ts` に書かれた型レベルのアサーションは、実行時には何も検証しないため、
// ここでのコンパイルが検証そのものになる。
//
// スクリプトは自身の並列数を制限している(コア数の半分まで。重いケースは単独で実行)。
// これにより、小さな CI ランナーでもメモリ内に収まる。
import { spawnSync } from 'node:child_process'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { expect, it } from 'vite-plus/test'

const testRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')

// The script exits with 0 only when every case compiles. Its output, inherited by this process,
// names the case that failed.
// スクリプトは、すべてのケースがコンパイルできた場合にのみ 0 で終了する。
// 出力はこのプロセスにそのまま流れるため、失敗したケースの名前を確認できる。
it('generated code typechecks against host libraries (tsc -p per case)', () => {
  const result = spawnSync(process.execPath, [path.join(testRoot, 'scripts', 'typecheck.mjs')], {
    stdio: 'inherit',
  })
  expect(result.status).toBe(0)
}, 600_000)
