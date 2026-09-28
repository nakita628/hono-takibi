// A JSON body has types of its own, so nothing in it is read from text, with one exception.
// JSON has no bigint: an int64 travels as a number, or as a string of digits when a number
// would not hold it, and the generated schema hands the handler a bigint either way.
//
// JSON ボディは自身で型を持つため、その中の値が文字列から読み取られることはない。ただし、
// 例外が1つある。JSON には bigint がない。int64 は number として、あるいは number では
// 保持できない場合は数字の文字列として運ばれる。生成されるスキーマは、どちらの場合も
// ハンドラに bigint を渡す。
//
// How to read a test / テストの読み方:
//   Every route answers the fields its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A field that was
//   not sent and has no default is absent from the answer; `cursor` of /numbers has a
//   default of 0, so it is in every answer of that route. A rejected request answers 422
//   with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取ったフィールドを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないフィールドは、応答に含まれない。/numbers の `cursor` にはデフォルト値 0
//   があるため、このルートの応答には必ず含まれる。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// Routes / ルート:
//   /numbers  int64 in each of its forms / 各形式の int64
//   /types    type as a list of types / 型のリストとしての type
//
// This file holds the requests that are rejected. Each answers 422, and the test asserts the
// path of every issue.
// このファイルには、拒否されるリクエストをまとめている。いずれも 422 を返し、
// テストでは各 issue のパスを検証する。
//
// Contents / 目次:
//   - int64: rejected values
//   - types: rejected values
import { describe, expect, it } from 'vite-plus/test'

import { jsonBodyApp } from './app'

// What is not a whole number, or not one that arrived with every digit, is rejected.
// 整数でない値や、すべての桁を保ったまま届いていない値は、拒否される。
describe('int64: rejected values', () => {
  // 9007199254740993 cannot be held by a JSON number: it has lost its last digit before the
  // schema sees it. It has to be sent as a string of digits.
  // 9007199254740993 は、JSON の number では保持できない。スキーマに届く前に、
  // 最後の桁が失われている。数字の文字列として送信する必要がある。
  it('id rejects a number beyond 2^53', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":9007199254740993}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // A fraction is not an integer.
  // 小数は整数ではない。
  it('id rejects a fraction', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":1.5}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // The same, as a string.
  // 同じ値を、文字列として送信している。
  it('id rejects a fraction sent as text', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"1.5"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // A word is not a string of digits.
  // 単語は、数字の文字列ではない。
  it('id rejects a word', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"abc"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // The empty string holds no digits.
  // 空文字列は、数字を含まない。
  it('id rejects an empty string', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":""}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('id rejects a hexadecimal literal', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"0x10"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // true is not a number.
  // true は数値ではない。
  it('id rejects a boolean', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":true}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // id is not nullable.
  // id は nullable ではない。
  it('id rejects null', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":null}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // One above the largest int64, 9223372036854775807.
  // int64 の最大値 9223372036854775807 を 1 超える。
  it('id rejects a value past the range of an int64', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"9223372036854775808"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['id'] })
  })

  // A uint64 has no sign.
  // uint64 は符号を持たない。
  it('unsigned rejects a negative number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"unsigned":-1}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['unsigned'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('ranged rejects a value below its minimum', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ranged":0}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ranged'] })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('ranged rejects a value above its maximum', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ranged":101}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ranged'] })
  })

  // 3 is an int64, and not a member.
  // 3 は int64 だが、メンバーではない。
  it('level rejects a value that is not a member', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"level":3}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['level'] })
  })

  // 6 is an int64, and not the constant.
  // 6 は int64 だが、定数とは異なる。
  it('version rejects another value', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"version":6}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['version'] })
  })

  // The second element is not a string of digits.
  // 2番目の要素が、数字の文字列ではない。
  it('ids rejects a word among its elements', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ids":[1,"x"]}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.1'] })
  })

  // -1 is below the minimum of Id.
  // -1 は Id の最小値を下回る。
  it('ref rejects a value below the minimum of the component', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ref":-1}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ref'] })
  })

  // Only an int64 is read from a string. An int32 is a JSON number.
  // 文字列から読み取られるのは int64 だけである。int32 は JSON の number である。
  it('small rejects a string of digits', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"small":"5"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['small'] })
  })
})

// A value of a type the list does not name is rejected.
// リストにない型の値は、拒否される。
describe('types: rejected values', () => {
  // boolean is not in the list.
  // boolean はリストにない。
  it('either rejects a boolean', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"either":true}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['either'] })
  })

  // 1.5 is a number, and the list names integer.
  // 1.5 は number であり、リストにあるのは integer である。
  it('either rejects a fraction', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"either":1.5}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['either'] })
  })

  // string is not in the list.
  // string はリストにない。
  it('flagged rejects a string', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"flagged":"x"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['flagged'] })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('bounded rejects an integer below the minimum', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"bounded":0}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bounded'] })
  })

  // One below minLength.
  // minLength を 1 下回る。
  it('bounded rejects a string shorter than minLength', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"bounded":"a"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['bounded'] })
  })
})
