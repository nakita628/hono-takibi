export function isTs(o: string): o is `${string}.ts` {
  return o.endsWith('.ts') && !o.endsWith('.d.ts')
}
