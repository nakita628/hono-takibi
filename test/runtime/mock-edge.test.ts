// The generated mock (cases/mock-edge and cases/mock-seed, both generated from
// specs/mock-edge.yaml), checked against the response schemas of its own routes.
//
// A mock is only useful if what it answers is what the spec declares. So the generated
// values are parsed by the generated response schema, and sampled repeatedly, because a
// value drawn by faker may satisfy a schema by luck once.
//
//   cases/mock-edge  `useExamples: 'all'`, `arrayMin: 5`
//   cases/mock-seed  `seed: 42`, `locale: 'ja'`
//
// 生成されたモックの検証(cases/mock-edge と cases/mock-seed。どちらも
// specs/mock-edge.yaml から生成)。モック自身のルートが持つレスポンススキーマと照合する。
//
// モックは、その応答が仕様の宣言どおりである場合にのみ役に立つ。そのため、生成された値を
// 生成されたレスポンススキーマでパースし、繰り返しサンプリングする。faker が生成する値は、
// 1回だけなら偶然スキーマを満たすことがあるためである。
//
//   cases/mock-edge  `useExamples: 'all'`・`arrayMin: 5`
//   cases/mock-seed  `seed: 42`・`locale: 'ja'`
import { describe, expect, it } from 'vite-plus/test'

import app, {
  getBoundsRoute,
  getCategoriesRoute,
  getConstraintsRoute,
  getContactsRoute,
  getFormatsRoute,
  getGraphRoute,
  getInvoicesRoute,
  getAccountsRoute,
  getOrdersOrderIdRoute,
  getPartiesRoute,
  getPeopleRoute,
  getSessionRoute,
  getSettingsRoute,
  getShapesRoute,
  getUsersUserIdRoute,
} from '../__generated__/mock-edge/mock'
import seededApp, {
  getUsersUserIdRoute as seededGetUsersUserIdRoute,
} from '../__generated__/mock-seed/mock'

// How many times a route is sampled.
// ルートをサンプリングする回数。
const SAMPLES = 50

// The response schemas the generated routes declare.
// 生成されたルートが宣言しているレスポンススキーマ。
const userSchema = getUsersUserIdRoute.responses[200].content['application/json'].schema
const problemSchema = getUsersUserIdRoute.responses[404].content['application/json'].schema
const formatsSchema = getFormatsRoute.responses[200].content['application/json'].schema
const problemJsonSchema =
  getOrdersOrderIdRoute.responses[404].content['application/problem+json'].schema
const boundsSchema = getBoundsRoute.responses[200].content['application/json'].schema
const categorySchema = getCategoriesRoute.responses[200].content['application/json'].schema
const settingsSchema = getSettingsRoute.responses[200].content['application/json'].schema
const constraintsSchema = getConstraintsRoute.responses[200].content['application/json'].schema
const partySchema = getPartiesRoute.responses[200].content['application/json'].schema
const accountSchema = getAccountsRoute.responses[200].content['application/json'].schema
const contactSchema = getContactsRoute.responses[200].content['application/json'].schema
const graphSchema = getGraphRoute.responses[200].content['application/json'].schema
const peopleSchema = getPeopleRoute.responses[200].content['application/json'].schema
const invoiceSchema = getInvoicesRoute.responses[200].content['application/json'].schema
const shapesSchema = getShapesRoute.responses[200].content['application/json'].schema
const authErrorSchema = getSessionRoute.responses[401].content['application/json'].schema
const seededUserSchema = seededGetUsersUserIdRoute.responses[200].content['application/json'].schema

// What faker draws must fit what the spec declares.
// faker が生成する値は、仕様の宣言に適合しなければならない。
describe('generated values satisfy the response schema', () => {
  // The User-Profile schema holds every awkward case at once: property names that are not
  // identifiers ("first-name", "user.name", "full name", "1st"), names that hint at a type the
  // schema does not declare (a "createdAt" that is an integer), OpenAPI 3.1 type arrays, a map,
  // and an array with maxItems. Whatever faker draws, the body has to satisfy the schema, so
  // the route is sampled 50 times.
  // User-Profile スキーマは、扱いにくいケースをすべて含んでいる。
  // 識別子でないプロパティ名("first-name"・"user.name"・"full name"・"1st")、
  // 宣言された型と食い違う型を連想させる名前(integer の "createdAt")、OpenAPI 3.1 の型配列、
  // マップ、maxItems 付きの配列である。faker がどんな値を生成しても、
  // ボディはスキーマを満たさなければならないため、ルートを 50 回サンプリングする。
  it('answers GET /users/{userId} with a body its response schema accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/users/1', { headers: { 'X-API-Key': 'key' } })
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(userSchema.safeParse(body).error).toBeUndefined()
    }
  })

  // One property per string format. A generated value that its own format rejects would make
  // the mock unusable with a validating client.
  // 文字列フォーマットごとにプロパティが1つある。
  // 生成された値が自身のフォーマットで拒否されるようでは、
  // 検証を行うクライアントからモックを利用できない。
  it('answers GET /formats with a value every zod string format accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/formats')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(formatsSchema.safeParse(body).error).toBeUndefined()
    }
  })

  // The path parameter -1 is the sentinel of an integer parameter: the mock answers the
  // declared 404. Its body is generated, and its status property is an integer as the schema
  // declares, not a string.
  // パスパラメータ -1 は、integer パラメータの番兵値である。モックは、宣言された 404 を返す。
  // ボディは生成されたものであり、status プロパティはスキーマの宣言どおり integer で
  // ある(文字列ではない)。
  it('answers the 404 sentinel with a body the 404 schema accepts', async () => {
    const res = await app.request('/users/-1', { headers: { 'X-API-Key': 'key' } })
    expect(res.status).toBe(404)
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // Zero is an ordinary id, not the sentinel.
  // 0 は通常の id であり、番兵値ではない。
  it('answers a user for the id 0', async () => {
    const res = await app.request('/users/0', { headers: { 'X-API-Key': 'key' } })
    expect(res.status).toBe(200)
    const body: unknown = await res.json()
    expect(userSchema.safeParse(body).error).toBeUndefined()
  })
})

