// Every parameter shape the generator supports, sent as a real cookie. A cookie reaches
// the handler as a string just like a query or header value, but it took the branch that
// used to skip coercion entirely, so every numeric or boolean cookie rejected its own
// input.
//
// 生成器が対応するすべてのパラメータ形状を、実際の Cookie として送信して検証する。
// Cookie もクエリやヘッダーと同じく文字列で届くが、かつて coerce を完全にスキップしていた
// 分岐を通るため、数値・真偽値の Cookie はすべて自身の入力を拒否していた。
//
// How to read a test / テストの読み方:
//   Every route answers the cookies its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A cookie that
//   was not sent and has no default is absent from the answer. A rejected request answers
//   422 with `{ issues: [...] }`: the path of every issue.
//   すべてのルートは、ハンドラが受け取った Cookie を名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもない Cookie は、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }`(各 issue のパス)を返す。
//
// How a value is sent / 値の送信方法:
//   A value that holds anything but plain ASCII is percent-encoded with
//   `encodeURIComponent`, the way a client sets such a cookie; Hono decodes it before
//   validation. The tests named "wire" send the `Cookie:` header exactly as written instead.
//   プレーンな ASCII 以外を含む値は、クライアントが Cookie を設定するときと同じく
//   `encodeURIComponent` でパーセントエンコードして送信する。Hono は検証の前にこれを
//   デコードする。"wire" と名付けたテストでは、`Cookie:` ヘッダーを書かれたとおりに送信する。
//
// Routes / ルート:
//   /cookies   every shape as `<shape>`, and the array `ids`, all optional
//              全形状(`<shape>`)と配列 `ids`。すべて任意
//   /optional  literals, constraints, transforms, odd names / リテラル・制約・変換・名前
//   /defaults  cookies with a default / デフォルト値を持つ Cookie
//   /required  required cookies / 必須 Cookie
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
//   - wire: the Cookie header
//   - arrays
//   - objects: an object in cookies
//   - references: a schema behind $ref
//   - leniency: what is read beyond the plainest spelling (pinned, not endorsed)
import { describe, expect, it } from 'vite-plus/test'

import { cookieParamsApp } from './app'

// One canonical value per shape, sent alone as the cookie <shape>. The value is compared as
// well as the type: a coercion that changes the value is as wrong as one that changes the
// type.
// 形状ごとの代表値を、Cookie <shape> として単独で送信する。型だけでなく値も比較する。
// 値を変えてしまう変換は、型を誤る変換と同じく不具合である。
describe('shapes: every supported shape accepts its own value', () => {
  // An integer with no format arrives as a number.
  // フォーマット指定のない integer は number として届く。
  it('integer accepts "42"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=42' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '42' },
    })
  })

  // An int32 arrives as a number.
  // int32 は number として届く。
  it('int32 accepts "42"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int32=42' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '42' },
    })
  })

  // An int64 arrives as a bigint, exact past Number.MAX_SAFE_INTEGER.
  // int64 は bigint として届き、Number.MAX_SAFE_INTEGER を超えても桁落ちしない。
  it('int64 accepts "9007199254740993"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // format: bigint arrives as a bigint.
  // format: bigint は bigint として届く。
  it('bigint accepts "9007199254740993"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'bigint=9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // A uint32 arrives as a number, up to its maximum.
  // uint32 は最大値まで number として届く。
  it('uint32 accepts "4294967295"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint32=4294967295' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '4294967295' },
    })
  })

  // A uint64 arrives as a bigint, up to its maximum, which no double can hold.
  // uint64 は最大値まで bigint として届く。この最大値は double では保持できない。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint64=18446744073709551615' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // A number with no format arrives as a number.
  // フォーマット指定のない number は number として届く。
  it('number accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float arrives as a number.
  // format: float は number として届く。
  it('float accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float=1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float32 arrives as a number.
  // format: float32 は number として届く。
  it('float32 accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float32=1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float64 arrives as a number.
  // format: float64 は number として届く。
  it('float64 accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float64=1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: double arrives as a number.
  // format: double は number として届く。
  it('double accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'double=1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: password on a number is an annotation; the value is still a number.
  // number に対する format: password は注釈にすぎず、値は number のまま届く。
  it('numpassword accepts "1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'numpassword=1.5' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numpassword: { valueType: 'number', valueText: '1.5' },
    })
  })

  // A boolean arrives as a boolean, not as the text "true".
  // boolean は文字列 "true" ではなく boolean として届く。
  it('boolean accepts "true"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // A string arrives unchanged.
  // string はそのまま届く。
  it('string accepts "plain"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'string=plain' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      string: { valueType: 'string', valueText: 'plain' },
    })
  })

  // A well-formed email address.
  // 正しい形式のメールアドレス。
  it('email accepts "user@example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user@example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'user@example.com' },
    })
  })

  // A UUID of any version (here version 7).
  // 任意バージョンの UUID(ここではバージョン 7)。
  it('uuid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // A version 4 UUID.
  // バージョン 4 の UUID。
  it('uuidv4 accepts "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuidv4=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv4: { valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
  })

  // A version 7 UUID.
  // バージョン 7 の UUID。
  it('uuidv7 accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuidv7=0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv7: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // An absolute URL.
  // 絶対 URL。
  it('url accepts "https://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('https://example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // format: uri is validated like a URL.
  // format: uri は URL と同じ検証を受ける。
  it('uri accepts "https://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `uri=${encodeURIComponent('https://example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // An https URL.
  // https の URL。
  it('httpurl accepts "https://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('https://example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // A host name.
  // ホスト名。
  it('hostname accepts "example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=example.com' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'example.com' },
    })
  })

  // Hexadecimal digits.
  // 16進数の文字列。
  it('hex accepts "deadbeef"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hex=deadbeef' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'deadbeef' },
    })
  })

  // A single emoji.
  // 絵文字1文字。
  it('emoji accepts "🔥"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `emoji=${encodeURIComponent('🔥')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '🔥' },
    })
  })

  // Base64 with padding.
  // パディング付きの Base64。
  it('base64 accepts "aGVsbG8="', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `base64=${encodeURIComponent('aGVsbG8=')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // Base64url, which has no padding.
  // パディングのない Base64url。
  it('base64url accepts "aGVsbG8"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'base64url=aGVsbG8' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url: { valueType: 'string', valueText: 'aGVsbG8' },
    })
  })

  // A 21-character Nano ID.
  // 21文字の Nano ID。
  it('nanoid accepts "V1StGXR8_Z5jdHi6B-myT"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'nanoid=V1StGXR8_Z5jdHi6B-myT' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nanoid: { valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' },
    })
  })

  // A CUID2.
  // CUID2。
  it('cuid2 accepts "tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'cuid2=tz4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' },
    })
  })

  // A 26-character ULID.
  // 26文字の ULID。
  it('ulid accepts "01ARZ3NDEKTSV4RRFFQ69G5FAV"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ulid=01ARZ3NDEKTSV4RRFFQ69G5FAV' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid: { valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
    })
  })

  // An IPv4 address.
  // IPv4 アドレス。
  it('ipv4 accepts "192.168.0.1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ipv4=192.168.0.1' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An IPv6 address in compressed form.
  // 省略表記の IPv6 アドレス。
  it('ipv6 accepts "2001:db8::1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('2001:db8::1')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '2001:db8::1' },
    })
  })

  // An IPv4 CIDR block.
  // IPv4 の CIDR ブロック。
  it('cidrv4 accepts "192.168.0.0/24"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv4=${encodeURIComponent('192.168.0.0/24')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '192.168.0.0/24' },
    })
  })

  // An IPv6 CIDR block.
  // IPv6 の CIDR ブロック。
  it('cidrv6 accepts "2001:db8::/32"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv6=${encodeURIComponent('2001:db8::/32')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '2001:db8::/32' },
    })
  })

  // An ISO 8601 date; it stays a string, it is not turned into a Date.
  // ISO 8601 の日付。Date には変換されず、文字列のまま届く。
  it('date accepts "2020-01-02"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=2020-01-02' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '2020-01-02' },
    })
  })

  // An ISO 8601 time.
  // ISO 8601 の時刻。
  it('time accepts "12:34:56"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // An ISO 8601 date-time in UTC; it stays a string.
  // UTC の ISO 8601 日時。文字列のまま届く。
  it('datetime accepts "2020-01-02T03:04:05Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02T03:04:05Z')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
    })
  })

  // An ISO 8601 duration with every component.
  // すべての要素を含む ISO 8601 の期間。
  it('duration accepts "P1Y2M3DT4H5M6S"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'duration=P1Y2M3DT4H5M6S' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' },
    })
  })

  // format: byte is an annotation; the text is passed through.
  // format: byte は注釈にすぎず、文字列はそのまま渡される。
  it('byte accepts "aGVsbG8="', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `byte=${encodeURIComponent('aGVsbG8=')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte: { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // format: password is an annotation; the text is passed through.
  // format: password は注釈にすぎず、文字列はそのまま渡される。
  it('strpassword accepts "hunter2"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'strpassword=hunter2' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword: { valueType: 'string', valueText: 'hunter2' },
    })
  })

  // A MAC address with colon separators.
  // コロン区切りの MAC アドレス。
  it('mac accepts "00:1a:2b:3c:4d:5e"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `mac=${encodeURIComponent('00:1a:2b:3c:4d:5e')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
    })
  })

  // An E.164 phone number.
  // E.164 形式の電話番号。
  it('e164 accepts "+14155552671"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `e164=${encodeURIComponent('+14155552671')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      e164: { valueType: 'string', valueText: '+14155552671' },
    })
  })

  // A card number that passes the Luhn check.
  // Luhn チェックを通過するカード番号。
  it('creditcard accepts "4111111111111111"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'creditcard=4111111111111111' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111111111111111' },
    })
  })

  // An IBAN with a valid checksum.
  // チェックサムが正しい IBAN。
  it('iban accepts "DE89370400440532013000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'iban=DE89370400440532013000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban: { valueType: 'string', valueText: 'DE89370400440532013000' },
    })
  })

  // An ISO 4217 currency code.
  // ISO 4217 の通貨コード。
  it('currencycode accepts "USD"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=USD' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'USD' },
    })
  })

  // A 27-character KSUID.
  // 27文字の KSUID。
  it('ksuid accepts "0ujsszwN8NRY24YaXiTIE2VWDTS"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ksuid=0ujsszwN8NRY24YaXiTIE2VWDTS' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ksuid: { valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' },
    })
  })

  // A 20-character XID.
  // 20文字の XID。
  it('xid accepts "9m4e2mr0ui3e8a215n4g"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'xid=9m4e2mr0ui3e8a215n4g' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid: { valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' },
    })
  })

  // A GUID.
  // GUID。
  it('guid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'guid=0190b1f4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // format: trim leaves a value with no surrounding whitespace unchanged.
  // format: trim は、前後に空白のない値をそのまま通す。
  it('trim accepts "spaced"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'trim=spaced' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trim: { valueType: 'string', valueText: 'spaced' },
    })
  })
})

