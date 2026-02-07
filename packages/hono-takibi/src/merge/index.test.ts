import { describe, expect, it } from 'vitest'
import { mergeAppFile, mergeBarrelFile, mergeHandlerFile } from './index.js'

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

    it('removes handlers not in generated code (route deleted from OpenAPI)', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, deleteUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  await db.deleteUser(c.req.param('id'))
  return new Response(null, { status: 204 })
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('getUserRouteHandler')
      expect(result).toContain('return c.json({ id: 1 }, 200)')
      expect(result).not.toContain('deleteUserRouteHandler')
      expect(result).not.toContain('db.deleteUser')
    })

    it('removes route imports for deleted handlers', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, deleteUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  return new Response(null, { status: 204 })
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('getUserRoute')
      expect(result).not.toContain('deleteUserRoute')
    })

    it('preserves comments on existing handlers', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

// Get user by ID from database
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  // Look up user
  const user = await db.getUser(c.req.param('id'))
  return c.json(user, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('// Get user by ID from database')
      expect(result).toContain('// Look up user')
      expect(result).toContain('await db.getUser')
    })

    it('removes comments attached to deleted handlers', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, deleteUserRoute } from '../index'

// Get user by ID
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

// Delete user - dangerous operation
export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  return new Response(null, { status: 204 })
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain('// Get user by ID')
      expect(result).not.toContain('// Delete user - dangerous operation')
      expect(result).not.toContain('deleteUserRouteHandler')
    })

    it('preserves user-added imports', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { db } from '../db'

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
      expect(result).toContain("from '../db'")
      expect(result).toContain('await db.getUser')
    })
  })

  describe('mergeAppFile', () => {
    it('preserves middleware when routes change', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new OpenAPIHono()

// Middleware
app.use('*', logger())
app.use('*', cors())

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`

      const result = mergeAppFile(existing, generated)
      // Middleware preserved
      expect(result).toContain("app.use('*', logger())")
      expect(result).toContain("app.use('*', cors())")
      expect(result).toContain('// Middleware')
      // User imports preserved
      expect(result).toContain("from 'hono/logger'")
      expect(result).toContain("from 'hono/cors'")
      // Route chain updated
      expect(result).toContain('getUserRoute')
      expect(result).toContain('getUserRouteHandler')
    })

    it('updates api chain when route is deleted', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toContain('getHealthRoute')
      expect(result).not.toContain('getUserRoute')
      expect(result).not.toContain('getUserRouteHandler')
    })

    it('preserves comments in app file', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

// Register all API routes
export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toContain('// Register all API routes')
      expect(result).toContain('getUserRoute')
    })

    it('handles first generation (no changes)', () => {
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`

      const result = mergeAppFile(generated, generated)
      expect(result).toContain('getHealthRoute')
      expect(result).toContain('export default app')
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
