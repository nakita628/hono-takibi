export function generateZodUnion(schemas: string[]): string {
  return `z.union([${schemas.join(',')}])`
}
