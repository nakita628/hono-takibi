import { describe, expect, it } from 'vite-plus/test'

import type { Schema } from '../openapi/index.js'
import {
  inlineWireRefs,
  isEmptyAbsent,
  isObjectParameter,
  needsWireConversion,
  resolveSchemaRef,
  wireConverter,
  wireGather,
  wireKeep,
  wireKinds,
  wireObject,
  wireStyle,
  wrapWire,
} from './wire.js'

// The component schemas the references below point at.
// 以下の参照が指すコンポーネントスキーマ。
const schemas: { readonly [k: string]: Schema } = {
  Count: { type: 'integer', minimum: 0 },
  CountAlias: { $ref: '#/components/schemas/Count' },
  Big: { type: 'integer', format: 'int64' },
  Flag: { type: 'boolean' },
  Name: { type: 'string' },
  Level: { enum: [1, 'low'] },
  Counts: { type: 'array', items: { type: 'integer' } },
  Names: { type: 'array', items: { type: 'string' } },
  Loop: { $ref: '#/components/schemas/Loop' },
  Page: { type: 'object', properties: { size: { type: 'integer' } } },
  Pages: { type: 'array', items: { $ref: '#/components/schemas/Page' } },
  Node: {
    type: 'object',
    properties: { size: { type: 'integer' }, next: { $ref: '#/components/schemas/Node' } },
  },
}

describe('resolveSchemaRef', () => {
  // A reference to a component schema is looked up by its name.
  // コンポーネントスキーマへの参照は、名前で検索される。
  it.concurrent('resolves a component schema', () => {
    expect(resolveSchemaRef('#/components/schemas/Count', schemas)).toStrictEqual({
      type: 'integer',
      minimum: 0,
    })
  })

  // A name that is percent-encoded in the reference is decoded first.
  // 参照内でパーセントエンコードされた名前は、先にデコードされる。
  it.concurrent('decodes the name of the component', () => {
    expect(resolveSchemaRef('#/components/schemas/My%20Count', { 'My Count': {} })).toStrictEqual(
      {},
    )
  })

  // Only component schemas are resolved: a parameter is not a schema.
  // 解決されるのはコンポーネントスキーマだけである。パラメータはスキーマではない。
  it.concurrent('does not resolve a reference to another section', () => {
    expect(resolveSchemaRef('#/components/parameters/Count', schemas)).toBeUndefined()
  })

  // A reference into a component (`.../Page/properties/size`) names no component.
  // コンポーネントの内部を指す参照(`.../Page/properties/size`)は、コンポーネント名ではない。
  it.concurrent('does not resolve a reference into a component', () => {
    expect(resolveSchemaRef('#/components/schemas/Page/properties/size', schemas)).toBeUndefined()
  })

  // A name the document does not define.
  // 文書が定義していない名前。
  it.concurrent('does not resolve a name that is not defined', () => {
    expect(resolveSchemaRef('#/components/schemas/Missing', schemas)).toBeUndefined()
  })

  // No component schemas at all.
  // コンポーネントスキーマが一切ない場合。
  it.concurrent('does not resolve without component schemas', () => {
    expect(resolveSchemaRef('#/components/schemas/Count', undefined)).toBeUndefined()
  })
})

