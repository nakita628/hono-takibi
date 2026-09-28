// Does the generated code do what the OpenAPI document says?
//
// Every other suite states, case by case, what a request should do. This one states
// nothing of its own. It takes the schemas of openapi.json, asks oracle.ts whether a value
// is valid under them, sends the same value to the generated routes, and compares the two
// answers. A value the document accepts and the generated code rejects, or the reverse, is
// a fault in the conversion, whoever thought of the case or did not.
//
// Each test sends every value of the pool, a few hundred requests, so it is given a minute
// where a test of one request has five seconds.
//
// That is why this file loops where the other suites spell every request out: what it
// checks is not a list of cases someone wrote, but every value of a pool against every
// schema of the document. A disagreement is reported with the parameter, the value and
// both answers, which is the case to add to the suite it belongs to.
//
// 生成コードは、OpenAPI ドキュメントのとおりに動くか。
//
// 他のスイートは、リクエストがどう扱われるべきかを、ケースごとに記述している。このスイートは、
// 独自の期待値を一切持たない。openapi.json のスキーマを取り出し、ある値がそのスキーマに対して
// 有効かどうかを oracle.ts に問い合わせ、同じ値を生成されたルートに送信して、2つの答えを
// 比較する。ドキュメントが受理する値を生成コードが拒否した場合、あるいはその逆の場合は、
// そのケースを誰かが想定していたかどうかにかかわらず、変換の不具合である。
//
// 各テストは、プールに含まれるすべての値(数百件のリクエスト)を送信する。そのため、
// 1リクエストのテストでは5秒である制限時間を、1分にしている。
//
// 他のスイートがリクエストを1件ずつ書き下しているのに対し、このファイルがループを使うのは
// そのためである。検証対象は、誰かが書いたケースの一覧ではなく、値のプールに含まれる
// すべての値と、ドキュメントのすべてのスキーマの組み合わせである。食い違いは、パラメータ・値・
// 双方の答えとともに報告される。それが、該当するスイートに追加すべきケースになる。
//
// How a value travels / 値の運ばれ方:
//   A JSON body carries typed values, so a value is sent as it is and has to come back as
//   it is. A query string carries text. What text stands for is the one thing OpenAPI
//   leaves open, and `readings` below is where this project settles it: a decimal literal
//   is a number, a word `z.stringbool()` reads is a boolean, and any text is itself. The
//   document accepts a text when it accepts one of its readings.
//   JSON ボディは型付きの値を運ぶため、値はそのまま送信され、そのまま返ってこなければ
//   ならない。クエリ文字列が運ぶのは文字列である。文字列が何を表すかは、OpenAPI が唯一
//   定めていない点であり、このプロジェクトでは下記の `readings` でそれを定めている。
//   10進リテラルは number、`z.stringbool()` が読み取る単語は boolean、そしてすべての文字列は
//   文字列そのものを表す。ドキュメントがその読み取り結果のいずれかを受理する場合、
//   その文字列は受理されるものとする。
import { describe, expect, it } from 'vite-plus/test'

import { conformanceApp } from './app'
import document from './openapi.json'
import type { Json } from './oracle'
import { accepts, isSame, mentioned, resolve } from './oracle'

const schemas: { readonly [k: string]: unknown } = document.components.schemas
const parameters = document.paths['/query'].get.parameters
const properties: { readonly [k: string]: unknown } =
  document.paths['/json'].post.requestBody.content['application/json'].schema.properties

// The values worth sending are the ones next to what the schemas mention: a bound, the
// values on either side of it, a member of an enum, a string one character short.
// 送信する価値があるのは、スキーマに現れる値の近傍である。境界値とその前後の値、enum の
// メンバー、1文字足りない文字列などである。
const named = mentioned(document, schemas)
const numbers = [
  ...new Set([
    0,
    2147483647,
    2147483648,
    ...named.flatMap((value) =>
      typeof value === 'number' ? [value - 1, value - 0.5, value, value + 0.5, value + 1] : [],
    ),
  ]),
]
const strings = [
  ...new Set([
    '',
    'A',
    'abc-1',
    'abc-1234',
    ...named.filter((value) => typeof value === 'string'),
    ...[0, 1, 2, 3, 4, 5].map((length) => 'a'.repeat(length)),
    ...[1, 2, 3].map((length) => '1'.repeat(length)),
  ]),
]
const scalars: readonly (null | boolean | number | string)[] = [
  null,
  true,
  false,
  ...numbers,
  ...strings,
]
const few: readonly Json[] = [0, 1, 2, 6, -1, 'a', 'ab', 'all', true]
const lists: readonly Json[] = [
  [],
  ...few.map((a) => [a]),
  ...few.flatMap((a) => few.map((b) => [a, b])),
  [1, 2, 3],
  [1, 2, 1],
  [1, 2, 3, 4],
  [1, 'a', true],
  [1, 'a', 1],
]
const objects: readonly Json[] = [
  {},
  { a: 1 },
  { a: 'x' },
  { a: 1, b: 's' },
  { a: 1, b: 2 },
  { a: 1, c: 1 },
  { b: 's' },
  { c: 1.5 },
  { x: 1 },
  { x: 1, y: 2 },
  { x: 1, y: 'a' },
  { x: 1.5 },
  { y: 1 },
  [{ x: 1 }],
  [{ x: 1 }, { y: 1 }],
  [{ x: 1 }, { x: 2, y: 3 }],
]
const typed: readonly Json[] = [...scalars, ...lists, ...objects]

