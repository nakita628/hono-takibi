import { describe, expect, it } from 'vite-plus/test'

import { fmt } from '../../format/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { makeMock } from './index.js'

async function format(spec: OpenAPI, basePath: string) {
  const result = await fmt(makeMock(spec, basePath))
  if (!result.ok) throw new Error(result.error)
  return result.value
}

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

const minimalExpected = (appInit: string) =>
  `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  operationId: 'getHealth',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.object({ status: z.string().exactOptional() }) } },
    },
  },
})

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  return c.json(
    {
      status: faker.helpers.arrayElement([
        faker.helpers.arrayElement(['active', 'inactive', 'pending']),
        undefined,
      ]),
    },
    200,
  )
}

const app = new OpenAPIHono()${appInit}

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

describe('makeMock', () => {
  describe('basePath: "/"', () => {
    it('generates mock without .basePath()', async () => {
      expect(await format(minimalOpenAPI, '/')).toBe(minimalExpected(''))
    })
  })

  describe('basePath: "/api"', () => {
    it('generates mock with .basePath("/api")', async () => {
      expect(await format(minimalOpenAPI, '/api')).toBe(minimalExpected(".basePath('/api')"))
    })
  })

  describe('basePath: "/api/v1"', () => {
    it('generates mock with .basePath("/api/v1")', async () => {
      expect(await format(minimalOpenAPI, '/api/v1')).toBe(minimalExpected(".basePath('/api/v1')"))
    })
  })

  describe('namespace-qualified schema names', () => {
    it('sanitizes dotted schema names in mock function definitions', async () => {
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
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const AuthUserSchema = z
  .object({ name: z.string() })
  .openapi({ required: ['name'] })
  .openapi('AuthUser')

export const getAuthMeRoute = createRoute({
  method: 'get',
  path: '/auth/me',
  operationId: 'getMe',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: AuthUserSchema } } },
  },
})

function mockAuthUser() {
  return { name: faker.person.fullName() }
}

const getAuthMeRouteHandler: RouteHandler<typeof getAuthMeRoute> = async (c) => {
  return c.json(mockAuthUser(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getAuthMeRoute, getAuthMeRouteHandler)

export default app
`)
    })
  })

  describe('multi-route', () => {
    it('chains .openapi() calls for each route', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/users': {
            get: {
              operationId: 'listUsers',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'integer' } },
                        required: ['id'],
                      },
                    },
                  },
                },
              },
            },
            post: {
              operationId: 'createUser',
              responses: {
                '201': {
                  description: 'Created',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'integer' } },
                        required: ['id'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'listUsers',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.int() }).openapi({ required: ['id'] }) },
      },
    },
  },
})

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  responses: {
    201: {
      description: 'Created',
      content: {
        'application/json': { schema: z.object({ id: z.int() }).openapi({ required: ['id'] }) },
      },
    },
  },
})

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  return c.json({ id: faker.number.int({ min: 1, max: 99999 }) }, 200)
}

const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  return c.json({ id: faker.number.int({ min: 1, max: 99999 }) }, 201)
}

const app = new OpenAPIHono()

export const api = app
  .openapi(getUsersRoute, getUsersRouteHandler)
  .openapi(postUsersRoute, postUsersRouteHandler)

export default app
`)
    })
  })

  describe('bearer auth with 401 response', () => {
    it('generates Authorization header check', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        components: {
          securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } },
        },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ bearerAuth: [] }],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'integer' } },
                        required: ['id'],
                      },
                    },
                  },
                },
                '401': { description: 'Unauthorized' },
              },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'getMe',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.int() }).openapi({ required: ['id'] }) },
      },
    },
    401: { description: 'Unauthorized' },
  },
  security: [{ bearerAuth: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json({ id: faker.number.int({ min: 1, max: 99999 }) }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })
  })

  describe('204 No Content response', () => {
    it('returns null body with 204 status', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/ping': {
            delete: {
              operationId: 'ping',
              responses: { '204': { description: 'No Content' } },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const deletePingRoute = createRoute({
  method: 'delete',
  path: '/ping',
  operationId: 'ping',
  responses: { 204: { description: 'No Content' } },
})

const deletePingRouteHandler: RouteHandler<typeof deletePingRoute> = async (_c) => {
  return new Response(null, { status: 204 })
}

const app = new OpenAPIHono()

export const api = app.openapi(deletePingRoute, deletePingRouteHandler)

export default app
`)
    })
  })
})
