// Every parameter shape the generator supports, sent as a real query string and checked
// for the JavaScript type and value it arrives as. HTTP carries all of them as strings, so
// a schema that forgets to coerce rejects its own input: the failure this file exists to
// catch.
//
// 生成器が対応するすべてのパラメータ形状を、実際のクエリ文字列として送信し、届いた時点の
// JavaScript の型と値を検証する。HTTP はすべてを文字列で運ぶため、coerce を忘れたスキーマは
// 自身の入力を拒否してしまう。このファイルは、その種の不具合を検出するためにある。
//
// How to read a test / テストの読み方:
//   Every route answers the parameters its handler received, by name, each described as
//   `{ valueType, valueText }`: the runtime `typeof` and the value as text. A parameter
//   that was not sent and has no default is absent from the answer. A rejected request
//   answers 422 with `{ issues: [...] }`: the path of every issue, which for an array
//   element is `<name>.<index>`.
//   すべてのルートは、ハンドラが受け取ったパラメータを名前ごとに返す。各値は
//   `{ valueType, valueText }`(実行時の `typeof` と値の文字列表現)で表される。送信されず
//   デフォルトもないパラメータは、応答に含まれない。拒否されたリクエストは 422 と
//   `{ issues: [...] }` を返す。issue のパスは、配列要素の場合 `<名前>.<インデックス>` になる。
//
// Routes / ルート:
//   /params    every shape, scalar (`<shape>`) and array (`<shape>_arr`), all optional
//              全形状のスカラー(`<shape>`)と配列(`<shape>_arr`)。すべて任意
//   /literals  enum, const, oneOf, nullable / enum・const・oneOf・nullable
//   /optional  optional parameters and odd names / 任意パラメータと特殊な名前
//   /defaults  parameters with a default / デフォルト値を持つパラメータ
//   /required  required parameters / 必須パラメータ
//   /limits    constraints / 制約
//   /styles    serialisation styles / シリアライズ形式
//   /objects   parameters that are an object / オブジェクトであるパラメータ
//   /absent    allowEmptyValue, a default beside a reference
//              allowEmptyValue と、参照と並ぶデフォルト値
//   /refs      a schema behind $ref / $ref の先にあるスキーマ
//   /combinators  allOf, oneOf, anyOf, not, mixed enum, tuple
//              allOf・oneOf・anyOf・not・型混在の enum・タプル
//   /content   a JSON document / JSON 文書
//
// This file holds the requests that are accepted. Each answers 200, and the test asserts the
// type and the value that reached the handler.
// このファイルには、受理されるリクエストをまとめている。いずれも 200 を返し、
// テストではハンドラに届いた型と値を検証する。
//
// Contents / 目次:
//   - shapes: every supported shape accepts its own value
//   - shapes: every shape as an array of two values
//   - shapes: every shape as an array of one value
//   - integers: accepted boundaries
//   - floats: accepted values
//   - booleans: accepted spellings
//   - formats: what each string format accepts
//   - array elements: accepted boundaries
//   - arrays
//   - transforms: x-* extensions
//   - literals: enum, const and oneOf
//   - optional: absent and present
//   - defaults
//   - required
//   - names: parameter names that are not identifiers
//   - constraints
//   - wire: encoding, separators and repetition
//   - absent: an empty value that stands for none, and a default beside a reference
//   - objects: a parameter spread over the query
//   - styles: serialisations other than form + explode
//   - references: a schema behind $ref
//   - combinators: the text is read once
//   - content: a JSON document
//   - leniency: what is read beyond the plainest spelling (pinned, not endorsed)
import { describe, expect, it } from 'vite-plus/test'

import { queryParamsApp } from './app'

// One canonical value per shape, sent alone as ?<shape>=<value>. The value is compared as
// well as the type: a coercion that changes the value is as wrong as one that changes the
// type.
// 形状ごとの代表値を、?<shape>=<value> として単独で送信する。型だけでなく値も比較する。
// 値を変えてしまう変換は、型を誤る変換と同じく不具合である。
describe('shapes: every supported shape accepts its own value', () => {
  // An integer with no format arrives as a number.
  // フォーマット指定のない integer は number として届く。
  it('integer accepts "42"', async () => {
    const res = await queryParamsApp.request('/params?integer=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '42' },
    })
  })

  // An int32 arrives as a number.
  // int32 は number として届く。
  it('int32 accepts "42"', async () => {
    const res = await queryParamsApp.request('/params?int32=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '42' },
    })
  })

  // An int64 arrives as a bigint, exact past Number.MAX_SAFE_INTEGER.
  // int64 は bigint として届き、Number.MAX_SAFE_INTEGER を超えても桁落ちしない。
  it('int64 accepts "9007199254740993"', async () => {
    const res = await queryParamsApp.request('/params?int64=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // format: bigint arrives as a bigint.
  // format: bigint は bigint として届く。
  it('bigint accepts "9007199254740993"', async () => {
    const res = await queryParamsApp.request('/params?bigint=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // A uint32 arrives as a number, up to its maximum.
  // uint32 は最大値まで number として届く。
  it('uint32 accepts "4294967295"', async () => {
    const res = await queryParamsApp.request('/params?uint32=4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '4294967295' },
    })
  })

  // A uint64 arrives as a bigint, up to its maximum, which no double can hold.
  // uint64 は最大値まで bigint として届く。この最大値は double では保持できない。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await queryParamsApp.request('/params?uint64=18446744073709551615')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // A number with no format arrives as a number.
  // フォーマット指定のない number は number として届く。
  it('number accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?number=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float arrives as a number.
  // format: float は number として届く。
  it('float accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?float=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float32 arrives as a number.
  // format: float32 は number として届く。
  it('float32 accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?float32=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: float64 arrives as a number.
  // format: float64 は number として届く。
  it('float64 accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?float64=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: double arrives as a number.
  // format: double は number として届く。
  it('double accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?double=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double: { valueType: 'number', valueText: '1.5' },
    })
  })

  // format: password on a number is an annotation; the value is still a number.
  // number に対する format: password は注釈にすぎず、値は number のまま届く。
  it('numpassword accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/params?numpassword=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numpassword: { valueType: 'number', valueText: '1.5' },
    })
  })

  // A boolean arrives as a boolean, not as the text "true".
  // boolean は文字列 "true" ではなく boolean として届く。
  it('boolean accepts "true"', async () => {
    const res = await queryParamsApp.request('/params?boolean=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // A string arrives unchanged.
  // string はそのまま届く。
  it('string accepts "plain"', async () => {
    const res = await queryParamsApp.request('/params?string=plain')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      string: { valueType: 'string', valueText: 'plain' },
    })
  })

  // A well-formed email address.
  // 正しい形式のメールアドレス。
  it('email accepts "user@example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('user@example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'user@example.com' },
    })
  })

  // A UUID of any version (here version 7).
  // 任意バージョンの UUID(ここではバージョン 7)。
  it('uuid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuid=0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // A version 4 UUID.
  // バージョン 4 の UUID。
  it('uuidv4 accepts "a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d"', async () => {
    const res = await queryParamsApp.request('/params?uuidv4=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv4: { valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
    })
  })

  // A version 7 UUID.
  // バージョン 7 の UUID。
  it('uuidv7 accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuidv7=0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv7: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // An absolute URL.
  // 絶対 URL。
  it('url accepts "https://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?url=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // format: uri is validated like a URL.
  // format: uri は URL と同じ検証を受ける。
  it('uri accepts "https://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?uri=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // An https URL.
  // https の URL。
  it('httpurl accepts "https://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'https://example.com' },
    })
  })

  // A host name.
  // ホスト名。
  it('hostname accepts "example.com"', async () => {
    const res = await queryParamsApp.request('/params?hostname=example.com')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'example.com' },
    })
  })

  // Hexadecimal digits.
  // 16進数の文字列。
  it('hex accepts "deadbeef"', async () => {
    const res = await queryParamsApp.request('/params?hex=deadbeef')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'deadbeef' },
    })
  })

  // A single emoji.
  // 絵文字1文字。
  it('emoji accepts "🔥"', async () => {
    const res = await queryParamsApp.request(`/params?emoji=${encodeURIComponent('🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '🔥' },
    })
  })

  // Base64 with padding.
  // パディング付きの Base64。
  it('base64 accepts "aGVsbG8="', async () => {
    const res = await queryParamsApp.request(`/params?base64=${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // Base64url, which has no padding.
  // パディングのない Base64url。
  it('base64url accepts "aGVsbG8"', async () => {
    const res = await queryParamsApp.request('/params?base64url=aGVsbG8')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url: { valueType: 'string', valueText: 'aGVsbG8' },
    })
  })

  // A 21-character Nano ID.
  // 21文字の Nano ID。
  it('nanoid accepts "V1StGXR8_Z5jdHi6B-myT"', async () => {
    const res = await queryParamsApp.request('/params?nanoid=V1StGXR8_Z5jdHi6B-myT')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nanoid: { valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' },
    })
  })

  // A CUID2.
  // CUID2。
  it('cuid2 accepts "tz4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await queryParamsApp.request('/params?cuid2=tz4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' },
    })
  })

  // A 26-character ULID.
  // 26文字の ULID。
  it('ulid accepts "01ARZ3NDEKTSV4RRFFQ69G5FAV"', async () => {
    const res = await queryParamsApp.request('/params?ulid=01ARZ3NDEKTSV4RRFFQ69G5FAV')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid: { valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
    })
  })

  // An IPv4 address.
  // IPv4 アドレス。
  it('ipv4 accepts "192.168.0.1"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An IPv6 address in compressed form.
  // 省略表記の IPv6 アドレス。
  it('ipv6 accepts "2001:db8::1"', async () => {
    const res = await queryParamsApp.request(`/params?ipv6=${encodeURIComponent('2001:db8::1')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '2001:db8::1' },
    })
  })

  // An IPv4 CIDR block.
  // IPv4 の CIDR ブロック。
  it('cidrv4 accepts "192.168.0.0/24"', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv4=${encodeURIComponent('192.168.0.0/24')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '192.168.0.0/24' },
    })
  })

  // An IPv6 CIDR block.
  // IPv6 の CIDR ブロック。
  it('cidrv6 accepts "2001:db8::/32"', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6=${encodeURIComponent('2001:db8::/32')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '2001:db8::/32' },
    })
  })

  // An ISO 8601 date; it stays a string, it is not turned into a Date.
  // ISO 8601 の日付。Date には変換されず、文字列のまま届く。
  it('date accepts "2020-01-02"', async () => {
    const res = await queryParamsApp.request('/params?date=2020-01-02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '2020-01-02' },
    })
  })

  // An ISO 8601 time.
  // ISO 8601 の時刻。
  it('time accepts "12:34:56"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // An ISO 8601 date-time in UTC; it stays a string.
  // UTC の ISO 8601 日時。文字列のまま届く。
  it('datetime accepts "2020-01-02T03:04:05Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02T03:04:05Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
    })
  })

  // An ISO 8601 duration with every component.
  // すべての要素を含む ISO 8601 の期間。
  it('duration accepts "P1Y2M3DT4H5M6S"', async () => {
    const res = await queryParamsApp.request('/params?duration=P1Y2M3DT4H5M6S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' },
    })
  })

  // format: byte is an annotation; the text is passed through.
  // format: byte は注釈にすぎず、文字列はそのまま渡される。
  it('byte accepts "aGVsbG8="', async () => {
    const res = await queryParamsApp.request(`/params?byte=${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte: { valueType: 'string', valueText: 'aGVsbG8=' },
    })
  })

  // format: password is an annotation; the text is passed through.
  // format: password は注釈にすぎず、文字列はそのまま渡される。
  it('strpassword accepts "hunter2"', async () => {
    const res = await queryParamsApp.request('/params?strpassword=hunter2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword: { valueType: 'string', valueText: 'hunter2' },
    })
  })

  // A MAC address with colon separators.
  // コロン区切りの MAC アドレス。
  it('mac accepts "00:1a:2b:3c:4d:5e"', async () => {
    const res = await queryParamsApp.request(
      `/params?mac=${encodeURIComponent('00:1a:2b:3c:4d:5e')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
    })
  })

  // An E.164 phone number.
  // E.164 形式の電話番号。
  it('e164 accepts "+14155552671"', async () => {
    const res = await queryParamsApp.request(`/params?e164=${encodeURIComponent('+14155552671')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      e164: { valueType: 'string', valueText: '+14155552671' },
    })
  })

  // A card number that passes the Luhn check.
  // Luhn チェックを通過するカード番号。
  it('creditcard accepts "4111111111111111"', async () => {
    const res = await queryParamsApp.request('/params?creditcard=4111111111111111')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111111111111111' },
    })
  })

  // An IBAN with a valid checksum.
  // チェックサムが正しい IBAN。
  it('iban accepts "DE89370400440532013000"', async () => {
    const res = await queryParamsApp.request('/params?iban=DE89370400440532013000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban: { valueType: 'string', valueText: 'DE89370400440532013000' },
    })
  })

  // An ISO 4217 currency code.
  // ISO 4217 の通貨コード。
  it('currencycode accepts "USD"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=USD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'USD' },
    })
  })

  // A 27-character KSUID.
  // 27文字の KSUID。
  it('ksuid accepts "0ujsszwN8NRY24YaXiTIE2VWDTS"', async () => {
    const res = await queryParamsApp.request('/params?ksuid=0ujsszwN8NRY24YaXiTIE2VWDTS')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ksuid: { valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' },
    })
  })

  // A 20-character XID.
  // 20文字の XID。
  it('xid accepts "9m4e2mr0ui3e8a215n4g"', async () => {
    const res = await queryParamsApp.request('/params?xid=9m4e2mr0ui3e8a215n4g')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid: { valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' },
    })
  })

  // A GUID.
  // GUID。
  it('guid accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?guid=0190b1f4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // format: trim leaves a value with no surrounding whitespace unchanged.
  // format: trim は、前後に空白のない値をそのまま通す。
  it('trim accepts "spaced"', async () => {
    const res = await queryParamsApp.request('/params?trim=spaced')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trim: { valueType: 'string', valueText: 'spaced' },
    })
  })
})

