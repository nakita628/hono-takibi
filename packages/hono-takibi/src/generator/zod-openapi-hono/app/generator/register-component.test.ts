import { describe, it, expect } from 'vitest'
import { registerComponent } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/register-component/generate-register-component.test.ts

describe('registerComponent', () => {
  it.concurrent('registerComponent success', () => {
    const result = registerComponent({
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    })

    const expected = `app.openAPIRegistry.registerComponent('securitySchemes', 'jwt', ${JSON.stringify(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    )})`

    expect(result).toBe(expected)
  })
})