// A schema may bound a value on one side only, or refer to itself. The mock still has to answer.
// スキーマは、値の片側だけを制限することも、自分自身を参照することもある。それでもモックは
// 応答しなければならない。
describe('one-sided bounds and recursive schemas', () => {
  // The Bounds schema declares one bound and leaves the other open: an integer with only
  // minimum: 5000, one with only maximum: 0, a number with only maximum: 0.5, an int64 with only
  // maximum: -5, a string with only maxLength: 3 and one with only minLength: 50. The default
  // the mock fills the open side with must not end up on the wrong side of the declared bound,
  // or faker throws and the route answers 500.
  // Bounds スキーマは、片側の境界だけを宣言し、もう片側を空けている。minimum: 5000 のみの
  // integer、maximum: 0 のみの integer、maximum: 0.5 のみの number、maximum: -5 のみの int64、
  // maxLength: 3 のみの string、minLength: 50 のみの string である。モックが空いている側に
  // 補うデフォルト値が、宣言された境界の反対側に出てはならない。そうなると faker が例外を投げ、
  // ルートは 500 を返す。
  it('answers GET /bounds with a body its response schema accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      // The int64 travels as a decimal string, which the schema coerces back.
      // int64 は 10 進文字列として送られ、スキーマがそれを元の型に戻す。
      expect(boundsSchema.safeParse(body).error).toBeUndefined()
    }
  })

  // An integer with only minimum: 5000 stays at or above 5000.
  // minimum: 5000 のみの integer は、5000 以上になる。
  it('keeps an integer at or above its minimum', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(body.minOnly).toBeGreaterThanOrEqual(5000)
    }
  })

  // An integer with only maximum: 0 stays at or below 0.
  // maximum: 0 のみの integer は、0 以下になる。
  it('keeps an integer at or below its maximum', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(body.maxOnly).toBeLessThanOrEqual(0)
    }
  })

  // A number with only maximum: 0.5 stays at or below 0.5.
  // maximum: 0.5 のみの number は、0.5 以下になる。
  it('keeps a number at or below its maximum', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(body.ratio).toBeLessThanOrEqual(0.5)
    }
  })

  // A string with only maxLength: 3 is at most 3 characters long.
  // maxLength: 3 のみの string は、3 文字以下になる。
  it('keeps a string within its maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(body.code.length).toBeLessThanOrEqual(3)
    }
  })

  // exclusiveMinimum: 0 and exclusiveMaximum: 0.05 exclude the bounds themselves. faker draws
  // from an inclusive range, so the mock draws from 0.01 to 0.04.
  // exclusiveMinimum: 0 と exclusiveMaximum: 0.05 は、境界そのものを含まない。faker は境界を
  // 含む範囲から値を生成するため、モックは 0.01 から 0.04 の範囲で生成する。
  it('keeps a number strictly inside its exclusive bounds', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(body.openUnit).toBeGreaterThan(0)
      expect(body.openUnit).toBeLessThan(0.05)
    }
  })

  // uniqueItems: true with minItems: 3 over an enum of three members leaves one answer: each
  // member once.
  // 3 つのメンバーを持つ enum に対する uniqueItems: true と minItems: 3 では、答えは 1 つしか
  // ない。各メンバーが 1 回ずつである。
  it('draws distinct items for uniqueItems', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/bounds')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = boundsSchema.parse(await res.json())
      expect(new Set(body.flags)).toStrictEqual(new Set(['a', 'b', 'c']))
      expect(body.flags).toHaveLength(3)
    }
  })

  // The Category schema refers to itself through "children" and "parent". A factory that calls
  // itself unconditionally never returns, so the mock stops at a fixed depth.
  // Category スキーマは、"children" と "parent" を通じて自分自身を参照する。無条件に自分自身を
  // 呼び出すファクトリは戻ってこないため、モックは一定の深さで打ち切る。
  it('answers GET /categories for a schema that refers to itself', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/categories')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(categorySchema.safeParse(body).error).toBeUndefined()
    }
  })

  // The tree is not cut off at its root: the root has children, and they have children.
  // ツリーはルートで打ち切られない。ルートは子を持ち、その子も子を持つ。
  it('nests a recursive schema below its root', async () => {
    const res = await app.request('/categories')
    const body = categorySchema.parse(await res.json())
    expect(body.children.length).toBeGreaterThanOrEqual(5)
    expect(body.children[0]?.children.length).toBeGreaterThanOrEqual(5)
    expect(body.children[0]?.children[0]?.children).toStrictEqual([])
  })

  // The Settings schema is a map whose values are the Setting component, referenced only through
  // additionalProperties. The factory of Setting has to be emitted too.
  // Settings スキーマは、値が Setting コンポーネントであるマップで、additionalProperties
  // からのみ参照される。Setting のファクトリも出力されなければならない。
  it('answers GET /settings with a map of a component schema', async () => {
    const res = await app.request('/settings')
    expect(res.status).toBe(200)
    const body: unknown = await res.json()
    expect(settingsSchema.safeParse(body).error).toBeUndefined()
    expect(Object.keys(settingsSchema.parse(body)).length).toBeGreaterThanOrEqual(1)
  })
})

