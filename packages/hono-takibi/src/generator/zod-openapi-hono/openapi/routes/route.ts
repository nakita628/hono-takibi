import { makeOperation } from '../../../../helper/openapi.js'
import type { Operation } from '../../../../openapi/index.js'
import {
  methodPath,
} from '../../../../utils/index.js'


export function route(path: string, method: string, operation: Operation): string {
  const properties = [
    `method:'${method}',`,
    `path:'${path}',`,
    ...Object.values(makeOperation(operation))
  ].join('')

  return `export const ${methodPath(method, path)}Route=createRoute({${properties}})`
}
