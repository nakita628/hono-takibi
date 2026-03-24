import fs from 'node:fs'

import { afterEach, beforeEach, describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../openapi/index.js'
import { makeHandlerFileName, mockZodOpenAPIHonoHandler, zodOpenAPIHonoHandler } from './handler.js'

/* ─────────────────────────────── makeHandlerFileName ─────────────────────────────── */

describe('makeHandlerFileName', () => {
  it('should convert simple path to filename', () => {
    expect(makeHandlerFileName('/users')).toBe('users.ts')
  })

  it('should use first segment only', () => {
    expect(makeHandlerFileName('/api/tasks')).toBe('api.ts')
    expect(makeHandlerFileName('/api/v1/posts')).toBe('api.ts')
  })

  it('should handle path parameters with colon syntax', () => {
    expect(makeHandlerFileName('/users/:id')).toBe('users.ts')
  })

  it('should handle path parameters with brace syntax', () => {
    expect(makeHandlerFileName('/users/{userId}')).toBe('users.ts')
  })

  it('should return __root.ts for root path', () => {
    expect(makeHandlerFileName('/')).toBe('__root.ts')
  })

  it('should handle health check path', () => {
    expect(makeHandlerFileName('/health')).toBe('health.ts')
  })

  it('should strip leading dots from path segment', () => {
    expect(makeHandlerFileName('/.hidden')).toBe('hidden.ts')
  })

  it('should handle numeric path segments', () => {
    expect(makeHandlerFileName('/123numeric')).toBe('123numeric.ts')
  })

  it('should convert special characters to camelCase', () => {
    expect(makeHandlerFileName('/special-chars_test.route')).toBe('specialCharsTestRoute.ts')
  })

  // Edge case: first segment is a brace parameter
  it.concurrent('should strip braces when first segment is a brace parameter like /{orgId}/users', () => {
    expect(makeHandlerFileName('/{orgId}/users')).toBe('orgId.ts')
  })

  it.concurrent('should strip braces for a lone parameter path /{id}', () => {
    expect(makeHandlerFileName('/{id}')).toBe('id.ts')
  })

  it.concurrent('should strip braces and camelCase hyphenated parameter /{org-name}/repos', () => {
    expect(makeHandlerFileName('/{org-name}/repos')).toBe('orgName.ts')
  })

  // Edge case: multiple hyphens/dots in sequence
  it.concurrent('should handle consecutive hyphens between words', () => {
    expect(makeHandlerFileName('/a--b')).toBe('a-B.ts')
  })

  it.concurrent('should handle consecutive dots between words', () => {
    expect(makeHandlerFileName('/a..b')).toBe('a.B.ts')
  })

  it.concurrent('should camelCase each hyphen-letter pair in /a-b-c', () => {
    expect(makeHandlerFileName('/a-b-c')).toBe('aBC.ts')
  })

  // Edge case: path with only special characters (underscores are in [._-], all stripped)
  it.concurrent('should return __root.ts when first segment is only underscores /___/foo', () => {
    expect(makeHandlerFileName('/___/foo')).toBe('__root.ts')
  })

  // Edge case: empty string path
  it.concurrent('should return __root.ts for empty string path', () => {
    expect(makeHandlerFileName('')).toBe('__root.ts')
  })

  // Edge case: path with URL-encoded characters (% replaced with _, leading _ stripped, then camelCased)
  it.concurrent('should sanitize URL-encoded path segment to camelCase', () => {
    expect(makeHandlerFileName('/%E4%B8%AD%E6%96%87/path')).toBe('E4B8ADE69687.ts')
  })

  // Edge case: mixed case first segment
  it.concurrent('should preserve mixed case in /MyEndpoint/action', () => {
    expect(makeHandlerFileName('/MyEndpoint/action')).toBe('MyEndpoint.ts')
  })

  it.concurrent('should preserve PascalCase in /UserProfile', () => {
    expect(makeHandlerFileName('/UserProfile')).toBe('UserProfile.ts')
  })

  // Edge case: path starting with double slashes
  it.concurrent('should strip leading double slashes in //users', () => {
    expect(makeHandlerFileName('//users')).toBe('users.ts')
  })

  it.concurrent('should strip multiple leading slashes in ///api/v1', () => {
    expect(makeHandlerFileName('///api/v1')).toBe('api.ts')
  })

  // Edge case: path that is just a parameter
  it.concurrent('should handle path with only brace parameter /{userId}', () => {
    expect(makeHandlerFileName('/{userId}')).toBe('userId.ts')
  })

  it.concurrent('should handle brace parameter with underscores /{user_id} and camelCase it', () => {
    expect(makeHandlerFileName('/{user_id}')).toBe('userId.ts')
  })

  // Additional edge cases
  it.concurrent('should strip trailing dots from first segment', () => {
    expect(makeHandlerFileName('/trailing.../rest')).toBe('trailing.ts')
  })

  it.concurrent('should strip trailing hyphens from first segment', () => {
    expect(makeHandlerFileName('/trailing---/rest')).toBe('trailing.ts')
  })

  it.concurrent('should return __root.ts when first segment is only dots and hyphens', () => {
    expect(makeHandlerFileName('/.-.-./rest')).toBe('__root.ts')
  })

  it.concurrent('should handle single character path /a', () => {
    expect(makeHandlerFileName('/a')).toBe('a.ts')
  })

  it.concurrent('should handle deeply nested path using only first segment', () => {
    expect(makeHandlerFileName('/v1/a/b/c/d/e/f')).toBe('v1.ts')
  })

  // Edge case: numeric-only first segment
  it.concurrent('should handle purely numeric first segment /42', () => {
    expect(makeHandlerFileName('/42')).toBe('42.ts')
  })

  it.concurrent('should handle numeric first segment with nested path /404/error', () => {
    expect(makeHandlerFileName('/404/error')).toBe('404.ts')
  })

  // Edge case: special characters replaced with underscore then collapsed
  it.concurrent('should sanitize @ symbol in path /user@domain', () => {
    expect(makeHandlerFileName('/user@domain')).toBe('userDomain.ts')
  })

  it.concurrent('should sanitize + symbol in path /a+b', () => {
    expect(makeHandlerFileName('/a+b')).toBe('aB.ts')
  })

  it.concurrent('should sanitize ~ symbol in path /home~user', () => {
    expect(makeHandlerFileName('/home~user')).toBe('homeUser.ts')
  })

  it.concurrent('should sanitize ! symbol in path /alert!', () => {
    expect(makeHandlerFileName('/alert!')).toBe('alert.ts')
  })

  // Edge case: brace parameter mixed with text in first segment
  it.concurrent('should handle brace parameter mixed with text /v{version}', () => {
    expect(makeHandlerFileName('/v{version}')).toBe('vversion.ts')
  })

  it.concurrent('should handle text before and after brace /pre{mid}post', () => {
    expect(makeHandlerFileName('/pre{mid}post')).toBe('premidpost.ts')
  })

  // Edge case: multiple brace parameters in first segment
  it.concurrent('should handle multiple brace params /{a}{b}', () => {
    expect(makeHandlerFileName('/{a}{b}')).toBe('ab.ts')
  })

  // Edge case: trailing slash with no other content
  it.concurrent('should return __root.ts for trailing slash only //', () => {
    expect(makeHandlerFileName('//')).toBe('__root.ts')
  })

  // Edge case: first segment has only special chars that all get stripped
  it.concurrent('should return __root.ts when first segment is all special chars /!@#$/foo', () => {
    expect(makeHandlerFileName('/!@#$/foo')).toBe('__root.ts')
  })

  // Edge case: underscore between words should camelCase
  it.concurrent('should camelCase underscore-separated words /get_all_users', () => {
    expect(makeHandlerFileName('/get_all_users')).toBe('getAllUsers.ts')
  })

  // Edge case: mixed separators in first segment
  it.concurrent('should camelCase mixed separators /get-all_users.list', () => {
    expect(makeHandlerFileName('/get-all_users.list')).toBe('getAllUsersList.ts')
  })

  // Edge case: single special char paths
  it.concurrent('should return __root.ts for single dot path /.', () => {
    expect(makeHandlerFileName('/.')).toBe('__root.ts')
  })

  it.concurrent('should return __root.ts for single hyphen path /-', () => {
    expect(makeHandlerFileName('/-')).toBe('__root.ts')
  })

  // Edge case: whitespace in path (replaced with _)
  it.concurrent('should sanitize space in path /my path', () => {
    expect(makeHandlerFileName('/my path')).toBe('myPath.ts')
  })

  // Edge case: very long first segment still works
  it.concurrent('should handle long first segment', () => {
    expect(makeHandlerFileName('/abcdefghijklmnopqrstuvwxyz')).toBe('abcdefghijklmnopqrstuvwxyz.ts')
  })

  // Edge case: first segment starting with number then hyphen
  it.concurrent('should handle segment starting with number then hyphen /1-test', () => {
    expect(makeHandlerFileName('/1-test')).toBe('1Test.ts')
  })

  // Edge case: multiple consecutive underscores collapsed
  it.concurrent('should collapse multiple special chars into single camelCase /a@@b', () => {
    expect(makeHandlerFileName('/a@@b')).toBe('aB.ts')
  })
})

/* ─────────────────────────────── zodOpenAPIHonoHandler (stub) ─────────────────────────── */

describe('zodOpenAPIHonoHandler', () => {
  const testDir = 'tmp-handler-test'

  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  const simpleOpenAPI: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/users': {
        get: {
          operationId: 'getUsers',
          responses: { 200: { description: 'OK' } },
        },
        post: {
          operationId: 'createUser',
          responses: { 201: { description: 'Created' } },
        },
      },
    },
  } as OpenAPI

  it('generates inline stub handler files', async () => {
    const result = await zodOpenAPIHonoHandler(simpleOpenAPI, `${testDir}/routes.ts`)

    expect(result).toStrictEqual({ ok: true, value: undefined })

    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getUsersRoute, postUsersRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const usersHandler = app.openapi(getUsersRoute, (c) => {}).openapi(postUsersRoute, (c) => {})\n`,
    )

    expect(fs.readFileSync(`${testDir}/handlers/index.ts`, 'utf-8')).toBe(
      `export * from './users'\n`,
    )
  })

  it('generates routeHandler stub files with RouteHandler type', async () => {
    const result = await zodOpenAPIHonoHandler(
      simpleOpenAPI,
      `${testDir}/routes.ts`,
      false,
      undefined,
      undefined,
      true,
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import type { RouteHandler } from '@hono/zod-openapi'\nimport type { getUsersRoute, postUsersRoute } from '../routes'\n\nexport const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {}\n\nexport const postUsersRouteHandler: RouteHandler<typeof postUsersRoute> = async (c) => {}\n`,
    )
  })

  it('generates handler files with path alias', async () => {
    const result = await zodOpenAPIHonoHandler(
      simpleOpenAPI,
      `${testDir}/routes.ts`,
      false,
      '@/routes',
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getUsersRoute, postUsersRoute } from '@/routes/routes'\n\nconst app = new OpenAPIHono()\n\nexport const usersHandler = app.openapi(getUsersRoute, (c) => {}).openapi(postUsersRoute, (c) => {})\n`,
    )
  })

  it('generates handler files with routeImport override', async () => {
    const result = await zodOpenAPIHonoHandler(
      simpleOpenAPI,
      `${testDir}/routes.ts`,
      false,
      undefined,
      '@/custom-routes',
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getUsersRoute, postUsersRoute } from '@/custom-routes'\n\nconst app = new OpenAPIHono()\n\nexport const usersHandler = app.openapi(getUsersRoute, (c) => {}).openapi(postUsersRoute, (c) => {})\n`,
    )
  })

  it('merges handlers for routes with the same first path segment', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: { 200: { description: 'OK' } },
          },
        },
        '/users/{id}': {
          get: {
            operationId: 'getUserById',
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    } as OpenAPI

    const result = await zodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`)

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { getUsersRoute, getUsersIdRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const usersHandler = app\n  .openapi(getUsersRoute, (c) => {})\n  .openapi(getUsersIdRoute, (c) => {})\n`,
    )
  })

  it('generates test files when test option is true', async () => {
    const result = await zodOpenAPIHonoHandler(simpleOpenAPI, `${testDir}/routes.ts`, true)

    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/handlers/users.test.ts`)).toBe(true)
  })

  it('handles output path with dot prefix', async () => {
    const result = await zodOpenAPIHonoHandler(simpleOpenAPI, './')

    expect(result.ok).toBe(true)
    expect(fs.existsSync('handlers/users.ts')).toBe(true)
    expect(fs.existsSync('handlers/index.ts')).toBe(true)

    // Cleanup
    fs.rmSync('handlers', { recursive: true, force: true })
  })

  it('handles output path with index.ts suffix', async () => {
    const result = await zodOpenAPIHonoHandler(simpleOpenAPI, `${testDir}/src/routes/index.ts`)

    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/src/handlers/users.ts`)).toBe(true)
  })

  it('removes stale handler files on re-generation', async () => {
    // First generation with /users and /posts
    const firstOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
        '/posts': {
          get: { operationId: 'getPosts', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    await zodOpenAPIHonoHandler(firstOpenAPI, `${testDir}/routes.ts`)
    expect(fs.existsSync(`${testDir}/handlers/posts.ts`)).toBe(true)

    // Second generation without /posts
    const secondOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    await zodOpenAPIHonoHandler(secondOpenAPI, `${testDir}/routes.ts`)
    // posts.ts should be removed as stale
    expect(fs.existsSync(`${testDir}/handlers/posts.ts`)).toBe(false)
    expect(fs.existsSync(`${testDir}/handlers/users.ts`)).toBe(true)
  })

  it('generates handler for root path', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/': {
          get: { operationId: 'getRoot', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    const result = await zodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`)
    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/handlers/__root.ts`)).toBe(true)
  })
})

