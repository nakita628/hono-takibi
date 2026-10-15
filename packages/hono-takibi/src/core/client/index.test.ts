import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

import { handlerGroupOf } from '../../helper/index.js'
import type { OpenAPI } from '../../openapi/index.js'
import { runGenerator } from '../../testing/index.js'
import { client } from './index.js'

const ok = { '200': { description: 'OK' } }

// `/` is the group `__root`, and `/api/status` the group `api`. `/books` is tagged once,
// which only a grouping by tag looks at.
// `/` は `__root` グループ、`/api/status` は `api` グループになる。`/books` には1つだけタグが
// 付いており、これを見るのはタグによるグループ分けだけである。
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

  // The variable is read once and asserted present: no fallback stands in for it.
  // 変数は1回だけ読み取られ、存在するものとして扱われる。代わりの値はない。
  it('reads a variable from process.env', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(spec, file, './index', { env: 'API_URL', source: 'process.env' }, '/api', undefined),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

const baseUrl = process.env.API_URL!

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

const baseUrl = import.meta.env.VITE_API_URL!

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
  // __root, books, v2Public and api are groups, each with a client of its own.
  // __root、books、v2Public、api はグループであり、それぞれ自身のクライアントを持つ。
  it('writes a client for each group, in the order of the document', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api', (route) => handlerGroupOf(route)))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { __root, books, v2Public, api } from './index'

type __RootClient = ReturnType<typeof hc<typeof __root>>

const hc__RootWithType = (...args: Parameters<typeof hc>): __RootClient =>
  hc<typeof __root>(...args)

export const __rootClient = hc__RootWithType('/').api

type BooksClient = ReturnType<typeof hc<typeof books>>

const hcBooksWithType = (...args: Parameters<typeof hc>): BooksClient => hc<typeof books>(...args)

export const booksClient = hcBooksWithType('/').api

type V2PublicClient = ReturnType<typeof hc<typeof v2Public>>

const hcV2PublicWithType = (...args: Parameters<typeof hc>): V2PublicClient =>
  hc<typeof v2Public>(...args)

export const v2PublicClient = hcV2PublicWithType('/').api

type ApiClient = ReturnType<typeof hc<typeof api>>

const hcApiWithType = (...args: Parameters<typeof hc>): ApiClient => hc<typeof api>(...args)

export const apiClient = hcApiWithType('/').api
`)
  })

  // GET /books is tagged Library, so it is a route of library; the rest of /books has no tag and goes by its path.
  // GET /books には Library タグが付いているため、library のルートになる。/books の残りはタグがなく、パスで決まる。
  it('groups by the first tag where the grouping looks at tags', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api', handlerGroupOf))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { __root, library, books, v2Public, api } from './index'

type __RootClient = ReturnType<typeof hc<typeof __root>>

const hc__RootWithType = (...args: Parameters<typeof hc>): __RootClient =>
  hc<typeof __root>(...args)

export const __rootClient = hc__RootWithType('/').api

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

type ApiClient = ReturnType<typeof hc<typeof api>>

const hcApiWithType = (...args: Parameters<typeof hc>): ApiClient => hc<typeof api>(...args)

export const apiClient = hcApiWithType('/').api
`)
  })

  // The group client is exported as client and its client is clientClient.
  // client グループは client として export され、そのクライアントは clientClient になる。
  it('writes clientClient for the group client', async () => {
    const file = path.join(makeDir(), 'client.ts')
    const studio = {
      openapi: '3.1.0',
      info: { title: 'Studio', version: '1.0.0' },
      paths: { '/client': { get: { responses: ok } }, '/db': { get: { responses: ok } } },
    } as OpenAPI
    await runGenerator(
      client(studio, file, './index', '/', '/api', (route) => handlerGroupOf(route)),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { client, db } from './index'

type ClientClient = ReturnType<typeof hc<typeof client>>

const hcClientWithType = (...args: Parameters<typeof hc>): ClientClient =>
  hc<typeof client>(...args)

export const clientClient = hcClientWithType('/').api

type DbClient = ReturnType<typeof hc<typeof db>>

const hcDbWithType = (...args: Parameters<typeof hc>): DbClient => hc<typeof db>(...args)

export const dbClient = hcDbWithType('/').api
`)
  })

  // There is no client of the rest to take the name: beside __root, client is a group like any
  // other, and its app is imported under its own name.
  // 名前を奪う受け皿用のクライアントはない。__root の隣でも client は他と同じグループであり、
  // そのアプリは自身の名前で import される。
  it('imports the group client under its name beside __root', async () => {
    const file = path.join(makeDir(), 'client.ts')
    const studio = {
      openapi: '3.1.0',
      info: { title: 'Studio', version: '1.0.0' },
      paths: { '/': { get: { responses: ok } }, '/client': { get: { responses: ok } } },
    } as OpenAPI
    await runGenerator(client(studio, file, './index', '/', '/', (route) => handlerGroupOf(route)))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { __root, client } from './index'

type __RootClient = ReturnType<typeof hc<typeof __root>>

const hc__RootWithType = (...args: Parameters<typeof hc>): __RootClient =>
  hc<typeof __root>(...args)

export const __rootClient = hc__RootWithType('/')

type ClientClient = ReturnType<typeof hc<typeof client>>

const hcClientWithType = (...args: Parameters<typeof hc>): ClientClient =>
  hc<typeof client>(...args)

export const clientClient = hcClientWithType('/')
`)
  })

  // The file imports hc from hono/client, so the app of the group hc is imported as hcApp.
  // このファイルは hono/client から hc を import するので、グループ hc のアプリは hcApp として
  // import される。
  it('imports the group hc as hcApp beside the hc of hono', async () => {
    const file = path.join(makeDir(), 'client.ts')
    const hcSpec = {
      openapi: '3.1.0',
      info: { title: 'Hc', version: '1.0.0' },
      paths: { '/hc': { get: { responses: ok } } },
    } as OpenAPI
    await runGenerator(client(hcSpec, file, './index', '/', '/', (route) => handlerGroupOf(route)))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { hc as hcApp } from './index'

type HcClient = ReturnType<typeof hc<typeof hcApp>>

const hcHcWithType = (...args: Parameters<typeof hc>): HcClient => hc<typeof hcApp>(...args)

export const hcClient = hcHcWithType('/')
`)
  })

  // The shape of a studio API: every route is tagged after its first segment, one of which
  // is client, under the base path /api. The group client keeps its name, its client is
  // clientClient, and no client is written for the rest, which has no route.
  // スタジオ API の形。すべてのルートが先頭セグメントと同名のタグを持ち、その1つが client
  // で、ベースパスは /api である。client グループはその名前を保ち、そのクライアントは
  // clientClient になる。残りのルートはないので、そのクライアントは書かれない。
  it('writes clientClient beside the other groups of a studio API', async () => {
    const file = path.join(makeDir(), 'client.ts')
    const studio = {
      openapi: '3.1.0',
      info: { title: 'Studio', version: '1.0.0' },
      paths: {
        '/schema': { get: { tags: ['schema'], responses: ok } },
        '/db/counts': { get: { tags: ['db'], responses: ok } },
        '/client': { get: { tags: ['client'], responses: ok } },
        '/client/run': { post: { tags: ['client'], responses: ok } },
      },
    } as OpenAPI
    await runGenerator(
      client(studio, file, '../../server/index', '/', '/api', (route) => handlerGroupOf(route)),
    )
    const code = fs.readFileSync(file, 'utf8')
    expect(code).toBe(`import { hc } from 'hono/client'
import type { schema, db, client } from '../../server/index'

type SchemaClient = ReturnType<typeof hc<typeof schema>>

const hcSchemaWithType = (...args: Parameters<typeof hc>): SchemaClient =>
  hc<typeof schema>(...args)

export const schemaClient = hcSchemaWithType('/').api

type DbClient = ReturnType<typeof hc<typeof db>>

const hcDbWithType = (...args: Parameters<typeof hc>): DbClient => hc<typeof db>(...args)

export const dbClient = hcDbWithType('/').api

type ClientClient = ReturnType<typeof hc<typeof client>>

const hcClientWithType = (...args: Parameters<typeof hc>): ClientClient =>
  hc<typeof client>(...args)

export const clientClient = hcClientWithType('/').api
`)
  })

  // There is no route of __root, so there is no __rootClient.
  // __root のルートはないので、__rootClient もない。
  it('writes no __rootClient when no route belongs to __root', async () => {
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

describe('client: the credentials', () => {
  // `credentials` is the one `init` the file writes: the cookies go with every request,
  // to any origin, as the cookies guide of Hono has it.
  // `credentials` は、ファイルが書く唯一の `init` である。Hono の cookies ガイドの通り、
  // クッキーはどのオリジンへのリクエストにも付く。
  it('writes credentials as the init of hc', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(client(spec, file, './index', '/', '/api', undefined, undefined, 'include'))
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType('/', { init: { credentials: 'include' } }).api
`)
  })

  // The base URL from the environment and the credentials stand side by side.
  // 環境から読むベース URL と credentials は、並んで書かれる。
  it('writes credentials after a base URL read from the environment', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(
        spec,
        file,
        './index',
        { env: 'VITE_API_URL', source: 'import.meta.env' },
        '/',
        undefined,
        undefined,
        'same-origin',
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { api } from './index'

const baseUrl = import.meta.env.VITE_API_URL!

type Client = ReturnType<typeof hc<typeof api>>

const hcWithType = (...args: Parameters<typeof hc>): Client => hc<typeof api>(...args)

export const client = hcWithType(baseUrl, { init: { credentials: 'same-origin' } })
`)
  })

  // Every client of a split application is created with the same credentials.
  // 分割されたアプリケーションのすべてのクライアントが、同じ credentials で作られる。
  it('creates the client of every group with the credentials', async () => {
    const file = path.join(makeDir(), 'client.ts')
    await runGenerator(
      client(
        grouped,
        file,
        './index',
        '/',
        '/',
        (route) => handlerGroupOf(route),
        undefined,
        'omit',
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe(`import { hc } from 'hono/client'
import type { books, items } from './index'

type BooksClient = ReturnType<typeof hc<typeof books>>

const hcBooksWithType = (...args: Parameters<typeof hc>): BooksClient => hc<typeof books>(...args)

export const booksClient = hcBooksWithType('/', { init: { credentials: 'omit' } })

type ItemsClient = ReturnType<typeof hc<typeof items>>

const hcItemsWithType = (...args: Parameters<typeof hc>): ItemsClient => hc<typeof items>(...args)

export const itemsClient = hcItemsWithType('/', { init: { credentials: 'omit' } })
`)
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
