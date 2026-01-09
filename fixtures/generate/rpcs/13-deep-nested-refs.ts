import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(arg: {
  param: { orgId: string; deptId: string; teamId: string }
}) {
  return await client['organizations'][':orgId']['departments'][':deptId']['teams'][':teamId'][
    'members'
  ]['$get'](arg)
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(arg: {
  param: { orgId: string; deptId: string; teamId: string }
  json: {
    employeeId: string
    role: {
      name: string
      permissions: { resource: string; actions: ('read' | 'write' | 'delete' | 'admin')[] }[]
    }
    allocation?: { percentage: number; effectiveFrom?: string; effectiveTo?: string }
  }
}) {
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
