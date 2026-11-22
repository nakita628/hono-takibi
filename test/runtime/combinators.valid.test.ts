// The schema combinators `oneOf`, `anyOf`, `allOf` and `not` in a request body
// (cases/combinators, generated from specs/combinators.yaml), run against the host in
// hosts/combinators-app.ts.
//
//   oneOf  exactly one branch matches   z.xor([...])
//   anyOf  at least one branch matches  z.union([...])
//   allOf  every branch matches         a.and(b)
//   not    the schema does not match    z.any().refine(...)
//
// Each combinator also has a message extension (`x-oneOf-message`, `x-anyOf-message`,
// `x-allOf-message`, `x-not-message`), which takes a fixed text or an arrow function.
//
// The host answers a valid request with 200 and `{}`. It answers a validation failure
// with 422 and RFC 9457 Problem Details, whose `errors` list holds, for every issue, the
// `pointer` to the value, the `detail` (the message of the issue) and the `code`.
//
// リクエストボディにおけるスキーマコンビネータ `oneOf`・`anyOf`・`allOf`・`not` の検証
// (cases/combinators。specs/combinators.yaml から生成)。hosts/combinators-app.ts のホストに
// 対して実行する。
//
//   oneOf  ちょうど1つの分岐に一致する   z.xor([...])
//   anyOf  少なくとも1つの分岐に一致する z.union([...])
//   allOf  すべての分岐に一致する        a.and(b)
//   not    スキーマに一致しない          z.any().refine(...)
//
// 各コンビネータには、メッセージ用の拡張(`x-oneOf-message`・`x-anyOf-message`・
// `x-allOf-message`・`x-not-message`)もあり、固定の文字列またはアロー関数を指定できる。
//
// ホストは、有効なリクエストには 200 と `{}` を返す。検証の失敗には、422 と RFC 9457 の
// Problem Details を返す。その `errors` には、issue ごとに、値への `pointer`・`detail`
// (issue のメッセージ)・`code` が含まれる。
//
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/combinators-app'

