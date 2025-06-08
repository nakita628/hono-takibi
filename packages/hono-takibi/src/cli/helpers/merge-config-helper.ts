import type { Config } from '../../config/index.js'
import type { CliFlags } from '../types/index.js'

/**
 * Merge the base configuration with the CLI flags.
 * @param base
 * @param f
 * @returns
 */
export function mergeConfigHelper(base: Config, f: CliFlags) {
  const preferBase = <T>(cfg: T | undefined, cli: T | undefined): T | undefined =>
    cfg !== undefined ? cfg : cli

  const withFallback = <T>(v: T | undefined, fallback: T): T => (v === undefined ? fallback : v)

  return {
    ...base,
    input: withFallback(preferBase(base.input, f.input), ''),
    output: withFallback(preferBase(base.output, f.output), ''),

    type: {
      ...base.type,
      export: withFallback(preferBase(base.type.export, f.exportType), false),
      name: withFallback(preferBase(base.type.name, f.typeCase), 'PascalCase'),
    },

    schema: {
      ...base.schema,
      export: withFallback(preferBase(base.schema.export, f.exportSchema), false),
      name: withFallback(preferBase(base.schema.name, f.schemaCase), 'PascalCase'),
    },
  }
}
