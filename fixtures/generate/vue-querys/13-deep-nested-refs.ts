import { useMutation, useQuery } from '@tanstack/vue-query'
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
  clientOptions?: ClientRequestOptions,
) {
  const queryKey = getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(args)
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * Generates Vue Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
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
  clientOptions?: ClientRequestOptions,
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
  >({
    mutationFn: async (args) =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
          args,
          clientOptions,
        ),
      ),
  })
}

/**
 * GET /reports/organization-summary
 */
export function useGetReportsOrganizationSummary(clientOptions?: ClientRequestOptions) {
  const queryKey = getGetReportsOrganizationSummaryQueryKey()
  return useQuery({
    queryKey,
    queryFn: async () =>
      parseResponse(client.reports['organization-summary'].$get(undefined, clientOptions)),
  })
}

/**
 * Generates Vue Query cache key for GET /reports/organization-summary
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['/reports/organization-summary'] as const
}