// Shapes whose value the mock used to leave out, or to draw without the declared constraint.
// モックが値を省略していた形、または宣言された制約を無視して生成していた形。
describe('untyped members, tuples and bounded patterns', () => {
  // The Shapes schema requires "meta", which declares no type, so any JSON value fits. The mock
  // answers null: a value that is left out would break the required member.
  // Shapes スキーマは "meta" を必須としているが、"meta" は型を宣言していないため、どの JSON 値
  // でも適合する。モックは null を返す。値を省略すると、必須メンバーを満たせないためである。
  it('answers a required member without a type with null', async () => {
    const res = await app.request('/shapes')
    expect(res.status).toBe(200)
    const body: unknown = await res.json()
    expect(shapesSchema.safeParse(body).error).toBeUndefined()
    expect(body).toHaveProperty('meta', null)
  })

  // "pair" is a tuple: prefixItems [string, integer] with minItems: 2 and maxItems: 2.
  // "pair" はタプルである。prefixItems は [string, integer] で、minItems: 2・maxItems: 2 を持つ。
  it('answers a tuple with one value per prefixItems entry', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.pair).toHaveLength(2)
      expect(typeof body.pair[0]).toBe('string')
      expect(Number.isInteger(body.pair[1])).toBe(true)
    }
  })

  // "slug" declares pattern: ^[a-z]+$ with minLength: 3 and maxLength: 5. The pattern alone
  // would allow a string of any length.
  // "slug" は pattern: ^[a-z]+$ と minLength: 3・maxLength: 5 を宣言している。pattern だけでは、
  // 任意の長さの文字列が許されてしまう。
  it('keeps a pattern string within its minLength and maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.slug).toMatch(/^[a-z]{3,5}$/u)
    }
  })

  // "shortEmail" declares format: email with maxLength: 12. An address faker draws on its own is longer.
  // "shortEmail" は format: email と maxLength: 12 を宣言している。faker がそのまま生成するアドレスは、それより長い。
  it('keeps an email within its maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.shortEmail.length).toBeLessThanOrEqual(12)
    }
  })

  // "longEmail" declares format: email with minLength: 40.
  // "longEmail" は format: email と minLength: 40 を宣言している。
  it('keeps an email at or above its minLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.longEmail.length).toBeGreaterThanOrEqual(40)
    }
  })

  // "shortUrl" declares format: uri with maxLength: 16.
  // "shortUrl" は format: uri と maxLength: 16 を宣言している。
  it('keeps a uri within its maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.shortUrl.length).toBeLessThanOrEqual(16)
    }
  })

  // "shortHost" declares format: hostname with maxLength: 8.
  // "shortHost" は format: hostname と maxLength: 8 を宣言している。
  it('keeps a hostname within its maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.shortHost.length).toBeLessThanOrEqual(8)
    }
  })

  // "pin" declares format: password with minLength: 4 and maxLength: 6.
  // "pin" は format: password と minLength: 4・maxLength: 6 を宣言している。
  it('keeps a password between its minLength and maxLength', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/shapes')
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body = shapesSchema.parse(await res.json())
      expect(body.pin.length).toBeGreaterThanOrEqual(4)
      expect(body.pin.length).toBeLessThanOrEqual(6)
    }
  })

  // GET /anything declares the schema {}, which any JSON value fits. The mock answers null: a
  // body that is left out is not JSON.
  // GET /anything は、どの JSON 値でも適合するスキーマ {} を宣言している。モックは null を
  // 返す。ボディを省略すると、JSON ではなくなるためである。
  it('answers a response schema without a type with null', async () => {
    const res = await app.request('/anything')
    expect(res.status).toBe(200)
    expect(await res.json()).toBeNull()
  })

  // The NotAString component only declares not: { type: string }. null is not a string, and
  // it keeps the body JSON.
  // NotAString コンポーネントは、not: { type: string } だけを宣言している。null は文字列では
  // なく、ボディも JSON のまま保たれる。
  it('answers a component schema that declares only not with null', async () => {
    const res = await app.request('/not-a-string')
    expect(res.status).toBe(200)
    expect(await res.json()).toBeNull()
  })

  // GET /people refers to its media type in components.mediaTypes, where the schema is an
  // array of Person. The mock follows the reference.
  // GET /people は、components.mediaTypes にあるメディアタイプを参照しており、そのスキーマは
  // Person の配列である。モックは、その参照をたどる。
  it('answers a media type referenced from components.mediaTypes', async () => {
    const res = await app.request('/people')
    expect(res.status).toBe(200)
    const body = peopleSchema.parse(await res.json())
    expect(body.length).toBeGreaterThanOrEqual(1)
  })

  // The Contact schema is allOf [Person, { required: [phone] }]. "phone" is optional in Person
  // and required in Contact, so the mock always answers it.
  // Contact スキーマは allOf [Person, { required: [phone] }] である。"phone" は Person では
  // 任意だが、Contact では必須であるため、モックは常に "phone" を返す。
  it('answers a member that allOf makes required', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/contacts')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(contactSchema.safeParse(body).error).toBeUndefined()
      expect(body).toHaveProperty('phone')
    }
  })

  // The GraphNode schema lists itself in a oneOf next to a string: links is an array of nodes
  // and strings. Where the mock stops recursing, it answers the strings, not null.
  // GraphNode スキーマは、oneOf の中で string と並んで自分自身を挙げている。links は、ノードと
  // 文字列の配列である。モックは、再帰を打ち切る箇所で null ではなく文字列を返す。
  it('answers GET /graph for a schema that refers to itself in a oneOf', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/graph')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(graphSchema.safeParse(body).error).toBeUndefined()
    }
  })

  // GET /invoices declares the example { id: 123, lines: [{ amount: 45 }], note: paid }, where
  // "id" and "amount" are int64. The mock answers an int64 as a decimal string, in an example
  // as in a generated value.
  // GET /invoices は example として { id: 123, lines: [{ amount: 45 }], note: paid } を宣言して
  // おり、"id" と "amount" は int64 である。モックは、生成した値と同じく example でも、int64 を
  // 10 進文字列で返す。
  it('answers an example with int64 members', async () => {
    const res = await app.request('/invoices')
    expect(res.status).toBe(200)
    const body: unknown = await res.json()
    expect(body).toStrictEqual({ id: '123', lines: [{ amount: '45' }], note: 'paid' })
    expect(invoiceSchema.safeParse(body).error).toBeUndefined()
  })
})

