import { describe, expect, it } from 'vite-plus/test'

import { parseConfig } from '../config/index.js'
import { runGenerator } from '../testing/index.js'
import { appEntryImport, appEntryOutput, generatedImport, isInsideDirectory } from './path.js'

describe('isInsideDirectory', () => {
  // A file directly in the directory.
  // ディレクトリ直下のファイル。
  it.concurrent('is true for a file in the directory', () => {
    expect(isInsideDirectory('/app/spec', '/app/spec/openapi.yaml')).toBe(true)
  })

  // Depth does not matter.
  // 階層の深さは問わない。
  it.concurrent('is true for a file several levels down', () => {
    expect(isInsideDirectory('/app/spec', '/app/spec/paths/users/get.yaml')).toBe(true)
  })

  // `/app/spec-old` starts with `/app/spec` as a string and is another directory: the
  // path segments are what is compared.
  // `/app/spec-old` は文字列としては `/app/spec` で始まるが、別のディレクトリである。
  // 比較されるのは、パスのセグメントである。
  it.concurrent('is false for a sibling whose name starts the same', () => {
    expect(isInsideDirectory('/app/spec', '/app/spec-old/openapi.yaml')).toBe(false)
  })

  // A file next to the directory, not in it.
  // ディレクトリの中ではなく、隣にあるファイル。
  it.concurrent('is false for a file beside the directory', () => {
    expect(isInsideDirectory('/app/spec', '/app/openapi.yaml')).toBe(false)
  })

  // A file above the directory.
  // ディレクトリより上の階層にあるファイル。
  it.concurrent('is false for a file above the directory', () => {
    expect(isInsideDirectory('/app/spec', '/openapi.yaml')).toBe(false)
  })

  // A directory is not inside itself.
  // ディレクトリは、自分自身の中にはない。
  it.concurrent('is false for the directory itself', () => {
    expect(isInsideDirectory('/app/spec', '/app/spec')).toBe(false)
  })

  // A path that steps out and back in is resolved before it is compared.
  // いったん外に出てから戻るパスは、比較の前に解決される。
  it.concurrent('is true for a path that leaves the directory and comes back', () => {
    expect(isInsideDirectory('/app/spec', '/app/spec/../spec/openapi.yaml')).toBe(true)
  })
})

// `appEntryOutput` is the one place the app entry is derived, and every generated import
// is relative to it. A wrong anchor here breaks every route import at once.
const entry = async (config: Record<string, unknown>) =>
  appEntryOutput(await runGenerator(parseConfig({ input: 'openapi.yaml', ...config })))

describe('appEntryOutput', () => {
  it.concurrent('prefers an explicit output in every mode', async () => {
    expect(await entry({ output: 'src/app.ts' })).toBe('src/app.ts')
    expect(
      await entry({
        output: 'src/server/index.ts',
        template: { define: true },
        components: { output: 'src/api/components/index.ts' },
      }),
    ).toBe('src/server/index.ts')
  })

  it.concurrent('falls back to routes.output outside define mode', async () => {
    expect(await entry({ routes: { output: 'src/routes/index.ts' } })).toBe('src/routes/index.ts')
    expect(await entry({})).toBeUndefined()
  })

  it.concurrent('defaults define mode to src/index.ts without a components anchor', async () => {
    expect(await entry({ template: { define: true } })).toBe('src/index.ts')
  })

  it.concurrent.each([
    ['src/api/components/index.ts', 'src/api/index.ts'],
    ['src/api/components.ts', 'src/api/index.ts'],
    ['components/index.ts', 'index.ts'],
    ['components.ts', 'index.ts'],
    ['./components/index.ts', 'index.ts'],
  ])('anchors define mode next to components.output %s', async (output, expected) => {
    expect(await entry({ template: { define: true }, components: { output } })).toBe(expected)
  })
})

