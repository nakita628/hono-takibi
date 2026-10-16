// type-ref: a component schema the declaration file names once has to reach the client as the
// schema itself — shared by two properties, referring to itself, or to another that refers back.
// type-ref: 宣言ファイルが一度だけ名前を付けたコンポーネントスキーマは、クライアントからも
// そのスキーマそのものとして見えなければならない。2つのプロパティで共有されていても、
// 自分自身を参照していても、互いに参照し合っていても同じである。
import type { InferRequestType, InferResponseType } from 'hono/client'
import { hc } from 'hono/client'

import type routes from '../__generated__/type-ref/type'
import { type Equal, type IsAssignable, type NotAny, assertType } from './assert'

const client = hc<typeof routes>('http://localhost')

type Address = { street: string; city?: string | undefined }

/** `User` refers to `Address` twice and to itself. */
type User = {
  id: string
  home: Address
  billing?: Address | undefined
  manager?: User | undefined
}

/** `Node` holds an array of itself. */
type Node = { value: string; children?: Node[] | undefined }

/** `Left` and `Right` refer to each other. */
type Left = { name: string; right?: Right | undefined }
type Right = { name: string; left?: Left | undefined }

export function assertions() {
  type UserOut = InferResponseType<(typeof client.users)[':id']['$get']>
  assertType<NotAny<UserOut>>(true)
  assertType<Equal<UserOut, User>>(true)

  // The request body of the same schema is the same type, not a second copy of it.
  type UserIn = InferRequestType<(typeof client.users)[':id']['$put']>['json']
  assertType<Equal<UserIn, User>>(true)

  type NodeOut = InferResponseType<typeof client.tree.$get>
  assertType<NotAny<NodeOut>>(true)
  assertType<Equal<NodeOut, Node>>(true)
  // A recursive schema is not cut off at any depth.
  // 再帰的なスキーマは、どの深さでも打ち切られない。
  assertType<IsAssignable<NodeOut['children'], Node[] | undefined>>(true)

  type LeftOut = InferResponseType<typeof client.pair.$get>
  assertType<NotAny<LeftOut>>(true)
  assertType<Equal<LeftOut, Left>>(true)

  type ShapeOut = InferResponseType<typeof client.shape.$get>
  assertType<
    Equal<ShapeOut, { kind: 'circle'; radius: number } | { kind: 'square'; side: number }>
  >(true)

  // A schema named `File` does not take the place of the global `File` a binary string is.
  // `File` という名前のスキーマが、バイナリ文字列の型であるグローバルの `File` を奪うことはない。
  type ProfileOut = InferResponseType<typeof client.upload.$post>
  assertType<NotAny<ProfileOut>>(true)
  assertType<IsAssignable<ProfileOut['user'], User>>(true)
  assertType<
    Equal<NonNullable<ProfileOut['files']>[number], { data: File; label?: string | undefined }>
  >(true)
}