// Constraints the generated schema enforces beyond type and format.
// 生成されたスキーマが、型と format 以外に検証する制約。
describe('vendor extensions and JSON Schema keywords', () => {
  // The Constraints schema declares x-startsWith / x-includes / x-endsWith, an escaped dot in a
  // pattern, x-uuidVersion: v8, a sha256 hex digest, a mac address delimited by "-", a local
  // date-time, an array that contains "important", a pattern with an optional group, a base64-encoded
  // JSON payload, and if / then.
  // The route's own schema checks every one of them.
  // Constraints スキーマは、x-startsWith / x-includes / x-endsWith、pattern 内のエスケープされた
  // ドット、x-uuidVersion: v8、sha256 の 16 進ダイジェスト、"-" 区切りの mac アドレス、
  // ローカルの date-time、"important" を含む配列、省略可能なグループを含む pattern、
  // base64 エンコードされた JSON ペイロード、if / then を宣言している。ルート自身のスキーマが、そのすべてを検証する。
  it('answers GET /constraints with a body its response schema accepts', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/constraints')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(constraintsSchema.safeParse(body).error).toBeUndefined()
    }
  })

  // "apiUrl" starts with https://, includes /api/ and ends with .test.
  // "apiUrl" は https:// で始まり、/api/ を含み、.test で終わる。
  it('answers a string with its declared start, middle and end', async () => {
    const res = await app.request('/constraints')
    const body = constraintsSchema.parse(await res.json())
    expect(body.apiUrl).toMatch(/^https:\/\/.*\/api\/.*\.test$/u)
  })

  // "domain" declares pattern: ^[a-z]{3,8}\.example\.com$. The escaped dot is a dot, not a
  // backslash followed by a dot.
  // "domain" は pattern: ^[a-z]{3,8}\.example\.com$ を宣言している。エスケープされたドットは
  // ドットであり、バックスラッシュとドットの並びではない。
  it('answers an escaped dot in a pattern as a dot', async () => {
    const res = await app.request('/constraints')
    const body = constraintsSchema.parse(await res.json())
    expect(body.domain).toMatch(/^[a-z]{3,8}\.example\.com$/u)
  })

  // "tags" declares contains: { const: important }.
  // "tags" は contains: { const: important } を宣言している。
  it('answers an array with the value it has to contain', async () => {
    const res = await app.request('/constraints')
    const body = constraintsSchema.parse(await res.json())
    expect(body.tags).toContain('important')
  })

  // "locale" declares pattern: ^[a-z]{2}(-[A-Z]{2})?$. faker cannot read a group, so the mock
  // leaves the optional one out.
  // "locale" は pattern: ^[a-z]{2}(-[A-Z]{2})?$ を宣言している。faker はグループを解釈できない
  // ため、モックは省略可能なグループを省く。
  it('answers a pattern with an optional group', async () => {
    const res = await app.request('/constraints')
    const body = constraintsSchema.parse(await res.json())
    expect(body.locale).toMatch(/^[a-z]{2}(-[A-Z]{2})?$/u)
  })

  // "payload" is a base64 string whose decoded content is JSON with a "theme".
  // "payload" は base64 文字列であり、デコードした内容は "theme" を持つ JSON である。
  it('answers base64-encoded JSON for contentEncoding and contentSchema', async () => {
    const res = await app.request('/constraints')
    const body: unknown = await res.json()
    expect(body).toHaveProperty('payload')
    const { payload } = body as { payload: string }
    expect(JSON.parse(atob(payload))).toHaveProperty('theme')
  })

  // GET /status is declared by a $ref to components.pathItems. The mock registers its handler
  // like that of any other path.
  // GET /status は、components.pathItems への $ref で宣言されている。モックは、他のパスと同じ
  // ように、そのハンドラーを登録する。
  it('answers a path declared by a reference to components.pathItems', async () => {
    const res = await app.request('/status')
    expect(res.status).toBe(200)
    expect(await res.json()).toHaveProperty('value')
  })
})

// Schemas that refer to each other in ways faker cannot follow by itself.
// faker だけではたどれない形で、互いを参照するスキーマ。
describe('overlapping unions and required cycles', () => {
  // Party is oneOf [Member, Organization, Individual]. Organization requires only "name", so
  // every Member also matches Organization and fails the oneOf. The mock answers an
  // Organization or an Individual.
  // Party は oneOf [Member, Organization, Individual] である。Organization は "name" だけを
  // 必須とするため、Member はすべて Organization にも一致し、oneOf を満たさない。モックは
  // Organization か Individual を返す。
  it('answers a oneOf with a variant that matches exactly one', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/parties')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(partySchema.safeParse(body).error).toBeUndefined()
    }
  })

  // Account lists its purchases, and every Purchase requires its buyer, an Account. The mock
  // stops the optional list, never the required buyer.
  // Account は購入の一覧を持ち、Purchase はすべて購入者である Account を必須とする。モックは
  // 任意の一覧を打ち切り、必須の購入者は打ち切らない。
  it('answers a cycle through a required reference', async () => {
    for (let i = 0; i < SAMPLES; i += 1) {
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const res = await app.request('/accounts')
      expect(res.status).toBe(200)
      // oxlint-disable-next-line no-await-in-loop -- sequential sampling of one route
      const body: unknown = await res.json()
      expect(accountSchema.safeParse(body).error).toBeUndefined()
    }
  })
})

