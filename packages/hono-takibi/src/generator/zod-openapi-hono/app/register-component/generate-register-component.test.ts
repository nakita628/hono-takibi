import { describe, it, expect } from 'vitest'
import { generateRegisterComponent } from './generate-register-component'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/app/register-component/generate-register-component.test.ts

describe('generateRegisterComponent', () => {
  it.concurrent('generateRegisterComponent success', () => {
    const result = generateRegisterComponent({
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
