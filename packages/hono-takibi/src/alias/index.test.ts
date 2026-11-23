import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { afterEach, describe, expect, it } from 'vite-plus/test'

import { parseConfig } from '../config/index.js'
import { runGenerator, runGeneratorError } from '../testing/index.js'
import { parseJsonc, resolvePathAlias } from './index.js'

let tmpDir = ''

afterEach(() => {
  if (tmpDir !== '') fs.rmSync(tmpDir, { recursive: true, force: true })
  tmpDir = ''
})

/** Writes `files` under a new directory and resolves the alias of `config` in it. */
function setup(files: { readonly [file: string]: string }) {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'path-alias-'))
  for (const [file, content] of Object.entries(files)) {
    fs.mkdirSync(path.dirname(path.join(tmpDir, file)), { recursive: true })
    fs.writeFileSync(path.join(tmpDir, file), content)
  }
  return tmpDir
}

async function aliasOf(config: object) {
  return runGenerator(
    resolvePathAlias(await runGenerator(parseConfig({ input: 'openapi.yaml', ...config }))),
  )
}

async function aliasErrorOf(config: object) {
  return runGeneratorError(
    resolvePathAlias(await runGenerator(parseConfig({ input: 'openapi.yaml', ...config }))),
  )
}

const tsconfig = (paths: object, extra: object = {}) =>
  JSON.stringify({ compilerOptions: { ...extra, paths } })

describe('parseJsonc', () => {
  // A comment opener inside a string is text: `"@/*"` holds `/*`.
  // 文字列の中のコメント開始記号は文字である。`"@/*"` は `/*` を含む。
  it.concurrent('keeps /* inside strings and drops comments and trailing commas', () => {
    expect(
      parseJsonc(`{
        // line comment
        "compilerOptions": {
          /* block comment */
          "paths": { "@/*": ["./src/*"], },
        },
      }`),
    ).toStrictEqual({ compilerOptions: { paths: { '@/*': ['./src/*'] } } })
  })

  it.concurrent('keeps escaped quotes inside strings', () => {
    expect(parseJsonc('{ "a": "x\\"// y", }')).toStrictEqual({ a: 'x"// y' })
  })
})

