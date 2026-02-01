import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it } from 'vitest'

describe('CLI options test with string matching', () => {
  beforeEach(() => {
    fs.rmSync('tmp-cli-test', { recursive: true, force: true })
    fs.mkdirSync('tmp-cli-test', { recursive: true })
  })

  afterEach(() => {
    fs.rmSync('tmp-cli-test', { recursive: true, force: true })
  })

  it('--help returns help text', { timeout: 10000 }, () => {
    const result = execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} --help`,
    ).toString()
    expect(result).toBe(`Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-schemas-types      export schemas types
  --export-schemas            export schemas
  --export-parameters-types   export parameters types
  --export-parameters         export parameters
  --export-security-schemes   export securitySchemes
  --export-request-bodies     export requestBodies
  --export-responses          export responses
  --export-headers-types      export headers types
  --export-headers            export headers
  --export-examples           export examples
  --export-links              export links
  --export-callbacks          export callbacks
  --readonly                  make schemas immutable (adds .readonly() and 'as const')
  --template                  generate app file and handler stubs
  --mock                      generate handlers with faker.js mock responses
  --test                      generate vitest test files
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command
`)
  })

  it('-h returns help text', () => {
    const result = execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} -h`,
    ).toString()
    expect(result).toBe(`Usage: hono-takibi <input.{yaml,json,tsp}> -o <routes.ts> [options]

Options:
  --export-schemas-types      export schemas types
  --export-schemas            export schemas
  --export-parameters-types   export parameters types
  --export-parameters         export parameters
  --export-security-schemes   export securitySchemes
  --export-request-bodies     export requestBodies
  --export-responses          export responses
  --export-headers-types      export headers types
  --export-headers            export headers
  --export-examples           export examples
  --export-links              export links
  --export-callbacks          export callbacks
  --readonly                  make schemas immutable (adds .readonly() and 'as const')
  --template                  generate app file and handler stubs
  --mock                      generate handlers with faker.js mock responses
  --test                      generate vitest test files
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command
`)
  })

  it('--export-schemas exports schema with export keyword', () => {
    const schemaOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Schema API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Item' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/schema.json', JSON.stringify(schemaOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/schema.json -o tmp-cli-test/output.ts --export-schemas`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z.object({ id: z.int().exactOptional() }).openapi('Item')

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'getItems',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: ItemSchema } } },
  },
})
`)
  })

  it('--export-schemas-types exports schema type', () => {
    const schemaOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Schema API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Item' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            properties: {
              id: { type: 'integer' },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/schema.json', JSON.stringify(schemaOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/schema.json -o tmp-cli-test/output.ts --export-schemas-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemSchema = z.object({ id: z.int().exactOptional() }).openapi('Item')

export type Item = z.infer<typeof ItemSchema>

export const getItemsRoute = createRoute({
  method: 'get',
  path: '/items',
  operationId: 'getItems',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: ItemSchema } } },
  },
})
`)
  })

  it('--export-parameters exports parameters with export keyword', () => {
    const paramOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Param API', version: '1.0.0' },
      paths: {
        '/items/{id}': {
          get: {
            operationId: 'getItem',
            parameters: [{ $ref: '#/components/parameters/ItemId' }],
            responses: { 200: { description: 'Success' } },
          },
        },
      },
      components: {
        parameters: {
          ItemId: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/param.json', JSON.stringify(paramOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/param.json -o tmp-cli-test/output.ts --export-parameters`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemIdParamsSchema = z
  .string()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } })

