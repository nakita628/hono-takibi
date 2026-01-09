import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/27-extreme-encoding'

/**
 * POST /encoding-test
 */
export async function postEncodingTest(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['encoding-test']['$post'](args)
}

/**
 * GET /content-negotiation
 */
export async function getContentNegotiation(args: {
  header: {
    Accept?: string
    'Accept-Language'?: string
    'Accept-Encoding'?: string
    'Accept-Charset'?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['content-negotiation']['$get'](args)
}

/**
 * POST /binary-variations
 */
export async function postBinaryVariations(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['binary-variations']['$post'](args)
}

/**
 * GET /streaming
 */
export async function getStreaming(args?: { options?: ClientRequestOptions }) {
  return await client.streaming.$get(args)
}

/**
 * POST /streaming
 */
export async function postStreaming(args: { json: string | File; options?: ClientRequestOptions }) {
  return await client.streaming.$post(args)
}

/**
 * POST /url-encoded-complex
 */
export async function postUrlEncodedComplex(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['url-encoded-complex']['$post'](args)
}

/**
 * GET /response-encoding
 */
export async function getResponseEncoding(args?: { options?: ClientRequestOptions }) {
  return await client['response-encoding']['$get'](args)
}

/**
 * POST /schema-encoding
 */
export async function postSchemaEncoding(args: {
  json: {
    base64Field?: string
    base64urlField?: string
    jsonString?: string
    xmlString?: string
    embeddedJson?: string
    binaryData?: string
    imageData?: string
  }
  options?: ClientRequestOptions
}) {
  return await client['schema-encoding']['$post'](args)
}
