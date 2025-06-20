export type CliFlags = {
  input: `${string}.yaml` | `${string}.json`
  output: `${string}.ts`
  exportType?: boolean
  exportSchema?: boolean
  template: boolean
  test: boolean
  basePath?: string
}
