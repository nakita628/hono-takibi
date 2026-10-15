import { describe, expect, it } from 'vite-plus/test'

import {
  entryNames,
  freeName,
  makeGroupClientName,
  groupNameOf,
  isGroupName,
  operationTags,
} from './group.js'

describe('isGroupName', () => {
  // A group is exported under its name.
  // グループは、その名前で export される。
  it.concurrent('is true for an identifier', () => {
    expect(isGroupName('books')).toBe(true)
  })

  // The name a handler file of /v2-public takes.
  // /v2-public のハンドラーファイルが取る名前。
  it.concurrent('is true for a camel-case name', () => {
    expect(isGroupName('v2Public')).toBe(true)
  })

  // Both may start an identifier.
  // どちらも、識別子の先頭に使える。
  it.concurrent('is true for a name that starts with a dollar sign or an underscore', () => {
    expect(isGroupName('$internal')).toBe(true)
    expect(isGroupName('_internal')).toBe(true)
  })

  // api is the export that holds the routes of no group: a group of that name joins them.
  // api は、どのグループにも属さないルートを持つ export であり、その名のグループはそこに加わる。
  it.concurrent('is true for api', () => {
    expect(isGroupName('api')).toBe(true)
  })

  // The variable the routes are registered on yields its name to the group, and is app_.
  // ルートが登録される変数は、その名前をグループに譲って app_ になる。
  it.concurrent('is true for app', () => {
    expect(isGroupName('app')).toBe(true)
  })

  // /client is a group like any other: it is exported as client, and its typed client is
  // clientClient, beside the client of the rest.
  // /client も他と同じグループである。client として export され、その型付きクライアントは
  // clientClient となり、残りのルート用の client と並ぶ。
  it.concurrent('is true for client', () => {
    expect(isGroupName('client')).toBe(true)
  })

  // delete and class cannot be declared.
  // delete や class は、変数として宣言できない。
  it.concurrent('is false for a word of the language', () => {
    expect(isGroupName('delete')).toBe(false)
    expect(isGroupName('class')).toBe(false)
  })

  // A module is strict, where package and interface are words too, and arguments and eval
  // cannot be bound.
  // モジュールは strict であり、そこでは package や interface も予約語で、arguments と eval は
  // 束縛できない。
  it.concurrent('is false for a word of strict mode', () => {
    expect(isGroupName('package')).toBe(false)
    expect(isGroupName('interface')).toBe(false)
    expect(isGroupName('arguments')).toBe(false)
    expect(isGroupName('eval')).toBe(false)
  })

  // __root is the file the routes of / are written to, and the group of them.
  // __root は / のルートが書き出されるファイルであり、そのグループでもある。
  it.concurrent('is true for the handler file of the root', () => {
    expect(isGroupName('__root')).toBe(true)
  })

  // The app entry imports getBooksRoute and booksHandler under these names.
  // アプリのエントリは、getBooksRoute や booksHandler をこの名前で import する。
  it.concurrent('is false for a name a route or a handler is exported under', () => {
    expect(isGroupName('getBooksRoute')).toBe(false)
    expect(isGroupName('booksHandler')).toBe(false)
  })

  // A digit cannot start an identifier.
  // 数字は、識別子の先頭に使えない。
  it.concurrent('is false for a name that starts with a digit', () => {
    expect(isGroupName('2fa')).toBe(false)
  })

  // A hyphen is no part of an identifier.
  // ハイフンは、識別子に使えない。
  it.concurrent('is false for a name with a hyphen', () => {
    expect(isGroupName('v2-public')).toBe(false)
  })

  // There is no name to export under.
  // export に使う名前がない。
  it.concurrent('is false for the empty string and for undefined', () => {
    expect(isGroupName('')).toBe(false)
    expect(isGroupName(undefined)).toBe(false)
  })
})

describe('freeName', () => {
  // Nothing has the name, so it is kept.
  // その名前は使われていないので、そのまま使う。
  it.concurrent('is the base when nothing has taken it', () => {
    expect(freeName('app', ['books'])).toBe('app')
  })

  // A number from 2 on, the first that no one has.
  // 2 から数えて、誰も使っていない最初の数字を付ける。
  it.concurrent('counts up until the name is free', () => {
    expect(freeName('app', ['app'])).toBe('app2')
    expect(freeName('app', ['app', 'app2'])).toBe('app3')
  })
})

describe('makeGroupClientName', () => {
  // books is reached through booksClient.
  // books には、booksClient を通して到達する。
  it.concurrent('is the name of the group followed by Client', () => {
    expect(makeGroupClientName('books')).toBe('booksClient')
    expect(makeGroupClientName('v2Public')).toBe('v2PublicClient')
  })
})

describe('operationTags', () => {
  // The tags a Grouping reads to place an operation.
  // Grouping が operation の配置を決めるために読む tags。
  it.concurrent('is the tags of the operation', () => {
    expect(operationTags({ tags: ['books', 'admin'] })).toStrictEqual(['books', 'admin'])
  })

  // An operation without tags gives a Grouping nothing to read.
  // tags のない operation では、Grouping が読むものはない。
  it.concurrent('is undefined when the operation has no tags', () => {
    expect(operationTags({ responses: {} })).toBe(undefined)
  })

  // tags that is not an array is not read as tags.
  // 配列でない tags は、tags として読まない。
  it.concurrent('is undefined when tags is not an array', () => {
    expect(operationTags({ tags: 'books' })).toBe(undefined)
  })

  // Only strings can name a group.
  // グループの名前になれるのは文字列だけである。
  it.concurrent('keeps only the string tags', () => {
    expect(operationTags({ tags: ['books', 1, null, 'admin'] })).toStrictEqual(['books', 'admin'])
  })
})

describe('entryNames', () => {
  // The entry binds app and OpenAPIHono when no group has them.
  // どのグループにも取られていなければ、エントリは app と OpenAPIHono を束縛する。
  it.concurrent('is app and OpenAPIHono beside other groups', () => {
    expect(entryNames(['books', 'api', '__root'])).toStrictEqual({
      app: 'app',
      hono: 'OpenAPIHono',
    })
  })

  // A group keeps its name; the entry's binding counts up.
  // グループは自分の名前を保ち、エントリ側の束縛が数字を足す。
  it.concurrent('yields each name to a group of it', () => {
    expect(entryNames(['app', 'OpenAPIHono'])).toStrictEqual({ app: 'app2', hono: 'OpenAPIHono2' })
  })
})

describe('groupNameOf', () => {
  // A file that can be an export is a group under its name.
  // export にできるファイルは、その名前のグループになる。
  it.concurrent('is the name of a file that can be an export', () => {
    expect(groupNameOf('books')).toBe('books')
    expect(groupNameOf('api')).toBe('api')
    expect(groupNameOf('client')).toBe('client')
  })

  // The file of the root is its own group; a word of the language is prefixed the same way.
  // ルートのファイルはそのままグループになる。言語の予約語には同じ接頭辞が付く。
  it.concurrent('is __root for the root and __delete for a word of the language', () => {
    expect(groupNameOf('__root')).toBe('__root')
    expect(groupNameOf('delete')).toBe('__delete')
  })
})
