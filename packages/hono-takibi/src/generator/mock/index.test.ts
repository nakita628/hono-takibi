import { describe, expect, it } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { makeMock } from './index.js'

const minimalOpenAPI: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Test API', version: '1.0.0' },
  paths: {
    '/health': {
      get: {
        operationId: 'getHealth',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: { type: 'object', properties: { status: { type: 'string' } } },
              },
            },
          },
        },
      },
    },
  },
}

const expected = (appInit: string) =>
  `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'



export const getHealthRoute=createRoute({method:'get',path:'/health',operationId:'getHealth',responses:{200:{description:"OK",content:{'application/json':{schema:z.object({status:z.string().exactOptional()})}}}}})



const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json({
    status: faker.helpers.arrayElement([faker.helpers.arrayElement(['active', 'inactive', 'pending']), undefined])
  }, 200)
}

const app = new OpenAPIHono()${appInit}

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)

export default app`

describe('makeMock', () => {
  describe('basePath: "/"', () => {
    it('generates mock without .basePath()', () => {
      expect(makeMock(minimalOpenAPI, '/')).toBe(expected(''))
    })
  })

  describe('basePath: "/api"', () => {
    it('generates mock with .basePath("/api")', () => {
      expect(makeMock(minimalOpenAPI, '/api')).toBe(expected(".basePath('/api')"))
    })
  })

  describe('basePath: "/api/v1"', () => {
    it('generates mock with .basePath("/api/v1")', () => {
      expect(makeMock(minimalOpenAPI, '/api/v1')).toBe(expected(".basePath('/api/v1')"))
    })
  })
})
