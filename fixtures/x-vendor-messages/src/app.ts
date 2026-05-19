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
} from './generated.ts'

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
  },
})

app.openapi(postFormRoute, (c) => c.json({}, 200))
app.openapi(postCompositionRoute, (c) => c.json({}, 200))
app.openapi(postDictionaryRoute, (c) => c.json({}, 200))
app.openapi(postMergedRoute, (c) => c.json({}, 200))
app.openapi(postMergedArrowRoute, (c) => c.json({}, 200))
app.openapi(postPaymentRoute, (c) => c.json({}, 200))
app.openapi(postBoundsRoute, (c) => c.json({}, 200))
app.openapi(postBasketRoute, (c) => c.json({}, 200))
app.openapi(postContainsDefaultRoute, (c) => c.json({}, 200))
app.openapi(postWriteOnlyRoute, (c) => c.json({}, 200))
app.openapi(postMiscRoute, (c) => c.json({}, 200))
app.openapi(postStrictAllofRoute, (c) => c.json({}, 200))
app.openapi(postImplicationRoute, (c) => c.json({}, 200))

export default app