describe('wireKinds', () => {
  // An integer is read with the integer grammar.
  // integer は、整数の文法で読み取られる。
  it.concurrent('reads type: integer as integer', () => {
    expect(wireKinds({ type: 'integer' }, schemas)).toStrictEqual(['integer'])
  })

  // int32 is a number in JavaScript, so it is an integer on the wire too.
  // int32 は JavaScript では number なので、ワイヤ上でも integer である。
  it.concurrent('reads format: int32 as integer', () => {
    expect(wireKinds({ type: 'integer', format: 'int32' }, schemas)).toStrictEqual(['integer'])
  })

  // int64 does not fit a number: the generated schema is a bigint one.
  // int64 は number に収まらない。生成されるスキーマは bigint である。
  it.concurrent('reads format: int64 as bigint', () => {
    expect(wireKinds({ type: 'integer', format: 'int64' }, schemas)).toStrictEqual(['bigint'])
  })

  // The same for uint64.
  // uint64 でも同様である。
  it.concurrent('reads format: uint64 as bigint', () => {
    expect(wireKinds({ type: 'integer', format: 'uint64' }, schemas)).toStrictEqual(['bigint'])
  })

  // The same for the bigint format.
  // bigint フォーマットでも同様である。
  it.concurrent('reads format: bigint as bigint', () => {
    expect(wireKinds({ type: 'integer', format: 'bigint' }, schemas)).toStrictEqual(['bigint'])
  })

  // A number is read with the number grammar.
  // number は、数値の文法で読み取られる。
  it.concurrent('reads type: number as number', () => {
    expect(wireKinds({ type: 'number' }, schemas)).toStrictEqual(['number'])
  })

  // A boolean is read from its spellings.
  // boolean は、その表記から読み取られる。
  it.concurrent('reads type: boolean as boolean', () => {
    expect(wireKinds({ type: 'boolean' }, schemas)).toStrictEqual(['boolean'])
  })

  // A string is the text itself.
  // string は、文字列そのものである。
  it.concurrent('reads type: string as string', () => {
    expect(wireKinds({ type: 'string' }, schemas)).toStrictEqual(['string'])
  })

  // The wire has no spelling for null, so null adds no kind.
  // ワイヤ上には null を表す表記がないため、null は種別を増やさない。
  it.concurrent('ignores null in a type list', () => {
    expect(wireKinds({ type: ['integer', 'null'] }, schemas)).toStrictEqual(['integer'])
  })

  // `type: [integer, string]` accepts a value of either type, so the text is read as any
  // of them.
  // `type: [integer, string]` はいずれの型の値も受理するため、文字列はそのいずれとしても
  // 読み取られる。
  it.concurrent('reads every type of a type list', () => {
    expect(wireKinds({ type: ['integer', 'string'] }, schemas)).toStrictEqual(['integer', 'string'])
  })

  // A type that is an array beside a scalar one still has the scalar reading.
  // スカラーの型と並んで配列の型がある場合も、スカラーとしての読み取りは残る。
  it.concurrent('reads the scalar types of a list that holds an array', () => {
    expect(wireKinds({ type: ['integer', 'array'] }, schemas)).toStrictEqual(['integer'])
  })

  // An array is not a scalar.
  // 配列はスカラーではない。
  it.concurrent('has no kinds for an array', () => {
    expect(wireKinds({ type: 'array', items: { type: 'integer' } }, schemas)).toBeUndefined()
  })

  // An object is not a scalar.
  // オブジェクトはスカラーではない。
  it.concurrent('has no kinds for an object', () => {
    expect(wireKinds({ type: 'object' }, schemas)).toBeUndefined()
  })

  // Properties without a type are an object all the same.
  // type がなくても、properties があればオブジェクトである。
  it.concurrent('has no kinds for properties without a type', () => {
    expect(wireKinds({ properties: { size: { type: 'integer' } } }, schemas)).toBeUndefined()
  })

  // A boolean schema (`true`, `false`) accepts or rejects everything; there is nothing to
  // read.
  // boolean スキーマ(`true`・`false`)は、すべてを受理または拒否する。読み取る対象がない。
  it.concurrent('has no kinds for a boolean schema', () => {
    expect(wireKinds(true, schemas)).toBeUndefined()
  })

  // `x-coerce` asks for `z.coerce` by name, so the schema manages its own input.
  // `x-coerce` は `z.coerce` を明示的に指定するものなので、スキーマが自身の入力を扱う。
  it.concurrent('has no kinds for a schema with x-coerce', () => {
    expect(wireKinds({ type: 'integer', 'x-coerce': true }, schemas)).toBeUndefined()
  })

  // `x-stringbool` makes the schema `z.stringbool()` itself, which takes the text as it is.
  // Reading the text before it would hand it a boolean, which it rejects.
  // `x-stringbool` を指定したスキーマは `z.stringbool()` そのものになり、文字列をそのまま
  // 受け取る。その手前で文字列を読み取ると boolean が渡され、拒否されてしまう。
  it.concurrent('has no kinds for a schema with x-stringbool', () => {
    expect(wireKinds({ type: 'boolean', 'x-stringbool': true }, schemas)).toBeUndefined()
  })

  // A user-supplied chain replaces the generated schema wholesale.
  // ユーザー指定のチェーンは、生成されるスキーマを丸ごと置き換える。
  it.concurrent('has no kinds for a schema with x-transform', () => {
    expect(
      wireKinds({ type: 'integer', 'x-transform': 'z.string().transform(Number)' }, schemas),
    ).toBeUndefined()
  })

  // A reference has the kinds of the component it names.
  // 参照は、それが指すコンポーネントの種別を持つ。
  it.concurrent('follows a reference to an integer', () => {
    expect(wireKinds({ $ref: '#/components/schemas/Count' }, schemas)).toStrictEqual(['integer'])
  })

  // A reference to a reference is followed to its end.
  // 参照への参照は、末端までたどられる。
  it.concurrent('follows a reference to a reference', () => {
    expect(wireKinds({ $ref: '#/components/schemas/CountAlias' }, schemas)).toStrictEqual([
      'integer',
    ])
  })

  // A reference to an array is not a scalar.
  // 配列への参照は、スカラーではない。
  it.concurrent('has no kinds for a reference to an array', () => {
    expect(wireKinds({ $ref: '#/components/schemas/Counts' }, schemas)).toBeUndefined()
  })

  // What a reference names is unknown without the component.
  // コンポーネントがなければ、参照先が何であるかは分からない。
  it.concurrent('has no kinds for a reference that does not resolve', () => {
    expect(wireKinds({ $ref: '#/components/schemas/Missing' }, schemas)).toBeUndefined()
  })

  // A reference that names itself never reaches a schema.
  // 自分自身を指す参照は、スキーマに到達しない。
  it.concurrent('has no kinds for a reference that names itself', () => {
    expect(wireKinds({ $ref: '#/components/schemas/Loop' }, schemas)).toBeUndefined()
  })

  // Every branch of an allOf has to hold, so the value is of a kind all of them read. A
  // typeless `minimum` reads a number or text; an integer is a number, so integer is left.
  // allOf はすべての分岐を満たす必要があるため、値は全分岐が読み取る種別になる。
  // 型のない `minimum` は number または文字列を読み取る。integer は number の一種なので、
  // integer が残る。
  it.concurrent('intersects the branches of an allOf', () => {
    expect(wireKinds({ allOf: [{ type: 'integer' }, { minimum: 5 }] }, schemas)).toStrictEqual([
      'integer',
    ])
  })

  // No value is both an integer and a string.
  // integer であり、かつ string でもある値は存在しない。
  it.concurrent('has no kinds for an allOf whose branches share none', () => {
    expect(wireKinds({ allOf: [{ type: 'integer' }, { type: 'string' }] }, schemas)).toBeUndefined()
  })

  // One branch is enough for a oneOf, so the value is of a kind any of them reads.
  // oneOf は分岐1つを満たせばよいため、値はいずれかの分岐が読み取る種別になる。
  it.concurrent('unites the branches of a oneOf', () => {
    expect(wireKinds({ oneOf: [{ type: 'integer' }, { type: 'string' }] }, schemas)).toStrictEqual([
      'integer',
      'string',
    ])
  })

  // The same for an anyOf.
  // anyOf でも同様である。
  it.concurrent('unites the branches of an anyOf', () => {
    expect(wireKinds({ anyOf: [{ type: 'number' }, { type: 'boolean' }] }, schemas)).toStrictEqual([
      'number',
      'boolean',
    ])
  })

  // One branch that is not a scalar leaves the whole union without kinds.
  // スカラーでない分岐が1つでもあると、union 全体が種別を持たない。
  it.concurrent('has no kinds for a oneOf with an array branch', () => {
    expect(
      wireKinds(
        { oneOf: [{ type: 'integer' }, { type: 'array', items: { type: 'integer' } }] },
        schemas,
      ),
    ).toBeUndefined()
  })

  // The members of an enum say what it takes.
  // enum が受理するものは、そのメンバーで決まる。
  it.concurrent('reads the kinds of the members of an enum', () => {
    expect(wireKinds({ enum: [1, 'a', true] }, schemas)).toStrictEqual([
      'integer',
      'string',
      'boolean',
    ])
  })

  // A member with a fraction makes the enum a number one.
  // 小数部を持つメンバーがあれば、その enum は number である。
  it.concurrent('reads a fractional member as number', () => {
    expect(wireKinds({ enum: [1.5] }, schemas)).toStrictEqual(['number'])
  })

  // null has no spelling on the wire.
  // null には、ワイヤ上の表記がない。
  it.concurrent('ignores a null member', () => {
    expect(wireKinds({ enum: [1, null] }, schemas)).toStrictEqual(['integer'])
  })

  // A member that is an array cannot be written as one piece of text.
  // 配列であるメンバーは、1つの文字列としては書けない。
  it.concurrent('has no kinds for an enum with an array member', () => {
    expect(wireKinds({ enum: [[1, 2]] }, schemas)).toBeUndefined()
  })

  // The value of a const says what it takes.
  // const が受理するものは、その値で決まる。
  it.concurrent('reads the kind of a const', () => {
    expect(wireKinds({ const: true }, schemas)).toStrictEqual(['boolean'])
  })

  // `type: number, const: 2` is met by "2.0" as much as by "2", so the whole literal is read
  // with the number grammar.
  // `type: number, const: 2` は "2" だけでなく "2.0" でも満たされるため、
  // 整数のリテラルも数値の文法で読み取られる。
  it.concurrent('reads a whole const of type: number as number', () => {
    expect(wireKinds({ type: 'number', const: 2 }, schemas)).toStrictEqual(['number'])
  })

  // A const of null takes nothing the wire can spell.
  // null の const は、ワイヤ上で表記できる値を何も受理しない。
  it.concurrent('has no kind to read for a const of null', () => {
    expect(wireKinds({ const: null }, schemas)).toStrictEqual([])
  })

  // The type beside `not` says what the value is.
  // `not` と並ぶ type が、値の種別を決める。
  it.concurrent('reads the type beside not', () => {
    expect(wireKinds({ type: 'integer', not: { const: 0 } }, schemas)).toStrictEqual(['integer'])
  })

  // With no type the value can be any scalar. A boolean the schema does not ask for is
  // `truth`: only `true` and `false` spell it.
  // type がなければ、値は任意のスカラーになりうる。スキーマが要求していない boolean は
  // `truth` として扱われ、`true` と `false` だけがその表記になる。
  it.concurrent('reads any scalar for not without a type', () => {
    expect(wireKinds({ not: { enum: [1, 2] } }, schemas)).toStrictEqual([
      'number',
      'truth',
      'string',
    ])
  })

  // A schema that names no type takes a value of any type. `minimum` bounds a number and
  // says nothing about text, so the text is tried as each.
  // 型を指定しないスキーマは、任意の型の値を受理する。`minimum` は数値を制約し、文字列に
  // ついては何も規定しない。そのため、文字列はそれぞれの型として順に試される。
  it.concurrent('reads a typeless numeric keyword as any scalar', () => {
    expect(wireKinds({ minimum: 1 }, schemas)).toStrictEqual(['number', 'truth', 'string'])
  })

  // `minLength` measures a string and says nothing about a number, so digits are valid as
  // the number they spell.
  // `minLength` は文字列の長さを測り、数値については何も規定しない。そのため、数字の並びは
  // それが表す数値として有効である。
  it.concurrent('reads a typeless text keyword as any scalar', () => {
    expect(wireKinds({ minLength: 3 }, schemas)).toStrictEqual(['number', 'truth', 'string'])
  })

  // A typeless array keyword describes an array.
  // 型のない配列用キーワードは、配列を記述している。
  it.concurrent('has no kinds for a typeless array keyword', () => {
    expect(wireKinds({ minItems: 1 }, schemas)).toBeUndefined()
  })

  // A schema that says nothing takes the text as it is.
  // 何も指定しないスキーマは、文字列をそのまま受理する。
  it.concurrent('reads an empty schema as string', () => {
    expect(wireKinds({}, schemas)).toStrictEqual(['string'])
  })
})

