import { testClient } from 'hono/testing'

import { app } from './query-method-app'

export const client = testClient(app)
