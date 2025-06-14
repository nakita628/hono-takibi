import { describe, it, expect } from 'vitest'
import { generateRequestBody } from './generate-request-body'
import type { Content } from '../../../../../../openapi'

const generateRequestBodyTestCases: {
  required: boolean
  content: Content
  schema: string
  expected: string
}[] = [
  {
    required: true,
    content: {
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
    schema: 'z.object({post: z.string().min(1).max(140)})',
    expected: `body:{required:true,content:{'application/json':{schema:z.object({post: z.string().min(1).max(140)})}},},`,
  },
  {
    required: true,
    content: {
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
    schema: `z.object({
  id: z.number().int().openapi({ example: 10 }).optional(),
  name: z.string().openapi({ example: 'doggie' }),
  category: categorySchema.optional(),
  photoUrls: z.array(z.string()),
  tags: z.array(tagSchema).optional(),
  status: z.enum(['available', 'pending', 'sold']).optional(),
})`,
    expected: `body:{required:true,content:{'application/json':{schema:z.object({
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
})}},},`,
  },
  // duplication
  {
    required: true,
    content: {
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
    schema: 'petSchema',
    expected: `body:{required:true,content:{'application/json':{schema:petSchema},'application/xml':{schema:petSchema},'application/x-www-form-urlencoded':{schema:petSchema}},},`,
  },
]

describe('generateRequestBody valid cases', () => {
  it.concurrent.each(generateRequestBodyTestCases)(
    'generateRequestBody($required, $content, $schema) -> $expected',
    async ({ content, schema, required, expected }) => {
      const result = generateRequestBody(required, content, schema)
      expect(result).toBe(expected)
    },
  )
})

describe('generateRequestBody edge cases', () => {
  it.concurrent('should throw an error when content is null', () => {
    // biome-ignore lint:
    const content = null as any
    const required = true
    const schema = 'z.object({})'

    expect(() => generateRequestBody(required, content, schema)).toThrow(
      'Cannot convert undefined or null to object',
    )
  })

  it.concurrent('should throw an error when content is undefined', () => {
    // biome-ignore lint:
    const content = undefined as any
    const required = true
    const schema = 'z.object({})'

    expect(() => generateRequestBody(required, content, schema)).toThrow(
      'Cannot convert undefined or null to object',
    )
  })
})
