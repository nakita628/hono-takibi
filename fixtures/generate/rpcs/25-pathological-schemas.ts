import { client } from '../clients/25-pathological-schemas'

/**
 * POST /pathological
 */
export async function postPathological(arg: {
  json: {
    contradictions?: {
      impossibleLength?: string
      impossibleRange?: number
      noValidInteger?: number
      impossibleArray?: string[]
      impossibleObject?: {}
      missingRequired?: { existingProperty?: string }
      constEnumConflict?: 'other1' | 'other2'
      typeConflictAllOf?: string & number
      formatTypeMismatch?: number
      multipleConst?: 'value1' & 'value2'
    }
    impossible?: {
      alwaysFalse?: unknown
      emptyOneOf?: never
      emptyAnyOf?: never
      impossibleAllOf?: string & unknown[] & {} & number
      emptyEnum?: never
      impossiblePattern?: string
      integerDecimal?: number
      closedEmpty?: {}
    }
    ambiguous?: {
      noType?: unknown
      empty?: unknown
      justFalse?: unknown
      justTrue?: unknown
      deepAny?: unknown
      overlappingOneOf?: { a?: string } | { a?: string; b?: string } | { [key: string]: unknown }
      ambiguousAnyOf?: number | number | 1 | 2 | 3 | 2
      ambiguousDiscriminator?: { type?: 'a' | 'b' } | { type?: 'b' | 'c' }
    }
    edgeCases?: {
      deepNesting?: {
        l1?: {
          l2?: { l3?: { l4?: { l5?: { l6?: { l7?: { l8?: { l9?: { l10?: string } } } } } } } }
        }
      }
      wideObject?: {
        p001?: string
        p002?: string
        p003?: string
        p004?: string
        p005?: string
        p006?: string
        p007?: string
        p008?: string
        p009?: string
        p010?: string
        p011?: string
        p012?: string
        p013?: string
        p014?: string
        p015?: string
        p016?: string
        p017?: string
        p018?: string
        p019?: string
        p020?: string
        p021?: string
        p022?: string
        p023?: string
        p024?: string
        p025?: string
        p026?: string
        p027?: string
        p028?: string
        p029?: string
        p030?: string
        p031?: string
        p032?: string
        p033?: string
        p034?: string
        p035?: string
        p036?: string
        p037?: string
        p038?: string
        p039?: string
        p040?: string
        p041?: string
        p042?: string
        p043?: string
        p044?: string
        p045?: string
        p046?: string
        p047?: string
        p048?: string
        p049?: string
        p050?: string
      }
      manyRequired?: {
        r01: string
        r02: string
        r03: string
        r04: string
        r05: string
        r06: string
        r07: string
        r08: string
        r09: string
        r10: string
        r11: string
        r12: string
        r13: string
        r14: string
        r15: string
        r16: string
        r17: string
        r18: string
        r19: string
        r20: string
      }
      onlyFalse?: false
      onlyTrue?: true
      onlyNull?: null
      exactlyOne?: { [key: string]: string }
      exactlyOneItem?: { id: string }[]
    }
    recursive?: {
      mutuallyRecursive?: {
        value?: string
        refB?: { value?: number; refC?: { value?: boolean; refA?: unknown } }
      }
      constrainedRecursive?: {
        value: string
        children?: unknown[]
        parent?: unknown
        siblings?: unknown[]
      }
      recursiveInAllOf?: { value?: string } & { child?: unknown }
      recursiveInOneOf?: string | { nested?: unknown }
      recursiveMap?: { [key: string]: unknown }
      recursiveArray?: unknown[][]
    }
    composition?: {
      nestedAllOf?: (({ a?: string } & { b?: string }) & { c?: string }) & { d?: string }
      nestedOneOf?: 'deep1' | 'deep2' | 1 | 2
      nestedAnyOf?: string | number | boolean | null
      allMixed?: string | number | boolean | (null & unknown)
      conditionalInAllOf?: { type?: string } & unknown
      multiDiscriminator?:
        | { kind: 'typeA'; valueA?: string }
        | { kind: 'typeB'; valueB?: number }
        | { kind: 'typeC'; valueC?: boolean }
      conflictingRequired?: { fieldA: string } & { fieldB: string } & { fieldC: string } & {}
      overlappingSchemas?:
        | { a: string; b: string }
        | { a: string; c: string }
        | { b: string; c: string }
    }
  }
}) {
  return await client.pathological.$post(arg)
}
