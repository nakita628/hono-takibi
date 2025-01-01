import type { Parameter, ParamsObject, Parameters } from '../../../types'
import { generateZodCoerce } from '../../zod/generate-zod-coerce'
import { generateZodSchema } from '../../zod/generate-zod-schema'

/**
 * Mapping of parameter locations to their corresponding object keys
 */
const PARAM_LOCATION_TO_KEY: Record<Parameter, keyof ParamsObject> = {
  query: 'query',
  path: 'params',
  header: 'headers',
  body: 'body',
} as const

/**
 * Generates a params object containing Zod schemas for different parameter locations
 *
 * @function generateParamsObject
 * @param parameters - Array of OpenAPI path parameters
 * @returns ParamsObject with Zod schemas organized by parameter location
 *
 * @example
 * // Query and path parameters
 * generateParamsObject([
 *   {
 *     name: 'userId',
 *     in: 'path',
 *     required: true,
 *     schema: { type: 'string' }
 *   },
 *   {
 *     name: 'filter',
 *     in: 'query',
 *     required: false,
 *     schema: { type: 'string' }
 *   }
 * ])
 * // Returns:
 * // {
 * //   query: { filter: 'z.string().optional()' },
 * //   params: { userId: 'z.string()' },
 * //   headers: {},
 * //   body: {}
 * // }
 *
 * @example
 * // Body parameter
 * generateParamsObject([
 *   {
 *     name: 'user',
 *     in: 'body',
 *     required: true,
 *     schema: {
 *       type: 'object',
 *       properties: {
 *         name: { type: 'string' }
 *       }
 *     }
 *   }
 * ])
 * // Returns:
 * // {
 * //   query: {},
 * //   params: {},
 * //   headers: {},
 * //   body: { user: 'z.object({name: z.string().optional()})' }
 * // }
 *
 * @remarks
 * - Creates Zod schemas for each parameter based on its schema definition
 * - Handles optional parameters by adding .optional() suffix
 * - Organizes parameters into appropriate objects based on their location
 * - Maintains empty objects for unused parameter locations
 */
// want to refactor this
export function generateParamsObject(parameters: Parameters[]): ParamsObject {
  const initialParamsObj: ParamsObject = {
    query: {},
    params: {},
    headers: {},
    body: {},
  }

  return parameters.reduce((acc, param) => {
    const optionalSuffix = param.required ? '' : '.optional()'
    const paramLocation = PARAM_LOCATION_TO_KEY[param.in]
    const baseSchema = generateZodSchema(param.schema)

    const isCoerceNeeded =
      paramLocation === 'query' &&
      (param.schema.type === 'number' || param.schema.type === 'integer')

    const zodSchema = isCoerceNeeded ? generateZodCoerce('z.string()', baseSchema) : baseSchema

    acc[paramLocation][param.name] = `${zodSchema}${optionalSuffix}`
    return acc
  }, initialParamsObj)
}
