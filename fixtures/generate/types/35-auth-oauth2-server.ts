declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/oauth/authorize': {
      $get:
        | {
            input: {
              query: {
                response_type: 'code' | 'token'
                client_id: string
                redirect_uri: string
                state: string
                scope?: string | undefined
                code_challenge?: string | undefined
                code_challenge_method?: 'plain' | 'S256' | undefined
                nonce?: string | undefined
                prompt?: 'none' | 'login' | 'consent' | 'select_account' | undefined
                login_hint?: string | undefined
                ui_locales?: string | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 302
          }
        | {
            input: {
              query: {
                response_type: 'code' | 'token'
                client_id: string
                redirect_uri: string
                state: string
                scope?: string | undefined
                code_challenge?: string | undefined
                code_challenge_method?: 'plain' | 'S256' | undefined
                nonce?: string | undefined
                prompt?: 'none' | 'login' | 'consent' | 'select_account' | undefined
                login_hint?: string | undefined
                ui_locales?: string | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_client'
                | 'invalid_grant'
                | 'unauthorized_client'
                | 'unsupported_grant_type'
                | 'invalid_scope'
                | 'access_denied'
                | 'expired_token'
                | 'authorization_pending'
                | 'slow_down'
              error_description?: string | undefined
              error_uri?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/oauth/token': {
      $post:
        | {
            input: {
              form:
                | {
                    grant_type: 'authorization_code'
                    code: string
                    redirect_uri: string
                    client_id: string
                    client_secret?: string | undefined
                    code_verifier?: string | undefined
                  }
                | {
                    grant_type: 'client_credentials'
                    client_id: string
                    client_secret: string
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'refresh_token'
                    refresh_token: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                    device_code: string
                    client_id: string
                  }
                | {
                    grant_type: 'password'
                    username: string
                    password: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_client'
                | 'invalid_grant'
                | 'unauthorized_client'
                | 'unsupported_grant_type'
                | 'invalid_scope'
                | 'access_denied'
                | 'expired_token'
                | 'authorization_pending'
                | 'slow_down'
              error_description?: string | undefined
              error_uri?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              form:
                | {
                    grant_type: 'authorization_code'
                    code: string
                    redirect_uri: string
                    client_id: string
                    client_secret?: string | undefined
                    code_verifier?: string | undefined
                  }
                | {
                    grant_type: 'client_credentials'
                    client_id: string
                    client_secret: string
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'refresh_token'
                    refresh_token: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                    device_code: string
                    client_id: string
                  }
                | {
                    grant_type: 'password'
                    username: string
                    password: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
            }
            output: {
              access_token: string
              token_type: 'Bearer'
              expires_in?: number | undefined
              refresh_token?: string | undefined
              scope?: string | undefined
              id_token?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              form:
                | {
                    grant_type: 'authorization_code'
                    code: string
                    redirect_uri: string
                    client_id: string
                    client_secret?: string | undefined
                    code_verifier?: string | undefined
                  }
                | {
                    grant_type: 'client_credentials'
                    client_id: string
                    client_secret: string
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'refresh_token'
                    refresh_token: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
                | {
                    grant_type: 'urn:ietf:params:oauth:grant-type:device_code'
                    device_code: string
                    client_id: string
                  }
                | {
                    grant_type: 'password'
                    username: string
                    password: string
                    client_id?: string | undefined
                    client_secret?: string | undefined
                    scope?: string | undefined
                  }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_client'
                | 'invalid_grant'
                | 'unauthorized_client'
                | 'unsupported_grant_type'
                | 'invalid_scope'
                | 'access_denied'
                | 'expired_token'
                | 'authorization_pending'
                | 'slow_down'
              error_description?: string | undefined
              error_uri?: string | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/oauth/revoke': {
      $post:
        | {
            input: {
              form: {
                token: string
                token_type_hint?: 'refresh_token' | 'access_token' | undefined
                client_id?: string | undefined
                client_secret?: string | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_client'
                | 'invalid_grant'
                | 'unauthorized_client'
                | 'unsupported_grant_type'
                | 'invalid_scope'
                | 'access_denied'
                | 'expired_token'
                | 'authorization_pending'
                | 'slow_down'
              error_description?: string | undefined
              error_uri?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              form: {
                token: string
                token_type_hint?: 'refresh_token' | 'access_token' | undefined
                client_id?: string | undefined
                client_secret?: string | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 200
          }
    }
  } & {
    '/oauth/introspect': {
      $post:
        | {
            input: {
              form: {
                token: string
                token_type_hint?: 'refresh_token' | 'access_token' | undefined
              }
            }
            output: {
              active: boolean
              scope?: string | undefined
              client_id?: string | undefined
              username?: string | undefined
              token_type?: string | undefined
              exp?: number | undefined
              iat?: number | undefined
              nbf?: number | undefined
              sub?: string | undefined
              aud?: string | undefined
              iss?: string | undefined
              jti?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              form: {
                token: string
                token_type_hint?: 'refresh_token' | 'access_token' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/oauth/device/code': {
      $post:
        | {
            input: { form: { client_id: string; scope?: string | undefined } }
            output: {
              error:
                | 'invalid_request'
                | 'invalid_client'
                | 'invalid_grant'
                | 'unauthorized_client'
                | 'unsupported_grant_type'
                | 'invalid_scope'
                | 'access_denied'
                | 'expired_token'
                | 'authorization_pending'
                | 'slow_down'
              error_description?: string | undefined
              error_uri?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { form: { client_id: string; scope?: string | undefined } }
            output: {
              device_code: string
              user_code: string
              verification_uri: string
              expires_in: number
              verification_uri_complete?: string | undefined
              interval?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/oauth/userinfo': {
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
              sub: string
              name?: string | undefined
              given_name?: string | undefined
              family_name?: string | undefined
              middle_name?: string | undefined
              nickname?: string | undefined
              preferred_username?: string | undefined
              profile?: string | undefined
              picture?: string | undefined
              website?: string | undefined
              email?: string | undefined
              email_verified?: boolean | undefined
              gender?: string | undefined
              birthdate?: string | undefined
              zoneinfo?: string | undefined
              locale?: string | undefined
              phone_number?: string | undefined
              phone_number_verified?: boolean | undefined
              address?:
                | {
                    formatted?: string | undefined
                    street_address?: string | undefined
                    locality?: string | undefined
                    region?: string | undefined
                    postal_code?: string | undefined
                    country?: string | undefined
                  }
                | undefined
              updated_at?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/.well-known/openid-configuration': {
      $get: {
        input: {}
        output: {
          issuer: string
          authorization_endpoint: string
          token_endpoint: string
          jwks_uri: string
          response_types_supported: string[]
          subject_types_supported: string[]
          id_token_signing_alg_values_supported: string[]
          userinfo_endpoint?: string | undefined
          registration_endpoint?: string | undefined
          scopes_supported?: string[] | undefined
          response_modes_supported?: string[] | undefined
          grant_types_supported?: string[] | undefined
          token_endpoint_auth_methods_supported?: string[] | undefined
          claims_supported?: string[] | undefined
          code_challenge_methods_supported?: string[] | undefined
          introspection_endpoint?: string | undefined
          revocation_endpoint?: string | undefined
          device_authorization_endpoint?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/.well-known/jwks.json': {
      $get: {
        input: {}
        output: {
          keys: {
            kty: 'RSA' | 'EC'
            kid: string
            use: 'sig' | 'enc'
            alg?: string | undefined
            n?: string | undefined
            e?: string | undefined
            x?: string | undefined
            y?: string | undefined
            crv?: string | undefined
          }[]
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/oauth/clients': {
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
              clientId: string
              clientName: string
              clientType: 'public' | 'confidential'
              createdAt: string
              redirectUris?: string[] | undefined
              grantTypes?:
                | (
                    | 'password'
                    | 'authorization_code'
                    | 'client_credentials'
                    | 'refresh_token'
                    | 'urn:ietf:params:oauth:grant-type:device_code'
                  )[]
                | undefined
              responseTypes?: ('code' | 'token')[] | undefined
              scope?: string | undefined
              logoUri?: string | undefined
              clientUri?: string | undefined
              policyUri?: string | undefined
              tosUri?: string | undefined
              contacts?: string[] | undefined
              tokenEndpointAuthMethod?:
                | 'none'
                | 'client_secret_basic'
                | 'client_secret_post'
                | undefined
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/oauth/clients': {
      $post:
        | {
            input: {
              json: {
                clientName: string
                redirectUris: string[]
                clientType?: 'public' | 'confidential' | undefined
                grantTypes?:
                  | (
                      | 'password'
                      | 'authorization_code'
                      | 'client_credentials'
                      | 'refresh_token'
                      | 'urn:ietf:params:oauth:grant-type:device_code'
                    )[]
                  | undefined
                responseTypes?: ('code' | 'token')[] | undefined
                scope?: string | undefined
                logoUri?: string | undefined
                clientUri?: string | undefined
                policyUri?: string | undefined
                tosUri?: string | undefined
                contacts?: string[] | undefined
                tokenEndpointAuthMethod?:
                  | 'none'
                  | 'client_secret_basic'
                  | 'client_secret_post'
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                clientName: string
                redirectUris: string[]
                clientType?: 'public' | 'confidential' | undefined
                grantTypes?:
                  | (
                      | 'password'
                      | 'authorization_code'
                      | 'client_credentials'
                      | 'refresh_token'
                      | 'urn:ietf:params:oauth:grant-type:device_code'
                    )[]
                  | undefined
                responseTypes?: ('code' | 'token')[] | undefined
                scope?: string | undefined
                logoUri?: string | undefined
                clientUri?: string | undefined
                policyUri?: string | undefined
                tosUri?: string | undefined
                contacts?: string[] | undefined
                tokenEndpointAuthMethod?:
                  | 'none'
                  | 'client_secret_basic'
                  | 'client_secret_post'
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                clientName: string
                redirectUris: string[]
                clientType?: 'public' | 'confidential' | undefined
                grantTypes?:
                  | (
                      | 'password'
                      | 'authorization_code'
                      | 'client_credentials'
                      | 'refresh_token'
                      | 'urn:ietf:params:oauth:grant-type:device_code'
                    )[]
                  | undefined
                responseTypes?: ('code' | 'token')[] | undefined
                scope?: string | undefined
                logoUri?: string | undefined
                clientUri?: string | undefined
                policyUri?: string | undefined
                tosUri?: string | undefined
                contacts?: string[] | undefined
                tokenEndpointAuthMethod?:
                  | 'none'
                  | 'client_secret_basic'
                  | 'client_secret_post'
                  | undefined
              }
            }
            output: {
              clientId: string
              clientName: string
              clientType: 'public' | 'confidential'
              createdAt: string
              redirectUris?: string[] | undefined
              grantTypes?:
                | (
                    | 'password'
                    | 'authorization_code'
                    | 'client_credentials'
                    | 'refresh_token'
                    | 'urn:ietf:params:oauth:grant-type:device_code'
                  )[]
                | undefined
              responseTypes?: ('code' | 'token')[] | undefined
              scope?: string | undefined
              logoUri?: string | undefined
              clientUri?: string | undefined
              policyUri?: string | undefined
              tosUri?: string | undefined
              contacts?: string[] | undefined
              tokenEndpointAuthMethod?:
                | 'none'
                | 'client_secret_basic'
                | 'client_secret_post'
                | undefined
              updatedAt?: string | undefined
              clientSecret: string
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/oauth/clients/:clientId': {
      $get:
        | {
            input: { param: { clientId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { clientId: string } }
            output: {
              clientId: string
              clientName: string
              clientType: 'public' | 'confidential'
              createdAt: string
              redirectUris?: string[] | undefined
              grantTypes?:
                | (
                    | 'password'
                    | 'authorization_code'
                    | 'client_credentials'
                    | 'refresh_token'
                    | 'urn:ietf:params:oauth:grant-type:device_code'
                  )[]
                | undefined
              responseTypes?: ('code' | 'token')[] | undefined
              scope?: string | undefined
              logoUri?: string | undefined
              clientUri?: string | undefined
              policyUri?: string | undefined
              tosUri?: string | undefined
              contacts?: string[] | undefined
              tokenEndpointAuthMethod?:
                | 'none'
                | 'client_secret_basic'
                | 'client_secret_post'
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { clientId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/oauth/clients/:clientId': {
      $put:
        | {
            input: { param: { clientId: string } } & {
              json: {
                clientName?: string | undefined
                redirectUris?: string[] | undefined
                grantTypes?: string[] | undefined
                responseTypes?: string[] | undefined
                scope?: string | undefined
                logoUri?: string | undefined
                clientUri?: string | undefined
                policyUri?: string | undefined
                tosUri?: string | undefined
                contacts?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { clientId: string } } & {
              json: {
                clientName?: string | undefined
                redirectUris?: string[] | undefined
                grantTypes?: string[] | undefined
                responseTypes?: string[] | undefined
                scope?: string | undefined
                logoUri?: string | undefined
                clientUri?: string | undefined
                policyUri?: string | undefined
                tosUri?: string | undefined
                contacts?: string[] | undefined
              }
            }
            output: {
              clientId: string
              clientName: string
              clientType: 'public' | 'confidential'
              createdAt: string
              redirectUris?: string[] | undefined
              grantTypes?:
                | (
                    | 'password'
                    | 'authorization_code'
                    | 'client_credentials'
                    | 'refresh_token'
                    | 'urn:ietf:params:oauth:grant-type:device_code'
                  )[]
                | undefined
              responseTypes?: ('code' | 'token')[] | undefined
              scope?: string | undefined
              logoUri?: string | undefined
              clientUri?: string | undefined
              policyUri?: string | undefined
              tosUri?: string | undefined
              contacts?: string[] | undefined
              tokenEndpointAuthMethod?:
                | 'none'
                | 'client_secret_basic'
                | 'client_secret_post'
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/oauth/clients/:clientId': {
      $delete:
        | {
            input: { param: { clientId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { clientId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/oauth/clients/:clientId/secret': {
      $post:
        | {
            input: { param: { clientId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { clientId: string } }
            output: { clientSecret?: string | undefined }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/oauth/consents': {
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
              clientId: string
              clientName: string
              scope: string
              grantedAt: string
              clientLogoUri?: string | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/oauth/consents/:clientId': {
      $delete:
        | {
            input: { param: { clientId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { clientId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  },
  '/'
>
export default routes
