import { useQuery, useMutation } from '@tanstack/react-query'
import type {
  UseQueryOptions,
  QueryFunctionContext,
  UseMutationOptions,
} from '@tanstack/react-query'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * Generates TanStack Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return [
    'organizations',
    '/organizations/:orgId/departments/:deptId/teams/:teamId/members',
    args,
  ] as const
}

/**
 * Returns TanStack Query query options for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
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
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(args, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function useGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: {
    query?: UseQueryOptions<
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
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryOptions(args, clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function usePostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(options?: {
  mutation?: UseMutationOptions<
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
  return useMutation({
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
  })
}

/**
 * Generates TanStack Query cache key for GET /reports/organization-summary
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['reports', '/reports/organization-summary'] as const
}

/**
 * Returns TanStack Query query options for GET /reports/organization-summary
 *
 * Use with prefetchQuery, ensureQueryData, or directly with useQuery.
 */
export const getGetReportsOrganizationSummaryQueryOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  queryKey: getGetReportsOrganizationSummaryQueryKey(),
  queryFn: ({ signal }: QueryFunctionContext) =>
    parseResponse(
      client.reports['organization-summary'].$get(undefined, {
        ...clientOptions,
        init: { ...clientOptions?.init, signal },
      }),
    ),
})

/**
 * GET /reports/organization-summary
 */
export function useGetReportsOrganizationSummary(options?: {
  query?: UseQueryOptions<
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
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetReportsOrganizationSummaryQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