describe('appEntryImport', () => {
  // The output named is the routes file; the app entry is the index.ts beside it.
  // 指定された出力先は routes ファイルである。アプリのエントリは、その隣の index.ts である。
  it.concurrent('is the index beside the routes file, from a file in the same directory', () => {
    expect(appEntryImport('src/client.ts', 'src/routes.ts', undefined, false)).toBe('./index')
  })

  // The path is worked out from where the importing file is written.
  // パスは、import する側のファイルの出力先から計算される。
  it.concurrent('is relative to a file in another directory', () => {
    expect(appEntryImport('lib/http/client.ts', 'src/api/routes.ts', undefined, false)).toBe(
      '../../src/api/index',
    )
  })

  // Routes written to a directory are its index.ts, and the app entry is one level up.
  // ディレクトリに出力された routes は、その index.ts である。アプリのエントリは1階層上にある。
  it.concurrent('is one level up from routes written to a directory', () => {
    expect(appEntryImport('src/client.ts', 'src/routes/index.ts', undefined, false)).toBe('./index')
  })

  // With define the output named is the app entry itself.
  // define では、指定された出力先がアプリのエントリそのものである。
  it.concurrent('is the output itself with define', () => {
    expect(appEntryImport('src/lib/client.ts', 'src/index.ts', undefined, true)).toBe('../index')
  })

  // An alias that names a root takes index.
  // ルートを指すエイリアスには、index が付く。
  it.concurrent('is the index under an alias that names a root', () => {
    expect(appEntryImport('src/lib/client.ts', 'src/routes.ts', '@/', false)).toBe('@/index')
  })

  // An alias that names a directory is the entry as it stands.
  // ディレクトリを指すエイリアスは、そのままエントリになる。
  it.concurrent('is the alias itself when it names a directory', () => {
    expect(appEntryImport('src/client.ts', 'src/api/routes.ts', '@/api', false)).toBe('@/api')
  })
})

describe('generatedImport', () => {
  // A file beside the importing one.
  // import する側と同じディレクトリにあるファイル。
  it.concurrent('is relative to a file in the same directory', () => {
    expect(generatedImport('src/rpc.ts', 'src/client.ts', 'src/routes.ts', undefined, false)).toBe(
      './client',
    )
  })

  // The path is worked out from where the importing file is written.
  // パスは、import する側のファイルの出力先から計算される。
  it.concurrent('is relative to a file in another directory', () => {
    expect(
      generatedImport(
        'app/hooks/deep/query.ts',
        'lib/http/client.ts',
        'src/routes.ts',
        undefined,
        false,
      ),
    ).toBe('../../../lib/http/client')
  })

  // The alias stands for the directory the app entry is in; a file in it is under the alias.
  // エイリアスは、アプリのエントリがあるディレクトリを表す。その中のファイルは、
  // エイリアス配下になる。
  it.concurrent('is under the alias for a file in the aliased directory', () => {
    expect(
      generatedImport('src/hooks/query.ts', 'src/lib/client.ts', 'src/routes.ts', '@/', false),
    ).toBe('@/lib/client')
  })

  // A barrel is imported by the directory it is in.
  // バレルは、それが置かれたディレクトリで import される。
  it.concurrent('is the directory of a barrel', () => {
    expect(
      generatedImport('src/rpc.ts', 'src/lib/index.ts', 'src/routes.ts', undefined, false),
    ).toBe('./lib')
  })

  // The same under the alias.
  // エイリアス配下でも同様である。
  it.concurrent('is the directory of a barrel under the alias', () => {
    expect(generatedImport('src/rpc.ts', 'src/lib/index.ts', 'src/routes.ts', '@/', false)).toBe(
      '@/lib',
    )
  })

  // A file outside the aliased directory cannot be named through the alias.
  // エイリアスが表すディレクトリの外にあるファイルは、エイリアスでは指せない。
  it.concurrent('is relative for a file outside the aliased directory', () => {
    expect(
      generatedImport('src/rpc.ts', 'src/client.ts', 'src/api/routes.ts', '@/api', false),
    ).toBe('./client')
  })
})
