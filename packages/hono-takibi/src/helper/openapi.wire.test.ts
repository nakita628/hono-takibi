import { describe, expect, it, vi } from 'vite-plus/test'

import type { Schema } from '../openapi/index.js'
import { makeContent, makeParameterSchema, makeRequestBody, makeRequestParams } from './openapi.js'

// The component schemas the references below point at.
// 以下の参照が指すコンポーネントスキーマ。
const schemas: { readonly [k: string]: Schema } = {
  Count: { type: 'integer', minimum: 0 },
  Flag: { type: 'boolean' },
  Name: { type: 'string' },
  Counts: { type: 'array', items: { type: 'integer' } },
  Names: { type: 'array', items: { type: 'string' } },
  Node: {
    type: 'object',
    properties: { size: { type: 'integer' }, next: { $ref: '#/components/schemas/Node' } },
  },
}

// A component schema is emitted for a typed value. A parameter that names one reads the
// text first.
// コンポーネントスキーマは、型付きの値を前提に出力される。コンポーネントを参照する
// パラメータは、先に文字列を読み取る。
describe('makeParameterSchema: a schema behind $ref', () => {
  // Count is `z.int().min(0)`, written for a typed value. The text is read around it. The
  // parameter metadata sits on the component itself: on the `z.preprocess` around it, it
  // would hide the component from the document, which would then name Count in the
  // parameter's `$ref` and never define it.
  // Count は `z.int().min(0)` であり、型付きの値を前提としている。文字列は、その外側で
  // 読み取られる。パラメータのメタデータは、コンポーネント自体に付く。外側の `z.preprocess`
  // に付けると、コンポーネントがドキュメントから見えなくなる。その場合、ドキュメントは
  // パラメータの `$ref` で Count を参照しながら、Count を定義しない。
  it.concurrent('reads an integer component from text', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Count' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Count"}}}))`,
    )
  })

  // `.exactOptional()` hides the component from the document as well, so it goes around the
  // metadata too.
  // `.exactOptional()` も、コンポーネントをドキュメントから見えなくする。そのため、
  // これもメタデータの外側に置かれる。
  it.concurrent('keeps an optional component visible to the document', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', schema: { $ref: '#/components/schemas/Count' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","schema":{"$ref":"#/components/schemas/Count"},"required":false}})).exactOptional()`,
    )
  })

  // A reference wrapped in `allOf` is emitted as the component too.
  // `allOf` で包んだ参照も、コンポーネントとして出力される。
  it.concurrent('keeps a component wrapped in allOf visible to the document', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { allOf: [{ $ref: '#/components/schemas/Count' }], description: 'A count.' },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"allOf":[{"$ref":"#/components/schemas/Count"}],"description":"A count."}}}))`,
    )
  })

  // `.default()` on the component would be written into its definition, for every user of
  // Count, and around the component it would hide it from the document. A decorated
  // reference is written out in place, in the schema and in what the parameter documents.
  // コンポーネントに付けた `.default()` は、その定義に書き込まれ、Count のすべての利用箇所に
  // 影響する。一方、コンポーネントの外側に付けると、コンポーネントがドキュメントから
  // 見えなくなる。装飾された参照は、スキーマでもパラメータのドキュメントでも、
  // その場に展開される。
  it.concurrent('writes a component with a default out in place', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          schema: { $ref: '#/components/schemas/Count', default: 1 },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().min(0)).default(1).exactOptional().openapi({param:{"name":"p","in":"query","schema":{"type":"integer","minimum":0,"default":1},"required":false}})`,
    )
  })

  // Flag is `z.boolean()`. `z.stringbool()` is a pipe of its own, and the document reads a
  // pipe by its input: Flag behind it would be described as a string. Asked from inside a
  // `z.preprocess`, `z.stringbool()` still reads the text and Flag stays visible.
  // Flag は `z.boolean()` である。`z.stringbool()` はそれ自体が pipe であり、ドキュメントは
  // pipe を入力側で読む。その先にある Flag は、string として記述されてしまう。
  // `z.preprocess` の内側から呼び出せば、`z.stringbool()` が文字列を読み取りつつ、
  // Flag は見える状態に保たれる。
  it.concurrent('reads a boolean component with z.stringbool() inside a preprocess', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Flag' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),FlagSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Flag"}}}))`,
    )
  })

  // Name is a string: there is nothing to read, so the reference stays as it is.
  // Name は string である。読み取るものがないため、参照はそのまま残る。
  it.concurrent('leaves a string component as a reference', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Name' } },
        undefined,
        schemas,
      ),
    ).toBe(
      `NameSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Name"}}})`,
    )
  })

  // An array cannot be converted from outside: its elements are. The component is emitted
  // in place, reading each element, and takes the arity wrapper an inline array takes. The
  // parameter documents what it emits, the array written out: a `$ref` to Counts would
  // name a component the emitted schema never mentions.
  // 配列は外側からは変換できない。変換されるのは要素である。コンポーネントはその場に
  // 出力され、各要素を読み取る。インライン宣言の配列と同じく、単一値も受理する。
  // パラメータのドキュメントには、出力した内容、つまり展開された配列が記載される。
  // Counts への `$ref` を記載すると、出力されたスキーマに現れないコンポーネントを
  // 参照することになる。
  it.concurrent('emits an array component in place', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Counts' } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","items":{"type":"integer"}}}})`,
    )
  })

  // Names holds nothing to read, so the reference stays as it is.
  // Names には読み取るべき要素がないため、参照はそのまま残る。
  it.concurrent('leaves an array of strings as a reference', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { $ref: '#/components/schemas/Names' } },
        undefined,
        schemas,
      ),
    ).toBe(
      `NamesSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Names"}}})`,
    )
  })

  // The array is inline and its items name Count.
  // 配列はインライン宣言であり、その items が Count を指している。
  it.concurrent('reads elements that are a reference', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { type: 'array', items: { $ref: '#/components/schemas/Count' } },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","items":{"$ref":"#/components/schemas/Count"}}}})`,
    )
  })

  // Node has a property that is a Node. The first level is emitted in place; the reference
  // inside it is left, because emitting it in place again would never end.
  // Node は、Node 型のプロパティを持つ。1段目はその場に出力されるが、その内側の参照は
  // そのまま残る。再びその場に出力すると、終わりがなくなるためである。
  it.concurrent('stops at a component that refers to itself', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          content: { 'text/plain': { schema: { $ref: '#/components/schemas/Node' } } },
        },
        undefined,
        schemas,
      ),
    ).toContain(
      String.raw`z.object({size:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),next:NodeSchema.exactOptional()}).openapi({param:{"name":"p","in":"query","required":true,"content":{"text/plain":{"schema":{"$ref":"#/components/schemas/Node"}}}},"required":[]})`,
    )
  })

  // What Count is cannot be known without its definition, so the reference is emitted as it
  // is.
  // 定義がなければ Count が何であるかは分からないため、参照はそのまま出力される。
  it.concurrent('leaves a reference alone without the component schemas', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { $ref: '#/components/schemas/Count' },
      }),
    ).toBe(
      `CountSchema.openapi({param:{"name":"p","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Count"}}})`,
    )
  })
})

