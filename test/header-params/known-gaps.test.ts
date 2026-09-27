// Every parameter shape the generator supports, sent as a real header. Headers arrive as
// strings just like query and path values, but they reach the generator through a
// different branch, one that used to skip coercion entirely, so every numeric or boolean
// header rejected its own input.
//
// 生成器が対応するすべてのパラメータ形状を、実際のヘッダーとして送信して検証する。
// ヘッダーもクエリやパスと同じく文字列で届くが、生成器内では別の分岐を通る。その分岐は
// かつて coerce を完全にスキップしており、数値・真偽値のヘッダーはすべて自身の入力を
// 拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the headers its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A header that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取ったヘッダーを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないヘッダーは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// What a header cannot carry / ヘッダーで運べない値:
//   A header value is a ByteString, and the Fetch API strips the whitespace around it. So a
//   value with a character past U+00FF, or with leading or trailing whitespace, never
//   reaches the server as written, and the values of that kind that the path and query
//   suites test have no counterpart here. `format: emoji` has no header for the same
//   reason. invalid.test.ts proves each of these limits.
//   ヘッダー値は ByteString であり、Fetch API は前後の空白を取り除く。そのため、U+00FF を
//   超える文字を含む値や、前後に空白のある値は、書かれたとおりにはサーバーへ届かない。
//   path・query のスイートが検証するその種の値は、ここには対応するテストがない。
//   `format: emoji` のヘッダーが存在しないのも同じ理由である。これらの制限は、
//   invalid.test.ts で個別に検証している。
//
// Routes / ルート:
//   /headers   every shape as `x-<shape>`, and the array `x-ids`, all optional
//              全形状(`x-<shape>`)と配列 `x-ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  headers with a default / デフォルト値を持つヘッダー
//   /required  required headers / 必須ヘッダー
//
// This file holds the behaviour that is wrong today.
// このファイルには、現時点で誤っている挙動をまとめている。
//
// Contents / 目次:
//   - known gaps: array headers
import { describe, expect, it } from 'vite-plus/test'

import { headerParamsApp } from './app'

// A test marked it.fails states the behaviour OpenAPI calls for, which the generator does not
// deliver yet. When the generator is fixed the test starts passing, it.fails turns that into
// a failure, and the marker has to be removed: the gap cannot close unnoticed, and cannot
// stay open unrecorded. The tests whose name starts with "today" pin what happens now.
// it.fails を付けたテストは OpenAPI が求める挙動を記述しており、生成器はまだ対応していない。
// 生成器が修正されるとテストが通るようになり、it.fails がそれを失敗として報告するので、
// マーカーを外す必要が生じる。ギャップが気付かれずに解消されることも、
// 記録されないまま残ることもない。名前が "today" で始まるテストは、
// 現時点での挙動を固定している。
describe('known gaps: array headers', () => {
  // A header array is serialised with style: simple: one header, its values separated by
  // commas. The generated schema wraps the whole value in a one-element array instead of
  // splitting it, so "1,2,3" fails as one integer.
  // ヘッダーの配列は style: simple でシリアライズされる。
  // 1つのヘッダーに値をカンマ区切りで並べる形式である。生成されるスキーマは値を分割せず、
  // 丸ごと1要素の配列に包むため、"1,2,3" は1つの整数として失敗する。
  it.fails('splits a comma-separated value', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ids': '1,2,3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ids': [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, a comma-separated integer array is rejected as one element', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ids': '1,2,3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ids.0'] })
  })

  // HTTP allows optional whitespace after each comma.
  // HTTP では、各カンマの後に任意の空白を置くことができる。
  it.fails('splits a comma-separated value with spaces', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ids': '1, 2, 3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ids': [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // The same header sent several times reaches the server joined by ", ", the same form as
  // above.
  // 同じヘッダーを複数回送ると、サーバーには ", " で連結された、上と同じ形式で届く。
  it.fails('reads a header sent three times as three elements', async () => {
    const headers = new Headers()
    headers.append('x-ids', '1')
    headers.append('x-ids', '2')
    headers.append('x-ids', '3')
    const res = await headerParamsApp.request('/headers', { headers })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ids': [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // The three values arrive joined as "1, 2, 3".
  // 3つの値は "1, 2, 3" に連結されて届く。
  it('today, a header sent three times is rejected as one element', async () => {
    const headers = new Headers()
    headers.append('x-ids', '1')
    headers.append('x-ids', '2')
    headers.append('x-ids', '3')
    const res = await headerParamsApp.request('/headers', { headers })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['x-ids.0'] })
  })

  // The same for an array of strings, where the wrong answer is not even an error.
  // string の配列でも同様である。この場合、誤った結果がエラーにすらならない。
  it.fails('splits a comma-separated string array', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-str-arr': 'a,b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-str-arr': [
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: 'b' },
      ],
    })
  })

  // The handler receives ["a,b"], silently.
  // ハンドラは、何の警告もなく ["a,b"] を受け取る。
  it('today, a comma-separated string array arrives as one element', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-str-arr': 'a,b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-str-arr': [{ valueType: 'string', valueText: 'a,b' }],
    })
  })
})
