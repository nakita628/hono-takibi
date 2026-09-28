// The OpenAPI document the generated routes produce, read back from the running app. A
// parameter states its schema in its metadata; a body has nothing but the schema itself, so
// what reads a form field from text must not change what the document says the field is.
//
// 生成されたルートが出力する OpenAPI ドキュメントを、実行中のアプリから読み出して検証する。
// パラメータは、メタデータで自身のスキーマを明示する。一方、ボディにはスキーマそのもの
// しかない。そのため、フォームのフィールドを文字列から読み取る処理が、ドキュメント上の
// フィールドの記述を変えてはならない。
//
// Contents / 目次:
//   - document: the fields of a form body
import { describe, expect, it } from 'vite-plus/test'

import { formBodyApp } from './app'

describe('document: the fields of a form body', () => {
  // Every field keeps the type the spec declares: an integer is an integer, not the string
  // it is sent as, and a boolean is a boolean.
  // すべてのフィールドが、仕様で宣言された型を保つ。integer は、送信時の形である string
  // ではなく integer であり、boolean は boolean である。
  it('describes each urlencoded field by its declared type', () => {
    const document = formBodyApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.paths?.['/urlencoded']?.post?.requestBody).toStrictEqual({
      required: true,
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              age: { type: 'integer', minimum: 0 },
              ratio: { type: 'number' },
              big: { type: 'string', pattern: String.raw`^\d+$` },
              active: { type: 'boolean' },
              level: {
                anyOf: [
                  { type: 'number', enum: [1] },
                  { type: 'number', enum: [2] },
                ],
              },
              agreed: { type: 'boolean', enum: [true] },
              limit: { type: 'integer', default: 20 },
              count: { $ref: '#/components/schemas/Count' },
              flag: { $ref: '#/components/schemas/Flag' },
              tags: { type: 'array', items: { type: 'string' } },
              ids: { type: 'array', items: { type: 'integer' } },
            },
            required: [],
          },
        },
      },
    })
  })

  // The file stays a binary string and the fields beside it keep their types.
  // ファイルはバイナリの string のままであり、並ぶフィールドもそれぞれの型を保つ。
  it('describes each multipart field by its declared type', () => {
    const document = formBodyApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.paths?.['/multipart']?.post?.requestBody).toStrictEqual({
      required: true,
      content: {
        'multipart/form-data': {
          schema: {
            type: 'object',
            properties: {
              file: { type: 'string', format: 'binary' },
              age: { type: 'integer' },
              active: { type: 'boolean' },
              ids: { type: 'array', items: { type: 'integer' } },
            },
            required: ['file'],
          },
        },
      },
    })
  })

  // The component is written out in place for a form body, with the same properties the
  // component declares.
  // フォームボディでは、コンポーネントはその場に展開される。プロパティは、
  // コンポーネントの宣言と同じである。
  it('describes a component form body by its properties', () => {
    const document = formBodyApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.paths?.['/component']?.post?.requestBody).toStrictEqual({
      required: true,
      content: {
        'application/x-www-form-urlencoded': {
          schema: {
            type: 'object',
            properties: {
              name: { type: 'string' },
              price: { type: 'integer', minimum: 0 },
              stocked: { type: 'boolean' },
            },
            required: ['name', 'price'],
          },
        },
      },
    })
  })

  // A JSON body of the same component stays a reference to it.
  // 同じコンポーネントの JSON ボディは、コンポーネントへの参照のままである。
  it('keeps the $ref on a JSON body', () => {
    const document = formBodyApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.paths?.['/json']?.post?.requestBody).toStrictEqual({
      required: true,
      content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
    })
  })

  // Count and Flag are named by a field, and Item by the JSON body.
  // Count と Flag はフィールドから、Item は JSON ボディから参照されている。
  it('defines every component the bodies refer to', () => {
    const document = formBodyApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.components?.schemas).toStrictEqual({
      Count: { type: 'integer', minimum: 0 },
      Flag: { type: 'boolean' },
      Item: {
        type: 'object',
        properties: {
          name: { type: 'string' },
          price: { type: 'integer', minimum: 0 },
          stocked: { type: 'boolean' },
        },
        required: ['name', 'price'],
      },
    })
  })
})
