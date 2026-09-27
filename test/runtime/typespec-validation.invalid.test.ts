// Every validation keyword with its message extension (cases/typespec-validation,
// generated from specs/typespec-validation.yaml, which is compiled from TypeSpec), run
// against the host in hosts/typespec-validation-app.ts.
//
// A constraint keyword has a message extension of its own: `x-minLength-message` for
// `minLength`, `x-pattern-message` for `pattern`, and so on. `x-error-message` is the
// message of the type or format itself. So one property can carry several messages, and
// the one a client receives says which rule was broken.
//
//   POST /users     every string, number, boolean, array and null pattern
//   POST /products  const of each primitive type
//   PUT  /settings  minProperties / maxProperties
//   POST /orders    a nested object behind a $ref
//
// The host answers a validation failure with 422 and RFC 9457 Problem Details, whose
// `errors` list holds, for every issue, the `pointer` to the value and the `detail`, the
// message of the issue.
//
// すべての検証キーワードと、そのメッセージ拡張の検証(cases/typespec-validation。
// TypeSpec からコンパイルした specs/typespec-validation.yaml から生成)。
// hosts/typespec-validation-app.ts のホストに対して実行する。
//
// 制約キーワードは、それぞれ専用のメッセージ拡張を持つ。`minLength` には
// `x-minLength-message`、`pattern` には `x-pattern-message` という具合である。
// `x-error-message` は、型やフォーマットそのものに対するメッセージである。そのため、
// 1つのプロパティが複数のメッセージを持つことができ、クライアントが受け取るメッセージから、
// どのルールに違反したかが分かる。
//
//   POST /users     string・number・boolean・array・null の全パターン
//   POST /products  各プリミティブ型の const
//   PUT  /settings  minProperties / maxProperties
//   POST /orders    $ref の先にあるネストしたオブジェクト
//
// ホストは、検証の失敗に 422 と RFC 9457 の Problem Details で応答する。その `errors` には、
// issue ごとに、値への `pointer` と、issue のメッセージである `detail` が含まれる。
//
// This file holds the requests that are rejected.
// このファイルには、拒否されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/typespec-validation-app'

// name, email, role, status, tags, score and level are required; every other property is
// optional. Each test below sends these seven and adds or changes the property it is about.
// name・email・role・status・tags・score・level は必須であり、
// それ以外のプロパティはすべて任意である。以下の各テストでは、この7つを送信したうえで、
// 検証対象のプロパティを追加・変更している。
describe('POST /users: the required properties', () => {
  // Seven required properties, seven issues. level answers with the message its arrow function
  // writes for a missing value.
  // 必須プロパティが7つあり、issue も7件報告される。level は、
  // アロー関数が欠落時用に生成するメッセージを返す。
  it('reports every required property of an empty object', async () => {
    const res = await app.request('/users', {
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
        { pointer: '/name', detail: 'Invalid input: expected string, received undefined' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/role', detail: 'Role must be admin, user, or guest' },
        { pointer: '/status', detail: 'Status must be active' },
        { pointer: '/score', detail: 'Score must be a number' },
        { pointer: '/level', detail: 'Level is required' },
        { pointer: '/tags', detail: 'Invalid input: expected array, received undefined' },
      ],
    })
  })
})

// x-minLength-message and x-maxLength-message.
// x-minLength-message と x-maxLength-message。
describe('POST /users: name, minLength 2 and maxLength 50', () => {
  // One below minLength, answered with x-minLength-message.
  // minLength を 1 下回る。x-minLength-message で応答する。
  it('rejects a name of 1 character', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be at least 2 characters' }],
    })
  })

  // The empty string is present, and too short.
  // 空文字列は値として存在するが、短すぎる。
  it('rejects an empty name', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: '',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be at least 2 characters' }],
    })
  })

  // One above maxLength, answered with x-maxLength-message.
  // maxLength を 1 超える。x-maxLength-message で応答する。
  it('rejects a name of 51 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a'.repeat(51),
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Name must be at most 50 characters' }],
    })
  })

  // name declares no x-error-message, so the type failure carries the message of Zod.
  // name は x-error-message を宣言していないため、型の失敗には Zod のメッセージが付く。
  it('rejects a name that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 1,
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/name', detail: 'Invalid input: expected string, received number' }],
    })
  })
})

