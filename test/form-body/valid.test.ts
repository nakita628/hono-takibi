// A form body carries every field as text, or as a file, exactly like a query string. A
// schema written for a typed value rejects all of it, so the generated schema reads the
// text first. The JSON route is the contrast: JSON has types of its own, and nothing in it
// is read from text.
//
// フォームボディは、クエリ文字列とまったく同じく、すべてのフィールドを文字列またはファイル
// として運ぶ。型付きの値を前提に書かれたスキーマはそのすべてを拒否するため、生成される
// スキーマは先に文字列を読み取る。JSON のルートはその対比である。JSON は自身で型を持つため、
// その中の値が文字列から読み取られることはない。
//
// How to read a test / テストの読み方:
//   Every route answers the fields its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A file is
//   described by its name. A field that was not sent and has no default is absent from the
//   answer; `limit` of /urlencoded has a default of 20, so it is in every answer of that
//   route. A rejected request answers 422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取ったフィールドを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。ファイルは
//   ファイル名で表される。送信されずデフォルトもないフィールドは、応答に含まれない。
//   /urlencoded の `limit` にはデフォルト値 20 があるため、このルートの応答には必ず含まれる。
//   拒否されたリクエストは 422 と `{ issues: [...] }`(各 issue のパス)を返す。
//
// Routes / ルート:
//   /urlencoded  application/x-www-form-urlencoded, every kind of field, all optional
//                application/x-www-form-urlencoded。あらゆる種類のフィールド。すべて任意
//   /multipart   multipart/form-data, a file beside fields read from text
//                multipart/form-data。ファイルと、文字列から読み取られるフィールド
//   /component   a form body that is a component schema / コンポーネントスキーマのフォームボディ
//   /json        the same component as a JSON body / 同じコンポーネントの JSON ボディ
//
// This file holds the requests that are accepted. Each answers 200, and the test asserts the
// type and the value that reached the handler.
// このファイルには、受理されるリクエストをまとめている。いずれも 200 を返し、
// テストではハンドラに届いた型と値を検証する。
//
// Contents / 目次:
//   - fields: every kind of field is read from text
//   - arrays: a field sent once or several times
//   - multipart: a file beside fields read from text
//   - component: a form body that is a component schema
import { describe, expect, it } from 'vite-plus/test'

import { formBodyApp } from './app'

// One field at a time, so a failure names the kind that failed.
// フィールドを1つずつ送信する。失敗した場合に、どの種類が原因かを特定できる。
describe('fields: every kind of field is read from text', () => {
  // A string is the text itself.
  // string は、文字列そのものである。
  it('name arrives as a string', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=alice',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: { valueType: 'string', valueText: 'alice' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // In a form body a plus sign is a space.
  // フォームボディでは、プラス記号は空白を表す。
  it('name decodes a plus sign as a space', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=a+b',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: { valueType: 'string', valueText: 'a b' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // age is an integer with minimum: 0.
  // age は minimum: 0 の integer である。
  it('age arrives as a number', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=5',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: { valueType: 'number', valueText: '5' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // The constraint applies to the value that was read.
  // 制約は、読み取った値に適用される。
  it('age accepts its minimum', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=0',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      age: { valueType: 'number', valueText: '0' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // ratio is a number.
  // ratio は number である。
  it('ratio arrives as a number', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ratio=1.5',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ratio: { valueType: 'number', valueText: '1.5' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // big is an int64, read as a bigint without losing a digit.
  // big は int64 であり、桁落ちすることなく bigint として読み取られる。
  it('big arrives as a bigint', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'big=9007199254740993',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      big: { valueType: 'bigint', valueText: '9007199254740993' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // active is a boolean.
  // active は boolean である。
  it('active reads "true"', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'active=true',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      active: { valueType: 'boolean', valueText: 'true' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // A form field reads the spellings a parameter reads.
  // フォームのフィールドは、パラメータと同じ表記を読み取る。
  it('active reads "0" as false', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'active=0',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      active: { valueType: 'boolean', valueText: 'false' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // on is what a browser sends for a checked checkbox that has no value of its own.
  // on は、value を持たないチェックボックスがチェックされたときにブラウザが送る値である。
  it('active reads "on" as true', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'active=on',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      active: { valueType: 'boolean', valueText: 'true' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // level is an integer enum of 1 and 2.
  // level は 1 と 2 の integer enum である。
  it('level reads a member of an integer enum', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'level=1',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      level: { valueType: 'number', valueText: '1' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // agreed is type: boolean with const: true.
  // agreed は type: boolean に const: true を加えたものである。
  it('agreed reads a boolean const', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'agreed=true',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      agreed: { valueType: 'boolean', valueText: 'true' },
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // limit has a default of 20, which gives way to the value sent.
  // limit のデフォルト値は 20 だが、送信された値が優先される。
  it('limit reads a value over its default', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'limit=5',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '5' },
    })
  })

  // An empty body sends no field at all.
  // 空のボディは、フィールドを一切送らない。
  it('limit falls back to its default when it is not sent', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: '',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // count is a $ref to Count, z.int().min(0), written for a typed value.
  // count は Count への $ref である。Count は z.int().min(0) であり、
  // 型付きの値を前提としている。
  it('count reads an integer component', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'count=5',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      count: { valueType: 'number', valueText: '5' },
    })
  })

  // flag is a $ref to Flag, z.boolean().
  // flag は Flag への $ref である。Flag は z.boolean() である。
  it('flag reads a boolean component', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'flag=true',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      flag: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // A field that is not declared is left out of what the handler receives.
  // 宣言されていないフィールドは、ハンドラが受け取る値から除かれる。
  it('ignores a field the schema does not declare', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'unknown=1',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
    })
  })

  // moment is format: date-time; the offset is sent percent-encoded, as a form sends "+".
  // moment は format: date-time である。フォームが "+" を送るときと同じく、オフセットは
  // パーセントエンコードして送信する。
  it('moment accepts a date-time with an offset', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: `moment=${encodeURIComponent('2020-01-02T03:04:05+09:00')}`,
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      moment: { valueType: 'string', valueText: '2020-01-02T03:04:05+09:00' },
    })
  })
})

// An array field is sent by repeating its name. Sent once, it arrives as a bare string, which the
// generated schema has to accept as a one-element array.
// 配列のフィールドは、名前を繰り返して送信する。1回だけ送った場合は素の文字列として届くため、
// 生成されるスキーマはそれを1要素の配列として受理しなければならない。
describe('arrays: a field sent once or several times', () => {
  // tags is an array of strings.
  // tags は string の配列である。
  it('tags reads a single value as a one-element array', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'tags=x',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      tags: [{ valueType: 'string', valueText: 'x' }],
    })
  })

  // Two occurrences, two elements.
  // 2回の出現は、2要素になる。
  it('tags reads a repeated name as an array', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'tags=x&tags=y',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      tags: [
        { valueType: 'string', valueText: 'x' },
        { valueType: 'string', valueText: 'y' },
      ],
    })
  })

  // A form body has no serialisation style: a comma is part of the value.
  // フォームボディにはシリアライズ形式がない。カンマは値の一部である。
  it('tags keeps a comma inside an element', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'tags=x,y',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      tags: [{ valueType: 'string', valueText: 'x,y' }],
    })
  })

  // ids is an array of integers.
  // ids は integer の配列である。
  it('ids reads a single value as a one-element array', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ids=1',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      ids: [{ valueType: 'number', valueText: '1' }],
    })
  })

  // Each element is read from text.
  // 各要素が、文字列から読み取られる。
  it('ids reads every element as a number', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ids=1&ids=2',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '20' },
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })
})

