import { z } from '@hono/zod-openapi'

export function customError(): void {
  z.config({
    customError: (iss) => {
      if (iss.code === 'invalid_format') {
        if (iss.format === 'uuid') {
          return `${iss.path} must be UUID`
        }
        return iss.message
      }
      return iss.message
    },
  })
}
