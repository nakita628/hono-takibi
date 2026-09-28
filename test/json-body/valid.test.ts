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
// This file holds the requests that are accepted. Each answers 200, and the test asserts the
// type and the value that reached the handler.
// このファイルには、受理されるリクエストをまとめている。いずれも 200 を返し、
// テストではハンドラに届いた型と値を検証する。
//
// Contents / 目次:
//   - int64: a number or a string of digits
//   - types: a list of types
import { describe, expect, it } from 'vite-plus/test'

import { jsonBodyApp } from './app'

// An int64 arrives as a bigint whichever way it was sent.
// int64 は、どちらの形式で送信されても bigint として届く。
describe('int64: a number or a string of digits', () => {
  // The way a client sends an int64 that a number holds.
  // number で保持できる int64 を、クライアントが送信する際の形式。
  it('id reads a JSON number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'bigint', valueText: '5' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The way JSON.stringify writes a bigint that has a toJSON, and the only way to send every
  // digit of a large one.
  // toJSON を持つ bigint を JSON.stringify が書き出す際の形式であり、
  // 大きな値のすべての桁を送信できる唯一の形式でもある。
  it('id reads a string of digits', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"5"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'bigint', valueText: '5' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // 9007199254740993 is 2^53 + 1. As a string of digits it arrives exact.
  // 9007199254740993 は 2^53 + 1 である。数字の文字列であれば、正確に届く。
  it('id keeps every digit of a value beyond 2^53', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":"9007199254740993"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'bigint', valueText: '9007199254740993' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // An int64 is signed.
  // int64 は符号付きである。
  it('id reads a negative number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"id":-5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'bigint', valueText: '-5' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // unsigned is a uint64.
  // unsigned は uint64 である。
  it('unsigned reads a JSON number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"unsigned":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      unsigned: { valueType: 'bigint', valueText: '5' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // ranged is an int64 from 1 to 100. The bounds are compared as bigints.
  // ranged は 1 から 100 までの int64 である。境界値は bigint として比較される。
  it('ranged accepts its minimum as a number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ranged":1}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ranged: { valueType: 'bigint', valueText: '1' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The bounds apply whichever way the value was sent.
  // 境界値は、どちらの形式で送信された値にも適用される。
  it('ranged accepts its maximum as a string of digits', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ranged":"100"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ranged: { valueType: 'bigint', valueText: '100' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // level is an int64 enum of 1 and 2. Its members are bigints, like the value.
  // level は 1 と 2 の int64 enum である。メンバーは、値と同じく bigint である。
  it('level reads a member of an int64 enum', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"level":1}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      level: { valueType: 'bigint', valueText: '1' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The same member, sent as text.
  // 同じメンバーを、文字列として送信している。
  it('level reads a member sent as a string of digits', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"level":"2"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      level: { valueType: 'bigint', valueText: '2' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // version is an int64 with const: 5.
  // version は const: 5 の int64 である。
  it('version reads an int64 const', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"version":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      version: { valueType: 'bigint', valueText: '5' },
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // cursor has a default of 0, which gives way to the value sent.
  // cursor のデフォルト値は 0 だが、送信された値が優先される。
  it('cursor reads a value over its default', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"cursor":7}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '7' },
    })
  })

  // The default is a bigint too.
  // デフォルト値も bigint である。
  it('cursor falls back to its default as a bigint', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
    })
  })

  // maybe is type: [integer, null] with format: int64.
  // maybe は、format: int64 を持つ type: [integer, null] である。
  it('maybe reads null', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"maybe":null}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
      maybe: { valueType: 'null', valueText: 'null' },
    })
  })

  // A value that is not null is read like any int64.
  // null でない値は、他の int64 と同じように読み取られる。
  it('maybe reads a number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"maybe":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
      maybe: { valueType: 'bigint', valueText: '5' },
    })
  })

  // ids is an array of int64. A number and a string of digits may stand side by side.
  // ids は int64 の配列である。number と数字の文字列が混在していてもよい。
  it('ids reads every element, however it was sent', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ids":[1,"2"]}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
      ids: [
        { valueType: 'bigint', valueText: '1' },
        { valueType: 'bigint', valueText: '2' },
      ],
    })
  })

  // ref is a $ref to Id, an int64 with minimum: 0.
  // ref は Id への $ref である。Id は minimum: 0 の int64 である。
  it('ref reads an int64 component', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"ref":"5"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
      ref: { valueType: 'bigint', valueText: '5' },
    })
  })

  // small is an int32, which a number holds. It is validated as it is.
  // small は int32 であり、number で保持できる。そのまま検証される。
  it('small stays a number', async () => {
    const res = await jsonBodyApp.request('/numbers', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"small":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cursor: { valueType: 'bigint', valueText: '0' },
      small: { valueType: 'number', valueText: '5' },
    })
  })
})

