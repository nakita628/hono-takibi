import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/all-features.yaml',
  output: '../../__generated__/all-features-readonly/routes.ts',
  readonly: true,
  exportSchemas: true,
  exportSchemasTypes: true,
  exportResponses: true,
  exportParameters: true,
  exportParametersTypes: true,
  exportExamples: true,
  exportRequestBodies: true,
  exportHeaders: true,
  exportHeadersTypes: true,
  exportSecuritySchemes: true,
  exportLinks: true,
  exportCallbacks: true,
  exportPathItems: true,
  exportMediaTypes: true,
  exportMediaTypesTypes: true,
})