// The parameter is repeated, ?<shape>_arr=<value>&<shape>_arr=<value>, which is how an
// exploded array is serialised. Every element must be coerced, not just the first.
// パラメータを ?<shape>_arr=<value>&<shape>_arr=<value> のように繰り返して送信する。
// これは explode された配列のシリアライズ形式である。先頭だけでなく、
// すべての要素が coerce されなければならない。
describe('shapes: every shape as an array of two values', () => {
  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('integer_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '42' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('int32_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '42' },
      ],
    })
  })

  // Both elements arrive as bigint.
  // 2つの要素がどちらも bigint として届く。
  it('int64_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=9007199254740993',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '9007199254740993' },
      ],
    })
  })

  // Both elements arrive as bigint.
  // 2つの要素がどちらも bigint として届く。
  it('bigint_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?bigint_arr=9007199254740993&bigint_arr=9007199254740993',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '9007199254740993' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('uint32_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32_arr: [
        { valueType: 'number', valueText: '4294967295' },
        { valueType: 'number', valueText: '4294967295' },
      ],
    })
  })

  // Both elements arrive as bigint.
  // 2つの要素がどちらも bigint として届く。
  it('uint64_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=18446744073709551615',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64_arr: [
        { valueType: 'bigint', valueText: '18446744073709551615' },
        { valueType: 'bigint', valueText: '18446744073709551615' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('number_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('float_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?float_arr=1.5&float_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('float32_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('float64_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?float64_arr=1.5&float64_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('double_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?double_arr=1.5&double_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as number.
  // 2つの要素がどちらも number として届く。
  it('numpassword_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?numpassword_arr=1.5&numpassword_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numpassword_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.5' },
      ],
    })
  })

  // Both elements arrive as boolean.
  // 2つの要素がどちらも boolean として届く。
  it('boolean_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('string_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?string_arr=plain&string_arr=plain')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      string_arr: [
        { valueType: 'string', valueText: 'plain' },
        { valueType: 'string', valueText: 'plain' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('email_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?email_arr=${encodeURIComponent('user@example.com')}&email_arr=${encodeURIComponent('user@example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email_arr: [
        { valueType: 'string', valueText: 'user@example.com' },
        { valueType: 'string', valueText: 'user@example.com' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('uuid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?uuid_arr=0190b1f4-0000-7000-8000-000000000000&uuid_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid_arr: [
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('uuidv4_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv4_arr=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d&uuidv4_arr=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv4_arr: [
        { valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
        { valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('uuidv7_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv7_arr=0190b1f4-0000-7000-8000-000000000000&uuidv7_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv7_arr: [
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('url_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?url_arr=${encodeURIComponent('https://example.com')}&url_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url_arr: [
        { valueType: 'string', valueText: 'https://example.com' },
        { valueType: 'string', valueText: 'https://example.com' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('uri_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?uri_arr=${encodeURIComponent('https://example.com')}&uri_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri_arr: [
        { valueType: 'string', valueText: 'https://example.com' },
        { valueType: 'string', valueText: 'https://example.com' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('httpurl_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl_arr=${encodeURIComponent('https://example.com')}&httpurl_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl_arr: [
        { valueType: 'string', valueText: 'https://example.com' },
        { valueType: 'string', valueText: 'https://example.com' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('hostname_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?hostname_arr=example.com&hostname_arr=example.com',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname_arr: [
        { valueType: 'string', valueText: 'example.com' },
        { valueType: 'string', valueText: 'example.com' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('hex_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?hex_arr=deadbeef&hex_arr=deadbeef')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex_arr: [
        { valueType: 'string', valueText: 'deadbeef' },
        { valueType: 'string', valueText: 'deadbeef' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('emoji_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?emoji_arr=${encodeURIComponent('🔥')}&emoji_arr=${encodeURIComponent('🔥')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji_arr: [
        { valueType: 'string', valueText: '🔥' },
        { valueType: 'string', valueText: '🔥' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('base64_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?base64_arr=${encodeURIComponent('aGVsbG8=')}&base64_arr=${encodeURIComponent('aGVsbG8=')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64_arr: [
        { valueType: 'string', valueText: 'aGVsbG8=' },
        { valueType: 'string', valueText: 'aGVsbG8=' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('base64url_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?base64url_arr=aGVsbG8&base64url_arr=aGVsbG8')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url_arr: [
        { valueType: 'string', valueText: 'aGVsbG8' },
        { valueType: 'string', valueText: 'aGVsbG8' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('nanoid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?nanoid_arr=V1StGXR8_Z5jdHi6B-myT&nanoid_arr=V1StGXR8_Z5jdHi6B-myT',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nanoid_arr: [
        { valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' },
        { valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('cuid2_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?cuid2_arr=tz4a98xxat96iws9zmbrgj3a&cuid2_arr=tz4a98xxat96iws9zmbrgj3a',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2_arr: [
        { valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' },
        { valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('ulid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?ulid_arr=01ARZ3NDEKTSV4RRFFQ69G5FAV&ulid_arr=01ARZ3NDEKTSV4RRFFQ69G5FAV',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid_arr: [
        { valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
        { valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('ipv4_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?ipv4_arr=192.168.0.1&ipv4_arr=192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4_arr: [
        { valueType: 'string', valueText: '192.168.0.1' },
        { valueType: 'string', valueText: '192.168.0.1' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('ipv6_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?ipv6_arr=${encodeURIComponent('2001:db8::1')}&ipv6_arr=${encodeURIComponent('2001:db8::1')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6_arr: [
        { valueType: 'string', valueText: '2001:db8::1' },
        { valueType: 'string', valueText: '2001:db8::1' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('cidrv4_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv4_arr=${encodeURIComponent('192.168.0.0/24')}&cidrv4_arr=${encodeURIComponent('192.168.0.0/24')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4_arr: [
        { valueType: 'string', valueText: '192.168.0.0/24' },
        { valueType: 'string', valueText: '192.168.0.0/24' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('cidrv6_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6_arr=${encodeURIComponent('2001:db8::/32')}&cidrv6_arr=${encodeURIComponent('2001:db8::/32')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6_arr: [
        { valueType: 'string', valueText: '2001:db8::/32' },
        { valueType: 'string', valueText: '2001:db8::/32' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('date_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?date_arr=2020-01-02&date_arr=2020-01-02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date_arr: [
        { valueType: 'string', valueText: '2020-01-02' },
        { valueType: 'string', valueText: '2020-01-02' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('time_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?time_arr=${encodeURIComponent('12:34:56')}&time_arr=${encodeURIComponent('12:34:56')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_arr: [
        { valueType: 'string', valueText: '12:34:56' },
        { valueType: 'string', valueText: '12:34:56' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('datetime_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime_arr=${encodeURIComponent('2020-01-02T03:04:05Z')}&datetime_arr=${encodeURIComponent('2020-01-02T03:04:05Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_arr: [
        { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
        { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('duration_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?duration_arr=P1Y2M3DT4H5M6S&duration_arr=P1Y2M3DT4H5M6S',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration_arr: [
        { valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' },
        { valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('byte_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?byte_arr=${encodeURIComponent('aGVsbG8=')}&byte_arr=${encodeURIComponent('aGVsbG8=')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte_arr: [
        { valueType: 'string', valueText: 'aGVsbG8=' },
        { valueType: 'string', valueText: 'aGVsbG8=' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('strpassword_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?strpassword_arr=hunter2&strpassword_arr=hunter2',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword_arr: [
        { valueType: 'string', valueText: 'hunter2' },
        { valueType: 'string', valueText: 'hunter2' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('mac_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?mac_arr=${encodeURIComponent('00:1a:2b:3c:4d:5e')}&mac_arr=${encodeURIComponent('00:1a:2b:3c:4d:5e')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac_arr: [
        { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
        { valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('e164_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      `/params?e164_arr=${encodeURIComponent('+14155552671')}&e164_arr=${encodeURIComponent('+14155552671')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      e164_arr: [
        { valueType: 'string', valueText: '+14155552671' },
        { valueType: 'string', valueText: '+14155552671' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('creditcard_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?creditcard_arr=4111111111111111&creditcard_arr=4111111111111111',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard_arr: [
        { valueType: 'string', valueText: '4111111111111111' },
        { valueType: 'string', valueText: '4111111111111111' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('iban_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?iban_arr=DE89370400440532013000&iban_arr=DE89370400440532013000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban_arr: [
        { valueType: 'string', valueText: 'DE89370400440532013000' },
        { valueType: 'string', valueText: 'DE89370400440532013000' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('currencycode_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?currencycode_arr=USD&currencycode_arr=USD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode_arr: [
        { valueType: 'string', valueText: 'USD' },
        { valueType: 'string', valueText: 'USD' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('ksuid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?ksuid_arr=0ujsszwN8NRY24YaXiTIE2VWDTS&ksuid_arr=0ujsszwN8NRY24YaXiTIE2VWDTS',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ksuid_arr: [
        { valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' },
        { valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('xid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?xid_arr=9m4e2mr0ui3e8a215n4g&xid_arr=9m4e2mr0ui3e8a215n4g',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid_arr: [
        { valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' },
        { valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('guid_arr accepts two values', async () => {
    const res = await queryParamsApp.request(
      '/params?guid_arr=0190b1f4-0000-7000-8000-000000000000&guid_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid_arr: [
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
        { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
      ],
    })
  })

  // Both elements arrive as string.
  // 2つの要素がどちらも string として届く。
  it('trim_arr accepts two values', async () => {
    const res = await queryParamsApp.request('/params?trim_arr=spaced&trim_arr=spaced')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trim_arr: [
        { valueType: 'string', valueText: 'spaced' },
        { valueType: 'string', valueText: 'spaced' },
      ],
    })
  })
})

// ?<shape>_arr=<value> is what an exploded one-element array serialises to, and it reaches
// the validator as a bare string, not as an array. A plain z.array(...) used to reject it;
// the generated schema wraps it into a one-element array first.
// ?<shape>_arr=<value> は、explode された1要素配列のシリアライズ結果である。
// バリデータには配列ではなく素の文字列として届く。
// 素の z.array(...) はかつてこれを拒否していたが、生成されるスキーマは、
// まず1要素の配列に包んでから検証する。
describe('shapes: every shape as an array of one value', () => {
  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('integer_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [{ valueType: 'number', valueText: '42' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('int32_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32_arr: [{ valueType: 'number', valueText: '42' }],
    })
  })

  // The single value arrives as an array holding one bigint.
  // 単一の値が、bigint を1つ持つ配列として届く。
  it('int64_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?int64_arr=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [{ valueType: 'bigint', valueText: '9007199254740993' }],
    })
  })

  // The single value arrives as an array holding one bigint.
  // 単一の値が、bigint を1つ持つ配列として届く。
  it('bigint_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?bigint_arr=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [{ valueType: 'bigint', valueText: '9007199254740993' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('uint32_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32_arr: [{ valueType: 'number', valueText: '4294967295' }],
    })
  })

  // The single value arrives as an array holding one bigint.
  // 単一の値が、bigint を1つ持つ配列として届く。
  it('uint64_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?uint64_arr=18446744073709551615')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64_arr: [{ valueType: 'bigint', valueText: '18446744073709551615' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('number_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('float_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?float_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('float32_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('float64_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?float64_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('double_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?double_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one number.
  // 単一の値が、number を1つ持つ配列として届く。
  it('numpassword_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?numpassword_arr=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numpassword_arr: [{ valueType: 'number', valueText: '1.5' }],
    })
  })

  // The single value arrives as an array holding one boolean.
  // 単一の値が、boolean を1つ持つ配列として届く。
  it('boolean_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [{ valueType: 'boolean', valueText: 'true' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('string_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?string_arr=plain')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      string_arr: [{ valueType: 'string', valueText: 'plain' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('email_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?email_arr=${encodeURIComponent('user@example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email_arr: [{ valueType: 'string', valueText: 'user@example.com' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('uuid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      '/params?uuid_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid_arr: [{ valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('uuidv4_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv4_arr=a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv4_arr: [{ valueType: 'string', valueText: 'a1b2c3d4-e5f6-4a7b-8c9d-0e1f2a3b4c5d' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('uuidv7_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      '/params?uuidv7_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuidv7_arr: [{ valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('url_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?url_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url_arr: [{ valueType: 'string', valueText: 'https://example.com' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('uri_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?uri_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri_arr: [{ valueType: 'string', valueText: 'https://example.com' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('httpurl_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl_arr=${encodeURIComponent('https://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl_arr: [{ valueType: 'string', valueText: 'https://example.com' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('hostname_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?hostname_arr=example.com')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname_arr: [{ valueType: 'string', valueText: 'example.com' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('hex_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?hex_arr=deadbeef')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex_arr: [{ valueType: 'string', valueText: 'deadbeef' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('emoji_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(`/params?emoji_arr=${encodeURIComponent('🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji_arr: [{ valueType: 'string', valueText: '🔥' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('base64_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(`/params?base64_arr=${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64_arr: [{ valueType: 'string', valueText: 'aGVsbG8=' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('base64url_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?base64url_arr=aGVsbG8')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url_arr: [{ valueType: 'string', valueText: 'aGVsbG8' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('nanoid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?nanoid_arr=V1StGXR8_Z5jdHi6B-myT')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nanoid_arr: [{ valueType: 'string', valueText: 'V1StGXR8_Z5jdHi6B-myT' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('cuid2_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?cuid2_arr=tz4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2_arr: [{ valueType: 'string', valueText: 'tz4a98xxat96iws9zmbrgj3a' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('ulid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?ulid_arr=01ARZ3NDEKTSV4RRFFQ69G5FAV')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid_arr: [{ valueType: 'string', valueText: '01ARZ3NDEKTSV4RRFFQ69G5FAV' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('ipv4_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?ipv4_arr=192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4_arr: [{ valueType: 'string', valueText: '192.168.0.1' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('ipv6_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?ipv6_arr=${encodeURIComponent('2001:db8::1')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6_arr: [{ valueType: 'string', valueText: '2001:db8::1' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('cidrv4_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv4_arr=${encodeURIComponent('192.168.0.0/24')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4_arr: [{ valueType: 'string', valueText: '192.168.0.0/24' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('cidrv6_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6_arr=${encodeURIComponent('2001:db8::/32')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6_arr: [{ valueType: 'string', valueText: '2001:db8::/32' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('date_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?date_arr=2020-01-02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date_arr: [{ valueType: 'string', valueText: '2020-01-02' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('time_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(`/params?time_arr=${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_arr: [{ valueType: 'string', valueText: '12:34:56' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('datetime_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime_arr=${encodeURIComponent('2020-01-02T03:04:05Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_arr: [{ valueType: 'string', valueText: '2020-01-02T03:04:05Z' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('duration_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?duration_arr=P1Y2M3DT4H5M6S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration_arr: [{ valueType: 'string', valueText: 'P1Y2M3DT4H5M6S' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('byte_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(`/params?byte_arr=${encodeURIComponent('aGVsbG8=')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte_arr: [{ valueType: 'string', valueText: 'aGVsbG8=' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('strpassword_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?strpassword_arr=hunter2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword_arr: [{ valueType: 'string', valueText: 'hunter2' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('mac_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?mac_arr=${encodeURIComponent('00:1a:2b:3c:4d:5e')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac_arr: [{ valueType: 'string', valueText: '00:1a:2b:3c:4d:5e' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('e164_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      `/params?e164_arr=${encodeURIComponent('+14155552671')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      e164_arr: [{ valueType: 'string', valueText: '+14155552671' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('creditcard_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?creditcard_arr=4111111111111111')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard_arr: [{ valueType: 'string', valueText: '4111111111111111' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('iban_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?iban_arr=DE89370400440532013000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban_arr: [{ valueType: 'string', valueText: 'DE89370400440532013000' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('currencycode_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?currencycode_arr=USD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode_arr: [{ valueType: 'string', valueText: 'USD' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('ksuid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?ksuid_arr=0ujsszwN8NRY24YaXiTIE2VWDTS')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ksuid_arr: [{ valueType: 'string', valueText: '0ujsszwN8NRY24YaXiTIE2VWDTS' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('xid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?xid_arr=9m4e2mr0ui3e8a215n4g')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid_arr: [{ valueType: 'string', valueText: '9m4e2mr0ui3e8a215n4g' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('guid_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request(
      '/params?guid_arr=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid_arr: [{ valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' }],
    })
  })

  // The single value arrives as an array holding one string.
  // 単一の値が、string を1つ持つ配列として届く。
  it('trim_arr accepts a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/params?trim_arr=spaced')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      trim_arr: [{ valueType: 'string', valueText: 'spaced' }],
    })
  })
})

// The first and last value each integer format holds.
// 各整数フォーマットが保持できる最初と最後の値。
describe('integers: accepted boundaries', () => {
  // Zero.
  // ゼロ。
  it('integer accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?integer=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '0' },
    })
  })

  // A negative integer.
  // 負の整数。
  it('integer accepts "-1"', async () => {
    const res = await queryParamsApp.request('/params?integer=-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '-1' },
    })
  })

  // Number.MAX_SAFE_INTEGER, the last integer a double holds exactly.
  // Number.MAX_SAFE_INTEGER。double が正確に保持できる最後の整数。
  it('integer accepts "9007199254740991"', async () => {
    const res = await queryParamsApp.request('/params?integer=9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '9007199254740991' },
    })
  })

  // Number.MIN_SAFE_INTEGER.
  // Number.MIN_SAFE_INTEGER。
  it('integer accepts "-9007199254740991"', async () => {
    const res = await queryParamsApp.request('/params?integer=-9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '-9007199254740991' },
    })
  })

  // The int32 maximum, 2^31 - 1.
  // int32 の最大値(2^31 - 1)。
  it('int32 accepts "2147483647"', async () => {
    const res = await queryParamsApp.request('/params?int32=2147483647')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '2147483647' },
    })
  })

  // The int32 minimum, -2^31.
  // int32 の最小値(-2^31)。
  it('int32 accepts "-2147483648"', async () => {
    const res = await queryParamsApp.request('/params?int32=-2147483648')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '-2147483648' },
    })
  })

  // Zero.
  // ゼロ。
  it('int32 accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?int32=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32: { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 minimum.
  // uint32 の最小値。
  it('uint32 accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?uint32=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '0' },
    })
  })

  // The uint32 maximum, 2^32 - 1.
  // uint32 の最大値(2^32 - 1)。
  it('uint32 accepts "4294967295"', async () => {
    const res = await queryParamsApp.request('/params?uint32=4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32: { valueType: 'number', valueText: '4294967295' },
    })
  })

  // The int64 maximum, 2^63 - 1, kept to the last digit.
  // int64 の最大値(2^63 - 1)。最後の桁まで保持される。
  it('int64 accepts "9223372036854775807"', async () => {
    const res = await queryParamsApp.request('/params?int64=9223372036854775807')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '9223372036854775807' },
    })
  })

  // The int64 minimum, -2^63.
  // int64 の最小値(-2^63)。
  it('int64 accepts "-9223372036854775808"', async () => {
    const res = await queryParamsApp.request('/params?int64=-9223372036854775808')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '-9223372036854775808' },
    })
  })

  // Zero is a bigint too.
  // ゼロも bigint として届く。
  it('int64 accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?int64=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 minimum.
  // uint64 の最小値。
  it('uint64 accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?uint64=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // The uint64 maximum, 2^64 - 1.
  // uint64 の最大値(2^64 - 1)。
  it('uint64 accepts "18446744073709551615"', async () => {
    const res = await queryParamsApp.request('/params?uint64=18446744073709551615')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64: { valueType: 'bigint', valueText: '18446744073709551615' },
    })
  })

  // format: bigint has no upper bound.
  // format: bigint には上限がない。
  it('bigint accepts "99999999999999999999999999999"', async () => {
    const res = await queryParamsApp.request('/params?bigint=99999999999999999999999999999')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint: { valueType: 'bigint', valueText: '99999999999999999999999999999' },
    })
  })

  // format: bigint has no lower bound.
  // format: bigint には下限がない。
  it('bigint accepts "-99999999999999999999999999999"', async () => {
    const res = await queryParamsApp.request('/params?bigint=-99999999999999999999999999999')
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
    const res = await queryParamsApp.request('/params?int64=1e3')
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
    const res = await queryParamsApp.request('/params?bigint=1.0')
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
    const res = await queryParamsApp.request('/params?bigint=1e3')
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
    const res = await queryParamsApp.request('/params?integer=1.0')
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
    const res = await queryParamsApp.request('/params?integer=1e3')
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
    const res = await queryParamsApp.request('/params?number=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0' },
    })
  })

  // A negative fraction.
  // 負の小数。
  it('number accepts "-1.5"', async () => {
    const res = await queryParamsApp.request('/params?number=-1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '-1.5' },
    })
  })

  // Exponent notation.
  // 指数表記。
  it('number accepts "1e3"', async () => {
    const res = await queryParamsApp.request('/params?number=1e3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '1000' },
    })
  })

  // A negative exponent.
  // 負の指数。
  it('number accepts "1e-3"', async () => {
    const res = await queryParamsApp.request('/params?number=1e-3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0.001' },
    })
  })

  // No digit before the decimal point.
  // 小数点の前の数字を省略した表記。
  it('number accepts ".5"', async () => {
    const res = await queryParamsApp.request('/params?number=.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0.5' },
    })
  })

  // No digit after the decimal point.
  // 小数点の後の数字を省略した表記。
  it('number accepts "5."', async () => {
    const res = await queryParamsApp.request('/params?number=5.')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '5' },
    })
  })

  // The largest finite float32.
  // float32 の最大有限値。
  it('float32 accepts "3.4028234e38"', async () => {
    const res = await queryParamsApp.request('/params?float32=3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '3.4028234e+38' },
    })
  })

  // The smallest finite float32.
  // float32 の最小有限値。
  it('float32 accepts "-3.4028234e38"', async () => {
    const res = await queryParamsApp.request('/params?float32=-3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '-3.4028234e+38' },
    })
  })

  // Too small for a float32 to represent: underflow is not a range error.
  // float32 では表現できないほど小さい値。アンダーフローは範囲エラーにならない。
  it('float32 accepts "1e-50"', async () => {
    const res = await queryParamsApp.request('/params?float32=1e-50')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '1e-50' },
    })
  })

  // A value a float32 cannot hold exactly is not rounded.
  // float32 で正確に表現できない値でも、丸められずに届く。
  it('float32 accepts "0.1"', async () => {
    const res = await queryParamsApp.request('/params?float32=0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32: { valueType: 'number', valueText: '0.1' },
    })
  })

  // Number.MAX_VALUE, the largest finite double.
  // Number.MAX_VALUE。double の最大有限値。
  it('float64 accepts "1.7976931348623157e308"', async () => {
    const res = await queryParamsApp.request('/params?float64=1.7976931348623157e308')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64: { valueType: 'number', valueText: '1.7976931348623157e+308' },
    })
  })

  // The smallest finite double.
  // double の最小有限値。
  it('double accepts "-1.7976931348623157e308"', async () => {
    const res = await queryParamsApp.request('/params?double=-1.7976931348623157e308')
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
    const res = await queryParamsApp.request('/params?boolean=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The literal false; a naive Boolean("false") would have been true.
  // リテラルの false。素朴な Boolean("false") では true になってしまう。
  it('boolean accepts "false"', async () => {
    const res = await queryParamsApp.request('/params?boolean=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // Upper case is read the same.
  // 大文字でも同じように読み取られる。
  it('boolean accepts "TRUE"', async () => {
    const res = await queryParamsApp.request('/params?boolean=TRUE')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // Mixed case is read the same.
  // 大文字小文字が混在していても同じように読み取られる。
  it('boolean accepts "False"', async () => {
    const res = await queryParamsApp.request('/params?boolean=False')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // The digit 1 means true.
  // 数字の 1 は true を意味する。
  it('boolean accepts "1"', async () => {
    const res = await queryParamsApp.request('/params?boolean=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The digit 0 means false.
  // 数字の 0 は false を意味する。
  it('boolean accepts "0"', async () => {
    const res = await queryParamsApp.request('/params?boolean=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "yes" means true.
  // "yes" は true を意味する。
  it('boolean accepts "yes"', async () => {
    const res = await queryParamsApp.request('/params?boolean=yes')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "no" means false.
  // "no" は false を意味する。
  it('boolean accepts "no"', async () => {
    const res = await queryParamsApp.request('/params?boolean=no')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "on" means true.
  // "on" は true を意味する。
  it('boolean accepts "on"', async () => {
    const res = await queryParamsApp.request('/params?boolean=on')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "off" means false.
  // "off" は false を意味する。
  it('boolean accepts "off"', async () => {
    const res = await queryParamsApp.request('/params?boolean=off')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "y" means true.
  // "y" は true を意味する。
  it('boolean accepts "y"', async () => {
    const res = await queryParamsApp.request('/params?boolean=y')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "n" means false.
  // "n" は false を意味する。
  it('boolean accepts "n"', async () => {
    const res = await queryParamsApp.request('/params?boolean=n')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // "enabled" means true.
  // "enabled" は true を意味する。
  it('boolean accepts "enabled"', async () => {
    const res = await queryParamsApp.request('/params?boolean=enabled')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // "disabled" means false.
  // "disabled" は false を意味する。
  it('boolean accepts "disabled"', async () => {
    const res = await queryParamsApp.request('/params?boolean=disabled')
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
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('USER@EXAMPLE.COM')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'USER@EXAMPLE.COM' },
    })
  })

  // A plus tag in the local part.
  // ローカル部にプラス記号のタグを含む。
  it('email accepts "user+tag@example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('user+tag@example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'user+tag@example.com' },
    })
  })

  // Dots in the local part and a multi-level domain.
  // ローカル部のドットと、多階層のドメイン。
  it('email accepts "first.last@sub.example.co.jp"', async () => {
    const res = await queryParamsApp.request(
      `/params?email=${encodeURIComponent('first.last@sub.example.co.jp')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      email: { valueType: 'string', valueText: 'first.last@sub.example.co.jp' },
    })
  })

  // Upper-case hexadecimal digits.
  // 大文字の16進数。
  it('uuid accepts "0190B1F4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuid=0190B1F4-0000-7000-8000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '0190B1F4-0000-7000-8000-000000000000' },
    })
  })

  // The nil UUID, which carries no version.
  // バージョンを持たない nil UUID。
  it('uuid accepts "00000000-0000-0000-0000-000000000000"', async () => {
    const res = await queryParamsApp.request('/params?uuid=00000000-0000-0000-0000-000000000000')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: '00000000-0000-0000-0000-000000000000' },
    })
  })

  // The max UUID, which carries no version.
  // バージョンを持たない max UUID。
  it('uuid accepts "ffffffff-ffff-ffff-ffff-ffffffffffff"', async () => {
    const res = await queryParamsApp.request('/params?uuid=ffffffff-ffff-ffff-ffff-ffffffffffff')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid: { valueType: 'string', valueText: 'ffffffff-ffff-ffff-ffff-ffffffffffff' },
    })
  })

  // A GUID checks the 8-4-4-4-12 layout only, not the version or variant.
  // GUID は 8-4-4-4-12 の形だけを検証し、バージョンやバリアントは見ない。
  it('guid accepts "a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d"', async () => {
    const res = await queryParamsApp.request('/params?guid=a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      guid: { valueType: 'string', valueText: 'a1b2c3d4-e5f6-9a7b-0c9d-0e1f2a3b4c5d' },
    })
  })

  // format: url takes any scheme, not only http.
  // format: url は http に限らず任意のスキームを受理する。
  it('url accepts "ftp://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?url=${encodeURIComponent('ftp://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'ftp://example.com' },
    })
  })

  // A scheme with no authority.
  // オーソリティ部のないスキーム。
  it('url accepts "mailto:a@b.c"', async () => {
    const res = await queryParamsApp.request(`/params?url=${encodeURIComponent('mailto:a@b.c')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'mailto:a@b.c' },
    })
  })

  // A port, a path, a query and a fragment.
  // ポート・パス・クエリ・フラグメントを含む。
  it('url accepts "http://localhost:3000/a?b=c#d"', async () => {
    const res = await queryParamsApp.request(
      `/params?url=${encodeURIComponent('http://localhost:3000/a?b=c#d')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'http://localhost:3000/a?b=c#d' },
    })
  })

  // A URN is a URI.
  // URN も URI である。
  it('uri accepts "urn:isbn:0451450523"', async () => {
    const res = await queryParamsApp.request(
      `/params?uri=${encodeURIComponent('urn:isbn:0451450523')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uri: { valueType: 'string', valueText: 'urn:isbn:0451450523' },
    })
  })

  // Plain http.
  // 暗号化なしの http。
  it('httpurl accepts "http://example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('http://example.com')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'http://example.com' },
    })
  })

  // A path and a query.
  // パスとクエリを含む。
  it('httpurl accepts "https://example.com/a/b?c=d"', async () => {
    const res = await queryParamsApp.request(
      `/params?httpurl=${encodeURIComponent('https://example.com/a/b?c=d')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      httpurl: { valueType: 'string', valueText: 'https://example.com/a/b?c=d' },
    })
  })

  // A single label.
  // 単一ラベルのホスト名。
  it('hostname accepts "localhost"', async () => {
    const res = await queryParamsApp.request('/params?hostname=localhost')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'localhost' },
    })
  })

  // One-character labels.
  // 1文字のラベル。
  it('hostname accepts "a.b.c"', async () => {
    const res = await queryParamsApp.request('/params?hostname=a.b.c')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'a.b.c' },
    })
  })

  // An internationalised name in punycode.
  // Punycode で表記した国際化ドメイン名。
  it('hostname accepts "xn--r8jz45g.jp"', async () => {
    const res = await queryParamsApp.request('/params?hostname=xn--r8jz45g.jp')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'xn--r8jz45g.jp' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('hex accepts "DEADBEEF"', async () => {
    const res = await queryParamsApp.request('/params?hex=DEADBEEF')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'DEADBEEF' },
    })
  })

  // An odd number of digits.
  // 桁数が奇数の16進数。
  it('hex accepts "abc"', async () => {
    const res = await queryParamsApp.request('/params?hex=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hex: { valueType: 'string', valueText: 'abc' },
    })
  })

  // More than one emoji.
  // 複数の絵文字。
  it('emoji accepts "🔥🔥"', async () => {
    const res = await queryParamsApp.request(`/params?emoji=${encodeURIComponent('🔥🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '🔥🔥' },
    })
  })

  // A ZWJ sequence: one glyph, several code points.
  // ZWJ シーケンス。見た目は1文字だが、複数のコードポイントで構成される。
  it('emoji accepts "👨‍👩‍👧"', async () => {
    const res = await queryParamsApp.request(`/params?emoji=${encodeURIComponent('👨‍👩‍👧')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      emoji: { valueType: 'string', valueText: '👨‍👩‍👧' },
    })
  })

  // "+" and "/" are what set base64 apart from base64url.
  // "+" と "/" は base64 と base64url を分ける文字である。
  it('base64 accepts "a+b/"', async () => {
    const res = await queryParamsApp.request(`/params?base64=${encodeURIComponent('a+b/')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'a+b/' },
    })
  })

  // Two padding characters.
  // パディングが2文字。
  it('base64 accepts "YQ=="', async () => {
    const res = await queryParamsApp.request(`/params?base64=${encodeURIComponent('YQ==')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64: { valueType: 'string', valueText: 'YQ==' },
    })
  })

  // "-" and "_" are the base64url alphabet.
  // "-" と "_" は base64url の文字である。
  it('base64url accepts "a-b_"', async () => {
    const res = await queryParamsApp.request('/params?base64url=a-b_')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      base64url: { valueType: 'string', valueText: 'a-b_' },
    })
  })

  // format: byte does not validate: text that is not base64 passes.
  // format: byte は検証を行わない。Base64 でない文字列も通る。
  it('byte accepts "!!!not-base64!!!"', async () => {
    const res = await queryParamsApp.request('/params?byte=!!!not-base64!!!')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      byte: { valueType: 'string', valueText: '!!!not-base64!!!' },
    })
  })

  // format: password does not validate: reserved characters pass.
  // format: password は検証を行わない。予約文字も通る。
  it('strpassword accepts "p@ss/w0rd?#"', async () => {
    const res = await queryParamsApp.request(
      `/params?strpassword=${encodeURIComponent('p@ss/w0rd?#')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      strpassword: { valueType: 'string', valueText: 'p@ss/w0rd?#' },
    })
  })

  // A ULID is case-insensitive.
  // ULID は大文字小文字を区別しない。
  it('ulid accepts "01arz3ndektsv4rrffq69g5fav"', async () => {
    const res = await queryParamsApp.request('/params?ulid=01arz3ndektsv4rrffq69g5fav')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ulid: { valueType: 'string', valueText: '01arz3ndektsv4rrffq69g5fav' },
    })
  })

  // Upper case is accepted.
  // 大文字も受理される。
  it('xid accepts "9M4E2MR0UI3E8A215N4G"', async () => {
    const res = await queryParamsApp.request('/params?xid=9M4E2MR0UI3E8A215N4G')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      xid: { valueType: 'string', valueText: '9M4E2MR0UI3E8A215N4G' },
    })
  })

  // The lowest address.
  // 最小のアドレス。
  it('ipv4 accepts "0.0.0.0"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=0.0.0.0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '0.0.0.0' },
    })
  })

  // The highest address.
  // 最大のアドレス。
  it('ipv4 accepts "255.255.255.255"', async () => {
    const res = await queryParamsApp.request('/params?ipv4=255.255.255.255')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv4: { valueType: 'string', valueText: '255.255.255.255' },
    })
  })

  // The unspecified address.
  // 未指定アドレス。
  it('ipv6 accepts "::"', async () => {
    const res = await queryParamsApp.request(`/params?ipv6=${encodeURIComponent('::')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::' },
    })
  })

  // The loopback address.
  // ループバックアドレス。
  it('ipv6 accepts "::1"', async () => {
    const res = await queryParamsApp.request(`/params?ipv6=${encodeURIComponent('::1')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::1' },
    })
  })

  // The full form, nothing compressed.
  // 省略のない完全表記。
  it('ipv6 accepts "2001:0db8:0000:0000:0000:0000:0000:0001"', async () => {
    const res = await queryParamsApp.request(
      `/params?ipv6=${encodeURIComponent('2001:0db8:0000:0000:0000:0000:0000:0001')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '2001:0db8:0000:0000:0000:0000:0000:0001' },
    })
  })

  // An IPv4-mapped address.
  // IPv4 射影アドレス。
  it('ipv6 accepts "::ffff:192.168.0.1"', async () => {
    const res = await queryParamsApp.request(
      `/params?ipv6=${encodeURIComponent('::ffff:192.168.0.1')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ipv6: { valueType: 'string', valueText: '::ffff:192.168.0.1' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv4 accepts "0.0.0.0/0"', async () => {
    const res = await queryParamsApp.request(`/params?cidrv4=${encodeURIComponent('0.0.0.0/0')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '0.0.0.0/0' },
    })
  })

  // The longest prefix, /32.
  // 最長のプレフィックス /32。
  it('cidrv4 accepts "10.0.0.1/32"', async () => {
    const res = await queryParamsApp.request(`/params?cidrv4=${encodeURIComponent('10.0.0.1/32')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv4: { valueType: 'string', valueText: '10.0.0.1/32' },
    })
  })

  // The shortest prefix, /0.
  // 最短のプレフィックス /0。
  it('cidrv6 accepts "::/0"', async () => {
    const res = await queryParamsApp.request(`/params?cidrv6=${encodeURIComponent('::/0')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '::/0' },
    })
  })

  // The longest prefix, /128.
  // 最長のプレフィックス /128。
  it('cidrv6 accepts "2001:db8::/128"', async () => {
    const res = await queryParamsApp.request(
      `/params?cidrv6=${encodeURIComponent('2001:db8::/128')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cidrv6: { valueType: 'string', valueText: '2001:db8::/128' },
    })
  })

  // 29 February of a leap year.
  // うるう年の 2月29日。
  it('date accepts "2020-02-29"', async () => {
    const res = await queryParamsApp.request('/params?date=2020-02-29')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '2020-02-29' },
    })
  })

  // Year zero.
  // 西暦 0 年。
  it('date accepts "0000-01-01"', async () => {
    const res = await queryParamsApp.request('/params?date=0000-01-01')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '0000-01-01' },
    })
  })

  // The last four-digit date.
  // 4桁の年で表せる最後の日付。
  it('date accepts "9999-12-31"', async () => {
    const res = await queryParamsApp.request('/params?date=9999-12-31')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      date: { valueType: 'string', valueText: '9999-12-31' },
    })
  })

  // Midnight.
  // 午前 0 時。
  it('time accepts "00:00:00"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('00:00:00')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '00:00:00' },
    })
  })

  // The last second of the day.
  // 1日の最後の秒。
  it('time accepts "23:59:59"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('23:59:59')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '23:59:59' },
    })
  })

  // Seconds may be left out.
  // 秒は省略できる。
  it('time accepts "12:34"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('12:34')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('time accepts "12:34:56.789"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('12:34:56.789')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56.789' },
    })
  })

  // A zone designator: `time` names an RFC 3339 full-time, which ends in one.
  // タイムゾーン指定子が付いている。`time` が指す RFC 3339 の full-time は、これで終わる。
  it('time accepts "12:34:56Z"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('12:34:56Z')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56Z' },
    })
  })

  // An offset in place of the zone designator.
  // タイムゾーン指定子の代わりにオフセットが付いている。
  it('time accepts "12:34:56+09:00"', async () => {
    const res = await queryParamsApp.request(`/params?time=${encodeURIComponent('12:34:56+09:00')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time: { valueType: 'string', valueText: '12:34:56+09:00' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('datetime accepts "2020-01-02T03:04:05.123Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02T03:04:05.123Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05.123Z' },
    })
  })

  // An offset instead of Z: RFC 3339, which `date-time` names, takes either.
  // Z ではなくオフセット。`date-time` が指す RFC 3339 はどちらも認める。
  it('datetime accepts "2020-01-02T03:04:05+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-01-02T03:04:05+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-01-02T03:04:05+09:00' },
    })
  })

  // The last second of a leap day.
  // うるう日の最後の秒。
  it('datetime accepts "2020-02-29T23:59:59Z"', async () => {
    const res = await queryParamsApp.request(
      `/params?datetime=${encodeURIComponent('2020-02-29T23:59:59Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime: { valueType: 'string', valueText: '2020-02-29T23:59:59Z' },
    })
  })

  // A date component alone.
  // 日付要素のみ。
  it('duration accepts "P1Y"', async () => {
    const res = await queryParamsApp.request('/params?duration=P1Y')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1Y' },
    })
  })

  // A time component alone.
  // 時刻要素のみ。
  it('duration accepts "PT1S"', async () => {
    const res = await queryParamsApp.request('/params?duration=PT1S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'PT1S' },
    })
  })

  // Weeks.
  // 週。
  it('duration accepts "P1W"', async () => {
    const res = await queryParamsApp.request('/params?duration=P1W')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'P1W' },
    })
  })

  // Fractional seconds.
  // 小数秒。
  it('duration accepts "PT0.5S"', async () => {
    const res = await queryParamsApp.request('/params?duration=PT0.5S')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      duration: { valueType: 'string', valueText: 'PT0.5S' },
    })
  })

  // Upper-case digits.
  // 大文字の16進数。
  it('mac accepts "00:1A:2B:3C:4D:5E"', async () => {
    const res = await queryParamsApp.request(
      `/params?mac=${encodeURIComponent('00:1A:2B:3C:4D:5E')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mac: { valueType: 'string', valueText: '00:1A:2B:3C:4D:5E' },
    })
  })

  // Hyphens between groups; the Luhn check runs on the digits.
  // グループ間のハイフン。Luhn チェックは数字部分に対して行われる。
  it('creditcard accepts "4111-1111-1111-1111"', async () => {
    const res = await queryParamsApp.request('/params?creditcard=4111-1111-1111-1111')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111-1111-1111-1111' },
    })
  })

  // Spaces between groups.
  // グループ間の空白。
  it('creditcard accepts "4111 1111 1111 1111"', async () => {
    const res = await queryParamsApp.request(
      `/params?creditcard=${encodeURIComponent('4111 1111 1111 1111')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '4111 1111 1111 1111' },
    })
  })

  // A 15-digit number.
  // 15桁のカード番号。
  it('creditcard accepts "378282246310005"', async () => {
    const res = await queryParamsApp.request('/params?creditcard=378282246310005')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      creditcard: { valueType: 'string', valueText: '378282246310005' },
    })
  })

  // Letters in the account part.
  // 口座部分に英字を含む。
  it('iban accepts "GB82WEST12345698765432"', async () => {
    const res = await queryParamsApp.request('/params?iban=GB82WEST12345698765432')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iban: { valueType: 'string', valueText: 'GB82WEST12345698765432' },
    })
  })

  // Another ISO 4217 code.
  // 別の ISO 4217 コード。
  it('currencycode accepts "JPY"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=JPY')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'JPY' },
    })
  })

  // ISO 4217 reserves XXX for "no currency".
  // ISO 4217 は XXX を「通貨なし」として予約している。
  it('currencycode accepts "XXX"', async () => {
    const res = await queryParamsApp.request('/params?currencycode=XXX')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      currencycode: { valueType: 'string', valueText: 'XXX' },
    })
  })
})

// An array element is validated by the same schema as the scalar, wrapped in z.array. The
// value under test goes second, after a valid one: a schema that only looked at the first
// element would miss it.
// 配列要素は、スカラーと同じスキーマを z.array で包んだもので検証される。検証対象の値は、
// 有効な値の後ろの2番目に置く。先頭要素しか見ないスキーマなら見逃してしまうためである。
describe('array elements: accepted boundaries', () => {
  // Zero.
  // ゼロ。
  it('integer_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '0' },
      ],
    })
  })

  // A negative integer.
  // 負の整数。
  it('integer_arr accepts "-1" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '-1' },
      ],
    })
  })

  // Number.MAX_SAFE_INTEGER, the last integer a double holds exactly.
  // Number.MAX_SAFE_INTEGER。double が正確に保持できる最後の整数。
  it('integer_arr accepts "9007199254740991" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '9007199254740991' },
      ],
    })
  })

  // Number.MIN_SAFE_INTEGER.
  // Number.MIN_SAFE_INTEGER。
  it('integer_arr accepts "-9007199254740991" as its second element', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=42&integer_arr=-9007199254740991')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '-9007199254740991' },
      ],
    })
  })

  // The int32 maximum, 2^31 - 1.
  // int32 の最大値(2^31 - 1)。
  it('int32_arr accepts "2147483647" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=2147483647')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '2147483647' },
      ],
    })
  })

  // The int32 minimum, -2^31.
  // int32 の最小値(-2^31)。
  it('int32_arr accepts "-2147483648" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=-2147483648')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '-2147483648' },
      ],
    })
  })

  // Zero.
  // ゼロ。
  it('int32_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int32_arr=42&int32_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int32_arr: [
        { valueType: 'number', valueText: '42' },
        { valueType: 'number', valueText: '0' },
      ],
    })
  })

  // The uint32 minimum.
  // uint32 の最小値。
  it('uint32_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32_arr: [
        { valueType: 'number', valueText: '4294967295' },
        { valueType: 'number', valueText: '0' },
      ],
    })
  })

  // The uint32 maximum, 2^32 - 1.
  // uint32 の最大値(2^32 - 1)。
  it('uint32_arr accepts "4294967295" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint32_arr=4294967295&uint32_arr=4294967295')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint32_arr: [
        { valueType: 'number', valueText: '4294967295' },
        { valueType: 'number', valueText: '4294967295' },
      ],
    })
  })

  // The int64 maximum, 2^63 - 1, kept to the last digit.
  // int64 の最大値(2^63 - 1)。最後の桁まで保持される。
  it('int64_arr accepts "9223372036854775807" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=9223372036854775807',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '9223372036854775807' },
      ],
    })
  })

  // The int64 minimum, -2^63.
  // int64 の最小値(-2^63)。
  it('int64_arr accepts "-9223372036854775808" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=-9223372036854775808',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '-9223372036854775808' },
      ],
    })
  })

  // Zero is a bigint too.
  // ゼロも bigint として届く。
  it('int64_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int64_arr=9007199254740993&int64_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '0' },
      ],
    })
  })

  // The uint64 minimum.
  // uint64 の最小値。
  it('uint64_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?uint64_arr=18446744073709551615&uint64_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64_arr: [
        { valueType: 'bigint', valueText: '18446744073709551615' },
        { valueType: 'bigint', valueText: '0' },
      ],
    })
  })

  // The uint64 maximum, 2^64 - 1.
  // uint64 の最大値(2^64 - 1)。
  it('uint64_arr accepts "18446744073709551615" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?uint64_arr=18446744073709551615&uint64_arr=18446744073709551615',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uint64_arr: [
        { valueType: 'bigint', valueText: '18446744073709551615' },
        { valueType: 'bigint', valueText: '18446744073709551615' },
      ],
    })
  })

  // format: bigint has no upper bound.
  // format: bigint には上限がない。
  it('bigint_arr accepts "99999999999999999999999999999" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?bigint_arr=9007199254740993&bigint_arr=99999999999999999999999999999',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '99999999999999999999999999999' },
      ],
    })
  })

  // format: bigint has no lower bound.
  // format: bigint には下限がない。
  it('bigint_arr accepts "-99999999999999999999999999999" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?bigint_arr=9007199254740993&bigint_arr=-99999999999999999999999999999',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '-99999999999999999999999999999' },
      ],
    })
  })

  // Zero.
  // ゼロ。
  it('number_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '0' },
      ],
    })
  })

  // A negative fraction.
  // 負の小数。
  it('number_arr accepts "-1.5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=-1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '-1.5' },
      ],
    })
  })

  // Exponent notation.
  // 指数表記。
  it('number_arr accepts "1e3" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=1e3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1000' },
      ],
    })
  })

  // A negative exponent.
  // 負の指数。
  it('number_arr accepts "1e-3" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=1e-3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '0.001' },
      ],
    })
  })

  // No digit before the decimal point.
  // 小数点の前の数字を省略した表記。
  it('number_arr accepts ".5" as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '0.5' },
      ],
    })
  })

  // No digit after the decimal point.
  // 小数点の後の数字を省略した表記。
  it('number_arr accepts "5." as its second element', async () => {
    const res = await queryParamsApp.request('/params?number_arr=1.5&number_arr=5.')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '5' },
      ],
    })
  })

  // The largest finite float32.
  // float32 の最大有限値。
  it('float32_arr accepts "3.4028234e38" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '3.4028234e+38' },
      ],
    })
  })

  // The smallest finite float32.
  // float32 の最小有限値。
  it('float32_arr accepts "-3.4028234e38" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=-3.4028234e38')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '-3.4028234e+38' },
      ],
    })
  })

  // Too small for a float32 to represent: underflow is not a range error.
  // float32 では表現できないほど小さい値。アンダーフローは範囲エラーにならない。
  it('float32_arr accepts "1e-50" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=1e-50')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1e-50' },
      ],
    })
  })

  // A value a float32 cannot hold exactly is not rounded.
  // float32 で正確に表現できない値でも、丸められずに届く。
  it('float32_arr accepts "0.1" as its second element', async () => {
    const res = await queryParamsApp.request('/params?float32_arr=1.5&float32_arr=0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float32_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '0.1' },
      ],
    })
  })

  // Number.MAX_VALUE, the largest finite double.
  // Number.MAX_VALUE。double の最大有限値。
  it('float64_arr accepts "1.7976931348623157e308" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?float64_arr=1.5&float64_arr=1.7976931348623157e308',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      float64_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '1.7976931348623157e+308' },
      ],
    })
  })

  // The smallest finite double.
  // double の最小有限値。
  it('double_arr accepts "-1.7976931348623157e308" as its second element', async () => {
    const res = await queryParamsApp.request(
      '/params?double_arr=1.5&double_arr=-1.7976931348623157e308',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      double_arr: [
        { valueType: 'number', valueText: '1.5' },
        { valueType: 'number', valueText: '-1.7976931348623157e+308' },
      ],
    })
  })

  // The literal true.
  // リテラルの true。
  it('boolean_arr accepts "true" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // The literal false; a naive Boolean("false") would have been true.
  // リテラルの false。素朴な Boolean("false") では true になってしまう。
  it('boolean_arr accepts "false" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // Upper case is read the same.
  // 大文字でも同じように読み取られる。
  it('boolean_arr accepts "TRUE" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=TRUE')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // Mixed case is read the same.
  // 大文字小文字が混在していても同じように読み取られる。
  it('boolean_arr accepts "False" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=False')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // The digit 1 means true.
  // 数字の 1 は true を意味する。
  it('boolean_arr accepts "1" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // The digit 0 means false.
  // 数字の 0 は false を意味する。
  it('boolean_arr accepts "0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // "yes" means true.
  // "yes" は true を意味する。
  it('boolean_arr accepts "yes" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=yes')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // "no" means false.
  // "no" は false を意味する。
  it('boolean_arr accepts "no" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=no')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // "on" means true.
  // "on" は true を意味する。
  it('boolean_arr accepts "on" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=on')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // "off" means false.
  // "off" は false を意味する。
  it('boolean_arr accepts "off" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=off')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // "y" means true.
  // "y" は true を意味する。
  it('boolean_arr accepts "y" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=y')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // "n" means false.
  // "n" は false を意味する。
  it('boolean_arr accepts "n" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=n')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // "enabled" means true.
  // "enabled" は true を意味する。
  it('boolean_arr accepts "enabled" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=enabled')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // "disabled" means false.
  // "disabled" は false を意味する。
  it('boolean_arr accepts "disabled" as its second element', async () => {
    const res = await queryParamsApp.request('/params?boolean_arr=true&boolean_arr=disabled')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // Exponent notation that comes out whole is an integer: JSON Schema looks at the value, not at
  // how it is written.
  // 結果が整数になる指数表記は、整数である。
  // JSON Schema が見るのは値であり、表記ではない。
  it('int64_arr accepts "1e3" as its second element', async () => {
    const res = await queryParamsApp.request('/params?int64_arr=9007199254740993&int64_arr=1e3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '1000' },
      ],
    })
  })

  // A number with no fraction is an integer, however it is written: JSON Schema counts 1.0 as
  // one.
  // 小数部を持たない数値は、表記にかかわらず整数である。
  // JSON Schema は 1.0 を整数として扱う。
  it('bigint_arr accepts "1.0" as its second element', async () => {
    const res = await queryParamsApp.request('/params?bigint_arr=9007199254740993&bigint_arr=1.0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '1' },
      ],
    })
  })

  // Exponent notation that comes out whole is an integer: JSON Schema looks at the value, not at
  // how it is written.
  // 結果が整数になる指数表記は、整数である。
  // JSON Schema が見るのは値であり、表記ではない。
  it('bigint_arr accepts "1e3" as its second element', async () => {
    const res = await queryParamsApp.request('/params?bigint_arr=9007199254740993&bigint_arr=1e3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bigint_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '1000' },
      ],
    })
  })
})

