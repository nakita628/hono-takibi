import { hc } from 'hono/client'
import routes from '../types'

type Client = ReturnType<typeof hc<typeof routes>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof routes>(...args)

export const client = hcWithType('/')
