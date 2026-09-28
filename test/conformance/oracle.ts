// What the OpenAPI document says, read without the generator. The conformance test asks
// this file whether a value is valid and asks the generated code the same question; where
// the two disagree, the generated code does not do what the document says.
//
// The document is OpenAPI 3.1, whose schemas are JSON Schema 2020-12. The keywords are
// implemented here straight from that specification, each in a few lines, so that the
// answer does not pass through any code the generator shares.
//
// OpenAPI ドキュメントの内容を、生成器を介さずに読み取る。適合性テストは、ある値が有効か
// どうかをこのファイルに問い合わせ、同じ問いを生成コードにも投げる。両者の答えが
// 食い違う箇所では、生成コードがドキュメントどおりに動いていない。
//
// ドキュメントは OpenAPI 3.1 であり、そのスキーマは JSON Schema 2020-12 である。各キーワードは
// その仕様に基づいて、ここで数行ずつ実装している。答えが、生成器と共有するコードを
// 一切通らないようにするためである。

export type Json =
  | null
  | boolean
  | number
  | string
  | readonly Json[]
  | { readonly [k: string]: Json }

type Schemas = { readonly [k: string]: unknown }

function isRecord(value: unknown): value is { readonly [k: string]: unknown } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isJsonObject(value: Json): value is { readonly [k: string]: Json } {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

/**
 * Whether two JSON values are the same value. Objects are compared by their keys, in any
 * order; arrays element by element.
 *
 * 2つの JSON 値が同じ値であるかを判定する。オブジェクトは順序を問わずキーで比較し、
 * 配列は要素ごとに比較する。
 */
export function isSame(a: Json, b: Json): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && a.every((item, i) => isSame(item, b[i] ?? null))
  }
  if (isJsonObject(a) && isJsonObject(b)) {
    const keys = Object.keys(a)
    return (
      keys.length === Object.keys(b).length &&
      keys.every((key) => key in b && isSame(a[key] ?? null, b[key] ?? null))
    )
  }
  return a === b
}

function isOfType(type: unknown, value: Json): boolean {
  if (type === 'null') return value === null
  if (type === 'boolean') return typeof value === 'boolean'
  if (type === 'string') return typeof value === 'string'
  if (type === 'number') return typeof value === 'number'
  if (type === 'integer') return typeof value === 'number' && Number.isInteger(value)
  if (type === 'array') return Array.isArray(value)
  if (type === 'object') return isJsonObject(value)
  return false
}

/**
 * Follows a `$ref` to the component schema it names.
 * `$ref` をたどり、それが指すコンポーネントスキーマを返す。
 */
export function resolve(schema: unknown, schemas: Schemas): unknown {
  if (!isRecord(schema) || typeof schema['$ref'] !== 'string') return schema
  const name = schema['$ref'].replace('#/components/schemas/', '')
  return resolve(schemas[name], schemas)
}

/**
 * Whether a value is valid under a schema, by JSON Schema 2020-12. A keyword that applies
 * to another type than the value's is satisfied, as the specification says: `minimum` says
 * nothing about a string.
 *
 * JSON Schema 2020-12 に基づき、値がスキーマに対して有効かどうかを判定する。値の型とは別の
 * 型に適用されるキーワードは、仕様のとおり、満たされたものとして扱う。`minimum` は、
 * 文字列については何も規定しない。
 */
