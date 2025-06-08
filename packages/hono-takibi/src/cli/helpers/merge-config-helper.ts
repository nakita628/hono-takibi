import type { Config } from '../../config/index.js'
import type { CliFlags } from '../types/index.js'

/**
 * Merge the base configuration with the CLI flags.
 * @param base
 * @param f
 * @returns
 */
export function mergeConfigHelper(base: Config, cli: CliFlags) {
  return {
    ...base,
    input: base.input ?? cli.input ?? '',
    output: base.output ?? cli.output ?? '',
    type: {
      ...base.type,
      export: base.type.export ?? cli.exportType ?? false,
      name: base.type.name ?? cli.typeCase ?? 'PascalCase',
    },
    schema: {
      ...base.schema,
      export: base.schema.export ?? cli.exportSchema ?? false,
      name: base.schema.name ?? cli.schemaCase ?? 'PascalCase',
    },
  }
}
