import path from 'node:path'

const stripTsExt = (p: string): string => (p.endsWith('.ts') ? p.slice(0, -3) : p)

const ensureDotRelative = (spec: string): string => {
  if (spec === '') return './index'
  if (spec.startsWith('.')) return spec
  return `./${spec}`
}

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 *
 * - If `target.split=true`, imports `.../index` in that directory.
 * - Strips the `.ts` extension to match existing generated output style.
 */
export function moduleSpecFrom(
  fromFile: string,
  target: {
    readonly output: string | `${string}.ts`
    readonly split?: boolean
  },
): string {
  const fromDir = path.dirname(fromFile)
  const entry = target.split ? path.join(target.output) : target.output
  const rel = path.relative(fromDir, entry).replace(/\\/g, '/')
  return ensureDotRelative(stripTsExt(rel))
}
