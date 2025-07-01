import type { SupportedOpenAPIDocuments } from '@typespec/openapi3'
import { compile, logDiagnostics, NodeHost } from '@typespec/compiler'
import { getOpenAPI3 } from '@typespec/openapi3'
import path from 'node:path'

export async function typeSpecToOpenAPI(input: string): Promise<SupportedOpenAPIDocuments> {
  console.log(input)
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
