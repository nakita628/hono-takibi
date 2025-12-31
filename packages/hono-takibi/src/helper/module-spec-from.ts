import path from 'node:path'

const stripTsExt = (p: string): string => (p.endsWith('.ts') ? p.slice(0, -3) : p)

const stripIndex = (p: string): string => (p.endsWith('/index') ? p.slice(0, -6) : p)

const ensureDotRelative = (spec: string): string => {
  if (spec === '') return '.'
  if (spec.startsWith('.')) return spec
  return `./${spec}`
}

/**
 * Builds a relative module specifier from `fromFile` to a configured output.
 *
 * - If `target.split=true`, imports the directory (without `/index`).
 * - Strips the `.ts` extension to match existing generated output style.
 *
 * @param fromFile - The file path to resolve the module specifier from.
 * @param target - The target configuration with output and split options.
 * @returns A relative module specifier string.
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
  return ensureDotRelative(stripIndex(stripTsExt(rel)))
}
