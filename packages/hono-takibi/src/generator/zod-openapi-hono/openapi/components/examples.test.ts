import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { examplesCode } from './examples.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/examples.test.ts

describe('examplesCode', () => {
  it('should return empty string when no examples', () => {
    const components: Components = {}
    expect(examplesCode(components, true)).toBe('')
  })

  it('should generate example with export', () => {
    const components: Components = {
      examples: {
        UserExample: {
          summary: 'Example user',
          value: { id: 1, name: 'John' },
        },
      },
    }
    const result = examplesCode(components, true)
    expect(result).toBe(
      `export const UserExample={"summary":"Example user","value":{"id":1,"name":"John"}}`,
    )
  })

  it('should generate example without export', () => {
    const components: Components = {
      examples: {
        SimpleExample: {
          value: 'test',
        },
      },
    }
    const result = examplesCode(components, false)
    expect(result).toBe(`const SimpleExample={"value":"test"}`)
  })
})
