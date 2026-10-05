// The imports the generator writes across packages (cases/client-package, generated from
// specs/users.yaml with the client in a package of its own). What the case typechecks is
// that the imports resolve; what this file checks is that they are the ones the config asks
// for — relative inside the package of the client, by name outside it.
//
// パッケージをまたいで生成器が書く import の検証(cases/client-package。specs/users.yaml から、
// クライアントを独立したパッケージに置いて生成)。ケースの typecheck は import が解決することを、
// このファイルは import が設定どおりであることを確認する。クライアントと同じパッケージでは
// 相対パス、その外では名前で import する。
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/client-package')
const read = (file: string) => readFileSync(path.join(root, file), 'utf8')

describe('client-package: what the generated files import', () => {
  // The client imports the type of the app by `client.import`.
  // クライアントは、`client.import` でアプリの型を import する。
  it('the client imports the app by client.import', () => {
    expect(read('client/src/lib/client.ts')).toContain(
      "import type { api } from '@fixtures/client-package-server'",
    )
  })

  // The hooks in the package of the client import it relatively, through its barrel.
  // クライアントと同じパッケージのフックは、バレルを通して相対パスで import する。
  it('the hooks beside the client import it relatively', () => {
    expect(read('client/src/swr.ts')).toContain("import { client } from './lib'")
  })

  // The hooks in another package import it by `client.package`.
  // 別のパッケージのフックは、`client.package` で import する。
  it('the hooks of another package import the client by client.package', () => {
    expect(read('web/src/hooks.ts')).toContain(
      "import { client } from '@fixtures/client-package-client'",
    )
  })
})