// A scalar is read from text once, around the whole schema, and everything inside is
// emitted as for a typed value.
// スカラーは、スキーマ全体の外側で1度だけ文字列から読み取られる。その内側は、
// 型付きの値を前提として出力される。
describe('makeParameterSchema: the text is read once', () => {
  // Reading per branch gives `z.preprocess(..., z.int()).and(...)`: the left side outputs 10
  // and the right side the text "10", which Zod cannot merge and throws on.
  // 分岐ごとに読み取ると `z.preprocess(..., z.int()).and(...)` になる。左辺は 10 を、
  // 右辺は文字列 "10" を出力するため、Zod はマージできずに例外を投げる。
  it.concurrent('reads an allOf once, around its branches', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { allOf: [{ type: 'integer' }, { minimum: 5 }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().and(z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<5){ctx.addIssue({code:'custom'})}}}))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"allOf":[{"type":"integer"},{"minimum":5}]}}})`,
    )
  })

  // "1" spells a number and a boolean. Read once, it is the number 1, which one branch takes.
  // "1" は number と boolean の両方の表記である。1度だけ読み取れば number の 1 となり、
  // 1つの分岐だけが受理する。
  it.concurrent('reads a oneOf of integer and boolean once', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { oneOf: [{ type: 'integer' }, { type: 'boolean' }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),schema)]))(z.xor([z.int(),z.boolean()])).openapi({param:{"name":"p","in":"query","required":true,"schema":{"oneOf":[{"type":"integer"},{"type":"boolean"}]}}})`,
    )
  })

  // An array cannot be read from outside, so each branch reads its own text.
  // 配列は外側からは読み取れないため、各分岐がそれぞれ文字列を読み取る。
  it.concurrent('reads per branch when a branch is not a scalar', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: { anyOf: [{ type: 'integer' }, { type: 'array', items: { type: 'integer' } }] },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))]).openapi({param:{"name":"p","in":"query","required":true,"schema":{"anyOf":[{"type":"integer"},{"type":"array","items":{"type":"integer"}}]}}})`,
    )
  })

  // `type: integer, not: { const: 0 }` is an integer other than 0. The value is read as an
  // integer and validated as one before the exclusion is checked.
  // `type: integer, not: { const: 0 }` は、0 以外の整数である。値は integer として読み取られ、
  // integer として検証されたうえで、除外条件が確認される。
  it.concurrent('keeps the type beside not', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { type: 'integer', not: { const: 0 } } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int().refine((val) => val !== 0)).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","not":{"const":0}}}})`,
    )
  })

  // `minimum` applies to numbers only, so numeric text is read as one for it to apply.
  // `minimum` は数値にのみ適用されるため、適用できるよう数値の文字列は number として
  // 読み取られる。
  it.concurrent('reads numeric text for a typeless minimum', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { minimum: 1 } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),z.preprocess((val)=>(val==='true'?true:val==='false'?false:val),schema),schema,z.preprocess((val)=>(val==='null'?null:val),schema)]))(z.unknown().superRefine((val,ctx)=>{if(typeof val==='number'){if(val<1){ctx.addIssue({code:'custom'})}}})).openapi({param:{"name":"p","in":"query","required":true,"schema":{"minimum":1}}})`,
    )
  })

  // "2" is a member as it stands, so it is handed on before digits are read as a number.
  // "2" はそのままでメンバーであるため、数字が number として読み取られる前に
  // そのまま渡される。
  it.concurrent('keeps the string members of a mixed enum as text', () => {
    expect(
      makeParameterSchema(
        { name: 'p', in: 'query', required: true, schema: { enum: [1, 'a', '2'] } },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`((schema)=>z.union([z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),schema),schema]))(z.union([z.literal(1),z.literal('a'),z.literal('2')])).openapi({param:{"name":"p","in":"query","required":true,"schema":{"enum":[1,"a","2"]}}})`,
    )
  })

  // A tuple is validated inside a refinement, which checks a value without replacing it, so
  // the elements are read first: the integer position as a number, the string position as it
  // is, and what follows the prefix as `items` declares.
  // タプルは refinement の中で検証される。refinement は値を検証するだけで置き換えないため、
  // 要素は先に読み取られる。integer の位置は number として、string の位置はそのまま、
  // prefixItems より後ろは `items` の宣言どおりに読み取られる。
  it.concurrent('reads each element of a tuple by its position', () => {
    expect(
      makeParameterSchema(
        {
          name: 'p',
          in: 'query',
          required: true,
          schema: {
            type: 'array',
            prefixItems: [{ type: 'integer' }, { type: 'string' }],
            items: { type: 'boolean' },
          },
        },
        undefined,
        schemas,
      ),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.preprocess((val)=>{if(!Array.isArray(val))return val;const prefix=[(val:unknown)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),(val:unknown)=>val];const rest=((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool());return val.map((item,i)=>(prefix[i]??rest)(item))},z.array(z.unknown()).superRefine((arr,ctx)=>{const Prefix=[z.int(),z.string()];for(const [i,Schema] of Prefix.slice(0,arr.length).entries()){const result=Schema.safeParse(arr[i]);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[i,...issue.path]})}}};const Rest=z.boolean();for(const [i,val] of arr.slice(Prefix.length).entries()){const result=Rest.safeParse(val);if(!result.success){for(const issue of result.error.issues){ctx.addIssue({...issue,path:[Prefix.length+i,...issue.path]})}}}}))).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"array","prefixItems":[{"type":"integer"},{"type":"string"}],"items":{"type":"boolean"}}}})`,
    )
  })
})

