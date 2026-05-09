import { testClient } from 'hono/testing'
import { app, type AppType } from './server'

export const client = testClient(app) as ReturnType<typeof testClient<AppType>>
