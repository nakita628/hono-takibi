import { OpenAPIHono } from '@hono/zod-openapi'

import { getCookiesRoute } from './__generated__/routes'

/** Echoes the runtime `typeof` of every cookie, which is what the matrix asserts on. */
export const cookieParamsApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
}).openapi(getCookiesRoute, (c) => {
  const cookies = c.req.valid('cookie')
  return c.json({
    integer: typeof cookies.integer,
    int32: typeof cookies.int32,
    int64: typeof cookies.int64,
    bigint: typeof cookies.bigint,
    number: typeof cookies.number,
    float: typeof cookies.float,
    float32: typeof cookies.float32,
    float64: typeof cookies.float64,
    double: typeof cookies.double,
    numpassword: typeof cookies.numpassword,
    boolean: typeof cookies.boolean,
    string: typeof cookies.string,
    email: typeof cookies.email,
    uuid: typeof cookies.uuid,
    uuidv4: typeof cookies.uuidv4,
    uuidv7: typeof cookies.uuidv7,
    url: typeof cookies.url,
    uri: typeof cookies.uri,
    httpurl: typeof cookies.httpurl,
    hostname: typeof cookies.hostname,
    hex: typeof cookies.hex,
    base64: typeof cookies.base64,
    base64url: typeof cookies.base64url,
    nanoid: typeof cookies.nanoid,
    cuid2: typeof cookies.cuid2,
    ulid: typeof cookies.ulid,
    ipv4: typeof cookies.ipv4,
    ipv6: typeof cookies.ipv6,
    cidrv4: typeof cookies.cidrv4,
    cidrv6: typeof cookies.cidrv6,
    date: typeof cookies.date,
    time: typeof cookies.time,
    datetime: typeof cookies.datetime,
    duration: typeof cookies.duration,
    byte: typeof cookies.byte,
    strpassword: typeof cookies.strpassword,
    e164: typeof cookies.e164,
    creditcard: typeof cookies.creditcard,
    iban: typeof cookies.iban,
    currencycode: typeof cookies.currencycode,
    ksuid: typeof cookies.ksuid,
    xid: typeof cookies.xid,
    guid: typeof cookies.guid,
    trim: typeof cookies.trim,
    uint32: typeof cookies.uint32,
    uint64: typeof cookies.uint64,
    int64Value: String(cookies.int64),
    idsTypes: (cookies.ids ?? []).map((value) => typeof value),
  })
})
