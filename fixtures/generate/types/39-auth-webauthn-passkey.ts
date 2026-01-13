declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/webauthn/register/options': {
      $post:
        | {
            input: {
              json: {
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                residentKey?: 'discouraged' | 'preferred' | 'required' | undefined
                userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
                attestation?: 'none' | 'indirect' | 'direct' | 'enterprise' | undefined
              }
            }
            output: {
              challenge: string
              rp: { name: string; id: string }
              user: { id: string; name: string; displayName: string }
              pubKeyCredParams: { type: 'public-key'; alg: number }[]
              timeout?: number | undefined
              excludeCredentials?:
                | {
                    type: 'public-key'
                    id: string
                    transports?:
                      | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                      | undefined
                  }[]
                | undefined
              authenticatorSelection?:
                | {
                    authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                    residentKey?: 'discouraged' | 'preferred' | 'required' | undefined
                    requireResidentKey?: boolean | undefined
                    userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
                  }
                | undefined
              attestation?: 'none' | 'indirect' | 'direct' | 'enterprise' | undefined
              extensions?: { credProps?: boolean | undefined } | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                residentKey?: 'discouraged' | 'preferred' | 'required' | undefined
                userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
                attestation?: 'none' | 'indirect' | 'direct' | 'enterprise' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webauthn/register/verify': {
      $post:
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  attestationObject: string
                  transports?:
                    | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                    | undefined
                  publicKeyAlgorithm?: number | undefined
                  publicKey?: string | undefined
                  authenticatorData?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?:
                  | { credProps?: { rk?: boolean | undefined } | undefined }
                  | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                name?: string | undefined
              }
            }
            output: {
              id: string
              credentialId: string
              name?: string | undefined
              publicKey: string
              publicKeyAlgorithm?: number | undefined
              signCount: number
              transports?:
                | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                | undefined
              authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              aaguid?: string | undefined
              authenticatorName?: string | undefined
              isBackupEligible?: boolean | undefined
              isBackedUp?: boolean | undefined
              deviceInfo?:
                | {
                    os?: string | undefined
                    browser?: string | undefined
                    deviceType?: string | undefined
                  }
                | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  attestationObject: string
                  transports?:
                    | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                    | undefined
                  publicKeyAlgorithm?: number | undefined
                  publicKey?: string | undefined
                  authenticatorData?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?:
                  | { credProps?: { rk?: boolean | undefined } | undefined }
                  | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                name?: string | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_origin'
                | 'invalid_rp_id'
                | 'challenge_mismatch'
                | 'invalid_signature'
                | 'invalid_attestation'
                | 'credential_not_found'
                | 'user_not_found'
                | 'sign_count_invalid'
                | 'user_verification_failed'
                | 'timeout'
                | 'not_allowed'
                | 'unknown_error'
              message: string
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  attestationObject: string
                  transports?:
                    | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                    | undefined
                  publicKeyAlgorithm?: number | undefined
                  publicKey?: string | undefined
                  authenticatorData?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?:
                  | { credProps?: { rk?: boolean | undefined } | undefined }
                  | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                name?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webauthn/authenticate/options': {
      $post: {
        input: {
          json: {
            username?: string | undefined
            userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
          }
        }
        output: {
          challenge: string
          timeout?: number | undefined
          rpId: string
          allowCredentials?:
            | {
                type: 'public-key'
                id: string
                transports?:
                  | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                  | undefined
              }[]
            | undefined
          userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
          extensions?: { [x: string]: unknown } | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/webauthn/authenticate/verify': {
      $post:
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  authenticatorData: string
                  signature: string
                  userHandle?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?: { [x: string]: unknown } | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              }
            }
            output: {
              verified: boolean
              user: {
                id?: string | undefined
                username?: string | undefined
                email?: string | undefined
              }
              credential?: { id?: string | undefined; name?: string | undefined } | undefined
              accessToken?: string | undefined
              refreshToken?: string | undefined
              expiresIn?: number | undefined
              newSignCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  authenticatorData: string
                  signature: string
                  userHandle?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?: { [x: string]: unknown } | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_origin'
                | 'invalid_rp_id'
                | 'challenge_mismatch'
                | 'invalid_signature'
                | 'invalid_attestation'
                | 'credential_not_found'
                | 'user_not_found'
                | 'sign_count_invalid'
                | 'user_verification_failed'
                | 'timeout'
                | 'not_allowed'
                | 'unknown_error'
              message: string
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                id: string
                rawId: string
                response: {
                  clientDataJSON: string
                  authenticatorData: string
                  signature: string
                  userHandle?: string | undefined
                }
                type: 'public-key'
                clientExtensionResults?: { [x: string]: unknown } | undefined
                authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_origin'
                | 'invalid_rp_id'
                | 'challenge_mismatch'
                | 'invalid_signature'
                | 'invalid_attestation'
                | 'credential_not_found'
                | 'user_not_found'
                | 'sign_count_invalid'
                | 'user_verification_failed'
                | 'timeout'
                | 'not_allowed'
                | 'unknown_error'
              message: string
              details?: { [x: string]: unknown } | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webauthn/credentials': {
      $get:
        | {
            input: {}
            output: {
              id: string
              credentialId: string
              name?: string | undefined
              publicKey: string
              publicKeyAlgorithm?: number | undefined
              signCount: number
              transports?:
                | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                | undefined
              authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              aaguid?: string | undefined
              authenticatorName?: string | undefined
              isBackupEligible?: boolean | undefined
              isBackedUp?: boolean | undefined
              deviceInfo?:
                | {
                    os?: string | undefined
                    browser?: string | undefined
                    deviceType?: string | undefined
                  }
                | undefined
              lastUsedAt?: string | undefined
              createdAt: string
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
    }
  } & {
    '/webauthn/credentials/:credentialId': {
      $get:
        | {
            input: { param: { credentialId: string } }
            output: {
              id: string
              credentialId: string
              name?: string | undefined
              publicKey: string
              publicKeyAlgorithm?: number | undefined
              signCount: number
              transports?:
                | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                | undefined
              authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              aaguid?: string | undefined
              authenticatorName?: string | undefined
              isBackupEligible?: boolean | undefined
              isBackedUp?: boolean | undefined
              deviceInfo?:
                | {
                    os?: string | undefined
                    browser?: string | undefined
                    deviceType?: string | undefined
                  }
                | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { credentialId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { credentialId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
      $patch:
        | {
            input: { param: { credentialId: string } } & { json: { name?: string | undefined } }
            output: {
              id: string
              credentialId: string
              name?: string | undefined
              publicKey: string
              publicKeyAlgorithm?: number | undefined
              signCount: number
              transports?:
                | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                | undefined
              authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
              aaguid?: string | undefined
              authenticatorName?: string | undefined
              isBackupEligible?: boolean | undefined
              isBackedUp?: boolean | undefined
              deviceInfo?:
                | {
                    os?: string | undefined
                    browser?: string | undefined
                    deviceType?: string | undefined
                  }
                | undefined
              lastUsedAt?: string | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { credentialId: string } } & { json: { name?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
      $delete:
        | {
            input: { param: { credentialId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
        | {
            input: { param: { credentialId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { credentialId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webauthn/settings': {
      $get: {
        input: {}
        output: {
          rpId?: string | undefined
          rpName?: string | undefined
          origin?: string | undefined
          supportedAlgorithms?:
            | { alg?: number | undefined; name?: string | undefined }[]
            | undefined
          timeout?: number | undefined
          userVerification?: 'discouraged' | 'preferred' | 'required' | undefined
          attestation?: 'none' | 'indirect' | 'direct' | 'enterprise' | undefined
          residentKeyRequirement?: 'discouraged' | 'preferred' | 'required' | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/webauthn/settings/rp': {
      $get:
        | {
            input: {}
            output: { id: string; name: string; origin: string; icon?: string | undefined }
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
            input: { json: { name?: string | undefined } }
            output: { id: string; name: string; origin: string; icon?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { json: { name?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/webauthn/authenticators': {
      $get:
        | {
            input: {}
            output: {
              aaguid: string
              name: string
              icon?: string | undefined
              supportedTransports?: string[] | undefined
              isAllowed?: boolean | undefined
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
    }
  },
  '/'
>
export default routes
