export function isYamlOrJson(i: string): i is `${string}.yaml` | `${string}.json` {
  return i.endsWith('.yaml') || i.endsWith('.json')
}
