import { OpenAPIHono } from '@hono/zod-openapi'

import { getHeadersRoute } from './__generated__/routes'

/** Echoes the runtime `typeof` of every header, which is what the matrix asserts on. */
export const headerParamsApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
}).openapi(getHeadersRoute, (c) => {
  const h = c.req.valid('header')
  return c.json({
    integer: typeof h['x-integer'],
    int32: typeof h['x-int32'],
    int64: typeof h['x-int64'],
    bigint: typeof h['x-bigint'],
    number: typeof h['x-number'],
    float: typeof h['x-float'],
    float32: typeof h['x-float32'],
    float64: typeof h['x-float64'],
    double: typeof h['x-double'],
    numpassword: typeof h['x-numpassword'],
    boolean: typeof h['x-boolean'],
    string: typeof h['x-string'],
    email: typeof h['x-email'],
    uuid: typeof h['x-uuid'],
    uuidv4: typeof h['x-uuidv4'],
    uuidv7: typeof h['x-uuidv7'],
    url: typeof h['x-url'],
    uri: typeof h['x-uri'],
    httpurl: typeof h['x-httpurl'],
    hostname: typeof h['x-hostname'],
    hex: typeof h['x-hex'],
    base64: typeof h['x-base64'],
    base64url: typeof h['x-base64url'],
    nanoid: typeof h['x-nanoid'],
    cuid2: typeof h['x-cuid2'],
    ulid: typeof h['x-ulid'],
    ipv4: typeof h['x-ipv4'],
    ipv6: typeof h['x-ipv6'],
    cidrv4: typeof h['x-cidrv4'],
    cidrv6: typeof h['x-cidrv6'],
    date: typeof h['x-date'],
    time: typeof h['x-time'],
    datetime: typeof h['x-datetime'],
    duration: typeof h['x-duration'],
    byte: typeof h['x-byte'],
    strpassword: typeof h['x-strpassword'],
    mac: typeof h['x-mac'],
    e164: typeof h['x-e164'],
    guid: typeof h['x-guid'],
    trim: typeof h['x-trim'],
    int64Value: String(h['x-int64']),
    idsTypes: (h['x-ids'] ?? []).map((value) => typeof value),
  })
})
