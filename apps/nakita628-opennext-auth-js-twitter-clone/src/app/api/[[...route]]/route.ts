import { handle } from 'hono/vercel'
import app from '@/backend'

export const GET = handle(app)
