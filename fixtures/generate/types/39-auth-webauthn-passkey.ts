import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
    {
      '/webauthn/register/options': {
        $post:
          | {
              input: {
                json: {
                  authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                  residentKey?: 'required' | 'discouraged' | 'preferred' | undefined
                  userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
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
                      residentKey?: 'required' | 'discouraged' | 'preferred' | undefined
                      requireResidentKey?: boolean | undefined
                      userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
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
                  residentKey?: 'required' | 'discouraged' | 'preferred' | undefined
                  userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
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
                publicKey: string
                signCount: number
                createdAt: string
                name?: string | undefined
                publicKeyAlgorithm?: number | undefined
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
                  | 'timeout'
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
                  | 'not_allowed'
                  | 'unknown_error'
                message: string
                details?: {} | undefined
              }
              outputFormat: 'json'
              status: 400
            }
      }
    } & {
      '/webauthn/authenticate/options': {
        $post: {
          input: {
            json: {
              username?: string | undefined
              userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
            }
          }
          output: {
            challenge: string
            rpId: string
            timeout?: number | undefined
            allowCredentials?:
              | {
                  type: 'public-key'
                  id: string
                  transports?:
                    | ('usb' | 'nfc' | 'ble' | 'smart-card' | 'hybrid' | 'internal')[]
                    | undefined
                }[]
              | undefined
            userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
            extensions?: {} | undefined
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
                  clientExtensionResults?: Record<string, never> | undefined
                  authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                }
              }
              output: {
                error:
                  | 'timeout'
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
                  | 'not_allowed'
                  | 'unknown_error'
                message: string
                details?: {} | undefined
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
                  clientExtensionResults?: Record<string, never> | undefined
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
                  clientExtensionResults?: Record<string, never> | undefined
                  authenticatorAttachment?: 'platform' | 'cross-platform' | undefined
                }
              }
              output: {
                error:
                  | 'timeout'
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
                  | 'not_allowed'
                  | 'unknown_error'
                message: string
                details?: {} | undefined
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
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {}
              output: {
                id: string
                credentialId: string
                publicKey: string
                signCount: number
                createdAt: string
                name?: string | undefined
                publicKeyAlgorithm?: number | undefined
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
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/webauthn/credentials/:credentialId': {
        $get:
          | {
              input: { param: { credentialId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { credentialId: string } }
              output: {
                id: string
                credentialId: string
                publicKey: string
                signCount: number
                createdAt: string
                name?: string | undefined
                publicKeyAlgorithm?: number | undefined
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
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { credentialId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
      }
    } & {
      '/webauthn/credentials/:credentialId': {
        $delete:
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
              status: 400
            }
          | {
              input: { param: { credentialId: string } }
              output: {}
              outputFormat: string
              status: 204
            }
      }
    } & {
      '/webauthn/credentials/:credentialId': {
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
                publicKey: string
                signCount: number
                createdAt: string
                name?: string | undefined
                publicKeyAlgorithm?: number | undefined
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
              }
              outputFormat: 'json'
              status: 200
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
            userVerification?: 'required' | 'discouraged' | 'preferred' | undefined
            attestation?: 'none' | 'indirect' | 'direct' | 'enterprise' | undefined
            residentKeyRequirement?: 'required' | 'discouraged' | 'preferred' | undefined
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
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {}
              output: { id: string; name: string; origin: string; icon?: string | undefined }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/webauthn/settings/rp': {
        $put:
          | {
              input: { json: { name?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { json: { name?: string | undefined } }
              output: { id: string; name: string; origin: string; icon?: string | undefined }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/webauthn/authenticators': {
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
                aaguid: string
                name: string
                icon?: string | undefined
                supportedTransports?: string[] | undefined
                isAllowed?: boolean | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    }
  >,
  '/'
>
export default routes
