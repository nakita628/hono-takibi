import { useQuery, useMutation } from '@tanstack/vue-query'
import type { UseQueryOptions, QueryFunctionContext, UseMutationOptions } from '@tanstack/vue-query'
import { unref } from 'vue'
import type { MaybeRef } from 'vue'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * Generates Vue Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns structured key ['prefix', 'path', args] for prefix invalidation
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(
  args: MaybeRef<
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
    >
  >,
) {
  return [
    'organizations',
    '/organizations/:orgId/departments/:deptId/teams/:teamId/members',
    unref(args),
  ] as const
}

/**
 * Returns Vue Query query options for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
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
    query?: Partial<
      Omit<
        UseQueryOptions<
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
        >,
        'queryKey' | 'queryFn'
      >
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
  mutation?: Partial<
    Omit<
      UseMutationOptions<
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
      >,
      'mutationFn'
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
 * Generates Vue Query cache key for GET /reports/organization-summary
 * Returns structured key ['prefix', 'path'] for prefix invalidation
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['reports', '/reports/organization-summary'] as const
}

/**
 * Returns Vue Query query options for GET /reports/organization-summary
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
  query?: Partial<
    Omit<
      UseQueryOptions<
        Awaited<
          ReturnType<
            typeof parseResponse<
              Awaited<ReturnType<(typeof client.reports)['organization-summary']['$get']>>
            >
          >
        >,
        Error
      >,
      'queryKey' | 'queryFn'
    >
  >
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  const { queryKey, queryFn, ...baseOptions } =
    getGetReportsOrganizationSummaryQueryOptions(clientOptions)
  return useQuery({ ...baseOptions, ...queryOptions, queryKey, queryFn })
}