describe('resolvePathAlias', () => {
  it('is undefined without pathAlias', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@/*': ['./src/*'] }) })
    await expect(aliasOf({ output: `${dir}/src/routes.ts` })).resolves.toBeUndefined()
  })

  // A config with no app entry has no directory for the alias to stand for.
  // app entry のない config には、エイリアスが指すディレクトリがない。
  it.concurrent('is undefined without an app entry', async () => {
    await expect(
      aliasOf({ pathAlias: true, components: { output: 'src/components.ts' } }),
    ).resolves.toBeUndefined()
  })

  it('reads tsconfig paths that map the entry directory', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@/*': ['./src/*'] }) })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  // An alias of an ancestor reaches the entry directory by the rest of the way.
  // 祖先ディレクトリのエイリアスは、残りのパスをつないで app entry のディレクトリに届く。
  it('appends the rest of the way when the alias maps an ancestor', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@/*': ['./*'] }) })
    await expect(
      aliasOf({
        output: `${dir}/src/api/index.ts`,
        pathAlias: true,
        template: { define: true },
      }),
    ).resolves.toBe('@/src/api/')
  })

  // Without define, the app entry is the index.ts beside the routes module.
  // define がなければ、app entry は routes モジュールの隣の index.ts である。
  it('takes the directory of the app entry, not of the routes module', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@/*': ['./src/*'] }) })
    await expect(aliasOf({ output: `${dir}/src/routes/index.ts`, pathAlias: true })).resolves.toBe(
      '@/',
    )
  })

  // Only package.json `imports` is resolved by Node at runtime, so it wins over tsconfig.
  // 実行時に Node が解決するのは package.json の `imports` だけなので、tsconfig より優先する。
  it('prefers package.json imports over tsconfig paths', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '@/*': ['./src/*'] }),
      'package.json': JSON.stringify({ type: 'module', imports: { '#/*': './src/*' } }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('#/')
  })

  it('takes the first mapping declared when several map the directory', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '~/*': ['./src/*'], '@/*': ['./src/*'] }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('~/')
  })

  // Several targets, a conditional target and a `.ts` target are not one directory.
  // 複数のターゲット、条件付きのターゲット、`.ts` で終わるターゲットは 1 つのディレクトリではない。
  it('skips mappings that are not one directory', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '@/*': ['./src/*', './gen/*'], '~/*': ['./src/*'] }),
      'package.json': JSON.stringify({
        imports: {
          '#a/*': { types: './src/*', default: './dist/*' },
          '#b/*': './src/*.ts',
        },
      }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('~/')
  })

  it('skips a mapping of another directory', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '@lib/*': ['./lib/*'], '@/*': ['./src/*'] }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('follows extends and resolves paths against the file that declares them', async () => {
    const dir = setup({
      'config/base.json': tsconfig({ '@/*': ['../src/*'] }),
      'tsconfig.json': JSON.stringify({ extends: './config/base.json', compilerOptions: {} }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('follows an extends array, the last one with paths winning', async () => {
    const dir = setup({
      'a.json': tsconfig({ '~/*': ['./src/*'] }),
      'b.json': tsconfig({ '@/*': ['./src/*'] }),
      'tsconfig.json': JSON.stringify({ extends: ['./a.json', './b.json'] }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  // A solution-style tsconfig.json, as Vite scaffolds it, holds only references: the paths are
  // in the referenced project.
  // Vite が生成する solution 形式の tsconfig.json は references だけを持ち、paths は参照先の
  // プロジェクトにある。
  it('follows references to the project that holds the paths', async () => {
    const dir = setup({
      'tsconfig.json': JSON.stringify({
        files: [],
        references: [{ path: './tsconfig.node.json' }, { path: './tsconfig.app.json' }],
      }),
      'tsconfig.node.json': JSON.stringify({ compilerOptions: { composite: true } }),
      'tsconfig.app.json': tsconfig({ '@/*': ['./src/*'] }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('follows a reference that names a directory', async () => {
    const dir = setup({
      'tsconfig.json': JSON.stringify({ files: [], references: [{ path: './apps/api' }] }),
      'apps/api/tsconfig.json': tsconfig({ '@/*': ['./src/*'] }),
    })
    await expect(
      aliasOf({ output: `${dir}/apps/api/src/routes.ts`, pathAlias: true }),
    ).resolves.toBe('@/')
  })

  // The paths a shared base declares resolve against the base, as TypeScript resolves them:
  // `./src/*` there is the base's own src, so only `${configDir}` reaches the app.
  // 共有ベースが宣言した paths は、TypeScript と同じくベースの場所から解決する。そこでの
  // `./src/*` はベース自身の src なので、アプリに届くのは `${configDir}` だけである。
  it('resolves the paths of a shared base against the base', async () => {
    const dir = setup({
      'packages/tsconfig/base.json': tsconfig({ '@/*': ['./src/*'] }),
      'apps/api/tsconfig.json': JSON.stringify({ extends: '../../packages/tsconfig/base.json' }),
    })
    const error = await aliasErrorOf({ output: `${dir}/apps/api/src/routes.ts`, pathAlias: true })
    expect(error.message).toContain('pathAlias: no alias maps')
  })

  it('resolves ${configDir} in a shared base against the tsconfig that extends it', async () => {
    const dir = setup({
      'packages/tsconfig/base.json': tsconfig({ '@/*': ['${configDir}/src/*'] }),
      'apps/api/tsconfig.json': JSON.stringify({ extends: '../../packages/tsconfig/base.json' }),
    })
    await expect(
      aliasOf({ output: `${dir}/apps/api/src/routes.ts`, pathAlias: true }),
    ).resolves.toBe('@/')
  })

  // A shared base installed as a workspace package is found through node_modules.
  // ワークスペースのパッケージとして入っている共有ベースは、node_modules から見つける。
  it('follows extends into a workspace package', async () => {
    const dir = setup({
      'packages/tsconfig/package.json': JSON.stringify({ name: '@repo/tsconfig' }),
      'packages/tsconfig/base.json': tsconfig({ '@/*': ['${configDir}/src/*'] }),
      'apps/api/tsconfig.json': JSON.stringify({ extends: '@repo/tsconfig/base' }),
    })
    fs.mkdirSync(path.join(dir, 'apps/api/node_modules/@repo'), { recursive: true })
    fs.symlinkSync(
      path.join(dir, 'packages/tsconfig'),
      path.join(dir, 'apps/api/node_modules/@repo/tsconfig'),
    )
    await expect(
      aliasOf({ output: `${dir}/apps/api/src/routes.ts`, pathAlias: true }),
    ).resolves.toBe('@/')
  })

  // TypeScript before 7 resolves paths against baseUrl when one is set.
  // TypeScript 7 より前は、baseUrl があれば paths をそこから解決する。
  it('resolves paths against baseUrl', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '@/*': ['./*'] }, { baseUrl: './src' }),
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('replaces ${configDir} with the directory of the tsconfig', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@/*': ['${configDir}/src/*'] }) })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('reads a tsconfig written with comments', async () => {
    const dir = setup({
      'tsconfig.json': `{
  // the alias of src
  "compilerOptions": { "paths": { "@/*": ["./src/*"], } },
}`,
    })
    await expect(aliasOf({ output: `${dir}/src/routes.ts`, pathAlias: true })).resolves.toBe('@/')
  })

  it('finds the nearest files above the entry directory', async () => {
    const dir = setup({
      'tsconfig.json': tsconfig({ '~/*': ['./*'] }),
      'apps/api/tsconfig.json': tsconfig({ '@/*': ['./src/*'] }),
    })
    await expect(
      aliasOf({ output: `${dir}/apps/api/src/routes.ts`, pathAlias: true }),
    ).resolves.toBe('@/')
  })

  // The config file may sit beside the project's tsconfig while the output is written elsewhere.
  // config ファイルがプロジェクトの tsconfig の隣にあり、出力は別の場所に書かれることがある。
  it('falls back to the tsconfig above the working directory', async () => {
    const dir = setup({
      'config/tsconfig.json': tsconfig({ '@/*': ['../out/src/*'] }),
    })
    const cwd = process.cwd()
    process.chdir(path.join(dir, 'config'))
    try {
      await expect(aliasOf({ output: `${dir}/out/src/routes.ts`, pathAlias: true })).resolves.toBe(
        '@/',
      )
    } finally {
      process.chdir(cwd)
    }
  })

  // pathAlias: true asks for an alias: falling back to relative imports would hide the mistake.
  // pathAlias: true はエイリアスを求めている。相対パスに戻すと、設定の誤りが見えなくなる。
  it('fails when no alias maps the entry directory', async () => {
    const dir = setup({ 'tsconfig.json': tsconfig({ '@lib/*': ['./lib/*'] }) })
    const error = await aliasErrorOf({ output: `${dir}/src/routes.ts`, pathAlias: true })
    expect(error.message).toBe(
      `pathAlias: no alias maps ${path.join(dir, 'src')}, the directory of the app entry. Map it in package.json "imports" ("#/*": "./src/*") or tsconfig.json "paths" ("@/*": ["./src/*"]), or remove pathAlias to import relatively.`,
    )
  })

  it('fails on a tsconfig that is not JSON', async () => {
    const dir = setup({ 'tsconfig.json': '{ "compilerOptions": ' })
    const error = await aliasErrorOf({ output: `${dir}/src/routes.ts`, pathAlias: true })
    expect(error.message).toContain(`pathAlias: cannot read ${path.join(dir, 'tsconfig.json')}:`)
  })
})
