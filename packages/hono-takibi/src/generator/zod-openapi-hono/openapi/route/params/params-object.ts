import type { Parameters, ParamsObject } from '../../../../../openapi/index.js'
import { zodToOpenAPI } from '../../../../zod-to-openapi/index.js'
import { getToSafeIdentifier } from '../../../../../core/utils/index.js'
import { queryParameter } from './index.js'

/**
 * Generates a params object containing Zod schemas for different parameter locations
 * @param { Parameters[] } parameters - Array of OpenAPI path parameters
 * @returns { ParamsObject } ParamsObject with Zod schemas organized by parameter location
 * @remarks
 * - Creates Zod schemas for each parameter based on its schema definition
 * - Handles optional parameters by adding .optional() suffix
 * - Organizes parameters into appropriate objects based on their location
 * - Maintains empty objects for unused parameter locations
 */
export function paramsObject(parameters: Parameters[]): ParamsObject {
  return parameters.reduce((acc: ParamsObject, param) => {
    const optionalSuffix = param.required ? '' : '.optional()'
    // path params are generated with the param name
    const baseSchema = param.in
      ? zodToOpenAPI(param.schema, param.name, param.in)
      : zodToOpenAPI(param.schema, param.name)

    // Initialize section if it doesn't exist
    if (!acc[param.in]) {
      acc[param.in] = {}
    }

    // queryParameter check
    const zodSchema = queryParameter(baseSchema, param)

    // Add parameter to its section
    acc[param.in][getToSafeIdentifier(param.name)] = `${zodSchema}${optionalSuffix}`
    return acc
  }, {})
}
