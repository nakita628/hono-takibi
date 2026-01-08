import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export async function getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(params: {
  path: {
    p1: string
    p2: number
    p3: string
    p4: string
    p5: number
    p6: boolean
    p7: 'a' | 'b' | 'c'
    p8: number
    p9: string
    p10: string
  }
}) {
  return await client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[
    ':p9'
  ].j[':p10'].$get({ param: params.path })
}

/**
 * GET /query-styles
 */
export async function getQueryStyles(params: {
  query: {
    formExplode: string[]
    formNoExplode: string[]
    spaceDelimited: number[]
    pipeDelimited: string[]
    deepObject: { level1?: { level2?: { value?: string } }; array?: string[] }
    formObject: { key1?: string; key2?: number }
    formObjectNoExplode: { a?: string; b?: string }
    allowEmpty: string
    allowReserved: string
    complexDeep: {
      filters?: { status?: string[]; dateRange?: { from?: string; to?: string } }
      pagination?: { page?: number; limit?: number }
      sort?: { field?: string; order?: 'asc' | 'desc' }[]
    }
  }
}) {
  return await client['query-styles'].$get({ query: params.query })
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export async function getPathStylesSimpleLabelMatrix(params: {
  path: { simple: string[]; label: string[]; matrix: { x?: number; y?: number } }
}) {
  return await client['path-styles'][':simple'][':label'][':matrix'].$get({ param: params.path })
}

/**
 * GET /header-styles
 */
export async function getHeaderStyles() {
  return await client['header-styles'].$get()
}

/**
 * GET /cookie-styles
 */
export async function getCookieStyles() {
  return await client['cookie-styles'].$get()
}

/**
 * GET /many-query-params
 */
export async function getManyQueryParams(params: {
  query: {
    q: string
    page: number
    limit: number
    offset: number
    sort: string
    order: 'asc' | 'desc'
    fields: string[]
    include: string[]
    exclude: string[]
    filter: {}
    status: string[]
    type: string
    category: string
    tags: string[]
    minPrice: number
    maxPrice: number
    minDate: string
    maxDate: string
    active: boolean
    verified: boolean
    featured: boolean
    promoted: boolean
    archived: boolean
    deleted: boolean
    createdBy: string
    updatedBy: string
    ownerId: string
    groupId: string
    teamId: string
    projectId: string
    workspaceId: string
    organizationId: string
    locale: string
    timezone: string
    currency: string
    format: string
    version: string
    beta: boolean
    debug: boolean
    trace: boolean
    verbose: boolean
    callback: string
    jsonp: string
    envelope: boolean
    pretty: boolean
    compress: boolean
    cache: boolean
    timeout: number
  }
}) {
  return await client['many-query-params'].$get({ query: params.query })
}

/**
 * GET /parameter-content
 */
export async function getParameterContent(params: {
  query: { jsonFilter: unknown; complexQuery: unknown }
}) {
  return await client['parameter-content'].$get({ query: params.query })
}

/**
 * GET /deprecated-params
 */
export async function getDeprecatedParams(params: {
  query: { oldParam: string; legacyFilter: string; newParam: string }
}) {
  return await client['deprecated-params'].$get({ query: params.query })
}

/**
 * GET /examples-params
 */
export async function getExamplesParams(params: {
  query: {
    status: 'active' | 'inactive' | 'pending'
    ids: string[]
    filter: { status?: string; date?: string }
  }
}) {
  return await client['examples-params'].$get({ query: params.query })
}
