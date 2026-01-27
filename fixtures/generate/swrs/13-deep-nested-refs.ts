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
  const isEnabled = swrOptions?.enabled !== false
  const swrKey =
    swrOptions?.swrKey ??
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
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Uses $url() for type-safe key generation
 */
export function getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersKey(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
) {
  return client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$url(args)
    .pathname
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
  const swrKey =
    mutationOptions?.swrKey ??
    getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey()
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
      mutationOptions,
    ),
  }
}

/**
 * Generates SWR mutation key for POST /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 * Uses $url() for type-safe key generation
 */
export function getPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersMutationKey() {
  return `POST ${client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$url().pathname}`
}

/**
 * GET /reports/organization-summary
 */
export function useGetReportsOrganizationSummary(options?: {
  swr?: SWRConfiguration & { swrKey?: Key; enabled?: boolean }
  client?: ClientRequestOptions
}) {
  const { swr: swrOptions, client: clientOptions } = options ?? {}
  const isEnabled = swrOptions?.enabled !== false
  const swrKey = swrOptions?.swrKey ?? (isEnabled ? getGetReportsOrganizationSummaryKey() : null)
  return {
    swrKey,
    ...useSWR(
      swrKey,
      async () =>
        parseResponse(client.reports['organization-summary'].$get(undefined, clientOptions)),
      swrOptions,
    ),
  }
}

/**
 * Generates SWR cache key for GET /reports/organization-summary
 * Uses $url() for type-safe key generation
 */
export function getGetReportsOrganizationSummaryKey() {
  return client.reports['organization-summary'].$url().pathname
}
