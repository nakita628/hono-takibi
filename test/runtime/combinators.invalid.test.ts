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
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/combinators-app'

// Exactly one branch has to match.
// ちょうど1つの分岐に一致しなければならない。
describe('oneOf: { value: oneOf [string, integer] }', () => {
  // No branch matches, which is reported as one invalid_union issue on the value.
  // どの分岐にも一致しない。これは、値に対する1件の invalid_union として報告される。
  it('rejects a boolean', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // null is neither a string nor an integer.
  // null は string でも integer でもない。
  it('rejects null', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: null }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // A fraction is a number, and not an integer.
  // 小数は number だが、integer ではない。
  it('rejects a fraction', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 1.5 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // An array of strings is not a string.
  // string の配列は、string ではない。
  it('rejects an array', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: ['a'] }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // An object matches no branch.
  // オブジェクトは、どの分岐にも一致しない。
  it('rejects an object', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: { a: 1 } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // value is required.
  // value は必須である。
  it('rejects a body with no value', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })
})

// At least one branch has to match.
// 少なくとも1つの分岐に一致しなければならない。
describe('anyOf: { value: anyOf [string, integer] }', () => {
  // No branch matches.
  // どの分岐にも一致しない。
  it('rejects a boolean', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: false }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // null is neither a string nor an integer.
  // null は string でも integer でもない。
  it('rejects null', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: null }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // A fraction is not an integer.
  // 小数は integer ではない。
  it('rejects a fraction', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 1.5 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // value is required.
  // value は必須である。
  it('rejects a body with no value', async () => {
    const res = await app.request('/any-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })
})

// Every branch has to match. The two object schemas are intersected.
// すべての分岐に一致しなければならない。2つのオブジェクトスキーマは、交差型として結合される。
describe('allOf: { name: string, minLength 3 } and { age: integer, minimum 0 }', () => {
  // The first branch fails, the second passes. One issue, on name.
  // 1つ目の分岐が失敗し、2つ目は成功する。issue は name に対する1件である。
  it('rejects a name that fails the first branch', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: 25 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/name',
          detail: 'Too small: expected string to have >=3 characters',
          code: 'too_small',
        },
      ],
    })
  })

  // The second branch fails, the first passes. One issue, on age.
  // 2つ目の分岐が失敗し、1つ目は成功する。issue は age に対する1件である。
  it('rejects an age that fails the second branch', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/age', detail: 'Too small: expected number to be >=0', code: 'too_small' },
      ],
    })
  })

  // The issues of both branches are reported, each under its own path: the intersection does
  // not stop at the first branch that fails.
  // 両方の分岐の issue が、それぞれのパスで報告される。交差型は、
  // 最初に失敗した分岐で検証を打ち切らない。
  it('reports both branches when both fail', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/name',
          detail: 'Too small: expected string to have >=3 characters',
          code: 'too_small',
        },
        { pointer: '/age', detail: 'Too small: expected number to be >=0', code: 'too_small' },
      ],
    })
  })

  // age is required by the second branch.
  // age は、2つ目の分岐で必須とされている。
  it('rejects a body with no age', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/age',
          detail: 'Invalid input: expected number, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })

  // name is required by the first branch.
  // name は、1つ目の分岐で必須とされている。
  it('rejects a body with no name', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ age: 25 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/name',
          detail: 'Invalid input: expected string, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })

  // Both required properties are missing.
  // 必須プロパティが両方とも欠けている。
  it('rejects an empty object', async () => {
    const res = await app.request('/all-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/name',
          detail: 'Invalid input: expected string, received undefined',
          code: 'invalid_type',
        },
        {
          pointer: '/age',
          detail: 'Invalid input: expected number, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })
})

// The value must not match the negated schema. Anything that is not a string passes.
// 値は、否定されたスキーマに一致してはならない。string でない値は、すべて通過する。
describe('not: { forbidden: not string }', () => {
  // The value matches the negated type. The issue has the code custom, because not is emitted
  // as a refinement.
  // 値が、否定された型に一致している。not は refine として生成されるため、
  // issue の code は custom になる。
  it('rejects a string', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'hello' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/forbidden', detail: 'Invalid input', code: 'custom' }],
    })
  })

  // The empty string is still a string.
  // 空文字列も string である。
  it('rejects an empty string', async () => {
    const res = await app.request('/not', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: '' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/forbidden', detail: 'Invalid input', code: 'custom' }],
    })
  })
})

