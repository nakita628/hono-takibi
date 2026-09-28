import { describe, expect, it } from 'vite-plus/test'

import { zodToOpenAPI } from './index.js'

// `not` excludes values from what the rest of the schema accepts, so the keywords beside it
// still apply. This holds for a request body as much as for a parameter.
// `not` は、スキーマの残りの部分が受理する値から一部を除外するものである。そのため、
// 並んで書かれたキーワードも適用される。これはパラメータだけでなく、リクエストボディでも
// 同じである。
describe('zodToOpenAPI: keywords beside not', () => {
  // `type: integer, not: { const: 0 }` is an integer other than 0, not anything other than 0.
  // `type: integer, not: { const: 0 }` は「0 以外の整数」であり、「0 以外の任意の値」ではない。
  it.concurrent('validates the type beside not', () => {
    expect(zodToOpenAPI({ type: 'integer', not: { const: 0 } })).toBe(
      'z.int().refine((val) => val !== 0)',
    )
  })

  // The constraints beside not are kept as well.
  // not と並ぶ制約も、同様に保持される。
  it.concurrent('validates the constraints beside not', () => {
    expect(zodToOpenAPI({ type: 'string', minLength: 2, not: { enum: ['ab'] } })).toBe(
      'z.string().min(2).refine((val) => !["ab"].includes(val))',
    )
  })

  // The same when what is excluded is a component.
  // 除外対象がコンポーネントである場合も同様である。
  it.concurrent('validates the type beside not with a reference', () => {
    expect(zodToOpenAPI({ type: 'integer', not: { $ref: '#/components/schemas/Count' } })).toBe(
      'z.int().refine((val) => !CountSchema.safeParse(val).success)',
    )
  })

  // `nullable`, `default` and the metadata go around the whole schema, once.
  // `nullable`・`default`・メタデータは、スキーマ全体の外側に1度だけ付く。
  it.concurrent('adds nullable, default and metadata once, around the refinement', () => {
    expect(
      zodToOpenAPI({
        type: ['integer', 'null'],
        not: { const: 0 },
        default: 1,
        description: 'd',
      }),
    ).toBe('z.int().refine((val) => val !== 0).nullable().default(1).openapi({"description":"d"})')
  })

  // With no type beside it, not starts from any value.
  // 並んで書かれた type がなければ、not は任意の値を起点とする。
  it.concurrent('starts from z.any() without a type', () => {
    expect(zodToOpenAPI({ not: { const: 0 } })).toBe('z.any().refine((val) => val !== 0)')
  })
})

// The options that say how the value arrives.
// 値がどのように届くかを指定するオプション。
describe('zodToOpenAPI: how the value arrives', () => {
  // A request body arrives typed: nothing is read from text.
  // リクエストボディは型付きで届く。文字列から読み取るものはない。
  it.concurrent('emits a typed schema without options', () => {
    expect(zodToOpenAPI({ type: 'integer', minimum: 1 })).toBe('z.int().min(1)')
  })

  // `coerce` says the value arrives as text. The constraints stay on the typed schema, inside
  // the converter.
  // `coerce` は、値が文字列で届くことを示す。制約は、変換関数の内側にある型付きスキーマに
  // 付いたままである。
  it.concurrent('reads text with the coerce option', () => {
    expect(zodToOpenAPI({ type: 'integer', minimum: 1 }, undefined, { coerce: true })).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?\d+$/.test(val)&&Number.isSafeInteger(Number(val))?Number(val):val),z.int().min(1))`,
    )
  })

  // A reference is emitted as its identifier for a typed value, whatever the component is.
  // 型付きの値に対しては、コンポーネントの内容にかかわらず、参照は識別子として出力される。
  it.concurrent('leaves a reference alone without the coerce option', () => {
    expect(
      zodToOpenAPI({ $ref: '#/components/schemas/Count' }, undefined, {
        schemas: { Count: { type: 'integer' } },
      }),
    ).toBe('CountSchema')
  })

  // `json` says the value arrives as one JSON document, which is parsed and then validated as
  // typed.
  // `json` は、値が1つの JSON 文書として届くことを示す。文書はパースされ、
  // 型付きの値として検証される。
  it.concurrent('parses a document with the json option', () => {
    expect(
      zodToOpenAPI({ type: 'array', items: { type: 'integer' } }, undefined, { json: true }),
    ).toBe(
      "z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.array(z.int()))",
    )
  })
})

// `type` may list several types, and a value of any of them is accepted.
// `type` には複数の型を列挙でき、そのいずれの型の値も受理される。
describe('zodToOpenAPI: a list of types', () => {
  // Each type emits its own schema, and the list is their union.
  // 各型がそれぞれのスキーマを出力し、型のリストはそれらの union になる。
  it.concurrent('emits a union of the listed types', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'] })).toBe('z.union([z.int(),z.string()])')
  })

  // `null` is not a branch: it makes the union nullable.
  // `null` は分岐にはならず、union を nullable にする。
  it.concurrent('makes the union nullable for null', () => {
    expect(zodToOpenAPI({ type: ['integer', 'boolean', 'null'] })).toBe(
      'z.union([z.int(),z.boolean()]).nullable()',
    )
  })

  // One type beside null is that type, nullable, as before.
  // null と並ぶ型が1つだけの場合は、従来どおり、その型の nullable になる。
  it.concurrent('emits a single type beside null without a union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'null'] })).toBe('z.int().nullable()')
  })

  // Every branch is handed the keywords and reads the ones of its type: `minimum` bounds
  // the integer and `minLength` the string.
  // すべての分岐にキーワードが渡され、各分岐は自身の型に関するものだけを読み取る。
  // `minimum` は integer を、`minLength` は string を制約する。
  it.concurrent('gives each branch the keywords of its type', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'], minimum: 1, minLength: 2 })).toBe(
      'z.union([z.int().min(1),z.string().min(2)])',
    )
  })

  // The default and the metadata are written once, around the union.
  // デフォルト値とメタデータは、union の外側に1度だけ付く。
  it.concurrent('adds the default and the metadata once, around the union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'], default: 1, description: 'd' })).toBe(
      'z.union([z.int(),z.string()]).default(1).openapi({"description":"d"})',
    )
  })

  // On the wire the text is read once, around the union, as any of the listed types.
  // ワイヤ上では、文字列は union の外側で1度だけ、列挙された型のいずれかとして読み取られる。
  it.concurrent('reads the text once around the union', () => {
    expect(zodToOpenAPI({ type: ['integer', 'string'] }, undefined, { coerce: true })).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?\d+$/.test(val)&&Number.isSafeInteger(Number(val))?Number(val):val),z.union([z.int(),z.string()]))`,
    )
  })
})
