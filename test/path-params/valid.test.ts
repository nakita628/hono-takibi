// Every parameter shape the generator supports, sent as a real path segment. A path value
// is always single and always required, so each shape has a route of its own
// (`/<shape>/{value}`) and fails alone.
//
// 生成器が対応するすべてのパラメータ形状を、実際のパスセグメントとして送信して検証する。
// パスの値は常に単一かつ必須なので、形状ごとに専用ルート(`/<shape>/{value}`)を持ち、
// 失敗は形状単位で切り分けられる。
//
// How to read a test / テストの読み方:
//   Every route answers `{ valueType, valueText }`: the runtime `typeof` the parameter
//   arrived as in the handler, and the value as text. A rejected request answers 422 with
//   `{ issues: [...] }`, the name of each parameter that failed.
//   すべてのルートは `{ valueType, valueText }` を返す。ハンドラに届いた時点の `typeof` と、
//   値の文字列表現である。拒否されたリクエストは 422 と `{ issues: [...] }`(失敗した
//   パラメータ名の一覧)を返す。
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
//   - transforms: x-* extensions and format: trim
//   - literals: enum and const
//   - constraints: numeric and string
//   - combinators: oneOf and allOf
//   - declarations: several parameters in one path
//   - declarations: parameter names that are not identifiers
//   - declarations: $ref and path-item level
//   - wire: percent-encoding
//   - wire: routing
//   - styles: simple, label and matrix
//   - objects: an object in one segment
//   - leniency: what is read beyond the plainest spelling (pinned, not endorsed)
import { describe, expect, it } from 'vite-plus/test'

import { pathParamsApp } from './app'