// minLength equals maxLength, which is emitted as a fixed length with x-length-message.
// minLength と maxLength が等しい場合、x-length-message 付きの固定長として生成される。
describe('POST /users: code, exactly 6 characters', () => {
  // One below the length.
  // 固定長を 1 下回る。
  it('rejects a code of 5 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        code: 'ABC12',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/code', detail: 'Code must be exactly 6 characters' }],
    })
  })

  // One above the length. The message is the same in both directions.
  // 固定長を 1 超える。メッセージは、どちらの方向でも同じである。
  it('rejects a code of 7 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        code: 'ABC1234',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/code', detail: 'Code must be exactly 6 characters' }],
    })
  })

  // An optional property that is sent is validated.
  // 任意プロパティでも、送信された場合は検証される。
  it('rejects an empty code', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        code: '',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/code', detail: 'Code must be exactly 6 characters' }],
    })
  })
})

// email, uuid and uri.
// email・uuid・uri。
describe('POST /users: formats with x-error-message', () => {
  // x-error-message replaces the message of the format.
  // x-error-message が、フォーマットのメッセージを置き換える。
  it('rejects an invalid email', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'bad',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // The same message answers a value of the wrong type.
  // 型が誤っている値にも、同じメッセージで応答する。
  it('rejects an email that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 1,
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/email', detail: 'Invalid email address' }],
    })
  })

  // Not a UUID.
  // UUID ではない。
  it('rejects an invalid UUID', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        requestId: 'not-a-uuid',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/requestId', detail: 'Invalid UUID format' }],
    })
  })

  // No scheme.
  // スキームがない。
  it('rejects an invalid URL', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        website: 'not a url',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/website', detail: 'Invalid URL' }],
    })
  })
})

// x-pattern-message. The pattern asks for an upper-case letter, a digit and at least 8
// characters.
// x-pattern-message。パターンは、大文字・数字・8文字以上を要求する。
describe('POST /users: password, a pattern', () => {
  // Long enough, and nothing else.
  // 長さは十分だが、それ以外の条件を満たしていない。
  it('rejects a password with no upper-case letter and no digit', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        password: 'weakpassword',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/password', detail: 'Password must have uppercase + number, min 8 chars' },
      ],
    })
  })

  // An upper-case letter alone is not enough.
  // 大文字だけでは不十分である。
  it('rejects a password with no digit', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        password: 'Hunterpw',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/password', detail: 'Password must have uppercase + number, min 8 chars' },
      ],
    })
  })

  // An upper-case letter and a digit, and one character short.
  // 大文字と数字を含むが、1文字足りない。
  it('rejects a password of 7 characters', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        password: 'Hunter2',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/password', detail: 'Password must have uppercase + number, min 8 chars' },
      ],
    })
  })
})

// A property with no constraint at all still has a type, and x-error-message is the message
// of that type.
// 制約のないプロパティにも型はあり、x-error-message はその型に対するメッセージである。
describe('POST /users: base types with x-error-message', () => {
  // x-error-message on a plain string.
  // 素の string に対する x-error-message。
  it('rejects a nickname that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        nickname: 123,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/nickname', detail: 'Nickname must be a string' }],
    })
  })

  // x-error-message holds an arrow function with no argument; its return value is the message.
  // x-error-message に、引数なしのアロー関数が指定されている。その戻り値がメッセージになる。
  it('rejects a dynamicField that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        dynamicField: 123,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/dynamicField', detail: 'dynamic validation error' }],
    })
  })

  // x-error-message on a plain number. A body is typed JSON: the string "95.5" is not coerced.
  // 素の number に対する x-error-message。ボディは型付きの JSON であり、
  // 文字列の "95.5" は coerce されない。
  it('rejects a score that is a string', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: '95.5',
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/score', detail: 'Score must be a number' }],
    })
  })

  // x-error-message on a boolean. The string "true" is not a boolean.
  // boolean に対する x-error-message。文字列の "true" は boolean ではない。
  it('rejects an agreed that is a string', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        agreed: 'true',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/agreed', detail: 'Must be a boolean' }],
    })
  })

  // 1 is not a boolean.
  // 1 は boolean ではない。
  it('rejects an agreed that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        agreed: 1,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/agreed', detail: 'Must be a boolean' }],
    })
  })
})

