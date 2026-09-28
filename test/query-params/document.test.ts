// The OpenAPI document the generated routes produce, read back from the running app. A
// query parameter that names a component schema by `$ref` has to leave that component
// defined in the document: a `$ref` to a component the document does not define is a
// document no client generator or viewer can resolve.
//
// 生成されたルートが出力する OpenAPI ドキュメントを、実行中のアプリから読み出して検証する。
// `$ref` でコンポーネントスキーマを参照するクエリパラメータは、そのコンポーネントをドキュメントに
// 定義として残さなければならない。ドキュメントが定義していないコンポーネントへの `$ref` は、
// クライアント生成ツールやビューアが解決できないドキュメントになる。
//
// Contents / 目次:
//   - document: components named by a parameter
import { describe, expect, it } from 'vite-plus/test'

import { queryParamsApp } from './app'

describe('document: components named by a parameter', () => {
  // Count is named by the parameter ref_int and by nothing else, so the parameter is what has
  // to bring it into the document.
  // Count を参照しているのはパラメータ ref_int だけである。
  // そのため、このパラメータが Count をドキュメントに載せる必要がある。
  it('defines the component a parameter refers to', () => {
    const document = queryParamsApp.getOpenAPI31Document({
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
    const document = queryParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    const parameters = document.paths?.['/refs']?.get?.parameters ?? []
    expect(
      parameters.find((parameter) => 'name' in parameter && parameter.name === 'ref_int'),
    ).toStrictEqual({
      schema: { $ref: '#/components/schemas/Count' },
      required: false,
      name: 'ref_int',
      in: 'query',
    })
  })

  // Every `$ref` to a component schema anywhere in the document names one the document
  // defines.
  // ドキュメント内のコンポーネントスキーマへの `$ref` は、すべてドキュメントが定義している
  // コンポーネントを指している。
  it('leaves no $ref without a definition', () => {
    const document = queryParamsApp.getOpenAPI31Document({
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

  // Flag is a boolean. It is read by a converter and not by z.stringbool(), which the
  // document would describe as a string.
  // Flag は boolean である。z.stringbool() ではなく変換関数で読み取られる。
  // z.stringbool() を使うと、ドキュメントには string として記載されてしまう。
  it('defines a boolean component as a boolean', () => {
    const document = queryParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    expect(document.components?.schemas?.['Flag']).toStrictEqual({ type: 'boolean' })
  })

  // Counts is an array of integers. The generated schema writes the array out to read its
  // elements from text, so the parameter documents the array and not a reference to Counts.
  // Counts は integer の配列である。生成されるスキーマは、要素を文字列から読み取るために
  // 配列を展開して出力する。そのためパラメータは、Counts への参照ではなく配列そのものを
  // ドキュメントに記載する。
  it('documents an array component as the array it emits', () => {
    const document = queryParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    const parameters = document.paths?.['/refs']?.get?.parameters ?? []
    expect(
      parameters.find((parameter) => 'name' in parameter && parameter.name === 'ref_arr'),
    ).toStrictEqual({
      schema: { type: 'array', items: { type: 'integer' } },
      required: false,
      name: 'ref_arr',
      in: 'query',
    })
  })

  // The array is inline and its elements refer to Count: the reference stays on the items.
  // 配列はインライン宣言であり、要素が Count を参照している。参照は items に残る。
  it('keeps the $ref on the items of an inline array', () => {
    const document = queryParamsApp.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'test', version: '0.0.0' },
    })
    const parameters = document.paths?.['/refs']?.get?.parameters ?? []
    expect(
      parameters.find((parameter) => 'name' in parameter && parameter.name === 'arr_ref'),
    ).toStrictEqual({
      schema: { type: 'array', items: { $ref: '#/components/schemas/Count' } },
      required: false,
      name: 'arr_ref',
      in: 'query',
    })
  })
})
