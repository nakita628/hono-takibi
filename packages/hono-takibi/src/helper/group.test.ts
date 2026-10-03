import { describe, expect, it } from 'vite-plus/test'

import { groupClientName, isGroupName, operationTags } from './group.js'

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

  // api is the export that holds the routes of no group.
  // api は、どのグループにも属さないルートを持つ export である。
  it.concurrent('is false for api', () => {
    expect(isGroupName('api')).toBe(false)
  })

  // app is the variable the routes are registered on.
  // app は、ルートが登録される変数である。
  it.concurrent('is false for app', () => {
    expect(isGroupName('app')).toBe(false)
  })

  // Its client would be clientClient, beside the client of the rest.
  // そのクライアントは clientClient となり、残りのルート用の client と紛らわしい。
  it.concurrent('is false for client', () => {
    expect(isGroupName('client')).toBe(false)
  })

  // delete and class cannot be declared.
  // delete や class は、変数として宣言できない。
  it.concurrent('is false for a word of the language', () => {
    expect(isGroupName('delete')).toBe(false)
    expect(isGroupName('class')).toBe(false)
  })

  // __root is the file the routes of / are written to, and names no group.
  // __root は / のルートが書き出されるファイルであり、グループ名にはならない。
  it.concurrent('is false for the handler file of the root', () => {
    expect(isGroupName('__root')).toBe(false)
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

describe('groupClientName', () => {
  // books is reached through booksClient.
  // books には、booksClient を通して到達する。
  it.concurrent('is the name of the group followed by Client', () => {
    expect(groupClientName('books')).toBe('booksClient')
    expect(groupClientName('v2Public')).toBe('v2PublicClient')
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
