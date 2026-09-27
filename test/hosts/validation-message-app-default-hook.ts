import { OpenAPIHono } from '@hono/zod-openapi'

import { postUsersRoute } from '../__generated__/validation-message/routes'

// Pattern 2: a `defaultHook` on the app answers every validation failure of every route.
// It builds RFC 9457 Problem Details from the metadata of each issue (code, origin,
// minimum, format), so the messages are the application's own and the generated schema
// carries none.
// パターン 2: アプリの `defaultHook` が、すべてのルートのすべての検証失敗に応答する。
// 各 issue のメタデータ(code・origin・minimum・format)から RFC 9457 の Problem Details を
// 組み立てる。メッセージはアプリケーション独自のものであり、生成されたスキーマには
// メッセージが含まれない。
const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) {
      const errors = result.error.issues.map((issue) => {
        let detail = issue.message
        // oxlint-disable-next-line typescript/switch-exhaustiveness-check -- the default branch covers every other issue code
        switch (issue.code) {
          case 'too_small':
            detail =
              issue.origin === 'string'
                ? `Must be at least ${issue.minimum} characters`
                : issue.origin === 'array'
                  ? `Must have at least ${issue.minimum} items`
                  : `Must be at least ${issue.minimum}`
            break
          case 'too_big':
            detail =
              issue.origin === 'string'
                ? `Must be at most ${issue.maximum} characters`
                : issue.origin === 'array'
                  ? `Must have at most ${issue.maximum} items`
                  : `Must be at most ${issue.maximum}`
            break
          case 'invalid_format':
            if (issue.format === 'email') detail = 'Invalid email address'
            else if (issue.format === 'uuid') detail = 'Invalid UUID'
            else if (issue.format === 'url') detail = 'Invalid URL'
            else detail = `Invalid format: ${issue.format}`
            break
          case 'invalid_type':
            // Zod 4 does not put the input on the issue, so a missing value is told apart
            // from a value of the wrong type by the message, which ends in what was received.
            // Zod 4 は issue に入力値を含めない。そのため、値の欠落と型の誤りは、受け取った
            // 値の種類で終わるメッセージによって区別する。
            detail = issue.message.endsWith('received undefined')
              ? 'This field is required'
              : `Expected ${issue.expected}`
            break
          default:
            break
        }
        return { pointer: `/${issue.path.join('/')}`, detail }
      })
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

app.openapi(postUsersRoute, (c) => {
  const { name, email, age } = c.req.valid('json')
  return c.json({ id: 1, name, email, age }, 201)
})

export default app