// The payload is a dog or a cat, told apart by kind.
// payload は dog または cat であり、kind によって区別される。
describe('oneOf with a discriminator', () => {
  // "bird" is not a declared kind.
  // "bird" は、宣言された kind ではない。
  it('rejects a kind that names no branch', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'bird', bird: 'Tweety' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/payload/kind',
          detail: "Invalid discriminator value. Expected 'dog' | 'cat'",
          code: 'invalid_union',
        },
      ],
    })
  })

  // The discriminator matches, and the required property of the branch is missing.
  // 識別子は一致するが、その分岐の必須プロパティが欠けている。
  it('rejects a dog with no dog property', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'dog' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/payload/dog',
          detail: 'Invalid input: expected string, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })

  // The property of the other branch does not stand in for the missing one.
  // もう一方の分岐のプロパティは、欠けているプロパティの代わりにならない。
  it('rejects a dog with the property of a cat', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { kind: 'dog', cat: 'Tama' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/payload/dog',
          detail: 'Invalid input: expected string, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })

  // Without the discriminator no branch can be selected.
  // 識別子がなければ、分岐を選択できない。
  it('rejects a payload with no kind', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { dog: 'Pochi' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/payload/kind',
          detail: "Invalid discriminator value. Expected 'dog' | 'cat'",
          code: 'invalid_union',
        },
      ],
    })
  })

  // payload is required.
  // payload は必須である。
  it('rejects a body with no payload', async () => {
    const res = await app.request('/one-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/payload',
          detail: 'Invalid input: expected object, received undefined',
          code: 'invalid_type',
        },
      ],
    })
  })
})

// The branches { a } and { b } can both match the same value, which is what sets anyOf apart
// from oneOf.
// 分岐 { a } と { b } は、同じ値に対して同時に一致しうる。
// これが anyOf と oneOf の違いである。
describe('anyOf with branches that overlap', () => {
  // a fails the first branch and b the second.
  // a が1つ目の分岐で、b が2つ目の分岐で失敗する。
  it('rejects a value that fails both branches', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ payload: { a: 'x', b: 'y' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/payload', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })

  // payload is required.
  // payload は必須である。
  it('rejects a body with no payload', async () => {
    const res = await app.request('/any-of-overlap', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/payload', detail: 'Invalid input', code: 'invalid_union' }],
    })
  })
})

// { a: string }, { b: integer } and { c: boolean }. The chain has to run its full length.
// { a: string }・{ b: integer }・{ c: boolean } の3分岐。連鎖は、
// 最後まで実行されなければならない。
describe('allOf with three branches', () => {
  // a is a number, not a string.
  // a が string ではなく number である。
  it('rejects a body that fails the first branch', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 42, b: 1, c: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/a',
          detail: 'Invalid input: expected string, received number',
          code: 'invalid_type',
        },
      ],
    })
  })

  // b is a string, not an integer.
  // b が integer ではなく string である。
  it('rejects a body that fails the second branch', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 'wrong', c: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/b',
          detail: 'Invalid input: expected number, received string',
          code: 'invalid_type',
        },
      ],
    })
  })

  // c is a string, not a boolean. The last branch is checked too.
  // c が boolean ではなく string である。最後の分岐も検証されている。
  it('rejects a body that fails the third branch', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 'x', b: 1, c: 'wrong' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/c',
          detail: 'Invalid input: expected boolean, received string',
          code: 'invalid_type',
        },
      ],
    })
  })

  // One issue per branch, in the order of the branches.
  // 分岐ごとに1件の issue が、分岐の順に報告される。
  it('reports all three branches when all fail', async () => {
    const res = await app.request('/all-of-chain', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ a: 1, b: 'x', c: 'y' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/a',
          detail: 'Invalid input: expected string, received number',
          code: 'invalid_type',
        },
        {
          pointer: '/b',
          detail: 'Invalid input: expected number, received string',
          code: 'invalid_type',
        },
        {
          pointer: '/c',
          detail: 'Invalid input: expected boolean, received string',
          code: 'invalid_type',
        },
      ],
    })
  })
})

// The value must not be the string "forbidden-value".
// 値は、文字列 "forbidden-value" であってはならない。
describe('not with a const', () => {
  // Exactly the forbidden value.
  // 禁止された値そのもの。
  it('rejects the constant itself', async () => {
    const res = await app.request('/not-const', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: 'forbidden-value' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/value', detail: 'Invalid input', code: 'custom' }],
    })
  })
})

// A fixed text replaces the message of the union issue.
// 固定の文字列が、ユニオンの issue のメッセージを置き換える。
describe('x-oneOf-message', () => {
  // The detail is the text of x-oneOf-message; the code is still invalid_union.
  // detail は x-oneOf-message の文字列になる。code は invalid_union のままである。
  it('rejects a boolean with the configured message', async () => {
    const res = await app.request('/one-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/value',
          detail: 'value must match exactly one of: string | integer',
          code: 'invalid_union',
        },
      ],
    })
  })
})

// A fixed text replaces the message of the union issue.
// 固定の文字列が、ユニオンの issue のメッセージを置き換える。
describe('x-anyOf-message', () => {
  // The detail is the text of x-anyOf-message.
  // detail は x-anyOf-message の文字列になる。
  it('rejects a boolean with the configured message', async () => {
    const res = await app.request('/any-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/value', detail: 'value must be a string or integer', code: 'invalid_union' },
      ],
    })
  })
})

