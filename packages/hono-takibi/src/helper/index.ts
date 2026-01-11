export type { CircularAnalysis } from './ast.js'
export { analyzeCircularSchemas, ast } from './ast.js'
export { makeBarell } from './barell.js'
export { makeConst, makeExportConst, makeImports, makeModuleSpec } from './code.js'
export { core } from './core.js'
export { makeExports } from './exports.js'
export {
  makeCallbacks,
  makeContent,
  makeEncoding,
  makeExamples,
  makeHeadersAndReferences,
  makeLinkOrReference,
  makeMedia,
  makeOperationCallbacks,
  makeOperationResponses,
  makeParameters,
  makeRef,
  makeRequest,
  makeRequestBody,
  makeRequestParams,
  makeResponses,
} from './openapi.js'
export {
  findSchemaRefs,
  makeSchemaCode,
  makeSchemaInfo,
  makeSchemaInfos,
  makeSplitSchemaFile,
  makeTypeDefinition,
  makeTypeDefinitions,
} from './schema.js'
export { makeRecordTypeString, makeTypeString } from './type.js'
export { wrap } from './wrap.js'

// Test run
// pnpm vitest run ./packages/hono-takibi/src/helper/index.ts
if (import.meta.vitest) {
  const { describe, it, expect } = import.meta.vitest
  const helper = await import('./index.js')

  describe('helper barrel file exports', () => {
    it('should export ast', () => {
      expect(typeof helper.ast).toBe('function')
    })
    it('should export wrap', () => {
      expect(typeof helper.wrap).toBe('function')
    })
  })
}