describe('wireKeep', () => {
  // In `enum: [1, "2"]` the text "2" is a member already. Reading it as the number 2 would
  // turn a valid value into an invalid one.
  // `enum: [1, "2"]` では、文字列 "2" がすでにメンバーである。number の 2 として読み取ると、
  // 有効な値が不正な値になってしまう。
  it.concurrent('keeps the string members of an enum', () => {
    expect(wireKeep({ enum: [1, 'a', '2'] }, schemas)).toStrictEqual(['a', '2'])
  })

  // The same for a string const.
  // string の const でも同様である。
  it.concurrent('keeps a string const', () => {
    expect(wireKeep({ const: '1' }, schemas)).toStrictEqual(['1'])
  })

  // A number const is not text.
  // number の const は文字列ではない。
  it.concurrent('keeps nothing for a number const', () => {
    expect(wireKeep({ const: 1 }, schemas)).toStrictEqual([])
  })

  // The members are found behind a reference.
  // メンバーは、参照経由でも見つかる。
  it.concurrent('keeps the string members behind a reference', () => {
    expect(wireKeep({ $ref: '#/components/schemas/Level' }, schemas)).toStrictEqual(['low'])
  })

  // The members of every branch are collected, each once.
  // 全分岐のメンバーが集められる。同じものは1度だけ含まれる。
  it.concurrent('keeps the string members of every branch', () => {
    expect(
      wireKeep(
        { oneOf: [{ type: 'integer' }, { enum: ['all', 'none'] }, { const: 'all' }] },
        schemas,
      ),
    ).toStrictEqual(['all', 'none'])
  })

  // A reference that names itself holds no members.
  // 自分自身を指す参照は、メンバーを持たない。
  it.concurrent('keeps nothing for a reference that names itself', () => {
    expect(wireKeep({ $ref: '#/components/schemas/Loop' }, schemas)).toStrictEqual([])
  })
})

describe('needsWireConversion', () => {
  // An integer has to be read from text.
  // integer は、文字列から読み取る必要がある。
  it.concurrent('is true for an integer', () => {
    expect(needsWireConversion({ type: 'integer' }, schemas)).toBe(true)
  })

  // A string is the text itself.
  // string は、文字列そのものである。
  it.concurrent('is false for a string', () => {
    expect(needsWireConversion({ type: 'string' }, schemas)).toBe(false)
  })

  // An array of integers holds elements to read.
  // integer の配列は、読み取るべき要素を持つ。
  it.concurrent('is true for a reference to an array of integers', () => {
    expect(needsWireConversion({ $ref: '#/components/schemas/Counts' }, schemas)).toBe(true)
  })

  // An array of strings holds none, so the reference can stay a reference.
  // string の配列は読み取るべき要素を持たないため、参照は参照のままでよい。
  it.concurrent('is false for a reference to an array of strings', () => {
    expect(needsWireConversion({ $ref: '#/components/schemas/Names' }, schemas)).toBe(false)
  })

  // A property of an object is looked at too.
  // オブジェクトのプロパティも確認される。
  it.concurrent('is true for an object with an integer property', () => {
    expect(needsWireConversion({ $ref: '#/components/schemas/Page' }, schemas)).toBe(true)
  })

  // A reference that does not resolve is left as it is.
  // 解決できない参照は、そのまま残される。
  it.concurrent('is false for a reference that does not resolve', () => {
    expect(needsWireConversion({ $ref: '#/components/schemas/Missing' }, schemas)).toBe(false)
  })

  // A reference that names itself is left as it is.
  // 自分自身を指す参照は、そのまま残される。
  it.concurrent('is false for a reference that names itself', () => {
    expect(needsWireConversion({ $ref: '#/components/schemas/Loop' }, schemas)).toBe(false)
  })
})

