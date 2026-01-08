declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/mfa/status': {
      $get:
        | {
            input: {}
            output: {
              enabled: boolean
              methods: {
                id: string
                type: 'totp' | 'sms' | 'email' | 'webauthn'
                enabled: boolean
                createdAt: string
                name?: string | undefined
                maskedValue?: string | undefined
                lastUsedAt?: string | undefined
              }[]
              enforced?: boolean | undefined
              preferredMethod?: 'totp' | 'sms' | 'email' | 'webauthn' | undefined
              backupCodesRemaining?: number | undefined
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
    }
  } & {
    '/mfa/methods': {
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
              type: 'totp' | 'sms' | 'email' | 'webauthn'
              enabled: boolean
              createdAt: string
              name?: string | undefined
              maskedValue?: string | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/preferred': {
      $put:
        | {
            input: {
              json: { method: 'totp' | 'sms' | 'email' | 'webauthn'; methodId?: string | undefined }
            }
            output: {
              enabled: boolean
              methods: {
                id: string
                type: 'totp' | 'sms' | 'email' | 'webauthn'
                enabled: boolean
                createdAt: string
                name?: string | undefined
                maskedValue?: string | undefined
                lastUsedAt?: string | undefined
              }[]
              enforced?: boolean | undefined
              preferredMethod?: 'totp' | 'sms' | 'email' | 'webauthn' | undefined
              backupCodesRemaining?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: { method: 'totp' | 'sms' | 'email' | 'webauthn'; methodId?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: { method: 'totp' | 'sms' | 'email' | 'webauthn'; methodId?: string | undefined }
            }
            output: {}
            outputFormat: string
            status: 404
          }
    }
  } & {
    '/mfa/totp/setup': {
      $post:
        | {
            input: { json: { issuer?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { issuer?: string | undefined } }
            output: { secret: string; qrCode: string; otpauthUri: string }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { issuer?: string | undefined } }
            output: {}
            outputFormat: string
            status: 409
          }
    }
  } & {
    '/mfa/totp/verify': {
      $post:
        | {
            input: { json: { code: string; secret: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { code: string; secret: string } }
            output: {
              method: {
                id: string
                type: 'totp' | 'sms' | 'email' | 'webauthn'
                enabled: boolean
                createdAt: string
                name?: string | undefined
                maskedValue?: string | undefined
                lastUsedAt?: string | undefined
              }
              backupCodes: string[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { code: string; secret: string } }
            output: {
              error:
                | 'invalid_code'
                | 'expired_code'
                | 'invalid_challenge'
                | 'too_many_attempts'
                | 'method_not_available'
                | 'already_configured'
              message: string
              attemptsRemaining?: number | undefined
              retryAfter?: number | undefined
            }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/mfa/totp': {
      $delete:
        | {
            input: { json: { code: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { json: { code: string } }; output: {}; outputFormat: string; status: 204 }
        | { input: { json: { code: string } }; output: {}; outputFormat: string; status: 400 }
    }
  } & {
    '/mfa/sms/setup': {
      $post:
        | {
            input: { json: { phoneNumber: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { phoneNumber: string } }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: { json: { phoneNumber: string } }
            output: {
              challengeId?: string | undefined
              expiresIn?: number | undefined
              maskedPhone?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { phoneNumber: string } }
            output: {}
            outputFormat: string
            status: 429
          }
    }
  } & {
    '/mfa/sms/verify': {
      $post:
        | {
            input: { json: { challengeId: string; code: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { challengeId: string; code: string } }
            output: {
              method: {
                id: string
                type: 'totp' | 'sms' | 'email' | 'webauthn'
                enabled: boolean
                createdAt: string
                name?: string | undefined
                maskedValue?: string | undefined
                lastUsedAt?: string | undefined
              }
              backupCodes: string[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { challengeId: string; code: string } }
            output: {}
            outputFormat: string
            status: 400
          }
    }
  } & {
    '/mfa/sms/:methodId': {
      $delete:
        | {
            input: { param: { methodId: string } } & { json: { verificationCode: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { methodId: string } } & { json: { verificationCode: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/mfa/email/setup': {
      $post:
        | {
            input: { json: { email?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { email?: string | undefined } }
            output: {}
            outputFormat: string
            status: 429
          }
        | {
            input: { json: { email?: string | undefined } }
            output: {
              challengeId?: string | undefined
              expiresIn?: number | undefined
              maskedEmail?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/email/verify': {
      $post:
        | {
            input: { json: { challengeId: string; code: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { challengeId: string; code: string } }
            output: {
              method: {
                id: string
                type: 'totp' | 'sms' | 'email' | 'webauthn'
                enabled: boolean
                createdAt: string
                name?: string | undefined
                maskedValue?: string | undefined
                lastUsedAt?: string | undefined
              }
              backupCodes: string[]
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { challengeId: string; code: string } }
            output: {}
            outputFormat: string
            status: 400
          }
    }
  } & {
    '/mfa/webauthn/register/options': {
      $post:
        | {
            input: {
              json: {
                authenticatorType?: 'any' | 'platform' | 'cross-platform' | undefined
                residentKey?: 'required' | 'discouraged' | 'preferred' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                authenticatorType?: 'any' | 'platform' | 'cross-platform' | undefined
                residentKey?: 'required' | 'discouraged' | 'preferred' | undefined
              }
            }
            output: {
              challenge: string
              rp: { id?: string | undefined; name?: string | undefined }
              user: {
                id?: string | undefined
                name?: string | undefined
                displayName?: string | undefined
              }
              pubKeyCredParams: { type?: string | undefined; alg?: number | undefined }[]
              timeout?: number | undefined
              excludeCredentials?:
                | {
                    type?: string | undefined
                    id?: string | undefined
                    transports?: string[] | undefined
                  }[]
                | undefined
              authenticatorSelection?:
                | {
                    authenticatorAttachment?: string | undefined
                    residentKey?: string | undefined
                    userVerification?: string | undefined
                  }
                | undefined
              attestation?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/webauthn/register/verify': {
      $post:
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON?: string | undefined
                  attestationObject?: string | undefined
                  transports?: string[] | undefined
                }
                type: string
                name?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON?: string | undefined
                  attestationObject?: string | undefined
                  transports?: string[] | undefined
                }
                type: string
                name?: string | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON?: string | undefined
                  attestationObject?: string | undefined
                  transports?: string[] | undefined
                }
                type: string
                name?: string | undefined
              }
            }
            output: {
              id: string
              credentialId: string
              createdAt: string
              name?: string | undefined
              aaguid?: string | undefined
              deviceType?: 'platform' | 'cross-platform' | undefined
              transports?: string[] | undefined
              signCount?: number | undefined
              lastUsedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/webauthn/credentials': {
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
              credentialId: string
              createdAt: string
              name?: string | undefined
              aaguid?: string | undefined
              deviceType?: 'platform' | 'cross-platform' | undefined
              transports?: string[] | undefined
              signCount?: number | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/webauthn/credentials/:credentialId': {
      $patch:
        | {
            input: { param: { credentialId: string } } & { json: { name?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { credentialId: string } } & { json: { name?: string | undefined } }
            output: {
              id: string
              credentialId: string
              createdAt: string
              name?: string | undefined
              aaguid?: string | undefined
              deviceType?: 'platform' | 'cross-platform' | undefined
              transports?: string[] | undefined
              signCount?: number | undefined
              lastUsedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/webauthn/credentials/:credentialId': {
      $delete:
        | {
            input: { param: { credentialId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { credentialId: string } }
            output: {}
            outputFormat: string
            status: 409
          }
        | {
            input: { param: { credentialId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/mfa/backup-codes/generate': {
      $post:
        | {
            input: { json: { verificationCode: string; count?: number | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { verificationCode: string; count?: number | undefined } }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: { json: { verificationCode: string; count?: number | undefined } }
            output: { codes: string[]; generatedAt: string; warning?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/backup-codes/status': {
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
              total: number
              remaining: number
              usedCodes?:
                | { usedAt?: string | undefined; ipAddress?: string | undefined }[]
                | undefined
              generatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/challenge': {
      $post:
        | {
            input: {
              json: {
                mfaToken: string
                method?: 'totp' | 'sms' | 'email' | 'webauthn' | 'backup_code' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                mfaToken: string
                method?: 'totp' | 'sms' | 'email' | 'webauthn' | 'backup_code' | undefined
              }
            }
            output: {
              challengeId: string
              method: 'totp' | 'sms' | 'email' | 'webauthn' | 'backup_code'
              expiresAt: string
              maskedDestination?: string | undefined
              availableMethods?: string[] | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/challenge/send': {
      $post:
        | {
            input: { json: { challengeId: string } }
            output: {}
            outputFormat: string
            status: 429
          }
        | {
            input: { json: { challengeId: string } }
            output: {
              sent?: boolean | undefined
              maskedDestination?: string | undefined
              retryAfter?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/verify': {
      $post:
        | {
            input: {
              json:
                | { challengeId: string; method: 'totp'; code: string }
                | { challengeId: string; method: 'sms' | 'email'; code: string }
                | {
                    challengeId: string
                    method: 'webauthn'
                    credential: {
                      id: string
                      rawId: string
                      response: {
                        clientDataJSON?: string | undefined
                        authenticatorData?: string | undefined
                        signature?: string | undefined
                        userHandle?: string | undefined
                      }
                      type: string
                    }
                  }
                | { challengeId: string; method: 'backup_code'; code: string }
            }
            output: {
              error:
                | 'invalid_code'
                | 'expired_code'
                | 'invalid_challenge'
                | 'too_many_attempts'
                | 'method_not_available'
                | 'already_configured'
              message: string
              attemptsRemaining?: number | undefined
              retryAfter?: number | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json:
                | { challengeId: string; method: 'totp'; code: string }
                | { challengeId: string; method: 'sms' | 'email'; code: string }
                | {
                    challengeId: string
                    method: 'webauthn'
                    credential: {
                      id: string
                      rawId: string
                      response: {
                        clientDataJSON?: string | undefined
                        authenticatorData?: string | undefined
                        signature?: string | undefined
                        userHandle?: string | undefined
                      }
                      type: string
                    }
                  }
                | { challengeId: string; method: 'backup_code'; code: string }
            }
            output: {
              verified: boolean
              accessToken?: string | undefined
              refreshToken?: string | undefined
              expiresIn?: number | undefined
              backupCodesRemaining?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/webauthn/authenticate/options': {
      $post:
        | {
            input: { json: { challengeId: string } }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: { json: { challengeId: string } }
            output: {
              challenge: string
              allowCredentials: {
                type?: string | undefined
                id?: string | undefined
                transports?: string[] | undefined
              }[]
              timeout?: number | undefined
              rpId?: string | undefined
              userVerification?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/recovery': {
      $post:
        | { input: { json: { email: string } }; output: {}; outputFormat: string; status: 404 }
        | {
            input: { json: { email: string } }
            output: { message?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/mfa/recovery/verify': {
      $post:
        | {
            input: {
              json: {
                token: string
                identityVerification: {
                  dateOfBirth?: string | undefined
                  lastFourDigits?: string | undefined
                }
              }
            }
            output: {}
            outputFormat: string
            status: 400
          }
        | {
            input: {
              json: {
                token: string
                identityVerification: {
                  dateOfBirth?: string | undefined
                  lastFourDigits?: string | undefined
                }
              }
            }
            output: { temporaryToken?: string | undefined; expiresIn?: number | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
