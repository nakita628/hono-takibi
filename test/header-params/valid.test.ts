// Every parameter shape the generator supports, sent as a real header. Headers arrive as
// strings just like query and path values, but they reach the generator through a
// different branch, one that used to skip coercion entirely, so every numeric or boolean
// header rejected its own input.
//
// 生成器が対応するすべてのパラメータ形状を、実際のヘッダーとして送信して検証する。
// ヘッダーもクエリやパスと同じく文字列で届くが、生成器内では別の分岐を通る。その分岐は
// かつて coerce を完全にスキップしており、数値・真偽値のヘッダーはすべて自身の入力を
// 拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the headers its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A header that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取ったヘッダーを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないヘッダーは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// What a header cannot carry / ヘッダーで運べない値:
//   A header value is a ByteString, and the Fetch API strips the whitespace around it. So a
//   value with a character past U+00FF, or with leading or trailing whitespace, never
//   reaches the server as written, and the values of that kind that the path and query
//   suites test have no counterpart here. `format: emoji` has no header for the same
//   reason. invalid.test.ts proves each of these limits.
//   ヘッダー値は ByteString であり、Fetch API は前後の空白を取り除く。そのため、U+00FF を
//   超える文字を含む値や、前後に空白のある値は、書かれたとおりにはサーバーへ届かない。
//   path・query のスイートが検証するその種の値は、ここには対応するテストがない。
//   `format: emoji` のヘッダーが存在しないのも同じ理由である。これらの制限は、
//   invalid.test.ts で個別に検証している。
//
// Routes / ルート:
//   /headers   every shape as `x-<shape>`, and the array `x-ids`, all optional
//              全形状(`x-<shape>`)と配列 `x-ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  headers with a default / デフォルト値を持つヘッダー
//   /required  required headers / 必須ヘッダー
//
// This file holds the requests that are accepted. Each answers 200, and the test asserts the
// type and the value that reached the handler.
// このファイルには、受理されるリクエストをまとめている。いずれも 200 を返し、
// テストではハンドラに届いた型と値を検証する。
//
// Contents / 目次:
//   - shapes: every supported shape accepts its own value
//   - integers: accepted boundaries
//   - floats: accepted values
//   - booleans: accepted spellings
//   - formats: what each string format accepts
//   - literals, constraints and transforms
//   - optional: absent and present
//   - defaults
//   - required
//   - names
//   - wire: what a header value carries
//   - arrays
//   - leniency: what z.coerce reads beyond a decimal literal (pinned, not endorsed)
import { describe, expect, it } from 'vite-plus/test'

import { headerParamsApp } from './app'