export const getItemsIdRoute = createRoute({
  method: 'get',
  path: '/items/{id}',
  operationId: 'getItem',
  request: { params: z.object({ id: ItemIdParamsSchema }) },
  responses: { 200: { description: 'Success' } },
})
`)
  })

  it('--export-parameters-types exports parameter types', () => {
    const paramOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Param API', version: '1.0.0' },
      paths: {
        '/items/{id}': {
          get: {
            operationId: 'getItem',
            parameters: [{ $ref: '#/components/parameters/ItemId' }],
            responses: { 200: { description: 'Success' } },
          },
        },
      },
      components: {
        parameters: {
          ItemId: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/param.json', JSON.stringify(paramOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/param.json -o tmp-cli-test/output.ts --export-parameters-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemIdParamsSchema = z
  .string()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } })

export type ItemIdParams = z.infer<typeof ItemIdParamsSchema>

export const getItemsIdRoute = createRoute({
  method: 'get',
  path: '/items/{id}',
  operationId: 'getItem',
  request: { params: z.object({ id: ItemIdParamsSchema }) },
  responses: { 200: { description: 'Success' } },
})
`)
  })

  it('--export-security-schemes exports security schemes with export keyword', () => {
    const securityOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Security API', version: '1.0.0' },
      paths: {
        '/secure': {
          get: {
            operationId: 'getSecure',
            security: [{ BearerAuth: [] }],
            responses: { 200: { description: 'Success' } },
          },
        },
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/security.json', JSON.stringify(securityOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/security.json -o tmp-cli-test/output.ts --export-security-schemes`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

export const getSecureRoute = createRoute({
  method: 'get',
  path: '/secure',
  operationId: 'getSecure',
  responses: { 200: { description: 'Success' } },
  security: [{ BearerAuth: [] }],
})
`)
  })

  it('--export-request-bodies exports request bodies with export keyword', () => {
    const requestBodyOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'RequestBody API', version: '1.0.0' },
      paths: {
        '/users': {
          post: {
            operationId: 'createUser',
            requestBody: { $ref: '#/components/requestBodies/UserBody' },
            responses: { 201: { description: 'Created' } },
          },
        },
      },
      components: {
        requestBodies: {
          UserBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { name: { type: 'string' } } },
              },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/requestbody.json', JSON.stringify(requestBodyOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/requestbody.json -o tmp-cli-test/output.ts --export-request-bodies`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const UserBodyRequestBody = {
  content: { 'application/json': { schema: z.object({ name: z.string().exactOptional() }) } },
  required: true,
}

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: { body: UserBodyRequestBody },
  responses: { 201: { description: 'Created' } },
})
`)
  })

  it('--export-responses exports responses with export keyword', () => {
    const responseOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Response API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: { 200: { $ref: '#/components/responses/UserListResponse' } },
          },
        },
      },
      components: {
        responses: {
          UserListResponse: {
            description: 'List of users',
            content: {
              'application/json': {
                schema: { type: 'array', items: { type: 'object' } },
              },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/response.json', JSON.stringify(responseOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/response.json -o tmp-cli-test/output.ts --export-responses`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const UserListResponse = {
  description: 'List of users',
  content: { 'application/json': { schema: z.array(z.object({})) } },
}

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: { 200: UserListResponse },
})
`)
  })

  it('--export-headers exports headers with export keyword', () => {
    const headerOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Header API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
              },
            },
          },
        },
      },
      components: {
        headers: {
          RateLimit: {
            description: 'Rate limit',
            schema: { type: 'integer' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/header.json', JSON.stringify(headerOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/header.json -o tmp-cli-test/output.ts --export-headers`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const RateLimitHeaderSchema = z.int().exactOptional().openapi({ description: 'Rate limit' })

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: { description: 'Success', headers: z.object({ 'X-Rate-Limit': RateLimitHeaderSchema }) },
  },
})
`)
  })

  it('--export-headers-types exports header types', () => {
    const headerOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Header API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
              },
            },
          },
        },
      },
      components: {
        headers: {
          RateLimit: {
            description: 'Rate limit',
            schema: { type: 'integer' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/header.json', JSON.stringify(headerOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/header.json -o tmp-cli-test/output.ts --export-headers-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const RateLimitHeaderSchema = z.int().exactOptional().openapi({ description: 'Rate limit' })

export type RateLimitHeader = z.infer<typeof RateLimitHeaderSchema>

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: { description: 'Success', headers: z.object({ 'X-Rate-Limit': RateLimitHeaderSchema }) },
  },
})
`)
  })

  it('--export-examples exports examples with export keyword', () => {
    const exampleOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Example API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'object' },
                    examples: { UserExample: { $ref: '#/components/examples/UserExample' } },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        examples: {
          UserExample: {
            summary: 'User example',
            value: { id: 1, name: 'John' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/example.json', JSON.stringify(exampleOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/example.json -o tmp-cli-test/output.ts --export-examples`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const UserExample = { summary: 'User example', value: { id: 1, name: 'John' } }

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': { schema: z.object({}), examples: { UserExample: UserExample } },
      },
    },
  },
})
`)
  })

  it('--export-links exports links with export keyword', () => {
    const linkOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Link API', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'getUser',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: {
                description: 'Success',
                links: { GetUserPosts: { $ref: '#/components/links/GetUserPosts' } },
              },
            },
          },
        },
      },
      components: {
        links: {
          GetUserPosts: {
            operationId: 'getUserPosts',
            parameters: { userId: '$response.body#/id' },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/link.json', JSON.stringify(linkOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/link.json -o tmp-cli-test/output.ts --export-links`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const GetUserPostsLink = {
  operationId: 'getUserPosts',
  parameters: { userId: '$response.body#/id' },
}

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: { 200: { description: 'Success', links: { GetUserPosts: GetUserPostsLink } } },
})
`)
  })

  it('--export-callbacks exports callbacks with export keyword', () => {
    const callbackOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Callback API', version: '1.0.0' },
      paths: {
        '/subscribe': {
          post: {
            operationId: 'subscribe',
            requestBody: {
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { callbackUrl: { type: 'string' } } },
                },
              },
            },
            responses: { 201: { description: 'Subscribed' } },
            callbacks: { onEvent: { $ref: '#/components/callbacks/OnEvent' } },
          },
        },
      },
      components: {
        callbacks: {
          OnEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                requestBody: {
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { 200: { description: 'OK' } },
              },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/callback.json', JSON.stringify(callbackOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/callback.json -o tmp-cli-test/output.ts --export-callbacks`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const OnEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      requestBody: { content: { 'application/json': { schema: z.object({}) } } },
      responses: { 200: { description: 'OK' } },
    },
  },
}

export const postSubscribeRoute = createRoute({
  method: 'post',
  path: '/subscribe',
  operationId: 'subscribe',
  request: {
    body: {
      content: {
        'application/json': { schema: z.object({ callbackUrl: z.string().exactOptional() }) },
      },
    },
  },
  responses: { 201: { description: 'Subscribed' } },
  onEvent: OnEventCallback,
})
`)
  })

  it('all export options enabled', () => {
    const allOptionsOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'All Options API', version: '1.0.0' },
      paths: {
        '/items/{id}': {
          get: {
            operationId: 'getItem',
            security: [{ BearerAuth: [] }],
            parameters: [{ $ref: '#/components/parameters/ItemId' }],
            responses: { 200: { $ref: '#/components/responses/ItemResponse' } },
          },
          post: {
            operationId: 'createItem',
            requestBody: { $ref: '#/components/requestBodies/ItemBody' },
            responses: { 201: { description: 'Created' } },
            callbacks: { onCreated: { $ref: '#/components/callbacks/OnCreated' } },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            properties: { id: { type: 'integer' }, name: { type: 'string' } },
          },
        },
        parameters: {
          ItemId: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
        },
        securitySchemes: {
          BearerAuth: { type: 'http', scheme: 'bearer' },
        },
        requestBodies: {
          ItemBody: {
            required: true,
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
          },
        },
        responses: {
          ItemResponse: {
            description: 'Item response',
            content: { 'application/json': { schema: { $ref: '#/components/schemas/Item' } } },
            headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
            links: { GetRelated: { $ref: '#/components/links/GetRelated' } },
          },
        },
        headers: {
          RateLimit: { description: 'Rate limit', schema: { type: 'integer' } },
        },
        examples: {
          ItemExample: { summary: 'Item example', value: { id: 1, name: 'Test' } },
        },
        links: {
          GetRelated: { operationId: 'getRelated', parameters: { id: '$response.body#/id' } },
        },
        callbacks: {
          OnCreated: {
            '{$request.body#/callbackUrl}': {
              post: { responses: { 200: { description: 'OK' } } },
            },
          },
        },
      },
    }
    fs.writeFileSync('tmp-cli-test/all-options.json', JSON.stringify(allOptionsOpenAPI))
    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/all-options.json -o tmp-cli-test/output.ts --export-schemas-types --export-schemas --export-parameters-types --export-parameters --export-security-schemes --export-request-bodies --export-responses --export-headers-types --export-headers --export-examples --export-links --export-callbacks`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({ id: z.int().exactOptional(), name: z.string().exactOptional() })
  .openapi('Item')

