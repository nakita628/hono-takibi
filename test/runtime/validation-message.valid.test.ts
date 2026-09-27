// Three ways an application can answer a validation failure of a generated route
// (cases/validation-message, generated from specs/validation-message.yaml with no custom
// message), one host each in hosts/validation-message-app-*.ts:
//
//   pattern 1  no hook            400 with the raw ZodError
//   pattern 2  `defaultHook`      422 with RFC 9457 Problem Details, for every route
//   pattern 3  per-route hook     422 with RFC 9457 Problem Details, for that route
//
// The three hosts register the same generated route, so whatever differs between them is
// the hook and nothing else.
//
// 生成されたルートの検証失敗に対して、アプリケーションが応答する3つの方法を検証する
// (cases/validation-message。specs/validation-message.yaml から、カスタムメッセージなしで
// 生成)。方法ごとに、hosts/validation-message-app-*.ts のホストを1つ用意している。
//
//   パターン 1  フックなし          400 と生の ZodError
//   パターン 2  `defaultHook`       422 と RFC 9457 の Problem Details(全ルート共通)
//   パターン 3  ルート単位のフック   422 と RFC 9457 の Problem Details(そのルートのみ)
//
// 3つのホストは同じ生成ルートを登録しているため、ホスト間の違いはフックだけである。
//
// This file holds the requests that are accepted.
// このファイルには、受理されるリクエストをまとめている。
import { describe, expect, it } from 'vite-plus/test'

import appDefault from '../hosts/validation-message-app-default'
import appDefaultHook from '../hosts/validation-message-app-default-hook'
import appRouteHook from '../hosts/validation-message-app-route-hook'

// The app has no hook. @hono/zod-openapi answers a validation failure itself. A valid request
// is not affected by the hook.
// アプリにフックはない。検証の失敗には @hono/zod-openapi 自身が応答する。有効なリクエストは、
// フックの影響を受けない。
describe('pattern 1: no hook', () => {
  // Every property is valid. The handler answers 201 with what it validated.
  // すべてのプロパティが有効である。ハンドラは、検証済みの値とともに 201 を返す。
  it('accepts a valid body', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // Exactly minLength: 3 and minimum: 0. Zero is a value, not an absence.
  // ちょうど minLength: 3 と minimum: 0 の値。0 は値であって欠落ではない。
  it('accepts a name of 3 characters and an age of 0', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'abc', email: 'taro@example.com', age: 0 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'abc',
      email: 'taro@example.com',
      age: 0,
    })
  })

  // Exactly maxLength: 20 and maximum: 150.
  // ちょうど maxLength: 20 と maximum: 150 の値。
  it('accepts a name of 20 characters and an age of 150', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(20), email: 'taro@example.com', age: 150 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'a'.repeat(20),
      email: 'taro@example.com',
      age: 150,
    })
  })

  // Four characters, though twelve bytes in UTF-8: length counts characters.
  // 4文字(UTF-8 では 12 バイト)。長さは文字数で数える。
  it('accepts a multi-byte name', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '山田太郎', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: '山田太郎',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // An unknown property is stripped by the schema rather than rejected.
  // 未知のプロパティは、拒否されるのではなく、スキーマによって取り除かれる。
  it('drops a property the spec does not declare', async () => {
    const res = await appDefault.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20, role: 'admin' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })
})

// The app has a defaultHook, which answers the validation failures of every route with RFC
// 9457 Problem Details. A valid request is not affected by the hook.
// アプリに defaultHook があり、すべてのルートの検証失敗に RFC 9457 の Problem Details で
// 応答する。有効なリクエストは、フックの影響を受けない。
describe('pattern 2: defaultHook', () => {
  // Every property is valid. The handler answers 201 with what it validated.
  // すべてのプロパティが有効である。ハンドラは、検証済みの値とともに 201 を返す。
  it('accepts a valid body', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // Exactly minLength: 3 and minimum: 0. Zero is a value, not an absence.
  // ちょうど minLength: 3 と minimum: 0 の値。0 は値であって欠落ではない。
  it('accepts a name of 3 characters and an age of 0', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'abc', email: 'taro@example.com', age: 0 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'abc',
      email: 'taro@example.com',
      age: 0,
    })
  })

  // Exactly maxLength: 20 and maximum: 150.
  // ちょうど maxLength: 20 と maximum: 150 の値。
  it('accepts a name of 20 characters and an age of 150', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(20), email: 'taro@example.com', age: 150 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'a'.repeat(20),
      email: 'taro@example.com',
      age: 150,
    })
  })

  // Four characters, though twelve bytes in UTF-8: length counts characters.
  // 4文字(UTF-8 では 12 バイト)。長さは文字数で数える。
  it('accepts a multi-byte name', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '山田太郎', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: '山田太郎',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // An unknown property is stripped by the schema rather than rejected.
  // 未知のプロパティは、拒否されるのではなく、スキーマによって取り除かれる。
  it('drops a property the spec does not declare', async () => {
    const res = await appDefaultHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20, role: 'admin' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })
})

// The route has a hook of its own, which answers its validation failures with RFC 9457
// Problem Details. A valid request is not affected by the hook.
// ルートが専用のフックを持ち、そのルートの検証失敗に RFC 9457 の Problem Details で応答する。
// 有効なリクエストは、フックの影響を受けない。
describe('pattern 3: per-route hook', () => {
  // Every property is valid. The handler answers 201 with what it validated.
  // すべてのプロパティが有効である。ハンドラは、検証済みの値とともに 201 を返す。
  it('accepts a valid body', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // Exactly minLength: 3 and minimum: 0. Zero is a value, not an absence.
  // ちょうど minLength: 3 と minimum: 0 の値。0 は値であって欠落ではない。
  it('accepts a name of 3 characters and an age of 0', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'abc', email: 'taro@example.com', age: 0 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'abc',
      email: 'taro@example.com',
      age: 0,
    })
  })

  // Exactly maxLength: 20 and maximum: 150.
  // ちょうど maxLength: 20 と maximum: 150 の値。
  it('accepts a name of 20 characters and an age of 150', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'a'.repeat(20), email: 'taro@example.com', age: 150 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'a'.repeat(20),
      email: 'taro@example.com',
      age: 150,
    })
  })

  // Four characters, though twelve bytes in UTF-8: length counts characters.
  // 4文字(UTF-8 では 12 バイト)。長さは文字数で数える。
  it('accepts a multi-byte name', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '山田太郎', email: 'taro@example.com', age: 20 }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: '山田太郎',
      email: 'taro@example.com',
      age: 20,
    })
  })

  // An unknown property is stripped by the schema rather than rejected.
  // 未知のプロパティは、拒否されるのではなく、スキーマによって取り除かれる。
  it('drops a property the spec does not declare', async () => {
    const res = await appRouteHook.request('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'taro', email: 'taro@example.com', age: 20, role: 'admin' }),
    })
    expect(res.status).toBe(201)
    expect(await res.json()).toStrictEqual({
      id: 1,
      name: 'taro',
      email: 'taro@example.com',
      age: 20,
    })
  })
})
