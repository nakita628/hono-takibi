import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export async function getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(arg: {
  param: {
    p1: string
    p2: number
    p3: string
    p4: string
    p5: number
    p6: boolean
    p7: 'a' | 'b' | 'c'
    p8: bigint
    p9: string
    p10: string
  }
}) {
  return await client['a'][':p1']['b'][':p2']['c'][':p3']['d'][':p4']['e'][':p5']['f'][':p6']['g'][
    ':p7'
  ]['h'][':p8']['i'][':p9']['j'][':p10']['$get'](arg)
}

/**
 * GET /query-styles
 */
export async function getQueryStyles(arg: {
  query: {
    formExplode?: string[]
    formNoExplode?: string[]
    spaceDelimited?: number[]
    pipeDelimited?: string[]
    deepObject?: { level1?: { level2?: { value?: string } }; array?: string[] }
    formObject?: { key1?: string; key2?: number }
    formObjectNoExplode?: { a?: string; b?: string }
    allowEmpty?: string
    allowReserved?: string
    complexDeep?: {
      filters?: { status?: string[]; dateRange?: { from?: string; to?: string } }
      pagination?: { page?: number; limit?: number }
      sort?: { field?: string; order?: 'asc' | 'desc' }[]
    }
  }
}) {
  return await client['query-styles']['$get'](arg)
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export async function getPathStylesSimpleLabelMatrix(arg: {
  param: { simple: string[]; label: string[]; matrix: { x?: number; y?: number } }
}) {
  return await client['path-styles'][':simple'][':label'][':matrix']['$get'](arg)
}

/**
 * GET /header-styles
 */
export async function getHeaderStyles(arg: {
  header: {
    'X-Simple-Array'?: string[]
    'X-Simple-Array-Exploded'?: string[]
    'X-Object-Header'?: { key1?: string; key2?: string }
    'X-Custom-1'?: string
    'X-Custom-2'?: number
    'X-Custom-3'?: boolean
    'X-Custom-4'?: number
    'X-Custom-5'?: string
    Accept?: string
    'Accept-Language'?: string
    'Accept-Encoding'?: string
    'Cache-Control'?: string
    'If-Match'?: string
    'If-None-Match'?: string
    'If-Modified-Since'?: string
    'If-Unmodified-Since'?: string
    Authorization?: string
    'X-Request-ID'?: string
    'X-Correlation-ID'?: string
    'X-Forwarded-For'?: string
    'X-Real-IP'?: string
    'User-Agent'?: string
  }
}) {
  return await client['header-styles']['$get'](arg)
}

/**
 * GET /cookie-styles
 */
export async function getCookieStyles(arg: {
  cookie: {
    session_id?: string
    preferences?: { theme?: string; language?: string }
    user_id?: string
    access_token?: string
    refresh_token?: string
    consent?: boolean
    tracking_id?: string
    cart_id?: string
    visited?: string[]
  }
}) {
  return await client['cookie-styles']['$get'](arg)
}

/**
 * GET /many-query-params
 */
export async function getManyQueryParams(arg: {
  query: {
    q?: string
    page?: number
    limit?: number
    offset?: number
    sort?: string
    order?: 'asc' | 'desc'
    fields?: string[]
    include?: string[]
    exclude?: string[]
    filter?: {}
    status?: string[]
    type?: string
    category?: string
    tags?: string[]
    minPrice?: number
    maxPrice?: number
    minDate?: string
    maxDate?: string
    active?: string
    verified?: string
    featured?: string
    promoted?: string
    archived?: string
    deleted?: string
    createdBy?: string
    updatedBy?: string
    ownerId?: string
    groupId?: string
    teamId?: string
    projectId?: string
    workspaceId?: string
    organizationId?: string
    locale?: string
    timezone?: string
    currency?: string
    format?: string
    version?: string
    beta?: string
    debug?: string
    trace?: string
    verbose?: string
    callback?: string
    jsonp?: string
    envelope?: string
    pretty?: string
    compress?: string
    cache?: string
    timeout?: number
  }
}) {
  return await client['many-query-params']['$get'](arg)
}

/**
 * GET /parameter-content
 */
export async function getParameterContent(arg: {
  query: {
    jsonFilter?: { field?: string; operator?: string; value?: string }
    complexQuery?: {
      filters?: { field?: string; op?: string; val?: unknown }[]
      logic?: 'and' | 'or'
    }
  }
  header: { 'X-Metadata'?: { requestId?: string; timestamp?: string; source?: string } }
}) {
  return await client['parameter-content']['$get'](arg)
}

/**
 * GET /deprecated-params
 */
export async function getDeprecatedParams(arg: {
  query: { oldParam?: string; legacyFilter?: string; newParam?: string }
  header: { 'X-Legacy-Header'?: string }
}) {
  return await client['deprecated-params']['$get'](arg)
}

/**
 * GET /examples-params
 */
export async function getExamplesParams(arg: {
  query: {
    status?: 'active' | 'inactive' | 'pending'
    ids?: string[]
    filter?: { status?: string; date?: string }
  }
}) {
  return await client['examples-params']['$get'](arg)
}
