import type { InferRequestType } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  arg: InferRequestType<
    (typeof client)['organizations'][':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return await client['organizations'][':orgId']['departments'][':deptId']['teams'][':teamId'][
    'members'
  ]['$get'](arg)
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  arg: InferRequestType<
    (typeof client)['organizations'][':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
  >,
) {
  return await client['organizations'][':orgId']['departments'][':deptId']['teams'][':teamId'][
    'members'
  ]['$post'](arg)
}

/**
 * GET /reports/organization-summary
 */
export async function getReportsOrganizationSummary() {
  return await client['reports']['organization-summary']['$get']()
}