// The first and last value each integer format holds.
// 各整数フォーマットが保持できる最初と最後の値。
describe('integers: accepted boundaries', () => {
  // Zero.
  // ゼロ。
  it('integer accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '0' },
    })
  })

  // A negative integer.
  // 負の整数。
  it('integer accepts "-1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=-1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '-1' },
    })
  })

  // Number.MAX_SAFE_INTEGER, the last integer a double holds exactly.
  // Number.MAX_SAFE_INTEGER。double が正確に保持できる最後の整数。
  it('integer accepts "9007199254740991"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=9007199254740991' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '9007199254740991' },
    })
  })

  // Number.MIN_SAFE_INTEGER.
  // Number.MIN_SAFE_INTEGER。
  it('integer accepts "-9007199254740991"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'integer=-9007199254740991' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '-9007199254740991' },
    })
  })

  // The int32 maximum, 2^31 - 1.
  // int32 の最大値(2^31 - 1)。
  it('int32 accepts "2147483647"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int32=2147483647' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '2147483647' },
    })
  })

  // The int32 minimum, -2^31.
  // int32 の最小値(-2^31)。
  it('int32 accepts "-2147483648"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int32=-2147483648' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '-2147483648' },
    })
  })

  // Zero.
  // ゼロ。
  it('int32 accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int32=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 minimum.
  // uint32 の最小値。
  it('uint32 accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint32=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 maximum, 2^32 - 1.
  // uint32 の最大値(2^32 - 1)。
  it('uint32 accepts "4294967295"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint32=4294967295' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '4294967295' },
    })
  })

  // The int64 maximum, 2^63 - 1, kept to the last digit.
  // int64 の最大値(2^63 - 1)。最後の桁まで保持される。
  it('int64 accepts "9223372036854775807"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=9223372036854775807' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '9223372036854775807' },
    })
  })

  // The int64 minimum, -2^63.
  // int64 の最小値(-2^63)。
  it('int64 accepts "-9223372036854775808"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=-9223372036854775808' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '-9223372036854775808' },
    })
  })

  // Zero is a bigint too.
  // ゼロも bigint として届く。
  it('int64 accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 minimum.
  // uint64 の最小値。
  it('uint64 accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'uint64=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 maximum, 2^64 - 1.
  // uint64 の最大値(2^64 - 1)。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uint64=18446744073709551615' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // format: bigint has no upper bound.
  // format: bigint には上限がない。
  it('bigint accepts "99999999999999999999999999999"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'bigint=99999999999999999999999999999' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '99999999999999999999999999999' },
    })
  })

  // format: bigint has no lower bound.
  // format: bigint には下限がない。
  it('bigint accepts "-99999999999999999999999999999"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'bigint=-99999999999999999999999999999' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '-99999999999999999999999999999' },
    })
  })

  // Exponent notation that comes out whole is an integer: JSON Schema looks at the value, not at
  // how it is written.
  // 結果が整数になる指数表記は、整数である。
  // JSON Schema が見るのは値であり、表記ではない。
  it('int64 accepts "1e3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '1000' },
    })
  })

  // A number with no fraction is an integer, however it is written: JSON Schema counts 1.0 as
  // one.
  // 小数部を持たない数値は、表記にかかわらず整数である。
  // JSON Schema は 1.0 を整数として扱う。
  it('bigint accepts "1.0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'bigint=1.0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '1' },
    })
  })

  // Exponent notation that comes out whole is an integer: JSON Schema looks at the value, not at
  // how it is written.
  // 結果が整数になる指数表記は、整数である。
  // JSON Schema が見るのは値であり、表記ではない。
  it('bigint accepts "1e3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'bigint=1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '1000' },
    })
  })

  // A number with no fraction is an integer, however it is written: JSON Schema counts 1.0 as
  // one.
  // 小数部を持たない数値は、表記にかかわらず整数である。
  // JSON Schema は 1.0 を整数として扱う。
  it('integer accepts "1.0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=1.0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '1' },
    })
  })

  // Exponent notation that comes out whole is an integer: JSON Schema looks at the value, not at
  // how it is written.
  // 結果が整数になる指数表記は、整数である。
  // JSON Schema が見るのは値であり、表記ではない。
  it('integer accepts "1e3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '1000' },
    })
  })
})