// What an array parameter does beyond what its elements do.
// 配列パラメータが、要素単体の挙動に加えて持つ性質。
describe('arrays', () => {
  // The elements arrive as 3, 1, 2: they are not sorted.
  // 要素は 3, 1, 2 の順で届く。ソートはされない。
  it('keeps the order the values were sent in', async () => {
    const res = await queryParamsApp.request('/params?integer_arr=3&integer_arr=1&integer_arr=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: [
        { valueType: 'number', valueText: '3' },
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // An array is not a set: the same value three times is three elements.
  // 配列は集合ではない。同じ値を3回送れば、3要素になる。
  it('keeps duplicates', async () => {
    const res = await queryParamsApp.request('/params?string_arr=a&string_arr=a&string_arr=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      string_arr: [
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: 'a' },
      ],
    })
  })

  // Each element becomes a bigint, the large one without losing a digit.
  // 各要素が bigint になる。大きな値も桁落ちしない。
  it('coerces every element of an int64 array', async () => {
    const res = await queryParamsApp.request(
      '/params?int64_arr=9007199254740993&int64_arr=-1&int64_arr=0',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_arr: [
        { valueType: 'bigint', valueText: '9007199254740993' },
        { valueType: 'bigint', valueText: '-1' },
        { valueType: 'bigint', valueText: '0' },
      ],
    })
  })

  // The elements are spelled four different ways and each is read independently.
  // 4つの要素はそれぞれ異なる表記であり、個別に読み取られる。
  it('reads each boolean spelling on its own', async () => {
    const res = await queryParamsApp.request(
      '/params?boolean_arr=true&boolean_arr=0&boolean_arr=YES&boolean_arr=off',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      boolean_arr: [
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
        { valueType: 'boolean', valueText: 'true' },
        { valueType: 'boolean', valueText: 'false' },
      ],
    })
  })

  // Nothing limits the number of elements unless the spec sets maxItems.
  // 仕様で maxItems を指定しない限り、要素数に上限はない。
  it('carries a hundred elements', async () => {
    const sent = Array.from({ length: 100 }, (_, index) => String(index))
    const query = sent.map((value) => `integer_arr=${value}`).join('&')
    const res = await queryParamsApp.request(`/params?${query}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer_arr: sent.map((value) => ({ valueType: 'number', valueText: value })),
    })
  })

  // A scalar and two arrays together; each keeps its own values.
  // スカラー1つと配列2つを同時に送信する。それぞれが自身の値を保つ。
  it('accepts several parameters in one request', async () => {
    const res = await queryParamsApp.request(
      '/params?integer=1&integer_arr=2&integer_arr=3&string_arr=a',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '1' },
      integer_arr: [
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
      string_arr: [{ valueType: 'string', valueText: 'a' }],
    })
  })

  // Every parameter of /params is optional and none has a default.
  // /params のパラメータはすべて任意で、デフォルト値を持つものはない。
  it('answers nothing when nothing is sent', async () => {
    const res = await queryParamsApp.request('/params')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A transform changes the value before it reaches the handler, so these tests assert the
// value that arrives.
// 変換はハンドラに届く前に値を書き換える。そのため、ここでは届いた値を検証する。
describe('transforms: x-* extensions', () => {
  // x-trim removes the spaces around the value.
  // x-trim は値の前後の空白を取り除く。
  it('tx_trim turns "  spaced  " into "spaced"', async () => {
    const res = await queryParamsApp.request(`/params?tx_trim=${encodeURIComponent('  spaced  ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_trim: { valueType: 'string', valueText: 'spaced' },
    })
  })

  // A tab and a line feed are whitespace too.
  // タブと改行も空白として扱われる。
  it('tx_trim turns "\\tspaced\\n" into "spaced"', async () => {
    const res = await queryParamsApp.request(`/params?tx_trim=${encodeURIComponent('\tspaced\n')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_trim: { valueType: 'string', valueText: 'spaced' },
    })
  })

  // U+3000, the ideographic space, is whitespace too.
  // 全角スペース(U+3000)も空白として扱われる。
  it('tx_trim turns "\\u3000全角\\u3000" into "全角"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_trim=${encodeURIComponent('\u3000全角\u3000')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_trim: { valueType: 'string', valueText: '全角' },
    })
  })

  // Only the ends are trimmed; the space inside stays.
  // トリムされるのは両端だけで、内側の空白は残る。
  it('tx_trim turns " a b " into "a b"', async () => {
    const res = await queryParamsApp.request(`/params?tx_trim=${encodeURIComponent(' a b ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_trim: { valueType: 'string', valueText: 'a b' },
    })
  })

  // x-toLowerCase lower-cases the value.
  // x-toLowerCase は値を小文字化する。
  it('tx_lower turns "MiXeD" into "mixed"', async () => {
    const res = await queryParamsApp.request('/params?tx_lower=MiXeD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_lower: { valueType: 'string', valueText: 'mixed' },
    })
  })

  // A transform is not a validator: lower-casing leaves the spaces where they were.
  // 変換はバリデータではない。小文字化しても空白はそのまま残る。
  it('tx_lower turns " A " into " a "', async () => {
    const res = await queryParamsApp.request(`/params?tx_lower=${encodeURIComponent(' A ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_lower: { valueType: 'string', valueText: ' a ' },
    })
  })

  // x-toUpperCase upper-cases the value.
  // x-toUpperCase は値を大文字化する。
  it('tx_upper turns "MiXeD" into "MIXED"', async () => {
    const res = await queryParamsApp.request('/params?tx_upper=MiXeD')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_upper: { valueType: 'string', valueText: 'MIXED' },
    })
  })

  // Upper-casing can change the length: ß becomes SS.
  // 大文字化で長さが変わることがある(ß → SS)。
  it('tx_upper turns "straße" into "STRASSE"', async () => {
    const res = await queryParamsApp.request(`/params?tx_upper=${encodeURIComponent('straße')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_upper: { valueType: 'string', valueText: 'STRASSE' },
    })
  })

  // x-normalize: NFKC folds half-width kana to full width.
  // x-normalize: NFKC は半角カナを全角に正規化する。
  it('tx_normalize turns "ﾊﾝｶｸ" into "ハンカク"', async () => {
    const res = await queryParamsApp.request(`/params?tx_normalize=${encodeURIComponent('ﾊﾝｶｸ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_normalize: { valueType: 'string', valueText: 'ハンカク' },
    })
  })

  // NFKC folds a full-width Latin letter to ASCII.
  // NFKC は全角英字を ASCII に正規化する。
  it('tx_normalize turns "Ａ" into "A"', async () => {
    const res = await queryParamsApp.request(`/params?tx_normalize=${encodeURIComponent('Ａ')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_normalize: { valueType: 'string', valueText: 'A' },
    })
  })

  // NFKC composes a letter and its combining accent into one code point.
  // NFKC は文字と結合アクセントを1つのコードポイントに合成する。
  it('tx_normalize turns "e\\u0301" into "\\u00E9"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_normalize=${encodeURIComponent('e\u0301')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_normalize: { valueType: 'string', valueText: '\u00E9' },
    })
  })

  // NFKC expands a ligature.
  // NFKC は合字を展開する。
  it('tx_normalize turns "㍻" into "平成"', async () => {
    const res = await queryParamsApp.request(`/params?tx_normalize=${encodeURIComponent('㍻')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_normalize: { valueType: 'string', valueText: '平成' },
    })
  })

  // A transform paired with a format: the value is trimmed, then checked as an email.
  // Untrimmed, it would fail the check.
  // 変換とフォーマットの組み合わせ。トリムした後、メールアドレスとして検証される。
  // トリムしなければ検証に失敗する値である。
  it('tx_email_trim turns "  user@example.com  " into "user@example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_email_trim=${encodeURIComponent('  user@example.com  ')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_email_trim: { valueType: 'string', valueText: 'user@example.com' },
    })
  })

  // Trimmed, then checked as a UUID.
  // トリムした後、UUID として検証される。
  it('tx_uuid_trim turns "  0190b1f4-0000-7000-8000-000000000000  " into "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_uuid_trim=${encodeURIComponent('  0190b1f4-0000-7000-8000-000000000000  ')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_uuid_trim: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // Lower-cased, then checked as an email.
  // 小文字化した後、メールアドレスとして検証される。
  it('tx_email_lower turns "USER@EXAMPLE.COM" into "user@example.com"', async () => {
    const res = await queryParamsApp.request(
      `/params?tx_email_lower=${encodeURIComponent('USER@EXAMPLE.COM')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tx_email_lower: { valueType: 'string', valueText: 'user@example.com' },
    })
  })
})

