declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/2010-04-01/Accounts.json': {
      $post: {
        input: { json: { FriendlyName?: string | undefined } } & {
          form: { FriendlyName?: string | undefined }
        }
        output: {
          auth_token?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          owner_account_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'active' | 'suspended' | 'closed' | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          type?: 'Trial' | 'Full' | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: {
          query: {
            FriendlyName?: string | undefined
            Status?: 'active' | 'suspended' | 'closed' | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          accounts?:
            | {
                auth_token?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                owner_account_sid?: (string | null) | undefined
                sid?: (string | null) | undefined
                status?: 'active' | 'suspended' | 'closed' | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                type?: 'Trial' | 'Full' | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:Sid.json': {
      $get: {
        input: { param: { Sid: string } }
        output: {
          auth_token?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          owner_account_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'active' | 'suspended' | 'closed' | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          type?: 'Trial' | 'Full' | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { Sid: string } } & {
          json: {
            FriendlyName?: string | undefined
            Status?: 'active' | 'suspended' | 'closed' | undefined
          }
        } & {
          form: {
            FriendlyName?: string | undefined
            Status?: 'active' | 'suspended' | 'closed' | undefined
          }
        }
        output: {
          auth_token?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          owner_account_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'active' | 'suspended' | 'closed' | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          type?: 'Trial' | 'Full' | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Addresses.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            CustomerName: string
            Street: string
            City: string
            Region: string
            PostalCode: string
            IsoCountry: string
            FriendlyName?: string | undefined
            EmergencyEnabled?: boolean | undefined
            AutoCorrectAddress?: boolean | undefined
            StreetSecondary?: string | undefined
          }
        } & {
          form: {
            CustomerName: string
            Street: string
            City: string
            Region: string
            PostalCode: string
            IsoCountry: string
            FriendlyName?: string | undefined
            EmergencyEnabled?: boolean | undefined
            AutoCorrectAddress?: boolean | undefined
            StreetSecondary?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          city?: (string | null) | undefined
          customer_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          iso_country?: (string | null) | undefined
          postal_code?: (string | null) | undefined
          region?: (string | null) | undefined
          sid?: (string | null) | undefined
          street?: (string | null) | undefined
          uri?: (string | null) | undefined
          emergency_enabled?: (boolean | null) | undefined
          validated?: (boolean | null) | undefined
          verified?: (boolean | null) | undefined
          street_secondary?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            CustomerName?: string | undefined
            FriendlyName?: string | undefined
            EmergencyEnabled?: boolean | undefined
            IsoCountry?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          addresses?:
            | {
                account_sid?: (string | null) | undefined
                city?: (string | null) | undefined
                customer_name?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                region?: (string | null) | undefined
                sid?: (string | null) | undefined
                street?: (string | null) | undefined
                uri?: (string | null) | undefined
                emergency_enabled?: (boolean | null) | undefined
                validated?: (boolean | null) | undefined
                verified?: (boolean | null) | undefined
                street_secondary?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Addresses/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          city?: (string | null) | undefined
          customer_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          iso_country?: (string | null) | undefined
          postal_code?: (string | null) | undefined
          region?: (string | null) | undefined
          sid?: (string | null) | undefined
          street?: (string | null) | undefined
          uri?: (string | null) | undefined
          emergency_enabled?: (boolean | null) | undefined
          validated?: (boolean | null) | undefined
          verified?: (boolean | null) | undefined
          street_secondary?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            FriendlyName?: string | undefined
            CustomerName?: string | undefined
            Street?: string | undefined
            City?: string | undefined
            Region?: string | undefined
            PostalCode?: string | undefined
            EmergencyEnabled?: boolean | undefined
            AutoCorrectAddress?: boolean | undefined
            StreetSecondary?: string | undefined
          }
        } & {
          form: {
            FriendlyName?: string | undefined
            CustomerName?: string | undefined
            Street?: string | undefined
            City?: string | undefined
            Region?: string | undefined
            PostalCode?: string | undefined
            EmergencyEnabled?: boolean | undefined
            AutoCorrectAddress?: boolean | undefined
            StreetSecondary?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          city?: (string | null) | undefined
          customer_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          iso_country?: (string | null) | undefined
          postal_code?: (string | null) | undefined
          region?: (string | null) | undefined
          sid?: (string | null) | undefined
          street?: (string | null) | undefined
          uri?: (string | null) | undefined
          emergency_enabled?: (boolean | null) | undefined
          validated?: (boolean | null) | undefined
          verified?: (boolean | null) | undefined
          street_secondary?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Applications.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            ApiVersion?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceCallerIdLookup?: boolean | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsStatusCallback?: string | undefined
            MessageStatusCallback?: string | undefined
            FriendlyName?: string | undefined
            PublicApplicationConnectEnabled?: boolean | undefined
          }
        } & {
          form: {
            ApiVersion?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceCallerIdLookup?: boolean | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsStatusCallback?: string | undefined
            MessageStatusCallback?: string | undefined
            FriendlyName?: string | undefined
            PublicApplicationConnectEnabled?: boolean | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          message_status_callback?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_status_callback?: (string | null) | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          uri?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          public_application_connect_enabled?: (boolean | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            FriendlyName?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          applications?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                message_status_callback?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_status_callback?: (string | null) | undefined
                sms_url?: (string | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                uri?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_url?: (string | null) | undefined
                public_application_connect_enabled?: (boolean | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Applications/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          message_status_callback?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_status_callback?: (string | null) | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          uri?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          public_application_connect_enabled?: (boolean | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            FriendlyName?: string | undefined
            ApiVersion?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceCallerIdLookup?: boolean | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsStatusCallback?: string | undefined
            MessageStatusCallback?: string | undefined
            PublicApplicationConnectEnabled?: boolean | undefined
          }
        } & {
          form: {
            FriendlyName?: string | undefined
            ApiVersion?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceCallerIdLookup?: boolean | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsStatusCallback?: string | undefined
            MessageStatusCallback?: string | undefined
            PublicApplicationConnectEnabled?: boolean | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          message_status_callback?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_status_callback?: (string | null) | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          uri?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          public_application_connect_enabled?: (boolean | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps/:ConnectAppSid.json': {
      $get: {
        input: { param: { AccountSid: string; ConnectAppSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          connect_app_company_name?: (string | null) | undefined
          connect_app_description?: (string | null) | undefined
          connect_app_friendly_name?: (string | null) | undefined
          connect_app_homepage_url?: (string | null) | undefined
          connect_app_sid?: (string | null) | undefined
          permissions?: (('get-all' | 'post-all')[] | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AuthorizedConnectApps.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          authorized_connect_apps?:
            | {
                account_sid?: (string | null) | undefined
                connect_app_company_name?: (string | null) | undefined
                connect_app_description?: (string | null) | undefined
                connect_app_friendly_name?: (string | null) | undefined
                connect_app_homepage_url?: (string | null) | undefined
                connect_app_sid?: (string | null) | undefined
                permissions?: (('get-all' | 'post-all')[] | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          countries?:
            | {
                country_code?: (string | null) | undefined
                country?: (string | null) | undefined
                uri?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } }
        output: {
          country_code?: (string | null) | undefined
          country?: (string | null) | undefined
          uri?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Local.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/MachineToMachine.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Mobile.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/National.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/SharedCost.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/TollFree.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/AvailablePhoneNumbers/:CountryCode/Voip.json': {
      $get: {
        input: { param: { AccountSid: string; CountryCode: string } } & {
          query: {
            AreaCode?: number | undefined
            Contains?: string | undefined
            SmsEnabled?: boolean | undefined
            MmsEnabled?: boolean | undefined
            VoiceEnabled?: boolean | undefined
            ExcludeAllAddressRequired?: boolean | undefined
            ExcludeLocalAddressRequired?: boolean | undefined
            ExcludeForeignAddressRequired?: boolean | undefined
            Beta?: boolean | undefined
            NearNumber?: string | undefined
            NearLatLong?: string | undefined
            Distance?: number | undefined
            InPostalCode?: string | undefined
            InRegion?: string | undefined
            InRateCenter?: string | undefined
            InLata?: string | undefined
            InLocality?: string | undefined
            FaxEnabled?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          available_phone_numbers?:
            | {
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                lata?: (string | null) | undefined
                locality?: (string | null) | undefined
                rate_center?: (string | null) | undefined
                latitude?: (number | null) | undefined
                longitude?: (number | null) | undefined
                region?: (string | null) | undefined
                postal_code?: (string | null) | undefined
                iso_country?: (string | null) | undefined
                address_requirements?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Balance.json': {
      $get: {
        input: { param: { AccountSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          balance?: (string | null) | undefined
          currency?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            To: string
            From: string
            Method?: 'GET' | 'POST' | undefined
            FallbackUrl?: string | undefined
            FallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackEvent?: string[] | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            SendDigits?: string | undefined
            Timeout?: number | undefined
            Record?: boolean | undefined
            RecordingChannels?: string | undefined
            RecordingStatusCallback?: string | undefined
            RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipAuthUsername?: string | undefined
            SipAuthPassword?: string | undefined
            MachineDetection?: string | undefined
            MachineDetectionTimeout?: number | undefined
            RecordingStatusCallbackEvent?: string[] | undefined
            Trim?: string | undefined
            CallerId?: string | undefined
            MachineDetectionSpeechThreshold?: number | undefined
            MachineDetectionSpeechEndThreshold?: number | undefined
            MachineDetectionSilenceTimeout?: number | undefined
            AsyncAmd?: string | undefined
            AsyncAmdStatusCallback?: string | undefined
            AsyncAmdStatusCallbackMethod?: 'GET' | 'POST' | undefined
            Byoc?: string | undefined
            CallReason?: string | undefined
            CallToken?: string | undefined
            RecordingTrack?: string | undefined
            TimeLimit?: number | undefined
            Url?: string | undefined
            Twiml?: string | undefined
            ApplicationSid?: string | undefined
          }
        } & {
          form: {
            To: string
            From: string
            Method?: 'GET' | 'POST' | undefined
            FallbackUrl?: string | undefined
            FallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackEvent?: string[] | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            SendDigits?: string | undefined
            Timeout?: number | undefined
            Record?: boolean | undefined
            RecordingChannels?: string | undefined
            RecordingStatusCallback?: string | undefined
            RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipAuthUsername?: string | undefined
            SipAuthPassword?: string | undefined
            MachineDetection?: string | undefined
            MachineDetectionTimeout?: number | undefined
            RecordingStatusCallbackEvent?: string[] | undefined
            Trim?: string | undefined
            CallerId?: string | undefined
            MachineDetectionSpeechThreshold?: number | undefined
            MachineDetectionSpeechEndThreshold?: number | undefined
            MachineDetectionSilenceTimeout?: number | undefined
            AsyncAmd?: string | undefined
            AsyncAmdStatusCallback?: string | undefined
            AsyncAmdStatusCallbackMethod?: 'GET' | 'POST' | undefined
            Byoc?: string | undefined
            CallReason?: string | undefined
            CallToken?: string | undefined
            RecordingTrack?: string | undefined
            TimeLimit?: number | undefined
            Url?: string | undefined
            Twiml?: string | undefined
            ApplicationSid?: string | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          parent_call_sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          to?: (string | null) | undefined
          to_formatted?: (string | null) | undefined
          from?: (string | null) | undefined
          from_formatted?: (string | null) | undefined
          phone_number_sid?: (string | null) | undefined
          status?:
            | 'queued'
            | 'ringing'
            | 'in-progress'
            | 'completed'
            | 'busy'
            | 'failed'
            | 'no-answer'
            | 'canceled'
            | undefined
          start_time?: (string | null) | undefined
          end_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          direction?: (string | null) | undefined
          answered_by?: (string | null) | undefined
          api_version?: (string | null) | undefined
          forwarded_from?: (string | null) | undefined
          group_sid?: (string | null) | undefined
          caller_name?: (string | null) | undefined
          queue_time?: (string | null) | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            To?: string | undefined
            From?: string | undefined
            ParentCallSid?: string | undefined
            Status?:
              | 'queued'
              | 'ringing'
              | 'in-progress'
              | 'completed'
              | 'busy'
              | 'failed'
              | 'no-answer'
              | 'canceled'
              | undefined
            StartTime?: string | undefined
            'StartTime<'?: string | undefined
            'StartTime>'?: string | undefined
            EndTime?: string | undefined
            'EndTime<'?: string | undefined
            'EndTime>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          calls?:
            | {
                sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                parent_call_sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                to?: (string | null) | undefined
                to_formatted?: (string | null) | undefined
                from?: (string | null) | undefined
                from_formatted?: (string | null) | undefined
                phone_number_sid?: (string | null) | undefined
                status?:
                  | 'queued'
                  | 'ringing'
                  | 'in-progress'
                  | 'completed'
                  | 'busy'
                  | 'failed'
                  | 'no-answer'
                  | 'canceled'
                  | undefined
                start_time?: (string | null) | undefined
                end_time?: (string | null) | undefined
                duration?: (string | null) | undefined
                price?: (string | null) | undefined
                price_unit?: (string | null) | undefined
                direction?: (string | null) | undefined
                answered_by?: (string | null) | undefined
                api_version?: (string | null) | undefined
                forwarded_from?: (string | null) | undefined
                group_sid?: (string | null) | undefined
                caller_name?: (string | null) | undefined
                queue_time?: (string | null) | undefined
                trunk_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          parent_call_sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          to?: (string | null) | undefined
          to_formatted?: (string | null) | undefined
          from?: (string | null) | undefined
          from_formatted?: (string | null) | undefined
          phone_number_sid?: (string | null) | undefined
          status?:
            | 'queued'
            | 'ringing'
            | 'in-progress'
            | 'completed'
            | 'busy'
            | 'failed'
            | 'no-answer'
            | 'canceled'
            | undefined
          start_time?: (string | null) | undefined
          end_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          direction?: (string | null) | undefined
          answered_by?: (string | null) | undefined
          api_version?: (string | null) | undefined
          forwarded_from?: (string | null) | undefined
          group_sid?: (string | null) | undefined
          caller_name?: (string | null) | undefined
          queue_time?: (string | null) | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            Url?: string | undefined
            Method?: 'GET' | 'POST' | undefined
            Status?: 'canceled' | 'completed' | undefined
            FallbackUrl?: string | undefined
            FallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            Twiml?: string | undefined
            TimeLimit?: number | undefined
          }
        } & {
          form: {
            Url?: string | undefined
            Method?: 'GET' | 'POST' | undefined
            Status?: 'canceled' | 'completed' | undefined
            FallbackUrl?: string | undefined
            FallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            Twiml?: string | undefined
            TimeLimit?: number | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          parent_call_sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          to?: (string | null) | undefined
          to_formatted?: (string | null) | undefined
          from?: (string | null) | undefined
          from_formatted?: (string | null) | undefined
          phone_number_sid?: (string | null) | undefined
          status?:
            | 'queued'
            | 'ringing'
            | 'in-progress'
            | 'completed'
            | 'busy'
            | 'failed'
            | 'no-answer'
            | 'canceled'
            | undefined
          start_time?: (string | null) | undefined
          end_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          direction?: (string | null) | undefined
          answered_by?: (string | null) | undefined
          api_version?: (string | null) | undefined
          forwarded_from?: (string | null) | undefined
          group_sid?: (string | null) | undefined
          caller_name?: (string | null) | undefined
          queue_time?: (string | null) | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Events.json': {
      $get: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          events?:
            | {
                request?: ({ [x: string]: unknown } | null) | undefined
                response?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          error_code?: (string | null) | undefined
          log?: (string | null) | undefined
          message_date?: (string | null) | undefined
          message_text?: (string | null) | undefined
          more_info?: (string | null) | undefined
          request_method?: 'GET' | 'POST' | undefined
          request_url?: (string | null) | undefined
          request_variables?: (string | null) | undefined
          response_body?: (string | null) | undefined
          response_headers?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Notifications.json': {
      $get: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          query: {
            Log?: number | undefined
            MessageDate?: string | undefined
            'MessageDate<'?: string | undefined
            'MessageDate>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          notifications?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                error_code?: (string | null) | undefined
                log?: (string | null) | undefined
                message_date?: (string | null) | undefined
                message_text?: (string | null) | undefined
                more_info?: (string | null) | undefined
                request_method?: 'GET' | 'POST' | undefined
                request_url?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings.json': {
      $post:
        | {
            input: { param: { AccountSid: string; CallSid: string } } & {
              json: {
                RecordingStatusCallbackEvent?: string[] | undefined
                RecordingStatusCallback?: string | undefined
                RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
                Trim?: string | undefined
                RecordingChannels?: string | undefined
                RecordingTrack?: string | undefined
              }
            } & {
              form: {
                RecordingStatusCallbackEvent?: string[] | undefined
                RecordingStatusCallback?: string | undefined
                RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
                Trim?: string | undefined
                RecordingChannels?: string | undefined
                RecordingTrack?: string | undefined
              }
            }
            output: {
              account_sid?: (string | null) | undefined
              api_version?: (string | null) | undefined
              call_sid?: (string | null) | undefined
              conference_sid?: (string | null) | undefined
              date_created?: (string | null) | undefined
              date_updated?: (string | null) | undefined
              start_time?: (string | null) | undefined
              duration?: (string | null) | undefined
              sid?: (string | null) | undefined
              price?: (number | null) | undefined
              uri?: (string | null) | undefined
              encryption_details?: ({ [x: string]: unknown } | null) | undefined
              price_unit?: (string | null) | undefined
              status?:
                | 'in-progress'
                | 'paused'
                | 'stopped'
                | 'processing'
                | 'completed'
                | 'absent'
                | undefined
              channels?: number | undefined
              source?:
                | 'DialVerb'
                | 'Conference'
                | 'OutboundAPI'
                | 'Trunking'
                | 'RecordVerb'
                | 'StartCallRecordingAPI'
                | 'StartConferenceRecordingAPI'
                | undefined
              error_code?: (number | null) | undefined
              track?: (string | null) | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { AccountSid: string; CallSid: string } } & {
              json: {
                RecordingStatusCallbackEvent?: string[] | undefined
                RecordingStatusCallback?: string | undefined
                RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
                Trim?: string | undefined
                RecordingChannels?: string | undefined
                RecordingTrack?: string | undefined
              }
            } & {
              form: {
                RecordingStatusCallbackEvent?: string[] | undefined
                RecordingStatusCallback?: string | undefined
                RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
                Trim?: string | undefined
                RecordingChannels?: string | undefined
                RecordingTrack?: string | undefined
              }
            }
            output: {
              account_sid?: (string | null) | undefined
              api_version?: (string | null) | undefined
              call_sid?: (string | null) | undefined
              conference_sid?: (string | null) | undefined
              date_created?: (string | null) | undefined
              date_updated?: (string | null) | undefined
              start_time?: (string | null) | undefined
              duration?: (string | null) | undefined
              sid?: (string | null) | undefined
              price?: (number | null) | undefined
              uri?: (string | null) | undefined
              encryption_details?: ({ [x: string]: unknown } | null) | undefined
              price_unit?: (string | null) | undefined
              status?:
                | 'in-progress'
                | 'paused'
                | 'stopped'
                | 'processing'
                | 'completed'
                | 'absent'
                | undefined
              channels?: number | undefined
              source?:
                | 'DialVerb'
                | 'Conference'
                | 'OutboundAPI'
                | 'Trunking'
                | 'RecordVerb'
                | 'StartCallRecordingAPI'
                | 'StartConferenceRecordingAPI'
                | undefined
              error_code?: (number | null) | undefined
              track?: (string | null) | undefined
            }
            outputFormat: 'json'
            status: 201
          }
      $get: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          query: {
            DateCreated?: string | undefined
            'DateCreated<'?: string | undefined
            'DateCreated>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          recordings?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                conference_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                start_time?: (string | null) | undefined
                duration?: (string | null) | undefined
                sid?: (string | null) | undefined
                price?: (number | null) | undefined
                uri?: (string | null) | undefined
                encryption_details?: ({ [x: string]: unknown } | null) | undefined
                price_unit?: (string | null) | undefined
                status?:
                  | 'in-progress'
                  | 'paused'
                  | 'stopped'
                  | 'processing'
                  | 'completed'
                  | 'absent'
                  | undefined
                channels?: number | undefined
                source?:
                  | 'DialVerb'
                  | 'Conference'
                  | 'OutboundAPI'
                  | 'Trunking'
                  | 'RecordVerb'
                  | 'StartCallRecordingAPI'
                  | 'StartConferenceRecordingAPI'
                  | undefined
                error_code?: (number | null) | undefined
                track?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Recordings/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } } & {
          json: {
            Status: 'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'
            PauseBehavior?: string | undefined
          }
        } & {
          form: {
            Status: 'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'
            PauseBehavior?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          start_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          sid?: (string | null) | undefined
          price?: (number | null) | undefined
          uri?: (string | null) | undefined
          encryption_details?: ({ [x: string]: unknown } | null) | undefined
          price_unit?: (string | null) | undefined
          status?:
            | 'in-progress'
            | 'paused'
            | 'stopped'
            | 'processing'
            | 'completed'
            | 'absent'
            | undefined
          channels?: number | undefined
          source?:
            | 'DialVerb'
            | 'Conference'
            | 'OutboundAPI'
            | 'Trunking'
            | 'RecordVerb'
            | 'StartCallRecordingAPI'
            | 'StartConferenceRecordingAPI'
            | undefined
          error_code?: (number | null) | undefined
          track?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $get: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          start_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          sid?: (string | null) | undefined
          price?: (number | null) | undefined
          uri?: (string | null) | undefined
          encryption_details?: ({ [x: string]: unknown } | null) | undefined
          price_unit?: (string | null) | undefined
          status?:
            | 'in-progress'
            | 'paused'
            | 'stopped'
            | 'processing'
            | 'completed'
            | 'absent'
            | undefined
          channels?: number | undefined
          source?:
            | 'DialVerb'
            | 'Conference'
            | 'OutboundAPI'
            | 'Trunking'
            | 'RecordVerb'
            | 'StartCallRecordingAPI'
            | 'StartConferenceRecordingAPI'
            | undefined
          error_code?: (number | null) | undefined
          track?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          api_version?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          region?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'init' | 'in-progress' | 'completed' | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          reason_conference_ended?:
            | 'conference-ended-via-api'
            | 'participant-with-end-conference-on-exit-left'
            | 'participant-with-end-conference-on-exit-kicked'
            | 'last-participant-kicked'
            | 'last-participant-left'
            | undefined
          call_sid_ending_conference?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            Status?: 'completed' | undefined
            AnnounceUrl?: string | undefined
            AnnounceMethod?: 'GET' | 'POST' | undefined
          }
        } & {
          form: {
            Status?: 'completed' | undefined
            AnnounceUrl?: string | undefined
            AnnounceMethod?: 'GET' | 'POST' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          api_version?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          region?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'init' | 'in-progress' | 'completed' | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          reason_conference_ended?:
            | 'conference-ended-via-api'
            | 'participant-with-end-conference-on-exit-left'
            | 'participant-with-end-conference-on-exit-kicked'
            | 'last-participant-kicked'
            | 'last-participant-left'
            | undefined
          call_sid_ending_conference?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            DateCreated?: string | undefined
            'DateCreated<'?: string | undefined
            'DateCreated>'?: string | undefined
            DateUpdated?: string | undefined
            'DateUpdated<'?: string | undefined
            'DateUpdated>'?: string | undefined
            FriendlyName?: string | undefined
            Status?: 'init' | 'in-progress' | 'completed' | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          conferences?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                api_version?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                region?: (string | null) | undefined
                sid?: (string | null) | undefined
                status?: 'init' | 'in-progress' | 'completed' | undefined
                uri?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                reason_conference_ended?:
                  | 'conference-ended-via-api'
                  | 'participant-with-end-conference-on-exit-left'
                  | 'participant-with-end-conference-on-exit-kicked'
                  | 'last-participant-kicked'
                  | 'last-participant-left'
                  | undefined
                call_sid_ending_conference?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings.json': {
      $get: {
        input: { param: { AccountSid: string; ConferenceSid: string } } & {
          query: {
            DateCreated?: string | undefined
            'DateCreated<'?: string | undefined
            'DateCreated>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          recordings?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                conference_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                start_time?: (string | null) | undefined
                duration?: (string | null) | undefined
                sid?: (string | null) | undefined
                price?: (string | null) | undefined
                price_unit?: (string | null) | undefined
                status?:
                  | 'in-progress'
                  | 'paused'
                  | 'stopped'
                  | 'processing'
                  | 'completed'
                  | 'absent'
                  | undefined
                channels?: number | undefined
                source?:
                  | 'DialVerb'
                  | 'Conference'
                  | 'OutboundAPI'
                  | 'Trunking'
                  | 'RecordVerb'
                  | 'StartCallRecordingAPI'
                  | 'StartConferenceRecordingAPI'
                  | undefined
                error_code?: (number | null) | undefined
                encryption_details?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Recordings/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; ConferenceSid: string; Sid: string } } & {
          json: {
            Status: 'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'
            PauseBehavior?: string | undefined
          }
        } & {
          form: {
            Status: 'in-progress' | 'paused' | 'stopped' | 'processing' | 'completed' | 'absent'
            PauseBehavior?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          start_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          sid?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          status?:
            | 'in-progress'
            | 'paused'
            | 'stopped'
            | 'processing'
            | 'completed'
            | 'absent'
            | undefined
          channels?: number | undefined
          source?:
            | 'DialVerb'
            | 'Conference'
            | 'OutboundAPI'
            | 'Trunking'
            | 'RecordVerb'
            | 'StartCallRecordingAPI'
            | 'StartConferenceRecordingAPI'
            | undefined
          error_code?: (number | null) | undefined
          encryption_details?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $get: {
        input: { param: { AccountSid: string; ConferenceSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          start_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          sid?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          status?:
            | 'in-progress'
            | 'paused'
            | 'stopped'
            | 'processing'
            | 'completed'
            | 'absent'
            | undefined
          channels?: number | undefined
          source?:
            | 'DialVerb'
            | 'Conference'
            | 'OutboundAPI'
            | 'Trunking'
            | 'RecordVerb'
            | 'StartCallRecordingAPI'
            | 'StartConferenceRecordingAPI'
            | undefined
          error_code?: (number | null) | undefined
          encryption_details?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; ConferenceSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/ConnectApps/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          authorize_redirect_url?: (string | null) | undefined
          company_name?: (string | null) | undefined
          deauthorize_callback_method?: 'GET' | 'POST' | undefined
          deauthorize_callback_url?: (string | null) | undefined
          description?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          homepage_url?: (string | null) | undefined
          permissions?: (('get-all' | 'post-all')[] | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            AuthorizeRedirectUrl?: string | undefined
            CompanyName?: string | undefined
            DeauthorizeCallbackMethod?: 'GET' | 'POST' | undefined
            DeauthorizeCallbackUrl?: string | undefined
            Description?: string | undefined
            FriendlyName?: string | undefined
            HomepageUrl?: string | undefined
            Permissions?: ('get-all' | 'post-all')[] | undefined
          }
        } & {
          form: {
            AuthorizeRedirectUrl?: string | undefined
            CompanyName?: string | undefined
            DeauthorizeCallbackMethod?: 'GET' | 'POST' | undefined
            DeauthorizeCallbackUrl?: string | undefined
            Description?: string | undefined
            FriendlyName?: string | undefined
            HomepageUrl?: string | undefined
            Permissions?: ('get-all' | 'post-all')[] | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          authorize_redirect_url?: (string | null) | undefined
          company_name?: (string | null) | undefined
          deauthorize_callback_method?: 'GET' | 'POST' | undefined
          deauthorize_callback_url?: (string | null) | undefined
          description?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          homepage_url?: (string | null) | undefined
          permissions?: (('get-all' | 'post-all')[] | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/ConnectApps.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          connect_apps?:
            | {
                account_sid?: (string | null) | undefined
                authorize_redirect_url?: (string | null) | undefined
                company_name?: (string | null) | undefined
                deauthorize_callback_method?: 'GET' | 'POST' | undefined
                deauthorize_callback_url?: (string | null) | undefined
                description?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                homepage_url?: (string | null) | undefined
                permissions?: (('get-all' | 'post-all')[] | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Addresses/:AddressSid/DependentPhoneNumbers.json': {
      $get: {
        input: { param: { AccountSid: string; AddressSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          dependent_phone_numbers?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                voice_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
                capabilities?: ({ [x: string]: unknown } | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                api_version?: (string | null) | undefined
                sms_application_sid?: (string | null) | undefined
                voice_application_sid?: (string | null) | undefined
                trunk_sid?: (string | null) | undefined
                emergency_status?: 'Active' | 'Inactive' | undefined
                emergency_address_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            AccountSid?: string | undefined
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            BundleSid?: string | undefined
          }
        } & {
          form: {
            AccountSid?: string | undefined
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            BundleSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Beta?: boolean | undefined
            FriendlyName?: string | undefined
            PhoneNumber?: string | undefined
            Origin?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          incoming_phone_numbers?:
            | {
                account_sid?: (string | null) | undefined
                address_sid?: (string | null) | undefined
                address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
                api_version?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                identity_sid?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                origin?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_application_sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                trunk_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                voice_receive_mode?: 'voice' | 'fax' | undefined
                voice_application_sid?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_url?: (string | null) | undefined
                emergency_status?: 'Active' | 'Inactive' | undefined
                emergency_address_sid?: (string | null) | undefined
                emergency_address_status?:
                  | 'registered'
                  | 'unregistered'
                  | 'pending-registration'
                  | 'registration-failure'
                  | 'pending-unregistration'
                  | 'unregistration-failure'
                  | undefined
                bundle_sid?: (string | null) | undefined
                status?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
            PhoneNumber?: string | undefined
            AreaCode?: string | undefined
          }
        } & {
          form: {
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
            PhoneNumber?: string | undefined
            AreaCode?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; ResourceSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          resource_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          description?: (string | null) | undefined
          configuration?: ({ [x: string]: unknown } | null) | undefined
          unique_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; ResourceSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns.json': {
      $get: {
        input: { param: { AccountSid: string; ResourceSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          assigned_add_ons?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                resource_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                description?: (string | null) | undefined
                configuration?: ({ [x: string]: unknown } | null) | undefined
                unique_name?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                uri?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; ResourceSid: string } } & {
          json: { InstalledAddOnSid: string }
        } & { form: { InstalledAddOnSid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          resource_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          description?: (string | null) | undefined
          configuration?: ({ [x: string]: unknown } | null) | undefined
          unique_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions/:Sid.json': {
      $get: {
        input: {
          param: { AccountSid: string; ResourceSid: string; AssignedAddOnSid: string; Sid: string }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          resource_sid?: (string | null) | undefined
          assigned_add_on_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          product_name?: (string | null) | undefined
          unique_name?: (string | null) | undefined
          uri?: (string | null) | undefined
          enabled?: (boolean | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/:ResourceSid/AssignedAddOns/:AssignedAddOnSid/Extensions.json': {
      $get: {
        input: { param: { AccountSid: string; ResourceSid: string; AssignedAddOnSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          extensions?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                resource_sid?: (string | null) | undefined
                assigned_add_on_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                product_name?: (string | null) | undefined
                unique_name?: (string | null) | undefined
                uri?: (string | null) | undefined
                enabled?: (boolean | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Local.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Beta?: boolean | undefined
            FriendlyName?: string | undefined
            PhoneNumber?: string | undefined
            Origin?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          incoming_phone_numbers?:
            | {
                account_sid?: (string | null) | undefined
                address_sid?: (string | null) | undefined
                address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
                api_version?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                identity_sid?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                origin?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_application_sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                trunk_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                voice_receive_mode?: 'voice' | 'fax' | undefined
                voice_application_sid?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_url?: (string | null) | undefined
                emergency_status?: 'Active' | 'Inactive' | undefined
                emergency_address_sid?: (string | null) | undefined
                emergency_address_status?:
                  | 'registered'
                  | 'unregistered'
                  | 'pending-registration'
                  | 'registration-failure'
                  | 'pending-unregistration'
                  | 'unregistration-failure'
                  | undefined
                bundle_sid?: (string | null) | undefined
                status?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        } & {
          form: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/Mobile.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Beta?: boolean | undefined
            FriendlyName?: string | undefined
            PhoneNumber?: string | undefined
            Origin?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          incoming_phone_numbers?:
            | {
                account_sid?: (string | null) | undefined
                address_sid?: (string | null) | undefined
                address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
                api_version?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                identity_sid?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                origin?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_application_sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                trunk_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                voice_receive_mode?: 'voice' | 'fax' | undefined
                voice_application_sid?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_url?: (string | null) | undefined
                emergency_status?: 'Active' | 'Inactive' | undefined
                emergency_address_sid?: (string | null) | undefined
                emergency_address_status?:
                  | 'registered'
                  | 'unregistered'
                  | 'pending-registration'
                  | 'registration-failure'
                  | 'pending-unregistration'
                  | 'unregistration-failure'
                  | undefined
                bundle_sid?: (string | null) | undefined
                status?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        } & {
          form: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/IncomingPhoneNumbers/TollFree.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Beta?: boolean | undefined
            FriendlyName?: string | undefined
            PhoneNumber?: string | undefined
            Origin?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          incoming_phone_numbers?:
            | {
                account_sid?: (string | null) | undefined
                address_sid?: (string | null) | undefined
                address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
                api_version?: (string | null) | undefined
                beta?: (boolean | null) | undefined
                capabilities?:
                  | ({
                      mms?: boolean | undefined
                      sms?: boolean | undefined
                      voice?: boolean | undefined
                      fax?: boolean | undefined
                    } | null)
                  | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                identity_sid?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                origin?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_application_sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                status_callback?: (string | null) | undefined
                status_callback_method?: 'GET' | 'POST' | undefined
                trunk_sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                voice_receive_mode?: 'voice' | 'fax' | undefined
                voice_application_sid?: (string | null) | undefined
                voice_caller_id_lookup?: (boolean | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_url?: (string | null) | undefined
                emergency_status?: 'Active' | 'Inactive' | undefined
                emergency_address_sid?: (string | null) | undefined
                emergency_address_status?:
                  | 'registered'
                  | 'unregistered'
                  | 'pending-registration'
                  | 'registration-failure'
                  | 'pending-unregistration'
                  | 'unregistration-failure'
                  | undefined
                bundle_sid?: (string | null) | undefined
                status?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        } & {
          form: {
            PhoneNumber: string
            ApiVersion?: string | undefined
            FriendlyName?: string | undefined
            SmsApplicationSid?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsUrl?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceApplicationSid?: string | undefined
            VoiceCallerIdLookup?: boolean | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceUrl?: string | undefined
            IdentitySid?: string | undefined
            AddressSid?: string | undefined
            EmergencyStatus?: 'Active' | 'Inactive' | undefined
            EmergencyAddressSid?: string | undefined
            TrunkSid?: string | undefined
            VoiceReceiveMode?: 'voice' | 'fax' | undefined
            BundleSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          address_sid?: (string | null) | undefined
          address_requirements?: 'none' | 'any' | 'local' | 'foreign' | undefined
          api_version?: (string | null) | undefined
          beta?: (boolean | null) | undefined
          capabilities?:
            | ({
                mms?: boolean | undefined
                sms?: boolean | undefined
                voice?: boolean | undefined
                fax?: boolean | undefined
              } | null)
            | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          identity_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          origin?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_application_sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          status_callback?: (string | null) | undefined
          status_callback_method?: 'GET' | 'POST' | undefined
          trunk_sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_receive_mode?: 'voice' | 'fax' | undefined
          voice_application_sid?: (string | null) | undefined
          voice_caller_id_lookup?: (boolean | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_url?: (string | null) | undefined
          emergency_status?: 'Active' | 'Inactive' | undefined
          emergency_address_sid?: (string | null) | undefined
          emergency_address_status?:
            | 'registered'
            | 'unregistered'
            | 'pending-registration'
            | 'registration-failure'
            | 'pending-unregistration'
            | 'unregistration-failure'
            | undefined
          bundle_sid?: (string | null) | undefined
          status?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Keys/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName?: string | undefined }
        } & { form: { FriendlyName?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Keys.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          keys?:
            | {
                sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: { FriendlyName?: string | undefined }
        } & { form: { FriendlyName?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          secret?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; MessageSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
      $get: {
        input: { param: { AccountSid: string; MessageSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          content_type?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          parent_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Media.json': {
      $get: {
        input: { param: { AccountSid: string; MessageSid: string } } & {
          query: {
            DateCreated?: string | undefined
            'DateCreated<'?: string | undefined
            'DateCreated>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          media_list?:
            | {
                account_sid?: (string | null) | undefined
                content_type?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                parent_sid?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members/:CallSid.json': {
      $get: {
        input: { param: { AccountSid: string; QueueSid: string; CallSid: string } }
        output: {
          call_sid?: (string | null) | undefined
          date_enqueued?: (string | null) | undefined
          position?: number | undefined
          uri?: (string | null) | undefined
          wait_time?: number | undefined
          queue_sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; QueueSid: string; CallSid: string } } & {
          json: { Url: string; Method?: 'GET' | 'POST' | undefined }
        } & { form: { Url: string; Method?: 'GET' | 'POST' | undefined } }
        output: {
          call_sid?: (string | null) | undefined
          date_enqueued?: (string | null) | undefined
          position?: number | undefined
          uri?: (string | null) | undefined
          wait_time?: number | undefined
          queue_sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Queues/:QueueSid/Members.json': {
      $get: {
        input: { param: { AccountSid: string; QueueSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          queue_members?:
            | {
                call_sid?: (string | null) | undefined
                date_enqueued?: (string | null) | undefined
                position?: number | undefined
                uri?: (string | null) | undefined
                wait_time?: number | undefined
                queue_sid?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Messages.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            To: string
            StatusCallback?: string | undefined
            ApplicationSid?: string | undefined
            MaxPrice?: number | undefined
            ProvideFeedback?: boolean | undefined
            Attempt?: number | undefined
            ValidityPeriod?: number | undefined
            ForceDelivery?: boolean | undefined
            ContentRetention?: 'retain' | 'discard' | undefined
            AddressRetention?: 'retain' | 'obfuscate' | undefined
            SmartEncoded?: boolean | undefined
            PersistentAction?: string[] | undefined
            TrafficType?: 'free' | undefined
            ShortenUrls?: boolean | undefined
            ScheduleType?: 'fixed' | undefined
            SendAt?: string | undefined
            SendAsMms?: boolean | undefined
            ContentVariables?: string | undefined
            RiskCheck?: 'enable' | 'disable' | undefined
            From?: string | undefined
            MessagingServiceSid?: string | undefined
            Body?: string | undefined
            MediaUrl?: string[] | undefined
            ContentSid?: string | undefined
          }
        } & {
          form: {
            To: string
            StatusCallback?: string | undefined
            ApplicationSid?: string | undefined
            MaxPrice?: number | undefined
            ProvideFeedback?: boolean | undefined
            Attempt?: number | undefined
            ValidityPeriod?: number | undefined
            ForceDelivery?: boolean | undefined
            ContentRetention?: 'retain' | 'discard' | undefined
            AddressRetention?: 'retain' | 'obfuscate' | undefined
            SmartEncoded?: boolean | undefined
            PersistentAction?: string[] | undefined
            TrafficType?: 'free' | undefined
            ShortenUrls?: boolean | undefined
            ScheduleType?: 'fixed' | undefined
            SendAt?: string | undefined
            SendAsMms?: boolean | undefined
            ContentVariables?: string | undefined
            RiskCheck?: 'enable' | 'disable' | undefined
            From?: string | undefined
            MessagingServiceSid?: string | undefined
            Body?: string | undefined
            MediaUrl?: string[] | undefined
            ContentSid?: string | undefined
          }
        }
        output: {
          body?: (string | null) | undefined
          num_segments?: (string | null) | undefined
          direction?: 'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply' | undefined
          from?: (string | null) | undefined
          to?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          price?: (string | null) | undefined
          error_message?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          num_media?: (string | null) | undefined
          status?:
            | 'queued'
            | 'sending'
            | 'sent'
            | 'failed'
            | 'delivered'
            | 'undelivered'
            | 'receiving'
            | 'received'
            | 'accepted'
            | 'scheduled'
            | 'read'
            | 'partially_delivered'
            | 'canceled'
            | undefined
          messaging_service_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_sent?: (string | null) | undefined
          date_created?: (string | null) | undefined
          error_code?: (number | null) | undefined
          price_unit?: (string | null) | undefined
          api_version?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            To?: string | undefined
            From?: string | undefined
            DateSent?: string | undefined
            'DateSent<'?: string | undefined
            'DateSent>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          messages?:
            | {
                body?: (string | null) | undefined
                num_segments?: (string | null) | undefined
                direction?:
                  | 'inbound'
                  | 'outbound-api'
                  | 'outbound-call'
                  | 'outbound-reply'
                  | undefined
                from?: (string | null) | undefined
                to?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                price?: (string | null) | undefined
                error_message?: (string | null) | undefined
                uri?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                num_media?: (string | null) | undefined
                status?:
                  | 'queued'
                  | 'sending'
                  | 'sent'
                  | 'failed'
                  | 'delivered'
                  | 'undelivered'
                  | 'receiving'
                  | 'received'
                  | 'accepted'
                  | 'scheduled'
                  | 'read'
                  | 'partially_delivered'
                  | 'canceled'
                  | undefined
                messaging_service_sid?: (string | null) | undefined
                sid?: (string | null) | undefined
                date_sent?: (string | null) | undefined
                date_created?: (string | null) | undefined
                error_code?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                api_version?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Messages/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          body?: (string | null) | undefined
          num_segments?: (string | null) | undefined
          direction?: 'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply' | undefined
          from?: (string | null) | undefined
          to?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          price?: (string | null) | undefined
          error_message?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          num_media?: (string | null) | undefined
          status?:
            | 'queued'
            | 'sending'
            | 'sent'
            | 'failed'
            | 'delivered'
            | 'undelivered'
            | 'receiving'
            | 'received'
            | 'accepted'
            | 'scheduled'
            | 'read'
            | 'partially_delivered'
            | 'canceled'
            | undefined
          messaging_service_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_sent?: (string | null) | undefined
          date_created?: (string | null) | undefined
          error_code?: (number | null) | undefined
          price_unit?: (string | null) | undefined
          api_version?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { Body?: string | undefined; Status?: 'canceled' | undefined }
        } & { form: { Body?: string | undefined; Status?: 'canceled' | undefined } }
        output: {
          body?: (string | null) | undefined
          num_segments?: (string | null) | undefined
          direction?: 'inbound' | 'outbound-api' | 'outbound-call' | 'outbound-reply' | undefined
          from?: (string | null) | undefined
          to?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          price?: (string | null) | undefined
          error_message?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          num_media?: (string | null) | undefined
          status?:
            | 'queued'
            | 'sending'
            | 'sent'
            | 'failed'
            | 'delivered'
            | 'undelivered'
            | 'receiving'
            | 'received'
            | 'accepted'
            | 'scheduled'
            | 'read'
            | 'partially_delivered'
            | 'canceled'
            | undefined
          messaging_service_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_sent?: (string | null) | undefined
          date_created?: (string | null) | undefined
          error_code?: (number | null) | undefined
          price_unit?: (string | null) | undefined
          api_version?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Messages/:MessageSid/Feedback.json': {
      $post: {
        input: { param: { AccountSid: string; MessageSid: string } } & {
          json: { Outcome?: 'confirmed' | 'unconfirmed' | undefined }
        } & { form: { Outcome?: 'confirmed' | 'unconfirmed' | undefined } }
        output: {
          account_sid?: (string | null) | undefined
          message_sid?: (string | null) | undefined
          outcome?: 'confirmed' | 'unconfirmed' | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SigningKeys.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: { FriendlyName?: string | undefined }
        } & { form: { FriendlyName?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          secret?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          signing_keys?:
            | {
                sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Notifications/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          error_code?: (string | null) | undefined
          log?: (string | null) | undefined
          message_date?: (string | null) | undefined
          message_text?: (string | null) | undefined
          more_info?: (string | null) | undefined
          request_method?: 'GET' | 'POST' | undefined
          request_url?: (string | null) | undefined
          request_variables?: (string | null) | undefined
          response_body?: (string | null) | undefined
          response_headers?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Notifications.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Log?: number | undefined
            MessageDate?: string | undefined
            'MessageDate<'?: string | undefined
            'MessageDate>'?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          notifications?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                error_code?: (string | null) | undefined
                log?: (string | null) | undefined
                message_date?: (string | null) | undefined
                message_text?: (string | null) | undefined
                more_info?: (string | null) | undefined
                request_method?: 'GET' | 'POST' | undefined
                request_url?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName?: string | undefined }
        } & { form: { FriendlyName?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/OutgoingCallerIds.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PhoneNumber?: string | undefined
            FriendlyName?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          outgoing_caller_ids?:
            | {
                sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                phone_number?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            PhoneNumber: string
            FriendlyName?: string | undefined
            CallDelay?: number | undefined
            Extension?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
          }
        } & {
          form: {
            PhoneNumber: string
            FriendlyName?: string | undefined
            CallDelay?: number | undefined
            Extension?: string | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          phone_number?: (string | null) | undefined
          validation_code?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants/:CallSid.json': {
      $get: {
        input: { param: { AccountSid: string; ConferenceSid: string; CallSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          label?: (string | null) | undefined
          call_sid_to_coach?: (string | null) | undefined
          coaching?: (boolean | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          end_conference_on_exit?: (boolean | null) | undefined
          muted?: (boolean | null) | undefined
          hold?: (boolean | null) | undefined
          start_conference_on_enter?: (boolean | null) | undefined
          status?:
            | 'queued'
            | 'connecting'
            | 'ringing'
            | 'connected'
            | 'complete'
            | 'failed'
            | undefined
          queue_time?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; ConferenceSid: string; CallSid: string } } & {
          json: {
            Muted?: boolean | undefined
            Hold?: boolean | undefined
            HoldUrl?: string | undefined
            HoldMethod?: 'GET' | 'POST' | undefined
            AnnounceUrl?: string | undefined
            AnnounceMethod?: 'GET' | 'POST' | undefined
            WaitUrl?: string | undefined
            WaitMethod?: 'GET' | 'POST' | undefined
            BeepOnExit?: boolean | undefined
            EndConferenceOnExit?: boolean | undefined
            Coaching?: boolean | undefined
            CallSidToCoach?: string | undefined
          }
        } & {
          form: {
            Muted?: boolean | undefined
            Hold?: boolean | undefined
            HoldUrl?: string | undefined
            HoldMethod?: 'GET' | 'POST' | undefined
            AnnounceUrl?: string | undefined
            AnnounceMethod?: 'GET' | 'POST' | undefined
            WaitUrl?: string | undefined
            WaitMethod?: 'GET' | 'POST' | undefined
            BeepOnExit?: boolean | undefined
            EndConferenceOnExit?: boolean | undefined
            Coaching?: boolean | undefined
            CallSidToCoach?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          label?: (string | null) | undefined
          call_sid_to_coach?: (string | null) | undefined
          coaching?: (boolean | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          end_conference_on_exit?: (boolean | null) | undefined
          muted?: (boolean | null) | undefined
          hold?: (boolean | null) | undefined
          start_conference_on_enter?: (boolean | null) | undefined
          status?:
            | 'queued'
            | 'connecting'
            | 'ringing'
            | 'connected'
            | 'complete'
            | 'failed'
            | undefined
          queue_time?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; ConferenceSid: string; CallSid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Conferences/:ConferenceSid/Participants.json': {
      $post: {
        input: { param: { AccountSid: string; ConferenceSid: string } } & {
          json: {
            From: string
            To: string
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallbackEvent?: string[] | undefined
            Label?: string | undefined
            Timeout?: number | undefined
            Record?: boolean | undefined
            Muted?: boolean | undefined
            Beep?: string | undefined
            StartConferenceOnEnter?: boolean | undefined
            EndConferenceOnExit?: boolean | undefined
            WaitUrl?: string | undefined
            WaitMethod?: 'GET' | 'POST' | undefined
            EarlyMedia?: boolean | undefined
            MaxParticipants?: number | undefined
            ConferenceRecord?: string | undefined
            ConferenceTrim?: string | undefined
            ConferenceStatusCallback?: string | undefined
            ConferenceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            ConferenceStatusCallbackEvent?: string[] | undefined
            RecordingChannels?: string | undefined
            RecordingStatusCallback?: string | undefined
            RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipAuthUsername?: string | undefined
            SipAuthPassword?: string | undefined
            Region?: string | undefined
            ConferenceRecordingStatusCallback?: string | undefined
            ConferenceRecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            RecordingStatusCallbackEvent?: string[] | undefined
            ConferenceRecordingStatusCallbackEvent?: string[] | undefined
            Coaching?: boolean | undefined
            CallSidToCoach?: string | undefined
            JitterBufferSize?: string | undefined
            Byoc?: string | undefined
            CallerId?: string | undefined
            CallReason?: string | undefined
            RecordingTrack?: string | undefined
            TimeLimit?: number | undefined
            MachineDetection?: string | undefined
            MachineDetectionTimeout?: number | undefined
            MachineDetectionSpeechThreshold?: number | undefined
            MachineDetectionSpeechEndThreshold?: number | undefined
            MachineDetectionSilenceTimeout?: number | undefined
            AmdStatusCallback?: string | undefined
            AmdStatusCallbackMethod?: 'GET' | 'POST' | undefined
            Trim?: string | undefined
            CallToken?: string | undefined
            CallerDisplayName?: string | undefined
          }
        } & {
          form: {
            From: string
            To: string
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            StatusCallbackEvent?: string[] | undefined
            Label?: string | undefined
            Timeout?: number | undefined
            Record?: boolean | undefined
            Muted?: boolean | undefined
            Beep?: string | undefined
            StartConferenceOnEnter?: boolean | undefined
            EndConferenceOnExit?: boolean | undefined
            WaitUrl?: string | undefined
            WaitMethod?: 'GET' | 'POST' | undefined
            EarlyMedia?: boolean | undefined
            MaxParticipants?: number | undefined
            ConferenceRecord?: string | undefined
            ConferenceTrim?: string | undefined
            ConferenceStatusCallback?: string | undefined
            ConferenceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            ConferenceStatusCallbackEvent?: string[] | undefined
            RecordingChannels?: string | undefined
            RecordingStatusCallback?: string | undefined
            RecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipAuthUsername?: string | undefined
            SipAuthPassword?: string | undefined
            Region?: string | undefined
            ConferenceRecordingStatusCallback?: string | undefined
            ConferenceRecordingStatusCallbackMethod?: 'GET' | 'POST' | undefined
            RecordingStatusCallbackEvent?: string[] | undefined
            ConferenceRecordingStatusCallbackEvent?: string[] | undefined
            Coaching?: boolean | undefined
            CallSidToCoach?: string | undefined
            JitterBufferSize?: string | undefined
            Byoc?: string | undefined
            CallerId?: string | undefined
            CallReason?: string | undefined
            RecordingTrack?: string | undefined
            TimeLimit?: number | undefined
            MachineDetection?: string | undefined
            MachineDetectionTimeout?: number | undefined
            MachineDetectionSpeechThreshold?: number | undefined
            MachineDetectionSpeechEndThreshold?: number | undefined
            MachineDetectionSilenceTimeout?: number | undefined
            AmdStatusCallback?: string | undefined
            AmdStatusCallbackMethod?: 'GET' | 'POST' | undefined
            Trim?: string | undefined
            CallToken?: string | undefined
            CallerDisplayName?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          label?: (string | null) | undefined
          call_sid_to_coach?: (string | null) | undefined
          coaching?: (boolean | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          end_conference_on_exit?: (boolean | null) | undefined
          muted?: (boolean | null) | undefined
          hold?: (boolean | null) | undefined
          start_conference_on_enter?: (boolean | null) | undefined
          status?:
            | 'queued'
            | 'connecting'
            | 'ringing'
            | 'connected'
            | 'complete'
            | 'failed'
            | undefined
          queue_time?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; ConferenceSid: string } } & {
          query: {
            Muted?: boolean | undefined
            Hold?: boolean | undefined
            Coaching?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          participants?:
            | {
                account_sid?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                label?: (string | null) | undefined
                call_sid_to_coach?: (string | null) | undefined
                coaching?: (boolean | null) | undefined
                conference_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                end_conference_on_exit?: (boolean | null) | undefined
                muted?: (boolean | null) | undefined
                hold?: (boolean | null) | undefined
                start_conference_on_enter?: (boolean | null) | undefined
                status?:
                  | 'queued'
                  | 'connecting'
                  | 'ringing'
                  | 'connected'
                  | 'complete'
                  | 'failed'
                  | undefined
                queue_time?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: {
            IdempotencyKey: string
            StatusCallback: string
            BankAccountType?:
              | 'consumer-checking'
              | 'consumer-savings'
              | 'commercial-checking'
              | undefined
            ChargeAmount?: number | undefined
            Currency?: string | undefined
            Description?: string | undefined
            Input?: string | undefined
            MinPostalCodeLength?: number | undefined
            Parameter?: { [x: string]: unknown } | undefined
            PaymentConnector?: string | undefined
            PaymentMethod?: 'credit-card' | 'ach-debit' | undefined
            PostalCode?: boolean | undefined
            SecurityCode?: boolean | undefined
            Timeout?: number | undefined
            TokenType?: 'one-time' | 'reusable' | 'payment-method' | undefined
            ValidCardTypes?: string | undefined
          }
        } & {
          form: {
            IdempotencyKey: string
            StatusCallback: string
            BankAccountType?:
              | 'consumer-checking'
              | 'consumer-savings'
              | 'commercial-checking'
              | undefined
            ChargeAmount?: number | undefined
            Currency?: string | undefined
            Description?: string | undefined
            Input?: string | undefined
            MinPostalCodeLength?: number | undefined
            Parameter?: { [x: string]: unknown } | undefined
            PaymentConnector?: string | undefined
            PaymentMethod?: 'credit-card' | 'ach-debit' | undefined
            PostalCode?: boolean | undefined
            SecurityCode?: boolean | undefined
            Timeout?: number | undefined
            TokenType?: 'one-time' | 'reusable' | 'payment-method' | undefined
            ValidCardTypes?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Payments/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } } & {
          json: {
            IdempotencyKey: string
            StatusCallback: string
            Capture?:
              | 'payment-card-number'
              | 'expiration-date'
              | 'security-code'
              | 'postal-code'
              | 'bank-routing-number'
              | 'bank-account-number'
              | undefined
            Status?: 'complete' | 'cancel' | undefined
          }
        } & {
          form: {
            IdempotencyKey: string
            StatusCallback: string
            Capture?:
              | 'payment-card-number'
              | 'expiration-date'
              | 'security-code'
              | 'postal-code'
              | 'bank-routing-number'
              | 'bank-account-number'
              | undefined
            Status?: 'complete' | 'cancel' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 202
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Queues/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          date_updated?: (string | null) | undefined
          current_size?: number | undefined
          friendly_name?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          average_wait_time?: number | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          max_size?: number | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName?: string | undefined; MaxSize?: number | undefined }
        } & { form: { FriendlyName?: string | undefined; MaxSize?: number | undefined } }
        output: {
          date_updated?: (string | null) | undefined
          current_size?: number | undefined
          friendly_name?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          average_wait_time?: number | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          max_size?: number | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Queues.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          queues?:
            | {
                date_updated?: (string | null) | undefined
                current_size?: number | undefined
                friendly_name?: (string | null) | undefined
                uri?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                average_wait_time?: number | undefined
                sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                max_size?: number | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: { FriendlyName: string; MaxSize?: number | undefined }
        } & { form: { FriendlyName: string; MaxSize?: number | undefined } }
        output: {
          date_updated?: (string | null) | undefined
          current_size?: number | undefined
          friendly_name?: (string | null) | undefined
          uri?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          average_wait_time?: number | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          max_size?: number | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: {
            Name?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallbackUrl?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            InboundTrackLabel?: string | undefined
            OutboundTrackLabel?: string | undefined
            PartialResults?: boolean | undefined
            LanguageCode?: string | undefined
            TranscriptionEngine?: string | undefined
            ProfanityFilter?: boolean | undefined
            SpeechModel?: string | undefined
            Hints?: string | undefined
            EnableAutomaticPunctuation?: boolean | undefined
            IntelligenceService?: string | undefined
          }
        } & {
          form: {
            Name?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallbackUrl?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            InboundTrackLabel?: string | undefined
            OutboundTrackLabel?: string | undefined
            PartialResults?: boolean | undefined
            LanguageCode?: string | undefined
            TranscriptionEngine?: string | undefined
            ProfanityFilter?: boolean | undefined
            SpeechModel?: string | undefined
            Hints?: string | undefined
            EnableAutomaticPunctuation?: boolean | undefined
            IntelligenceService?: string | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Transcriptions/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } } & {
          json: { Status: 'stopped' }
        } & { form: { Status: 'stopped' } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } } & {
          query: { IncludeSoftDeleted?: boolean | undefined }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          conference_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          start_time?: (string | null) | undefined
          duration?: (string | null) | undefined
          sid?: (string | null) | undefined
          price?: (string | null) | undefined
          price_unit?: (string | null) | undefined
          status?:
            | 'in-progress'
            | 'paused'
            | 'stopped'
            | 'processing'
            | 'completed'
            | 'absent'
            | 'deleted'
            | undefined
          channels?: (number | null) | undefined
          source?:
            | 'DialVerb'
            | 'Conference'
            | 'OutboundAPI'
            | 'Trunking'
            | 'RecordVerb'
            | 'StartCallRecordingAPI'
            | 'StartConferenceRecordingAPI'
            | undefined
          error_code?: (number | null) | undefined
          uri?: (string | null) | undefined
          encryption_details?: ({ [x: string]: unknown } | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          media_url?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            DateCreated?: string | undefined
            'DateCreated<'?: string | undefined
            'DateCreated>'?: string | undefined
            CallSid?: string | undefined
            ConferenceSid?: string | undefined
            IncludeSoftDeleted?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          recordings?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                call_sid?: (string | null) | undefined
                conference_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                start_time?: (string | null) | undefined
                duration?: (string | null) | undefined
                sid?: (string | null) | undefined
                price?: (string | null) | undefined
                price_unit?: (string | null) | undefined
                status?:
                  | 'in-progress'
                  | 'paused'
                  | 'stopped'
                  | 'processing'
                  | 'completed'
                  | 'absent'
                  | 'deleted'
                  | undefined
                channels?: (number | null) | undefined
                source?:
                  | 'DialVerb'
                  | 'Conference'
                  | 'OutboundAPI'
                  | 'Trunking'
                  | 'RecordVerb'
                  | 'StartCallRecordingAPI'
                  | 'StartConferenceRecordingAPI'
                  | undefined
                error_code?: (number | null) | undefined
                uri?: (string | null) | undefined
                encryption_details?: ({ [x: string]: unknown } | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                media_url?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; ReferenceSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          status?:
            | 'canceled'
            | 'completed'
            | 'deleted'
            | 'failed'
            | 'in-progress'
            | 'init'
            | 'processing'
            | 'queued'
            | undefined
          add_on_sid?: (string | null) | undefined
          add_on_configuration_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          date_completed?: (string | null) | undefined
          reference_sid?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; ReferenceSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults.json': {
      $get: {
        input: { param: { AccountSid: string; ReferenceSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          add_on_results?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                status?:
                  | 'canceled'
                  | 'completed'
                  | 'deleted'
                  | 'failed'
                  | 'in-progress'
                  | 'init'
                  | 'processing'
                  | 'queued'
                  | undefined
                add_on_sid?: (string | null) | undefined
                add_on_configuration_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                date_completed?: (string | null) | undefined
                reference_sid?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:Sid.json': {
      $get: {
        input: {
          param: { AccountSid: string; ReferenceSid: string; AddOnResultSid: string; Sid: string }
        }
        output: {
          sid?: (string | null) | undefined
          add_on_result_sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          label?: (string | null) | undefined
          add_on_sid?: (string | null) | undefined
          add_on_configuration_sid?: (string | null) | undefined
          content_type?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          reference_sid?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: {
          param: { AccountSid: string; ReferenceSid: string; AddOnResultSid: string; Sid: string }
        }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads.json': {
      $get: {
        input: { param: { AccountSid: string; ReferenceSid: string; AddOnResultSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          payloads?:
            | {
                sid?: (string | null) | undefined
                add_on_result_sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                label?: (string | null) | undefined
                add_on_sid?: (string | null) | undefined
                add_on_configuration_sid?: (string | null) | undefined
                content_type?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                reference_sid?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:ReferenceSid/AddOnResults/:AddOnResultSid/Payloads/:PayloadSid/Data.json': {
      $get: {
        input: {
          param: {
            AccountSid: string
            ReferenceSid: string
            AddOnResultSid: string
            PayloadSid: string
          }
        }
        output: { redirect_to?: (string | null) | undefined }
        outputFormat: 'json'
        status: 307
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; RecordingSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          duration?: (string | null) | undefined
          price?: (number | null) | undefined
          price_unit?: (string | null) | undefined
          recording_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'in-progress' | 'completed' | 'failed' | undefined
          transcription_text?: (string | null) | undefined
          type?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; RecordingSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Recordings/:RecordingSid/Transcriptions.json': {
      $get: {
        input: { param: { AccountSid: string; RecordingSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          transcriptions?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                duration?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                recording_sid?: (string | null) | undefined
                sid?: (string | null) | undefined
                status?: 'in-progress' | 'completed' | 'failed' | undefined
                transcription_text?: (string | null) | undefined
                type?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          short_code?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            FriendlyName?: string | undefined
            ApiVersion?: string | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
          }
        } & {
          form: {
            FriendlyName?: string | undefined
            ApiVersion?: string | undefined
            SmsUrl?: string | undefined
            SmsMethod?: 'GET' | 'POST' | undefined
            SmsFallbackUrl?: string | undefined
            SmsFallbackMethod?: 'GET' | 'POST' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          short_code?: (string | null) | undefined
          sid?: (string | null) | undefined
          sms_fallback_method?: 'GET' | 'POST' | undefined
          sms_fallback_url?: (string | null) | undefined
          sms_method?: 'GET' | 'POST' | undefined
          sms_url?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SMS/ShortCodes.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            FriendlyName?: string | undefined
            ShortCode?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          short_codes?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                short_code?: (string | null) | undefined
                sid?: (string | null) | undefined
                sms_fallback_method?: 'GET' | 'POST' | undefined
                sms_fallback_url?: (string | null) | undefined
                sms_method?: 'GET' | 'POST' | undefined
                sms_url?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SigningKeys/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName?: string | undefined }
        } & { form: { FriendlyName?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings.json': {
      $post: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          json: { CredentialListSid: string }
        } & { form: { CredentialListSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          contents?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/CredentialListMappings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings.json': {
      $post: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          json: { IpAccessControlListSid: string }
        } & { form: { IpAccessControlListSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          contents?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Calls/IpAccessControlListMappings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings.json': {
      $post: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          json: { CredentialListSid: string }
        } & { form: { CredentialListSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          contents?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/Auth/Registrations/CredentialListMappings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials.json': {
      $get: {
        input: { param: { AccountSid: string; CredentialListSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          credentials?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                credential_list_sid?: (string | null) | undefined
                username?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; CredentialListSid: string } } & {
          json: { Username: string; Password: string }
        } & { form: { Username: string; Password: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          credential_list_sid?: (string | null) | undefined
          username?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:CredentialListSid/Credentials/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; CredentialListSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          credential_list_sid?: (string | null) | undefined
          username?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; CredentialListSid: string; Sid: string } } & {
          json: { Password?: string | undefined }
        } & { form: { Password?: string | undefined } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          credential_list_sid?: (string | null) | undefined
          username?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; CredentialListSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          credential_lists?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & { json: { FriendlyName: string } } & {
          form: { FriendlyName: string }
        }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/CredentialLists/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName: string }
        } & { form: { FriendlyName: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings.json': {
      $post: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          json: { CredentialListSid: string }
        } & { form: { CredentialListSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          credential_list_mappings?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                domain_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/CredentialListMappings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          domains?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                auth_type?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                domain_name?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
                voice_fallback_method?: 'GET' | 'POST' | undefined
                voice_fallback_url?: (string | null) | undefined
                voice_method?: 'GET' | 'POST' | undefined
                voice_status_callback_method?: 'GET' | 'POST' | undefined
                voice_status_callback_url?: (string | null) | undefined
                voice_url?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                sip_registration?: (boolean | null) | undefined
                emergency_calling_enabled?: (boolean | null) | undefined
                secure?: (boolean | null) | undefined
                byoc_trunk_sid?: (string | null) | undefined
                emergency_caller_sid?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            DomainName: string
            FriendlyName?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackUrl?: string | undefined
            VoiceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipRegistration?: boolean | undefined
            EmergencyCallingEnabled?: boolean | undefined
            Secure?: boolean | undefined
            ByocTrunkSid?: string | undefined
            EmergencyCallerSid?: string | undefined
          }
        } & {
          form: {
            DomainName: string
            FriendlyName?: string | undefined
            VoiceUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackUrl?: string | undefined
            VoiceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            SipRegistration?: boolean | undefined
            EmergencyCallingEnabled?: boolean | undefined
            Secure?: boolean | undefined
            ByocTrunkSid?: string | undefined
            EmergencyCallerSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          auth_type?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_name?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_status_callback_method?: 'GET' | 'POST' | undefined
          voice_status_callback_url?: (string | null) | undefined
          voice_url?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          sip_registration?: (boolean | null) | undefined
          emergency_calling_enabled?: (boolean | null) | undefined
          secure?: (boolean | null) | undefined
          byoc_trunk_sid?: (string | null) | undefined
          emergency_caller_sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          auth_type?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_name?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_status_callback_method?: 'GET' | 'POST' | undefined
          voice_status_callback_url?: (string | null) | undefined
          voice_url?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          sip_registration?: (boolean | null) | undefined
          emergency_calling_enabled?: (boolean | null) | undefined
          secure?: (boolean | null) | undefined
          byoc_trunk_sid?: (string | null) | undefined
          emergency_caller_sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            FriendlyName?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackUrl?: string | undefined
            VoiceUrl?: string | undefined
            SipRegistration?: boolean | undefined
            DomainName?: string | undefined
            EmergencyCallingEnabled?: boolean | undefined
            Secure?: boolean | undefined
            ByocTrunkSid?: string | undefined
            EmergencyCallerSid?: string | undefined
          }
        } & {
          form: {
            FriendlyName?: string | undefined
            VoiceFallbackMethod?: 'GET' | 'POST' | undefined
            VoiceFallbackUrl?: string | undefined
            VoiceMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackMethod?: 'GET' | 'POST' | undefined
            VoiceStatusCallbackUrl?: string | undefined
            VoiceUrl?: string | undefined
            SipRegistration?: boolean | undefined
            DomainName?: string | undefined
            EmergencyCallingEnabled?: boolean | undefined
            Secure?: boolean | undefined
            ByocTrunkSid?: string | undefined
            EmergencyCallerSid?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          auth_type?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_name?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
          voice_fallback_method?: 'GET' | 'POST' | undefined
          voice_fallback_url?: (string | null) | undefined
          voice_method?: 'GET' | 'POST' | undefined
          voice_status_callback_method?: 'GET' | 'POST' | undefined
          voice_status_callback_url?: (string | null) | undefined
          voice_url?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          sip_registration?: (boolean | null) | undefined
          emergency_calling_enabled?: (boolean | null) | undefined
          secure?: (boolean | null) | undefined
          byoc_trunk_sid?: (string | null) | undefined
          emergency_caller_sid?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          ip_access_control_lists?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string } } & { json: { FriendlyName: string } } & {
          form: { FriendlyName: string }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: { FriendlyName: string }
        } & { form: { FriendlyName: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          subresource_uris?: ({ [x: string]: unknown } | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; DomainSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/Domains/:DomainSid/IpAccessControlListMappings.json': {
      $post: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          json: { IpAccessControlListSid: string }
        } & { form: { IpAccessControlListSid: string } }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          domain_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          sid?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string; DomainSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          ip_access_control_list_mappings?:
            | {
                account_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                domain_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                sid?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses.json': {
      $get: {
        input: { param: { AccountSid: string; IpAccessControlListSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          ip_addresses?:
            | {
                sid?: (string | null) | undefined
                account_sid?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                ip_address?: (string | null) | undefined
                cidr_prefix_length?: number | undefined
                ip_access_control_list_sid?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; IpAccessControlListSid: string } } & {
          json: { FriendlyName: string; IpAddress: string; CidrPrefixLength?: number | undefined }
        } & {
          form: { FriendlyName: string; IpAddress: string; CidrPrefixLength?: number | undefined }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          ip_address?: (string | null) | undefined
          cidr_prefix_length?: number | undefined
          ip_access_control_list_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/SIP/IpAccessControlLists/:IpAccessControlListSid/IpAddresses/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; IpAccessControlListSid: string; Sid: string } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          ip_address?: (string | null) | undefined
          cidr_prefix_length?: number | undefined
          ip_access_control_list_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; IpAccessControlListSid: string; Sid: string } } & {
          json: {
            IpAddress?: string | undefined
            FriendlyName?: string | undefined
            CidrPrefixLength?: number | undefined
          }
        } & {
          form: {
            IpAddress?: string | undefined
            FriendlyName?: string | undefined
            CidrPrefixLength?: number | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          ip_address?: (string | null) | undefined
          cidr_prefix_length?: number | undefined
          ip_access_control_list_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; IpAccessControlListSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: {
            Name?: string | undefined
            ConnectorName?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            'Parameter1.Name'?: string | undefined
            'Parameter1.Value'?: string | undefined
            'Parameter2.Name'?: string | undefined
            'Parameter2.Value'?: string | undefined
            'Parameter3.Name'?: string | undefined
            'Parameter3.Value'?: string | undefined
            'Parameter4.Name'?: string | undefined
            'Parameter4.Value'?: string | undefined
            'Parameter5.Name'?: string | undefined
            'Parameter5.Value'?: string | undefined
            'Parameter6.Name'?: string | undefined
            'Parameter6.Value'?: string | undefined
            'Parameter7.Name'?: string | undefined
            'Parameter7.Value'?: string | undefined
            'Parameter8.Name'?: string | undefined
            'Parameter8.Value'?: string | undefined
            'Parameter9.Name'?: string | undefined
            'Parameter9.Value'?: string | undefined
            'Parameter10.Name'?: string | undefined
            'Parameter10.Value'?: string | undefined
            'Parameter11.Name'?: string | undefined
            'Parameter11.Value'?: string | undefined
            'Parameter12.Name'?: string | undefined
            'Parameter12.Value'?: string | undefined
            'Parameter13.Name'?: string | undefined
            'Parameter13.Value'?: string | undefined
            'Parameter14.Name'?: string | undefined
            'Parameter14.Value'?: string | undefined
            'Parameter15.Name'?: string | undefined
            'Parameter15.Value'?: string | undefined
            'Parameter16.Name'?: string | undefined
            'Parameter16.Value'?: string | undefined
            'Parameter17.Name'?: string | undefined
            'Parameter17.Value'?: string | undefined
            'Parameter18.Name'?: string | undefined
            'Parameter18.Value'?: string | undefined
            'Parameter19.Name'?: string | undefined
            'Parameter19.Value'?: string | undefined
            'Parameter20.Name'?: string | undefined
            'Parameter20.Value'?: string | undefined
            'Parameter21.Name'?: string | undefined
            'Parameter21.Value'?: string | undefined
            'Parameter22.Name'?: string | undefined
            'Parameter22.Value'?: string | undefined
            'Parameter23.Name'?: string | undefined
            'Parameter23.Value'?: string | undefined
            'Parameter24.Name'?: string | undefined
            'Parameter24.Value'?: string | undefined
            'Parameter25.Name'?: string | undefined
            'Parameter25.Value'?: string | undefined
            'Parameter26.Name'?: string | undefined
            'Parameter26.Value'?: string | undefined
            'Parameter27.Name'?: string | undefined
            'Parameter27.Value'?: string | undefined
            'Parameter28.Name'?: string | undefined
            'Parameter28.Value'?: string | undefined
            'Parameter29.Name'?: string | undefined
            'Parameter29.Value'?: string | undefined
            'Parameter30.Name'?: string | undefined
            'Parameter30.Value'?: string | undefined
            'Parameter31.Name'?: string | undefined
            'Parameter31.Value'?: string | undefined
            'Parameter32.Name'?: string | undefined
            'Parameter32.Value'?: string | undefined
            'Parameter33.Name'?: string | undefined
            'Parameter33.Value'?: string | undefined
            'Parameter34.Name'?: string | undefined
            'Parameter34.Value'?: string | undefined
            'Parameter35.Name'?: string | undefined
            'Parameter35.Value'?: string | undefined
            'Parameter36.Name'?: string | undefined
            'Parameter36.Value'?: string | undefined
            'Parameter37.Name'?: string | undefined
            'Parameter37.Value'?: string | undefined
            'Parameter38.Name'?: string | undefined
            'Parameter38.Value'?: string | undefined
            'Parameter39.Name'?: string | undefined
            'Parameter39.Value'?: string | undefined
            'Parameter40.Name'?: string | undefined
            'Parameter40.Value'?: string | undefined
            'Parameter41.Name'?: string | undefined
            'Parameter41.Value'?: string | undefined
            'Parameter42.Name'?: string | undefined
            'Parameter42.Value'?: string | undefined
            'Parameter43.Name'?: string | undefined
            'Parameter43.Value'?: string | undefined
            'Parameter44.Name'?: string | undefined
            'Parameter44.Value'?: string | undefined
            'Parameter45.Name'?: string | undefined
            'Parameter45.Value'?: string | undefined
            'Parameter46.Name'?: string | undefined
            'Parameter46.Value'?: string | undefined
            'Parameter47.Name'?: string | undefined
            'Parameter47.Value'?: string | undefined
            'Parameter48.Name'?: string | undefined
            'Parameter48.Value'?: string | undefined
            'Parameter49.Name'?: string | undefined
            'Parameter49.Value'?: string | undefined
            'Parameter50.Name'?: string | undefined
            'Parameter50.Value'?: string | undefined
            'Parameter51.Name'?: string | undefined
            'Parameter51.Value'?: string | undefined
            'Parameter52.Name'?: string | undefined
            'Parameter52.Value'?: string | undefined
            'Parameter53.Name'?: string | undefined
            'Parameter53.Value'?: string | undefined
            'Parameter54.Name'?: string | undefined
            'Parameter54.Value'?: string | undefined
            'Parameter55.Name'?: string | undefined
            'Parameter55.Value'?: string | undefined
            'Parameter56.Name'?: string | undefined
            'Parameter56.Value'?: string | undefined
            'Parameter57.Name'?: string | undefined
            'Parameter57.Value'?: string | undefined
            'Parameter58.Name'?: string | undefined
            'Parameter58.Value'?: string | undefined
            'Parameter59.Name'?: string | undefined
            'Parameter59.Value'?: string | undefined
            'Parameter60.Name'?: string | undefined
            'Parameter60.Value'?: string | undefined
            'Parameter61.Name'?: string | undefined
            'Parameter61.Value'?: string | undefined
            'Parameter62.Name'?: string | undefined
            'Parameter62.Value'?: string | undefined
            'Parameter63.Name'?: string | undefined
            'Parameter63.Value'?: string | undefined
            'Parameter64.Name'?: string | undefined
            'Parameter64.Value'?: string | undefined
            'Parameter65.Name'?: string | undefined
            'Parameter65.Value'?: string | undefined
            'Parameter66.Name'?: string | undefined
            'Parameter66.Value'?: string | undefined
            'Parameter67.Name'?: string | undefined
            'Parameter67.Value'?: string | undefined
            'Parameter68.Name'?: string | undefined
            'Parameter68.Value'?: string | undefined
            'Parameter69.Name'?: string | undefined
            'Parameter69.Value'?: string | undefined
            'Parameter70.Name'?: string | undefined
            'Parameter70.Value'?: string | undefined
            'Parameter71.Name'?: string | undefined
            'Parameter71.Value'?: string | undefined
            'Parameter72.Name'?: string | undefined
            'Parameter72.Value'?: string | undefined
            'Parameter73.Name'?: string | undefined
            'Parameter73.Value'?: string | undefined
            'Parameter74.Name'?: string | undefined
            'Parameter74.Value'?: string | undefined
            'Parameter75.Name'?: string | undefined
            'Parameter75.Value'?: string | undefined
            'Parameter76.Name'?: string | undefined
            'Parameter76.Value'?: string | undefined
            'Parameter77.Name'?: string | undefined
            'Parameter77.Value'?: string | undefined
            'Parameter78.Name'?: string | undefined
            'Parameter78.Value'?: string | undefined
            'Parameter79.Name'?: string | undefined
            'Parameter79.Value'?: string | undefined
            'Parameter80.Name'?: string | undefined
            'Parameter80.Value'?: string | undefined
            'Parameter81.Name'?: string | undefined
            'Parameter81.Value'?: string | undefined
            'Parameter82.Name'?: string | undefined
            'Parameter82.Value'?: string | undefined
            'Parameter83.Name'?: string | undefined
            'Parameter83.Value'?: string | undefined
            'Parameter84.Name'?: string | undefined
            'Parameter84.Value'?: string | undefined
            'Parameter85.Name'?: string | undefined
            'Parameter85.Value'?: string | undefined
            'Parameter86.Name'?: string | undefined
            'Parameter86.Value'?: string | undefined
            'Parameter87.Name'?: string | undefined
            'Parameter87.Value'?: string | undefined
            'Parameter88.Name'?: string | undefined
            'Parameter88.Value'?: string | undefined
            'Parameter89.Name'?: string | undefined
            'Parameter89.Value'?: string | undefined
            'Parameter90.Name'?: string | undefined
            'Parameter90.Value'?: string | undefined
            'Parameter91.Name'?: string | undefined
            'Parameter91.Value'?: string | undefined
            'Parameter92.Name'?: string | undefined
            'Parameter92.Value'?: string | undefined
            'Parameter93.Name'?: string | undefined
            'Parameter93.Value'?: string | undefined
            'Parameter94.Name'?: string | undefined
            'Parameter94.Value'?: string | undefined
            'Parameter95.Name'?: string | undefined
            'Parameter95.Value'?: string | undefined
            'Parameter96.Name'?: string | undefined
            'Parameter96.Value'?: string | undefined
            'Parameter97.Name'?: string | undefined
            'Parameter97.Value'?: string | undefined
            'Parameter98.Name'?: string | undefined
            'Parameter98.Value'?: string | undefined
            'Parameter99.Name'?: string | undefined
            'Parameter99.Value'?: string | undefined
          }
        } & {
          form: {
            Name?: string | undefined
            ConnectorName?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            'Parameter1.Name'?: string | undefined
            'Parameter1.Value'?: string | undefined
            'Parameter2.Name'?: string | undefined
            'Parameter2.Value'?: string | undefined
            'Parameter3.Name'?: string | undefined
            'Parameter3.Value'?: string | undefined
            'Parameter4.Name'?: string | undefined
            'Parameter4.Value'?: string | undefined
            'Parameter5.Name'?: string | undefined
            'Parameter5.Value'?: string | undefined
            'Parameter6.Name'?: string | undefined
            'Parameter6.Value'?: string | undefined
            'Parameter7.Name'?: string | undefined
            'Parameter7.Value'?: string | undefined
            'Parameter8.Name'?: string | undefined
            'Parameter8.Value'?: string | undefined
            'Parameter9.Name'?: string | undefined
            'Parameter9.Value'?: string | undefined
            'Parameter10.Name'?: string | undefined
            'Parameter10.Value'?: string | undefined
            'Parameter11.Name'?: string | undefined
            'Parameter11.Value'?: string | undefined
            'Parameter12.Name'?: string | undefined
            'Parameter12.Value'?: string | undefined
            'Parameter13.Name'?: string | undefined
            'Parameter13.Value'?: string | undefined
            'Parameter14.Name'?: string | undefined
            'Parameter14.Value'?: string | undefined
            'Parameter15.Name'?: string | undefined
            'Parameter15.Value'?: string | undefined
            'Parameter16.Name'?: string | undefined
            'Parameter16.Value'?: string | undefined
            'Parameter17.Name'?: string | undefined
            'Parameter17.Value'?: string | undefined
            'Parameter18.Name'?: string | undefined
            'Parameter18.Value'?: string | undefined
            'Parameter19.Name'?: string | undefined
            'Parameter19.Value'?: string | undefined
            'Parameter20.Name'?: string | undefined
            'Parameter20.Value'?: string | undefined
            'Parameter21.Name'?: string | undefined
            'Parameter21.Value'?: string | undefined
            'Parameter22.Name'?: string | undefined
            'Parameter22.Value'?: string | undefined
            'Parameter23.Name'?: string | undefined
            'Parameter23.Value'?: string | undefined
            'Parameter24.Name'?: string | undefined
            'Parameter24.Value'?: string | undefined
            'Parameter25.Name'?: string | undefined
            'Parameter25.Value'?: string | undefined
            'Parameter26.Name'?: string | undefined
            'Parameter26.Value'?: string | undefined
            'Parameter27.Name'?: string | undefined
            'Parameter27.Value'?: string | undefined
            'Parameter28.Name'?: string | undefined
            'Parameter28.Value'?: string | undefined
            'Parameter29.Name'?: string | undefined
            'Parameter29.Value'?: string | undefined
            'Parameter30.Name'?: string | undefined
            'Parameter30.Value'?: string | undefined
            'Parameter31.Name'?: string | undefined
            'Parameter31.Value'?: string | undefined
            'Parameter32.Name'?: string | undefined
            'Parameter32.Value'?: string | undefined
            'Parameter33.Name'?: string | undefined
            'Parameter33.Value'?: string | undefined
            'Parameter34.Name'?: string | undefined
            'Parameter34.Value'?: string | undefined
            'Parameter35.Name'?: string | undefined
            'Parameter35.Value'?: string | undefined
            'Parameter36.Name'?: string | undefined
            'Parameter36.Value'?: string | undefined
            'Parameter37.Name'?: string | undefined
            'Parameter37.Value'?: string | undefined
            'Parameter38.Name'?: string | undefined
            'Parameter38.Value'?: string | undefined
            'Parameter39.Name'?: string | undefined
            'Parameter39.Value'?: string | undefined
            'Parameter40.Name'?: string | undefined
            'Parameter40.Value'?: string | undefined
            'Parameter41.Name'?: string | undefined
            'Parameter41.Value'?: string | undefined
            'Parameter42.Name'?: string | undefined
            'Parameter42.Value'?: string | undefined
            'Parameter43.Name'?: string | undefined
            'Parameter43.Value'?: string | undefined
            'Parameter44.Name'?: string | undefined
            'Parameter44.Value'?: string | undefined
            'Parameter45.Name'?: string | undefined
            'Parameter45.Value'?: string | undefined
            'Parameter46.Name'?: string | undefined
            'Parameter46.Value'?: string | undefined
            'Parameter47.Name'?: string | undefined
            'Parameter47.Value'?: string | undefined
            'Parameter48.Name'?: string | undefined
            'Parameter48.Value'?: string | undefined
            'Parameter49.Name'?: string | undefined
            'Parameter49.Value'?: string | undefined
            'Parameter50.Name'?: string | undefined
            'Parameter50.Value'?: string | undefined
            'Parameter51.Name'?: string | undefined
            'Parameter51.Value'?: string | undefined
            'Parameter52.Name'?: string | undefined
            'Parameter52.Value'?: string | undefined
            'Parameter53.Name'?: string | undefined
            'Parameter53.Value'?: string | undefined
            'Parameter54.Name'?: string | undefined
            'Parameter54.Value'?: string | undefined
            'Parameter55.Name'?: string | undefined
            'Parameter55.Value'?: string | undefined
            'Parameter56.Name'?: string | undefined
            'Parameter56.Value'?: string | undefined
            'Parameter57.Name'?: string | undefined
            'Parameter57.Value'?: string | undefined
            'Parameter58.Name'?: string | undefined
            'Parameter58.Value'?: string | undefined
            'Parameter59.Name'?: string | undefined
            'Parameter59.Value'?: string | undefined
            'Parameter60.Name'?: string | undefined
            'Parameter60.Value'?: string | undefined
            'Parameter61.Name'?: string | undefined
            'Parameter61.Value'?: string | undefined
            'Parameter62.Name'?: string | undefined
            'Parameter62.Value'?: string | undefined
            'Parameter63.Name'?: string | undefined
            'Parameter63.Value'?: string | undefined
            'Parameter64.Name'?: string | undefined
            'Parameter64.Value'?: string | undefined
            'Parameter65.Name'?: string | undefined
            'Parameter65.Value'?: string | undefined
            'Parameter66.Name'?: string | undefined
            'Parameter66.Value'?: string | undefined
            'Parameter67.Name'?: string | undefined
            'Parameter67.Value'?: string | undefined
            'Parameter68.Name'?: string | undefined
            'Parameter68.Value'?: string | undefined
            'Parameter69.Name'?: string | undefined
            'Parameter69.Value'?: string | undefined
            'Parameter70.Name'?: string | undefined
            'Parameter70.Value'?: string | undefined
            'Parameter71.Name'?: string | undefined
            'Parameter71.Value'?: string | undefined
            'Parameter72.Name'?: string | undefined
            'Parameter72.Value'?: string | undefined
            'Parameter73.Name'?: string | undefined
            'Parameter73.Value'?: string | undefined
            'Parameter74.Name'?: string | undefined
            'Parameter74.Value'?: string | undefined
            'Parameter75.Name'?: string | undefined
            'Parameter75.Value'?: string | undefined
            'Parameter76.Name'?: string | undefined
            'Parameter76.Value'?: string | undefined
            'Parameter77.Name'?: string | undefined
            'Parameter77.Value'?: string | undefined
            'Parameter78.Name'?: string | undefined
            'Parameter78.Value'?: string | undefined
            'Parameter79.Name'?: string | undefined
            'Parameter79.Value'?: string | undefined
            'Parameter80.Name'?: string | undefined
            'Parameter80.Value'?: string | undefined
            'Parameter81.Name'?: string | undefined
            'Parameter81.Value'?: string | undefined
            'Parameter82.Name'?: string | undefined
            'Parameter82.Value'?: string | undefined
            'Parameter83.Name'?: string | undefined
            'Parameter83.Value'?: string | undefined
            'Parameter84.Name'?: string | undefined
            'Parameter84.Value'?: string | undefined
            'Parameter85.Name'?: string | undefined
            'Parameter85.Value'?: string | undefined
            'Parameter86.Name'?: string | undefined
            'Parameter86.Value'?: string | undefined
            'Parameter87.Name'?: string | undefined
            'Parameter87.Value'?: string | undefined
            'Parameter88.Name'?: string | undefined
            'Parameter88.Value'?: string | undefined
            'Parameter89.Name'?: string | undefined
            'Parameter89.Value'?: string | undefined
            'Parameter90.Name'?: string | undefined
            'Parameter90.Value'?: string | undefined
            'Parameter91.Name'?: string | undefined
            'Parameter91.Value'?: string | undefined
            'Parameter92.Name'?: string | undefined
            'Parameter92.Value'?: string | undefined
            'Parameter93.Name'?: string | undefined
            'Parameter93.Value'?: string | undefined
            'Parameter94.Name'?: string | undefined
            'Parameter94.Value'?: string | undefined
            'Parameter95.Name'?: string | undefined
            'Parameter95.Value'?: string | undefined
            'Parameter96.Name'?: string | undefined
            'Parameter96.Value'?: string | undefined
            'Parameter97.Name'?: string | undefined
            'Parameter97.Value'?: string | undefined
            'Parameter98.Name'?: string | undefined
            'Parameter98.Value'?: string | undefined
            'Parameter99.Name'?: string | undefined
            'Parameter99.Value'?: string | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Siprec/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } } & {
          json: { Status: 'stopped' }
        } & { form: { Status: 'stopped' } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: {
            Url: string
            Name?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            'Parameter1.Name'?: string | undefined
            'Parameter1.Value'?: string | undefined
            'Parameter2.Name'?: string | undefined
            'Parameter2.Value'?: string | undefined
            'Parameter3.Name'?: string | undefined
            'Parameter3.Value'?: string | undefined
            'Parameter4.Name'?: string | undefined
            'Parameter4.Value'?: string | undefined
            'Parameter5.Name'?: string | undefined
            'Parameter5.Value'?: string | undefined
            'Parameter6.Name'?: string | undefined
            'Parameter6.Value'?: string | undefined
            'Parameter7.Name'?: string | undefined
            'Parameter7.Value'?: string | undefined
            'Parameter8.Name'?: string | undefined
            'Parameter8.Value'?: string | undefined
            'Parameter9.Name'?: string | undefined
            'Parameter9.Value'?: string | undefined
            'Parameter10.Name'?: string | undefined
            'Parameter10.Value'?: string | undefined
            'Parameter11.Name'?: string | undefined
            'Parameter11.Value'?: string | undefined
            'Parameter12.Name'?: string | undefined
            'Parameter12.Value'?: string | undefined
            'Parameter13.Name'?: string | undefined
            'Parameter13.Value'?: string | undefined
            'Parameter14.Name'?: string | undefined
            'Parameter14.Value'?: string | undefined
            'Parameter15.Name'?: string | undefined
            'Parameter15.Value'?: string | undefined
            'Parameter16.Name'?: string | undefined
            'Parameter16.Value'?: string | undefined
            'Parameter17.Name'?: string | undefined
            'Parameter17.Value'?: string | undefined
            'Parameter18.Name'?: string | undefined
            'Parameter18.Value'?: string | undefined
            'Parameter19.Name'?: string | undefined
            'Parameter19.Value'?: string | undefined
            'Parameter20.Name'?: string | undefined
            'Parameter20.Value'?: string | undefined
            'Parameter21.Name'?: string | undefined
            'Parameter21.Value'?: string | undefined
            'Parameter22.Name'?: string | undefined
            'Parameter22.Value'?: string | undefined
            'Parameter23.Name'?: string | undefined
            'Parameter23.Value'?: string | undefined
            'Parameter24.Name'?: string | undefined
            'Parameter24.Value'?: string | undefined
            'Parameter25.Name'?: string | undefined
            'Parameter25.Value'?: string | undefined
            'Parameter26.Name'?: string | undefined
            'Parameter26.Value'?: string | undefined
            'Parameter27.Name'?: string | undefined
            'Parameter27.Value'?: string | undefined
            'Parameter28.Name'?: string | undefined
            'Parameter28.Value'?: string | undefined
            'Parameter29.Name'?: string | undefined
            'Parameter29.Value'?: string | undefined
            'Parameter30.Name'?: string | undefined
            'Parameter30.Value'?: string | undefined
            'Parameter31.Name'?: string | undefined
            'Parameter31.Value'?: string | undefined
            'Parameter32.Name'?: string | undefined
            'Parameter32.Value'?: string | undefined
            'Parameter33.Name'?: string | undefined
            'Parameter33.Value'?: string | undefined
            'Parameter34.Name'?: string | undefined
            'Parameter34.Value'?: string | undefined
            'Parameter35.Name'?: string | undefined
            'Parameter35.Value'?: string | undefined
            'Parameter36.Name'?: string | undefined
            'Parameter36.Value'?: string | undefined
            'Parameter37.Name'?: string | undefined
            'Parameter37.Value'?: string | undefined
            'Parameter38.Name'?: string | undefined
            'Parameter38.Value'?: string | undefined
            'Parameter39.Name'?: string | undefined
            'Parameter39.Value'?: string | undefined
            'Parameter40.Name'?: string | undefined
            'Parameter40.Value'?: string | undefined
            'Parameter41.Name'?: string | undefined
            'Parameter41.Value'?: string | undefined
            'Parameter42.Name'?: string | undefined
            'Parameter42.Value'?: string | undefined
            'Parameter43.Name'?: string | undefined
            'Parameter43.Value'?: string | undefined
            'Parameter44.Name'?: string | undefined
            'Parameter44.Value'?: string | undefined
            'Parameter45.Name'?: string | undefined
            'Parameter45.Value'?: string | undefined
            'Parameter46.Name'?: string | undefined
            'Parameter46.Value'?: string | undefined
            'Parameter47.Name'?: string | undefined
            'Parameter47.Value'?: string | undefined
            'Parameter48.Name'?: string | undefined
            'Parameter48.Value'?: string | undefined
            'Parameter49.Name'?: string | undefined
            'Parameter49.Value'?: string | undefined
            'Parameter50.Name'?: string | undefined
            'Parameter50.Value'?: string | undefined
            'Parameter51.Name'?: string | undefined
            'Parameter51.Value'?: string | undefined
            'Parameter52.Name'?: string | undefined
            'Parameter52.Value'?: string | undefined
            'Parameter53.Name'?: string | undefined
            'Parameter53.Value'?: string | undefined
            'Parameter54.Name'?: string | undefined
            'Parameter54.Value'?: string | undefined
            'Parameter55.Name'?: string | undefined
            'Parameter55.Value'?: string | undefined
            'Parameter56.Name'?: string | undefined
            'Parameter56.Value'?: string | undefined
            'Parameter57.Name'?: string | undefined
            'Parameter57.Value'?: string | undefined
            'Parameter58.Name'?: string | undefined
            'Parameter58.Value'?: string | undefined
            'Parameter59.Name'?: string | undefined
            'Parameter59.Value'?: string | undefined
            'Parameter60.Name'?: string | undefined
            'Parameter60.Value'?: string | undefined
            'Parameter61.Name'?: string | undefined
            'Parameter61.Value'?: string | undefined
            'Parameter62.Name'?: string | undefined
            'Parameter62.Value'?: string | undefined
            'Parameter63.Name'?: string | undefined
            'Parameter63.Value'?: string | undefined
            'Parameter64.Name'?: string | undefined
            'Parameter64.Value'?: string | undefined
            'Parameter65.Name'?: string | undefined
            'Parameter65.Value'?: string | undefined
            'Parameter66.Name'?: string | undefined
            'Parameter66.Value'?: string | undefined
            'Parameter67.Name'?: string | undefined
            'Parameter67.Value'?: string | undefined
            'Parameter68.Name'?: string | undefined
            'Parameter68.Value'?: string | undefined
            'Parameter69.Name'?: string | undefined
            'Parameter69.Value'?: string | undefined
            'Parameter70.Name'?: string | undefined
            'Parameter70.Value'?: string | undefined
            'Parameter71.Name'?: string | undefined
            'Parameter71.Value'?: string | undefined
            'Parameter72.Name'?: string | undefined
            'Parameter72.Value'?: string | undefined
            'Parameter73.Name'?: string | undefined
            'Parameter73.Value'?: string | undefined
            'Parameter74.Name'?: string | undefined
            'Parameter74.Value'?: string | undefined
            'Parameter75.Name'?: string | undefined
            'Parameter75.Value'?: string | undefined
            'Parameter76.Name'?: string | undefined
            'Parameter76.Value'?: string | undefined
            'Parameter77.Name'?: string | undefined
            'Parameter77.Value'?: string | undefined
            'Parameter78.Name'?: string | undefined
            'Parameter78.Value'?: string | undefined
            'Parameter79.Name'?: string | undefined
            'Parameter79.Value'?: string | undefined
            'Parameter80.Name'?: string | undefined
            'Parameter80.Value'?: string | undefined
            'Parameter81.Name'?: string | undefined
            'Parameter81.Value'?: string | undefined
            'Parameter82.Name'?: string | undefined
            'Parameter82.Value'?: string | undefined
            'Parameter83.Name'?: string | undefined
            'Parameter83.Value'?: string | undefined
            'Parameter84.Name'?: string | undefined
            'Parameter84.Value'?: string | undefined
            'Parameter85.Name'?: string | undefined
            'Parameter85.Value'?: string | undefined
            'Parameter86.Name'?: string | undefined
            'Parameter86.Value'?: string | undefined
            'Parameter87.Name'?: string | undefined
            'Parameter87.Value'?: string | undefined
            'Parameter88.Name'?: string | undefined
            'Parameter88.Value'?: string | undefined
            'Parameter89.Name'?: string | undefined
            'Parameter89.Value'?: string | undefined
            'Parameter90.Name'?: string | undefined
            'Parameter90.Value'?: string | undefined
            'Parameter91.Name'?: string | undefined
            'Parameter91.Value'?: string | undefined
            'Parameter92.Name'?: string | undefined
            'Parameter92.Value'?: string | undefined
            'Parameter93.Name'?: string | undefined
            'Parameter93.Value'?: string | undefined
            'Parameter94.Name'?: string | undefined
            'Parameter94.Value'?: string | undefined
            'Parameter95.Name'?: string | undefined
            'Parameter95.Value'?: string | undefined
            'Parameter96.Name'?: string | undefined
            'Parameter96.Value'?: string | undefined
            'Parameter97.Name'?: string | undefined
            'Parameter97.Value'?: string | undefined
            'Parameter98.Name'?: string | undefined
            'Parameter98.Value'?: string | undefined
            'Parameter99.Name'?: string | undefined
            'Parameter99.Value'?: string | undefined
          }
        } & {
          form: {
            Url: string
            Name?: string | undefined
            Track?: 'inbound_track' | 'outbound_track' | 'both_tracks' | undefined
            StatusCallback?: string | undefined
            StatusCallbackMethod?: 'GET' | 'POST' | undefined
            'Parameter1.Name'?: string | undefined
            'Parameter1.Value'?: string | undefined
            'Parameter2.Name'?: string | undefined
            'Parameter2.Value'?: string | undefined
            'Parameter3.Name'?: string | undefined
            'Parameter3.Value'?: string | undefined
            'Parameter4.Name'?: string | undefined
            'Parameter4.Value'?: string | undefined
            'Parameter5.Name'?: string | undefined
            'Parameter5.Value'?: string | undefined
            'Parameter6.Name'?: string | undefined
            'Parameter6.Value'?: string | undefined
            'Parameter7.Name'?: string | undefined
            'Parameter7.Value'?: string | undefined
            'Parameter8.Name'?: string | undefined
            'Parameter8.Value'?: string | undefined
            'Parameter9.Name'?: string | undefined
            'Parameter9.Value'?: string | undefined
            'Parameter10.Name'?: string | undefined
            'Parameter10.Value'?: string | undefined
            'Parameter11.Name'?: string | undefined
            'Parameter11.Value'?: string | undefined
            'Parameter12.Name'?: string | undefined
            'Parameter12.Value'?: string | undefined
            'Parameter13.Name'?: string | undefined
            'Parameter13.Value'?: string | undefined
            'Parameter14.Name'?: string | undefined
            'Parameter14.Value'?: string | undefined
            'Parameter15.Name'?: string | undefined
            'Parameter15.Value'?: string | undefined
            'Parameter16.Name'?: string | undefined
            'Parameter16.Value'?: string | undefined
            'Parameter17.Name'?: string | undefined
            'Parameter17.Value'?: string | undefined
            'Parameter18.Name'?: string | undefined
            'Parameter18.Value'?: string | undefined
            'Parameter19.Name'?: string | undefined
            'Parameter19.Value'?: string | undefined
            'Parameter20.Name'?: string | undefined
            'Parameter20.Value'?: string | undefined
            'Parameter21.Name'?: string | undefined
            'Parameter21.Value'?: string | undefined
            'Parameter22.Name'?: string | undefined
            'Parameter22.Value'?: string | undefined
            'Parameter23.Name'?: string | undefined
            'Parameter23.Value'?: string | undefined
            'Parameter24.Name'?: string | undefined
            'Parameter24.Value'?: string | undefined
            'Parameter25.Name'?: string | undefined
            'Parameter25.Value'?: string | undefined
            'Parameter26.Name'?: string | undefined
            'Parameter26.Value'?: string | undefined
            'Parameter27.Name'?: string | undefined
            'Parameter27.Value'?: string | undefined
            'Parameter28.Name'?: string | undefined
            'Parameter28.Value'?: string | undefined
            'Parameter29.Name'?: string | undefined
            'Parameter29.Value'?: string | undefined
            'Parameter30.Name'?: string | undefined
            'Parameter30.Value'?: string | undefined
            'Parameter31.Name'?: string | undefined
            'Parameter31.Value'?: string | undefined
            'Parameter32.Name'?: string | undefined
            'Parameter32.Value'?: string | undefined
            'Parameter33.Name'?: string | undefined
            'Parameter33.Value'?: string | undefined
            'Parameter34.Name'?: string | undefined
            'Parameter34.Value'?: string | undefined
            'Parameter35.Name'?: string | undefined
            'Parameter35.Value'?: string | undefined
            'Parameter36.Name'?: string | undefined
            'Parameter36.Value'?: string | undefined
            'Parameter37.Name'?: string | undefined
            'Parameter37.Value'?: string | undefined
            'Parameter38.Name'?: string | undefined
            'Parameter38.Value'?: string | undefined
            'Parameter39.Name'?: string | undefined
            'Parameter39.Value'?: string | undefined
            'Parameter40.Name'?: string | undefined
            'Parameter40.Value'?: string | undefined
            'Parameter41.Name'?: string | undefined
            'Parameter41.Value'?: string | undefined
            'Parameter42.Name'?: string | undefined
            'Parameter42.Value'?: string | undefined
            'Parameter43.Name'?: string | undefined
            'Parameter43.Value'?: string | undefined
            'Parameter44.Name'?: string | undefined
            'Parameter44.Value'?: string | undefined
            'Parameter45.Name'?: string | undefined
            'Parameter45.Value'?: string | undefined
            'Parameter46.Name'?: string | undefined
            'Parameter46.Value'?: string | undefined
            'Parameter47.Name'?: string | undefined
            'Parameter47.Value'?: string | undefined
            'Parameter48.Name'?: string | undefined
            'Parameter48.Value'?: string | undefined
            'Parameter49.Name'?: string | undefined
            'Parameter49.Value'?: string | undefined
            'Parameter50.Name'?: string | undefined
            'Parameter50.Value'?: string | undefined
            'Parameter51.Name'?: string | undefined
            'Parameter51.Value'?: string | undefined
            'Parameter52.Name'?: string | undefined
            'Parameter52.Value'?: string | undefined
            'Parameter53.Name'?: string | undefined
            'Parameter53.Value'?: string | undefined
            'Parameter54.Name'?: string | undefined
            'Parameter54.Value'?: string | undefined
            'Parameter55.Name'?: string | undefined
            'Parameter55.Value'?: string | undefined
            'Parameter56.Name'?: string | undefined
            'Parameter56.Value'?: string | undefined
            'Parameter57.Name'?: string | undefined
            'Parameter57.Value'?: string | undefined
            'Parameter58.Name'?: string | undefined
            'Parameter58.Value'?: string | undefined
            'Parameter59.Name'?: string | undefined
            'Parameter59.Value'?: string | undefined
            'Parameter60.Name'?: string | undefined
            'Parameter60.Value'?: string | undefined
            'Parameter61.Name'?: string | undefined
            'Parameter61.Value'?: string | undefined
            'Parameter62.Name'?: string | undefined
            'Parameter62.Value'?: string | undefined
            'Parameter63.Name'?: string | undefined
            'Parameter63.Value'?: string | undefined
            'Parameter64.Name'?: string | undefined
            'Parameter64.Value'?: string | undefined
            'Parameter65.Name'?: string | undefined
            'Parameter65.Value'?: string | undefined
            'Parameter66.Name'?: string | undefined
            'Parameter66.Value'?: string | undefined
            'Parameter67.Name'?: string | undefined
            'Parameter67.Value'?: string | undefined
            'Parameter68.Name'?: string | undefined
            'Parameter68.Value'?: string | undefined
            'Parameter69.Name'?: string | undefined
            'Parameter69.Value'?: string | undefined
            'Parameter70.Name'?: string | undefined
            'Parameter70.Value'?: string | undefined
            'Parameter71.Name'?: string | undefined
            'Parameter71.Value'?: string | undefined
            'Parameter72.Name'?: string | undefined
            'Parameter72.Value'?: string | undefined
            'Parameter73.Name'?: string | undefined
            'Parameter73.Value'?: string | undefined
            'Parameter74.Name'?: string | undefined
            'Parameter74.Value'?: string | undefined
            'Parameter75.Name'?: string | undefined
            'Parameter75.Value'?: string | undefined
            'Parameter76.Name'?: string | undefined
            'Parameter76.Value'?: string | undefined
            'Parameter77.Name'?: string | undefined
            'Parameter77.Value'?: string | undefined
            'Parameter78.Name'?: string | undefined
            'Parameter78.Value'?: string | undefined
            'Parameter79.Name'?: string | undefined
            'Parameter79.Value'?: string | undefined
            'Parameter80.Name'?: string | undefined
            'Parameter80.Value'?: string | undefined
            'Parameter81.Name'?: string | undefined
            'Parameter81.Value'?: string | undefined
            'Parameter82.Name'?: string | undefined
            'Parameter82.Value'?: string | undefined
            'Parameter83.Name'?: string | undefined
            'Parameter83.Value'?: string | undefined
            'Parameter84.Name'?: string | undefined
            'Parameter84.Value'?: string | undefined
            'Parameter85.Name'?: string | undefined
            'Parameter85.Value'?: string | undefined
            'Parameter86.Name'?: string | undefined
            'Parameter86.Value'?: string | undefined
            'Parameter87.Name'?: string | undefined
            'Parameter87.Value'?: string | undefined
            'Parameter88.Name'?: string | undefined
            'Parameter88.Value'?: string | undefined
            'Parameter89.Name'?: string | undefined
            'Parameter89.Value'?: string | undefined
            'Parameter90.Name'?: string | undefined
            'Parameter90.Value'?: string | undefined
            'Parameter91.Name'?: string | undefined
            'Parameter91.Value'?: string | undefined
            'Parameter92.Name'?: string | undefined
            'Parameter92.Value'?: string | undefined
            'Parameter93.Name'?: string | undefined
            'Parameter93.Value'?: string | undefined
            'Parameter94.Name'?: string | undefined
            'Parameter94.Value'?: string | undefined
            'Parameter95.Name'?: string | undefined
            'Parameter95.Value'?: string | undefined
            'Parameter96.Name'?: string | undefined
            'Parameter96.Value'?: string | undefined
            'Parameter97.Name'?: string | undefined
            'Parameter97.Value'?: string | undefined
            'Parameter98.Name'?: string | undefined
            'Parameter98.Value'?: string | undefined
            'Parameter99.Name'?: string | undefined
            'Parameter99.Value'?: string | undefined
          }
        }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/Streams/:Sid.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } } & {
          json: { Status: 'stopped' }
        } & { form: { Status: 'stopped' } }
        output: {
          sid?: (string | null) | undefined
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          name?: (string | null) | undefined
          status?: 'in-progress' | 'stopped' | undefined
          date_updated?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Tokens.json': {
      $post: {
        input: { param: { AccountSid: string } } & { json: { Ttl?: number | undefined } } & {
          form: { Ttl?: number | undefined }
        }
        output: {
          account_sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          ice_servers?:
            | (
                | {
                    credential?: string | undefined
                    username?: string | undefined
                    url?: string | undefined
                    urls?: string | undefined
                  }[]
                | null
              )
            | undefined
          password?: (string | null) | undefined
          ttl?: (string | null) | undefined
          username?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Transcriptions/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          duration?: (string | null) | undefined
          price?: (number | null) | undefined
          price_unit?: (string | null) | undefined
          recording_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          status?: 'in-progress' | 'completed' | 'failed' | undefined
          transcription_text?: (string | null) | undefined
          type?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Transcriptions.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          transcriptions?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                duration?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                recording_sid?: (string | null) | undefined
                sid?: (string | null) | undefined
                status?: 'in-progress' | 'completed' | 'failed' | undefined
                transcription_text?: (string | null) | undefined
                type?: (string | null) | undefined
                uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/AllTime.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Daily.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/LastMonth.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Monthly.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/ThisMonth.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Today.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yearly.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Records/Yesterday.json': {
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Category?: string | undefined
            StartDate?: string | undefined
            EndDate?: string | undefined
            IncludeSubaccounts?: boolean | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_records?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                as_of?: (string | null) | undefined
                category?: (string | null) | undefined
                count?: (string | null) | undefined
                count_unit?: (string | null) | undefined
                description?: (string | null) | undefined
                end_date?: (string | null) | undefined
                price?: (number | null) | undefined
                price_unit?: (string | null) | undefined
                start_date?: (string | null) | undefined
                subresource_uris?: ({ [x: string]: unknown } | null) | undefined
                uri?: (string | null) | undefined
                usage?: (string | null) | undefined
                usage_unit?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers/:Sid.json': {
      $get: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          callback_method?: 'GET' | 'POST' | undefined
          callback_url?: (string | null) | undefined
          current_value?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_fired?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
          sid?: (string | null) | undefined
          trigger_by?: 'count' | 'usage' | 'price' | undefined
          trigger_value?: (string | null) | undefined
          uri?: (string | null) | undefined
          usage_category?: (string | null) | undefined
          usage_record_uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $post: {
        input: { param: { AccountSid: string; Sid: string } } & {
          json: {
            CallbackMethod?: 'GET' | 'POST' | undefined
            CallbackUrl?: string | undefined
            FriendlyName?: string | undefined
          }
        } & {
          form: {
            CallbackMethod?: 'GET' | 'POST' | undefined
            CallbackUrl?: string | undefined
            FriendlyName?: string | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          callback_method?: 'GET' | 'POST' | undefined
          callback_url?: (string | null) | undefined
          current_value?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_fired?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
          sid?: (string | null) | undefined
          trigger_by?: 'count' | 'usage' | 'price' | undefined
          trigger_value?: (string | null) | undefined
          uri?: (string | null) | undefined
          usage_category?: (string | null) | undefined
          usage_record_uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 200
      }
      $delete: {
        input: { param: { AccountSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Usage/Triggers.json': {
      $post: {
        input: { param: { AccountSid: string } } & {
          json: {
            CallbackUrl: string
            TriggerValue: string
            UsageCategory: string
            CallbackMethod?: 'GET' | 'POST' | undefined
            FriendlyName?: string | undefined
            Recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
            TriggerBy?: 'count' | 'usage' | 'price' | undefined
          }
        } & {
          form: {
            CallbackUrl: string
            TriggerValue: string
            UsageCategory: string
            CallbackMethod?: 'GET' | 'POST' | undefined
            FriendlyName?: string | undefined
            Recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
            TriggerBy?: 'count' | 'usage' | 'price' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          api_version?: (string | null) | undefined
          callback_method?: 'GET' | 'POST' | undefined
          callback_url?: (string | null) | undefined
          current_value?: (string | null) | undefined
          date_created?: (string | null) | undefined
          date_fired?: (string | null) | undefined
          date_updated?: (string | null) | undefined
          friendly_name?: (string | null) | undefined
          recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
          sid?: (string | null) | undefined
          trigger_by?: 'count' | 'usage' | 'price' | undefined
          trigger_value?: (string | null) | undefined
          uri?: (string | null) | undefined
          usage_category?: (string | null) | undefined
          usage_record_uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
      $get: {
        input: { param: { AccountSid: string } } & {
          query: {
            Recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
            TriggerBy?: 'count' | 'usage' | 'price' | undefined
            UsageCategory?: string | undefined
            PageSize?: bigint | undefined
            Page?: number | undefined
            PageToken?: string | undefined
          }
        }
        output: {
          usage_triggers?:
            | {
                account_sid?: (string | null) | undefined
                api_version?: (string | null) | undefined
                callback_method?: 'GET' | 'POST' | undefined
                callback_url?: (string | null) | undefined
                current_value?: (string | null) | undefined
                date_created?: (string | null) | undefined
                date_fired?: (string | null) | undefined
                date_updated?: (string | null) | undefined
                friendly_name?: (string | null) | undefined
                recurring?: 'daily' | 'monthly' | 'yearly' | 'alltime' | undefined
                sid?: (string | null) | undefined
                trigger_by?: 'count' | 'usage' | 'price' | undefined
                trigger_value?: (string | null) | undefined
                uri?: (string | null) | undefined
                usage_category?: (string | null) | undefined
                usage_record_uri?: (string | null) | undefined
              }[]
            | undefined
          end?: number | undefined
          first_page_uri?: string | undefined
          next_page_uri?: (string | null) | undefined
          page?: number | undefined
          page_size?: number | undefined
          previous_page_uri?: (string | null) | undefined
          start?: number | undefined
          uri?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessages.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: { Content: string; IdempotencyKey?: string | undefined }
        } & { form: { Content: string; IdempotencyKey?: string | undefined } }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions.json': {
      $post: {
        input: { param: { AccountSid: string; CallSid: string } } & {
          json: {
            Callback: string
            IdempotencyKey?: string | undefined
            Method?: 'GET' | 'POST' | undefined
          }
        } & {
          form: {
            Callback: string
            IdempotencyKey?: string | undefined
            Method?: 'GET' | 'POST' | undefined
          }
        }
        output: {
          account_sid?: (string | null) | undefined
          call_sid?: (string | null) | undefined
          sid?: (string | null) | undefined
          date_created?: (string | null) | undefined
          uri?: (string | null) | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/2010-04-01/Accounts/:AccountSid/Calls/:CallSid/UserDefinedMessageSubscriptions/:Sid.json': {
      $delete: {
        input: { param: { AccountSid: string; CallSid: string; Sid: string } }
        output: {}
        outputFormat: string
        status: 204
      }
    }
  },
  '/'
>
export default routes
