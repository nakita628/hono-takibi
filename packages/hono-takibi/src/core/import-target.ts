export type ImportTarget = {
  readonly output: string | `${string}.ts`
  readonly split?: boolean
  readonly import?: string
}

export function makeImportTarget(
  output: string | `${string}.ts`,
  split?: boolean,
  importSpec?: string,
): ImportTarget {
  return {
    output,
    ...(split !== undefined ? { split } : {}),
    ...(importSpec !== undefined ? { import: importSpec } : {}),
  }
}
