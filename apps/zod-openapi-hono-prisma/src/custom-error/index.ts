import { z } from '@hono/zod-openapi'

export function customError(): void {
  z.config({
    customError: (iss) => {
      if (iss.code === 'too_small') {
        return {
          message:
            iss.minimum <= 0
              ? 'No minimum length required'
              : `At least ${iss.minimum} character${iss.minimum === 1 ? '' : 's'} are required`,
        }
      }
      if (iss.code === 'invalid_format') {
        return {
          message: 'Invalid format',
        }
      }
      return 'Validation error'
    },
  })
}
