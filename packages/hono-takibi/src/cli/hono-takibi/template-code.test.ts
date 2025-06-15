import { beforeAll, afterAll, describe, it, expect } from 'vitest'
import type { OpenAPI } from '../../openapi/index.js'
import { templateCode } from './template-code.js'
import fs from 'node:fs'

// Test run
// pnpm vitest run ./src/cli/hono-takibi/template-code.test.ts

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

// template true, test false
describe('templateCode template true test true', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template --test', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`

    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-handler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.test.ts`)).toBe(true)
  })
})

describe('templateCode template true test true exists main.ts', () => {
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
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)

    // 2nd run
    // exists main.ts
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-handler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.test.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.test.ts`)).toBe(true)
  })
})

// template true, test false
describe('templateCode template true', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--template', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
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
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)
    // 2nd run
    // exists main.ts
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
  })
})

// basePath test
describe('templateCode template true basePath', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it(`--template basePath 'api'`, async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true, 'api')
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/index.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
  })
})

describe('templateCode template true basePath', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it(`--template basePath 'api'`, async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`

    // 1st run
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true, 'api')
    // 2nd run
    // exists main.t
    await templateCode(openapi, 'tmp-template/src/route.ts', true, true, 'api')
    expect(fs.existsSync(`${path}/index.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(true)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(true)
    // contain basePath
    const appCode = fs.readFileSync(`${path}/main.ts`, 'utf-8')
    expect(appCode).toContain("new OpenAPIHono().basePath('api')")
  })
})

// template false
describe('templateCode template false', () => {
  beforeAll(() => {
    fs.mkdirSync('tmp-template/src', { recursive: true })
  })
  afterAll(() => {
    fs.rmSync('tmp-template', { recursive: true, force: true })
  })

  it('--no-template', async () => {
    const cwd = process.cwd()
    const path = `${cwd}/tmp-template/src/`
    await templateCode(openapi, 'tmp-template/src/route.ts', false, false)
    expect(fs.existsSync(`${path}/index.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/main.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/hono-handler.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/hono-x-handler.ts`)).toBe(false)
    expect(fs.existsSync(`${path}/handler/zod-openapi-hono-handler.ts`)).toBe(false)
  })
})