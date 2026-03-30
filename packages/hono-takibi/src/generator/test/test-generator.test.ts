import { describe, expect, it } from 'vite-plus/test'

import type { OpenAPI } from '../../openapi/index.js'
import { extractTestCases, makeHandlerTestCode, makeTestFile } from './test-generator.js'

// ─── Fixtures ───────────────────────────────────────────────────

const simpleGetSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Simple API', version: '1.0.0' },
  paths: {
    '/': {
      get: {
        operationId: 'getIndex',
        summary: 'Health check',
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

const postSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Post API', version: '1.0.0' },
  paths: {
    '/tasks': {
      post: {
        operationId: 'createTask',
        summary: 'Create task',
        tags: ['tasks'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                required: ['title'],
                properties: {
                  title: { type: 'string' },
                  done: { type: 'boolean' },
                },
              },
            },
          },
        },
        responses: {
          '201': { description: 'Created' },
          '400': { description: 'Validation error' },
        },
      },
    },
  },
}

const pathParamSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'PathParam API', version: '1.0.0' },
  paths: {
    '/tasks/{taskId}': {
      get: {
        operationId: 'getTask',
        summary: 'Get task',
        tags: ['tasks'],
        parameters: [{ name: 'taskId', in: 'path', required: true, schema: { type: 'string' } }],
        responses: {
          '200': { description: 'OK' },
          '404': { description: 'Not found' },
        },
      },
    },
  },
}

const queryParamSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Query API', version: '1.0.0' },
  paths: {
    '/tasks': {
      get: {
        operationId: 'listTasks',
        summary: 'List tasks',
        tags: ['tasks'],
        parameters: [
          {
            name: 'status',
            in: 'query',
            required: false,
            schema: { type: 'string', enum: ['pending', 'done'] },
          },
          {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        ],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

const bearerSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Auth API', version: '1.0.0' },
  paths: {
    '/me': {
      get: {
        operationId: 'getMe',
        summary: 'Get current user',
        security: [{ bearerAuth: [] }],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: { type: 'http', scheme: 'bearer' },
    },
  },
}

const basePathSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'BasePath API', version: '1.0.0' },
  paths: {
    '/users': {
      get: {
        operationId: 'listUsers',
        summary: 'List users',
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

const deleteSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'Delete API', version: '1.0.0' },
  paths: {
    '/tasks/{id}': {
      delete: {
        operationId: 'deleteTask',
        summary: 'Delete task',
        tags: ['tasks'],
        parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
        responses: {
          '204': { description: 'Deleted' },
          '404': { description: 'Not found' },
        },
      },
    },
  },
}

const multiTagSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'MultiTag API', version: '1.0.0' },
  tags: [
    { name: 'users', description: 'User operations' },
    { name: 'tasks', description: 'Task operations' },
  ],
  paths: {
    '/users': {
      get: {
        operationId: 'listUsers',
        summary: 'List users',
        tags: ['users'],
        responses: { '200': { description: 'OK' } },
      },
    },
    '/tasks': {
      get: {
        operationId: 'listTasks',
        summary: 'List tasks',
        tags: ['tasks'],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

const refParamSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'RefParam API', version: '1.0.0' },
  paths: {
    '/tasks/{taskId}': {
      get: {
        operationId: 'getTask',
        summary: 'Get task',
        tags: ['tasks'],
        parameters: [{ $ref: '#/components/parameters/TaskId', name: '', in: 'path', schema: {} }],
        responses: {
          '200': { description: 'OK' },
          '404': { description: 'Not found' },
        },
      },
    },
  },
  components: {
    parameters: {
      TaskId: { name: 'taskId', in: 'path', required: true, schema: { type: 'string' } },
    },
  },
}

const basePathRootSpec: OpenAPI = {
  openapi: '3.1.0',
  info: { title: 'BasePath Root API', version: '1.0.0' },
  paths: {
    '/': {
      get: {
        operationId: 'getIndex',
        summary: 'Health check',
        responses: { '200': { description: 'OK' } },
      },
    },
    '/tasks': {
      get: {
        operationId: 'listTasks',
        summary: 'List tasks',
        tags: ['tasks'],
        responses: { '200': { description: 'OK' } },
      },
    },
  },
}

// ─── extractTestCases ───────────────────────────────────────────

describe('extractTestCases', () => {
  it('simple GET /', () => {
    const result = extractTestCases(simpleGetSpec)
    expect(result).toStrictEqual([
      {
        operationId: 'getIndex',
        method: 'GET',
        path: '/',
        summary: 'Health check',
        description: '',
        tag: undefined,
        pathParams: [],
        queryParams: [],
        headerParams: [],
        requestBody: undefined,
        successStatus: 200,
        errorStatuses: [],
        security: [],
        usedSchemaRefs: [],
      },
    ])
  })

  it('POST with request body', () => {
    const result = extractTestCases(postSpec)
    expect(result).toStrictEqual([
      {
        operationId: 'createTask',
        method: 'POST',
        path: '/tasks',
        summary: 'Create task',
        description: '',
        tag: 'tasks',
        pathParams: [],
        queryParams: [],
        headerParams: [],
        requestBody: {
          fakerCode:
            '{\n    title: faker.lorem.sentence(),\n    done: faker.helpers.arrayElement([faker.datatype.boolean(), undefined])\n  }',
          contentType: 'application/json',
        },
        successStatus: 201,
        errorStatuses: [400],
        security: [],
        usedSchemaRefs: [],
      },
    ])
  })

  it('GET with path params and 404', () => {
    const result = extractTestCases(pathParamSpec)
    expect(result.length).toBe(1)
    const tc = result[0]
    expect(tc.method).toBe('GET')
    expect(tc.path).toBe('/tasks/{taskId}')
    expect(tc.pathParams.length).toBe(1)
    expect(tc.pathParams[0].name).toBe('taskId')
    expect(tc.successStatus).toBe(200)
    expect(tc.errorStatuses).toStrictEqual([404])
  })

  it('GET with query params', () => {
    const result = extractTestCases(queryParamSpec)
    expect(result.length).toBe(1)
    const tc = result[0]
    expect(tc.queryParams.length).toBe(2)
    expect(tc.queryParams[0].name).toBe('status')
    expect(tc.queryParams[0].required).toBe(false)
    expect(tc.queryParams[1].name).toBe('limit')
    expect(tc.queryParams[1].required).toBe(false)
  })

  it('Bearer auth security', () => {
    const result = extractTestCases(bearerSpec)
    expect(result.length).toBe(1)
    expect(result[0].security).toStrictEqual([{ type: 'bearer', name: 'Authorization' }])
  })

  it('DELETE with 204 and integer path param', () => {
    const result = extractTestCases(deleteSpec)
    expect(result.length).toBe(1)
    const tc = result[0]
    expect(tc.method).toBe('DELETE')
    expect(tc.successStatus).toBe(204)
    expect(tc.errorStatuses).toStrictEqual([404])
    expect(tc.pathParams[0].name).toBe('id')
    expect(tc.pathParams[0].schema).toStrictEqual({ type: 'integer' })
  })

  it('multiple tags', () => {
    const result = extractTestCases(multiTagSpec)
    expect(result.length).toBe(2)
    expect(result[0].tag).toBe('users')
    expect(result[1].tag).toBe('tasks')
  })

  it('$ref path parameter is resolved', () => {
    const result = extractTestCases(refParamSpec)
    expect(result.length).toBe(1)
    const tc = result[0]
    expect(tc.pathParams.length).toBe(1)
    expect(tc.pathParams[0].name).toBe('taskId')
    expect(tc.errorStatuses).toStrictEqual([404])
  })
})

// ─── makeTestFile ───────────────────────────────────────────────

describe('makeTestFile', () => {
  it('simple GET — no faker, default tag', () => {
    const result = makeTestFile(simpleGetSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('Simple API',()=>{describe('default',()=>{describe('GET /',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('POST with request body — faker import, Content-Type header', () => {
    const result = makeTestFile(postSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Post API',()=>{describe('tasks',()=>{describe('POST /tasks',()=>{it('should return 201 - Create task',async()=>{const body={\n    title: faker.lorem.sentence(),\n    done: faker.helpers.arrayElement([faker.datatype.boolean(), undefined])\n  }\nconst res=await app.request(`/tasks`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })

  it('GET with path params — 404 test generated', () => {
    const result = makeTestFile(pathParamSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('PathParam API',()=>{describe('tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('GET with query params — URL-encoded query string', () => {
    const result = makeTestFile(queryParamSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Query API',()=>{describe('tasks',()=>{describe('GET /tasks',()=>{it('should return 200 - List tasks',async()=>{const status=faker.helpers.arrayElement([\"pending\", \"done\"] as const)\nconst limit=faker.number.int({ min: 1, max: 100 })\nconst res=await app.request(`/tasks?status=${encodeURIComponent(String(status))}&limit=${encodeURIComponent(String(limit))}`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('Bearer auth — 401 unauthorized test', () => {
    const result = makeTestFile(bearerSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Auth API',()=>{describe('default',()=>{describe('GET /me',()=>{it('should return 200 - Get current user',async()=>{\nconst res=await app.request(`/me`,{method:'GET',headers:{'Authorization':`Bearer ${faker.string.alphanumeric(32)}`}})\nexpect(res.status).toBe(200)})\nit('should return 401 without auth',async()=>{\nconst res=await app.request(`/me`,{method:'GET'})\nexpect(res.status).toBe(401)})})\n})\n})\n",
    )
  })

  it('basePath /api — paths prefixed', () => {
    const result = makeTestFile(basePathSpec, './app', '/api')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('BasePath API',()=>{describe('default',()=>{describe('GET /api/users',()=>{it('should return 200 - List users',async()=>{\nconst res=await app.request(`/api/users`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('DELETE 204 — integer path param, 404 with -1', () => {
    const result = makeTestFile(deleteSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Delete API',()=>{describe('tasks',()=>{describe('DELETE /tasks/{id}',()=>{it('should return 204 - Delete task',async()=>{const id=faker.number.int({ min: 1, max: 99999 })\nconst res=await app.request(`/tasks/${id}`,{method:'DELETE'})\nexpect(res.status).toBe(204)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/-1`,{method:'DELETE'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('multiple tags — tag descriptions as describe labels', () => {
    const result = makeTestFile(multiTagSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('MultiTag API',()=>{describe('User operations',()=>{describe('GET /users',()=>{it('should return 200 - List users',async()=>{\nconst res=await app.request(`/users`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\ndescribe('Task operations',()=>{describe('GET /tasks',()=>{it('should return 200 - List tasks',async()=>{\nconst res=await app.request(`/tasks`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('custom appImportPath', () => {
    const result = makeTestFile(simpleGetSpec, '../src/index')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'../src/index'\n\ndescribe('Simple API',()=>{describe('default',()=>{describe('GET /',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('basePath / (root) — no prefix added', () => {
    const result = makeTestFile(basePathSpec, './app', '/')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('BasePath API',()=>{describe('default',()=>{describe('GET /users',()=>{it('should return 200 - List users',async()=>{\nconst res=await app.request(`/users`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('framework bun — import from bun:test', () => {
    const result = makeTestFile(simpleGetSpec, './app', '/', 'bun')
    expect(result).toBe(
      "import{describe,it,expect}from'bun:test'\nimport app from'./app'\n\ndescribe('Simple API',()=>{describe('default',()=>{describe('GET /',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('framework vite-plus — import from vite-plus/test', () => {
    const result = makeTestFile(simpleGetSpec, './app', '/', 'vite-plus')
    expect(result).toBe(
      "import{describe,it,expect}from'vite-plus/test'\nimport app from'./app'\n\ndescribe('Simple API',()=>{describe('default',()=>{describe('GET /',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('framework vitest (explicit) — import from vitest', () => {
    const result = makeTestFile(simpleGetSpec, './app', '/', 'vitest')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('Simple API',()=>{describe('default',()=>{describe('GET /',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('$ref path parameter — resolved and substituted', () => {
    const result = makeTestFile(refParamSpec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('RefParam API',()=>{describe('tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('basePath /api with root path / — no trailing slash', () => {
    const result = makeTestFile(basePathRootSpec, './app', '/api')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('BasePath Root API',()=>{describe('default',()=>{describe('GET /api',()=>{it('should return 200 - Health check',async()=>{\nconst res=await app.request(`/api`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\ndescribe('tasks',()=>{describe('GET /api/tasks',()=>{it('should return 200 - List tasks',async()=>{\nconst res=await app.request(`/api/tasks`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })
})

// ─── makeHandlerTestCode ────────────────────────────────────────

describe('makeHandlerTestCode', () => {
  it('matching handler — tasks', () => {
    const result = makeHandlerTestCode(pathParamSpec, 'handlers/tasks.ts', [], '../app')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })

  it('non-matching handler — empty string', () => {
    const result = makeHandlerTestCode(pathParamSpec, 'handlers/users.ts', [], '../app')
    expect(result).toBe('')
  })

  it('with basePath', () => {
    const result = makeHandlerTestCode(pathParamSpec, 'handlers/tasks.ts', [], '../app', '/api')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Tasks',()=>{describe('GET /api/tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/api/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/api/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })

  it('framework bun — import from bun:test', () => {
    const result = makeHandlerTestCode(pathParamSpec, 'handlers/tasks.ts', [], '../app', '/', 'bun')
    expect(result).toBe(
      "import{describe,it,expect}from'bun:test'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })

  it('framework vite-plus — import from vite-plus/test', () => {
    const result = makeHandlerTestCode(
      pathParamSpec,
      'handlers/tasks.ts',
      [],
      '../app',
      '/',
      'vite-plus',
    )
    expect(result).toBe(
      "import{describe,it,expect}from'vite-plus/test'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })

  it('with security — bearer auth generates 401 test', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Auth Handler API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'listUsers',
            summary: 'List users',
            tags: ['users'],
            security: [{ bearerAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer' },
        },
      },
    }
    const result = makeHandlerTestCode(spec, 'handlers/users.ts', [], '../app')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Users',()=>{describe('GET /users',()=>{it('should return 200 - List users',async()=>{\nconst res=await app.request(`/users`,{method:'GET',headers:{'Authorization':`Bearer ${faker.string.alphanumeric(32)}`}})\nexpect(res.status).toBe(200)})\nit('should return 401 without auth',async()=>{\nconst res=await app.request(`/users`,{method:'GET'})\nexpect(res.status).toBe(401)})})\n})\n",
    )
  })
})

// ─── extractTestCases (security schemes) ────────────────────────

describe('extractTestCases - security schemes', () => {
  it('basic auth security', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Basic Auth API', version: '1.0.0' },
      paths: {
        '/secure': {
          get: {
            operationId: 'getSecure',
            security: [{ basicAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          basicAuth: { type: 'http', scheme: 'basic' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'basic', name: 'Authorization' }])
  })

  it('apiKey security in header', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'ApiKey API', version: '1.0.0' },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            security: [{ apiKeyAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          apiKeyAuth: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'apiKey', name: 'X-API-Key', in: 'header' }])
  })

  it('apiKey security in query', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'ApiKey Query API', version: '1.0.0' },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            security: [{ apiKeyQuery: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          apiKeyQuery: { type: 'apiKey', name: 'api_key', in: 'query' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'apiKey', name: 'api_key', in: 'query' }])
  })

  it('oauth2 security', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'OAuth2 API', version: '1.0.0' },
      paths: {
        '/protected': {
          get: {
            operationId: 'getProtected',
            security: [{ oauth2: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          oauth2: {
            type: 'oauth2',
            flows: { implicit: { authorizationUrl: 'https://example.com/auth', scopes: {} } },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'oauth2', name: 'Authorization' }])
  })

  it('global security is used when operation has no security', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Global Auth API', version: '1.0.0' },
      security: [{ bearerAuth: [] }],
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'bearer', name: 'Authorization' }])
  })

  it('operation security overrides global security', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Override Auth API', version: '1.0.0' },
      security: [{ bearerAuth: [] }],
      paths: {
        '/public': {
          get: {
            operationId: 'getPublic',
            security: [{ basicAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer' },
          basicAuth: { type: 'http', scheme: 'basic' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].security).toStrictEqual([{ type: 'basic', name: 'Authorization' }])
  })
})

// ─── extractTestCases (header parameters) ───────────────────────

describe('extractTestCases - header parameters', () => {
  it('header parameters are extracted', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Header API', version: '1.0.0' },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            parameters: [
              {
                name: 'X-Request-Id',
                in: 'header',
                required: true,
                schema: { type: 'string', format: 'uuid' },
              },
              {
                name: 'X-Correlation-Id',
                in: 'header',
                required: false,
                schema: { type: 'string' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].headerParams).toStrictEqual([
      { name: 'X-Request-Id', fakerCode: 'faker.string.uuid()', required: true },
      {
        name: 'X-Correlation-Id',
        fakerCode: 'faker.string.alpha({ length: { min: 5, max: 20 } })',
        required: false,
      },
    ])
  })
})

// ─── extractTestCases ($ref parameters) ─────────────────────────

describe('extractTestCases - $ref parameters', () => {
  it('$ref query parameter is resolved from components', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'RefQuery API', version: '1.0.0' },
      paths: {
        '/items': {
          get: {
            operationId: 'listItems',
            parameters: [
              { $ref: '#/components/parameters/PageSize', name: '', in: 'query', schema: {} },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        parameters: {
          PageSize: {
            name: 'pageSize',
            in: 'query',
            required: false,
            schema: { type: 'integer', minimum: 1, maximum: 100 },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].queryParams).toStrictEqual([
      {
        name: 'pageSize',
        fakerCode: 'faker.number.int({ min: 1, max: 100 })',
        required: false,
      },
    ])
  })
})

// ─── extractTestCases (usedSchemaRefs) ──────────────────────────

describe('extractTestCases - usedSchemaRefs', () => {
  it('request body with $ref schema collects schema refs', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref Body API', version: '1.0.0' },
      paths: {
        '/orders': {
          post: {
            operationId: 'createOrder',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Order' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        schemas: {
          Order: {
            type: 'object',
            required: ['item'],
            properties: {
              item: { $ref: '#/components/schemas/Item' },
            },
          },
          Item: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
            },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual(['Order', 'Item'])
    expect(result[0].requestBody).toStrictEqual({
      fakerCode: 'mockOrder()',
      contentType: 'application/json',
    })
  })
})

// ─── makeTestFile (security — makeAuthHeader indirectly) ────────

describe('makeTestFile - security auth headers', () => {
  it('basic auth — generates Authorization Basic header and 401 test', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Basic API', version: '1.0.0' },
      paths: {
        '/secure': {
          get: {
            operationId: 'getSecure',
            summary: 'Secure endpoint',
            security: [{ basicAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          basicAuth: { type: 'http', scheme: 'basic' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Basic API',()=>{describe('default',()=>{describe('GET /secure',()=>{it('should return 200 - Secure endpoint',async()=>{\nconst res=await app.request(`/secure`,{method:'GET',headers:{'Authorization':`Basic ${btoa(`${faker.internet.username()}:${faker.internet.password()}`)}`}})\nexpect(res.status).toBe(200)})\nit('should return 401 without auth',async()=>{\nconst res=await app.request(`/secure`,{method:'GET'})\nexpect(res.status).toBe(401)})})\n})\n})\n",
    )
  })

  it('apiKey in header — generates X-API-Key header and 401 test', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'ApiKey API', version: '1.0.0' },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            summary: 'Get data',
            security: [{ apiKeyAuth: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          apiKeyAuth: { type: 'apiKey', name: 'X-API-Key', in: 'header' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('ApiKey API',()=>{describe('default',()=>{describe('GET /data',()=>{it('should return 200 - Get data',async()=>{\nconst res=await app.request(`/data`,{method:'GET',headers:{'X-API-Key':faker.string.alphanumeric(32)}})\nexpect(res.status).toBe(200)})\nit('should return 401 without auth',async()=>{\nconst res=await app.request(`/data`,{method:'GET'})\nexpect(res.status).toBe(401)})})\n})\n})\n",
    )
  })

  it('oauth2 — generates Bearer token header and 401 test', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'OAuth2 API', version: '1.0.0' },
      paths: {
        '/profile': {
          get: {
            operationId: 'getProfile',
            summary: 'Get profile',
            security: [{ oauth2: [] }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        securitySchemes: {
          oauth2: {
            type: 'oauth2',
            flows: { implicit: { authorizationUrl: 'https://example.com/auth', scopes: {} } },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('OAuth2 API',()=>{describe('default',()=>{describe('GET /profile',()=>{it('should return 200 - Get profile',async()=>{\nconst res=await app.request(`/profile`,{method:'GET',headers:{'Authorization':`Bearer ${faker.string.alphanumeric(32)}`}})\nexpect(res.status).toBe(200)})\nit('should return 401 without auth',async()=>{\nconst res=await app.request(`/profile`,{method:'GET'})\nexpect(res.status).toBe(401)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (path params with 404 — getNonExistentValue) ──

describe('makeTestFile - getNonExistentValue for 404 tests', () => {
  it('uuid path param — uses zero UUID for 404', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'UUID API', version: '1.0.0' },
      paths: {
        '/items/{itemId}': {
          get: {
            operationId: 'getItem',
            summary: 'Get item',
            tags: ['items'],
            parameters: [
              {
                name: 'itemId',
                in: 'path',
                required: true,
                schema: { type: 'string', format: 'uuid' },
              },
            ],
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('UUID API',()=>{describe('items',()=>{describe('GET /items/{itemId}',()=>{it('should return 200 - Get item',async()=>{const itemId=faker.string.uuid()\nconst res=await app.request(`/items/${itemId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/items/00000000-0000-0000-0000-000000000000`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('string path param without format — uses __non_existent__', () => {
    const result = makeTestFile(pathParamSpec)
    // Already tested above, verify the 404 path uses __non_existent__
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('PathParam API',()=>{describe('tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('integer path param — uses -1 for 404', () => {
    const result = makeTestFile(deleteSpec)
    // Already tested above, verify the 404 path uses -1
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Delete API',()=>{describe('tasks',()=>{describe('DELETE /tasks/{id}',()=>{it('should return 204 - Delete task',async()=>{const id=faker.number.int({ min: 1, max: 99999 })\nconst res=await app.request(`/tasks/${id}`,{method:'DELETE'})\nexpect(res.status).toBe(204)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/-1`,{method:'DELETE'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile ($ref request body — makeMockFunctions) ───────

describe('makeTestFile - $ref request body with mock functions', () => {
  it('generates mock functions for $ref schemas in topological order', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Mock API', version: '1.0.0' },
      paths: {
        '/orders': {
          post: {
            operationId: 'createOrder',
            summary: 'Create order',
            tags: ['orders'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Order' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        schemas: {
          Item: {
            type: 'object',
            required: ['name'],
            properties: {
              name: { type: 'string' },
            },
          },
          Order: {
            type: 'object',
            required: ['item'],
            properties: {
              item: { $ref: '#/components/schemas/Item' },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockItem() {\n  return {\n    name: faker.person.fullName()\n  }\n}\n\nfunction mockOrder() {\n  return {\n    item: mockItem()\n  }\n}\n\ndescribe('Mock API',()=>{describe('orders',()=>{describe('POST /orders',()=>{it('should return 201 - Create order',async()=>{const body=mockOrder()\nconst res=await app.request(`/orders`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (circular schema references) ─────────────────

describe('makeTestFile - circular schema references', () => {
  it('circular self-reference adds : any return type', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Circular API', version: '1.0.0' },
      paths: {
        '/nodes': {
          post: {
            operationId: 'createNode',
            summary: 'Create node',
            tags: ['nodes'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/TreeNode' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        schemas: {
          TreeNode: {
            type: 'object',
            required: ['value'],
            properties: {
              value: { type: 'string' },
              children: {
                type: 'array',
                items: { $ref: '#/components/schemas/TreeNode' },
              },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockTreeNode(): any {\n  return {\n    value: faker.string.alpha({ length: { min: 5, max: 20 } }),\n    children: faker.helpers.arrayElement([Array.from({ length: faker.number.int({ min: 1, max: 5 }) }, () => (mockTreeNode())), undefined])\n  }\n}\n\ndescribe('Circular API',()=>{describe('nodes',()=>{describe('POST /nodes',()=>{it('should return 201 - Create node',async()=>{const body=mockTreeNode()\nconst res=await app.request(`/nodes`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })

  it('mutual circular reference adds : any return type', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Mutual Circular API', version: '1.0.0' },
      paths: {
        '/a': {
          post: {
            operationId: 'createA',
            summary: 'Create A',
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/A' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        schemas: {
          A: {
            type: 'object',
            required: ['b'],
            properties: {
              b: { $ref: '#/components/schemas/B' },
            },
          },
          B: {
            type: 'object',
            required: ['a'],
            properties: {
              a: { $ref: '#/components/schemas/A' },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    // Both A and B are circular; no faker.* calls so no faker import
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\nfunction mockB(): any {\n  return {\n    a: mockA()\n  }\n}\n\nfunction mockA(): any {\n  return {\n    b: mockB()\n  }\n}\n\ndescribe('Mutual Circular API',()=>{describe('default',()=>{describe('POST /a',()=>{it('should return 201 - Create A',async()=>{const body=mockA()\nconst res=await app.request(`/a`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (basePath with various paths) ─────────────────

describe('makeTestFile - basePath variations', () => {
  it('basePath /api/v1 — deeply nested prefix', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Nested BasePath API', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'listUsers',
            summary: 'List users',
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = makeTestFile(spec, './app', '/api/v1')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport app from'./app'\n\ndescribe('Nested BasePath API',()=>{describe('default',()=>{describe('GET /api/v1/users',()=>{it('should return 200 - List users',async()=>{\nconst res=await app.request(`/api/v1/users`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (bun framework with faker) ────────────────────

describe('makeTestFile - bun framework with faker', () => {
  it('bun framework with request body imports faker from @faker-js/faker', () => {
    const result = makeTestFile(postSpec, './app', '/', 'bun')
    expect(result).toBe(
      "import{describe,it,expect}from'bun:test'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Post API',()=>{describe('tasks',()=>{describe('POST /tasks',()=>{it('should return 201 - Create task',async()=>{const body={\n    title: faker.lorem.sentence(),\n    done: faker.helpers.arrayElement([faker.datatype.boolean(), undefined])\n  }\nconst res=await app.request(`/tasks`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (header params in output) ─────────────────────

describe('makeTestFile - header parameters in output', () => {
  it('required header params appear in request headers', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Header Test API', version: '1.0.0' },
      paths: {
        '/data': {
          get: {
            operationId: 'getData',
            summary: 'Get data',
            parameters: [
              {
                name: 'X-Request-Id',
                in: 'header',
                required: true,
                schema: { type: 'string', format: 'uuid' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    const expected =
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Header Test API',()=>{describe('default',()=>{describe('GET /data',()=>{it('should return 200 - Get data',async()=>{const X-Request-Id=faker.string.uuid()\nconst res=await app.request(`/data`,{method:'GET',headers:{'X-Request-Id':String(X-Request-Id)}})\nexpect(res.status).toBe(200)})})\n})\n})\n"
    expect(result).toBe(expected)
  })
})

// ─── makeTestFile (security with request body and headers) ──────

describe('makeTestFile - security combined with body and headers', () => {
  it('security + request body generates both auth header and content-type', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Combo API', version: '1.0.0' },
      paths: {
        '/items': {
          post: {
            operationId: 'createItem',
            summary: 'Create item',
            security: [{ bearerAuth: [] }],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['name'],
                    properties: { name: { type: 'string' } },
                  },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        securitySchemes: {
          bearerAuth: { type: 'http', scheme: 'bearer' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Combo API',()=>{describe('default',()=>{describe('POST /items',()=>{it('should return 201 - Create item',async()=>{const body={\n    name: faker.person.fullName()\n  }\nconst res=await app.request(`/items`,{method:'POST',headers:{'Content-Type':'application/json','Authorization':`Bearer ${faker.string.alphanumeric(32)}`},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})\nit('should return 401 without auth',async()=>{const body={\n    name: faker.person.fullName()\n  }\nconst res=await app.request(`/items`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(401)})})\n})\n})\n",
    )
  })
})

// ─── makeTestFile (no operationId fallback) ─────────────────────

describe('makeTestFile - operationId fallback', () => {
  it('generates operationId from method+path when not provided', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'NoOpId API', version: '1.0.0' },
      paths: {
        '/health': {
          get: {
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].operationId).toBe('get_health')
  })
})

// ─── $ref path parameter handling ──────────────────────────────

describe('extractTestCases - $ref path parameter schema refs', () => {
  it('collects schema refs from $ref path parameters', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref Param API', version: '1.0.0' },
      paths: {
        '/users/{userId}': {
          get: {
            operationId: 'getUser',
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual(['UserId'])
  })

  it('collects schema refs from both $ref path params and request body', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Mixed Ref API', version: '1.0.0' },
      paths: {
        '/posts/{postId}/comment': {
          post: {
            operationId: 'commentOnPost',
            parameters: [
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/PostId' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/CommentRequest' },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          PostId: { type: 'string', format: 'uuid' },
          CommentBody: { type: 'string', minLength: 1, maxLength: 280 },
          CommentRequest: {
            type: 'object',
            required: ['body'],
            properties: {
              body: { $ref: '#/components/schemas/CommentBody' },
            },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual(['CommentRequest', 'CommentBody', 'PostId'])
  })

  it('deduplicates refs shared between path params and request body', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Dedup API', version: '1.0.0' },
      paths: {
        '/users/{userId}': {
          put: {
            operationId: 'updateUser',
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: {
                    type: 'object',
                    required: ['id'],
                    properties: {
                      id: { $ref: '#/components/schemas/UserId' },
                    },
                  },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual(['UserId'])
  })

  it('collects refs from multiple path params on the same endpoint', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Multi Param API', version: '1.0.0' },
      paths: {
        '/users/{userId}/posts/{postId}': {
          get: {
            operationId: 'getUserPost',
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/PostId' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
          PostId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual(['UserId', 'PostId'])
  })

  it('inline path param schema produces empty usedSchemaRefs', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Inline API', version: '1.0.0' },
      paths: {
        '/items/{id}': {
          get: {
            operationId: 'getItem',
            parameters: [{ name: 'id', in: 'path', required: true, schema: { type: 'integer' } }],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
    }
    const result = extractTestCases(spec)
    expect(result[0].usedSchemaRefs).toStrictEqual([])
  })
})

describe('makeTestFile - $ref path parameter mock functions', () => {
  it('generates mock functions for $ref schemas used in path parameters', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Path Ref Mock API', version: '1.0.0' },
      paths: {
        '/users/{userId}': {
          get: {
            operationId: 'getUser',
            tags: ['users'],
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockUserId() {\n  return faker.string.uuid()\n}\n\ndescribe('Path Ref Mock API',()=>{describe('users',()=>{describe('GET /users/{userId}',()=>{it('should return 200',async()=>{const userId=mockUserId()\nconst res=await app.request(`/users/${userId}`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('resolves $ref to uuid format for 404 test non-existent value', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref UUID 404 API', version: '1.0.0' },
      paths: {
        '/posts/{postId}': {
          delete: {
            operationId: 'deletePost',
            tags: ['posts'],
            parameters: [
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/PostId' },
              },
            ],
            responses: {
              '200': { description: 'Deleted' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          PostId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockPostId() {\n  return faker.string.uuid()\n}\n\ndescribe('Ref UUID 404 API',()=>{describe('posts',()=>{describe('DELETE /posts/{postId}',()=>{it('should return 200',async()=>{const postId=mockPostId()\nconst res=await app.request(`/posts/${postId}`,{method:'DELETE'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/posts/00000000-0000-0000-0000-000000000000`,{method:'DELETE'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('resolves $ref to integer type for 404 test non-existent value', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref Int 404 API', version: '1.0.0' },
      paths: {
        '/items/{itemId}': {
          get: {
            operationId: 'getItem',
            tags: ['items'],
            parameters: [
              {
                name: 'itemId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/ItemId' },
              },
            ],
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          ItemId: { type: 'integer' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockItemId() {\n  return faker.number.int({ min: 1, max: 1000 })\n}\n\ndescribe('Ref Int 404 API',()=>{describe('items',()=>{describe('GET /items/{itemId}',()=>{it('should return 200',async()=>{const itemId=mockItemId()\nconst res=await app.request(`/items/${itemId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/items/-1`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('$ref string without format falls back to __non_existent__ for 404', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Ref String 404 API', version: '1.0.0' },
      paths: {
        '/users/{slug}': {
          get: {
            operationId: 'getUser',
            tags: ['users'],
            parameters: [
              {
                name: 'slug',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/Slug' },
              },
            ],
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          Slug: { type: 'string', minLength: 1, maxLength: 50 },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockSlug() {\n  return faker.string.alpha({ length: { min: 1, max: 50 } })\n}\n\ndescribe('Ref String 404 API',()=>{describe('users',()=>{describe('GET /users/{slug}',()=>{it('should return 200',async()=>{const slug=mockSlug()\nconst res=await app.request(`/users/${slug}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/users/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('vite-plus framework with $ref path params and mock functions', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'VP Ref API', version: '1.0.0' },
      paths: {
        '/posts/{postId}': {
          get: {
            operationId: 'getPost',
            tags: ['posts'],
            parameters: [
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/PostId' },
              },
            ],
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          PostId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeTestFile(spec, './app', '/', 'vite-plus')
    expect(result).toBe(
      "import{describe,it,expect}from'vite-plus/test'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockPostId() {\n  return faker.string.uuid()\n}\n\ndescribe('VP Ref API',()=>{describe('posts',()=>{describe('GET /posts/{postId}',()=>{it('should return 200',async()=>{const postId=mockPostId()\nconst res=await app.request(`/posts/${postId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/posts/00000000-0000-0000-0000-000000000000`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })
})

describe('makeHandlerTestCode - $ref path parameter mock functions', () => {
  it('handler test includes mock functions for $ref path parameters', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Handler Ref API', version: '1.0.0' },
      paths: {
        '/users/{userId}': {
          get: {
            operationId: 'getUser',
            tags: ['users'],
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeHandlerTestCode(spec, 'handlers/users.ts', ['getUserRoute'], '../app')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\nfunction mockUserId() {\n  return faker.string.uuid()\n}\n\ndescribe('Users',()=>{describe('GET /users/{userId}',()=>{it('should return 200',async()=>{const userId=mockUserId()\nconst res=await app.request(`/users/${userId}`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n",
    )
  })

  it('handler test with vite-plus framework', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'VP Handler API', version: '1.0.0' },
      paths: {
        '/users/{userId}': {
          get: {
            operationId: 'getUser',
            tags: ['users'],
            parameters: [
              {
                name: 'userId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/UserId' },
              },
            ],
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          UserId: { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeHandlerTestCode(spec, 'handlers/users.ts', [], '../app', '/', 'vite-plus')
    expect(result).toBe(
      "import{describe,it,expect}from'vite-plus/test'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\nfunction mockUserId() {\n  return faker.string.uuid()\n}\n\ndescribe('Users',()=>{describe('GET /users/{userId}',()=>{it('should return 200',async()=>{const userId=mockUserId()\nconst res=await app.request(`/users/${userId}`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n",
    )
  })
})

// ─── Namespace-qualified schema names (TypeSpec dotted names) ───

describe('makeTestFile - namespace-qualified schema names', () => {
  it('sanitizes dotted schema names in mock function definitions and calls', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Namespaced API', version: '1.0.0' },
      paths: {
        '/auth/signup': {
          post: {
            operationId: 'Auth_signup',
            tags: ['Auth'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Auth.SignupRequest' },
                },
              },
            },
            responses: { '201': { description: 'Created' } },
          },
        },
      },
      components: {
        schemas: {
          Username: { type: 'string', minLength: 1, maxLength: 30 },
          Email: { type: 'string', format: 'email' },
          Password: { type: 'string', minLength: 6 },
          'Auth.SignupRequest': {
            type: 'object',
            required: ['username', 'name', 'email', 'password'],
            properties: {
              username: { $ref: '#/components/schemas/Username' },
              name: { type: 'string' },
              email: { $ref: '#/components/schemas/Email' },
              password: { $ref: '#/components/schemas/Password' },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockUsername() {\n  return faker.string.alpha({ length: { min: 1, max: 30 } })\n}\n\nfunction mockEmail() {\n  return faker.internet.email()\n}\n\nfunction mockPassword() {\n  return faker.string.alpha({ length: { min: 6, max: 20 } })\n}\n\nfunction mockAuthSignupRequest() {\n  return {\n    username: mockUsername(),\n    name: faker.person.fullName(),\n    email: mockEmail(),\n    password: mockPassword()\n  }\n}\n\ndescribe('Namespaced API',()=>{describe('Auth',()=>{describe('POST /auth/signup',()=>{it('should return 201',async()=>{const body=mockAuthSignupRequest()\nconst res=await app.request(`/auth/signup`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(201)})})\n})\n})\n",
    )
  })

  it('sanitizes dotted schema names in $ref path parameters', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Dotted Path Param API', version: '1.0.0' },
      paths: {
        '/posts/{postId}': {
          delete: {
            operationId: 'deletePost',
            tags: ['posts'],
            parameters: [
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/Types.PostId' },
              },
            ],
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          'Types.PostId': { type: 'string', format: 'uuid' },
        },
      },
    }
    const result = makeTestFile(spec)
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockTypesPostId() {\n  return faker.string.uuid()\n}\n\ndescribe('Dotted Path Param API',()=>{describe('posts',()=>{describe('DELETE /posts/{postId}',()=>{it('should return 200',async()=>{const postId=mockTypesPostId()\nconst res=await app.request(`/posts/${postId}`,{method:'DELETE'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/posts/00000000-0000-0000-0000-000000000000`,{method:'DELETE'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('sanitizes dotted schema names in makeHandlerTestCode', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'Dotted Handler API', version: '1.0.0' },
      paths: {
        '/posts/comment/{postId}': {
          post: {
            operationId: 'commentOnPost',
            tags: ['posts'],
            parameters: [
              {
                name: 'postId',
                in: 'path',
                required: true,
                schema: { $ref: '#/components/schemas/Types.PostId' },
              },
            ],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Posts.CommentRequest' },
                },
              },
            },
            responses: {
              '200': { description: 'OK' },
              '404': { description: 'Not found' },
            },
          },
        },
      },
      components: {
        schemas: {
          'Types.PostId': { type: 'string', format: 'uuid' },
          'Types.CommentBody': { type: 'string', minLength: 1, maxLength: 280 },
          'Posts.CommentRequest': {
            type: 'object',
            required: ['body'],
            properties: {
              body: { $ref: '#/components/schemas/Types.CommentBody' },
            },
          },
        },
      },
    }
    const result = makeHandlerTestCode(spec, 'handlers/posts.ts', [], '../app')
    expect(result).toBe(
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\nfunction mockTypesCommentBody() {\n  return faker.string.alpha({ length: { min: 1, max: 280 } })\n}\n\nfunction mockPostsCommentRequest() {\n  return {\n    body: mockTypesCommentBody()\n  }\n}\n\nfunction mockTypesPostId() {\n  return faker.string.uuid()\n}\n\ndescribe('Posts',()=>{describe('POST /posts/comment/{postId}',()=>{it('should return 200',async()=>{const postId=mockTypesPostId()\nconst body=mockPostsCommentRequest()\nconst res=await app.request(`/posts/comment/${postId}`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{const body=mockPostsCommentRequest()\nconst res=await app.request(`/posts/comment/00000000-0000-0000-0000-000000000000`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })

  it('dotted schema name with vite-plus framework', () => {
    const spec: OpenAPI = {
      openapi: '3.1.0',
      info: { title: 'VP Dotted API', version: '1.0.0' },
      paths: {
        '/auth/login': {
          post: {
            operationId: 'login',
            tags: ['auth'],
            requestBody: {
              required: true,
              content: {
                'application/json': {
                  schema: { $ref: '#/components/schemas/Auth.LoginRequest' },
                },
              },
            },
            responses: { '200': { description: 'OK' } },
          },
        },
      },
      components: {
        schemas: {
          Email: { type: 'string', format: 'email' },
          'Auth.LoginRequest': {
            type: 'object',
            required: ['email'],
            properties: {
              email: { $ref: '#/components/schemas/Email' },
            },
          },
        },
      },
    }
    const result = makeTestFile(spec, './app', '/', 'vite-plus')
    expect(result).toBe(
      "import{describe,it,expect}from'vite-plus/test'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\nfunction mockEmail() {\n  return faker.internet.email()\n}\n\nfunction mockAuthLoginRequest() {\n  return {\n    email: mockEmail()\n  }\n}\n\ndescribe('VP Dotted API',()=>{describe('auth',()=>{describe('POST /auth/login',()=>{it('should return 200',async()=>{const body=mockAuthLoginRequest()\nconst res=await app.request(`/auth/login`,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })
})