// Notations of a number, and the edges of float32 and float64.
// 数値の各種表記と、float32・float64 の境界値。
describe('floats: accepted values', () => {
  // Zero.
  // ゼロ。
  it('number accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0' },
    })
  })

  // A negative fraction.
  // 負の小数。
  it('number accepts "-1.5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=-1.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '-1.5' },
    })
  })

  // Exponent notation.
  // 指数表記。
  it('number accepts "1e3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=1e3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '1000' },
    })
  })

  // A negative exponent.
  // 負の指数。
  it('number accepts "1e-3"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=1e-3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0.001' },
    })
  })

  // No digit before the decimal point.
  // 小数点の前の数字を省略した表記。
  it('number accepts ".5"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=.5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0.5' },
    })
  })

  // No digit after the decimal point.
  // 小数点の後の数字を省略した表記。
  it('number accepts "5."', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=5.' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '5' },
    })
  })

  // The largest finite float32.
  // float32 の最大有限値。
  it('float32 accepts "3.4028234e38"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float32=3.4028234e38' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '3.4028234e+38' },
    })
  })

  // The smallest finite float32.
  // float32 の最小有限値。
  it('float32 accepts "-3.4028234e38"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float32=-3.4028234e38' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '-3.4028234e+38' },
    })
  })

  // Too small for a float32 to represent: underflow is not a range error.
  // float32 では表現できないほど小さい値。アンダーフローは範囲エラーにならない。
  it('float32 accepts "1e-50"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float32=1e-50' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '1e-50' },
    })
  })

  // A value a float32 cannot hold exactly is not rounded.
  // float32 で正確に表現できない値でも、丸められずに届く。
  it('float32 accepts "0.1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'float32=0.1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '0.1' },
    })
  })

  // Number.MAX_VALUE, the largest finite double.
  // Number.MAX_VALUE。double の最大有限値。
  it('float64 accepts "1.7976931348623157e308"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'float64=1.7976931348623157e308' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64: { valueType: 'number', valueText: '1.7976931348623157e+308' },
    })
  })

  // The smallest finite double.
  // double の最小有限値。
  it('double accepts "-1.7976931348623157e308"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'double=-1.7976931348623157e308' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double: { valueType: 'number', valueText: '-1.7976931348623157e+308' },
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
  it('boolean accepts "true"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The literal false; a naive Boolean("false") would have been true.
  // リテラルの false。素朴な Boolean("false") では true になってしまう。
  it('boolean accepts "false"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=false' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // Upper case is read the same.
  // 大文字でも同じように読み取られる。
  it('boolean accepts "TRUE"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=TRUE' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // Mixed case is read the same.
  // 大文字小文字が混在していても同じように読み取られる。
  it('boolean accepts "False"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=False' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // The digit 1 means true.
  // 数字の 1 は true を意味する。
  it('boolean accepts "1"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The digit 0 means false.
  // 数字の 0 は false を意味する。
  it('boolean accepts "0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "yes" means true.
  // "yes" は true を意味する。
  it('boolean accepts "yes"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=yes' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "no" means false.
  // "no" は false を意味する。
  it('boolean accepts "no"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=no' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "on" means true.
  // "on" は true を意味する。
  it('boolean accepts "on"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=on' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "off" means false.
  // "off" は false を意味する。
  it('boolean accepts "off"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=off' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "y" means true.
  // "y" は true を意味する。
  it('boolean accepts "y"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=y' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "n" means false.
  // "n" は false を意味する。
  it('boolean accepts "n"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'boolean=n' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "enabled" means true.
  // "enabled" は true を意味する。
  it('boolean accepts "enabled"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'boolean=enabled' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "disabled" means false.
  // "disabled" は false を意味する。
  it('boolean accepts "disabled"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'boolean=disabled' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })
})

// The less obvious values each format takes, beyond the canonical one in section 1.
// セクション 1 の代表値以外に、各フォーマットが受理する分かりにくい値。
describe('formats: what each string format accepts', () => {
  // Upper case is valid, and is not lower-cased.
  // 大文字も有効であり、小文字化はされない。
  it('email accepts "USER@EXAMPLE.COM"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('USER@EXAMPLE.COM')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'USER@EXAMPLE.COM' },
    })
  })

  // A plus tag in the local part.
  // ローカル部にプラス記号のタグを含む。
  it('email accepts "user+tag@example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('user+tag@example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'user+tag@example.com' },
    })
  })

  // Dots in the local part and a multi-level domain.
  // ローカル部のドットと、多階層のドメイン。
  it('email accepts "first.last@sub.example.co.jp"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `email=${encodeURIComponent('first.last@sub.example.co.jp')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'first.last@sub.example.co.jp' },
    })
  })

  // Upper-case hexadecimal digits.
  // 大文字の16進数。
  it('uuid accepts "0190B1F4-0000-7000-8000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=0190B1F4-0000-7000-8000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '0190B1F4-0000-7000-8000-000000000000' },
    })
  })

  // The nil UUID, which carries no version.
  // バージョンを持たない nil UUID。
  it('uuid accepts "00000000-0000-0000-0000-000000000000"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=00000000-0000-0000-0000-000000000000' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '00000000-0000-0000-0000-000000000000' },
    })
  })

  // The max UUID, which carries no version.
  // バージョンを持たない max UUID。
  it('uuid accepts "ffffffff-ffff-ffff-ffff-ffffffffffff"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'uuid=ffffffff-ffff-ffff-ffff-ffffffffffff' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: 'ffffffff-ffff-ffff-ffff-ffffffffffff' },
    })
  })

  // A GUID checks the 8-4-4-4-12 layout only, not the version or variant.
  // GUID は 8-4-4-4-12 の形だけを検証し、バージョンやバリアントは見ない。
  it('guid accepts "a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'guid=a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid: { valueType: 'string', valueText: 'a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d' },
    })
  })

  // format: url takes any scheme, not only http.
  // format: url は http に限らず任意のスキームを受理する。
  it('url accepts "ftp://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('ftp://example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'ftp://example.com' },
    })
  })

  // A scheme with no authority.
  // オーソリティ部のないスキーム。
  it('url accepts "mailto:a@b.c"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('mailto:a@b.c')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'mailto:a@b.c' },
    })
  })

  // A port, a path, a query and a fragment.
  // ポート・パス・クエリ・フラグメントを含む。
  it('url accepts "http://localhost:3000/a?b=c#d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('http://localhost:3000/a?b=c#d')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'http://localhost:3000/a?b=c#d' },
    })
  })

  // A URN is a URI.
  // URN も URI である。
  it('uri accepts "urn:isbn:0451450523"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `uri=${encodeURIComponent('urn:isbn:0451450523')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri: { valueType: 'string', valueText: 'urn:isbn:0451450523' },
    })
  })

  // Plain http.
  // 暗号化なしの http。
  it('httpurl accepts "http://example.com"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('http://example.com')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'http://example.com' },
    })
  })

  // A path and a query.
  // パスとクエリを含む。
  it('httpurl accepts "https://example.com/a/b?c=d"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `httpurl=${encodeURIComponent('https://example.com/a/b?c=d')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'https://example.com/a/b?c=d' },
    })
  })

  // A single label.
  // 単一ラベルのホスト名。
  it('hostname accepts "localhost"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=localhost' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'localhost' },
    })
  })

  // One-character labels.
  // 1文字のラベル。
  it('hostname accepts "a.b.c"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hostname=a.b.c' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'a.b.c' },
    })
  })

  // An internationalised name in punycode.
  // Punycode で表記した国際化ドメイン名。
  it('hostname accepts "xn--r8jz45g.jp"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=xn--r8jz45g.jp' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'xn--r8jz45g.jp' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('hex accepts "DEADBEEF"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hex=DEADBEEF' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'DEADBEEF' },
    })
  })

  // An odd number of digits.
  // 桁数が奇数の16進数。
  it('hex accepts "abc"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'hex=abc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'abc' },
    })
  })

  // More than one emoji.
  // 複数の絵文字。
  it('emoji accepts "🔥🔥"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `emoji=${encodeURIComponent('🔥🔥')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '🔥🔥' },
    })
  })

  // A ZWJ sequence: one glyph, several code points.
  // ZWJ シーケンス。見た目は1文字だが、複数のコードポイントで構成される。
  it('emoji accepts "👨‍👩‍👧"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `emoji=${encodeURIComponent('👨‍👩‍👧')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '👨‍👩‍👧' },
    })
  })

  // "+" and "/" are what set base64 apart from base64url.
  // "+" と "/" は base64 と base64url を分ける文字である。
  it('base64 accepts "a+b/"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `base64=${encodeURIComponent('a+b/')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'a+b/' },
    })
  })

  // Two padding characters.
  // パディングが2文字。
  it('base64 accepts "YQ=="', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `base64=${encodeURIComponent('YQ==')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'YQ==' },
    })
  })

  // "-" and "_" are the base64url alphabet.
  // "-" と "_" は base64url の文字である。
  it('base64url accepts "a-b_"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'base64url=a-b_' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url: { valueType: 'string', valueText: 'a-b_' },
    })
  })

  // format: byte does not validate: text that is not base64 passes.
  // format: byte は検証を行わない。Base64 でない文字列も通る。
  it('byte accepts "!!!not-base64!!!"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'byte=!!!not-base64!!!' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte: { valueType: 'string', valueText: '!!!not-base64!!!' },
    })
  })

  // format: password does not validate: reserved characters pass.
  // format: password は検証を行わない。予約文字も通る。
  it('strpassword accepts "p@ss/w0rd?#"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `strpassword=${encodeURIComponent('p@ss/w0rd?#')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword: { valueType: 'string', valueText: 'p@ss/w0rd?#' },
    })
  })

  // A ULID is case-insensitive.
  // ULID は大文字小文字を区別しない。
  it('ulid accepts "01arz3ndektsv4rrffq69g5fav"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ulid=01arz3ndektsv4rrffq69g5fav' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid: { valueType: 'string', valueText: '01arz3ndektsv4rrffq69g5fav' },
    })
  })

  // Upper case is accepted.
  // 大文字も受理される。
  it('xid accepts "9M4E2MR0UI3E8A215N4G"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'xid=9M4E2MR0UI3E8A215N4G' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid: { valueType: 'string', valueText: '9M4E2MR0UI3E8A215N4G' },
    })
  })

  // The lowest address.
  // 最小のアドレス。
  it('ipv4 accepts "0.0.0.0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ipv4=0.0.0.0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '0.0.0.0' },
    })
  })

  // The highest address.
  // 最大のアドレス。
  it('ipv4 accepts "255.255.255.255"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'ipv4=255.255.255.255' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '255.255.255.255' },
    })
  })

  // The unspecified address.
  // 未指定アドレス。
  it('ipv6 accepts "::"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('::')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::' },
    })
  })

  // The loopback address.
  // ループバックアドレス。
  it('ipv6 accepts "::1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('::1')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::1' },
    })
  })

  // The full form, nothing compressed.
  // 省略のない完全表記。
  it('ipv6 accepts "2001:0db8:0000:0000:0000:0000:0000:0001"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('2001:0db8:0000:0000:0000:0000:0000:0001')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '2001:0db8:0000:0000:0000:0000:0000:0001' },
    })
  })

  // An IPv4-mapped address.
  // IPv4 射影アドレス。
  it('ipv6 accepts "::ffff:192.168.0.1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `ipv6=${encodeURIComponent('::ffff:192.168.0.1')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::ffff:192.168.0.1' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv4 accepts "0.0.0.0/0"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv4=${encodeURIComponent('0.0.0.0/0')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '0.0.0.0/0' },
    })
  })

  // The longest prefix, /32.
  // 最長のプレフィックス /32。
  it('cidrv4 accepts "10.0.0.1/32"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv4=${encodeURIComponent('10.0.0.1/32')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '10.0.0.1/32' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv6 accepts "::/0"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv6=${encodeURIComponent('::/0')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '::/0' },
    })
  })

  // The longest prefix, /128.
  // 最長のプレフィックス /128。
  it('cidrv6 accepts "2001:db8::/128"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `cidrv6=${encodeURIComponent('2001:db8::/128')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '2001:db8::/128' },
    })
  })

  // 29 February of a leap year.
  // うるう年の 2月29日。
  it('date accepts "2020-02-29"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=2020-02-29' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '2020-02-29' },
    })
  })

  // Year zero.
  // 西暦 0 年。
  it('date accepts "0000-01-01"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=0000-01-01' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '0000-01-01' },
    })
  })

  // The last four-digit date.
  // 4桁の年で表せる最後の日付。
  it('date accepts "9999-12-31"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'date=9999-12-31' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '9999-12-31' },
    })
  })

  // Midnight.
  // 午前 0 時。
  it('time accepts "00:00:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('00:00:00')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '00:00:00' },
    })
  })

  // The last second of the day.
  // 1日の最後の秒。
  it('time accepts "23:59:59"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('23:59:59')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '23:59:59' },
    })
  })

  // Seconds may be left out.
  // 秒は省略できる。
  it('time accepts "12:34"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('time accepts "12:34:56.789"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56.789')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56.789' },
    })
  })

  // A zone designator: `time` names an RFC 3339 full-time, which ends in one.
  // タイムゾーン指定子が付いている。`time` が指す RFC 3339 の full-time は、これで終わる。
  it('time accepts "12:34:56Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56Z')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56Z' },
    })
  })

  // An offset in place of the zone designator.
  // タイムゾーン指定子の代わりにオフセットが付いている。
  it('time accepts "12:34:56+09:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `time=${encodeURIComponent('12:34:56+09:00')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56+09:00' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('datetime accepts "2020-01-02T03:04:05.123Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02T03:04:05.123Z')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05.123Z' },
    })
  })

  // An offset instead of Z: RFC 3339, which `date-time` names, takes either.
  // Z ではなくオフセット。`date-time` が指す RFC 3339 はどちらも認める。
  it('datetime accepts "2020-01-02T03:04:05+09:00"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-01-02T03:04:05+09:00')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05+09:00' },
    })
  })

  // The last second of a leap day.
  // うるう日の最後の秒。
  it('datetime accepts "2020-02-29T23:59:59Z"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `datetime=${encodeURIComponent('2020-02-29T23:59:59Z')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-02-29T23:59:59Z' },
    })
  })

  // A date component alone.
  // 日付要素のみ。
  it('duration accepts "P1Y"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=P1Y' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1Y' },
    })
  })

  // A time component alone.
  // 時刻要素のみ。
  it('duration accepts "PT1S"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=PT1S' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'PT1S' },
    })
  })

  // Weeks.
  // 週。
  it('duration accepts "P1W"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'duration=P1W' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1W' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('duration accepts "PT0.5S"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'duration=PT0.5S' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'PT0.5S' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('mac accepts "00:1A:2B:3C:4D:5E"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `mac=${encodeURIComponent('00:1A:2B:3C:4D:5E')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1A:2B:3C:4D:5E' },
    })
  })

  // Hyphens between groups; the Luhn check runs on the digits.
  // グループ間のハイフン。Luhn チェックは数字部分に対して行われる。
  it('creditcard accepts "4111-1111-1111-1111"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'creditcard=4111-1111-1111-1111' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111-1111-1111-1111' },
    })
  })

  // Spaces between groups.
  // グループ間の空白。
  it('creditcard accepts "4111 1111 1111 1111"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `creditcard=${encodeURIComponent('4111 1111 1111 1111')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111 1111 1111 1111' },
    })
  })

  // A 15-digit number.
  // 15桁のカード番号。
  it('creditcard accepts "378282246310005"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'creditcard=378282246310005' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '378282246310005' },
    })
  })

  // Letters in the account part.
  // 口座部分に英字を含む。
  it('iban accepts "GB82WEST12345698765432"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'iban=GB82WEST12345698765432' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban: { valueType: 'string', valueText: 'GB82WEST12345698765432' },
    })
  })

  // Another ISO 4217 code.
  // 別の ISO 4217 コード。
  it('currencycode accepts "JPY"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=JPY' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'JPY' },
    })
  })

  // ISO 4217 reserves XXX for "no currency".
  // ISO 4217 は XXX を「通貨なし」として予約している。
  it('currencycode accepts "XXX"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'currencycode=XXX' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'XXX' },
    })
  })
})

