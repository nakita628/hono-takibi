import type { Content } from '../../types'

/**
 * Get unique content schema
 * @param contentTypes - Content types
 * @param content - Content
 * @returns Unique content schema
 */
export function isUniqueContentSchema(contentTypes: string[], content: Content) {
  const schema = new Set(contentTypes.map((type) => JSON.stringify(content?.[type].schema)))
  return schema.size === 1
}
