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
      '/saml/sso': {
        $get:
          | {
              input: {
                query: {
                  SAMLRequest: string
                  RelayState?: string | undefined
                  SigAlg?: string | undefined
                  Signature?: string | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 302
            }
          | {
              input: {
                query: {
                  SAMLRequest: string
                  RelayState?: string | undefined
                  SigAlg?: string | undefined
                  Signature?: string | undefined
                }
              }
              output: {
                error:
                  | 'invalid_request'
                  | 'invalid_sp'
                  | 'invalid_signature'
                  | 'invalid_assertion'
                  | 'expired_assertion'
                  | 'unknown_sp'
                  | 'binding_not_supported'
                message: string
                samlStatus?: string | undefined
              }
              outputFormat: 'json'
              status: 400
            }
      }
    } & {
      '/saml/sso': {
        $post:
          | {
              input: { form: { SAMLRequest: string; RelayState?: string | undefined } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { form: { SAMLRequest: string; RelayState?: string | undefined } }
              output: {}
              outputFormat: string
              status: 302
            }
          | {
              input: { form: { SAMLRequest: string; RelayState?: string | undefined } }
              output: {
                error:
                  | 'invalid_request'
                  | 'invalid_sp'
                  | 'invalid_signature'
                  | 'invalid_assertion'
                  | 'expired_assertion'
                  | 'unknown_sp'
                  | 'binding_not_supported'
                message: string
                samlStatus?: string | undefined
              }
              outputFormat: 'json'
              status: 400
            }
      }
    } & {
      '/saml/slo': {
        $get: {
          input: {
            query: {
              SAMLRequest?: string | undefined
              SAMLResponse?: string | undefined
              RelayState?: string | undefined
              SigAlg?: string | undefined
              Signature?: string | undefined
            }
          }
          output: {}
          outputFormat: string
          status: 302
        }
      }
    } & {
      '/saml/slo': {
        $post: {
          input: {
            form: {
              SAMLRequest?: string | undefined
              SAMLResponse?: string | undefined
              RelayState?: string | undefined
            }
          }
          output: Response
          outputFormat: 'json'
          status: StatusCode
        }
      }
    } & {
      '/saml/acs': {
        $post:
          | {
              input: { form: { SAMLResponse: string; RelayState?: string | undefined } }
              output: {}
              outputFormat: string
              status: 302
            }
          | {
              input: { form: { SAMLResponse: string; RelayState?: string | undefined } }
              output: {}
              outputFormat: string
              status: 400
            }
      }
    } & {
      '/saml/metadata': {
        $get: { input: {}; output: Response; outputFormat: 'json'; status: StatusCode }
      }
    } & {
      '/service-providers': {
        $get:
          | {
              input: { query: { search?: string | undefined; enabled?: string | undefined } }
              output: {
                id: string
                entityId: string
                name: string
                enabled: boolean
                description?: string | undefined
                assertionConsumerServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                      location: string
                      index?: number | undefined
                      isDefault?: boolean | undefined
                    }[]
                  | undefined
                singleLogoutServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                      location: string
                      responseLocation?: string | undefined
                    }[]
                  | undefined
                nameIdFormat?:
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
                  | undefined
                signAssertions?: boolean | undefined
                signResponses?: boolean | undefined
                encryptAssertions?: boolean | undefined
                signingCertificate?: string | undefined
                encryptionCertificate?: string | undefined
                wantAuthnRequestsSigned?: boolean | undefined
                defaultRelayState?: string | undefined
                sessionDuration?: number | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { query: { search?: string | undefined; enabled?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
      }
    } & {
      '/service-providers': {
        $post:
          | {
              input: {
                json:
                  | string
                  | {
                      entityId: string
                      name: string
                      description?: string | undefined
                      metadataUrl?: string | undefined
                      assertionConsumerServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                            location: string
                            index?: number | undefined
                            isDefault?: boolean | undefined
                          }[]
                        | undefined
                      singleLogoutServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                            location: string
                            responseLocation?: string | undefined
                          }[]
                        | undefined
                      nameIdFormat?: string | undefined
                      signAssertions?: boolean | undefined
                      encryptAssertions?: boolean | undefined
                      signingCertificate?: string | undefined
                      encryptionCertificate?: string | undefined
                    }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {
                json:
                  | string
                  | {
                      entityId: string
                      name: string
                      description?: string | undefined
                      metadataUrl?: string | undefined
                      assertionConsumerServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                            location: string
                            index?: number | undefined
                            isDefault?: boolean | undefined
                          }[]
                        | undefined
                      singleLogoutServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                            location: string
                            responseLocation?: string | undefined
                          }[]
                        | undefined
                      nameIdFormat?: string | undefined
                      signAssertions?: boolean | undefined
                      encryptAssertions?: boolean | undefined
                      signingCertificate?: string | undefined
                      encryptionCertificate?: string | undefined
                    }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 400
            }
          | {
              input: {
                json:
                  | string
                  | {
                      entityId: string
                      name: string
                      description?: string | undefined
                      metadataUrl?: string | undefined
                      assertionConsumerServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                            location: string
                            index?: number | undefined
                            isDefault?: boolean | undefined
                          }[]
                        | undefined
                      singleLogoutServices?:
                        | {
                            binding:
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                              | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                            location: string
                            responseLocation?: string | undefined
                          }[]
                        | undefined
                      nameIdFormat?: string | undefined
                      signAssertions?: boolean | undefined
                      encryptAssertions?: boolean | undefined
                      signingCertificate?: string | undefined
                      encryptionCertificate?: string | undefined
                    }
              }
              output: {
                id: string
                entityId: string
                name: string
                enabled: boolean
                description?: string | undefined
                assertionConsumerServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                      location: string
                      index?: number | undefined
                      isDefault?: boolean | undefined
                    }[]
                  | undefined
                singleLogoutServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                      location: string
                      responseLocation?: string | undefined
                    }[]
                  | undefined
                nameIdFormat?:
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
                  | undefined
                signAssertions?: boolean | undefined
                signResponses?: boolean | undefined
                encryptAssertions?: boolean | undefined
                signingCertificate?: string | undefined
                encryptionCertificate?: string | undefined
                wantAuthnRequestsSigned?: boolean | undefined
                defaultRelayState?: string | undefined
                sessionDuration?: number | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 201
            }
      }
    } & {
      '/service-providers/:spId': {
        $get:
          | {
              input: { param: { spId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { spId: string } }
              output: {
                id: string
                entityId: string
                name: string
                enabled: boolean
                description?: string | undefined
                assertionConsumerServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                      location: string
                      index?: number | undefined
                      isDefault?: boolean | undefined
                    }[]
                  | undefined
                singleLogoutServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                      location: string
                      responseLocation?: string | undefined
                    }[]
                  | undefined
                nameIdFormat?:
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
                  | undefined
                signAssertions?: boolean | undefined
                signResponses?: boolean | undefined
                encryptAssertions?: boolean | undefined
                signingCertificate?: string | undefined
                encryptionCertificate?: string | undefined
                wantAuthnRequestsSigned?: boolean | undefined
                defaultRelayState?: string | undefined
                sessionDuration?: number | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
          | {
              input: { param: { spId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 404
            }
      }
    } & {
      '/service-providers/:spId': {
        $put:
          | {
              input: { param: { spId: string } } & {
                json: {
                  name?: string | undefined
                  description?: string | undefined
                  enabled?: boolean | undefined
                  assertionConsumerServices?:
                    | {
                        binding:
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                        location: string
                        index?: number | undefined
                        isDefault?: boolean | undefined
                      }[]
                    | undefined
                  singleLogoutServices?:
                    | {
                        binding:
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                        location: string
                        responseLocation?: string | undefined
                      }[]
                    | undefined
                  nameIdFormat?: string | undefined
                  signAssertions?: boolean | undefined
                  signResponses?: boolean | undefined
                  encryptAssertions?: boolean | undefined
                  wantAuthnRequestsSigned?: boolean | undefined
                  defaultRelayState?: string | undefined
                  sessionDuration?: number | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { spId: string } } & {
                json: {
                  name?: string | undefined
                  description?: string | undefined
                  enabled?: boolean | undefined
                  assertionConsumerServices?:
                    | {
                        binding:
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                        location: string
                        index?: number | undefined
                        isDefault?: boolean | undefined
                      }[]
                    | undefined
                  singleLogoutServices?:
                    | {
                        binding:
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                          | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                        location: string
                        responseLocation?: string | undefined
                      }[]
                    | undefined
                  nameIdFormat?: string | undefined
                  signAssertions?: boolean | undefined
                  signResponses?: boolean | undefined
                  encryptAssertions?: boolean | undefined
                  wantAuthnRequestsSigned?: boolean | undefined
                  defaultRelayState?: string | undefined
                  sessionDuration?: number | undefined
                }
              }
              output: {
                id: string
                entityId: string
                name: string
                enabled: boolean
                description?: string | undefined
                assertionConsumerServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                      location: string
                      index?: number | undefined
                      isDefault?: boolean | undefined
                    }[]
                  | undefined
                singleLogoutServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                      location: string
                      responseLocation?: string | undefined
                    }[]
                  | undefined
                nameIdFormat?:
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
                  | undefined
                signAssertions?: boolean | undefined
                signResponses?: boolean | undefined
                encryptAssertions?: boolean | undefined
                signingCertificate?: string | undefined
                encryptionCertificate?: string | undefined
                wantAuthnRequestsSigned?: boolean | undefined
                defaultRelayState?: string | undefined
                sessionDuration?: number | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/service-providers/:spId': {
        $delete:
          | {
              input: { param: { spId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { spId: string } }; output: {}; outputFormat: string; status: 204 }
      }
    } & {
      '/service-providers/:spId/metadata': {
        $get:
          | {
              input: { param: { spId: string } }
              output: Response
              outputFormat: 'json'
              status: StatusCode
            }
          | {
              input: { param: { spId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
      }
    } & {
      '/service-providers/:spId/metadata': {
        $put:
          | {
              input: { param: { spId: string } } & { form: string | { file?: File | undefined } }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: { param: { spId: string } } & { form: string | { file?: File | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { spId: string } } & { form: string | { file?: File | undefined } }
              output: {
                id: string
                entityId: string
                name: string
                enabled: boolean
                description?: string | undefined
                assertionConsumerServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Artifact'
                      location: string
                      index?: number | undefined
                      isDefault?: boolean | undefined
                    }[]
                  | undefined
                singleLogoutServices?:
                  | {
                      binding:
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-POST'
                        | 'urn:oasis:names:tc:SAML:2.0:bindings:HTTP-Redirect'
                      location: string
                      responseLocation?: string | undefined
                    }[]
                  | undefined
                nameIdFormat?:
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:emailAddress'
                  | 'urn:oasis:names:tc:SAML:1.1:nameid-format:unspecified'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:persistent'
                  | 'urn:oasis:names:tc:SAML:2.0:nameid-format:transient'
                  | undefined
                signAssertions?: boolean | undefined
                signResponses?: boolean | undefined
                encryptAssertions?: boolean | undefined
                signingCertificate?: string | undefined
                encryptionCertificate?: string | undefined
                wantAuthnRequestsSigned?: boolean | undefined
                defaultRelayState?: string | undefined
                sessionDuration?: number | undefined
                createdAt?: string | undefined
                updatedAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/service-providers/:spId/attributes': {
        $get:
          | {
              input: { param: { spId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { spId: string } }
              output: {
                sourceAttribute: string
                samlAttribute: string
                id?: string | undefined
                samlAttributeNameFormat?:
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic'
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified'
                  | undefined
                friendlyName?: string | undefined
                required?: boolean | undefined
                transform?: string | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/service-providers/:spId/attributes': {
        $put:
          | {
              input: { param: { spId: string } } & {
                json: {
                  sourceAttribute: string
                  samlAttribute: string
                  id?: string | undefined
                  samlAttributeNameFormat?:
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic'
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified'
                    | undefined
                  friendlyName?: string | undefined
                  required?: boolean | undefined
                  transform?: string | undefined
                }[]
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { spId: string } } & {
                json: {
                  sourceAttribute: string
                  samlAttribute: string
                  id?: string | undefined
                  samlAttributeNameFormat?:
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic'
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
                    | 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified'
                    | undefined
                  friendlyName?: string | undefined
                  required?: boolean | undefined
                  transform?: string | undefined
                }[]
              }
              output: {
                sourceAttribute: string
                samlAttribute: string
                id?: string | undefined
                samlAttributeNameFormat?:
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:basic'
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:uri'
                  | 'urn:oasis:names:tc:SAML:2.0:attrname-format:unspecified'
                  | undefined
                friendlyName?: string | undefined
                required?: boolean | undefined
                transform?: string | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/attributes': {
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
                name: string
                type: 'string' | 'boolean' | 'integer' | 'string[]' | 'datetime'
                description?: string | undefined
                source?: 'custom' | 'user' | 'group' | 'computed' | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/certificates': {
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
                purpose: 'signing' | 'encryption' | 'both'
                isActive: boolean
                notBefore: string
                notAfter: string
                subject?: string | undefined
                issuer?: string | undefined
                serialNumber?: string | undefined
                fingerprint?: string | undefined
                fingerprintSha256?: string | undefined
                publicKey?: string | undefined
                createdAt?: string | undefined
              }[]
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/certificates': {
        $post:
          | {
              input: {
                form: {
                  certificate: File
                  privateKey: File
                  passphrase?: string | undefined
                  purpose?: 'signing' | 'encryption' | 'both' | undefined
                }
              }
              output: {}
              outputFormat: string
              status: 400
            }
          | {
              input: {
                form: {
                  certificate: File
                  privateKey: File
                  passphrase?: string | undefined
                  purpose?: 'signing' | 'encryption' | 'both' | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {
                form: {
                  certificate: File
                  privateKey: File
                  passphrase?: string | undefined
                  purpose?: 'signing' | 'encryption' | 'both' | undefined
                }
              }
              output: {
                id: string
                purpose: 'signing' | 'encryption' | 'both'
                isActive: boolean
                notBefore: string
                notAfter: string
                subject?: string | undefined
                issuer?: string | undefined
                serialNumber?: string | undefined
                fingerprint?: string | undefined
                fingerprintSha256?: string | undefined
                publicKey?: string | undefined
                createdAt?: string | undefined
              }
              outputFormat: 'json'
              status: 201
            }
      }
    } & {
      '/certificates/:certId': {
        $delete:
          | {
              input: { param: { certId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | { input: { param: { certId: string } }; output: {}; outputFormat: string; status: 204 }
          | { input: { param: { certId: string } }; output: {}; outputFormat: string; status: 409 }
      }
    } & {
      '/certificates/:certId/activate': {
        $post:
          | {
              input: { param: { certId: string } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { param: { certId: string } }
              output: {
                id: string
                purpose: 'signing' | 'encryption' | 'both'
                isActive: boolean
                notBefore: string
                notAfter: string
                subject?: string | undefined
                issuer?: string | undefined
                serialNumber?: string | undefined
                fingerprint?: string | undefined
                fingerprintSha256?: string | undefined
                publicKey?: string | undefined
                createdAt?: string | undefined
              }
              outputFormat: 'json'
              status: 200
            }
      }
    } & {
      '/sessions': {
        $get:
          | {
              input: { query: { userId?: string | undefined } }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: { query: { userId?: string | undefined } }
              output: {
                sessionId: string
                userId: string
                createdAt: string
                userName?: string | undefined
                serviceProviders?:
                  | {
                      spId?: string | undefined
                      spName?: string | undefined
                      sessionIndex?: string | undefined
                      authenticatedAt?: string | undefined
                    }[]
                  | undefined
                ipAddress?: string | undefined
                userAgent?: string | undefined
                expiresAt?: string | undefined
                lastActivityAt?: string | undefined
              }[]
              outputFormat: 'json'
              status: 200
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
          | {
              input: { param: { sessionId: string } }
              output: {}
              outputFormat: string
              status: 204
            }
      }
    } & {
      '/audit-logs': {
        $get:
          | {
              input: {
                query: {
                  from?: string | undefined
                  to?: string | undefined
                  spId?: string | undefined
                  userId?: string | undefined
                  eventType?:
                    | 'sso_success'
                    | 'sso_failure'
                    | 'slo_success'
                    | 'slo_failure'
                    | undefined
                  page?: number | undefined
                  limit?: number | undefined
                }
              }
              output: { code: string; message: string }
              outputFormat: 'json'
              status: 401
            }
          | {
              input: {
                query: {
                  from?: string | undefined
                  to?: string | undefined
                  spId?: string | undefined
                  userId?: string | undefined
                  eventType?:
                    | 'sso_success'
                    | 'sso_failure'
                    | 'slo_success'
                    | 'slo_failure'
                    | undefined
                  page?: number | undefined
                  limit?: number | undefined
                }
              }
              output: {
                data: {
                  id: string
                  eventType:
                    | 'sso_success'
                    | 'sso_failure'
                    | 'slo_success'
                    | 'slo_failure'
                    | 'sp_created'
                    | 'sp_updated'
                    | 'sp_deleted'
                    | 'certificate_uploaded'
                    | 'certificate_activated'
                  timestamp: string
                  userId?: string | undefined
                  userName?: string | undefined
                  spId?: string | undefined
                  spName?: string | undefined
                  ipAddress?: string | undefined
                  userAgent?: string | undefined
                  details?: { [x: string]: JSONValue } | undefined
                  errorMessage?: string | undefined
                }[]
                pagination: { page: number; limit: number; total: number; totalPages: number }
              }
              outputFormat: 'json'
              status: 200
            }
      }
    }
  >,
  '/'
>
export default routes