describe('wireConverter', () => {
  // An optional minus sign and digits, and nothing else: no "+", no whitespace, no "0x10",
  // no "1e3", no empty text. An integer beyond 2^53 is left as text, because a number cannot
  // hold it.
  // 任意のマイナス記号と数字だけを受け付ける。"+"・空白・"0x10"・"1e3"・空文字列は
  // 受け付けない。2^53 を超える整数は number で保持できないため、文字列のまま残される。
  it.concurrent('reads an integer with a decimal grammar', () => {
    expect(wireConverter(['integer'])).toBe(
      String.raw`(val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val)`,
    )
  })

  // A number may leave out the digits on one side of its point and carry an exponent. Text
  // that is a whole number is held to the safe-integer range like an integer.
  // number は、小数点の片側の数字を省略でき、指数部を持てる。整数の文字列には、
  // integer と同じく安全な整数の範囲が適用される。
  it.concurrent('reads a number with a decimal grammar', () => {
    expect(wireConverter(['number'])).toBe(
      String.raw`(val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val)`,
    )
  })

  // A bigint holds every digit, so there is no range to check.
  // bigint はすべての桁を保持できるため、範囲の確認は不要である。
  it.concurrent('reads a bigint with the integer grammar', () => {
    expect(wireConverter(['bigint'])).toBe(
      String.raw`(val)=>{if(typeof val!=='string'||!/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val))return val;if(/^-?\d+$/.test(val))return BigInt(val);const num=Number(val);return Number.isSafeInteger(num)?BigInt(num):val}`,
    )
  })

  // A string is the text itself.
  // string は、文字列そのものである。
  it.concurrent('has nothing to convert for a string', () => {
    expect(wireConverter(['string'])).toBeUndefined()
  })

  // No kinds at all.
  // 種別が1つもない場合。
  it.concurrent('has nothing to convert for no kinds', () => {
    expect(wireConverter([])).toBeUndefined()
  })

  // What spells a boolean is Zod's to say. `z.stringbool()` is built once, when the schema
  // is, and asked on every value; text it does not read is handed on as it is.
  // 何が boolean の表記であるかは、Zod が決める。`z.stringbool()` はスキーマの生成時に
  // 1度だけ作られ、値ごとに問い合わせを受ける。読み取れない文字列は、そのまま渡される。
  it.concurrent('reads a boolean with z.stringbool()', () => {
    expect(wireConverter(['boolean'])).toBe(
      '((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool())',
    )
  })

  // Beside a string the number is read the same way; what is not a number stays text.
  // string と並ぶ場合も、number は同じ方法で読み取られる。数値でないものは文字列のままである。
  it.concurrent('reads an integer beside a string', () => {
    expect(wireConverter(['integer', 'string'])).toBe(
      String.raw`(val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val)`,
    )
  })

  // "1" and "0" spell a number and a boolean. The number is tried first, so they are
  // numbers; the words are booleans.
  // "1" と "0" は、number と boolean の両方の表記である。number が先に試されるため、
  // これらは number になる。単語は boolean になる。
  it.concurrent('tries the number before the boolean', () => {
    expect(wireConverter(['integer', 'boolean'])).toBe(
      String.raw`((readers)=>(val:unknown)=>{for(const read of readers){const result=read(val);if(result!==val)return result}return val})([(val:unknown)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool())])`,
    )
  })

  // Text that is a member as it stands is handed on before anything is read.
  // そのままでメンバーである文字列は、読み取りの前にそのまま渡される。
  it.concurrent('hands kept text on unchanged', () => {
    expect(wireConverter(['integer', 'string'], ['2'])).toBe(
      String.raw`((readers)=>(val:unknown)=>{if(["2"].includes(val))return val;for(const read of readers){const result=read(val);if(result!==val)return result}return val})([(val:unknown)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val)])`,
    )
  })
})

describe('wrapWire', () => {
  // The converter goes around the schema, which is written for a typed value.
  // 変換関数は、型付きの値を前提に書かれたスキーマの外側に置かれる。
  it.concurrent('wraps a schema in a converting preprocess', () => {
    expect(wrapWire('CountSchema', ['integer'])).toBe(
      String.raw`z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),CountSchema)`,
    )
  })

  // An inline schema that only takes booleans is read by `z.stringbool()`.
  // boolean だけを受理するインラインのスキーマは、`z.stringbool()` で読み取られる。
  it.concurrent('pipes an inline boolean schema through z.stringbool()', () => {
    expect(wrapWire('z.literal(true)', ['boolean'])).toBe('z.stringbool().pipe(z.literal(true))')
  })

  // `z.stringbool()` is a pipe of its own, and the document reads a pipe by its input. A
  // component is read by a converter instead, which the document looks through.
  // `z.stringbool()` はそれ自体が pipe であり、ドキュメントは pipe を入力側で読む。
  // コンポーネントは代わりに変換関数で読み取られ、ドキュメントはその先を参照できる。
  it.concurrent('reads a boolean component with a converter', () => {
    expect(wrapWire('FlagSchema', ['boolean'], true)).toBe(
      'z.preprocess(((read)=>(val:unknown)=>{const result=read.safeParse(val);return result.success?result.data:val})(z.stringbool()),FlagSchema)',
    )
  })

  // Nothing to convert, nothing to wrap.
  // 変換するものがなければ、包むものもない。
  it.concurrent('leaves a string schema as it is', () => {
    expect(wrapWire('NameSchema', ['string'])).toBe('NameSchema')
  })
})

