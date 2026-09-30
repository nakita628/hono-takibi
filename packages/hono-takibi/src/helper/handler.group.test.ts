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

  // The root names nothing.
  // ルートパスは、何も指さない。
  it.concurrent('is undefined for the root', () => {
    expect(handlerGroupOf('/')).toBeUndefined()
  })

  // /api/status would be exported as api.
  // /api/status は、api として export されてしまう。
  it.concurrent('is undefined for a segment the generated app has taken', () => {
    expect(handlerGroupOf('/api/status')).toBeUndefined()
    expect(handlerGroupOf('/client/me')).toBeUndefined()
  })

  // /delete cannot be declared.
  // /delete は、変数として宣言できない。
  it.concurrent('is undefined for a segment that is a word of the language', () => {
    expect(handlerGroupOf('/delete')).toBeUndefined()
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

  // A tag API would be exported as api.
  // API というタグは、api として export されてしまう。
  it.concurrent('is undefined for a tag the generated app has taken', () => {
    expect(handlerGroupOf('/status', ['API'])).toBeUndefined()
  })
})
