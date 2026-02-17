import { describe, expect, it } from 'vitest'
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
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('PathParam API',()=>{describe('tasks',()=>{describe('GET /tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n})\n",
    )
  })

  it('GET with query params — URL-encoded query string', () => {
    const result = makeTestFile(queryParamSpec)
    expect(result).toBe(
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'./app'\n\ndescribe('Query API',()=>{describe('tasks',()=>{describe('GET /tasks',()=>{it('should return 200 - List tasks',async()=>{const status=faker.helpers.arrayElement([\"pending\", \"done\"] as const)\nconst limit=faker.number.int({ min: 1, max: 100 })\nconst res=await app.request(`/tasks?status=${encodeURIComponent(String(status))}&limit=${encodeURIComponent(String(limit))}`,{method:'GET'})\nexpect(res.status).toBe(200)})})\n})\n})\n",
    )
  })

  it('Bearer auth — 401 unauthorized test', () => {
    const result = makeTestFile(bearerSpec)
    expect(result).toBe(
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
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
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
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
})

// ─── makeHandlerTestCode ────────────────────────────────────────

describe('makeHandlerTestCode', () => {
  it('matching handler — tasks', () => {
    const result = makeHandlerTestCode(pathParamSpec, 'handlers/tasks.ts', [], '../app')
    expect(result).toBe(
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
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
      // biome-ignore lint/suspicious/noTemplateCurlyInString: expected output contains template literals
      "import{describe,it,expect}from'vitest'\nimport{faker}from'@faker-js/faker'\nimport app from'../app'\n\ndescribe('Tasks',()=>{describe('GET /api/tasks/{taskId}',()=>{it('should return 200 - Get task',async()=>{const taskId=faker.string.alpha({ length: { min: 5, max: 20 } })\nconst res=await app.request(`/api/tasks/${taskId}`,{method:'GET'})\nexpect(res.status).toBe(200)})\nit('should return 404 for non-existent resource',async()=>{\nconst res=await app.request(`/api/tasks/__non_existent__`,{method:'GET'})\nexpect(res.status).toBe(404)})})\n})\n",
    )
  })
})
