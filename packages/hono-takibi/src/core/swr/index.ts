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
  const result = await makeQueryHooks(openAPI, output, importPath, config, split, clientName)
  if (result.ok) {
    if (split) {
      const outDir = output.endsWith('.ts') ? output.slice(0, -'/index.ts'.length) : output
      return {
        ok: true,
        value: `Generated swr hooks written to ${outDir}/*.ts (index.ts included)`,
      } as const
    }
    return {
      ok: true,
      value: `Generated swr hooks written to ${output}`,
    } as const
  }
  return result
}
