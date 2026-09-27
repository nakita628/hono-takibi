// Every parameter shape the generator supports, sent as a real path segment. A path value
// is always single and always required, so each shape has a route of its own
// (`/<shape>/{value}`) and fails alone.
//
// 生成器が対応するすべてのパラメータ形状を、実際のパスセグメントとして送信して検証する。
// パスの値は常に単一かつ必須なので、形状ごとに専用ルート(`/<shape>/{value}`)を持ち、
// 失敗は形状単位で切り分けられる。
//
// How to read a test / テストの読み方:
//   Every route answers `{ valueType, valueText }`: the runtime `typeof` the parameter
//   arrived as in the handler, and the value as text. A rejected request answers 422 with
//   `{ issues: [...] }`, the name of each parameter that failed.
//   すべてのルートは `{ valueType, valueText }` を返す。ハンドラに届いた時点の `typeof` と、
//   値の文字列表現である。拒否されたリクエストは 422 と `{ issues: [...] }`(失敗した
//   パラメータ名の一覧)を返す。
//
// This file holds the behaviour that is wrong today.
// このファイルには、現時点で誤っている挙動をまとめている。
//
// Contents / 目次:
//   - known gaps
import { describe, expect, it } from 'vite-plus/test'

import { pathParamsApp } from './app'

// A test marked it.fails states the behaviour OpenAPI calls for, which the generator does not
// deliver yet. When the generator is fixed the test starts passing, it.fails turns that into
// a failure, and the marker has to be removed: the gap cannot close unnoticed, and cannot
// stay open unrecorded. The tests whose name starts with "today" pin what happens now.
// it.fails を付けたテストは OpenAPI が求める挙動を記述しており、生成器はまだ対応していない。
// 生成器が修正されるとテストが通るようになり、it.fails がそれを失敗として報告するので、
// マーカーを外す必要が生じる。ギャップが気付かれずに解消されることも、
// 記録されないまま残ることもない。名前が "today" で始まるテストは、
// 現時点での挙動を固定している。
describe('known gaps', () => {
  // The parameter is declared with schema: { $ref: '#/components/schemas/Count' }, an integer
  // with minimum: 0. The generator reuses the component schema as it is, z.int().min(0), which
  // was written for an already-typed request body. So the segment "5" is checked as a string
  // and every request is rejected. The correct answer is 200 with the number 5.
  // パラメータは schema: { $ref: '#/components/schemas/Count' }(minimum: 0 の integer)で
  // 宣言されている。生成器はコンポーネントスキーマ z.int().min(0) をそのまま再利用するが、
  // これは型付きのリクエストボディ向けのスキーマである。
  // そのためセグメント "5" は文字列のまま検証され、すべてのリクエストが拒否される。
  // 正しい応答は 200 と number の 5 である。
  it.fails('a numeric schema behind a schema $ref coerces the segment', async () => {
    const res = await pathParamsApp.request('/schemaref/5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // What happens today for the same request: 422.
  // 同じリクエストに対する現時点での挙動。422 が返る。
  it('today, a valid value behind a schema $ref is rejected', async () => {
    const res = await pathParamsApp.request('/schemaref/5')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // Zero is the minimum of the referenced schema and should be accepted.
  // 0 は参照先スキーマの最小値であり、本来は受理されるべきである。
  it('today, zero behind a schema $ref is rejected as well', async () => {
    const res = await pathParamsApp.request('/schemaref/0')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })

  // This one is rejected rightly, though for the wrong reason.
  // これは拒否されるのが正しいが、拒否の理由は正しくない。
  it('today, a value below the referenced minimum is rejected', async () => {
    const res = await pathParamsApp.request('/schemaref/-1')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['value'] })
  })
})
