import { describe, expect, it } from 'vitest'
import { generateRoute } from './generate-route'
import { DEFAULT_CONFIG } from '../../../../../data/test-config'
import type { Operation } from '../../../../type'

describe('generateRoute', () => {
  it.concurrent(
    'generateRoute("/posts", "post", { operationId: "getRoot", tags: ["Hono"], responses: { "200": { ... } } })',
    () => {
      const path = '/posts'
      const method = 'post'
      const operation: Operation = {
        operationId: 'getRoot',
        tags: ['Hono'],
        description: undefined,
        parameters: undefined,
        requestBody: undefined,
        responses: {
          '200': {
            description: 'Hono🔥',
            content: {
              'application/json': {
                schema: {
                  name: 'root',
                  type: 'object',
                  properties: {
                    message: {
                      name: 'message',
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
      }

      const result = generateRoute(path, method, operation, DEFAULT_CONFIG)
      const expected = `export const postPostsRoute=createRoute({tags:["Hono"],method:'post',path:'/posts',responses:{200:{description:'Hono🔥',content:{'application/json':{schema:z.object({message:z.string().openapi({example:"Hono🔥"})})}},},}})`
      expect(result).toBe(expected)
    },
  )
})