// The same keywords as in a path or a query string, on the cookie branch of the generator.
// path や query と同じキーワードを、生成器の Cookie 用の分岐で検証する。
describe('literals, constraints and transforms', () => {
  // The first member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最初のメンバー。
  it('ienum accepts "1"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ienum=1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: { valueType: 'number', valueText: '1' },
    })
  })

  // The last member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最後のメンバー。
  it('ienum accepts "3"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ienum=3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: { valueType: 'number', valueText: '3' },
    })
  })

  // The only member of the boolean enum [true].
  // boolean の enum [true] の唯一のメンバー。
  it('benum accepts "true"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'benum=true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      benum: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The constant of const: 7.
  // const: 7 の定数値。
  it('iconst accepts "7"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'iconst=7' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iconst: { valueType: 'number', valueText: '7' },
    })
  })

  // A member of the string enum [asc, desc].
  // string の enum [asc, desc] のメンバー。
  it('senum accepts "asc"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'senum=asc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      senum: { valueType: 'string', valueText: 'asc' },
    })
  })

  // The other member of the string enum.
  // string の enum のもう一方のメンバー。
  it('senum accepts "desc"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'senum=desc' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      senum: { valueType: 'string', valueText: 'desc' },
    })
  })

  // oneOf an integer or "all": the integer branch coerces.
  // integer または "all" の oneOf。integer 側の分岐は coerce される。
  it('ioneof accepts "4"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ioneof=4' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ioneof: { valueType: 'number', valueText: '4' },
    })
  })

  // The string branch needs no coercion and arrives as a string.
  // string 側は coerce 不要で、string として届く。
  it('ioneof accepts "all"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ioneof=all' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ioneof: { valueType: 'string', valueText: 'all' },
    })
  })

  // The minimum of minimum: 1, maximum: 100 is inclusive.
  // minimum: 1, maximum: 100 の最小値は範囲に含まれる。
  it('range accepts "1"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'range=1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '1' },
    })
  })

  // Inside the range. Compared as text, "9" would sort after "100" and be refused.
  // 範囲内の値。文字列として比較すると "9" は "100" より後に並び、拒否されてしまう。
  it('range accepts "9"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'range=9' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '9' },
    })
  })

  // The maximum is inclusive.
  // 最大値は範囲に含まれる。
  it('range accepts "100"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'range=100' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '100' },
    })
  })

  // Exactly minLength: 2.
  // ちょうど minLength: 2 の長さ。
  it('length accepts "ab"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'length=ab' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: 'ab' },
    })
  })

  // Exactly maxLength: 4.
  // ちょうど maxLength: 4 の長さ。
  it('length accepts "abcd"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'length=abcd' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: 'abcd' },
    })
  })

  // Two emoji are two characters, though four UTF-16 code units: length counts characters.
  // 絵文字2つは2文字である(UTF-16 では 4 コードユニット)。長さは文字数で数える。
  it('length accepts "🔥🔥"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: `length=${encodeURIComponent('🔥🔥')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: '🔥🔥' },
    })
  })

  // Matches ^[a-z]+-\d{1,3}$ with one digit.
  // ^[a-z]+-\d{1,3}$ に数字1桁で一致する。
  it('pattern accepts "abc-1"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'pattern=abc-1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pattern: { valueType: 'string', valueText: 'abc-1' },
    })
  })

  // Matches with three digits, the most allowed.
  // 許容される最大の数字3桁で一致する。
  it('pattern accepts "abc-123"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'pattern=abc-123' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pattern: { valueType: 'string', valueText: 'abc-123' },
    })
  })

  // x-toLowerCase lower-cases the value.
  // x-toLowerCase は値を小文字化する。
  it('tx_lower turns "MiXeD" into "mixed"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'tx_lower=MiXeD' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_lower: { valueType: 'string', valueText: 'mixed' },
    })
  })

  // A transform paired with a format: the value is lower-cased, then checked as an email.
  // 変換とフォーマットの組み合わせ。小文字化した後、メールアドレスとして検証される。
  it('tx_email turns "USER@EXAMPLE.COM" into "user@example.com"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: `tx_email=${encodeURIComponent('USER@EXAMPLE.COM')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_email: { valueType: 'string', valueText: 'user@example.com' },
    })
  })
})