// One canonical value per shape, sent alone as the header x-<shape>. The value is compared as
// well as the type: a coercion that changes the value is as wrong as one that changes the
// type.
// 形状ごとの代表値を、ヘッダー x-<shape> として単独で送信する。型だけでなく値も比較する。
// 値を変えてしまう変換は、型を誤る変換と同じく不具合である。
describe('shapes: every supported shape accepts its own value', () => {
  // An integer with no format arrives as a number.
  // フォーマット指定のない integer は number として届く。
  it('x-integer accepts "42"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '42' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '42' },
    })
  })

  // An int32 arrives as a number.
  // int32 は number として届く。
  it('x-int32 accepts "42"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '42' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int32': { valueType: 'number', valueText: '42' },
    })
  })

  // An int64 arrives as a bigint, exact past Number.MAX_SAFE_INTEGER.
  // int64 は bigint として届き、Number.MAX_SAFE_INTEGER を超えても桁落ちしない。
  it('x-int64 accepts "9007199254740993"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // format: bigint arrives as a bigint.
  // format: bigint は bigint として届く。
  it('x-bigint accepts "9007199254740993"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-bigint': '9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-bigint': { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // A uint32 arrives as a number, up to its maximum.
  // uint32 は最大値まで number として届く。
  it('x-uint32 accepts "4294967295"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '4294967295' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint32': { valueType: 'number', valueText: '4294967295' },
    })
  })

  // A uint64 arrives as a bigint, up to its maximum, which no double can hold.
  // uint64 は最大値まで bigint として届く。この最大値は double では保持できない。
  it('x-uint64 accepts "18446744073709551615"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uint64': '18446744073709551615' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint64': { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // A number with no format arrives as a number.
  // フォーマット指定のない number は number として届く。
  it('x-number accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float arrives as a number.
  // format: float は number として届く。
  it('x-float accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float': { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float32 arrives as a number.
  // format: float32 は number として届く。
  it('x-float32 accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float32': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float32': { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float64 arrives as a number.
  // format: float64 は number として届く。
  it('x-float64 accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float64': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float64': { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: double arrives as a number.
  // format: double は number として届く。
  it('x-double accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-double': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-double': { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: password on a number is an annotation; the value is still a number.
  // number に対する format: password は注釈にすぎず、値は number のまま届く。
  it('x-numpassword accepts "1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-numpassword': '1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-numpassword': { valueType: 'number', valueText: '1.5' },
    })
  })

  // A boolean arrives as a boolean, not as the text "true".
  // boolean は文字列 "true" ではなく boolean として届く。
  it('x-boolean accepts "true"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // A string arrives unchanged.
  // string はそのまま届く。
  it('x-string accepts "plain"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'plain' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'plain' },
    })
  })

  // A well-formed email address.
  // 正しい形式のメールアドレス。
  it('x-email accepts "user@example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'user@example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-email': { valueType: 'string', valueText: 'user@example.com' },
    })
  })

  // A UUID of any version (here version 7).
  // 任意バージョンの UUID(ここではバージョン 7)。
  it('x-uuid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuid': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // A version 4 UUID.
  // バージョン 4 の UUID。
  it('x-uuidv4 accepts "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuidv4': 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuidv4': { valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
  })

  // A version 7 UUID.
  // バージョン 7 の UUID。
  it('x-uuidv7 accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuidv7': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuidv7': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // An absolute URL.
  // 絶対 URL。
  it('x-url accepts "https://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-url': 'https://example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-url': { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // format: uri is validated like a URL.
  // format: uri は URL と同じ検証を受ける。
  it('x-uri accepts "https://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uri': 'https://example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uri': { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // An https URL.
  // https の URL。
  it('x-httpurl accepts "https://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'https://example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-httpurl': { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // A host name.
  // ホスト名。
  it('x-hostname accepts "example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': 'example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: 'example.com' },
    })
  })

  // Hexadecimal digits.
  // 16進数の文字列。
  it('x-hex accepts "deadbeef"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hex': 'deadbeef' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hex': { valueType: 'string', valueText: 'deadbeef' },
    })
  })

  // Base64 with padding.
  // パディング付きの Base64。
  it('x-base64 accepts "aGVsbG8="', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': 'aGVsbG8=' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-base64': { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // Base64url, which has no padding.
  // パディングのない Base64url。
  it('x-base64url accepts "aGVsbG8"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64url': 'aGVsbG8' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-base64url': { valueType: 'string', valueText: 'aGVsbG8' },
    })
  })

  // A 21-character Nano ID.
  // 21文字の Nano ID。
  it('x-nanoid accepts "V1StGXR8_Z5jdHi6B-myT"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-nanoid': 'V1StGXR8_Z5jdHi6B-myT' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-nanoid': { valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' },
    })
  })

  // A CUID2.
  // CUID2。
  it('x-cuid2 accepts "tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cuid2': 'tz4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cuid2': { valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' },
    })
  })

  // A 26-character ULID.
  // 26文字の ULID。
  it('x-ulid accepts "01ARZ3NDEKTSV4RRFFQ69G5FAV"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ulid': '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ulid': { valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
    })
  })

  // An IPv4 address.
  // IPv4 アドレス。
  it('x-ipv4 accepts "192.168.0.1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '192.168.0.1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv4': { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An IPv6 address in compressed form.
  // 省略表記の IPv6 アドレス。
  it('x-ipv6 accepts "2001:db8::1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '2001:db8::1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv6': { valueType: 'string', valueText: '2001:db8::1' },
    })
  })

  // An IPv4 CIDR block.
  // IPv4 の CIDR ブロック。
  it('x-cidrv4 accepts "192.168.0.0/24"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv4': '192.168.0.0/24' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv4': { valueType: 'string', valueText: '192.168.0.0/24' },
    })
  })

  // An IPv6 CIDR block.
  // IPv6 の CIDR ブロック。
  it('x-cidrv6 accepts "2001:db8::/32"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv6': '2001:db8::/32' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv6': { valueType: 'string', valueText: '2001:db8::/32' },
    })
  })

  // An ISO 8601 date; it stays a string, it is not turned into a Date.
  // ISO 8601 の日付。Date には変換されず、文字列のまま届く。
  it('x-date accepts "2020-01-02"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020-01-02' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-date': { valueType: 'string', valueText: '2020-01-02' },
    })
  })

  // An ISO 8601 time.
  // ISO 8601 の時刻。
  it('x-time accepts "12:34:56"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '12:34:56' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-time': { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // An ISO 8601 date-time in UTC; it stays a string.
  // UTC の ISO 8601 日時。文字列のまま届く。
  it('x-datetime accepts "2020-01-02T03:04:05Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02T03:04:05Z' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-datetime': { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
    })
  })

  // An ISO 8601 duration with every component.
  // すべての要素を含む ISO 8601 の期間。
  it('x-duration accepts "P1Y2M3DT4H5M6S"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-duration': 'P1Y2M3DT4H5M6S' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-duration': { valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' },
    })
  })

  // format: byte is an annotation; the text is passed through.
  // format: byte は注釈にすぎず、文字列はそのまま渡される。
  it('x-byte accepts "aGVsbG8="', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-byte': 'aGVsbG8=' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-byte': { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // format: password is an annotation; the text is passed through.
  // format: password は注釈にすぎず、文字列はそのまま渡される。
  it('x-strpassword accepts "hunter2"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-strpassword': 'hunter2' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-strpassword': { valueType: 'string', valueText: 'hunter2' },
    })
  })

  // A MAC address with colon separators.
  // コロン区切りの MAC アドレス。
  it('x-mac accepts "00:1a:2b:3c:4d:5e"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '00:1a:2b:3c:4d:5e' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-mac': { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
    })
  })

  // An E.164 phone number.
  // E.164 形式の電話番号。
  it('x-e164 accepts "+14155552671"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-e164': '+14155552671' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-e164': { valueType: 'string', valueText: '+14155552671' },
    })
  })

  // A card number that passes the Luhn check.
  // Luhn チェックを通過するカード番号。
  it('x-creditcard accepts "4111111111111111"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-creditcard': '4111111111111111' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-creditcard': { valueType: 'string', valueText: '4111111111111111' },
    })
  })

  // An IBAN with a valid checksum.
  // チェックサムが正しい IBAN。
  it('x-iban accepts "DE89370400440532013000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-iban': 'DE89370400440532013000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-iban': { valueType: 'string', valueText: 'DE89370400440532013000' },
    })
  })

  // An ISO 4217 currency code.
  // ISO 4217 の通貨コード。
  it('x-currencycode accepts "USD"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'USD' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-currencycode': { valueType: 'string', valueText: 'USD' },
    })
  })

  // A 27-character KSUID.
  // 27文字の KSUID。
  it('x-ksuid accepts "0ujsszwN8NRY24YaXiTIE2VWDTS"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ksuid': '0ujsszwN8NRY24YaXiTIE2VWDTS' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ksuid': { valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' },
    })
  })

  // A 20-character XID.
  // 20文字の XID。
  it('x-xid accepts "9m4e2mr0ui3e8a215n4g"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-xid': '9m4e2mr0ui3e8a215n4g' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-xid': { valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' },
    })
  })

  // A GUID.
  // GUID。
  it('x-guid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-guid': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-guid': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // format: trim leaves a value with no surrounding whitespace unchanged.
  // format: trim は、前後に空白のない値をそのまま通す。
  it('x-trim accepts "spaced"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-trim': 'spaced' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-trim': { valueType: 'string', valueText: 'spaced' },
    })
  })
})

// The first and last value each integer format holds.
// 各整数フォーマットが保持できる最初と最後の値。
describe('integers: accepted boundaries', () => {
  // Zero.
  // ゼロ。
  it('x-integer accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '0' },
    })
  })

  // A negative integer.
  // 負の整数。
  it('x-integer accepts "-1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '-1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '-1' },
    })
  })

  // Number.MAX_SAFE_INTEGER, the last integer a double holds exactly.
  // Number.MAX_SAFE_INTEGER。double が正確に保持できる最後の整数。
  it('x-integer accepts "9007199254740991"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-integer': '9007199254740991' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '9007199254740991' },
    })
  })

  // Number.MIN_SAFE_INTEGER.
  // Number.MIN_SAFE_INTEGER。
  it('x-integer accepts "-9007199254740991"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-integer': '-9007199254740991' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '-9007199254740991' },
    })
  })

  // The int32 maximum, 2^31 - 1.
  // int32 の最大値(2^31 - 1)。
  it('x-int32 accepts "2147483647"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '2147483647' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int32': { valueType: 'number', valueText: '2147483647' },
    })
  })

  // The int32 minimum, -2^31.
  // int32 の最小値(-2^31)。
  it('x-int32 accepts "-2147483648"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '-2147483648' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int32': { valueType: 'number', valueText: '-2147483648' },
    })
  })

  // Zero.
  // ゼロ。
  it('x-int32 accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int32': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int32': { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 minimum.
  // uint32 の最小値。
  it('x-uint32 accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint32': { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 maximum, 2^32 - 1.
  // uint32 の最大値(2^32 - 1)。
  it('x-uint32 accepts "4294967295"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint32': '4294967295' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint32': { valueType: 'number', valueText: '4294967295' },
    })
  })

  // The int64 maximum, 2^63 - 1, kept to the last digit.
  // int64 の最大値(2^63 - 1)。最後の桁まで保持される。
  it('x-int64 accepts "9223372036854775807"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '9223372036854775807' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '9223372036854775807' },
    })
  })

  // The int64 minimum, -2^63.
  // int64 の最小値(-2^63)。
  it('x-int64 accepts "-9223372036854775808"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '-9223372036854775808' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '-9223372036854775808' },
    })
  })

  // Zero is a bigint too.
  // ゼロも bigint として届く。
  it('x-int64 accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 minimum.
  // uint64 の最小値。
  it('x-uint64 accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-uint64': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint64': { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 maximum, 2^64 - 1.
  // uint64 の最大値(2^64 - 1)。
  it('x-uint64 accepts "18446744073709551615"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uint64': '18446744073709551615' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uint64': { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // format: bigint has no upper bound.
  // format: bigint には上限がない。
  it('x-bigint accepts "99999999999999999999999999999"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-bigint': '99999999999999999999999999999' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-bigint': { valueType: 'bigint', valueText: '99999999999999999999999999999' },
    })
  })

  // format: bigint has no lower bound.
  // format: bigint には下限がない。
  it('x-bigint accepts "-99999999999999999999999999999"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-bigint': '-99999999999999999999999999999' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-bigint': { valueType: 'bigint', valueText: '-99999999999999999999999999999' },
    })
  })
})