// One canonical value per shape. The value is compared as well as the type: a coercion that
// changes the value (a truncated int64, a re-serialised float) is as wrong as one that
// changes the type.
// 形状ごとの代表値を1つずつ検証する。型だけでなく値も比較する。
// 値を変えてしまう変換(int64 の桁落ちなど)は、型を誤る変換と同じく不具合である。
describe('shapes: every supported shape accepts its own value', () => {
  // An integer with no format arrives as a number.
  // フォーマット指定のない integer は number として届く。
  it('integer accepts "42"', async () => {
    const res = await pathParamsApp.request('/integer/42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '42' })
  })

  // An int32 arrives as a number.
  // int32 は number として届く。
  it('int32 accepts "42"', async () => {
    const res = await pathParamsApp.request('/int32/42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '42' })
  })

  // An int64 arrives as a bigint, exact past Number.MAX_SAFE_INTEGER.
  // int64 は bigint として届き、Number.MAX_SAFE_INTEGER を超えても桁落ちしない。
  it('int64 accepts "9007199254740993"', async () => {
    const res = await pathParamsApp.request('/int64/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '9007199254740993' })
  })

  // format: bigint arrives as a bigint.
  // format: bigint は bigint として届く。
  it('bigint accepts "9007199254740993"', async () => {
    const res = await pathParamsApp.request('/bigint/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '9007199254740993' })
  })

  // A uint32 arrives as a number, up to its maximum.
  // uint32 は最大値まで number として届く。
  it('uint32 accepts "4294967295"', async () => {
    const res = await pathParamsApp.request('/uint32/4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '4294967295' })
  })

  // A uint64 arrives as a bigint, up to its maximum, which no double can hold.
  // uint64 は最大値まで bigint として届く。この最大値は double では保持できない。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await pathParamsApp.request('/uint64/18446744073709551615')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '18446744073709551615',
    })
  })

  // A number with no format arrives as a number.
  // フォーマット指定のない number は number として届く。
  it('number accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/number/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // format: float arrives as a number.
  // format: float は number として届く。
  it('float accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/float/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // format: float32 arrives as a number.
  // format: float32 は number として届く。
  it('float32 accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/float32/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // format: float64 arrives as a number.
  // format: float64 は number として届く。
  it('float64 accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/float64/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // format: double arrives as a number.
  // format: double は number として届く。
  it('double accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/double/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // format: password on a number is an annotation; the value is still a number.
  // number に対する format: password は注釈にすぎず、値は number のまま届く。
  it('numpassword accepts "1.5"', async () => {
    const res = await pathParamsApp.request('/numpassword/1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1.5' })
  })

  // A boolean arrives as a boolean, not as the text "true".
  // boolean は文字列 "true" ではなく boolean として届く。
  it('boolean accepts "true"', async () => {
    const res = await pathParamsApp.request('/boolean/true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // A string arrives unchanged.
  // string はそのまま届く。
  it('string accepts "plain"', async () => {
    const res = await pathParamsApp.request('/string/plain')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'plain' })
  })

  // A well-formed email address.
  // 正しい形式のメールアドレス。
  it('email accepts "user@example.com"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user@example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'user@example.com' })
  })

  // A UUID of any version (here version 7).
  // 任意バージョンの UUID(ここではバージョン 7)。
  it('uuid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await pathParamsApp.request('/uuid/0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '0190b1f4-0000-7000-8000-000000000000',
    })
  })

  // A version 4 UUID.
  // バージョン 4 の UUID。
  it('uuidv4 accepts "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await pathParamsApp.request('/uuidv4/a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    })
  })

  // A version 7 UUID.
  // バージョン 7 の UUID。
  it('uuidv7 accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await pathParamsApp.request('/uuidv7/0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '0190b1f4-0000-7000-8000-000000000000',
    })
  })

  // An absolute URL.
  // 絶対 URL。
  it('url accepts "https://example.com"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('https://example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'https://example.com',
    })
  })

  // format: uri is validated like a URL.
  // format: uri は URL と同じ検証を受ける。
  it('uri accepts "https://example.com"', async () => {
    const res = await pathParamsApp.request(`/uri/${encodeURIComponent('https://example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'https://example.com',
    })
  })

  // An https URL.
  // https の URL。
  it('httpurl accepts "https://example.com"', async () => {
    const res = await pathParamsApp.request(`/httpurl/${encodeURIComponent('https://example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'https://example.com',
    })
  })

  // A host name.
  // ホスト名。
  it('hostname accepts "example.com"', async () => {
    const res = await pathParamsApp.request('/hostname/example.com')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'example.com' })
  })

  // Hexadecimal digits.
  // 16進数の文字列。
  it('hex accepts "deadbeef"', async () => {
    const res = await pathParamsApp.request('/hex/deadbeef')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'deadbeef' })
  })

  // A single emoji.
  // 絵文字1文字。
  it('emoji accepts "🔥"', async () => {
    const res = await pathParamsApp.request(`/emoji/${encodeURIComponent('🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '🔥' })
  })

  // Base64 with padding.
  // パディング付きの Base64。
  it('base64 accepts "aGVsbG8="', async () => {
    const res = await pathParamsApp.request(`/base64/${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'aGVsbG8=' })
  })

  // Base64url, which has no padding.
  // パディングのない Base64url。
  it('base64url accepts "aGVsbG8"', async () => {
    const res = await pathParamsApp.request('/base64url/aGVsbG8')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'aGVsbG8' })
  })

  // A 21-character Nano ID.
  // 21文字の Nano ID。
  it('nanoid accepts "V1StGXR8_Z5jdHi6B-myT"', async () => {
    const res = await pathParamsApp.request('/nanoid/V1StGXR8_Z5jdHi6B-myT')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'V1StGXR8_Z5jdHi6B-myT',
    })
  })

  // A CUID2.
  // CUID2。
  it('cuid2 accepts "tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await pathParamsApp.request('/cuid2/tz4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'tz4a98xxat96iws9zmbrgj3a',
    })
  })

  // A 26-character ULID.
  // 26文字の ULID。
  it('ulid accepts "01ARZ3NDEKTSV4RRFFQ69G5FAV"', async () => {
    const res = await pathParamsApp.request('/ulid/01ARZ3NDEKTSV4RRFFQ69G5FAV')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV',
    })
  })

  // An IPv4 address.
  // IPv4 アドレス。
  it('ipv4 accepts "192.168.0.1"', async () => {
    const res = await pathParamsApp.request('/ipv4/192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '192.168.0.1' })
  })

  // An IPv6 address in compressed form.
  // 省略表記の IPv6 アドレス。
  it('ipv6 accepts "2001:db8::1"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('2001:db8::1')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '2001:db8::1' })
  })

  // An IPv4 CIDR block.
  // IPv4 の CIDR ブロック。
  it('cidrv4 accepts "192.168.0.0/24"', async () => {
    const res = await pathParamsApp.request(`/cidrv4/${encodeURIComponent('192.168.0.0/24')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '192.168.0.0/24' })
  })

  // An IPv6 CIDR block.
  // IPv6 の CIDR ブロック。
  it('cidrv6 accepts "2001:db8::/32"', async () => {
    const res = await pathParamsApp.request(`/cidrv6/${encodeURIComponent('2001:db8::/32')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '2001:db8::/32' })
  })

  // An ISO 8601 date; it stays a string, it is not turned into a Date.
  // ISO 8601 の日付。Date には変換されず、文字列のまま届く。
  it('date accepts "2020-01-02"', async () => {
    const res = await pathParamsApp.request('/date/2020-01-02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '2020-01-02' })
  })

  // An ISO 8601 time.
  // ISO 8601 の時刻。
  it('time accepts "12:34:56"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '12:34:56' })
  })

  // An ISO 8601 date-time in UTC; it stays a string.
  // UTC の ISO 8601 日時。文字列のまま届く。
  it('datetime accepts "2020-01-02T03:04:05Z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02T03:04:05Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '2020-01-02T03:04:05Z',
    })
  })

  // An ISO 8601 duration with every component.
  // すべての要素を含む ISO 8601 の期間。
  it('duration accepts "P1Y2M3DT4H5M6S"', async () => {
    const res = await pathParamsApp.request('/duration/P1Y2M3DT4H5M6S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' })
  })

  // format: byte is an annotation; the text is passed through.
  // format: byte は注釈にすぎず、文字列はそのまま渡される。
  it('byte accepts "aGVsbG8="', async () => {
    const res = await pathParamsApp.request(`/byte/${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'aGVsbG8=' })
  })

  // format: password is an annotation; the text is passed through.
  // format: password は注釈にすぎず、文字列はそのまま渡される。
  it('strpassword accepts "hunter2"', async () => {
    const res = await pathParamsApp.request('/strpassword/hunter2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'hunter2' })
  })

  // A MAC address with colon separators.
  // コロン区切りの MAC アドレス。
  it('mac accepts "00:1a:2b:3c:4d:5e"', async () => {
    const res = await pathParamsApp.request(`/mac/${encodeURIComponent('00:1a:2b:3c:4d:5e')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' })
  })

  // An E.164 phone number.
  // E.164 形式の電話番号。
  it('e164 accepts "+14155552671"', async () => {
    const res = await pathParamsApp.request(`/e164/${encodeURIComponent('+14155552671')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '+14155552671' })
  })

  // A card number that passes the Luhn check.
  // Luhn チェックを通過するカード番号。
  it('creditcard accepts "4111111111111111"', async () => {
    const res = await pathParamsApp.request('/creditcard/4111111111111111')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '4111111111111111' })
  })

  // An IBAN with a valid checksum.
  // チェックサムが正しい IBAN。
  it('iban accepts "DE89370400440532013000"', async () => {
    const res = await pathParamsApp.request('/iban/DE89370400440532013000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'DE89370400440532013000',
    })
  })

  // An ISO 4217 currency code.
  // ISO 4217 の通貨コード。
  it('currencycode accepts "USD"', async () => {
    const res = await pathParamsApp.request('/currencycode/USD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'USD' })
  })

  // A 27-character KSUID.
  // 27文字の KSUID。
  it('ksuid accepts "0ujsszwN8NRY24YaXiTIE2VWDTS"', async () => {
    const res = await pathParamsApp.request('/ksuid/0ujsszwN8NRY24YaXiTIE2VWDTS')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS',
    })
  })

  // A 20-character XID.
  // 20文字の XID。
  it('xid accepts "9m4e2mr0ui3e8a215n4g"', async () => {
    const res = await pathParamsApp.request('/xid/9m4e2mr0ui3e8a215n4g')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '9m4e2mr0ui3e8a215n4g',
    })
  })

  // A GUID.
  // GUID。
  it('guid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await pathParamsApp.request('/guid/0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '0190b1f4-0000-7000-8000-000000000000',
    })
  })

  // format: trim leaves a value with no surrounding whitespace unchanged.
  // format: trim は、前後に空白のない値をそのまま通す。
  it('trim accepts "spaced"', async () => {
    const res = await pathParamsApp.request('/trim/spaced')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'spaced' })
  })
})

// The first and last value each integer format holds.
// 各整数フォーマットが保持できる最初と最後の値。
describe('integers: accepted boundaries', () => {
  // Zero.
  // ゼロ。
  it('integer accepts "0"', async () => {
    const res = await pathParamsApp.request('/integer/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // A negative integer.
  // 負の整数。
  it('integer accepts "-1"', async () => {
    const res = await pathParamsApp.request('/integer/-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-1' })
  })

  // Number.MAX_SAFE_INTEGER, the last integer a double holds exactly.
  // Number.MAX_SAFE_INTEGER。double が正確に保持できる最後の整数。
  it('integer accepts "9007199254740991"', async () => {
    const res = await pathParamsApp.request('/integer/9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '9007199254740991' })
  })

  // Number.MIN_SAFE_INTEGER.
  // Number.MIN_SAFE_INTEGER。
  it('integer accepts "-9007199254740991"', async () => {
    const res = await pathParamsApp.request('/integer/-9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-9007199254740991' })
  })

  // The int32 maximum, 2^31 - 1.
  // int32 の最大値(2^31 - 1)。
  it('int32 accepts "2147483647"', async () => {
    const res = await pathParamsApp.request('/int32/2147483647')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '2147483647' })
  })

  // The int32 minimum, -2^31.
  // int32 の最小値(-2^31)。
  it('int32 accepts "-2147483648"', async () => {
    const res = await pathParamsApp.request('/int32/-2147483648')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-2147483648' })
  })

  // Zero.
  // ゼロ。
  it('int32 accepts "0"', async () => {
    const res = await pathParamsApp.request('/int32/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // The uint32 minimum.
  // uint32 の最小値。
  it('uint32 accepts "0"', async () => {
    const res = await pathParamsApp.request('/uint32/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // The uint32 maximum, 2^32 - 1.
  // uint32 の最大値(2^32 - 1)。
  it('uint32 accepts "4294967295"', async () => {
    const res = await pathParamsApp.request('/uint32/4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '4294967295' })
  })

  // The int64 maximum, 2^63 - 1, kept to the last digit.
  // int64 の最大値(2^63 - 1)。最後の桁まで保持される。
  it('int64 accepts "9223372036854775807"', async () => {
    const res = await pathParamsApp.request('/int64/9223372036854775807')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '9223372036854775807',
    })
  })

  // The int64 minimum, -2^63.
  // int64 の最小値(-2^63)。
  it('int64 accepts "-9223372036854775808"', async () => {
    const res = await pathParamsApp.request('/int64/-9223372036854775808')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '-9223372036854775808',
    })
  })

  // Zero is a bigint too.
  // ゼロも bigint として届く。
  it('int64 accepts "0"', async () => {
    const res = await pathParamsApp.request('/int64/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '0' })
  })

  // The uint64 minimum.
  // uint64 の最小値。
  it('uint64 accepts "0"', async () => {
    const res = await pathParamsApp.request('/uint64/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '0' })
  })

  // The uint64 maximum, 2^64 - 1.
  // uint64 の最大値(2^64 - 1)。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await pathParamsApp.request('/uint64/18446744073709551615')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '18446744073709551615',
    })
  })

  // format: bigint has no upper bound.
  // format: bigint には上限がない。
  it('bigint accepts "99999999999999999999999999999"', async () => {
    const res = await pathParamsApp.request('/bigint/99999999999999999999999999999')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '99999999999999999999999999999',
    })
  })

  // format: bigint has no lower bound.
  // format: bigint には下限がない。
  it('bigint accepts "-99999999999999999999999999999"', async () => {
    const res = await pathParamsApp.request('/bigint/-99999999999999999999999999999')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '-99999999999999999999999999999',
    })
  })
})

// Notations of a number, and the edges of float32 and float64.
// 数値の各種表記と、float32・float64 の境界値。
describe('floats: accepted values', () => {
  // Zero.
  // ゼロ。
  it('number accepts "0"', async () => {
    const res = await pathParamsApp.request('/number/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // A negative fraction.
  // 負の小数。
  it('number accepts "-1.5"', async () => {
    const res = await pathParamsApp.request('/number/-1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-1.5' })
  })

  // Exponent notation.
  // 指数表記。
  it('number accepts "1e3"', async () => {
    const res = await pathParamsApp.request('/number/1e3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1000' })
  })

  // A negative exponent.
  // 負の指数。
  it('number accepts "1e-3"', async () => {
    const res = await pathParamsApp.request('/number/1e-3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.001' })
  })

  // No digit before the decimal point.
  // 小数点の前の数字を省略した表記。
  it('number accepts ".5"', async () => {
    const res = await pathParamsApp.request('/number/.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // No digit after the decimal point.
  // 小数点の後の数字を省略した表記。
  it('number accepts "5."', async () => {
    const res = await pathParamsApp.request('/number/5.')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // The largest finite float32.
  // float32 の最大有限値。
  it('float32 accepts "3.4028234e38"', async () => {
    const res = await pathParamsApp.request('/float32/3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '3.4028234e+38' })
  })

  // The smallest finite float32.
  // float32 の最小有限値。
  it('float32 accepts "-3.4028234e38"', async () => {
    const res = await pathParamsApp.request('/float32/-3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-3.4028234e+38' })
  })

  // Too small for a float32 to represent: underflow is not a range error.
  // float32 では表現できないほど小さい値。アンダーフローは範囲エラーにならない。
  it('float32 accepts "1e-50"', async () => {
    const res = await pathParamsApp.request('/float32/1e-50')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1e-50' })
  })

  // A value a float32 cannot hold exactly is not rounded.
  // float32 で正確に表現できない値でも、丸められずに届く。
  it('float32 accepts "0.1"', async () => {
    const res = await pathParamsApp.request('/float32/0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.1' })
  })

  // Number.MAX_VALUE, the largest finite double.
  // Number.MAX_VALUE。double の最大有限値。
  it('float64 accepts "1.7976931348623157e308"', async () => {
    const res = await pathParamsApp.request('/float64/1.7976931348623157e308')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'number',
      valueText: '1.7976931348623157e+308',
    })
  })

  // The smallest finite double.
  // double の最小有限値。
  it('double accepts "-1.7976931348623157e308"', async () => {
    const res = await pathParamsApp.request('/double/-1.7976931348623157e308')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'number',
      valueText: '-1.7976931348623157e+308',
    })
  })
})

// The generated schema is z.stringbool(), the wire form of a boolean: z.coerce.boolean()
// would read every non-empty segment, "false" included, as true.
// 生成されるスキーマは、真偽値のワイヤ形式である z.stringbool() である。
// z.coerce.boolean() だと、空でないセグメントは "false" を含めてすべて true になってしまう。
describe('booleans: accepted spellings', () => {
  // The literal true.
  // リテラルの true。
  it('boolean accepts "true"', async () => {
    const res = await pathParamsApp.request('/boolean/true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // The literal false; a naive Boolean("false") would have been true.
  // リテラルの false。素朴な Boolean("false") では true になってしまう。
  it('boolean accepts "false"', async () => {
    const res = await pathParamsApp.request('/boolean/false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // Upper case is read the same.
  // 大文字でも同じように読み取られる。
  it('boolean accepts "TRUE"', async () => {
    const res = await pathParamsApp.request('/boolean/TRUE')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // Mixed case is read the same.
  // 大文字小文字が混在していても同じように読み取られる。
  it('boolean accepts "False"', async () => {
    const res = await pathParamsApp.request('/boolean/False')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // The digit 1 means true.
  // 数字の 1 は true を意味する。
  it('boolean accepts "1"', async () => {
    const res = await pathParamsApp.request('/boolean/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // The digit 0 means false.
  // 数字の 0 は false を意味する。
  it('boolean accepts "0"', async () => {
    const res = await pathParamsApp.request('/boolean/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // "yes" means true.
  // "yes" は true を意味する。
  it('boolean accepts "yes"', async () => {
    const res = await pathParamsApp.request('/boolean/yes')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "no" means false.
  // "no" は false を意味する。
  it('boolean accepts "no"', async () => {
    const res = await pathParamsApp.request('/boolean/no')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // "on" means true.
  // "on" は true を意味する。
  it('boolean accepts "on"', async () => {
    const res = await pathParamsApp.request('/boolean/on')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "off" means false.
  // "off" は false を意味する。
  it('boolean accepts "off"', async () => {
    const res = await pathParamsApp.request('/boolean/off')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // "y" means true.
  // "y" は true を意味する。
  it('boolean accepts "y"', async () => {
    const res = await pathParamsApp.request('/boolean/y')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "n" means false.
  // "n" は false を意味する。
  it('boolean accepts "n"', async () => {
    const res = await pathParamsApp.request('/boolean/n')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })

  // "enabled" means true.
  // "enabled" は true を意味する。
  it('boolean accepts "enabled"', async () => {
    const res = await pathParamsApp.request('/boolean/enabled')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "disabled" means false.
  // "disabled" は false を意味する。
  it('boolean accepts "disabled"', async () => {
    const res = await pathParamsApp.request('/boolean/disabled')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'false' })
  })
})

// The less obvious values each format takes, beyond the canonical one in section 1.
// セクション 1 の代表値以外に、各フォーマットが受理する分かりにくい値。
describe('formats: what each string format accepts', () => {
  // Upper case is valid, and is not lower-cased.
  // 大文字も有効であり、小文字化はされない。
  it('email accepts "USER@EXAMPLE.COM"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('USER@EXAMPLE.COM')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'USER@EXAMPLE.COM' })
  })

  // A plus tag in the local part.
  // ローカル部にプラス記号のタグを含む。
  it('email accepts "user+tag@example.com"', async () => {
    const res = await pathParamsApp.request(`/email/${encodeURIComponent('user+tag@example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'user+tag@example.com',
    })
  })

  // Dots in the local part and a multi-level domain.
  // ローカル部のドットと、多階層のドメイン。
  it('email accepts "first.last@sub.example.co.jp"', async () => {
    const res = await pathParamsApp.request(
      `/email/${encodeURIComponent('first.last@sub.example.co.jp')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'first.last@sub.example.co.jp',
    })
  })

  // Upper-case hexadecimal digits.
  // 大文字の16進数。
  it('uuid accepts "0190B1F4-0000-7000-8000-000000000000"', async () => {
    const res = await pathParamsApp.request('/uuid/0190B1F4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '0190B1F4-0000-7000-8000-000000000000',
    })
  })

  // The nil UUID, which carries no version.
  // バージョンを持たない nil UUID。
  it('uuid accepts "00000000-0000-0000-0000-000000000000"', async () => {
    const res = await pathParamsApp.request('/uuid/00000000-0000-0000-0000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '00000000-0000-0000-0000-000000000000',
    })
  })

  // The max UUID, which carries no version.
  // バージョンを持たない max UUID。
  it('uuid accepts "ffffffff-ffff-ffff-ffff-ffffffffffff"', async () => {
    const res = await pathParamsApp.request('/uuid/ffffffff-ffff-ffff-ffff-ffffffffffff')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'ffffffff-ffff-ffff-ffff-ffffffffffff',
    })
  })

  // A GUID checks the 8-4-4-4-12 layout only, not the version or variant.
  // GUID は 8-4-4-4-12 の形だけを検証し、バージョンやバリアントは見ない。
  it('guid accepts "a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d"', async () => {
    const res = await pathParamsApp.request('/guid/a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d',
    })
  })

  // format: url takes any scheme, not only http.
  // format: url は http に限らず任意のスキームを受理する。
  it('url accepts "ftp://example.com"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('ftp://example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'ftp://example.com' })
  })

  // A scheme with no authority.
  // オーソリティ部のないスキーム。
  it('url accepts "mailto:a@b.c"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('mailto:a@b.c')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'mailto:a@b.c' })
  })

  // A port, a path, a query and a fragment.
  // ポート・パス・クエリ・フラグメントを含む。
  it('url accepts "http://localhost:3000/a?b=c#d"', async () => {
    const res = await pathParamsApp.request(
      `/url/${encodeURIComponent('http://localhost:3000/a?b=c#d')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'http://localhost:3000/a?b=c#d',
    })
  })

  // A URN is a URI.
  // URN も URI である。
  it('uri accepts "urn:isbn:0451450523"', async () => {
    const res = await pathParamsApp.request(`/uri/${encodeURIComponent('urn:isbn:0451450523')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'urn:isbn:0451450523',
    })
  })

  // Plain http.
  // 暗号化なしの http。
  it('httpurl accepts "http://example.com"', async () => {
    const res = await pathParamsApp.request(`/httpurl/${encodeURIComponent('http://example.com')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'http://example.com' })
  })

  // A path and a query.
  // パスとクエリを含む。
  it('httpurl accepts "https://example.com/a/b?c=d"', async () => {
    const res = await pathParamsApp.request(
      `/httpurl/${encodeURIComponent('https://example.com/a/b?c=d')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'https://example.com/a/b?c=d',
    })
  })

  // A single label.
  // 単一ラベルのホスト名。
  it('hostname accepts "localhost"', async () => {
    const res = await pathParamsApp.request('/hostname/localhost')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'localhost' })
  })

  // One-character labels.
  // 1文字のラベル。
  it('hostname accepts "a.b.c"', async () => {
    const res = await pathParamsApp.request('/hostname/a.b.c')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a.b.c' })
  })

  // An internationalised name in punycode.
  // Punycode で表記した国際化ドメイン名。
  it('hostname accepts "xn--r8jz45g.jp"', async () => {
    const res = await pathParamsApp.request('/hostname/xn--r8jz45g.jp')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'xn--r8jz45g.jp' })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('hex accepts "DEADBEEF"', async () => {
    const res = await pathParamsApp.request('/hex/DEADBEEF')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'DEADBEEF' })
  })

  // An odd number of digits.
  // 桁数が奇数の16進数。
  it('hex accepts "abc"', async () => {
    const res = await pathParamsApp.request('/hex/abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'abc' })
  })

  // More than one emoji.
  // 複数の絵文字。
  it('emoji accepts "🔥🔥"', async () => {
    const res = await pathParamsApp.request(`/emoji/${encodeURIComponent('🔥🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '🔥🔥' })
  })

  // A ZWJ sequence: one glyph, several code points.
  // ZWJ シーケンス。見た目は1文字だが、複数のコードポイントで構成される。
  it('emoji accepts "👨‍👩‍👧"', async () => {
    const res = await pathParamsApp.request(`/emoji/${encodeURIComponent('👨‍👩‍👧')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '👨‍👩‍👧' })
  })

  // "+" and "/" are what set base64 apart from base64url.
  // "+" と "/" は base64 と base64url を分ける文字である。
  it('base64 accepts "a+b/"', async () => {
    const res = await pathParamsApp.request(`/base64/${encodeURIComponent('a+b/')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a+b/' })
  })

  // Two padding characters.
  // パディングが2文字。
  it('base64 accepts "YQ=="', async () => {
    const res = await pathParamsApp.request(`/base64/${encodeURIComponent('YQ==')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'YQ==' })
  })

  // "-" and "_" are the base64url alphabet.
  // "-" と "_" は base64url の文字である。
  it('base64url accepts "a-b_"', async () => {
    const res = await pathParamsApp.request('/base64url/a-b_')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a-b_' })
  })

  // format: byte does not validate: text that is not base64 passes.
  // format: byte は検証を行わない。Base64 でない文字列も通る。
  it('byte accepts "!!!not-base64!!!"', async () => {
    const res = await pathParamsApp.request('/byte/!!!not-base64!!!')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '!!!not-base64!!!' })
  })

  // format: password does not validate: reserved characters pass.
  // format: password は検証を行わない。予約文字も通る。
  it('strpassword accepts "p@ss/w0rd?#"', async () => {
    const res = await pathParamsApp.request(`/strpassword/${encodeURIComponent('p@ss/w0rd?#')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'p@ss/w0rd?#' })
  })

  // A ULID is case-insensitive.
  // ULID は大文字小文字を区別しない。
  it('ulid accepts "01arz3ndektsv4rrffq69g5fav"', async () => {
    const res = await pathParamsApp.request('/ulid/01arz3ndektsv4rrffq69g5fav')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '01arz3ndektsv4rrffq69g5fav',
    })
  })

  // Upper case is accepted.
  // 大文字も受理される。
  it('xid accepts "9M4E2MR0UI3E8A215N4G"', async () => {
    const res = await pathParamsApp.request('/xid/9M4E2MR0UI3E8A215N4G')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '9M4E2MR0UI3E8A215N4G',
    })
  })

  // The lowest address.
  // 最小のアドレス。
  it('ipv4 accepts "0.0.0.0"', async () => {
    const res = await pathParamsApp.request('/ipv4/0.0.0.0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '0.0.0.0' })
  })

  // The highest address.
  // 最大のアドレス。
  it('ipv4 accepts "255.255.255.255"', async () => {
    const res = await pathParamsApp.request('/ipv4/255.255.255.255')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '255.255.255.255' })
  })

  // The unspecified address.
  // 未指定アドレス。
  it('ipv6 accepts "::"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('::')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '::' })
  })

  // The loopback address.
  // ループバックアドレス。
  it('ipv6 accepts "::1"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('::1')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '::1' })
  })

  // The full form, nothing compressed.
  // 省略のない完全表記。
  it('ipv6 accepts "2001:0db8:0000:0000:0000:0000:0000:0001"', async () => {
    const res = await pathParamsApp.request(
      `/ipv6/${encodeURIComponent('2001:0db8:0000:0000:0000:0000:0000:0001')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '2001:0db8:0000:0000:0000:0000:0000:0001',
    })
  })

  // An IPv4-mapped address.
  // IPv4 射影アドレス。
  it('ipv6 accepts "::ffff:192.168.0.1"', async () => {
    const res = await pathParamsApp.request(`/ipv6/${encodeURIComponent('::ffff:192.168.0.1')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '::ffff:192.168.0.1' })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv4 accepts "0.0.0.0/0"', async () => {
    const res = await pathParamsApp.request(`/cidrv4/${encodeURIComponent('0.0.0.0/0')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '0.0.0.0/0' })
  })

  // The longest prefix, /32.
  // 最長のプレフィックス /32。
  it('cidrv4 accepts "10.0.0.1/32"', async () => {
    const res = await pathParamsApp.request(`/cidrv4/${encodeURIComponent('10.0.0.1/32')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '10.0.0.1/32' })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv6 accepts "::/0"', async () => {
    const res = await pathParamsApp.request(`/cidrv6/${encodeURIComponent('::/0')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '::/0' })
  })

  // The longest prefix, /128.
  // 最長のプレフィックス /128。
  it('cidrv6 accepts "2001:db8::/128"', async () => {
    const res = await pathParamsApp.request(`/cidrv6/${encodeURIComponent('2001:db8::/128')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '2001:db8::/128' })
  })

  // 29 February of a leap year.
  // うるう年の 2月29日。
  it('date accepts "2020-02-29"', async () => {
    const res = await pathParamsApp.request('/date/2020-02-29')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '2020-02-29' })
  })

  // Year zero.
  // 西暦 0 年。
  it('date accepts "0000-01-01"', async () => {
    const res = await pathParamsApp.request('/date/0000-01-01')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '0000-01-01' })
  })

  // The last four-digit date.
  // 4桁の年で表せる最後の日付。
  it('date accepts "9999-12-31"', async () => {
    const res = await pathParamsApp.request('/date/9999-12-31')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '9999-12-31' })
  })

  // Midnight.
  // 午前 0 時。
  it('time accepts "00:00:00"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('00:00:00')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '00:00:00' })
  })

  // The last second of the day.
  // 1日の最後の秒。
  it('time accepts "23:59:59"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('23:59:59')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '23:59:59' })
  })

  // Seconds may be left out.
  // 秒は省略できる。
  it('time accepts "12:34"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('12:34')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '12:34' })
  })

  // Fractional seconds.
  // 小数秒。
  it('time accepts "12:34:56.789"', async () => {
    const res = await pathParamsApp.request(`/time/${encodeURIComponent('12:34:56.789')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '12:34:56.789' })
  })

  // Fractional seconds.
  // 小数秒。
  it('datetime accepts "2020-01-02T03:04:05.123Z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-01-02T03:04:05.123Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '2020-01-02T03:04:05.123Z',
    })
  })

  // The last second of a leap day.
  // うるう日の最後の秒。
  it('datetime accepts "2020-02-29T23:59:59Z"', async () => {
    const res = await pathParamsApp.request(
      `/datetime/${encodeURIComponent('2020-02-29T23:59:59Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '2020-02-29T23:59:59Z',
    })
  })

  // A date component alone.
  // 日付要素のみ。
  it('duration accepts "P1Y"', async () => {
    const res = await pathParamsApp.request('/duration/P1Y')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'P1Y' })
  })

  // A time component alone.
  // 時刻要素のみ。
  it('duration accepts "PT1S"', async () => {
    const res = await pathParamsApp.request('/duration/PT1S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'PT1S' })
  })

  // Weeks.
  // 週。
  it('duration accepts "P1W"', async () => {
    const res = await pathParamsApp.request('/duration/P1W')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'P1W' })
  })

  // Fractional seconds.
  // 小数秒。
  it('duration accepts "PT0.5S"', async () => {
    const res = await pathParamsApp.request('/duration/PT0.5S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'PT0.5S' })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('mac accepts "00:1A:2B:3C:4D:5E"', async () => {
    const res = await pathParamsApp.request(`/mac/${encodeURIComponent('00:1A:2B:3C:4D:5E')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '00:1A:2B:3C:4D:5E' })
  })

  // Hyphens between groups; the Luhn check runs on the digits.
  // グループ間のハイフン。Luhn チェックは数字部分に対して行われる。
  it('creditcard accepts "4111-1111-1111-1111"', async () => {
    const res = await pathParamsApp.request('/creditcard/4111-1111-1111-1111')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '4111-1111-1111-1111',
    })
  })

  // Spaces between groups.
  // グループ間の空白。
  it('creditcard accepts "4111 1111 1111 1111"', async () => {
    const res = await pathParamsApp.request(
      `/creditcard/${encodeURIComponent('4111 1111 1111 1111')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '4111 1111 1111 1111',
    })
  })

  // A 15-digit number.
  // 15桁のカード番号。
  it('creditcard accepts "378282246310005"', async () => {
    const res = await pathParamsApp.request('/creditcard/378282246310005')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '378282246310005' })
  })

  // Letters in the account part.
  // 口座部分に英字を含む。
  it('iban accepts "GB82WEST12345698765432"', async () => {
    const res = await pathParamsApp.request('/iban/GB82WEST12345698765432')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'GB82WEST12345698765432',
    })
  })

  // Another ISO 4217 code.
  // 別の ISO 4217 コード。
  it('currencycode accepts "JPY"', async () => {
    const res = await pathParamsApp.request('/currencycode/JPY')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'JPY' })
  })

  // ISO 4217 reserves XXX for "no currency".
  // ISO 4217 は XXX を「通貨なし」として予約している。
  it('currencycode accepts "XXX"', async () => {
    const res = await pathParamsApp.request('/currencycode/XXX')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'XXX' })
  })
})

