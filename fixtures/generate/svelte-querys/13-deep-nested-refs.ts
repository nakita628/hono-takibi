import type {
  CreateMutationOptions,
  CreateQueryOptions,
  QueryFunctionContext,
} from '@tanstack/svelte-query'
import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * Generates Svelte Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns structured key ['prefix', 'method', 'path', args] for filtering
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return [
    'organizations',
    'GET',
    '/organizations/:orgId/departments/:deptId/teams/:teamId/members',
    args,
  ] as const
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
 * Generates Svelte Query mutation key for POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns key ['prefix', 'method', 'path'] for mutation state tracking
 */
export function getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey() {
  return [
    'organizations',
    'POST',
    '/organizations/:orgId/departments/:deptId/teams/:teamId/members',
  ] as const
}

/**
 * Returns Svelte Query mutation options for POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 *
 * Use with useMutation, setMutationDefaults, or isMutating.
 */
export const getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationOptions = (
  clientOptions?: ClientRequestOptions,
) => ({
  mutationKey: getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey(),
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

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  options?: () => {
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
  },
) {
  return createMutation(() => {
    const opts = options?.()
    const { mutationKey, mutationFn, ...baseOptions } =
      getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationOptions(opts?.client)
    return { ...baseOptions, ...opts?.mutation, mutationKey, mutationFn }
  })
}

/**
 * Generates Svelte Query cache key for GET /reports/organization-summary
 * Returns structured key ['prefix', 'method', 'path'] for filtering
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['reports', 'GET', '/reports/organization-summary'] as const
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