export type Item = z.infer<typeof ItemSchema>

export const ItemIdParamsSchema = z
  .string()
  .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } })

export type ItemIdParams = z.infer<typeof ItemIdParamsSchema>

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

export const ItemBodyRequestBody = {
  content: { 'application/json': { schema: ItemSchema } },
  required: true,
}

export const RateLimitHeaderSchema = z.int().exactOptional().openapi({ description: 'Rate limit' })

export const GetRelatedLink = {
  operationId: 'getRelated',
  parameters: { id: '$response.body#/id' },
}

export const ItemResponse = {
  description: 'Item response',
  headers: z.object({ 'X-Rate-Limit': RateLimitHeaderSchema }),
  content: { 'application/json': { schema: ItemSchema } },
  links: { GetRelated: GetRelatedLink },
}

export type RateLimitHeader = z.infer<typeof RateLimitHeaderSchema>

export const ItemExample = { summary: 'Item example', value: { id: 1, name: 'Test' } }

export const OnCreatedCallback = {
  '{$request.body#/callbackUrl}': { post: { responses: { 200: { description: 'OK' } } } },
}

export const getItemsIdRoute = createRoute({
  method: 'get',
  path: '/items/{id}',
  operationId: 'getItem',
  request: { params: z.object({ id: ItemIdParamsSchema }) },
  responses: { 200: ItemResponse },
  security: [{ BearerAuth: [] }],
})

export const postItemsIdRoute = createRoute({
  method: 'post',
  path: '/items/{id}',
  operationId: 'createItem',
  request: { body: ItemBodyRequestBody },
  responses: { 201: { description: 'Created' } },
  onCreated: OnCreatedCallback,
})
`)
  })

  it('error on missing input file', () => {
    expect(() => {
      execSync(
        `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/nonexistent.json -o tmp-cli-test/output.ts`,
        { encoding: 'utf-8' },
      )
    }).toThrow()
  })

  it('error on missing output option', { timeout: 10000 }, () => {
    const simpleOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Simple API', version: '1.0.0' },
      paths: {},
    }
    fs.writeFileSync('tmp-cli-test/simple.json', JSON.stringify(simpleOpenAPI))
    expect(() => {
      execSync(
        `node ${path.resolve('packages/hono-takibi/dist/index.js')} tmp-cli-test/simple.json`,
        {
          encoding: 'utf-8',
        },
      )
    }).toThrow()
  })
})

describe('--template mode tests', () => {
  const testDir = 'tmp-template-test'

  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('generates app file and handler stubs with --template', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Template API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
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
            properties: { id: { type: 'string' } },
            required: ['id'],
          },
        },
      },
    }

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))

    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} ${path.join(testDir, 'openapi.json')} -o ${path.join(testDir, 'src/routes.ts')} --template`,
    )

    // Verify routes file
    const routesFile = fs.readFileSync(path.join(testDir, 'src/routes.ts'), 'utf-8')
    expect(routesFile).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const UserSchema = z
  .object({ id: z.string() })
  .openapi({ required: ['id'] })
  .openapi('User')

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: UserSchema } } },
  },
})
`)

    // Verify app file (index.ts)
    const appFile = fs.readFileSync(path.join(testDir, 'src/index.ts'), 'utf-8')
    expect(appFile).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUsersRoute } from './routes'
import { getUsersRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUsersRoute, getUsersRouteHandler)

export type AppType = typeof api

export default app
`)

    // Verify handler file
    const handlerFile = fs.readFileSync(path.join(testDir, 'src/handlers/users.ts'), 'utf-8')
    expect(handlerFile).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUsersRoute } from '../routes'

export const getUsersRouteHandler: RouteHandler<typeof getUsersRoute> = async (c) => {}
`)

    // Verify handler index file
    const handlerIndexFile = fs.readFileSync(path.join(testDir, 'src/handlers/index.ts'), 'utf-8')
    expect(handlerIndexFile).toBe(`export * from './users'
