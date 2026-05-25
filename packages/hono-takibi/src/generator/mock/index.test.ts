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

  describe('apiKey/cookie auth with 401', () => {
    it('emits getCookie import and cookie check', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: {
          securitySchemes: { cookieAuth: { type: 'apiKey', in: 'cookie', name: 'session' } },
        },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ cookieAuth: [] }],
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
import { getCookie } from 'hono/cookie'

const CookieAuthSecurityScheme = { type: 'apiKey', in: 'cookie', name: 'session' }

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
  security: [{ cookieAuth: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!getCookie(c, 'session')) {
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

  describe('apiKey/query auth with 401', () => {
    it('emits c.req.query check', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: {
          securitySchemes: { qkey: { type: 'apiKey', in: 'query', name: 'api_key' } },
        },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ qkey: [] }],
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

const QkeySecurityScheme = { type: 'apiKey', in: 'query', name: 'api_key' }

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
  security: [{ qkey: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.query('api_key')) {
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

  describe('apiKey/header auth with 401', () => {
    it('emits c.req.header check with custom header name', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: {
          securitySchemes: { hkey: { type: 'apiKey', in: 'header', name: 'X-API-Key' } },
        },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ hkey: [] }],
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

const HkeySecurityScheme = { type: 'apiKey', in: 'header', name: 'X-API-Key' }

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
  security: [{ hkey: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
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

  describe('basic auth with 401', () => {
    it('emits Authorization header check', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: { securitySchemes: { basicAuth: { type: 'http', scheme: 'basic' } } },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ basicAuth: [] }],
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

const BasicAuthSecurityScheme = { type: 'http', scheme: 'basic' }

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
  security: [{ basicAuth: [] }],
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

  describe('oauth2 with 401', () => {
    it('emits Authorization header check', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: { securitySchemes: { oauth: { type: 'oauth2', flows: {} } } },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              security: [{ oauth: [] }],
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

const OauthSecurityScheme = { type: 'oauth2', flows: {} }

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
  security: [{ oauth: [] }],
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

  describe('security defined but no 401 response', () => {
    it('omits auth check entirely (has401 = false)', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: { securitySchemes: { bearerAuth: { type: 'http', scheme: 'bearer' } } },
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
  },
  security: [{ bearerAuth: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  return c.json({ id: faker.number.int({ min: 1, max: 99999 }) }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })
  })

  describe('text/plain response', () => {
    it('emits c.text() handler', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/greet': {
            get: {
              operationId: 'greet',
              responses: {
                '200': {
                  description: 'OK',
                  content: { 'text/plain': { schema: { type: 'string' } } },
                },
              },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const getGreetRoute = createRoute({
  method: 'get',
  path: '/greet',
  operationId: 'greet',
  responses: { 200: { description: 'OK', content: { 'text/plain': { schema: z.string() } } } },
})

const getGreetRouteHandler: RouteHandler<typeof getGreetRoute> = async (c) => {
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getGreetRoute, getGreetRouteHandler)

export default app
`)
    })
  })

  describe('self-referencing circular schema', () => {
    it('emits ": any" return type on mock function', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/tree': {
            get: {
              operationId: 'getTree',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/Node' } },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            Node: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                next: { $ref: '#/components/schemas/Node' },
              },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

type NodeType = { id?: number; next?: NodeType }

const NodeSchema: z.ZodType<NodeType> = z
  .lazy(() => z.object({ id: z.int().exactOptional(), next: NodeSchema.exactOptional() }))
  .openapi('Node')

export const getTreeRoute = createRoute({
  method: 'get',
  path: '/tree',
  operationId: 'getTree',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NodeSchema } } },
  },
})

function mockNode(): any {
  return {
    id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]),
    next: faker.helpers.arrayElement([mockNode(), undefined]),
  }
}

const getTreeRouteHandler: RouteHandler<typeof getTreeRoute> = async (c) => {
  return c.json(mockNode(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getTreeRoute, getTreeRouteHandler)

export default app
`)
    })
  })

  describe('requestBody with non-JSON content only', () => {
    it('passes through non-JSON content unchanged', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/upload': {
            post: {
              operationId: 'upload',
              requestBody: { content: { 'multipart/form-data': { schema: { type: 'object' } } } },
              responses: { '200': { description: 'OK' } },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const postUploadRoute = createRoute({
  method: 'post',
  path: '/upload',
  operationId: 'upload',
  request: { body: { content: { 'multipart/form-data': { schema: z.object({}) } } } },
  responses: { 200: { description: 'OK' } },
})

const postUploadRouteHandler: RouteHandler<typeof postUploadRoute> = async (c) => {
  return c.body(null, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(postUploadRoute, postUploadRouteHandler)

export default app
`)
    })
  })

  describe('pathItem-level parameters (non-method key)', () => {
    it('keeps pathItem-level parameters in the filtered spec', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/x': {
            parameters: [{ name: 'id', in: 'query', schema: { type: 'integer' } }],
            get: { operationId: 'gx', responses: { '200': { description: 'OK' } } },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

export const getXRoute = createRoute({
  method: 'get',
  path: '/x',
  operationId: 'gx',
  request: {
    query: z.object({
      id: z.coerce
        .number()
        .int()
        .exactOptional()
        .openapi({ param: { name: 'id', in: 'query', schema: { type: 'integer' } } }),
    }),
  },
  responses: { 200: { description: 'OK' } },
})

const getXRouteHandler: RouteHandler<typeof getXRoute> = async (c) => {
  return c.body(null, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getXRoute, getXRouteHandler)

export default app
`)
    })
  })

  describe('apiKey scheme without a name (fallback to X-API-Key)', () => {
    it('falls back to X-API-Key when scheme.name is missing', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        components: {
          securitySchemes: {
            ak: { type: 'apiKey', in: 'header' },
          },
        },
        paths: {
          '/me': {
            get: {
              operationId: 'gm',
              security: [{ ak: [] }],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { id: { type: 'integer' } } },
                    },
                  },
                },
                '401': { description: 'Unauthorized' },
              },
            },
          },
        },
      } as unknown as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const AkSecurityScheme = { type: 'apiKey', in: 'header' }

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'gm',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.object({ id: z.int().exactOptional() }) } },
    },
    401: { description: 'Unauthorized' },
  },
  security: [{ ak: [] }],
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(
    { id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]) },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })
  })

  describe('global security applies when operation security is undefined', () => {
    it('uses openapi.security as fallback when operation has none', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        security: [{ bearer: [] }],
        components: { securitySchemes: { bearer: { type: 'http', scheme: 'bearer' } } },
        paths: {
          '/me': {
            get: {
              operationId: 'gm',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { id: { type: 'integer' } } },
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

const BearerSecurityScheme = { type: 'http', scheme: 'bearer' }

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'gm',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: z.object({ id: z.int().exactOptional() }) } },
    },
    401: { description: 'Unauthorized' },
  },
})

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  return c.json(
    { id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]) },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })
  })

  describe('mutual circular reference', () => {
    it('marks both Parent and Child as circular and emits both mock functions with any return', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/parent': {
            get: {
              operationId: 'getParent',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/Parent' } },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            Parent: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                child: { $ref: '#/components/schemas/Child' },
              },
            },
            Child: {
              type: 'object',
              properties: {
                id: { type: 'integer' },
                parent: { $ref: '#/components/schemas/Parent' },
              },
            },
          },
        },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const ChildSchema: z.ZodType<ChildType> = z
  .lazy(() => z.object({ id: z.int().exactOptional(), parent: ParentSchema.exactOptional() }))
  .openapi('Child')

