import type { SupportedOpenAPIDocuments } from '@typespec/openapi3'
import { compile, logDiagnostics, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'
import path from 'node:path'

/**
 * @param { string } input - The path to the TypeSpec file.
 * @returns { Promise<SupportedOpenAPIDocuments> } - A promise that resolves to the OpenAPI documents generated from the TypeSpec file.
 * @description Compiles a TypeSpec file to OpenAPI documents.
 */
export async function typeSpecToOpenAPI(input: string): Promise<SupportedOpenAPIDocuments> {
  const program = await compile(NodeHost, path.resolve(input), {
    noEmit: true,
  })

  if (program.diagnostics.length) {
    logDiagnostics(program.diagnostics, program.host.logSink)
    throw new Error('TypeSpec compile failed')
  }

  const [record] = await getOpenAPI3(program)
  return 'document' in record ? record.document : record.versions[0].document
}
