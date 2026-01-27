import useSWR from 'swr'
import type { Key, SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
    client?: ClientRequestOptions
  },
) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey =
    customKey ??
    (isEnabled ? getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersKey(args) : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(
          client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
            args,
            clientOptions,
          ),
        ),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns structured key [templatePath, args] for filter-based invalidation
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return ['/organizations/:orgId/departments/:deptId/teams/:teamId/members', args] as const
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function usePostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(options?: {
  mutation?: SWRMutationConfiguration<
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
    Key,
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >
  > & { swrKey?: Key }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, ...restMutationOptions } = mutationOptions ?? {}
  const swrKey =
    customKey ?? getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey()
  return {
    swrKey,
    ...useSWRMutation(
      swrKey,
      async (
        _: Key,
        {
          arg,
        }: {
          arg: InferRequestType<
            (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
          >
        },
      ) =>
        parseResponse(
          client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
            arg,
            clientOptions,
          ),
        ),
      restMutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Returns fixed template key (path params are NOT resolved)
 * All args should be passed via trigger's { arg } object
 */
export function getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey() {
  return 'POST /organizations/:orgId/departments/:deptId/teams/:teamId/members'
}

/**
 * GET /reports/organization-summary
 */
export function useGetReportsOrganizationSummary(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const { swrKey: customKey, enabled, ...restSwrOptions } = swrOptions ?? {}
  const isEnabled = enabled !== false
  const swrKey = customKey ?? (isEnabled ? getGetReportsOrganizationSummaryKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.reports['organization-summary'].$get(undefined, clientOptions)),
      restSwrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /reports/organization-summary
 * Returns structured key [templatePath] for filter-based invalidation
 */
export function getGetReportsOrganizationSummaryKey() {
  return ['/reports/organization-summary'] as const
}
