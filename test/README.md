# @hono-takibi/test — integration tests for generated code

`fixtures/` の後継となる統合テストパッケージ。**packages 側 unit テスト(生成物バイト列の完全一致)が原理的に知り得ないこと**だけを検証する:

1. **型** — 生成コードが宿主(TanStack Query / SWR / Hono / @hono/zod-openapi)の型と噛み合うか(`tsc -p` をケースごとに実行。`runtime/typecheck.test.ts` がテストとして走らせる)
2. **実行時のふるまい** — 生成 hooks / rpc / routes が実際に動くか(in-process の手書き Hono app に対して検証)

**生成物はコミットしない。** vitest の `globalSetup` が毎回 `specs/` から CLI で `__generated__/` に生成し(常に生成したてをチェック)、そのまま型チェック・実行時テストにかける。`__generated__/` は gitignore。

## コマンド

CI・ローカルともルートの `vp test --coverage` にすべて含まれる(packages unit + この統合テスト)。事前に `vp run hono-takibi#build` が必要(CLI の dist を使うため)。単体で回す場合:

```bash
pnpm -F @hono-takibi/test test        # 生成(globalSetup)→ 実行時テスト + typecheck テスト
pnpm -F @hono-takibi/test generate    # 生成だけ手動で
pnpm -F @hono-takibi/test typecheck   # cases/*/tsconfig.json を全部 tsc -p
```

> CI では `vp test` → `vp check` の順にする。`vp check` の型チェックが test/ の手書きコードを検査する際、`vp test` が生成した `__generated__/` を参照するため。

## 構成

```
specs/           入力 OpenAPI(意図的に小さく・浅く保つ。深ネストは持ち込まない)
cases/<name>/    hono-takibi.config.ts + tsconfig.json(ケースごとの型境界)
__generated__/   生成物(gitignore。globalSetup が毎回生成。手で編集しない)
hosts/           手書きの宿主 Hono app + testClient(生成物 vs 生成物のテストを避けるため必ず人が書く)
runtime/         実行時テスト(生成物を必ず import する)+ typecheck.test.ts
scripts/         generate / typecheck ランナー + global-setup
```

## 規律

- **生成物を必ず import する** — 「生成コードのパターンを手で書き写して検証」は禁止(生成器が壊れても緑のままになる)
- **key はリテラルで書かない** — `['users', '/users/:id', args]` のような形の assert は packages 側 unit の役割。ここでは「prefix invalidation が効く」「header 差分が同一キャッシュに当たる」「`enabled: false` で fetch されない」という**効果**で検証する
- **ケース追加の基準** — 「packages 側 unit で検知できない型 or 実行時の破れがあるか」を満たさない限り追加しない
- **バイト列スナップショットを置かない** — unit と二重に壊れるだけ。生成物の中身の固定は packages 側 unit の役割で、ここは「生成したてが型・実行時に通るか」だけを見る

## fixtures からの移行

移行の規律: **移送先の検証が緑になる前に fixture を消さない**。この規律に従い、20 fixture 中 19 を移送・削除済み。

| 旧 fixture | 対応ケース | 検証形態 |
| --- | --- | --- |
| tanstack-query | `tanstack-query` | 実行時(invalidation / header 除外 / infinite / cancel) |
| (SWR fixture 不在) | `swr` / `swr-split` | 実行時 + split 型 |
| rpc | `rpc` | 実行時(生成物を import する形に改善) |
| query-and-path | `validation` + `query-and-path` | 実行時(coercion / int64→bigint) |
| combinators / x-transforms / x-vendor-messages / readme / typespec-validation | 同名ケース | 実行時(x-*-message / combinators / transforms) |
| validation-message | `validation-message` | 実行時(生成なし・ユーザー hook 導線) |
| crud | `crud`(overlay + `runtime/crud-client.test.ts`) | 実行時 E2E + 型 |
| takibi-mock | `mock` | 生成テスト実行(mock 自己整合 + 401 + 404 sentinel) |
| split / vite-split-alias | `split` / `split-alias` | 型(barrel 解決 / alias import) |
| path-alias / template | `path-alias` / `template`(overlay) | 型 + 生成テスト実行 |
| petstore-basepath | `basepath` | 型 + 実行時(mock が basePath 配下で応答) |
| custom-client | `custom-client` | 型(client 変数名差し替え) |
| type | `type` | 型(TypeSpec 入力 + DeepReadonly) |
| vite-plugin | `vite-plugin` | 実行時(vite dev server 起動で .tsp から生成) |

**唯一未移送: `fixtures/generate`** — all-features.yaml(4190 行)による 7 hook lib × 全モード × 16 export フラグの網羅 typecheck と、tsc OOM 回避の子プロセス分割ハーネス。7 hook lib の typecheck(`preact/solid/vue/svelte/angular-query` ケース)と split barrel 解決(`split` / `*-split` ケース)は test/ で代表カバー済みだが、all-features の網羅性は未再現のため残置。移送完了後に fixtures/ を完全廃止する。
