// Every parameter shape the generator supports, sent as a real cookie. A cookie reaches
// the handler as a string just like a query or header value, but it took the branch that
// used to skip coercion entirely, so every numeric or boolean cookie rejected its own
// input.
//
// 生成器が対応するすべてのパラメータ形状を、実際の Cookie として送信して検証する。
// Cookie もクエリやヘッダーと同じく文字列で届くが、かつて coerce を完全にスキップしていた
// 分岐を通るため、数値・真偽値の Cookie はすべて自身の入力を拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the cookies its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A cookie that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取った Cookie を名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもない Cookie は、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// How a value is sent / 値の送信方法:
//   A value that holds anything but plain ASCII is percent-encoded with
//   `encodeURIComponent`, the way a client sets such a cookie; Hono decodes it before
//   validation. The tests named "wire" send the `Cookie:` header exactly as written instead.
//   プレーンな ASCII 以外を含む値は、クライアントが Cookie を設定するときと同じく
//   `encodeURIComponent` でパーセントエンコードして送信する。Hono は検証の前にこれを
//   デコードする。"wire" と名付けたテストでは、`Cookie:` ヘッダーを書かれたとおりに送信する。
//
// Routes / ルート:
//   /cookies   every shape as `<shape>`, and the array `ids`, all optional
//              全形状(`<shape>`)と配列 `ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  cookies with a default / デフォルト値を持つ Cookie
//   /required  required cookies / 必須 Cookie
//
// This file holds the behaviour that is wrong today.
// このファイルには、現時点で誤っている挙動をまとめている。
//
// Contents / 目次:
//   - known gaps: array cookies
import { describe, expect, it } from 'vite-plus/test'

import { cookieParamsApp } from './app'

// A test marked it.fails states the behaviour OpenAPI calls for, which the generator does not
// deliver yet. When the generator is fixed the test starts passing, it.fails turns that into
// a failure, and the marker has to be removed: the gap cannot close unnoticed, and cannot
// stay open unrecorded. The tests whose name starts with "today" pin what happens now.
// it.fails を付けたテストは OpenAPI が求める挙動を記述しており、生成器はまだ対応していない。
// 生成器が修正されるとテストが通るようになり、it.fails がそれを失敗として報告するので、
// マーカーを外す必要が生じる。ギャップが気付かれずに解消されることも、
// 記録されないまま残ることもない。名前が "today" で始まるテストは、
// 現時点での挙動を固定している。
describe('known gaps: array cookies', () => {
  // A cookie array is serialised with style: form; with explode: false that is one cookie
  // holding comma-separated values, the only form that can carry more than one. The generated
  // schema wraps the whole value in a one-element array instead of splitting it.
  // Cookie の配列は style: form でシリアライズされる。explode: false の場合は、
  // 1つの Cookie にカンマ区切りで値を並べる形式となり、複数の値を運べるのはこの形式だけである。
  // 生成されるスキーマは値を分割せず、丸ごと1要素の配列に包んでしまう。
  it.fails('splits an encoded comma-separated value', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1%2C2%2C3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, an encoded comma-separated value is rejected as one element', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1%2C2%2C3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.0'] })
  })

  // The same with the commas sent as they are.
  // カンマをそのまま送信した場合も同様である。
  it.fails('splits an unencoded comma-separated value', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1,2,3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, an unencoded comma-separated value is rejected as one element', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1,2,3' } })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.0'] })
  })
})
