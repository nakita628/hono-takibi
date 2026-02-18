import { describe, expect, it } from 'vitest'
import {
  extractTestCases,
  FORMAT_TO_FAKER,
  makeHandlerTestCode,
  makeTestFile,
  PROPERTY_NAME_TO_FAKER,
  schemaToFaker,
  TYPE_TO_FAKER,
} from './index.js'

describe('generator/test barrel exports', () => {
  it('should export FORMAT_TO_FAKER', () => {
    expect(FORMAT_TO_FAKER).toBeDefined()
    expect(typeof FORMAT_TO_FAKER).toBe('object')
  })

  it('should export PROPERTY_NAME_TO_FAKER', () => {
    expect(PROPERTY_NAME_TO_FAKER).toBeDefined()
    expect(typeof PROPERTY_NAME_TO_FAKER).toBe('object')
  })

  it('should export TYPE_TO_FAKER', () => {
    expect(TYPE_TO_FAKER).toBeDefined()
    expect(typeof TYPE_TO_FAKER).toBe('object')
  })

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
    const result = schemaToFaker({ type: 'string' })
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should generate faker code for integer type', () => {
    const result = schemaToFaker({ type: 'integer' })
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })

  it('should generate faker code for object type', () => {
    const result = schemaToFaker({
      type: 'object',
      properties: {
        id: { type: 'integer' },
        name: { type: 'string' },
      },
    })
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
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
    const result = extractTestCases(openAPI, '/')
    expect(Array.isArray(result)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
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
    const result = makeTestFile(openAPI, '..')
    expect(typeof result).toBe('string')
    expect(result.length).toBeGreaterThan(0)
  })
})