// A parameter declared with `content` carries one encoded document as its value.
// `content` で宣言されたパラメータは、値として1つのエンコードされた文書を運ぶ。
describe('makeParameterSchema: content', () => {
  // The document has types of its own, so its schema is emitted as for a typed value: `page`
  // is `z.int()`, not a schema that reads text.
  // 文書は自身で型を持つため、そのスキーマは型付きの値を前提として出力される。`page` は
  // 文字列を読み取るスキーマではなく、`z.int()` である。
  it.concurrent('parses a JSON document before it validates', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: { page: { type: 'integer' } },
              required: ['page'],
            },
          },
        },
      }),
    ).toBe(
      `z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.object({page:z.int()})).openapi({param:{"name":"p","in":"query","required":true,"content":{"application/json":{"schema":{"type":"object","properties":{"page":{"type":"integer"}},"required":["page"]}}}},"required":["page"]})`,
    )
  })

  // The brackets make the array one value: it takes no arity wrapper.
  // 角括弧で囲まれた配列は1つの値である。単一値を配列に包む処理は付かない。
  it.concurrent('parses a JSON array without wrapping it', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: {
          'application/vnd.api+json': { schema: { type: 'array', items: { type: 'integer' } } },
        },
      }),
    ).toContain(
      `z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.array(z.int()))`,
    )
  })

  // A media type that is not JSON carries plain text, read like a parameter with a schema.
  // JSON でないメディアタイプは、プレーンテキストを運ぶ。schema を持つパラメータと
  // 同じように読み取られる。
  it.concurrent('reads a text/plain document from text', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        content: { 'text/plain': { schema: { type: 'integer' } } },
      }),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).openapi({param:{"name":"p","in":"query","required":true,"content":{"text/plain":{"schema":{"type":"integer"}}}}})`,
    )
  })
})

// The converter sits directly on the schema; everything else goes around it.
// 変換関数はスキーマの直前に置かれ、それ以外はすべてその外側に置かれる。
describe('makeParameterSchema: what goes around the converter', () => {
  // The converter hands `undefined` on as it is, so the schema behind it sees that the value
  // is missing. `z.coerce.number()` turned it into NaN first, and the message was never used.
  // 変換関数は `undefined` をそのまま渡すため、その先のスキーマは値の欠落を認識できる。
  // `z.coerce.number()` は先に NaN へ変換していたため、このメッセージは使われなかった。
  it.concurrent('reports a missing value with x-required-message', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { type: 'integer', 'x-error-message': 'bad', 'x-required-message': 'need' },
      }),
    ).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int({error:(issue)=>issue.input===undefined?"need":"bad"})).openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","x-error-message":"bad","x-required-message":"need"}}})`,
    )
  })

  // `.default()` has to see `undefined`, so it sits outside the preprocess.
  // `.default()` は `undefined` を受け取る必要があるため、preprocess の外側に置かれる。
  it.concurrent('keeps nullable and default outside the converter', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        schema: { type: ['integer', 'null'], default: 20 },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val==='null'?null:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).nullable()).default(20).exactOptional().openapi({param:{"name":"p","in":"query","schema":{"type":["integer","null"],"default":20},"required":false}})`,
    )
  })

  // `x-coerce` asks for `z.coerce` by name, with everything `Number(text)` reads.
  // `x-coerce` は `z.coerce` を明示的に指定するものであり、`Number(text)` が読み取るものを
  // すべて受理する。
  it.concurrent('keeps z.coerce for a schema with x-coerce', () => {
    expect(
      makeParameterSchema({
        name: 'p',
        in: 'query',
        required: true,
        schema: { type: 'integer', 'x-coerce': true },
      }),
    ).toBe(
      `z.coerce.number().int().openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"integer","x-coerce":true}}})`,
    )
  })

  // `z.stringbool()` is the boolean schema itself; it takes the text as it is.
  // `z.stringbool()` は boolean スキーマそのものであり、文字列をそのまま受け取る。
  it.concurrent('keeps z.stringbool() for a boolean', () => {
    expect(
      makeParameterSchema({ name: 'p', in: 'query', required: true, schema: { type: 'boolean' } }),
    ).toBe(
      `z.stringbool().openapi({param:{"name":"p","in":"query","required":true,"schema":{"type":"boolean"}}})`,
    )
  })

  // The style is undone first and the value read second.
  // 先にスタイルが解除され、その後で値が読み取られる。
  it.concurrent('strips the prefix of a label scalar before it reads the value', () => {
    expect(
      makeParameterSchema({
        name: 'id',
        in: 'path',
        required: true,
        style: 'label',
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(typeof val!=='string'?val:val.startsWith(".")?val.slice(1):undefined),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int())).openapi({param:{"name":"id","in":"path","required":true,"style":"label","schema":{"type":"integer"}}})`,
    )
  })
})

