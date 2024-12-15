import { describe, expect, it } from 'vitest'
import { Operation } from '../../types'
import { isOperation } from './is-operation'

const isOperationTestCases: { obj: Operation; expected: boolean }[] = [
  {
    obj: {
      tags: ['products'],
      summary: 'List all products',
      description: 'Retrieve a list of all products available in the store.',
      operationId: 'listProducts',
      parameters: [
        {
          name: 'category',
          in: 'query',
          description: 'Filter products by category',
          required: false,
          schema: {
            type: 'string',
          },
        },
        {
          name: 'priceMin',
          in: 'query',
          description: 'Minimum price filter',
          required: false,
          schema: {
            type: 'number',
            format: 'float',
          },
        },
        {
          name: 'priceMax',
          in: 'query',
          description: 'Maximum price filter',
          required: false,
          schema: {
            type: 'number',
            format: 'float',
          },
        },
      ],
      responses: {
        '200': {
          description: 'A list of products',
          content: {
            'application/json': {
              schema: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
        },
      },
    },
    expected: true,
  },
]

describe('isOperation', () => {
  it.concurrent.each(isOperationTestCases)('isOperation($object) -> $expected', async ({ obj, expected }) => {
    const result = isOperation(obj)
    expect(result).toBe(expected)
  })
})