// A numeric or boolean enum / const names a typed value, and the wire delivers text: the
// literal used to be matched against the raw string, so every such request was rejected.
// 数値・真偽値の enum / const は型付きの値を指すが、ワイヤが運ぶのは文字列である。
// かつてはリテラルを生の文字列と比較していたため、該当リクエストはすべて拒否されていた。
describe('literals: enum, const and oneOf', () => {
  // The first member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最初のメンバー。
  it('ienum accepts "1"', async () => {
    const res = await queryParamsApp.request('/literals?ienum=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: { valueType: 'number', valueText: '1' },
    })
  })

  // The last member of enum: [1, 2, 3].
  // enum: [1, 2, 3] の最後のメンバー。
  it('ienum accepts "3"', async () => {
    const res = await queryParamsApp.request('/literals?ienum=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: { valueType: 'number', valueText: '3' },
    })
  })

  // A member of the number enum [1.5, 2.5].
  // number の enum [1.5, 2.5] のメンバー。
  it('nenum accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/literals?nenum=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nenum: { valueType: 'number', valueText: '1.5' },
    })
  })

  // The other member of the number enum.
  // number の enum のもう一方のメンバー。
  it('nenum accepts "2.5"', async () => {
    const res = await queryParamsApp.request('/literals?nenum=2.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nenum: { valueType: 'number', valueText: '2.5' },
    })
  })

  // The only member of the boolean enum [true].
  // boolean の enum [true] の唯一のメンバー。
  it('benum accepts "true"', async () => {
    const res = await queryParamsApp.request('/literals?benum=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      benum: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The constant of const: 7.
  // const: 7 の定数値。
  it('iconst accepts "7"', async () => {
    const res = await queryParamsApp.request('/literals?iconst=7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      iconst: { valueType: 'number', valueText: '7' },
    })
  })

  // A member of the string enum [asc, desc].
  // string の enum [asc, desc] のメンバー。
  it('senum accepts "asc"', async () => {
    const res = await queryParamsApp.request('/literals?senum=asc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      senum: { valueType: 'string', valueText: 'asc' },
    })
  })

  // The other member of the string enum.
  // string の enum のもう一方のメンバー。
  it('senum accepts "desc"', async () => {
    const res = await queryParamsApp.request('/literals?senum=desc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      senum: { valueType: 'string', valueText: 'desc' },
    })
  })

  // The constant of const: fixed.
  // const: fixed の定数値。
  it('sconst accepts "fixed"', async () => {
    const res = await queryParamsApp.request('/literals?sconst=fixed')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      sconst: { valueType: 'string', valueText: 'fixed' },
    })
  })

  // A member of a string enum that looks like a number stays text.
  // 数値に見える string enum のメンバーは、文字列のまま届く。
  it('numericsenum accepts "1"', async () => {
    const res = await queryParamsApp.request('/literals?numericsenum=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numericsenum: { valueType: 'string', valueText: '1' },
    })
  })

  // The leading zero is part of the text and is kept.
  // 先頭のゼロは文字列の一部であり、保持される。
  it('numericsenum accepts "02"', async () => {
    const res = await queryParamsApp.request('/literals?numericsenum=02')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numericsenum: { valueType: 'string', valueText: '02' },
    })
  })

  // A member that looks like a boolean stays text.
  // 真偽値に見えるメンバーも、文字列のまま届く。
  it('numericsenum accepts "true"', async () => {
    const res = await queryParamsApp.request('/literals?numericsenum=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      numericsenum: { valueType: 'string', valueText: 'true' },
    })
  })

  // type: [integer, null] accepts an integer.
  // type: [integer, null] は integer を受理する。
  it('inull accepts "3"', async () => {
    const res = await queryParamsApp.request('/literals?inull=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull: { valueType: 'number', valueText: '3' },
    })
  })

  // The text "null" is the value null: the schema takes null and no string, so the text can
  // mean nothing else.
  // テキスト "null" は値 null である。スキーマは null を受理し文字列を受理しないため、
  // このテキストに他の意味はない。
  it('inull accepts "null"', async () => {
    const res = await queryParamsApp.request('/literals?inull=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull: { valueType: 'null', valueText: 'null' },
    })
  })

  // type: [boolean, null] accepts a boolean.
  // type: [boolean, null] は boolean を受理する。
  it('bnull accepts "true"', async () => {
    const res = await queryParamsApp.request('/literals?bnull=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bnull: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // The text "null" is the value null for a boolean as well.
  // boolean の場合も、テキスト "null" は値 null である。
  it('bnull accepts "null"', async () => {
    const res = await queryParamsApp.request('/literals?bnull=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bnull: { valueType: 'null', valueText: 'null' },
    })
  })

  // oneOf an integer or null: the integer branch coerces.
  // integer または null の oneOf。integer 側の分岐は coerce される。
  it('nullof accepts "4"', async () => {
    const res = await queryParamsApp.request('/literals?nullof=4')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nullof: { valueType: 'number', valueText: '4' },
    })
  })

  // null declared as a branch of its own is read the same way.
  // null が独立した分岐として宣言されていても、同じように読まれる。
  it('nullof accepts "null"', async () => {
    const res = await queryParamsApp.request('/literals?nullof=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nullof: { valueType: 'null', valueText: 'null' },
    })
  })

  // An element of an array is read like a scalar.
  // 配列の要素は、スカラーと同じように読まれる。
  it('inull_arr accepts "1" and "null"', async () => {
    const res = await queryParamsApp.request('/literals?inull_arr=1&inull_arr=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull_arr: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'null', valueText: 'null' },
      ],
    })
  })

  // The elements of inull_list are integers, which the text "null" is not: it is the array
  // that is null.
  // inull_list の要素は integer であり、テキスト "null" は要素になりえない。null なのは
  // 配列そのものである。
  it('inull_list accepts "null" as the array', async () => {
    const res = await queryParamsApp.request('/literals?inull_list=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull_list: { valueType: 'null', valueText: 'null' },
    })
  })

  // The same array with elements.
  // 同じ配列に要素がある場合。
  it('inull_list accepts "1" and "2"', async () => {
    const res = await queryParamsApp.request('/literals?inull_list=1&inull_list=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      inull_list: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // A string takes every text, "null" included: it stays the string it is.
  // 文字列はあらゆるテキストを受理する。"null" も例外ではなく、文字列のまま届く。
  it('snull accepts "null" as a string', async () => {
    const res = await queryParamsApp.request('/literals?snull=null')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      snull: { valueType: 'string', valueText: 'null' },
    })
  })

  // oneOf an integer or "all": the integer branch coerces.
  // integer または "all" の oneOf。integer 側の分岐は coerce される。
  it('ioneof accepts "4"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=4')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ioneof: { valueType: 'number', valueText: '4' },
    })
  })

  // A negative integer matches the integer branch.
  // 負の整数も integer 側に一致する。
  it('ioneof accepts "-3"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=-3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ioneof: { valueType: 'number', valueText: '-3' },
    })
  })

  // The string branch needs no coercion and arrives as a string.
  // string 側は coerce 不要で、string として届く。
  it('ioneof accepts "all"', async () => {
    const res = await queryParamsApp.request('/literals?ioneof=all')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ioneof: { valueType: 'string', valueText: 'all' },
    })
  })

  // An array whose items are an integer enum: each element is coerced, then matched.
  // 要素が integer の enum である配列。各要素は coerce された後に照合される。
  it('ienum_arr accepts members of the enum', async () => {
    const res = await queryParamsApp.request('/literals?ienum_arr=1&ienum_arr=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum_arr: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // An array whose items are a string enum.
  // 要素が string の enum である配列。
  it('senum_arr accepts members of the enum', async () => {
    const res = await queryParamsApp.request('/literals?senum_arr=asc&senum_arr=desc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      senum_arr: [
        { valueType: 'string', valueText: 'asc' },
        { valueType: 'string', valueText: 'desc' },
      ],
    })
  })

  // All of them together, each coerced to the value it names.
  // すべてを同時に送信する。それぞれが、指し示す値に coerce される。
  it('accepts every literal in one request', async () => {
    const res = await queryParamsApp.request(
      '/literals?ienum=2&nenum=2.5&benum=true&iconst=7&senum=asc&sconst=fixed&inull=3&ioneof=4',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ienum: { valueType: 'number', valueText: '2' },
      nenum: { valueType: 'number', valueText: '2.5' },
      benum: { valueType: 'boolean', valueText: 'true' },
      iconst: { valueType: 'number', valueText: '7' },
      senum: { valueType: 'string', valueText: 'asc' },
      sconst: { valueType: 'string', valueText: 'fixed' },
      inull: { valueType: 'number', valueText: '3' },
      ioneof: { valueType: 'number', valueText: '4' },
    })
  })
})

