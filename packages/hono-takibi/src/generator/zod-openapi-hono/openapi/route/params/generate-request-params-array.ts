import type { ParamsObject } from '../../../../../types'
import { generateZodObjectSchema } from '../../../../zod/generate-zod-object-schema'

/**
 * Generates an array of Zod schema strings for non-empty parameter sections
 * @param { ParamsObject } paramsObj - Object containing query, path, and header parameter schemas
 * @returns { string[] } Array of Zod schema strings
 */
export function generateRequestParamsArray(paramsObj: ParamsObject): string[] {
  // 1.  define sections to be processed
  const sections = Object.entries(paramsObj)
    .filter(([_, obj]) => obj && Object.keys(obj).length > 0)
    .map(([section]) => section)

  // 2. processing of each section
  return (
    sections
      .map((section) => {
        const obj = paramsObj[section]
        // 2.1 process only if object is not empty
        if (Object.keys(obj).length) {
          const schema = generateZodObjectSchema(obj)
          // path is params convention
          if (section === 'path') {
            return `params:${schema}`
          }
          return `${section}:${schema}`
        }
        return null
      })
      // 3. exclude null and return only an array of strings
      .filter((item): item is string => item !== null)
  )
}
