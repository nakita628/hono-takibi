import type { ExampleValue } from '../../types'

export function generateZodOpenAPIExample(schema: string, example: ExampleValue): string {
  return `${schema}.openapi({example:${JSON.stringify(example)}})`
}
