// Verifies the basePath config option (cases/basepath): generated route paths omit
// the prefix, the generated mock app mounts it, so requests resolve only under /api/v1.
import { describe, expect, it } from 'vite-plus/test'

import app from '../__generated__/basepath/mock'

describe('basePath stays out of route paths and is mounted by the app', () => {
  it('serves routes under the configured basePath', async () => {
    const res = await app.request('/api/v3/user/login')
    expect(res.status).toBe(200)
  })

  it('does not serve routes without the basePath prefix', async () => {
    const res = await app.request('/user/login')
    expect(res.status).toBe(404)
  })
})
