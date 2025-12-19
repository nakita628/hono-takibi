import type { Components } from '../../../../openapi/index.js'
import { callbacks } from './callbacks.js'
import { examples } from './examples.js'
import { headers } from './headers.js'
import { links } from './links.js'
import { parameters } from './parameters.js'
import { requestBodies } from './request-bodies.js'
import { responses } from './responses.js'
import { schemas } from './schemas.js'
import { securitySchemes } from './securitySchemes.js'

/**
 * Converts OpenAPI component schemas to Zod-based TypeScript definitions.
 *
 * @param components - The OpenAPI components object.
 * @param exportSchema - Whether to export the Zod schema variables.
 * @param exportType - Whether to export the inferred Zod types.
 * @returns A string of TypeScript code with Zod schema and type definitions, or an empty string if no schemas exist.
 *
 * @remarks
 * - Resolves schema dependency order to avoid reference errors.
 * - Skips generation if no schemas are defined.
 * - Uses `zodToOpenAPI` and `zodToOpenAPISchema` for code generation.
 * - Order follows OpenAPI Specification: schemas, parameters, securitySchemes, requestBodies, responses, headers, examples, links, callbacks
 */
export function componentsCode(
  components: Components,
  exportSchema: boolean,
  exportType: boolean,
): string {
  const out: string[] = []
  // schemas
  const schemaDefinitions = schemas(components, exportSchema, exportType)
  if (schemaDefinitions) out.push(schemaDefinitions)
  // parameters
  const parametersDefinitions = parameters(components, exportSchema, exportType)
  if (parametersDefinitions) out.push(parametersDefinitions)
  // securitySchemes
  const securitySchemesDefinitions = securitySchemes(components, exportSchema)
  if (securitySchemesDefinitions) out.push(securitySchemesDefinitions)
  // requestBodies
  const requestBodiesDefinitions = requestBodies(components, exportSchema)
  if (requestBodiesDefinitions) out.push(requestBodiesDefinitions)
  // responses
  const responsesDefinitions = responses(components, exportSchema)
  if (responsesDefinitions) out.push(responsesDefinitions)
  // headers
  const headersDefinitions = headers(components, exportSchema)
  if (headersDefinitions) out.push(headersDefinitions)
  // examples
  const examplesDefinitions = examples(components, exportSchema)
  if (examplesDefinitions) out.push(examplesDefinitions)
  // links
  const linksDefinitions = links(components, exportSchema)
  if (linksDefinitions) out.push(linksDefinitions)
  // callbacks
  const callbacksDefinitions = callbacks(components, exportSchema)
  if (callbacksDefinitions) out.push(callbacksDefinitions)
  return out.filter(Boolean).join('\n\n')
}
