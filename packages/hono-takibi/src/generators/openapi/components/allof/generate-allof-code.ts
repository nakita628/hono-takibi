import type { Schema } from '../../../../types'
import type { Config } from '../../../../config'
import { generateZodSchema } from '../../../zod/generate-zod-schema'
import { getVariableSchemaNameHelper } from '../../../../core/helper/get-variable-schema-name-helper'
import { isNullableSchema } from '../../../../core/validator/is-nullable-schema'

type Accumulator = {
  nullable: boolean
  schemas: string[]
}

/**
 * サブスキーマから参照スキーマ名を取得します。
 *
 * @param subSchema - サブスキーマオブジェクト
 * @param config - 設定オブジェクト
 * @returns 参照スキーマ名
 */
function getRefSchemaName(subSchema: Schema, config: Config): string {
  const refName = subSchema.$ref?.split('/').pop()
  if (!refName) {
    throw new Error('refName is not found')
  }
  return getVariableSchemaNameHelper(refName, config)
}

/**
 * サブスキーマからZodスキーマを生成します。
 *
 * @param subSchema - サブスキーマオブジェクト
 * @param config - 設定オブジェクト
 * @returns 生成されたZodスキーマの文字列
 */
function generateZodSchemaFromSubSchema(subSchema: Schema, config: Config): string {
  return subSchema.$ref ? getRefSchemaName(subSchema, config) : generateZodSchema(config, subSchema)
}

/**
 * `allOf` 配列を処理し、`nullable` フラグとスキーマの配列を分離します。
 *
 * @param allOf - `allOf` 配列
 * @param config - 設定オブジェクト
 * @returns `nullable` フラグと生成されたスキーマの配列
 */
function processAllOf(allOf: Schema[], config: Config): Accumulator {
  return allOf.reduce<Accumulator>(
    (acc, subSchema) => {
      if (isNullableSchema(subSchema)) {
        acc.nullable = true
        return acc
      }

      const zodSchema = generateZodSchemaFromSubSchema(subSchema, config)
      acc.schemas.push(zodSchema)
      return acc
    },
    { nullable: false, schemas: [] },
  )
}
/**
 * `allOf` スキーマをZodスキーマに変換します。
 *
 * @param schema - OpenAPIスキーマオブジェクト
 * @param config - 設定オブジェクト
 * @returns 生成されたZodスキーマの文字列
 */
export function generateAllOfCode(schema: Schema, config: Config): string {
  if (!schema.allOf || schema.allOf.length === 0) {
    console.warn('not exists allOf')
    return 'z.any()'
  }

  const { nullable, schemas } = processAllOf(schema.allOf, config)

  if (schemas.length === 0) {
    return nullable ? 'z.any().nullable()' : 'z.any()'
  }

  if (schemas.length === 1) {
    return nullable ? `${schemas[0]}.nullable()` : schemas[0]
  }

  // 複数のスキーマを z.intersection で結合し、nullable を適用
  const intersection = `z.intersection(${schemas.join(', ')})${nullable ? '.nullable()' : ''}`

  return intersection
}
