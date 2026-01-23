import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/twilio_api_v2010'

/**
 * GET /2010-04-01/Accounts.json
 *
 * Retrieves a collection of Accounts belonging to the account used to make the request
 *
 * Retrieves a collection of Accounts belonging to the account used to make the request
 */
export function useGet20100401AccountsJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client['2010-04-01']['Accounts.json'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts.json
 */
export function getGet20100401AccountsJsonKey(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
) {
  return ['GET', '/2010-04-01/Accounts.json', args] as const
}

/**
 * POST /2010-04-01/Accounts.json
 *
 * Create a new Twilio Subaccount from the account making the request
 *
 * Create a new Twilio Subaccount from the account making the request
 */
export function usePost20100401AccountsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>
  >(
    'POST /2010-04-01/Accounts.json',
    async (_, { arg }) =>
      parseResponse(client['2010-04-01']['Accounts.json'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{Sid}.json
 *
 * Fetch the account specified by the provided Account Sid
 *
 * Fetch the account specified by the provided Account Sid
 */
export function useGet20100401AccountsSidJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
    Error
  >(
    swrKey,
    async () => parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$get(args, clientOptions)),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{Sid}.json
 */
export function getGet20100401AccountsSidJsonKey(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
) {
  return ['GET', '/2010-04-01/Accounts/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{Sid}.json
 *
 * Modify the properties of a given Account
 *
 * Modify the properties of a given Account
 */
export function usePost20100401AccountsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
  >(
    'POST /2010-04-01/Accounts/:Sid.json',
    async (_, { arg }) =>
      parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$post(arg, options?.client)),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function useGet20100401AccountsAccountSidAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidAddressesJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function getGet20100401AccountsAccountSidAddressesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Addresses.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function usePost20100401AccountsAccountSidAddressesJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Addresses.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function useGet20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidAddressesSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function getGet20100401AccountsAccountSidAddressesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function usePost20100401AccountsAccountSidAddressesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function useDelete20100401AccountsAccountSidAddressesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Retrieve a list of applications representing an application within the requesting account
 *
 * Retrieve a list of applications representing an application within the requesting account
 */
export function useGet20100401AccountsAccountSidApplicationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidApplicationsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 */
export function getGet20100401AccountsAccountSidApplicationsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Applications.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Create a new application within your account
 *
 * Create a new application within your account
 */
export function usePost20100401AccountsAccountSidApplicationsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Applications.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Fetch the application specified by the provided sid
 *
 * Fetch the application specified by the provided sid
 */
export function useGet20100401AccountsAccountSidApplicationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidApplicationsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidApplicationsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Updates the application's properties
 *
 * Updates the application's properties
 */
export function usePost20100401AccountsAccountSidApplicationsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Delete the application by the specified application sid
 *
 * Delete the application by the specified application sid
 */
export function useDelete20100401AccountsAccountSidApplicationsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json
 *
 * Fetch an instance of an authorized-connect-app
 *
 * Fetch an instance of an authorized-connect-app
 */
export function useGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AuthorizedConnectApps[
          ':ConnectAppSid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidAuthorizedConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['AuthorizedConnectApps.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['AvailablePhoneNumbers.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[
          ':CountryCode.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Local.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'MachineToMachine.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Mobile.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'National.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'SharedCost.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'TollFree.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export function useGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Voip.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 */
export function useGet20100401AccountsAccountSidBalanceJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidBalanceJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Balance.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 */
export function getGet20100401AccountsAccountSidBalanceJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Balance.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Retrieves a collection of calls made to and from your account
 *
 * Retrieves a collection of calls made to and from your account
 */
export function useGet20100401AccountsAccountSidCallsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidCallsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 */
export function getGet20100401AccountsAccountSidCallsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Calls.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 */
export function usePost20100401AccountsAccountSidCallsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Fetch the call specified by the provided Call SID
 *
 * Fetch the call specified by the provided Call SID
 */
export function useGet20100401AccountsAccountSidCallsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidCallsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Initiates a call redirect or terminates a call
 *
 * Initiates a call redirect or terminates a call
 */
export function usePost20100401AccountsAccountSidCallsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 */
export function useDelete20100401AccountsAccountSidCallsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Calls/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 *
 * Retrieve a list of all events for a call.
 *
 * Retrieve a list of all events for a call.
 */
export function useGet20100401AccountsAccountSidCallsCallSidEventsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidCallsCallSidEventsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Events.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidEventsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export function useGet20100401AccountsAccountSidCallsCallSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Notifications[
          ':Sid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export function useGet20100401AccountsAccountSidCallsCallSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Notifications.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export function useGet20100401AccountsAccountSidCallsCallSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Create a recording for the call
 *
 * Create a recording for the call
 */
export function usePost20100401AccountsAccountSidCallsCallSidRecordingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export function useGet20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 */
export function usePost20100401AccountsAccountSidCallsCallSidRecordingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
          ':Sid.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function useDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
          ':Sid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 *
 * Fetch an instance of a conference
 *
 * Fetch an instance of a conference
 */
export function useGet20100401AccountsAccountSidConferencesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidConferencesSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConferencesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export function usePost20100401AccountsAccountSidConferencesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidConferencesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidConferencesJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Conferences.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 */
export function getGet20100401AccountsAccountSidConferencesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Conferences.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export function useGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
          'Recordings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export function useGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 */
export function usePost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function useDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Fetch an instance of a connect-app
 *
 * Fetch an instance of a connect-app
 */
export function useGet20100401AccountsAccountSidConnectAppsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidConnectAppsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConnectAppsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Update a connect-app with the specified parameters
 *
 * Update a connect-app with the specified parameters
 */
export function usePost20100401AccountsAccountSidConnectAppsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Delete an instance of a connect-app
 *
 * Delete an instance of a connect-app
 */
export function useDelete20100401AccountsAccountSidConnectAppsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidConnectAppsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['ConnectApps.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 */
export function getGet20100401AccountsAccountSidConnectAppsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/ConnectApps.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export function useGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':AddressSid'][
          'DependentPhoneNumbers.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Update an incoming-phone-number instance.
 *
 * Update an incoming-phone-number instance.
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 */
export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Purchase a phone-number for the account.
 *
 * Purchase a phone-number for the account.
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 */
export function useDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
          'AssignedAddOns.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Assign an Add-on installation to the Number specified.
 *
 * Assign an Add-on installation to the Number specified.
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
          'AssignedAddOns.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':AssignedAddOnSid'].Extensions[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':AssignedAddOnSid']['Extensions.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function useGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function usePost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function useGet20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidKeysSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function getGet20100401AccountsAccountSidKeysSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function usePost20100401AccountsAccountSidKeysSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function useDelete20100401AccountsAccountSidKeysSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Keys/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function useGet20100401AccountsAccountSidKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidKeysJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function getGet20100401AccountsAccountSidKeysJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Keys.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function usePost20100401AccountsAccountSidKeysJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
    >,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
    >,
    Error,
    string,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']>
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Keys.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Fetch a single Media resource associated with a specific Message resource
 *
 * Fetch a single Media resource associated with a specific Message resource
 */
export function useGet20100401AccountsAccountSidMessagesMessageSidMediaSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[
          ':Sid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Delete the Media resource.
 *
 * Delete the Media resource.
 */
export function useDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[
          ':Sid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 *
 * Read a list of Media resources associated with a specific Message resource
 *
 * Read a list of Media resources associated with a specific Message resource
 */
export function useGet20100401AccountsAccountSidMessagesMessageSidMediaJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Media.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Fetch a specific member from the queue
 *
 * Fetch a specific member from the queue
 */
export function useGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
          ':CallSid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 */
export function usePost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
          ':CallSid.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 *
 * Retrieve the members of the queue
 *
 * Retrieve the members of the queue
 */
export function useGet20100401AccountsAccountSidQueuesQueueSidMembersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid']['Members.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 */
export function useGet20100401AccountsAccountSidMessagesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidMessagesJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 */
export function getGet20100401AccountsAccountSidMessagesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Messages.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Send a message
 *
 * Send a message
 */
export function usePost20100401AccountsAccountSidMessagesJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Messages.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Fetch a specific Message
 *
 * Fetch a specific Message
 */
export function useGet20100401AccountsAccountSidMessagesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidMessagesSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 */
export function getGet20100401AccountsAccountSidMessagesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 */
export function usePost20100401AccountsAccountSidMessagesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Deletes a Message resource from your account
 *
 * Deletes a Message resource from your account
 */
export function useDelete20100401AccountsAccountSidMessagesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Messages/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 */
export function usePost20100401AccountsAccountSidMessagesMessageSidFeedbackJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Feedback.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export function useGet20100401AccountsAccountSidSigningKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSigningKeysJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export function getGet20100401AccountsAccountSidSigningKeysJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SigningKeys.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 *
 * Create a new Signing Key for the account making the request.
 *
 * Create a new Signing Key for the account making the request.
 */
export function usePost20100401AccountsAccountSidSigningKeysJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SigningKeys.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json
 *
 * Fetch a notification belonging to the account used to make the request
 *
 * Fetch a notification belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidNotificationsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Notifications[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidNotificationsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidNotificationsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Notifications.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 */
export function getGet20100401AccountsAccountSidNotificationsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Notifications.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Updates the caller-id
 *
 * Updates the caller-id
 */
export function usePost20100401AccountsAccountSidOutgoingCallerIdsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Delete the caller-id specified from the account
 *
 * Delete the caller-id specified from the account
 */
export function useDelete20100401AccountsAccountSidOutgoingCallerIdsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidOutgoingCallerIdsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidOutgoingCallerIdsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export function usePost20100401AccountsAccountSidOutgoingCallerIdsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Fetch an instance of a participant
 *
 * Fetch an instance of a participant
 */
export function useGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Update the properties of the participant
 *
 * Update the properties of the participant
 */
export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Kick a participant from a given conference
 *
 * Kick a participant from a given conference
 */
export function useDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 *
 * Retrieve a list of participants belonging to the account used to make the request
 *
 * Retrieve a list of participants belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
          'Participants.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export function usePost20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
          'Participants.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json
 *
 * create an instance of payments. This will start a new payments session
 *
 * create an instance of payments. This will start a new payments session
 */
export function usePost20100401AccountsAccountSidCallsCallSidPaymentsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Payments.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json
 *
 * update an instance of payments with different phases of payment flows.
 *
 * update an instance of payments with different phases of payment flows.
 */
export function usePost20100401AccountsAccountSidCallsCallSidPaymentsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Payments[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Fetch an instance of a queue identified by the QueueSid
 *
 * Fetch an instance of a queue identified by the QueueSid
 */
export function useGet20100401AccountsAccountSidQueuesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidQueuesSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 */
export function getGet20100401AccountsAccountSidQueuesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Update the queue with the new parameters
 *
 * Update the queue with the new parameters
 */
export function usePost20100401AccountsAccountSidQueuesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Remove an empty queue
 *
 * Remove an empty queue
 */
export function useDelete20100401AccountsAccountSidQueuesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Queues/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Retrieve a list of queues belonging to the account used to make the request
 *
 * Retrieve a list of queues belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidQueuesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ?? (isEnabled ? getGet20100401AccountsAccountSidQueuesJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 */
export function getGet20100401AccountsAccountSidQueuesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Queues.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Create a queue
 *
 * Create a queue
 */
export function usePost20100401AccountsAccountSidQueuesJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Queues.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json
 *
 * Create a Transcription
 *
 * Create a Transcription
 */
export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Transcriptions.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 */
export function usePost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Transcriptions[
          ':Sid.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording
 *
 * Fetch an instance of a recording
 */
export function useGet20100401AccountsAccountSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidRecordingsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json', args] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function useDelete20100401AccountsAccountSidRecordingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidRecordingsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Recordings.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidRecordingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Recordings.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Fetch an instance of an AddOnResult
 *
 * Fetch an instance of an AddOnResult
 */
export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':Sid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Delete a result and purge all associated Payloads
 *
 * Delete a result and purge all associated Payloads
 */
export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':Sid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 *
 * Retrieve a list of results belonging to the recording
 *
 * Retrieve a list of results belonging to the recording
 */
export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'][
          'AddOnResults.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Delete a payload from the result along with all associated Data
 *
 * Delete a payload from the result along with all associated Data
 */
export function useDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 */
export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ]['Payloads.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export function useGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':PayloadSid']['Data.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function useGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
          ':Sid.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function useDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
          ':Sid.json'
        ].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export function useGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'][
          'Transcriptions.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    args,
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Fetch an instance of a short code
 *
 * Fetch an instance of a short code
 */
export function useGet20100401AccountsAccountSidSMSShortCodesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSMSShortCodesSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSMSShortCodesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Update a short code with the following parameters
 *
 * Update a short code with the following parameters
 */
export function usePost20100401AccountsAccountSidSMSShortCodesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidSMSShortCodesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSMSShortCodesJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SMS['ShortCodes.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 */
export function getGet20100401AccountsAccountSidSMSShortCodesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function useGet20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSigningKeysSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSigningKeysSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function usePost20100401AccountsAccountSidSigningKeysSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function useDelete20100401AccountsAccountSidSigningKeysSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'CredentialListMappings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'CredentialListMappings.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.CredentialListMappings[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.CredentialListMappings[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'IpAccessControlListMappings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Create a new IP Access Control List mapping
 *
 * Create a new IP Access Control List mapping
 */
export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'IpAccessControlListMappings.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch a specific instance of an IP Access Control List mapping
 *
 * Fetch a specific instance of an IP Access Control List mapping
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IP Access Control List mapping from the requested domain
 *
 * Delete an IP Access Control List mapping from the requested domain
 */
export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
          'CredentialListMappings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function usePost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
          'CredentialListMappings.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Registrations.CredentialListMappings[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Registrations.CredentialListMappings[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Retrieve a list of credentials.
 *
 * Retrieve a list of credentials.
 */
export function useGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
          'Credentials.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Create a new credential resource.
 *
 * Create a new credential resource.
 */
export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
          'Credentials.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Fetch a single credential.
 *
 * Fetch a single credential.
 */
export function useGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Update a credential resource.
 *
 * Update a credential resource.
 */
export function usePost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Delete a credential resource.
 *
 * Delete a credential resource.
 */
export function useDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Get All Credential Lists
 *
 * Get All Credential Lists
 */
export function useGet20100401AccountsAccountSidSIPCredentialListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPCredentialListsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Create a Credential List
 *
 * Create a Credential List
 */
export function usePost20100401AccountsAccountSidSIPCredentialListsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Get a Credential List
 *
 * Get a Credential List
 */
export function useGet20100401AccountsAccountSidSIPCredentialListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPCredentialListsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Update a Credential List
 *
 * Update a Credential List
 */
export function usePost20100401AccountsAccountSidSIPCredentialListsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Delete a Credential List
 *
 * Delete a Credential List
 */
export function useDelete20100401AccountsAccountSidSIPCredentialListsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Read multiple CredentialListMapping resources from an account.
 *
 * Read multiple CredentialListMapping resources from an account.
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'CredentialListMappings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Create a CredentialListMapping resource for an account.
 *
 * Create a CredentialListMapping resource for an account.
 */
export function usePost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'CredentialListMappings.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Fetch a single CredentialListMapping resource from an account.
 *
 * Fetch a single CredentialListMapping resource from an account.
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].CredentialListMappings[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Delete a CredentialListMapping resource from an account.
 *
 * Delete a CredentialListMapping resource from an account.
 */
export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].CredentialListMappings[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Retrieve a list of domains belonging to the account used to make the request
 *
 * Retrieve a list of domains belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidSIPDomainsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPDomainsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Create a new Domain
 *
 * Create a new Domain
 */
export function usePost20100401AccountsAccountSidSIPDomainsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Fetch an instance of a Domain
 *
 * Fetch an instance of a Domain
 */
export function useGet20100401AccountsAccountSidSIPDomainsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPDomainsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Update the attributes of a domain
 *
 * Update the attributes of a domain
 */
export function usePost20100401AccountsAccountSidSIPDomainsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Delete an instance of a Domain
 *
 * Delete an instance of a Domain
 */
export function useDelete20100401AccountsAccountSidSIPDomainsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 */
export function useGet20100401AccountsAccountSidSIPIpAccessControlListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Create a new IpAccessControlList resource
 *
 * Create a new IpAccessControlList resource
 */
export function usePost20100401AccountsAccountSidSIPIpAccessControlListsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Fetch a specific instance of an IpAccessControlList
 *
 * Fetch a specific instance of an IpAccessControlList
 */
export function useGet20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Rename an IpAccessControlList
 *
 * Rename an IpAccessControlList
 */
export function usePost20100401AccountsAccountSidSIPIpAccessControlListsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Delete an IpAccessControlList from the requested account
 *
 * Delete an IpAccessControlList from the requested account
 */
export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch an IpAccessControlListMapping resource.
 *
 * Fetch an IpAccessControlListMapping resource.
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].IpAccessControlListMappings[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    args,
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IpAccessControlListMapping resource.
 *
 * Delete an IpAccessControlListMapping resource.
 */
export function useDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].IpAccessControlListMappings[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 */
export function useGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey(args)
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'IpAccessControlListMappings.json'
        ].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Create a new IpAccessControlListMapping resource.
 *
 * Create a new IpAccessControlListMapping resource.
 */
export function usePost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'IpAccessControlListMappings.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Read multiple IpAddress resources.
 *
 * Read multiple IpAddress resources.
 */
export function useGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ]['IpAddresses.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Create a new IpAddress resource.
 *
 * Create a new IpAddress resource.
 */
export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ]['IpAddresses.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Read one IpAddress resource.
 *
 * Read one IpAddress resource.
 */
export function useGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled
      ? getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey(
          args,
        )
      : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$get(args, clientOptions),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
) {
  return [
    'GET',
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    args,
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Update an IpAddress resource.
 *
 * Update an IpAddress resource.
 */
export function usePost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Delete an IpAddress resource.
 *
 * Delete an IpAddress resource.
 */
export function useDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json
 *
 * Create a Siprec
 *
 * Create a Siprec
 */
export function usePost20100401AccountsAccountSidCallsCallSidSiprecJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Siprec.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 */
export function usePost20100401AccountsAccountSidCallsCallSidSiprecSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Siprec[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json
 *
 * Create a Stream
 *
 * Create a Stream
 */
export function usePost20100401AccountsAccountSidCallsCallSidStreamsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Streams.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 */
export function usePost20100401AccountsAccountSidCallsCallSidStreamsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Streams[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Tokens.json
 *
 * Create a new token for ICE servers
 *
 * Create a new token for ICE servers
 */
export function usePost20100401AccountsAccountSidTokensJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Tokens.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Tokens.json'].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Fetch an instance of a Transcription
 *
 * Fetch an instance of a Transcription
 */
export function useGet20100401AccountsAccountSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidTranscriptionsSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidTranscriptionsSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json', args] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Delete a transcription from the account used to make the request
 *
 * Delete a transcription from the account used to make the request
 */
export function useDelete20100401AccountsAccountSidTranscriptionsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidTranscriptionsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Transcriptions.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 */
export function getGet20100401AccountsAccountSidTranscriptionsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Transcriptions.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidUsageRecordsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage['Records.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsAllTimeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['AllTime.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsDailyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsDailyJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Daily.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsDailyJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsLastMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['LastMonth.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsMonthlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Monthly.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsThisMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['ThisMonth.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsTodayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsTodayJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Today.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsTodayJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsYearlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsYearlyJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yearly.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsYearlyJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export function useGet20100401AccountsAccountSidUsageRecordsYesterdayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yesterday.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json', args] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Fetch and instance of a usage-trigger
 *
 * Fetch and instance of a usage-trigger
 */
export function useGet20100401AccountsAccountSidUsageTriggersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageTriggersSidJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export function getGet20100401AccountsAccountSidUsageTriggersSidJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Update an instance of a usage trigger
 *
 * Update an instance of a usage trigger
 */
export function usePost20100401AccountsAccountSidUsageTriggersSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export function useDelete20100401AccountsAccountSidUsageTriggersSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$delete(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 */
export function useGet20100401AccountsAccountSidUsageTriggersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
  options?: {
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
      >,
      Error
    > & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
    (isEnabled ? getGet20100401AccountsAccountSidUsageTriggersJsonKey(args) : null)
  const query = useSWR<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
    >,
    Error
  >(
    swrKey,
    async () =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$get(
          args,
          clientOptions,
        ),
      ),
    swrOptions,
  )
  return { swrKey, ...query }
}

/**
 * Generates SWR cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 */
export function getGet20100401AccountsAccountSidUsageTriggersJsonKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
) {
  return ['GET', '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json', args] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Create a new UsageTrigger
 *
 * Create a new UsageTrigger
 */
export function usePost20100401AccountsAccountSidUsageTriggersJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Usage/Triggers.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json
 *
 * Create a new User Defined Message for the given Call SID.
 *
 * Create a new User Defined Message for the given Call SID.
 */
export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
          'UserDefinedMessages.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json
 *
 * Subscribe to User Defined Messages for a given Call SID.
 *
 * Subscribe to User Defined Messages for a given Call SID.
 */
export function usePost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >
  >(
    'POST /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
          'UserDefinedMessageSubscriptions.json'
        ].$post(arg, options?.client),
      ),
    options?.swr,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json
 *
 * Delete a specific User Defined Message Subscription.
 *
 * Delete a specific User Defined Message Subscription.
 */
export function useDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >
  >(
    'DELETE /2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json',
    async (_, { arg }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[
          ':CallSid'
        ].UserDefinedMessageSubscriptions[':Sid.json'].$delete(arg, options?.client),
      ),
    options?.swr,
  )
}
