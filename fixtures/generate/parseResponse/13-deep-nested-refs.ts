import type { InferRequestType, ClientRequestOptions } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
      args,
      options,
    ),
  )
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
  >,
  options?: ClientRequestOptions,
) {
  return await parseResponse(
    client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
      args,
      options,
    ),
  )
}

/**
 * GET /reports/organization-summary
 */
export async function getReportsOrganizationSummary(options?: ClientRequestOptions) {
  return await parseResponse(client.reports['organization-summary'].$get(undefined, options))
}
