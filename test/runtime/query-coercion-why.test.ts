// Why hono-takibi reads query and path parameters the way it does: a comparison against
// naive Zod schemas. This file is an explanation that runs. What the generator does with every
// shape is proved in test/path-params and test/query-params; here the point is why.
//
// HTTP has no types: every query and path value reaches the validator as a string ("10",
// "true", "9007199254740993"). Each route definition below is followed by the tests that
// exercise it:
//   1. naive schemas (z.number(), z.boolean(), z.bigint())
//        reject requests that are perfectly valid per the OpenAPI spec
//   2. naive coercion (z.coerce.boolean(), z.coerce.number())
//        accepts, but silently produces WRONG values ("false" becomes true, an int64
//        loses precision, an empty value becomes 0, "0x10" becomes 16)
//   3. what hono-takibi generates, embedded VERBATIM from
//      __generated__/validation/routes.ts (generated from specs/coercion.yaml)
//        accepts and produces correct values, and still rejects garbage
//   4. the embedded copies are held against the imported generated artifact: identical
//      requests must yield identical responses, so the code you read in section 3 cannot
//      drift from what the generator emits today.
//
// hono-takibi がクエリ・パスパラメータを現在の方法で読み取る理由を、素朴な Zod スキーマとの
// 比較で示す。このファイルは「実行できる解説」である。生成器が各形状をどう扱うかは
// test/path-params と test/query-params で検証しており、ここで示すのは「なぜ」である。
//
// HTTP には型がない。クエリやパスの値は、すべて文字列("10"・"true"・"9007199254740993")
// としてバリデータに届く。以下では、各ルート定義の直後に、それを検証するテストを置く。
//   1. 素朴なスキーマ(z.number()・z.boolean()・z.bigint())
//        OpenAPI 仕様上は完全に有効なリクエストを、拒否してしまう
//   2. 素朴な coerce(z.coerce.boolean()・z.coerce.number())
//        受理はするが、黙って「誤った値」を生成する("false" が true になる、int64 が
//        桁落ちする、空の値が 0 になる、"0x10" が 16 になる)
//   3. hono-takibi が生成するコード。__generated__/validation/routes.ts(specs/coercion.yaml
//      から生成)を「そのまま」埋め込んでいる
//        受理して正しい値を生成し、不正な値は引き続き拒否する
//   4. 埋め込んだコピーを、import した生成物と突き合わせる。同一のリクエストに対して
//      同一のレスポンスを返さなければならないため、セクション 3 のコードが、現在の
//      生成器の出力からずれることはない。

import { OpenAPIHono, createRoute, z } from '@hono/zod-openapi'
import { describe, expect, it } from 'vite-plus/test'

import {
  getCoerceIdRoute as generatedCoerceIdRoute,
  getSearchRoute as generatedSearchRoute,
} from '../__generated__/validation/routes'

// ─────────────────────────────────────────────────────────────
// 1. Naive schemas: z.number() / z.boolean() / z.bigint()
//    素朴なスキーマ: z.number() / z.boolean() / z.bigint()
// ─────────────────────────────────────────────────────────────

const naiveSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      limit: z.number().int(),
      active: z.boolean(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const naiveSearchApp = new OpenAPIHono().openapi(naiveSearchRoute, (c) => {
  const { limit, active } = c.req.valid('query')
  return c.json({ limit, active })
})

describe('1a. naive z.number() / z.boolean() query params reject valid requests', () => {
  // limit=5 and active=true are valid by the spec. z.number() and z.boolean() receive the
  // strings "5" and "true", which are neither a number nor a boolean.
  // limit=5 と active=true は、仕様上は有効である。
  // しかし z.number() と z.boolean() が受け取るのは文字列の "5" と "true" であり、
  // number でも boolean でもない。
  it('a spec-valid request is rejected with 400 because query values are strings', async () => {
    const res = await naiveSearchApp.request('/search?limit=10&active=true')
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: { message: string } }
    const issues = JSON.parse(body.error.message) as {
      path: readonly string[]
      code: string
      expected: string
    }[]
    expect(
      issues.map((issue) => `${issue.path.join('.')}: ${issue.code} (expected ${issue.expected})`),
    ).toStrictEqual([
      'limit: invalid_type (expected number)',
      'active: invalid_type (expected boolean)',
    ])
  })
})

const naiveIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  request: {
    params: z.object({
      id: z.bigint(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const naiveIdApp = new OpenAPIHono().openapi(naiveIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idValue: String(id) })
})

describe('1b. naive z.bigint() path param rejects valid requests', () => {
  // z.bigint() receives the string "42", not a bigint.
  // z.bigint() が受け取るのは、bigint ではなく文字列の "42" である。
  it('a numeric path segment is rejected with 400 because it arrives as a string', async () => {
    const res = await naiveIdApp.request('/coerce/1')
    expect(res.status).toBe(400)
    const body = (await res.json()) as { error: { message: string } }
    const issues = JSON.parse(body.error.message) as { path: readonly string[]; code: string }[]
    expect(issues.map((issue) => `${issue.path.join('.')}: ${issue.code}`)).toStrictEqual([
      'id: invalid_type',
    ])
  })
})

// ─────────────────────────────────────────────────────────────
// 2. Naive coercion: z.coerce.boolean() / z.coerce.number()
//    素朴な coerce: z.coerce.boolean() / z.coerce.number()
// ─────────────────────────────────────────────────────────────

const coerceBoolRoute = createRoute({
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      active: z.coerce.boolean(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const coerceBoolApp = new OpenAPIHono().openapi(coerceBoolRoute, (c) => {
  const { active } = c.req.valid('query')
  return c.json({ active })
})

describe('2a. z.coerce.boolean() accepts but silently corrupts', () => {
  // z.coerce.boolean() is Boolean(value), and every non-empty string is truthy. The request
  // says false and the handler receives true, with no error: the worst kind of failure.
  // z.coerce.boolean() は Boolean(value) と同じであり、空でない文字列はすべて truthy である。
  // リクエストは false を指定しているのに、ハンドラは true を受け取り、エラーも発生しない。
  // 最も厄介な種類の不具合である。
  it('turns "false" into true (Boolean("false") is truthy)', async () => {
    const res = await coerceBoolApp.request('/search?active=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ active: true })
  })
})

const coerceNumberIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  request: {
    params: z.object({
      // No .int(): zod v4's .int() rejects values outside the safe-integer range,
      // which would mask the precision-loss failure mode shown below.
      // .int() は付けない。zod v4 の .int() は安全な整数の範囲外の値を拒否するため、
      // 以下で示す桁落ちの不具合が隠れてしまう。
      id: z.coerce.number(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const coerceNumberIdApp = new OpenAPIHono().openapi(coerceNumberIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id })
})

describe('2b. z.coerce.number() accepts int64 but silently loses precision', () => {
  // z.coerce.number() is Number(value), and a double cannot hold 2^53 + 1. The handler receives
  // another id than the one requested, with no error.
  // z.coerce.number() は Number(value) と同じであり、double は 2^53 + 1 を保持できない。
  // ハンドラは、リクエストされたものとは別の id を受け取り、エラーも発生しない。
  it('2^53 + 1 comes out as 2^53 — off by one, no error', async () => {
    const res = await coerceNumberIdApp.request('/coerce/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ id: 2 ** 53 })
  })
})

const coerceLimitRoute = createRoute({
  method: 'get',
  path: '/search',
  request: {
    query: z.object({
      limit: z.coerce.number().int(),
    }),
  },
  responses: { 200: { description: 'ok' } },
})

const coerceLimitApp = new OpenAPIHono().openapi(coerceLimitRoute, (c) => {
  const { limit } = c.req.valid('query')
  return c.json({ limit })
})

describe('2c. z.coerce.number() reads text that is not a number', () => {
  // Number("") is 0. The client sent no number at all, and the handler receives one.
  // Number("") は 0 である。クライアントは数値を一切送っていないのに、
  // ハンドラは数値を受け取る。
  it('an empty value comes out as 0', async () => {
    const res = await coerceLimitApp.request('/search?limit=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ limit: 0 })
  })

  // Number(" ") is 0 as well.
  // Number(" ") も 0 である。
  it('whitespace comes out as 0', async () => {
    const res = await coerceLimitApp.request('/search?limit=%20')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ limit: 0 })
  })

  // Number reads the literals of JavaScript source code, which a parameter never means.
  // Number は JavaScript のソースコード用のリテラルも読み取る。
  // パラメータがそれを意図することはない。
  it('a hexadecimal literal comes out as 16', async () => {
    const res = await coerceLimitApp.request('/search?limit=0x10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ limit: 16 })
  })
})

// ─────────────────────────────────────────────────────────────
// 3. What hono-takibi generates.
// The two route definitions below are embedded VERBATIM from
// __generated__/validation/routes.ts; section 4 pins them against
// the imported artifact so this copy cannot silently drift.
//    hono-takibi が生成するコード。
// 以下の2つのルート定義は、__generated__/validation/routes.ts を「そのまま」埋め込んだ
// ものである。セクション 4 で import した生成物と突き合わせるため、このコピーが
// 気付かれずにずれることはない。
// ─────────────────────────────────────────────────────────────

const getCoerceIdRoute = createRoute({
  method: 'get',
  path: '/coerce/{id}',
  operationId: 'coercePathId',
  request: {
    params: z.object({
      id: z
        .preprocess(
          (val) => (typeof val === 'string' && /^-?\d+$/.test(val) ? BigInt(val) : val),
          z.int64(),
        )
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int64' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Coerced path param echo',
      content: {
        'application/json': {
          schema: z
            .object({ idType: z.string(), idValue: z.string() })
            .openapi({ required: ['idType', 'idValue'] }),
        },
      },
    },
  },
})

const embeddedCoerceIdApp = new OpenAPIHono().openapi(getCoerceIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idType: typeof id, idValue: String(id) })
})

describe('3a. generated z.preprocess(text to bigint, z.int64()) path param', () => {
  // The generated schema reads decimal text as a bigint, which holds the value exactly.
  // 生成されたスキーマは、10進の文字列を bigint として読み取るため、値が正確に保持される。
  it('preserves int64 exactly where 2b lost precision', async () => {
    const res = await embeddedCoerceIdApp.request('/coerce/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      idType: 'bigint',
      idValue: '9007199254740993',
    })
  })

  // Reading text does not mean accepting anything: a word is handed on as the text it is,
  // and z.int64() rejects it.
  // 文字列を読み取るからといって、何でも受理するわけではない。単語は文字列のまま渡され、
  // z.int64() によって拒否される。
  it('rejects non-numeric garbage with 400', async () => {
    const res = await embeddedCoerceIdApp.request('/coerce/abc')
    expect(res.status).toBe(400)
  })

  // BigInt("0x10") is 16n. The generated schema matches the text against a decimal grammar
  // before it converts, so the literal is rejected.
  // BigInt("0x10") は 16n である。生成されたスキーマは、変換の前に文字列を10進の文法と
  // 照合するため、このリテラルは拒否される。
  it('rejects a hexadecimal literal with 400', async () => {
    const res = await embeddedCoerceIdApp.request('/coerce/0x10')
    expect(res.status).toBe(400)
  })
})

const getSearchRoute = createRoute({
  method: 'get',
  path: '/search',
  operationId: 'search',
  request: {
    query: z.object({
      limit: z
        .preprocess(
          (val) =>
            typeof val === 'string' && /^-?\d+$/.test(val) && Number.isSafeInteger(Number(val))
              ? Number(val)
              : val,
          z.int(),
        )
        .default(10)
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', default: 10 },
          },
        }),
      active: z.stringbool().openapi({
        param: { name: 'active', in: 'query', required: true, schema: { type: 'boolean' } },
      }),
      ids: z
        .preprocess(
          (val) => (val === undefined || Array.isArray(val) ? val : [val]),
          z.array(
            z.preprocess(
              (val) =>
                typeof val === 'string' && /^-?\d+$/.test(val) && Number.isSafeInteger(Number(val))
                  ? Number(val)
                  : val,
              z.int(),
            ),
          ),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'ids',
            in: 'query',
            required: false,
            schema: { type: 'array', items: { type: 'integer' } },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'Coerced query echo',
      content: {
        'application/json': {
          schema: z
            .object({
              limit: z.number(),
              limitType: z.string(),
              activeType: z.string(),
              idsTypes: z.array(z.string()),
            })
            .openapi({ required: ['limit', 'limitType', 'activeType', 'idsTypes'] }),
        },
      },
    },
  },
})

// The generated route also declares the 200 echo schema (limit/limitType/activeType/
// idsTypes), so the handler must return that exact shape — value-level proof for the
// boolean is asserted directly against the route's query schema below.
// 生成されたルートは、200 のエコー用スキーマ(limit/limitType/activeType/idsTypes)も
// 宣言している。そのため、ハンドラはその形どおりに返す必要がある。boolean の値そのものは、
// 以下でルートのクエリスキーマに対して直接検証する。
const embeddedSearchApp = new OpenAPIHono().openapi(getSearchRoute, (c) => {
  const { limit, active, ids } = c.req.valid('query')
  return c.json({
    limit: limit ?? -1,
    limitType: typeof limit,
    activeType: typeof active,
    idsTypes: (ids ?? []).map((value) => typeof value),
  })
})

describe('3b. generated z.preprocess(text to number, z.int()) / z.stringbool() query params', () => {
  // The generated schema uses z.stringbool(), which reads the word, not its truthiness.
  // 生成されたスキーマは z.stringbool() を使う。これは truthy かどうかではなく、
  // 単語そのものを読み取る。
  it('the query schema parses "false" to false — the value 2a corrupted', () => {
    expect(getSearchRoute.request.query.parse({ active: 'false' })).toStrictEqual({
      limit: 10,
      active: false,
    })
  })

  // Every value is read as its declared type, the array element by element.
  // すべての値が、宣言された型として読み取られる。配列は、要素ごとに読み取られる。
  it('the query schema parses explicit values: "5" → 5, "true" → true, ids → [1, 2]', () => {
    expect(
      getSearchRoute.request.query.parse({ active: 'true', limit: '5', ids: ['1', '2'] }),
    ).toStrictEqual({ limit: 5, active: true, ids: [1, 2] })
  })

  // The same over a real request. limit is not sent, so its default applies, as a number.
  // 同じことを、実際のリクエストで検証する。limit は送信していないため、
  // デフォルト値が number として適用される。
  it('over HTTP: default applies and every param arrives with its schema-declared type', async () => {
    const res = await embeddedSearchApp.request('/search?limit=5&active=true&ids=1&ids=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: 5,
      limitType: 'number',
      activeType: 'boolean',
      idsTypes: ['number', 'number'],
    })
  })

  // "maybe" is not a boolean spelling. Naive coercion would have read it as true.
  // "maybe" は真偽値の表記ではない。素朴な coerce であれば、true として読んでしまう。
  it('z.stringbool() rejects non-boolean garbage instead of truthy-coercing it', async () => {
    const res = await embeddedSearchApp.request('/search?active=maybe')
    expect(res.status).toBe(400)
  })

  // A word is not a number.
  // 単語は数値ではない。
  it('rejects a non-numeric limit', async () => {
    const res = await embeddedSearchApp.request('/search?active=true&limit=abc')
    expect(res.status).toBe(400)
  })

  // The empty value that 2c read as 0 holds no digits: it is rejected, and the default of 10
  // does not apply, because the parameter was sent.
  // 2c で 0 として読まれた空の値は、数字を含まないため拒否される。パラメータ自体は
  // 送信されているため、デフォルトの 10 は適用されない。
  it('rejects the empty limit that 2c read as 0', async () => {
    const res = await embeddedSearchApp.request('/search?active=true&limit=')
    expect(res.status).toBe(400)
  })

  // The hexadecimal literal that 2c read as 16 is not decimal.
  // 2c で 16 として読まれた16進リテラルは、10進表記ではない。
  it('rejects the hexadecimal limit that 2c read as 16', async () => {
    const res = await embeddedSearchApp.request('/search?active=true&limit=0x10')
    expect(res.status).toBe(400)
  })

  // A one-element array is sent as a single ids=1, which arrives as a bare string.
  // 1要素の配列は単一の ids=1 として送られ、素の文字列として届く。
  it('reads a single ids value as a one-element array', async () => {
    const res = await embeddedSearchApp.request('/search?active=true&ids=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: 10,
      limitType: 'number',
      activeType: 'boolean',
      idsTypes: ['number'],
    })
  })
})

// ─────────────────────────────────────────────────────────────
// 4. Drift guard: the embedded section-3 routes behave identically
// to the artifact imported from __generated__/validation/routes.ts.
//    ずれの検出: セクション 3 に埋め込んだルートは、
// __generated__/validation/routes.ts から import した生成物と、同一の挙動を示す。
// ─────────────────────────────────────────────────────────────

const generatedCoerceIdApp = new OpenAPIHono().openapi(generatedCoerceIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ idType: typeof id, idValue: String(id) })
})

