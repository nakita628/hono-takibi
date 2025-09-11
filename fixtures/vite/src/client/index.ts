import { hc } from 'hono/client'
import type { AddType } from '../index'

export const client = hc<AddType>('/')