// Notations of a number, and the edges of float32 and float64.
// 数値の各種表記と、float32・float64 の境界値。
describe('floats: accepted values', () => {
  // Zero.
  // ゼロ。
  it('x-number accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '0' },
    })
  })

  // A negative fraction.
  // 負の小数。
  it('x-number accepts "-1.5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '-1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '-1.5' },
    })
  })

  // Exponent notation.
  // 指数表記。
  it('x-number accepts "1e3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '1000' },
    })
  })

  // A negative exponent.
  // 負の指数。
  it('x-number accepts "1e-3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '1e-3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '0.001' },
    })
  })

  // No digit before the decimal point.
  // 小数点の前の数字を省略した表記。
  it('x-number accepts ".5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '0.5' },
    })
  })

  // No digit after the decimal point.
  // 小数点の後の数字を省略した表記。
  it('x-number accepts "5."', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '5.' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '5' },
    })
  })

  // The largest finite float32.
  // float32 の最大有限値。
  it('x-float32 accepts "3.4028234e38"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-float32': '3.4028234e38' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float32': { valueType: 'number', valueText: '3.4028234e+38' },
    })
  })

  // The smallest finite float32.
  // float32 の最小有限値。
  it('x-float32 accepts "-3.4028234e38"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-float32': '-3.4028234e38' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float32': { valueType: 'number', valueText: '-3.4028234e+38' },
    })
  })

  // Too small for a float32 to represent: underflow is not a range error.
  // float32 では表現できないほど小さい値。アンダーフローは範囲エラーにならない。
  it('x-float32 accepts "1e-50"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float32': '1e-50' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float32': { valueType: 'number', valueText: '1e-50' },
    })
  })

  // A value a float32 cannot hold exactly is not rounded.
  // float32 で正確に表現できない値でも、丸められずに届く。
  it('x-float32 accepts "0.1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-float32': '0.1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float32': { valueType: 'number', valueText: '0.1' },
    })
  })

  // Number.MAX_VALUE, the largest finite double.
  // Number.MAX_VALUE。double の最大有限値。
  it('x-float64 accepts "1.7976931348623157e308"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-float64': '1.7976931348623157e308' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-float64': { valueType: 'number', valueText: '1.7976931348623157e+308' },
    })
  })

  // The smallest finite double.
  // double の最小有限値。
  it('x-double accepts "-1.7976931348623157e308"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-double': '-1.7976931348623157e308' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-double': { valueType: 'number', valueText: '-1.7976931348623157e+308' },
    })
  })
})