export function accepts(schema: unknown, value: Json, schemas: Schemas): boolean {
  if (schema === true) return true
  if (schema === false) return false
  if (!isRecord(schema)) return true
  if (typeof schema['$ref'] === 'string') return accepts(resolve(schema, schemas), value, schemas)
  const valid = (child: unknown, item: Json) => accepts(child, item, schemas)

  const type = schema['type']
  if (type !== undefined) {
    const types: readonly unknown[] = Array.isArray(type) ? type : [type]
    if (!types.some((one) => isOfType(one, value))) return false
  }
  const members = schema['enum']
  if (Array.isArray(members) && !members.some((member: Json) => isSame(member, value))) {
    return false
  }
  if ('const' in schema && !isSame(schema['const'] as Json, value)) return false

  if (typeof value === 'number') {
    const { minimum, maximum, exclusiveMinimum, exclusiveMaximum, multipleOf } = schema
    if (typeof minimum === 'number' && value < minimum) return false
    if (typeof maximum === 'number' && value > maximum) return false
    if (typeof exclusiveMinimum === 'number' && value <= exclusiveMinimum) return false
    if (typeof exclusiveMaximum === 'number' && value >= exclusiveMaximum) return false
    if (typeof multipleOf === 'number' && !Number.isInteger(value / multipleOf)) return false
    // `format: int32` bounds an integer to 32 bits (OpenAPI 3.1, data type formats).
    if (schema['format'] === 'int32' && (value < -2147483648 || value > 2147483647)) return false
  }
  if (typeof value === 'string') {
    const { minLength, maxLength, pattern } = schema
    // The length of a string is counted in characters, not in UTF-16 code units.
    // oxlint-disable-next-line typescript/no-misused-spread -- code points are what JSON Schema counts
    const length = [...value].length
    if (typeof minLength === 'number' && length < minLength) return false
    if (typeof maxLength === 'number' && length > maxLength) return false
    if (typeof pattern === 'string' && !new RegExp(pattern, 'u').test(value)) return false
  }
  if (Array.isArray(value)) {
    const items: readonly Json[] = value
    const { minItems, maxItems, uniqueItems } = schema
    const prefix: readonly unknown[] = Array.isArray(schema['prefixItems'])
      ? schema['prefixItems']
      : []
    if (typeof minItems === 'number' && items.length < minItems) return false
    if (typeof maxItems === 'number' && items.length > maxItems) return false
    if (
      uniqueItems === true &&
      items.some((item, i) => items.some((other, j) => j < i && isSame(item, other)))
    ) {
      return false
    }
    if (!items.every((item, i) => (i < prefix.length ? valid(prefix[i], item) : true))) {
      return false
    }
    if (
      'items' in schema &&
      !items.slice(prefix.length).every((item) => valid(schema['items'], item))
    ) {
      return false
    }
  }
  if (isJsonObject(value)) {
    const properties = isRecord(schema['properties']) ? schema['properties'] : {}
    const required: readonly unknown[] = Array.isArray(schema['required']) ? schema['required'] : []
    if (!required.every((key) => typeof key === 'string' && key in value)) return false
    for (const [key, item] of Object.entries(value)) {
      if (key in properties) {
        if (!valid(properties[key], item)) return false
      } else if ('additionalProperties' in schema) {
        if (!valid(schema['additionalProperties'], item)) return false
      }
    }
  }

  const allOf = schema['allOf']
  if (Array.isArray(allOf) && !allOf.every((branch) => valid(branch, value))) return false
  const anyOf = schema['anyOf']
  if (Array.isArray(anyOf) && !anyOf.some((branch) => valid(branch, value))) return false
  const oneOf = schema['oneOf']
  if (Array.isArray(oneOf) && oneOf.filter((branch) => valid(branch, value)).length !== 1) {
    return false
  }
  if ('not' in schema && valid(schema['not'], value)) return false
  return true
}

/**
 * Every number and every string a schema mentions: the members of its enums, its
 * constants, its bounds. The values next to them are where a schema changes its answer, so
 * they are what is worth sending.
 *
 * スキーマに現れるすべての数値と文字列(enum のメンバー・定数・境界値)を集める。
 * スキーマの判定が切り替わるのはこれらの値の近傍なので、送信する価値があるのは
 * その周辺の値である。
 */
export function mentioned(
  schema: unknown,
  schemas: Schemas,
  seen: readonly unknown[] = [],
): Json[] {
  const target = resolve(schema, schemas)
  if (seen.includes(target)) return []
  if (Array.isArray(target)) {
    return target.flatMap((item: unknown) => mentioned(item, schemas, [...seen, target]))
  }
  if (isRecord(target)) {
    return Object.entries(target).flatMap(([key, item]) =>
      key === 'pattern' || key === 'format' || key === 'type' || key === 'required'
        ? []
        : mentioned(item, schemas, [...seen, target]),
    )
  }
  return typeof target === 'number' || typeof target === 'string' ? [target] : []
}