// An object parameter is spread over the request: one key per property for `deepObject`,
// the properties as keys of the query for an exploded `form`, one value of alternating names
// and values otherwise. A query gathers them; the parameter itself is emitted as the object.
// オブジェクトのパラメータは、リクエストに分散して送られる。`deepObject` ではプロパティごとに
// 1つのキー、explode された `form` ではプロパティ自体がクエリのキー、それ以外では名前と値を
// 交互に並べた1つの値になる。クエリ側がそれらをまとめ、パラメータ自体はオブジェクトとして
// 出力される。
describe('makeParameterSchema: an object parameter', () => {
  // The properties are read like the fields of a form: an array accepts both arities, and a
  // boolean is read by a converter.
  // プロパティは、フォームのフィールドと同じように読み取られる。配列は単一値と複数値の
  // 両方を受理し、boolean は変換関数で読み取られる。
  it('reads the properties of a deepObject parameter from text', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(
      makeParameterSchema({
        name: 'filter',
        in: 'query',
        style: 'deepObject',
        schema: {
          type: 'object',
          properties: {
            age: { type: 'integer' },
            active: { type: 'boolean' },
            ids: { type: 'array', items: { type: 'integer' } },
          },
        },
      }),
    ).toContain(
      String.raw`z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),active:z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),z.boolean()).exactOptional(),ids:z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional()}).exactOptional().openapi({param:{"name":"filter","in":"query","style":"deepObject","schema":{"type":"object","properties":{"age":{"type":"integer"},"active":{"type":"boolean"},"ids":{"type":"array","items":{"type":"integer"}}}},"required":false},"required":[]})`,
    )
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  // `explode: false` sends `filter=age,5`: the value is split into pairs before the object
  // is validated.
  // `explode: false` では `filter=age,5` が送られる。値は、オブジェクトが検証される前に
  // 名前と値のペアに分割される。
  it('splits a form object that does not explode into pairs', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(
      makeParameterSchema({
        name: 'filter',
        in: 'query',
        explode: false,
        schema: { type: 'object', properties: { age: { type: 'integer' } } },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>{if(typeof val!=='string')return val;const parts=val.split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))},z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()})).exactOptional().openapi({param:{"name":"filter","in":"query","explode":false,"schema":{"type":"object","properties":{"age":{"type":"integer"}}},"required":false},"required":[]})`,
    )
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  // An exploded object with no declared property has keys that cannot be told from those of
  // other parameters.
  // プロパティを宣言していない explode されたオブジェクトは、そのキーを他のパラメータの
  // キーと区別できない。
  it('warns about an exploded form object that declares no properties', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    makeParameterSchema({ name: 'filter', in: 'query', schema: { type: 'object' } })
    expect(warn).toHaveBeenCalledWith(
      'parameter "filter" (in: query) is an object the generated schema does not read: it declares no properties, so its keys cannot be told from those of other parameters. Declare each property as a parameter of its own, or send the object as `content: application/json`.',
    )
    warn.mockRestore()
  })

  // An object in a header is one value of alternating names and values.
  // ヘッダーのオブジェクトは、名前と値を交互に並べた1つの値である。
  it('splits a header object into pairs', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    expect(
      makeParameterSchema({
        name: 'x-filter',
        in: 'header',
        schema: { type: 'object', properties: { age: { type: 'integer' } } },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>{if(typeof val!=='string')return val;const parts=val.split(",").map((part)=>part.trim());if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))},z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()})).exactOptional().openapi({param:{"name":"x-filter","in":"header","schema":{"type":"object","properties":{"age":{"type":"integer"}}},"required":false},"required":[]})`,
    )
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  // `allowEmptyValue: true` lets `?page=` say the same as leaving page out. The empty value
  // is read as absent outside `.default()`, which only applies to a value that is missing.
  // The default is stated again outside, for a parameter that is not sent at all and so
  // never reaches the one inside.
  // `allowEmptyValue: true` の場合、`?page=` は page を省略したのと同じ意味になる。
  // 空の値は `.default()` の外側で「指定なし」として読み取られる。`.default()` は、
  // 値が欠落している場合にのみ適用されるためである。
  // デフォルト値は外側にも記述される。まったく送信されなかったパラメータは、
  // 内側のデフォルト値に到達しないためである。
  it('reads an allowed empty value as absent, outside the default', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        allowEmptyValue: true,
        schema: { type: 'integer', default: 1 },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).default(1)).default(1).exactOptional().openapi({param:{"name":"page","in":"query","allowEmptyValue":true,"schema":{"type":"integer","default":1},"required":false}})`,
    )
  })

  // Without a default the schema inside has to take the missing value it is handed.
  // デフォルト値がない場合、内側のスキーマは、渡された「値なし」を受理できなければならない。
  it('lets an optional parameter pass when its allowed empty value is read as absent', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        allowEmptyValue: true,
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).optional()).exactOptional().openapi({param:{"name":"page","in":"query","allowEmptyValue":true,"schema":{"type":"integer"},"required":false}})`,
    )
  })

  // A required parameter sent empty is a required parameter that is missing.
  // 空で送られた必須パラメータは、欠落している必須パラメータである。
  it('leaves a required parameter required when its empty value is read as absent', () => {
    expect(
      makeParameterSchema({
        name: 'page',
        in: 'query',
        required: true,
        allowEmptyValue: true,
        schema: { type: 'integer' },
      }),
    ).toContain(
      String.raw`z.preprocess((val)=>(val===''?undefined:val),z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int())).openapi({param:{"name":"page","in":"query","required":true,"allowEmptyValue":true,"schema":{"type":"integer"}}})`,
    )
  })

  // A scalar is one key of the request.
  // スカラーは、リクエストの1つのキーである。
  it('does not warn about a scalar parameter', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    makeParameterSchema({ name: 'page', in: 'query', schema: { type: 'integer' } })
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })

  // A JSON document is one key of the request too.
  // JSON 文書も、リクエストの1つのキーである。
  it('does not warn about an object sent as a JSON document', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    makeParameterSchema({
      name: 'filter',
      in: 'query',
      content: { 'application/json': { schema: { type: 'object' } } },
    })
    expect(warn).not.toHaveBeenCalled()
    warn.mockRestore()
  })
})

