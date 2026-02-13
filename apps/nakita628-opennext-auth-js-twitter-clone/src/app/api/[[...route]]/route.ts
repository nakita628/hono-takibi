import { handle } from 'hono/vercel'
import app from '@/backend'

export const runtime = 'edge'
export const dynamic = 'force-dynamic'

export const GET = handle(app)
export const POST = handle(app)
export const PUT = handle(app)
export const PATCH = handle(app)
export const DELETE = handle(app)
