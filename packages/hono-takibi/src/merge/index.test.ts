import { describe, expect, it } from 'vitest'
import { mergeBarrelFile, mergeHandlerFile } from './index.js'

describe('merge', () => {
  describe('mergeHandlerFile', () => {
    it('preserves existing handler implementation', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const user = await db.getUser(c.req.param('id'))
  return c.json(user, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('await db.getUser')
      expect(result).not.toContain('async (c) => {}')
    })

    it('adds new handlers from generated code', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('getUserRouteHandler')
      expect(result).toContain('postUserRouteHandler')
      // Existing implementation preserved
      expect(result).toContain('return c.json({ id: 1 }, 200)')
    })

    it('preserves existing helper functions and constants', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

const DEFAULT_PAGE_SIZE = 20

function formatUser(user: any) {
  return { ...user, name: user.name.trim() }
}

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json(formatUser({ id: 1 }), 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('DEFAULT_PAGE_SIZE')
      expect(result).toContain('function formatUser')
    })

    it('merges import statements', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      // Both route types should be in imports
      expect(result).toContain('getUserRoute')
      expect(result).toContain('postUserRoute')
    })

    it('returns identical code when no changes', () => {
      const code = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(code, code)
      expect(result).toContain('getUserRouteHandler')
      // Should not duplicate the handler
      const handlerCount = (result.match(/getUserRouteHandler/g) || []).length
      // One in import type reference and one in the declaration
      expect(handlerCount).toBeLessThanOrEqual(3)
    })

    it('handles first generation (existing is same as generated)', () => {
      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(generated, generated)
      expect(result).toContain('getUserRouteHandler')
    })

    it('preserves existing-only handlers (user-added)', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, customRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const customRouteHandler: RouteHandler<typeof customRoute> = async (c) => {
  return c.json({ custom: true }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('getUserRouteHandler')
      expect(result).toContain('customRouteHandler')
      expect(result).toContain('custom: true')
    })
  })

  describe('mergeBarrelFile', () => {
    it('merges export statements from both files', () => {
      const existing = `export * from './users'
export * from './posts'
`

      const generated = `export * from './users'
export * from './comments'
`

      const result = mergeBarrelFile(existing, generated)
      expect(result).toContain("export * from './users'")
      expect(result).toContain("export * from './posts'")
      expect(result).toContain("export * from './comments'")
    })

    it('preserves existing export lines', () => {
      const existing = `export * from './users'
`

      const generated = `export * from './users'
`

      const result = mergeBarrelFile(existing, generated)
      const count = (result.match(/export \* from '\.\/users'/g) || []).length
      expect(count).toBe(1)
    })

    it('handles first generation', () => {
      const generated = `export * from './users'
export * from './posts'
`

      const result = mergeBarrelFile(generated, generated)
      expect(result).toContain("export * from './users'")
      expect(result).toContain("export * from './posts'")
    })
  })
})
