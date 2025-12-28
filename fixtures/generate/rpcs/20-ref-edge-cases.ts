import { client } from '../index.ts'

/**
 * GET /test
 */
export async function getTest(params: {
  query: { refParam: { id: string; name: string; value?: number } }
}) {
  return await client.test.$get({ query: params.query })
}

/**
 * GET /empty-refs
 */
export async function getEmptyRefs() {
  return await client['empty-refs'].$get()
}

/**
 * GET /unicode-refs
 */
export async function getUnicodeRefs() {
  return await client['unicode-refs'].$get()
}

/**
 * GET /special-chars
 */
export async function getSpecialChars() {
  return await client['special-chars'].$get()
}

/**
 * GET /numeric-start
 */
export async function getNumericStart() {
  return await client['numeric-start'].$get()
}

/**
 * GET /ref-in-allof
 */
export async function getRefInAllof() {
  return await client['ref-in-allof'].$get()
}

/**
 * GET /deeply-nested
 */
export async function getDeeplyNested() {
  return await client['deeply-nested'].$get()
}

/**
 * GET /same-name-diff-context
 */
export async function getSameNameDiffContext() {
  return await client['same-name-diff-context'].$get()
}
