import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/23-extreme-parameters'

/**
 * GET /a/{p1}/b/{p2}/c/{p3}/d/{p4}/e/{p5}/f/{p6}/g/{p7}/h/{p8}/i/{p9}/j/{p10}
 */
export async function getAP1BP2CP3DP4EP5FP6GP7HP8IP9JP10(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client.a[':p1'].b[':p2'].c[':p3'].d[':p4'].e[':p5'].f[':p6'].g[':p7'].h[':p8'].i[
    ':p9'
  ].j[':p10'].$get(args, options)
}

/**
 * GET /query-styles
 */
export async function getQueryStyles(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['query-styles'].$get(args, options)
}

/**
 * GET /path-styles/{simple}/{label}/{matrix}
 */
export async function getPathStylesSimpleLabelMatrix(
  args: { param: { simple: string[]; label: string[]; matrix: { x?: number; y?: number } } },
  options?: ClientRequestOptions,
) {
  return await client['path-styles'][':simple'][':label'][':matrix'].$get(args, options)
}

/**
 * GET /header-styles
 */
export async function getHeaderStyles(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['header-styles'].$get(args, options)
}

/**
 * GET /cookie-styles
 */
export async function getCookieStyles(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['cookie-styles'].$get(args, options)
}

/**
 * GET /many-query-params
 */
export async function getManyQueryParams(
  args: {
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
  },
  options?: ClientRequestOptions,
) {
  return await client['many-query-params'].$get(args, options)
}

/**
 * GET /parameter-content
 */
export async function getParameterContent(
  args: {
    query: {
      jsonFilter?: { field?: string; operator?: string; value?: string }
      complexQuery?: {
        filters?: { field?: string; op?: string; val?: unknown }[]
        logic?: 'and' | 'or'
      }
    }
    header: { 'X-Metadata'?: { requestId?: string; timestamp?: string; source?: string } }
  },
  options?: ClientRequestOptions,
) {
  return await client['parameter-content'].$get(args, options)
}

/**
 * GET /deprecated-params
 */
export async function getDeprecatedParams(
  args: {
    query: { oldParam?: string; legacyFilter?: string; newParam?: string }
    header: { 'X-Legacy-Header'?: string }
  },
  options?: ClientRequestOptions,
) {
  return await client['deprecated-params'].$get(args, options)
}

/**
 * GET /examples-params
 */
export async function getExamplesParams(
  args: {
    query: {
      status?: 'active' | 'inactive' | 'pending'
      ids?: string[]
      filter?: { status?: string; date?: string }
    }
  },
  options?: ClientRequestOptions,
) {
  return await client['examples-params'].$get(args, options)
}
