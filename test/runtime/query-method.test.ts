// Verifies the outputs generated from an OpenAPI 3.2 `query` operation (cases/query-method)
// against the query-method host: the rpc wrapper and the TanStack factories go through
// `client.users.$query`, and QUERY keys carry the method so they never collide with GET's.
import { QueryClient } from '@tanstack/react-query'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { getUsers, queryUsers } from '../__generated__/query-method/rpc'
import { getQueryUsersInfiniteKey, getQueryUsersKey } from '../__generated__/query-method/swr'
import {
  getQueryUsersInfiniteQueryKey,
  getQueryUsersInfiniteQueryOptions,
  getQueryUsersQueryKey,
  getQueryUsersQueryOptions,
  getUsersKey,
  getUsersQueryKey,
} from '../__generated__/query-method/tanstack-query'
import { requestLog } from '../hosts/query-method-app'

function makeClient() {
  return new QueryClient({ defaultOptions: { queries: { retry: false } } })
}

afterEach(() => {
  requestLog.length = 0
})

describe('generated outputs for an OpenAPI 3.2 query operation', () => {
  it('rpc: queryUsers sends the body with QUERY and parses the response', async () => {
    expect(await queryUsers({ json: { ids: ['2', '3'] } })).toStrictEqual([
      { id: '2', name: 'Bob' },
      { id: '3', name: 'Carol' },
    ])
    expect(await getUsers()).toHaveLength(3)
    expect(requestLog).toStrictEqual(['QUERY /users {"ids":["2","3"]}', 'GET /users'])
  })

  it('keys: QUERY carries the method after the path, under the same resource prefix as GET', () => {
    const args = { json: { ids: ['1'] } }
    expect(getUsersKey()).toStrictEqual(['users'])
    expect(getUsersQueryKey()).toStrictEqual(['users', '/users'])
    expect(getQueryUsersQueryKey(args)).toStrictEqual(['users', '/users', 'QUERY', args])
    expect(getQueryUsersInfiniteQueryKey(args)).toStrictEqual([
      'users',
      '/users',
      'QUERY',
      'infinite',
      args,
    ])
    expect(getQueryUsersKey(args)).toStrictEqual(['users', '/users', 'QUERY', args])
    expect(getQueryUsersInfiniteKey(args)).toStrictEqual([
      'users',
      '/users',
      'QUERY',
      'infinite',
      args,
    ])
  })

  it('tanstack: the query and infinite factories fetch through $query', async () => {
    const queryClient = makeClient()
    expect(
      await queryClient.query(getQueryUsersQueryOptions({ json: { ids: ['1'] } })),
    ).toStrictEqual([{ id: '1', name: 'Alice' }])

    const pages = await queryClient.infiniteQuery(
      getQueryUsersInfiniteQueryOptions(
        { json: { ids: ['1', '2', '3'] } },
        {
          initialPageParam: 0,
          getNextPageParam: (lastPage, _allPages, lastPageParam) =>
            lastPage.length === 2 ? lastPageParam + 1 : undefined,
          getRequestArgs: (args, pageParam) => ({
            json: { ...args.json, page: Number(pageParam) },
          }),
        },
      ),
    )
    expect(pages.pages).toStrictEqual([
      [
        { id: '1', name: 'Alice' },
        { id: '2', name: 'Bob' },
      ],
    ])
    expect(pages.pageParams).toStrictEqual([0])
    expect(requestLog).toStrictEqual([
      'QUERY /users {"ids":["1"]}',
      'QUERY /users {"ids":["1","2","3"],"page":0}',
    ])
  })
})
