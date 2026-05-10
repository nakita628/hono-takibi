import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postCompositionRoute,
  postDictionaryRoute,
  postFormRoute,
  postMergedArrowRoute,
  postMergedRoute,
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

export default app
