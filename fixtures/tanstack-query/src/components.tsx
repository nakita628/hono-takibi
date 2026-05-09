import { useQuery } from '@tanstack/react-query'
import type { DetailedError } from 'hono/client'
import { useState } from 'react'
import { client } from './client'
import { useUsers, useUsersId, usePostUsers } from './generated-query'

export function UsersList() {
  const { data, isPending, isError, error } = useUsers()
  if (isPending) return <p data-testid="users-status">loading</p>
  if (isError) {
    const detailed = error as DetailedError
    return (
      <div data-testid="users-status">
        <span>error</span>
        <span data-testid="users-error-status">{detailed.statusCode}</span>
      </div>
    )
  }
  return (
    <ul data-testid="users-list">
      {data.map((u) => (
        <li key={u.id} data-testid={`user-${u.id}`}>
          {u.name}
        </li>
      ))}
    </ul>
  )
}

export function UserDetail({ id }: { id: string }) {
  const { data, isPending, isError, error } = useUsersId({ param: { id } })
  if (isPending) return <p data-testid="user-status">loading</p>
  if (isError) {
    const detailed = error as DetailedError
    return (
      <div data-testid="user-status">
        <span>error</span>
        <span data-testid="user-error-status">{detailed.statusCode}</span>
        <span data-testid="user-error-detail">
          {JSON.stringify(detailed.detail?.data)}
        </span>
      </div>
    )
  }
  return <p data-testid={`user-${data.id}`}>{data.name}</p>
}

/**
 * Anti-pattern demonstration: `fetch(...).then(res => res.json())` style.
 * `res.json()` does NOT check `res.ok`, so the queryFn never throws on 4xx/5xx.
 * TanStack Query treats it as success — `isError` stays false, `error` stays null,
 * and the server's *error body* gets parked in `data`.
 */
export function UserDetailRaw({ id }: { id: string }) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['raw', 'user', id],
    // Mirror of `fetch('/api/users/' + id).then(res => res.json())`.
    queryFn: async () => {
      const res = await client.users[':id'].$get({ param: { id } })
      return res.json()
    },
  })
  if (isPending) return <p data-testid="raw-status">loading</p>
  return (
    <div>
      <span data-testid="raw-status">{isError ? 'error' : 'success'}</span>
      <span data-testid="raw-error-null">{error === null ? 'error-is-null' : 'has-error'}</span>
      <span data-testid="raw-data">{JSON.stringify(data)}</span>
    </div>
  )
}

/**
 * Side-by-side rendering of the same id through both query strategies.
 * Useful for demonstrating divergent UI behavior on identical responses.
 */
export function UserDetailContrast({ id }: { id: string }) {
  return (
    <div>
      <section data-testid="contrast-wrapped">
        <UserDetail id={id} />
      </section>
      <section data-testid="contrast-raw">
        <UserDetailRaw id={id} />
      </section>
    </div>
  )
}

export function CreateUser() {
  const [name, setName] = useState('')
  const mutation = usePostUsers()
  return (
    <div>
      <input
        data-testid="new-user-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        type="button"
        data-testid="submit"
        onClick={() => mutation.mutate({ json: { name } })}
      >
        create
      </button>
      {mutation.isPending && <span data-testid="mutation-status">pending</span>}
      {mutation.isSuccess && (
        <span data-testid="mutation-status">success:{mutation.data.name}</span>
      )}
      {mutation.isError && (
        <span data-testid="mutation-status">
          error:{(mutation.error as DetailedError).statusCode}
        </span>
      )}
    </div>
  )
}
