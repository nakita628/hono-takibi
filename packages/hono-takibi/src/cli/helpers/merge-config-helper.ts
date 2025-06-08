import type { Config } from '../../config/index.js'
import type { CliFlags } from '../types/index.js'

/**
 * Merge the base configuration with the CLI flags.
 * @param base
 * @param f
 * @returns
 */
export function mergeConfigHelper(base: Config, f: CliFlags) {
  return {
    ...base,
    input: f.input,
    output: f.output,
    type: { ...base.type, export: f.exportType, name: f.typeCase },
    schema: { ...base.schema, export: f.exportSchema, name: f.schemaCase },
  }
}
