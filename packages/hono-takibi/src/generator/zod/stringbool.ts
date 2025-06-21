export function stringbool(zodSchema: string): string {
  return zodSchema.replace('boolean', 'stringbool')
}
