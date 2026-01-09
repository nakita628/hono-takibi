import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function getOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: { param: { orgId: string; deptId: string; teamId: string } },
  options?: ClientRequestOptions,
) {
  return await client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
    args,
    options,
  )
}

/**
 * POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export async function postOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: {
    param: { orgId: string; deptId: string; teamId: string }
    json: {
      employeeId: string
      role: {
        name: string
        permissions: { resource: string; actions: ('read' | 'write' | 'delete' | 'admin')[] }[]
      }
      allocation?: { percentage: number; effectiveFrom?: string; effectiveTo?: string }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$post(
    args,
    options,
  )
}

/**
 * GET /reports/organization-summary
 */
export async function getReportsOrganizationSummary(options?: ClientRequestOptions) {
  return await client.reports['organization-summary'].$get(undefined, options)
}
