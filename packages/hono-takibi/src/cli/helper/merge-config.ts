import type { Config } from '../../config/index.js'
import type { CliFlags } from '../types/index.js'

/**
 * Merge the base configuration with the CLI flags.
 * @param base
 * @param cli
 * @returns
 */
export function mergeConfig(base: Config, cli: CliFlags) {
  return {
    ...base,
    input: cli.input ?? base.input ?? '',
    output: cli.output ?? base.output ?? '',
    type: {
      ...base.type,
      export: cli.exportType ?? base.type.export ?? false,
      name: cli.typeCase ?? base.type.name ?? 'PascalCase',
    },
    schema: {
      ...base.schema,
      export: cli.exportSchema ?? base.schema.export ?? false,
      name: cli.schemaCase ?? base.schema.name ?? 'PascalCase',
    },
  }
}
