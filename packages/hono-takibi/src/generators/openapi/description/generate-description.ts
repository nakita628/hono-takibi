import { escapeQuote } from '../../../core/text/escape-quote'

/**
 * Generate a description for an OpenAPI response
 *
 * @function generateDescription
 * @param description
 * @returns string
 */
export function generateDescription(description: string): string {
  return `{description:'${escapeQuote(description)}',},`
}