describe('wireStyle', () => {
  // `style: form` with `explode: true` is the default of a query parameter: the name is
  // repeated, and a one-element array arrives as a bare string. An absent parameter stays
  // `undefined`, so that it is reported as missing and `.default()` can apply.
  // `style: form` + `explode: true` は、クエリパラメータのデフォルトである。名前が繰り返され、
  // 1要素の配列は素の文字列として届く。省略されたパラメータは `undefined` のままなので、
  // 欠落として報告され、`.default()` も適用できる。
  it.concurrent('accepts both arities for a query array', () => {
    expect(wireStyle({ name: 'ids', in: 'query' }, true)).toBe(
      '(val)=>(val===undefined||Array.isArray(val)?val:[val])',
    )
  })

  // `explode: false` sends the elements in one value, separated by commas.
  // `explode: false` では、要素はカンマ区切りの1つの値として送られる。
  it.concurrent('splits a query array with explode: false on commas', () => {
    expect(wireStyle({ name: 'ids', in: 'query', explode: false }, true)).toBe(
      `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(","):[item])))`,
    )
  })

  // `pipeDelimited` separates with a pipe, and does not explode unless it says so.
  // `pipeDelimited` はパイプで区切る。明示しない限り explode はされない。
  it.concurrent('splits a pipeDelimited query array on pipes', () => {
    expect(wireStyle({ name: 'ids', in: 'query', style: 'pipeDelimited' }, true)).toBe(
      `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split("|"):[item])))`,
    )
  })

  // `spaceDelimited` separates with a space.
  // `spaceDelimited` は空白で区切る。
  it.concurrent('splits a spaceDelimited query array on spaces', () => {
    expect(wireStyle({ name: 'ids', in: 'query', style: 'spaceDelimited' }, true)).toBe(
      `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(" "):[item])))`,
    )
  })

  // With `explode: true` a delimited style repeats the name like `form` does.
  // `explode: true` の場合、区切り形式のスタイルも `form` と同じく名前を繰り返す。
  it.concurrent('accepts both arities for a pipeDelimited query array that explodes', () => {
    expect(
      wireStyle({ name: 'ids', in: 'query', style: 'pipeDelimited', explode: true }, true),
    ).toBe('(val)=>(val===undefined||Array.isArray(val)?val:[val])')
  })

  // A scalar query parameter is sent as it is.
  // スカラーのクエリパラメータは、そのまま送られる。
  it.concurrent('undoes nothing for a query scalar', () => {
    expect(wireStyle({ name: 'id', in: 'query' }, false)).toBeUndefined()
  })

  // A header array is `style: simple`: comma-separated, with optional whitespace after each
  // comma.
  // ヘッダーの配列は `style: simple` である。カンマ区切りで、各カンマの後に任意の空白を置ける。
  it.concurrent('splits a header array on commas and trims each value', () => {
    expect(wireStyle({ name: 'x-ids', in: 'header' }, true)).toBe(
      `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(",").map((part)=>part.trim()):[item])))`,
    )
  })

  // A cookie name appears once, so several values can only travel comma-separated in one
  // cookie, whatever `explode` says.
  // Cookie 名は1度しか現れないため、複数の値は `explode` の指定にかかわらず、
  // 1つの Cookie にカンマ区切りで運ぶしかない。
  it.concurrent('splits a cookie array on commas', () => {
    expect(wireStyle({ name: 'ids', in: 'cookie' }, true)).toBe(
      `(val)=>(val===undefined?val:(Array.isArray(val)?val:[val]).flatMap((item)=>(typeof item==='string'?item.split(","):[item])))`,
    )
  })

  // A path array is `style: simple` by default: one segment, comma-separated.
  // パスの配列は、デフォルトで `style: simple` である。カンマ区切りの1つのセグメントになる。
  it.concurrent('splits a path array on commas', () => {
    expect(wireStyle({ name: 'ids', in: 'path' }, true)).toBe(
      `(val)=>(typeof val==='string'?val.split(','):val)`,
    )
  })

  // A path scalar in `style: simple` is sent as it is.
  // `style: simple` のパスのスカラーは、そのまま送られる。
  it.concurrent('undoes nothing for a path scalar', () => {
    expect(wireStyle({ name: 'id', in: 'path' }, false)).toBeUndefined()
  })

  // `style: label` puts a dot in front of the value, on a scalar as well.
  // `style: label` は、スカラーであっても値の先頭にドットを付ける。
  it.concurrent('strips the dot of a label scalar', () => {
    expect(wireStyle({ name: 'id', in: 'path', style: 'label' }, false)).toBe(
      `(val)=>(typeof val!=='string'?val:val.startsWith(".")?val.slice(1):undefined)`,
    )
  })

  // Without `explode` the elements after the dot are separated by commas.
  // `explode` なしの場合、ドットに続く要素はカンマで区切られる。
  it.concurrent('splits a label array on commas', () => {
    expect(wireStyle({ name: 'ids', in: 'path', style: 'label' }, true)).toBe(
      `(val)=>(typeof val!=='string'?val:(val.startsWith(".")?val.slice(1):undefined)?.split(","))`,
    )
  })

  // With `explode: true` the dot separates the elements.
  // `explode: true` では、ドットが要素の区切りになる。
  it.concurrent('splits an exploded label array on dots', () => {
    expect(wireStyle({ name: 'ids', in: 'path', style: 'label', explode: true }, true)).toBe(
      `(val)=>(typeof val!=='string'?val:(val.startsWith(".")?val.slice(1):undefined)?.split("."))`,
    )
  })

  // `style: matrix` puts `;name=` in front of the value.
  // `style: matrix` は、値の先頭に `;name=` を付ける。
  it.concurrent('strips the name prefix of a matrix scalar', () => {
    expect(wireStyle({ name: 'id', in: 'path', style: 'matrix' }, false)).toBe(
      `(val)=>(typeof val!=='string'?val:val===";id"?'':val.startsWith(";id=")?val.slice(4):undefined)`,
    )
  })

  // Without `explode` the name appears once and the elements are separated by commas.
  // `explode` なしの場合、名前は1度だけ現れ、要素はカンマで区切られる。
  it.concurrent('splits a matrix array on commas', () => {
    expect(wireStyle({ name: 'ids', in: 'path', style: 'matrix' }, true)).toBe(
      `(val)=>(typeof val!=='string'?val:(val===";ids"?'':val.startsWith(";ids=")?val.slice(5):undefined)?.split(","))`,
    )
  })

  // With `explode: true` every element carries the name.
  // `explode: true` では、すべての要素に名前が付く。
  it.concurrent('splits an exploded matrix array on the repeated name', () => {
    expect(wireStyle({ name: 'ids', in: 'path', style: 'matrix', explode: true }, true)).toBe(
      `(val)=>(typeof val!=='string'?val:(val===";ids"?'':val.startsWith(";ids=")?val.slice(5):undefined)?.split(";ids="))`,
    )
  })

  // The name is compared as text, so nothing in it has a meaning of its own.
  // 名前は文字列として比較されるため、名前の中の文字が特別な意味を持つことはない。
  it.concurrent('takes a matrix name that is not plain text as it is', () => {
    expect(wireStyle({ name: 'user.id', in: 'path', style: 'matrix' }, false)).toBe(
      `(val)=>(typeof val!=='string'?val:val===";user.id"?'':val.startsWith(";user.id=")?val.slice(9):undefined)`,
    )
  })

  // A `content` parameter is one encoded document, not a serialised list.
  // `content` パラメータは1つのエンコードされた文書であり、シリアライズされたリストではない。
  it.concurrent('undoes nothing for a content parameter', () => {
    expect(
      wireStyle(
        {
          name: 'list',
          in: 'query',
          content: { 'application/json': { schema: { type: 'array' } } },
        },
        true,
      ),
    ).toBeUndefined()
  })
})

