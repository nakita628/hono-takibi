import { describe, expect, it } from 'vite-plus/test'

import { parseConfig } from '../config/index.js'
import { runGenerator } from '../testing/index.js'
import { appEntryOutput, isInsideDirectory } from './path.js'

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