// /optional declares every cookie without required: true.
// /optional は、すべての Cookie を required: true なしで宣言している。
describe('optional: absent and present', () => {
  // An absent optional cookie is absent from the validated object: the key is not there at all,
  // which exactOptional guarantees and a value of undefined would not.
  // 省略された任意 Cookie は、検証済みオブジェクトにも存在しない。
  // キー自体が無いことは exactOptional が保証するもので、値が undefined の場合とは異なる。
  it('answers nothing when there is no Cookie header', async () => {
    const res = await cookieParamsApp.request('/optional')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An empty header holds no cookie.
  // 空のヘッダーには Cookie が1つも含まれない。
  it('answers nothing when the Cookie header is empty', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: '' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // "; ;" holds no pair.
  // "; ;" にはペアが1つも含まれない。
  it('answers nothing when the Cookie header holds separators only', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: '; ;' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An optional integer that is sent is coerced.
  // 送信された任意の integer は coerce される。
  it('int_opt accepts "5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'int_opt=5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '5' },
    })
  })

  // An optional int64 keeps its precision.
  // 任意の int64 も桁落ちしない。
  it('int64_opt accepts "9007199254740993"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int64_opt=9007199254740993' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_opt: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // An optional boolean sent as false arrives as false, not as absent.
  // false として送信された任意の boolean は、省略扱いではなく false として届く。
  it('bool_opt accepts "false"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'bool_opt=false' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bool_opt: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // An optional string.
  // 任意の string。
  it('str_opt accepts "s"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=s' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 's' },
    })
  })

  // Each cookie keeps its own value and type.
  // 各 Cookie が自身の値と型を保つ。
  it('accepts several cookies in one request', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=5; bool_opt=true; str_opt=s' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '5' },
      bool_opt: { valueType: 'boolean', valueText: 'true' },
      str_opt: { valueType: 'string', valueText: 's' },
    })
  })

  // An undeclared cookie is neither rejected nor passed on to the handler.
  // 宣言されていない Cookie は、拒否もされず、ハンドラにも渡されない。
  it('ignores a cookie the spec does not declare', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'unknown=1; session=abc' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// /defaults declares every cookie with a default.
// /defaults は、すべての Cookie をデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default is a typed value: default: 5 on an int64 arrives as the bigint 5n, not as the
  // number the YAML held.
  // デフォルトは型付きの値である。int64 の default: 5 は、
  // YAML 上の number ではなく bigint の 5n として届く。
  it('applies every default when nothing is sent', async () => {
    const res = await cookieParamsApp.request('/defaults')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'fallback' },
    })
  })

  // Only int_def changes; the other defaults still apply.
  // 変わるのは int_def だけで、他のデフォルトは引き続き適用される。
  it('lets a sent integer replace its default', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'int_def=1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '1' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'fallback' },
    })
  })

  // The sent value is coerced to a bigint like the default.
  // 送信された値は、デフォルトと同じく bigint に coerce される。
  it('lets a sent int64 replace its default', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'int64_def=8' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '8' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'fallback' },
    })
  })

  // bool_def defaults to false.
  // bool_def のデフォルトは false である。
  it('lets true replace a default of false', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'bool_def=true' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
    })
  })

  // A sent string replaces default: fallback.
  // 送信された string が default: fallback を置き換える。
  it('lets a sent string replace its default', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'str_def=d' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'd' },
    })
  })

  // Zero is a value, not an absence: the default must not win over it.
  // 0 は値であって欠落ではない。デフォルトがこれを上書きしてはならない。
  it('lets zero replace a default of 20', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'int_def=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '0' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'fallback' },
    })
  })
})

