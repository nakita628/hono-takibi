import { describe, expect, it } from 'vite-plus/test'

import { extractTestCases, makeHandlerTestCode, makeTestFile, schemaToFaker } from './index.js'

describe('generator/test barrel exports', () => {
  it('should export schemaToFaker as function', () => {
    expect(typeof schemaToFaker).toBe('function')
  })

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

describe('schemaToFaker', () => {
  it('should generate faker code for string type', () => {
    expect(schemaToFaker({ type: 'string' })).toBe(
      'faker.string.alpha({ length: { min: 5, max: 20 } })',
    )
  })

  it('should generate faker code for integer type', () => {
    expect(schemaToFaker({ type: 'integer' })).toBe('faker.number.int({ min: 1, max: 1000 })')
  })

  it('should generate faker code for object type', () => {
    expect(
      schemaToFaker({
        type: 'object',
        properties: {
          id: { type: 'integer' },
          name: { type: 'string' },
        },
      }),
    ).toBe(
      '{ id: faker.helpers.arrayElement([faker.number.int({ min: 1, max: 99999 }), undefined]), name: faker.helpers.arrayElement([faker.person.fullName(), undefined]) }',
    )
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
