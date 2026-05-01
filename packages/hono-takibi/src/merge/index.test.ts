import { describe, expect, it } from 'vite-plus/test'

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

    it('preserves basePath when generated code has multiline .openapi() chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { postChatsRoute } from './routes/postChats'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app.basePath('/api').openapi(getHealthRoute, getHealthRouteHandler).openapi(postChatsRoute, postChatsRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { postChatsRoute } from './routes/postChats'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postChatsRoute, postChatsRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { postChatsRoute } from './routes/postChats'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app.basePath('/api')
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postChatsRoute, postChatsRouteHandler)

export default app
`
      expect(result).toBe(expected)
    })

    it('preserves basePath when existing code has multiline format', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { postChatsRoute } from './routes/postChats'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app
  .basePath('/api')
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postChatsRoute, postChatsRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { getHealthRouteHandler } from './handlers/getHealth'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { getHealthRouteHandler } from './handlers/getHealth'

const app = new OpenAPIHono()

export const api = app.basePath('/api').openapi(getHealthRoute, getHealthRouteHandler)

export default app
`
      expect(result).toBe(expected)
    })

    it('does not inject prefix when existing code has no basePath and generated is multiline', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { getHealthRouteHandler } from './handlers/getHealth'

const app = new OpenAPIHono()

export const api = app.openapi(getHealthRoute, getHealthRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { postChatsRoute } from './routes/postChats'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postChatsRoute, postChatsRouteHandler)

export default app
`

      const result = mergeAppFile(existing, generated)
      const expected = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getHealthRoute } from './routes/getHealth'
import { getHealthRouteHandler } from './handlers/getHealth'
import { postChatsRoute } from './routes/postChats'
import { postChatsRouteHandler } from './handlers/postChats'

const app = new OpenAPIHono()

export const api = app
  .openapi(getHealthRoute, getHealthRouteHandler)
  .openapi(postChatsRoute, postChatsRouteHandler)

export default app
`
      expect(result).toBe(expected)
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
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`)
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
      expect(importNames).toBeDefined()
      const sorted = [...(importNames ?? [])].sort()
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

  describe('mergeHandlerFile additional cases', () => {
    it('handles empty existing code', () => {
      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile('', generated)
      expect(result).toBe(generated)
    })

    it('handles empty generated code (all handlers removed)', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`

      const result = mergeHandlerFile(existing, '')
      // All RouteHandler names are auto-generated, so with empty generated code they are all removed
      expect(result).toBe('\n')
    })

    it('handles file with only imports and no handlers', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(generated)
    })

    it('handles multiple handlers being deleted at once', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute, deleteUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {
  return c.json({ created: true }, 201)
}

export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  return c.json({ deleted: true }, 200)
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

    it('preserves non-handler exports (helper functions)', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

const helperFunction = () => 'helper'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const result = helperFunction()
  return c.json({ result }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

const helperFunction = () => 'helper'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const result = helperFunction()
  return c.json({ result }, 200)
}
`)
    })
  })

  describe('mergeAppFile additional cases', () => {
    it('handles empty existing code', () => {
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const result = mergeAppFile('', generated)
      expect(result).toBe(generated)
    })

    it('preserves user type exports after api declaration', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export type AppType = typeof api
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)

export type AppType = typeof api
`)
    })
  })

  describe('mergeTestFile additional cases', () => {
    it('handles empty existing code', () => {
      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
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

    it('handles test file with only imports and no describe blocks', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
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

describe('GET /health', () => {
    it('OK', async () => {
      const res = await app.request('/health', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
`)
    })

    it('preserves user-defined helper functions outside describe blocks', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

const createAuthHeader = () => ({ Authorization: 'Bearer test-token' })

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', {
        method: 'GET',
        headers: createAuthHeader()
      })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
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

const createAuthHeader = () => ({ Authorization: 'Bearer test-token' })

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', {
        method: 'GET',
        headers: createAuthHeader()
      })
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
`)
    })

    it('handles route paths with parameters in describe blocks', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
  describe('GET /users/:id', () => {
    it('Get user by ID', async () => {
      const res = await app.request('/users/1', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
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

describe('API', () => {
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
`)
    })
  })

  describe('mergeImports additional edge cases', () => {
    it('handles individual type imports (import { type X, Y })', () => {
      const existing = `import { type RouteHandler, OpenAPIHono } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const generated = `import { type RouteHandler, OpenAPIHono } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`)
    })

    it('handles default import merging', () => {
      const existing = `import app from './app'
import type { getUserRoute } from '../index'

export const getUserRouteHandler = async (c: any) => {}
`

      const generated = `import app from './app'
import type { getUserRoute } from '../index'

export const getUserRouteHandler = async (c: any) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import app from './app'
import type { getUserRoute } from '../index'

export const getUserRouteHandler = async (c: any) => {}
`)
    })

    it('removes auto-generated import when route is deleted but keeps user imports from same module', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../routes'
import { db } from '../db'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json(await db.getUsers(), 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {
  return c.json({ ok: true }, 201)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../routes'
import { db } from '../db'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json(await db.getUsers(), 200)
}
`)
    })
  })

  describe('edge cases: both empty strings', () => {
    it('mergeHandlerFile returns newline for both empty', () => {
      expect(mergeHandlerFile('', '')).toBe('\n')
    })

    it('mergeAppFile returns newline for both empty', () => {
      expect(mergeAppFile('', '')).toBe('\n')
    })

    it('mergeTestFile returns newline for both empty', () => {
      expect(mergeTestFile('', '')).toBe('\n')
    })

    it('mergeBarrelFile returns empty string for both empty', () => {
      expect(mergeBarrelFile('', '')).toBe('')
    })
  })

  describe('mergeAppFile: export default and middleware', () => {
    it('preserves export default app when routes are updated', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)

export default app
`)
    })

    it('preserves middleware and export default when adding routes', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.use('*', cors())
app.use('*', logger())

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { cors } from 'hono/cors'
import { logger } from 'hono/logger'
import { getUserRoute, postUserRoute } from './routes'
import { getUserRouteHandler, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.use('*', cors())
app.use('*', logger())

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)

export default app
`)
    })

    it('preserves existing body when no api statement exists', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

export default app
`

      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)
`

      const result = mergeAppFile(existing, generated)
      expect(result).toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export default app
`)
    })
  })

  describe('mergeHandlerFile: comments and whitespace', () => {
    it('removes comments attached to deleted handler while preserving other comments', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute } from '../index'

// Get user by ID
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}

// Create new user
export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {
  return c.json({ created: true }, 201)
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

    it('collapses triple newlines after multiple handler deletions', () => {
      const existing = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute, postUserRoute, deleteUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}


export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (c) => {
  return c.json({ ok: true }, 201)
}


export const deleteUserRouteHandler: RouteHandler<typeof deleteUserRoute> = async (c) => {
  return c.json({ deleted: true }, 200)
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
  })

  describe('mergeTestFile: describe block patterns', () => {
    it('preserves non-route describe blocks (e.g., helpers)', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('helpers', () => {
  it('formats date correctly', () => {
    expect(formatDate(new Date())).toBeDefined()
  })
})

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
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

describe('helpers', () => {
  it('formats date correctly', () => {
    expect(formatDate(new Date())).toBeDefined()
  })
})

describe('API', () => {
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
`)
    })

    it('handles double quotes in describe block labels', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
  describe("GET /users", () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
  describe("GET /users", () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe("POST /users", () => {
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

describe('API', () => {
  describe("GET /users", () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })

  describe("POST /users", () => {
    it('Create user', async () => {
      const res = await app.request('/users', { method: 'POST' })
      expect(res.status).toBe(201)
    })
  })
})
`)
    })

    it('adds mock functions and new routes simultaneously', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

function mockCreateUser() {
  return { name: 'test', email: 'test@example.com' }
}

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('POST /users', () => {
    it('Create user', async () => {
      const body = mockCreateUser()
      const res = await app.request('/users', { method: 'POST', body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(`import { describe, expect, it } from 'vitest'
import app from '..'

function mockCreateUser() {
  return { name: 'test', email: 'test@example.com' }
}

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })

  describe('POST /users', () => {
    it('Create user', async () => {
      const body = mockCreateUser()
      const res = await app.request('/users', { method: 'POST', body: JSON.stringify(body) })
      expect(res.status).toBe(201)
    })
  })
})
`)
    })

    it('preserves non-route describe when removing stale routes', () => {
      const existing = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('helpers', () => {
  it('works', () => {
    expect(true).toBe(true)
  })
})

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
  describe('DELETE /users', () => {
    it('Delete user', async () => {
      const res = await app.request('/users/1', { method: 'DELETE' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const generated = `import { describe, expect, it } from 'vitest'
import app from '..'

describe('API', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`

      const result = mergeTestFile(existing, generated)
      expect(result).toBe(
        "import { describe, expect, it } from 'vitest'\nimport app from '..'\n\ndescribe('helpers', () => {\n  it('works', () => {\n    expect(true).toBe(true)\n  })\n})\n\ndescribe('API', () => {\n  describe('GET /users', () => {\n    it('List users', async () => {\n      const res = await app.request('/users', { method: 'GET' })\n      expect(res.status).toBe(200)\n    })\n  })\n  \n})\n",
      )
    })
  })

  describe('mergeImports: combined import patterns', () => {
    it('preserves combined default + named imports from user code', () => {
      const existing = `import app, { type AppType } from '../app'
import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`

      const generated = `import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {}
`

      const result = mergeHandlerFile(existing, generated)
      expect(result).toBe(`import app, { type AppType } from '../app'
import type { RouteHandler } from '@hono/zod-openapi'
import type { getUserRoute } from '../index'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1 }, 200)
}
`)
    })
  })

  describe('mergeTestFile: test framework switching', () => {
    it('switches from vitest to bun:test', () => {
      const existing = `import { describe, it, expect } from 'vitest'
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

      const generated = `import { describe, it, expect } from 'bun:test'
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
      expect(result).toBe(`import app from '..'
import { describe, expect, it } from 'bun:test'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('switches from vitest to vite-plus/test', () => {
      const existing = `import { describe, it, expect } from 'vitest'
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

      const generated = `import { describe, it, expect } from 'vite-plus/test'
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
      expect(result).toBe(`import app from '..'
import { describe, expect, it } from 'vite-plus/test'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })

    it('switches from bun:test to vitest', () => {
      const existing = `import { describe, it, expect } from 'bun:test'
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
      expect(result).toBe(`import app from '..'
import { describe, expect, it } from 'vitest'

describe('Users', () => {
  describe('GET /users', () => {
    it('List users', async () => {
      const res = await app.request('/users', { method: 'GET' })
      expect(res.status).toBe(200)
    })
  })
})
`)
    })
  })

  describe('realistic human-edit scenarios', () => {
    it('mergeHandlerFile preserves user try/catch and external imports', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import db from './db'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  try {
    const user = await db.user.find(c.req.param('id'))
    return c.json(user, 200)
  } catch (e) {
    return c.json({ error: 'Internal' }, 500)
  }
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import db from './db'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  try {
    const user = await db.user.find(c.req.param('id'))
    return c.json(user, 200)
  } catch (e) {
    return c.json({ error: 'Internal' }, 500)
  }
}
`)
    })

    it('mergeHandlerFile preserves user JSDoc on handler', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'

/**
 * Returns user by ID.
 * @throws 404 if user not found
 */
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1, name: 'Alice' }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'

/**
 * Returns user by ID.
 * @throws 404 if user not found
 */
export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  return c.json({ id: 1, name: 'Alice' }, 200)
}
`)
    })

    it('mergeHandlerFile preserves user-defined helper exports alongside handlers', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const ADMIN_TOKEN = 'admin-secret'

export function isAdmin(token: string) {
  return token === ADMIN_TOKEN
}

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  return c.json({ admin: isAdmin(c.req.header('Authorization') ?? '') }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}

export const bRouteHandler: RouteHandler<typeof bRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

export const ADMIN_TOKEN = 'admin-secret'

export function isAdmin(token: string) {
  return token === ADMIN_TOKEN
}

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  return c.json({ admin: isAdmin(c.req.header('Authorization') ?? '') }, 200)
}

export const bRouteHandler: RouteHandler<typeof bRoute> = async (_c) => {
  throw new Error('Not implemented')
}
`)
    })

    it('mergeHandlerFile preserves user satisfies operator and type imports', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import type { User } from './types'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const user = { id: 1, name: 'Alice' } satisfies User
  return c.json(user, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import type { User } from './types'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const user = { id: 1, name: 'Alice' } satisfies User
  return c.json(user, 200)
}
`)
    })

    it('mergeHandlerFile preserves user middleware/utility imports', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute } from './routes'
import { authenticate } from './middleware/auth'
import { sanitize } from '../utils/sanitize'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const user = await authenticate(c)
  return c.json(sanitize(user), 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { getUserRoute, postUserRoute } from './routes'
import { authenticate } from './middleware/auth'
import { sanitize } from '../utils/sanitize'

export const getUserRouteHandler: RouteHandler<typeof getUserRoute> = async (c) => {
  const user = await authenticate(c)
  return c.json(sanitize(user), 200)
}

export const postUserRouteHandler: RouteHandler<typeof postUserRoute> = async (_c) => {
  throw new Error('Not implemented')
}
`)
    })

    it('mergeHandlerFile reorders inline .openapi() chain to generated order while preserving user impl', () => {
      const existing = `import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { getRouteA, getRouteB, getRouteC } from './routes'

export const allHandler = new OpenAPIHono()
  .openapi(getRouteC, async (c) => c.json({ c: 'c' }, 200))
  .openapi(getRouteA, async (c) => c.json({ a: 'a' }, 200))
  .openapi(getRouteB, async (c) => c.json({ b: 'b' }, 200))`
      const generated = `import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { getRouteA, getRouteB, getRouteC } from './routes'

export const allHandler = new OpenAPIHono()
  .openapi(getRouteA, async (_c) => { throw new Error('Not implemented') })
  .openapi(getRouteB, async (_c) => { throw new Error('Not implemented') })
  .openapi(getRouteC, async (_c) => { throw new Error('Not implemented') })`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { getRouteA, getRouteB, getRouteC } from './routes'

export const allHandler = new OpenAPIHono()
.openapi(getRouteA, async (c) => c.json({ a: 'a' }, 200))
.openapi(getRouteB, async (c) => c.json({ b: 'b' }, 200))
.openapi(getRouteC, async (c) => c.json({ c: 'c' }, 200))
`)
    })

    it('mergeHandlerFile preserves user closure variables outside inline handler chain', () => {
      const existing = `import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

const cache = new Map<string, unknown>()

export const allHandler = new OpenAPIHono()
  .openapi(aRoute, async (c) => {
    const cached = cache.get('a')
    if (cached) return c.json(cached, 200)
    const data = { value: 'a' }
    cache.set('a', data)
    return c.json(data, 200)
  })
  .openapi(bRoute, async (c) => c.json({ b: 'b' }, 200))`
      const generated = `import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

export const allHandler = new OpenAPIHono()
  .openapi(aRoute, async (_c) => { throw new Error('Not implemented') })
  .openapi(bRoute, async (_c) => { throw new Error('Not implemented') })`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { OpenAPIHono, type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

const cache = new Map<string, unknown>()

export const allHandler = new OpenAPIHono()
.openapi(aRoute, async (c) => {
    const cached = cache.get('a')
    if (cached) return c.json(cached, 200)
    const data = { value: 'a' }
    cache.set('a', data)
    return c.json(data, 200)
  })
.openapi(bRoute, async (c) => c.json({ b: 'b' }, 200))
`)
    })

    it('mergeAppFile preserves user .use() middleware between app declaration and api chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { getUserRoute, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.use('*', logger())
app.use('/api/*', cors())

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { cors } from 'hono/cors'
import { getUserRoute, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.use('*', logger())
app.use('/api/*', cors())

export const api = app.openapi(getUserRoute, getUserRouteHandler)

export default app
`)
    })

    it('mergeAppFile preserves user .notFound() and .onError() registered after api chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, getUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler)

app.notFound((c) => c.json({ error: 'Not found' }, 404))
app.onError((err, c) => c.json({ error: err.message }, 500))

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, getUserRouteHandler, postUserRoute, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { getUserRoute, getUserRouteHandler, postUserRoute, postUserRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(getUserRoute, getUserRouteHandler).openapi(postUserRoute, postUserRouteHandler)

app.notFound((c) => c.json({ error: 'Not found' }, 404))
app.onError((err, c) => c.json({ error: err.message }, 500))

export default app
`)
    })

    it('mergeTestFile preserves user beforeEach hook and authentication setup', () => {
      const existing = `import { describe, it, expect, beforeEach } from 'vite-plus/test'
import app from '..'

let token: string
beforeEach(async () => {
  const res = await app.request('/auth/login', { method: 'POST' })
  token = (await res.json()).token
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users', {
      headers: { Authorization: \`Bearer \${token}\` },
    })
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users', { method: 'GET' })
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { beforeEach, describe, expect, it } from 'vite-plus/test'
import app from '..'

let token: string
beforeEach(async () => {
  const res = await app.request('/auth/login', { method: 'POST' })
  token = (await res.json()).token
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users', {
      headers: { Authorization: \`Bearer \${token}\` },
    })
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeTestFile preserves user it.skip and it.only modifiers', () => {
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it.skip('List users (skipped pending fix)', async () => {
    const res = await app.request('/users', { method: 'GET' })
    expect(res.status).toBe(200)
  })
  it.only('Get user by ID (debugging)', async () => {
    const res = await app.request('/users/1', { method: 'GET' })
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users', { method: 'GET' })
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it.skip('List users (skipped pending fix)', async () => {
    const res = await app.request('/users', { method: 'GET' })
    expect(res.status).toBe(200)
  })
  it.only('Get user by ID (debugging)', async () => {
    const res = await app.request('/users/1', { method: 'GET' })
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeBarrelFile drops existing user comments (generated is source of truth)', () => {
      // Documented behavior: barrel file is fully replaced by generated content.
      // User comments outside generated exports are not preserved.
      const existing = `// Custom user comment about the barrel
export * from './user'
export * from './post'`
      const generated = `export * from './user'
export * from './comment'`
      expect(mergeBarrelFile(existing, generated)).toBe(`export * from './user'
export * from './comment'`)
    })

    it('mergeAppFile ignores user comments between app and .openapi() (no chain prefix injection)', () => {
      // Regression: previously `extractChainPrefix` returned the comment text after trim(),
      // producing invalid `app// Public routes.openapi(...)` after injection.
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aHandler, bRoute, bHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app
  // Public routes
  .openapi(aRoute, aHandler)
  // Admin routes
  .openapi(bRoute, bHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aHandler, bRoute, bHandler, cRoute, cHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aHandler).openapi(bRoute, bHandler).openapi(cRoute, cHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { aHandler, aRoute, bHandler, bRoute, cHandler, cRoute } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aHandler).openapi(bRoute, bHandler).openapi(cRoute, cHandler)

export default app
`)
    })

    it('mergeAppFile appends generated api + export default when existing has middleware but no api/default', () => {
      // Regression: previously the body was returned as-is, leaving the file without an api
      // export and without `export default app` — invalid as the application entrypoint.
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'

const app = new OpenAPIHono()
app.use('*', logger())`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { aHandler, aRoute } from './handlers'

const app = new OpenAPIHono()
app.use('*', logger())

export const api = app.openapi(aRoute, aHandler)

export default app
`)
    })

    it('mergeTestFile appends new route describe at end when no outer wrapper exists', () => {
      // Regression: previously the new POST /users describe was nested inside the GET /users
      // describe because `findLastIndex` matched the `})` closing GET /users.
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users', { method: 'GET' })
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

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
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

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
`)
    })

    it('mergeHandlerFile preserves user re-exports from another module', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export { logger } from './utils'
export type { LogLevel } from './types'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  return c.json({ ok: true }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export { logger } from './utils'
export type { LogLevel } from './types'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  return c.json({ ok: true }, 200)
}
`)
    })

    it('mergeHandlerFile preserves higher-order function wrapping a handler', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

const withAuth = <R>(h: RouteHandler<R>): RouteHandler<R> => async (c) => {
  if (!c.req.header('Authorization')) return c.json({ error: 'unauth' }, 401)
  return h(c)
}

export const aRouteHandler: RouteHandler<typeof aRoute> = withAuth(async (c) => {
  return c.json({ data: 'protected' }, 200)
})`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

const withAuth = <R>(h: RouteHandler<R>): RouteHandler<R> => async (c) => {
  if (!c.req.header('Authorization')) return c.json({ error: 'unauth' }, 401)
  return h(c)
}

export const aRouteHandler: RouteHandler<typeof aRoute> = withAuth(async (c) => {
  return c.json({ data: 'protected' }, 200)
})
`)
    })

    it('mergeHandlerFile preserves handler with destructured context parameter', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async ({ req, json }) => {
  const id = req.param('id')
  return json({ id }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async ({ req, json }) => {
  const id = req.param('id')
  return json({ id }, 200)
}
`)
    })

    it('mergeAppFile preserves user app.route() sub-app mounting', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { adminApp } from './admin'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.route('/admin', adminApp)

export const api = app.openapi(aRoute, aRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { adminApp } from './admin'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

app.route('/admin', adminApp)

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app
`)
    })

    it('mergeAppFile preserves OpenAPIHono constructor options (e.g., defaultHook)', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) return c.json({ errors: result.error.errors }, 422)
  },
})

export const api = app.openapi(aRoute, aRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) return c.json({ errors: result.error.errors }, 422)
  },
})

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app
`)
    })

    it('mergeAppFile preserves middleware registered AFTER the api chain', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler)

app.use('*', logger())

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

app.use('*', logger())

export default app
`)
    })

    it('mergeAppFile renders empty api expression when all routes are deleted', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono()
app.use('*', logger())

export const api = app.openapi(aRoute, aRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'

const app = new OpenAPIHono()

export const api = app

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { logger } from 'hono/logger'

const app = new OpenAPIHono()
app.use('*', logger())

export const api = app

export default app
`)
    })

    it('mergeTestFile preserves user beforeAll and afterAll hooks', () => {
      const existing = `import { describe, it, expect, beforeAll, afterAll } from 'vite-plus/test'
import app from '..'

let server: { close: () => void }

beforeAll(async () => {
  server = await startTestDb()
})

afterAll(() => {
  server.close()
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})

describe('POST /users', () => {
  it('Create user', async () => {
    const res = await app.request('/users', { method: 'POST' })
    expect(res.status).toBe(201)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { afterAll, beforeAll, describe, expect, it } from 'vite-plus/test'
import app from '..'

let server: { close: () => void }

beforeAll(async () => {
  server = await startTestDb()
})

afterAll(() => {
  server.close()
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})

describe('POST /users', () => {
  it('Create user', async () => {
    const res = await app.request('/users', { method: 'POST' })
    expect(res.status).toBe(201)
  })
})
`)
    })

    it('mergeTestFile recognizes describe.skip as the same route (no duplicate added)', () => {
      // Regression: previously `describe.skip(...)` was filtered out by the pattern,
      // causing regeneration to add a duplicate `describe('GET /users', ...)`.
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe.skip('GET /users', () => {
  it('List users (broken)', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

describe.skip('GET /users', () => {
  it('List users (broken)', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeTestFile preserves it.each parameterized tests', () => {
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it.each([1, 2, 3])('Returns user %i', async (id) => {
    const res = await app.request(\`/users/\${id}\`)
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it.each([1, 2, 3])('Returns user %i', async (id) => {
    const res = await app.request(\`/users/\${id}\`)
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeTestFile preserves nested non-route describes inside route describe', () => {
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  describe('when user exists', () => {
    it('returns 200', async () => {
      const res = await app.request('/users/1')
      expect(res.status).toBe(200)
    })
  })
  describe('when user not found', () => {
    it('returns 404', async () => {
      const res = await app.request('/users/999')
      expect(res.status).toBe(404)
    })
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  describe('when user exists', () => {
    it('returns 200', async () => {
      const res = await app.request('/users/1')
      expect(res.status).toBe(200)
    })
  })
  describe('when user not found', () => {
    it('returns 404', async () => {
      const res = await app.request('/users/999')
      expect(res.status).toBe(404)
    })
  })
})
`)
    })

    it('mergeTestFile preserves user mock helper referenced by another mock', () => {
      // existing wins for any same-named mock; missing mocks (mockOrder) are added.
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

function mockId() {
  return 'fixed-uuid-1234'
}

function mockUser() {
  return { id: mockId(), name: 'Alice' }
}

describe('GET /users', () => {
  it('List users', async () => {
    const u = mockUser()
    expect(u.id).toBe('fixed-uuid-1234')
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

function mockUser() {
  return { id: 'random', name: 'random' }
}

function mockOrder() {
  return { id: 'random' }
}

describe('GET /users', () => {
  it('List users', async () => {
    expect(true).toBe(true)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

function mockId() {
  return 'fixed-uuid-1234'
}

function mockUser() {
  return { id: mockId(), name: 'Alice' }
}

function mockOrder() {
  return { id: 'random' }
}

describe('GET /users', () => {
  it('List users', async () => {
    const u = mockUser()
    expect(u.id).toBe('fixed-uuid-1234')
  })
})
`)
    })

    it('mergeHandlerFile preserves multiple handlers sharing module-level state', () => {
      // closure variables (cache, requestCount) declared between handlers must be preserved
      // across regeneration that adds a new handler.
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute } from './routes'

const cache = new Map<string, unknown>()
let requestCount = 0

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  requestCount++
  return c.json({ count: requestCount, cached: cache.get('a') }, 200)
}

export const bRouteHandler: RouteHandler<typeof bRoute> = async (c) => {
  cache.set('b', Date.now())
  return c.json({ b: cache.get('b') }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute, cRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}

export const bRouteHandler: RouteHandler<typeof bRoute> = async (_c) => {
  throw new Error('Not implemented')
}

export const cRouteHandler: RouteHandler<typeof cRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute, cRoute } from './routes'

const cache = new Map<string, unknown>()
let requestCount = 0

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  requestCount++
  return c.json({ count: requestCount, cached: cache.get('a') }, 200)
}

export const bRouteHandler: RouteHandler<typeof bRoute> = async (c) => {
  cache.set('b', Date.now())
  return c.json({ b: cache.get('b') }, 200)
}

export const cRouteHandler: RouteHandler<typeof cRoute> = async (_c) => {
  throw new Error('Not implemented')
}
`)
    })

    it('mergeHandlerFile preserves handler that throws without explicit return', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  return c.json({ ok: true }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  if (!c.req.header('Authorization')) {
    throw new HTTPException(401, { message: 'Unauthorized' })
  }
  return c.json({ ok: true }, 200)
}
`)
    })

    it('mergeAppFile preserves both defaultHook constructor option AND basePath chain prefix', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) return c.json({ errors: result.error.errors }, 422)
  },
})

export const api = app.basePath('/api/v1').openapi(aRoute, aRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler, bRoute, bRouteHandler } from './handlers'

const app = new OpenAPIHono({
  defaultHook: (result, c) => {
    if (!result.success) return c.json({ errors: result.error.errors }, 422)
  },
})

export const api = app.basePath('/api/v1').openapi(aRoute, aRouteHandler).openapi(bRoute, bRouteHandler)

export default app
`)
    })

    it('mergeAppFile preserves secondary OpenAPIHono instance declared as adminApp', () => {
      const existing = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler } from './handlers'

const adminApp = new OpenAPIHono()

const app = new OpenAPIHono()

app.route('/admin', adminApp)

export const api = app.openapi(aRoute, aRouteHandler)

export default app`
      const generated = `import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler } from './handlers'

const app = new OpenAPIHono()

export const api = app.openapi(aRoute, aRouteHandler)

export default app`
      expect(mergeAppFile(existing, generated))
        .toBe(`import { OpenAPIHono } from '@hono/zod-openapi'
import { aRoute, aRouteHandler } from './handlers'

const adminApp = new OpenAPIHono()

const app = new OpenAPIHono()

app.route('/admin', adminApp)

export const api = app.openapi(aRoute, aRouteHandler)

export default app
`)
    })

    it('mergeTestFile preserves vi.mock() at top level', () => {
      const existing = `import { describe, it, expect, vi } from 'vite-plus/test'
import app from '..'
import * as db from '../db'

vi.mock('../db', () => ({
  user: { findMany: vi.fn(() => [{ id: 1 }]) },
}))

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
    expect(db.user.findMany).toHaveBeenCalled()
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})

describe('POST /users', () => {
  it('Create user', async () => {
    const res = await app.request('/users', { method: 'POST' })
    expect(res.status).toBe(201)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it, vi } from 'vite-plus/test'
import app from '..'
import * as db from '../db'

vi.mock('../db', () => ({
  user: { findMany: vi.fn(() => [{ id: 1 }]) },
}))

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
    expect(db.user.findMany).toHaveBeenCalled()
  })
})

describe('POST /users', () => {
  it('Create user', async () => {
    const res = await app.request('/users', { method: 'POST' })
    expect(res.status).toBe(201)
  })
})
`)
    })

    it('mergeTestFile preserves bare it() outside any describe block', () => {
      const existing = `import { it, expect } from 'vite-plus/test'
import app from '..'

it('app boots without error', async () => {
  const res = await app.request('/health')
  expect(res.status).toBe(200)
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

it('app boots without error', async () => {
  const res = await app.request('/health')
  expect(res.status).toBe(200)
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeTestFile treats template-literal describe titles as distinct from string-literal routes', () => {
      // Documented behavior: only string/template-without-substitution literal titles are
      // matched. A template literal with substitutions (`${VERSION} GET /users`) cannot be
      // statically resolved, so it is treated as a separate non-route block — generated
      // version is added alongside. Users wanting deduplication must use plain string.
      const existing = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

const VERSION = 'v1'

describe(\`\${VERSION} GET /users\`, () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      const generated = `import { describe, it, expect } from 'vite-plus/test'
import app from '..'

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})`
      expect(mergeTestFile(existing, generated))
        .toBe(`import { describe, expect, it } from 'vite-plus/test'
import app from '..'

const VERSION = 'v1'

describe(\`\${VERSION} GET /users\`, () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})

describe('GET /users', () => {
  it('List users', async () => {
    const res = await app.request('/users')
    expect(res.status).toBe(200)
  })
})
`)
    })

    it('mergeHandlerFile is a no-op when existing equals generated (identity)', () => {
      const code = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(code, code)).toBe(`${code}
`)
    })

    it('mergeHandlerFile mass deletion (5 → 1) preserves user impl on the surviving handler', () => {
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute, bRoute, cRoute, dRoute, eRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => c.json({ a: true }, 200)
export const bRouteHandler: RouteHandler<typeof bRoute> = async (c) => c.json({ b: true }, 200)
export const cRouteHandler: RouteHandler<typeof cRoute> = async (c) => c.json({ c: true }, 200)
export const dRouteHandler: RouteHandler<typeof dRoute> = async (c) => c.json({ d: true }, 200)
export const eRouteHandler: RouteHandler<typeof eRoute> = async (c) => c.json({ e: true }, 200)`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => c.json({ a: true }, 200)
`)
    })

    it('mergeHandlerFile loses user impl on operation rename (treated as delete + add)', () => {
      // KNOWN LIMITATION: when an OpenAPI operation is renamed (e.g., `getUsers` → `listUsers`),
      // the handler is deleted and a fresh stub is added. The user's implementation is lost
      // and must be manually copied. The merger has no way to detect renames vs delete+add.
      const existing = `import { type RouteHandler } from '@hono/zod-openapi'
import { aRoute } from './routes'

export const aRouteHandler: RouteHandler<typeof aRoute> = async (c) => {
  return c.json({ data: 'precious user logic' }, 200)
}`
      const generated = `import { type RouteHandler } from '@hono/zod-openapi'
import { renamedARoute } from './routes'

export const renamedARouteHandler: RouteHandler<typeof renamedARoute> = async (_c) => {
  throw new Error('Not implemented')
}`
      expect(mergeHandlerFile(existing, generated))
        .toBe(`import { type RouteHandler } from '@hono/zod-openapi'
import { renamedARoute } from './routes'

export const renamedARouteHandler: RouteHandler<typeof renamedARoute> = async (_c) => {
  throw new Error('Not implemented')
}
`)
    })
  })
})