// /required declares id, big, flag and name with required: true, and note without.
// /required は id・big・flag・name を required: true で、
// note を required なしで宣言している。
describe('required', () => {
  // The optional note is left out and is absent from the answer.
  // 任意の note は省略しており、応答にも含まれない。
  it('accepts a request that carries every required cookie', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; big=9007199254740993; flag=true; name=n' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '9007199254740993' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: 'n' },
    })
  })

  // note is declared without required: true.
  // note は required: true なしで宣言されている。
  it('accepts the optional cookie beside the required ones', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; big=9007199254740993; flag=true; name=n; note=5' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '9007199254740993' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: 'n' },
      note: { valueType: 'number', valueText: '5' },
    })
  })
})

// `null` has no spelling of its own in a parameter, so the text `null` stands for it.
// パラメータには `null` 専用の表記がないため、テキスト `null` がその値を表す。
describe('null', () => {
  // The text "null" is the value null: the schema takes null and no string.
  // テキスト "null" は値 null である。スキーマは null を受理し、文字列を受理しない。
  it('inull accepts "null"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'inull=null' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull: { valueType: 'null', valueText: 'null' },
    })
  })
})

// The name has to survive from the spec to the validated object, character for character.
// 名前は、仕様から検証済みオブジェクトに至るまで、1文字も変わらず保たれなければならない。
describe('names', () => {
  // A name every object inherits, sent: it is read like any other parameter.
  // すべてのオブジェクトが継承する名前を送信する。他のパラメータと同じように読まれる。
  it('constructor accepts "5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'constructor=5' } })
    expect(res.status).toBe(200)
    // The body is compared as text: `toStrictEqual` compares the `constructor` of two
    // objects to tell their types apart, and here that is the key under test.
    // ボディは文字列として比較する。`toStrictEqual` は型を見分けるために2つのオブジェクトの
    // `constructor` を比較するが、ここではそれがテスト対象のキーそのものである。
    expect(await res.text()).toBe('{"constructor":{"valueType":"number","valueText":"5"}}')
  })

  // The same name, not sent: what the request object inherits under it is not a value, so
  // the optional parameter is absent.
  // 同じ名前を送信しない。リクエストオブジェクトがその名前で継承しているものは値ではない
  // ため、任意パラメータは存在しない扱いになる。
  it('constructor is absent when it is not sent', async () => {
    const res = await cookieParamsApp.request('/optional')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // A hyphen: not a JavaScript identifier, so the generated key has to be quoted.
  // ハイフンを含む名前。JavaScript の識別子ではないため、
  // 生成されるキーは引用符で囲む必要がある。
  it('session-id accepts "4"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'session-id=4' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'session-id': { valueType: 'number', valueText: '4' },
    })
  })

  // A dot.
  // ドットを含む名前。
  it('user.id accepts "5"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'user.id=5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'user.id': { valueType: 'number', valueText: '5' },
    })
  })

  // Unlike a header name, a cookie name is case-sensitive: the spec declares both, one an
  // integer and one a string.
  // ヘッダー名と違い、Cookie 名は大文字小文字を区別する。仕様は両方を宣言しており、
  // 一方は integer、もう一方は string である。
  it('treats int_opt and Int_Opt as two cookies', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'Int_Opt=a; int_opt=6' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '6' },
      Int_Opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // A name in a case the spec does not declare is an undeclared cookie.
  // 仕様で宣言されていない大文字小文字の名前は、未宣言の Cookie である。
  it('ignores INT_OPT, which is neither', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'INT_OPT=5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// The Cookie header is sent exactly as written in each test, because the wire format itself
// is the subject.
// ワイヤ形式そのものが検証対象のため、各テストでは Cookie ヘッダーを書かれたとおりに
// 送信する。
describe('wire: the Cookie header', () => {
  // An encoded space.
  // エンコードされた空白。
  it('decodes str_opt=a%20b to "a b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a%20b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a b' },
    })
  })

  // An encoded semicolon is part of the value, not a separator.
  // エンコードされたセミコロンは値の一部であり、区切り文字ではない。
  it('decodes str_opt=a%3Bb to "a;b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a%3Bb' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a;b' },
    })
  })

  // An encoded comma.
  // エンコードされたカンマ。
  it('decodes str_opt=a%2Cb to "a,b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a%2Cb' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a,b' },
    })
  })

  // An encoded equals sign.
  // エンコードされた等号。
  it('decodes str_opt=a%3Db to "a=b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a%3Db' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a=b' },
    })
  })

  // An encoded plus sign.
  // エンコードされたプラス記号。
  it('decodes str_opt=a%2Bb to "a+b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a%2Bb' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a+b' },
    })
  })

  // Unlike in a query string, a plus sign is a plus sign.
  // クエリ文字列と違い、プラス記号はプラス記号のまま届く。
  it('decodes str_opt=a+b to "a+b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a+b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a+b' },
    })
  })

  // A three-byte UTF-8 sequence.
  // 3バイトの UTF-8 シーケンス。
  it('decodes str_opt=%E3%81%82 to "あ"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'str_opt=%E3%81%82' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'あ' },
    })
  })

  // A four-byte UTF-8 sequence.
  // 4バイトの UTF-8 シーケンス。
  it('decodes str_opt=%F0%9F%94%A5 to "🔥"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'str_opt=%F0%9F%94%A5' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '🔥' },
    })
  })

  // Lower-case hexadecimal digits decode the same.
  // 16進数が小文字でも同じようにデコードされる。
  it('decodes str_opt=%e3%81%82 to "あ"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'str_opt=%e3%81%82' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'あ' },
    })
  })

  // The value is decoded once: %2520 is the encoding of "%20", not of a space.
  // デコードは1回だけ行われる。%2520 は "%20" のエンコードであり、空白のエンコードではない。
  it('decodes str_opt=%2520 to "%20"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=%2520' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '%20' },
    })
  })

  // Only the first "=" separates the name from the value.
  // 名前と値を区切るのは最初の "=" だけである。
  it('decodes str_opt=a=b to "a=b"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a=b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a=b' },
    })
  })

  // Base64 padding survives for the same reason.
  // Base64 のパディングも、同じ理由でそのまま届く。
  it('decodes str_opt=YQ== to "YQ=="', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=YQ==' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'YQ==' },
    })
  })

  // Double quotes around a value are part of the cookie syntax, not of the value.
  // 値を囲む二重引用符は Cookie の構文の一部であり、値には含まれない。
  it('decodes str_opt="quoted" to "quoted"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'str_opt="quoted"' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'quoted' },
    })
  })

  // A colon, a slash and a question mark need no encoding.
  // コロン・スラッシュ・疑問符は、エンコード不要である。
  it('decodes str_opt=a:b/c?d to "a:b/c?d"', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'str_opt=a:b/c?d' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a:b/c?d' },
    })
  })

  // An escape that is not hexadecimal is delivered as it was sent.
  // 16進数でないエスケープは、送信時のまま届く。
  it('decodes str_opt=%ZZ to "%ZZ"', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=%ZZ' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '%ZZ' },
    })
  })

  // An empty value is the empty string, not an absent cookie.
  // 空の値は空文字列であり、Cookie の省略ではない。
  it('decodes str_opt= to ""', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '' },
    })
  })

  // %35 is "5": decoding happens before coercion.
  // %35 は "5" を表す。デコードは coerce より前に行われる。
  it('coerces percent-encoded digits like plain ones', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'int_opt=%35' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '5' },
    })
  })

  // The quotes are removed before coercion.
  // 引用符は coerce の前に取り除かれる。
  it('coerces a quoted number', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'int_opt="42"' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '42' },
    })
  })

  // The MAC format sees the decoded colons.
  // MAC フォーマットの検証は、デコード後のコロンに対して行われる。
  it('validates the decoded value', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'mac=00%3A1a%3A2b%3A3c%3A4d%3A5e' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
    })
  })

  // A colon is not a separator of the Cookie header, so a MAC address can be sent as it is.
  // コロンは Cookie ヘッダーの区切り文字ではないため、MAC アドレスはそのまま送信できる。
  it('reads a colon-separated value unencoded', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'mac=00:1a:2b:3c:4d:5e' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
    })
  })

  // An unencoded ";" ends the value: "b" is another pair, with no "=" and so no cookie.
  // エンコードされていない ";" は値の終端となる。"b" は別のペアだが、
  // "=" がないため Cookie にはならない。
  it('ends a value at an unencoded semicolon', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'str_opt=a;b' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // The standard separator.
  // 標準の区切り。
  it('separates pairs by a semicolon and a space', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1; str_opt=a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // The space is optional.
  // 空白は省略できる。
  it('separates pairs by a semicolon with no space', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1;str_opt=a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // Extra spaces are skipped.
  // 余分な空白は無視される。
  it('separates pairs by a semicolon with extra spaces', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1;   str_opt=a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // An empty pair at the end is skipped.
  // 末尾の空のペアは無視される。
  it('separates pairs by a trailing semicolon', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1; str_opt=a;' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // An empty pair at the start is skipped.
  // 先頭の空のペアは無視される。
  it('separates pairs by a leading semicolon', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: '; int_opt=1; str_opt=a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // A name sent twice keeps its first value; the second does not replace it.
  // 同じ名前が2回送られた場合、最初の値が採用される。2つ目が上書きすることはない。
  it('keeps the first of a name sent twice', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1; int_opt=2' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
    })
  })

  // The invalid second value is never read, so it cannot fail the request.
  // 不正な2つ目の値は読み取られないため、リクエストを失敗させることもない。
  it('does not validate the second of a name sent twice', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1; int_opt=x' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
    })
  })

  // Two Cookie headers reach the server joined, and both cookies are read.
  // 2つの Cookie ヘッダーは連結されてサーバーに届き、両方の Cookie が読み取られる。
  it('reads two Cookie headers as one', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: [
        ['Cookie', 'int_opt=1'],
        ['Cookie', 'str_opt=a'],
      ],
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // A query parameter, a header and a Set-Cookie header of the same name are not the cookie.
  // 同名のクエリパラメータ・ヘッダー・Set-Cookie ヘッダーは、いずれも Cookie ではない。
  it('does not read a cookie from anywhere but the Cookie header', async () => {
    const res = await cookieParamsApp.request('/optional?int_opt=1', {
      headers: { int_opt: '2', 'Set-Cookie': 'int_opt=3' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // Hono answers HEAD through the GET route, so the cookie is validated the same way: a valid
  // one is accepted.
  // Hono は HEAD を GET のルートで処理するため、Cookieは同じように検証される。
  // 有効な値は受理される。
  it('validates a HEAD request like the GET it mirrors', async () => {
    const res = await cookieParamsApp.request('/optional', {
      method: 'HEAD',
      headers: { Cookie: 'int_opt=1' },
    })
    expect(res.status).toBe(200)
  })

  // One request must not change the next: no state is kept between validations.
  // あるリクエストが次のリクエストに影響しないこと。検証間で状態は保持されない。
  it('gives the same answer to the same request, whatever came between', async () => {
    const first = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=9007199254740993' },
    })
    const between = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=not-a-value' },
    })
    expect(between.status).toBe(422)
    const second = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'int64=9007199254740993' },
    })
    expect(second.status).toBe(200)
    expect(await second.json()).toStrictEqual(await first.json())
  })
})