const generatedSearchApp = new OpenAPIHono().openapi(generatedSearchRoute, (c) => {
  const { limit, active, ids } = c.req.valid('query')
  return c.json({
    limit: limit ?? -1,
    limitType: typeof limit,
    activeType: typeof active,
    idsTypes: (ids ?? []).map((value) => typeof value),
  })
})

describe('4. embedded copies match the imported generated artifact', () => {
  // The embedded route and the imported route answer the same to a valid value, a word, and a
  // value past int64. If the generator changes what it emits, this test fails and section 3 has
  // to be updated.
  // 埋め込んだルートと import したルートは、
  // 有効な値・単語・int64 を超える値のいずれに対しても、同じ応答を返す。
  // 生成器の出力が変わると、このテストが失敗し、セクション 3 の更新が必要になる。
  it('path route: identical status and body for exact, garbage, and overflow inputs', async () => {
    const pairs = await Promise.all(
      ['/coerce/9007199254740993', '/coerce/abc', '/coerce/1', '/coerce/0x10'].map(async (url) => {
        const [embedded, generated] = await Promise.all([
          embeddedCoerceIdApp.request(url),
          generatedCoerceIdApp.request(url),
        ])
        return {
          embedded: { status: embedded.status, body: await embedded.json() },
          generated: { status: generated.status, body: await generated.json() },
        }
      }),
    )
    for (const { embedded, generated } of pairs) {
      expect(generated.status).toBe(embedded.status)
      expect(generated.body).toStrictEqual(embedded.body)
    }
  })

  // The same for the query route.
  // クエリのルートについても同様である。
  it('search route: identical status and body for defaults, explicit values, and garbage', async () => {
    const pairs = await Promise.all(
      [
        '/search?active=true',
        '/search?active=false',
        '/search?limit=5&active=true&ids=1&ids=2',
        '/search?active=true&ids=1',
        '/search?active=maybe',
        '/search?active=true&limit=abc',
        '/search?active=true&limit=',
        '/search?active=true&limit=0x10',
      ].map(async (url) => {
        const [embedded, generated] = await Promise.all([
          embeddedSearchApp.request(url),
          generatedSearchApp.request(url),
        ])
        return {
          embedded: { status: embedded.status, body: await embedded.json() },
          generated: { status: generated.status, body: await generated.json() },
        }
      }),
    )
    for (const { embedded, generated } of pairs) {
      expect(generated.status).toBe(embedded.status)
      expect(generated.body).toStrictEqual(embedded.body)
    }
  })
})