`)
  })

  it('generates test files with --template --test', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/items': {
          post: {
            operationId: 'createItem',
            responses: { 201: { description: 'Created' } },
          },
        },
      },
    }

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))

    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} ${path.join(testDir, 'openapi.json')} -o ${path.join(testDir, 'src/routes.ts')} --template --test`,
    )

    // Verify test file exists and contains vitest code
    const testFileExists = fs.existsSync(path.join(testDir, 'src/handlers/items.test.ts'))
    expect(testFileExists).toBe(true)

    const testFileContent = fs.readFileSync(
      path.join(testDir, 'src/handlers/items.test.ts'),
      'utf-8',
    )
    expect(testFileContent).toBe(`import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '../index'

describe('Test API', () => {
  describe('default', () => {
    describe('POST /items', () => {
      it('POST /items', async () => {
        const res = await app.request(\`/items\`, {
          method: 'POST',
        })

        expect(res.status).toBe(201)
      })
    })
  })
})
`)
  })

  it('generates handlers for multiple routes on same path', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Multi API', version: '1.0.0' },
      paths: {
        '/products': {
          get: {
            operationId: 'getProducts',
            responses: { 200: { description: 'Success' } },
          },
          post: {
            operationId: 'createProduct',
            responses: { 201: { description: 'Created' } },
          },
        },
      },
    }

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))

    execSync(
      `node ${path.resolve('packages/hono-takibi/dist/index.js')} ${path.join(testDir, 'openapi.json')} -o ${path.join(testDir, 'src/routes.ts')} --template`,
    )

    const handlerFile = fs.readFileSync(path.join(testDir, 'src/handlers/products.ts'), 'utf-8')
    expect(handlerFile).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getProductsRoute, postProductsRoute } from '../routes'

export const getProductsRouteHandler: RouteHandler<typeof getProductsRoute> = async (c) => {}

export const postProductsRouteHandler: RouteHandler<typeof postProductsRoute> = async (c) => {}
`)
  })
})

describe('hono-takibi.config.ts split generation tests', () => {
  const testDir = 'tmp-config-test'

  beforeEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
    fs.mkdirSync(testDir, { recursive: true })
  })

  afterEach(() => {
    fs.rmSync(testDir, { recursive: true, force: true })
  })

  it('generates split schemas with correct import paths', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/User' } },
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
            properties: { id: { type: 'string' }, name: { type: 'string' } },
            required: ['id'],
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '@/schemas' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    // Verify schemas split output
    const schemasIndex = fs.readFileSync(path.join(testDir, 'src/schemas/index.ts'), 'utf-8')
    expect(schemasIndex).toBe(`export * from './user'\n`)

    const userSchema = fs.readFileSync(path.join(testDir, 'src/schemas/user.ts'), 'utf-8')
    expect(userSchema).toBe(`import { z } from '@hono/zod-openapi'

export const UserSchema = z
  .object({ id: z.string(), name: z.string().exactOptional() })
  .openapi({ required: ['id'] })
  .openapi('User')
