import { makeConst } from '../../../../helper/code.js'
import { makeLinkOrReference } from '../../../../helper/index.js'
import type { Components } from '../../../../openapi/index.js'

export function linksCode(components: Components, exportLinks: boolean) {
  const { links } = components
  if (!links) return ''

  return Object.entries(links)
    .map(([k, link]) => {
      return `${makeConst(exportLinks, k, 'Link')}${makeLinkOrReference(link)}`
    })
    .join('\n\n')
}

// Test run
// pnpm vitest run ./packages/hono-takibi/src/generator/zod-openapi-hono/openapi/components/links.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest

  describe('linksCode', () => {
    it('should return empty string when no links', () => {
      const components: Components = {}
      expect(linksCode(components, true)).toBe('')
    })

    it('should generate link with export', () => {
      const components: Components = {
        links: {
          GetUserById: {
            operationId: 'getUser',
            parameters: { userId: '$response.body#/id' },
          },
        },
      }
      const result = linksCode(components, true)
      expect(result).toBe(
        `export const GetUserByIdLink={operationId:"getUser",parameters:{"userId":"$response.body#/id"}}`,
      )
    })

    it('should generate link without export', () => {
      const components: Components = {
        links: {
          SimpleLink: {
            operationId: 'simpleOp',
          },
        },
      }
      const result = linksCode(components, false)
      expect(result).toBe(`const SimpleLink={operationId:"simpleOp"}`)
    })
  })
}
