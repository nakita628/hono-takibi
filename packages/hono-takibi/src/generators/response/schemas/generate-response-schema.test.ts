import { describe, expect, it } from 'vitest'
import { generateResponseSchema } from './generate-response-schema'
import type { Responses } from '../../../types'

const generateResponseSchemaTestCases: { responses: Responses; expected: string }[] = [
  // hono-example
  {
    responses: {
      '200': {
        description: 'Successful response with a welcome message.',
        content: {
          'application/json': {
            schema: {
              type: 'object',
              properties: {
                message: {
                  type: 'string',
                  example: 'Hono🔥',
                },
              },
              required: ['message'],
            },
          },
        },
      },
    },
    expected: `200:{description:'Successful response with a welcome message.',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}},},`,
  },
  // pet-store-example
  {
    responses: {
      '200': {
        description: 'successful operation',
        headers: {
          'X-Rate-Limit': {
            description: 'calls per hour allowed by the user',
            schema: {
              type: 'integer',
              format: 'int32',
            },
          },
          'X-Expires-After': {
            description: 'date in UTC when token expires',
            schema: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        content: {
          'application/xml': {
            schema: {
              type: 'string',
            },
          },
          'application/json': {
            schema: {
              type: 'string',
            },
          },
        },
      },
      '400': {
        description: 'Invalid username/password supplied',
      },
    },
    expected: `200:{description:'successful operation',content:{'application/xml':{schema:z.string()},'application/json':{schema:z.string()}},},400:{description:'Invalid username/password supplied',},`,
  },
  // pet-store-example
  {
    responses: {
      '200': {
        description: 'successful operation',
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/Order',
            },
          },
          'application/xml': {
            schema: {
              $ref: '#/components/schemas/Order',
            },
          },
        },
      },
      '400': {
        description: 'Invalid ID supplied',
      },
      '404': {
        description: 'Order not found',
      },
    },
    expected: `200:{description:'successful operation',content:{'application/json':{schema:orderSchema},'application/xml':{schema:orderSchema}},},400:{description:'Invalid ID supplied',},404:{description:'Order not found',},`,
  },
]

describe('generateResponseSchema', () => {
  it.concurrent.each(generateResponseSchemaTestCases)(
    'generateResponseSchema(%responses) -> %expected',
    ({ responses, expected }) => {
      const result = generateResponseSchema(responses)
      expect(result).toBe(expected)
    },
  )
})