// What a parameter documents has to be what it emits. Where the emitter writes a component
// out in place, the document shows the component written out too.
// パラメータがドキュメントに記載する内容は、出力する内容と一致しなければならない。
// エミッタがコンポーネントをその場に展開する箇所では、ドキュメントも展開された形を示す。
describe('inlineWireRefs', () => {
  // A scalar component is converted from outside and stays a reference.
  // スカラーのコンポーネントは外側から変換されるため、参照のままである。
  it.concurrent('keeps a reference to a scalar', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Count' }, schemas)).toStrictEqual({
      $ref: '#/components/schemas/Count',
    })
  })

  // An array of integers is written out in place.
  // integer の配列は、その場に展開される。
  it.concurrent('replaces a reference to an array of integers', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Counts' }, schemas)).toStrictEqual({
      type: 'array',
      items: { type: 'integer' },
    })
  })

  // An array of strings holds nothing to read, so the emitter leaves the reference.
  // string の配列には読み取るべき要素がないため、エミッタは参照をそのまま残す。
  it.concurrent('keeps a reference to an array of strings', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Names' }, schemas)).toStrictEqual({
      $ref: '#/components/schemas/Names',
    })
  })

  // The elements of an inline array are scalar components: they stay references.
  // インライン配列の要素がスカラーのコンポーネントである場合、参照のままである。
  it.concurrent('keeps a scalar reference inside an inline array', () => {
    expect(
      inlineWireRefs({ type: 'array', items: { $ref: '#/components/schemas/Count' } }, schemas),
    ).toStrictEqual({ type: 'array', items: { $ref: '#/components/schemas/Count' } })
  })

  // Pages is an array of Page, an object: both are written out.
  // Pages は、オブジェクトである Page の配列である。両方とも展開される。
  it.concurrent('replaces a reference inside a replaced component', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Pages' }, schemas)).toStrictEqual({
      type: 'array',
      items: { type: 'object', properties: { size: { type: 'integer' } } },
    })
  })

  // Node holds a Node. The first level is written out and the one inside it stays a
  // reference, as in the emitted schema.
  // Node は Node を保持する。出力されるスキーマと同じく、1段目は展開され、
  // その内側は参照のままである。
  it.concurrent('stops at a component that refers to itself', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Node' }, schemas)).toStrictEqual({
      type: 'object',
      properties: { size: { type: 'integer' }, next: { $ref: '#/components/schemas/Node' } },
    })
  })

  // A default beside the reference belongs to the parameter, not to the component: the
  // component is written out with the default beside it.
  // 参照と並ぶ default は、コンポーネントではなくパラメータに属する。
  // コンポーネントは展開され、default はその隣に置かれる。
  it.concurrent('replaces a scalar reference that carries a default', () => {
    expect(
      inlineWireRefs({ $ref: '#/components/schemas/Count', default: 3 }, schemas),
    ).toStrictEqual({ type: 'integer', minimum: 0, default: 3 })
  })

  // What the reference names is unknown, so it is left as it is.
  // 参照先が不明なため、そのまま残される。
  it.concurrent('keeps a reference that does not resolve', () => {
    expect(inlineWireRefs({ $ref: '#/components/schemas/Missing' }, schemas)).toStrictEqual({
      $ref: '#/components/schemas/Missing',
    })
  })
})

