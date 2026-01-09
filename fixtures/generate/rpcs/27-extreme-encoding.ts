import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export async function postEncodingTest(arg: {
  form: {
    simpleString?: string
    arrayExplode?: string[]
    arrayNoExplode?: string[]
    objectForm?: { key1?: string; key2?: number }
    objectDeepObject?: { nested?: { deep?: string } }
    imageFile?: File
    documentFile?: File
    jsonString?: { data?: string }
    base64Data?: string
    multipleFiles?: File[]
    complexNested?: { level1?: { level2?: { value?: string; array?: number[] } } }
    arrayOfObjects?: { id?: number; name?: string }[]
    partWithHeaders?: string
  }
}) {
  return await client['encoding-test']['$post'](arg)
}

/**
 * GET /content-negotiation
 */
export async function getContentNegotiation(arg: {
  header: {
    Accept?: string
    'Accept-Language'?: string
    'Accept-Encoding'?: string
    'Accept-Charset'?: string
  }
}) {
  return await client['content-negotiation']['$get'](arg)
}

/**
 * POST /binary-variations
 */
export async function postBinaryVariations(arg: {
  json:
    | File
    | { data?: string; filename?: string; mimeType?: string }
    | { part1?: File; part2?: File; part3?: File }
    | File
    | File
    | File
    | File
    | string
    | File
    | File
    | File
    | File
    | File
    | File
    | File
    | File
    | File
}) {
  return await client['binary-variations']['$post'](arg)
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
export async function postStreaming(arg: { json: string | File }) {
  return await client.streaming.$post(arg)
}

/**
 * POST /url-encoded-complex
 */
export async function postUrlEncodedComplex(arg: {
  form: {
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
  }
}) {
  return await client['url-encoded-complex']['$post'](arg)
}

/**
 * GET /response-encoding
 */
export async function getResponseEncoding() {
  return await client['response-encoding']['$get']()
}

/**
 * POST /schema-encoding
 */
export async function postSchemaEncoding(arg: {
  json: {
    base64Field?: string
    base64urlField?: string
    jsonString?: string
    xmlString?: string
    embeddedJson?: string
    binaryData?: string
    imageData?: string
  }
}) {
  return await client['schema-encoding']['$post'](arg)
}
