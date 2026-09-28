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
// This file holds the requests that are rejected. Each answers 422, and the test asserts the
// path of every issue.
// このファイルには、拒否されるリクエストをまとめている。いずれも 422 を返し、
// テストでは各 issue のパスを検証する。
//
// Contents / 目次:
//   - fields: rejected values
//   - arrays: rejected values
//   - multipart: rejected values
//   - component: rejected values
import { describe, expect, it } from 'vite-plus/test'

import { formBodyApp } from './app'

// A field is read with the grammar a parameter is read with, and what is not that grammar is
// rejected under the name of the field.
// フィールドは、パラメータと同じ文法で読み取られる。その文法に合わない値は、
// フィールド名とともに拒否される。
describe('fields: rejected values', () => {
  // A word is not an integer.
  // 単語は整数ではない。
  it('age rejects a word', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=x',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // An empty field, which a browser sends for an input left blank, holds no digits. It is not
  // read as zero.
  // 空のフィールドは、未入力の入力欄に対してブラウザが送る値であり、数字を含まない。
  // 0 として読まれることはない。
  it('age rejects an empty value', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // -1 is an integer, and below the minimum.
  // -1 は整数だが、最小値を下回る。
  it('age rejects a value below its minimum', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=-1',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // A hexadecimal literal is not decimal.
  // 16進リテラルは10進表記ではない。
  it('age rejects a hexadecimal literal', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=0x10',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // A fraction is not an integer.
  // 小数は整数ではない。
  it('age rejects a fraction', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=1.5',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // A scalar sent twice arrives as an array, which a scalar schema rejects. It does not quietly
  // keep the first or the last.
  // スカラーを2回送ると配列として届き、スカラースキーマは配列を拒否する。
  // 先頭や末尾の値を黙って採用することはない。
  it('age rejects a field sent twice', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'age=1&age=2',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('ratio rejects a word', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ratio=x',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ratio'] })
  })

  // A fraction is not an int64.
  // 小数は int64 ではない。
  it('big rejects a fraction', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'big=1.5',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['big'] })
  })

  // maybe is not a boolean spelling.
  // maybe は真偽値の表記ではない。
  it('active rejects a word', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'active=maybe',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['active'] })
  })

  // The empty string is not a boolean spelling.
  // 空文字列は真偽値の表記ではない。
  it('active rejects an empty value', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'active=',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['active'] })
  })

  // 3 is an integer, and not a member.
  // 3 は整数だが、メンバーではない。
  it('level rejects a value that is not a member', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'level=3',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['level'] })
  })

  // false is a boolean, and not the constant.
  // false は boolean だが、定数とは異なる。
  it('agreed rejects the other boolean', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'agreed=false',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['agreed'] })
  })

  // The default of 20 does not apply, because the field was sent, and the empty value is not a
  // number.
  // フィールド自体は送信されているため、デフォルトの 20 は適用されない。
  // 空の値は数値ではない。
  it('limit rejects an empty value instead of falling back to its default', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'limit=',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['limit'] })
  })

  // -1 is below the minimum of Count.
  // -1 は Count の最小値を下回る。
  it('count rejects a value below the minimum of the component', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'count=-1',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['count'] })
  })

  // x is not a boolean spelling.
  // x は真偽値の表記ではない。
  it('flag rejects a word', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'flag=x',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['flag'] })
  })
})

// An element is validated on its own and reported at its index.
// 要素は個別に検証され、そのインデックスで報告される。
describe('arrays: rejected values', () => {
  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('ids rejects a word among its elements', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ids=1&ids=x',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.1'] })
  })

  // A form body has no serialisation style: 1,2 is one element, and not an integer.
  // フォームボディにはシリアライズ形式がない。1,2 は1つの要素であり、整数ではない。
  it('ids does not split on a comma', async () => {
    const res = await formBodyApp.request('/urlencoded', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'ids=1,2',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.0'] })
  })
})

// A field beside a file is validated like a field of a urlencoded body.
// ファイルと並ぶフィールドは、urlencoded ボディのフィールドと同じように検証される。
describe('multipart: rejected values', () => {
  // file is required.
  // file は必須である。
  it('reports a missing file', async () => {
    const body = new FormData()
    body.append('age', '5')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['file'] })
  })

  // file is sent as a plain field, which is text and not a file.
  // file を通常のフィールドとして送っている。これは文字列であり、ファイルではない。
  it('rejects text where a file is declared', async () => {
    const body = new FormData()
    body.append('file', 'text')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['file'] })
  })

  // A word is not an integer.
  // 単語は整数ではない。
  it('age rejects a word beside the file', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('age', 'x')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['age'] })
  })

  // The second element is not an integer.
  // 2番目の要素が整数ではない。
  it('ids rejects a word among its elements beside the file', async () => {
    const body = new FormData()
    body.append('file', new File(['x'], 'a.txt'))
    body.append('ids', '1')
    body.append('ids', 'x')
    const res = await formBodyApp.request('/multipart', { method: 'POST', body })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['ids.1'] })
  })
})

// The constraints of the component apply to the values read from the form, and a JSON body of the
// same component is not read from text.
// コンポーネントの制約は、フォームから読み取った値に適用される。同じコンポーネントの
// JSON ボディは、文字列から読み取られない。
describe('component: rejected values', () => {
  // price is an integer.
  // price は integer である。
  it('rejects a word where the component declares an integer', async () => {
    const res = await formBodyApp.request('/component', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=pen&price=x',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['price'] })
  })

  // price is required.
  // price は必須である。
  it('reports a missing required field of the component', async () => {
    const res = await formBodyApp.request('/component', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=pen',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['price'] })
  })

  // price has minimum: 0.
  // price は minimum: 0 である。
  it('rejects a value below the minimum the component declares', async () => {
    const res = await formBodyApp.request('/component', {
      method: 'POST',
      headers: { 'content-type': 'application/x-www-form-urlencoded' },
      body: 'name=pen&price=-1',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['price'] })
  })

  // In JSON "5" is a string. It is not read as a number: the document says what its types are.
  // JSON では "5" は string である。number としては読み取られない。
  // 型を決めるのは文書自身である。
  it('a JSON body rejects a string where an integer is declared', async () => {
    const res = await formBodyApp.request('/json', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"name":"pen","price":"5"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['price'] })
  })

  // In JSON "true" is a string.
  // JSON では "true" は string である。
  it('a JSON body rejects a string where a boolean is declared', async () => {
    const res = await formBodyApp.request('/json', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: '{"name":"pen","price":5,"stocked":"true"}',
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({ issues: ['stocked'] })
  })
})
