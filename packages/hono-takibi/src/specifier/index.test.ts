import fs from 'node:fs'
import os from 'node:os'
import path from 'node:path'

import { Effect } from 'effect'
import { afterEach, describe, expect, it } from 'vite-plus/test'

import { writeFile } from '../file/index.js'
import { runGenerator } from '../testing/index.js'
import {
  ImportStyle,
  canonicalSpecifier,
  fullySpecify,
  isImportsAlias,
  respecifyWritten,
} from './index.js'

let tmpDir = ''

afterEach(() => {
  if (tmpDir !== '') fs.rmSync(tmpDir, { recursive: true, force: true })
  tmpDir = ''
})

/** A directory holding `files`, each with an empty module. */
function setup(files: readonly string[]) {
  tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'specifier-'))
  for (const file of files) {
    fs.mkdirSync(path.dirname(path.join(tmpDir, file)), { recursive: true })
    fs.writeFileSync(path.join(tmpDir, file), 'export {}\n')
  }
  return tmpDir
}

describe('isImportsAlias', () => {
  it.concurrent('is a package.json imports alias only when it starts with #', () => {
    expect(isImportsAlias('#/')).toBe(true)
    expect(isImportsAlias('#src/')).toBe(true)
    expect(isImportsAlias('@/')).toBe(false)
    expect(isImportsAlias(undefined)).toBe(false)
  })
})

describe('canonicalSpecifier', () => {
  // Two spellings of one module are one module.
  // 1 つのモジュールの 2 通りの書き方は、同じモジュールである。
  it.concurrent('drops the extension and a trailing /index', () => {
    expect(canonicalSpecifier('./users.ts')).toBe('./users')
    expect(canonicalSpecifier('./users')).toBe('./users')
    expect(canonicalSpecifier('#/handlers/index.ts')).toBe('#/handlers')
    expect(canonicalSpecifier('#/handlers')).toBe('#/handlers')
    expect(canonicalSpecifier('../lib/index.js')).toBe('../lib')
  })

  it.concurrent('reads ./index.ts and ../index.ts as . and ..', () => {
    expect(canonicalSpecifier('./index.ts')).toBe('.')
    expect(canonicalSpecifier('.')).toBe('.')
    expect(canonicalSpecifier('../index.ts')).toBe('..')
  })

  // Only what full specification writes is folded: extensionless spellings keep apart.
  // 畳むのは完全指定が書く形だけで、拡張子のない書き方は区別したままにする。
  it.concurrent('leaves a specifier without an extension as it is', () => {
    expect(canonicalSpecifier('../index')).toBe('../index')
    expect(canonicalSpecifier('./lib/index')).toBe('./lib/index')
  })

  it.concurrent('leaves a package specifier as it is', () => {
    expect(canonicalSpecifier('@hono/zod-openapi')).toBe('@hono/zod-openapi')
  })
})

