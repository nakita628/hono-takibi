import { client } from '../index.ts'

/**
 * POST /encoding-test
 */
export async function postEncodingTest(body: {
  simpleString?: string
  arrayExplode?: string[]
  arrayNoExplode?: string[]
  objectForm?: { key1?: string; key2?: number }
  objectDeepObject?: { nested?: { deep?: string } }
  imageFile?: string
  documentFile?: string
  jsonString?: { data?: string }
  base64Data?: string
  multipleFiles?: string[]
  complexNested?: { level1?: { level2?: { value?: string; array?: number[] } } }
  arrayOfObjects?: { id?: number; name?: string }[]
  partWithHeaders?: string
}) {
  return await client['encoding-test'].$post({ json: body })
}

/**
 * GET /content-negotiation
 */
export async function getContentNegotiation() {
  return await client['content-negotiation'].$get()
}

/**
 * POST /binary-variations
 */
export async function postBinaryVariations(body: {
  data?: string
  filename?: string
  mimeType?: string
}) {
  return await client['binary-variations'].$post({ json: body })
}

/**
 * GET /streaming
 */
export async function getStreaming() {
  return await client.streaming.$get()
}

/**
 * POST /streaming
 */
export async function postStreaming(body: string) {
  return await client.streaming.$post({ json: body })
}

/**
 * POST /url-encoded-complex
 */
export async function postUrlEncodedComplex(body: {
  string?: string
  number?: number
  boolean?: boolean
  arrayDefault?: string[]
  arrayExplode?: number[]
  nested?: { key1?: string; key2?: { subkey?: string } }
  specialChars?: string
  unicode?: string
  emptyString?: string
  multiValue?: string[]
}) {
  return await client['url-encoded-complex'].$post({ json: body })
}

/**
 * GET /response-encoding
 */
export async function getResponseEncoding() {
  return await client['response-encoding'].$get()
}

/**
 * POST /schema-encoding
 */
export async function postSchemaEncoding(body: {
  base64Field?: string
  base64urlField?: string
  jsonString?: string
  xmlString?: string
  embeddedJson?: string
  binaryData?: string
  imageData?: string
}) {
  return await client['schema-encoding'].$post({ json: body })
}
