import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
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
export function createGet20100401AccountsJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['2010-04-01']['Accounts.json'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts.json
 */
export function getGet20100401AccountsJsonQueryKey(
  args?: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
) {
  return ['/2010-04-01/Accounts.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts.json
 *
 * Create a new Twilio Subaccount from the account making the request
 *
 * Create a new Twilio Subaccount from the account making the request
 */
export function createPost20100401AccountsJson(
  options?: {
    mutation?: CreateMutationOptions<
      InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$post']> | undefined,
      Error,
      InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['2010-04-01']['Accounts.json']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['2010-04-01']['Accounts.json'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{Sid}.json
 *
 * Fetch the account specified by the provided Account Sid
 *
 * Fetch the account specified by the provided Account Sid
 */
export function createGet20100401AccountsSidJson(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$get(args, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{Sid}.json
 */
export function getGet20100401AccountsSidJsonQueryKey(
  args?: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
) {
  return ['/2010-04-01/Accounts/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{Sid}.json
 *
 * Modify the properties of a given Account
 *
 * Modify the properties of a given Account
 */
export function createPost20100401AccountsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
      | undefined,
      Error,
      InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    InferResponseType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']> | undefined,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$post(args, options?.client)),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function createGet20100401AccountsAccountSidAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidAddressesJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function getGet20100401AccountsAccountSidAddressesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Addresses.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function createPost20100401AccountsAccountSidAddressesJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createGet20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidAddressesSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function getGet20100401AccountsAccountSidAddressesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createPost20100401AccountsAccountSidAddressesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidAddressesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Retrieve a list of applications representing an application within the requesting account
 *
 * Retrieve a list of applications representing an application within the requesting account
 */
export function createGet20100401AccountsAccountSidApplicationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidApplicationsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 */
export function getGet20100401AccountsAccountSidApplicationsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Applications.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Create a new application within your account
 *
 * Create a new application within your account
 */
export function createPost20100401AccountsAccountSidApplicationsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Fetch the application specified by the provided sid
 *
 * Fetch the application specified by the provided sid
 */
export function createGet20100401AccountsAccountSidApplicationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidApplicationsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidApplicationsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Updates the application's properties
 *
 * Updates the application's properties
 */
export function createPost20100401AccountsAccountSidApplicationsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Delete the application by the specified application sid
 *
 * Delete the application by the specified application sid
 */
export function createDelete20100401AccountsAccountSidApplicationsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json
 *
 * Fetch an instance of an authorized-connect-app
 *
 * Fetch an instance of an authorized-connect-app
 */
export function createGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AuthorizedConnectApps[
            ':ConnectAppSid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid}.json
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of authorized-connect-apps belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidAuthorizedConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['AuthorizedConnectApps.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['AvailablePhoneNumbers.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[
            ':CountryCode.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'Local.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'MachineToMachine.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'Mobile.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'National.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'SharedCost.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'TollFree.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
            'Voip.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 *
 * Fetch the balance for an Account based on Account Sid. Balance changes may not be reflected immediately. Child accounts do not contain balance information
 */
export function createGet20100401AccountsAccountSidBalanceJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidBalanceJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Balance.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 */
export function getGet20100401AccountsAccountSidBalanceJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Balance.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Retrieves a collection of calls made to and from your account
 *
 * Retrieves a collection of calls made to and from your account
 */
export function createGet20100401AccountsAccountSidCallsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 */
export function getGet20100401AccountsAccountSidCallsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Calls.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 */
export function createPost20100401AccountsAccountSidCallsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Fetch the call specified by the provided Call SID
 *
 * Fetch the call specified by the provided Call SID
 */
export function createGet20100401AccountsAccountSidCallsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Initiates a call redirect or terminates a call
 *
 * Initiates a call redirect or terminates a call
 */
export function createPost20100401AccountsAccountSidCallsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 */
export function createDelete20100401AccountsAccountSidCallsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 *
 * Retrieve a list of all events for a call.
 *
 * Retrieve a list of all events for a call.
 */
export function createGet20100401AccountsAccountSidCallsCallSidEventsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Events.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export function createGet20100401AccountsAccountSidCallsCallSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Notifications[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export function createGet20100401AccountsAccountSidCallsCallSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Notifications.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export function createGet20100401AccountsAccountSidCallsCallSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Create a recording for the call
 *
 * Create a recording for the call
 */
export function createPost20100401AccountsAccountSidCallsCallSidRecordingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export function createGet20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 */
export function createPost20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
            ':Sid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 *
 * Fetch an instance of a conference
 *
 * Fetch an instance of a conference
 */
export function createGet20100401AccountsAccountSidConferencesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidConferencesSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConferencesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export function createPost20100401AccountsAccountSidConferencesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 *
 * Retrieve a list of conferences belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidConferencesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidConferencesJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Conferences.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 */
export function getGet20100401AccountsAccountSidConferencesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Conferences.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 *
 * Retrieve a list of recordings belonging to the call used to make the request
 */
export function createGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
            'Recordings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording for a call
 *
 * Fetch an instance of a recording for a call
 */
export function createGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
            ':Sid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Fetch an instance of a connect-app
 *
 * Fetch an instance of a connect-app
 */
export function createGet20100401AccountsAccountSidConnectAppsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidConnectAppsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 */
export function getGet20100401AccountsAccountSidConnectAppsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Update a connect-app with the specified parameters
 *
 * Update a connect-app with the specified parameters
 */
export function createPost20100401AccountsAccountSidConnectAppsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Delete an instance of a connect-app
 *
 * Delete an instance of a connect-app
 */
export function createDelete20100401AccountsAccountSidConnectAppsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 *
 * Retrieve a list of connect-apps belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidConnectAppsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidConnectAppsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['ConnectApps.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 */
export function getGet20100401AccountsAccountSidConnectAppsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/ConnectApps.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export function createGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Addresses[':AddressSid'][
            'DependentPhoneNumbers.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 *
 * Fetch an incoming-phone-number belonging to the account used to make the request.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Update an incoming-phone-number instance.
 *
 * Update an incoming-phone-number instance.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 */
export function createDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 *
 * Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Purchase a phone-number for the account.
 *
 * Purchase a phone-number for the account.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 *
 * Fetch an instance of an Add-on installation currently assigned to this Number.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
            ':ResourceSid'
          ].AssignedAddOns[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 */
export function createDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
            ':ResourceSid'
          ].AssignedAddOns[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 *
 * Retrieve a list of Add-on installations currently assigned to this Number.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
            'AssignedAddOns.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Assign an Add-on installation to the Number specified.
 *
 * Assign an Add-on installation to the Number specified.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
            'AssignedAddOns.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 *
 * Fetch an instance of an Extension for the Assigned Add-on.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
            ':ResourceSid'
          ].AssignedAddOns[':AssignedAddOnSid'].Extensions[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 *
 * Retrieve a list of Extensions for the Assigned Add-on.
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
            ':ResourceSid'
          ].AssignedAddOns[':AssignedAddOnSid']['Extensions.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createGet20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidKeysSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function getGet20100401AccountsAccountSidKeysSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createPost20100401AccountsAccountSidKeysSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidKeysSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function createGet20100401AccountsAccountSidKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidKeysJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function getGet20100401AccountsAccountSidKeysJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Keys.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function createPost20100401AccountsAccountSidKeysJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']>
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Fetch a single Media resource associated with a specific Message resource
 *
 * Fetch a single Media resource associated with a specific Message resource
 */
export function createGet20100401AccountsAccountSidMessagesMessageSidMediaSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Delete the Media resource.
 *
 * Delete the Media resource.
 */
export function createDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 *
 * Read a list of Media resources associated with a specific Message resource
 *
 * Read a list of Media resources associated with a specific Message resource
 */
export function createGet20100401AccountsAccountSidMessagesMessageSidMediaJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Media.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Fetch a specific member from the queue
 *
 * Fetch a specific member from the queue
 */
export function createGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
            ':CallSid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 */
export function createPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
            ':CallSid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 *
 * Retrieve the members of the queue
 *
 * Retrieve the members of the queue
 */
export function createGet20100401AccountsAccountSidQueuesQueueSidMembersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid']['Members.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 *
 * Retrieve a list of Message resources associated with a Twilio Account
 */
export function createGet20100401AccountsAccountSidMessagesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidMessagesJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 */
export function getGet20100401AccountsAccountSidMessagesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Messages.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Send a message
 *
 * Send a message
 */
export function createPost20100401AccountsAccountSidMessagesJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Fetch a specific Message
 *
 * Fetch a specific Message
 */
export function createGet20100401AccountsAccountSidMessagesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidMessagesSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 */
export function getGet20100401AccountsAccountSidMessagesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 */
export function createPost20100401AccountsAccountSidMessagesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Deletes a Message resource from your account
 *
 * Deletes a Message resource from your account
 */
export function createDelete20100401AccountsAccountSidMessagesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 */
export function createPost20100401AccountsAccountSidMessagesMessageSidFeedbackJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'][
            'Feedback.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export function createGet20100401AccountsAccountSidSigningKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSigningKeysJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export function getGet20100401AccountsAccountSidSigningKeysJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/SigningKeys.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 *
 * Create a new Signing Key for the account making the request.
 *
 * Create a new Signing Key for the account making the request.
 */
export function createPost20100401AccountsAccountSidSigningKeysJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json
 *
 * Fetch a notification belonging to the account used to make the request
 *
 * Fetch a notification belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidNotificationsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Notifications[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid}.json
 */
export function getGet20100401AccountsAccountSidNotificationsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 *
 * Retrieve a list of notifications belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidNotificationsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Notifications.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 */
export function getGet20100401AccountsAccountSidNotificationsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Notifications.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 *
 * Fetch an outgoing-caller-id belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Updates the caller-id
 *
 * Updates the caller-id
 */
export function createPost20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Delete the caller-id specified from the account
 *
 * Delete the caller-id specified from the account
 */
export function createDelete20100401AccountsAccountSidOutgoingCallerIdsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 *
 * Retrieve a list of outgoing-caller-ids belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidOutgoingCallerIdsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export function createPost20100401AccountsAccountSidOutgoingCallerIdsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Fetch an instance of a participant
 *
 * Fetch an instance of a participant
 */
export function createGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
            ':CallSid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Update the properties of the participant
 *
 * Update the properties of the participant
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
            ':CallSid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Kick a participant from a given conference
 *
 * Kick a participant from a given conference
 */
export function createDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
            ':CallSid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 *
 * Retrieve a list of participants belonging to the account used to make the request
 *
 * Retrieve a list of participants belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
            'Participants.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
            'Participants.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json
 *
 * create an instance of payments. This will start a new payments session
 *
 * create an instance of payments. This will start a new payments session
 */
export function createPost20100401AccountsAccountSidCallsCallSidPaymentsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Payments.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json
 *
 * update an instance of payments with different phases of payment flows.
 *
 * update an instance of payments with different phases of payment flows.
 */
export function createPost20100401AccountsAccountSidCallsCallSidPaymentsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Payments[
            ':Sid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Fetch an instance of a queue identified by the QueueSid
 *
 * Fetch an instance of a queue identified by the QueueSid
 */
export function createGet20100401AccountsAccountSidQueuesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidQueuesSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 */
export function getGet20100401AccountsAccountSidQueuesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Update the queue with the new parameters
 *
 * Update the queue with the new parameters
 */
export function createPost20100401AccountsAccountSidQueuesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Remove an empty queue
 *
 * Remove an empty queue
 */
export function createDelete20100401AccountsAccountSidQueuesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Retrieve a list of queues belonging to the account used to make the request
 *
 * Retrieve a list of queues belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidQueuesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidQueuesJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 */
export function getGet20100401AccountsAccountSidQueuesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Queues.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Create a queue
 *
 * Create a queue
 */
export function createPost20100401AccountsAccountSidQueuesJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json
 *
 * Create a Transcription
 *
 * Create a Transcription
 */
export function createPost20100401AccountsAccountSidCallsCallSidTranscriptionsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
            'Transcriptions.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Transcriptions[
            ':Sid.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Fetch an instance of a recording
 *
 * Fetch an instance of a recording
 */
export function createGet20100401AccountsAccountSidRecordingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidRecordingsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json', ...(args ? [args] : [])] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidRecordingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 *
 * Retrieve a list of recordings belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidRecordingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidRecordingsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Recordings.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 */
export function getGet20100401AccountsAccountSidRecordingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Recordings.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Fetch an instance of an AddOnResult
 *
 * Fetch an instance of an AddOnResult
 */
export function createGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Delete a result and purge all associated Payloads
 *
 * Delete a result and purge all associated Payloads
 */
export function createDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 *
 * Retrieve a list of results belonging to the recording
 *
 * Retrieve a list of results belonging to the recording
 */
export function createGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'][
            'AddOnResults.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export function createGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':AddOnResultSid'
          ].Payloads[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Delete a payload from the result along with all associated Data
 *
 * Delete a payload from the result along with all associated Data
 */
export function createDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':AddOnResultSid'
          ].Payloads[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 *
 * Retrieve a list of payloads belonging to the AddOnResult
 */
export function createGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':AddOnResultSid'
          ]['Payloads.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 *
 * Fetch an instance of a result payload
 *
 * Fetch an instance of a result payload
 */
export function createGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
            ':AddOnResultSid'
          ].Payloads[':PayloadSid']['Data.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function createGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
            ':Sid.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export function createGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'][
            'Transcriptions.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Fetch an instance of a short code
 *
 * Fetch an instance of a short code
 */
export function createGet20100401AccountsAccountSidSMSShortCodesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Update a short code with the following parameters
 *
 * Update a short code with the following parameters
 */
export function createPost20100401AccountsAccountSidSMSShortCodesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 *
 * Retrieve a list of short-codes belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidSMSShortCodesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSMSShortCodesJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SMS['ShortCodes.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 */
export function getGet20100401AccountsAccountSidSMSShortCodesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createGet20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSigningKeysSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSigningKeysSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createPost20100401AccountsAccountSidSigningKeysSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidSigningKeysSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
            'CredentialListMappings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
            'CredentialListMappings.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Calls.CredentialListMappings[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Calls.CredentialListMappings[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 *
 * Retrieve a list of IP Access Control List mappings belonging to the domain used in the request
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
            'IpAccessControlListMappings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Create a new IP Access Control List mapping
 *
 * Create a new IP Access Control List mapping
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
            'IpAccessControlListMappings.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch a specific instance of an IP Access Control List mapping
 *
 * Fetch a specific instance of an IP Access Control List mapping
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IP Access Control List mapping from the requested domain
 *
 * Delete an IP Access Control List mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 *
 * Retrieve a list of credential list mappings belonging to the domain used in the request
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
            'CredentialListMappings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
            'CredentialListMappings.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Fetch a specific instance of a credential list mapping
 *
 * Fetch a specific instance of a credential list mapping
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Registrations.CredentialListMappings[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].Auth.Registrations.CredentialListMappings[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Retrieve a list of credentials.
 *
 * Retrieve a list of credentials.
 */
export function createGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
            'Credentials.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Create a new credential resource.
 *
 * Create a new credential resource.
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
            'Credentials.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Fetch a single credential.
 *
 * Fetch a single credential.
 */
export function createGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
            ':CredentialListSid'
          ].Credentials[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Update a credential resource.
 *
 * Update a credential resource.
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
            ':CredentialListSid'
          ].Credentials[':Sid.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Delete a credential resource.
 *
 * Delete a credential resource.
 */
export function createDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
            ':CredentialListSid'
          ].Credentials[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Get All Credential Lists
 *
 * Get All Credential Lists
 */
export function createGet20100401AccountsAccountSidSIPCredentialListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Create a Credential List
 *
 * Create a Credential List
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Get a Credential List
 *
 * Get a Credential List
 */
export function createGet20100401AccountsAccountSidSIPCredentialListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Update a Credential List
 *
 * Update a Credential List
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Delete a Credential List
 *
 * Delete a Credential List
 */
export function createDelete20100401AccountsAccountSidSIPCredentialListsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Read multiple CredentialListMapping resources from an account.
 *
 * Read multiple CredentialListMapping resources from an account.
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
            'CredentialListMappings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Create a CredentialListMapping resource for an account.
 *
 * Create a CredentialListMapping resource for an account.
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
            'CredentialListMappings.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Fetch a single CredentialListMapping resource from an account.
 *
 * Fetch a single CredentialListMapping resource from an account.
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].CredentialListMappings[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Delete a CredentialListMapping resource from an account.
 *
 * Delete a CredentialListMapping resource from an account.
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].CredentialListMappings[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Retrieve a list of domains belonging to the account used to make the request
 *
 * Retrieve a list of domains belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidSIPDomainsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPDomainsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/SIP/Domains.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Create a new Domain
 *
 * Create a new Domain
 */
export function createPost20100401AccountsAccountSidSIPDomainsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Fetch an instance of a Domain
 *
 * Fetch an instance of a Domain
 */
export function createGet20100401AccountsAccountSidSIPDomainsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Update the attributes of a domain
 *
 * Update the attributes of a domain
 */
export function createPost20100401AccountsAccountSidSIPDomainsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Delete an instance of a Domain
 *
 * Delete an instance of a Domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 *
 * Retrieve a list of IpAccessControlLists that belong to the account used to make the request
 */
export function createGet20100401AccountsAccountSidSIPIpAccessControlListsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Create a new IpAccessControlList resource
 *
 * Create a new IpAccessControlList resource
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Fetch a specific instance of an IpAccessControlList
 *
 * Fetch a specific instance of an IpAccessControlList
 */
export function createGet20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Rename an IpAccessControlList
 *
 * Rename an IpAccessControlList
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Delete an IpAccessControlList from the requested account
 *
 * Delete an IpAccessControlList from the requested account
 */
export function createDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':Sid.json'
          ].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Fetch an IpAccessControlListMapping resource.
 *
 * Fetch an IpAccessControlListMapping resource.
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].IpAccessControlListMappings[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IpAccessControlListMapping resource.
 *
 * Delete an IpAccessControlListMapping resource.
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
            ':DomainSid'
          ].IpAccessControlListMappings[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 *
 * Retrieve a list of IpAccessControlListMapping resources.
 */
export function createGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
            'IpAccessControlListMappings.json'
          ].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Create a new IpAccessControlListMapping resource.
 *
 * Create a new IpAccessControlListMapping resource.
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
            'IpAccessControlListMappings.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Read multiple IpAddress resources.
 *
 * Read multiple IpAddress resources.
 */
export function createGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':IpAccessControlListSid'
          ]['IpAddresses.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Create a new IpAddress resource.
 *
 * Create a new IpAddress resource.
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':IpAccessControlListSid'
          ]['IpAddresses.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Read one IpAddress resource.
 *
 * Read one IpAddress resource.
 */
export function createGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey =
    getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
      args,
    )
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':IpAccessControlListSid'
          ].IpAddresses[':Sid.json'].$get(args, clientOptions),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Update an IpAddress resource.
 *
 * Update an IpAddress resource.
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':IpAccessControlListSid'
          ].IpAddresses[':Sid.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Delete an IpAddress resource.
 *
 * Delete an IpAddress resource.
 */
export function createDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
            ':IpAccessControlListSid'
          ].IpAddresses[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json
 *
 * Create a Siprec
 *
 * Create a Siprec
 */
export function createPost20100401AccountsAccountSidCallsCallSidSiprecJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Siprec.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidSiprecSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Siprec[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json
 *
 * Create a Stream
 *
 * Create a Stream
 */
export function createPost20100401AccountsAccountSidCallsCallSidStreamsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Streams.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidStreamsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Streams[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Tokens.json
 *
 * Create a new token for ICE servers
 *
 * Create a new token for ICE servers
 */
export function createPost20100401AccountsAccountSidTokensJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Tokens.json'].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Fetch an instance of a Transcription
 *
 * Fetch an instance of a Transcription
 */
export function createGet20100401AccountsAccountSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 */
export function getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Delete a transcription from the account used to make the request
 *
 * Delete a transcription from the account used to make the request
 */
export function createDelete20100401AccountsAccountSidTranscriptionsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 *
 * Retrieve a list of transcriptions belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidTranscriptionsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid']['Transcriptions.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 */
export function getGet20100401AccountsAccountSidTranscriptionsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Transcriptions.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 *
 * Retrieve a list of usage-records belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidUsageRecordsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage['Records.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Usage/Records.json', ...(args ? [args] : [])] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsAllTimeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['AllTime.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsDailyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Daily.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsLastMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['LastMonth.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsMonthlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Monthly.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsThisMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['ThisMonth.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsTodayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Today.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsYearlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yearly.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsYesterdayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yesterday.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export function getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Fetch and instance of a usage-trigger
 *
 * Fetch and instance of a usage-trigger
 */
export function createGet20100401AccountsAccountSidUsageTriggersSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export function getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
) {
  return [
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json',
    ...(args ? [args] : []),
  ] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Update an instance of a usage trigger
 *
 * Update an instance of a usage trigger
 */
export function createPost20100401AccountsAccountSidUsageTriggersSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidUsageTriggersSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$delete(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 *
 * Retrieve a list of usage-triggers belonging to the account used to make the request
 */
export function createGet20100401AccountsAccountSidUsageTriggersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGet20100401AccountsAccountSidUsageTriggersJsonQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$get(
            args,
            clientOptions,
          ),
        ),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 */
export function getGet20100401AccountsAccountSidUsageTriggersJsonQueryKey(
  args?: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
) {
  return ['/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json', ...(args ? [args] : [])] as const
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Create a new UsageTrigger
 *
 * Create a new UsageTrigger
 */
export function createPost20100401AccountsAccountSidUsageTriggersJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json
 *
 * Create a new User Defined Message for the given Call SID.
 *
 * Create a new User Defined Message for the given Call SID.
 */
export function createPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
            'UserDefinedMessages.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json
 *
 * Subscribe to User Defined Messages for a given Call SID.
 *
 * Subscribe to User Defined Messages for a given Call SID.
 */
export function createPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
            'UserDefinedMessageSubscriptions.json'
          ].$post(args, options?.client),
        ),
    },
    queryClient,
  )
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json
 *
 * Delete a specific User Defined Message Subscription.
 *
 * Delete a specific User Defined Message Subscription.
 */
export function createDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client['2010-04-01'].Accounts[':AccountSid'].Calls[
            ':CallSid'
          ].UserDefinedMessageSubscriptions[':Sid.json'].$delete(args, options?.client),
        ),
    },
    queryClient,
  )
}
