declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/sessions': {
      $get:
        | {
            input: { query: { includeExpired?: string | undefined } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              createdAt: string
              expiresAt: string
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                    os?: string | undefined
                    osVersion?: string | undefined
                    browser?: string | undefined
                    browserVersion?: string | undefined
                    userAgent?: string | undefined
                    isTrusted?: boolean | undefined
                  }
                | undefined
              location?:
                | {
                    ipAddress?: string | undefined
                    country?: string | undefined
                    countryCode?: string | undefined
                    region?: string | undefined
                    city?: string | undefined
                    latitude?: number | undefined
                    longitude?: number | undefined
                    timezone?: string | undefined
                    isp?: string | undefined
                    isVpn?: boolean | undefined
                    isTor?: boolean | undefined
                    isProxy?: boolean | undefined
                  }
                | undefined
              authMethod?:
                | 'password'
                | 'mfa'
                | 'sso'
                | 'passkey'
                | 'magic_link'
                | 'social'
                | undefined
              authProvider?: string | undefined
              mfaVerified?: boolean | undefined
              riskScore?: number | undefined
              lastActivityAt?: string | undefined
              idleTimeoutAt?: string | undefined
              revokedAt?: string | undefined
              revokedReason?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { includeExpired?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions': {
      $post:
        | {
            input: {
              json: {
                grantType:
                  | 'password'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                  | 'mfa_token'
                  | 'sso_token'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: Record<string, never> | undefined
                magicLinkToken?: string | undefined
                socialProvider?: string | undefined
                socialToken?: string | undefined
                deviceFingerprint?: string | undefined
                rememberMe?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                grantType:
                  | 'password'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                  | 'mfa_token'
                  | 'sso_token'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: Record<string, never> | undefined
                magicLinkToken?: string | undefined
                socialProvider?: string | undefined
                socialToken?: string | undefined
                deviceFingerprint?: string | undefined
                rememberMe?: boolean | undefined
              }
            }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              createdAt: string
              expiresAt: string
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                    os?: string | undefined
                    osVersion?: string | undefined
                    browser?: string | undefined
                    browserVersion?: string | undefined
                    userAgent?: string | undefined
                    isTrusted?: boolean | undefined
                  }
                | undefined
              location?:
                | {
                    ipAddress?: string | undefined
                    country?: string | undefined
                    countryCode?: string | undefined
                    region?: string | undefined
                    city?: string | undefined
                    latitude?: number | undefined
                    longitude?: number | undefined
                    timezone?: string | undefined
                    isp?: string | undefined
                    isVpn?: boolean | undefined
                    isTor?: boolean | undefined
                    isProxy?: boolean | undefined
                  }
                | undefined
              authMethod?:
                | 'password'
                | 'mfa'
                | 'sso'
                | 'passkey'
                | 'magic_link'
                | 'social'
                | undefined
              authProvider?: string | undefined
              mfaVerified?: boolean | undefined
              riskScore?: number | undefined
              lastActivityAt?: string | undefined
              idleTimeoutAt?: string | undefined
              revokedAt?: string | undefined
              revokedReason?: string | undefined
              accessToken: string
              refreshToken: string
              tokenType?: string | undefined
              accessTokenExpiresIn?: number | undefined
              refreshTokenExpiresIn?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                grantType:
                  | 'password'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                  | 'mfa_token'
                  | 'sso_token'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: Record<string, never> | undefined
                magicLinkToken?: string | undefined
                socialProvider?: string | undefined
                socialToken?: string | undefined
                deviceFingerprint?: string | undefined
                rememberMe?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    [x: string]: {
      $get:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $post:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $put:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $delete:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $patch:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $head:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $options:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
      $trace:
        | { input: {}; output: {}; outputFormat: string; status: 100 }
        | { input: {}; output: {}; outputFormat: string; status: 200 }
        | { input: {}; output: {}; outputFormat: string; status: 401 }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').InfoStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').SuccessStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').RedirectStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ClientErrorStatusCode
          }
        | {
            input: {}
            output: {}
            outputFormat: string
            status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').ServerErrorStatusCode
          }
        | { input: {}; output: {}; outputFormat: string; status: 101 }
        | { input: {}; output: {}; outputFormat: string; status: 102 }
        | { input: {}; output: {}; outputFormat: string; status: 103 }
        | { input: {}; output: {}; outputFormat: string; status: 201 }
        | { input: {}; output: {}; outputFormat: string; status: 202 }
        | { input: {}; output: {}; outputFormat: string; status: 203 }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | { input: {}; output: {}; outputFormat: string; status: 205 }
        | { input: {}; output: {}; outputFormat: string; status: 206 }
        | { input: {}; output: {}; outputFormat: string; status: 207 }
        | { input: {}; output: {}; outputFormat: string; status: 208 }
        | { input: {}; output: {}; outputFormat: string; status: 226 }
        | { input: {}; output: {}; outputFormat: string; status: 300 }
        | { input: {}; output: {}; outputFormat: string; status: 301 }
        | { input: {}; output: {}; outputFormat: string; status: 302 }
        | { input: {}; output: {}; outputFormat: string; status: 303 }
        | { input: {}; output: {}; outputFormat: string; status: 304 }
        | { input: {}; output: {}; outputFormat: string; status: 305 }
        | { input: {}; output: {}; outputFormat: string; status: 306 }
        | { input: {}; output: {}; outputFormat: string; status: 307 }
        | { input: {}; output: {}; outputFormat: string; status: 308 }
        | { input: {}; output: {}; outputFormat: string; status: 400 }
        | { input: {}; output: {}; outputFormat: string; status: 402 }
        | { input: {}; output: {}; outputFormat: string; status: 403 }
        | { input: {}; output: {}; outputFormat: string; status: 404 }
        | { input: {}; output: {}; outputFormat: string; status: 405 }
        | { input: {}; output: {}; outputFormat: string; status: 406 }
        | { input: {}; output: {}; outputFormat: string; status: 407 }
        | { input: {}; output: {}; outputFormat: string; status: 408 }
        | { input: {}; output: {}; outputFormat: string; status: 409 }
        | { input: {}; output: {}; outputFormat: string; status: 410 }
        | { input: {}; output: {}; outputFormat: string; status: 411 }
        | { input: {}; output: {}; outputFormat: string; status: 412 }
        | { input: {}; output: {}; outputFormat: string; status: 413 }
        | { input: {}; output: {}; outputFormat: string; status: 414 }
        | { input: {}; output: {}; outputFormat: string; status: 415 }
        | { input: {}; output: {}; outputFormat: string; status: 416 }
        | { input: {}; output: {}; outputFormat: string; status: 417 }
        | { input: {}; output: {}; outputFormat: string; status: 418 }
        | { input: {}; output: {}; outputFormat: string; status: 421 }
        | { input: {}; output: {}; outputFormat: string; status: 422 }
        | { input: {}; output: {}; outputFormat: string; status: 423 }
        | { input: {}; output: {}; outputFormat: string; status: 424 }
        | { input: {}; output: {}; outputFormat: string; status: 425 }
        | { input: {}; output: {}; outputFormat: string; status: 426 }
        | { input: {}; output: {}; outputFormat: string; status: 428 }
        | { input: {}; output: {}; outputFormat: string; status: 429 }
        | { input: {}; output: {}; outputFormat: string; status: 431 }
        | { input: {}; output: {}; outputFormat: string; status: 451 }
        | { input: {}; output: {}; outputFormat: string; status: 500 }
        | { input: {}; output: {}; outputFormat: string; status: 501 }
        | { input: {}; output: {}; outputFormat: string; status: 502 }
        | { input: {}; output: {}; outputFormat: string; status: 503 }
        | { input: {}; output: {}; outputFormat: string; status: 504 }
        | { input: {}; output: {}; outputFormat: string; status: 505 }
        | { input: {}; output: {}; outputFormat: string; status: 506 }
        | { input: {}; output: {}; outputFormat: string; status: 507 }
        | { input: {}; output: {}; outputFormat: string; status: 508 }
        | { input: {}; output: {}; outputFormat: string; status: 510 }
        | { input: {}; output: {}; outputFormat: string; status: 511 }
        | { input: {}; output: {}; outputFormat: string; status: -1 }
        | { input: {}; output: {}; outputFormat: string; status: never }
    }
  } & {
    '/sessions/current/refresh': {
      $post:
        | {
            input: { json: { refreshToken: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { refreshToken: string } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              createdAt: string
              expiresAt: string
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                    os?: string | undefined
                    osVersion?: string | undefined
                    browser?: string | undefined
                    browserVersion?: string | undefined
                    userAgent?: string | undefined
                    isTrusted?: boolean | undefined
                  }
                | undefined
              location?:
                | {
                    ipAddress?: string | undefined
                    country?: string | undefined
                    countryCode?: string | undefined
                    region?: string | undefined
                    city?: string | undefined
                    latitude?: number | undefined
                    longitude?: number | undefined
                    timezone?: string | undefined
                    isp?: string | undefined
                    isVpn?: boolean | undefined
                    isTor?: boolean | undefined
                    isProxy?: boolean | undefined
                  }
                | undefined
              authMethod?:
                | 'password'
                | 'mfa'
                | 'sso'
                | 'passkey'
                | 'magic_link'
                | 'social'
                | undefined
              authProvider?: string | undefined
              mfaVerified?: boolean | undefined
              riskScore?: number | undefined
              lastActivityAt?: string | undefined
              idleTimeoutAt?: string | undefined
              revokedAt?: string | undefined
              revokedReason?: string | undefined
              accessToken: string
              refreshToken: string
              tokenType?: string | undefined
              accessTokenExpiresIn?: number | undefined
              refreshTokenExpiresIn?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/:sessionId': {
      $get:
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { sessionId: string } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              createdAt: string
              expiresAt: string
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                    os?: string | undefined
                    osVersion?: string | undefined
                    browser?: string | undefined
                    browserVersion?: string | undefined
                    userAgent?: string | undefined
                    isTrusted?: boolean | undefined
                  }
                | undefined
              location?:
                | {
                    ipAddress?: string | undefined
                    country?: string | undefined
                    countryCode?: string | undefined
                    region?: string | undefined
                    city?: string | undefined
                    latitude?: number | undefined
                    longitude?: number | undefined
                    timezone?: string | undefined
                    isp?: string | undefined
                    isVpn?: boolean | undefined
                    isTor?: boolean | undefined
                    isProxy?: boolean | undefined
                  }
                | undefined
              authMethod?:
                | 'password'
                | 'mfa'
                | 'sso'
                | 'passkey'
                | 'magic_link'
                | 'social'
                | undefined
              authProvider?: string | undefined
              mfaVerified?: boolean | undefined
              riskScore?: number | undefined
              lastActivityAt?: string | undefined
              idleTimeoutAt?: string | undefined
              revokedAt?: string | undefined
              revokedReason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/sessions/:sessionId': {
      $delete:
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { sessionId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/sessions/revoke-all': {
      $post:
        | {
            input: { json: { includeCurrent?: boolean | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { includeCurrent?: boolean | undefined } }
            output: { revokedCount?: number | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/validate': {
      $post:
        | {
            input: { json: { accessToken?: string | undefined; sessionId?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { accessToken?: string | undefined; sessionId?: string | undefined } }
            output: {
              valid: boolean
              session?:
                | {
                    id: string
                    userId: string
                    status: 'active' | 'expired' | 'revoked'
                    createdAt: string
                    expiresAt: string
                    isCurrent?: boolean | undefined
                    device?:
                      | {
                          id?: string | undefined
                          fingerprint?: string | undefined
                          type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                          os?: string | undefined
                          osVersion?: string | undefined
                          browser?: string | undefined
                          browserVersion?: string | undefined
                          userAgent?: string | undefined
                          isTrusted?: boolean | undefined
                        }
                      | undefined
                    location?:
                      | {
                          ipAddress?: string | undefined
                          country?: string | undefined
                          countryCode?: string | undefined
                          region?: string | undefined
                          city?: string | undefined
                          latitude?: number | undefined
                          longitude?: number | undefined
                          timezone?: string | undefined
                          isp?: string | undefined
                          isVpn?: boolean | undefined
                          isTor?: boolean | undefined
                          isProxy?: boolean | undefined
                        }
                      | undefined
                    authMethod?:
                      | 'password'
                      | 'mfa'
                      | 'sso'
                      | 'passkey'
                      | 'magic_link'
                      | 'social'
                      | undefined
                    authProvider?: string | undefined
                    mfaVerified?: boolean | undefined
                    riskScore?: number | undefined
                    lastActivityAt?: string | undefined
                    idleTimeoutAt?: string | undefined
                    revokedAt?: string | undefined
                    revokedReason?: string | undefined
                  }
                | undefined
              reason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/history': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                from?: string | undefined
                to?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                from?: string | undefined
                to?: string | undefined
              }
            }
            output: {
              data: {
                id: string
                eventType:
                  | 'expired'
                  | 'revoked'
                  | 'created'
                  | 'refreshed'
                  | 'extended'
                  | 'activity'
                  | 'logout'
                timestamp: string
                sessionId?: string | undefined
                device?:
                  | {
                      id?: string | undefined
                      fingerprint?: string | undefined
                      type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                      os?: string | undefined
                      osVersion?: string | undefined
                      browser?: string | undefined
                      browserVersion?: string | undefined
                      userAgent?: string | undefined
                      isTrusted?: boolean | undefined
                    }
                  | undefined
                location?:
                  | {
                      ipAddress?: string | undefined
                      country?: string | undefined
                      countryCode?: string | undefined
                      region?: string | undefined
                      city?: string | undefined
                      latitude?: number | undefined
                      longitude?: number | undefined
                      timezone?: string | undefined
                      isp?: string | undefined
                      isVpn?: boolean | undefined
                      isTor?: boolean | undefined
                      isProxy?: boolean | undefined
                    }
                  | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/security-events': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                severity?: 'low' | 'medium' | 'high' | 'critical' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                severity?: 'low' | 'medium' | 'high' | 'critical' | undefined
              }
            }
            output: {
              data: {
                id: string
                eventType:
                  | 'login_failed'
                  | 'suspicious_login'
                  | 'new_device'
                  | 'new_location'
                  | 'impossible_travel'
                  | 'brute_force_attempt'
                  | 'session_hijack_attempt'
                  | 'password_spray'
                  | 'concurrent_sessions_exceeded'
                severity: 'low' | 'medium' | 'high' | 'critical'
                timestamp: string
                description?: string | undefined
                device?:
                  | {
                      id?: string | undefined
                      fingerprint?: string | undefined
                      type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                      os?: string | undefined
                      osVersion?: string | undefined
                      browser?: string | undefined
                      browserVersion?: string | undefined
                      userAgent?: string | undefined
                      isTrusted?: boolean | undefined
                    }
                  | undefined
                location?:
                  | {
                      ipAddress?: string | undefined
                      country?: string | undefined
                      countryCode?: string | undefined
                      region?: string | undefined
                      city?: string | undefined
                      latitude?: number | undefined
                      longitude?: number | undefined
                      timezone?: string | undefined
                      isp?: string | undefined
                      isVpn?: boolean | undefined
                      isTor?: boolean | undefined
                      isProxy?: boolean | undefined
                    }
                  | undefined
                actionTaken?:
                  | 'none'
                  | 'captcha_required'
                  | 'mfa_required'
                  | 'session_revoked'
                  | 'account_locked'
                  | 'alert_sent'
                  | undefined
                resolved?: boolean | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/policies': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              sessionDuration?: number | undefined
              idleTimeout?: number | undefined
              maxConcurrentSessions?: number | undefined
              concurrentSessionAction?: 'allow' | 'deny' | 'revoke_oldest' | undefined
              requireMfaForNewDevice?: boolean | undefined
              requireMfaForNewLocation?: boolean | undefined
              allowRememberMe?: boolean | undefined
              rememberMeDuration?: number | undefined
              refreshTokenRotation?: boolean | undefined
              absoluteTimeout?: number | undefined
              ipBindingEnabled?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/policies': {
      $put:
        | {
            input: {
              json: {
                sessionDuration?: number | undefined
                idleTimeout?: number | undefined
                maxConcurrentSessions?: number | undefined
                concurrentSessionAction?: 'allow' | 'deny' | 'revoke_oldest' | undefined
                requireMfaForNewDevice?: boolean | undefined
                requireMfaForNewLocation?: boolean | undefined
                allowRememberMe?: boolean | undefined
                rememberMeDuration?: number | undefined
                refreshTokenRotation?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                sessionDuration?: number | undefined
                idleTimeout?: number | undefined
                maxConcurrentSessions?: number | undefined
                concurrentSessionAction?: 'allow' | 'deny' | 'revoke_oldest' | undefined
                requireMfaForNewDevice?: boolean | undefined
                requireMfaForNewLocation?: boolean | undefined
                allowRememberMe?: boolean | undefined
                rememberMeDuration?: number | undefined
                refreshTokenRotation?: boolean | undefined
              }
            }
            output: {
              sessionDuration?: number | undefined
              idleTimeout?: number | undefined
              maxConcurrentSessions?: number | undefined
              concurrentSessionAction?: 'allow' | 'deny' | 'revoke_oldest' | undefined
              requireMfaForNewDevice?: boolean | undefined
              requireMfaForNewLocation?: boolean | undefined
              allowRememberMe?: boolean | undefined
              rememberMeDuration?: number | undefined
              refreshTokenRotation?: boolean | undefined
              absoluteTimeout?: number | undefined
              ipBindingEnabled?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/trusted-devices': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              device: {
                id?: string | undefined
                fingerprint?: string | undefined
                type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                os?: string | undefined
                osVersion?: string | undefined
                browser?: string | undefined
                browserVersion?: string | undefined
                userAgent?: string | undefined
                isTrusted?: boolean | undefined
              }
              createdAt: string
              expiresAt: string
              name?: string | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/sessions/trusted-devices': {
      $post:
        | {
            input: { json: { name?: string | undefined; trustDuration?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { name?: string | undefined; trustDuration?: number | undefined } }
            output: {
              id: string
              device: {
                id?: string | undefined
                fingerprint?: string | undefined
                type?: 'unknown' | 'desktop' | 'mobile' | 'tablet' | undefined
                os?: string | undefined
                osVersion?: string | undefined
                browser?: string | undefined
                browserVersion?: string | undefined
                userAgent?: string | undefined
                isTrusted?: boolean | undefined
              }
              createdAt: string
              expiresAt: string
              name?: string | undefined
              lastUsedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/sessions/trusted-devices/:deviceId': {
      $delete:
        | {
            input: { param: { deviceId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { deviceId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
