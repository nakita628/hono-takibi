import { OpenAPIHono } from '@hono/zod-openapi'

import { postUsersRoute } from '../__generated__/validation-message/routes'

// Pattern 3: a hook passed as the third argument of `app.openapi` answers the validation
// failures of that route alone. It builds the same RFC 9457 Problem Details as pattern 2.
// パターン 3: `app.openapi` の第3引数に渡したフックが、そのルートの検証失敗だけに応答する。
// 組み立てる RFC 9457 の Problem Details は、パターン 2 と同じである。
const app = new OpenAPIHono()

app.openapi(
  postUsersRoute,
  (c) => {
    const { name, email, age } = c.req.valid('json')
    return c.json({ id: 1, name, email, age }, 201)
  },
  (result, c) => {
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
          type: 'about:blank' as const,
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
)

export default app