// The mock checks a request the way the real server would, in the same order.
// モックは、実サーバーと同じ方法・同じ順序でリクエストを検証する。
describe('security and validation', () => {
  // The spec declares an apiKey security scheme in the header X-API-Key. The mock enforces its
  // presence.
  // 仕様では、ヘッダー X-API-Key による apiKey のセキュリティスキームを宣言している。モックは、
  // その有無を検証する。
  it('answers 401 without the apiKey header', async () => {
    const res = await app.request('/users/1')
    expect(res.status).toBe(401)
    expect(await res.json()).toStrictEqual({ message: 'Unauthorized' })
  })

  // An empty key is no key.
  // 空のキーは、キーがないのと同じである。
  it('answers 401 for an empty apiKey header', async () => {
    const res = await app.request('/users/1', { headers: { 'X-API-Key': '' } })
    expect(res.status).toBe(401)
    expect(await res.json()).toStrictEqual({ message: 'Unauthorized' })
  })

  // GET /session declares a body for its 401: { code, error }. The mock answers the declared
  // body, not a message of its own.
  // GET /session は、401 のボディとして { code, error } を宣言している。モックは、独自の
  // メッセージではなく、宣言されたボディを返す。
  it('answers 401 with the body the 401 response declares', async () => {
    const res = await app.request('/session')
    expect(res.status).toBe(401)
    const body: unknown = await res.json()
    expect(authErrorSchema.safeParse(body).error).toBeUndefined()
  })

  // GET /vault lists ApiKeyAuth and BearerAuth in one requirement, so both are needed. The API
  // key alone is not enough.
  // GET /vault は、1 つの要件に ApiKeyAuth と BearerAuth を並べているため、両方が必要である。
  // API キーだけでは足りない。
  it('answers 401 for one of two schemes a requirement lists', async () => {
    const res = await app.request('/vault', { headers: { 'X-API-Key': 'key' } })
    expect(res.status).toBe(401)
  })

  // The bearer token alone is not enough either.
  // ベアラートークンだけでも足りない。
  it('answers 401 for the other of two schemes a requirement lists', async () => {
    const res = await app.request('/vault', { headers: { Authorization: 'Bearer token' } })
    expect(res.status).toBe(401)
  })

  // Both schemes together are accepted.
  // 両方のスキームがそろえば受け付ける。
  it('accepts both schemes a requirement lists', async () => {
    const res = await app.request('/vault', {
      headers: { 'X-API-Key': 'key', Authorization: 'Bearer token' },
    })
    expect(res.status).toBe(200)
  })

  // GET /feed declares security: [{}, { ApiKeyAuth: [] }]. The empty requirement allows a call
  // without credentials.
  // GET /feed は security: [{}, { ApiKeyAuth: [] }] を宣言している。空の要件により、認証情報の
  // ない呼び出しが許される。
  it('does not ask an operation with an empty requirement for a key', async () => {
    const res = await app.request('/feed')
    expect(res.status).toBe(200)
  })

  // A header name is case-insensitive.
  // ヘッダー名は大文字小文字を区別しない。
  it('reads the apiKey header whatever its case', async () => {
    const res = await app.request('/users/1', { headers: { 'x-api-key': 'key' } })
    expect(res.status).toBe(200)
  })

  // /formats and /orders override the global security with an empty list.
  // /formats と /orders は、グローバルのセキュリティ設定を空のリストで上書きしている。
  it('does not ask an operation with security: [] for a key', async () => {
    const res = await app.request('/formats')
    expect(res.status).toBe(200)
  })

  // A Prefer header does not get around the security scheme.
  // Prefer ヘッダーを使っても、セキュリティスキームは回避できない。
  it('checks the key before it honours Prefer', async () => {
    const res = await app.request('/users/1', { headers: { Prefer: 'code=200' } })
    expect(res.status).toBe(401)
  })

  // "abc" is not an integer. The request is rejected with 400 whether or not a key is sent.
  // "abc" は整数ではない。キーの有無にかかわらず、リクエストは 400 で拒否される。
  it('validates the request before it checks the key', async () => {
    const res = await app.request('/users/abc')
    expect(res.status).toBe(400)
  })

  // An invalid request is rejected even when Prefer asks for a declared response.
  // Prefer で宣言済みのレスポンスを要求していても、不正なリクエストは拒否される。
  it('validates the request before it honours Prefer', async () => {
    const res = await app.request('/users/abc', {
      headers: { 'X-API-Key': 'key', Prefer: 'code=404' },
    })
    expect(res.status).toBe(400)
  })

  // userId is an integer.
  // userId は integer である。
  it('rejects a path parameter that is a fraction', async () => {
    const res = await app.request('/users/1.5', { headers: { 'X-API-Key': 'key' } })
    expect(res.status).toBe(400)
  })
})

