import { client } from '../index.ts'

/**
 * POST /validate
 */
export async function postValidate(body: {
  extremeStrings?: {
    emptyOnly?: string
    singleChar?: string
    veryLong?: string
    conflictingPatternFormat?: string
    multiPattern?: string
    unicodePattern?: string
    complexRegex?: string
    emptyPattern?: string
    impossiblePattern?: string
    allFormats?: {
      dateTime?: string
      date?: string
      time?: string
      duration?: string
      email?: string
      idnEmail?: string
      hostname?: string
      idnHostname?: string
      ipv4?: string
      ipv6?: string
      uri?: string
      uriReference?: string
      iri?: string
      iriReference?: string
      uriTemplate?: string
      jsonPointer?: string
      relativeJsonPointer?: string
      regex?: string
      uuid?: string
      byte?: string
      binary?: string
      password?: string
    }
  }
  extremeNumbers?: {
    zeroOnly?: number
    negativeZero?: number
    tinyRange?: number
    hugePositive?: number
    hugeNegative?: number
    preciseMultiple?: number
    conflictingMultiple?: number
    integerDecimalMultiple?: number
    exclusiveEdge?: number
    bothExclusive?: number
    int32Bounded?: number
    int64Bounded?: number
    floatEdge?: number
    doubleEdge?: number
  }
  extremeArrays?: {
    emptyOnly?: unknown[]
    singleOnly?: string[]
    hugeArray?: string[]
    uniqueBooleans?: boolean[]
    uniqueEnum?: ('a' | 'b' | 'c')[]
    deeplyNested?: string[][][][]
    uniqueNested?: number[][]
    largeTuple?: unknown[]
    tupleWithAdditional?: boolean[]
    containsConstraint?: unknown[]
  }
  extremeObjects?: {
    emptyOnly?: {}
    singleProperty?: { [key: string]: string }
    manyRequired?: {
      prop1: string
      prop2: string
      prop3: string
      prop4: string
      prop5: string
      prop6: string
      prop7: string
      prop8: string
      prop9: string
      prop10: string
      prop11: string
      prop12: string
      prop13: string
      prop14: string
      prop15: string
      prop16: string
      prop17: string
      prop18: string
      prop19: string
      prop20: string
    }
    patternProperties?: {}
    dependentRequired?: {
      billing_address?: string
      shipping_address?: string
      use_same_address?: boolean
    }
    dependentSchemas?: { credit_card?: string; billing_address?: string }
    propertyNames?: { [key: string]: string }
    unevaluatedProps?: { known?: string }
  }
  extremeCompositions?: {
    manyOneOf?:
      | string
      | string
      | string
      | string
      | string
      | string
      | string
      | string
      | string
      | string
      | number
      | boolean
      | string[]
      | {}
      | null
    deeplyNestedComposition?:
      | ({ a?: string } & { b?: number })
      | { c?: boolean }
      | ({ d?: number } & { e?: string })
    complexNot?: { value?: string } & unknown
    conditionalChain?: {}
    conflictingAllOf?: { shared?: string } & { shared?: string } & { shared?: string }
    recursiveConstrained?: { value?: string; children?: unknown[] }
  }
}) {
  return await client.validate.$post({ json: body })
}
