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
      // Should use the generated path (source of truth)
      expect(result).toContain("from '@/routes/routes'")
      // Should NOT keep the old path
      expect(result).not.toContain("from '../routes'")
      // Should have exactly one import of getHealthRoute
      const importCount = (result.match(/getHealthRoute/g) || []).length
      // One in import, one in RouteHandler type reference, one in variable name
      expect(importCount).toBeLessThanOrEqual(3)
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
      // Should use the latest generated path only
      expect(result).toContain("from '@/api/routes'")
      expect(result).not.toContain("from '../routes'")
      expect(result).not.toContain("from '@/routes/routes'")
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

export type AppType = typeof api

export default app
`

      const result = mergeAppFile(existing, generated)
      expect(result).toContain('const app = new OpenAPIHono()')
      expect(result).toContain(
        'export const api = app.openapi(getHealthRoute, getHealthRouteHandler)',
      )
      expect(result).toContain('export type AppType = typeof api')
      expect(result).toContain('export default app')
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
      // User mock preserved
      expect(result).toContain("vi.mock('../db'")
      // User-modified test preserved (body check)
      expect(result).toContain('expect(body).toHaveLength(1)')
      // User-added test preserved
      expect(result).toContain('edge cases')
      expect(result).toContain('returns empty array when no users')
      // vi import preserved
      expect(result).toContain('vi')
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
      // Existing test preserved
      expect(result).toContain("describe('GET /users'")
      // New test added
      expect(result).toContain("describe('POST /users'")
      expect(result).toContain('Create user')
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
      expect(result).toContain("describe('GET /health'")
      const count = (result.match(/describe\(\s*['"]GET \/health['"]/g) || []).length
      expect(count).toBe(1)
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
      expect(result).toContain("describe('GET /users'")
      expect(result).not.toContain("describe('DELETE /users/:id'")
      expect(result).not.toContain('Delete user')
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
      expect(result).toContain("describe('GET /users'")
      expect(result).toContain("describe('POST /users'")
      expect(result).not.toContain("describe('DELETE /users/:id'")
      expect(result).not.toContain('Delete user')
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
      expect(result).toContain("vi.mock('../db'")
      expect(result).toContain("describe('GET /users'")
      expect(result).not.toContain("describe('DELETE /users/:id'")
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
      // vi from existing preserved
      expect(result).toContain('vi')
      // faker from generated added
      expect(result).toContain('faker')
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
      // Should use the generated path (source of truth)
      expect(result).toContain("from '@/api'")
      // Should NOT keep the old path
      expect(result).not.toContain("from '..'")
      // Should have exactly one 'import app'
      const importAppCount = (result.match(/import app from/g) || []).length
      expect(importAppCount).toBe(1)
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
      // Should use the generated path only
      expect(result).toContain("from '@/api'")
      // Should NOT keep old paths
      expect(result).not.toContain("from '@/routes'")
      expect(result).not.toContain("from '..'")
      // Should have exactly one 'import app'
      const importAppCount = (result.match(/import app from/g) || []).length
      expect(importAppCount).toBe(1)
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
      expect(result).toContain("export * from './users'")
      expect(result).not.toContain("export * from './pets'")
    })

    it('adds new exports from generated', () => {
      const existing = `export * from './users'
`

      const generated = `export * from './users'
export * from './comments'
`

      const result = mergeBarrelFile(existing, generated)
      expect(result).toContain("export * from './users'")
      expect(result).toContain("export * from './comments'")
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
