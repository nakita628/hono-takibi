import { schema } from '../../../../../utils/index.js'

/**
 * Generates an array of Zod validator strings from OpenAPI parameter objects.
 *
 * @param paramsObj - An object containing `query`, `path`, and `header` parameters.
 * @returns An array of strings like `'query:z.object({...})'` or `'params:z.object({...})'`.
 *
 * @remarks
 * - Skips empty parameter sections.
 * - Converts `path` section to `params` (Hono convention).
 */
export function requestParamsArray(paramsObj: {
  [section: string]: Record<string, string>
}): string[] {
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
          const s = schema(obj)
          // path is params convention
          if (section === 'path') {
            return `params:${s}`
          }
          return `${section}:${s}`
        }
        return null
      })
      // 3. exclude null and return only an array of strings
      .filter((item): item is string => item !== null)
  )
}