`)

    // Verify routes split output with correct import path
    const routesIndex = fs.readFileSync(path.join(testDir, 'src/routes/index.ts'), 'utf-8')
    expect(routesIndex).toBe(`export * from './getUsers'\n`)

    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    expect(getUsersRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { UserSchema } from '@/schemas'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: UserSchema } } },
  },
})
`)
  })

  it('generates split routes and schemas with exportTypes', { timeout: 10000 }, () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'getItems',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Item' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            properties: { id: { type: 'integer' } },
            required: ['id'],
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    components: {
      schemas: { output: 'src/schemas', split: true, exportTypes: true },
    },
    routes: { output: 'src/routes', split: true },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    // Verify schemas with exportTypes
    const itemSchema = fs.readFileSync(path.join(testDir, 'src/schemas/item.ts'), 'utf-8')
    expect(itemSchema).toBe(`import { z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({ id: z.int() })
  .openapi({ required: ['id'] })
  .openapi('Item')

export type Item = z.infer<typeof ItemSchema>
`)
  })

  it('generates single file output (non-split mode)', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/test': {
          get: {
            operationId: 'getTest',
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    output: 'src/routes.ts',
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const routesFile = fs.readFileSync(path.join(testDir, 'src/routes.ts'), 'utf-8')
    expect(routesFile).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const getTestRoute = createRoute({
  method: 'get',
  path: '/test',
  operationId: 'getTest',
  responses: { 200: { description: 'OK' } },
})
`)
  })

  it('generates split schemas with relative import path', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/posts': {
          get: {
            operationId: 'getPosts',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Post' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Post: {
            type: 'object',
            properties: { id: { type: 'string' }, title: { type: 'string' } },
            required: ['id', 'title'],
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '../schemas' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const getPostsRoute = fs.readFileSync(path.join(testDir, 'src/routes/getPosts.ts'), 'utf-8')
    expect(getPostsRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { PostSchema } from '../schemas'

export const getPostsRoute = createRoute({
  method: 'get',
  path: '/posts',
  operationId: 'getPosts',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: PostSchema } } },
  },
})
`)
  })

  it('generates split schemas with tilde path alias', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/comments': {
          get: {
            operationId: 'getComments',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Comment' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Comment: {
            type: 'object',
            properties: { id: { type: 'integer' }, text: { type: 'string' } },
            required: ['id'],
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '~/schemas' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const getCommentsRoute = fs.readFileSync(
      path.join(testDir, 'src/routes/getComments.ts'),
      'utf-8',
    )
    expect(getCommentsRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { CommentSchema } from '~/schemas'

export const getCommentsRoute = createRoute({
  method: 'get',
  path: '/comments',
  operationId: 'getComments',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: CommentSchema } } },
  },
})
`)
  })

  it('generates split schemas with monorepo scoped package import', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/products': {
          get: {
            operationId: 'getProducts',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/Product' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          Product: {
            type: 'object',
            properties: { id: { type: 'string' }, price: { type: 'number' } },
            required: ['id', 'price'],
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '@myorg/schemas' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const getProductsRoute = fs.readFileSync(
      path.join(testDir, 'src/routes/getProducts.ts'),
      'utf-8',
    )
    expect(getProductsRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { ProductSchema } from '@myorg/schemas'

export const getProductsRoute = createRoute({
  method: 'get',
  path: '/products',
  operationId: 'getProducts',
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: ProductSchema } } },
  },
})
`)
  })

  it('generates split parameters with path alias', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/items/{itemId}': {
          get: {
            operationId: 'getItem',
            parameters: [{ $ref: '#/components/parameters/ItemId' }],
            responses: { 200: { description: 'Success' } },
          },
        },
      },
      components: {
        parameters: {
          ItemId: {
            name: 'itemId',
            in: 'path',
            required: true,
            schema: { type: 'string' },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      parameters: { output: 'src/parameters', split: true, import: '@/parameters' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const parametersIndex = fs.readFileSync(path.join(testDir, 'src/parameters/index.ts'), 'utf-8')
    expect(parametersIndex).toBe(`export * from './itemId'\n`)

    const getItemRoute = fs.readFileSync(
      path.join(testDir, 'src/routes/getItemsItemId.ts'),
      'utf-8',
    )
    expect(getItemRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { ItemIdParamsSchema } from '@/parameters'

export const getItemsItemIdRoute = createRoute({
  method: 'get',
  path: '/items/{itemId}',
  operationId: 'getItem',
  request: { params: z.object({ itemId: ItemIdParamsSchema }) },
  responses: { 200: { description: 'Success' } },
})
`)
  })

  it('generates split responses with relative path', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/orders': {
          get: {
            operationId: 'getOrders',
            responses: { 200: { $ref: '#/components/responses/OrderList' } },
          },
        },
      },
      components: {
        responses: {
          OrderList: {
            description: 'List of orders',
            content: {
              'application/json': {
                schema: { type: 'array', items: { type: 'object' } },
              },
            },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/api/routes', split: true },
    components: {
      responses: { output: 'src/api/responses', split: true, import: '../responses' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const responsesIndex = fs.readFileSync(
      path.join(testDir, 'src/api/responses/index.ts'),
      'utf-8',
    )
    expect(responsesIndex).toBe(`export * from './orderList'\n`)

    const getOrdersRoute = fs.readFileSync(
      path.join(testDir, 'src/api/routes/getOrders.ts'),
      'utf-8',
    )
    expect(getOrdersRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { OrderListResponse } from '../responses'

export const getOrdersRoute = createRoute({
  method: 'get',
  path: '/orders',
  operationId: 'getOrders',
  responses: { 200: OrderListResponse },
})
`)
  })

  it('generates split headers with path alias', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                headers: { 'X-Rate-Limit': { $ref: '#/components/headers/RateLimit' } },
              },
            },
          },
        },
      },
      components: {
        headers: {
          RateLimit: {
            description: 'Rate limit',
            schema: { type: 'integer' },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      headers: { output: 'src/headers', split: true, import: '@/headers' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const headersIndex = fs.readFileSync(path.join(testDir, 'src/headers/index.ts'), 'utf-8')
    expect(headersIndex).toBe(`export * from './rateLimit'\n`)

    const rateLimitHeader = fs.readFileSync(path.join(testDir, 'src/headers/rateLimit.ts'), 'utf-8')
    expect(rateLimitHeader).toBe(`import { z } from '@hono/zod-openapi'

export const RateLimitHeaderSchema = z.int().exactOptional().openapi({ description: 'Rate limit' })
`)

    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    expect(getUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { RateLimitHeaderSchema } from '@/headers'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: { description: 'Success', headers: z.object({ 'X-Rate-Limit': RateLimitHeaderSchema }) },
  },
})
`)
  })

  it('generates split securitySchemes with relative path', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/secure': {
          get: {
            operationId: 'getSecure',
            security: [{ BearerAuth: [] }],
            responses: { 200: { description: 'Success' } },
          },
        },
      },
      components: {
        securitySchemes: {
          BearerAuth: {
            type: 'http',
            scheme: 'bearer',
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      securitySchemes: { output: 'src/security', split: true, import: '../security' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const securityIndex = fs.readFileSync(path.join(testDir, 'src/security/index.ts'), 'utf-8')
    expect(securityIndex).toBe(`export * from './bearerAuth.ts'\n`)

    const bearerAuthFile = fs.readFileSync(
      path.join(testDir, 'src/security/bearerAuth.ts'),
      'utf-8',
    )
    expect(
      bearerAuthFile,
    ).toBe(`export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }
`)

    const getSecureRoute = fs.readFileSync(path.join(testDir, 'src/routes/getSecure.ts'), 'utf-8')
    expect(getSecureRoute).toBe(`import { createRoute } from '@hono/zod-openapi'

export const getSecureRoute = createRoute({
  method: 'get',
  path: '/secure',
  operationId: 'getSecure',
  responses: { 200: { description: 'Success' } },
  security: [{ BearerAuth: [] }],
})
`)
  })

  it('generates split requestBodies with monorepo import', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          post: {
            operationId: 'createUser',
            requestBody: { $ref: '#/components/requestBodies/UserBody' },
            responses: { 201: { description: 'Created' } },
          },
        },
      },
      components: {
        requestBodies: {
          UserBody: {
            required: true,
            content: {
              'application/json': {
                schema: { type: 'object', properties: { name: { type: 'string' } } },
              },
            },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      requestBodies: { output: 'src/bodies', split: true, import: '@myorg/request-bodies' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const bodiesIndex = fs.readFileSync(path.join(testDir, 'src/bodies/index.ts'), 'utf-8')
    expect(bodiesIndex).toBe(`export * from './userBody'\n`)

    const userBodyFile = fs.readFileSync(path.join(testDir, 'src/bodies/userBody.ts'), 'utf-8')
    expect(userBodyFile).toBe(`import { z } from '@hono/zod-openapi'

export const UserBodyRequestBody = {
  content: { 'application/json': { schema: z.object({ name: z.string().exactOptional() }) } },
  required: true,
}
`)

    const postUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/postUsers.ts'), 'utf-8')
    expect(postUsersRoute).toBe(`import { createRoute } from '@hono/zod-openapi'
import { UserBodyRequestBody } from '@myorg/request-bodies'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  operationId: 'createUser',
  request: { body: UserBodyRequestBody },
  responses: { 201: { description: 'Created' } },
})
`)
  })

  it('generates split examples with tilde path alias', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'object' },
                    examples: { UserExample: { $ref: '#/components/examples/UserExample' } },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        examples: {
          UserExample: {
            summary: 'User example',
            value: { id: 1, name: 'John' },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      examples: { output: 'src/examples', split: true, import: '~/examples' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const examplesIndex = fs.readFileSync(path.join(testDir, 'src/examples/index.ts'), 'utf-8')
    expect(examplesIndex).toBe(`export * from './userExample.ts'\n`)

    const userExampleFile = fs.readFileSync(
      path.join(testDir, 'src/examples/userExample.ts'),
      'utf-8',
    )
    expect(
      userExampleFile,
    ).toBe(`export const UserExample = { summary: 'User example', value: { id: 1, name: 'John' } }
