// Split outputs across two packages (cases/split-package, generated from specs/split.yaml).
// The case typechecks, which proves every import resolves; this file proves the imports are
// the ones the rule asks for — by package across the boundary, relative inside it.
//
// 2 つのパッケージにまたがる分割出力の検証(cases/split-package。specs/split.yaml から生成)。
// ケースの typecheck は import がすべて解決することを、このファイルは import が規則どおりで
// あることを確認する。境界をまたぐなら package、内側なら相対パスである。
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/split-package')

function sources(directory: string) {
  return readdirSync(path.join(root, directory))
    .filter((file) => file.endsWith('.ts'))
    .map((file) => readFileSync(path.join(root, directory, file), 'utf8'))
    .join('\n')
}

describe('split-package: what the generated files import', () => {
  // The server's files reach the schemas through their package, never by a path that
  // leaves the server.
  // サーバーのファイルは schemas に package で届き、サーバーの外へ出るパスは使わない。
  it('the server imports the schemas by their package', () => {
    const server = ['routes', 'parameters', 'headers', 'requestBodies', 'responses']
      .map((directory) => sources(`server/src/${directory}`))
      .join('\n')
    expect(server).toContain("from '@fixtures/split-package-schemas'")
    expect(server).not.toContain('../../schemas')
    expect(server).not.toContain("from '../schemas'")
  })

  // Inside the server, the outputs import one another relatively.
  // サーバーの内側では、出力どうしは相対パスで import する。
  it('the server imports its own outputs relatively', () => {
    expect(sources('server/src/routes')).toContain("from '../parameters'")
  })

  // The schemas import nothing of the server.
  // schemas はサーバーのものを何も import しない。
  it('the schemas import nothing of the server', () => {
    expect(sources('schemas')).not.toContain('server')
  })
})
