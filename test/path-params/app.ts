import { OpenAPIHono } from '@hono/zod-openapi'

import {
  getBase64ValueRoute,
  getBase64urlValueRoute,
  getBigintValueRoute,
  getBooleanValueRoute,
  getByteValueRoute,
  getCidrv4ValueRoute,
  getCidrv6ValueRoute,
  getCuid2ValueRoute,
  getDateValueRoute,
  getDatetimeValueRoute,
  getDoubleValueRoute,
  getDurationValueRoute,
  getE164ValueRoute,
  getEmailValueRoute,
  getEmojiValueRoute,
  getFloat32ValueRoute,
  getFloat64ValueRoute,
  getFloatValueRoute,
  getGuidValueRoute,
  getHexValueRoute,
  getHostnameValueRoute,
  getHttpurlValueRoute,
  getInt32ValueRoute,
  getInt64ValueRoute,
  getIntegerValueRoute,
  getIpv4ValueRoute,
  getIpv6ValueRoute,
  getMacValueRoute,
  getNanoidValueRoute,
  getNumberValueRoute,
  getNumpasswordValueRoute,
  getStringValueRoute,
  getStrpasswordValueRoute,
  getTimeValueRoute,
  getTrimValueRoute,
  getTxemailValueRoute,
  getTxlowerValueRoute,
  getTxnormalizeValueRoute,
  getTxupperValueRoute,
  getUlidValueRoute,
  getUriValueRoute,
  getUrlValueRoute,
  getUuidValueRoute,
  getUuidv4ValueRoute,
  getUuidv7ValueRoute,
} from './__generated__/routes'

/** Echoes the runtime `typeof` of the path parameter, which is what the matrix asserts on. */
export const pathParamsApp = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(getIntegerValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getInt32ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getInt64ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getBigintValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getNumberValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getFloatValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getFloat32ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getFloat64ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getDoubleValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getNumpasswordValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getBooleanValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: String(value) })
  })
  .openapi(getStringValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getEmailValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUuidValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUuidv4ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUuidv7ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUrlValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUriValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getHttpurlValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getHostnameValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getHexValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getEmojiValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getBase64ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getBase64urlValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getNanoidValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getCuid2ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getUlidValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getIpv4ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getIpv6ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getCidrv4ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getCidrv6ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getDateValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTimeValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getDatetimeValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getDurationValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getByteValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getStrpasswordValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getMacValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getE164ValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getGuidValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTrimValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTxlowerValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTxupperValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTxnormalizeValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
  .openapi(getTxemailValueRoute, (c) => {
    const { value } = c.req.valid('param')
    return c.json({ valueType: typeof value, valueText: value })
  })
