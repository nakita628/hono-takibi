import fs from 'node:fs'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import type { OpenAPI } from '../openapi/index.js'
import { templateCode } from './template-code.js'

// Test run
// pnpm vitest run ./src/cli/template-code.test.ts

const openapi: OpenAPI = {
  openapi: '3.1.0',
  info: {
    title: 'HonoTakibi🔥',
    version: 'v1',
  },
  tags: [{ name: 'Hono' }, { name: 'HonoX' }, { name: 'ZodOpenAPIHono' }],
  paths: {
    '/hono': {
      get: {
        tags: ['Hono'],
        summary: 'Hono',
        description: 'Hono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Hono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/hono-x': {
      get: {
        tags: ['HonoX'],
        summary: 'HonoX',
        description: 'HonoX',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'HonoX🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
    '/zod-openapi-hono': {
      get: {
        tags: ['ZodOpenAPIHono'],
        summary: 'ZodOpenAPIHono',
        description: 'ZodOpenAPIHono',
        responses: {
          '200': {
            description: 'OK',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'ZodOpenAPIHono🔥',
                    },
                  },
                  required: ['message'],
                },
              },
            },
          },
        },
      },
    },
  },
}

// test true
describe('test true', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template --test', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`

    await templateCode(openapi, 'tmp-template/src/route.ts', true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
  })
})

describe('test true exists main.ts', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template --test', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`

    // 1st run
    await templateCode(openapi, 'tmp-template/src/route.ts', true)

    // 2nd run
    // exists main.ts
    await templateCode(openapi, 'tmp-template/src/route.ts', true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
  })
})

// test false
describe('test false', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    await templateCode(openapi, 'tmp-template/src/route.ts', false)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
  })
})

describe('templateCode template true exists main.ts', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    // 1st run
    await templateCode(openapi, 'tmp-template/src/route.ts', true)
    // 2nd run
    // exists main.ts
    await templateCode(openapi, 'tmp-template/src/route.ts', true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
  })
})

// basePath test
describe('basePath api', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it(`--template basePath 'api'`, async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    await templateCode(openapi, 'tmp-template/src/route.ts', false, 'api')
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
  })
})

describe('test ture basePath api', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it(`basePath 'api'`, async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`

    // 1st run
    await templateCode(openapi, 'tmp-template/src/route.ts', true, 'api')
    // 2nd run
    // exists main.ts
    await templateCode(openapi, 'tmp-template/src/route.ts', true, 'api')
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/honoXHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handlers/zodOpenapiHonoHandler.test.ts`)).toBe(true)

    // contain basePath
    const appCode = fs.readFileSync(`${path}/main.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
  })
})