// ids is an array of integers.
// ids は integer の配列である。
describe('arrays', () => {
  // A cookie name appears once, so an array cookie always arrives as a single value: the arity
  // the generated array schema has to accept.
  // Cookie 名は1度しか現れないため、配列の Cookie は常に単一値として届く。
  // 生成された配列スキーマは、この形を受理できなければならない。
  it('reads a single value as a one-element array', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=7' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [{ valueType: 'number', valueText: '7' }],
    })
  })

  // Repeating the name does not build an array: the first value is the only one read.
  // 名前を繰り返しても配列にはならない。読み取られるのは最初の値だけである。
  it('reads only the first of a repeated name', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=7; ids=8' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [{ valueType: 'number', valueText: '7' }],
    })
  })

  // A cookie name appears once, so several values travel as one cookie holding them
  // comma-separated. The comma is percent-encoded here, as a cookie value requires.
  // Cookie 名は1度しか現れないため、複数の値は1つの Cookie にカンマ区切りで並べて運ばれる。
  // ここでは、Cookie 値の規則に従ってカンマをパーセントエンコードしている。
  it('splits an encoded comma-separated value', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1%2C2%2C3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // The same with the commas sent as they are.
  // カンマをそのまま送信した場合も同様である。
  it('splits an unencoded comma-separated value', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'ids=1,2,3' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ids: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })
})