// The generated schema is z.stringbool(), the wire form of a boolean: z.coerce.boolean()
// would read every non-empty value, "false" included, as true.
// 生成されるスキーマは、真偽値のワイヤ形式である z.stringbool() である。
// z.coerce.boolean() だと、空でない値は "false" を含めてすべて true になってしまう。
describe('booleans: accepted spellings', () => {
  // The literal true.
  // リテラルの true。
  it('x-boolean accepts "true"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The literal false; a naive Boolean("false") would have been true.
  // リテラルの false。素朴な Boolean("false") では true になってしまう。
  it('x-boolean accepts "false"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'false' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // Upper case is read the same.
  // 大文字でも同じように読み取られる。
  it('x-boolean accepts "TRUE"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'TRUE' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // Mixed case is read the same.
  // 大文字小文字が混在していても同じように読み取られる。
  it('x-boolean accepts "False"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'False' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // The digit 1 means true.
  // 数字の 1 は true を意味する。
  it('x-boolean accepts "1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The digit 0 means false.
  // 数字の 0 は false を意味する。
  it('x-boolean accepts "0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "yes" means true.
  // "yes" は true を意味する。
  it('x-boolean accepts "yes"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'yes' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "no" means false.
  // "no" は false を意味する。
  it('x-boolean accepts "no"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'no' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "on" means true.
  // "on" は true を意味する。
  it('x-boolean accepts "on"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'on' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "off" means false.
  // "off" は false を意味する。
  it('x-boolean accepts "off"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'off' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "y" means true.
  // "y" は true を意味する。
  it('x-boolean accepts "y"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'y' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "n" means false.
  // "n" は false を意味する。
  it('x-boolean accepts "n"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'n' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "enabled" means true.
  // "enabled" は true を意味する。
  it('x-boolean accepts "enabled"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'enabled' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "disabled" means false.
  // "disabled" は false を意味する。
  it('x-boolean accepts "disabled"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': 'disabled' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'false' },
    })
  })
})

// The less obvious values each format takes, beyond the canonical one in section 1.
// セクション 1 の代表値以外に、各フォーマットが受理する分かりにくい値。
describe('formats: what each string format accepts', () => {
  // Upper case is valid, and is not lower-cased.
  // 大文字も有効であり、小文字化はされない。
  it('x-email accepts "USER@EXAMPLE.COM"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'USER@EXAMPLE.COM' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-email': { valueType: 'string', valueText: 'USER@EXAMPLE.COM' },
    })
  })

  // A plus tag in the local part.
  // ローカル部にプラス記号のタグを含む。
  it('x-email accepts "user+tag@example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'user+tag@example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-email': { valueType: 'string', valueText: 'user+tag@example.com' },
    })
  })

  // Dots in the local part and a multi-level domain.
  // ローカル部のドットと、多階層のドメイン。
  it('x-email accepts "first.last@sub.example.co.jp"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-email': 'first.last@sub.example.co.jp' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-email': { valueType: 'string', valueText: 'first.last@sub.example.co.jp' },
    })
  })

  // Upper-case hexadecimal digits.
  // 大文字の16進数。
  it('x-uuid accepts "0190B1F4-0000-7000-8000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '0190B1F4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuid': { valueType: 'string', valueText: '0190B1F4-0000-7000-8000-000000000000' },
    })
  })

  // The nil UUID, which carries no version.
  // バージョンを持たない nil UUID。
  it('x-uuid accepts "00000000-0000-0000-0000-000000000000"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': '00000000-0000-0000-0000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuid': { valueType: 'string', valueText: '00000000-0000-0000-0000-000000000000' },
    })
  })

  // The max UUID, which carries no version.
  // バージョンを持たない max UUID。
  it('x-uuid accepts "ffffffff-ffff-ffff-ffff-ffffffffffff"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': 'ffffffff-ffff-ffff-ffff-ffffffffffff' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuid': { valueType: 'string', valueText: 'ffffffff-ffff-ffff-ffff-ffffffffffff' },
    })
  })

  // A GUID checks the 8-4-4-4-12 layout only, not the version or variant.
  // GUID は 8-4-4-4-12 の形だけを検証し、バージョンやバリアントは見ない。
  it('x-guid accepts "a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-guid': 'a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-guid': { valueType: 'string', valueText: 'a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d' },
    })
  })

  // format: url takes any scheme, not only http.
  // format: url は http に限らず任意のスキームを受理する。
  it('x-url accepts "ftp://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-url': 'ftp://example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-url': { valueType: 'string', valueText: 'ftp://example.com' },
    })
  })

  // A scheme with no authority.
  // オーソリティ部のないスキーム。
  it('x-url accepts "mailto:a@b.c"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-url': 'mailto:a@b.c' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-url': { valueType: 'string', valueText: 'mailto:a@b.c' },
    })
  })

  // A port, a path, a query and a fragment.
  // ポート・パス・クエリ・フラグメントを含む。
  it('x-url accepts "http://localhost:3000/a?b=c#d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-url': 'http://localhost:3000/a?b=c#d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-url': { valueType: 'string', valueText: 'http://localhost:3000/a?b=c#d' },
    })
  })

  // A URN is a URI.
  // URN も URI である。
  it('x-uri accepts "urn:isbn:0451450523"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uri': 'urn:isbn:0451450523' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uri': { valueType: 'string', valueText: 'urn:isbn:0451450523' },
    })
  })

  // Plain http.
  // 暗号化なしの http。
  it('x-httpurl accepts "http://example.com"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'http://example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-httpurl': { valueType: 'string', valueText: 'http://example.com' },
    })
  })

  // A path and a query.
  // パスとクエリを含む。
  it('x-httpurl accepts "https://example.com/a/b?c=d"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-httpurl': 'https://example.com/a/b?c=d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-httpurl': { valueType: 'string', valueText: 'https://example.com/a/b?c=d' },
    })
  })

  // A single label.
  // 単一ラベルのホスト名。
  it('x-hostname accepts "localhost"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': 'localhost' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: 'localhost' },
    })
  })

  // One-character labels.
  // 1文字のラベル。
  it('x-hostname accepts "a.b.c"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hostname': 'a.b.c' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: 'a.b.c' },
    })
  })

  // An internationalised name in punycode.
  // Punycode で表記した国際化ドメイン名。
  it('x-hostname accepts "xn--r8jz45g.jp"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': 'xn--r8jz45g.jp' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: 'xn--r8jz45g.jp' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('x-hex accepts "DEADBEEF"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hex': 'DEADBEEF' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hex': { valueType: 'string', valueText: 'DEADBEEF' },
    })
  })

  // An odd number of digits.
  // 桁数が奇数の16進数。
  it('x-hex accepts "abc"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-hex': 'abc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hex': { valueType: 'string', valueText: 'abc' },
    })
  })

  // "+" and "/" are what set base64 apart from base64url.
  // "+" と "/" は base64 と base64url を分ける文字である。
  it('x-base64 accepts "a+b/"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': 'a+b/' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-base64': { valueType: 'string', valueText: 'a+b/' },
    })
  })

  // Two padding characters.
  // パディングが2文字。
  it('x-base64 accepts "YQ=="', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64': 'YQ==' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-base64': { valueType: 'string', valueText: 'YQ==' },
    })
  })

  // "-" and "_" are the base64url alphabet.
  // "-" と "_" は base64url の文字である。
  it('x-base64url accepts "a-b_"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-base64url': 'a-b_' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-base64url': { valueType: 'string', valueText: 'a-b_' },
    })
  })

  // format: byte does not validate: text that is not base64 passes.
  // format: byte は検証を行わない。Base64 でない文字列も通る。
  it('x-byte accepts "!!!not-base64!!!"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-byte': '!!!not-base64!!!' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-byte': { valueType: 'string', valueText: '!!!not-base64!!!' },
    })
  })

  // format: password does not validate: reserved characters pass.
  // format: password は検証を行わない。予約文字も通る。
  it('x-strpassword accepts "p@ss/w0rd?#"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-strpassword': 'p@ss/w0rd?#' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-strpassword': { valueType: 'string', valueText: 'p@ss/w0rd?#' },
    })
  })

  // A ULID is case-insensitive.
  // ULID は大文字小文字を区別しない。
  it('x-ulid accepts "01arz3ndektsv4rrffq69g5fav"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ulid': '01arz3ndektsv4rrffq69g5fav' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ulid': { valueType: 'string', valueText: '01arz3ndektsv4rrffq69g5fav' },
    })
  })

  // Upper case is accepted.
  // 大文字も受理される。
  it('x-xid accepts "9M4E2MR0UI3E8A215N4G"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-xid': '9M4E2MR0UI3E8A215N4G' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-xid': { valueType: 'string', valueText: '9M4E2MR0UI3E8A215N4G' },
    })
  })

  // The lowest address.
  // 最小のアドレス。
  it('x-ipv4 accepts "0.0.0.0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv4': '0.0.0.0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv4': { valueType: 'string', valueText: '0.0.0.0' },
    })
  })

  // The highest address.
  // 最大のアドレス。
  it('x-ipv4 accepts "255.255.255.255"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ipv4': '255.255.255.255' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv4': { valueType: 'string', valueText: '255.255.255.255' },
    })
  })

  // The unspecified address.
  // 未指定アドレス。
  it('x-ipv6 accepts "::"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '::' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv6': { valueType: 'string', valueText: '::' },
    })
  })

  // The loopback address.
  // ループバックアドレス。
  it('x-ipv6 accepts "::1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ipv6': '::1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv6': { valueType: 'string', valueText: '::1' },
    })
  })

  // The full form, nothing compressed.
  // 省略のない完全表記。
  it('x-ipv6 accepts "2001:0db8:0000:0000:0000:0000:0000:0001"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ipv6': '2001:0db8:0000:0000:0000:0000:0000:0001' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv6': { valueType: 'string', valueText: '2001:0db8:0000:0000:0000:0000:0000:0001' },
    })
  })

  // An IPv4-mapped address.
  // IPv4 射影アドレス。
  it('x-ipv6 accepts "::ffff:192.168.0.1"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-ipv6': '::ffff:192.168.0.1' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ipv6': { valueType: 'string', valueText: '::ffff:192.168.0.1' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('x-cidrv4 accepts "0.0.0.0/0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-cidrv4': '0.0.0.0/0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv4': { valueType: 'string', valueText: '0.0.0.0/0' },
    })
  })

  // The longest prefix, /32.
  // 最長のプレフィックス /32。
  it('x-cidrv4 accepts "10.0.0.1/32"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv4': '10.0.0.1/32' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv4': { valueType: 'string', valueText: '10.0.0.1/32' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('x-cidrv6 accepts "::/0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-cidrv6': '::/0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv6': { valueType: 'string', valueText: '::/0' },
    })
  })

  // The longest prefix, /128.
  // 最長のプレフィックス /128。
  it('x-cidrv6 accepts "2001:db8::/128"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cidrv6': '2001:db8::/128' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cidrv6': { valueType: 'string', valueText: '2001:db8::/128' },
    })
  })

  // 29 February of a leap year.
  // うるう年の 2月29日。
  it('x-date accepts "2020-02-29"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '2020-02-29' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-date': { valueType: 'string', valueText: '2020-02-29' },
    })
  })

  // Year zero.
  // 西暦 0 年。
  it('x-date accepts "0000-01-01"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '0000-01-01' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-date': { valueType: 'string', valueText: '0000-01-01' },
    })
  })

  // The last four-digit date.
  // 4桁の年で表せる最後の日付。
  it('x-date accepts "9999-12-31"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-date': '9999-12-31' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-date': { valueType: 'string', valueText: '9999-12-31' },
    })
  })

  // Midnight.
  // 午前 0 時。
  it('x-time accepts "00:00:00"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '00:00:00' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-time': { valueType: 'string', valueText: '00:00:00' },
    })
  })

  // The last second of the day.
  // 1日の最後の秒。
  it('x-time accepts "23:59:59"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '23:59:59' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-time': { valueType: 'string', valueText: '23:59:59' },
    })
  })

  // Seconds may be left out.
  // 秒は省略できる。
  it('x-time accepts "12:34"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '12:34' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-time': { valueType: 'string', valueText: '12:34' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('x-time accepts "12:34:56.789"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-time': '12:34:56.789' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-time': { valueType: 'string', valueText: '12:34:56.789' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('x-datetime accepts "2020-01-02T03:04:05.123Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-01-02T03:04:05.123Z' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-datetime': { valueType: 'string', valueText: '2020-01-02T03:04:05.123Z' },
    })
  })

  // The last second of a leap day.
  // うるう日の最後の秒。
  it('x-datetime accepts "2020-02-29T23:59:59Z"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-datetime': '2020-02-29T23:59:59Z' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-datetime': { valueType: 'string', valueText: '2020-02-29T23:59:59Z' },
    })
  })

  // A date component alone.
  // 日付要素のみ。
  it('x-duration accepts "P1Y"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'P1Y' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-duration': { valueType: 'string', valueText: 'P1Y' },
    })
  })

  // A time component alone.
  // 時刻要素のみ。
  it('x-duration accepts "PT1S"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'PT1S' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-duration': { valueType: 'string', valueText: 'PT1S' },
    })
  })

  // Weeks.
  // 週。
  it('x-duration accepts "P1W"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'P1W' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-duration': { valueType: 'string', valueText: 'P1W' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('x-duration accepts "PT0.5S"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-duration': 'PT0.5S' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-duration': { valueType: 'string', valueText: 'PT0.5S' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('x-mac accepts "00:1A:2B:3C:4D:5E"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-mac': '00:1A:2B:3C:4D:5E' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-mac': { valueType: 'string', valueText: '00:1A:2B:3C:4D:5E' },
    })
  })

  // Hyphens between groups; the Luhn check runs on the digits.
  // グループ間のハイフン。Luhn チェックは数字部分に対して行われる。
  it('x-creditcard accepts "4111-1111-1111-1111"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-creditcard': '4111-1111-1111-1111' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-creditcard': { valueType: 'string', valueText: '4111-1111-1111-1111' },
    })
  })

  // Spaces between groups.
  // グループ間の空白。
  it('x-creditcard accepts "4111 1111 1111 1111"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-creditcard': '4111 1111 1111 1111' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-creditcard': { valueType: 'string', valueText: '4111 1111 1111 1111' },
    })
  })

  // A 15-digit number.
  // 15桁のカード番号。
  it('x-creditcard accepts "378282246310005"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-creditcard': '378282246310005' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-creditcard': { valueType: 'string', valueText: '378282246310005' },
    })
  })

  // Letters in the account part.
  // 口座部分に英字を含む。
  it('x-iban accepts "GB82WEST12345698765432"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-iban': 'GB82WEST12345698765432' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-iban': { valueType: 'string', valueText: 'GB82WEST12345698765432' },
    })
  })

  // Another ISO 4217 code.
  // 別の ISO 4217 コード。
  it('x-currencycode accepts "JPY"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'JPY' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-currencycode': { valueType: 'string', valueText: 'JPY' },
    })
  })

  // ISO 4217 reserves XXX for "no currency".
  // ISO 4217 は XXX を「通貨なし」として予約している。
  it('x-currencycode accepts "XXX"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-currencycode': 'XXX' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-currencycode': { valueType: 'string', valueText: 'XXX' },
    })
  })
})

