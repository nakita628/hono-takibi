// The imports the generator writes under `pathAlias: true` when the tsconfig maps an ancestor
// of the app entry (cases/path-alias-nested, generated from specs/users.yaml with the layout of
// zod-openapi-hono-todo: the API in `src/api`, `"@/*"` mapped to `src`). What the case
// typechecks is that the imports resolve; what this file checks is the alias the generator
// read — `@/api/`, the mapping's `@/` followed by the rest of the way to the app entry.
//
// tsconfig が app entry の祖先ディレクトリをマップしているときに、`pathAlias: true` で生成器が書く
// import の検証(cases/path-alias-nested。specs/users.yaml から、zod-openapi-hono-todo と同じ
// 構成で生成。API は `src/api` にあり、`"@/*"` は `src` をマップする)。ケースの typecheck は
// import が解決することを、このファイルは生成器が読み取ったエイリアスを確認する。マッピングの
// `@/` に app entry までの残りのパスをつないだ `@/api/` になる。
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/path-alias-nested/src')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')

describe('path-alias-nested: the alias read from an ancestor mapping', () => {
  // The app entry imports the routes and the handlers beside it under `@/api/`.
  // app entry は、隣にある routes と handlers を `@/api/` で import する。
  it('the app entry imports the routes and the handlers under @/api/', () => {
    const entry = read('api/index.ts')
    expect(entry).toContain("} from '@/api/routes'")
    expect(entry).toContain("} from '@/api/handlers'")
  })

  // A handler stub imports the types of its routes under the alias as well.
  // ハンドラのスタブも、ルートの型をエイリアスで import する。
  it('a handler imports its routes under @/api/', () => {
    expect(read('api/handlers/items.ts')).toContain(
      "import type { getItemsRoute } from '@/api/routes'",
    )
  })

  // The client is outside `src/api` but inside the alias, so it imports the app as `@/api`.
  // クライアントは `src/api` の外だがエイリアスの範囲内にあるため、アプリを `@/api` で import する。
  it('the client imports the app as @/api', () => {
    expect(read('lib/client.ts')).toContain("import type { api } from '@/api'")
  })

  // The hooks reach the client, which is outside the directory of the app entry, relatively.
  // フックは、app entry のディレクトリの外にあるクライアントへ相対パスで到達する。
  it('the hooks import the client relatively', () => {
    expect(read('hooks/index.ts')).toContain("import { client } from '../lib'")
  })
})
