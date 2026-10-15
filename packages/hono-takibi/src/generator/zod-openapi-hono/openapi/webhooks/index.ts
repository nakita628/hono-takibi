import { makeWebhookEntries } from '../../../../helper/index.js'
import type { OpenAPI } from '../../../../openapi/index.js'

export function webhookCode(openapi: OpenAPI, readonly?: boolean): string {
  return makeWebhookEntries(openapi, readonly)
    .map((entry) => entry.code)
    .join('\n\n')
}
