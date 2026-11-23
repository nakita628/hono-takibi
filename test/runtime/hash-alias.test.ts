// A `#` pathAlias (cases/hash-alias, generated from specs/users.yaml with `pathAlias: '#/'`
// and seed/package.json mapping `#/*` to `src/*`). Package.json `imports` is what Node
// resolves, and Node neither searches for extensions nor resolves a directory to its index.ts,
// so the generated files import one another fully specified. What the case typechecks (under
// `nodenext`) is that tsc resolves them; this file checks the specifiers, and that Node runs
// the app straight from the TypeScript sources.
//
// `#` エイリアスの検証(cases/hash-alias。specs/users.yaml から `pathAlias: '#/'` で生成し、
// seed/package.json が `#/*` を `src/*` にマップする)。Node が解決するのは package.json の
// `imports` であり、Node は拡張子を探さず、ディレクトリを index.ts に解決もしない。そのため
// 生成ファイルは互いをファイルまで指定して import する。ケースの typecheck(`nodenext`)は tsc が
// それを解決することを、このファイルは指定子と、Node が TypeScript のソースからそのままアプリを
// 実行できることを確認する。
import { spawnSync } from 'node:child_process'
import { readFileSync } from 'node:fs'
import path from 'node:path'

import { describe, expect, it } from 'vite-plus/test'

const root = path.resolve(import.meta.dirname, '../__generated__/hash-alias')
const read = (file: string) => readFileSync(path.join(root, 'src', file), 'utf8')

describe('hash-alias: fully specified imports', () => {
  // The app entry imports the routes file and the handler barrel under the alias, by file.
  // app entry は、routes ファイルとハンドラのバレルを、エイリアスでファイルまで指定して import する。
  it('the app entry imports #/routes.ts and #/handlers/index.ts', () => {
    const entry = read('index.ts')
    expect(entry).toContain("} from '#/routes.ts'")
    expect(entry).toContain("} from '#/handlers/index.ts'")
  })

  // A barrel reached through the alias is loaded by Node too, so its lines name files.
  // エイリアス経由で読み込まれるバレルも Node が読むため、各行はファイルを指す。
  it('the handler barrel re-exports its files by name', () => {
    const barrel = read('handlers/index.ts')
    for (const file of ['users', 'items', 'slow']) {
      expect(barrel).toContain(`export * from './${file}.ts'`)
    }
  })

  it('a split component barrel re-exports its files by name', () => {
    expect(read('components/schemas/index.ts')).toContain("export * from './user.ts'")
  })

  it('the client imports the app, and rpc the client barrel, by file', () => {
    expect(read('lib/client.ts')).toContain("import type { api } from '#/index.ts'")
    expect(read('lib/index.ts')).toBe("export * from './client.ts'\n")
    expect(read('rpc.ts')).toContain("from '#/lib/index.ts'")
  })

  // No specifier of a generated file is left without its extension.
  // 生成ファイルを指す指定子に、拡張子のないものは残らない。
  it('leaves no relative or alias specifier extensionless', () => {
    const files = ['index.ts', 'routes.ts', 'handlers/index.ts', 'lib/client.ts', 'rpc.ts']
    const specifiers = files.flatMap((file) =>
      Array.from(read(file).matchAll(/from '([.#][^']*)'/gu), (match) => match[1]),
    )
    expect(specifiers.length).toBeGreaterThan(0)
    expect(specifiers.filter((specifier) => !specifier?.endsWith('.ts'))).toStrictEqual([])
  })
})

describe('hash-alias: runs on Node from the sources', () => {
  // Node strips the types and resolves every `#` and relative import itself: no bundler.
  // Node が型を取り除き、`#` と相対の import をすべて自力で解決する。バンドラーは使わない。
  it('GET /users answers from the implemented handler', () => {
    const script = [
      `const { default: app } = await import(${JSON.stringify(path.join(root, 'src/index.ts'))})`,
      `const response = await app.request('/users')`,
      'console.log(JSON.stringify({ status: response.status, body: await response.json() }))',
    ].join('\n')
    const result = spawnSync(process.execPath, ['--input-type=module', '--eval', script], {
      encoding: 'utf8',
    })
    expect(result.stderr).not.toContain('ERR_')
    expect(JSON.parse(result.stdout)).toStrictEqual({
      status: 200,
      body: [{ id: '1', name: 'Alice' }],
    })
  })
})