describe('wireObject', () => {
  // `style: deepObject` spells each property as a key of its own, `filter[size]=5`.
  // `style: deepObject` は、各プロパティを独立したキー `filter[size]=5` として表記する。
  it.concurrent('reads a deepObject parameter as deep', () => {
    expect(
      wireObject(
        {
          name: 'filter',
          in: 'query',
          style: 'deepObject',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      ),
    ).toStrictEqual({ name: 'filter', how: 'deep', properties: ['size'] })
  })

  // An object with no style is `style: form` with `explode: true`, the default of a query
  // parameter: the properties are keys of the query themselves.
  // style の指定がないオブジェクトは、クエリパラメータのデフォルトである `style: form` +
  // `explode: true` になる。プロパティ自体がクエリのキーになる。
  it.concurrent('reads a form object as spread by default', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'query',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      ),
    ).toStrictEqual({ name: 'opts', how: 'spread', properties: ['size'] })
  })

  // `explode: false` sends one value alternating names and values, `opts=size,5`. A value
  // that does not pair up is handed on as the text it is, for the schema to reject.
  // `explode: false` は、名前と値を交互に並べた1つの値 `opts=size,5` を送る。
  // ペアにならない値は、文字列のまま渡され、スキーマによって拒否される。
  it.concurrent('reads a form object that does not explode as one value of pairs', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'query',
          explode: false,
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      ),
    ).toStrictEqual({
      name: 'opts',
      how: 'value',
      properties: ['size'],
      reader: `(val)=>{if(typeof val!=='string')return val;const parts=val.split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    })
  })

  // `pipeDelimited` separates the names and values with a pipe.
  // `pipeDelimited` は、名前と値をパイプで区切る。
  it.concurrent('reads a pipeDelimited object as pairs separated by pipes', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'query',
          style: 'pipeDelimited',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;const parts=val.split("|");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    )
  })

  // The object is found behind a reference.
  // オブジェクトは、参照経由でも見つかる。
  it.concurrent('reads an object behind a reference', () => {
    expect(
      wireObject(
        {
          name: 'page',
          in: 'query',
          style: 'deepObject',
          schema: { $ref: '#/components/schemas/Page' },
        },
        schemas,
      ),
    ).toStrictEqual({ name: 'page', how: 'deep', properties: ['size'] })
  })

  // Properties without a type are an object all the same.
  // type がなくても、properties があればオブジェクトである。
  it.concurrent('reads properties without a type as an object', () => {
    expect(
      wireObject(
        { name: 'opts', in: 'query', schema: { properties: { size: { type: 'integer' } } } },
        schemas,
      ),
    ).toStrictEqual({ name: 'opts', how: 'spread', properties: ['size'] })
  })

  // With no declared property the keys of an exploded object cannot be told from those of
  // other parameters.
  // プロパティの宣言がなければ、explode されたオブジェクトのキーを他のパラメータのキーと
  // 区別できない。
  it.concurrent('does not read an exploded form object without properties', () => {
    expect(
      wireObject({ name: 'opts', in: 'query', schema: { type: 'object' } }, schemas),
    ).toBeUndefined()
  })

  // A deepObject carries the name of the parameter in every key, so it needs no declared
  // property.
  // deepObject は、すべてのキーにパラメータ名が含まれるため、プロパティの宣言を必要としない。
  it.concurrent('reads a deepObject parameter without properties', () => {
    expect(
      wireObject(
        { name: 'opts', in: 'query', style: 'deepObject', schema: { type: 'object' } },
        schemas,
      ),
    ).toStrictEqual({ name: 'opts', how: 'deep', properties: [] })
  })

  // A header is `style: simple`: names and values alternate, with optional whitespace after
  // each comma.
  // ヘッダーは `style: simple` である。名前と値が交互に並び、各カンマの後に任意の空白を置ける。
  it.concurrent('reads a header object as pairs', () => {
    expect(
      wireObject(
        {
          name: 'x-opts',
          in: 'header',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      ),
    ).toStrictEqual({
      name: 'x-opts',
      how: 'value',
      properties: ['size'],
      reader: `(val)=>{if(typeof val!=='string')return val;const parts=val.split(",").map((part)=>part.trim());if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    })
  })

  // With `explode: true` each part is `name=value`. A part with no `=` is handed on as the
  // text it is.
  // `explode: true` では、各部分が `name=value` になる。`=` のない部分は、文字列のまま渡される。
  it.concurrent('reads an exploded header object as assignments', () => {
    expect(
      wireObject(
        {
          name: 'x-opts',
          in: 'header',
          explode: true,
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;const parts=val.split(",").map((part)=>part.trim());const entries=parts.flatMap((part)=>{const at=part.indexOf('=');return at<0?[]:[[part.slice(0,at),part.slice(at+1)]]});if(entries.length!==parts.length)return val;return Object.fromEntries(entries)}`,
    )
  })

  // A path segment is `style: simple` by default, like a header, without the whitespace.
  // パスのセグメントは、デフォルトでヘッダーと同じ `style: simple` である。空白は入らない。
  it.concurrent('reads a path object as pairs', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'path',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;const parts=val.split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    )
  })

  // `style: label` puts a dot in front, and with `explode: true` separates the assignments
  // with one.
  // `style: label` は先頭にドットを付け、`explode: true` では代入同士もドットで区切る。
  it.concurrent('reads an exploded label object as assignments separated by dots', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'path',
          style: 'label',
          explode: true,
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;if(!val.startsWith("."))return undefined;const parts=val.slice(1).split(".");const entries=parts.flatMap((part)=>{const at=part.indexOf('=');return at<0?[]:[[part.slice(0,at),part.slice(at+1)]]});if(entries.length!==parts.length)return val;return Object.fromEntries(entries)}`,
    )
  })

  // `style: matrix` puts `;name=` in front of the pairs.
  // `style: matrix` は、ペアの先頭に `;name=` を付ける。
  it.concurrent('reads a matrix object as pairs behind its name', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'path',
          style: 'matrix',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;if(!val.startsWith(";opts="))return undefined;const parts=val.slice(6).split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    )
  })

  // With `explode: true` every property is `;name=value`, and the name of the parameter
  // does not appear.
  // `explode: true` では、各プロパティが `;name=value` になり、パラメータ名は現れない。
  it.concurrent('reads an exploded matrix object as assignments separated by semicolons', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'path',
          style: 'matrix',
          explode: true,
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;if(!val.startsWith(";"))return undefined;const parts=val.slice(1).split(";");const entries=parts.flatMap((part)=>{const at=part.indexOf('=');return at<0?[]:[[part.slice(0,at),part.slice(at+1)]]});if(entries.length!==parts.length)return val;return Object.fromEntries(entries)}`,
    )
  })

  // A cookie explodes by default: each property is a cookie of its own.
  // Cookie は、デフォルトで explode される。各プロパティが独立した Cookie になる。
  it.concurrent('reads a cookie object as spread by default', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'cookie',
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      ),
    ).toStrictEqual({
      name: 'opts',
      how: 'spread',
      properties: ['size'],
    })
  })

  // With `explode: false` the cookie holds the pairs.
  // `explode: false` では、Cookie がペアを保持する。
  it.concurrent('reads a cookie object that does not explode as pairs', () => {
    expect(
      wireObject(
        {
          name: 'opts',
          in: 'cookie',
          explode: false,
          schema: { type: 'object', properties: { size: { type: 'integer' } } },
        },
        schemas,
      )?.reader,
    ).toBe(
      `(val)=>{if(typeof val!=='string')return val;const parts=val.split(",");if(parts.length%2!==0)return val;return Object.fromEntries(parts.flatMap((part,i)=>(i%2===0?[[part,parts[i+1]]]:[])))}`,
    )
  })

  // A scalar is not an object.
  // スカラーはオブジェクトではない。
  it.concurrent('does not read a scalar', () => {
    expect(
      wireObject({ name: 'size', in: 'query', schema: { type: 'integer' } }, schemas),
    ).toBeUndefined()
  })
})

describe('isObjectParameter', () => {
  // Whatever its location, the parameter is an object.
  // 場所にかかわらず、このパラメータはオブジェクトである。
  it.concurrent('is true for an object in a header', () => {
    expect(
      isObjectParameter({ name: 'x-opts', in: 'header', schema: { type: 'object' } }, schemas),
    ).toBe(true)
  })

  // An array is not an object.
  // 配列はオブジェクトではない。
  it.concurrent('is false for an array', () => {
    expect(
      isObjectParameter(
        { name: 'ids', in: 'query', schema: { type: 'array', items: { type: 'integer' } } },
        schemas,
      ),
    ).toBe(false)
  })

  // A parameter declared with `content` has no schema of its own.
  // `content` で宣言されたパラメータは、自身の schema を持たない。
  it.concurrent('is false for a content parameter', () => {
    expect(
      isObjectParameter(
        {
          name: 'opts',
          in: 'query',
          content: { 'application/json': { schema: { type: 'object' } } },
        },
        schemas,
      ),
    ).toBe(false)
  })
})

describe('wireGather', () => {
  // Nothing is spread over several keys.
  // 複数のキーに分散しているものがない場合。
  it.concurrent('has nothing to gather without objects', () => {
    expect(wireGather([], ['page'])).toBeUndefined()
  })

  // An object that is one value is one key of the request.
  // 1つの値であるオブジェクトは、リクエストの1つのキーである。
  it.concurrent('has nothing to gather for an object that is one value', () => {
    expect(
      wireGather([{ name: 'opts', how: 'value', properties: ['size'], reader: '(val)=>val' }], []),
    ).toBeUndefined()
  })

  // A key is matched as `name[property]`, with the name one of the deepObject parameters.
  // キーは `name[property]` の形で照合され、name は deepObject パラメータのいずれかである。
  it.concurrent('gathers the keys of a deepObject parameter', () => {
    expect(wireGather([{ name: 'filter', how: 'deep', properties: ['size'] }], [])).toBe(
      String.raw`(val)=>{const rest:[string,unknown][]=[];const groups=new Map<string,Record<string,unknown>>();const group=(name:string)=>{const found=groups.get(name);if(found!==undefined)return found;const made:Record<string,unknown>=Object.create(null);groups.set(name,made);return made};const isGroup=(item:unknown):item is Record<string,unknown>=>typeof item==='object'&&item!==null&&!Array.isArray(item);const set=(target:Record<string,unknown>,path:readonly string[],item:unknown):void=>{const [head,...tail]=path;if(head===undefined)return;if(tail.length===0){target[head]=item;return}const held=target[head];if(tail.length===1&&tail[0]===''){target[head]=[...(Array.isArray(held)?held:[]),...(Array.isArray(item)?item:[item])];return}const next:Record<string,unknown>=isGroup(held)?held:Object.create(null);target[head]=next;set(next,tail,item)};const deep:string[]=["filter"];for(const [key,item] of Object.entries(val)){const match=/^([^\[\]]+)((?:\[[^\[\]]*\])+)$/.exec(key);const name=match?.[1];const path=match?.[2];if(name!==undefined&&path!==undefined&&deep.includes(name)){set(group(name),path.slice(1,-1).split(']['),item);continue};rest.push([key,item])};return Object.fromEntries([...rest,...groups])}`,
    )
  })

  // A key is looked up among the declared properties, each of which names its owner.
  // キーは宣言済みのプロパティから検索され、各プロパティはその所有者を示す。
  it.concurrent('gathers the properties of an exploded form object', () => {
    expect(wireGather([{ name: 'opts', how: 'spread', properties: ['sort', 'size'] }], [])).toBe(
      `(val)=>{const rest:[string,unknown][]=[];const groups=new Map<string,Record<string,unknown>>();const group=(name:string)=>{const found=groups.get(name);if(found!==undefined)return found;const made:Record<string,unknown>=Object.create(null);groups.set(name,made);return made};const spread=new Map<string,string[]>([["sort",["opts"]],["size",["opts"]]]);for(const [key,item] of Object.entries(val)){const owners=spread.get(key);if(owners!==undefined){for(const owner of owners){group(owner)[key]=item}continue};rest.push([key,item])};return Object.fromEntries([...rest,...groups])}`,
    )
  })

  // A key that is a parameter of its own is never read as the property of an object.
  // 独立したパラメータであるキーは、オブジェクトのプロパティとして読み取られることはない。
  it.concurrent('leaves out a property that another parameter takes', () => {
    expect(
      wireGather([{ name: 'opts', how: 'spread', properties: ['sort', 'page'] }], ['page']),
    ).toContain('const spread=new Map<string,string[]>([["sort",["opts"]]]);')
  })

  // Every property is taken by another parameter, so nothing is left to gather.
  // すべてのプロパティが他のパラメータに使われているため、まとめるものが残らない。
  it.concurrent('has nothing to gather when every property is taken', () => {
    expect(
      wireGather([{ name: 'opts', how: 'spread', properties: ['page'] }], ['page']),
    ).toBeUndefined()
  })
})

describe('isEmptyAbsent', () => {
  // `allowEmptyValue: true` lets `?page=` say the same as leaving page out.
  // `allowEmptyValue: true` の場合、`?page=` は page を省略したのと同じ意味になる。
  it.concurrent('is true for an integer that allows an empty value', () => {
    expect(
      isEmptyAbsent(
        { name: 'page', in: 'query', allowEmptyValue: true, schema: { type: 'integer' } },
        schemas,
      ),
    ).toBe(true)
  })

  // The empty string is a value of a string.
  // 空文字列は、string の値の1つである。
  it.concurrent('is false for a string', () => {
    expect(
      isEmptyAbsent(
        { name: 'q', in: 'query', allowEmptyValue: true, schema: { type: 'string' } },
        schemas,
      ),
    ).toBe(false)
  })

  // Without the keyword an empty value is a value, and not a number.
  // このキーワードがなければ、空の値は値として扱われ、数値ではない。
  it.concurrent('is false without allowEmptyValue', () => {
    expect(isEmptyAbsent({ name: 'page', in: 'query', schema: { type: 'integer' } }, schemas)).toBe(
      false,
    )
  })

  // OpenAPI defines the keyword for a query parameter only.
  // OpenAPI は、このキーワードをクエリパラメータに対してのみ定義している。
  it.concurrent('is false outside a query', () => {
    expect(
      isEmptyAbsent(
        { name: 'x-page', in: 'header', allowEmptyValue: true, schema: { type: 'integer' } },
        schemas,
      ),
    ).toBe(false)
  })
})
