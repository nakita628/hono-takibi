import type { QueryClient, UseMutationOptions, UseQueryOptions } from '@tanstack/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function useGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
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
export function usePostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  options?: {
    mutation?: UseMutationOptions<
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
  return useMutation<
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
export function useGetReportsOrganizationSummary(
  options?: {
    query?: UseQueryOptions<
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
  const query = useQuery(
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
 * Generates TanStack Query cache key for GET /reports/organization-summary
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['/reports/organization-summary'] as const
}