// cases/mock-edge.
// cases/mock-edge の設定。
describe('options: useExamples and arrayMin', () => {
  // The config asks for at least 5 elements (arrayMin: 5) and the schema allows at most 3
  // (maxItems: 3). The schema wins.
  // 設定では最低 5 要素(arrayMin: 5)を要求し、
  // スキーマは最大 3 要素(maxItems: 3)までしか許容しない。スキーマが優先される。
  it('clamps arrayMin to maxItems', async () => {
    const res = await app.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const user = userSchema.parse(await res.json())
    expect(user.tags).toHaveLength(3)
  })

  // labels is a map (additionalProperties). An empty object would satisfy the schema and show
  // nothing.
  // labels はマップ(additionalProperties)である。空のオブジェクトでもスキーマは満たすが、
  // それでは何も確認できない。
  it('fills a map with at least one entry', async () => {
    const res = await app.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const user = userSchema.parse(await res.json())
    expect(Object.keys(user.labels).length).toBeGreaterThan(0)
  })

  // With useExamples: "all", a property that declares an example answers it instead of a
  // generated value: role from "example", bio from the first of "examples".
  // useExamples: "all" を指定すると、example を宣言したプロパティは、
  // 生成値の代わりにその値を返す。role は "example" から、
  // bio は "examples" の先頭から取られる。
  it('uses the examples of a schema', async () => {
    const res = await app.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const user = userSchema.parse(await res.json())
    expect(user.role).toBe('admin')
    expect(user.bio).toBe('Hello')
  })
})

// cases/mock-seed.
// cases/mock-seed の設定。
describe('options: seed and locale', () => {
  // With seed: 42, a route answers the same body on every request.
  // seed: 42 を指定すると、ルートはリクエストのたびに同じボディを返す。
  it('answers the same body for the same route every time', async () => {
    const first = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const second = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    expect(await second.text()).toBe(await first.text())
  })

  // The seed is applied per request, not once at start-up: requests to another route in between
  // do not move the sequence.
  // シードは起動時に1度だけではなく、リクエストごとに適用される。
  // 間に別のルートへのリクエストを挟んでも、乱数列はずれない。
  it('answers the same body whatever was requested between', async () => {
    const first = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    await seededApp.request('/formats')
    await seededApp.request('/formats')
    const second = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    expect(await second.text()).toBe(await first.text())
  })

  // /formats is as repeatable as /users.
  // /formats も /users と同じく再現可能である。
  it('answers the same body for another route too', async () => {
    const first = await seededApp.request('/formats')
    const second = await seededApp.request('/formats')
    expect(await second.text()).toBe(await first.text())
  })

  // Ten requests at once, to two routes in turn: every answer of a route is the same.
  // 2つのルートに対して交互に、10件のリクエストを同時に送信する。同じルートの応答は、
  // すべて同一である。
  it('stays deterministic under concurrent requests', async () => {
    const responses = await Promise.all([
      seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } }),
      seededApp.request('/formats'),
      seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } }),
      seededApp.request('/formats'),
      seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } }),
      seededApp.request('/formats'),
      seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } }),
      seededApp.request('/formats'),
      seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } }),
      seededApp.request('/formats'),
    ])
    const bodies = await Promise.all(responses.map((res) => res.text()))
    const users = bodies.filter((_, index) => index % 2 === 0)
    const formats = bodies.filter((_, index) => index % 2 === 1)
    expect(new Set(users).size).toBe(1)
    expect(new Set(formats).size).toBe(1)
  })

  // With locale: "ja", a generated first name is Japanese: it holds no ASCII letter.
  // locale: "ja" を指定すると、生成される名前は日本語になり、ASCII の英字を含まない。
  it('draws from the configured locale', async () => {
    const res = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const body = (await res.json()) as { 'first-name': string }
    expect(body['first-name']).not.toMatch(/[A-Za-z]/)
    expect(body['first-name'].length).toBeGreaterThan(0)
  })

  // Determinism must not cost validity.
  // 決定的であることと引き換えに、スキーマへの適合が損なわれてはならない。
  it('still satisfies the schema when seeded', async () => {
    const res = await seededApp.request('/users/1', { headers: { 'X-API-Key': 'key' } })
    const body: unknown = await res.json()
    expect(seededUserSchema.safeParse(body).error).toBeUndefined()
  })
})

