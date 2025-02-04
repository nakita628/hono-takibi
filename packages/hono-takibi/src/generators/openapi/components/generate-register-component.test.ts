import { describe, expect, it } from 'vitest'
import { generateRegisterComponent } from './generate-register-component'

const generateRegisterComponentTestCases = [
  {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
    expected: `app.openAPIRegistry.registerComponent('securitySchemes', 'jwt', ${JSON.stringify({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
    })})`,
  },
]

describe('generateRegisterComponent', () => {
  it.concurrent.each(generateRegisterComponentTestCases)(
    'should generate register component for $securitySchemes',
    ({ securitySchemes, expected }) => {
      const result = generateRegisterComponent(securitySchemes)
      expect(result).toBe(expected)
    },
  )
})