// `filter[age]=5` and an exploded `size=5` are keys of the query, not of the parameter they
// belong to, so the query gathers them before it validates.
// `filter[age]=5` や explode された `size=5` は、所属するパラメータのキーではなく、クエリの
// キーである。そのため、クエリは検証の前にそれらをまとめる。
describe('makeRequestParams: a query that gathers its objects', () => {
  // Without an object the query is a plain object.
  // オブジェクトがなければ、クエリは単純なオブジェクトである。
  it('emits a plain object for a query of scalars', () => {
    expect(
      makeRequestParams([{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }]),
    ).toBe(
      'query:z.object({q:z.string().openapi({param:{"name":"q","in":"query","required":true,"schema":{"type":"string"}}})})',
    )
  })

  // The keys `filter[...]` are gathered under `filter`.
  // `filter[...]` のキーは、`filter` の下にまとめられる。
  it('gathers the keys of a deepObject parameter', () => {
    expect(
      makeRequestParams([
        {
          name: 'filter',
          in: 'query',
          required: true,
          style: 'deepObject',
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      ]),
    ).toBe(
      String.raw`query:z.looseObject({}).transform((val)=>{const rest:[string,unknown][]=[];const groups=new Map<string,Record<string,unknown>>();const group=(name:string)=>{const found=groups.get(name);if(found!==undefined)return found;const made:Record<string,unknown>=Object.create(null);groups.set(name,made);return made};const isGroup=(item:unknown):item is Record<string,unknown>=>typeof item==='object'&&item!==null&&!Array.isArray(item);const set=(target:Record<string,unknown>,path:readonly string[],item:unknown):void=>{const [head,...tail]=path;if(head===undefined)return;if(tail.length===0){target[head]=item;return}const held=target[head];if(tail.length===1&&tail[0]===''){target[head]=[...(Array.isArray(held)?held:[]),...(Array.isArray(item)?item:[item])];return}const next:Record<string,unknown>=isGroup(held)?held:Object.create(null);target[head]=next;set(next,tail,item)};const deep:string[]=["filter"];for(const [key,item] of Object.entries(val)){const match=/^([^\[\]]+)((?:\[[^\[\]]*\])+)$/.exec(key);const name=match?.[1];const path=match?.[2];if(name!==undefined&&path!==undefined&&deep.includes(name)){set(group(name),path.slice(1,-1).split(']['),item);continue};rest.push([key,item])};return Object.fromEntries([...rest,...groups])}).pipe(z.object({filter:z.object({name:z.string().exactOptional()}).openapi({param:{"name":"filter","in":"query","required":true,"style":"deepObject","schema":{"type":"object","properties":{"name":{"type":"string"}}}},"required":[]})}))`,
    )
  })

  // The properties of an exploded object are keys of the query. `page` is a parameter of its
  // own as well, so it is never read as the property of `opts`.
  // explode されたオブジェクトのプロパティは、クエリのキーである。`page` は独立した
  // パラメータでもあるため、`opts` のプロパティとして読み取られることはない。
  it('gathers the properties of an exploded form object, leaving other parameters alone', () => {
    expect(
      makeRequestParams([
        {
          name: 'opts',
          in: 'query',
          schema: {
            type: 'object',
            properties: { size: { type: 'string' }, page: { type: 'string' } },
          },
        },
        { name: 'page', in: 'query', schema: { type: 'string' } },
      ]),
    ).toContain('const spread=new Map<string,string[]>([["size",["opts"]]]);')
  })

  // `explode: false` is one key, so there is nothing to gather.
  // `explode: false` は1つのキーなので、まとめるものはない。
  it('emits a plain object for a form object that does not explode', () => {
    expect(
      makeRequestParams([
        {
          name: 'filter',
          in: 'query',
          explode: false,
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      ]),
    ).not.toContain('z.looseObject')
  })
})

// A form body carries every field as text, or as a file. Nothing describes a body but its
// schema, so what reads the text has to be something the document looks through: a
// converter, where a parameter takes `z.stringbool()`.
// フォームボディは、すべてのフィールドを文字列またはファイルとして運ぶ。ボディを記述する
// ものはスキーマしかないため、文字列を読み取る処理は、ドキュメントがその先を参照できる
// ものでなければならない。パラメータでは `z.stringbool()` を使う箇所で、変換関数を使う。
describe('makeRequestBody: a form body', () => {
  // An integer field is read from text.
  // integer のフィールドは、文字列から読み取られる。
  it.concurrent('reads an integer field of a urlencoded body from text', () => {
    expect(
      makeRequestBody({
        content: {
          'application/x-www-form-urlencoded': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // `z.stringbool()` would be documented as a string, and the field is a boolean.
  // `z.stringbool()` はドキュメントに string として記載されるが、このフィールドは
  // boolean である。
  it.concurrent('reads a boolean field with a converter', () => {
    expect(
      makeRequestBody({
        content: {
          'multipart/form-data': {
            schema: { type: 'object', properties: { active: { type: 'boolean' } } },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'multipart/form-data':{schema:z.object({active:z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),z.boolean()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A field sent once arrives as a bare string, so an array field accepts both arities.
  // 1回だけ送られたフィールドは素の文字列として届くため、配列のフィールドは単一値と
  // 複数値の両方を受理する。
  it.concurrent('accepts both arities for an array field', () => {
    expect(
      makeRequestBody({
        content: {
          'application/x-www-form-urlencoded': {
            schema: {
              type: 'object',
              properties: { ids: { type: 'array', items: { type: 'integer' } } },
            },
          },
        },
      }),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({ids:z.preprocess((val)=>(val===undefined||Array.isArray(val)?val:[val]),z.array(z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()))).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A file is a file on the wire; there is nothing to read.
  // ファイルは、ワイヤ上でもファイルである。読み取るものはない。
  it.concurrent('leaves a file field as it is', () => {
    expect(
      makeRequestBody({
        content: {
          'multipart/form-data': {
            schema: {
              type: 'object',
              required: ['file'],
              properties: { file: { type: 'string', format: 'binary' } },
            },
          },
        },
      }),
    ).toBe(
      `{content:{'multipart/form-data':{schema:z.object({file:z.file().openapi({type:"string",format:"binary"})}).openapi({"required":["file"]})}}}`,
    )
  })

  // A component that is the body is written out in place, with fields that read text: the
  // component itself is shared with the bodies that arrive typed.
  // ボディそのものであるコンポーネントは、文字列を読み取るフィールドを持つ形で、その場に
  // 展開される。コンポーネント自体は、型付きで届くボディと共有されているためである。
  it.concurrent('writes a component form body out in place', () => {
    expect(
      makeRequestBody(
        {
          content: {
            'application/x-www-form-urlencoded': { schema: { $ref: '#/components/schemas/Node' } },
          },
        },
        undefined,
        schemas,
      ),
    ).toBe(
      String.raw`{content:{'application/x-www-form-urlencoded':{schema:z.object({size:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional(),next:NodeSchema.exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // The media type is matched whatever its case and its parameters.
  // メディアタイプは、大文字小文字やパラメータの有無にかかわらず判定される。
  it.concurrent('recognises a form media type with a parameter', () => {
    expect(
      makeRequestBody({
        content: {
          'Multipart/Form-Data; boundary=x': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toContain(
      String.raw`{content:{'Multipart/Form-Data; boundary=x':{schema:z.object({age:z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional()}).openapi({"required":[]})}}}`,
    )
  })

  // A JSON body has types of its own.
  // JSON ボディは、自身で型を持つ。
  it.concurrent('leaves a JSON body typed', () => {
    expect(
      makeRequestBody({
        content: {
          'application/json': {
            schema: { type: 'object', properties: { age: { type: 'integer' } } },
          },
        },
      }),
    ).toBe(
      `{content:{'application/json':{schema:z.object({age:z.int().exactOptional()}).openapi({"required":[]})}}}`,
    )
  })
})

// A response is written by the server, which sends typed values whatever the media type.
// レスポンスはサーバーが書き出すものであり、メディアタイプにかかわらず型付きの値を送る。
describe('makeContent: a form media type outside a request body', () => {
  // Without the request marker nothing is read from text.
  // リクエストであることを示す指定がなければ、文字列から読み取るものはない。
  it.concurrent('leaves the content of a response typed', () => {
    expect(
      makeContent({
        'application/x-www-form-urlencoded': {
          schema: { type: 'object', properties: { age: { type: 'integer' } } },
        },
      }),
    ).toStrictEqual([
      `'application/x-www-form-urlencoded':{schema:z.object({age:z.int().exactOptional()}).openapi({"required":[]})}`,
    ])
  })
})
