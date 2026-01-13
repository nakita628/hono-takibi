declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/organizations/:orgId/departments/:deptId/teams/:teamId/members': {
      $get:
        | {
            input: { param: { orgId: string; deptId: string; teamId: string } }
            output: {
              employee: {
                id: string
                personalInfo: {
                  firstName: string
                  lastName: string
                  email: string
                  phone?:
                    | { countryCode: string; number: string; extension?: string | undefined }
                    | undefined
                  address?:
                    | {
                        street?: string | undefined
                        city?: string | undefined
                        state?: string | undefined
                        postalCode?: string | undefined
                        country?: { code: string; name: string } | undefined
                        coordinates?: { latitude: number; longitude: number } | undefined
                      }
                    | undefined
                  emergencyContact?:
                    | {
                        name: string
                        relationship: string
                        phone: {
                          countryCode: string
                          number: string
                          extension?: string | undefined
                        }
                        address?:
                          | {
                              street?: string | undefined
                              city?: string | undefined
                              state?: string | undefined
                              postalCode?: string | undefined
                              country?: { code: string; name: string } | undefined
                              coordinates?: { latitude: number; longitude: number } | undefined
                            }
                          | undefined
                      }
                    | undefined
                }
                employmentInfo: {
                  startDate: string
                  endDate?: string | undefined
                  status: 'active' | 'on_leave' | 'terminated' | 'retired'
                  position: {
                    title: string
                    level: { code: string; name: string; rank: number }
                    department?: string | undefined
                  }
                  compensation?:
                    | {
                        salary?:
                          | {
                              amount: number
                              currency: { code: string; symbol?: string | undefined }
                            }
                          | undefined
                        bonus?:
                          | {
                              amount: number
                              currency: { code: string; symbol?: string | undefined }
                            }
                          | undefined
                        equity?:
                          | {
                              shares?: number | undefined
                              vestingSchedule?:
                                | {
                                    cliff?:
                                      | {
                                          value: number
                                          unit: 'days' | 'weeks' | 'months' | 'years'
                                        }
                                      | undefined
                                    totalPeriod?:
                                      | {
                                          value: number
                                          unit: 'days' | 'weeks' | 'months' | 'years'
                                        }
                                      | undefined
                                    frequency?: 'monthly' | 'quarterly' | 'annually' | undefined
                                  }
                                | undefined
                              grantDate?: string | undefined
                            }
                          | undefined
                        benefits?:
                          | {
                              type: 'health' | 'dental' | 'vision' | 'life' | 'retirement'
                              provider: {
                                name: string
                                contact?:
                                  | {
                                      email?: string | undefined
                                      phone?:
                                        | {
                                            countryCode: string
                                            number: string
                                            extension?: string | undefined
                                          }
                                        | undefined
                                      website?: string | undefined
                                      socialMedia?:
                                        | {
                                            platform:
                                              | 'linkedin'
                                              | 'twitter'
                                              | 'facebook'
                                              | 'instagram'
                                            url: string
                                          }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                              coverage?:
                                | {
                                    level?: 'individual' | 'family' | undefined
                                    deductible?:
                                      | {
                                          amount: number
                                          currency: { code: string; symbol?: string | undefined }
                                        }
                                      | undefined
                                    maxBenefit?:
                                      | {
                                          amount: number
                                          currency: { code: string; symbol?: string | undefined }
                                        }
                                      | undefined
                                  }
                                | undefined
                            }[]
                          | undefined
                      }
                    | undefined
                }
                skills?:
                  | {
                      name: string
                      proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                      yearsOfExperience?: number | undefined
                    }[]
                  | undefined
                certifications?:
                  | {
                      name: string
                      issuer: { name: string; website?: string | undefined }
                      issuedDate?: string | undefined
                      expiryDate?: string | undefined
                      credentialId?: string | undefined
                    }[]
                  | undefined
              }
              role: {
                name: string
                permissions: {
                  resource: string
                  actions: ('read' | 'write' | 'delete' | 'admin')[]
                }[]
              }
              joinedAt?: string | undefined
              allocation?:
                | {
                    percentage: number
                    effectiveFrom?: string | undefined
                    effectiveTo?: string | undefined
                  }
                | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { orgId: string; deptId: string; teamId: string } }
            output: { error?: string | undefined; path?: string | undefined }
            outputFormat: 'json'
            status: 404
          }
      $post: {
        input: { param: { orgId: string; deptId: string; teamId: string } } & {
          json: {
            employeeId: string
            role: {
              name: string
              permissions: {
                resource: string
                actions: ('read' | 'write' | 'delete' | 'admin')[]
              }[]
            }
            allocation?:
              | {
                  percentage: number
                  effectiveFrom?: string | undefined
                  effectiveTo?: string | undefined
                }
              | undefined
          }
        }
        output: {
          employee: {
            id: string
            personalInfo: {
              firstName: string
              lastName: string
              email: string
              phone?:
                | { countryCode: string; number: string; extension?: string | undefined }
                | undefined
              address?:
                | {
                    street?: string | undefined
                    city?: string | undefined
                    state?: string | undefined
                    postalCode?: string | undefined
                    country?: { code: string; name: string } | undefined
                    coordinates?: { latitude: number; longitude: number } | undefined
                  }
                | undefined
              emergencyContact?:
                | {
                    name: string
                    relationship: string
                    phone: { countryCode: string; number: string; extension?: string | undefined }
                    address?:
                      | {
                          street?: string | undefined
                          city?: string | undefined
                          state?: string | undefined
                          postalCode?: string | undefined
                          country?: { code: string; name: string } | undefined
                          coordinates?: { latitude: number; longitude: number } | undefined
                        }
                      | undefined
                  }
                | undefined
            }
            employmentInfo: {
              startDate: string
              endDate?: string | undefined
              status: 'active' | 'on_leave' | 'terminated' | 'retired'
              position: {
                title: string
                level: { code: string; name: string; rank: number }
                department?: string | undefined
              }
              compensation?:
                | {
                    salary?:
                      | { amount: number; currency: { code: string; symbol?: string | undefined } }
                      | undefined
                    bonus?:
                      | { amount: number; currency: { code: string; symbol?: string | undefined } }
                      | undefined
                    equity?:
                      | {
                          shares?: number | undefined
                          vestingSchedule?:
                            | {
                                cliff?:
                                  | { value: number; unit: 'days' | 'weeks' | 'months' | 'years' }
                                  | undefined
                                totalPeriod?:
                                  | { value: number; unit: 'days' | 'weeks' | 'months' | 'years' }
                                  | undefined
                                frequency?: 'monthly' | 'quarterly' | 'annually' | undefined
                              }
                            | undefined
                          grantDate?: string | undefined
                        }
                      | undefined
                    benefits?:
                      | {
                          type: 'health' | 'dental' | 'vision' | 'life' | 'retirement'
                          provider: {
                            name: string
                            contact?:
                              | {
                                  email?: string | undefined
                                  phone?:
                                    | {
                                        countryCode: string
                                        number: string
                                        extension?: string | undefined
                                      }
                                    | undefined
                                  website?: string | undefined
                                  socialMedia?:
                                    | {
                                        platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram'
                                        url: string
                                      }[]
                                    | undefined
                                }
                              | undefined
                          }
                          coverage?:
                            | {
                                level?: 'individual' | 'family' | undefined
                                deductible?:
                                  | {
                                      amount: number
                                      currency: { code: string; symbol?: string | undefined }
                                    }
                                  | undefined
                                maxBenefit?:
                                  | {
                                      amount: number
                                      currency: { code: string; symbol?: string | undefined }
                                    }
                                  | undefined
                              }
                            | undefined
                        }[]
                      | undefined
                  }
                | undefined
            }
            skills?:
              | {
                  name: string
                  proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                  yearsOfExperience?: number | undefined
                }[]
              | undefined
            certifications?:
              | {
                  name: string
                  issuer: { name: string; website?: string | undefined }
                  issuedDate?: string | undefined
                  expiryDate?: string | undefined
                  credentialId?: string | undefined
                }[]
              | undefined
          }
          role: {
            name: string
            permissions: { resource: string; actions: ('read' | 'write' | 'delete' | 'admin')[] }[]
          }
          joinedAt?: string | undefined
          allocation?:
            | {
                percentage: number
                effectiveFrom?: string | undefined
                effectiveTo?: string | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/reports/organization-summary': {
      $get: {
        input: {}
        output: {
          organization: {
            id: string
            name: string
            metadata?:
              | {
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                  createdBy?:
                    | {
                        id?: string | undefined
                        name?: string | undefined
                        email?: string | undefined
                      }
                    | undefined
                  updatedBy?:
                    | {
                        id?: string | undefined
                        name?: string | undefined
                        email?: string | undefined
                      }
                    | undefined
                  version?: number | undefined
                  tags?: { key: string; value: string }[] | undefined
                }
              | undefined
            departments: {
              id: string
              name: string
              metadata?:
                | {
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?:
                      | {
                          id?: string | undefined
                          name?: string | undefined
                          email?: string | undefined
                        }
                      | undefined
                    updatedBy?:
                      | {
                          id?: string | undefined
                          name?: string | undefined
                          email?: string | undefined
                        }
                      | undefined
                    version?: number | undefined
                    tags?: { key: string; value: string }[] | undefined
                  }
                | undefined
              teams: {
                id: string
                name: string
                metadata?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?:
                        | {
                            id?: string | undefined
                            name?: string | undefined
                            email?: string | undefined
                          }
                        | undefined
                      updatedBy?:
                        | {
                            id?: string | undefined
                            name?: string | undefined
                            email?: string | undefined
                          }
                        | undefined
                      version?: number | undefined
                      tags?: { key: string; value: string }[] | undefined
                    }
                  | undefined
                members: {
                  employee: {
                    id: string
                    personalInfo: {
                      firstName: string
                      lastName: string
                      email: string
                      phone?:
                        | { countryCode: string; number: string; extension?: string | undefined }
                        | undefined
                      address?:
                        | {
                            street?: string | undefined
                            city?: string | undefined
                            state?: string | undefined
                            postalCode?: string | undefined
                            country?: { code: string; name: string } | undefined
                            coordinates?: { latitude: number; longitude: number } | undefined
                          }
                        | undefined
                      emergencyContact?:
                        | {
                            name: string
                            relationship: string
                            phone: {
                              countryCode: string
                              number: string
                              extension?: string | undefined
                            }
                            address?:
                              | {
                                  street?: string | undefined
                                  city?: string | undefined
                                  state?: string | undefined
                                  postalCode?: string | undefined
                                  country?: { code: string; name: string } | undefined
                                  coordinates?: { latitude: number; longitude: number } | undefined
                                }
                              | undefined
                          }
                        | undefined
                    }
                    employmentInfo: {
                      startDate: string
                      endDate?: string | undefined
                      status: 'active' | 'on_leave' | 'terminated' | 'retired'
                      position: {
                        title: string
                        level: { code: string; name: string; rank: number }
                        department?: string | undefined
                      }
                      compensation?:
                        | {
                            salary?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            bonus?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            equity?:
                              | {
                                  shares?: number | undefined
                                  vestingSchedule?:
                                    | {
                                        cliff?:
                                          | {
                                              value: number
                                              unit: 'days' | 'weeks' | 'months' | 'years'
                                            }
                                          | undefined
                                        totalPeriod?:
                                          | {
                                              value: number
                                              unit: 'days' | 'weeks' | 'months' | 'years'
                                            }
                                          | undefined
                                        frequency?: 'monthly' | 'quarterly' | 'annually' | undefined
                                      }
                                    | undefined
                                  grantDate?: string | undefined
                                }
                              | undefined
                            benefits?:
                              | {
                                  type: 'health' | 'dental' | 'vision' | 'life' | 'retirement'
                                  provider: {
                                    name: string
                                    contact?:
                                      | {
                                          email?: string | undefined
                                          phone?:
                                            | {
                                                countryCode: string
                                                number: string
                                                extension?: string | undefined
                                              }
                                            | undefined
                                          website?: string | undefined
                                          socialMedia?:
                                            | {
                                                platform:
                                                  | 'linkedin'
                                                  | 'twitter'
                                                  | 'facebook'
                                                  | 'instagram'
                                                url: string
                                              }[]
                                            | undefined
                                        }
                                      | undefined
                                  }
                                  coverage?:
                                    | {
                                        level?: 'individual' | 'family' | undefined
                                        deductible?:
                                          | {
                                              amount: number
                                              currency: {
                                                code: string
                                                symbol?: string | undefined
                                              }
                                            }
                                          | undefined
                                        maxBenefit?:
                                          | {
                                              amount: number
                                              currency: {
                                                code: string
                                                symbol?: string | undefined
                                              }
                                            }
                                          | undefined
                                      }
                                    | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                    skills?:
                      | {
                          name: string
                          proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                          yearsOfExperience?: number | undefined
                        }[]
                      | undefined
                    certifications?:
                      | {
                          name: string
                          issuer: { name: string; website?: string | undefined }
                          issuedDate?: string | undefined
                          expiryDate?: string | undefined
                          credentialId?: string | undefined
                        }[]
                      | undefined
                  }
                  role: {
                    name: string
                    permissions: {
                      resource: string
                      actions: ('read' | 'write' | 'delete' | 'admin')[]
                    }[]
                  }
                  joinedAt?: string | undefined
                  allocation?:
                    | {
                        percentage: number
                        effectiveFrom?: string | undefined
                        effectiveTo?: string | undefined
                      }
                    | undefined
                }[]
                lead?:
                  | {
                      id: string
                      personalInfo: {
                        firstName: string
                        lastName: string
                        email: string
                        phone?:
                          | { countryCode: string; number: string; extension?: string | undefined }
                          | undefined
                        address?:
                          | {
                              street?: string | undefined
                              city?: string | undefined
                              state?: string | undefined
                              postalCode?: string | undefined
                              country?: { code: string; name: string } | undefined
                              coordinates?: { latitude: number; longitude: number } | undefined
                            }
                          | undefined
                        emergencyContact?:
                          | {
                              name: string
                              relationship: string
                              phone: {
                                countryCode: string
                                number: string
                                extension?: string | undefined
                              }
                              address?:
                                | {
                                    street?: string | undefined
                                    city?: string | undefined
                                    state?: string | undefined
                                    postalCode?: string | undefined
                                    country?: { code: string; name: string } | undefined
                                    coordinates?:
                                      | { latitude: number; longitude: number }
                                      | undefined
                                  }
                                | undefined
                            }
                          | undefined
                      }
                      employmentInfo: {
                        startDate: string
                        endDate?: string | undefined
                        status: 'active' | 'on_leave' | 'terminated' | 'retired'
                        position: {
                          title: string
                          level: { code: string; name: string; rank: number }
                          department?: string | undefined
                        }
                        compensation?:
                          | {
                              salary?:
                                | {
                                    amount: number
                                    currency: { code: string; symbol?: string | undefined }
                                  }
                                | undefined
                              bonus?:
                                | {
                                    amount: number
                                    currency: { code: string; symbol?: string | undefined }
                                  }
                                | undefined
                              equity?:
                                | {
                                    shares?: number | undefined
                                    vestingSchedule?:
                                      | {
                                          cliff?:
                                            | {
                                                value: number
                                                unit: 'days' | 'weeks' | 'months' | 'years'
                                              }
                                            | undefined
                                          totalPeriod?:
                                            | {
                                                value: number
                                                unit: 'days' | 'weeks' | 'months' | 'years'
                                              }
                                            | undefined
                                          frequency?:
                                            | 'monthly'
                                            | 'quarterly'
                                            | 'annually'
                                            | undefined
                                        }
                                      | undefined
                                    grantDate?: string | undefined
                                  }
                                | undefined
                              benefits?:
                                | {
                                    type: 'health' | 'dental' | 'vision' | 'life' | 'retirement'
                                    provider: {
                                      name: string
                                      contact?:
                                        | {
                                            email?: string | undefined
                                            phone?:
                                              | {
                                                  countryCode: string
                                                  number: string
                                                  extension?: string | undefined
                                                }
                                              | undefined
                                            website?: string | undefined
                                            socialMedia?:
                                              | {
                                                  platform:
                                                    | 'linkedin'
                                                    | 'twitter'
                                                    | 'facebook'
                                                    | 'instagram'
                                                  url: string
                                                }[]
                                              | undefined
                                          }
                                        | undefined
                                    }
                                    coverage?:
                                      | {
                                          level?: 'individual' | 'family' | undefined
                                          deductible?:
                                            | {
                                                amount: number
                                                currency: {
                                                  code: string
                                                  symbol?: string | undefined
                                                }
                                              }
                                            | undefined
                                          maxBenefit?:
                                            | {
                                                amount: number
                                                currency: {
                                                  code: string
                                                  symbol?: string | undefined
                                                }
                                              }
                                            | undefined
                                        }
                                      | undefined
                                  }[]
                                | undefined
                            }
                          | undefined
                      }
                      skills?:
                        | {
                            name: string
                            proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                            yearsOfExperience?: number | undefined
                          }[]
                        | undefined
                      certifications?:
                        | {
                            name: string
                            issuer: { name: string; website?: string | undefined }
                            issuedDate?: string | undefined
                            expiryDate?: string | undefined
                            credentialId?: string | undefined
                          }[]
                        | undefined
                    }
                  | undefined
                projects?:
                  | {
                      id: string
                      name: string
                      status: 'planning' | 'in_progress' | 'on_hold' | 'completed' | 'cancelled'
                      budget?:
                        | {
                            allocated?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            spent?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            remaining?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                          }
                        | undefined
                      timeline?:
                        | {
                            startDate?: string | undefined
                            endDate?: string | undefined
                            milestones?:
                              | {
                                  name: string
                                  dueDate: string
                                  status?: 'pending' | 'completed' | 'overdue' | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                      stakeholders?:
                        | {
                            employee: {
                              id: string
                              personalInfo: {
                                firstName: string
                                lastName: string
                                email: string
                                phone?:
                                  | {
                                      countryCode: string
                                      number: string
                                      extension?: string | undefined
                                    }
                                  | undefined
                                address?:
                                  | {
                                      street?: string | undefined
                                      city?: string | undefined
                                      state?: string | undefined
                                      postalCode?: string | undefined
                                      country?: { code: string; name: string } | undefined
                                      coordinates?:
                                        | { latitude: number; longitude: number }
                                        | undefined
                                    }
                                  | undefined
                                emergencyContact?:
                                  | {
                                      name: string
                                      relationship: string
                                      phone: {
                                        countryCode: string
                                        number: string
                                        extension?: string | undefined
                                      }
                                      address?:
                                        | {
                                            street?: string | undefined
                                            city?: string | undefined
                                            state?: string | undefined
                                            postalCode?: string | undefined
                                            country?: { code: string; name: string } | undefined
                                            coordinates?:
                                              | { latitude: number; longitude: number }
                                              | undefined
                                          }
                                        | undefined
                                    }
                                  | undefined
                              }
                              employmentInfo: {
                                startDate: string
                                endDate?: string | undefined
                                status: 'active' | 'on_leave' | 'terminated' | 'retired'
                                position: {
                                  title: string
                                  level: { code: string; name: string; rank: number }
                                  department?: string | undefined
                                }
                                compensation?:
                                  | {
                                      salary?:
                                        | {
                                            amount: number
                                            currency: { code: string; symbol?: string | undefined }
                                          }
                                        | undefined
                                      bonus?:
                                        | {
                                            amount: number
                                            currency: { code: string; symbol?: string | undefined }
                                          }
                                        | undefined
                                      equity?:
                                        | {
                                            shares?: number | undefined
                                            vestingSchedule?:
                                              | {
                                                  cliff?:
                                                    | {
                                                        value: number
                                                        unit: 'days' | 'weeks' | 'months' | 'years'
                                                      }
                                                    | undefined
                                                  totalPeriod?:
                                                    | {
                                                        value: number
                                                        unit: 'days' | 'weeks' | 'months' | 'years'
                                                      }
                                                    | undefined
                                                  frequency?:
                                                    | 'monthly'
                                                    | 'quarterly'
                                                    | 'annually'
                                                    | undefined
                                                }
                                              | undefined
                                            grantDate?: string | undefined
                                          }
                                        | undefined
                                      benefits?:
                                        | {
                                            type:
                                              | 'health'
                                              | 'dental'
                                              | 'vision'
                                              | 'life'
                                              | 'retirement'
                                            provider: {
                                              name: string
                                              contact?:
                                                | {
                                                    email?: string | undefined
                                                    phone?:
                                                      | {
                                                          countryCode: string
                                                          number: string
                                                          extension?: string | undefined
                                                        }
                                                      | undefined
                                                    website?: string | undefined
                                                    socialMedia?:
                                                      | {
                                                          platform:
                                                            | 'linkedin'
                                                            | 'twitter'
                                                            | 'facebook'
                                                            | 'instagram'
                                                          url: string
                                                        }[]
                                                      | undefined
                                                  }
                                                | undefined
                                            }
                                            coverage?:
                                              | {
                                                  level?: 'individual' | 'family' | undefined
                                                  deductible?:
                                                    | {
                                                        amount: number
                                                        currency: {
                                                          code: string
                                                          symbol?: string | undefined
                                                        }
                                                      }
                                                    | undefined
                                                  maxBenefit?:
                                                    | {
                                                        amount: number
                                                        currency: {
                                                          code: string
                                                          symbol?: string | undefined
                                                        }
                                                      }
                                                    | undefined
                                                }
                                              | undefined
                                          }[]
                                        | undefined
                                    }
                                  | undefined
                              }
                              skills?:
                                | {
                                    name: string
                                    proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                                    yearsOfExperience?: number | undefined
                                  }[]
                                | undefined
                              certifications?:
                                | {
                                    name: string
                                    issuer: { name: string; website?: string | undefined }
                                    issuedDate?: string | undefined
                                    expiryDate?: string | undefined
                                    credentialId?: string | undefined
                                  }[]
                                | undefined
                            }
                            role: 'sponsor' | 'owner' | 'contributor' | 'reviewer'
                          }[]
                        | undefined
                    }[]
                  | undefined
              }[]
              manager?:
                | {
                    id: string
                    personalInfo: {
                      firstName: string
                      lastName: string
                      email: string
                      phone?:
                        | { countryCode: string; number: string; extension?: string | undefined }
                        | undefined
                      address?:
                        | {
                            street?: string | undefined
                            city?: string | undefined
                            state?: string | undefined
                            postalCode?: string | undefined
                            country?: { code: string; name: string } | undefined
                            coordinates?: { latitude: number; longitude: number } | undefined
                          }
                        | undefined
                      emergencyContact?:
                        | {
                            name: string
                            relationship: string
                            phone: {
                              countryCode: string
                              number: string
                              extension?: string | undefined
                            }
                            address?:
                              | {
                                  street?: string | undefined
                                  city?: string | undefined
                                  state?: string | undefined
                                  postalCode?: string | undefined
                                  country?: { code: string; name: string } | undefined
                                  coordinates?: { latitude: number; longitude: number } | undefined
                                }
                              | undefined
                          }
                        | undefined
                    }
                    employmentInfo: {
                      startDate: string
                      endDate?: string | undefined
                      status: 'active' | 'on_leave' | 'terminated' | 'retired'
                      position: {
                        title: string
                        level: { code: string; name: string; rank: number }
                        department?: string | undefined
                      }
                      compensation?:
                        | {
                            salary?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            bonus?:
                              | {
                                  amount: number
                                  currency: { code: string; symbol?: string | undefined }
                                }
                              | undefined
                            equity?:
                              | {
                                  shares?: number | undefined
                                  vestingSchedule?:
                                    | {
                                        cliff?:
                                          | {
                                              value: number
                                              unit: 'days' | 'weeks' | 'months' | 'years'
                                            }
                                          | undefined
                                        totalPeriod?:
                                          | {
                                              value: number
                                              unit: 'days' | 'weeks' | 'months' | 'years'
                                            }
                                          | undefined
                                        frequency?: 'monthly' | 'quarterly' | 'annually' | undefined
                                      }
                                    | undefined
                                  grantDate?: string | undefined
                                }
                              | undefined
                            benefits?:
                              | {
                                  type: 'health' | 'dental' | 'vision' | 'life' | 'retirement'
                                  provider: {
                                    name: string
                                    contact?:
                                      | {
                                          email?: string | undefined
                                          phone?:
                                            | {
                                                countryCode: string
                                                number: string
                                                extension?: string | undefined
                                              }
                                            | undefined
                                          website?: string | undefined
                                          socialMedia?:
                                            | {
                                                platform:
                                                  | 'linkedin'
                                                  | 'twitter'
                                                  | 'facebook'
                                                  | 'instagram'
                                                url: string
                                              }[]
                                            | undefined
                                        }
                                      | undefined
                                  }
                                  coverage?:
                                    | {
                                        level?: 'individual' | 'family' | undefined
                                        deductible?:
                                          | {
                                              amount: number
                                              currency: {
                                                code: string
                                                symbol?: string | undefined
                                              }
                                            }
                                          | undefined
                                        maxBenefit?:
                                          | {
                                              amount: number
                                              currency: {
                                                code: string
                                                symbol?: string | undefined
                                              }
                                            }
                                          | undefined
                                      }
                                    | undefined
                                }[]
                              | undefined
                          }
                        | undefined
                    }
                    skills?:
                      | {
                          name: string
                          proficiency: 'beginner' | 'intermediate' | 'advanced' | 'expert'
                          yearsOfExperience?: number | undefined
                        }[]
                      | undefined
                    certifications?:
                      | {
                          name: string
                          issuer: { name: string; website?: string | undefined }
                          issuedDate?: string | undefined
                          expiryDate?: string | undefined
                          credentialId?: string | undefined
                        }[]
                      | undefined
                  }
                | undefined
              budget?:
                | {
                    allocated?:
                      | { amount: number; currency: { code: string; symbol?: string | undefined } }
                      | undefined
                    spent?:
                      | { amount: number; currency: { code: string; symbol?: string | undefined } }
                      | undefined
                    remaining?:
                      | { amount: number; currency: { code: string; symbol?: string | undefined } }
                      | undefined
                  }
                | undefined
            }[]
            headquarters?:
              | {
                  street?: string | undefined
                  city?: string | undefined
                  state?: string | undefined
                  postalCode?: string | undefined
                  country?: { code: string; name: string } | undefined
                  coordinates?: { latitude: number; longitude: number } | undefined
                }
              | undefined
            contact?:
              | {
                  email?: string | undefined
                  phone?:
                    | { countryCode: string; number: string; extension?: string | undefined }
                    | undefined
                  website?: string | undefined
                  socialMedia?:
                    | { platform: 'linkedin' | 'twitter' | 'facebook' | 'instagram'; url: string }[]
                    | undefined
                }
              | undefined
          }
          statistics: {
            totalEmployees?: number | undefined
            totalDepartments?: number | undefined
            totalTeams?: number | undefined
            totalProjects?: number | undefined
            budgetSummary?:
              | {
                  allocated?:
                    | { amount: number; currency: { code: string; symbol?: string | undefined } }
                    | undefined
                  spent?:
                    | { amount: number; currency: { code: string; symbol?: string | undefined } }
                    | undefined
                  remaining?:
                    | { amount: number; currency: { code: string; symbol?: string | undefined } }
                    | undefined
                }
              | undefined
          }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
