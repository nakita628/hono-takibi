import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { linksCode } from './links.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/links.test.ts

describe('linksCode', () => {
  it('should return empty string when no links', () => {
    const components: Components = {}
    expect(linksCode(components, true)).toBe('')
  })

  it('should generate link with export', () => {
    const components: Components = {
      links: {
        GetUserById: {
          operationId: 'getUser',
          parameters: { userId: '$response.body#/id' },
        },
      },
    }
    const result = linksCode(components, true)
    expect(result).toBe(
      `export const GetUserByIdLink={operationId:"getUser",parameters:{"userId":"$response.body#/id"}}`,
    )
  })

  it('should generate link without export', () => {
    const components: Components = {
      links: {
        SimpleLink: {
          operationId: 'simpleOp',
        },
      },
    }
    const result = linksCode(components, false)
    expect(result).toBe(`const SimpleLink={operationId:"simpleOp"}`)
  })
})
