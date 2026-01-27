import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<
              ReturnType<
                (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
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
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } =
      getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryOptions(args, opts?.client)
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Uses $url() for type-safe key generation (includes query string)
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  const u =
    client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$url(args)
  return [u.pathname + u.search] as const
}

/**
 * Returns Svelte Query query options for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryOptions = (
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(args),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(options?: {
  mutation?: CreateMutationOptions<
    Awaited<
      ReturnType<
        typeof parseResponse<
          Awaited<
            ReturnType<
              (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
            >
          >
        >
      >
    >,
    Error,
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation(() => ({
    ...mutationOptions,
    mutationFn: async (
      args: InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
    ) =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
          args,
          clientOptions,
        ),
      ),
  }))
}

/**
 * GET /reports/organization-summary
 */
export function createGetReportsOrganizationSummary(
  options?: () => {
    query?: CreateQueryOptions<
      Awaited<
        ReturnType<
          typeof parseResponse<
            Awaited<ReturnType<(typeof client.reports)['organization-summary']['$get']>>
          >
        >
      >,
      Error
    >
    client?: ClientRequestOptions
  },
) {
  return createQuery(() => {
    const opts = options?.()
    const { queryKey, queryFn, ...baseOptions } = getGetReportsOrganizationSummaryQueryOptions(
      opts?.client,
    )
    return { ...baseOptions, ...opts?.query, queryKey, queryFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /reports/organization-summary
 * Uses $url() for type-safe key generation
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return [client.reports['organization-summary'].$url().pathname] as const
}

/**
 * Returns Svelte Query query options for GET /reports/organization-summary
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReportsOrganizationSummaryQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetReportsOrganizationSummaryQueryKey(),
  queryFn: ({ signal }: { signal: AbortSignal }) =>
    parseResponse(
      client.reports['organization-summary'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})
