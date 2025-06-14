import type { Config } from '../../config/index.js'
import { err } from '../../result/err.js'
import type { Result } from '../../result/types.js'
import type { CliFlags } from '../types/index.js'

/**
 * Merge the base configuration with the CLI flags, returning a Result.
 * @param base
 * @param cli
 * @returns Result<Config, string>
 */
export function setConfig(
  base: Config,
  cli: CliFlags,
): Result<
  {
    schema: {
      name: 'PascalCase' | 'camelCase'
      export: boolean
    }
    type: {
      name: 'PascalCase' | 'camelCase'
      export: boolean
    }
    input: string
    output: string
  },
  string
> {
  const input = cli.input ?? base.input
  const output = cli.output ?? base.output

  if (!input || !output) {
    return err('Usage: hono-takibi <input-file> -o <output-file>')
  }

  return {
    ok: true,
    value: {
      ...base,
      input,
      output,
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
    },
  }
}
