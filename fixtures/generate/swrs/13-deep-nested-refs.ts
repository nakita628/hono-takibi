import useSWR from 'swr'
import type { SWRConfiguration } from 'swr'
import useSWRMutation from 'swr/mutation'
import type { SWRMutationConfiguration } from 'swr/mutation'
import type { InferRequestType, InferResponseType, ClientRequestOptions } from 'hono/client'
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
    swr?: SWRConfiguration<
      InferResponseType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
      >,
      Error
    >
    client?: ClientRequestOptions
    enabled?: boolean
  },
) {
  const key =
    options?.enabled !== false
      ? (['GET', '/organizations/:orgId/departments/:deptId/teams/:teamId/members', args] as const)
      : null
  return useSWR<
    InferResponseType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
    >,
    Error
  >(
    key,
    async () =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
          args,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return ['GET', '/organizations/:orgId/departments/:deptId/teams/:teamId/members', args] as const
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function usePostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(options?: {
  swr?: SWRMutationConfiguration<
    InferResponseType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >
  >
  client?: ClientRequestOptions
}) {
  return useSWRMutation<
    InferResponseType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >,
    Error,
    string,
    InferRequestType<
      (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
    >
  >(
    'POST /organizations/:orgId/departments/:deptId/teams/:teamId/members',
    async (_, { arg }) =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
          arg,
          options?.client,
        ),
      ),
    options?.swr,
  )
}

/**
 * GET /reports/organization-summary
 */
export function useGetReportsOrganizationSummary(options?: {
  swr?: SWRConfiguration<
    InferResponseType<(typeof client.reports)['organization-summary']['$get']>,
    Error
  >
  client?: ClientRequestOptions
  enabled?: boolean
}) {
  const key =
    options?.enabled !== false ? (['GET', '/reports/organization-summary'] as const) : null
  return useSWR<InferResponseType<(typeof client.reports)['organization-summary']['$get']>, Error>(
    key,
    async () =>
      parseResponse(client.reports['organization-summary'].$get(undefined, options?.client)),
    options?.swr,
  )
}

/**
 * Generates SWR cache key for GET /reports/organization-summary
 */
export function getGetReportsOrganizationSummaryKey() {
  return ['GET', '/reports/organization-summary'] as const
}
