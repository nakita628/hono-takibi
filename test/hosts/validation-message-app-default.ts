import { OpenAPIHono } from '@hono/zod-openapi'

import { postUsersRoute } from '../__generated__/validation-message/routes'

// Pattern 1: no hook. @hono/zod-openapi answers a validation failure itself: 400 with the
// raw ZodError.
// パターン 1: フックなし。検証の失敗には @hono/zod-openapi 自身が応答し、400 とともに
// 生の ZodError を返す。
const app = new OpenAPIHono()

app.openapi(postUsersRoute, (c) => {
  const { name, email, age } = c.req.valid('json')
  return c.json({ id: 1, name, email, age }, 201)
})

export default app