// An object explodes by default: prefs is theme: string, size: integer, and each property is a
// cookie of its own. With explode: false one cookie holds names and values: obj is a: integer, b:
// string.
// オブジェクトは、デフォルトで explode される。prefs は theme: string, size: integer であり、
// 各プロパティが独立した Cookie になる。explode: false では、1つの Cookie が名前と値を保持する。
// obj は a: integer, b: string である。
describe('objects: an object in cookies', () => {
  // theme and size are cookies of their own, gathered into prefs.
  // theme と size は独立した Cookie であり、prefs にまとめられる。
  it('prefs gathers the cookies that are its properties', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'theme=dark; size=5' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      prefs: {
        theme: { valueType: 'string', valueText: 'dark' },
        size: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // One property is enough for the object to be there.
  // プロパティが1つあれば、オブジェクトは存在することになる。
  it('prefs gathers a single property', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'size=5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      prefs: {
        size: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // int_opt is a cookie of its own and theme a property of prefs.
  // int_opt は独立した Cookie であり、theme は prefs のプロパティである。
  it('prefs arrives beside a cookie of its own', async () => {
    const res = await cookieParamsApp.request('/optional', {
      headers: { Cookie: 'int_opt=1; theme=dark' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      prefs: {
        theme: { valueType: 'string', valueText: 'dark' },
      },
    })
  })

  // { a: 1, b: "x" } is sent as one cookie, a,1,b,x.
  // { a: 1, b: "x" } は、1つの Cookie a,1,b,x として送信される。
  it('obj reads alternating names and values', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'obj=a,1,b,x' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      obj: {
        a: { valueType: 'number', valueText: '1' },
        b: { valueType: 'string', valueText: 'x' },
      },
    })
  })

  // The comma is percent-encoded, as a cookie value requires.
  // Cookie 値の規則に従って、カンマをパーセントエンコードしている。
  it('obj reads percent-encoded commas', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'obj=a%2C1' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      obj: {
        a: { valueType: 'number', valueText: '1' },
      },
    })
  })
})

// A component schema is generated for a typed value: Count is z.int().min(0), which the text of a
// cookie does not satisfy. A cookie that names one reads the text first and hands the component
// the value.
// コンポーネントスキーマは、型付きの値を前提に生成される。Count は z.int().min(0) であり、
// Cookieの文字列はこれを満たさない。コンポーネントを参照するCookieは、先に文字列を読み取り、
// その値をコンポーネントに渡す。
describe('references: a schema behind $ref', () => {
  // Count is an integer with minimum: 0.
  // Count は minimum: 0 の integer である。
  it('ref_int coerces an integer component', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ref_int=5' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_int: { valueType: 'number', valueText: '5' },
    })
  })

  // Zero is the minimum of Count: the constraint of the component applies to the value that was
  // read.
  // 0 は Count の最小値である。コンポーネントの制約は、読み取った値に適用される。
  it('ref_int accepts the minimum of the component', async () => {
    const res = await cookieParamsApp.request('/optional', { headers: { Cookie: 'ref_int=0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_int: { valueType: 'number', valueText: '0' },
    })
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
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '0' },
    })
  })

  // Leading zeros are dropped; the value is not read as octal.
  // 先頭のゼロは無視される。8進数としては読まれない。
  it('integer accepts "007"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'integer=007' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '7' },
    })
  })

  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('int64 accepts "-0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // Leading zeros are dropped.
  // 先頭のゼロは無視される。
  it('int64 accepts "007"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'int64=007' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '7' },
    })
  })

  // Negative zero is echoed as zero.
  // 負のゼロはゼロとして返る。
  it('number accepts "-0"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'number=-0' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0' },
    })
  })

  // cuid2 is a pattern with no fixed length: one letter passes.
  // cuid2 は長さ固定のないパターンであり、1文字でも通る。
  it('cuid2 accepts "a"', async () => {
    const res = await cookieParamsApp.request('/cookies', { headers: { Cookie: 'cuid2=a' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: 'a' },
    })
  })

  // cuid2 does not require a leading letter.
  // cuid2 は先頭が英字であることを要求しない。
  it('cuid2 accepts "1z4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'cuid2=1z4a98xxat96iws9zmbrgj3a' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: '1z4a98xxat96iws9zmbrgj3a' },
    })
  })

  // format: url takes the javascript: scheme; narrowing is the caller's to do.
  // format: url は javascript: スキームも受理する。絞り込みは利用側の責務である。
  it('url accepts "javascript:alert(1)"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: `url=${encodeURIComponent('javascript:alert(1)')}` },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'javascript:alert(1)' },
    })
  })

  // A trailing dot satisfies the hostname grammar.
  // 末尾のドットはホスト名の文法を満たす。
  it('hostname accepts "example.com."', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=example.com.' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'example.com.' },
    })
  })

  // A dotted quad satisfies the hostname grammar.
  // ドット区切りの4数値はホスト名の文法を満たす。
  it('hostname accepts "192.168.0.1"', async () => {
    const res = await cookieParamsApp.request('/cookies', {
      headers: { Cookie: 'hostname=192.168.0.1' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An empty string is a string: the default gives way to it.
  // 空文字列も文字列である。デフォルトより優先される。
  it('reads an empty string over its default', async () => {
    const res = await cookieParamsApp.request('/defaults', { headers: { Cookie: 'str_def=' } })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: '' },
    })
  })

  // An empty name satisfies required: true.
  // 空の name でも、required: true を満たす。
  it('reads an empty required string as present', async () => {
    const res = await cookieParamsApp.request('/required', {
      headers: { Cookie: 'id=1; big=1; flag=true; name=' },
    })
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '1' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: '' },
    })
  })
})