// The same keywords as in a path or a query string, on the header branch of the generator.
// path や query と同じキーワードを、生成器のヘッダー用の分岐で検証する。
describe('literals, constraints and transforms', () => {
  // The first member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最初のメンバー。
  it('x-ienum accepts "1"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ienum': '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ienum': { valueType: 'number', valueText: '1' },
    })
  })

  // The last member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最後のメンバー。
  it('x-ienum accepts "3"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ienum': '3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ienum': { valueType: 'number', valueText: '3' },
    })
  })

  // The only member of the boolean enum [true].
  // boolean の enum [true] の唯一のメンバー。
  it('x-benum accepts "true"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-benum': 'true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-benum': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The constant of const: 7.
  // const: 7 の定数値。
  it('x-iconst accepts "7"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-iconst': '7' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-iconst': { valueType: 'number', valueText: '7' },
    })
  })

  // A member of the string enum [asc, desc].
  // string の enum [asc, desc] のメンバー。
  it('x-senum accepts "asc"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-senum': 'asc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-senum': { valueType: 'string', valueText: 'asc' },
    })
  })

  // The other member of the string enum.
  // string の enum のもう一方のメンバー。
  it('x-senum accepts "desc"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-senum': 'desc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-senum': { valueType: 'string', valueText: 'desc' },
    })
  })

  // oneOf an integer or "all": the integer branch coerces.
  // integer または "all" の oneOf。integer 側の分岐は coerce される。
  it('x-ioneof accepts "4"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ioneof': '4' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ioneof': { valueType: 'number', valueText: '4' },
    })
  })

  // The string branch needs no coercion and arrives as a string.
  // string 側は coerce 不要で、string として届く。
  it('x-ioneof accepts "all"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-ioneof': 'all' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ioneof': { valueType: 'string', valueText: 'all' },
    })
  })

  // The minimum of minimum: 1, maximum: 100 is inclusive.
  // minimum: 1, maximum: 100 の最小値は範囲に含まれる。
  it('x-range accepts "1"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-range': '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-range': { valueType: 'number', valueText: '1' },
    })
  })

  // Inside the range. Compared as text, "9" would sort after "100" and be refused.
  // 範囲内の値。文字列として比較すると "9" は "100" より後に並び、拒否されてしまう。
  it('x-range accepts "9"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-range': '9' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-range': { valueType: 'number', valueText: '9' },
    })
  })

  // The maximum is inclusive.
  // 最大値は範囲に含まれる。
  it('x-range accepts "100"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-range': '100' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-range': { valueType: 'number', valueText: '100' },
    })
  })

  // Exactly minLength: 2.
  // ちょうど minLength: 2 の長さ。
  it('x-length accepts "ab"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-length': 'ab' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-length': { valueType: 'string', valueText: 'ab' },
    })
  })

  // Exactly maxLength: 4.
  // ちょうど maxLength: 4 の長さ。
  it('x-length accepts "abcd"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-length': 'abcd' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-length': { valueType: 'string', valueText: 'abcd' },
    })
  })

  // Matches ^[a-z]+-\d{1,3}$ with one digit.
  // ^[a-z]+-\d{1,3}$ に数字1桁で一致する。
  it('x-pattern accepts "abc-1"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-pattern': 'abc-1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-pattern': { valueType: 'string', valueText: 'abc-1' },
    })
  })

  // Matches with three digits, the most allowed.
  // 許容される最大の数字3桁で一致する。
  it('x-pattern accepts "abc-123"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-pattern': 'abc-123' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-pattern': { valueType: 'string', valueText: 'abc-123' },
    })
  })

  // x-toLowerCase lower-cases the value.
  // x-toLowerCase は値を小文字化する。
  it('x-tx-lower turns "MiXeD" into "mixed"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-tx-lower': 'MiXeD' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-tx-lower': { valueType: 'string', valueText: 'mixed' },
    })
  })

  // A transform paired with a format: the value is lower-cased, then checked as an email.
  // 変換とフォーマットの組み合わせ。小文字化した後、メールアドレスとして検証される。
  it('x-tx-email turns "USER@EXAMPLE.COM" into "user@example.com"', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-tx-email': 'USER@EXAMPLE.COM' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-tx-email': { valueType: 'string', valueText: 'user@example.com' },
    })
  })
})

