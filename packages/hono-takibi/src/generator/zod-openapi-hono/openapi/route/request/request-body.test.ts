import { describe, it, expect } from 'vitest'
import { requestBody } from '.'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/route/request/body/request-body.test.ts

describe('requestBody', () => {
  it.concurrent('requestBody 1', () => {
    const result = requestBody(
      true,
      {
        'application/json': {
          schema: {
            type: 'object',
            properties: {
              post: {
                type: 'string',
                description: 'Content of the post',
                minLength: 1,
                maxLength: 140,
              },
            },
            required: ['post'],
          },
          example: {
            post: 'This is my first post!',
          },
        },
      },
      'z.object({post: z.string().min(1).max(140)})',
    )

    const expected = `body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)})}},},`
    expect(result).toBe(expected)
  })

  it.concurrent('requestBody 2', () => {
    const result = requestBody(
      true,
      {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
        'application/x-www-form-urlencoded': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
      },
      `z.object({
  id: z.number().int().openapi({ example: 10 }).optional(),
  name: z.string().openapi({ example: 'doggie' }),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})`,
    )

    const expected = `body:{required:true,content:{'application/json':{schema:z.object({
  id: z.number().int().openapi({ example: 10 }).optional(),
  name: z.string().openapi({ example: 'doggie' }),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})},'application/xml':{schema:z.object({
  id: z.number().int().openapi({ example: 10 }).optional(),
  name: z.string().openapi({ example: 'doggie' }),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})},'application/x-www-form-urlencoded':{schema:z.object({
  id: z.number().int().openapi({ example: 10 }).optional(),
  name: z.string().openapi({ example: 'doggie' }),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})}},},`
    expect(result).toBe(expected)
  })

  it.concurrent('requestBody 3', () => {
    const result = requestBody(
      true,
      {
        'application/json': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
        'application/xml': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
        'application/x-www-form-urlencoded': {
          schema: {
            $ref: '#/components/schemas/Pet',
          },
        },
      },
      'petSchema',
    )
    const expected = `body:{required:true,content:{'application/json':{schema:petSchema},'application/xml':{schema:petSchema},'application/x-www-form-urlencoded':{schema:petSchema}},},`
    expect(result).toBe(expected)
  })

  it.concurrent('should throw an error when content is null', () => {
    // biome-ignore lint:
    const content = null as any
    const required = true
    const schema = 'z.object({})'

    expect(() => requestBody(required, content, schema)).toThrow(
      'Cannot convert undefined or null to object',
    )
  })

  it.concurrent('should throw an error when content is undefined', () => {
    // biome-ignore lint:
    const content = undefined as any
    const required = true
    const schema = 'z.object({})'

    expect(() => requestBody(required, content, schema)).toThrow(
      'Cannot convert undefined or null to object',
    )
  })
})
