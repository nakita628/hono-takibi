declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/social/authorize/:provider': {
      $get:
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & {
              query: {
                redirect_uri: string
                state?: string | undefined
                scope?: string | undefined
                login_hint?: string | undefined
                prompt?: 'none' | 'consent' | 'select_account' | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 302
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & {
              query: {
                redirect_uri: string
                state?: string | undefined
                scope?: string | undefined
                login_hint?: string | undefined
                prompt?: 'none' | 'consent' | 'select_account' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/social/callback/:provider': {
      $get:
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & {
              query: {
                code?: string | undefined
                state?: string | undefined
                error?: string | undefined
                error_description?: string | undefined
              }
            }
            output: {}
            outputFormat: string
            status: 302
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & {
              query: {
                code?: string | undefined
                state?: string | undefined
                error?: string | undefined
                error_description?: string | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'access_denied'
                | 'unauthorized_client'
                | 'invalid_scope'
                | 'server_error'
                | 'temporarily_unavailable'
                | 'invalid_token'
                | 'email_not_verified'
                | 'domain_not_allowed'
                | 'user_exists'
                | 'linking_failed'
              message: string
              provider?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/social/token': {
      $post:
        | {
            input: {
              json: {
                provider: string
                code: string
                redirectUri: string
                codeVerifier?: string | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'access_denied'
                | 'unauthorized_client'
                | 'invalid_scope'
                | 'server_error'
                | 'temporarily_unavailable'
                | 'invalid_token'
                | 'email_not_verified'
                | 'domain_not_allowed'
                | 'user_exists'
                | 'linking_failed'
              message: string
              provider?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                provider: string
                code: string
                redirectUri: string
                codeVerifier?: string | undefined
              }
            }
            output: {
              user: {
                id?: string | undefined
                email?: string | undefined
                name?: string | undefined
                picture?: string | undefined
              }
              isNewUser: boolean
              accessToken?: string | undefined
              refreshToken?: string | undefined
              expiresIn?: number | undefined
              provider?: string | undefined
              providerUserId?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/social/token/native': {
      $post:
        | {
            input: {
              json: {
                provider: string
                token: string
                tokenType?: 'id_token' | 'access_token' | undefined
              }
            }
            output: {
              error:
                | 'invalid_request'
                | 'access_denied'
                | 'unauthorized_client'
                | 'invalid_scope'
                | 'server_error'
                | 'temporarily_unavailable'
                | 'invalid_token'
                | 'email_not_verified'
                | 'domain_not_allowed'
                | 'user_exists'
                | 'linking_failed'
              message: string
              provider?: string | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                provider: string
                token: string
                tokenType?: 'id_token' | 'access_token' | undefined
              }
            }
            output: {
              user: {
                id?: string | undefined
                email?: string | undefined
                name?: string | undefined
                picture?: string | undefined
              }
              isNewUser: boolean
              accessToken?: string | undefined
              refreshToken?: string | undefined
              expiresIn?: number | undefined
              provider?: string | undefined
              providerUserId?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/providers': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          type: 'oauth2' | 'oidc' | 'saml'
          enabled: boolean
          icon?: string | undefined
          buttonColor?: string | undefined
          buttonTextColor?: string | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/providers/admin': {
      $get:
        | {
            input: {}
            output: {
              id: string
              name: string
              type: 'oauth2' | 'oidc' | 'saml'
              enabled: boolean
              createdAt: string
              clientId?: string | undefined
              authorizationUrl?: string | undefined
              tokenUrl?: string | undefined
              userInfoUrl?: string | undefined
              scopes?: string[] | undefined
              attributeMapping?:
                | {
                    id?: string | undefined
                    email?: string | undefined
                    name?: string | undefined
                    picture?: string | undefined
                  }
                | undefined
              allowedDomains?: string[] | undefined
              autoCreateUser?: boolean | undefined
              autoLinkUser?: boolean | undefined
              icon?: string | undefined
              buttonColor?: string | undefined
              updatedAt?: string | undefined
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
    '/providers/admin': {
      $post:
        | {
            input: {
              json: {
                name: string
                type: 'oauth2' | 'oidc'
                clientId: string
                clientSecret: string
                authorizationUrl?: string | undefined
                tokenUrl?: string | undefined
                userInfoUrl?: string | undefined
                scopes?: string[] | undefined
                attributeMapping?: Record<string, never> | undefined
                allowedDomains?: string[] | undefined
                autoCreateUser?: boolean | undefined
                autoLinkUser?: boolean | undefined
                icon?: string | undefined
                buttonColor?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                name: string
                type: 'oauth2' | 'oidc'
                clientId: string
                clientSecret: string
                authorizationUrl?: string | undefined
                tokenUrl?: string | undefined
                userInfoUrl?: string | undefined
                scopes?: string[] | undefined
                attributeMapping?: Record<string, never> | undefined
                allowedDomains?: string[] | undefined
                autoCreateUser?: boolean | undefined
                autoLinkUser?: boolean | undefined
                icon?: string | undefined
                buttonColor?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                name: string
                type: 'oauth2' | 'oidc'
                clientId: string
                clientSecret: string
                authorizationUrl?: string | undefined
                tokenUrl?: string | undefined
                userInfoUrl?: string | undefined
                scopes?: string[] | undefined
                attributeMapping?: Record<string, never> | undefined
                allowedDomains?: string[] | undefined
                autoCreateUser?: boolean | undefined
                autoLinkUser?: boolean | undefined
                icon?: string | undefined
                buttonColor?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              type: 'oauth2' | 'oidc' | 'saml'
              enabled: boolean
              createdAt: string
              clientId?: string | undefined
              authorizationUrl?: string | undefined
              tokenUrl?: string | undefined
              userInfoUrl?: string | undefined
              scopes?: string[] | undefined
              attributeMapping?:
                | {
                    id?: string | undefined
                    email?: string | undefined
                    name?: string | undefined
                    picture?: string | undefined
                  }
                | undefined
              allowedDomains?: string[] | undefined
              autoCreateUser?: boolean | undefined
              autoLinkUser?: boolean | undefined
              icon?: string | undefined
              buttonColor?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/providers/:providerId': {
      $get:
        | {
            input: { param: { providerId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { providerId: string } }
            output: {
              id: string
              name: string
              type: 'oauth2' | 'oidc' | 'saml'
              enabled: boolean
              createdAt: string
              clientId?: string | undefined
              authorizationUrl?: string | undefined
              tokenUrl?: string | undefined
              userInfoUrl?: string | undefined
              scopes?: string[] | undefined
              attributeMapping?:
                | {
                    id?: string | undefined
                    email?: string | undefined
                    name?: string | undefined
                    picture?: string | undefined
                  }
                | undefined
              allowedDomains?: string[] | undefined
              autoCreateUser?: boolean | undefined
              autoLinkUser?: boolean | undefined
              icon?: string | undefined
              buttonColor?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { providerId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/providers/:providerId': {
      $put:
        | {
            input: { param: { providerId: string } } & {
              json: {
                name?: string | undefined
                enabled?: boolean | undefined
                clientId?: string | undefined
                clientSecret?: string | undefined
                authorizationUrl?: string | undefined
                tokenUrl?: string | undefined
                userInfoUrl?: string | undefined
                scopes?: string[] | undefined
                attributeMapping?: Record<string, never> | undefined
                allowedDomains?: string[] | undefined
                autoCreateUser?: boolean | undefined
                autoLinkUser?: boolean | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { providerId: string } } & {
              json: {
                name?: string | undefined
                enabled?: boolean | undefined
                clientId?: string | undefined
                clientSecret?: string | undefined
                authorizationUrl?: string | undefined
                tokenUrl?: string | undefined
                userInfoUrl?: string | undefined
                scopes?: string[] | undefined
                attributeMapping?: Record<string, never> | undefined
                allowedDomains?: string[] | undefined
                autoCreateUser?: boolean | undefined
                autoLinkUser?: boolean | undefined
              }
            }
            output: {
              id: string
              name: string
              type: 'oauth2' | 'oidc' | 'saml'
              enabled: boolean
              createdAt: string
              clientId?: string | undefined
              authorizationUrl?: string | undefined
              tokenUrl?: string | undefined
              userInfoUrl?: string | undefined
              scopes?: string[] | undefined
              attributeMapping?:
                | {
                    id?: string | undefined
                    email?: string | undefined
                    name?: string | undefined
                    picture?: string | undefined
                  }
                | undefined
              allowedDomains?: string[] | undefined
              autoCreateUser?: boolean | undefined
              autoLinkUser?: boolean | undefined
              icon?: string | undefined
              buttonColor?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/providers/:providerId': {
      $delete:
        | {
            input: { param: { providerId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { providerId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/providers/:providerId/test': {
      $post:
        | {
            input: { param: { providerId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { providerId: string } }
            output: {
              success?: boolean | undefined
              message?: string | undefined
              details?: {} | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/account/linked': {
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
              provider: string
              providerUserId: string
              createdAt: string
              providerEmail?: string | undefined
              providerName?: string | undefined
              providerPicture?: string | undefined
              lastUsedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/account/link/:provider': {
      $post:
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & { json: { code: string; redirectUri: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & { json: { code: string; redirectUri: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & { json: { code: string; redirectUri: string } }
            output: {
              id: string
              provider: string
              providerUserId: string
              createdAt: string
              providerEmail?: string | undefined
              providerName?: string | undefined
              providerPicture?: string | undefined
              lastUsedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            } & { json: { code: string; redirectUri: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 409
          }
    }
  } & {
    '/account/link/:provider': {
      $delete:
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              param: {
                provider:
                  | 'google'
                  | 'github'
                  | 'microsoft'
                  | 'apple'
                  | 'facebook'
                  | 'twitter'
                  | 'linkedin'
                  | 'slack'
                  | 'discord'
                  | 'custom'
              }
            }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/enterprise/sso': {
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
              name: string
              type: 'oidc' | 'saml'
              domains: string[]
              enabled: boolean
              createdAt: string
              samlConfig?:
                | {
                    entityId?: string | undefined
                    ssoUrl?: string | undefined
                    sloUrl?: string | undefined
                    certificate?: string | undefined
                    signRequest?: boolean | undefined
                    signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                    digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                    nameIdFormat?: string | undefined
                    attributeMapping?:
                      | {
                          email?: string | undefined
                          name?: string | undefined
                          firstName?: string | undefined
                          lastName?: string | undefined
                          groups?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              oidcConfig?:
                | {
                    issuer?: string | undefined
                    clientId?: string | undefined
                    authorizationEndpoint?: string | undefined
                    tokenEndpoint?: string | undefined
                    userInfoEndpoint?: string | undefined
                    jwksUri?: string | undefined
                    scopes?: string[] | undefined
                    attributeMapping?: {} | undefined
                  }
                | undefined
              userProvisioning?:
                | {
                    autoCreate?: boolean | undefined
                    autoUpdate?: boolean | undefined
                    defaultRole?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/enterprise/sso': {
      $post:
        | {
            input: {
              json: {
                name: string
                type: 'oidc' | 'saml'
                domains: string[]
                samlConfig?:
                  | {
                      entityId?: string | undefined
                      ssoUrl?: string | undefined
                      sloUrl?: string | undefined
                      certificate?: string | undefined
                      signRequest?: boolean | undefined
                      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                      digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                      nameIdFormat?: string | undefined
                      attributeMapping?:
                        | {
                            email?: string | undefined
                            name?: string | undefined
                            firstName?: string | undefined
                            lastName?: string | undefined
                            groups?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                oidcConfig?:
                  | {
                      issuer?: string | undefined
                      clientId?: string | undefined
                      authorizationEndpoint?: string | undefined
                      tokenEndpoint?: string | undefined
                      userInfoEndpoint?: string | undefined
                      jwksUri?: string | undefined
                      scopes?: string[] | undefined
                      attributeMapping?: Record<string, never> | undefined
                    }
                  | undefined
                userProvisioning?: Record<string, never> | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                name: string
                type: 'oidc' | 'saml'
                domains: string[]
                samlConfig?:
                  | {
                      entityId?: string | undefined
                      ssoUrl?: string | undefined
                      sloUrl?: string | undefined
                      certificate?: string | undefined
                      signRequest?: boolean | undefined
                      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                      digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                      nameIdFormat?: string | undefined
                      attributeMapping?:
                        | {
                            email?: string | undefined
                            name?: string | undefined
                            firstName?: string | undefined
                            lastName?: string | undefined
                            groups?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                oidcConfig?:
                  | {
                      issuer?: string | undefined
                      clientId?: string | undefined
                      authorizationEndpoint?: string | undefined
                      tokenEndpoint?: string | undefined
                      userInfoEndpoint?: string | undefined
                      jwksUri?: string | undefined
                      scopes?: string[] | undefined
                      attributeMapping?: Record<string, never> | undefined
                    }
                  | undefined
                userProvisioning?: Record<string, never> | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                name: string
                type: 'oidc' | 'saml'
                domains: string[]
                samlConfig?:
                  | {
                      entityId?: string | undefined
                      ssoUrl?: string | undefined
                      sloUrl?: string | undefined
                      certificate?: string | undefined
                      signRequest?: boolean | undefined
                      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                      digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                      nameIdFormat?: string | undefined
                      attributeMapping?:
                        | {
                            email?: string | undefined
                            name?: string | undefined
                            firstName?: string | undefined
                            lastName?: string | undefined
                            groups?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                oidcConfig?:
                  | {
                      issuer?: string | undefined
                      clientId?: string | undefined
                      authorizationEndpoint?: string | undefined
                      tokenEndpoint?: string | undefined
                      userInfoEndpoint?: string | undefined
                      jwksUri?: string | undefined
                      scopes?: string[] | undefined
                      attributeMapping?: Record<string, never> | undefined
                    }
                  | undefined
                userProvisioning?: Record<string, never> | undefined
              }
            }
            output: {
              id: string
              name: string
              type: 'oidc' | 'saml'
              domains: string[]
              enabled: boolean
              createdAt: string
              samlConfig?:
                | {
                    entityId?: string | undefined
                    ssoUrl?: string | undefined
                    sloUrl?: string | undefined
                    certificate?: string | undefined
                    signRequest?: boolean | undefined
                    signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                    digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                    nameIdFormat?: string | undefined
                    attributeMapping?:
                      | {
                          email?: string | undefined
                          name?: string | undefined
                          firstName?: string | undefined
                          lastName?: string | undefined
                          groups?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              oidcConfig?:
                | {
                    issuer?: string | undefined
                    clientId?: string | undefined
                    authorizationEndpoint?: string | undefined
                    tokenEndpoint?: string | undefined
                    userInfoEndpoint?: string | undefined
                    jwksUri?: string | undefined
                    scopes?: string[] | undefined
                    attributeMapping?: {} | undefined
                  }
                | undefined
              userProvisioning?:
                | {
                    autoCreate?: boolean | undefined
                    autoUpdate?: boolean | undefined
                    defaultRole?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/enterprise/sso/:configId': {
      $get:
        | {
            input: { param: { configId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { configId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { configId: string } }
            output: {
              id: string
              name: string
              type: 'oidc' | 'saml'
              domains: string[]
              enabled: boolean
              createdAt: string
              samlConfig?:
                | {
                    entityId?: string | undefined
                    ssoUrl?: string | undefined
                    sloUrl?: string | undefined
                    certificate?: string | undefined
                    signRequest?: boolean | undefined
                    signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                    digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                    nameIdFormat?: string | undefined
                    attributeMapping?:
                      | {
                          email?: string | undefined
                          name?: string | undefined
                          firstName?: string | undefined
                          lastName?: string | undefined
                          groups?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              oidcConfig?:
                | {
                    issuer?: string | undefined
                    clientId?: string | undefined
                    authorizationEndpoint?: string | undefined
                    tokenEndpoint?: string | undefined
                    userInfoEndpoint?: string | undefined
                    jwksUri?: string | undefined
                    scopes?: string[] | undefined
                    attributeMapping?: {} | undefined
                  }
                | undefined
              userProvisioning?:
                | {
                    autoCreate?: boolean | undefined
                    autoUpdate?: boolean | undefined
                    defaultRole?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/enterprise/sso/:configId': {
      $put:
        | {
            input: { param: { configId: string } } & {
              json: {
                name?: string | undefined
                enabled?: boolean | undefined
                domains?: string[] | undefined
                samlConfig?:
                  | {
                      entityId?: string | undefined
                      ssoUrl?: string | undefined
                      sloUrl?: string | undefined
                      certificate?: string | undefined
                      signRequest?: boolean | undefined
                      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                      digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                      nameIdFormat?: string | undefined
                      attributeMapping?:
                        | {
                            email?: string | undefined
                            name?: string | undefined
                            firstName?: string | undefined
                            lastName?: string | undefined
                            groups?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                oidcConfig?:
                  | {
                      issuer?: string | undefined
                      clientId?: string | undefined
                      authorizationEndpoint?: string | undefined
                      tokenEndpoint?: string | undefined
                      userInfoEndpoint?: string | undefined
                      jwksUri?: string | undefined
                      scopes?: string[] | undefined
                      attributeMapping?: Record<string, never> | undefined
                    }
                  | undefined
                userProvisioning?: Record<string, never> | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { configId: string } } & {
              json: {
                name?: string | undefined
                enabled?: boolean | undefined
                domains?: string[] | undefined
                samlConfig?:
                  | {
                      entityId?: string | undefined
                      ssoUrl?: string | undefined
                      sloUrl?: string | undefined
                      certificate?: string | undefined
                      signRequest?: boolean | undefined
                      signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                      digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                      nameIdFormat?: string | undefined
                      attributeMapping?:
                        | {
                            email?: string | undefined
                            name?: string | undefined
                            firstName?: string | undefined
                            lastName?: string | undefined
                            groups?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                oidcConfig?:
                  | {
                      issuer?: string | undefined
                      clientId?: string | undefined
                      authorizationEndpoint?: string | undefined
                      tokenEndpoint?: string | undefined
                      userInfoEndpoint?: string | undefined
                      jwksUri?: string | undefined
                      scopes?: string[] | undefined
                      attributeMapping?: Record<string, never> | undefined
                    }
                  | undefined
                userProvisioning?: Record<string, never> | undefined
              }
            }
            output: {
              id: string
              name: string
              type: 'oidc' | 'saml'
              domains: string[]
              enabled: boolean
              createdAt: string
              samlConfig?:
                | {
                    entityId?: string | undefined
                    ssoUrl?: string | undefined
                    sloUrl?: string | undefined
                    certificate?: string | undefined
                    signRequest?: boolean | undefined
                    signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                    digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                    nameIdFormat?: string | undefined
                    attributeMapping?:
                      | {
                          email?: string | undefined
                          name?: string | undefined
                          firstName?: string | undefined
                          lastName?: string | undefined
                          groups?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              oidcConfig?:
                | {
                    issuer?: string | undefined
                    clientId?: string | undefined
                    authorizationEndpoint?: string | undefined
                    tokenEndpoint?: string | undefined
                    userInfoEndpoint?: string | undefined
                    jwksUri?: string | undefined
                    scopes?: string[] | undefined
                    attributeMapping?: {} | undefined
                  }
                | undefined
              userProvisioning?:
                | {
                    autoCreate?: boolean | undefined
                    autoUpdate?: boolean | undefined
                    defaultRole?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/enterprise/sso/:configId': {
      $delete:
        | {
            input: { param: { configId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { configId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/enterprise/sso/domain-lookup': {
      $get:
        | {
            input: { query: { domain: string } }
            output: {
              id: string
              name: string
              type: 'oidc' | 'saml'
              domains: string[]
              enabled: boolean
              createdAt: string
              samlConfig?:
                | {
                    entityId?: string | undefined
                    ssoUrl?: string | undefined
                    sloUrl?: string | undefined
                    certificate?: string | undefined
                    signRequest?: boolean | undefined
                    signatureAlgorithm?: 'RSA-SHA256' | 'RSA-SHA512' | undefined
                    digestAlgorithm?: 'SHA256' | 'SHA512' | undefined
                    nameIdFormat?: string | undefined
                    attributeMapping?:
                      | {
                          email?: string | undefined
                          name?: string | undefined
                          firstName?: string | undefined
                          lastName?: string | undefined
                          groups?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              oidcConfig?:
                | {
                    issuer?: string | undefined
                    clientId?: string | undefined
                    authorizationEndpoint?: string | undefined
                    tokenEndpoint?: string | undefined
                    userInfoEndpoint?: string | undefined
                    jwksUri?: string | undefined
                    scopes?: string[] | undefined
                    attributeMapping?: {} | undefined
                  }
                | undefined
              userProvisioning?:
                | {
                    autoCreate?: boolean | undefined
                    autoUpdate?: boolean | undefined
                    defaultRole?: string | undefined
                  }
                | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | { input: { query: { domain: string } }; output: {}; outputFormat: string; status: 404 }
    }
  } & {
    '/enterprise/sso/:configId/metadata': {
      $get: {
        input: { param: { configId: string } }
        output: Response
        outputFormat: 'json'
        status: import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/utils/http-status').StatusCode
      }
    }
  },
  '/'
>
export default routes
