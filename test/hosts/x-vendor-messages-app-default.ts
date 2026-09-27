import { OpenAPIHono } from '@hono/zod-openapi'

import {
  postBasketRoute,
  postBoundsRoute,
  postCompositionRoute,
  postContainsDefaultRoute,
  postDictionaryRoute,
  postFormRoute,
  postImplicationRoute,
  postMergedArrowRoute,
  postMergedRoute,
  postMiscRoute,
  postPaymentRoute,
  postStrictAllofRoute,
  postWriteOnlyRoute,
} from '../__generated__/x-vendor-messages/generated'

// No hook: @hono/zod-openapi answers a validation failure itself, with 400 and the raw
// ZodError. Every handler answers the body as it came out of validation.
// フックなし。検証の失敗には @hono/zod-openapi 自身が応答し、400 とともに生の ZodError を
// 返す。すべてのハンドラは、検証を通過した後のボディをそのまま返す。
const app = new OpenAPIHono()

app.openapi(postFormRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postCompositionRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postDictionaryRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postMergedRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postMergedArrowRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postPaymentRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postBoundsRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postBasketRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postContainsDefaultRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postWriteOnlyRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postMiscRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postStrictAllofRoute, (c) => c.json(c.req.valid('json'), 200))
app.openapi(postImplicationRoute, (c) => c.json(c.req.valid('json'), 200))

export default app
