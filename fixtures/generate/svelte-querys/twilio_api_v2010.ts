import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['2010-04-01']['Accounts.json']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGet20100401AccountsJsonQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsJsonQueryKey(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
) {
  const u = client['2010-04-01']['Accounts.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsJsonQueryOptions = (
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01']['Accounts.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts.json
 *
 * Create a new Twilio Subaccount from the account making the request
 *
 * Create a new Twilio Subaccount from the account making the request
 */
export function createPost20100401AccountsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['2010-04-01']['Accounts.json']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['2010-04-01']['Accounts.json']['$post']>,
    ) => parseResponse(client['2010-04-01']['Accounts.json'].$post(args, clientOptions)),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } = getGet20100401AccountsSidJsonQueryOptions(
      args,
      options?.()?.client,
    )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsSidJsonQueryKey(
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
) {
  const u = client['2010-04-01'].Accounts[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsSidJsonQueryOptions = (
  args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$get']>,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{Sid}.json
 *
 * Modify the properties of a given Account
 *
 * Modify the properties of a given Account
 */
export function createPost20100401AccountsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<ReturnType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>>
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<(typeof client)['2010-04-01']['Accounts'][':Sid.json']['$post']>,
    ) => parseResponse(client['2010-04-01'].Accounts[':Sid.json'].$post(args, clientOptions)),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function createGet20100401AccountsAccountSidAddressesJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAddressesJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAddressesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Addresses.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAddressesJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAddressesJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses.json
 */
export function createPost20100401AccountsAccountSidAddressesJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Addresses.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createGet20100401AccountsAccountSidAddressesSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAddressesSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAddressesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAddressesSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAddressesSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createPost20100401AccountsAccountSidAddressesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Addresses/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidAddressesSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidApplicationsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidApplicationsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidApplicationsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidApplicationsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications.json
 *
 * Create a new application within your account
 *
 * Create a new application within your account
 */
export function createPost20100401AccountsAccountSidApplicationsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Applications.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidApplicationsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidApplicationsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Applications/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidApplicationsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidApplicationsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Updates the application's properties
 *
 * Updates the application's properties
 */
export function createPost20100401AccountsAccountSidApplicationsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Applications/{Sid}.json
 *
 * Delete the application by the specified application sid
 *
 * Delete the application by the specified application sid
 */
export function createDelete20100401AccountsAccountSidApplicationsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Applications'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Applications[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AuthorizedConnectApps[':ConnectAppSid.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps/{ConnectAppSid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps'][':ConnectAppSid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAuthorizedConnectAppsConnectAppSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].AuthorizedConnectApps[
        ':ConnectAppSid.json'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['AuthorizedConnectApps.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AuthorizedConnectApps.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AuthorizedConnectApps.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAuthorizedConnectAppsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['AuthorizedConnectApps.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['AvailablePhoneNumbers.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAvailablePhoneNumbersJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['AvailablePhoneNumbers.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Local.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Local.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Local.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeLocalJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Local.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'MachineToMachine.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/MachineToMachine.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['MachineToMachine.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMachineToMachineJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'MachineToMachine.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Mobile.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Mobile.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Mobile.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeMobileJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Mobile.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'National.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/National.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['National.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeNationalJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'National.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'SharedCost.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/SharedCost.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['SharedCost.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeSharedCostJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'SharedCost.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'TollFree.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/TollFree.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['TollFree.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeTollFreeJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'TollFree.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 */
export function createGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
      'Voip.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/AvailablePhoneNumbers/{CountryCode}/Voip.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['AvailablePhoneNumbers'][':CountryCode']['Voip.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAvailablePhoneNumbersCountryCodeVoipJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].AvailablePhoneNumbers[':CountryCode'][
          'Voip.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidBalanceJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidBalanceJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Balance.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Balance.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidBalanceJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Balance.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidBalanceJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Balance.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls.json
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 *
 * Create a new outgoing call to phones, SIP-enabled endpoints or Twilio Client connections
 */
export function createPost20100401AccountsAccountSidCallsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Calls.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Initiates a call redirect or terminates a call
 *
 * Initiates a call redirect or terminates a call
 */
export function createPost20100401AccountsAccountSidCallsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{Sid}.json
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 *
 * Delete a Call record from your account. Once the record is deleted, it will no longer appear in the API and Account Portal logs.
 */
export function createDelete20100401AccountsAccountSidCallsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Events.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Events.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Events.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsCallSidEventsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Events.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid}.json
 */
export function createGet20100401AccountsAccountSidCallsCallSidNotificationsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Notifications[':Sid.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsCallSidNotificationsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Notifications[
        ':Sid.json'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 */
export function createGet20100401AccountsAccountSidCallsCallSidNotificationsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Notifications.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Notifications.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Notifications.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsCallSidNotificationsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Notifications.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsCallSidRecordingsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings.json
 *
 * Create a recording for the call
 *
 * Create a recording for the call
 */
export function createPost20100401AccountsAccountSidCallsCallSidRecordingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Recordings.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidCallsCallSidRecordingsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[':Sid.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: Pass `Twilio.CURRENT` instead of recording sid to reference current active recording.
 */
export function createPost20100401AccountsAccountSidCallsCallSidRecordingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
          ':Sid.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidCallsCallSidRecordingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Recordings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Recordings[
          ':Sid.json'
        ].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidConferencesSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{Sid}.json
 */
export function createPost20100401AccountsAccountSidConferencesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Conferences.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidConferencesJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Conferences.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
      'Recordings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
        'Recordings.json'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
      ':Sid.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 *
 * Changes the status of the recording to paused, stopped, or in-progress. Note: To use `Twilio.CURRENT`, pass it as recording sid.
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidConferencesConferenceSidRecordingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Recordings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Recordings[
          ':Sid.json'
        ].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConnectAppsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConnectAppsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConnectAppsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidConnectAppsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Update a connect-app with the specified parameters
 *
 * Update a connect-app with the specified parameters
 */
export function createPost20100401AccountsAccountSidConnectAppsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/ConnectApps/{Sid}.json
 *
 * Delete an instance of a connect-app
 *
 * Delete an instance of a connect-app
 */
export function createDelete20100401AccountsAccountSidConnectAppsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].ConnectApps[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConnectAppsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConnectAppsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['ConnectApps.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/ConnectApps.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConnectAppsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['ConnectApps.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidConnectAppsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['ConnectApps.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 */
export function createGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Addresses[':AddressSid'][
      'DependentPhoneNumbers.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Addresses/{AddressSid}/DependentPhoneNumbers.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Addresses'][':AddressSid']['DependentPhoneNumbers.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidAddressesAddressSidDependentPhoneNumbersJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Addresses[':AddressSid'][
          'DependentPhoneNumbers.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidIncomingPhoneNumbersSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Update an incoming-phone-number instance.
 *
 * Update an incoming-phone-number instance.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{Sid}.json
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 *
 * Delete a phone-numbers belonging to the account used to make the request.
 */
export function createDelete20100401AccountsAccountSidIncomingPhoneNumbersSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidIncomingPhoneNumbersJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers.json
 *
 * Purchase a phone-number for the account.
 *
 * Purchase a phone-number for the account.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['IncomingPhoneNumbers.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{Sid}.json
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 *
 * Remove the assignment of an Add-on installation from the Number specified.
 */
export function createDelete20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
      'AssignedAddOns.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
          'AssignedAddOns.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns.json
 *
 * Assign an Add-on installation to the Number specified.
 *
 * Assign an Add-on installation to the Number specified.
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[':ResourceSid'][
          'AssignedAddOns.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':AssignedAddOnSid'].Extensions[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':AssignedAddOnSid'].Extensions[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
      ':ResourceSid'
    ].AssignedAddOns[':AssignedAddOnSid']['Extensions.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/{ResourceSid}/AssignedAddOns/{AssignedAddOnSid}/Extensions.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers'][':ResourceSid']['AssignedAddOns'][':AssignedAddOnSid']['Extensions.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidIncomingPhoneNumbersResourceSidAssignedAddOnsAssignedAddOnSidExtensionsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers[
          ':ResourceSid'
        ].AssignedAddOns[':AssignedAddOnSid']['Extensions.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidIncomingPhoneNumbersLocalJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Local.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersLocalJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Local.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Local.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidIncomingPhoneNumbersMobileJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/Mobile.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersMobileJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['Mobile.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['Mobile.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function createGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/IncomingPhoneNumbers/TollFree.json
 */
export function createPost20100401AccountsAccountSidIncomingPhoneNumbersTollFreeJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['IncomingPhoneNumbers']['TollFree.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].IncomingPhoneNumbers['TollFree.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createGet20100401AccountsAccountSidKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidKeysSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidKeysSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Keys/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidKeysSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidKeysSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createPost20100401AccountsAccountSidKeysSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Keys/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidKeysSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Keys[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function createGet20100401AccountsAccountSidKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidKeysJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidKeysJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Keys.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidKeysJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidKeysJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Keys.json
 */
export function createPost20100401AccountsAccountSidKeysJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<(typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']>
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Keys.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Keys.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[':Sid.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidMessagesMessageSidMediaSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[':Sid.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media/{Sid}.json
 *
 * Delete the Media resource.
 *
 * Delete the Media resource.
 */
export function createDelete20100401AccountsAccountSidMessagesMessageSidMediaSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid'].Media[
          ':Sid.json'
        ].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Media.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Media.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Media.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidMessagesMessageSidMediaJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Media.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[':CallSid.json'].$url(
      args,
    )
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidQueuesQueueSidMembersCallSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
        ':CallSid.json'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members/{CallSid}.json
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 *
 * Dequeue a member from a queue and have the member's call begin executing the TwiML document at that URL
 */
export function createPost20100401AccountsAccountSidQueuesQueueSidMembersCallSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members'][':CallSid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid'].Members[
          ':CallSid.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid']['Members.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Queues/{QueueSid}/Members.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':QueueSid']['Members.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidQueuesQueueSidMembersJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Queues[':QueueSid']['Members.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidMessagesJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidMessagesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidMessagesJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidMessagesJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages.json
 *
 * Send a message
 *
 * Send a message
 */
export function createPost20100401AccountsAccountSidMessagesJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Messages.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidMessagesSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidMessagesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Messages/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidMessagesSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidMessagesSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 *
 * Update a Message resource (used to redact Message `body` text and to cancel not-yet-sent messages)
 */
export function createPost20100401AccountsAccountSidMessagesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Messages/{Sid}.json
 *
 * Deletes a Message resource from your account
 *
 * Deletes a Message resource from your account
 */
export function createDelete20100401AccountsAccountSidMessagesSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Messages/{MessageSid}/Feedback.json
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 *
 * Create Message Feedback to confirm a tracked user action was performed by the recipient of the associated Message
 */
export function createPost20100401AccountsAccountSidMessagesMessageSidFeedbackJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Messages'][':MessageSid']['Feedback.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Messages[':MessageSid']['Feedback.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 */
export function createGet20100401AccountsAccountSidSigningKeysJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSigningKeysJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSigningKeysJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSigningKeysJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSigningKeysJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys.json
 *
 * Create a new Signing Key for the account making the request.
 *
 * Create a new Signing Key for the account making the request.
 */
export function createPost20100401AccountsAccountSidSigningKeysJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['SigningKeys.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidNotificationsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidNotificationsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Notifications[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Notifications/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidNotificationsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidNotificationsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Notifications[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidNotificationsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidNotificationsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Notifications.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Notifications.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidNotificationsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Notifications.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidNotificationsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Notifications.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidOutgoingCallerIdsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Updates the caller-id
 *
 * Updates the caller-id
 */
export function createPost20100401AccountsAccountSidOutgoingCallerIdsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds/{Sid}.json
 *
 * Delete the caller-id specified from the account
 *
 * Delete the caller-id specified from the account
 */
export function createDelete20100401AccountsAccountSidOutgoingCallerIdsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].OutgoingCallerIds[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidOutgoingCallerIdsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/OutgoingCallerIds.json
 */
export function createPost20100401AccountsAccountSidOutgoingCallerIdsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['OutgoingCallerIds.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['OutgoingCallerIds.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
      ':CallSid.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Update the properties of the participant
 *
 * Update the properties of the participant
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants/{CallSid}.json
 *
 * Kick a participant from a given conference
 *
 * Kick a participant from a given conference
 */
export function createDelete20100401AccountsAccountSidConferencesConferenceSidParticipantsCallSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants'][':CallSid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'].Participants[
          ':CallSid.json'
        ].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
      'Participants.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidConferencesConferenceSidParticipantsJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
          'Participants.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Conferences/{ConferenceSid}/Participants.json
 */
export function createPost20100401AccountsAccountSidConferencesConferenceSidParticipantsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Conferences'][':ConferenceSid']['Participants.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Conferences[':ConferenceSid'][
          'Participants.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments.json
 *
 * create an instance of payments. This will start a new payments session
 *
 * create an instance of payments. This will start a new payments session
 */
export function createPost20100401AccountsAccountSidCallsCallSidPaymentsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Payments.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Payments/{Sid}.json
 *
 * update an instance of payments with different phases of payment flows.
 *
 * update an instance of payments with different phases of payment flows.
 */
export function createPost20100401AccountsAccountSidCallsCallSidPaymentsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Payments'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Payments[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidQueuesSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidQueuesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Queues/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidQueuesSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidQueuesSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Update the queue with the new parameters
 *
 * Update the queue with the new parameters
 */
export function createPost20100401AccountsAccountSidQueuesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Queues/{Sid}.json
 *
 * Remove an empty queue
 *
 * Remove an empty queue
 */
export function createDelete20100401AccountsAccountSidQueuesSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Queues[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidQueuesJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidQueuesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidQueuesJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidQueuesJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Queues.json
 *
 * Create a queue
 *
 * Create a queue
 */
export function createPost20100401AccountsAccountSidQueuesJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Queues.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Queues.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions.json
 *
 * Create a Transcription
 *
 * Create a Transcription
 */
export function createPost20100401AccountsAccountSidCallsCallSidTranscriptionsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Transcriptions.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Transcriptions/{Sid}.json
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 *
 * Stop a Transcription using either the SID of the Transcription resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidTranscriptionsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Transcriptions'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Transcriptions[
          ':Sid.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidRecordingsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{Sid}.json
 *
 * Delete a recording from your account
 *
 * Delete a recording from your account
 */
export function createDelete20100401AccountsAccountSidRecordingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Recordings.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidRecordingsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Recordings.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':Sid.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':Sid.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{Sid}.json
 *
 * Delete a result and purge all associated Payloads
 *
 * Delete a result and purge all associated Payloads
 */
export function createDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':Sid.json'
        ].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'][
      'AddOnResults.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'][
        'AddOnResults.json'
      ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ].Payloads[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{Sid}.json
 *
 * Delete a payload from the result along with all associated Data
 *
 * Delete a payload from the result along with all associated Data
 */
export function createDelete20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ]['Payloads.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ]['Payloads.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
      ':AddOnResultSid'
    ].Payloads[':PayloadSid']['Data.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{ReferenceSid}/AddOnResults/{AddOnResultSid}/Payloads/{PayloadSid}/Data.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':ReferenceSid']['AddOnResults'][':AddOnResultSid']['Payloads'][':PayloadSid']['Data.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsReferenceSidAddOnResultsAddOnResultSidPayloadsPayloadSidDataJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':ReferenceSid'].AddOnResults[
          ':AddOnResultSid'
        ].Payloads[':PayloadSid']['Data.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function createGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
      ':Sid.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
          ':Sid.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'].Transcriptions[
          ':Sid.json'
        ].$delete(args, clientOptions),
      ),
  }))
}

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 */
export function createGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'][
      'Transcriptions.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Recordings/{RecordingSid}/Transcriptions.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Recordings'][':RecordingSid']['Transcriptions.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidRecordingsRecordingSidTranscriptionsJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Recordings[':RecordingSid'][
          'Transcriptions.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSMSShortCodesSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes/{Sid}.json
 *
 * Update a short code with the following parameters
 *
 * Update a short code with the following parameters
 */
export function createPost20100401AccountsAccountSidSMSShortCodesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SMS.ShortCodes[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSMSShortCodesJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSMSShortCodesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SMS['ShortCodes.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SMS/ShortCodes.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSMSShortCodesJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SMS']['ShortCodes.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSMSShortCodesJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SMS['ShortCodes.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createGet20100401AccountsAccountSidSigningKeysSidJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSigningKeysSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSigningKeysSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSigningKeysSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSigningKeysSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createPost20100401AccountsAccountSidSigningKeysSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SigningKeys/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidSigningKeysSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SigningKeys'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SigningKeys[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'CredentialListMappings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'CredentialListMappings.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'CredentialListMappings.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.CredentialListMappings[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.CredentialListMappings[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsCredentialListMappingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['CredentialListMappings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.CredentialListMappings[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
      'IpAccessControlListMappings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'IpAccessControlListMappings.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings.json
 *
 * Create a new IP Access Control List mapping
 *
 * Create a new IP Access Control List mapping
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Calls[
          'IpAccessControlListMappings.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Calls/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IP Access Control List mapping from the requested domain
 *
 * Delete an IP Access Control List mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthCallsIpAccessControlListMappingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Calls']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Calls.IpAccessControlListMappings[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
      'CredentialListMappings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
          'CredentialListMappings.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings.json
 *
 * Create a new credential list mapping resource
 *
 * Create a new credential list mapping resource
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].Auth.Registrations[
          'CredentialListMappings.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].Auth.Registrations.CredentialListMappings[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Registrations.CredentialListMappings[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/Auth/Registrations/CredentialListMappings/{Sid}.json
 *
 * Delete a credential list mapping from the requested domain
 *
 * Delete a credential list mapping from the requested domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidAuthRegistrationsCredentialListMappingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['Auth']['Registrations']['CredentialListMappings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].Auth.Registrations.CredentialListMappings[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
      'Credentials.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
          'Credentials.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials.json
 *
 * Create a new credential resource.
 *
 * Create a new credential resource.
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':CredentialListSid'][
          'Credentials.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
      ':CredentialListSid'
    ].Credentials[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Update a credential resource.
 *
 * Update a credential resource.
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{CredentialListSid}/Credentials/{Sid}.json
 *
 * Delete a credential resource.
 *
 * Delete a credential resource.
 */
export function createDelete20100401AccountsAccountSidSIPCredentialListsCredentialListSidCredentialsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':CredentialListSid']['Credentials'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[
          ':CredentialListSid'
        ].Credentials[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPCredentialListsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists.json
 *
 * Create a Credential List
 *
 * Create a Credential List
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['CredentialLists.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPCredentialListsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Update a Credential List
 *
 * Update a Credential List
 */
export function createPost20100401AccountsAccountSidSIPCredentialListsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/CredentialLists/{Sid}.json
 *
 * Delete a Credential List
 *
 * Delete a Credential List
 */
export function createDelete20100401AccountsAccountSidSIPCredentialListsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['CredentialLists'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.CredentialLists[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'CredentialListMappings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJsonQueryKey(args),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'CredentialListMappings.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings.json
 *
 * Create a CredentialListMapping resource for an account.
 *
 * Create a CredentialListMapping resource for an account.
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'CredentialListMappings.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'].CredentialListMappings[
      ':Sid.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].CredentialListMappings[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/CredentialListMappings/{Sid}.json
 *
 * Delete a CredentialListMapping resource from an account.
 *
 * Delete a CredentialListMapping resource from an account.
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidCredentialListMappingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['CredentialListMappings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].CredentialListMappings[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPDomainsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains.json
 *
 * Create a new Domain
 *
 * Create a new Domain
 */
export function createPost20100401AccountsAccountSidSIPDomainsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['Domains.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPDomainsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Update the attributes of a domain
 *
 * Update the attributes of a domain
 */
export function createPost20100401AccountsAccountSidSIPDomainsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{Sid}.json
 *
 * Delete an instance of a Domain
 *
 * Delete an instance of a Domain
 */
export function createDelete20100401AccountsAccountSidSIPDomainsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPIpAccessControlListsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists.json
 *
 * Create a new IpAccessControlList resource
 *
 * Create a new IpAccessControlList resource
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP['IpAccessControlLists.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidSIPIpAccessControlListsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$get(
        args,
        { ...clientOptions, init: { ...clientOptions?.init, signal } },
      ),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Rename an IpAccessControlList
 *
 * Rename an IpAccessControlList
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{Sid}.json
 *
 * Delete an IpAccessControlList from the requested account
 *
 * Delete an IpAccessControlList from the requested account
 */
export function createDelete20100401AccountsAccountSidSIPIpAccessControlListsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
      ':DomainSid'
    ].IpAccessControlListMappings[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].IpAccessControlListMappings[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings/{Sid}.json
 *
 * Delete an IpAccessControlListMapping resource.
 *
 * Delete an IpAccessControlListMapping resource.
 */
export function createDelete20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[
          ':DomainSid'
        ].IpAccessControlListMappings[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
      'IpAccessControlListMappings.json'
    ].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'IpAccessControlListMappings.json'
        ].$get(args, { ...clientOptions, init: { ...clientOptions?.init, signal } }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/Domains/{DomainSid}/IpAccessControlListMappings.json
 *
 * Create a new IpAccessControlListMapping resource.
 *
 * Create a new IpAccessControlListMapping resource.
 */
export function createPost20100401AccountsAccountSidSIPDomainsDomainSidIpAccessControlListMappingsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['Domains'][':DomainSid']['IpAccessControlListMappings.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.Domains[':DomainSid'][
          'IpAccessControlListMappings.json'
        ].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ]['IpAddresses.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ]['IpAddresses.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses.json
 *
 * Create a new IpAddress resource.
 *
 * Create a new IpAddress resource.
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ]['IpAddresses.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
  >,
) {
  const u =
    client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
      ':IpAccessControlListSid'
    ].IpAddresses[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryOptions =
  (
    args: InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$get']
    >,
    clientOptions?: ClientRequestOptions,
  ) => ({
    queryKey:
      getGet20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJsonQueryKey(
        args,
      ),
    queryFn: ({ signal }: { signal: AbortSignal }) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$get(args, {
          ...clientOptions,
          init: { ...clientOptions?.init, signal },
        }),
      ),
  })

/**
 * POST /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Update an IpAddress resource.
 *
 * Update an IpAddress resource.
 */
export function createPost20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/SIP/IpAccessControlLists/{IpAccessControlListSid}/IpAddresses/{Sid}.json
 *
 * Delete an IpAddress resource.
 *
 * Delete an IpAddress resource.
 */
export function createDelete20100401AccountsAccountSidSIPIpAccessControlListsIpAccessControlListSidIpAddressesSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['SIP']['IpAccessControlLists'][':IpAccessControlListSid']['IpAddresses'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].SIP.IpAccessControlLists[
          ':IpAccessControlListSid'
        ].IpAddresses[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec.json
 *
 * Create a Siprec
 *
 * Create a Siprec
 */
export function createPost20100401AccountsAccountSidCallsCallSidSiprecJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Siprec.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Siprec/{Sid}.json
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 *
 * Stop a Siprec using either the SID of the Siprec resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidSiprecSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Siprec'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Siprec[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams.json
 *
 * Create a Stream
 *
 * Create a Stream
 */
export function createPost20100401AccountsAccountSidCallsCallSidStreamsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid']['Streams.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/Streams/{Sid}.json
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 *
 * Stop a Stream using either the SID of the Stream resource or the `name` used when creating the resource
 */
export function createPost20100401AccountsAccountSidCallsCallSidStreamsSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['Streams'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'].Streams[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Tokens.json
 *
 * Create a new token for ICE servers
 *
 * Create a new token for ICE servers
 */
export function createPost20100401AccountsAccountSidTokensJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Tokens.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid']['Tokens.json'].$post(args, clientOptions),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidTranscriptionsSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Transcriptions/{Sid}.json
 *
 * Delete a transcription from the account used to make the request
 *
 * Delete a transcription from the account used to make the request
 */
export function createDelete20100401AccountsAccountSidTranscriptionsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Transcriptions[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidTranscriptionsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidTranscriptionsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid']['Transcriptions.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Transcriptions.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidTranscriptionsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Transcriptions.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidTranscriptionsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid']['Transcriptions.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage['Records.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage['Records.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsAllTimeJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['AllTime.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/AllTime.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['AllTime.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsAllTimeJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['AllTime.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsDailyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Daily.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Daily.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Daily.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsDailyJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Daily.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsLastMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['LastMonth.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/LastMonth.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['LastMonth.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsLastMonthJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['LastMonth.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsMonthlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Monthly.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Monthly.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Monthly.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsMonthlyJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Monthly.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsThisMonthJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['ThisMonth.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/ThisMonth.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['ThisMonth.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsThisMonthJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['ThisMonth.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsTodayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Today.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Today.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Today.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsTodayJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Today.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsYearlyJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yearly.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yearly.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yearly.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsYearlyJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yearly.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 */
export function createGet20100401AccountsAccountSidUsageRecordsYesterdayJson(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions(
        args,
        options?.()?.client,
      )
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yesterday.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Records/Yesterday.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Records']['Yesterday.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageRecordsYesterdayJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Records['Yesterday.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid.json}
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid.json}
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageTriggersSidJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 *
 * Update an instance of a usage trigger
 *
 * Update an instance of a usage trigger
 */
export function createPost20100401AccountsAccountSidUsageTriggersSidJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Usage/Triggers/{Sid}.json
 */
export function createDelete20100401AccountsAccountSidUsageTriggersSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage.Triggers[':Sid.json'].$delete(
          args,
          clientOptions,
        ),
      ),
  }))
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
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
              >
            >
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const { queryKey, queryFn, ...baseOptions } =
      getGet20100401AccountsAccountSidUsageTriggersJsonQueryOptions(args, options?.()?.client)
    return { ...baseOptions, ...options?.()?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGet20100401AccountsAccountSidUsageTriggersJsonQueryKey(
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
) {
  const u = client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGet20100401AccountsAccountSidUsageTriggersJsonQueryOptions = (
  args: InferRequestType<
    (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGet20100401AccountsAccountSidUsageTriggersJsonQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Usage/Triggers.json
 *
 * Create a new UsageTrigger
 *
 * Create a new UsageTrigger
 */
export function createPost20100401AccountsAccountSidUsageTriggersJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Usage']['Triggers.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Usage['Triggers.json'].$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessages.json
 *
 * Create a new User Defined Message for the given Call SID.
 *
 * Create a new User Defined Message for the given Call SID.
 */
export function createPost20100401AccountsAccountSidCallsCallSidUserDefinedMessagesJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessages.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
          'UserDefinedMessages.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * POST /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions.json
 *
 * Subscribe to User Defined Messages for a given Call SID.
 *
 * Subscribe to User Defined Messages for a given Call SID.
 */
export function createPost20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsJson(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions.json']['$post']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[':CallSid'][
          'UserDefinedMessageSubscriptions.json'
        ].$post(args, clientOptions),
      ),
  }))
}

/**
 * DELETE /2010-04-01/Accounts/{AccountSid}/Calls/{CallSid}/UserDefinedMessageSubscriptions/{Sid}.json
 *
 * Delete a specific User Defined Message Subscription.
 *
 * Delete a specific User Defined Message Subscription.
 */
export function createDelete20100401AccountsAccountSidCallsCallSidUserDefinedMessageSubscriptionsSidJson(options?: {
  mutation?: CreateMutationOptions<
    | Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
              >
            >
          >
        >
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client)['2010-04-01']['Accounts'][':AccountSid']['Calls'][':CallSid']['UserDefinedMessageSubscriptions'][':Sid.json']['$delete']
      >,
    ) =>
      parseResponse(
        client['2010-04-01'].Accounts[':AccountSid'].Calls[
          ':CallSid'
        ].UserDefinedMessageSubscriptions[':Sid.json'].$delete(args, clientOptions),
      ),
  }))
}
