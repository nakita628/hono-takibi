import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export async function postValidate(
  args: {
    json: {
      notSpecificValue?: unknown
      notString?: unknown
      notNumber?: unknown
      notNull?: unknown
      notArray?: unknown
      notObject?: unknown
      notInList?: unknown
      notBoolean?: unknown
      notInteger?: unknown
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.validate.$post(args, options)
}