describe('fullySpecify', () => {
  const alias = (dir: string) => ({ prefix: '#/', directory: path.join(dir, 'src') })

  // A file gets its extension, a directory its index.ts.
  // ファイルには拡張子を、ディレクトリには index.ts を補う。
  it('completes relative specifiers to the file they name', async () => {
    const dir = setup(['src/handlers/users.ts', 'src/lib/index.ts'])
    const code = [
      "export * from './users'",
      "import { client } from '../lib'",
      "export { a } from './users'",
      "import type { B } from './users'",
    ].join('\n')
    expect(
      await runGenerator(fullySpecify(code, path.join(dir, 'src/handlers/index.ts'), undefined)),
    ).toBe(
      [
        "export * from './users.ts'",
        "import { client } from '../lib/index.ts'",
        "export { a } from './users.ts'",
        "import type { B } from './users.ts'",
      ].join('\n'),
    )
  })

  it('completes specifiers under the alias', async () => {
    const dir = setup(['src/routes/index.ts', 'src/components/schemas.ts', 'src/index.ts'])
    const code = [
      "import { r } from '#/routes'",
      "import { s } from '#/components/schemas'",
      "import type { api } from '#/index'",
    ].join('\n')
    expect(
      await runGenerator(fullySpecify(code, path.join(dir, 'src/lib/client.ts'), alias(dir))),
    ).toBe(
      [
        "import { r } from '#/routes/index.ts'",
        "import { s } from '#/components/schemas.ts'",
        "import type { api } from '#/index.ts'",
      ].join('\n'),
    )
  })

  // `#` alone names the directory the alias stands for, as makeAppEntryImport writes it.
  // `#/api` のようにエイリアスそのものは、エイリアスが指すディレクトリを表す。
  it('completes the bare alias to the index of its directory', async () => {
    const dir = setup(['src/api/index.ts'])
    const code = "import type { api } from '#/api'"
    const nested = { prefix: '#/api/', directory: path.join(dir, 'src/api') }
    expect(
      await runGenerator(fullySpecify(code, path.join(dir, 'src/lib/client.ts'), nested)),
    ).toBe("import type { api } from '#/api/index.ts'")
  })

  it('completes . to ./index.ts', async () => {
    const dir = setup(['src/index.ts'])
    expect(
      await runGenerator(
        fullySpecify("import app from '.'", path.join(dir, 'src/x.ts'), undefined),
      ),
    ).toBe("import app from './index.ts'")
  })

  // Packages, specifiers with an extension and ones that name nothing on disk are not ours.
  // パッケージ、拡張子付きのもの、ディスク上に何もないものは対象外である。
  it('leaves packages, extensions and missing targets as they are', async () => {
    const dir = setup(['src/users.ts'])
    const code = [
      "import { z } from '@hono/zod-openapi'",
      "import { a } from './users.ts'",
      "import data from './data.json'",
      "import { m } from './missing'",
      "import { n } from '#/missing'",
    ].join('\n')
    expect(await runGenerator(fullySpecify(code, path.join(dir, 'src/x.ts'), alias(dir)))).toBe(
      code,
    )
  })

  it('keeps the quote the source uses', async () => {
    const dir = setup(['src/users.ts'])
    expect(
      await runGenerator(
        fullySpecify('export * from "./users"', path.join(dir, 'src/x.ts'), undefined),
      ),
    ).toBe('export * from "./users.ts"')
  })

  it('leaves a module that does not parse as it is', async () => {
    const dir = setup(['src/users.ts'])
    const code = "export * from './users'\nconst = ;"
    expect(await runGenerator(fullySpecify(code, path.join(dir, 'src/x.ts'), undefined))).toBe(code)
  })
})

describe('writeFile under ImportStyle', () => {
  // Without a fully specified style a file is written as given.
  // 完全指定のスタイルでなければ、ファイルは渡されたとおりに書かれる。
  it('writes as given by default', async () => {
    const dir = setup(['src/users.ts'])
    const file = path.join(dir, 'src/index.ts')
    await runGenerator(writeFile(file, "export * from './users'\n"))
    expect(fs.readFileSync(file, 'utf8')).toBe("export * from './users'\n")
  })

  it('completes specifiers and records the file under a fully specified style', async () => {
    const dir = setup(['src/users.ts'])
    const file = path.join(dir, 'src/index.ts')
    const written = new Set<string>()
    await runGenerator(
      writeFile(file, "export * from './users'\n").pipe(
        Effect.provideService(ImportStyle, { fullySpecified: true, written }),
      ),
    )
    expect(fs.readFileSync(file, 'utf8')).toBe("export * from './users.ts'\n")
    expect([...written]).toStrictEqual([file])
  })

  // A file written before the module it imports exists is completed once the run is over.
  // import 先より先に書かれたファイルは、実行の終わりに補完される。
  it('completes a file written before its target in the pass after the run', async () => {
    const dir = setup([])
    const entry = path.join(dir, 'src/index.ts')
    const style = { fullySpecified: true, written: new Set<string>() }
    await runGenerator(
      Effect.gen(function* () {
        fs.mkdirSync(path.join(dir, 'src'), { recursive: true })
        yield* writeFile(entry, "export * from './routes'\n")
        expect(fs.readFileSync(entry, 'utf8')).toBe("export * from './routes'\n")
        fs.mkdirSync(path.join(dir, 'src/routes'))
        yield* writeFile(path.join(dir, 'src/routes/index.ts'), 'export {}\n')
        yield* respecifyWritten()
      }).pipe(Effect.provideService(ImportStyle, style)),
    )
    expect(fs.readFileSync(entry, 'utf8')).toBe("export * from './routes/index.ts'\n")
  })
})
