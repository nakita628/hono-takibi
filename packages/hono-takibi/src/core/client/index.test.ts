import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { handlerGroupOf } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { runGenerator } from '../../testing/index.js'
import { client } from './index.js'

const ok = { '200': { description: 'OK' } }

// `/` and `/api/status` name no group: the root names nothing, and `api` is the name the
// generated app has taken. `/books` is tagged once, which only a grouping by tag looks at.
// `/` と `/api/status` はグループ名にならない。ルートパスは何も指さず、`api` は生成される
// アプリがすでに使っている名前である。`/books` には1つだけタグが付いており、これを見るのは
// タグによるグループ分けだけである。
const spec = {
  openapi: '3.1.0',
  info: { title: 'Library', version: '1.0.0' },
  paths: {
    '/': { get: { responses: ok } },
    '/books': { get: { tags: ['Library'], responses: ok }, post: { responses: ok } },
    '/books/{id}': { get: { responses: ok } },
    '/v2-public/ping': { get: { responses: ok } },
    '/api/status': { get: { responses: ok } },
  },
} as OpenAPI

// Every route belongs to a group.
// すべてのルートが、いずれかのグループに属する。
const grouped = {
  openapi: '3.1.0',
  info: { title: 'Library', version: '1.0.0' },
  paths: { '/books': { get: { responses: ok } }, '/items': { get: { responses: ok } } },
} as OpenAPI

function makeDir() {
  return fs.mkdtempSync(path.join(os.tmpdir(), 'client-'))
}

describe('client: the base URL', () => {
  // A URL written into the config is a literal.
  // 設定に書かれた URL は、リテラルになる。
  it('writes a URL into the file', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', 'http://localhost:3000', '/api', undefined))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('http://localhost:3000').api
`)
  })

  // The variable is read once, with "/" in its place when it is not set.
  // 変数は1回だけ読み取られ、未設定の場合は "/" が代わりに使われる。
  it('reads a variable from process.env', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(spec, file, './index', { env: 'API_URL', source: 'process.env' }, '/api', undefined),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

const baseUrl = process.env.API_URL ?? '/'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType(baseUrl).api
`)
  })

  // The same from what a bundler provides.
  // バンドラーが提供する環境からも、同様に読み取る。
  it('reads a variable from import.meta.env', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(
        spec,
        file,
        './index',
        { env: 'VITE_API_URL', source: 'import.meta.env' },
        '/',
        undefined,
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

const baseUrl = import.meta.env.VITE_API_URL ?? '/'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType(baseUrl)
`)
  })

  // The module answers for the value, so nothing stands in for it.
  // 値はモジュールが保証するため、代わりの値は置かれない。
  it('reads a property of an environment a module exports', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(
        spec,
        file,
        '@/index',
        { env: 'API_URL', import: '@/env', name: 'env' },
        '/api',
        undefined,
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from '@/index'
import { env } from '@/env'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType(env.API_URL).api
`)
  })

  // The name of the export is the one the config gives.
  // export の名前は、設定で指定されたものになる。
  it('imports the environment under the name it is exported by', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(
        spec,
        file,
        './index',
        { env: 'API_URL', import: '../config', name: 'config' },
        '/',
        undefined,
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'
import { config } from '../config'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType(config.API_URL)
`)
  })
})

describe('client: the base path', () => {
  // The type holds the paths of the document, so there is nothing to step into.
  // 型はドキュメントのパスをそのまま持つため、降りる階層がない。
  it('hands the client out as it is without a base path', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/', undefined))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/')
`)
  })

  // The type holds the base path, /api/v1, and the client is handed out from below it.
  // 型はベースパス /api/v1 を含み、クライアントはその下から渡される。
  it('steps into every segment of a base path', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api/v1', undefined))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/').api.v1
`)
  })

  // my-api cannot follow a dot.
  // my-api は、ドットの後ろに書けない。
  it('steps into a segment that is no identifier by its name', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/my-api', undefined))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/')['my-api']
`)
  })
})

