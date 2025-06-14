export type CliFlags = {
  input: `${string}.yaml` | `${string}.json`
  output: `${string}.ts`
  exportType?: boolean
  exportSchema?: boolean
  typeCase?: 'PascalCase' | 'camelCase'
  schemaCase?: 'PascalCase' | 'camelCase'
  template: boolean
  test: boolean
  basePath?: string
}