// Exactly one branch has to match.
// ちょうど1つの分岐に一致しなければならない。
describe('oneOf: { value: oneOf [string, integer] }', () => {
  // The string branch matches, the integer branch does not.
  // string 側の分岐に一致し、integer 側には一致しない。
  it('accepts a string', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'hello' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The integer branch matches, the string branch does not.
  // integer 側の分岐に一致し、string 側には一致しない。
  it('accepts an integer', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The empty string is a string.
  // 空文字列も string である。
  it('accepts an empty string', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: '' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Zero is an integer, and a value, not an absence.
  // 0 は integer であり、欠落ではなく値である。
  it('accepts zero', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 0 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The integer branch has no minimum.
  // integer 側の分岐に最小値はない。
  it('accepts a negative integer', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: -1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An unknown property beside value is stripped, not rejected.
  // value 以外の未知のプロパティは、拒否されずに取り除かれる。
  it('drops a property the schema does not declare', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 1, extra: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// At least one branch has to match.
// 少なくとも1つの分岐に一致しなければならない。
describe('anyOf: { value: anyOf [string, integer] }', () => {
  // The string branch matches.
  // string 側の分岐に一致する。
  it('accepts a string', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'hello' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The integer branch matches.
  // integer 側の分岐に一致する。
  it('accepts an integer', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// Every branch has to match. The two object schemas are intersected.
// すべての分岐に一致しなければならない。2つのオブジェクトスキーマは、交差型として結合される。
describe('allOf: { name: string, minLength 3 } and { age: integer, minimum 0 }', () => {
  // name satisfies the first branch and age the second.
  // name が1つ目の分岐を、age が2つ目の分岐を満たす。
  it('accepts a body that satisfies both branches', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Exactly minLength: 3 and minimum: 0.
  // ちょうど minLength: 3 と minimum: 0 の値。
  it('accepts the boundary of each branch', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'abc', age: 0 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The value must not match the negated schema. Anything that is not a string passes.
// 値は、否定されたスキーマに一致してはならない。string でない値は、すべて通過する。
describe('not: { forbidden: not string }', () => {
  // An integer is not a string.
  // integer は string ではない。
  it('accepts an integer', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // A boolean is not a string.
  // boolean は string ではない。
  it('accepts a boolean', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // null is not a string.
  // null は string ではない。
  it('accepts null', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: null }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An object is not a string.
  // オブジェクトは string ではない。
  it('accepts an object', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: { nested: true } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An array is not a string, whatever it holds.
  // 配列は、中身が何であっても string ではない。
  it('accepts an array of strings', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: ['a'] }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The payload is a dog or a cat, told apart by kind.
// payload は dog または cat であり、kind によって区別される。
describe('oneOf with a discriminator', () => {
  // kind selects the dog branch, whose required property is present.
  // kind によって dog 側の分岐が選択され、その必須プロパティが存在する。
  it('accepts a dog', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'dog', dog: 'Pochi' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // kind selects the cat branch.
  // kind によって cat 側の分岐が選択される。
  it('accepts a cat', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'cat', cat: 'Tama' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The branches { a } and { b } can both match the same value, which is what sets anyOf apart
// from oneOf.
// 分岐 { a } と { b } は、同じ値に対して同時に一致しうる。
// これが anyOf と oneOf の違いである。
describe('anyOf with branches that overlap', () => {
  // Only { a } matches.
  // { a } だけが一致する。
  it('accepts a value that matches the first branch only', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 1 } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Only { b } matches.
  // { b } だけが一致する。
  it('accepts a value that matches the second branch only', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { b: 1 } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Both branches match, which anyOf allows and oneOf would not.
  // 両方の分岐に一致する。anyOf では許容されるが、oneOf では許容されない。
  it('accepts a value that matches both branches', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 1, b: 2 } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // a and b are both optional, so an empty object matches both branches.
  // a と b はどちらも任意であるため、空のオブジェクトは両方の分岐に一致する。
  it('accepts an empty payload', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: {} }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The first branch fails, because a is not an integer. The second branch declares b only and
  // does not forbid other properties, so it matches, and one matching branch is enough.
  // 1つ目の分岐は、a が integer でないため失敗する。2つ目の分岐は b だけを宣言しており、
  // 他のプロパティを禁止していないため、一致する。一致する分岐が1つあれば十分である。
  it('accepts a value whose a is not an integer', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 'x' } }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// { a: string }, { b: integer } and { c: boolean }. The chain has to run its full length.
// { a: string }・{ b: integer }・{ c: boolean } の3分岐。連鎖は、
// 最後まで実行されなければならない。
describe('allOf with three branches', () => {
  // Every branch passes.
  // すべての分岐が成功する。
  it('accepts a body that satisfies all three branches', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 1, c: true }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The value must not be the string "forbidden-value".
// 値は、文字列 "forbidden-value" であってはならない。
describe('not with a const', () => {
  // Only the one constant is forbidden.
  // 禁止されているのは、その定数1つだけである。
  it('accepts another string', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'allowed-value' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Another type entirely.
  // まったく別の型の値。
  it('accepts an integer', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The comparison is case-sensitive.
  // 比較は大文字小文字を区別する。
  it('accepts the constant in another case', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'FORBIDDEN-VALUE' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The comparison is exact.
  // 比較は完全一致で行われる。
  it('accepts the constant with a trailing space', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'forbidden-value ' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A fixed text replaces the message of the union issue.
// 固定の文字列が、ユニオンの issue のメッセージを置き換える。
describe('x-oneOf-message', () => {
  // A message changes what a failure says, not what is valid.
  // メッセージが変えるのは失敗時の文言であり、何が有効であるかは変わらない。
  it('still accepts a valid value', async () => {
    const res = await app.request('/one-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'ok' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A fixed text replaces the message of the union issue.
// 固定の文字列が、ユニオンの issue のメッセージを置き換える。
describe('x-anyOf-message', () => {
  // A message changes what a failure says, not what is valid.
  // メッセージが変えるのは失敗時の文言であり、何が有効であるかは変わらない。
  it('still accepts a valid value', async () => {
    const res = await app.request('/any-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// An intersection has no issue of its own, so the message replaces the message of every issue
// its branches report, and keeps the path and the code of each.
// 交差型には固有の issue がない。そのためメッセージは、
// 各分岐が報告するすべての issue のメッセージを置き換える。
// それぞれのパスと code は保持される。
describe('x-allOf-message', () => {
  // The wrapper that rewrites the messages passes a valid value through unchanged.
  // メッセージを書き換えるラッパーは、有効な値をそのまま通過させる。
  it('still accepts a valid body', async () => {
    const res = await app.request('/all-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A fixed text replaces the message of the refinement.
// 固定の文字列が、refine のメッセージを置き換える。
describe('x-not-message', () => {
  // A message changes what a failure says, not what is valid.
  // メッセージが変えるのは失敗時の文言であり、何が有効であるかは変わらない。
  it('still accepts a value that is not a string', async () => {
    const res = await app.request('/not-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 42 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A message extension may hold an arrow function, which receives the issue and returns the
// text.
// メッセージ用の拡張にはアロー関数も指定できる。関数は issue を受け取り、文字列を返す。
describe('messages written as an arrow function', () => {
  // The arrow function is not called for a valid value.
  // 有効な値に対しては、アロー関数は呼び出されない。
  it('x-allOf-message still accepts a valid body', async () => {
    const res = await app.request('/all-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: 25 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The arrow function is not called for a valid value.
  // 有効な値に対しては、アロー関数は呼び出されない。
  it('x-oneOf-message still accepts a valid value', async () => {
    const res = await app.request('/one-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The arrow function is not called for a valid value.
  // 有効な値に対しては、アロー関数は呼び出されない。
  it('x-not-message still accepts a value that is not a string', async () => {
    const res = await app.request('/not-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 1 }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// `additionalProperties: false` in an `allOf` member applies to that member alone (JSON
// Schema 2020-12): a value the member accepts on its own is accepted.
// `allOf` のメンバーに書かれた `additionalProperties: false` は、そのメンバーだけに適用される
// (JSON Schema 2020-12)。メンバー単体で受理される値は、そのまま受理される。
describe('allOf: a member with additionalProperties: false', () => {
  // Only the key the strict member declares.
  // strict なメンバーが宣言するキーだけを持つ。
  it('accepts an object of the keys the strict member declares', async () => {
    const res = await app.request('/strict-member', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: 'a' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The member is a discriminated union whose branches are strict.
  // メンバーは、各分岐が strict な discriminated union である。
  it('accepts a branch of a discriminated union with its own keys', async () => {
    const res = await app.request('/strict-branch', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ kind: 'cat' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// Sibling keywords are ANDed (JSON Schema 2020-12): a value that satisfies every combinator
// at the same level is accepted.
// 同じ階層のキーワードは AND で結合される (JSON Schema 2020-12)。同じ階層にあるすべての
// コンビネータを満たす値は、受理される。
describe('several combinators at the same level', () => {
  // Each property carries two combinators, and each value satisfies both.
  // 各プロパティは2つのコンビネータを持ち、各値はその両方を満たす。
  it('accepts values that satisfy every combinator', async () => {
    const res = await app.request('/siblings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        allOfAnyOf: 'ab',
        allOfOneOf: 'abc',
        anyOfOneOf: 'a',
        allOfNot: 'y',
        anyOfNot: 1,
      }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // `required` beside the `anyOf` is satisfied.
  // `anyOf` の横に書かれた `required` を満たしている。
  it('accepts an object with the key required beside the anyOf', async () => {
    const res = await app.request('/required-only', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x' }),
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The document generated back from the routes keeps the combinators. A check on the raw
// input is a `z.preprocess`, which is rendered by the schema inside it; a check piped into
// the schema was rendered as `{}`.
// ルートから再生成したドキュメントには、コンビネータが残る。生の入力に対する検証は
// `z.preprocess` であり、内側のスキーマとして描画される。スキーマへパイプする check は
// `{}` として描画されていた。
describe('the generated document keeps the combinators', () => {
  const doc = app.getOpenAPI31Document({ openapi: '3.1.0', info: { title: 't', version: '1' } })
  const name = { type: 'object', properties: { name: { type: 'string', minLength: 3 } } }
  const age = { type: 'object', properties: { age: { type: 'integer', minimum: 0 } } }

  // `x-allOf-message` wraps the intersection; the document still has it.
  // `x-allOf-message` は交差型をラップするが、ドキュメントには交差型が残る。
  it('keeps the allOf of a schema with x-allOf-message', () => {
    expect(doc.components?.schemas?.AllOfArrowMessage).toStrictEqual({
      allOf: [
        { ...name, required: ['name'] },
        { ...age, required: ['age'] },
      ],
    })
  })

  // The check of the strict member is around the intersection, not in place of it.
  // strict なメンバーの検証は交差型の外側にあり、交差型を置き換えるものではない。
  it('keeps the allOf of a schema with a strict member', () => {
    expect(doc.components?.schemas?.StrictMember).toStrictEqual({
      allOf: [
        {
          type: 'object',
          properties: { id: { type: 'string' } },
          required: [],
          additionalProperties: false,
        },
        { type: 'object', properties: { link: { type: 'string' } }, required: [] },
      ],
    })
    expect(doc.components?.schemas?.StrictBranch).toStrictEqual({
      allOf: [
        { $ref: '#/components/schemas/Pet' },
        { type: 'object', properties: { link: { type: 'string' } }, required: [] },
      ],
    })
  })

  // `required` beside an `anyOf` is checked on the raw input; the `anyOf` is still there.
  // `anyOf` の横の `required` は生の入力に対して検証されるが、`anyOf` は残る。
  it('keeps the anyOf beside a required-only shape', () => {
    expect(doc.components?.schemas?.RequiredOnly).toMatchObject({
      allOf: [
        {
          anyOf: [
            { type: 'object', properties: { a: { type: 'string' } } },
            { type: 'object', properties: { b: { type: 'string' } } },
          ],
        },
        { type: 'object' },
      ],
      required: ['a'],
    })
  })

  // Both combinators of a property are in the document, as members of one allOf.
  // プロパティが持つ2つのコンビネータは、どちらも1つの allOf のメンバーとしてドキュメントに残る。
  it('keeps every combinator written at the same level', () => {
    expect(doc.components?.schemas?.Siblings).toMatchObject({
      properties: {
        allOfAnyOf: { allOf: [{ type: 'string', minLength: 1 }, { anyOf: [{}, {}] }] },
        allOfOneOf: { allOf: [{ type: 'string' }, { anyOf: [{}, {}] }] },
        anyOfOneOf: { allOf: [{ anyOf: [{ type: 'string' }] }, { anyOf: [{}, {}] }] },
      },
    })
  })
})
