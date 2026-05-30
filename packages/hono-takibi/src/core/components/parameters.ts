import path from 'node:path'

import { emit } from '../../emit/index.js'
import { parametersCode } from '../../generator/zod-openapi-hono/openapi/components/parameters.js'
import { makeImports } from '../../helper/index.js'
import type { Components } from '../../openapi/index.js'
import { makeBarrel, uncapitalize } from '../../utils/index.js'

export async function parameters(
  parameters: Components['parameters'],
  output: string,
  split: boolean,
  exportType: boolean,
  components?: {
    readonly [k: string]: {
      readonly output: string
      readonly split?: boolean
      readonly import?: string
    }
  },
  readonly?: boolean,
) {
  if (!parameters) return { ok: false, error: 'No parameters found' } as const
  const parameterNames = Object.keys(parameters)
  if (parameterNames.length === 0) return { ok: true, value: 'No parameters found' } as const
  if (split) {
    const outDir = path.join(path.dirname(output), path.basename(output, '.ts'))
    const results = await Promise.all([
      ...parameterNames.map((parameterName) => {
        const singleComponent = { parameters: { [parameterName]: parameters[parameterName] } }
        const code = parametersCode(singleComponent, true, exportType, readonly)
        const filePath = path.join(outDir, `${uncapitalize(parameterName)}.ts`)
        return emit(
          makeImports(code, filePath, components, split),
          path.dirname(filePath),
          filePath,
        )
      }),
      emit(makeBarrel(parameters), outDir, path.join(outDir, 'index.ts')),
    ])
    const e = results.find((result) => !result.ok)
    if (e) return e
    return {
      ok: true,
      value: `Generated parameters code written to ${outDir}/*.ts (index.ts included)`,
    } as const
  }
  const parameterDefinitions = parametersCode({ parameters }, true, exportType, readonly)
  const emitResult = await emit(
    makeImports(parameterDefinitions, output, components, split),
    path.dirname(output),
    output,
  )
  if (!emitResult.ok) return { ok: false, error: emitResult.error } as const
  return { ok: true, value: `Generated parameters code written to ${output}` } as const
}