type ParentType = { id?: number; child?: z.infer<typeof ChildSchema> }

const ParentSchema: z.ZodType<ParentType> = z
  .lazy(() => z.object({ id: z.int().exactOptional(), child: ChildSchema.exactOptional() }))
  .openapi('Parent')

type ChildType = { id?: number; parent?: z.infer<typeof ParentSchema> }

export const getParentRoute = createRoute({
  method: 'get',
  path: '/parent',
  operationId: 'getParent',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: ParentSchema } } },
  },
})

function mockChild(): any {
  return {
    id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]),
    parent: faker.helpers.arrayElement([mockParent(), undefined]),
  }
}

function mockParent(): any {
  return {
    id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]),
    child: faker.helpers.arrayElement([mockChild(), undefined]),
  }
}

const getParentRouteHandler: RouteHandler<typeof getParentRoute> = async (c) => {
  return c.json(mockParent(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getParentRoute, getParentRouteHandler)

export default app
`)
    })
  })

  describe('x-brand schema', () => {
    it('casts mock body to z.infer<typeof Schema>', async () => {
      const spec: OpenAPI = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/user': {
            get: {
              operationId: 'getUser',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/UserId' } },
                  },
                },
              },
            },
          },
        },
        components: { schemas: { UserId: { type: 'string', 'x-brand': 'UserId' } } },
      }
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'

const UserIdSchema = z.string().brand<'UserId'>().openapi('UserId')

export const getUserRoute = createRoute({
  method: 'get',
  path: '/user',
  operationId: 'getUser',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserIdSchema } } },
  },
})

function mockUserId() {
  return faker.string.alpha({ length: { min: 5, max: 20 } }) as z.infer<typeof UserIdSchema>
}

const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json(mockUserId(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`)
    })
  })
})