// The texts a query string can carry: every scalar as it is written, and the spellings
// that are not the plain one.
// クエリ文字列で運べる文字列。各スカラーの表記と、標準的でない表記を含む。
const texts = [
  ...new Set([
    ...scalars.map((value) => (value === null ? 'null' : String(value))),
    ' ',
    '01',
    '+1',
    '-0',
    '1.0',
    '1e3',
    '0x10',
    'yes',
    'TRUE',
    'maybe',
  ]),
]
const fewTexts = ['0', '1', '2', '6', '-1', 'a', 'ab', 'all', 'true']
const sent: readonly (readonly string[])[] = [
  ...texts.map((text) => [text]),
  ...fewTexts.flatMap((a) => fewTexts.map((b) => [a, b])),
  ['1', '2', '3'],
  ['1', '2', '1'],
  ['1', '2', '3', '4'],
]

/**
 * Whether a schema asks for a boolean anywhere: by its type, or by a member of an enum.
 * スキーマが、型または enum のメンバーによって、どこかで boolean を要求しているかどうか。
 */
function asksForBoolean(schema: unknown, seen: readonly unknown[] = []): boolean {
  const target = resolve(schema, schemas)
  if (target === true || target === false || target === 'boolean') return true
  if (typeof target !== 'object' || target === null || seen.includes(target)) return false
  return Object.values(target).some((item) => asksForBoolean(item, [...seen, target]))
}

/**
 * What a text stands for. A decimal literal is a number, unless the number would not hold
 * it; `true` and `false` are booleans, and so are the other words `z.stringbool()` reads
 * where the schema asks for a boolean; any text is itself.
 *
 * 文字列が表すもの。10進リテラルは number を表す(number で保持できない場合を除く)。
 * `true` と `false` は boolean を表す。スキーマが boolean を要求している場合は、
 * `z.stringbool()` が読み取るその他の単語も boolean を表す。すべての文字列は、
 * 文字列そのものを表す。
 */
function readings(text: string, schema: unknown): readonly Json[] {
  const isDecimal = /^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/u.test(text)
  const isWhole = /^-?\d+$/u.test(text)
  const number = Number(text)
  const word = asksForBoolean(schema) ? text.toLowerCase() : text
  const truthy = asksForBoolean(schema) ? ['true', '1', 'yes', 'on', 'y', 'enabled'] : ['true']
  const falsy = asksForBoolean(schema) ? ['false', '0', 'no', 'off', 'n', 'disabled'] : ['false']
  return [
    ...(isDecimal && Number.isFinite(number) && (!isWhole || Number.isSafeInteger(number))
      ? [number]
      : []),
    ...(truthy.includes(word) ? [true] : []),
    ...(falsy.includes(word) ? [false] : []),
    text,
  ]
}

/**
 * Whether a schema says its value is an array. Only then is a name sent once read as an
 * array of one element: a schema that names no type could be met by an array too, and no
 * client means one by `?name=abc`.
 *
 * スキーマが、値を配列として宣言しているかどうか。1回だけ送信された名前を1要素の配列として
 * 読み取るのは、この場合に限る。型を指定しないスキーマは配列でも満たせるが、`?name=abc` で
 * 配列を意図するクライアントは存在しない。
 */
function declaresArray(schema: unknown): boolean {
  const target = resolve(schema, schemas)
  if (typeof target !== 'object' || target === null || !('type' in target)) return false
  return Array.isArray(target.type) ? target.type.includes('array') : target.type === 'array'
}

/**
 * Every value a parameter sent as these texts can stand for. A name sent once is a scalar,
 * or an array of one element where the schema declares an array; a name sent several times
 * is an array.
 *
 * これらの文字列として送信されたパラメータが表しうる、すべての値。1回だけ送信された名前は
 * スカラーを表し、スキーマが配列を宣言している場合は1要素の配列も表す。複数回送信された
 * 名前は、配列を表す。
 */
