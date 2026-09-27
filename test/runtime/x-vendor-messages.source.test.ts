// What the generator wrote for the message extensions (cases/x-vendor-messages, generated
// from specs/x-vendor-messages.yaml), read from the generated source and from the OpenAPI
// document the routes produce.
//
// The requests are in x-vendor-messages.valid.test.ts and x-vendor-messages.invalid.test.ts.
// This file holds what no request can show: the shape of the emitted code, a message that
// cannot be reached at run time, and metadata that only exists in the document.
//
// メッセージ拡張に対して生成器が出力した内容を検証する(cases/x-vendor-messages。
// specs/x-vendor-messages.yaml から生成)。生成されたソースと、ルートから生成される
// OpenAPI ドキュメントを読み取って確認する。
//
// リクエストによる検証は、x-vendor-messages.valid.test.ts と
// x-vendor-messages.invalid.test.ts にある。このファイルには、リクエストでは確認できない
// 内容をまとめている。出力されたコードの形、実行時には到達できないメッセージ、
// ドキュメント上にのみ存在するメタデータである。
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

import { describe, expect, it } from 'vite-plus/test'

import app from '../hosts/x-vendor-messages-app'

// The generated file, as text.
// 生成されたファイルの内容(テキスト)。
const generatedSrc = readFileSync(
  fileURLToPath(new URL('../__generated__/x-vendor-messages/generated.ts', import.meta.url)),
  'utf8',
)

// A message that holds an arrow function is recognised by its shape, `(...) =>`, and
// emitted as code rather than as a string, so that it can read the issue at run time.
// アロー関数を含むメッセージは、`(...) =>` という形によって認識される。文字列としてではなく
// コードとして出力されるため、実行時に issue を読み取ることができる。
describe('messages written as an arrow function', () => {
  // An arrow function with no argument.
  // 引数を持たないアロー関数。
  it('emits an arrow function with no argument as code', () => {
    expect(generatedSrc).toContain("z.string({ error: () => 'nickname is invalid' })")
  })

  // An arrow function that reads the issue, with a conditional expression in its body.
  // issue を読み取るアロー関数。本体に条件式を含む。
  it('emits an arrow function that reads the issue as code', () => {
    expect(generatedSrc).toContain(
      "iss.input === undefined ? 'quota is required' : 'quota must be an integer'",
    )
  })

  // The spec writes this message with a template literal. It is emitted as written, not
  // rewritten into string concatenation.
  // 仕様では、このメッセージをテンプレートリテラルで記述している。文字列連結に書き換えられる
  // ことなく、記述されたとおりに出力される。
  it('emits a template literal as it is written', () => {
    expect(generatedSrc).toContain('error: (iss) => `quota must be >= 0 (received: ${iss.input})`')
  })
})