// An intersection has no issue of its own, so the message replaces the message of every issue
// its branches report, and keeps the path and the code of each.
// 交差型には固有の issue がない。そのためメッセージは、
// 各分岐が報告するすべての issue のメッセージを置き換える。
// それぞれのパスと code は保持される。
describe('x-allOf-message', () => {
  // Both issues carry the configured message, each under its own pointer.
  // 2件の issue はどちらも設定されたメッセージを持ち、それぞれ自身の pointer で報告される。
  it('rewrites the message of every issue and keeps its path', async () => {
    const res = await app.request('/all-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'allOf composition failed', code: 'too_small' },
        { pointer: '/age', detail: 'allOf composition failed', code: 'too_small' },
      ],
    })
  })

  // One branch fails, one issue is rewritten.
  // 1つの分岐が失敗し、1件の issue が書き換えられる。
  it('rewrites the message of a single issue', async () => {
    const res = await app.request('/all-of-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: 25 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'allOf composition failed', code: 'too_small' }],
    })
  })
})

// A fixed text replaces the message of the refinement.
// 固定の文字列が、refine のメッセージを置き換える。
describe('x-not-message', () => {
  // The detail is the text of x-not-message.
  // detail は x-not-message の文字列になる。
  it('rejects a string with the configured message', async () => {
    const res = await app.request('/not-msg', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'hello' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/forbidden', detail: 'forbidden must not be a string', code: 'custom' }],
    })
  })
})

// A message extension may hold an arrow function, which receives the issue and returns the
// text.
// メッセージ用の拡張にはアロー関数も指定できる。関数は issue を受け取り、文字列を返す。
describe('messages written as an arrow function', () => {
  // The function reads the path of the issue, so each issue gets a message of its own.
  // 関数は issue のパスを読み取るため、issue ごとに異なるメッセージが生成される。
  it('x-allOf-message writes a message from the path of each issue', async () => {
    const res = await app.request('/all-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a', age: -1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'allOf failed at /name', code: 'too_small' },
        { pointer: '/age', detail: 'allOf failed at /age', code: 'too_small' },
      ],
    })
  })

  // The function reads typeof input.
  // 関数は、入力値の typeof を読み取る。
  it('x-oneOf-message writes a message from the type of the input', async () => {
    const res = await app.request('/one-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: true }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/value',
          detail: 'value type incompatible (got boolean)',
          code: 'invalid_union',
        },
      ],
    })
  })

  // typeof null is "object": the message says what the function computes, not what a reader
  // might expect.
  // typeof null は "object" である。メッセージに現れるのは関数の計算結果であり、
  // 読み手の期待どおりとは限らない。
  it('x-oneOf-message describes null as an object', async () => {
    const res = await app.request('/one-of-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ value: null }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/value',
          detail: 'value type incompatible (got object)',
          code: 'invalid_union',
        },
      ],
    })
  })

  // The function interpolates the JSON of the input.
  // 関数は、入力値の JSON をメッセージに埋め込む。
  it('x-not-message writes the input into the message', async () => {
    const res = await app.request('/not-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'leaked' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/forbidden',
          detail: 'forbidden cannot be string, got "leaked"',
          code: 'custom',
        },
      ],
    })
  })

  // The input is written as JSON, so a double quote in it is escaped.
  // 入力値は JSON として書き出されるため、値に含まれる二重引用符はエスケープされる。
  it('x-not-message escapes a quote in the input', async () => {
    const res = await app.request('/not-arrow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ forbidden: 'a"b' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/forbidden',
          detail: 'forbidden cannot be string, got "a\\"b"',
          code: 'custom',
        },
      ],
    })
  })
})

// What is checked before the schema.
// スキーマより前に検証される内容。
describe('request body', () => {
  // The body cannot be parsed, so validation never starts: the answer is the plain 400 of Hono,
  // not Problem Details.
  // ボディがパースできないため、検証は開始されない。応答は Problem Details ではなく、
  // Hono のプレーンな 400 になる。
  it('rejects malformed JSON', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: '{bad',
    })
    expect(res.status).toBe(400)
    expect(await res.text()).toBe('Malformed JSON in request body')
  })

  // The body has to be an object.
  // ボディはオブジェクトでなければならない。
  it('rejects a body that is an array', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([]),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/',
          detail: 'Invalid input: expected object, received array',
          code: 'invalid_type',
        },
      ],
    })
  })

  // null is valid JSON, and not an object.
  // null は有効な JSON だが、オブジェクトではない。
  it('rejects a body that is null', async () => {
    const res = await app.request('/one-of', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(null),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/',
          detail: 'Invalid input: expected object, received null',
          code: 'invalid_type',
        },
      ],
    })
  })

  // The spec declares POST only.
  // 仕様が宣言しているのは POST だけである。
  it('does not route GET', async () => {
    const res = await app.request('/one-of')
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})
