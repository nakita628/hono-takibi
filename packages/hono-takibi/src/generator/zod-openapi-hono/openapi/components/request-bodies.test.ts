import { describe, expect, it } from 'vitest'
import type { Components } from '../../../../openapi/index.js'
import { requestBodiesCode } from './request-bodies.js'

describe('requestBodiesCode', () => {
  it('should return empty string when no requestBodies', () => {
    const components: Components = {}
    expect(requestBodiesCode(components, true)).toBe('')
  })

  it('should generate request body with export', () => {
    const components: Components = {
      requestBodies: {
        UserBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  name: { type: 'string' },
                },
              },
            },
          },
        },
      },
    }
    const result = requestBodiesCode(components, true)
    expect(result).toBe(
      `export const UserBodyRequestBody={content:{'application/json':{schema:z.object({name:z.string().exactOptional()})}},required:true}`,
    )
  })

  it('should generate request body without export', () => {
    const components: Components = {
      requestBodies: {
        SimpleBody: {
          content: {
            'application/json': {
              schema: {
                type: 'string',
              },
            },
          },
        },
      },
    }
    const result = requestBodiesCode(components, false)
    expect(result).toBe(
      `const SimpleBodyRequestBody={content:{'application/json':{schema:z.string()}}}`,
    )
  })
})