// An enum of three values, and an enum of one, which is emitted as a literal.
// 3つの値を持つ enum と、リテラルとして生成される、値が1つだけの enum。
describe('POST /users: role and status, enums', () => {
  // x-error-message on an enum.
  // enum に対する x-error-message。
  it('rejects a role outside the enum', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'superadmin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/role', detail: 'Role must be admin, user, or guest' }],
    })
  })

  // An enum is case-sensitive.
  // enum は大文字小文字を区別する。
  it('rejects a role in another case', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'Admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/role', detail: 'Role must be admin, user, or guest' }],
    })
  })

  // x-error-message on a single-value enum.
  // 値が1つだけの enum に対する x-error-message。
  it('rejects a status that is not the one value', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'inactive',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/status', detail: 'Status must be active' }],
    })
  })
})

// x-minimum-message and x-maximum-message.
// x-minimum-message と x-maximum-message。
describe('POST /users: age, minimum 0 and maximum 150', () => {
  // One below the minimum.
  // 最小値を 1 下回る。
  it('rejects an age of -1', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: -1,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Age must be >= 0' }],
    })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('rejects an age of 151', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: 151,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Age must be <= 150' }],
    })
  })

  // In range, and not an integer. age declares no x-error-message, so the message is the one of
  // Zod.
  // 範囲内だが整数ではない。age は x-error-message を宣言していないため、
  // Zod のメッセージになる。
  it('rejects an age that is a fraction', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: 20.5,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/age', detail: 'Invalid input: expected int, received number' }],
    })
  })
})

// x-error-message is an arrow function that reads the issue; x-minimum-message and
// x-maximum-message answer the range.
// x-error-message は、issue を読み取るアロー関数である。範囲については、
// x-minimum-message と x-maximum-message が応答する。
describe('POST /users: level, three messages on one property', () => {
  // The arrow function answers a value of the wrong type.
  // 型が誤っている値に対しては、アロー関数が応答する。
  it('rejects a level that is a string', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 'high',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/level', detail: 'Level must be an integer' }],
    })
  })

  // Not an integer.
  // 整数ではない。
  it('rejects a level that is a fraction', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 1.5,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/level', detail: 'Level must be an integer' }],
    })
  })

  // The arrow function tells a missing value from a wrong one, and answers "Level is required".
  // アロー関数は、値の欠落と型の誤りを区別し、"Level is required" と応答する。
  it('rejects a body with no level', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/level', detail: 'Level is required' }],
    })
  })

  // One below the minimum.
  // 最小値を 1 下回る。
  it('rejects a level of 0', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 0,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/level', detail: 'Level must be >= 1' }],
    })
  })

  // One above the maximum.
  // 最大値を 1 超える。
  it('rejects a level of 101', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 101,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/level', detail: 'Level must be <= 100' }],
    })
  })
})

// x-error-message on a number with multipleOf.
// multipleOf を持つ number に対する x-error-message。
describe('POST /users: rating, multipleOf 0.5', () => {
  // 4.3 is between two multiples.
  // 4.3 は、2つの倍数の間の値である。
  it('rejects a value that is not a multiple', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        rating: 4.3,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/rating', detail: 'Rating must be a multiple of 0.5' }],
    })
  })

  // A value of the wrong type is answered with the same message.
  // 型が誤っている値にも、同じメッセージで応答する。
  it('rejects a rating that is a string', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        rating: '4.5',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/rating', detail: 'Rating must be a multiple of 0.5' }],
    })
  })
})

