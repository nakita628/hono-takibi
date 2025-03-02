import type { DefaultValue } from '../../types'

export function generateZodDefault(defaultValue: DefaultValue): string {
  return `.default(${JSON.stringify(defaultValue)})`
}
