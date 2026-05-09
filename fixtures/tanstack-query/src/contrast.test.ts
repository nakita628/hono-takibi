import { QueryClient } from '@tanstack/react-query'
import { DetailedError } from 'hono/client'
import { describe, expect, it } from 'vitest'
import { client } from './client'
import {
  getPostUsersMutationOptions,
  getUsersIdQueryOptions,
  getUsersQueryOptions,
} from './generated-query'

/**
 * Side-by-side comparison: the **generated** TanStack Query hooks (which wrap
 * every request in `parseResponse`) vs the naive **raw `.then(res => res.json())`**
 * pattern. Same endpoint, same data, same expectations from a UI standpoint —
 * but very different observable behavior in TanStack Query state.
 *
 * Goal: make the difference between "with parseResponse" and "without
 * parseResponse" auditable in test output.
 */

function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

/** Mirror of `fetch(url).then(res => res.json())` — no `res.ok` check. */
const rawGet = (id: string) => async () => {
  const res = await client.users[':id'].$get({ param: { id } })
  return res.json()
}

const rawList = async () => {
  const res = await client.users.$get()
  return res.json()
}

const rawPost = async (name: string) => {
  const res = await client.users.$post({ json: { name } })
  return res.json()
}

describe('200 success — parseResponse vs raw .json()', () => {
  it('list: parseResponse returns parsed users', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery(getUsersQueryOptions())
    expect(data).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

  it('list: raw .json() returns the same users', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery({
      queryKey: ['raw', 'users'],
      queryFn: rawList,
    })
    expect(data).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

  it('summary — both succeed and return identical data', async () => {
    const queryClient = makeClient()
    const wrapped = await queryClient.fetchQuery(getUsersQueryOptions())
    const raw = await queryClient.fetchQuery({
      queryKey: ['raw', 'users-summary'],
      queryFn: rawList,
    })
    expect(wrapped).toStrictEqual(raw)
  })
})

describe('404 not found — parseResponse vs raw .json()', () => {
  it('parseResponse: query.status=error, error is DetailedError(404)', async () => {
    const queryClient = makeClient()
    const opts = getUsersIdQueryOptions({ param: { id: '999' } })
    let captured: unknown = null
    try {
      await queryClient.fetchQuery(opts)
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(404)
    const state = queryClient.getQueryState(opts.queryKey)
    expect(state?.status).toBe('error')
    expect(state?.error).toBeInstanceOf(DetailedError)
  })

  it('raw .json(): query.status=success, error body silently ends up in data', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery({
      queryKey: ['raw', 'user', '999'],
      queryFn: rawGet('999'),
    })
    expect(data).toStrictEqual({ error: 'Not Found' })
    const state = queryClient.getQueryState(['raw', 'user', '999'])
    expect(state?.status).toBe('success')
    expect(state?.error).toBeNull()
  })

  it('summary — same 404, opposite state.status', async () => {
    const queryClient = makeClient()
    // parseResponse path
    try {
      await queryClient.fetchQuery(getUsersIdQueryOptions({ param: { id: '999' } }))
    } catch {
      // expected
    }
    const wrappedKey = getUsersIdQueryOptions({ param: { id: '999' } }).queryKey
    const wrappedState = queryClient.getQueryState(wrappedKey)

    // raw .json() path
    await queryClient.fetchQuery({
      queryKey: ['raw', 'user', '999'],
      queryFn: rawGet('999'),
    })
    const rawState = queryClient.getQueryState(['raw', 'user', '999'])

    // Compact diff:
    expect({
      parseResponse: { status: wrappedState?.status, hasError: wrappedState?.error !== null },
      rawJson: { status: rawState?.status, hasError: rawState?.error !== null },
    }).toStrictEqual({
      parseResponse: { status: 'error', hasError: true },
      rawJson: { status: 'success', hasError: false },
    })
  })
})

describe('400 bad request (mutation) — parseResponse vs raw .json()', () => {
  it('parseResponse mutation: rejects with DetailedError(400), detail.data has server payload', async () => {
    const opts = getPostUsersMutationOptions()
    let captured: unknown = null
    try {
      await opts.mutationFn?.({ json: { name: '' } })
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
    expect((captured as DetailedError).statusCode).toBe(400)
    expect((captured as DetailedError).detail).toStrictEqual({
      data: { error: 'name is required' },
      statusText: '',
    })
  })

  it('raw .json() mutation: resolves with the error body — caller has no signal of failure', async () => {
    const data = await rawPost('')
    expect(data).toStrictEqual({ error: 'name is required' })
    // ↑ caller now has to introspect `data` to realize it is an error.
    // No exception, no special return type, no isError flag.
  })

  it('summary — only parseResponse propagates the failure as a thrown error', async () => {
    const opts = getPostUsersMutationOptions()
    let parseResponseThrew = false
    try {
      await opts.mutationFn?.({ json: { name: '' } })
    } catch {
      parseResponseThrew = true
    }
    let rawThrew = false
    try {
      await rawPost('')
    } catch {
      rawThrew = true
    }
    expect({ parseResponseThrew, rawThrew }).toStrictEqual({
      parseResponseThrew: true,
      rawThrew: false,
    })
  })
})

describe('500 + non-JSON body — raw .json() throws for the WRONG reason', () => {
  it('raw .json(): SyntaxError because body is not JSON, NOT because status is 500', async () => {
    const queryClient = makeClient()
    let captured: unknown = null
    try {
      await queryClient.fetchQuery({
        // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
        queryFn: async () => (await (client as any)['error-text'].$get()).json(),
        queryKey: ['raw', 'text-500'],
      })
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(SyntaxError)
    const state = queryClient.getQueryState(['raw', 'text-500'])
    expect(state?.status).toBe('error')
    expect((state?.error as Error).name).toBe('SyntaxError')
    // ↑ The query becomes `error`, but only because the body wasn't JSON.
    // If the same 500 returned `{}`, the query would be SUCCESS again.
  })
})

describe('full matrix — observable contract by status code', () => {
  it('builds a behavior-matrix table comparing both queryFns across statuses', async () => {
    const matrix: Array<{
      status: number
      parseResponse: { status: 'success' | 'error'; data?: unknown; errorClass?: string }
      rawJson: { status: 'success' | 'error'; data?: unknown; errorClass?: string }
    }> = []

    // 200 — single user
    {
      const queryClient = makeClient()
      const wrappedData = await queryClient.fetchQuery(
        getUsersIdQueryOptions({ param: { id: '1' } }),
      )
      const rawData = await queryClient.fetchQuery({
        queryKey: ['m', 'raw', '1'],
        queryFn: rawGet('1'),
      })
      matrix.push({
        status: 200,
        parseResponse: { status: 'success', data: wrappedData },
        rawJson: { status: 'success', data: rawData },
      })
    }

    // 404
    {
      const queryClient = makeClient()
      let wrappedErr: unknown = null
      try {
        await queryClient.fetchQuery(getUsersIdQueryOptions({ param: { id: '999' } }))
      } catch (e) {
        wrappedErr = e
      }
      const rawData = await queryClient.fetchQuery({
        queryKey: ['m', 'raw', '999'],
        queryFn: rawGet('999'),
      })
      matrix.push({
        status: 404,
        parseResponse: {
          status: 'error',
          errorClass: (wrappedErr as Error).constructor.name,
        },
        rawJson: { status: 'success', data: rawData },
      })
    }

    expect(matrix).toStrictEqual([
      {
        status: 200,
        parseResponse: { status: 'success', data: { id: '1', name: 'Alice' } },
        rawJson: { status: 'success', data: { id: '1', name: 'Alice' } },
      },
      {
        status: 404,
        parseResponse: { status: 'error', errorClass: 'DetailedError' },
        rawJson: { status: 'success', data: { error: 'Not Found' } },
      },
    ])
  })
})