// x-minItems-message and x-maxItems-message.
// x-minItems-message と x-maxItems-message。
describe('POST /users: tags, minItems 1 and maxItems 10', () => {
  // One below minItems.
  // minItems を 1 下回る。
  it('rejects an empty list of tags', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: [],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'At least 1 tag required' }],
    })
  })

  // One above maxItems.
  // maxItems を 1 超える。
  it('rejects eleven tags', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'At most 10 tags allowed' }],
    })
  })

  // The pointer ends in the index of the element.
  // pointer は、要素のインデックスで終わる。
  it('rejects a tag that is a number', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['ok', 1],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags/1', detail: 'Invalid input: expected string, received number' }],
    })
  })

  // A single value is not wrapped into an array in a body.
  // ボディ内の単一値は、配列に包まれない。
  it('rejects tags that are not an array', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: 'dev',
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/tags', detail: 'Invalid input: expected array, received string' }],
    })
  })
})

// minItems equals maxItems, which is emitted as a fixed length with x-length-message.
// minItems と maxItems が等しい場合、x-length-message 付きの固定長として生成される。
describe('POST /users: coordinates, exactly 2 items', () => {
  // One below the length.
  // 固定長を 1 下回る。
  it('rejects one coordinate', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        coordinates: [35.6762],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/coordinates', detail: 'Must have exactly 2 coordinates' }],
    })
  })

  // One above the length.
  // 固定長を 1 超える。
  it('rejects three coordinates', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        coordinates: [1, 2, 3],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/coordinates', detail: 'Must have exactly 2 coordinates' }],
    })
  })

  // An empty array.
  // 空配列。
  it('rejects no coordinates', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        coordinates: [],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/coordinates', detail: 'Must have exactly 2 coordinates' }],
    })
  })
})

// x-error-message on an array and on null.
// array と null に対する x-error-message。
describe('POST /users: favoriteNumbers and deletedAt', () => {
  // x-error-message on the array itself.
  // 配列そのものに対する x-error-message。
  it('rejects a value that is not an array', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        favoriteNumbers: 'not-array',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/favoriteNumbers', detail: 'Must be an array' }],
    })
  })

  // x-error-message on null.
  // null に対する x-error-message。
  it('rejects a string for deletedAt', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        deletedAt: '2024-01-01',
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/deletedAt', detail: 'Must be null' }],
    })
  })

  // false is not null.
  // false は null ではない。
  it('rejects false for deletedAt', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        deletedAt: false,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/deletedAt', detail: 'Must be null' }],
    })
  })
})

// Every issue is reported, in the order the schema declares its properties.
// すべての issue が、スキーマにおけるプロパティの宣言順で報告される。
describe('POST /users: several failures at once', () => {
  // All seven required properties are invalid.
  // 必須プロパティが7つとも不正である。
  it('reports every property that fails', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a',
        email: 'bad',
        role: 'x',
        status: 'x',
        tags: [],
        score: 'x',
        level: 0,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Name must be at least 2 characters' },
        { pointer: '/email', detail: 'Invalid email address' },
        { pointer: '/role', detail: 'Role must be admin, user, or guest' },
        { pointer: '/status', detail: 'Status must be active' },
        { pointer: '/score', detail: 'Score must be a number' },
        { pointer: '/level', detail: 'Level must be >= 1' },
        { pointer: '/tags', detail: 'At least 1 tag required' },
      ],
    })
  })

  // name is required and age optional; both fail.
  // name は必須、age は任意であり、両方が失敗する。
  it('reports a required and an optional property together', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: 'a',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
        age: -1,
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/name', detail: 'Name must be at least 2 characters' },
        { pointer: '/age', detail: 'Age must be >= 0' },
      ],
    })
  })
})

// A const of each primitive type, with x-error-message.
// 各プリミティブ型の const と、x-error-message。
describe('POST /products: const', () => {
  // A string const.
  // string の const。
  it('rejects another string for type', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'service', priority: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/type', detail: 'Type must be "product"' }],
    })
  })

  // A number const.
  // number の const。
  it('rejects another number for priority', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 2 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/priority', detail: 'Priority must be 1' }],
    })
  })

  // The string "1" is not the number 1.
  // 文字列の "1" は、number の 1 ではない。
  it('rejects the constant of priority as a string', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: '1' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/priority', detail: 'Priority must be 1' }],
    })
  })

  // A boolean const.
  // boolean の const。
  it('rejects false for enabled', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type: 'product', priority: 1, enabled: false }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/enabled', detail: 'Must be true' }],
    })
  })

  // type is required.
  // type は必須である。
  it('rejects a body with no type', async () => {
    const res = await app.request('/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ priority: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/type', detail: 'Type must be "product"' }],
    })
  })
})

