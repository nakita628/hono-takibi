import { describe, expect, it } from 'vite-plus/test'

import { handlerGroupOf } from './handler.js'

describe('handlerGroupOf', () => {
  // /books names books.
  // /books は books を指す。
  it.concurrent('is the first segment of the path', () => {
    expect(handlerGroupOf('/books')).toBe('books')
  })

  // A share of an item is an item.
  // item の share は、item に属する。
  it.concurrent('is the first segment, however deep the path', () => {
    expect(handlerGroupOf('/items/{id}/shares')).toBe('items')
  })

  // The name a handler file of the segment takes.
  // そのセグメントのハンドラーファイルが取る名前になる。
  it.concurrent('is the camel-case name of a segment that is no identifier', () => {
    expect(handlerGroupOf('/v2-public/ping')).toBe('v2Public')
    expect(handlerGroupOf('/user.profile/me')).toBe('userProfile')
  })

  // The root goes by its handler file, __root, which no resource can be named.
  // ルートはハンドラーファイルと同じ __root になる。資源にはこの名前を付けられない。
  it.concurrent('is __root for the root', () => {
    expect(handlerGroupOf('/')).toBe('__root')
  })

  // /api/status is the group api: the entry then names the routes of no group api_.
  // /api/status は api グループになる。その場合、どのグループにも属さないルートは api_ になる。
  it.concurrent('is api for /api', () => {
    expect(handlerGroupOf('/api/status')).toBe('api')
  })

  // /client is a group of its own: its typed client is clientClient.
  // /client は独立したグループである。その型付きクライアントは clientClient になる。
  it.concurrent('is client for /client', () => {
    expect(handlerGroupOf('/client/me')).toBe('client')
  })

  // /delete cannot be declared, and is prefixed like the root.
  // /delete は変数として宣言できないため、ルートと同じ接頭辞が付く。
  it.concurrent('is __delete for a segment that is a word of the language', () => {
    expect(handlerGroupOf('/delete')).toBe('__delete')
  })

  // A handler file goes by the first tag.
  // ハンドラーファイルは、最初のタグで決まる。
  it.concurrent('is the first tag when the operation has one', () => {
    expect(handlerGroupOf('/books', ['Library'])).toBe('library')
  })

  // The tags after the first say nothing of the file.
  // 2つ目以降のタグは、ファイルの決定に関与しない。
  it.concurrent('is the first of several tags', () => {
    expect(handlerGroupOf('/books', ['user profile', 'admin'])).toBe('userProfile')
  })

  // An empty list names no tag.
  // 空のリストは、タグを指定していない。
  it.concurrent('is the first segment when the list of tags is empty', () => {
    expect(handlerGroupOf('/books', [])).toBe('books')
  })

  // A tag API is the group api, like the segment.
  // API というタグは、セグメントと同じく api グループになる。
  it.concurrent('is api for a tag API', () => {
    expect(handlerGroupOf('/status', ['API'])).toBe('api')
  })
})
