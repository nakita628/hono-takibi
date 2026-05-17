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
  postPaymentRoute,
  postWriteOnlyRoute,
} from './generated.ts'

// No defaultHook — uses @hono/zod-openapi default behavior:
// failed validation responds with raw ZodError + status 400.
// Each handler echoes c.req.valid('json') so success-path tests can assert
// the parsed payload exactly matches the input (toStrictEqual completion).
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

export default app