// Prism-compatible selection. Prefer: code=<status>, example=<name> picks any response or
// named example the spec declares. Anything the spec does not declare is answered with 500
// problem+json.
// Prism 互換の選択方法。Prefer: code=<status>, example=<name> により、
// 仕様で宣言された任意のレスポンスや名前付き example を選択できる。
// 仕様で宣言されていないものを指定した場合は、500 の problem+json が返る。
describe('Prefer: selecting a declared response', () => {
  // With no Prefer header the mock answers the success response, and its first example,
  // "shipped".
  // Prefer ヘッダーがない場合、モックは成功レスポンスを、
  // その最初の example である "shipped" で返す。
  it('answers the first example of the success response by default', async () => {
    const res = await app.request('/orders/o-1')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // code=200 names the response that is the default anyway.
  // code=200 は、もともとデフォルトであるレスポンスを指定している。
  it('selects the success response by its code', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=200' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // example=pending picks the second example.
  // example=pending は、2番目の example を選択する。
  it('selects a named example of the success response', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'example=pending' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  // The first example can be named too. It is a $ref to #/components/examples/ShippedOrder,
  // resolved.
  // 最初の example も名前で指定できる。これは #/components/examples/ShippedOrder への $ref で
  // あり、解決済みの値が返る。
  it('selects the first example by its name', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'example=shipped' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // The order of the preferences does not matter.
  // 優先指定の順序は問わない。
  it('accepts the preferences in either order', async () => {
    const res = await app.request('/orders/o-1', {
      headers: { Prefer: 'example=pending, code=200' },
    })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  // An unknown preference is ignored, as RFC 7240 requires.
  // 未知の優先指定は、RFC 7240 の要求どおり無視される。
  it('ignores a preference it does not know', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'foo=bar' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // A preference meant for a real server does not disturb the mock.
  // 実サーバー向けの優先指定が、モックの動作を乱すことはない。
  it('ignores the standard preference return=minimal', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'return=minimal' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // The 404 response is declared with application/problem+json, and the mock answers with that
  // media type and the example of the response.
  // 404 レスポンスは application/problem+json で宣言されており、モックはそのメディアタイプと、
  // レスポンスの example で応答する。
  it('selects a declared error status and keeps its media type', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=404' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // The example is looked up in the response the code selects.
  // example は、code で選択されたレスポンスの中から検索される。
  it('combines a code and an example name', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=404, example=gone' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // RFC 7240 allows a quoted value.
  // RFC 7240 では、引用符付きの値が許容されている。
  it('accepts a quoted example name', async () => {
    const res = await app.request('/orders/o-1', {
      headers: { Prefer: 'code=404, example="gone"' },
    })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // The space after the comma is optional.
  // カンマの後の空白は省略できる。
  it('accepts preferences with no space after the comma', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=404,example=gone' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // A semicolon separates as well as a comma.
  // セミコロンも、カンマと同じく区切りとして扱われる。
  it('accepts preferences separated by a semicolon', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=404; example=gone' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // A preference name is case-insensitive.
  // 優先指定の名前は、大文字小文字を区別しない。
  it('reads the preference name whatever its case', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'CODE=404' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // Surrounding whitespace is not part of the value.
  // 前後の空白は、値の一部ではない。
  it('ignores the whitespace around the header value', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: '  code=404  ' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // RFC 7240: when a preference is repeated, the first one counts.
  // RFC 7240 の規定により、同じ優先指定が繰り返された場合は、最初のものが採用される。
  it('keeps the first of a preference given twice', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=404, code=503' } })
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // The 503 response declares no content: the body is empty and there is no Content-Type.
  // 503 レスポンスは content を宣言していない。ボディは空で、Content-Type も付かない。
  it('answers a response without content with an empty body', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=503' } })
    expect(res.status).toBe(503)
    expect(res.headers.get('Content-Type')).toBeNull()
    expect(await res.text()).toBe('')
  })

  // 409 is not declared, the range 4XX is: the mock answers the 4XX response with the status
  // that was asked for. The body is generated, since 4XX declares no example.
  // 409 は宣言されていないが、範囲指定の 4XX は宣言されている。モックは、
  // 要求されたステータスで 4XX レスポンスを返す。4XX には example がないため、
  // ボディは生成される。
  it('falls back to the 4XX range for 409', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=409' } })
    expect(res.status).toBe(409)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // The lowest status of the range.
  // 範囲内の最小のステータス。
  it('falls back to the 4XX range for 400, its first status', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=400' } })
    expect(res.status).toBe(400)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // The highest status of the range.
  // 範囲内の最大のステータス。
  it('falls back to the 4XX range for 499, its last status', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=499' } })
    expect(res.status).toBe(499)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // 502 is not declared and no range covers it, so the default response answers, with the
  // status that was asked for.
  // 502 は宣言されておらず、該当する範囲指定もない。そのため default レスポンスが、
  // 要求されたステータスで応答する。
  it('falls back to default for 502', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=502' } })
    expect(res.status).toBe(502)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // default covers every status that is not declared, a success status included.
  // default は、成功ステータスを含め、宣言されていないすべてのステータスをカバーする。
  it('falls back to default for 201', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=201' } })
    expect(res.status).toBe(201)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // The highest status a Prefer code may name.
  // Prefer の code で指定できる最大のステータス。
  it('falls back to default for 599, the highest status', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=599' } })
    expect(res.status).toBe(599)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    const body: unknown = await res.json()
    expect(problemSchema.safeParse(body).error).toBeUndefined()
  })

  // The mock does not guess: an example that does not exist is an error of the caller, answered
  // with 500 problem+json that says what is wrong.
  // モックは推測を行わない。存在しない example の指定は呼び出し側の誤りであり、
  // 何が誤りかを示す 500 の problem+json で応答する。
  it('answers 500 for an example that is not declared', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'example=missing' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'No example named "missing" is declared for the 200 response.',
    })
  })

  // An example name is case-sensitive, unlike a preference name.
  // 優先指定の名前と違い、example の名前は大文字小文字を区別する。
  it('answers 500 for an example name in another case', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'example=PENDING' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'No example named "PENDING" is declared for the 200 response.',
    })
  })

  // "pending" is an example of the 200 response, not of the 404 one.
  // "pending" は 200 レスポンスの example であり、404 レスポンスのものではない。
  it('answers 500 for an example of another response', async () => {
    const res = await app.request('/orders/o-1', {
      headers: { Prefer: 'code=404, example=pending' },
    })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'No example named "pending" is declared for the 404 response.',
    })
  })

  // A word is not a status code.
  // 単語はステータスコードではない。
  it('answers 500 for a code that is not a number', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=abc' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=abc is not a status code between 200 and 599.',
    })
  })

  // An empty code is not a status code.
  // 空の code はステータスコードではない。
  it('answers 500 for an empty code', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code= is not a status code between 200 and 599.',
    })
  })

  // One below the lowest status, 200.
  // 最小のステータス 200 を 1 下回る。
  it('answers 500 for the code 199', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=199' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=199 is not a status code between 200 and 599.',
    })
  })

  // One above the highest status, 599.
  // 最大のステータス 599 を 1 超える。
  it('answers 500 for the code 600', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=600' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=600 is not a status code between 200 and 599.',
    })
  })

  // A status code is an integer.
  // ステータスコードは整数である。
  it('answers 500 for a code that is a fraction', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=200.5' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=200.5 is not a status code between 200 and 599.',
    })
  })

  // A status code is not negative.
  // ステータスコードは負の値を取らない。
  it('answers 500 for a negative code', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=-1' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=-1 is not a status code between 200 and 599.',
    })
  })

  // A status code is exactly three digits.
  // ステータスコードは、ちょうど3桁である。
  it('answers 500 for a code with a leading zero', async () => {
    const res = await app.request('/orders/o-1', { headers: { Prefer: 'code=0404' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=0404 is not a status code between 200 and 599.',
    })
  })

  // /formats declares 200 only, with no range and no default, so there is nothing to answer 500
  // with.
  // /formats は 200 だけを宣言しており、範囲指定も default もない。そのため、
  // 500 として返せるレスポンスが存在しない。
  it('answers 500 for a status a route without default does not declare', async () => {
    const res = await app.request('/formats', { headers: { Prefer: 'code=500' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'No 500 response is declared for this operation.',
    })
  })

  // The 200 response of /formats has no examples.
  // /formats の 200 レスポンスには、examples がない。
  it('answers 500 for an example of a response that declares none', async () => {
    const res = await app.request('/formats', { headers: { Prefer: 'example=x' } })
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'No example named "x" is declared for the 200 response.',
    })
  })
})

