export type CliFlags = {
  input: string
  output: string
  exportType?: boolean
  exportSchema?: boolean
  typeCase?: 'PascalCase' | 'camelCase'
  schemaCase?: 'PascalCase' | 'camelCase'
  template: boolean
  test: boolean
  basePath?: string
}
