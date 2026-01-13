declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/sessions': {
      $get:
        | {
            input: { query: { includeExpired?: boolean | undefined } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
              revokedAt?: string | undefined
              revokedReason?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { includeExpired?: boolean | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: {
              json: {
                grantType:
                  | 'password'
                  | 'mfa_token'
                  | 'sso_token'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: { [x: string]: unknown } | undefined
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
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
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
                  | 'mfa_token'
                  | 'sso_token'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: { [x: string]: unknown } | undefined
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
        | {
            input: {
              json: {
                grantType:
                  | 'password'
                  | 'mfa_token'
                  | 'sso_token'
                  | 'passkey'
                  | 'magic_link'
                  | 'social'
                username?: string | undefined
                password?: string | undefined
                mfaToken?: string | undefined
                mfaCode?: string | undefined
                ssoToken?: string | undefined
                passkeyResponse?: { [x: string]: unknown } | undefined
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
    }
  } & {
    '/sessions/current': {
      $get:
        | {
            input: {}
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
              revokedAt?: string | undefined
              revokedReason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | { input: {}; output: {}; outputFormat: string; status: 204 }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/current/refresh': {
      $post:
        | {
            input: { json: { refreshToken: string } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
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
        | {
            input: { json: { refreshToken: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/current/extend': {
      $post:
        | {
            input: { json: { duration?: number | undefined } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
              revokedAt?: string | undefined
              revokedReason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { duration?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/current/activity': {
      $post:
        | {
            input: {}
            output: { lastActivityAt?: string | undefined; idleTimeoutAt?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/:sessionId': {
      $get:
        | {
            input: { param: { sessionId: string } }
            output: {
              id: string
              userId: string
              status: 'active' | 'expired' | 'revoked'
              isCurrent?: boolean | undefined
              device?:
                | {
                    id?: string | undefined
                    fingerprint?: string | undefined
                    type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
              createdAt: string
              expiresAt: string
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
            status: 401
          }
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $delete:
        | { input: { param: { sessionId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { sessionId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
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
            output: { revokedCount?: number | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { includeCurrent?: boolean | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/validate': {
      $post:
        | {
            input: { json: { accessToken?: string | undefined; sessionId?: string | undefined } }
            output: {
              valid: boolean
              session?:
                | {
                    id: string
                    userId: string
                    status: 'active' | 'expired' | 'revoked'
                    isCurrent?: boolean | undefined
                    device?:
                      | {
                          id?: string | undefined
                          fingerprint?: string | undefined
                          type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
                    createdAt: string
                    expiresAt: string
                    revokedAt?: string | undefined
                    revokedReason?: string | undefined
                  }
                | undefined
              reason?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { accessToken?: string | undefined; sessionId?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
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
            output: {
              data: {
                id: string
                sessionId?: string | undefined
                eventType:
                  | 'created'
                  | 'refreshed'
                  | 'extended'
                  | 'activity'
                  | 'expired'
                  | 'revoked'
                  | 'logout'
                device?:
                  | {
                      id?: string | undefined
                      fingerprint?: string | undefined
                      type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
                timestamp: string
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
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
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
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
                description?: string | undefined
                device?:
                  | {
                      id?: string | undefined
                      fingerprint?: string | undefined
                      type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
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
                timestamp: string
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
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
    }
  } & {
    '/sessions/policies': {
      $get:
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
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
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
    }
  } & {
    '/sessions/trusted-devices': {
      $get:
        | {
            input: {}
            output: {
              id: string
              name?: string | undefined
              device: {
                id?: string | undefined
                fingerprint?: string | undefined
                type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
                os?: string | undefined
                osVersion?: string | undefined
                browser?: string | undefined
                browserVersion?: string | undefined
                userAgent?: string | undefined
                isTrusted?: boolean | undefined
              }
              lastUsedAt?: string | undefined
              createdAt: string
              expiresAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $post:
        | {
            input: { json: { name?: string | undefined; trustDuration?: number | undefined } }
            output: {
              id: string
              name?: string | undefined
              device: {
                id?: string | undefined
                fingerprint?: string | undefined
                type?: 'desktop' | 'mobile' | 'tablet' | 'unknown' | undefined
                os?: string | undefined
                osVersion?: string | undefined
                browser?: string | undefined
                browserVersion?: string | undefined
                userAgent?: string | undefined
                isTrusted?: boolean | undefined
              }
              lastUsedAt?: string | undefined
              createdAt: string
              expiresAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: { json: { name?: string | undefined; trustDuration?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/sessions/trusted-devices/:deviceId': {
      $delete:
        | { input: { param: { deviceId: string } }; output: {}; outputFormat: string; status: 204 }
        | {
            input: { param: { deviceId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  },
  '/'
>
export default routes
