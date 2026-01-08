import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(params: {
  path: { orgId: string; deptId: string; teamId: string }
}) {
  return await client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get({
    param: params.path,
  })
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(params: {
  path: { orgId: string; deptId: string; teamId: string }
}) {
  return await client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
    { param: params.path },
  )
}

/**
 * GET /reports/organization-summary
 */
export async function getReportsOrganizationSummary() {
  return await client.reports['organization-summary'].$get()
}
