import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postArrayEdgeRoute,
  postBrandedRoute,
  postCodecRoute,
  postCoerceRoute,
  postCombinatorsRoute,
  postContentChecksRoute,
  postCustomValidationRoute,
  postDefaultsRoute,
  postEnumsRoute,
  postFormatsRoute,
  postMessagesRoute,
  postNumericRoute,
  postObjectEdgeRoute,
  postTransformsRoute,
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

app.openapi(postMessagesRoute, (c) => c.json({}, 200))
app.openapi(postTransformsRoute, (c) => c.json({}, 200))
app.openapi(postCoerceRoute, (c) => c.json({}, 200))
app.openapi(postCodecRoute, (c) => c.json({}, 200))
app.openapi(postCustomValidationRoute, (c) => c.json({}, 200))
app.openapi(postDefaultsRoute, (c) => c.json({}, 200))
app.openapi(postContentChecksRoute, (c) => c.json({}, 200))
app.openapi(postFormatsRoute, (c) => c.json({}, 200))
app.openapi(postBrandedRoute, (c) => c.json({}, 200))
app.openapi(postNumericRoute, (c) => c.json({}, 200))
app.openapi(postArrayEdgeRoute, (c) => c.json({}, 200))
app.openapi(postObjectEdgeRoute, (c) => c.json({}, 200))
app.openapi(postCombinatorsRoute, (c) => c.json({}, 200))
app.openapi(postEnumsRoute, (c) => c.json({}, 200))

export default app
