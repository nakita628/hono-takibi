import { getCloudflareContext } from '@opennextjs/cloudflare'
import { drizzle } from 'drizzle-orm/d1'
import { Context, Effect, Layer } from 'effect'
import * as schema from '@/db/schema'

export const getDb = () => {
  const { env } = getCloudflareContext()
  return drizzle(env.DB, { schema })
}

const dbEffect = Effect.sync(() => getDb())

export class DB extends Context.Tag('DB')<DB, Effect.Effect.Success<typeof dbEffect>>() {}

export const DBLive = Layer.effect(
  DB,
  Effect.gen(function* () {
    return yield* dbEffect
  }),
)
