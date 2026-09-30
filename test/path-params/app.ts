import { OpenAPIHono } from '@hono/zod-openapi'

import {
  deleteSharedIdRoute,
  getAllofValueRoute,
  getBase64urlValueRoute,
  getBase64ValueRoute,
  getBenumValueRoute,
  getBigintValueRoute,
  getBooleanValueRoute,
  getByteValueRoute,
  getCidrv4ValueRoute,
  getCidrv6ValueRoute,
  getCreditcardValueRoute,
  getCuid2ValueRoute,
  getCurrencycodeValueRoute,
  getDatetimeValueRoute,
  getDateValueRoute,
  getDoubleValueRoute,
  getDurationValueRoute,
  getE164ValueRoute,
  getEmailValueRoute,
  getEmojiValueRoute,
  getExclusiveValueRoute,
  getFloat32ValueRoute,
  getFloat64ValueRoute,
  getFloatValueRoute,
  getGuidValueRoute,
  getHexValueRoute,
  getHostnameValueRoute,
  getHttpurlValueRoute,
  getIbanValueRoute,
  getIconstValueRoute,
  getIenumValueRoute,
  getInt32ValueRoute,
  getInt64rangeValueRoute,
  getInt64ValueRoute,
  getIntegerValueRoute,
  getInullValueRoute,
  getIpv4ValueRoute,
  getIpv6ValueRoute,
  getKsuidValueRoute,
  getLabelarrValueRoute,
  getLabelexplodeValueRoute,
  getLabelobjxValueRoute,
  getLabelstrValueRoute,
  getLabelValueRoute,
  getLengthValueRoute,
  getMacValueRoute,
  getMatrixarrValueRoute,
  getMatrixexplodeValueRoute,
  getMatrixobjValueRoute,
  getMatrixobjxValueRoute,
  getMatrixstrValueRoute,
  getMatrixValueRoute,
  getMultipleValueRoute,
  getNamedUserIdPostIdRoute,
  getNanoidValueRoute,
  getNenumValueRoute,
  getNumberValueRoute,
  getNumericsenumValueRoute,
  getNumpasswordValueRoute,
  getOneofisValueRoute,
  getOneofValueRoute,
  getOrgsOrgIdReposRepoIdIssuesIssueIdRoute,
  getOverrideIdRoute,
  getParamrefIdRoute,
  getPatternValueRoute,
  getRangeValueRoute,
  getSchemarefValueRoute,
  getSconstValueRoute,
  getSenumValueRoute,
  getSharedIdRoute,
  getSimplearrValueRoute,
  getSimpleobjValueRoute,
  getSimpleobjxValueRoute,
  getSimplestrarrValueRoute,
  getStringValueRoute,
  getStrpasswordValueRoute,
  getTimeValueRoute,
  getTrimValueRoute,
  getTxemailValueRoute,
  getTxlowerValueRoute,
  getTxnormalizeValueRoute,
  getTxupperValueRoute,
  getUint32ValueRoute,
  getUint64ValueRoute,
  getUlidValueRoute,
  getUriValueRoute,
  getUrlValueRoute,
  getUuidv4ValueRoute,
  getUuidv7ValueRoute,
  getUuidValueRoute,
  getXidValueRoute,
} from './__generated__/routes'

type Echo = { valueType: string; valueText: string }

/**
 * Describes one value: the runtime `typeof` it arrived as, and the value as text. Text,
 * because a bigint cannot cross JSON and text keeps its every digit.
 *
 * 値1つを記述する。届いた時点の `typeof` と、その文字列表現である。文字列で返すのは、
 * bigint が JSON に載せられず、また文字列なら桁落ちしないためである。
 */
function echoValue(value: unknown): Echo {
  if (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'bigint' ||
    typeof value === 'boolean'
  ) {
    return { valueType: typeof value, valueText: String(value) }
  }
  return {
    valueType: value === null ? 'null' : typeof value,
    valueText: JSON.stringify(value) ?? 'undefined',
  }
}

/**
 * One handler per generated route, each reading its parameter through `c.req.valid`, so
 * the value a test sees has passed the generated schema and nothing else.
 *
 * 生成されたルートごとにハンドラを1つ。必ず `c.req.valid` 経由で読むので、テストが見る値は
 * 生成スキーマだけを通過したものになる。
 */
export const pathParamsApp = new OpenAPIHono({
  // A rejected request names the parameter that failed, so a test can tell which one did.
  // 拒否時は失敗したパラメータ名を返す。どのパラメータが原因かをテストで判別できる。
  defaultHook: (result, c) => {
    if (!result.success) {
      return c.json({ issues: result.error.issues.map((issue) => issue.path.join('.')) }, 422)
    }
    return undefined
  },
})
  .openapi(getIntegerValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getInt32ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getInt64ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getBigintValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUint32ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUint64ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getNumberValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getFloatValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getFloat32ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getFloat64ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getDoubleValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getNumpasswordValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getBooleanValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getStringValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getEmailValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUuidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUuidv4ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUuidv7ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUrlValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUriValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getHttpurlValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getHostnameValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getHexValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getEmojiValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getBase64ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getBase64urlValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getNanoidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getCuid2ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getUlidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getIpv4ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getIpv6ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getCidrv4ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getCidrv6ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getDateValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTimeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getDatetimeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getDurationValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getByteValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getStrpasswordValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMacValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getE164ValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getCreditcardValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getIbanValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getCurrencycodeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getKsuidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getXidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getGuidValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTrimValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTxlowerValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTxupperValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTxnormalizeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getTxemailValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getInullValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getIenumValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getNenumValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getBenumValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getIconstValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSenumValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSconstValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getNumericsenumValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getRangeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getExclusiveValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMultipleValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getInt64rangeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLengthValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getPatternValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getOneofValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSchemarefValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getOrgsOrgIdReposRepoIdIssuesIssueIdRoute, (c) => {
    const param = c.req.valid('param')
    return c.json({
      orgId: echoValue(param.orgId),
      repoId: echoValue(param.repoId),
      issueId: echoValue(param.issueId),
    })
  })
  .openapi(getNamedUserIdPostIdRoute, (c) => {
    const param = c.req.valid('param')
    return c.json({
      'user-id': echoValue(param['user-id']),
      post_id: echoValue(param.post_id),
    })
  })
  .openapi(getParamrefIdRoute, (c) => c.json(echoValue(c.req.valid('param').id)))
  .openapi(getSharedIdRoute, (c) => c.json(echoValue(c.req.valid('param').id)))
  .openapi(deleteSharedIdRoute, (c) => c.json(echoValue(c.req.valid('param').id)))
  .openapi(getOverrideIdRoute, (c) => c.json(echoValue(c.req.valid('param').id)))
  .openapi(getSimplearrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSimplestrarrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLabelValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLabelstrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixstrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLabelarrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLabelexplodeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixarrValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixexplodeValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getAllofValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getOneofisValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSimpleobjValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getSimpleobjxValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getLabelobjxValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixobjValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
  .openapi(getMatrixobjxValueRoute, (c) => c.json(echoValue(c.req.valid('param').value)))
