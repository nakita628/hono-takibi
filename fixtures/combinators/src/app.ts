import { OpenAPIHono } from '@hono/zod-openapi'
import {
  postAllOfArrowRoute,
  postAllOfChainRoute,
  postAllOfMsgRoute,
  postAllOfRoute,
  postAnyOfMsgRoute,
  postAnyOfOverlapRoute,
  postAnyOfRoute,
  postNotArrowRoute,
  postNotConstRoute,
  postNotMsgRoute,
  postNotRoute,
  postOneOfArrowRoute,
  postOneOfMsgRoute,
  postOneOfOverlapRoute,
  postOneOfRoute,
} from './generated.ts'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => ({
        pointer: `/${issue.path.join('/')}`,
        detail: issue.message,
        code: issue.code,
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

app.openapi(postOneOfRoute, (c) => c.json({}, 200))
app.openapi(postAnyOfRoute, (c) => c.json({}, 200))
app.openapi(postAllOfRoute, (c) => c.json({}, 200))
app.openapi(postNotRoute, (c) => c.json({}, 200))
app.openapi(postOneOfMsgRoute, (c) => c.json({}, 200))
app.openapi(postAnyOfMsgRoute, (c) => c.json({}, 200))
app.openapi(postAllOfMsgRoute, (c) => c.json({}, 200))
app.openapi(postNotMsgRoute, (c) => c.json({}, 200))
app.openapi(postOneOfOverlapRoute, (c) => c.json({}, 200))
app.openapi(postAnyOfOverlapRoute, (c) => c.json({}, 200))
app.openapi(postAllOfChainRoute, (c) => c.json({}, 200))
app.openapi(postNotConstRoute, (c) => c.json({}, 200))
app.openapi(postAllOfArrowRoute, (c) => c.json({}, 200))
app.openapi(postOneOfArrowRoute, (c) => c.json({}, 200))
app.openapi(postNotArrowRoute, (c) => c.json({}, 200))

export default app