/* ─────────────────────────────── mockZodOpenAPIHonoHandler ─────────────────────────── */

describe('mockZodOpenAPIHonoHandler', () => {
  const testDir = 'tmp-mock-handler-test'

  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  const openAPIWithResponses: OpenAPI = {
    openapi: '3.1.0',
    info: { title: 'Test', version: '1.0.0' },
    paths: {
      '/users': {
        get: {
          operationId: 'getUsers',
          responses: {
            200: {
              description: 'OK',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                    items: { $ref: '#/components/schemas/User' },
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
          properties: {
            id: { type: 'integer' },
            name: { type: 'string' },
          },
          required: ['id', 'name'],
        },
      },
    },
  } as OpenAPI

  it('generates inline mock handler files with faker', async () => {
    const result = await mockZodOpenAPIHonoHandler(
      openAPIWithResponses,
      `${testDir}/routes.ts`,
      false,
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { faker } from '@faker-js/faker'\nimport { getUsersRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nfunction mockUser() {\n  return {\n    id: faker.number.int({ min: 1, max: 99999 }),\n    name: faker.person.fullName(),\n  }\n}\n\nexport const usersHandler = app.openapi(getUsersRoute, async (c) => {\n  return c.json(\n    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),\n    200,\n  )\n})\n`,
    )
  })

  it('generates routeHandler mock files with RouteHandler type', async () => {
    const result = await mockZodOpenAPIHonoHandler(
      openAPIWithResponses,
      `${testDir}/routes.ts`,
      false,
      undefined,
      undefined,
      true,
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import type { RouteHandler } from '@hono/zod-openapi'\nimport { faker } from '@faker-js/faker'\nimport type { getUsersRoute } from '../routes'\n\nfunction mockUser() {\n  return {\n    id: faker.number.int({ min: 1, max: 99999 }),\n    name: faker.person.fullName(),\n  }\n}\n\nexport const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {\n  return c.json(\n    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),\n    200,\n  )\n}\n`,
    )
  })

  it('generates mock handler with 204 No Content for operations without response schema', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          delete: {
            operationId: 'deleteUser',
            responses: { 204: { description: 'No Content' } },
          },
        },
      },
    } as OpenAPI

    const result = await mockZodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`, false)

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { deleteUsersIdRoute } from '../routes'\n\nconst app = new OpenAPIHono()\n\nexport const usersHandler = app.openapi(deleteUsersIdRoute, async (_c) => {\n  return new Response(null, { status: 204 })\n})\n`,
    )
  })

  it('generates mock handler with test files', async () => {
    const result = await mockZodOpenAPIHonoHandler(
      openAPIWithResponses,
      `${testDir}/routes.ts`,
      true,
    )

    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/handlers/users.test.ts`)).toBe(true)
  })

  it('generates mock handler with path alias', async () => {
    const result = await mockZodOpenAPIHonoHandler(
      openAPIWithResponses,
      `${testDir}/routes.ts`,
      false,
      '@/routes/',
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')).toBe(
      `import { OpenAPIHono } from '@hono/zod-openapi'\nimport { faker } from '@faker-js/faker'\nimport { getUsersRoute } from '@/routes/routes'\n\nconst app = new OpenAPIHono()\n\nfunction mockUser() {\n  return {\n    id: faker.number.int({ min: 1, max: 99999 }),\n    name: faker.person.fullName(),\n  }\n}\n\nexport const usersHandler = app.openapi(getUsersRoute, async (c) => {\n  return c.json(\n    Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockUser()),\n    200,\n  )\n})\n`,
    )
  })

  it('generates barrel file with correct exports', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
        '/posts': {
          get: { operationId: 'getPosts', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    const result = await mockZodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`, false)

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/index.ts`, 'utf-8')).toBe(
      `export * from './users'\nexport * from './posts'\n`,
    )
  })

  it('handles operations without responses gracefully', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            operationId: 'healthCheck',
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    } as OpenAPI

    const result = await mockZodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`, false)
    expect(result.ok).toBe(true)
    expect(fs.existsSync(`${testDir}/handlers/health.ts`)).toBe(true)
  })

  it('handles schemas with $ref for mock generation', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: {
              200: {
                description: 'OK',
                content: {
                  'application/json': {
                    schema: {
                      type: 'object',
                      properties: {
                        items: { type: 'array', items: { $ref: '#/components/schemas/Order' } },
                        user: { $ref: '#/components/schemas/User' },
                      },
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
          Order: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
              total: { type: 'number' },
            },
          },
          User: {
            type: 'object',
            properties: {
              name: { type: 'string' },
            },
          },
        },
      },
    } as OpenAPI

    const result = await mockZodOpenAPIHonoHandler(
      openAPI,
      `${testDir}/routes.ts`,
      false,
      undefined,
      undefined,
      true,
    )

    expect(result).toStrictEqual({ ok: true, value: undefined })
    expect(fs.readFileSync(`${testDir}/handlers/orders.ts`, 'utf-8')).toBe(
      `import type { RouteHandler } from '@hono/zod-openapi'\nimport { faker } from '@faker-js/faker'\nimport type { getOrdersRoute } from '../routes'\n\nfunction mockOrder() {\n  return {\n    id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]),\n    total: faker.helpers.arrayElement([\n      faker.number.float({ min: 1, max: 1000, fractionDigits: 2 }),\n      undefined,\n    ]),\n  }\n}\n\nfunction mockUser() {\n  return {\n    name: faker.helpers.arrayElement([faker.person.fullName(), undefined]),\n  }\n}\n\nexport const getOrdersRouteHandler: RouteHandler<typeof getOrdersRoute> = async (c) => {\n  return c.json(\n    {\n      items: faker.helpers.arrayElement([\n        Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => mockOrder()),\n        undefined,\n      ]),\n      user: faker.helpers.arrayElement([mockUser(), undefined]),\n    },\n    200,\n  )\n}\n`,
    )
  })

  it('removes stale files on re-generation', async () => {
    const firstOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
        '/legacy': {
          get: { operationId: 'getLegacy', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    await mockZodOpenAPIHonoHandler(firstOpenAPI, `${testDir}/routes.ts`, false)
    expect(fs.existsSync(`${testDir}/handlers/legacy.ts`)).toBe(true)

    const secondOpenAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    await mockZodOpenAPIHonoHandler(secondOpenAPI, `${testDir}/routes.ts`, false)
    expect(fs.existsSync(`${testDir}/handlers/legacy.ts`)).toBe(false)
    expect(fs.existsSync(`${testDir}/handlers/users.ts`)).toBe(true)
  })

  it('preserves existing handler content on re-generation (merge)', async () => {
    const openAPI: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: { operationId: 'getUsers', responses: { 200: { description: 'OK' } } },
        },
      },
    } as OpenAPI

    // First generation
    await mockZodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`, false)
    const firstContent = fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')

    // Second generation (should merge, not overwrite custom code)
    await mockZodOpenAPIHonoHandler(openAPI, `${testDir}/routes.ts`, false)
    const secondContent = fs.readFileSync(`${testDir}/handlers/users.ts`, 'utf-8')

    // Content should be stable (no drift on re-generation)
    expect(secondContent).toBe(firstContent)
  })
})