// multipart/form-data carries a file as a file and everything else as text.
// multipart/form-data は、ファイルをファイルとして、それ以外をすべて文字列として運ぶ。
describe('multipart: a file beside fields read from text', () => {
  // file is type: string with format: binary, the only field that is required.
  // file は type: string, format: binary であり、唯一の必須フィールドである。
  it('file arrives as a file', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      file: { valueType: 'file', valueText: 'a.txt' },
    })
  })

  // A field beside a file is text, read like a field of a urlencoded body.
  // ファイルと並ぶフィールドは文字列であり、urlencoded ボディのフィールドと同じように
  // 読み取られる。
  it('age arrives as a number beside the file', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('age', '5')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      file: { valueType: 'file', valueText: 'a.txt' },
      age: { valueType: 'number', valueText: '5' },
    })
  })

  // The same for a boolean.
  // boolean でも同様である。
  it('active arrives as a boolean beside the file', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('active', 'true')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      file: { valueType: 'file', valueText: 'a.txt' },
      active: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The same for an array.
  // 配列でも同様である。
  it('ids reads a repeated field as an array of numbers', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('ids', '1')
    body.append('ids', '2')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      file: { valueType: 'file', valueText: 'a.txt' },
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // Sent once, the field arrives as a bare string.
  // 1回だけ送った場合、フィールドは素の文字列として届く。
  it('ids reads a single field as a one-element array', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('ids', '1')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      file: { valueType: 'file', valueText: 'a.txt' },
      ids: [{ valueType: 'number', valueText: '1' }],
    })
  })
})

// Item is a component with an integer price and a boolean stocked. As a JSON body it is validated
// as it is; as a form body its fields are read from text, so the component is written out in
// place with fields that read text.
// Item は、integer の price と boolean の stocked を持つコンポーネントである。JSON ボディでは
// そのまま検証される。フォームボディではフィールドを文字列から読み取るため、コンポーネントは
// 文字列を読み取るフィールドを持つ形で、その場に展開される。
describe('component: a form body that is a component schema', () => {
  // name stays text and price is read as a number.
  // name は文字列のままであり、price は number として読み取られる。
  it('reads the fields of a component from text', async () => {
    const res = await formBodyApp.request('/component', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=pen&price=5',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: { valueType: 'string', valueText: 'pen' },
      price: { valueType: 'number', valueText: '5' },
    })
  })

  // stocked is optional and a boolean.
  // stocked は任意の boolean である。
  it('reads an optional field of a component', async () => {
    const res = await formBodyApp.request('/component', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=pen&price=5&stocked=true',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: { valueType: 'string', valueText: 'pen' },
      price: { valueType: 'number', valueText: '5' },
      stocked: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The same component as a JSON body: the number is a number in the document already.
  // 同じコンポーネントを JSON ボディとして送る。数値は、文書の時点ですでに number である。
  it('a JSON body of the same component arrives typed', async () => {
    const res = await formBodyApp.request('/json', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"name":"pen","price":5}',
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      name: { valueType: 'string', valueText: 'pen' },
      price: { valueType: 'number', valueText: '5' },
    })
  })
})