// x-minProperties-message and x-maxProperties-message. The pointer of the issue is "/", the
// object itself.
// x-minProperties-message と x-maxProperties-message。issue の pointer は、
// オブジェクト自身を指す "/" になる。
describe('PUT /settings: minProperties 1 and maxProperties 20', () => {
  // One below minProperties.
  // minProperties を 1 下回る。
  it('rejects an empty object', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({}),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/', detail: 'At least 1 setting required' }],
    })
  })

  // A declared property is still typed.
  // 宣言されたプロパティは、引き続き型を持つ。
  it('rejects a theme that is a number', async () => {
    const res = await app.request('/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/theme', detail: 'Invalid input: expected string, received number' }],
    })
  })

  // The spec declares PUT only.
  // 仕様が宣言しているのは PUT だけである。
  it('does not route POST', async () => {
    const res = await app.request('/settings', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ theme: 'dark' }),
    })
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})

// productName, quantity and address are required.
// productName・quantity・address は必須である。
describe('POST /orders: the top-level properties', () => {
  // One below minLength: 1.
  // minLength: 1 を 1 下回る。
  it('rejects an empty productName', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: '',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/productName', detail: 'Product name is required' }],
    })
  })

  // One above maxLength.
  // maxLength を 1 超える。
  it('rejects a productName of 101 characters', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'a'.repeat(101),
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/productName', detail: 'Product name must be at most 100 characters' }],
    })
  })

  // One below minimum: 1.
  // minimum: 1 を 1 下回る。
  it('rejects a quantity of 0', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 0,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'Quantity must be >= 1' }],
    })
  })

  // Below the minimum.
  // 最小値を下回る。
  it('rejects a negative quantity', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: -1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'Quantity must be >= 1' }],
    })
  })

  // Not an integer.
  // 整数ではない。
  it('rejects a quantity that is a fraction', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1.5,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/quantity', detail: 'Invalid input: expected int, received number' }],
    })
  })

  // address is required.
  // address は必須である。
  it('rejects a body with no address', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/address', detail: 'Invalid input: expected object, received undefined' },
      ],
    })
  })
})

// What happens when the nested object is another kind of value altogether.
// ネストしたオブジェクトが、まったく別の種類の値である場合の挙動。
describe('POST /orders: a value that is not an address', () => {
  // A string is not an object.
  // string はオブジェクトではない。
  it('rejects a string', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1, address: 'Tokyo' }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address', detail: 'Invalid input: expected object, received string' }],
    })
  })

  // A number is not an object.
  // number はオブジェクトではない。
  it('rejects a number', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1, address: 12345 }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address', detail: 'Invalid input: expected object, received number' }],
    })
  })

  // An array is not an object.
  // 配列はオブジェクトではない。
  it('rejects an array', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: ['1-2-3', 'Tokyo', '100-0001'],
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address', detail: 'Invalid input: expected object, received array' }],
    })
  })

  // null is not an object.
  // null はオブジェクトではない。
  it('rejects null', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1, address: null }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address', detail: 'Invalid input: expected object, received null' }],
    })
  })

  // All three properties of the address are missing, and each is reported under its own
  // pointer.
  // address の3つのプロパティがすべて欠けており、それぞれが自身の pointer で報告される。
  it('rejects an empty object', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1, address: {} }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        {
          pointer: '/address/street',
          detail: 'Invalid input: expected string, received undefined',
        },
        { pointer: '/address/city', detail: 'Invalid input: expected string, received undefined' },
        { pointer: '/address/zip', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })

  // city and zip are missing.
  // city と zip が欠けている。
  it('rejects an address with a street alone', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productName: 'Widget', quantity: 1, address: { street: '1-2-3' } }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/address/city', detail: 'Invalid input: expected string, received undefined' },
        { pointer: '/address/zip', detail: 'Invalid input: expected string, received undefined' },
      ],
    })
  })

  // Three numbers where three strings are expected.
  // string が期待される3箇所に、number が指定されている。
  it('rejects an address whose properties have the wrong type', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: 123, city: 456, zip: 789 },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/address/street', detail: 'Invalid input: expected string, received number' },
        { pointer: '/address/city', detail: 'Invalid input: expected string, received number' },
        { pointer: '/address/zip', detail: 'Invalid input: expected string, received number' },
      ],
    })
  })
})

