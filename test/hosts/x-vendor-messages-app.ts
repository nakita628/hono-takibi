import { OpenAPIHono } from '@hono/zod-openapi'

import {
  postBasketRoute,
  postBoundsRoute,
  postCompositionRoute,
  postContainsDefaultRoute,
  postDictionaryRoute,
  postFormRoute,
  postMergedArrowRoute,
  postMergedRoute,
  postMiscRoute,
  postImplicationRoute,
  postPaymentRoute,
  postStrictAllofRoute,
  postWriteOnlyRoute,
} from '../__generated__/x-vendor-messages/generated'

// A `defaultHook` answers every validation failure with 422 and RFC 9457 Problem Details:
// for each issue, the pointer to the value and the message of the issue.
// `defaultHook` が、すべての検証失敗に 422 と RFC 9457 の Problem Details で応答する。
// issue ごとに、値への pointer と、issue のメッセージを返す。
const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        pointer: `/${issue.path.join('/')}`,
        detail: issue.message,
      }))
      return c.json(
        {
          type: 'about:blank',
          title: 'Unprocessable Content',
          status: 422,
          detail: 'Request validation failed',
          errors,
        },
        422,
      )
    }
    return undefined
  },
})

// Every handler answers the body as it came out of validation.
// すべてのハンドラは、検証を通過した後のボディをそのまま返す。
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
