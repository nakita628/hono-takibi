import { QueryClient, MutationCache } from '@tanstack/react-query'
import { DetailedError } from 'hono/client'
import { describe, expect, it } from 'vitest'
import { client } from './client'
import {
  getPostUsersMutationOptions,
  getUsersIdQueryOptions,
  getUsersQueryOptions,
} from './generated-query'

/**
 * Build a fresh QueryClient per test so caches/retries don't leak across tests.
 * Retries are disabled to make error assertions deterministic.
 */
function makeClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0, staleTime: 0 },
      mutations: { retry: false },
    },
  })
}

describe('useUsers (list) — generated queryOptions', () => {
  it('queryFn returns parsed users on success', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery(getUsersQueryOptions())
    expect(data).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

  it('cached state after success: status=success, isError=false, error=null', async () => {
    const queryClient = makeClient()
    await queryClient.fetchQuery(getUsersQueryOptions())
    const state = queryClient.getQueryState(getUsersQueryOptions().queryKey)
    expect(state?.status).toBe('success')
    expect(state?.error).toBeNull()
  })
})

describe('useUsersId (single) — error path', () => {
  it('queryFn rejects with DetailedError on 404', async () => {
    const queryClient = makeClient()
    let captured: unknown = null
    try {
      await queryClient.fetchQuery(getUsersIdQueryOptions({ param: { id: '999' } }))
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
  })

  it('error value shape — full DetailedError properties match parseResponse', async () => {
    const queryClient = makeClient()
    let captured: unknown = null
    try {
      await queryClient.fetchQuery(getUsersIdQueryOptions({ param: { id: '999' } }))
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({
      name: e.name,
      message: e.message,
      statusCode: e.statusCode,
      detail: e.detail,
      code: e.code,
      log: e.log,
    }).toStrictEqual({
      name: 'DetailedError',
      message: '404 ',
      statusCode: 404,
      detail: { data: { error: 'Not Found' }, statusText: '' },
      code: undefined,
      log: undefined,
    })
  })

  it('cached state after error: status=error, isError=true, error is DetailedError', async () => {
    const queryClient = makeClient()
    const opts = getUsersIdQueryOptions({ param: { id: '999' } })
    try {
      await queryClient.fetchQuery(opts)
    } catch {
      // expected
    }
    const state = queryClient.getQueryState(opts.queryKey)
    expect(state?.status).toBe('error')
    expect(state?.error).toBeInstanceOf(DetailedError)
    expect((state?.error as DetailedError).statusCode).toBe(404)
  })

  it('success path returns the user', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery(
      getUsersIdQueryOptions({ param: { id: '1' } }),
    )
    expect(data).toStrictEqual({ id: '1', name: 'Alice' })
  })
})

describe('usePostUsers (mutation) — generated mutationOptions', () => {
  it('mutationFn returns created user on success', async () => {
    const opts = getPostUsersMutationOptions()
    const result = await opts.mutationFn?.(
      { json: { name: 'Charlie' } },
      {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
    )
    expect(result).toStrictEqual({ id: '99', name: 'Charlie' })
  })

  it('mutationFn rejects with DetailedError on 400', async () => {
    const opts = getPostUsersMutationOptions()
    let captured: unknown = null
    try {
      await opts.mutationFn?.(
        { json: { name: '' } },
        {} as Parameters<NonNullable<typeof opts.mutationFn>>[1],
      )
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({
      name: e.name,
      statusCode: e.statusCode,
      detail: e.detail,
    }).toStrictEqual({
      name: 'DetailedError',
      statusCode: 400,
      detail: { data: { error: 'name is required' }, statusText: '' },
    })
  })

  it('MutationCache observes the error: state.status=error, state.error is DetailedError', async () => {
    const cache = new MutationCache()
    const queryClient = new QueryClient({
      mutationCache: cache,
      defaultOptions: { mutations: { retry: false } },
    })
    const opts = getPostUsersMutationOptions()
    let captured: unknown = null
    try {
      await queryClient.getMutationCache().build(queryClient, opts).execute({ json: { name: '' } })
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(DetailedError)
    const recorded = cache.getAll()[0]
    expect(recorded.state.status).toBe('error')
    expect(recorded.state.error).toBeInstanceOf(DetailedError)
    expect((recorded.state.error as DetailedError).statusCode).toBe(400)
  })
})

/**
 * `fetch(url).then(res => res.json())` style — equivalent to a queryFn that
 * does not check `res.ok`. This mirrors a common newcomer pattern and is
 * contrasted with the `parseResponse`-wrapped queryFn that the generator emits.
 *
 * Key takeaway:
 *   `fetch().then(r => r.json())` does NOT reject on 4xx/5xx. The query
 *   becomes `status=success` with the *error body* parked in `data`,
 *   and `isError` stays `false` — the failure is silently swallowed.
 *   `parseResponse` is what makes HTTP errors visible to TanStack Query.
 */
describe('contrast: `.then(res => res.json())` (no parseResponse)', () => {
  // Mirror of `fetch(url).then(res => res.json())` against the in-process Hono app.
  const rawJsonQueryFn = (id: string) => async () => {
    const res = await client.users[':id'].$get({ param: { id } })
    return res.json()
  }

  it('200 path: behaves the same — data is the user object, isError=false', async () => {
    const queryClient = makeClient()
    const data = await queryClient.fetchQuery({
      queryKey: ['raw', 'user', '1'],
      queryFn: rawJsonQueryFn('1'),
    })
    expect(data).toStrictEqual({ id: '1', name: 'Alice' })
    const state = queryClient.getQueryState(['raw', 'user', '1'])
    expect(state?.status).toBe('success')
    expect(state?.error).toBeNull()
  })

  it('404 path: query becomes SUCCESS with the error body as data — isError stays false', async () => {
    const queryClient = makeClient()
    // No throw because res.json() does not check res.ok.
    const data = await queryClient.fetchQuery({
      queryKey: ['raw', 'user', '999'],
      queryFn: rawJsonQueryFn('999'),
    })
    // The "data" is actually the server's error payload, but the query has
    // no way to know that — it looks like a successful fetch.
    expect(data).toStrictEqual({ error: 'Not Found' })
    const state = queryClient.getQueryState(['raw', 'user', '999'])
    expect(state?.status).toBe('success')
    expect(state?.error).toBeNull()
  })

  it('side-by-side: parseResponse → isError=true, raw .json() → isError=false (same 404)', async () => {
    const queryClient = makeClient()

    // parseResponse-wrapped (what the generator emits):
    const generatedOpts = getUsersIdQueryOptions({ param: { id: '999' } })
    let parseResponseError: unknown = null
    try {
      await queryClient.fetchQuery(generatedOpts)
    } catch (e) {
      parseResponseError = e
    }
    const generatedState = queryClient.getQueryState(generatedOpts.queryKey)

    // Raw .json() (the `fetch().then(r => r.json())` shape):
    await queryClient.fetchQuery({
      queryKey: ['raw', 'user', '999'],
      queryFn: rawJsonQueryFn('999'),
    })
    const rawState = queryClient.getQueryState(['raw', 'user', '999'])

    // Generated path correctly surfaces the failure
    expect(parseResponseError).toBeInstanceOf(DetailedError)
    expect(generatedState?.status).toBe('error')
    expect(generatedState?.error).toBeInstanceOf(DetailedError)

    // Raw path silently swallows it as "success"
    expect(rawState?.status).toBe('success')
    expect(rawState?.error).toBeNull()
    expect(rawState?.data).toStrictEqual({ error: 'Not Found' })
  })

  it('500 with plain-text body: res.json() DOES throw → isError=true (but only by accident)', async () => {
    const queryClient = makeClient()
    const queryFn = async () => {
      // biome-ignore lint/suspicious/noExplicitAny: untyped server endpoint
      const res = await (client as any)['error-text'].$get()
      return res.json() // SyntaxError: not JSON
    }
    let captured: unknown = null
    try {
      await queryClient.fetchQuery({ queryKey: ['raw', 'text-500'], queryFn })
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(Error)
    expect((captured as Error).name).toBe('SyntaxError') // not a "real" HTTP error class
    const state = queryClient.getQueryState(['raw', 'text-500'])
    expect(state?.status).toBe('error')
    // ↑ becomes error not because of 500, but because text is not JSON.
    // If the server had returned `{}` with a 500, isError would be FALSE.
  })

  it('to recover isError, you must throw manually inside queryFn', async () => {
    const queryClient = makeClient()
    const checkedQueryFn = async () => {
      const res = await client.users[':id'].$get({ param: { id: '999' } })
      if (!res.ok) throw new Error(`${res.status}`)
      return res.json()
    }
    let captured: unknown = null
    try {
      await queryClient.fetchQuery({
        queryKey: ['checked', 'user', '999'],
        queryFn: checkedQueryFn,
      })
    } catch (e) {
      captured = e
    }
    expect(captured).toBeInstanceOf(Error)
    const state = queryClient.getQueryState(['checked', 'user', '999'])
    expect(state?.status).toBe('error')
    expect((state?.error as Error).message).toBe('404')
    // Note: this is just `Error`, not `DetailedError` — the rich detail/data
    // payload is lost unless you replicate parseResponse's logic yourself.
  })
})
