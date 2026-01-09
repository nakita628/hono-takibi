declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/documents': {
      $get: {
        input: {
          query: {
            author?: string | undefined
            reviewer?: string | undefined
            approver?: string | undefined
          }
        }
        output: {
          id: string
          title: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          author: {
            id: string
            name?: string | undefined
            email?: string | undefined
            avatar?: string | undefined
          }
          reviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          approver?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          collaborators?:
            | {
                user?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                addedAt?: string | undefined
                addedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }[]
            | undefined
          tags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          currentVersion?: string | undefined
          linkedDocuments?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }[]
            | undefined
          parentDocument?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }
            | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/documents': {
      $post: {
        input: {
          json: {
            title: string
            content: {
              format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
              body?: string | undefined
              attachments?:
                | {
                    id: string
                    name: string
                    url: string
                    mimeType?: string | undefined
                    size?: number | undefined
                    uploadedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
            }
            reviewers?: string[] | undefined
            tags?: { name: string; color?: string | undefined }[] | undefined
            parentDocument?: string | undefined
            templateId?: string | undefined
          }
        }
        output: {
          id: string
          title: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          author: {
            id: string
            name?: string | undefined
            email?: string | undefined
            avatar?: string | undefined
          }
          reviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          approver?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          collaborators?:
            | {
                user?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                addedAt?: string | undefined
                addedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }[]
            | undefined
          tags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          currentVersion?: string | undefined
          linkedDocuments?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }[]
            | undefined
          parentDocument?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/documents/:documentId': {
      $get: {
        input: { param: { documentId: string } }
        output: {
          id: string
          title: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          author: {
            id: string
            name?: string | undefined
            email?: string | undefined
            avatar?: string | undefined
          }
          reviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          approver?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          collaborators?:
            | {
                user?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                addedAt?: string | undefined
                addedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }[]
            | undefined
          tags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          currentVersion?: string | undefined
          linkedDocuments?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }[]
            | undefined
          parentDocument?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }
            | undefined
          versions?:
            | {
                id: string
                documentId: string
                versionNumber: number
                content: {
                  format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                  body?: string | undefined
                  attachments?:
                    | {
                        id: string
                        name: string
                        url: string
                        mimeType?: string | undefined
                        size?: number | undefined
                        uploadedBy?:
                          | {
                              id: string
                              name?: string | undefined
                              email?: string | undefined
                              avatar?: string | undefined
                            }
                          | undefined
                        uploadedAt?: string | undefined
                      }[]
                    | undefined
                }
                author?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                createdAt?: string | undefined
                changeDescription?: string | undefined
                previousVersion?: string | undefined
              }[]
            | undefined
          activityLog?:
            | {
                id: string
                action:
                  | 'approved'
                  | 'published'
                  | 'created'
                  | 'updated'
                  | 'reviewed'
                  | 'shared'
                  | 'commented'
                actor: {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
                timestamp: string
                details?:
                  | {
                      previousStatus?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                      newStatus?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                      versionId?: string | undefined
                      comment?: string | undefined
                    }
                  | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/documents/:documentId': {
      $put: {
        input: { param: { documentId: string } } & {
          json: {
            title?: string | undefined
            content?:
              | {
                  format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                  body?: string | undefined
                  attachments?:
                    | {
                        id: string
                        name: string
                        url: string
                        mimeType?: string | undefined
                        size?: number | undefined
                        uploadedBy?:
                          | {
                              id: string
                              name?: string | undefined
                              email?: string | undefined
                              avatar?: string | undefined
                            }
                          | undefined
                        uploadedAt?: string | undefined
                      }[]
                    | undefined
                }
              | undefined
            reviewers?: string[] | undefined
            approver?: string | undefined
            tags?: { name: string; color?: string | undefined }[] | undefined
            status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          }
        }
        output: {
          id: string
          title: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          author: {
            id: string
            name?: string | undefined
            email?: string | undefined
            avatar?: string | undefined
          }
          reviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          approver?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          collaborators?:
            | {
                user?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                addedAt?: string | undefined
                addedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }[]
            | undefined
          tags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          currentVersion?: string | undefined
          linkedDocuments?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }[]
            | undefined
          parentDocument?:
            | {
                id: string
                title: string
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/documents/:documentId/versions': {
      $get: {
        input: { param: { documentId: string } }
        output: {
          id: string
          documentId: string
          versionNumber: number
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          author?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          createdAt?: string | undefined
          changeDescription?: string | undefined
          previousVersion?: string | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/documents/:documentId/share': {
      $post: {
        input: { param: { documentId: string } } & {
          json: {
            recipients: {
              userId: string
              permission: 'view' | 'comment' | 'edit' | 'admin'
              expiresAt?: string | undefined
              notifyUser?: boolean | undefined
            }[]
            message?: string | undefined
          }
        }
        output: {
          documentId: string
          shares: {
            user?:
              | {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
              | undefined
            permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
            sharedAt?: string | undefined
            sharedBy?:
              | {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
              | undefined
            expiresAt?: string | undefined
          }[]
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/users/:userId/documents': {
      $get: {
        input: { param: { userId: string } }
        output: {
          authored?:
            | {
                id: string
                title: string
                content: {
                  format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                  body?: string | undefined
                  attachments?:
                    | {
                        id: string
                        name: string
                        url: string
                        mimeType?: string | undefined
                        size?: number | undefined
                        uploadedBy?:
                          | {
                              id: string
                              name?: string | undefined
                              email?: string | undefined
                              avatar?: string | undefined
                            }
                          | undefined
                        uploadedAt?: string | undefined
                      }[]
                    | undefined
                }
                author: {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
                reviewers?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }[]
                  | undefined
                approver?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                collaborators?:
                  | {
                      user?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                      addedAt?: string | undefined
                      addedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }[]
                  | undefined
                tags?: { name: string; color?: string | undefined }[] | undefined
                metadata?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      updatedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
                currentVersion?: string | undefined
                linkedDocuments?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }[]
                  | undefined
                parentDocument?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }
                  | undefined
              }[]
            | undefined
          reviewing?:
            | {
                id: string
                title: string
                content: {
                  format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                  body?: string | undefined
                  attachments?:
                    | {
                        id: string
                        name: string
                        url: string
                        mimeType?: string | undefined
                        size?: number | undefined
                        uploadedBy?:
                          | {
                              id: string
                              name?: string | undefined
                              email?: string | undefined
                              avatar?: string | undefined
                            }
                          | undefined
                        uploadedAt?: string | undefined
                      }[]
                    | undefined
                }
                author: {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
                reviewers?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }[]
                  | undefined
                approver?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                collaborators?:
                  | {
                      user?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                      addedAt?: string | undefined
                      addedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }[]
                  | undefined
                tags?: { name: string; color?: string | undefined }[] | undefined
                metadata?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      updatedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
                currentVersion?: string | undefined
                linkedDocuments?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }[]
                  | undefined
                parentDocument?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }
                  | undefined
              }[]
            | undefined
          shared?:
            | {
                id: string
                title: string
                content: {
                  format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                  body?: string | undefined
                  attachments?:
                    | {
                        id: string
                        name: string
                        url: string
                        mimeType?: string | undefined
                        size?: number | undefined
                        uploadedBy?:
                          | {
                              id: string
                              name?: string | undefined
                              email?: string | undefined
                              avatar?: string | undefined
                            }
                          | undefined
                        uploadedAt?: string | undefined
                      }[]
                    | undefined
                }
                author: {
                  id: string
                  name?: string | undefined
                  email?: string | undefined
                  avatar?: string | undefined
                }
                reviewers?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }[]
                  | undefined
                approver?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                collaborators?:
                  | {
                      user?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                      addedAt?: string | undefined
                      addedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }[]
                  | undefined
                tags?: { name: string; color?: string | undefined }[] | undefined
                metadata?:
                  | {
                      createdAt?: string | undefined
                      updatedAt?: string | undefined
                      createdBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      updatedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
                currentVersion?: string | undefined
                linkedDocuments?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }[]
                  | undefined
                parentDocument?:
                  | {
                      id: string
                      title: string
                      status?:
                        | 'draft'
                        | 'in_review'
                        | 'approved'
                        | 'published'
                        | 'archived'
                        | undefined
                    }
                  | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/compare': {
      $post: {
        input: {
          json: {
            source: {
              id: string
              title: string
              content: {
                format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                body?: string | undefined
                attachments?:
                  | {
                      id: string
                      name: string
                      url: string
                      mimeType?: string | undefined
                      size?: number | undefined
                      uploadedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      uploadedAt?: string | undefined
                    }[]
                  | undefined
              }
              author: {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
              reviewers?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }[]
                | undefined
              approver?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
              collaborators?:
                | {
                    user?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                    addedAt?: string | undefined
                    addedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                  }[]
                | undefined
              tags?: { name: string; color?: string | undefined }[] | undefined
              metadata?:
                | {
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    updatedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              currentVersion?: string | undefined
              linkedDocuments?:
                | {
                    id: string
                    title: string
                    status?:
                      | 'draft'
                      | 'in_review'
                      | 'approved'
                      | 'published'
                      | 'archived'
                      | undefined
                  }[]
                | undefined
              parentDocument?:
                | {
                    id: string
                    title: string
                    status?:
                      | 'draft'
                      | 'in_review'
                      | 'approved'
                      | 'published'
                      | 'archived'
                      | undefined
                  }
                | undefined
            }
            target: {
              id: string
              title: string
              content: {
                format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
                body?: string | undefined
                attachments?:
                  | {
                      id: string
                      name: string
                      url: string
                      mimeType?: string | undefined
                      size?: number | undefined
                      uploadedBy?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      uploadedAt?: string | undefined
                    }[]
                  | undefined
              }
              author: {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
              reviewers?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }[]
                | undefined
              approver?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
              collaborators?:
                | {
                    user?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    permission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                    addedAt?: string | undefined
                    addedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                  }[]
                | undefined
              tags?: { name: string; color?: string | undefined }[] | undefined
              metadata?:
                | {
                    createdAt?: string | undefined
                    updatedAt?: string | undefined
                    createdBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    updatedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                  }
                | undefined
              status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
              currentVersion?: string | undefined
              linkedDocuments?:
                | {
                    id: string
                    title: string
                    status?:
                      | 'draft'
                      | 'in_review'
                      | 'approved'
                      | 'published'
                      | 'archived'
                      | undefined
                  }[]
                | undefined
              parentDocument?:
                | {
                    id: string
                    title: string
                    status?:
                      | 'draft'
                      | 'in_review'
                      | 'approved'
                      | 'published'
                      | 'archived'
                      | undefined
                  }
                | undefined
            }
            options?:
              | {
                  ignoreWhitespace?: boolean | undefined
                  ignoreCase?: boolean | undefined
                  showLineNumbers?: boolean | undefined
                }
              | undefined
          }
        }
        output: {
          source: {
            id: string
            title: string
            status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          }
          target: {
            id: string
            title: string
            status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          }
          differences: {
            type: 'added' | 'removed' | 'modified'
            path: string
            sourceValue?: string | undefined
            targetValue?: string | undefined
          }[]
          summary?:
            | {
                additions?: number | undefined
                deletions?: number | undefined
                modifications?: number | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/templates': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          description?: string | undefined
          defaultReviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          defaultApprover?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          defaultTags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          category?: string | undefined
          variables?:
            | {
                name: string
                type: 'number' | 'date' | 'user' | 'text' | 'document'
                required?: boolean | undefined
                defaultValue?: string | undefined
                description?: string | undefined
              }[]
            | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/templates': {
      $post: {
        input: {
          json: {
            name: string
            content: {
              format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
              body?: string | undefined
              attachments?:
                | {
                    id: string
                    name: string
                    url: string
                    mimeType?: string | undefined
                    size?: number | undefined
                    uploadedBy?:
                      | {
                          id: string
                          name?: string | undefined
                          email?: string | undefined
                          avatar?: string | undefined
                        }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
            }
            description?: string | undefined
            defaultReviewers?: string[] | undefined
            defaultApprover?: string | undefined
            defaultTags?: { name: string; color?: string | undefined }[] | undefined
            category?: string | undefined
            variables?:
              | {
                  name: string
                  type: 'number' | 'date' | 'user' | 'text' | 'document'
                  required?: boolean | undefined
                  defaultValue?: string | undefined
                  description?: string | undefined
                }[]
              | undefined
          }
        }
        output: {
          id: string
          name: string
          content: {
            format?: 'markdown' | 'html' | 'plain' | 'rich' | undefined
            body?: string | undefined
            attachments?:
              | {
                  id: string
                  name: string
                  url: string
                  mimeType?: string | undefined
                  size?: number | undefined
                  uploadedBy?:
                    | {
                        id: string
                        name?: string | undefined
                        email?: string | undefined
                        avatar?: string | undefined
                      }
                    | undefined
                  uploadedAt?: string | undefined
                }[]
              | undefined
          }
          description?: string | undefined
          defaultReviewers?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }[]
            | undefined
          defaultApprover?:
            | {
                id: string
                name?: string | undefined
                email?: string | undefined
                avatar?: string | undefined
              }
            | undefined
          defaultTags?: { name: string; color?: string | undefined }[] | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          category?: string | undefined
          variables?:
            | {
                name: string
                type: 'number' | 'date' | 'user' | 'text' | 'document'
                required?: boolean | undefined
                defaultValue?: string | undefined
                description?: string | undefined
              }[]
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  } & {
    '/workflows': {
      $post: {
        input: {
          json: {
            name: string
            steps: {
              name: string
              type: 'custom' | 'review' | 'approval' | 'notification'
              assignee?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
              requiredPermission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
              nextSteps?:
                | { condition?: string | undefined; stepName?: string | undefined }[]
                | undefined
              timeout?: number | undefined
              escalateTo?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
            }[]
            description?: string | undefined
            defaultAssignees?: Record<string, string> | undefined
          }
        }
        output: {
          id: string
          definition: {
            name: string
            steps: {
              name: string
              type: 'custom' | 'review' | 'approval' | 'notification'
              assignee?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
              requiredPermission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
              nextSteps?:
                | { condition?: string | undefined; stepName?: string | undefined }[]
                | undefined
              timeout?: number | undefined
              escalateTo?:
                | {
                    id: string
                    name?: string | undefined
                    email?: string | undefined
                    avatar?: string | undefined
                  }
                | undefined
            }[]
            description?: string | undefined
            defaultAssignees?: { [x: string]: string } | undefined
          }
          document: {
            id: string
            title: string
            status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived' | undefined
          }
          status: 'active' | 'completed' | 'cancelled' | 'failed'
          currentStep?:
            | {
                name: string
                type: 'custom' | 'review' | 'approval' | 'notification'
                assignee?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                requiredPermission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                nextSteps?:
                  | { condition?: string | undefined; stepName?: string | undefined }[]
                  | undefined
                timeout?: number | undefined
                escalateTo?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
          history?:
            | {
                step?:
                  | {
                      name: string
                      type: 'custom' | 'review' | 'approval' | 'notification'
                      assignee?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                      requiredPermission?: 'view' | 'comment' | 'edit' | 'admin' | undefined
                      nextSteps?:
                        | { condition?: string | undefined; stepName?: string | undefined }[]
                        | undefined
                      timeout?: number | undefined
                      escalateTo?:
                        | {
                            id: string
                            name?: string | undefined
                            email?: string | undefined
                            avatar?: string | undefined
                          }
                        | undefined
                    }
                  | undefined
                completedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                completedAt?: string | undefined
                action?: string | undefined
                comment?: string | undefined
              }[]
            | undefined
          metadata?:
            | {
                createdAt?: string | undefined
                updatedAt?: string | undefined
                createdBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
                updatedBy?:
                  | {
                      id: string
                      name?: string | undefined
                      email?: string | undefined
                      avatar?: string | undefined
                    }
                  | undefined
              }
            | undefined
        }
        outputFormat: 'json'
        status: 201
      }
    }
  },
  '/'
>
export default routes
