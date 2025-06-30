export function isYamlOrJsonOrTsp(
  i: string,
): i is `${string}.yaml` | `${string}.json` | `${string}.tsp` {
  return i.endsWith('.yaml') || i.endsWith('.json') || i.endsWith('.tsp')
}
