import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { client } from './client'

export async function getApiReverseGeocodeIndex(
  args: InferRequestType<typeof client.api.reverseGeocode.index.$get>,
  options?: ClientRequestOptions,
) {
  return await client.api.reverseGeocode.index.$get(args, options)
}

export async function postApiV2PublicBookingAccountRegisterOauthIndex(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.oauth.index.$post>,
  options?: ClientRequestOptions,
) {
  return await client.api.v2.public.booking.account.register.oauth.index.$post(args, options)
}

export async function postApiV2PublicBookingAccountRegisterEmail(
  args: InferRequestType<typeof client.api.v2.public.booking.account.register.email.$post>,
  options?: ClientRequestOptions,
) {
  return await client.api.v2.public.booking.account.register.email.$post(args, options)
}
