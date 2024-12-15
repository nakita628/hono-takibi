/**
 * Resolves the order of schema processing based on their dependencies using depth-first search
 *
 * @function resolveSchemaOrder
 * @param name - The name of the current schema to process
 * @param dependencies - Map of schema names to their dependent schema names
 * @param visited - Set of schema names that have been processed
 * @param ordered - Array to store the resolved order of schema names
 * @returns void
 *
 * @example
 * const dependencies = new Map([
 *   ['User', new Set(['Address'])],
 *   ['Address', new Set(['Country'])],
 *   ['Country', new Set()]
 * ])
 *
 * const visited = new Set<string>()
 * const ordered: string[] = []
 *
 * resolveSchemaOrder('User', dependencies, visited, ordered)
 * // ordered will be: ['Country', 'Address', 'User']
 *
 * @note
 * - Uses depth-first search to resolve dependencies
 * - Prevents circular references by tracking visited schemas
 * - Ensures dependent schemas appear before schemas that depend on them
 * - Modifies the ordered array in-place to build the final sequence
 */
export function resolveSchemaOrder(
  name: string,
  dependencies: Map<string, Set<string>>,
  visited: Set<string>,
  ordered: string[],
): void {
  // 1. circulation reference prevention check
  if (visited.has(name)) return
  // 2. mark current schema as visited
  visited.add(name)
  // 3. get dependencies of current schema
  const deps = dependencies.get(name)
  if (deps) {
    for (const dep of deps) {
      resolveSchemaOrder(dep, dependencies, visited, ordered)
    }
  }
  // 4. add current schema to ordered list
  ordered.push(name)
}
