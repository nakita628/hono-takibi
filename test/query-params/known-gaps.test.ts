// Every parameter shape the generator supports, sent as a real query string and checked
// for the JavaScript type and value it arrives as. HTTP carries all of them as strings, so
// a schema that forgets to coerce rejects its own input: the failure this file exists to
// catch.
//
// 生成器が対応するすべてのパラメータ形状を、実際のクエリ文字列として送信し、届いた時点の
// JavaScript の型と値を検証する。HTTP はすべてを文字列で運ぶため、coerce を忘れたスキーマは
// 自身の入力を拒否してしまう。このファイルは、その種の不具合を検出するためにある。
//
// How to read a test / テストの読み方:
//   Every route answers the parameters its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A parameter
//   that was not sent and has no default is absent from the answer. A rejected request
//   answers 422 with `{ issues: [...] }`: the path of every issue, which for an array
//   element is `<name>.<index>`.
//   すべてのルートは、ハンドラが受け取ったパラメータを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないパラメータは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }` を返す。issue のパスは、配列要素の場合 `<名前>.<インデックス>` になる。
//
// Routes / ルート:
//   /params    every shape, scalar (`<shape>`) and array (`<shape>_arr`), all optional
//              全形状のスカラー(`<shape>`)と配列(`<shape>_arr`)。すべて任意
//   /literals  enum, const, oneOf, nullable / enum・const・oneOf・nullable
//   /optional  optional parameters and odd names / 任意パラメータと特殊な名前
//   /defaults  parameters with a default / デフォルト値を持つパラメータ
//   /required  required parameters / 必須パラメータ
//   /limits    constraints / 制約
//   /styles    serialisation styles / シリアライズ形式
//
// This file holds the behaviour that is wrong today.
// このファイルには、現時点で誤っている挙動をまとめている。
//
// Contents / 目次:
//   - known gaps: serialisation styles
import { describe, expect, it } from 'vite-plus/test'

import { queryParamsApp } from './app'

// A test marked it.fails states the behaviour OpenAPI calls for, which the generator does not
// deliver yet. When the generator is fixed the test starts passing, it.fails turns that into
// a failure, and the marker has to be removed: the gap cannot close unnoticed, and cannot
// stay open unrecorded. The tests whose name starts with "today" pin what happens now.
// it.fails を付けたテストは OpenAPI が求める挙動を記述しており、生成器はまだ対応していない。
// 生成器が修正されるとテストが通るようになり、it.fails がそれを失敗として報告するので、
// マーカーを外す必要が生じる。ギャップが気付かれずに解消されることも、
// 記録されないまま残ることもない。名前が "today" で始まるテストは、
// 現時点での挙動を固定している。
describe('known gaps: serialisation styles', () => {
  // csv is declared style: form, explode: false, which serialises [1, 2, 3] as csv=1,2,3. The
  // generator ignores style and explode and reads every array as form + explode: true, so the
  // whole value reaches the element schema and fails as one integer.
  // csv は style: form, explode: false で宣言されており、
  // [1, 2, 3] は csv=1,2,3 としてシリアライズされる。生成器は style と explode を無視し、
  // すべての配列を form + explode: true として読むため、値全体が要素スキーマに届き、
  // 1つの整数として失敗する。
  it.fails('csv splits a comma-separated value', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, csv rejects the comma-separated value as one element', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,2,3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['csv.0'] })
  })

  // pipes is declared style: pipeDelimited, which serialises [1, 2, 3] as pipes=1|2|3.
  // pipes は style: pipeDelimited で宣言されており、
  // [1, 2, 3] は pipes=1|2|3 としてシリアライズされる。
  it.fails('pipes splits a pipe-separated value', async () => {
    const res = await queryParamsApp.request('/styles?pipes=1%7C2%7C3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pipes: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, pipes rejects the pipe-separated value as one element', async () => {
    const res = await queryParamsApp.request('/styles?pipes=1%7C2%7C3')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['pipes.0'] })
  })

  // spaces is declared style: spaceDelimited, which serialises [1, 2, 3] as spaces=1%202%203.
  // spaces は style: spaceDelimited で宣言されており、
  // [1, 2, 3] は spaces=1%202%203 としてシリアライズされる。
  it.fails('spaces splits a space-separated value', async () => {
    const res = await queryParamsApp.request('/styles?spaces=1%202%203')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      spaces: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // What happens today for the same request.
  // 同じリクエストに対する現時点での挙動。
  it('today, spaces rejects the space-separated value as one element', async () => {
    const res = await queryParamsApp.request('/styles?spaces=1%202%203')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['spaces.0'] })
  })

  // Repetition is the form the declared style does not use, and the only one that works today.
  // 繰り返し形式は、宣言されたスタイルでは使われない形式だが、
  // 現時点で動作する唯一の形式である。
  it('today, csv reads repetition whatever its declared style', async () => {
    const res = await queryParamsApp.request('/styles?csv=1&csv=2&csv=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // filter is declared style: deepObject, which spells the object { name, age } as
  // filter[name]=bob&filter[age]=5. Nothing gathers those keys into filter, so the parameter is
  // never seen.
  // filter は style: deepObject で宣言されており、
  // オブジェクト { name, age } は filter[name]=bob&filter[age]=5 と表記される。
  // これらのキーを filter にまとめる処理がないため、パラメータは一切認識されない。
  it.fails('deepObject gathers filter[name] and filter[age] into filter', async () => {
    const res = await queryParamsApp.request('/styles?filter[name]=bob&filter[age]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      filter: {
        name: { valueType: 'string', valueText: 'bob' },
        age: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // The valid object is dropped without an error.
  // 有効なオブジェクトが、エラーもなく捨てられる。
  it('today, deepObject keys are ignored', async () => {
    const res = await queryParamsApp.request('/styles?filter[name]=bob&filter[age]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // age is an integer, so "x" must be rejected.
  // age は integer なので、"x" は拒否されなければならない。
  it.fails('deepObject validates the properties it gathers', async () => {
    const res = await queryParamsApp.request('/styles?filter[age]=x')
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['filter.age'] })
  })

  // The invalid value passes unnoticed, because the parameter is never seen.
  // パラメータが認識されないため、不正な値が検出されずに通過する。
  it('today, an invalid deepObject property is not caught', async () => {
    const res = await queryParamsApp.request('/styles?filter[age]=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})