// date-time and time are RFC 3339 values, so an offset is valid beside Z. The extensions
// narrow what is accepted: x-isoOffset: false takes the offset back, x-isoPrecision fixes the
// number of fractional digits, x-isoLocal lets the zone be left out.
// date-time と time は RFC 3339 の値であり、Z と同様にオフセットも有効である。拡張は受理する
// 範囲を絞り込む。x-isoOffset: false はオフセットを無効に戻し、x-isoPrecision は小数部の桁数を
// 固定し、x-isoLocal はゾーンの省略を許す。
describe('iso: date-time and time with their extensions', () => {
  // x-isoOffset: false takes Z.

  // x-isoOffset: false は Z を受理する。
  it('datetime_z accepts "2020-01-02T03:04:05Z"', async () => {
    const res = await queryParamsApp.request(
      `/iso?datetime_z=${encodeURIComponent('2020-01-02T03:04:05Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_z: { valueType: 'string', valueText: '2020-01-02T03:04:05Z' },
    })
  })

  // x-isoPrecision: 3 takes three fractional digits.

  // x-isoPrecision: 3 は、小数部3桁を受理する。
  it('datetime_p3 accepts "2020-01-02T03:04:05.123Z"', async () => {
    const res = await queryParamsApp.request(
      `/iso?datetime_p3=${encodeURIComponent('2020-01-02T03:04:05.123Z')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_p3: { valueType: 'string', valueText: '2020-01-02T03:04:05.123Z' },
    })
  })

  // The precision says nothing of the zone: an offset is still valid.

  // 精度はゾーンについて何も定めない。オフセットは引き続き有効である。
  it('datetime_p3 accepts "2020-01-02T03:04:05.123+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/iso?datetime_p3=${encodeURIComponent('2020-01-02T03:04:05.123+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_p3: { valueType: 'string', valueText: '2020-01-02T03:04:05.123+09:00' },
    })
  })

  // x-isoLocal: true lets the zone be left out.

  // x-isoLocal: true は、ゾーンの省略を許す。
  it('datetime_local accepts "2020-01-02T03:04:05"', async () => {
    const res = await queryParamsApp.request(
      `/iso?datetime_local=${encodeURIComponent('2020-01-02T03:04:05')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_local: { valueType: 'string', valueText: '2020-01-02T03:04:05' },
    })
  })

  // A zone is still valid when it is given.

  // ゾーンが指定された場合も、引き続き有効である。
  it('datetime_local accepts "2020-01-02T03:04:05+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/iso?datetime_local=${encodeURIComponent('2020-01-02T03:04:05+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      datetime_local: { valueType: 'string', valueText: '2020-01-02T03:04:05+09:00' },
    })
  })

  // A time without a zone.

  // ゾーンなしの時刻。
  it('time_any accepts "12:34:56"', async () => {
    const res = await queryParamsApp.request(`/iso?time_any=${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // A time in UTC.

  // UTC の時刻。
  it('time_any accepts "12:34:56Z"', async () => {
    const res = await queryParamsApp.request(`/iso?time_any=${encodeURIComponent('12:34:56Z')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34:56Z' },
    })
  })

  // A time ahead of UTC.

  // UTC より進んだ時刻。
  it('time_any accepts "12:34:56+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/iso?time_any=${encodeURIComponent('12:34:56+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34:56+09:00' },
    })
  })

  // A time behind UTC, by an offset that is not a whole hour.

  // UTC より遅れた時刻。オフセットは1時間単位ではない。
  it('time_any accepts "12:34:56-05:30"', async () => {
    const res = await queryParamsApp.request(
      `/iso?time_any=${encodeURIComponent('12:34:56-05:30')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34:56-05:30' },
    })
  })

  // The seconds are optional, with a zone as without.

  // 秒は省略できる。ゾーンがあっても同様である。
  it('time_any accepts "12:34Z"', async () => {
    const res = await queryParamsApp.request(`/iso?time_any=${encodeURIComponent('12:34Z')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34Z' },
    })
  })

  // Fractional seconds before an offset.

  // オフセットの前に小数秒がある。
  it('time_any accepts "12:34:56.789+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/iso?time_any=${encodeURIComponent('12:34:56.789+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '12:34:56.789+09:00' },
    })
  })

  // The largest offset.

  // 最大のオフセット。
  it('time_any accepts "23:59:59+23:59"', async () => {
    const res = await queryParamsApp.request(
      `/iso?time_any=${encodeURIComponent('23:59:59+23:59')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_any: { valueType: 'string', valueText: '23:59:59+23:59' },
    })
  })

  // x-isoOffset: false takes a time without a zone.

  // x-isoOffset: false は、ゾーンなしの時刻を受理する。
  it('time_z accepts "12:34:56"', async () => {
    const res = await queryParamsApp.request(`/iso?time_z=${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_z: { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // x-isoPrecision: 0 takes whole seconds.

  // x-isoPrecision: 0 は、整数の秒を受理する。
  it('time_p0 accepts "12:34:56"', async () => {
    const res = await queryParamsApp.request(`/iso?time_p0=${encodeURIComponent('12:34:56')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_p0: { valueType: 'string', valueText: '12:34:56' },
    })
  })

  // Whole seconds in UTC.

  // UTC の整数秒。
  it('time_p0 accepts "12:34:56Z"', async () => {
    const res = await queryParamsApp.request(`/iso?time_p0=${encodeURIComponent('12:34:56Z')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_p0: { valueType: 'string', valueText: '12:34:56Z' },
    })
  })

  // Whole seconds with an offset.

  // オフセット付きの整数秒。
  it('time_p0 accepts "12:34:56+09:00"', async () => {
    const res = await queryParamsApp.request(`/iso?time_p0=${encodeURIComponent('12:34:56+09:00')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_p0: { valueType: 'string', valueText: '12:34:56+09:00' },
    })
  })

  // x-isoPrecision: 3 takes three fractional digits.

  // x-isoPrecision: 3 は、小数部3桁を受理する。
  it('time_p3 accepts "12:34:56.789"', async () => {
    const res = await queryParamsApp.request(`/iso?time_p3=${encodeURIComponent('12:34:56.789')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_p3: { valueType: 'string', valueText: '12:34:56.789' },
    })
  })

  // Three fractional digits in UTC.

  // UTC の小数部3桁。
  it('time_p3 accepts "12:34:56.789Z"', async () => {
    const res = await queryParamsApp.request(`/iso?time_p3=${encodeURIComponent('12:34:56.789Z')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_p3: { valueType: 'string', valueText: '12:34:56.789Z' },
    })
  })

  // x-isoPrecision: -1 takes hours and minutes.

  // x-isoPrecision: -1 は、時と分を受理する。
  it('time_minute accepts "12:34"', async () => {
    const res = await queryParamsApp.request(`/iso?time_minute=${encodeURIComponent('12:34')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_minute: { valueType: 'string', valueText: '12:34' },
    })
  })

  // Hours and minutes with an offset.

  // オフセット付きの時と分。
  it('time_minute accepts "12:34+09:00"', async () => {
    const res = await queryParamsApp.request(
      `/iso?time_minute=${encodeURIComponent('12:34+09:00')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      time_minute: { valueType: 'string', valueText: '12:34+09:00' },
    })
  })
})

// /inherited declares parameters named like what every object inherits. The request object
// answers to toString and valueOf whether they were sent or not, and what it answers with is
// not a value of the parameter.
// /inherited は、すべてのオブジェクトが継承するものと同じ名前のパラメータを宣言している。
// リクエストオブジェクトは、送信の有無にかかわらず toString や valueOf に応答するが、
// その応答はパラメータの値ではない。
describe('inherited: parameters named like what every object inherits', () => {
  // The body is compared as text: the names under test are what toStrictEqual itself relies on.

  // ボディは文字列として比較する。テスト対象の名前は、toStrictEqual 自身が利用するものである。
  it('toString accepts "a", and valueOf falls back to its default', async () => {
    const res = await queryParamsApp.request('/inherited?toString=a')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '{"toString":{"valueType":"string","valueText":"a"},"valueOf":{"valueType":"number","valueText":"3"}}',
    )
  })

  // A value that is sent is read like any other.

  // 送信された値は、他のパラメータと同じように読まれる。
  it('valueOf accepts "7" over its default', async () => {
    const res = await queryParamsApp.request('/inherited?toString=a&valueOf=7')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '{"toString":{"valueType":"string","valueText":"a"},"valueOf":{"valueType":"number","valueText":"7"}}',
    )
  })

  // A boolean under an inherited name.

  // 継承される名前を持つ boolean。
  it('hasOwnProperty accepts "true"', async () => {
    const res = await queryParamsApp.request('/inherited?toString=a&hasOwnProperty=true')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '{"toString":{"valueType":"string","valueText":"a"},"valueOf":{"valueType":"number","valueText":"3"},"hasOwnProperty":{"valueType":"boolean","valueText":"true"}}',
    )
  })

  // An array under an inherited name.

  // 継承される名前を持つ配列。
  it('isPrototypeOf accepts "1" and "2"', async () => {
    const res = await queryParamsApp.request(
      '/inherited?toString=a&isPrototypeOf=1&isPrototypeOf=2',
    )
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '{"toString":{"valueType":"string","valueText":"a"},"valueOf":{"valueType":"number","valueText":"3"},"isPrototypeOf":[{"valueType":"number","valueText":"1"},{"valueType":"number","valueText":"2"}]}',
    )
  })

  // allowEmptyValue applies under an inherited name as well.

  // allowEmptyValue は、継承される名前でも適用される。
  it('toLocaleString reads an empty value as absent', async () => {
    const res = await queryParamsApp.request('/inherited?toString=a&toLocaleString=')
    expect(res.status).toBe(200)
    expect(await res.text()).toBe(
      '{"toString":{"valueType":"string","valueText":"a"},"valueOf":{"valueType":"number","valueText":"3"}}',
    )
  })
})

