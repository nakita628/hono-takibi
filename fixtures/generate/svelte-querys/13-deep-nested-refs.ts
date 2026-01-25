import { createMutation, createQuery } from '@tanstack/svelte-query'
import type { ClientRequestOptions, InferRequestType, InferResponseType } from 'hono/client'
import { parseResponse } from 'hono/client'
import { client } from '../clients/13-deep-nested-refs'

/**
 * GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
 */
export function createGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(
  args: InferRequestType<
    (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$get']
  >,
  options?: {
    query?: {
      enabled?: boolean
      staleTime?: number
      gcTime?: number
      refetchInterval?: number | false
      refetchOnWindowFocus?: boolean
      refetchOnMount?: boolean
      refetchOnReconnect?: boolean
      retry?: boolean | number
      retryDelay?: number
    }
    client?: ClientRequestOptions
  },
) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembersQueryKey(args),
    queryFn: async () =>
      parseResponse(
        client.organizations[':orgId'].departments[':deptId'].teams[':teamId'].members.$get(
          args,
          clientOptions,
        ),
      ),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /organizations/{orgId}/departments/{deptId}/teams/{teamId}/members
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
export function createPostOrganizationsOrgIdDepartmentsDeptIdTeamsTeamIdMembers(options?: {
  mutation?: {
    onSuccess?: (
      data: InferResponseType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
      variables: InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
    ) => void
    onError?: (
      error: Error,
      variables: InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
    ) => void
    onSettled?: (
      data:
        | InferResponseType<
            (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
          >
        | undefined,
      error: Error | null,
      variables: InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
    ) => void
    onMutate?: (
      variables: InferRequestType<
        (typeof client.organizations)[':orgId']['departments'][':deptId']['teams'][':teamId']['members']['$post']
      >,
    ) => void
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { mutation: mutationOptions, client: clientOptions } = options ?? {}
  return createMutation({
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
    ...mutationOptions,
  })
}

/**
 * GET /reports/organization-summary
 */
export function createGetReportsOrganizationSummary(options?: {
  query?: {
    enabled?: boolean
    staleTime?: number
    gcTime?: number
    refetchInterval?: number | false
    refetchOnWindowFocus?: boolean
    refetchOnMount?: boolean
    refetchOnReconnect?: boolean
    retry?: boolean | number
    retryDelay?: number
  }
  client?: ClientRequestOptions
}) {
  const { query: queryOptions, client: clientOptions } = options ?? {}
  return createQuery({
    queryKey: getGetReportsOrganizationSummaryQueryKey(),
    queryFn: async () =>
      parseResponse(client.reports['organization-summary'].$get(undefined, clientOptions)),
    ...queryOptions,
  })
}

/**
 * Generates Svelte Query cache key for GET /reports/organization-summary
 */
export function getGetReportsOrganizationSummaryQueryKey() {
  return ['/reports/organization-summary'] as const
}
