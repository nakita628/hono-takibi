import path from 'node:path'

import type { Config } from '../config/index.js'

/**
 * Whether `filePath` sits under `directory`, at any depth.
 *
 * Asked of the path segments rather than the string: `/app/spec-old/a.yaml` starts with
 * `/app/spec` and is not inside it.
 */
export function isInsideDirectory(directory: string, filePath: string) {
  const relative = path.relative(directory, filePath)
  return relative !== '' && !relative.startsWith('..') && !path.isAbsolute(relative)
}

/**
 * The directory the app entry is in. Without `define` the output named is the routes
 * module — a file (`src/routes.ts`), a module directory (`src/routes/index.ts`) or a split
 * directory (`src/routes`) — and the app entry is the `index.ts` beside it.
 */
export function appEntryDirectory(appOutput: string, define: boolean) {
  return define || !appOutput.endsWith('/index.ts')
    ? path.dirname(appOutput)
    : path.dirname(path.dirname(appOutput))
}

/** The file the app entry is, whichever output the config names. */
export function appEntryFile(appOutput: string, define: boolean) {
  return path.join(appEntryDirectory(appOutput, define), 'index.ts')
}

function relativeSpecifier(from: string, to: string) {
  const relative = path.relative(path.dirname(from), to).split(path.sep).join('/')
  return relative === '' ? '.' : relative.startsWith('.') ? relative : `./${relative}`
}

/**
 * The module specifier the app entry is imported by from `from`: relative to it, or under
 * the path alias, which stands for the directory the app entry is in. An alias that names a
 * directory, `@/api`, is the entry as it stands; one that names a root, `@/`, takes `index`.
 */
export function appEntryImport(
  from: string,
  appOutput: string,
  pathAlias: string | undefined,
  define: boolean,
) {
  if (pathAlias !== undefined) {
    const prefix = pathAlias.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias
    return prefix.includes('/') ? prefix : `${prefix}/index`
  }
  return `${relativeSpecifier(from, appEntryDirectory(appOutput, define))}/index`
}

/**
 * The module specifier a generated file is imported by from `from`: under the path alias
 * when the file is in the directory the alias stands for, and relative to `from` otherwise.
 */
export function generatedImport(
  from: string,
  file: string,
  appOutput: string | undefined,
  pathAlias: string | undefined,
  define: boolean,
) {
  // A barrel is imported by its directory.
  const target = file.replace(/(?:\/index)?\.ts$/u, '')
  if (pathAlias !== undefined && appOutput !== undefined) {
    const inside = path
      .relative(appEntryDirectory(appOutput, define), target)
      .split(path.sep)
      .join('/')
    if (inside !== '' && !inside.startsWith('..')) {
      return `${pathAlias.endsWith('/') ? pathAlias.slice(0, -1) : pathAlias}/${inside}`
    }
  }
  return relativeSpecifier(from, target)
}

/**
 * The file the app entry is written to, or `undefined` when the config names none.
 *
 * The one place the entry is derived: every generated import is relative to it, and a
 * caller that works it out on its own can disagree with what the generators write.
 */
export function appEntryOutput(config: Config) {
  if (config.output !== undefined) return config.output
  if (config.template?.define !== true) return config.routes?.output
  if (config.components?.output === undefined) return 'src/index.ts'
  const container = config.components.output.endsWith('/index.ts')
    ? config.components.output.slice(0, -'/index.ts'.length)
    : config.components.output
  const anchor = container.includes('/') ? container.slice(0, container.lastIndexOf('/')) : ''
  return anchor === '' || anchor === '.' ? 'index.ts' : `${anchor}/index.ts`
}
