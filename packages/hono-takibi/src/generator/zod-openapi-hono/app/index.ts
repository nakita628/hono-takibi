import type { OpenAPI } from '../../../openapi/index.js'
import { isHttpMethod, methodPath, registerComponent } from '../../../utils/index.js'

/**
 * Generates a Hono app with OpenAPI and Swagger UI integration.
 *
 * @param openapi - The OpenAPI specification.
 * @param output - The output file name (e.g., 'user.ts').
 * @param basePath - Optional base path for the app.
 * @returns The generated application code as a string.
 */
export function app(openapi: OpenAPI, output: `${string}.ts`, basePath: string): string {
  const getRouteMaps = (
    openapi: OpenAPI,
  ): { routeName: string; handlerName: string; path: string }[] => {
    const paths = openapi.paths
    const routeMappings = Object.entries(paths).flatMap(([path, pathItem]) => {
      return Object.entries(pathItem).flatMap(([method]) => {
        if (!isHttpMethod(method)) return []
        return {
          routeName: `${methodPath(method, path)}Route`,
          handlerName: `${methodPath(method, path)}RouteHandler`,
          path,
        }
      })
    })
    return routeMappings
  }

  const routeMappings = getRouteMaps(openapi)

  const handlerNames = Array.from(new Set(routeMappings.map((m) => m.handlerName))).sort()
  const handlerImport =
    handlerNames.length > 0 ? `import{${handlerNames.join(',')}}from'./handlers'` : ''

  const routeNames = Array.from(new Set(routeMappings.map((m) => m.routeName))).sort()
  const routeModule = `./${output.replace(/^.*\//, '').replace(/\.ts$/, '')}`
  const routesImport =
    routeNames.length > 0 ? `import{${routeNames.join(',')}}from'${routeModule}'` : ''

  const path = basePath === '/' ? '/doc' : `${basePath}/doc`
  const registerComponentCode = openapi.components?.securitySchemes
    ? registerComponent(openapi.components.securitySchemes)
    : ''
  const versionStr = String(openapi.openapi ?? '').trim()
  const [majStr, minStr] = versionStr.split('.', 3)
  const major = Number.isFinite(Number(majStr)) ? Number(majStr) : 0
  const minor = Number.isFinite(Number(minStr)) ? Number(minStr) : 0
  const is31Plus = major > 3 || (major === 3 && minor >= 1)
  const doc = is31Plus ? 'doc31' : 'doc'

  const importSection = [
    `import{swaggerUI}from'@hono/swagger-ui'`,
    `import{OpenAPIHono}from'@hono/zod-openapi'`,
    handlerImport,
    routesImport,
  ]
    .filter(Boolean)
    .join('\n')

  const appInit =
    basePath !== '/'
      ? `const app=new OpenAPIHono().basePath('${basePath}')`
      : 'const app=new OpenAPIHono()'

  const apiInit =
    'export const api=app' +
    routeMappings
      .map(({ routeName, handlerName }) => `.openapi(${routeName},${handlerName})`)
      .join('\n')

  const docs = Object.fromEntries(
    Object.entries({
      openapi: openapi.openapi,
      info: openapi.info,
      servers: openapi.servers,
      tags: openapi.tags,
      externalDocs: openapi.externalDocs,
    }).filter(([, v]) => v !== undefined),
  )

  const swagger =
    `if(process.env.NODE_ENV === 'development'){` +
    `${registerComponentCode}\n` +
    `app.${doc}('/doc',${JSON.stringify(docs)})` +
    `.get('/ui',swaggerUI({url:'${path}'}))` +
    '}'

  return [
    importSection,
    appInit,
    apiInit,
    swagger,
    'export type AddType=typeof api',
    'export default app',
  ].join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/app/index.ts
if (import.meta.vitest) {
  const { describe, expect, it } = import.meta.vitest

  const openapi: OpenAPI = {
    openapi: '3.1.0',
    info: {
      title: 'HonoTakibi',
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
                        example: 'Hono',
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
                        example: 'HonoX',
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
                        example: 'ZodOpenAPIHono',
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

  describe('app', () => {
    it.concurrent('app Test', () => {
      const result = app(openapi, 'app.ts', '/api')
      const expected = `import{swaggerUI}from'@hono/swagger-ui'
import{OpenAPIHono}from'@hono/zod-openapi'
import{getHonoRouteHandler,getHonoXRouteHandler,getZodOpenapiHonoRouteHandler}from'./handlers'
import{getHonoRoute,getHonoXRoute,getZodOpenapiHonoRoute}from'./app'

const app=new OpenAPIHono().basePath('/api')

export const api=app.openapi(getHonoRoute,getHonoRouteHandler)
.openapi(getHonoXRoute,getHonoXRouteHandler)
.openapi(getZodOpenapiHonoRoute,getZodOpenapiHonoRouteHandler)

if(process.env.NODE_ENV === 'development'){
app.doc31('/doc',{"openapi":"3.1.0","info":{"title":"HonoTakibi","version":"v1"},"tags":[{"name":"Hono"},{"name":"HonoX"},{"name":"ZodOpenAPIHono"}]}).get('/ui',swaggerUI({url:'/api/doc'}))}

export type AddType=typeof api

export default app`
      expect(result).toBe(expected)
    })
  })
}