// The same selection through the query string.
// クエリ文字列による、同じ選択方法。
describe('Prefer: the __code and __example query parameters', () => {
  // For a client that cannot set a header, such as a browser address bar.
  // ブラウザのアドレスバーなど、ヘッダーを設定できないクライアント向けの指定方法。
  it('reads __code from the query', async () => {
    const res = await app.request('/orders/o-1?__code=503')
    expect(res.status).toBe(503)
    expect(await res.text()).toBe('')
  })

  // The same as example=pending.
  // example=pending と同じ指定。
  it('reads __example from the query', async () => {
    const res = await app.request('/orders/o-1?__example=pending')
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  // The same as code=404, example=gone.
  // code=404, example=gone と同じ指定。
  it('reads __code and __example together', async () => {
    const res = await app.request('/orders/o-1?__code=404&__example=gone')
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({ title: 'Order deleted', status: 404 })
  })

  // The query is checked like the header.
  // クエリも、ヘッダーと同じように検証される。
  it('answers 500 for an invalid __code', async () => {
    const res = await app.request('/orders/o-1?__code=abc')
    expect(res.status).toBe(500)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    expect(await res.json()).toStrictEqual({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail: 'Prefer code=abc is not a status code between 200 and 599.',
    })
  })

  // When both are sent, the query is the one that counts.
  // 両方が送信された場合は、クエリ側が採用される。
  it('lets the query win over the header for the code', async () => {
    const res = await app.request('/orders/o-1?__code=503', { headers: { Prefer: 'code=404' } })
    expect(res.status).toBe(503)
  })

  // The same for the example.
  // example についても同様である。
  it('lets the query win over the header for the example', async () => {
    const res = await app.request('/orders/o-1?__example=pending', {
      headers: { Prefer: 'example=shipped' },
    })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-2', state: 'pending' })
  })
})

// A path parameter with a reserved value asks for the declared 404 without any header.
// 予約された値のパスパラメータにより、ヘッダーなしで宣言済みの 404 を要求できる。
describe('the 404 sentinel', () => {
  // The path parameter __non_existent__ is the sentinel of a string parameter: the mock answers
  // the declared 404, with its media type. The body is generated here, not the example "gone"
  // that Prefer code=404 answers.
  // パスパラメータ __non_existent__ は、string パラメータの番兵値である。モックは、
  // 宣言された 404 をそのメディアタイプで返す。このときのボディは生成されたものであり、
  // Prefer code=404 のときに返る example "gone" ではない。
  it('answers the declared 404 for the sentinel of a string parameter', async () => {
    const res = await app.request('/orders/__non_existent__')
    expect(res.status).toBe(404)
    expect(res.headers.get('Content-Type')).toBe('application/problem+json')
    const body: unknown = await res.json()
    expect(problemJsonSchema.safeParse(body).error).toBeUndefined()
  })

  // Prefer is what the caller asked for; the sentinel is only a default.
  // Prefer は呼び出し側の明示的な要求であり、番兵値は既定の挙動にすぎない。
  it('lets an explicit code win over the sentinel', async () => {
    const res = await app.request('/orders/__non_existent__', { headers: { Prefer: 'code=200' } })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // Naming an example of the success response selects the success response.
  // 成功レスポンスの example を指定すると、成功レスポンスが選択される。
  it('lets an explicit example win over the sentinel', async () => {
    const res = await app.request('/orders/__non_existent__', {
      headers: { Prefer: 'example=pending' },
    })
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-2', state: 'pending' })
  })

  // An id that is not the sentinel, multi-byte text included, is an ordinary id.
  // 番兵値でない id は、マルチバイト文字を含め、通常の id として扱われる。
  it('answers any other id with the success response', async () => {
    const res = await app.request(`/orders/${encodeURIComponent('注文')}`)
    expect(res.status).toBe(200)
    expect(res.headers.get('Content-Type')).toBe('application/json')
    expect(await res.json()).toStrictEqual({ id: 'o-1', state: 'shipped' })
  })

  // /orders/{orderId} declares GET only.
  // /orders/{orderId} が宣言しているのは GET だけである。
  it('does not route a method the spec does not declare', async () => {
    const res = await app.request('/orders/o-1', { method: 'POST' })
    expect(res.status).toBe(404)
  })
})
