import type { Operation } from '../../../../type'
import type { Config } from '../../../../config'
import { generateCreateRoute } from './generate-create-route'
import { generateRequestParameter } from './params/generate-request-parameter'
import { generateResponseSchema } from './response/generate-response-schema'
import { generateRouteName } from './generate-route-name'
import { escapeStr } from '../../../../core/text/escape-str'
/**
 * Generates TypeScript code for a Hono route based on OpenAPI operation details
 *
 * @function generateRoute
 * @param path - The URL path pattern for the route
 * @param method - The HTTP method (GET, POST, etc.)
 * @param operation - The OpenAPI Operation object containing route details
 * @returns Generated TypeScript code string for the route
 *
 * @note
 * - Generates a complete route definition including:
 *   - Route name based on method and path
 *   - OpenAPI tags for documentation
 *   - HTTP method and path
 *   - Route description
 *   - Security requirements
 *   - Request parameters and body validation
 *   - Response schemas for different status codes
 * - All components are properly escaped and formatted
 * - Handles optional parameters appropriately
 * - Integrates with Hono's createRoute function
 *
 * @returns string
 */

export function generateRoute(
  path: string,
  method: string,
  operation: Operation,
  config: Config,
): string {
  const { tags, summary, description, security, parameters, requestBody, responses } = operation
  const routeName = generateRouteName(method, path)
  const tagList = tags ? JSON.stringify(tags) : '[]'
  const requestParams = generateRequestParameter(parameters, requestBody, config)

  const create_args = {
    routeName,
    tagsCode: `tags:${tagList},`,
    methodCode: `method:'${method}',`,
    pathCode: `path:'${path}',`,
    summaryCode: summary ? `summary:'${escapeStr(summary)}',` : '',
    descriptionCode: description ? `description:'${escapeStr(description)}',` : '',
    securityCode: security ? `security:${JSON.stringify(security)},` : '',
    requestParams: requestParams ? `${requestParams}` : '',
    responsesCode: responses ? `responses:{${generateResponseSchema(responses, config)}}` : '',
  }
  return generateCreateRoute(create_args)
}