function meanings(sentTexts: readonly string[], schema: unknown): readonly Json[] {
  const arrays = sentTexts.reduce<readonly (readonly Json[])[]>(
    (built, text) =>
      built.flatMap((items) =>
        // oxlint-disable-next-line oxc/no-map-spread -- a handful of short arrays, built once
        readings(text, schema).map((item) => [...items, item]),
      ),
    [[]],
  )
  const [only] = sentTexts
  if (sentTexts.length > 1 || only === undefined) return arrays
  return declaresArray(schema) ? [...readings(only, schema), ...arrays] : readings(only, schema)
}

describe('query: a text is accepted when the document accepts what it stands for', () => {
  for (const parameter of parameters) {
    it(`${parameter.name} answers as the document says`, async () => {
      const disagreements: string[] = []
      for (const sentTexts of sent) {
        const valid = meanings(sentTexts, parameter.schema).filter((meaning) =>
          accepts(parameter.schema, meaning, schemas),
        )
        const search = new URLSearchParams(sentTexts.map((text) => [parameter.name, text]))
        // oxlint-disable-next-line no-await-in-loop -- one request at a time keeps the report in order
        const res = await conformanceApp.request(`/query?${search.toString()}`)
        // oxlint-disable-next-line no-await-in-loop -- read with the request it belongs to
        const body = (await res.json()) as { readonly [k: string]: Json }
        const shown = JSON.stringify(sentTexts)
        if (res.status === 200 && valid.length === 0) {
          disagreements.push(
            `${shown}: the document rejects it, the generated code accepts ${JSON.stringify(body[parameter.name])}`,
          )
        }
        if (res.status !== 200 && valid.length > 0) {
          disagreements.push(
            `${shown}: the document accepts ${JSON.stringify(valid[0])}, the generated code rejects it`,
          )
        }
        const [expected] = valid
        if (res.status === 200 && valid.length === 1 && expected !== undefined) {
          if (!isSame(body[parameter.name] ?? null, expected)) {
            disagreements.push(
              `${shown}: the document reads ${JSON.stringify(expected)}, the generated code hands out ${JSON.stringify(body[parameter.name])}`,
            )
          }
        }
      }
      expect(disagreements).toStrictEqual([])
    }, 60_000)
  }
})

// Where the generated code differs from the document on purpose. Each entry is a decision,
// stated with its reason; anything that is not listed here is a fault.
//
// object: JSON Schema lets an object carry properties its schema does not declare, and
// `z.object()` accepts them as well, then leaves them out of what it hands the handler. The
// request is valid either way. What the handler receives is what the document describes and
// nothing a client added to it, which is the safer of the two.
//
// 生成コードが、意図的にドキュメントと異なる挙動をする箇所。各項目は、理由を添えて記述した
// 決定事項である。ここに記載のないものは、すべて不具合である。
//
// object: JSON Schema は、スキーマで宣言されていないプロパティをオブジェクトが持つことを
// 許容している。`z.object()` もそれらを受理するが、ハンドラに渡す値からは除外する。
// どちらの場合も、リクエストは有効である。ハンドラが受け取るのは、ドキュメントに記述された
// 内容だけであり、クライアントが追加したものは含まれない。こちらのほうが安全である。
const decided: { readonly [name: string]: readonly string[] } = {
  object: ['{"a":1,"c":1}: the generated code hands out {"a":1}'],
}

describe('json: a value is accepted when the document accepts it, and arrives unchanged', () => {
  for (const [name, schema] of Object.entries(properties)) {
    it(`${name} answers as the document says`, async () => {
      const disagreements: string[] = []
      for (const value of typed) {
        const isValid = accepts(schema, value, schemas)
        // oxlint-disable-next-line no-await-in-loop -- one request at a time keeps the report in order
        const res = await conformanceApp.request('/json', {
          method: 'POST',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({ [name]: value }),
        })
        // oxlint-disable-next-line no-await-in-loop -- read with the request it belongs to
        const body = (await res.json()) as { readonly [k: string]: Json }
        const shown = JSON.stringify(value)
        if (res.status === 200 && !isValid) {
          disagreements.push(`${shown}: the document rejects it, the generated code accepts it`)
        }
        if (res.status !== 200 && isValid) {
          disagreements.push(`${shown}: the document accepts it, the generated code rejects it`)
        }
        if (res.status === 200 && isValid && !isSame(body[name] ?? null, value)) {
          disagreements.push(`${shown}: the generated code hands out ${JSON.stringify(body[name])}`)
        }
      }
      expect(disagreements).toStrictEqual(decided[name] ?? [])
    }, 60_000)
  }
})
