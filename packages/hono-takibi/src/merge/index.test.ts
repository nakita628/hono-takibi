import { describe, expect, it } from 'vitest'
import { mergeAppFile, mergeBarrelFile, mergeHandlerFile, mergeTestFile } from './index.js'

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
      expect(result).toBe(existing)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}
`)
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
      expect(result).toBe(existing)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}
`)
    })

    it('returns identical code when no changes', () => {
      const code = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(code, code)
      expect(result).toBe(code)
    })

    it('handles first generation (existing is same as generated)', () => {
      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(generated, generated)
      expect(result).toBe(generated)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`)
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
      expect(result).toBe(existing)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

// Get user by ID
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`)
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
      expect(result).toBe(existing)
    })

    it('deduplicates route imports when path-alias changes', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '../routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '@/routes/routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '@/routes/routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`)
    })

    it('deduplicates route imports across multiple path-alias re-runs', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '../routes'
import type { getHealthRoute } from '@/routes/routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '@/api/routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getHealthRoute } from '@/api/routes'

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> = async (c) => {}
`)
    })

    it('preserves existing inline handler implementation (routeHandler: false pattern)', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  const data = await db.getHealth()
  return c.json(data, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  const data = await db.getHealth()
  return c.json(data, 200)
})
`
      expect(result).toBe(expected)
    })

    it('adds new inline handler from generated code', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUsersRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})

export const usersHandler = app
.openapi(getUsersRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUsersRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  return c.json({ status: 'ok' }, 200)
})

export const usersHandler = app
.openapi(getUsersRoute, (c) => {})
`
      expect(result).toBe(expected)
    })

    it('removes deleted inline handler from existing code', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUsersRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  return c.json({ status: 'ok' }, 200)
})

export const usersHandler = app
.openapi(getUsersRoute, async (c) => {
  return c.json([], 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, async (c) => {
  return c.json({ status: 'ok' }, 200)
})
`
      expect(result).toBe(expected)
    })

    it('removes deleted .openapi() call from inline handler chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`
      expect(result).toBe(expected)
    })

    it('adds new .openapi() call to existing inline handler chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
.openapi(getHealthTestRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {})
`
      expect(result).toBe(expected)
    })

    it('removes and adds .openapi() calls simultaneously', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {
  return c.json({ message: 'test' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, postHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
.openapi(postHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, postHealthRoute } from '../routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(postHealthRoute, (c) => {})
`
      expect(result).toBe(expected)
    })

    it('removes deleted .openapi() call with pathAlias', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '@/src/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@/src/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@/src/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`
      expect(result).toBe(expected)
    })

    it('adds new .openapi() call with monorepo import', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
.openapi(getHealthTestRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {})
`
      expect(result).toBe(expected)
    })

    it('removes deleted .openapi() call with monorepo import', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getHealthTestRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
.openapi(getHealthTestRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from '@packages/api/routes'

const app = new OpenAPIHono()

export const healthHandler = app
.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
`
      expect(result).toBe(expected)
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

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'

const app = new OpenAPIHono()

// Middleware
app.use('*', logger())
app.use('*', cors())

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`)
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

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`)
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

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