// The pointer of an issue holds the whole path, /address/<property>.
// issue の pointer は、/address/<プロパティ> という完全なパスになる。
describe('POST /orders: the properties of the address', () => {
  // x-minLength-message of the nested schema.
  // ネストしたスキーマの x-minLength-message。
  it('rejects an empty street', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '', city: 'Tokyo', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address/street', detail: 'Street is required' }],
    })
  })

  // x-minLength-message of the nested schema.
  // ネストしたスキーマの x-minLength-message。
  it('rejects an empty city', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: '', zip: '100-0001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address/city', detail: 'City is required' }],
    })
  })

  // x-pattern-message. The pattern is three digits, a hyphen and four digits.
  // x-pattern-message。パターンは、数字3桁・ハイフン・数字4桁である。
  it('rejects a zip with no hyphen', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '1000001' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' }],
    })
  })

  // A full-width digit is not matched by [0-9].
  // 全角数字は [0-9] に一致しない。
  it('rejects a zip with full-width digits', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '１００-０００１' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' }],
    })
  })

  // The anchors must hold.
  // アンカーが効いていること。
  it('rejects a zip with a digit too many', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '1-2-3', city: 'Tokyo', zip: '100-00011' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [{ pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' }],
    })
  })

  // Three issues, in the order the schema declares the properties.
  // 3件の issue が、スキーマにおけるプロパティの宣言順で報告される。
  it('reports every property of the address that fails', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '', city: '', zip: 'bad' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/address/street', detail: 'Street is required' },
        { pointer: '/address/city', detail: 'City is required' },
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ],
    })
  })

  // The unknown property does not hide the failures of the declared ones.
  // 未知のプロパティがあっても、宣言されたプロパティの失敗は隠れない。
  it('validates the declared properties of an address with unknown ones', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: 'Widget',
        quantity: 1,
        address: { street: '', city: '', zip: 'bad', country: 'JP' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/address/street', detail: 'Street is required' },
        { pointer: '/address/city', detail: 'City is required' },
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
      ],
    })
  })

  // Five issues, the top-level ones first.
  // 5件の issue が、トップレベルのものを先頭にして報告される。
  it('reports the top level and the address together', async () => {
    const res = await app.request('/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        productName: '',
        quantity: 0,
        address: { street: '', city: '', zip: 'bad' },
      }),
    })
    expect(res.status).toBe(422)
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Unprocessable Content',
      status: 422,
      detail: 'Request validation failed',
      errors: [
        { pointer: '/productName', detail: 'Product name is required' },
        { pointer: '/quantity', detail: 'Quantity must be >= 1' },
        { pointer: '/address/street', detail: 'Street is required' },
        { pointer: '/address/city', detail: 'City is required' },
        { pointer: '/address/zip', detail: 'Zip code must be format: 000-0000' },
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
    const res = await app.request('/users', {
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
    const res = await app.request('/users', {
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
      errors: [{ pointer: '/', detail: 'Invalid input: expected object, received array' }],
    })
  })

  // The spec declares application/json only.
  // 仕様が宣言しているのは application/json だけである。
  it('rejects a content type that is not JSON', async () => {
    const res = await app.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({
        name: 'taro',
        email: 'taro@example.com',
        role: 'admin',
        status: 'active',
        tags: ['dev'],
        score: 95.5,
        level: 50,
      }),
    })
    expect(res.status).toBe(415)
    expect(await res.text()).toBe('Unsupported Media Type')
  })

  // The spec declares POST only.
  // 仕様が宣言しているのは POST だけである。
  it('does not route GET', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(404)
    expect(await res.text()).toBe('404 Not Found')
  })
})
