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
