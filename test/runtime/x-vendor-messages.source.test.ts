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

// The whole top-level declaration `const <name> = …` of the generated file, up to the blank
// line that ends it.
// 生成ファイルのトップレベル宣言 `const <name> = …` 全体。宣言を終える空行の手前まで。
function declaration(name: string) {
  const start = generatedSrc.indexOf(`const ${name} = `)
  if (start === -1) throw new Error(`no declaration of ${name}`)
  return generatedSrc.slice(start, generatedSrc.indexOf('\n\n', start))
}

// The whole branch of the `x-allOf-message` wrapper of Merged for one issue code. The
// wrapper holds its branches twice, for the synchronous attempt and for the awaited one;
// this is the first, and `MERGED` below shows both.
// Merged の `x-allOf-message` ラッパーのうち、1 つの issue code に対する分岐全体。
// ラッパーは分岐を、同期の試行用と await する試行用の 2 回持つ。これは最初のもので、
// 下の `MERGED` に両方がある。
function branch(code: string) {
  const source = declaration('MergedSchema')
  const start = source.indexOf(`if (issue.code === '${code}') {`)
  if (start === -1) throw new Error(`no branch on ${code}`)
  const end = '\n              }'
  return source.slice(start, source.indexOf(end, start) + end.length)
}

const FORM = `const FormSchema = z
  .object({
    username: z
      .string({ error: 'username must be a string' })
      .min(3, { error: 'username must be at least 3 characters' })
      .max(16, { error: 'username must be at most 16 characters' }),
    code: z.string().length(6, { error: 'code must be exactly 6 characters' }),
    slug: z
      .string()
      .regex(/^[a-z0-9-]+$/, { error: 'slug must be lowercase alphanumeric with hyphens' }),
    age: z
      .int({ error: 'age must be an integer' })
      .min(0, { error: 'age must be >= 0' })
      .max(120, { error: 'age must be <= 120' }),
    score: z
      .number({ error: 'score must be a number' })
      .multipleOf(0.5, { error: 'score must be a multiple of 0.5' }),
    count: z.int().multipleOf(5, { error: 'count must be a multiple of 5' }),
    active: z.boolean({ error: 'active must be a boolean' }),
    tags: z
      .array(z.string(), { error: 'tags must be an array' })
      .min(1, { error: 'tags must contain at least 1 item' })
      .max(5, { error: 'tags must contain at most 5 items' }),
    pin: z.array(z.int()).length(4, { error: 'pin must contain exactly 4 digits' }),
    role: z.enum(['admin', 'editor', 'viewer'], {
      error: 'role must be one of admin, editor, viewer',
    }),
    priority: z.union([z.literal(1), z.literal(2), z.literal(3)], {
      error: 'priority must be 1, 2, or 3',
    }),
    token: z.string().exactOptional(),
    tokenLabel: z.string().exactOptional(),
    nickname: z.string({ error: () => 'nickname is invalid' }).exactOptional(),
    quota: z
      .int({
        error: (iss) =>
          iss.input === undefined ? 'quota is required' : 'quota must be an integer',
      })
      .min(0, { error: (iss) => \`quota must be >= 0 (received: \${iss.input})\` }),
  })
  .superRefine((o, ctx) => {
    if (!Object.hasOwn(o, 'token')) {
      return
    }
    if (!Object.hasOwn(o, 'tokenLabel')) {
      ctx.addIssue({
        code: 'custom',
        message: 'tokenLabel is required when token is provided',
        path: ['tokenLabel'],
      })
    }
  })
  .openapi({
    required: [
      'username',
      'code',
      'slug',
      'age',
      'score',
      'count',
      'active',
      'tags',
      'pin',
      'role',
      'priority',
      'quota',
    ],
  })
  .openapi('Form')`

const MERGED = `const MergedSchema = (() => {
  const Schema = z
    .object({ name: z.string().min(3, { error: 'name must be at least 3 chars' }) })
    .openapi({ required: ['name'] })
    .and(
      z
        .object({ age: z.int().min(0, { error: 'age must be >= 0' }) })
        .openapi({ required: ['age'] }),
    )
  return z
    .transform((val: z.input<typeof Schema>) => val)
    .check((ctx: z.core.ParsePayload) => {
      const reported = ctx.issues.length
      try {
        return ((ctx) => {
          const result = Schema.safeParse(ctx.value)
          if (!result.success) {
            for (const issue of result.error.issues) {
              if (issue.code === 'invalid_type') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }
            }
          }
        })(ctx)
      } catch (error) {
        if (!(error instanceof z.core.$ZodAsyncError)) throw error
        ctx.issues.length = reported
        return (async (ctx) => {
          const result = await Schema.safeParseAsync(ctx.value)
          if (!result.success) {
            for (const issue of result.error.issues) {
              if (issue.code === 'invalid_type') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              } else if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }
            }
          }
        })(ctx)
      }
    })
    .pipe(Schema)
})().openapi('Merged')`

