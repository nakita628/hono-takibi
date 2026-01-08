import { client } from '../clients/not-schema'

/**
 * POST /validate
 */
export async function postValidate(body: {
  notSpecificValue?: unknown
  notString?: unknown
  notNumber?: unknown
  notNull?: unknown
  notArray?: unknown
  notObject?: unknown
  notInList?: unknown
  notBoolean?: unknown
  notInteger?: unknown
}) {
  return await client.validate.$post({ json: body })
}
