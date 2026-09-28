// The OpenAPI document the generated routes produce, read back from the running app. A
// header parameter that names a component schema by `$ref` has to leave that component
// defined in the document: a `$ref` to a component the document does not define is a
// document no client generator or viewer can resolve.
//
// 生成されたルートが出力する OpenAPI ドキュメントを、実行中のアプリから読み出して検証する。
// `$ref` でコンポーネントスキーマを参照するヘッダーは、そのコンポーネントをドキュメントに
// 定義として残さなければならない。ドキュメントが定義していないコンポーネントへの `$ref` は、
// クライアント生成ツールやビューアが解決できないドキュメントになる。
//
// Contents / 目次:
//   - document: components named by a parameter
import { describe, expect, it } from 'vite-plus/test'

import { headerParamsApp } from './app'

describe('document: components named by a parameter', () => {
  // Count is named by the parameter x-ref-int and by nothing else, so the parameter is what has
  // to bring it into the document.
  // Count を参照しているのはパラメータ x-ref-int だけである。
  // そのため、このパラメータが Count をドキュメントに載せる必要がある。
  it('defines the component a parameter refers to', () => {
    const document = headerParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.components?.schemas?.['Count']).toStrictEqual({
      type: 'integer',
      minimum: 0,
    })
  })

  // The parameter itself still refers to the component instead of repeating it.
  // パラメータ自体は、コンポーネントの内容を繰り返さず、参照のままである。
  it('keeps the $ref on the parameter', () => {
    const document = headerParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    const parameters = document.paths?.['/optional']?.get?.parameters ?? []
    expect(
      parameters.find((parameter) => 'name' in parameter && parameter.name === 'x-ref-int'),
    ).toStrictEqual({
      schema: { $ref: '#/components/schemas/Count' },
      required: false,
      name: 'x-ref-int',
      in: 'header',
    })
  })

  // Every `$ref` to a component schema anywhere in the document names one the document
  // defines.
  // ドキュメント内のコンポーネントスキーマへの `$ref` は、すべてドキュメントが定義している
  // コンポーネントを指している。
  it('leaves no $ref without a definition', () => {
    const document = headerParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    const referenced = [
      ...JSON.stringify(document).matchAll(/"\$ref":"#\/components\/schemas\/([^"]+)"/g),
    ].map((match) => match[1])
    const defined = Object.keys(document.components?.schemas ?? {})
    expect(
      referenced.filter((name) => name !== undefined && !defined.includes(name)),
    ).toStrictEqual([])
  })
})
