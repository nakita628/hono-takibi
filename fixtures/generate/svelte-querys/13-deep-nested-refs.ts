import { createQuery, createMutation } from '@tanstack/svelte-query'
import type { QueryClient, CreateQueryOptions, CreateMutationOptions } from '@tanstack/svelte-query'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
      >,
      Error,
      InferResponseType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
      >,
      readonly [
        '/organizations/:orgId/departments/:deptId/teams/:teamId/members',
        InferRequestType<
          (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
        >,
      ]
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(args)
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(
          client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
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
 * Generates Svelte Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return ['/organizations/:orgId/departments/:deptId/teams/:teamId/members', args] as const
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  options?: {
    mutation?: CreateMutationOptions<
      | InferResponseType<
          (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
        >
      | undefined,
      Error,
      InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  return createMutation<
    | InferResponseType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >
    | undefined,
    Error,
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >
  >(
    {
      ...options?.mutation,
      mutationFn: async (args) =>
        parseResponse(
          client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
            args,
            options?.client,
          ),
        ),
    },
    queryClient,
  )
}

/**
 * GET /reports/organization-summary
 */
export function createGetReportsOrganizationSummary(
  options?: {
    query?: CreateQueryOptions<
      InferResponseType<(typeof client.reports)['organization-summary']['$get']>,
      Error,
      InferResponseType<(typeof client.reports)['organization-summary']['$get']>,
      readonly ['/reports/organization-summary']
    >
    client?: ClientRequestOptions
  },
  queryClient?: QueryClient,
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const queryKey = getGetReportsOrganizationSummaryQueryKey()
  const query = createQuery(
    {
      ...queryOptions,
      queryKey,
      queryFn: async () =>
        parseResponse(client.reports['organization-summary'].$get(undefined, clientOptions)),
    },
    queryClient,
  )
  return { ...query, queryKey }
}

/**
 * Generates Svelte Query cache key for GET /reports/organization-summary
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['/reports/organization-summary'] as const
}
