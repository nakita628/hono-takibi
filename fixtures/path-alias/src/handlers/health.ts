import { getHealthRoute } from '@/routes'
import app from '@'

export const healthHandler = app.openapi(getHealthRoute, (c) => {
  return c.json({ status: 'ok' }, 200)
})