// /optional declares every parameter without required: true.
// /optional は、すべてのパラメータを required: true なしで宣言している。
describe('optional: absent and present', () => {
  // An absent optional parameter is absent from the validated object: the key is not there at
  // all, which exactOptional guarantees and a value of undefined would not.
  // 省略された任意パラメータは、検証済みオブジェクトにも存在しない。
  // キー自体が無いことは exactOptional が保証するもので、値が undefined の場合とは異なる。
  it('answers nothing when nothing is sent', async () => {
    const res = await queryParamsApp.request('/optional')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // "/optional?" carries no parameter either.
  // "/optional?" もパラメータを1つも運ばない。
  it('answers nothing to an empty query string', async () => {
    const res = await queryParamsApp.request('/optional?')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // An optional integer that is sent is coerced like a required one.
  // 送信された任意の integer は、必須の場合と同じく coerce される。
  it('int_opt accepts "5"', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '5' },
    })
  })

  // An optional int64 keeps its precision.
  // 任意の int64 も桁落ちしない。
  it('int64_opt accepts "9007199254740993"', async () => {
    const res = await queryParamsApp.request('/optional?int64_opt=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64_opt: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // An optional number.
  // 任意の number。
  it('num_opt accepts "1.5"', async () => {
    const res = await queryParamsApp.request('/optional?num_opt=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      num_opt: { valueType: 'number', valueText: '1.5' },
    })
  })

  // An optional boolean sent as false arrives as false, not as absent.
  // false として送信された任意の boolean は、省略扱いではなく false として届く。
  it('bool_opt accepts "false"', async () => {
    const res = await queryParamsApp.request('/optional?bool_opt=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      bool_opt: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // An optional string.
  // 任意の string。
  it('str_opt accepts "a"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // An optional string with a format.
  // フォーマット付きの任意の string。
  it('uuid_opt accepts "0190b1f4-0000-7000-8000-000000000000"', async () => {
    const res = await queryParamsApp.request(
      '/optional?uuid_opt=0190b1f4-0000-7000-8000-000000000000',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      uuid_opt: { valueType: 'string', valueText: '0190b1f4-0000-7000-8000-000000000000' },
    })
  })

  // An optional array.
  // 任意の配列。
  it('arr_opt accepts two values', async () => {
    const res = await queryParamsApp.request('/optional?arr_opt=1&arr_opt=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      arr_opt: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // An undeclared parameter is neither rejected nor passed on to the handler.
  // 宣言されていないパラメータは、拒否もされず、ハンドラにも渡されない。
  it('ignores a parameter the spec does not declare', async () => {
    const res = await queryParamsApp.request('/optional?unknown=1&int_opt=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '2' },
    })
  })
})

// /defaults declares every parameter with a default.
// /defaults は、すべてのパラメータをデフォルト値付きで宣言している。
describe('defaults', () => {
  // A default is a typed value: default: 5 on an int64 arrives as the bigint 5n, not as the
  // number the YAML held, and default: [1, 2] as an array of numbers.
  // デフォルトは型付きの値である。int64 の default: 5 は、
  // YAML 上の number ではなく bigint の 5n として届き、
  // default: [1, 2] は number の配列として届く。
  it('applies every default when nothing is sent', async () => {
    const res = await queryParamsApp.request('/defaults')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // Only int_def changes; the other defaults still apply.
  // 変わるのは int_def だけで、他のデフォルトは引き続き適用される。
  it('lets a sent integer replace its default', async () => {
    const res = await queryParamsApp.request('/defaults?int_def=7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '7' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // The sent value is coerced to a bigint like the default.
  // 送信された値は、デフォルトと同じく bigint に coerce される。
  it('lets a sent int64 replace its default', async () => {
    const res = await queryParamsApp.request('/defaults?int64_def=8')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '8' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // A sent number replaces default: 0.5.
  // 送信された number が default: 0.5 を置き換える。
  it('lets a sent number replace its default', async () => {
    const res = await queryParamsApp.request('/defaults?num_def=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '1' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // bool_def defaults to false.
  // bool_def のデフォルトは false である。
  it('lets true replace a default of false', async () => {
    const res = await queryParamsApp.request('/defaults?bool_def=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'true' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // false is a value, not an absence: a default of true must not win over it.
  // false は値であって欠落ではない。デフォルトの true がこれを上書きしてはならない。
  it('lets false replace a default of true', async () => {
    const res = await queryParamsApp.request('/defaults?bool_def_true=false')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'false' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // Zero is a value, not an absence.
  // 0 は値であって欠落ではない。
  it('lets zero replace a default of 20', async () => {
    const res = await queryParamsApp.request('/defaults?int_def=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '0' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // A sent string replaces default: fallback.
  // 送信された string が default: fallback を置き換える。
  it('lets a sent string replace its default', async () => {
    const res = await queryParamsApp.request('/defaults?str_def=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'x' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // enum_def defaults to asc.
  // enum_def のデフォルトは asc である。
  it('lets a sent member replace an enum default', async () => {
    const res = await queryParamsApp.request('/defaults?enum_def=desc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'desc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // arr_def defaults to [].
  // arr_def のデフォルトは [] である。
  it('lets sent values replace an empty array default', async () => {
    const res = await queryParamsApp.request('/defaults?arr_def=a&arr_def=b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: 'b' },
      ],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // The default [1, 2] is replaced, not appended to.
  // デフォルトの [1, 2] は置き換えられる。追記はされない。
  it('lets one sent value replace a two-element array default', async () => {
    const res = await queryParamsApp.request('/defaults?arr_int_def=9')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [{ valueType: 'number', valueText: '9' }],
    })
  })

  // An array sent by one request must not become the default of the next: the default is not a
  // shared mutable object.
  // あるリクエストの配列が、次のリクエストのデフォルトになってはならない。
  // デフォルトは共有された可変オブジェクトではない。
  it('hands out a fresh default every time', async () => {
    const first = await queryParamsApp.request('/defaults?arr_def=a&arr_int_def=9')
    expect(first.status).toBe(200)
    const second = await queryParamsApp.request('/defaults')
    expect(second.status).toBe(200)
    expect(await second.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: 'fallback' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })
})

// /required declares id, big, flag, name and tags with required: true, and note without.
// /required は id・big・flag・name・tags を required: true で、
// note を required なしで宣言している。
describe('required', () => {
  // The optional note is left out and is absent from the answer.
  // 任意の note は省略しており、応答にも含まれない。
  it('accepts a request that carries every required parameter', async () => {
    const res = await queryParamsApp.request(
      '/required?id=1&big=9007199254740993&flag=true&name=n&tags=1&tags=2',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '9007199254740993' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: 'n' },
      tags: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // required: false written out behaves like leaving required off.
  // required: false を明記した場合も、required を省略した場合と同じ挙動になる。
  it('accepts the optional parameter beside the required ones', async () => {
    const res = await queryParamsApp.request(
      '/required?id=1&big=9007199254740993&flag=true&name=n&tags=1&tags=2&note=5',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '9007199254740993' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: 'n' },
      tags: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
      note: { valueType: 'number', valueText: '5' },
    })
  })

  // name= is present with an empty value, which a string with no minLength accepts.
  // name= は値が空の状態で存在しており、minLength のない string はこれを受理する。
  it('accepts an empty required string', async () => {
    const res = await queryParamsApp.request('/required?id=1&big=1&flag=true&name=&tags=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      id: { valueType: 'number', valueText: '1' },
      big: { valueType: 'bigint', valueText: '1' },
      flag: { valueType: 'boolean', valueText: 'true' },
      name: { valueType: 'string', valueText: '' },
      tags: [{ valueType: 'number', valueText: '1' }],
    })
  })
})

// The name has to survive from the spec to the validated object, character for character.
// 名前は、仕様から検証済みオブジェクトに至るまで、1文字も変わらず保たれなければならない。
describe('names: parameter names that are not identifiers', () => {
  // A name every object inherits, sent: it is read like any other parameter.
  // すべてのオブジェクトが継承する名前を送信する。他のパラメータと同じように読まれる。
  it('constructor accepts "5"', async () => {
    const res = await queryParamsApp.request('/optional?constructor=5')
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
    const res = await queryParamsApp.request('/optional')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // A hyphen: not a JavaScript identifier, so the generated key has to be quoted.
  // ハイフンを含む名前。JavaScript の識別子ではないため、
  // 生成されるキーは引用符で囲む必要がある。
  it('page-size accepts "10"', async () => {
    const res = await queryParamsApp.request('/optional?page-size=10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'page-size': { valueType: 'number', valueText: '10' },
    })
  })

  // Square brackets, sent unencoded.
  // 角括弧を含む名前。エンコードせずに送信する。
  it('filter[name] accepts "bob"', async () => {
    const res = await queryParamsApp.request('/optional?filter[name]=bob')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'filter[name]': { valueType: 'string', valueText: 'bob' },
    })
  })

  // A client may percent-encode the name; it is the same parameter.
  // クライアントが名前をパーセントエンコードしても、同じパラメータである。
  it('filter[name] accepts "bob" with the brackets encoded', async () => {
    const res = await queryParamsApp.request('/optional?filter%5Bname%5D=bob')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'filter[name]': { valueType: 'string', valueText: 'bob' },
    })
  })

  // A dollar sign, as OData uses.
  // OData で使われる、ドル記号を含む名前。
  it('$top accepts "5"', async () => {
    const res = await queryParamsApp.request('/optional?$top=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      $top: { valueType: 'number', valueText: '5' },
    })
  })

  // %24 is the dollar sign.
  // %24 はドル記号である。
  it('$top accepts "5" with the dollar sign encoded', async () => {
    const res = await queryParamsApp.request('/optional?%24top=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      $top: { valueType: 'number', valueText: '5' },
    })
  })

  // A dot.
  // ドットを含む名前。
  it('user.id accepts "3"', async () => {
    const res = await queryParamsApp.request('/optional?user.id=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'user.id': { valueType: 'number', valueText: '3' },
    })
  })

  // A name that ends in [], the PHP and Rails convention for arrays.
  // [] で終わる名前。PHP や Rails における配列の慣習である。
  it('ids[] accepts two values', async () => {
    const res = await queryParamsApp.request('/optional?ids[]=1&ids[]=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      'ids[]': [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // %5F is "_" and %2D is "-".
  // %5F は "_"、%2D は "-" である。
  it('reads an encoded underscore and hyphen as the same names', async () => {
    const res = await queryParamsApp.request('/optional?str%5Fopt=a&page%2Dsize=10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a' },
      'page-size': { valueType: 'number', valueText: '10' },
    })
  })

  // Names are case-sensitive: the spec declares both, one an integer and one a string.
  // 名前は大文字小文字を区別する。仕様は両方を宣言しており、一方は integer、
  // もう一方は string である。
  it('treats int_opt and Int_Opt as two parameters', async () => {
    const res = await queryParamsApp.request('/optional?Int_Opt=hello&int_opt=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '5' },
      Int_Opt: { valueType: 'string', valueText: 'hello' },
    })
  })

  // A name in a case the spec does not declare is an undeclared parameter.
  // 仕様で宣言されていない大文字小文字の名前は、未宣言のパラメータである。
  it('ignores INT_OPT, which is neither', async () => {
    const res = await queryParamsApp.request('/optional?INT_OPT=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A constraint on a numeric parameter applies to the coerced value, not to the text on the
// wire.
// 数値パラメータの制約は、ワイヤ上の文字列ではなく coerce 後の値に適用される。
describe('constraints', () => {
  // A constraint does not make a parameter required.
  // 制約を付けても、パラメータは必須にならない。
  it('answers nothing when nothing is sent', async () => {
    const res = await queryParamsApp.request('/limits')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // The minimum of minimum: 1, maximum: 100 is inclusive.
  // minimum: 1, maximum: 100 の最小値は範囲に含まれる。
  it('range accepts "1"', async () => {
    const res = await queryParamsApp.request('/limits?range=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '1' },
    })
  })

  // Inside the range. Compared as text, "9" would sort after "100" and be refused.
  // 範囲内の値。文字列として比較すると "9" は "100" より後に並び、拒否されてしまう。
  it('range accepts "9"', async () => {
    const res = await queryParamsApp.request('/limits?range=9')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '9' },
    })
  })

  // The maximum is inclusive.
  // 最大値は範囲に含まれる。
  it('range accepts "100"', async () => {
    const res = await queryParamsApp.request('/limits?range=100')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      range: { valueType: 'number', valueText: '100' },
    })
  })

  // Just above exclusiveMinimum: 0.
  // exclusiveMinimum: 0 をわずかに超える値。
  it('exclusive accepts "0.0001"', async () => {
    const res = await queryParamsApp.request('/limits?exclusive=0.0001')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      exclusive: { valueType: 'number', valueText: '0.0001' },
    })
  })

  // Just below exclusiveMaximum: 1.
  // exclusiveMaximum: 1 をわずかに下回る値。
  it('exclusive accepts "0.9999"', async () => {
    const res = await queryParamsApp.request('/limits?exclusive=0.9999')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      exclusive: { valueType: 'number', valueText: '0.9999' },
    })
  })

  // Zero is a multiple of every number.
  // 0 はあらゆる数の倍数である。
  it('multiple accepts "0"', async () => {
    const res = await queryParamsApp.request('/limits?multiple=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multiple: { valueType: 'number', valueText: '0' },
    })
  })

  // A negative multiple of 5.
  // 5 の負の倍数。
  it('multiple accepts "-5"', async () => {
    const res = await queryParamsApp.request('/limits?multiple=-5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multiple: { valueType: 'number', valueText: '-5' },
    })
  })

  // Twice the step of multipleOf: 5.
  // multipleOf: 5 のステップの2倍。
  it('multiple accepts "10"', async () => {
    const res = await queryParamsApp.request('/limits?multiple=10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multiple: { valueType: 'number', valueText: '10' },
    })
  })

  // The minimum of an int64 range; the bound is emitted as the bigint literal 1n.
  // int64 の範囲の最小値。境界値は bigint リテラル 1n として生成される。
  it('int64range accepts "1"', async () => {
    const res = await queryParamsApp.request('/limits?int64range=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64range: { valueType: 'bigint', valueText: '1' },
    })
  })

  // The maximum of an int64 range, emitted as 100n.
  // int64 の範囲の最大値。100n として生成される。
  it('int64range accepts "100"', async () => {
    const res = await queryParamsApp.request('/limits?int64range=100')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64range: { valueType: 'bigint', valueText: '100' },
    })
  })

  // Exactly minLength: 2.
  // ちょうど minLength: 2 の長さ。
  it('length accepts "ab"', async () => {
    const res = await queryParamsApp.request('/limits?length=ab')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: 'ab' },
    })
  })

  // Exactly maxLength: 4.
  // ちょうど maxLength: 4 の長さ。
  it('length accepts "abcd"', async () => {
    const res = await queryParamsApp.request('/limits?length=abcd')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: 'abcd' },
    })
  })

  // Two emoji are two characters, though four UTF-16 code units: length counts characters.
  // 絵文字2つは2文字である(UTF-16 では 4 コードユニット)。長さは文字数で数える。
  it('length accepts "🔥🔥"', async () => {
    const res = await queryParamsApp.request(`/limits?length=${encodeURIComponent('🔥🔥')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      length: { valueType: 'string', valueText: '🔥🔥' },
    })
  })

  // Matches ^[a-z]+-\d{1,3}$ with one digit.
  // ^[a-z]+-\d{1,3}$ に数字1桁で一致する。
  it('pattern accepts "abc-1"', async () => {
    const res = await queryParamsApp.request('/limits?pattern=abc-1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pattern: { valueType: 'string', valueText: 'abc-1' },
    })
  })

  // Matches with three digits, the most allowed.
  // 許容される最大の数字3桁で一致する。
  it('pattern accepts "abc-123"', async () => {
    const res = await queryParamsApp.request('/limits?pattern=abc-123')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pattern: { valueType: 'string', valueText: 'abc-123' },
    })
  })

  // items has minItems: 2 and maxItems: 3.
  // items は minItems: 2・maxItems: 3 である。
  it('items accepts two elements, its minItems', async () => {
    const res = await queryParamsApp.request('/limits?items=1&items=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      items: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // The upper bound is inclusive.
  // 上限は範囲に含まれる。
  it('items accepts three elements, its maxItems', async () => {
    const res = await queryParamsApp.request('/limits?items=1&items=2&items=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      items: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // A single element cannot repeat.
  // 要素が1つなら重複は起こらない。
  it('unique accepts one element', async () => {
    const res = await queryParamsApp.request('/limits?unique=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      unique: [{ valueType: 'number', valueText: '1' }],
    })
  })

  // uniqueItems: true with two different values.
  // uniqueItems: true に対して、異なる2つの値。
  it('unique accepts distinct elements', async () => {
    const res = await queryParamsApp.request('/limits?unique=1&unique=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      unique: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // Each element has minimum: 1 and maximum: 9.
  // 各要素は minimum: 1・maximum: 9 である。
  it('ranged_items accepts elements at both bounds', async () => {
    const res = await queryParamsApp.request('/limits?ranged_items=1&ranged_items=9')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ranged_items: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '9' },
      ],
    })
  })
})

// The query string is sent exactly as written in each test, because the wire format itself is
// the subject.
// ワイヤ形式そのものが検証対象のため、各テストではクエリ文字列を書かれたとおりに送信する。
describe('wire: encoding, separators and repetition', () => {
  // An encoded space.
  // エンコードされた空白。
  it('decodes str_opt=a%20b to "a b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%20b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a b' },
    })
  })

  // In a query string a plus sign is a space.
  // クエリ文字列では、プラス記号は空白を表す。
  it('decodes str_opt=a+b to "a b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a+b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a b' },
    })
  })

  // %2B is how a plus sign itself is written.
  // プラス記号そのものは %2B と書く。
  it('decodes str_opt=a%2Bb to "a+b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%2Bb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a+b' },
    })
  })

  // Encoded "&" and "=" are part of the value.
  // エンコードされた "&" と "=" は値の一部である。
  it('decodes str_opt=a%26b%3Dc to "a&b=c"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%26b%3Dc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a&b=c' },
    })
  })

  // Only the first "=" separates the name from the value.
  // 名前と値を区切るのは最初の "=" だけである。
  it('decodes str_opt=a=b to "a=b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a=b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a=b' },
    })
  })

  // An encoded slash.
  // エンコードされたスラッシュ。
  it('decodes str_opt=a%2Fb to "a/b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%2Fb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a/b' },
    })
  })

  // A slash needs no encoding in a query string.
  // クエリ文字列では、スラッシュのエンコードは不要である。
  it('decodes str_opt=a/b to "a/b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a/b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a/b' },
    })
  })

  // An encoded question mark.
  // エンコードされた疑問符。
  it('decodes str_opt=a%3Fb to "a?b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%3Fb')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a?b' },
    })
  })

  // A second question mark is part of the value.
  // 2つ目の疑問符は値の一部である。
  it('decodes str_opt=a?b to "a?b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a?b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a?b' },
    })
  })

  // An encoded hash does not start the fragment.
  // エンコードされたハッシュ記号は、フラグメントの開始にならない。
  it('decodes str_opt=a%23b to "a#b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%23b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a#b' },
    })
  })

  // An encoded percent sign.
  // エンコードされたパーセント記号。
  it('decodes str_opt=a%25b to "a%b"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a%25b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a%b' },
    })
  })

  // A three-byte UTF-8 sequence.
  // 3バイトの UTF-8 シーケンス。
  it('decodes str_opt=%E3%81%82 to "あ"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%E3%81%82')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'あ' },
    })
  })

  // A four-byte UTF-8 sequence.
  // 4バイトの UTF-8 シーケンス。
  it('decodes str_opt=%F0%9F%94%A5 to "🔥"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%F0%9F%94%A5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '🔥' },
    })
  })

  // Lower-case hexadecimal digits decode the same.
  // 16進数が小文字でも同じようにデコードされる。
  it('decodes str_opt=%e3%81%82 to "あ"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%e3%81%82')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'あ' },
    })
  })

  // The value is decoded once: %2520 is the encoding of "%20", not of a space.
  // デコードは1回だけ行われる。%2520 は "%20" のエンコードであり、空白のエンコードではない。
  it('decodes str_opt=%2520 to "%20"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%2520')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '%20' },
    })
  })

  // A lone percent sign cannot be decoded and is delivered as it was sent.
  // 単独のパーセント記号はデコードできず、送信時のまま届く。
  it('decodes str_opt=% to "%"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '%' },
    })
  })

  // An escape that is not hexadecimal is delivered as it was sent.
  // 16進数でないエスケープは、送信時のまま届く。
  it('decodes str_opt=%ZZ to "%ZZ"', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=%ZZ')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '%ZZ' },
    })
  })

  // An empty value is the empty string, not an absent parameter.
  // 空の値は空文字列であり、パラメータの省略ではない。
  it('decodes str_opt= to ""', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '' },
    })
  })

  // A name with no "=" is a parameter with an empty value, not an absent one.
  // "=" のない名前は、値が空のパラメータであり、省略されたパラメータではない。
  it('reads a bare name as the empty string', async () => {
    const res = await queryParamsApp.request('/optional?str_opt')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: '' },
    })
  })

  // "#int_opt=x" is the fragment, not part of the query, so the invalid value in it is never
  // seen.
  // "#int_opt=x" はフラグメントであり、クエリの一部ではない。そのため、
  // その中の不正な値は検証されない。
  it('stops at the fragment', async () => {
    const res = await queryParamsApp.request('/optional?str_opt=a#int_opt=x')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      str_opt: { valueType: 'string', valueText: 'a' },
    })
  })

  // %2B14155552671 decodes to "+14155552671", which is what the E.164 check sees.
  // %2B14155552671 は "+14155552671" にデコードされ、E.164 の検証はその値に対して行われる。
  it('validates the decoded value', async () => {
    const res = await queryParamsApp.request('/params?e164=%2B14155552671')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      e164: { valueType: 'string', valueText: '+14155552671' },
    })
  })

  // An empty pair is skipped.
  // 空のペアは無視される。
  it('tolerates a trailing ampersand', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1&')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
    })
  })

  // An empty pair is skipped.
  // 空のペアは無視される。
  it('tolerates a leading ampersand', async () => {
    const res = await queryParamsApp.request('/optional?&int_opt=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
    })
  })

  // The empty pair between two parameters is skipped.
  // 2つのパラメータの間にある空のペアは無視される。
  it('tolerates a doubled ampersand', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1&&num_opt=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
      num_opt: { valueType: 'number', valueText: '2' },
    })
  })

  // "=5" has a value and no name, so it belongs to no parameter.
  // "=5" は値だけがあり名前がないため、どのパラメータにも属さない。
  it('ignores a pair with no name', async () => {
    const res = await queryParamsApp.request('/optional?=5&int_opt=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_opt: { valueType: 'number', valueText: '1' },
    })
  })

  // Hono answers HEAD through the GET route, so the parameter is validated the same way: a
  // valid one is accepted.
  // Hono は HEAD を GET のルートで処理するため、パラメータは同じように検証される。
  // 有効な値は受理される。
  it('validates a HEAD request like the GET it mirrors', async () => {
    const res = await queryParamsApp.request('/optional?int_opt=1', { method: 'HEAD' })
    expect(res.status).toBe(200)
  })

  // One request must not change the next: no state is kept between validations.
  // あるリクエストが次のリクエストに影響しないこと。検証間で状態は保持されない。
  it('gives the same answer to the same request, whatever came between', async () => {
    const first = await queryParamsApp.request('/params?int64=9007199254740993')
    const between = await queryParamsApp.request('/params?int64=not-a-value')
    expect(between.status).toBe(422)
    const second = await queryParamsApp.request('/params?int64=9007199254740993')
    expect(second.status).toBe(200)
    expect(await second.json()).toStrictEqual(await first.json())
  })
})

// allowEmptyValue: true lets a parameter be sent with no value, ?empty_ok=, to say the same as
// leaving it out. empty_def and ref_def have a default, 7 and 3, so they are in every answer of
// /absent.
// allowEmptyValue: true を指定すると、パラメータを値なしで送信でき(?empty_ok=)、省略したのと
// 同じ意味になる。empty_def と ref_def にはデフォルト値(7 と 3)があるため、/absent の応答には
// 必ず含まれる。
describe('absent: an empty value that stands for none, and a default beside a reference', () => {
  // The parameter is sent, and says nothing: it is left out of what the handler receives.
  // パラメータは送信されているが、値を指定していない。ハンドラが受け取る値からは除かれる。
  it('empty_ok reads an empty value as absent', async () => {
    const res = await queryParamsApp.request('/absent?empty_ok=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // With no "=" the value is empty too.
  // "=" がない場合も、値は空になる。
  it('empty_ok reads a bare name as absent', async () => {
    const res = await queryParamsApp.request('/absent?empty_ok')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // A value that is there is read as usual.
  // 値が指定されていれば、通常どおり読み取られる。
  it('empty_ok reads a value that is sent', async () => {
    const res = await queryParamsApp.request('/absent?empty_ok=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_ok: { valueType: 'number', valueText: '5' },
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // The empty value is read as absent, so the default of 7 applies.
  // 空の値は「指定なし」として読み取られるため、デフォルトの 7 が適用される。
  it('empty_def falls back to its default for an empty value', async () => {
    const res = await queryParamsApp.request('/absent?empty_def=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // A parameter that is not sent at all takes its default as well.
  // まったく送信されなかったパラメータにも、デフォルト値が適用される。
  it('empty_def falls back to its default when it is not sent', async () => {
    const res = await queryParamsApp.request('/absent')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // A value that is sent wins over the default.
  // 送信された値は、デフォルト値より優先される。
  it('empty_def reads a value over its default', async () => {
    const res = await queryParamsApp.request('/absent?empty_def=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '2' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // The empty string is a value of a string, so allowEmptyValue changes nothing for it.
  // 空文字列は string の値の1つである。そのため、allowEmptyValue は string に対して
  // 何も変えない。
  it('empty_str keeps an empty string', async () => {
    const res = await queryParamsApp.request('/absent?empty_str=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      empty_str: { valueType: 'string', valueText: '' },
      ref_def: { valueType: 'number', valueText: '3' },
    })
  })

  // ref_def is a $ref to Count with a default of 3 beside it.
  // ref_def は Count への $ref であり、その隣にデフォルト値 3 が指定されている。
  it('ref_def reads a value over the default beside its reference', async () => {
    const res = await queryParamsApp.request('/absent?ref_def=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      empty_def: { valueType: 'number', valueText: '7' },
      ref_def: { valueType: 'number', valueText: '5' },
    })
  })
})

// A parameter that is an object does not arrive under its name. style: deepObject spells each
// property as a key of its own (deep[age]=5); style: form with explode: true, the default, makes
// the properties keys of the query themselves (size=5); with explode: false the parameter is one
// value alternating names and values (pairs=age,5). The query gathers them into the object before
// it validates. A property that is an array is described as its JSON text: [1,2] holds numbers.
// オブジェクトであるパラメータは、その名前のキーでは届かない。style: deepObject は各プロパティを
// 独立したキーとして表記する(deep[age]=5)。デフォルトである style: form + explode: true では、
// プロパティ自体がクエリのキーになる(size=5)。explode: false では、名前と値を交互に並べた
// 1つの値になる(pairs=age,5)。クエリは、検証の前にそれらをオブジェクトへまとめる。
// 配列であるプロパティは、JSON 文字列で記述される。[1,2] は number を保持している。
describe('objects: a parameter spread over the query', () => {
  // deep is declared style: deepObject with the properties name, age, active and ids.
  // deep は style: deepObject で宣言されており、name・age・active・ids のプロパティを持つ。
  it('deep gathers its keys into an object', async () => {
    const res = await queryParamsApp.request('/objects?deep[name]=bob&deep[age]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        name: { valueType: 'string', valueText: 'bob' },
        age: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // A client that encodes the brackets sends the same keys.
  // 角括弧をエンコードするクライアントも、同じキーを送っていることになる。
  it('deep reads percent-encoded brackets', async () => {
    const res = await queryParamsApp.request('/objects?deep%5Bname%5D=bob')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        name: { valueType: 'string', valueText: 'bob' },
      },
    })
  })

  // active is a boolean.
  // active は boolean である。
  it('deep reads a boolean property', async () => {
    const res = await queryParamsApp.request('/objects?deep[active]=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        active: { valueType: 'boolean', valueText: 'true' },
      },
    })
  })

  // ids is an array of integers. A key sent once arrives as a bare string.
  // ids は integer の配列である。1回だけ送られたキーは、素の文字列として届く。
  it('deep reads an array property sent once', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids]=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        ids: { valueType: 'object', valueText: '[1]' },
      },
    })
  })

  // A key sent twice arrives as an array.
  // 2回送られたキーは、配列として届く。
  it('deep reads an array property sent twice', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids]=1&deep[ids]=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        ids: { valueType: 'object', valueText: '[1,2]' },
      },
    })
  })

  // The object is gathered, and the property it does not declare is left out of it.
  // オブジェクトはまとめられるが、宣言されていないプロパティはそこから除かれる。
  it('deep drops a property it does not declare', async () => {
    const res = await queryParamsApp.request('/objects?deep[unknown]=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {},
    })
  })

  // deep_ref is a $ref to Range, an object with a required from and an optional to.
  // deep_ref は Range への $ref である。Range は、必須の from と任意の to を持つ
  // オブジェクトである。
  it('deep_ref gathers the keys of a component', async () => {
    const res = await queryParamsApp.request('/objects?deep_ref[from]=1&deep_ref[to]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep_ref: {
        from: { valueType: 'number', valueText: '1' },
        to: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // spread is declared with no style, which is style: form with explode: true. Its properties are
  // sort, size and page.
  // spread は style を指定せずに宣言されており、style: form + explode: true になる。
  // プロパティは sort・size・page である。
  it('spread gathers the properties that are keys of the query', async () => {
    const res = await queryParamsApp.request('/objects?sort=asc&size=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      spread: {
        sort: { valueType: 'string', valueText: 'asc' },
        size: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // page is a property of spread and a parameter of its own, a string. The parameter takes the
  // key, so spread is not sent at all.
  // page は spread のプロパティであり、同時に独立した string のパラメータでもある。
  // キーはパラメータ側が受け取るため、spread は送信されていないことになる。
  it('spread leaves a key that is a parameter of its own', async () => {
    const res = await queryParamsApp.request('/objects?page=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      page: { valueType: 'string', valueText: '2' },
    })
  })

  // size goes to spread and limit is a parameter of its own.
  // size は spread に入り、limit は独立したパラメータである。
  it('spread and a parameter of its own arrive side by side', async () => {
    const res = await queryParamsApp.request('/objects?limit=3&size=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      spread: {
        size: { valueType: 'number', valueText: '1' },
      },
      limit: { valueType: 'number', valueText: '3' },
    })
  })

  // pairs is declared style: form, explode: false, with the properties name and age.
  // pairs は style: form, explode: false で宣言されており、name と age のプロパティを持つ。
  it('pairs splits names and values', async () => {
    const res = await queryParamsApp.request('/objects?pairs=name,bob,age,5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pairs: {
        name: { valueType: 'string', valueText: 'bob' },
        age: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // One name and one value.
  // 名前1つと値1つ。
  it('pairs reads a single pair', async () => {
    const res = await queryParamsApp.request('/objects?pairs=age,5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pairs: {
        age: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // Each way of spreading an object in one request.
  // オブジェクトの各送信形式を、1つのリクエストにまとめている。
  it('every object arrives beside the others', async () => {
    const res = await queryParamsApp.request(
      '/objects?deep[age]=5&sort=asc&pairs=age,7&limit=1&page=p',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        age: { valueType: 'number', valueText: '5' },
      },
      spread: {
        sort: { valueType: 'string', valueText: 'asc' },
      },
      pairs: {
        age: { valueType: 'number', valueText: '7' },
      },
      page: { valueType: 'string', valueText: 'p' },
      limit: { valueType: 'number', valueText: '1' },
    })
  })

  // Every parameter of /objects is optional.
  // /objects のパラメータは、すべて任意である。
  it('answers nothing when no object is sent', async () => {
    const res = await queryParamsApp.request('/objects')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })

  // A key with two pairs of brackets names a path into the object: range is an object, and
  // min and max are its properties.
  // 角括弧が2組あるキーは、オブジェクト内のパスを表す。range はオブジェクトであり、
  // min と max はそのプロパティである。
  it('deep reads a key nested under a property that is an object', async () => {
    const res = await queryParamsApp.request('/objects?deep[range][min]=1&deep[range][max]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { range: { valueType: 'object', valueText: '{"min":1,"max":5}' } },
    })
  })

  // An empty pair of brackets names an element of an array, as many times as there are
  // elements.
  // 空の角括弧は配列の要素を表し、要素の数だけ繰り返される。
  it('deep reads the elements of an array written with empty brackets', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids][]=1&deep[ids][]=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { ids: { valueType: 'object', valueText: '[1,2]' } },
    })
  })

  // One element written that way is an array of one.
  // この形式で要素を1つだけ書いた場合は、1要素の配列になる。
  it('deep reads one element written with empty brackets as an array of one', async () => {
    const res = await queryParamsApp.request('/objects?deep[tags][]=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { tags: { valueType: 'object', valueText: '["a"]' } },
    })
  })

  // An element may be named by its index instead, in any order.
  // 要素は、インデックスで指定することもできる。順序は問わない。
  it('deep reads the elements of an array written with their index', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids][1]=2&deep[ids][0]=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { ids: { valueType: 'object', valueText: '[1,2]' } },
    })
  })

  // points is an array of objects. A key goes to the first element that does not hold it
  // yet, so x, y, x, y written in order are two points.
  // points はオブジェクトの配列である。キーは、まだそのキーを持たない最初の要素に入る。
  // そのため、x・y・x・y の順に書くと、2つの点になる。
  it('deep reads the elements of an array of objects', async () => {
    const res = await queryParamsApp.request(
      '/objects?deep[points][][x]=1&deep[points][][y]=2&deep[points][][x]=3&deep[points][][y]=4',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { points: { valueType: 'object', valueText: '[{"x":1,"y":2},{"x":3,"y":4}]' } },
    })
  })

  // The same array with the index of each element spelled out.
  // 同じ配列を、各要素のインデックスを明記して書いた場合。
  it('deep reads the elements of an array of objects written with their index', async () => {
    const res = await queryParamsApp.request('/objects?deep[points][0][x]=1&deep[points][1][x]=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { points: { valueType: 'object', valueText: '[{"x":1},{"x":3}]' } },
    })
  })

  // A key is the client's to write, and is read one pair of brackets at a time. One that
  // reaches deeper than sixteen pairs is left as a key nothing declares, and the request is
  // answered like any other.
  // キーはクライアントが自由に書けるものであり、角括弧1組ずつ読み取られる。16組より深い
  // キーは、どこにも宣言されていないキーとして残され、リクエストは通常どおり処理される。
  it('deep leaves a key that reaches too deep unread', async () => {
    const res = await queryParamsApp.request(`/objects?deep${'[a]'.repeat(5000)}=1&limit=3`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '3' },
    })
  })

  // /shared declares filter and sort, and both declare name: the key is a property of each.
  // /shared は filter と sort を宣言しており、どちらも name を宣言している。このキーは、
  // 両方のプロパティになる。
  it('gives a key two exploded objects declare to both', async () => {
    const res = await queryParamsApp.request('/shared?name=bob&age=5&dir=asc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      filter: {
        name: { valueType: 'string', valueText: 'bob' },
        age: { valueType: 'number', valueText: '5' },
      },
      sort: {
        name: { valueType: 'string', valueText: 'bob' },
        dir: { valueType: 'string', valueText: 'asc' },
      },
    })
  })

  // /open declares extra with additionalProperties: { type: integer }. other is declared
  // nowhere, so it is a property of extra; known is one extra declares; page is a parameter
  // of its own.
  // /open は、extra を additionalProperties: { type: integer } 付きで宣言している。other は
  // どこにも宣言されていないため extra のプロパティになる。known は extra が宣言する
  // プロパティであり、page は独立したパラメータである。
  it('gives a key nothing declares to an object that takes additional properties', async () => {
    const res = await queryParamsApp.request('/open?page=2&known=k&other=7')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      page: { valueType: 'number', valueText: '2' },
      extra: {
        known: { valueType: 'string', valueText: 'k' },
        other: { valueType: 'number', valueText: '7' },
      },
    })
  })

  // /styles declares filter as a deepObject beside csv, an array with explode: false.
  // /styles は、explode: false の配列である csv と並べて、filter を deepObject として
  // 宣言している。
  it('filter gathers a deepObject beside an array that is split', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,2&filter[name]=bob&filter[age]=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
      filter: {
        name: { valueType: 'string', valueText: 'bob' },
        age: { valueType: 'number', valueText: '5' },
      },
    })
  })

  // An empty pair of brackets takes the first free index, 0, and the index 0 written out names the same element: the later one stands.
  // 空の角括弧は最初の空きインデックスである 0 を取り、明記されたインデックス 0 は同じ要素を指す。後に書かれたほうが残る。
  it('deep keeps the last of an element written both ways', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids][]=1&deep[ids][0]=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { ids: { valueType: 'object', valueText: '[2]' } },
    })
  })

  // The indexes say the order, not the length: 2 stands before 5.
  // インデックスが示すのは順序であり、長さではない。2 は 5 の前に並ぶ。
  it('deep closes the gaps between indexes', async () => {
    const res = await queryParamsApp.request('/objects?deep[ids][5]=1&deep[ids][2]=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { ids: { valueType: 'object', valueText: '[2,1]' } },
    })
  })

  // A client may percent-encode the brackets; it is the same key.
  // クライアントが角括弧をパーセントエンコードしても、同じキーである。
  it('deep reads a key whose brackets are percent-encoded', async () => {
    const res = await queryParamsApp.request(
      `/objects?${encodeURIComponent('deep[points][][x]')}=1&${encodeURIComponent('deep[range][min]')}=2`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {
        points: { valueType: 'object', valueText: '[{"x":1}]' },
        range: { valueType: 'object', valueText: '{"min":2}' },
      },
    })
  })

  // x is written twice and y once: y goes to the first point, which does not hold one yet.
  // x は2回、y は1回書かれている。y は、まだ y を持たない最初の点に入る。
  it('deep gives a key to the first element that does not hold it', async () => {
    const res = await queryParamsApp.request(
      '/objects?deep[points][][x]=1&deep[points][][x]=2&deep[points][][y]=9',
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { points: { valueType: 'object', valueText: '[{"x":1,"y":9},{"x":2}]' } },
    })
  })

  // The object is built without a prototype, so the key names a property nothing declares, and is left out.
  // オブジェクトはプロトタイプなしで組み立てられる。そのためこのキーは、どこにも宣言されていないプロパティを指し、出力から除かれる。
  it('deep leaves __proto__ a key like any other', async () => {
    const res = await queryParamsApp.request('/objects?deep[__proto__][polluted]=1&deep[name]=bob')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: { name: { valueType: 'string', valueText: 'bob' } },
    })
  })

  // The name is followed by no property, so the key names none.
  // 名前の後ろにプロパティがないため、このキーはどのプロパティも指さない。
  it('deep ignores a key with an empty pair of brackets behind the name', async () => {
    const res = await queryParamsApp.request('/objects?deep[]=1&limit=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      deep: {},
      limit: { valueType: 'number', valueText: '3' },
    })
  })

  // The key is no path into deep; it is a key nothing declares.
  // このキーは deep 内のパスではなく、どこにも宣言されていないキーである。
  it('deep ignores a key whose bracket is not closed', async () => {
    const res = await queryParamsApp.request('/objects?deep[name=bob&limit=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '3' },
    })
  })

  // The same for text after the closing bracket.
  // 閉じ括弧の後ろに文字がある場合も同様である。
  it('deep ignores a key with text behind its brackets', async () => {
    const res = await queryParamsApp.request('/objects?deep[name]x=bob&limit=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      limit: { valueType: 'number', valueText: '3' },
    })
  })
})

// Only style: form with explode: true, the default, repeats the name (?ids=1&ids=2). Every other
// serialisation sends an array as one value, its elements joined by the separator of the style,
// and the generated schema splits it again.
// 名前を繰り返す(?ids=1&ids=2)のは、デフォルトである style: form + explode: true だけである。
// それ以外のシリアライズ形式では、配列は要素をスタイルごとの区切り文字で連結した1つの値として
// 送られ、生成されるスキーマがそれを分割し直す。
describe('styles: serialisations other than form + explode', () => {
  // csv is declared style: form, explode: false, which serialises [1, 2, 3] as csv=1,2,3.
  // csv は style: form, explode: false で宣言されており、
  // [1, 2, 3] は csv=1,2,3 としてシリアライズされる。
  it('csv splits a comma-separated value', async () => {
    const res = await queryParamsApp.request('/styles?csv=1,2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // A one-element array has no separator to split on.
  // 1要素の配列には、分割すべき区切り文字がない。
  it('csv reads a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/styles?csv=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [{ valueType: 'number', valueText: '5' }],
    })
  })

  // The comma is decoded before the value is split, so an encoded one separates as well.
  // カンマは分割の前にデコードされるため、エンコードされたカンマも区切りとして働く。
  it('csv splits a percent-encoded comma', async () => {
    const res = await queryParamsApp.request('/styles?csv=1%2C2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // Repetition is not the form the declared style uses. It is read all the same, each occurrence
  // split on its own.
  // 繰り返し形式は、宣言されたスタイルが使う形式ではない。
  // それでも読み取られ、各出現がそれぞれ分割される。
  it('csv reads repetition as well', async () => {
    const res = await queryParamsApp.request('/styles?csv=1&csv=2,3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // The same for an array of strings: a,b is two elements, not one that holds a comma.
  // string の配列でも同様である。a,b は2要素であり、カンマを含む1要素ではない。
  it('csv_str splits an array of strings', async () => {
    const res = await queryParamsApp.request('/styles?csv_str=a,b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv_str: [
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: 'b' },
      ],
    })
  })

  // An empty string is a string, so the element between two commas is kept.
  // 空文字列も文字列なので、2つのカンマに挟まれた要素は保持される。
  it('csv_str keeps an empty element', async () => {
    const res = await queryParamsApp.request('/styles?csv_str=a,,b')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      csv_str: [
        { valueType: 'string', valueText: 'a' },
        { valueType: 'string', valueText: '' },
        { valueType: 'string', valueText: 'b' },
      ],
    })
  })

  // pipes is declared style: pipeDelimited, which serialises [1, 2, 3] as pipes=1|2|3.
  // pipes は style: pipeDelimited で宣言されており、
  // [1, 2, 3] は pipes=1|2|3 としてシリアライズされる。
  it('pipes splits a pipe-separated value', async () => {
    const res = await queryParamsApp.request('/styles?pipes=1%7C2%7C3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pipes: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // The same with the pipes sent as they are.
  // パイプをそのまま送信した場合も同様である。
  it('pipes splits an unencoded pipe', async () => {
    const res = await queryParamsApp.request('/styles?pipes=1|2|3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      pipes: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // spaces is declared style: spaceDelimited, which serialises [1, 2, 3] as spaces=1%202%203.
  // spaces は style: spaceDelimited で宣言されており、
  // [1, 2, 3] は spaces=1%202%203 としてシリアライズされる。
  it('spaces splits a space-separated value', async () => {
    const res = await queryParamsApp.request('/styles?spaces=1%202%203')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      spaces: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // In a query string a plus sign is a space.
  // クエリ文字列では、プラス記号は空白を表す。
  it('spaces splits a space written as a plus sign', async () => {
    const res = await queryParamsApp.request('/styles?spaces=1+2+3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      spaces: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })
})

// A component schema is generated for a typed value: Count is z.int().min(0), which a request
// body satisfies and the text of a parameter does not. A parameter that names one reads the text
// first and hands the component the value.
// コンポーネントスキーマは、型付きの値を前提に生成される。Count は z.int().min(0) であり、
// リクエストボディはこれを満たすが、パラメータの文字列は満たさない。コンポーネントを参照する
// パラメータは、先に文字列を読み取り、その値をコンポーネントに渡す。
describe('references: a schema behind $ref', () => {
  // Count is an integer with minimum: 0.
  // Count は minimum: 0 の integer である。
  it('ref_int coerces an integer component', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_int: { valueType: 'number', valueText: '5' },
    })
  })

  // Zero is the minimum of Count: the constraint of the component applies to the value that was
  // read.
  // 0 は Count の最小値である。コンポーネントの制約は、読み取った値に適用される。
  it('ref_int accepts the minimum of the component', async () => {
    const res = await queryParamsApp.request('/refs?ref_int=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_int: { valueType: 'number', valueText: '0' },
    })
  })

  // Big is an int64, read as a bigint without losing a digit.
  // Big は int64 であり、桁落ちすることなく bigint として読み取られる。
  it('ref_big coerces an int64 component to a bigint', async () => {
    const res = await queryParamsApp.request('/refs?ref_big=9007199254740993')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_big: { valueType: 'bigint', valueText: '9007199254740993' },
    })
  })

  // Ratio is a number.
  // Ratio は number である。
  it('ref_num coerces a number component', async () => {
    const res = await queryParamsApp.request('/refs?ref_num=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_num: { valueType: 'number', valueText: '1.5' },
    })
  })

  // Flag is a boolean.
  // Flag は boolean である。
  it('ref_bool coerces a boolean component from "true"', async () => {
    const res = await queryParamsApp.request('/refs?ref_bool=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_bool: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // A boolean behind a reference reads the same spellings as an inline one.
  // 参照経由の boolean も、インライン宣言と同じ表記を読み取る。
  it('ref_bool coerces a boolean component from "0"', async () => {
    const res = await queryParamsApp.request('/refs?ref_bool=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_bool: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // Level is an integer enum of 1, 2 and 3.
  // Level は 1・2・3 の integer enum である。
  it('ref_enum coerces an integer enum component', async () => {
    const res = await queryParamsApp.request('/refs?ref_enum=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_enum: { valueType: 'number', valueText: '2' },
    })
  })

  // Name is a string, so there is nothing to read: digits stay text.
  // Name は string なので、読み取る処理はない。数字も文字列のままである。
  it('ref_str leaves a string component as text', async () => {
    const res = await queryParamsApp.request('/refs?ref_str=12')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_str: { valueType: 'string', valueText: '12' },
    })
  })

  // Counts is an array of integers. The array behind the reference accepts both arities, like an
  // inline one.
  // Counts は integer の配列である。参照先の配列も、インライン宣言と同じく、
  // 単一値と複数値の両方を受理する。
  it('ref_arr reads a single value as a one-element array', async () => {
    const res = await queryParamsApp.request('/refs?ref_arr=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_arr: [{ valueType: 'number', valueText: '1' }],
    })
  })

  // Each element of the referenced array is read as a number.
  // 参照先の配列の各要素が、number として読み取られる。
  it('ref_arr coerces every element', async () => {
    const res = await queryParamsApp.request('/refs?ref_arr=1&ref_arr=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_arr: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // The array is inline and its items are a reference to Count.
  // 配列はインライン宣言であり、その items が Count への参照である。
  it('arr_ref coerces elements that are a reference', async () => {
    const res = await queryParamsApp.request('/refs?arr_ref=1&arr_ref=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      arr_ref: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })

  // allOf with one reference is the usual way to put a description on it.
  // 参照1つだけの allOf は、参照に description を付ける際の一般的な書き方である。
  it('allof_ref coerces a reference wrapped in allOf', async () => {
    const res = await queryParamsApp.request('/refs?allof_ref=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      allof_ref: { valueType: 'number', valueText: '5' },
    })
  })

  // CountAlias is a reference to Count.
  // CountAlias は Count への参照である。
  it('ref_ref coerces through a reference to a reference', async () => {
    const res = await queryParamsApp.request('/refs?ref_ref=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      ref_ref: { valueType: 'number', valueText: '5' },
    })
  })

  // Every parameter of /refs is optional.
  // /refs のパラメータは、すべて任意である。
  it('answers nothing when no reference parameter is sent', async () => {
    const res = await queryParamsApp.request('/refs')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({})
  })
})

// A combinator is handed the value, not the text: the text is read once, around the whole schema,
// and every branch sees the same value. Reading it branch by branch leaves the branches of an
// allOf with different outputs, which cannot be merged, and lets "1" match the integer and the
// string branch of a oneOf at once.
// コンビネータに渡されるのは、文字列ではなく値である。文字列はスキーマ全体の外側で1度だけ
// 読み取られ、すべての分岐が同じ値を見る。分岐ごとに読み取ると、allOf の各分岐の出力が
// 食い違ってマージできなくなり、oneOf では "1" が integer と string の両方の分岐に
// 一致してしまう。
describe('combinators: the text is read once', () => {
  // allof is allOf of type: integer and minimum: 5.
  // allof は type: integer と minimum: 5 の allOf である。
  it('allof accepts a value that meets both branches', async () => {
    const res = await queryParamsApp.request('/combinators?allof=10')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      allof: { valueType: 'number', valueText: '10' },
    })
  })

  // The minimum itself.
  // 最小値そのもの。
  it('allof accepts the minimum', async () => {
    const res = await queryParamsApp.request('/combinators?allof=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      allof: { valueType: 'number', valueText: '5' },
    })
  })

  // allof_range is allOf of an integer with minimum: 1 and an integer with maximum: 10.
  // allof_range は、minimum: 1 の integer と maximum: 10 の integer の allOf である。
  it('allof_range accepts a value inside both bounds', async () => {
    const res = await queryParamsApp.request('/combinators?allof_range=5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      allof_range: { valueType: 'number', valueText: '5' },
    })
  })

  // oneof_is is oneOf an integer or a string. Digits are read as a number, which only the integer
  // branch takes.
  // oneof_is は integer または string の oneOf である。
  // 数字は number として読み取られ、integer 側の分岐だけがそれを受理する。
  it('oneof_is reads digits as the integer branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_is=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_is: { valueType: 'number', valueText: '1' },
    })
  })

  // A word is not the text of an integer, so it stays text and only the string branch takes it.
  // 単語は整数の表記ではないため文字列のままとなり、string 側の分岐だけが受理する。
  it('oneof_is reads a word as the string branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_is=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_is: { valueType: 'string', valueText: 'abc' },
    })
  })

  // 1.5 is not the text of an integer either.
  // 1.5 も整数の表記ではない。
  it('oneof_is reads a fraction as the string branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_is=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_is: { valueType: 'string', valueText: '1.5' },
    })
  })

  // oneof_ib is oneOf an integer or a boolean. "1" is a spelling of both, and the number is tried
  // first.
  // oneof_ib は integer または boolean の oneOf である。
  // "1" はどちらの表記でもあるが、数値が先に試される。
  it('oneof_ib reads "1" as the integer branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_ib=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_ib: { valueType: 'number', valueText: '1' },
    })
  })

  // The same for "0".
  // "0" でも同様である。
  it('oneof_ib reads "0" as the integer branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_ib=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_ib: { valueType: 'number', valueText: '0' },
    })
  })

  // A word that spells a boolean is read as one.
  // 真偽値を表す単語は、真偽値として読み取られる。
  it('oneof_ib reads "true" as the boolean branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_ib=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_ib: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // Every spelling an inline boolean reads is read here too.
  // インライン宣言の boolean が読み取る表記は、ここでもすべて読み取られる。
  it('oneof_ib reads "no" as the boolean branch', async () => {
    const res = await queryParamsApp.request('/combinators?oneof_ib=no')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      oneof_ib: { valueType: 'boolean', valueText: 'false' },
    })
  })

  // anyof_ns is anyOf a number or a string.
  // anyof_ns は number または string の anyOf である。
  it('anyof_ns reads a fraction as the number branch', async () => {
    const res = await queryParamsApp.request('/combinators?anyof_ns=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      anyof_ns: { valueType: 'number', valueText: '1.5' },
    })
  })

  // A word stays text.
  // 単語は文字列のままである。
  it('anyof_ns reads a word as the string branch', async () => {
    const res = await queryParamsApp.request('/combinators?anyof_ns=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      anyof_ns: { valueType: 'string', valueText: 'abc' },
    })
  })

  // mixed is enum: [1, "a", "2"], a number and two strings.
  // mixed は enum: [1, "a", "2"] であり、number 1つと string 2つからなる。
  it('mixed reads "1" as the number member', async () => {
    const res = await queryParamsApp.request('/combinators?mixed=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mixed: { valueType: 'number', valueText: '1' },
    })
  })

  // A word stays text.
  // 単語は文字列のままである。
  it('mixed reads "a" as the string member', async () => {
    const res = await queryParamsApp.request('/combinators?mixed=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mixed: { valueType: 'string', valueText: 'a' },
    })
  })

  // "2" is a member as it stands, so it is not read as the number 2, which is not one.
  // "2" はそのままでメンバーであるため、number の 2 としては読み取られない。
  // number の 2 はメンバーではない。
  it('mixed keeps "2" as the string member', async () => {
    const res = await queryParamsApp.request('/combinators?mixed=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      mixed: { valueType: 'string', valueText: '2' },
    })
  })

  // not_zero is type: integer with not: { const: 0 }.
  // not_zero は type: integer に not: { const: 0 } を加えたものである。
  it('not_zero accepts an integer other than zero', async () => {
    const res = await queryParamsApp.request('/combinators?not_zero=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_zero: { valueType: 'number', valueText: '1' },
    })
  })

  // not_enum is not: { enum: [1, 2] } with no type. Digits are read as a number.
  // not_enum は型を持たない not: { enum: [1, 2] } である。数字は number として読み取られる。
  it('not_enum accepts a number that is not excluded', async () => {
    const res = await queryParamsApp.request('/combinators?not_enum=3')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_enum: { valueType: 'number', valueText: '3' },
    })
  })

  // A word is not one of the excluded numbers.
  // 単語は、除外された数値のいずれでもない。
  it('not_enum accepts a word', async () => {
    const res = await queryParamsApp.request('/combinators?not_enum=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_enum: { valueType: 'string', valueText: 'abc' },
    })
  })

  // not_string is not: { type: string }. Digits are read as a number, which is not a string.
  // not_string は not: { type: string } である。
  // 数字は number として読み取られ、number は string ではない。
  it('not_string accepts digits', async () => {
    const res = await queryParamsApp.request('/combinators?not_string=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_string: { valueType: 'number', valueText: '1' },
    })
  })

  // true is read as a boolean, which is not a string.
  // true は boolean として読み取られ、boolean は string ではない。
  it('not_string accepts a boolean spelling', async () => {
    const res = await queryParamsApp.request('/combinators?not_string=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_string: { valueType: 'boolean', valueText: 'true' },
    })
  })

  // typeless_min is minimum: 1 with no type. The keyword applies to numbers, so digits are read
  // as one.
  // typeless_min は型を持たない minimum: 1 である。
  // このキーワードは数値に適用されるため、数字は number として読み取られる。
  it('typeless_min accepts a number that meets the minimum', async () => {
    const res = await queryParamsApp.request('/combinators?typeless_min=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      typeless_min: { valueType: 'number', valueText: '1' },
    })
  })

  // minimum says nothing about a value that is not a number.
  // minimum は、数値でない値については何も規定しない。
  it('typeless_min accepts a word', async () => {
    const res = await queryParamsApp.request('/combinators?typeless_min=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      typeless_min: { valueType: 'string', valueText: 'abc' },
    })
  })

  // typeless_len is minLength: 3 with no type. JSON Schema applies minLength to a string and
  // says nothing about a number, so digits, which are a number, are valid whatever their
  // count.
  // typeless_len は型を持たない minLength: 3 である。JSON Schema は minLength を文字列に適用し、
  // 数値については何も規定しない。そのため、数値である数字の並びは、桁数にかかわらず有効である。
  it('typeless_len accepts digits as a number, which minLength does not measure', async () => {
    const res = await queryParamsApp.request('/combinators?typeless_len=12')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      typeless_len: { valueType: 'number', valueText: '12' },
    })
  })

  // A word is text, and long enough.
  // 単語は文字列であり、長さも足りている。
  it('typeless_len accepts a word that meets minLength', async () => {
    const res = await queryParamsApp.request('/combinators?typeless_len=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      typeless_len: { valueType: 'string', valueText: 'abc' },
    })
  })

  // 0 as a number is below the minimum. As text it is a string, which minimum says nothing
  // about: a client that holds the string "0" sends exactly this, so it is accepted, as the
  // string. A schema that means a number has to say `type: number`.
  // number としての 0 は、最小値を下回る。一方、文字列としての "0" は string であり、minimum は
  // string について何も規定しない。文字列 "0" を持つクライアントが送信するのはまさにこの値
  // なので、string として受理される。数値を意図するスキーマは、`type: number` を明記する
  // 必要がある。
  it('typeless_min accepts "0" as the string it also is', async () => {
    const res = await queryParamsApp.request('/combinators?typeless_min=0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      typeless_min: { valueType: 'string', valueText: '0' },
    })
  })

  // The number 1 is excluded and the string "1" is not. The text stands for both, so it is
  // accepted as the one that is valid.
  // number の 1 は除外されているが、文字列の "1" は除外されていない。この文字列はその両方を
  // 表しうるため、有効なほうとして受理される。
  it('not_enum accepts "1" as the string, which is not excluded', async () => {
    const res = await queryParamsApp.request('/combinators?not_enum=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      not_enum: { valueType: 'string', valueText: '1' },
    })
  })

  // nconst is type: number with const: 2.
  // nconst は type: number に const: 2 を加えたものである。
  it('nconst accepts "2"', async () => {
    const res = await queryParamsApp.request('/combinators?nconst=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nconst: { valueType: 'number', valueText: '2' },
    })
  })

  // The type is number, so 2.0 is read, and it is the value 2.
  // 型が number なので 2.0 は読み取られ、その値は 2 である。
  it('nconst accepts "2.0"', async () => {
    const res = await queryParamsApp.request('/combinators?nconst=2.0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      nconst: { valueType: 'number', valueText: '2' },
    })
  })

  // tuple is prefixItems of an integer and a string, with boolean items after them. The first
  // element is read as a number and the second stays text.
  // tuple は integer と string の prefixItems を持ち、それ以降の items は boolean である。
  // 1番目の要素は number として読み取られ、2番目は文字列のままである。
  it('tuple reads each element by its position', async () => {
    const res = await queryParamsApp.request('/combinators?tuple=1&tuple=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tuple: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'string', valueText: 'a' },
      ],
    })
  })

  // The second position is a string, so digits there are not read as a number.
  // 2番目の位置は string なので、そこにある数字は number として読み取られない。
  it('tuple keeps digits in a string position as text', async () => {
    const res = await queryParamsApp.request('/combinators?tuple=1&tuple=2')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tuple: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'string', valueText: '2' },
      ],
    })
  })

  // The third element is past the prefix, so it is read as items declares: a boolean.
  // 3番目の要素は prefixItems の範囲外なので、items の宣言どおり boolean として読み取られる。
  it('tuple reads the elements after the prefix as items', async () => {
    const res = await queryParamsApp.request('/combinators?tuple=1&tuple=a&tuple=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      tuple: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'string', valueText: 'a' },
        { valueType: 'boolean', valueText: 'true' },
      ],
    })
  })

  // multi is type: [integer, string], a value of either type. Digits are read as a number.
  // multi は type: [integer, string] であり、いずれの型の値も受理する。
  // 数字は number として読み取られる。
  it('multi reads digits as the integer of its type list', async () => {
    const res = await queryParamsApp.request('/combinators?multi=1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multi: { valueType: 'number', valueText: '1' },
    })
  })

  // A word stays text.
  // 単語は文字列のままである。
  it('multi reads a word as the string of its type list', async () => {
    const res = await queryParamsApp.request('/combinators?multi=abc')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multi: { valueType: 'string', valueText: 'abc' },
    })
  })

  // multi_nb is type: [number, boolean].
  // multi_nb は type: [number, boolean] である。
  it('multi_nb reads a fraction as the number of its type list', async () => {
    const res = await queryParamsApp.request('/combinators?multi_nb=1.5')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multi_nb: { valueType: 'number', valueText: '1.5' },
    })
  })

  // true spells a boolean.
  // true は boolean の表記である。
  it('multi_nb reads a word as the boolean of its type list', async () => {
    const res = await queryParamsApp.request('/combinators?multi_nb=true')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      multi_nb: { valueType: 'boolean', valueText: 'true' },
    })
  })
})

// A parameter declared with content: application/json carries one JSON document as its value. The
// document is parsed and then validated as typed: JSON has types of its own, so nothing in it is
// read from text.
// content: application/json で宣言されたパラメータは、値として1つの JSON 文書を運ぶ。
// 文書はパースされたうえで、型付きの値として検証される。JSON は自身で型を持つため、
// その中の値が文字列から読み取られることはない。
describe('content: a JSON document', () => {
  // filter is an object with a required integer page and an optional string name.
  // filter は、必須の integer である page と、任意の string である name を持つオブジェクトである。
  it('filter reads an object', async () => {
    const res = await queryParamsApp.request(`/content?filter=${encodeURIComponent('{"page":1}')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      filter: {
        page: { valueType: 'number', valueText: '1' },
      },
    })
  })

  // Both properties arrive under their names.
  // 両方のプロパティが、それぞれの名前で届く。
  it('filter reads every property of an object', async () => {
    const res = await queryParamsApp.request(
      `/content?filter=${encodeURIComponent('{"page":1,"name":"bob"}')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      filter: {
        page: { valueType: 'number', valueText: '1' },
        name: { valueType: 'string', valueText: 'bob' },
      },
    })
  })

  // list is an array of integers. The brackets make it one value, which is not wrapped in another
  // array.
  // list は integer の配列である。角括弧で囲まれた1つの値であり、
  // さらに配列で包まれることはない。
  it('list reads an array', async () => {
    const res = await queryParamsApp.request(`/content?list=${encodeURIComponent('[1,2,3]')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      list: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
        { valueType: 'number', valueText: '3' },
      ],
    })
  })

  // An empty JSON array is an empty array.
  // 空の JSON 配列は、空の配列である。
  it('list reads an empty array', async () => {
    const res = await queryParamsApp.request(`/content?list=${encodeURIComponent('[]')}`)
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      list: [],
    })
  })

  // form is declared with content: application/x-www-form-urlencoded. Its value is one
  // form-encoded document, whose fields are text: a is read as a number, b as a boolean, and
  // tags, sent twice, as an array.
  // form は content: application/x-www-form-urlencoded で宣言されている。値は1つの
  // フォームエンコードされた文書であり、そのフィールドは文字列である。a は number、
  // b は boolean として読まれ、2回送信された tags は配列になる。
  it('form reads a form-encoded document', async () => {
    const res = await queryParamsApp.request(
      `/content?form=${encodeURIComponent('a=1&b=true&tags=x&tags=y')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      form: {
        a: { valueType: 'number', valueText: '1' },
        b: { valueType: 'boolean', valueText: 'true' },
        tags: { valueType: 'object', valueText: '["x","y"]' },
      },
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
    const res = await queryParamsApp.request('/params?integer=-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '0' },
    })
  })

  // Leading zeros are dropped; the value is not read as octal.
  // 先頭のゼロは無視される。8進数としては読まれない。
  it('integer accepts "007"', async () => {
    const res = await queryParamsApp.request('/params?integer=007')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      integer: { valueType: 'number', valueText: '7' },
    })
  })

  // Negative zero is zero.
  // 負のゼロはゼロになる。
  it('int64 accepts "-0"', async () => {
    const res = await queryParamsApp.request('/params?int64=-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '0' },
    })
  })

  // Leading zeros are dropped.
  // 先頭のゼロは無視される。
  it('int64 accepts "007"', async () => {
    const res = await queryParamsApp.request('/params?int64=007')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int64: { valueType: 'bigint', valueText: '7' },
    })
  })

  // Negative zero is echoed as zero.
  // 負のゼロはゼロとして返る。
  it('number accepts "-0"', async () => {
    const res = await queryParamsApp.request('/params?number=-0')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      number: { valueType: 'number', valueText: '0' },
    })
  })

  // cuid2 is a pattern with no fixed length: one letter passes.
  // cuid2 は長さ固定のないパターンであり、1文字でも通る。
  it('cuid2 accepts "a"', async () => {
    const res = await queryParamsApp.request('/params?cuid2=a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: 'a' },
    })
  })

  // cuid2 does not require a leading letter.
  // cuid2 は先頭が英字であることを要求しない。
  it('cuid2 accepts "1z4a98xxat96iws9zmbrgj3a"', async () => {
    const res = await queryParamsApp.request('/params?cuid2=1z4a98xxat96iws9zmbrgj3a')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      cuid2: { valueType: 'string', valueText: '1z4a98xxat96iws9zmbrgj3a' },
    })
  })

  // format: url takes the javascript: scheme; narrowing is the caller's to do.
  // format: url は javascript: スキームも受理する。絞り込みは利用側の責務である。
  it('url accepts "javascript:alert(1)"', async () => {
    const res = await queryParamsApp.request(
      `/params?url=${encodeURIComponent('javascript:alert(1)')}`,
    )
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      url: { valueType: 'string', valueText: 'javascript:alert(1)' },
    })
  })

  // A trailing dot satisfies the hostname grammar.
  // 末尾のドットはホスト名の文法を満たす。
  it('hostname accepts "example.com."', async () => {
    const res = await queryParamsApp.request('/params?hostname=example.com.')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: 'example.com.' },
    })
  })

  // A dotted quad satisfies the hostname grammar.
  // ドット区切りの4数値はホスト名の文法を満たす。
  it('hostname accepts "192.168.0.1"', async () => {
    const res = await queryParamsApp.request('/params?hostname=192.168.0.1')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      hostname: { valueType: 'string', valueText: '192.168.0.1' },
    })
  })

  // An empty string is a string: the default gives way to it.
  // 空文字列も文字列である。デフォルトより優先される。
  it('reads an empty string over its default', async () => {
    const res = await queryParamsApp.request('/defaults?str_def=')
    expect(res.status).toBe(200)
    expect(await res.json()).toStrictEqual({
      int_def: { valueType: 'number', valueText: '20' },
      int64_def: { valueType: 'bigint', valueText: '5' },
      num_def: { valueType: 'number', valueText: '0.5' },
      bool_def: { valueType: 'boolean', valueText: 'false' },
      bool_def_true: { valueType: 'boolean', valueText: 'true' },
      str_def: { valueType: 'string', valueText: '' },
      enum_def: { valueType: 'string', valueText: 'asc' },
      arr_def: [],
      arr_int_def: [
        { valueType: 'number', valueText: '1' },
        { valueType: 'number', valueText: '2' },
      ],
    })
  })
})
