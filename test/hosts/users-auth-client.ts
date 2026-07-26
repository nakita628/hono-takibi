import { testClient } from 'hono/testing'

import { app } from './users-app'

export const authClient = testClient(app)
