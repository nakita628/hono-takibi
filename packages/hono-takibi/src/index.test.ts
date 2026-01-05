import { execSync } from 'node:child_process'
import fs from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

// Test run
// pnpm vitest run ./src/index.test.ts

describe('CLI options test with string matching', () => {
  beforeEach(() => {
    fs.rmSync('tmp-cli-test', { recursive: true, force: true })
    fs.mkdirSync('tmp-cli-test', { recursive: true })
  })

  afterEach(() => {
    fs.rmSync('tmp-cli-test', { recursive: true, force: true })
  })

  it('--help returns help text', () => {
    const result = execSync(`node ${path.resolve('dist/index.js')} --help`).toString()
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
  --template                  generate app file and handler stubs
  --test                      generate empty *.test.ts files
  --base-path <path>          api prefix (default: /)
  -h, --help                  display help for command
`)
  })

  it('-h returns help text', () => {
    const result = execSync(`node ${path.resolve('dist/index.js')} -h`).toString()
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
  --template                  generate app file and handler stubs
  --test                      generate empty *.test.ts files
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/schema.json -o tmp-cli-test/output.ts --export-schemas`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({ id: z.int().exactOptional().openapi({ type: 'integer' }) })
  .openapi({ type: 'object', properties: { id: { type: 'integer' } } })
  .openapi('Item')

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/schema.json -o tmp-cli-test/output.ts --export-schemas-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemSchema = z
  .object({ id: z.int().exactOptional().openapi({ type: 'integer' }) })
  .openapi({ type: 'object', properties: { id: { type: 'integer' } } })
  .openapi('Item')

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/param.json -o tmp-cli-test/output.ts --export-parameters`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemIdParamsSchema = z
  .string()
  .openapi({
    param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    type: 'string',
  })

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/param.json -o tmp-cli-test/output.ts --export-parameters-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const ItemIdParamsSchema = z
  .string()
  .openapi({
    param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    type: 'string',
  })

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/security.json -o tmp-cli-test/output.ts --export-security-schemes`,
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/requestbody.json -o tmp-cli-test/output.ts --export-request-bodies`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const UserBodyRequestBody = {
  content: {
    'application/json': {
      schema: z
        .object({ name: z.string().exactOptional().openapi({ type: 'string' }) })
        .openapi({ type: 'object', properties: { name: { type: 'string' } } }),
    },
  },
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/response.json -o tmp-cli-test/output.ts --export-responses`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const UserListResponse = {
  description: 'List of users',
  content: {
    'application/json': {
      schema: z
        .array(z.object({}).openapi({ type: 'object' }))
        .openapi({ type: 'array', items: { type: 'object' } }),
    },
  },
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/header.json -o tmp-cli-test/output.ts --export-headers`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const RateLimitHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit', type: 'integer' })

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/header.json -o tmp-cli-test/output.ts --export-headers-types`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

const RateLimitHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit', type: 'integer' })

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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/example.json -o tmp-cli-test/output.ts --export-examples`,
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
        'application/json': {
          schema: z.object({}).openapi({ type: 'object' }),
          examples: { UserExample: UserExample },
        },
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/link.json -o tmp-cli-test/output.ts --export-links`,
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
        .openapi({
          param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
          type: 'string',
        }),
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/callback.json -o tmp-cli-test/output.ts --export-callbacks`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const OnEventCallback = {
  '{$request.body#/callbackUrl}': {
    post: {
      requestBody: {
        content: { 'application/json': { schema: z.object({}).openapi({ type: 'object' }) } },
      },
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
        'application/json': {
          schema: z
            .object({ callbackUrl: z.string().exactOptional().openapi({ type: 'string' }) })
            .openapi({ type: 'object', properties: { callbackUrl: { type: 'string' } } }),
        },
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
      `node ${path.resolve('dist/index.js')} tmp-cli-test/all-options.json -o tmp-cli-test/output.ts --export-schemas-types --export-schemas --export-parameters-types --export-parameters --export-security-schemes --export-request-bodies --export-responses --export-headers-types --export-headers --export-examples --export-links --export-callbacks`,
    )
    const result = fs.readFileSync('tmp-cli-test/output.ts', { encoding: 'utf-8' })
    expect(result).toBe(`import { createRoute, z } from '@hono/zod-openapi'

export const ItemSchema = z
  .object({
    id: z.int().exactOptional().openapi({ type: 'integer' }),
    name: z.string().exactOptional().openapi({ type: 'string' }),
  })
  .openapi({ type: 'object', properties: { id: { type: 'integer' }, name: { type: 'string' } } })
  .openapi('Item')

export type Item = z.infer<typeof ItemSchema>

export const ItemIdParamsSchema = z
  .string()
  .openapi({
    param: { name: 'id', in: 'path', required: true, schema: { type: 'string' } },
    type: 'string',
  })

export type ItemIdParams = z.infer<typeof ItemIdParamsSchema>

export const BearerAuthSecurityScheme = { type: 'http', scheme: 'bearer' }

export const ItemBodyRequestBody = {
  content: { 'application/json': { schema: ItemSchema } },
  required: true,
}

export const RateLimitHeaderSchema = z
  .int()
  .exactOptional()
  .openapi({ description: 'Rate limit', type: 'integer' })

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
        `node ${path.resolve('dist/index.js')} tmp-cli-test/nonexistent.json -o tmp-cli-test/output.ts`,
        { encoding: 'utf-8' },
      )
    }).toThrow()
  })

  it('error on missing output option', () => {
    const simpleOpenAPI = {
      openapi: '3.0.3',
      info: { title: 'Simple API', version: '1.0.0' },
      paths: {},
    }
    fs.writeFileSync('tmp-cli-test/simple.json', JSON.stringify(simpleOpenAPI))
    expect(() => {
      execSync(`node ${path.resolve('dist/index.js')} tmp-cli-test/simple.json`, {
        encoding: 'utf-8',
      })
    }).toThrow()
  })
})

describe('cli test', () => {
  let exitSpy: ReturnType<typeof vi.spyOn>
  let logSpy: ReturnType<typeof vi.spyOn>
  let errorSpy: ReturnType<typeof vi.spyOn>

  beforeEach(() => {
    vi.resetModules()
    exitSpy = vi
      .spyOn(process, 'exit')
      // biome-ignore lint: test
      .mockImplementation(() => undefined as unknown as never) as any
    logSpy = vi.spyOn(console, 'log').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
    errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {}) as unknown as ReturnType<
      typeof vi.spyOn
    >
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('logs message & exits(0) on success', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: true, value: 'OK' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(logSpy).toHaveBeenCalledWith('OK')
    expect(exitSpy).toHaveBeenCalledWith(0)
    expect(errorSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })

  it('logs error & exits(1) on failure', async () => {
    vi.resetModules()

    const exitSpy = vi.spyOn(process, 'exit').mockImplementation((() => undefined) as never)
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {})
    const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {})

    vi.doMock('./cli/index.js', async () => {
      const actual = await vi.importActual<typeof import('./cli/index.js')>('./cli/index.js')
      return { ...actual, honoTakibi: vi.fn(async () => ({ ok: false, error: 'FAIL' }) as const) }
    })

    await import('./index.js')

    const tick = () => new Promise<void>((r) => setImmediate(r))
    await tick()

    expect(errorSpy).toHaveBeenCalledWith('FAIL')
    expect(exitSpy).toHaveBeenCalledWith(1)
    expect(logSpy).not.toHaveBeenCalled()

    vi.restoreAllMocks()
  })
})
