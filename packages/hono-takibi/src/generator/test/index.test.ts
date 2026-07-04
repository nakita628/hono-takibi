import { describe, expect, it } from 'vite-plus/test'

import { extractTestCases, makeHandlerTestCode, makeTestFile } from './index.js'

describe('generator/test barrel exports', () => {
  it('should export extractTestCases as function', () => {
    expect(typeof extractTestCases).toBe('function')
  })

  it('should export makeHandlerTestCode as function', () => {
    expect(typeof makeHandlerTestCode).toBe('function')
  })

  it('should export makeTestFile as function', () => {
    expect(typeof makeTestFile).toBe('function')
  })
})

describe('extractTestCases', () => {
  it('should extract test cases from OpenAPI spec', () => {
    const openAPI = {
      openapi: '3.1.0' as const,
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    expect(extractTestCases(openAPI)).toStrictEqual([
      {
        operationId: 'getUsers',
        method: 'GET',
        path: '/users',
        summary: '',
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
})

describe('makeTestFile', () => {
  it('should generate test file code', () => {
    const openAPI = {
      openapi: '3.1.0' as const,
      info: { title: 'Test', version: '1.0.0' },
      paths: {
        '/users': {
          get: {
            operationId: 'getUsers',
            responses: {
              '200': { description: 'OK' },
            },
          },
        },
      },
    }
    expect(makeTestFile(openAPI, '..')).toBe(`import{describe,it,expect}from'vitest'
import app from'..'

describe('Test',()=>{describe('default',()=>{describe('GET /users',()=>{it('should return 200',async()=>{
const res=await app.request(\`/users\`,{method:'GET'})
expect(res.status).toBe(200)})})
})
})
`)
  })
})
