import { makeQueryHooks } from '../../helper/query.js'
import type { OpenAPI } from '../../openapi/index.js'

export async function swr(
  openAPI: OpenAPI,
  output: string,
  importPath: string,
  split?: boolean,
  clientName = 'client',
) {
  const config = {
    packageName: 'swr',
    frameworkName: 'SWR',
    hookPrefix: 'use',
    queryFn: 'useSWR',
    mutationFn: 'useSWRMutation',
    useQueryOptionsType: 'SWRConfiguration',
    useMutationOptionsType: 'SWRMutationConfiguration',
    isSWR: true,
    immutableQueryFn: 'useSWRImmutable',
    infiniteQueryFn: 'useSWRInfinite',
    useInfiniteQueryOptionsType: 'SWRInfiniteConfiguration',
  }
  return makeQueryHooks(openAPI, output, importPath, config, split, clientName)
}
