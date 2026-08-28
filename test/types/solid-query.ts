// solid-query: the hook's generics must reach the caller, not degrade to `any` or the library default.
import { createPostUsers, createUsers } from '../__generated__/solid-query/hooks'
import { assertType, type NotAny } from './assert'

type ApiError = { readonly code: number }
type Rollback = { readonly prev: readonly string[] }

export function assertions() {
  const query = createUsers<{ id: string; name: string }[], ApiError>()
  assertType<NotAny<typeof query.data>>(true)
  assertType<NotAny<typeof query.error>>(true)

  const mutation = createPostUsers<ApiError, Rollback>(() => ({
    mutation: {
      onMutate: () => ({ prev: [] as readonly string[] }),
      // TOnMutateResult must survive to onError, otherwise `result` is `unknown`.
      onError: (_error, _variables, result) => result?.prev,
    },
  }))
  assertType<NotAny<typeof mutation.error>>(true)
  // TError must be the caller's type, not the library default (`Error`).
  const mutationError: ApiError | null = mutation.error
  const rows: { id: string; name: string }[] | undefined = query.data
  return { query, mutation, mutationError, rows }
}