const MERGED_ARROW = `const MergedArrowSchema = (() => {
  const Schema = z
    .object({ name: z.string().min(3) })
    .openapi({ required: ['name'] })
    .and(z.object({ age: z.int().min(0) }).openapi({ required: ['age'] }))
  return z
    .transform((val: z.input<typeof Schema>) => val)
    .check((ctx: z.core.ParsePayload) => {
      const reported = ctx.issues.length
      try {
        return ((ctx) => {
          const result = Schema.safeParse(ctx.value)
          if (!result.success) {
            for (const issue of result.error.issues) {
              if (issue.code === 'invalid_type') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              }
            }
          }
        })(ctx)
      } catch (error) {
        if (!(error instanceof z.core.$ZodAsyncError)) throw error
        ctx.issues.length = reported
        return (async (ctx) => {
          const result = await Schema.safeParseAsync(ctx.value)
          if (!result.success) {
            for (const issue of result.error.issues) {
              if (issue.code === 'invalid_type') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              } else if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: ((issue) => 'merged failed at ' + issue.path.join('.'))(issue),
                })
              }
            }
          }
        })(ctx)
      }
    })
    .pipe(Schema)
})().openapi('MergedArrow')`

const MISC = `const MiscSchema = z
  .object({
    color: z.enum(['red', 'green', 'blue'], { error: 'color must be one of red, green, blue' }),
    kind: z.literal('admin', { error: 'kind must be exactly "admin"' }),
    tags: z.array(z.string()).superRefine((items, ctx) => {
      const seen = new Map()
      for (const [i, val] of items.entries()) {
        const key = JSON.stringify(val)
        if (seen.has(key))
          ctx.addIssue({ code: 'custom', path: [i], message: 'tags must contain unique values' })
        else seen.set(key, i)
      }
    }),
    sized: z.array(z.string()).superRefine((arr, ctx) => {
      const Schema = z.literal('premium')
      const matched = arr.filter((i) => Schema.safeParse(i).success).length
      if (matched < 1) {
        ctx.addIssue({ code: 'custom', message: 'sized must contain at least one premium tag' })
      }
    }),
    namespaced: z
      .strictObject(
        {
          a: z.string().exactOptional(),
          b: z.string().exactOptional(),
          c: z.string().exactOptional(),
        },
        {
          error: (issue) =>
            issue.code === 'unrecognized_keys'
              ? 'namespaced contains an unrecognized key'
              : undefined,
        },
      )
      .refine((val) => Object.keys(val).length >= 1, {
        error: 'namespaced must have at least 1 property',
      })
      .refine((val) => Object.keys(val).length <= 3, {
        error: 'namespaced must have at most 3 properties',
      })
      .openapi({ required: [] }),
    prefixed: z
      .looseObject({})
      .superRefine((o, ctx) => {
        const regex = new RegExp('^x_')
        const Schema = z.string()
        for (const [k, val] of Object.entries(o)) {
          if (!regex.test(k)) {
            continue
          }
          const result = Schema.safeParse(val)
          if (!result.success) {
            for (const issue of result.error.issues) {
              ctx.addIssue({
                ...issue,
                path: [k, ...issue.path],
                message: 'x_ keys must be strings',
              })
            }
          }
        }
      })
      .openapi({ ...{ patternProperties: { '^x_': { type: 'string' } } } }),
    payload: z.string({
      error: (issue) =>
        issue.input === undefined ? 'payload is required' : 'payload must be a string',
    }),
  })
  .openapi({ required: ['color', 'kind', 'tags', 'sized', 'namespaced', 'prefixed', 'payload'] })
  .openapi('Misc')`

// A message that holds an arrow function is recognised by its shape, `(...) =>`, and
// emitted as code rather than as a string, so that it can read the issue at run time.
// アロー関数を含むメッセージは、`(...) =>` という形によって認識される。文字列としてではなく
// コードとして出力されるため、実行時に issue を読み取ることができる。
describe('messages written as an arrow function', () => {
  // An arrow function with no argument.
  // 引数を持たないアロー関数。
  it('emits an arrow function with no argument as code', () => {
    expect(declaration('FormSchema')).toBe(FORM)
  })

  // An arrow function that reads the issue, with a conditional expression in its body.
  // issue を読み取るアロー関数。本体に条件式を含む。
  it('emits an arrow function that reads the issue as code', () => {
    expect(declaration('FormSchema')).toBe(FORM)
  })

  // The spec writes this message with a template literal. It is emitted as written, not
  // rewritten into string concatenation.
  // 仕様では、このメッセージをテンプレートリテラルで記述している。文字列連結に書き換えられる
  // ことなく、記述されたとおりに出力される。
  it('emits a template literal as it is written', () => {
    expect(declaration('FormSchema')).toBe(FORM)
  })
})

