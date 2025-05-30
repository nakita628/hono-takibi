import type { Operation } from '../../../../types/index.js'
import type { Config } from '../../../../config/index.js'
import { generateCreateRoute } from './generate-create-route.js'
import { generateRequestParameter } from './params/generate-request-parameter.js'
import { generateResponseSchema } from './response/generate-response-schema.js'
import { generateRouteName } from './generate-route-name.js'
import { escapeStr } from '../../../../core/text/escape-str.js'
/**
 * Generates TypeScript code for a Hono route based on OpenAPI operation details
 * @param { string } path - The URL path pattern for the route
 * @param { string } method - The HTTP method (GET, POST, etc.)
 * @param { Operation } operation - The OpenAPI Operation object containing route details
 * @param { Config } config - Config
 * @returns { string } Generated TypeScript code string for the route
 *
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
 */

export function generateRoute(
  path: string,
  method: string,
  operation: Operation,
  config: Config,
): string {
  const { tags, operationId, summary, description, security, parameters, requestBody, responses } =
    operation
  const routeName = generateRouteName(method, path)
  const tagList = tags ? JSON.stringify(tags) : '[]'
  const requestParams = generateRequestParameter(parameters, requestBody, config)

  const create_args = {
    routeName,
    tagsCode: tags ? `tags:${tagList},` : '',
    methodCode: `method:'${method}',`,
    pathCode: `path:'${path}',`,
    operationIdCode: operationId ? `operationId:'${operationId}',` : '',
    summaryCode: summary ? `summary:'${escapeStr(summary)}',` : '',
    descriptionCode: description ? `description:'${escapeStr(description)}',` : '',
    securityCode: security ? `security:${JSON.stringify(security)},` : '',
    requestParams: requestParams ? `${requestParams}` : '',
    responsesCode: responses ? `responses:{${generateResponseSchema(responses, config)}}` : '',
  }
  return generateCreateRoute(create_args)
}