// Register all API routes
export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`)
    })

    it('recovers full app code when existing file has only imports', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(generated)
    })

    it('handles first generation (no changes)', () => {
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const result = mergeAppFile(generated, generated)
      expect(result).toBe(generated)
    })

    it('preserves user chain prefix (.basePath) with .openapi() pattern', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api').openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api').openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`
      expect(result).toBe(expected)
    })

    it('preserves user chain prefix (.basePath) with .route() pattern', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { honoHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api').route('/', honoHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { honoHandler, honoXHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.route('/', honoHandler).route('/', honoXHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { honoHandler, honoXHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api').route('/', honoHandler).route('/', honoXHandler)

export default app
`
      expect(result).toBe(expected)
    })

    it('does not inject prefix when existing has no chain prefix', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`
      expect(result).toBe(expected)
    })
  })

  describe('mergeTestFile', () => {
    it('preserves user mocks and custom tests', () => {
      const existing = `import { describe, it, expect, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

vi.mock('../db', () => ({
  findAll: () => [{ id: 1, name: 'Test' }]
}))

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toHaveLength(1)
    })
  })
  describe('edge cases', () => {
    it('returns empty array when no users', async () => {
      const res = await app.request('/users?empty=true')
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it, vi } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

vi.mock('../db', () => ({
  findAll: () => [{ id: 1, name: 'Test' }]
}))

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
      const body = await res.json()
      expect(body).toHaveLength(1)
    })
  })
  describe('edge cases', () => {
    it('returns empty array when no users', async () => {
      const res = await app.request('/users?empty=true')
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('adds new route test stubs', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /users', () => {
    it('Create user', async () => {
      const body = { name: faker.person.firstName() }
      const res = await app.request('/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })

  describe('POST /users', () => {
    it('Create user', async () => {
      const body = { name: faker.person.firstName() }
      const res = await app.request('/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`)
    })

    it('does not duplicate existing route tests', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /users', () => {
    it('Create user', async () => {
      const res = await app.request('/users', { method: 'POST' })
      expect(res.status).toBe(201)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /users', () => {
    it('Create user', async () => {
      const res = await app.request('/users', { method: 'POST' })
      expect(res.status).toBe(201)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      // Should not duplicate
      const getCount = (result.match(/describe\(\s*['"]GET \/users['"]/g) || []).length
      expect(getCount).toBe(1)
      const postCount = (result.match(/describe\(\s*['"]POST \/users['"]/g) || []).length
      expect(postCount).toBe(1)
    })

    it('handles first generation (no changes)', () => {
      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(generated, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('removes describe blocks for deleted routes', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('DELETE /users/:id', () => {
    it('Delete user', async () => {
      const res = await app.request('/users/1', { method: 'DELETE' })
      expect(res.status).toBe(204)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  \n})
`)
    })

    it('removes stale routes while adding new routes', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('DELETE /users/:id', () => {
    it('Delete user', async () => {
      const res = await app.request('/users/1', { method: 'DELETE' })
      expect(res.status).toBe(204)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /users', () => {
    it('Create user', async () => {
      const res = await app.request('/users', { method: 'POST' })
      expect(res.status).toBe(201)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  \n
  describe('POST /users', () => {
    it('Create user', async () => {
      const res = await app.request('/users', { method: 'POST' })
      expect(res.status).toBe(201)
    })
  })
})
`)
    })

    it('preserves user mocks when removing stale routes', () => {
      const existing = `import { describe, it, expect, vi } from 'vitest'
import app from '..'

vi.mock('../db', () => ({
  findAll: () => [{ id: 1, name: 'Test' }]
}))

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('DELETE /users/:id', () => {
    it('Delete user', async () => {
      const res = await app.request('/users/1', { method: 'DELETE' })
      expect(res.status).toBe(204)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it, vi } from 'vitest'
import app from '..'

vi.mock('../db', () => ({
  findAll: () => [{ id: 1, name: 'Test' }]
}))

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  \n})
`)
    })

    it('merges imports from both files', () => {
      const existing = `import { describe, it, expect, vi } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('test', async () => {})
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('test', async () => {})
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it, vi } from 'vitest'
import app from '..'
import { faker } from '@faker-js/faker'

describe('Users', () => {
  describe('GET /users', () => {
    it('test', async () => {})
  })
})
`)
    })

    it('deduplicates default imports when path-alias changes', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '@/api'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '@/api'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('deduplicates default imports across multiple path-alias re-runs', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '@/routes'
import app from '@/api'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '@/api'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '@/api'

describe('Health', () => {
  describe('GET /health', () => {
    it('should return 200', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('adds missing mock functions from generated code', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

function mockRegisterRequest() {
  return {
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'
import { faker } from '@faker-js/faker'

function mockRegisterRequest() {
  return {
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('preserves existing mock functions when present in both', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

function mockRegisterRequest() {
  return {
    username: 'custom-user',
    password: 'custom-pass',
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

function mockRegisterRequest() {
  return {
    username: faker.internet.username(),
    password: faker.internet.password(),
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

function mockRegisterRequest() {
  return {
    username: 'custom-user',
    password: 'custom-pass',
  }
}

describe('Register', () => {
  describe('POST /register', () => {
    it('Register user', async () => {
      const body = mockRegisterRequest()
      const res = await app.request('/register', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })
  })

  describe('mergeTestFile (additional patterns)', () => {
    it('handles empty existing code', () => {
      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile('', generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
`)
    })

    it('handles test file with no describe blocks', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

const helper = () => 'test'
`

      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Health', () => {
  describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

const helper = () => 'test'


describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
`)
    })

    it('handles route path with parameters', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users/:id', () => {
    it('Get user by ID', async () => {
      const res = await app.request('/users/123', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users/:id', () => {
    it('Get user by ID', async () => {
      const res = await app.request('/users/1', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('PUT /users/:id', () => {
    it('Update user', async () => {
      const res = await app.request('/users/1', { method: 'PUT' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users/:id', () => {
    it('Get user by ID', async () => {
      const res = await app.request('/users/123', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })

  describe('PUT /users/:id', () => {
    it('Update user', async () => {
      const res = await app.request('/users/1', { method: 'PUT' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('handles multiple mock functions', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

function mockUserRequest() {
  return { name: 'custom' }
}

describe('Users', () => {
  describe('POST /users', () => {
    it('Create user', async () => {
      const body = mockUserRequest()
      const res = await app.request('/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`

      const generated = `import { describe, it, expect } from 'vitest'
import { faker } from '@faker-js/faker'
import app from '..'

function mockUserRequest() {
  return { name: faker.person.firstName() }
}

function mockCommentRequest() {
  return { text: faker.lorem.sentence() }
}

describe('Users', () => {
  describe('POST /users', () => {
    it('Create user', async () => {
      const body = mockUserRequest()
      const res = await app.request('/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
  describe('POST /comments', () => {
    it('Create comment', async () => {
      const body = mockCommentRequest()
      const res = await app.request('/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'
import { faker } from '@faker-js/faker'

function mockUserRequest() {
  return { name: 'custom' }
}

function mockCommentRequest() {
  return { text: faker.lorem.sentence() }
}

describe('Users', () => {
  describe('POST /users', () => {
    it('Create user', async () => {
      const body = mockUserRequest()
      const res = await app.request('/users', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })

  describe('POST /comments', () => {
    it('Create comment', async () => {
      const body = mockCommentRequest()
      const res = await app.request('/comments', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`)
    })

    it('handles empty generated code', () => {
      const existing = `import { describe, it, expect } from 'vitest'
import app from '..'

describe('Users', () => {
  describe('GET /users', () => {
    it('test', async () => {})
  })
})
`

      const result = mergeTestFile(existing, '')
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

describe('Users', () => {
  \n})
`)
    })
  })

  describe('mergeHandlerFile (additional patterns)', () => {
    it('handles empty existing code', () => {
      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile('', generated)
      expect(result).toBe(generated)
    })

    it('handles file with only imports and no handlers', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { db } from '../db'
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { db } from '../db'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`)
    })

    it('handles mixed RouteHandler and inline Handler patterns', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { postUserRoute } from '../routes'
import app from '..'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const usersHandler = app
.openapi(postUserRoute, async (c) => {
  return c.json({ created: true }, 201)
})
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { postUserRoute } from '../routes'
import app from '..'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}

export const usersHandler = app
.openapi(postUserRoute, (c) => {})
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
import { postUserRoute } from '../routes'
import app from '..'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const usersHandler = app
.openapi(postUserRoute, async (c) => {
  return c.json({ created: true }, 201)
})
`)
    })

    it('handles multiple handlers being deleted at once', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, deleteUserRoute, patchUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  return new Response(null, { status: 204 })
}

export const patchUserRouteHandler: RouteHandler<typeof patchUserRoute> = async (c) => {
  return c.json({ patched: true }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`)
    })

    it('handles multiple new handlers being added at once', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute, deleteUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { deleteUserRoute, getUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {}
`)
    })
  })

  describe('mergeAppFile (additional patterns)', () => {
    it('handles empty existing code', () => {
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const result = mergeAppFile('', generated)
      expect(result).toBe(generated)
    })

    it('preserves user type exports after api declaration', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export type AppType = typeof api

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api

export default app
`)
    })

    it('preserves chained basePath with nested method calls', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes'
import { getHealthRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api/v1').openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute, getUserRoute } from './routes'
import { getHealthRouteHandler, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.basePath('/api/v1').openapi(getHealthRoute, getHealthRouteHandler).openapi(getUserRoute, getUserRouteHandler)

export default app
`)
    })
  })

  describe('mergeImports edge cases', () => {
    it('handles namespace imports', () => {
      const existing = `import * as routes from './routes'
import type { RouteHandler } from '@hono/zod-openapi'

export const getUserRouteHandler: RouteHandler<typeof routes.getUserRoute> = async (c) => {}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from './routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import * as routes, { getUserRoute } from './routes'
import type { RouteHandler } from '@hono/zod-openapi'

export const getUserRouteHandler: RouteHandler<typeof routes.getUserRoute> = async (c) => {}
`)
    })

    it('handles type-only imports merging with value imports', () => {
      const existing = `import type { OpenAPIHono } from '@hono/zod-openapi'
import type { getHealthRoute } from './routes'

export const getHealthRouteHandler = async (c: any) => {}
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import type { getHealthRoute } from './routes'

export const getHealthRouteHandler = async (c: any) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import type { getHealthRoute } from './routes'

export const getHealthRouteHandler = async (c: any) => {}
`)
    })

    it('preserves type-only imports when both are type-only', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toContain("import type { RouteHandler } from '@hono/zod-openapi'")
      expect(result).toContain("import type { getUserRoute } from '../index'")
    })

    it('sorts named imports alphabetically', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, deleteUserRoute, postUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      const importLine = result.split('\n').find((line: string) => line.includes("from '../index'"))
      expect(importLine).toBeDefined()
      // Named imports should be alphabetically sorted
      const names = importLine?.match(/\{([^}]+)\}/)?.[1]
      expect(names).toBeDefined()
      const importNames = names?.split(',').map((n: string) => n.trim().replace(/^type\s+/, ''))
      const sorted = [...importNames].sort()
      expect(importNames).toStrictEqual(sorted)
    })
  })

  describe('mergeBarrelFile', () => {
    it('syncs with generated (removes deleted handler exports)', () => {
      const existing = `export * from './users'
export * from './pets'
`

      const generated = `export * from './users'
`

      const result = mergeBarrelFile(existing, generated)
      expect(result).toBe(`export * from './users'
`)
    })

    it('adds new exports from generated', () => {
      const existing = `export * from './users'
`

      const generated = `export * from './users'
export * from './comments'
`

      const result = mergeBarrelFile(existing, generated)
      expect(result).toBe(generated)
    })

    it('handles first generation', () => {
      const generated = `export * from './users'
export * from './posts'
`

      const result = mergeBarrelFile(generated, generated)
      expect(result).toBe(generated)
    })
  })
})