// A transform changes the value before it reaches the handler, so these tests assert the
// value that arrives.
// 変換はハンドラに届く前に値を書き換える。そのため、ここでは届いた値を検証する。
describe('transforms: x-* extensions and format: trim', () => {
  // x-toLowerCase lower-cases the value.
  // x-toLowerCase は値を小文字化する。
  it('txlower accepts "MiXeD"', async () => {
    const res = await pathParamsApp.request('/txlower/MiXeD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'mixed' })
  })

  // Lower-casing is not limited to ASCII.
  // 小文字化は ASCII に限られない。
  it('txlower accepts "ÀB"', async () => {
    const res = await pathParamsApp.request(`/txlower/${encodeURIComponent('ÀB')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'àb' })
  })

  // A transform is not a validator: lower-casing leaves the spaces where they were.
  // 変換はバリデータではない。小文字化しても空白はそのまま残る。
  it('txlower accepts " A "', async () => {
    const res = await pathParamsApp.request(`/txlower/${encodeURIComponent(' A ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: ' a ' })
  })

  // Digits have no case and pass unchanged.
  // 数字には大文字小文字がなく、そのまま通る。
  it('txlower accepts "123"', async () => {
    const res = await pathParamsApp.request('/txlower/123')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '123' })
  })

  // x-toUpperCase upper-cases the value.
  // x-toUpperCase は値を大文字化する。
  it('txupper accepts "MiXeD"', async () => {
    const res = await pathParamsApp.request('/txupper/MiXeD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'MIXED' })
  })

  // Upper-casing can change the length: ß becomes SS.
  // 大文字化で長さが変わることがある(ß → SS)。
  it('txupper accepts "straße"', async () => {
    const res = await pathParamsApp.request(`/txupper/${encodeURIComponent('straße')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'STRASSE' })
  })

  // x-normalize: NFKC folds half-width kana to full width.
  // x-normalize: NFKC は半角カナを全角に正規化する。
  it('txnormalize accepts "ﾊﾝｶｸ"', async () => {
    const res = await pathParamsApp.request(`/txnormalize/${encodeURIComponent('ﾊﾝｶｸ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'ハンカク' })
  })

  // NFKC folds a full-width Latin letter to ASCII.
  // NFKC は全角英字を ASCII に正規化する。
  it('txnormalize accepts "Ａ"', async () => {
    const res = await pathParamsApp.request(`/txnormalize/${encodeURIComponent('Ａ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'A' })
  })

  // NFKC composes a letter and its combining accent into one code point.
  // NFKC は文字と結合アクセントを1つのコードポイントに合成する。
  it('txnormalize accepts "e\\u0301"', async () => {
    const res = await pathParamsApp.request(`/txnormalize/${encodeURIComponent('e\u0301')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '\u00E9' })
  })

  // NFKC expands a ligature.
  // NFKC は合字を展開する。
  it('txnormalize accepts "㍻"', async () => {
    const res = await pathParamsApp.request(`/txnormalize/${encodeURIComponent('㍻')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '平成' })
  })

  // NFKC folds a circled digit to a digit.
  // NFKC は丸数字を数字に正規化する。
  it('txnormalize accepts "①"', async () => {
    const res = await pathParamsApp.request(`/txnormalize/${encodeURIComponent('①')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '1' })
  })

  // A transform paired with a format: the value is lower-cased, then checked as an email.
  // 変換とフォーマットの組み合わせ。小文字化した後、メールアドレスとして検証される。
  it('txemail accepts "USER@EXAMPLE.COM"', async () => {
    const res = await pathParamsApp.request(`/txemail/${encodeURIComponent('USER@EXAMPLE.COM')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'user@example.com' })
  })

  // format: trim removes the spaces around the value.
  // format: trim は値の前後の空白を取り除く。
  it('trim accepts " spaced "', async () => {
    const res = await pathParamsApp.request(`/trim/${encodeURIComponent(' spaced ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'spaced' })
  })

  // A tab and a line feed are whitespace too.
  // タブと改行も空白として扱われる。
  it('trim accepts "\\tspaced\\n"', async () => {
    const res = await pathParamsApp.request(`/trim/${encodeURIComponent('\tspaced\n')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'spaced' })
  })

  // U+3000, the ideographic space, is whitespace too.
  // 全角スペース(U+3000)も空白として扱われる。
  it('trim accepts "\\u3000全角\\u3000"', async () => {
    const res = await pathParamsApp.request(`/trim/${encodeURIComponent('\u3000全角\u3000')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '全角' })
  })

  // Only the ends are trimmed; the space inside stays.
  // トリムされるのは両端だけで、内側の空白は残る。
  it('trim accepts " a b "', async () => {
    const res = await pathParamsApp.request(`/trim/${encodeURIComponent(' a b ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a b' })
  })
})

// A numeric or boolean enum / const names a typed value, and the segment is text: the literal
// used to be matched against the raw string, so every such request was rejected.
// 数値・真偽値の enum / const は型付きの値を指すが、セグメントは文字列である。
// かつてはリテラルを生の文字列と比較していたため、該当リクエストはすべて拒否されていた。
describe('literals: enum and const', () => {
  // The first member of enum: [1, 2].
  // enum: [1, 2] の最初のメンバー。
  it('ienum accepts "1"', async () => {
    const res = await pathParamsApp.request('/ienum/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // The last member of enum: [1, 2].
  // enum: [1, 2] の最後のメンバー。
  it('ienum accepts "2"', async () => {
    const res = await pathParamsApp.request('/ienum/2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '2' })
  })

  // A member of the number enum [0.5, 2.5].
  // number の enum [0.5, 2.5] のメンバー。
  it('nenum accepts "0.5"', async () => {
    const res = await pathParamsApp.request('/nenum/0.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // The other member of the number enum.
  // number の enum のもう一方のメンバー。
  it('nenum accepts "2.5"', async () => {
    const res = await pathParamsApp.request('/nenum/2.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '2.5' })
  })

  // The only member of the boolean enum [true].
  // boolean の enum [true] の唯一のメンバー。
  it('benum accepts "true"', async () => {
    const res = await pathParamsApp.request('/benum/true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // The constant of const: 7.
  // const: 7 の定数値。
  it('iconst accepts "7"', async () => {
    const res = await pathParamsApp.request('/iconst/7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '7' })
  })

  // A member of the string enum [asc, desc].
  // string の enum [asc, desc] のメンバー。
  it('senum accepts "asc"', async () => {
    const res = await pathParamsApp.request('/senum/asc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'asc' })
  })

  // The other member of the string enum.
  // string の enum のもう一方のメンバー。
  it('senum accepts "desc"', async () => {
    const res = await pathParamsApp.request('/senum/desc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'desc' })
  })

  // The constant of const: fixed.
  // const: fixed の定数値。
  it('sconst accepts "fixed"', async () => {
    const res = await pathParamsApp.request('/sconst/fixed')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'fixed' })
  })

  // A member of a string enum that looks like a number stays text.
  // 数値に見える string enum のメンバーは、文字列のまま届く。
  it('numericsenum accepts "1"', async () => {
    const res = await pathParamsApp.request('/numericsenum/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '1' })
  })

  // The leading zero is part of the text and is kept.
  // 先頭のゼロは文字列の一部であり、保持される。
  it('numericsenum accepts "02"', async () => {
    const res = await pathParamsApp.request('/numericsenum/02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '02' })
  })

  // A member that looks like a boolean stays text.
  // 真偽値に見えるメンバーも、文字列のまま届く。
  it('numericsenum accepts "true"', async () => {
    const res = await pathParamsApp.request('/numericsenum/true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'true' })
  })
})

// A constraint on a numeric parameter applies to the coerced value, not to the text of the
// segment.
// 数値パラメータの制約は、セグメントの文字列ではなく coerce 後の値に適用される。
describe('constraints: numeric and string', () => {
  // The minimum of minimum: 1, maximum: 10 is inclusive.
  // minimum: 1, maximum: 10 の最小値は範囲に含まれる。
  it('range accepts "1"', async () => {
    const res = await pathParamsApp.request('/range/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // Inside the range. Compared as text, "9" would sort after "10" and be refused.
  // 範囲内の値。文字列として比較すると "9" は "10" より後に並び、拒否されてしまう。
  it('range accepts "9"', async () => {
    const res = await pathParamsApp.request('/range/9')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '9' })
  })

  // The maximum is inclusive.
  // 最大値は範囲に含まれる。
  it('range accepts "10"', async () => {
    const res = await pathParamsApp.request('/range/10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '10' })
  })

  // Just above exclusiveMinimum: 0.
  // exclusiveMinimum: 0 をわずかに超える値。
  it('exclusive accepts "0.0001"', async () => {
    const res = await pathParamsApp.request('/exclusive/0.0001')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.0001' })
  })

  // Inside the range.
  // 範囲内の値。
  it('exclusive accepts "0.5"', async () => {
    const res = await pathParamsApp.request('/exclusive/0.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // Just below exclusiveMaximum: 1.
  // exclusiveMaximum: 1 をわずかに下回る値。
  it('exclusive accepts "0.9999"', async () => {
    const res = await pathParamsApp.request('/exclusive/0.9999')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.9999' })
  })

  // A very small value in exponent notation is still above zero.
  // 指数表記のごく小さな値も、0 より大きい。
  it('exclusive accepts "1e-10"', async () => {
    const res = await pathParamsApp.request('/exclusive/1e-10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1e-10' })
  })

  // Zero is a multiple of every number.
  // 0 はあらゆる数の倍数である。
  it('multiple accepts "0"', async () => {
    const res = await pathParamsApp.request('/multiple/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // The step of multipleOf: 5 itself.
  // multipleOf: 5 のステップそのもの。
  it('multiple accepts "5"', async () => {
    const res = await pathParamsApp.request('/multiple/5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // A negative multiple.
  // 負の倍数。
  it('multiple accepts "-5"', async () => {
    const res = await pathParamsApp.request('/multiple/-5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-5' })
  })

  // Twice the step.
  // ステップの2倍。
  it('multiple accepts "10"', async () => {
    const res = await pathParamsApp.request('/multiple/10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '10' })
  })

  // The minimum of an int64 range; the bound is emitted as the bigint literal 1n.
  // int64 の範囲の最小値。境界値は bigint リテラル 1n として生成される。
  it('int64range accepts "1"', async () => {
    const res = await pathParamsApp.request('/int64range/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '1' })
  })

  // The maximum of an int64 range, emitted as 100n.
  // int64 の範囲の最大値。100n として生成される。
  it('int64range accepts "100"', async () => {
    const res = await pathParamsApp.request('/int64range/100')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '100' })
  })

  // Exactly minLength: 2.
  // ちょうど minLength: 2 の長さ。
  it('length accepts "ab"', async () => {
    const res = await pathParamsApp.request('/length/ab')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'ab' })
  })

  // Exactly maxLength: 4.
  // ちょうど maxLength: 4 の長さ。
  it('length accepts "abcd"', async () => {
    const res = await pathParamsApp.request('/length/abcd')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'abcd' })
  })

  // Two characters, though six bytes in UTF-8: length counts characters.
  // 2文字(UTF-8 では 6 バイト)。長さは文字数で数える。
  it('length accepts "あい"', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('あい')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'あい' })
  })

  // Whitespace counts: nothing trims unless the schema says so.
  // 空白も長さに数える。スキーマが指定しない限りトリムは行われない。
  it('length accepts "  "', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('  ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '  ' })
  })

  // Two emoji are two characters, though four UTF-16 code units.
  // 絵文字2つは2文字である(UTF-16 では 4 コードユニット)。
  it('length accepts "🔥🔥"', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('🔥🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '🔥🔥' })
  })

  // Four emoji are four characters, within maxLength: 4.
  // 絵文字4つは4文字であり、maxLength: 4 に収まる。
  it('length accepts "🔥🔥🔥🔥"', async () => {
    const res = await pathParamsApp.request(`/length/${encodeURIComponent('🔥🔥🔥🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '🔥🔥🔥🔥' })
  })

  // Matches ^[a-z]+-\d{1,3}$ with one digit.
  // ^[a-z]+-\d{1,3}$ に数字1桁で一致する。
  it('pattern accepts "abc-1"', async () => {
    const res = await pathParamsApp.request('/pattern/abc-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'abc-1' })
  })

  // Matches with three digits, the most allowed.
  // 許容される最大の数字3桁で一致する。
  it('pattern accepts "abc-123"', async () => {
    const res = await pathParamsApp.request('/pattern/abc-123')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'abc-123' })
  })

  // The shortest match.
  // 最短の一致。
  it('pattern accepts "z-0"', async () => {
    const res = await pathParamsApp.request('/pattern/z-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'z-0' })
  })
})

// The parameter is oneOf an integer or the string "all". The integer branch coerces; the
// string branch does not need to.
// パラメータは integer または文字列 "all" の oneOf である。integer 側の分岐は coerce され、
// string 側の分岐は coerce 不要である。
describe('combinators: oneOf and allOf', () => {
  // Matches the integer branch and arrives as a number.
  // integer 側に一致し、number として届く。
  it('oneof accepts "1"', async () => {
    const res = await pathParamsApp.request('/oneof/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // A negative integer matches the integer branch.
  // 負の整数も integer 側に一致する。
  it('oneof accepts "-3"', async () => {
    const res = await pathParamsApp.request('/oneof/-3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '-3' })
  })

  // Matches the string branch and arrives as a string.
  // string 側に一致し、string として届く。
  it('oneof accepts "all"', async () => {
    const res = await pathParamsApp.request('/oneof/all')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'all' })
  })

  // allof is allOf of type: integer and minimum: 5. The segment is read once, around the whole
  // allOf, so both branches see the number 10.
  // allof は type: integer と minimum: 5 の allOf である。セグメントは allOf 全体の外側で
  // 1度だけ読み取られるため、両方の分岐が number の 10 を見る。
  it('allof accepts a value that meets both branches', async () => {
    const res = await pathParamsApp.request('/allof/10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '10' })
  })

  // oneofis is oneOf an integer or a string. Digits are read as a number, which only the integer
  // branch takes.
  // oneofis は integer または string の oneOf である。
  // 数字は number として読み取られ、integer 側の分岐だけがそれを受理する。
  it('oneofis reads digits as the integer branch', async () => {
    const res = await pathParamsApp.request('/oneofis/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // A word is not the text of an integer, so it stays text and only the string branch takes it.
  // 単語は整数の表記ではないため文字列のままとなり、string 側の分岐だけが受理する。
  it('oneofis reads a word as the string branch', async () => {
    const res = await pathParamsApp.request('/oneofis/abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'abc' })
  })
})

// The route is /orgs/{orgId}/repos/{repoId}/issues/{issueId}.
// ルートは /orgs/{orgId}/repos/{repoId}/issues/{issueId} である。
describe('declarations: several parameters in one path', () => {
  // The path holds an integer, a UUID and an int64. Each is coerced by its own schema,
  // independently of the others.
  // パスに integer・UUID・int64 の3つが含まれる。それぞれが他とは独立に、
  // 自身のスキーマで coerce される。
  it('coerces each of three parameters by its own schema', async () => {
    const res = await pathParamsApp.request(
      '/orgs/1/repos/0190b1f4-0000-7000-8000-000000000000/issues/9007199254740993',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      orgId: { valueType: 'number', valueText: '1' },
      repoId: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
      issueId: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // Values must not leak between positions: 2 lands in orgId and 3 in issueId, not the other
  // way round.
  // 値が位置をまたいで混ざらないこと。2 は orgId に、3 は issueId に入り、逆にはならない。
  it('keeps each value in its own position', async () => {
    const res = await pathParamsApp.request(
      '/orgs/2/repos/0190b1f4-0000-7000-8000-000000000000/issues/3',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      orgId: { valueType: 'number', valueText: '2' },
      repoId: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
      issueId: { valueType: 'bigint', valueText: '3' },
    })
  })
})

// The route is /named/{user-id}/{post_id}.
// ルートは /named/{user-id}/{post_id} である。
describe('declarations: parameter names that are not identifiers', () => {
  // "user-id" cannot be a JavaScript identifier and "post_id" holds an underscore. Both names
  // have to survive from {name} in the spec, through the Hono route, to the validated object.
  // "user-id" は JavaScript の識別子になれず、"post_id" はアンダースコアを含む。
  // どちらの名前も、仕様の {name} から Hono のルートを経て検証済みオブジェクトに至るまで、
  // 保たれなければならない。
  it('keeps a hyphenated and an underscored name verbatim', async () => {
    const res = await pathParamsApp.request('/named/5/true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'user-id': { valueType: 'number', valueText: '5' },
      post_id: { valueType: 'boolean', valueText: 'true' },
    })
  })
})

// How a parameter is declared must not change how it is coerced.
// パラメータの宣言方法によって、coerce の結果が変わってはならない。
describe('declarations: $ref and path-item level', () => {
  // The parameter is a $ref to #/components/parameters/Id, an int64. The reference must carry
  // its coercion along.
  // パラメータは #/components/parameters/Id(int64)への $ref である。
  // 参照経由でも coerce が引き継がれなければならない。
  it('a parameter $ref coerces like an inline declaration', async () => {
    const res = await pathParamsApp.request('/paramref/9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'bigint',
      valueText: '9007199254740993',
    })
  })

  // The parameter is declared once on the path item, not on the operation, and reaches every
  // operation under it.
  // パラメータはオペレーションではなくパスアイテムで1度だけ宣言されており、
  // 配下のすべてのオペレーションに適用される。
  it('a path-item parameter is validated for GET', async () => {
    const res = await pathParamsApp.request('/shared/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // The second operation of the same path item inherits the same parameter.
  // 同じパスアイテムの2つ目のオペレーションも、同じパラメータを継承する。
  it('a path-item parameter is validated for DELETE', async () => {
    const res = await pathParamsApp.request('/shared/1', { method: 'DELETE' })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // The path item declares id as a string, the operation declares it as an integer. The
  // operation wins, so the value arrives as a number.
  // パスアイテムは id を string として、オペレーションは integer として宣言している。
  // オペレーション側が優先されるため、値は number として届く。
  it('an operation parameter overrides the path-item one', async () => {
    const res = await pathParamsApp.request('/override/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // The parameter is declared with schema: { $ref: '#/components/schemas/Count' }, an integer
  // with minimum: 0. The component schema, z.int().min(0), is written for a typed value, so
  // the segment is read from text before it reaches the component.
  // パラメータは schema: { $ref: '#/components/schemas/Count' }(minimum: 0 の integer)で
  // 宣言されている。コンポーネントスキーマ z.int().min(0) は型付きの値を前提としているため、
  // セグメントはコンポーネントに渡る前に文字列から読み取られる。
  it('a numeric schema behind a schema $ref coerces the segment', async () => {
    const res = await pathParamsApp.request('/schemaref/5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // Zero is the minimum of the referenced schema.
  // 0 は参照先スキーマの最小値である。
  it('a schema $ref accepts the minimum of the referenced schema', async () => {
    const res = await pathParamsApp.request('/schemaref/0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })
})

// The path is sent exactly as written in each test, because the encoding itself is the
// subject.
// エンコーディングそのものが検証対象のため、各テストではパスを書かれたとおりに送信する。
describe('wire: percent-encoding', () => {
  // An encoded slash is one segment to the router and a slash to the handler.
  // エンコードされたスラッシュは、ルーターにとっては1つのセグメントであり、
  // ハンドラにはスラッシュとして届く。
  it('decodes a%2Fb to "a/b"', async () => {
    const res = await pathParamsApp.request('/string/a%2Fb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a/b' })
  })

  // An encoded space.
  // エンコードされた空白。
  it('decodes a%20b to "a b"', async () => {
    const res = await pathParamsApp.request('/string/a%20b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a b' })
  })

  // An encoded plus sign.
  // エンコードされたプラス記号。
  it('decodes a%2Bb to "a+b"', async () => {
    const res = await pathParamsApp.request('/string/a%2Bb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a+b' })
  })

  // Unlike in a query string, a plus sign in a path is not read as a space.
  // クエリ文字列と違い、パスではプラス記号は空白として解釈されない。
  it('decodes a+b to "a+b"', async () => {
    const res = await pathParamsApp.request('/string/a+b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a+b' })
  })

  // An encoded question mark does not start the query string.
  // エンコードされた疑問符は、クエリ文字列の開始にならない。
  it('decodes a%3Fb to "a?b"', async () => {
    const res = await pathParamsApp.request('/string/a%3Fb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a?b' })
  })

  // An encoded hash does not start the fragment.
  // エンコードされたハッシュ記号は、フラグメントの開始にならない。
  it('decodes a%23b to "a#b"', async () => {
    const res = await pathParamsApp.request('/string/a%23b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a#b' })
  })

  // An encoded percent sign.
  // エンコードされたパーセント記号。
  it('decodes a%25b to "a%b"', async () => {
    const res = await pathParamsApp.request('/string/a%25b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a%b' })
  })

  // A semicolon needs no encoding and is kept.
  // セミコロンはエンコード不要で、そのまま保持される。
  it('decodes a;b to "a;b"', async () => {
    const res = await pathParamsApp.request('/string/a;b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a;b' })
  })

  // Encoded "=" and "&" have no meaning in a path.
  // エンコードされた "=" と "&" は、パスでは特別な意味を持たない。
  it('decodes a%3Db%26c to "a=b&c"', async () => {
    const res = await pathParamsApp.request('/string/a%3Db%26c')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a=b&c' })
  })

  // A three-byte UTF-8 sequence.
  // 3バイトの UTF-8 シーケンス。
  it('decodes %E3%81%82 to "あ"', async () => {
    const res = await pathParamsApp.request('/string/%E3%81%82')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'あ' })
  })

  // A four-byte UTF-8 sequence, outside the Basic Multilingual Plane.
  // 基本多言語面の外にある、4バイトの UTF-8 シーケンス。
  it('decodes %F0%9F%94%A5 to "🔥"', async () => {
    const res = await pathParamsApp.request('/string/%F0%9F%94%A5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '🔥' })
  })

  // Lower-case hexadecimal digits decode the same.
  // 16進数が小文字でも同じようにデコードされる。
  it('decodes %e3%81%82 to "あ"', async () => {
    const res = await pathParamsApp.request('/string/%e3%81%82')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'あ' })
  })

  // An encoded NUL is delivered as the NUL character.
  // エンコードされた NUL は、NUL 文字として届く。
  it('decodes %00 to "\\u0000"', async () => {
    const res = await pathParamsApp.request('/string/%00')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '\u0000' })
  })

  // The value is decoded once: %2520 is the encoding of "%20", not of a space.
  // デコードは1回だけ行われる。%2520 は "%20" のエンコードであり、空白のエンコードではない。
  it('decodes %2520 to "%20"', async () => {
    const res = await pathParamsApp.request('/string/%2520')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '%20' })
  })

  // A lone percent sign cannot be decoded and is delivered as it was sent.
  // 単独のパーセント記号はデコードできず、送信時のまま届く。
  it('decodes % to "%"', async () => {
    const res = await pathParamsApp.request('/string/%')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '%' })
  })

  // An escape that is not hexadecimal is delivered as it was sent.
  // 16進数でないエスケープは、送信時のまま届く。
  it('decodes %ZZ to "%ZZ"', async () => {
    const res = await pathParamsApp.request('/string/%ZZ')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '%ZZ' })
  })

  // A UTF-8 sequence cut short is delivered as it was sent.
  // 途中で切れた UTF-8 シーケンスは、送信時のまま届く。
  it('decodes %E3%81 to "%E3%81"', async () => {
    const res = await pathParamsApp.request('/string/%E3%81')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '%E3%81' })
  })

  // The CIDR format sees "192.168.0.0/24", the decoded value, not the encoded text.
  // CIDR フォーマットが検証するのは、エンコードされた文字列ではなく、
  // デコード後の "192.168.0.0/24" である。
  it('validates the decoded value', async () => {
    const res = await pathParamsApp.request('/cidrv4/192.168.0.0%2F24')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '192.168.0.0/24' })
  })

  // %34%32 is "42": decoding happens before coercion.
  // %34%32 は "42" を表す。デコードは coerce より前に行われる。
  it('coerces percent-encoded digits like plain ones', async () => {
    const res = await pathParamsApp.request('/integer/%34%32')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '42' })
  })
})

// What decides whether a request reaches the route at all.
// リクエストがそもそもルートに到達するかどうかを決める要素。
describe('wire: routing', () => {
  // "?value=2" is a query parameter; the path parameter is still 1.
  // "?value=2" はクエリパラメータである。パスパラメータは 1 のままである。
  it('ignores a query parameter of the same name', async () => {
    const res = await pathParamsApp.request('/integer/1?value=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // A query parameter the route does not declare is not validated.
  // ルートが宣言していないクエリパラメータは検証されない。
  it('ignores an invalid query parameter of the same name', async () => {
    const res = await pathParamsApp.request('/integer/1?value=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // The fragment is not part of the path.
  // フラグメントはパスの一部ではない。
  it('ignores the fragment', async () => {
    const res = await pathParamsApp.request('/integer/1#2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // Hono answers HEAD through the GET route, so the parameter is validated the same way: a
  // valid one is accepted.
  // Hono は HEAD を GET のルートで処理するため、パラメータは同じように検証される。
  // 有効な値は受理される。
  it('validates a HEAD request like the GET it mirrors', async () => {
    const res = await pathParamsApp.request('/integer/1', { method: 'HEAD' })
    expect(res.status).toBe(200)
  })

  // One request must not change the next: no state is kept between validations.
  // あるリクエストが次のリクエストに影響しないこと。検証間で状態は保持されない。
  it('gives the same answer to the same request, whatever came between', async () => {
    const first = await pathParamsApp.request('/int64/9007199254740993')
    const between = await pathParamsApp.request('/int64/not-a-value')
    expect(between.status).toBe(422)
    const second = await pathParamsApp.request('/int64/9007199254740993')
    expect(second.status).toBe(200)
    expect(await second.json()).toStrictEqual(await first.json())
  })
})

// A path parameter is one segment, so an array travels inside it. style: simple, the default,
// joins the elements with commas; label puts a "." in front of the value and matrix a ";name=",
// on a scalar as much as on an array, and with explode: true that prefix separates the elements
// too. The answer shows an array as its JSON text: [1,2,3] holds numbers, ["1","2","3"] would
// hold text.
// パスパラメータは1つのセグメントなので、配列はその中に収めて運ばれる。デフォルトの
// style: simple は要素をカンマで連結する。label は値の先頭に "." を、matrix は ";name=" を付ける。
// これはスカラーでも配列でも同じであり、explode: true ではその接頭辞が要素の区切りも兼ねる。
// 応答は配列を JSON 文字列で示す。[1,2,3] は number を、["1","2","3"] であれば文字列を保持している。
describe('styles: simple, label and matrix', () => {
  // style: simple serialises [1, 2, 3] as 1,2,3.
  // style: simple では、[1, 2, 3] は 1,2,3 としてシリアライズされる。
  it('simplearr splits a comma-separated segment', async () => {
    const res = await pathParamsApp.request('/simplearr/1,2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2,3]' })
  })

  // A one-element array has no separator to split on.
  // 1要素の配列には、分割すべき区切り文字がない。
  it('simplearr reads a single value as a one-element array', async () => {
    const res = await pathParamsApp.request('/simplearr/7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[7]' })
  })

  // The comma is decoded before the segment is split.
  // カンマは、セグメントが分割される前にデコードされる。
  it('simplearr splits a percent-encoded comma', async () => {
    const res = await pathParamsApp.request('/simplearr/1%2C2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2]' })
  })

  // The same for an array of strings.
  // string の配列でも同様である。
  it('simplestrarr splits an array of strings', async () => {
    const res = await pathParamsApp.request('/simplestrarr/a,b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '["a","b"]' })
  })

  // style: label serialises 5 as .5. The dot is the prefix, not a decimal point.
  // style: label では、5 は .5 としてシリアライズされる。
  // このドットは接頭辞であり、小数点ではない。
  it('label strips the leading dot of a scalar', async () => {
    const res = await pathParamsApp.request('/label/.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // With explode: false the elements after the dot are separated by commas.
  // explode: false では、ドットに続く要素はカンマで区切られる。
  it('labelarr strips the dot and splits on commas', async () => {
    const res = await pathParamsApp.request('/labelarr/.1,2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2,3]' })
  })

  // With explode: true every element carries the dot.
  // explode: true では、すべての要素にドットが付く。
  it('labelexplode splits on the dot', async () => {
    const res = await pathParamsApp.request('/labelexplode/.1.2.3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2,3]' })
  })

  // One element, one dot.
  // 要素が1つなら、ドットも1つである。
  it('labelexplode reads a single value as a one-element array', async () => {
    const res = await pathParamsApp.request('/labelexplode/.7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[7]' })
  })

  // style: matrix serialises 5 as ;value=5.
  // style: matrix では、5 は ;value=5 としてシリアライズされる。
  it('matrix strips the name prefix of a scalar', async () => {
    const res = await pathParamsApp.request('/matrix/;value=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // The segment is decoded before the prefix is stripped.
  // セグメントは、接頭辞が取り除かれる前にデコードされる。
  it('matrix strips a percent-encoded prefix', async () => {
    const res = await pathParamsApp.request('/matrix/%3Bvalue=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '5' })
  })

  // With explode: false the name appears once and the elements are separated by commas.
  // explode: false では、名前は1度だけ現れ、要素はカンマで区切られる。
  it('matrixarr strips the prefix and splits on commas', async () => {
    const res = await pathParamsApp.request('/matrixarr/;value=1,2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2,3]' })
  })

  // With explode: true every element carries the name.
  // explode: true では、すべての要素に名前が付く。
  it('matrixexplode splits on the repeated name', async () => {
    const res = await pathParamsApp.request('/matrixexplode/;value=1;value=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '[1,2]' })
  })
})

// An object is one segment too. style: simple alternates names and values, and with explode: true
// writes assignments; label and matrix put their prefix in front. The object is a: integer, b:
// string on every route. The answer shows it as its JSON text: {"a":1} holds a number.
// オブジェクトも、1つのセグメントになる。style: simple は名前と値を交互に並べ、explode: true では
// 代入の形で書く。label と matrix は、それぞれの接頭辞を先頭に付ける。どのルートでも、オブジェクトは
// a: integer, b: string である。応答は、オブジェクトを JSON 文字列で示す。{"a":1} は number を
// 保持している。
describe('objects: an object in one segment', () => {
  // style: simple serialises { a: 1, b: "x" } as a,1,b,x.
  // style: simple では、{ a: 1, b: "x" } は a,1,b,x としてシリアライズされる。
  it('simpleobj reads alternating names and values', async () => {
    const res = await pathParamsApp.request('/simpleobj/a,1,b,x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1,"b":"x"}' })
  })

  // One name and one value.
  // 名前1つと値1つ。
  it('simpleobj reads a single pair', async () => {
    const res = await pathParamsApp.request('/simpleobj/a,1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1}' })
  })

  // c is not a property of the object.
  // c は、オブジェクトのプロパティではない。
  it('simpleobj drops a property it does not declare', async () => {
    const res = await pathParamsApp.request('/simpleobj/c,1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{}' })
  })

  // With explode: true the object is a=1,b=x.
  // explode: true では、オブジェクトは a=1,b=x になる。
  it('simpleobjx reads assignments', async () => {
    const res = await pathParamsApp.request('/simpleobjx/a=1,b=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1,"b":"x"}' })
  })

  // style: label with explode: true serialises the object as .a=1.b=x.
  // style: label + explode: true では、オブジェクトは .a=1.b=x としてシリアライズされる。
  it('labelobjx reads assignments separated by dots', async () => {
    const res = await pathParamsApp.request('/labelobjx/.a=1.b=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1,"b":"x"}' })
  })

  // style: matrix serialises the object as ;value=a,1,b,x.
  // style: matrix では、オブジェクトは ;value=a,1,b,x としてシリアライズされる。
  it('matrixobj reads pairs behind the name of the parameter', async () => {
    const res = await pathParamsApp.request('/matrixobj/;value=a,1,b,x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1,"b":"x"}' })
  })

  // With explode: true every property carries its own name, ;a=1;b=x.
  // explode: true では、各プロパティが自身の名前を持つ(;a=1;b=x)。
  it('matrixobjx reads assignments separated by semicolons', async () => {
    const res = await pathParamsApp.request('/matrixobjx/;a=1;b=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'object', valueText: '{"a":1,"b":"x"}' })
  })
})

// Numbers are read from text by a decimal grammar, and string formats by Zod's own checks.
// Both take a little more than the plainest spelling, and these tests pin exactly how much
// more, so that a change shows up here as a decision and not as a surprise. They record
// today's behaviour; they do not say it is desirable.
// 数値は10進の文法で、文字列フォーマットは Zod 自身の検証で、文字列から読み取られる。
// どちらも最も素直な表記より少し広く受理するため、「どこまで読むか」をここで固定する。
// 変更が、想定外の変化ではなく意図した判断として差分に現れるようにするためである。
// これらは現状の挙動の記録であり、望ましい挙動だと主張するものではない。
describe('leniency: what is read beyond the plainest spelling (pinned, not endorsed)', () => {
  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('integer accepts "-0"', async () => {
    const res = await pathParamsApp.request('/integer/-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // Leading zeros are dropped; the value is not read as octal.
  // 先頭のゼロは無視される。8進数としては読まれない。
  it('integer accepts "007"', async () => {
    const res = await pathParamsApp.request('/integer/007')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '7' })
  })

  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('int64 accepts "-0"', async () => {
    const res = await pathParamsApp.request('/int64/-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '0' })
  })

  // Leading zeros are dropped.
  // 先頭のゼロは無視される。
  it('int64 accepts "007"', async () => {
    const res = await pathParamsApp.request('/int64/007')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'bigint', valueText: '7' })
  })

  // Negative zero is echoed as zero.
  // 負のゼロはゼロとして返る。
  it('number accepts "-0"', async () => {
    const res = await pathParamsApp.request('/number/-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0' })
  })

  // cuid2 is a pattern with no fixed length: one letter passes.
  // cuid2 は長さ固定のないパターンであり、1文字でも通る。
  it('cuid2 accepts "a"', async () => {
    const res = await pathParamsApp.request('/cuid2/a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'a' })
  })

  // cuid2 does not require a leading letter.
  // cuid2 は先頭が英字であることを要求しない。
  it('cuid2 accepts "1z4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await pathParamsApp.request('/cuid2/1z4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: '1z4a98xxat96iws9zmbrgj3a',
    })
  })

  // format: url takes the javascript: scheme; narrowing is the caller's to do.
  // format: url は javascript: スキームも受理する。絞り込みは利用側の責務である。
  it('url accepts "javascript:alert(1)"', async () => {
    const res = await pathParamsApp.request(`/url/${encodeURIComponent('javascript:alert(1)')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      valueType: 'string',
      valueText: 'javascript:alert(1)',
    })
  })

  // A trailing dot satisfies the hostname grammar.
  // 末尾のドットはホスト名の文法を満たす。
  it('hostname accepts "example.com."', async () => {
    const res = await pathParamsApp.request('/hostname/example.com.')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: 'example.com.' })
  })

  // A dotted quad satisfies the hostname grammar.
  // ドット区切りの4数値はホスト名の文法を満たす。
  it('hostname accepts "192.168.0.1"', async () => {
    const res = await pathParamsApp.request('/hostname/192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '192.168.0.1' })
  })

  // A leading zero still names the member 1.
  // 先頭にゼロがあっても、メンバー 1 を指す。
  it('ienum accepts "01"', async () => {
    const res = await pathParamsApp.request('/ienum/01')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '1' })
  })

  // "0.5" without its leading zero.
  // 先頭のゼロを省略した "0.5"。
  it('nenum accepts ".5"', async () => {
    const res = await pathParamsApp.request('/nenum/.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // "0.5" with a trailing zero.
  // 末尾にゼロを付けた "0.5"。
  it('nenum accepts "0.50"', async () => {
    const res = await pathParamsApp.request('/nenum/0.50')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // "0.5" in exponent notation.
  // 指数表記の "0.5"。
  it('nenum accepts "5e-1"', async () => {
    const res = await pathParamsApp.request('/nenum/5e-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '0.5' })
  })

  // A leading zero still names the constant 7.
  // 先頭にゼロがあっても、定数 7 を指す。
  it('iconst accepts "07"', async () => {
    const res = await pathParamsApp.request('/iconst/07')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'number', valueText: '7' })
  })

  // A boolean literal takes every spelling z.stringbool() reads as true: the digit 1.
  // 真偽値リテラルは、z.stringbool() が true と読むすべての表記を受理する。数字の 1。
  it('benum accepts "1"', async () => {
    const res = await pathParamsApp.request('/benum/1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "yes" is read as true.
  // "yes" は true として読まれる。
  it('benum accepts "yes"', async () => {
    const res = await pathParamsApp.request('/benum/yes')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // "on" is read as true.
  // "on" は true として読まれる。
  it('benum accepts "on"', async () => {
    const res = await pathParamsApp.request('/benum/on')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // Upper case is read as true.
  // 大文字も true として読まれる。
  it('benum accepts "TRUE"', async () => {
    const res = await pathParamsApp.request('/benum/TRUE')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'boolean', valueText: 'true' })
  })

  // A value that is only whitespace trims to the empty string and is accepted, because format:
  // trim sets no minimum length.
  // 空白のみの値はトリム後に空文字列となり、受理される。
  // format: trim は最小長を設定しないためである。
  it('trim accepts " "', async () => {
    const res = await pathParamsApp.request(`/trim/${encodeURIComponent(' ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({ valueType: 'string', valueText: '' })
  })
})