// /optional declares every header without required: true.
// /optional は、すべてのヘッダーを required: true なしで宣言している。
describe('optional: absent and present', () => {
  // An absent optional header is absent from the validated object: the key is not there at all,
  // which exactOptional guarantees and a value of undefined would not.
  // 省略された任意ヘッダーは、検証済みオブジェクトにも存在しない。
  // キー自体が無いことは exactOptional が保証するもので、値が undefined の場合とは異なる。
  it('answers nothing when nothing is sent', async () => {
    const res = await headerParamsApp.request('/optional')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An optional integer that is sent is coerced.
  // 送信された任意の integer は coerce される。
  it('x-int-opt accepts "5"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-int-opt': '5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-opt': { valueType: 'number', valueText: '5' },
    })
  })

  // An optional int64 keeps its precision.
  // 任意の int64 も桁落ちしない。
  it('x-int64-opt accepts "9007199254740993"', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-int64-opt': '9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64-opt': { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // An optional boolean sent as false arrives as false, not as absent.
  // false として送信された任意の boolean は、省略扱いではなく false として届く。
  it('x-bool-opt accepts "false"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-bool-opt': 'false' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-bool-opt': { valueType: 'boolean', valueText: 'false' },
    })
  })

  // An optional string.
  // 任意の string。
  it('x-str-opt accepts "s"', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-str-opt': 's' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-str-opt': { valueType: 'string', valueText: 's' },
    })
  })

  // Each header keeps its own value and type.
  // 各ヘッダーが自身の値と型を保つ。
  it('accepts several headers in one request', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-int-opt': '5', 'x-bool-opt': 'true', 'x-str-opt': 's' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-opt': { valueType: 'number', valueText: '5' },
      'x-bool-opt': { valueType: 'boolean', valueText: 'true' },
      'x-str-opt': { valueType: 'string', valueText: 's' },
    })
  })

  // An undeclared header is neither rejected nor passed on to the handler, and that includes
  // the ones every request carries.
  // 宣言されていないヘッダーは、拒否もされず、ハンドラにも渡されない。
  // あらゆるリクエストに付く標準ヘッダーについても同様である。
  it('ignores a header the spec does not declare', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: {
        'x-unknown': '1',
        'content-type': 'text/plain',
        'user-agent': 'test',
        authorization: 'Bearer token',
      },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// /defaults declares every header with a default.
// /defaults は、すべてのヘッダーをデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default is a typed value: default: 5 on an int64 arrives as the bigint 5n, not as the
  // number the YAML held.
  // デフォルトは型付きの値である。int64 の default: 5 は、
  // YAML 上の number ではなく bigint の 5n として届く。
  it('applies every default when nothing is sent', async () => {
    const res = await headerParamsApp.request('/defaults')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '20' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })

  // Only x-int-def changes; the other defaults still apply.
  // 変わるのは x-int-def だけで、他のデフォルトは引き続き適用される。
  it('lets a sent integer replace its default', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-int-def': '1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '1' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })

  // The sent value is coerced to a bigint like the default.
  // 送信された値は、デフォルトと同じく bigint に coerce される。
  it('lets a sent int64 replace its default', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-int64-def': '8' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '20' },
      'x-int64-def': { valueType: 'bigint', valueText: '8' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })

  // x-bool-def defaults to false.
  // x-bool-def のデフォルトは false である。
  it('lets true replace a default of false', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-bool-def': 'true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '20' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'true' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })

  // A sent string replaces default: fallback.
  // 送信された string が default: fallback を置き換える。
  it('lets a sent string replace its default', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-str-def': 'd' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '20' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'd' },
    })
  })

  // Zero is a value, not an absence: the default must not win over it.
  // 0 は値であって欠落ではない。デフォルトがこれを上書きしてはならない。
  it('lets zero replace a default of 20', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-int-def': '0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '0' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })
})

// /required declares x-id, x-big, x-flag and x-name with required: true, and x-note without.
// /required は x-id・x-big・x-flag・x-name を required: true で、
// x-note を required なしで宣言している。
describe('required', () => {
  // The optional x-note is left out and is absent from the answer.
  // 任意の x-note は省略しており、応答にも含まれない。
  it('accepts a request that carries every required header', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': '1', 'x-big': '9007199254740993', 'x-flag': 'true', 'x-name': 'n' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-id': { valueType: 'number', valueText: '1' },
      'x-big': { valueType: 'bigint', valueText: '9007199254740993' },
      'x-flag': { valueType: 'boolean', valueText: 'true' },
      'x-name': { valueType: 'string', valueText: 'n' },
    })
  })

  // x-note is declared without required: true.
  // x-note は required: true なしで宣言されている。
  it('accepts the optional header beside the required ones', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: {
        'x-id': '1',
        'x-big': '9007199254740993',
        'x-flag': 'true',
        'x-name': 'n',
        'x-note': '5',
      },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-id': { valueType: 'number', valueText: '1' },
      'x-big': { valueType: 'bigint', valueText: '9007199254740993' },
      'x-flag': { valueType: 'boolean', valueText: 'true' },
      'x-name': { valueType: 'string', valueText: 'n' },
      'x-note': { valueType: 'number', valueText: '5' },
    })
  })
})