// An intersection has no issue of its own to carry a message. So `x-allOf-message` is
// emitted as a wrapper: the intersection is parsed inside a `.check()`, every issue it
// reports is added again with the configured message, and `.pipe(Schema)` hands the value
// on with its type.
// 交差型には、メッセージを持たせるための固有の issue がない。そのため `x-allOf-message` は
// ラッパーとして出力される。`.check()` の中で交差型をパースし、報告された各 issue を、
// 設定されたメッセージで追加し直す。その後、`.pipe(Schema)` が型を保ったまま値を引き渡す。
describe('x-allOf-message', () => {
  // The wrapper is an immediately invoked function, so that the inner schema is declared
  // once and shared by the check and the pipe.
  // ラッパーは即時実行関数である。内側のスキーマを1度だけ宣言し、check と pipe の両方で
  // 共有するためである。
  it('wraps the intersection in an immediately invoked function', () => {
    expect(generatedSrc).toContain('const MergedSchema = (() =>')
    expect(generatedSrc).toContain('const Schema = z')
    expect(generatedSrc).toContain('.check((ctx) =>')
    expect(generatedSrc).toContain('Schema.safeParse(ctx.value)')
    expect(generatedSrc).toContain('.pipe(Schema)')
  })

  // The text of the extension is the message of every issue that is added again.
  // 拡張に指定した文字列が、追加し直されるすべての issue のメッセージになる。
  it('emits the configured text as the message', () => {
    expect(generatedSrc).toContain("message: 'merged validation failed'")
  })

  // `ctx.issues` takes a union discriminated by `code`, and a spread of an issue of
  // unknown code does not typecheck. So the wrapper branches on the code, and the branch
  // for each of the eleven codes of Zod 4 has to be there for the generated file to
  // compile.
  // `ctx.issues` は、`code` で判別されるユニオン型を受け取る。code が不明な issue を
  // スプレッドしても、型チェックを通らない。そのため、ラッパーは code ごとに分岐する。
  // 生成されたファイルがコンパイルできるためには、Zod 4 の 11 種類の code すべてに対する
  // 分岐が必要である。
  it('branches on invalid_type', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_type'")
  })

  // The code of a value above a maximum.
  // 最大値を超える値に対する code。
  it('branches on too_big', () => {
    expect(generatedSrc).toContain("issue.code === 'too_big'")
  })

  // The code of a value below a minimum.
  // 最小値を下回る値に対する code。
  it('branches on too_small', () => {
    expect(generatedSrc).toContain("issue.code === 'too_small'")
  })

  // The code of a string that fails its format or its pattern.
  // フォーマットまたはパターンに一致しない文字列に対する code。
  it('branches on invalid_format', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_format'")
  })

  // The code of a number that fails multipleOf.
  // multipleOf を満たさない数値に対する code。
  it('branches on not_multiple_of', () => {
    expect(generatedSrc).toContain("issue.code === 'not_multiple_of'")
  })

  // The code of an unknown key in a strict object.
  // 厳格なオブジェクトにおける未知のキーに対する code。
  it('branches on unrecognized_keys', () => {
    expect(generatedSrc).toContain("issue.code === 'unrecognized_keys'")
  })

  // The code of a value that matches no branch of a union.
  // ユニオンのどの分岐にも一致しない値に対する code。
  it('branches on invalid_union', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_union'")
  })

  // The code of an invalid key of a record or a map.
  // レコードまたはマップにおける不正なキーに対する code。
  it('branches on invalid_key', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_key'")
  })

  // The code of an invalid element of a set or a map.
  // セットまたはマップにおける不正な要素に対する code。
  it('branches on invalid_element', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_element'")
  })

  // The code of a value outside an enum or a literal.
  // enum またはリテラルに含まれない値に対する code。
  it('branches on invalid_value', () => {
    expect(generatedSrc).toContain("issue.code === 'invalid_value'")
  })

  // The code of an issue a refinement adds.
  // refine によって追加された issue に対する code。
  it('branches on custom', () => {
    expect(generatedSrc).toContain("issue.code === 'custom'")
  })

  // When the extension holds an arrow function, the function is emitted inline and called
  // with the issue, in every branch.
  // 拡張にアロー関数が指定されている場合、その関数はインラインで出力され、すべての分岐で
  // issue を引数として呼び出される。
  it('emits an arrow function inline, called with the issue', () => {
    expect(generatedSrc).toContain("((issue) => 'merged failed at ' + issue.path.join('.'))(issue)")
  })
})

// `namespaced` declares the properties a, b and c, `additionalProperties: false` and
// `maxProperties: 3`. A fourth key is therefore always an unknown one, and the check for
// unknown keys answers first: no request can make `x-maxProperties-message` appear. That
// the generator emits it all the same is checked here.
// `namespaced` は、プロパティ a・b・c と、`additionalProperties: false`・
// `maxProperties: 3` を宣言している。そのため、4つ目のキーは必ず未知のキーになり、
// 未知のキーに対する検証が先に応答する。どんなリクエストを送っても、
// `x-maxProperties-message` は現れない。それでも生成器がこのメッセージを出力している
// ことを、ここで確認する。
describe('x-maxProperties-message', () => {
  // The message is in the generated source.
  // メッセージは、生成されたソースに含まれている。
  it('is emitted although no request can reach it', () => {
    expect(generatedSrc).toContain('namespaced must have at most 3 properties')
  })
})

// `writeOnly` says nothing about validation. It is metadata for the OpenAPI document, so
// it has to survive the round trip: from the spec, into the generated schema, and back
// out into the document the routes produce.
// `writeOnly` は、検証に関する情報ではない。OpenAPI ドキュメント用のメタデータであるため、
// 往復の過程で保持されなければならない。仕様から生成されたスキーマへ、そしてルートが
// 生成するドキュメントへと引き継がれる。
describe('writeOnly', () => {
  type Documented = {
    WriteOnly?: { properties?: Record<string, { writeOnly?: boolean; type?: string }> }
  }

  // The property the spec marks is marked in the document.
  // 仕様で指定されたプロパティは、ドキュメント上でも writeOnly になっている。
  it('marks the password as writeOnly in the document', () => {
    const doc = app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'x-vendor-messages', version: '1.0.0' },
    })
    const schemas = doc.components?.schemas as Documented | undefined
    expect(schemas?.WriteOnly?.properties?.['password']).toStrictEqual({
      type: 'string',
      writeOnly: true,
    })
  })

  // A property the spec does not mark carries no flag at all, not `writeOnly: false`.
  // 仕様で指定されていないプロパティには、フラグ自体が付かない。`writeOnly: false` にも
  // ならない。
  it('does not mark the name', () => {
    const doc = app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'x-vendor-messages', version: '1.0.0' },
    })
    const schemas = doc.components?.schemas as Documented | undefined
    expect(schemas?.WriteOnly?.properties?.['name']).toStrictEqual({ type: 'string' })
  })
})