`)

    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    expect(getUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { UserExample } from '~/examples'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': { schema: z.object({}), examples: { UserExample: UserExample } },
      },
    },
  },
})
`)
  })

  it('generates split examples with cross-references', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'object' },
                    examples: {
                      ChainedUser: { $ref: '#/components/examples/ChainedUser' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        examples: {
          BaseUser: {
            summary: 'Base user',
            value: { id: 1, name: 'Base' },
          },
          AliasUser: {
            $ref: '#/components/examples/BaseUser',
          },
          ChainedUser: {
            $ref: '#/components/examples/AliasUser',
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      examples: { output: 'src/examples', split: true, import: '@/examples' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    // Check index.ts exports all examples
    const examplesIndex = fs.readFileSync(path.join(testDir, 'src/examples/index.ts'), 'utf-8')
    expect(examplesIndex).toBe(`export * from './aliasUser.ts'
export * from './baseUser.ts'
export * from './chainedUser.ts'
`)

    // Check BaseUser is exported as object (no import)
    const baseUserFile = fs.readFileSync(path.join(testDir, 'src/examples/baseUser.ts'), 'utf-8')
    expect(
      baseUserFile,
    ).toBe(`export const BaseUserExample = { summary: 'Base user', value: { id: 1, name: 'Base' } }
`)
    expect(baseUserFile).not.toContain('import')

    // Check AliasUser imports and references BaseUser
    const aliasUserFile = fs.readFileSync(path.join(testDir, 'src/examples/aliasUser.ts'), 'utf-8')
    expect(aliasUserFile).toBe(`import { BaseUserExample } from './baseUser.ts'

export const AliasUserExample = BaseUserExample
`)

    // Check ChainedUser imports and references BaseUser
    // (SwaggerParser.bundle resolves $ref chains to final target)
    const chainedUserFile = fs.readFileSync(
      path.join(testDir, 'src/examples/chainedUser.ts'),
      'utf-8',
    )
    expect(chainedUserFile).toBe(`import { BaseUserExample } from './baseUser.ts'

export const ChainedUserExample = BaseUserExample
`)

    // Check route imports the resolved BaseUser from examples
    // (SwaggerParser.bundle resolves all $ref chains to final target)
    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    expect(getUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { BaseUserExample } from '@/examples'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': { schema: z.object({}), examples: { ChainedUser: BaseUserExample } },
      },
    },
  },
})
`)
  })

  it('generates split examples with $ref and sibling properties (OpenAPI 3.1+)', () => {
    // Note: SwaggerParser.bundle() resolves $ref, so sibling properties are lost
    // in the bundled output. The sibling properties feature is tested in exports.ts unit tests.
    // This test verifies that $ref resolution works correctly in split mode.
    const openAPI = {
      openapi: '3.1.0',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'object' },
                    examples: {
                      ExtendedUser: { $ref: '#/components/examples/ExtendedUser' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        examples: {
          BaseUser: {
            summary: 'Base user example',
            value: { id: 1, name: 'Base' },
          },
          ExtendedUser: {
            $ref: '#/components/examples/BaseUser',
            summary: 'Extended user with custom summary',
            description: 'This example extends BaseUser with additional metadata',
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      examples: { output: 'src/examples', split: true, import: '@/examples' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    // Check index.ts exports all examples
    const examplesIndex = fs.readFileSync(path.join(testDir, 'src/examples/index.ts'), 'utf-8')
    expect(examplesIndex).toBe(`export * from './baseUser.ts'
export * from './extendedUser.ts'
`)

    // Check BaseUser is exported with its own properties
    const baseUserFile = fs.readFileSync(path.join(testDir, 'src/examples/baseUser.ts'), 'utf-8')
    expect(baseUserFile).toBe(
      `export const BaseUserExample = { summary: 'Base user example', value: { id: 1, name: 'Base' } }
`,
    )

    // SwaggerParser.bundle() resolves $ref, so ExtendedUser becomes a simple reference
    // (sibling properties are lost in bundle process)
    const extendedUserFile = fs.readFileSync(
      path.join(testDir, 'src/examples/extendedUser.ts'),
      'utf-8',
    )
    expect(extendedUserFile).toBe(`import { BaseUserExample } from './baseUser.ts'

export const ExtendedUserExample = BaseUserExample
`)

    // Check route imports the resolved example
    // SwaggerParser.bundle() resolves $ref chains, so route uses ExtendedUserExample
    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    expect(getUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { ExtendedUserExample } from '@/examples'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  operationId: 'getUsers',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z.object({}),
          examples: { ExtendedUser: ExtendedUserExample },
        },
      },
    },
  },
})
`)
  })

  it('generates split examples with Unicode characters', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/messages': {
          get: {
            operationId: 'getMessages',
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': {
                    schema: { type: 'object' },
                    examples: {
                      JapaneseMessage: { $ref: '#/components/examples/JapaneseMessage' },
                    },
                  },
                },
              },
            },
          },
        },
      },
      components: {
        examples: {
          JapaneseMessage: {
            summary: 'Japanese message',
            value: {
              text: 'こんにちは世界 🌍',
              emoji: '🔥💯✨',
            },
          },
          AliasJapanese: {
            $ref: '#/components/examples/JapaneseMessage',
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      examples: { output: 'src/examples', split: true, import: '@/examples' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    // Check index.ts exports all examples
    const examplesIndex = fs.readFileSync(path.join(testDir, 'src/examples/index.ts'), 'utf-8')
    expect(examplesIndex).toBe(`export * from './aliasJapanese.ts'
export * from './japaneseMessage.ts'
`)

    // Check JapaneseMessage is exported with Unicode content
    const japaneseFile = fs.readFileSync(
      path.join(testDir, 'src/examples/japaneseMessage.ts'),
      'utf-8',
    )
    expect(japaneseFile).toBe(`export const JapaneseMessageExample = {
  summary: 'Japanese message',
  value: { text: 'こんにちは世界 🌍', emoji: '🔥💯✨' },
}
`)

    // Check AliasJapanese imports and references JapaneseMessage
    const aliasFile = fs.readFileSync(path.join(testDir, 'src/examples/aliasJapanese.ts'), 'utf-8')
    expect(aliasFile).toBe(`import { JapaneseMessageExample } from './japaneseMessage.ts'

export const AliasJapaneseExample = JapaneseMessageExample
`)

    // Check route imports the resolved JapaneseMessage
    const getMessagesRoute = fs.readFileSync(
      path.join(testDir, 'src/routes/getMessages.ts'),
      'utf-8',
    )
    expect(getMessagesRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { JapaneseMessageExample } from '@/examples'

export const getMessagesRoute = createRoute({
  method: 'get',
  path: '/messages',
  operationId: 'getMessages',
  responses: {
    200: {
      description: 'Success',
      content: {
        'application/json': {
          schema: z.object({}),
          examples: { JapaneseMessage: JapaneseMessageExample },
        },
      },
    },
  },
})
`)
  })

  it('generates split links with path alias', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/users/{id}': {
          get: {
            operationId: 'getUser',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'string' } }],
            responses: {
              200: {
                description: 'Success',
                links: { GetUserPosts: { $ref: '#/components/links/GetUserPosts' } },
              },
            },
          },
        },
      },
      components: {
        links: {
          GetUserPosts: {
            operationId: 'getUserPosts',
            parameters: { userId: '$response.body#/id' },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      links: { output: 'src/links', split: true, import: '@/links' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const linksIndex = fs.readFileSync(path.join(testDir, 'src/links/index.ts'), 'utf-8')
    expect(linksIndex).toBe(`export * from './getUserPosts.ts'\n`)

    const getUserPostsFile = fs.readFileSync(
      path.join(testDir, 'src/links/getUserPosts.ts'),
      'utf-8',
    )
    expect(getUserPostsFile).toBe(`export const GetUserPostsLink = {
  operationId: 'getUserPosts',
  parameters: { userId: '$response.body#/id' },
}
`)

    const getUserRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsersId.ts'), 'utf-8')
    expect(getUserRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { GetUserPostsLink } from '@/links'

export const getUsersIdRoute = createRoute({
  method: 'get',
  path: '/users/{id}',
  operationId: 'getUser',
  request: {
    params: z.object({
      id: z
        .string()
        .openapi({ param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } } }),
    }),
  },
  responses: { 200: { description: 'Success', links: { GetUserPosts: GetUserPostsLink } } },
})
`)
  })

  it('generates split callbacks with relative path', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/subscribe': {
          post: {
            operationId: 'subscribe',
            requestBody: {
              content: {
                'application/json': {
                  schema: { type: 'object', properties: { callbackUrl: { type: 'string' } } },
                },
              },
            },
            responses: { 201: { description: 'Subscribed' } },
            callbacks: { onEvent: { $ref: '#/components/callbacks/OnEvent' } },
          },
        },
      },
      components: {
        callbacks: {
          OnEvent: {
            '{$request.body#/callbackUrl}': {
              post: {
                requestBody: {
                  content: { 'application/json': { schema: { type: 'object' } } },
                },
                responses: { 200: { description: 'OK' } },
              },
            },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      callbacks: { output: 'src/callbacks', split: true, import: '../callbacks' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const callbacksIndex = fs.readFileSync(path.join(testDir, 'src/callbacks/index.ts'), 'utf-8')
    expect(callbacksIndex).toBe(`export * from './onEvent.ts'\n`)

    const onEventFile = fs.readFileSync(path.join(testDir, 'src/callbacks/onEvent.ts'), 'utf-8')
    expect(onEventFile).toBe(`export const OnEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      requestBody: { content: { 'application/json': { schema: { type: 'object' } } } },
      responses: { '200': { description: 'OK' } },
    },
  },
}
`)

    const postSubscribeRoute = fs.readFileSync(
      path.join(testDir, 'src/routes/postSubscribe.ts'),
      'utf-8',
    )
    expect(postSubscribeRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { OnEventCallback } from '../callbacks'

export const postSubscribeRoute = createRoute({
  method: 'post',
  path: '/subscribe',
  operationId: 'subscribe',
  request: {
    body: {
      content: {
        'application/json': { schema: z.object({ callbackUrl: z.string().exactOptional() }) },
      },
    },
  },
  responses: { 201: { description: 'Subscribed' } },
  onEvent: OnEventCallback,
})
`)
  })

  it('verifies no unnecessary imports in generated files', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/simple': {
          get: {
            operationId: 'getSimple',
            responses: { 200: { description: 'OK' } },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const getSimpleRoute = fs.readFileSync(path.join(testDir, 'src/routes/getSimple.ts'), 'utf-8')
    expect(getSimpleRoute).toBe(`import { createRoute } from '@hono/zod-openapi'

export const getSimpleRoute = createRoute({
  method: 'get',
  path: '/simple',
  operationId: 'getSimple',
  responses: { 200: { description: 'OK' } },
})
`)
    expect(getSimpleRoute).not.toContain('import { z }')
    expect(getSimpleRoute).not.toContain("from '@/schemas'")
  })

  it('verifies import order in generated files', () => {
    const openAPI = {
      openapi: '3.0.3',
      info: { title: 'Test API', version: '1.0.0' },
      paths: {
        '/mixed': {
          post: {
            operationId: 'createMixed',
            parameters: [{ $ref: '#/components/parameters/MixedParam' }],
            requestBody: {
              content: {
                'application/json': { schema: { $ref: '#/components/schemas/MixedSchema' } },
              },
            },
            responses: {
              200: {
                description: 'Success',
                content: {
                  'application/json': { schema: { $ref: '#/components/schemas/MixedSchema' } },
                },
              },
            },
          },
        },
      },
      components: {
        schemas: {
          MixedSchema: {
            type: 'object',
            properties: { id: { type: 'string' } },
            required: ['id'],
          },
        },
        parameters: {
          MixedParam: {
            name: 'mixedParam',
            in: 'query',
            schema: { type: 'string' },
          },
        },
      },
    }

    const config = `export default {
  input: 'openapi.json',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
    components: {
      schemas: { output: 'src/schemas', split: true, import: '@/schemas' },
      parameters: { output: 'src/parameters', split: true, import: '@/parameters' },
    },
  },
}`

    fs.writeFileSync(path.join(testDir, 'openapi.json'), JSON.stringify(openAPI))
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const postMixedRoute = fs.readFileSync(path.join(testDir, 'src/routes/postMixed.ts'), 'utf-8')

    expect(postMixedRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'
import { MixedSchema } from '@/schemas'
import { MixedParamParamsSchema } from '@/parameters'

export const postMixedRoute = createRoute({
  method: 'post',
  path: '/mixed',
  operationId: 'createMixed',
  request: {
    query: z.object({ mixedParam: MixedParamParamsSchema }),
    body: { content: { 'application/json': { schema: MixedSchema } } },
  },
  responses: {
    200: { description: 'Success', content: { 'application/json': { schema: MixedSchema } } },
  },
})
`)

    const lines = postMixedRoute.split('\n')
    const importLines = lines.filter((line) => line.startsWith('import'))

    expect(importLines[0]).toBe("import { createRoute, z } from '@hono/zod-openapi'")
    expect(importLines[1]).toBe("import { MixedSchema } from '@/schemas'")
    expect(importLines[2]).toBe("import { MixedParamParamsSchema } from '@/parameters'")
  })

  it('handles external file references ($ref to yaml files)', () => {
    // Create main OpenAPI file with external $ref
    const mainYaml = `openapi: 3.1.0
info:
  title: External Ref Example
  version: 1.0.0
paths:
  /users:
    $ref: './users.path.yaml'
`
    // Create external path file
    const usersPathYaml = `get:
  operationId: listUsers
  summary: List users
  responses:
    '200':
      description: OK
      content:
        application/json:
          schema:
            type: array
            items:
              type: object
              required:
                - id
                - name
              properties:
                id:
                  type: string
                  format: uuid
                name:
                  type: string
post:
  operationId: createUser
  summary: Create user
  requestBody:
    content:
      application/json:
        schema:
          type: object
          required:
            - name
          properties:
            name:
              type: string
  responses:
    '201':
      description: Created
`
    fs.writeFileSync(path.join(testDir, 'openapi.yaml'), mainYaml)
    fs.writeFileSync(path.join(testDir, 'users.path.yaml'), usersPathYaml)

    const config = `export default {
  input: 'openapi.yaml',
  'zod-openapi': {
    routes: { output: 'src/routes', split: true },
  },
}
`
    fs.writeFileSync(path.join(testDir, 'hono-takibi.config.ts'), config)

    execSync(`node ${path.resolve('packages/hono-takibi/dist/index.js')}`, {
      cwd: path.resolve(testDir),
    })

    const getUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/getUsers.ts'), 'utf-8')
    const postUsersRoute = fs.readFileSync(path.join(testDir, 'src/routes/postUsers.ts'), 'utf-8')

    expect(getUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const getUsersRoute = createRoute({
  method: 'get',
  path: '/users',
  summary: 'List users',
  operationId: 'listUsers',
  responses: {
    200: {
      description: 'OK',
      content: {
        'application/json': {
          schema: z.array(
            z.object({ id: z.uuid(), name: z.string() }).openapi({ required: ['id', 'name'] }),
          ),
        },
      },
    },
  },
})
`)

    expect(postUsersRoute).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const postUsersRoute = createRoute({
  method: 'post',
  path: '/users',
  summary: 'Create user',
  operationId: 'createUser',
  request: {
    body: {
      content: {
        'application/json': {
          schema: z.object({ name: z.string() }).openapi({ required: ['name'] }),
        },
      },
    },
  },
  responses: { 201: { description: 'Created' } },
})
`)
  })
})