describe('client: the groups of a split application', () => {
  // books and v2Public are groups; the root and /api/status belong to none, and are the routes of client.
  // books と v2Public はグループである。ルートパスと /api/status はどのグループにも属さず、client のルートになる。
  it('writes a client for each group, in the order of the document', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api', (route) => handlerGroupOf(route)))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api, books, v2Public } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/').api

type BooksClient = ReturnType<typeof hc<typeof books>>

const hcBooksWithType = (...args: Parameters<typeof hc>): BooksClient => hc<typeof books>(...args)

export const booksClient = hcBooksWithType('/').api

type V2PublicClient = ReturnType<typeof hc<typeof v2Public>>

const hcV2PublicWithType = (...args: Parameters<typeof hc>): V2PublicClient =>
  hc<typeof v2Public>(...args)

export const v2PublicClient = hcV2PublicWithType('/').api
`)
  })

  // GET /books is tagged Library, so it is a route of library; the rest of /books has no tag and goes by its path.
  // GET /books には Library タグが付いているため、library のルートになる。/books の残りはタグがなく、パスで決まる。
  it('groups by the first tag where the grouping looks at tags', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api', handlerGroupOf))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api, library, books, v2Public } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/').api

type LibraryClient = ReturnType<typeof hc<typeof library>>

const hcLibraryWithType = (...args: Parameters<typeof hc>): LibraryClient =>
  hc<typeof library>(...args)

export const libraryClient = hcLibraryWithType('/').api

type BooksClient = ReturnType<typeof hc<typeof books>>

const hcBooksWithType = (...args: Parameters<typeof hc>): BooksClient => hc<typeof books>(...args)

export const booksClient = hcBooksWithType('/').api

type V2PublicClient = ReturnType<typeof hc<typeof v2Public>>

const hcV2PublicWithType = (...args: Parameters<typeof hc>): V2PublicClient =>
  hc<typeof v2Public>(...args)

export const v2PublicClient = hcV2PublicWithType('/').api
`)
  })

  // There is no route for client to reach.
  // client が到達するルートが存在しない。
  it('writes no client for the rest when every route belongs to a group', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(grouped, file, './index', '/', '/', (route) => handlerGroupOf(route)))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { books, items } from './index'

type BooksClient = ReturnType<typeof hc<typeof books>>

const hcBooksWithType = (...args: Parameters<typeof hc>): BooksClient => hc<typeof books>(...args)

export const booksClient = hcBooksWithType('/')

type ItemsClient = ReturnType<typeof hc<typeof items>>

const hcItemsWithType = (...args: Parameters<typeof hc>): ItemsClient => hc<typeof items>(...args)

export const itemsClient = hcItemsWithType('/')
`)
  })
})

describe('client: the barrel beside it', () => {
  // The client is re-exported by the index.ts beside it.
  // クライアントは、隣の index.ts から再 export される。
  it('writes a barrel that re-exports the client', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'client.ts')
    const barrel = path.join(dir, 'index.ts')
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    expect(fs.readFileSync(barrel, 'utf8')).toBe("export * from './client'\n")
  })

  // The file is named after the client, whatever the client is called.
  // ファイル名がどうであれ、バレルはクライアントのファイル名を参照する。
  it('names the file the client is written to', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'http.ts')
    const barrel = path.join(dir, 'index.ts')
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    expect(fs.readFileSync(barrel, 'utf8')).toBe("export * from './http'\n")
  })

  // Generating again leaves the barrel as it is.
  // 再生成しても、バレルはそのままである。
  it('does not add the export a second time', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'client.ts')
    const barrel = path.join(dir, 'index.ts')
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    expect(fs.readFileSync(barrel, 'utf8')).toBe("export * from './client'\n")
  })

  // What the barrel exports already is kept.
  // バレルがすでに export しているものは、そのまま残る。
  it('adds the export to a barrel that is there already', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'client.ts')
    const barrel = path.join(dir, 'index.ts')
    fs.writeFileSync(barrel, "export * from './mine'\n")
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    expect(fs.readFileSync(barrel, 'utf8')).toBe(
      "export * from './mine'\nexport * from './client'\n",
    )
  })

  // The export is recognised however it is quoted and ended.
  // export は、引用符や行末の書き方にかかわらず認識される。
  it('recognises the export written with double quotes and a semicolon', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'client.ts')
    const barrel = path.join(dir, 'index.ts')
    fs.writeFileSync(barrel, 'export * from "./client";\n')
    await runGenerator(client(grouped, file, '../index', '/', '/', undefined, barrel))
    expect(fs.readFileSync(barrel, 'utf8')).toBe('export * from "./client";\n')
  })

  // Without a barrel to write, the directory holds the client alone.
  // 書き出すバレルがなければ、ディレクトリにはクライアントだけが置かれる。
  it('writes no barrel when none is asked for', async () => {
    const dir = makeDir()
    const file = path.join(dir, 'client.ts')
    await runGenerator(client(grouped, file, './index', '/', '/', undefined))
    expect(fs.readdirSync(dir)).toStrictEqual(['client.ts'])
  })
})

describe('client: a document without paths', () => {
  // There is nothing to type a client by.
  // クライアントを型付けするものがない。
  it('fails when the document has no paths', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await expect(
      runGenerator(client({ openapi: '3.1.0' } as OpenAPI, file, './index', '/', '/', undefined)),
    ).rejects.toThrow('Invalid OpenAPI paths')
  })
})
