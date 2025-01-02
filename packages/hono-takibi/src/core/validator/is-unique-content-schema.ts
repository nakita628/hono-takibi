import { ResponseDefinition } from '../../types'

/**
 * Get unique content schema
 * @param contentTypes - Content types
 * @param response - Response
 * @returns Unique content schema
 */
export function isUniqueContentSchema(contentTypes: string[], response: ResponseDefinition) {
  const schema = new Set(
    contentTypes.map((type) => JSON.stringify(response.content?.[type].schema)),
  )
  return schema.size === 1 ? true : false
}
