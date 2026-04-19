import { describe, expect, it } from 'vite-plus/test'

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
  return c.json({ status: faker.helpers.arrayElement([faker.helpers.arrayElement(['active', 'inactive', 'pending']), undefined]) }, 200)
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

  describe('namespace-qualified schema names', () => {
    it('sanitizes dotted schema names in mock function definitions', () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'Dotted Mock API', version: '1.0.0' },
        paths: {
          '/auth/me': {
            get: {
              operationId: 'getMe',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/Auth.User' },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            'Auth.User': {
              type: 'object',
              required: ['name'],
              properties: {
                name: { type: 'string' },
              },
            },
          },
        },
      }
      const result = makeMock(spec, '/')
      expect(result).toBe(
        "import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'\nimport { faker } from '@faker-js/faker'\n\nconst AuthUserSchema=z.object({name:z.string()}).openapi({\"required\":[\"name\"]}).openapi('AuthUser')\n\nexport const getAuthMeRoute=createRoute({method:'get',path:'/auth/me',operationId:'getMe',responses:{200:{description:\"OK\",content:{'application/json':{schema:AuthUserSchema}}}}})\n\nfunction mockAuthUser() {\n  return { name: faker.person.fullName() }\n}\n\nconst getAuthMeRouteHandler: RouteHandler<typeof getAuthMeRoute> = async (c) => {\n  return c.json(mockAuthUser(), 200)\n}\n\nconst app = new OpenAPIHono()\n\nexport const api = app\n  .openapi(getAuthMeRoute, getAuthMeRouteHandler)\n\nexport default app",
      )
    })
  })
})
