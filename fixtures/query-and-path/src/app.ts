import { OpenAPIHono } from '@hono/zod-openapi'
import {
  getItemsBooleanFlagRoute,
  getItemsInt32IdRoute,
  getItemsInt64IdRoute,
  getItemsIntegerIdRoute,
  getItemsMixedIdSubFlagRoute,
  getItemsNumberValueRoute,
  getQBooleanRoute,
  getQInt32Route,
  getQInt64Route,
  getQIntegerRoute,
  getQMixedRoute,
  getQNumberRoute,
  getSearchArrayRoute,
  getSearchOptionalRoute,
  getSearchRoute,
} from './generated.ts'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json(
        {
          ok: false,
          issues: result.error.issues.map((i) => ({
            path: i.path.join('.'),
            code: i.code,
            message: i.message,
          })),
        },
        422,
      )
    }
  },
})

// ── Path params ─────────────────────────────────────────────
app.openapi(getItemsIntegerIdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, type: typeof id }, 200)
})

app.openapi(getItemsInt32IdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id, type: typeof id }, 200)
})

app.openapi(getItemsInt64IdRoute, (c) => {
  const { id } = c.req.valid('param')
  return c.json({ id: String(id), type: typeof id }, 200)
})

app.openapi(getItemsNumberValueRoute, (c) => {
  const { value } = c.req.valid('param')
  return c.json({ value, type: typeof value }, 200)
})

app.openapi(getItemsBooleanFlagRoute, (c) => {
  const { flag } = c.req.valid('param')
  return c.json({ flag, type: typeof flag }, 200)
})

app.openapi(getItemsMixedIdSubFlagRoute, (c) => {
  const { id, flag } = c.req.valid('param')
  return c.json({ id, idType: typeof id, flag, flagType: typeof flag }, 200)
})

// ── Single-type query params (per-type echo for verify table) ──
app.openapi(getQIntegerRoute, (c) => {
  const { v } = c.req.valid('query')
  return c.json({ id: v, type: typeof v }, 200)
})

app.openapi(getQInt32Route, (c) => {
  const { v } = c.req.valid('query')
  return c.json({ id: v, type: typeof v }, 200)
})

app.openapi(getQInt64Route, (c) => {
  const { v } = c.req.valid('query')
  return c.json({ id: String(v), type: typeof v }, 200)
})

app.openapi(getQNumberRoute, (c) => {
  const { v } = c.req.valid('query')
  return c.json({ value: v, type: typeof v }, 200)
})

app.openapi(getQBooleanRoute, (c) => {
  const { v } = c.req.valid('query')
  return c.json({ flag: v, type: typeof v }, 200)
})

app.openapi(getQMixedRoute, (c) => {
  const { id, flag } = c.req.valid('query')
  return c.json({ id, idType: typeof id, flag, flagType: typeof flag }, 200)
})

// ── Query params ────────────────────────────────────────────
app.openapi(getSearchRoute, (c) => {
  const { q, limit, price, active } = c.req.valid('query')
  return c.json(
    {
      q,
      qType: typeof q,
      limit,
      limitType: typeof limit,
      price,
      priceType: typeof price,
      active,
      activeType: typeof active,
    },
    200,
  )
})

app.openapi(getSearchOptionalRoute, (c) => {
  const { limit, active } = c.req.valid('query')
  return c.json(
    {
      limit: limit ?? -1,
      limitType: typeof limit,
      active: active ?? false,
      activeType: typeof active,
    },
    200,
  )
})

app.openapi(getSearchArrayRoute, (c) => {
  const { ids, flags } = c.req.valid('query')
  return c.json(
    {
      ids,
      idsTypes: ids.map((v) => typeof v),
      flags,
      flagsTypes: flags.map((v) => typeof v),
    },
    200,
  )
})

export default app
