import app from '@'
import { getHealthRoute } from '@/routes'

export const healthHandler = app.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
