import { describe, expect, it } from 'vite-plus/test'

import type { Components } from '../../../../openapi/index.js'
import { linksCode } from './links.js'

describe('linksCode', () => {
  it.concurrent('should return empty string when no links', () => {
    const components: Components = {}
    expect(linksCode(components, true)).toBe('')
  })

  it.concurrent('should return empty string when links is empty object', () => {
    const components: Components = { links: {} }
    expect(linksCode(components, true)).toBe('')
  })

  it.concurrent('should generate link with export', () => {
    const components: Components = {
      links: {
        GetUserById: {
          operationId: 'getUser',
          parameters: { userId: '$response.body#/id' },
        },
      },
    }
    expect(linksCode(components, true)).toBe(
      `export const GetUserByIdLink={operationId:"getUser",parameters:{"userId":"$response.body#/id"}}`,
    )
  })

  it.concurrent('should generate link without export', () => {
    const components: Components = {
      links: {
        SimpleLink: { operationId: 'simpleOp' },
      },
    }
    expect(linksCode(components, false)).toBe(`const SimpleLinkLink={operationId:"simpleOp"}`)
  })

  it.concurrent('should append "as const" when readonly is true', () => {
    const components: Components = {
      links: {
        GetUserById: { operationId: 'getUser', parameters: { userId: '$response.body#/id' } },
      },
    }
    expect(linksCode(components, true, true)).toBe(
      `export const GetUserByIdLink={operationId:"getUser",parameters:{"userId":"$response.body#/id"}} as const`,
    )
  })

  it.concurrent('should generate multiple links separated by double newline', () => {
    const components = {
      links: {
        GetUserById: { operationId: 'getUser' },
        GetUserOrders: {
          operationRef: '#/paths/~1users/get',
          server: { url: 'https://api.example.com' },
        },
      },
    } as unknown as Components
    expect(linksCode(components, true)).toBe(
      `export const GetUserByIdLink={operationId:"getUser"}\n\nexport const GetUserOrdersLink={operationRef:"#/paths/~1users/get",server:{"url":"https://api.example.com"}}`,
    )
  })

  it.concurrent('should resolve $ref to PascalCase Link import name', () => {
    const components: Components = {
      links: {
        GetUserById: { $ref: '#/components/links/UserDetail' },
      },
    }
    expect(linksCode(components, true)).toBe(`export const GetUserByIdLink={$ref:UserDetailLink}`)
  })

  it.concurrent('should preserve all OpenAPI Link fields', () => {
    const components = {
      links: {
        GetUserById: {
          operationId: 'getUser',
          parameters: { id: '$response.body#/id' },
          requestBody: '$response.body',
          description: 'Link to user details',
          server: { url: 'https://api.example.com', description: 'Prod' },
        },
      },
    } as unknown as Components
    expect(linksCode(components, true)).toBe(
      `export const GetUserByIdLink={operationId:"getUser",parameters:{"id":"$response.body#/id"},requestBody:"$response.body",description:"Link to user details",server:{"url":"https://api.example.com","description":"Prod"}}`,
    )
  })
})
