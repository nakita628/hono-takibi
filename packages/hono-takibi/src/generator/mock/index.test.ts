import { describe, expect, it } from 'vite-plus/test'

import { fmt } from '../../format/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { runGenerator } from '../../testing/index.js'
import { makeMock } from './index.js'

// The Prism-compatible `Prefer` helpers are emitted verbatim into every mock; they
// are pinned once (the `Prefer` suite) and stand in as one line everywhere else.
const PREFER_HELPERS = '/* resolvePrefer, preferResponse, preferProblem */\n'

function withoutPreferHelpers(code: string) {
  return code.replace(
    /\/\/ Reads Prism's[\s\S]*?\nfunction preferProblem\([\s\S]*?\n\}\n/u,
    PREFER_HELPERS,
  )
}

async function format(spec: OpenAPI, basePath: string) {
  const result = await runGenerator(fmt(makeMock(spec, basePath)))
  return withoutPreferHelpers(result)
}

const minimalOpenAPI = {
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
} as OpenAPI

const minimalExpected = (appInit: string) =>
  `import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getAuthMeRouteHandler: RouteHandler<typeof getAuthMeRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json({ id: faker.number.int({ min: 1, max: 99999 }) }, 200)
}

const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {
  resolvePrefer(c.req, { '201': [] }, '201')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const deletePingRoute = createRoute({
  method: 'delete',
  path: '/ping',
  operationId: 'ping',
  responses: { 204: { description: 'No Content' } },
})

/* resolvePrefer, preferResponse, preferProblem */

const deletePingRouteHandler: RouteHandler<typeof deletePingRoute> = async (c) => {
  resolvePrefer(c.req, { '204': [] }, '204')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { getCookie } from 'hono/cookie'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!getCookie(c, 'session')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.query('api_key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getGreetRoute = createRoute({
  method: 'get',
  path: '/greet',
  operationId: 'greet',
  responses: { 200: { description: 'OK', content: { 'text/plain': { schema: z.string() } } } },
})

/* resolvePrefer, preferResponse, preferProblem */

const getGreetRouteHandler: RouteHandler<typeof getGreetRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getTreeRouteHandler: RouteHandler<typeof getTreeRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const postUploadRoute = createRoute({
  method: 'post',
  path: '/upload',
  operationId: 'upload',
  request: { body: { content: { 'multipart/form-data': { schema: z.object({}) } } } },
  responses: { 200: { description: 'OK' } },
})

/* resolvePrefer, preferResponse, preferProblem */

const postUploadRouteHandler: RouteHandler<typeof postUploadRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/x': {
            parameters: [{ name: 'id', in: 'query', schema: { type: 'integer' } }],
            get: { operationId: 'gx', responses: { '200': { description: 'OK' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getXRouteHandler: RouteHandler<typeof getXRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('X-API-Key')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getParentRouteHandler: RouteHandler<typeof getParentRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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
      const spec = {
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
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json(mockUserId(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`)
    })
  })

  describe('success response resolution', () => {
    it('emits c.json for a default-only response with json content', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/items': {
            post: {
              operationId: 'createItem',
              responses: {
                default: {
                  description: 'ok',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { id: { type: 'string' } } },
                    },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const postItemsRoute = createRoute({
  method: 'post',
  path: '/items',
  operationId: 'createItem',
  responses: {
    default: {
      description: 'ok',
      content: { 'application/json': { schema: z.object({ id: z.string().exactOptional() }) } },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const postItemsRouteHandler: RouteHandler<typeof postItemsRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { default: [] }, 'default')
  if (prefer.key === 'default') {
    return preferResponse(
      Number(prefer.code ?? 200),
      JSON.stringify({
        id: faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 5, max: 20 } }),
          undefined,
        ]),
      }),
      'application/json',
    )
  }
  return c.json(
    {
      id: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(postItemsRoute, postItemsRouteHandler)

export default app
`)
    })

    it('emits c.text for a 2XX-only response with text content', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/ping': {
            get: {
              operationId: 'ping',
              responses: {
                '2XX': {
                  description: 'ok',
                  content: { 'text/plain': { schema: { type: 'string' } } },
                },
              },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getPingRoute = createRoute({
  method: 'get',
  path: '/ping',
  operationId: 'ping',
  responses: { '2XX': { description: 'ok', content: { 'text/plain': { schema: z.string() } } } },
})

/* resolvePrefer, preferResponse, preferProblem */

const getPingRouteHandler: RouteHandler<typeof getPingRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { '2XX': [] }, '2XX')
  if (prefer.key === '2XX') {
    return preferResponse(
      Number(prefer.code ?? 200),
      String(faker.string.alpha({ length: { min: 5, max: 20 } })),
      'text/plain',
    )
  }
  return c.text(faker.string.alpha({ length: { min: 5, max: 20 } }), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getPingRoute, getPingRouteHandler)

export default app
`)
    })

    it('emits c.body(null, 200) for a default response without content', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/noop': {
            post: { operationId: 'noop', responses: { default: { description: 'ok' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const postNoopRoute = createRoute({
  method: 'post',
  path: '/noop',
  operationId: 'noop',
  responses: { default: { description: 'ok' } },
})

/* resolvePrefer, preferResponse, preferProblem */

const postNoopRouteHandler: RouteHandler<typeof postNoopRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { default: [] }, 'default')
  if (prefer.key === 'default') {
    return preferResponse(Number(prefer.code ?? 200), null)
  }
  return c.body(null, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(postNoopRoute, postNoopRouteHandler)

export default app
`)
    })

    it('emits c.body(null, 201) for a 201 response without content', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/create': {
            post: { operationId: 'create', responses: { '201': { description: 'created' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const postCreateRoute = createRoute({
  method: 'post',
  path: '/create',
  operationId: 'create',
  responses: { 201: { description: 'created' } },
})

/* resolvePrefer, preferResponse, preferProblem */

const postCreateRouteHandler: RouteHandler<typeof postCreateRoute> = async (c) => {
  resolvePrefer(c.req, { '201': [] }, '201')
  return c.body(null, 201)
}

const app = new OpenAPIHono()

export const api = app.openapi(postCreateRoute, postCreateRouteHandler)

export default app
`)
    })

    it('prefers an explicit 200 over default when both exist', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/both': {
            get: {
              operationId: 'both',
              responses: {
                '200': {
                  description: 'ok',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { a: { type: 'string' } } },
                    },
                  },
                },
                default: {
                  description: 'err',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { b: { type: 'string' } } },
                    },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getBothRoute = createRoute({
  method: 'get',
  path: '/both',
  operationId: 'both',
  responses: {
    200: {
      description: 'ok',
      content: { 'application/json': { schema: z.object({ a: z.string().exactOptional() }) } },
    },
    default: {
      description: 'err',
      content: { 'application/json': { schema: z.object({ b: z.string().exactOptional() }) } },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getBothRouteHandler: RouteHandler<typeof getBothRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { '200': [], default: [] }, '200')
  if (prefer.key === 'default') {
    return preferResponse(
      Number(prefer.code ?? 200),
      JSON.stringify({
        b: faker.helpers.arrayElement([
          faker.string.alpha({ length: { min: 5, max: 20 } }),
          undefined,
        ]),
      }),
      'application/json',
    )
  }
  return c.json(
    {
      a: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getBothRoute, getBothRouteHandler)

export default app
`)
    })
  })

  describe('allOf-wrapped scalar / enum and branded-scalar casing', () => {
    it('delegates an allOf-wrapped enum (no spread), casts a camelCase brand to its PascalCase const, and drops the unused base model', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/n': {
            get: {
              operationId: 'getN',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/Notification' } },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            userId: { type: 'string', 'x-brand': 'userId' },
            notificationType: { type: 'string', enum: ['follow', 'like'] },
            Notification: {
              type: 'object',
              required: ['id', 'type'],
              properties: {
                id: { $ref: '#/components/schemas/userId' },
                type: { allOf: [{ $ref: '#/components/schemas/notificationType' }] },
              },
            },
            AuthUser: { type: 'object', properties: { token: { type: 'string' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserIdSchema = z.string().brand<'userId'>().openapi('UserId')

const NotificationTypeSchema = z.enum(['follow', 'like']).openapi('NotificationType')

const NotificationSchema = z
  .object({ id: UserIdSchema, type: NotificationTypeSchema })
  .openapi({ required: ['id', 'type'] })
  .openapi('Notification')

export const getNRoute = createRoute({
  method: 'get',
  path: '/n',
  operationId: 'getN',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: NotificationSchema } } },
  },
})

function mockuserId() {
  return faker.string.alpha({ length: { min: 5, max: 20 } }) as z.infer<typeof UserIdSchema>
}

function mocknotificationType() {
  return faker.helpers.arrayElement(['follow', 'like'] as const)
}

function mockNotification() {
  return { id: mockuserId(), type: mocknotificationType() }
}

/* resolvePrefer, preferResponse, preferProblem */

const getNRouteHandler: RouteHandler<typeof getNRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json(mockNotification(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getNRoute, getNRouteHandler)

export default app
`)
    })
  })

  describe('response example', () => {
    it('returns the authored media example verbatim, cast to the success schema', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                      example: { id: 1, name: 'Alice' },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            User: {
              type: 'object',
              required: ['id', 'name'],
              properties: { id: { type: 'integer' }, name: { type: 'string' } },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserSchema = z
  .object({ id: z.int(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'getMe',
  responses: {
    200: {
      description: 'OK',
      content: { 'application/json': { schema: UserSchema, example: { id: 1, name: 'Alice' } } },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json({ id: 1, name: 'Alice' } as z.infer<typeof UserSchema>, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })

    it('prefers the first entry of examples (plural) over faker', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                      examples: {
                        first: { summary: 'First', value: { id: 1, name: 'Alice' } },
                        second: { summary: 'Second', value: { id: 2, name: 'Bob' } },
                      },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            User: {
              type: 'object',
              required: ['id', 'name'],
              properties: { id: { type: 'integer' }, name: { type: 'string' } },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserSchema = z
  .object({ id: z.int(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'getMe',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: UserSchema,
          examples: {
            first: { summary: 'First', value: { id: 1, name: 'Alice' } },
            second: { summary: 'Second', value: { id: 2, name: 'Bob' } },
          },
        },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { '200': ['first', 'second'] }, '200')
  if (prefer.key === '200' && prefer.example === 'second') {
    return c.json({ id: 2, name: 'Bob' } as z.infer<typeof UserSchema>, 200)
  }
  return c.json({ id: 1, name: 'Alice' } as z.infer<typeof UserSchema>, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })

    it('resolves an examples $ref against components.examples', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/me': {
            get: {
              operationId: 'getMe',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/User' },
                      examples: { default: { $ref: '#/components/examples/UserExample' } },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            User: {
              type: 'object',
              required: ['id', 'name'],
              properties: { id: { type: 'integer' }, name: { type: 'string' } },
            },
          },
          examples: { UserExample: { summary: 'User', value: { id: 1, name: 'Alice' } } },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserSchema = z
  .object({ id: z.int(), name: z.string() })
  .openapi({ required: ['id', 'name'] })
  .openapi('User')

const UserExampleExample = { summary: 'User', value: { id: 1, name: 'Alice' } }

export const getMeRoute = createRoute({
  method: 'get',
  path: '/me',
  operationId: 'getMe',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: UserSchema, examples: { default: UserExampleExample } },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getMeRouteHandler: RouteHandler<typeof getMeRoute> = async (c) => {
  resolvePrefer(c.req, { '200': ['default'] }, '200')
  return c.json({ id: 1, name: 'Alice' } as z.infer<typeof UserSchema>, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getMeRoute, getMeRouteHandler)

export default app
`)
    })

    it('returns an inline-schema example verbatim without a cast', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/v': {
            get: {
              operationId: 'getV',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { type: 'object', properties: { ok: { type: 'boolean' } } },
                      example: { ok: true },
                    },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getVRoute = createRoute({
  method: 'get',
  path: '/v',
  operationId: 'getV',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ ok: z.boolean().exactOptional() }),
          example: { ok: true },
        },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getVRouteHandler: RouteHandler<typeof getVRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json({ ok: true }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getVRoute, getVRouteHandler)

export default app
`)
    })

    it('prefers a response example over faker on an x-pagination operation', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/posts': {
            get: {
              operationId: 'getPosts',
              'x-pagination': true,
              parameters: [
                { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                { name: 'rows', in: 'query', schema: { type: 'integer', default: 20 } },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
                      example: [{ id: 1 }, { id: 2 }],
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            Post: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const PostSchema = z
  .object({ id: z.int() })
  .openapi({ required: ['id'] })
  .openapi('Post')

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  operationId: 'getPosts',
  request: {
    query: z.object({
      page: z.coerce
        .number()
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      rows: z.coerce
        .number()
        .int()
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'rows', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.array(PostSchema), example: [{ id: 1 }, { id: 2 }] },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json([{ id: 1 }, { id: 2 }], 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getPostsRoute, getPostsRouteHandler)

export default app
`)
    })
  })

  describe('x-pagination list handler', () => {
    it('returns a plain faker array without page/rows slicing (orval-aligned)', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1.0.0' },
        paths: {
          '/posts': {
            get: {
              operationId: 'getPosts',
              'x-pagination': true,
              parameters: [
                { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } },
                { name: 'rows', in: 'query', schema: { type: 'integer', default: 20 } },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: { type: 'array', items: { $ref: '#/components/schemas/Post' } },
                    },
                  },
                },
              },
            },
          },
        },
        components: {
          schemas: {
            Post: { type: 'object', required: ['id'], properties: { id: { type: 'integer' } } },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const PostSchema = z
  .object({ id: z.int() })
  .openapi({ required: ['id'] })
  .openapi('Post')

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  operationId: 'getPosts',
  request: {
    query: z.object({
      page: z.coerce
        .number()
        .int()
        .default(1)
        .exactOptional()
        .openapi({ param: { name: 'page', in: 'query', schema: { type: 'integer', default: 1 } } }),
      rows: z.coerce
        .number()
        .int()
        .default(20)
        .exactOptional()
        .openapi({
          param: { name: 'rows', in: 'query', schema: { type: 'integer', default: 20 } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: z.array(PostSchema) } } },
  },
})

function mockPost() {
  return { id: faker.number.int({ min: 1, max: 99999 }) }
}

/* resolvePrefer, preferResponse, preferProblem */

const getPostsRouteHandler: RouteHandler<typeof getPostsRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json(
    Array.from({ length: faker.number.int({ min: 1, max: 10 }) }, () => mockPost()),
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getPostsRoute, getPostsRouteHandler)

export default app
`)
    })
  })

  describe('locale', () => {
    it('imports the localized faker entry when locale is set', async () => {
      const result = await runGenerator(fmt(makeMock(minimalOpenAPI, '/', { locale: 'ja' })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker/locale/ja'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    })
  })

  describe('delay', () => {
    it('emits a delay middleware when delay is a number', async () => {
      const result = await runGenerator(fmt(makeMock(minimalOpenAPI, '/', { delay: 1000 })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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

const app = new OpenAPIHono()

app.use(async (_c, next) => {
  await new Promise((resolve) => setTimeout(resolve, 1000))
  await next()
})

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    })

    it('emits a random-range delay middleware when delay is { min, max }', async () => {
      const result = await runGenerator(
        fmt(makeMock(minimalOpenAPI, '/', { delay: { min: 100, max: 500 } })),
      )
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
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

const app = new OpenAPIHono()

app.use(async (_c, next) => {
  await new Promise((resolve) => setTimeout(resolve, faker.number.int({ min: 100, max: 500 })))
  await next()
})

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    })

    it('omits the delay middleware when delay is false', async () => {
      const withFalse = await runGenerator(fmt(makeMock(minimalOpenAPI, '/', { delay: false })))
      const without = await runGenerator(fmt(makeMock(minimalOpenAPI, '/')))
      expect(withFalse).toBe(without)
    })
  })

  describe('useExamples', () => {
    const exampleOpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Example API', version: '1.0.0' },
      paths: {
        '/ping': {
          get: {
            operationId: 'getPing',
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: { type: 'object', properties: { msg: { type: 'string' } } },
                    example: { msg: 'pong' },
                  },
                },
              },
            },
          },
        },
      },
    } as OpenAPI

    it('returns the spec example verbatim by default', async () => {
      const result = await runGenerator(fmt(makeMock(exampleOpenAPI, '/')))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getPingRoute = createRoute({
  method: 'get',
  path: '/ping',
  operationId: 'getPing',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ msg: z.string().exactOptional() }),
          example: { msg: 'pong' },
        },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getPingRouteHandler: RouteHandler<typeof getPingRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json({ msg: 'pong' }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getPingRoute, getPingRouteHandler)

export default app
`)
    })

    it('fakes the response instead of the example when useExamples is false', async () => {
      const result = await runGenerator(fmt(makeMock(exampleOpenAPI, '/', { useExamples: false })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getPingRoute = createRoute({
  method: 'get',
  path: '/ping',
  operationId: 'getPing',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.object({ msg: z.string().exactOptional() }),
          example: { msg: 'pong' },
        },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getPingRouteHandler: RouteHandler<typeof getPingRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json(
    {
      msg: faker.helpers.arrayElement([
        faker.string.alpha({ length: { min: 5, max: 20 } }),
        undefined,
      ]),
    },
    200,
  )
}

const app = new OpenAPIHono()

export const api = app.openapi(getPingRoute, getPingRouteHandler)

export default app
`)
    })
  })

  describe('int64 / bigint response (BigInt JSON serialization)', () => {
    it('emits a BigInt toJSON hook for an inline int64 response', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/big': {
            get: {
              operationId: 'getBig',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'integer', format: 'int64' } },
                        required: ['id'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      const result = await runGenerator(fmt(makeMock(spec, '/')))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

if (!('toJSON' in BigInt.prototype)) {
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value(this: bigint) {
      return this.toString()
    },
    writable: true,
    configurable: true,
  })
}

export const getBigRoute = createRoute({
  method: 'get',
  path: '/big',
  operationId: 'getBig',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.int64() }).openapi({ required: ['id'] }) },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getBigRouteHandler: RouteHandler<typeof getBigRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json({ id: faker.number.bigInt({ min: 0n, max: 9007199254740991n }) }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getBigRoute, getBigRouteHandler)

export default app
`)
    })

    it('emits a BigInt toJSON hook when only a component mock returns a bigint', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        components: {
          schemas: {
            Counter: {
              type: 'object',
              properties: { total: { type: 'integer', format: 'bigint' } },
              required: ['total'],
            },
          },
        },
        paths: {
          '/counter': {
            get: {
              operationId: 'getCounter',
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/Counter' } },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      const result = await runGenerator(fmt(makeMock(spec, '/')))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

if (!('toJSON' in BigInt.prototype)) {
  Object.defineProperty(BigInt.prototype, 'toJSON', {
    value(this: bigint) {
      return this.toString()
    },
    writable: true,
    configurable: true,
  })
}

const CounterSchema = z
  .object({ total: z.bigint() })
  .openapi({ required: ['total'] })
  .openapi('Counter')

export const getCounterRoute = createRoute({
  method: 'get',
  path: '/counter',
  operationId: 'getCounter',
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: CounterSchema } } },
  },
})

function mockCounter() {
  return { total: faker.number.bigInt({ min: 0n, max: 9007199254740991n }) }
}

/* resolvePrefer, preferResponse, preferProblem */

const getCounterRouteHandler: RouteHandler<typeof getCounterRoute> = async (c) => {
  resolvePrefer(c.req, { '200': [] }, '200')
  return c.json(mockCounter(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getCounterRoute, getCounterRouteHandler)

export default app
`)
    })
  })
  describe('404 sentinel guard (contract with the test generator)', () => {
    it('answers 404 for the non-existent sentinel when the route declares a 404', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'Test API', version: '1.0.0' },
        paths: {
          '/items/{id}': {
            get: {
              operationId: 'getItem',
              parameters: [
                {
                  name: 'id',
                  in: 'path',
                  required: true,
                  schema: { type: 'string', format: 'uuid' },
                },
              ],
              responses: {
                '200': {
                  description: 'OK',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { id: { type: 'string', format: 'uuid' } },
                        required: ['id'],
                      },
                    },
                  },
                },
                '404': {
                  description: 'Not Found',
                  content: {
                    'application/json': {
                      schema: {
                        type: 'object',
                        properties: { error: { type: 'string' } },
                        required: ['error'],
                      },
                    },
                  },
                },
              },
            },
          },
        },
      } as OpenAPI
      const result = await runGenerator(fmt(makeMock(spec, '/')))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

export const getItemsIdRoute = createRoute({
  method: 'get',
  path: '/items/{id}',
  operationId: 'getItem',
  request: {
    params: z.object({
      id: z
        .uuid()
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string', format: 'uuid' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': { schema: z.object({ id: z.uuid() }).openapi({ required: ['id'] }) },
      },
    },
    404: {
      description: 'Not Found',
      content: {
        'application/json': {
          schema: z.object({ error: z.string() }).openapi({ required: ['error'] }),
        },
      },
    },
  },
})

/* resolvePrefer, preferResponse, preferProblem */

const getItemsIdRouteHandler: RouteHandler<typeof getItemsIdRoute> = async (c) => {
  const prefer = resolvePrefer(c.req, { '200': [], '404': [] }, '200')
  if (prefer.key === '404') {
    return c.json({ error: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 404)
  }
  if (prefer.key === undefined && c.req.param('id') === '00000000-0000-0000-0000-000000000000') {
    return c.json({ error: faker.string.alpha({ length: { min: 5, max: 20 } }) }, 404)
  }
  return c.json({ id: faker.string.uuid() }, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getItemsIdRoute, getItemsIdRouteHandler)

export default app
`)
    })
  })

  describe('seed', () => {
    it('re-seeds faker and pins its reference date at the start of every handler', async () => {
      const result = await runGenerator(fmt(makeMock(minimalOpenAPI, '/', { seed: 42 })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  faker.seed(42)
  faker.setDefaultRefDate('2025-01-01T00:00:00.000Z')
  resolvePrefer(c.req, { '200': [] }, '200')
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

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    })

    it('passes an array seed through', async () => {
      const result = await runGenerator(fmt(makeMock(minimalOpenAPI, '/', { seed: [1, 2] })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

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

/* resolvePrefer, preferResponse, preferProblem */

const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {
  faker.seed([1, 2])
  faker.setDefaultRefDate('2025-01-01T00:00:00.000Z')
  resolvePrefer(c.req, { '200': [] }, '200')
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

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`)
    })

    it('does not seed a handler that never calls faker', () => {
      const result = makeMock(
        {
          openapi: '3.1.0',
          info: { title: 'T', version: '1' },
          paths: {
            '/ping': {
              delete: { operationId: 'deletePing', responses: { '204': { description: 'gone' } } },
            },
          },
        } as OpenAPI,
        '/',
        { seed: 42 },
      )
      expect(withoutPreferHelpers(result)).not.toContain('faker.seed(')
    })
  })

  describe('document-supplied names', () => {
    const edgeOpenAPI = {
      openapi: '3.1.0',
      info: { title: 'T', version: '1' },
      security: [{ Key: [] }],
      paths: {
        '/profiles/{profile-id}': {
          get: {
            operationId: 'getProfile',
            parameters: [
              { name: 'profile-id', in: 'path', required: true, schema: { type: 'string' } },
            ],
            responses: {
              '200': {
                description: 'OK',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User-Profile' } },
                },
              },
              '401': { description: 'no' },
              '404': { description: 'none' },
            },
          },
        },
      },
      components: {
        securitySchemes: { Key: { type: 'apiKey', in: 'header', name: "X-Key'); evil(); ('" } },
        schemas: {
          'User-Profile': {
            type: 'object',
            required: ['first-name', 'role'],
            properties: {
              'first-name': { type: 'string' },
              role: { type: 'string', enum: ['admin', 'member'], example: 'admin' },
            },
          },
        },
      },
    } as OpenAPI

    it('sanitizes a hyphenated schema name, quotes keys and escapes auth / param names', async () => {
      const result = await runGenerator(fmt(makeMock(edgeOpenAPI, '/')))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserProfileSchema = z
  .object({
    'first-name': z.string(),
    role: z.enum(['admin', 'member']).openapi({ example: 'admin' }),
  })
  .openapi({ required: ['first-name', 'role'] })
  .openapi('UserProfile')

const KeySecurityScheme = { type: 'apiKey', in: 'header', name: "X-Key'); evil(); ('" }

export const getProfilesProfileIdRoute = createRoute({
  method: 'get',
  path: '/profiles/{profile-id}',
  operationId: 'getProfile',
  request: {
    params: z.object({
      'profile-id': z
        .string()
        .openapi({
          param: { name: 'profile-id', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserProfileSchema } } },
    401: { description: 'no' },
    404: { description: 'none' },
  },
})

function mockUserProfile() {
  return {
    'first-name': faker.person.firstName(),
    role: faker.helpers.arrayElement(['admin', 'member'] as const),
  }
}

/* resolvePrefer, preferResponse, preferProblem */

const getProfilesProfileIdRouteHandler: RouteHandler<typeof getProfilesProfileIdRoute> = async (
  c,
) => {
  if (!c.req.header("X-Key'); evil(); ('")) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [], '404': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
  }
  if (prefer.key === '404') {
    return c.body(null, 404)
  }
  if (prefer.key === undefined && c.req.param('profile-id') === '__non_existent__') {
    return c.body(null, 404)
  }
  return c.json(mockUserProfile(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getProfilesProfileIdRoute, getProfilesProfileIdRouteHandler)

export default app
`)
    })

    it("uses a property's scalar example when useExamples is 'all'", async () => {
      const result = await runGenerator(fmt(makeMock(edgeOpenAPI, '/', { useExamples: 'all' })))
      expect(withoutPreferHelpers(result))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const UserProfileSchema = z
  .object({
    'first-name': z.string(),
    role: z.enum(['admin', 'member']).openapi({ example: 'admin' }),
  })
  .openapi({ required: ['first-name', 'role'] })
  .openapi('UserProfile')

const KeySecurityScheme = { type: 'apiKey', in: 'header', name: "X-Key'); evil(); ('" }

export const getProfilesProfileIdRoute = createRoute({
  method: 'get',
  path: '/profiles/{profile-id}',
  operationId: 'getProfile',
  request: {
    params: z.object({
      'profile-id': z
        .string()
        .openapi({
          param: { name: 'profile-id', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: { description: 'OK', content: { 'application/json': { schema: UserProfileSchema } } },
    401: { description: 'no' },
    404: { description: 'none' },
  },
})

function mockUserProfile() {
  return { 'first-name': faker.person.firstName(), role: 'admin' as const }
}

/* resolvePrefer, preferResponse, preferProblem */

const getProfilesProfileIdRouteHandler: RouteHandler<typeof getProfilesProfileIdRoute> = async (
  c,
) => {
  if (!c.req.header("X-Key'); evil(); ('")) {
    return c.json({ message: 'Unauthorized' }, 401)
  }
  const prefer = resolvePrefer(c.req, { '200': [], '401': [], '404': [] }, '200')
  if (prefer.key === '401') {
    return c.body(null, 401)
  }
  if (prefer.key === '404') {
    return c.body(null, 404)
  }
  if (prefer.key === undefined && c.req.param('profile-id') === '__non_existent__') {
    return c.body(null, 404)
  }
  return c.json(mockUserProfile(), 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getProfilesProfileIdRoute, getProfilesProfileIdRouteHandler)

export default app
`)
    })
  })

  describe('Prefer (Prism-compatible response selection)', () => {
    it('emits the resolvePrefer / preferResponse / preferProblem helpers once', async () => {
      const result = await runGenerator(fmt(makeMock(minimalOpenAPI, '/')))
      const helpers = result.match(
        /\/\/ Reads Prism's[\s\S]*?\nfunction preferProblem\([\s\S]*?\n\}\n/gu,
      )
      expect(helpers?.length).toBe(1)
      expect(helpers?.[0])
        .toBe(`// Reads Prism's \`Prefer: code=<status>, example=<name>\` header (or the \`__code\` /
// \`__example\` query) and resolves it against the responses the route declares:
// the exact status, then its \`NXX\` range, then \`default\`. Without a code the
// example is looked up in the success response. Anything the route does not
// declare answers 500 problem+json, as Prism does.
function resolvePrefer(
  req: { header(name: string): string | undefined; query(name: string): string | undefined },
  responses: { readonly [key: string]: readonly string[] },
  success: string,
) {
  let code = req.query('__code')
  let example = req.query('__example')
  for (const [, name = '', quoted, bare] of (req.header('Prefer') ?? '').matchAll(
    /([A-Za-z]+)\\s*=\\s*(?:"([^"]*)"|([^\\s,;]*))/gu,
  )) {
    if (name.toLowerCase() === 'code') code ??= quoted ?? bare
    if (name.toLowerCase() === 'example') example ??= quoted ?? bare
  }
  if (code === undefined && example === undefined) return {}
  if (code !== undefined && !/^[2-5]\\d\\d$/u.test(code)) {
    preferProblem(\`Prefer code=\${code} is not a status code between 200 and 599.\`)
  }
  const key =
    code === undefined
      ? success
      : [code, \`\${code.slice(0, 1)}XX\`, 'default'].find((k) => Object.hasOwn(responses, k))
  if (key === undefined) preferProblem(\`No \${code} response is declared for this operation.\`)
  if (example !== undefined && !responses[key]?.includes(example)) {
    preferProblem(\`No example named "\${example}" is declared for the \${key} response.\`)
  }
  return { key, code, example }
}

// Answers with a status the route's types cannot name (a \`4XX\`/\`default\` response
// picked at runtime); Hono's error handler sends \`res\` with that status.
function preferResponse(status: number, body: string | null, contentType?: string): never {
  throw new HTTPException(status as ContentfulStatusCode, {
    res: new Response(body, contentType ? { headers: { 'Content-Type': contentType } } : {}),
  })
}

function preferProblem(detail: string): never {
  return preferResponse(
    500,
    JSON.stringify({
      type: 'about:blank',
      title: 'Mock response unavailable',
      status: 500,
      detail,
    }),
    'application/problem+json',
  )
}
`)
    })

    it('branches on named examples, problem+json, a 4XX range, default and no-content responses', async () => {
      const spec = {
        openapi: '3.1.0',
        info: { title: 'T', version: '1' },
        paths: {
          '/orders/{orderId}': {
            get: {
              operationId: 'getOrder',
              parameters: [
                { name: 'orderId', in: 'path', required: true, schema: { type: 'string' } },
              ],
              responses: {
                '200': {
                  description: 'The order',
                  content: {
                    'application/json': {
                      schema: { $ref: '#/components/schemas/Order' },
                      examples: {
                        shipped: { $ref: '#/components/examples/ShippedOrder' },
                        pending: { value: { id: 'o-2' } },
                        external: { externalValue: 'https://example.com/order.json' },
                      },
                    },
                  },
                },
                '404': {
                  description: 'No such order',
                  content: {
                    'application/problem+json': {
                      schema: { $ref: '#/components/schemas/Problem' },
                    },
                  },
                },
                '4xx': {
                  description: 'Client error',
                  content: { 'text/plain': { schema: { type: 'string' } } },
                },
                '503': { description: 'Maintenance' },
                default: {
                  description: 'Unexpected error',
                  content: {
                    'application/json': { schema: { $ref: '#/components/schemas/Problem' } },
                  },
                },
              },
            },
          },
        },
        components: {
          examples: { ShippedOrder: { value: { id: 'o-1' } } },
          schemas: {
            Order: { type: 'object', required: ['id'], properties: { id: { type: 'string' } } },
            Problem: {
              type: 'object',
              required: ['title'],
              properties: { title: { type: 'string' } },
            },
          },
        },
      } as OpenAPI
      expect(await format(spec, '/'))
        .toBe(`import { OpenAPIHono, createRoute, z, type RouteHandler } from '@hono/zod-openapi'
import { faker } from '@faker-js/faker'
import { HTTPException } from 'hono/http-exception'
import type { ContentfulStatusCode } from 'hono/utils/http-status'

const OrderSchema = z
  .object({ id: z.string() })
  .openapi({ required: ['id'] })
  .openapi('Order')

const ProblemSchema = z
  .object({ title: z.string() })
  .openapi({ required: ['title'] })
  .openapi('Problem')

const ShippedOrderExample = { value: { id: 'o-1' } }

export const getOrdersOrderIdRoute = createRoute({
  method: 'get',
  path: '/orders/{orderId}',
  operationId: 'getOrder',
  request: {
    params: z.object({
      orderId: z
        .string()
        .openapi({
          param: { name: 'orderId', in: 'path', required: true, schema: { type: 'string' } },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The order',
      content: {
        'application/json': {
          schema: OrderSchema,
          examples: {
            shipped: ShippedOrderExample,
            pending: { value: { id: 'o-2' } },
            external: { externalValue: 'https://example.com/order.json' },
          },
        },
      },
    },
    404: {
      description: 'No such order',
      content: { 'application/problem+json': { schema: ProblemSchema } },
    },
    503: { description: 'Maintenance' },
    '4xx': { description: 'Client error', content: { 'text/plain': { schema: z.string() } } },
    default: {
      description: 'Unexpected error',
      content: { 'application/json': { schema: ProblemSchema } },
    },
  },
})

function mockProblem() {
  return { title: faker.lorem.sentence() }
}

/* resolvePrefer, preferResponse, preferProblem */

const getOrdersOrderIdRouteHandler: RouteHandler<typeof getOrdersOrderIdRoute> = async (c) => {
  const prefer = resolvePrefer(
    c.req,
    { '200': ['shipped', 'pending'], '404': [], '503': [], '4XX': [], default: [] },
    '200',
  )
  if (prefer.key === '200' && prefer.example === 'pending') {
    return c.json({ id: 'o-2' } as z.infer<typeof OrderSchema>, 200)
  }
  if (prefer.key === '404') {
    return c.json(mockProblem(), 404, { 'Content-Type': 'application/problem+json' })
  }
  if (prefer.key === '503') {
    return c.body(null, 503)
  }
  if (prefer.key === '4XX') {
    return preferResponse(
      Number(prefer.code ?? 400),
      String(faker.string.alpha({ length: { min: 5, max: 20 } })),
      'text/plain',
    )
  }
  if (prefer.key === 'default') {
    return preferResponse(
      Number(prefer.code ?? 200),
      JSON.stringify(mockProblem()),
      'application/json',
    )
  }
  if (prefer.key === undefined && c.req.param('orderId') === '__non_existent__') {
    return c.json(mockProblem(), 404, { 'Content-Type': 'application/problem+json' })
  }
  return c.json({ id: 'o-1' } as z.infer<typeof OrderSchema>, 200)
}

const app = new OpenAPIHono()

export const api = app.openapi(getOrdersOrderIdRoute, getOrdersOrderIdRouteHandler)

export default app
`)
    })
  })
})