// An intersection has no issue of its own to carry a message. So `x-allOf-message` is
// emitted as a wrapper: a transform that hands its input on, with a check that parses the
// intersection and adds every issue it reports again with the configured message, piped
// into the intersection, which the pipe reaches only when nothing was reported. The check
// parses a schema, so it tries synchronously first and, when that schema turns out to have
// an asynchronous refinement, takes back what it reported and runs again, awaited (#645).
// The OpenAPI document renders a pipe whose input side is a transform by the schema it is
// piped into; a check on `z.unknown()` piped into the intersection would be rendered as
// `{}` (#479).
// 交差型には、メッセージを持たせるための固有の issue がない。そのため `x-allOf-message` は
// ラッパーとして出力される。入力をそのまま渡す transform に check を付け、その中で交差型を
// パースし、報告された各 issue を設定されたメッセージで追加し直す。それを交差型へパイプし、
// 何も報告されなかった場合にのみパイプは交差型に到達する。check はスキーマをパースするので、
// まず同期で試し、そのスキーマが非同期のリファインメントを持つと分かったら、報告した分を
// 取り消して await でやり直す (#645)。OpenAPI ドキュメントは、入力側が transform のパイプを
// パイプ先のスキーマとして描画する。`z.unknown()` に付けた check を交差型へパイプすると
// `{}` として描画されてしまう (#479)。
describe('x-allOf-message', () => {
  // The wrapper is an immediately invoked function, so that the inner schema is declared
  // once and shared by the callback and the pipe.
  // ラッパーは即時実行関数である。内側のスキーマを1度だけ宣言し、コールバックとパイプの
  // 両方で共有するためである。
  it('wraps the intersection in an immediately invoked function', () => {
    expect(declaration('MergedSchema')).toBe(MERGED)
  })

  // The text of the extension is the message of every issue that is added again.
  // 拡張に指定した文字列が、追加し直されるすべての issue のメッセージになる。
  it('emits the configured text as the message', () => {
    expect(declaration('MergedSchema')).toBe(MERGED)
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
    expect(branch('invalid_type')).toBe(`if (issue.code === 'invalid_type') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a value above a maximum.
  // 最大値を超える値に対する code。
  it('branches on too_big', () => {
    expect(branch('too_big')).toBe(`if (issue.code === 'too_big') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a value below a minimum.
  // 最小値を下回る値に対する code。
  it('branches on too_small', () => {
    expect(branch('too_small')).toBe(`if (issue.code === 'too_small') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a string that fails its format or its pattern.
  // フォーマットまたはパターンに一致しない文字列に対する code。
  it('branches on invalid_format', () => {
    expect(branch('invalid_format')).toBe(`if (issue.code === 'invalid_format') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a number that fails multipleOf.
  // multipleOf を満たさない数値に対する code。
  it('branches on not_multiple_of', () => {
    expect(branch('not_multiple_of')).toBe(`if (issue.code === 'not_multiple_of') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of an unknown key in a strict object.
  // 厳格なオブジェクトにおける未知のキーに対する code。
  it('branches on unrecognized_keys', () => {
    expect(branch('unrecognized_keys')).toBe(`if (issue.code === 'unrecognized_keys') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a value that matches no branch of a union.
  // ユニオンのどの分岐にも一致しない値に対する code。
  it('branches on invalid_union', () => {
    expect(branch('invalid_union')).toBe(`if (issue.code === 'invalid_union') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of an invalid key of a record or a map.
  // レコードまたはマップにおける不正なキーに対する code。
  it('branches on invalid_key', () => {
    expect(branch('invalid_key')).toBe(`if (issue.code === 'invalid_key') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of an invalid element of a set or a map.
  // セットまたはマップにおける不正な要素に対する code。
  it('branches on invalid_element', () => {
    expect(branch('invalid_element')).toBe(`if (issue.code === 'invalid_element') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of a value outside an enum or a literal.
  // enum またはリテラルに含まれない値に対する code。
  it('branches on invalid_value', () => {
    expect(branch('invalid_value')).toBe(`if (issue.code === 'invalid_value') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // The code of an issue a refinement adds.
  // refine によって追加された issue に対する code。
  it('branches on custom', () => {
    expect(branch('custom')).toBe(`if (issue.code === 'custom') {
                ctx.issues.push({
                  ...issue,
                  input: issue.input,
                  message: 'merged validation failed',
                })
              }`)
  })

  // When the extension holds an arrow function, the function is emitted inline and called
  // with the issue, in every branch.
  // 拡張にアロー関数が指定されている場合、その関数はインラインで出力され、すべての分岐で
  // issue を引数として呼び出される。
  it('emits an arrow function inline, called with the issue', () => {
    expect(declaration('MergedArrowSchema')).toBe(MERGED_ARROW)
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
    expect(declaration('MiscSchema')).toBe(MISC)
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
    WriteOnly?: { properties?: { [key: string]: { writeOnly?: boolean; type?: string } } }
  }

  // The property the spec marks is marked in the document.
  // 仕様で指定されたプロパティは、ドキュメント上でも writeOnly になっている。
  it('marks the password as writeOnly in the document', () => {
    const doc = app.getOpenAPI31Document({
      openapi: '3.1.0',
      info: { title: 'x-vendor-messages', version: '1.0.0' },
    })
    const schemas = doc.components?.schemas as Documented | undefined
    expect(schemas?.WriteOnly?.properties?.password).toStrictEqual({
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
    expect(schemas?.WriteOnly?.properties?.name).toStrictEqual({ type: 'string' })
  })
})
