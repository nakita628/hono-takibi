import { DetailedError } from 'hono/client'
import { describe, expect, it } from 'vitest'

import { deleteUsersId, getUsers, getUsersId, postUsers } from '../__generated__/rpc/rpc'

describe('generated rpc with parseResponse', () => {
  it('resolves with the parsed JSON body on 200', async () => {
    expect(await getUsers()).toStrictEqual([
      { id: '1', name: 'Alice' },
      { id: '2', name: 'Bob' },
    ])
  })

  it('rejects with DetailedError carrying the full error contract on 404', async () => {
    const captured = await getUsersId({ param: { id: '999' }, header: {} }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({
      name: e.name,
      statusCode: e.statusCode,
      detail: e.detail,
      code: e.code,
      log: e.log,
    }).toStrictEqual({
      name: 'DetailedError',
      statusCode: 404,
      detail: { data: { error: 'Not Found' }, statusText: '' },
      code: undefined,
      log: undefined,
    })
  })

  it('resolves with the created resource on 201', async () => {
    expect(await postUsers({ json: { name: 'Charlie' } })).toStrictEqual({
      id: '99',
      name: 'Charlie',
    })
  })

  it('rejects with DetailedError on 400', async () => {
    const captured = await postUsers({ json: { name: '' } }).then(
      () => null,
      (e: unknown) => e,
    )
    expect(captured).toBeInstanceOf(DetailedError)
    const e = captured as DetailedError
    expect({ statusCode: e.statusCode, detail: e.detail }).toStrictEqual({
      statusCode: 400,
      detail: { data: { error: 'name is required' }, statusText: '' },
    })
  })

  it('resolves with undefined on 204 No Content', async () => {
    expect(await deleteUsersId({ param: { id: '1' } })).toBeUndefined()
  })
})
