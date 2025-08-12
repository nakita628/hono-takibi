import type { OpenAPI } from '../../openapi/index.js'

export function honoRpc(openapi: OpenAPI): string {
  console.log(openapi)
  return 'rpc'
}
