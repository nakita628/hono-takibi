import type { Content } from '../../types'

/**
 * Get unique content schema
 * @param {string[]} contentTypes - Content types
 * @param {Content} content - Content
 * @returns {boolean} Unique content schema
 */
export function isUniqueContentSchema(contentTypes: string[], content: Content): boolean {
  const schema = new Set(contentTypes.map((type) => JSON.stringify(content?.[type].schema)))
  return schema.size === 1
}
