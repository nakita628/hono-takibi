import { existsSync, readdirSync } from 'node:fs'
import path from 'node:path'

// Directories at the workspace root that hold the shared fixtures, not a case.
const INFRA = new Set([
  'cases',
  'hosts',
  'node_modules',
  'runtime',
  'scripts',
  'specs',
  'types',
  '__experiments__',
  '__generated__',
])

/**
 * Every case in the workspace, as `{ name, dir }`.
 *
 * Two layouts are recognised, and a case is a directory holding a `tsconfig.json` in
 * either of them: `cases/<name>/`, which shares `specs/` and `hosts/` with its siblings,
 * and `<name>/` at the root, which is self-contained — its own document, config, host and
 * runtime test sit together, so what a concern covers is one directory listing.
 */
export function listCases(testRoot) {
  const nested = readdirSync(path.join(testRoot, 'cases'), { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => ({ name: entry.name, dir: path.join(testRoot, 'cases', entry.name) }))
  const rooted = readdirSync(testRoot, { withFileTypes: true })
    .filter((entry) => entry.isDirectory() && !INFRA.has(entry.name))
    .map((entry) => ({ name: entry.name, dir: path.join(testRoot, entry.name) }))
  return [...nested, ...rooted]
    .filter(({ dir }) => existsSync(path.join(dir, 'tsconfig.json')))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** The cases `listCases` found that have a config to generate from. */
export function listGeneratedCases(testRoot) {
  return listCases(testRoot).filter(({ dir }) =>
    existsSync(path.join(dir, 'hono-takibi.config.ts')),
  )
}