// type may list several types, and a value of any of them is accepted.
// type には複数の型を列挙でき、そのいずれの型の値も受理される。
describe('types: a list of types', () => {
  // either is type: [integer, string].
  // either は type: [integer, string] である。
  it('either accepts an integer', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"either":1}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      either: { valueType: 'number', valueText: '1' },
    })
  })

  // The other type of the list.
  // リストにあるもう一方の型。
  it('either accepts a string', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"either":"a"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      either: { valueType: 'string', valueText: 'a' },
    })
  })

  // flagged is type: [number, boolean, null].
  // flagged は type: [number, boolean, null] である。
  it('flagged accepts a number', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"flagged":1.5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      flagged: { valueType: 'number', valueText: '1.5' },
    })
  })

  // The second type of the list.
  // リストにある2番目の型。
  it('flagged accepts a boolean', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"flagged":true}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      flagged: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // null in the list makes the field nullable.
  // リストに null があると、フィールドは nullable になる。
  it('flagged accepts null', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"flagged":null}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      flagged: { valueType: 'null', valueText: 'null' },
    })
  })

  // bounded is type: [integer, string] with minimum: 1 and minLength: 2. The minimum bounds the
  // integer.
  // bounded は、minimum: 1 と minLength: 2 を持つ type: [integer, string] である。
  // minimum は integer を制約する。
  it('bounded accepts an integer that meets the minimum', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"bounded":1}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bounded: { valueType: 'number', valueText: '1' },
    })
  })

  // minLength bounds the string.
  // minLength は string を制約する。
  it('bounded accepts a string that meets minLength', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"bounded":"ab"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bounded: { valueType: 'string', valueText: 'ab' },
    })
  })

  // moment is format: date-time.
  // moment は format: date-time である。
  it('moment accepts a date-time in UTC', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"moment":"2020-01-02T03:04:05Z"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      moment: { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
    })
  })

  // An offset instead of Z: RFC 3339 takes either.
  // Z ではなくオフセット。RFC 3339 はどちらも認める。
  it('moment accepts a date-time with an offset', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"moment":"2020-01-02T03:04:05+09:00"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      moment: { valueType: 'string', valueText: '2020-01-02T03:04:05+09:00' },
    })
  })

  // clock is format: time, which ends in an offset as well.
  // clock は format: time であり、これもオフセットで終わる。
  it('clock accepts a time with an offset', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"clock":"12:34:56+09:00"}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      clock: { valueType: 'string', valueText: '12:34:56+09:00' },
    })
  })

  // name is declared a string, and count, which nothing declares, is held to an integer.
  // name は string として宣言されている。どこにも宣言されていない count は、integer であることを求められる。
  it('labelled keeps a declared property beside an additional one', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"labelled":{"name":"a","count":2}}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      labelled: { valueType: 'object', valueText: '{"name":"a","count":2}' },
    })
  })

  // constructor is optional: what the object inherits under that name is not a value of it.
  // constructor は任意である。オブジェクトがその名前で継承しているものは、このプロパティの値ではない。
  it('inherited accepts an object without its constructor property', async () => {
    const res = await jsonBodyApp.request('/types', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"inherited":{"name":"a"}}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inherited: { valueType: 'object', valueText: '{"name":"a"}' },
    })
  })
})