// How a header is named on the wire, and how it is named in the handler.
// ワイヤ上でのヘッダー名と、ハンドラ内でのヘッダー名。
describe('names', () => {
  // A header name is case-insensitive on the wire, so however the client spells it, it is the
  // declared header.
  // ヘッダー名はワイヤ上で大文字小文字を区別しない。クライアントがどう綴っても、
  // 宣言されたヘッダーとして扱われる。
  it('reads X-Int-Opt as the header declared in lower case', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'X-Int-Opt': '5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-opt': { valueType: 'number', valueText: '5' },
    })
  })

  // All upper case.
  // すべて大文字の場合。
  it('reads X-INT-OPT as the header declared in lower case', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'X-INT-OPT': '5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-opt': { valueType: 'number', valueText: '5' },
    })
  })

  // Arbitrary mixed case.
  // 任意の大文字小文字混在の場合。
  it('reads x-InT-oPt as the header declared in lower case', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-InT-oPt': '5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-opt': { valueType: 'number', valueText: '5' },
    })
  })

  // The spec declares X-Request-Id in mixed case. The handler reads it under exactly that name.
  // 仕様では X-Request-Id と大文字小文字混在で宣言している。ハンドラは、
  // まさにその名前で読み取る。
  it('hands X-Request-Id over under its declared name, sent as declared', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'X-Request-Id': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'X-Request-Id': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // The wire lower-cases the name; the handler still reads it under the name the spec gave.
  // ワイヤ上では名前が小文字化されるが、ハンドラは仕様どおりの名前で読み取る。
  it('hands X-Request-Id over under its declared name, sent in lower case', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-request-id': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'X-Request-Id': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // All upper case reaches the same header.
  // すべて大文字で送っても、同じヘッダーに届く。
  it('hands X-Request-Id over under its declared name, sent in upper case', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'X-REQUEST-ID': '0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'X-Request-Id': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // X-Rate-Limit is an integer and arrives as a number.
  // X-Rate-Limit は integer であり、number として届く。
  it('coerces a header declared in mixed case', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-rate-limit': '9' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'X-Rate-Limit': { valueType: 'number', valueText: '9' },
    })
  })

  // accept-version is a header like any other.
  // accept-version も他と同じくヘッダーである。
  it('keeps a name with no x- prefix', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'accept-version': '2' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'accept-version': { valueType: 'number', valueText: '2' },
    })
  })

  // x_underscore holds an underscore where the others hold a hyphen.
  // x_underscore は、他のヘッダーがハイフンを使う位置にアンダースコアを含む。
  it('keeps a name with an underscore', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { x_underscore: '3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      x_underscore: { valueType: 'number', valueText: '3' },
    })
  })

  // x-underscore and accept_version are not the declared x_underscore and accept-version:
  // neither name stands for the other.
  // x-underscore と accept_version は、宣言された x_underscore と accept-version ではない。
  // 互いに読み替えられることはない。
  it('does not confuse a hyphen with an underscore', async () => {
    const res = await headerParamsApp.request('/optional', {
      headers: { 'x-underscore': '3', accept_version: '2' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// What the transport does to a value before the schema sees it.
// スキーマに届く前に、トランスポートが値に対して行う処理。
describe('wire: what a header value carries', () => {
  // The whitespace around a header value is not part of it: the Fetch API strips it before the
  // request is built.
  // ヘッダー値の前後の空白は値の一部ではない。Fetch API がリクエスト構築の時点で取り除く。
  it('strips the spaces around an integer', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '  42  ' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '42' },
    })
  })

  // A tab is stripped like a space.
  // タブも空白と同じく取り除かれる。
  it('strips the tabs around an integer', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '\t42\t' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '42' },
    })
  })

  // This is why a padded boolean passes here and is rejected in a path.
  // 前後に空白のある boolean が、パスでは拒否され、ここでは通るのはこのためである。
  it('strips the spaces around a boolean', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-boolean': ' true ' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-boolean': { valueType: 'boolean', valueText: 'true' },
    })
  })

  // Only the ends are stripped.
  // 取り除かれるのは両端だけである。
  it('strips the spaces around a string, not the one inside', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': '  a b  ' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'a b' },
    })
  })

  // The format sees the stripped value.
  // フォーマット検証は、空白を取り除いた後の値に対して行われる。
  it('strips the spaces around a UUID before the format check', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-uuid': ' 0190b1f4-0000-7000-8000-000000000000 ' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-uuid': { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // A header value is not percent-decoded: what is sent is what arrives.
  // ヘッダー値はパーセントデコードされない。送信した文字列がそのまま届く。
  it('delivers "a%20b" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'a%20b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'a%20b' },
    })
  })

  // A plus sign is a plus sign.
  // プラス記号はプラス記号のまま届く。
  it('delivers "a+b" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'a+b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'a+b' },
    })
  })

  // An encoded UTF-8 sequence stays encoded.
  // エンコードされた UTF-8 シーケンスは、エンコードされたまま届く。
  it('delivers "%E3%81%82" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': '%E3%81%82' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: '%E3%81%82' },
    })
  })

  // A lone percent sign is just a character.
  // 単独のパーセント記号は、ただの文字である。
  it('delivers "%" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': '%' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: '%' },
    })
  })

  // "=" and ";" have no meaning in a plain header value.
  // "=" と ";" は、通常のヘッダー値では特別な意味を持たない。
  it('delivers "a=b;c=d" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'a=b;c=d' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'a=b;c=d' },
    })
  })

  // A comma is part of a string value.
  // カンマは文字列値の一部である。
  it('delivers "a,b" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'a,b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'a,b' },
    })
  })

  // Double quotes are kept.
  // 二重引用符は保持される。
  it('delivers ""quoted"" verbatim', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': '"quoted"' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: '"quoted"' },
    })
  })

  // U+00E9 is within the ByteString range, so it can be sent and arrives intact.
  // U+00E9 は ByteString の範囲内なので送信でき、そのまま届く。
  it('carries a Latin-1 character', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': 'caf\u00E9' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: 'caf\u00E9' },
    })
  })

  // Hono answers HEAD through the GET route, so the header is validated the same way: a valid
  // one is accepted.
  // Hono は HEAD を GET のルートで処理するため、ヘッダーは同じように検証される。
  // 有効な値は受理される。
  it('validates a HEAD request like the GET it mirrors', async () => {
    const res = await headerParamsApp.request('/optional', {
      method: 'HEAD',
      headers: { 'x-int-opt': '1' },
    })
    expect(res.status).toBe(200)
  })

  // One request must not change the next: no state is kept between validations.
  // あるリクエストが次のリクエストに影響しないこと。検証間で状態は保持されない。
  it('gives the same answer to the same request, whatever came between', async () => {
    const first = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '9007199254740993' },
    })
    const between = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': 'not-a-value' },
    })
    expect(between.status).toBe(422)
    const second = await headerParamsApp.request('/headers', {
      headers: { 'x-int64': '9007199254740993' },
    })
    expect(second.status).toBe(200)
    expect(await second.json()).toStrictEqual(await first.json())
  })

  // A header is read from the headers and nowhere else.
  // ヘッダーは、ヘッダーからのみ読み取られる。
  it('does not read a header from the query string', async () => {
    const res = await headerParamsApp.request('/optional?x-int-opt=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// x-ids is an array of integers and x-str-arr an array of strings.
// x-ids は integer の配列、x-str-arr は string の配列である。
describe('arrays', () => {
  // A header sent once arrives as a bare string, and only parses because the generated array
  // schema accepts that arity.
  // 1回だけ送られたヘッダーは素の文字列として届く。
  // 生成された配列スキーマがその形を受理するからこそ、パースが成立する。
  it('reads a single integer as a one-element array', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-ids': '7' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-ids': [{ valueType: 'number', valueText: '7' }],
    })
  })

  // The same for an array of strings.
  // string の配列でも同様である。
  it('reads a single string as a one-element array', async () => {
    const res = await headerParamsApp.request('/optional', { headers: { 'x-str-arr': 'a' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-str-arr': [{ valueType: 'string', valueText: 'a' }],
    })
  })
})

// Numbers are coerced with z.coerce, that is Number(text) and BigInt(text). Both read more
// than a decimal literal, and these tests pin exactly how much more, so that a change to the
// coercion shows up here as a decision and not as a surprise. They record today's behaviour;
// they do not say it is desirable.
// 数値は z.coerce、すなわち Number(text) と BigInt(text) で変換される。
// どちらも10進リテラル以外も読み取るため、「どこまで読むか」をここで固定する。
// coerce の実装を変えたときに、想定外の変化ではなく意図した判断として差分が
// 現れるようにするためである。これらは現状の挙動の記録であり、
// 望ましい挙動だと主張するものではない。
describe('leniency: what z.coerce reads beyond a decimal literal (pinned, not endorsed)', () => {
  // An explicit plus sign.
  // 明示的なプラス記号。
  it('x-integer accepts "+1"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '+1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '1' },
    })
  })

  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('x-integer accepts "-0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '0' },
    })
  })

  // Leading zeros are dropped; the value is not read as octal.
  // 先頭のゼロは無視される。8進数としては読まれない。
  it('x-integer accepts "007"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '007' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '7' },
    })
  })

  // A fraction of zero is an integer.
  // 小数部が 0 なら整数として扱われる。
  it('x-integer accepts "1.0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '1.0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '1' },
    })
  })

  // Exponent notation that comes out whole.
  // 結果が整数になる指数表記。
  it('x-integer accepts "1e3"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '1000' },
    })
  })

  // An explicit plus sign.
  // 明示的なプラス記号。
  it('x-int64 accepts "+5"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '+5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '5' },
    })
  })

  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('x-int64 accepts "-0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '0' },
    })
  })

  // Leading zeros are dropped.
  // 先頭のゼロは無視される。
  it('x-int64 accepts "007"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '007' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '7' },
    })
  })

  // Negative zero is echoed as zero.
  // 負のゼロはゼロとして返る。
  it('x-number accepts "-0"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '0' },
    })
  })

  // A hexadecimal literal is read as 16.
  // 16進リテラルは 16 として読まれる。
  it('x-integer accepts "0x10"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '0x10' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '16' },
    })
  })

  // A binary literal is read as 3.
  // 2進リテラルは 3 として読まれる。
  it('x-integer accepts "0b11"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '0b11' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '3' },
    })
  })

  // An octal literal is read as 7.
  // 8進リテラルは 7 として読まれる。
  it('x-integer accepts "0o7"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '0o7' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '7' },
    })
  })

  // A hexadecimal literal is read as 31.
  // 16進リテラルは 31 として読まれる。
  it('x-number accepts "0x1F"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-number': '0x1F' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-number': { valueType: 'number', valueText: '31' },
    })
  })

  // BigInt reads a hexadecimal literal too.
  // BigInt も16進リテラルを読み取る。
  it('x-int64 accepts "0x10"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '0x10' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '16' },
    })
  })

  // cuid2 is a pattern with no fixed length: one letter passes.
  // cuid2 は長さ固定のないパターンであり、1文字でも通る。
  it('x-cuid2 accepts "a"', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-cuid2': 'a' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cuid2': { valueType: 'string', valueText: 'a' },
    })
  })

  // cuid2 does not require a leading letter.
  // cuid2 は先頭が英字であることを要求しない。
  it('x-cuid2 accepts "1z4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-cuid2': '1z4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-cuid2': { valueType: 'string', valueText: '1z4a98xxat96iws9zmbrgj3a' },
    })
  })

  // format: url takes the javascript: scheme; narrowing is the caller's to do.
  // format: url は javascript: スキームも受理する。絞り込みは利用側の責務である。
  it('x-url accepts "javascript:alert(1)"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-url': 'javascript:alert(1)' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-url': { valueType: 'string', valueText: 'javascript:alert(1)' },
    })
  })

  // A trailing dot satisfies the hostname grammar.
  // 末尾のドットはホスト名の文法を満たす。
  it('x-hostname accepts "example.com."', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': 'example.com.' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: 'example.com.' },
    })
  })

  // A dotted quad satisfies the hostname grammar.
  // ドット区切りの4数値はホスト名の文法を満たす。
  it('x-hostname accepts "192.168.0.1"', async () => {
    const res = await headerParamsApp.request('/headers', {
      headers: { 'x-hostname': '192.168.0.1' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-hostname': { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An empty header is Number(""), which is zero.
  // 空のヘッダーは Number("") であり、0 になる。
  it('reads an empty integer as zero', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '0' },
    })
  })

  // BigInt("") is 0n.
  // BigInt("") は 0n である。
  it('reads an empty int64 as zero', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-int64': '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int64': { valueType: 'bigint', valueText: '0' },
    })
  })

  // The whitespace is stripped by the transport, which leaves the empty value.
  // 空白はトランスポートによって取り除かれ、空の値が残る。
  it('reads an integer that is only whitespace as zero', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-integer': '   ' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-integer': { valueType: 'number', valueText: '0' },
    })
  })

  // A string with no minLength accepts it.
  // minLength のない string は、空文字列を受理する。
  it('reads an empty string as the empty string', async () => {
    const res = await headerParamsApp.request('/headers', { headers: { 'x-string': '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-string': { valueType: 'string', valueText: '' },
    })
  })

  // The default of 20 does not apply, because the header was sent: the empty value is read as
  // zero.
  // ヘッダー自体は送信されているため、デフォルトの 20 は適用されない。
  // 空の値は 0 として読まれる。
  it('reads an empty integer over its default', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-int-def': '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '0' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: 'fallback' },
    })
  })

  // An empty string is a string: the default gives way to it.
  // 空文字列も文字列である。デフォルトより優先される。
  it('reads an empty string over its default', async () => {
    const res = await headerParamsApp.request('/defaults', { headers: { 'x-str-def': '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-int-def': { valueType: 'number', valueText: '20' },
      'x-int64-def': { valueType: 'bigint', valueText: '5' },
      'x-bool-def': { valueType: 'boolean', valueText: 'false' },
      'x-str-def': { valueType: 'string', valueText: '' },
    })
  })

  // An empty x-name satisfies required: true.
  // 空の x-name でも、required: true を満たす。
  it('reads an empty required string as present', async () => {
    const res = await headerParamsApp.request('/required', {
      headers: { 'x-id': '1', 'x-big': '9007199254740993', 'x-flag': 'true', 'x-name': '' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'x-id': { valueType: 'number', valueText: '1' },
      'x-big': { valueType: 'bigint', valueText: '9007199254740993' },
      'x-flag': { valueType: 'boolean', valueText: 'true' },
      'x-name': { valueType: 'string', valueText: '' },
    })
  })
})
