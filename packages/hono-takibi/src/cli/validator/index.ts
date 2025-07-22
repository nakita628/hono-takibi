/**
 * Checks if a string is a valid `.ts` file (excluding `.d.ts`).
 *
 * @param o - The file path to check.
 * @returns `true` if the path ends with `.ts` and not `.d.ts`.
 */
export function isTs(o: string): o is `${string}.ts` {
  return o.endsWith('.ts') && !o.endsWith('.d.ts')
}

/**
 * Checks if a string ends with `.yaml`, `.json`, or `.tsp`.
 *
 * @param i - The file path to check.
 * @returns `true` if the path is a supported input format.
 */
export function isYamlOrJsonOrTsp(
  i: string,
): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` {
  return i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
}
