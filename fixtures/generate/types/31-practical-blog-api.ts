declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.4/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/posts': {
      $get: {
        input: {
          query: {
            page?: number | undefined
            limit?: number | undefined
            status?: 'draft' | 'published' | 'scheduled' | 'archived' | undefined
            category?: string | undefined
            tag?: string | undefined
            author?: string | undefined
            search?: string | undefined
            sort?:
              | 'publishedAt:desc'
              | 'publishedAt:asc'
              | 'title:asc'
              | 'title:desc'
              | 'viewCount:desc'
              | undefined
          }
        }
        output: {
          data: {
            id: string
            title: string
            slug: string
            status: 'draft' | 'published' | 'scheduled' | 'archived'
            author: {
              id: string
              name: string
              slug?: string | undefined
              bio?: string | undefined
              avatarUrl?: string | undefined
              email?: string | undefined
              website?: string | undefined
              socialLinks?:
                | {
                    twitter?: string | undefined
                    facebook?: string | undefined
                    instagram?: string | undefined
                    linkedin?: string | undefined
                  }
                | undefined
              postCount?: number | undefined
            }
            createdAt: string
            excerpt?: string | undefined
            content?: string | undefined
            contentMarkdown?: string | undefined
            featuredImage?:
              | {
                  id: string
                  url: string
                  type: 'image' | 'video' | 'audio' | 'document'
                  mimeType: string
                  filename?: string | undefined
                  filesize?: number | undefined
                  width?: number | undefined
                  height?: number | undefined
                  altText?: string | undefined
                  caption?: string | undefined
                  thumbnails?:
                    | {
                        small?: string | undefined
                        medium?: string | undefined
                        large?: string | undefined
                      }
                    | undefined
                  createdAt?: string | undefined
                }
              | undefined
            category?:
              | {
                  id: string
                  name: string
                  slug: string
                  description?: string | undefined
                  parentId?: string | undefined
                  postCount?: number | undefined
                  createdAt?: string | undefined
                }
              | undefined
            tags?:
              | { id: string; name: string; slug: string; postCount?: number | undefined }[]
              | undefined
            seo?:
              | {
                  metaTitle?: string | undefined
                  metaDescription?: string | undefined
                  ogTitle?: string | undefined
                  ogDescription?: string | undefined
                  ogImage?: string | undefined
                  canonicalUrl?: string | undefined
                  noIndex?: boolean | undefined
                }
              | undefined
            viewCount?: number | undefined
            commentCount?: number | undefined
            publishedAt?: string | undefined
            scheduledAt?: string | undefined
            updatedAt?: string | undefined
          }[]
          pagination: { page: number; limit: number; total: number; totalPages: number }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/posts': {
      $post:
        | {
            input: {
              json: {
                title: string
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
                status?: 'draft' | 'published' | undefined
              }
            }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                title: string
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
                status?: 'draft' | 'published' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                title: string
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
                status?: 'draft' | 'published' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/posts/:postId': {
      $get:
        | {
            input: { param: { postId: string } }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/posts/:postId': {
      $put:
        | {
            input: { param: { postId: string } } & {
              json: {
                title?: string | undefined
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { postId: string } } & {
              json: {
                title?: string | undefined
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
              }
            }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { postId: string } } & {
              json: {
                title?: string | undefined
                slug?: string | undefined
                excerpt?: string | undefined
                content?: string | undefined
                contentMarkdown?: string | undefined
                featuredImageId?: string | undefined
                categoryId?: string | undefined
                tagIds?: string[] | undefined
                seo?:
                  | {
                      metaTitle?: string | undefined
                      metaDescription?: string | undefined
                      ogTitle?: string | undefined
                      ogDescription?: string | undefined
                      ogImage?: string | undefined
                      canonicalUrl?: string | undefined
                      noIndex?: boolean | undefined
                    }
                  | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/posts/:postId': {
      $delete:
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | { input: { param: { postId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/posts/slug/:slug': {
      $get:
        | {
            input: { param: { slug: string } }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { slug: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/posts/:postId/publish': {
      $post:
        | {
            input: { param: { postId: string } } & { json: { scheduledAt?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { postId: string } } & { json: { scheduledAt?: string | undefined } }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/posts/:postId/unpublish': {
      $post:
        | {
            input: { param: { postId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { postId: string } }
            output: {
              id: string
              title: string
              slug: string
              status: 'draft' | 'published' | 'scheduled' | 'archived'
              author: {
                id: string
                name: string
                slug?: string | undefined
                bio?: string | undefined
                avatarUrl?: string | undefined
                email?: string | undefined
                website?: string | undefined
                socialLinks?:
                  | {
                      twitter?: string | undefined
                      facebook?: string | undefined
                      instagram?: string | undefined
                      linkedin?: string | undefined
                    }
                  | undefined
                postCount?: number | undefined
              }
              createdAt: string
              excerpt?: string | undefined
              content?: string | undefined
              contentMarkdown?: string | undefined
              featuredImage?:
                | {
                    id: string
                    url: string
                    type: 'image' | 'video' | 'audio' | 'document'
                    mimeType: string
                    filename?: string | undefined
                    filesize?: number | undefined
                    width?: number | undefined
                    height?: number | undefined
                    altText?: string | undefined
                    caption?: string | undefined
                    thumbnails?:
                      | {
                          small?: string | undefined
                          medium?: string | undefined
                          large?: string | undefined
                        }
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug: string
                    description?: string | undefined
                    parentId?: string | undefined
                    postCount?: number | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              tags?:
                | { id: string; name: string; slug: string; postCount?: number | undefined }[]
                | undefined
              seo?:
                | {
                    metaTitle?: string | undefined
                    metaDescription?: string | undefined
                    ogTitle?: string | undefined
                    ogDescription?: string | undefined
                    ogImage?: string | undefined
                    canonicalUrl?: string | undefined
                    noIndex?: boolean | undefined
                  }
                | undefined
              viewCount?: number | undefined
              commentCount?: number | undefined
              publishedAt?: string | undefined
              scheduledAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/posts/:postId/comments': {
      $get: {
        input: { param: { postId: string } } & {
          query: { page?: number | undefined; limit?: number | undefined }
        }
        output: {
          data: {
            id: string
            content: string
            authorName: string
            authorEmail?: string | undefined
            authorUrl?: string | undefined
            status: 'pending' | 'approved' | 'spam'
            parentId?: string | undefined
            replies?: any[] | undefined
            createdAt: string
          }[]
          pagination: { page: number; limit: number; total: number; totalPages: number }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/posts/:postId/comments': {
      $post:
        | {
            input: { param: { postId: string } } & {
              json: {
                content: string
                authorName: string
                authorEmail: string
                authorUrl?: string | undefined
                parentId?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { postId: string } } & {
              json: {
                content: string
                authorName: string
                authorEmail: string
                authorUrl?: string | undefined
                parentId?: string | undefined
              }
            }
            output: {
              id: string
              content: string
              authorName: string
              authorEmail?: string | undefined
              authorUrl?: string | undefined
              status: 'pending' | 'approved' | 'spam'
              parentId?: string | undefined
              replies?: any[] | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/comments/:commentId': {
      $delete:
        | {
            input: { param: { commentId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { commentId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | { input: { param: { commentId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/comments/:commentId/approve': {
      $post:
        | {
            input: { param: { commentId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { commentId: string } }
            output: {
              id: string
              content: string
              authorName: string
              authorEmail?: string | undefined
              authorUrl?: string | undefined
              status: 'pending' | 'approved' | 'spam'
              parentId?: string | undefined
              replies?: any[] | undefined
              createdAt: string
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/categories': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          slug: string
          description?: string | undefined
          parentId?: string | undefined
          postCount?: number | undefined
          createdAt?: string | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/categories': {
      $post:
        | {
            input: {
              json: {
                name: string
                slug?: string | undefined
                description?: string | undefined
                parentId?: string | undefined
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
                slug?: string | undefined
                description?: string | undefined
                parentId?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              slug: string
              description?: string | undefined
              parentId?: string | undefined
              postCount?: number | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/categories/:categoryId': {
      $get:
        | {
            input: { param: { categoryId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { categoryId: string } }
            output: {
              id: string
              name: string
              slug: string
              description?: string | undefined
              parentId?: string | undefined
              postCount?: number | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/categories/:categoryId': {
      $put:
        | {
            input: { param: { categoryId: string } } & {
              json: {
                name?: string | undefined
                slug?: string | undefined
                description?: string | undefined
                parentId?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { categoryId: string } } & {
              json: {
                name?: string | undefined
                slug?: string | undefined
                description?: string | undefined
                parentId?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              slug: string
              description?: string | undefined
              parentId?: string | undefined
              postCount?: number | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/categories/:categoryId': {
      $delete:
        | {
            input: { param: { categoryId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { categoryId: string } }
            output: {}
            outputFormat: string
            status: 204
          }
    }
  } & {
    '/tags': {
      $get: {
        input: { query: { search?: string | undefined } }
        output: { id: string; name: string; slug: string; postCount?: number | undefined }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/tags': {
      $post:
        | {
            input: { json: { name: string; slug?: string | undefined } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { name: string; slug?: string | undefined } }
            output: { id: string; name: string; slug: string; postCount?: number | undefined }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/media': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                type?: 'image' | 'video' | 'audio' | 'document' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                type?: 'image' | 'video' | 'audio' | 'document' | undefined
              }
            }
            output: {
              data: {
                id: string
                url: string
                type: 'image' | 'video' | 'audio' | 'document'
                mimeType: string
                filename?: string | undefined
                filesize?: number | undefined
                width?: number | undefined
                height?: number | undefined
                altText?: string | undefined
                caption?: string | undefined
                thumbnails?:
                  | {
                      small?: string | undefined
                      medium?: string | undefined
                      large?: string | undefined
                    }
                  | undefined
                createdAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/media': {
      $post:
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                altText?: string | undefined
                caption?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                altText?: string | undefined
                caption?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.4/node_modules/zod/v4/core/schemas').File
                altText?: string | undefined
                caption?: string | undefined
              }
            }
            output: {
              id: string
              url: string
              type: 'image' | 'video' | 'audio' | 'document'
              mimeType: string
              filename?: string | undefined
              filesize?: number | undefined
              width?: number | undefined
              height?: number | undefined
              altText?: string | undefined
              caption?: string | undefined
              thumbnails?:
                | {
                    small?: string | undefined
                    medium?: string | undefined
                    large?: string | undefined
                  }
                | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/media/:mediaId': {
      $get:
        | {
            input: { param: { mediaId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { mediaId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { mediaId: string } }
            output: {
              id: string
              url: string
              type: 'image' | 'video' | 'audio' | 'document'
              mimeType: string
              filename?: string | undefined
              filesize?: number | undefined
              width?: number | undefined
              height?: number | undefined
              altText?: string | undefined
              caption?: string | undefined
              thumbnails?:
                | {
                    small?: string | undefined
                    medium?: string | undefined
                    large?: string | undefined
                  }
                | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/media/:mediaId': {
      $put:
        | {
            input: { param: { mediaId: string } } & {
              json: { altText?: string | undefined; caption?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { mediaId: string } } & {
              json: { altText?: string | undefined; caption?: string | undefined }
            }
            output: {
              id: string
              url: string
              type: 'image' | 'video' | 'audio' | 'document'
              mimeType: string
              filename?: string | undefined
              filesize?: number | undefined
              width?: number | undefined
              height?: number | undefined
              altText?: string | undefined
              caption?: string | undefined
              thumbnails?:
                | {
                    small?: string | undefined
                    medium?: string | undefined
                    large?: string | undefined
                  }
                | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/media/:mediaId': {
      $delete:
        | {
            input: { param: { mediaId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { mediaId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/authors': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          slug?: string | undefined
          bio?: string | undefined
          avatarUrl?: string | undefined
          email?: string | undefined
          website?: string | undefined
          socialLinks?:
            | {
                twitter?: string | undefined
                facebook?: string | undefined
                instagram?: string | undefined
                linkedin?: string | undefined
              }
            | undefined
          postCount?: number | undefined
        }[]
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/authors/:authorId': {
      $get:
        | {
            input: { param: { authorId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { authorId: string } }
            output: {
              id: string
              name: string
              slug?: string | undefined
              bio?: string | undefined
              avatarUrl?: string | undefined
              email?: string | undefined
              website?: string | undefined
              socialLinks?:
                | {
                    twitter?: string | undefined
                    facebook?: string | undefined
                    instagram?: string | undefined
                    linkedin?: string | undefined
                  }
                | undefined
              postCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
