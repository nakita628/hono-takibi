declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/products': {
      $get: {
        input: {
          query: {
            page?: number | undefined
            limit?: number | undefined
            category?: string | undefined
            minPrice?: unknown
            maxPrice?: unknown
            inStock?: string | undefined
            search?: string | undefined
            sort?:
              | 'price:asc'
              | 'price:desc'
              | 'name:asc'
              | 'name:desc'
              | 'createdAt:desc'
              | 'popularity:desc'
              | undefined
          }
        }
        output: {
          data: {
            id: string
            name: string
            price: number
            status: 'draft' | 'active' | 'archived'
            description?: string | undefined
            compareAtPrice?: number | undefined
            sku?: string | undefined
            barcode?: string | undefined
            category?:
              | {
                  id: string
                  name: string
                  slug?: string | undefined
                  description?: string | undefined
                  parentId?: string | undefined
                  imageUrl?: string | undefined
                  productCount?: number | undefined
                }
              | undefined
            images?:
              | {
                  id: string
                  url: string
                  altText?: string | undefined
                  isPrimary?: boolean | undefined
                  sortOrder?: number | undefined
                }[]
              | undefined
            inventory?:
              | {
                  quantity: number
                  status: 'in_stock' | 'low_stock' | 'out_of_stock'
                  reservedQuantity?: number | undefined
                  lowStockThreshold?: number | undefined
                  trackInventory?: boolean | undefined
                }
              | undefined
            attributes?: { [x: string]: string } | undefined
            tags?: string[] | undefined
            createdAt?: string | undefined
            updatedAt?: string | undefined
          }[]
          pagination: { page: number; limit: number; total: number; totalPages: number }
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/products': {
      $post:
        | {
            input: {
              json: {
                name: string
                price: number
                description?: string | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              price: number
              status: 'draft' | 'active' | 'archived'
              description?: string | undefined
              compareAtPrice?: number | undefined
              sku?: string | undefined
              barcode?: string | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug?: string | undefined
                    description?: string | undefined
                    parentId?: string | undefined
                    imageUrl?: string | undefined
                    productCount?: number | undefined
                  }
                | undefined
              images?:
                | {
                    id: string
                    url: string
                    altText?: string | undefined
                    isPrimary?: boolean | undefined
                    sortOrder?: number | undefined
                  }[]
                | undefined
              inventory?:
                | {
                    quantity: number
                    status: 'in_stock' | 'low_stock' | 'out_of_stock'
                    reservedQuantity?: number | undefined
                    lowStockThreshold?: number | undefined
                    trackInventory?: boolean | undefined
                  }
                | undefined
              attributes?: { [x: string]: string } | undefined
              tags?: string[] | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                price: number
                description?: string | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                name: string
                price: number
                description?: string | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/products/:productId': {
      $get:
        | {
            input: { param: { productId: string } }
            output: {
              id: string
              name: string
              price: number
              status: 'draft' | 'active' | 'archived'
              description?: string | undefined
              compareAtPrice?: number | undefined
              sku?: string | undefined
              barcode?: string | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug?: string | undefined
                    description?: string | undefined
                    parentId?: string | undefined
                    imageUrl?: string | undefined
                    productCount?: number | undefined
                  }
                | undefined
              images?:
                | {
                    id: string
                    url: string
                    altText?: string | undefined
                    isPrimary?: boolean | undefined
                    sortOrder?: number | undefined
                  }[]
                | undefined
              inventory?:
                | {
                    quantity: number
                    status: 'in_stock' | 'low_stock' | 'out_of_stock'
                    reservedQuantity?: number | undefined
                    lowStockThreshold?: number | undefined
                    trackInventory?: boolean | undefined
                  }
                | undefined
              attributes?: { [x: string]: string } | undefined
              tags?: string[] | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { productId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/products/:productId': {
      $put:
        | {
            input: { param: { productId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                price?: number | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { productId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                price?: number | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              price: number
              status: 'draft' | 'active' | 'archived'
              description?: string | undefined
              compareAtPrice?: number | undefined
              sku?: string | undefined
              barcode?: string | undefined
              category?:
                | {
                    id: string
                    name: string
                    slug?: string | undefined
                    description?: string | undefined
                    parentId?: string | undefined
                    imageUrl?: string | undefined
                    productCount?: number | undefined
                  }
                | undefined
              images?:
                | {
                    id: string
                    url: string
                    altText?: string | undefined
                    isPrimary?: boolean | undefined
                    sortOrder?: number | undefined
                  }[]
                | undefined
              inventory?:
                | {
                    quantity: number
                    status: 'in_stock' | 'low_stock' | 'out_of_stock'
                    reservedQuantity?: number | undefined
                    lowStockThreshold?: number | undefined
                    trackInventory?: boolean | undefined
                  }
                | undefined
              attributes?: { [x: string]: string } | undefined
              tags?: string[] | undefined
              createdAt?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { productId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                price?: number | undefined
                compareAtPrice?: number | undefined
                sku?: string | undefined
                barcode?: string | undefined
                categoryId?: string | undefined
                status?: 'draft' | 'active' | 'archived' | undefined
                attributes?: Record<string, string> | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/products/:productId': {
      $delete:
        | {
            input: { param: { productId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { productId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | { input: { param: { productId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/products/:productId/images': {
      $post:
        | {
            input: { param: { productId: string } } & {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                isPrimary?: boolean | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { productId: string } } & {
              form: {
                file: import('/workspaces/hono-takibi/node_modules/.pnpm/zod@4.3.5/node_modules/zod/v4/core/schemas').File
                isPrimary?: boolean | undefined
              }
            }
            output: {
              id: string
              url: string
              altText?: string | undefined
              isPrimary?: boolean | undefined
              sortOrder?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/categories': {
      $get: {
        input: {}
        output: {
          id: string
          name: string
          slug?: string | undefined
          description?: string | undefined
          parentId?: string | undefined
          imageUrl?: string | undefined
          productCount?: number | undefined
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
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
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
              slug?: string | undefined
              description?: string | undefined
              parentId?: string | undefined
              imageUrl?: string | undefined
              productCount?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/cart': {
      $get:
        | {
            input: {}
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              items: {
                id: string
                product: {
                  id: string
                  name: string
                  price: number
                  status: 'draft' | 'active' | 'archived'
                  description?: string | undefined
                  compareAtPrice?: number | undefined
                  sku?: string | undefined
                  barcode?: string | undefined
                  category?:
                    | {
                        id: string
                        name: string
                        slug?: string | undefined
                        description?: string | undefined
                        parentId?: string | undefined
                        imageUrl?: string | undefined
                        productCount?: number | undefined
                      }
                    | undefined
                  images?:
                    | {
                        id: string
                        url: string
                        altText?: string | undefined
                        isPrimary?: boolean | undefined
                        sortOrder?: number | undefined
                      }[]
                    | undefined
                  inventory?:
                    | {
                        quantity: number
                        status: 'in_stock' | 'low_stock' | 'out_of_stock'
                        reservedQuantity?: number | undefined
                        lowStockThreshold?: number | undefined
                        trackInventory?: boolean | undefined
                      }
                    | undefined
                  attributes?: { [x: string]: string } | undefined
                  tags?: string[] | undefined
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                }
                quantity: number
                price: number
                total: number
              }[]
              subtotal: number
              total: number
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              itemCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/cart': {
      $delete:
        | {
            input: {}
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | { input: {}; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/cart/items': {
      $post:
        | {
            input: { json: { productId: string; quantity?: number | undefined } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { json: { productId: string; quantity?: number | undefined } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { json: { productId: string; quantity?: number | undefined } }
            output: {
              id: string
              items: {
                id: string
                product: {
                  id: string
                  name: string
                  price: number
                  status: 'draft' | 'active' | 'archived'
                  description?: string | undefined
                  compareAtPrice?: number | undefined
                  sku?: string | undefined
                  barcode?: string | undefined
                  category?:
                    | {
                        id: string
                        name: string
                        slug?: string | undefined
                        description?: string | undefined
                        parentId?: string | undefined
                        imageUrl?: string | undefined
                        productCount?: number | undefined
                      }
                    | undefined
                  images?:
                    | {
                        id: string
                        url: string
                        altText?: string | undefined
                        isPrimary?: boolean | undefined
                        sortOrder?: number | undefined
                      }[]
                    | undefined
                  inventory?:
                    | {
                        quantity: number
                        status: 'in_stock' | 'low_stock' | 'out_of_stock'
                        reservedQuantity?: number | undefined
                        lowStockThreshold?: number | undefined
                        trackInventory?: boolean | undefined
                      }
                    | undefined
                  attributes?: { [x: string]: string } | undefined
                  tags?: string[] | undefined
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                }
                quantity: number
                price: number
                total: number
              }[]
              subtotal: number
              total: number
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              itemCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/cart/items/:itemId': {
      $put:
        | {
            input: { param: { itemId: string } } & { json: { quantity: number } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { itemId: string } } & { json: { quantity: number } }
            output: {
              id: string
              items: {
                id: string
                product: {
                  id: string
                  name: string
                  price: number
                  status: 'draft' | 'active' | 'archived'
                  description?: string | undefined
                  compareAtPrice?: number | undefined
                  sku?: string | undefined
                  barcode?: string | undefined
                  category?:
                    | {
                        id: string
                        name: string
                        slug?: string | undefined
                        description?: string | undefined
                        parentId?: string | undefined
                        imageUrl?: string | undefined
                        productCount?: number | undefined
                      }
                    | undefined
                  images?:
                    | {
                        id: string
                        url: string
                        altText?: string | undefined
                        isPrimary?: boolean | undefined
                        sortOrder?: number | undefined
                      }[]
                    | undefined
                  inventory?:
                    | {
                        quantity: number
                        status: 'in_stock' | 'low_stock' | 'out_of_stock'
                        reservedQuantity?: number | undefined
                        lowStockThreshold?: number | undefined
                        trackInventory?: boolean | undefined
                      }
                    | undefined
                  attributes?: { [x: string]: string } | undefined
                  tags?: string[] | undefined
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                }
                quantity: number
                price: number
                total: number
              }[]
              subtotal: number
              total: number
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              itemCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/cart/items/:itemId': {
      $delete:
        | {
            input: { param: { itemId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { itemId: string } }
            output: {
              id: string
              items: {
                id: string
                product: {
                  id: string
                  name: string
                  price: number
                  status: 'draft' | 'active' | 'archived'
                  description?: string | undefined
                  compareAtPrice?: number | undefined
                  sku?: string | undefined
                  barcode?: string | undefined
                  category?:
                    | {
                        id: string
                        name: string
                        slug?: string | undefined
                        description?: string | undefined
                        parentId?: string | undefined
                        imageUrl?: string | undefined
                        productCount?: number | undefined
                      }
                    | undefined
                  images?:
                    | {
                        id: string
                        url: string
                        altText?: string | undefined
                        isPrimary?: boolean | undefined
                        sortOrder?: number | undefined
                      }[]
                    | undefined
                  inventory?:
                    | {
                        quantity: number
                        status: 'in_stock' | 'low_stock' | 'out_of_stock'
                        reservedQuantity?: number | undefined
                        lowStockThreshold?: number | undefined
                        trackInventory?: boolean | undefined
                      }
                    | undefined
                  attributes?: { [x: string]: string } | undefined
                  tags?: string[] | undefined
                  createdAt?: string | undefined
                  updatedAt?: string | undefined
                }
                quantity: number
                price: number
                total: number
              }[]
              subtotal: number
              total: number
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              itemCount?: number | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/orders': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?:
                  | 'pending'
                  | 'confirmed'
                  | 'processing'
                  | 'shipped'
                  | 'delivered'
                  | 'cancelled'
                  | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?:
                  | 'pending'
                  | 'confirmed'
                  | 'processing'
                  | 'shipped'
                  | 'delivered'
                  | 'cancelled'
                  | undefined
              }
            }
            output: {
              data: {
                id: string
                orderNumber: string
                status:
                  | 'pending'
                  | 'confirmed'
                  | 'processing'
                  | 'shipped'
                  | 'delivered'
                  | 'cancelled'
                items: {
                  id: string
                  productId: string
                  productName: string
                  quantity: number
                  price: number
                  total: number
                  sku?: string | undefined
                  imageUrl?: string | undefined
                }[]
                total: number
                createdAt: string
                subtotal?: number | undefined
                discount?: number | undefined
                tax?: number | undefined
                shipping?: number | undefined
                shippingAddress?:
                  | {
                      name: string
                      postalCode: string
                      prefecture: string
                      city: string
                      address1: string
                      address2?: string | undefined
                      phone?: string | undefined
                    }
                  | undefined
                billingAddress?:
                  | {
                      name: string
                      postalCode: string
                      prefecture: string
                      city: string
                      address1: string
                      address2?: string | undefined
                      phone?: string | undefined
                    }
                  | undefined
                paymentMethod?: string | undefined
                paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | undefined
                notes?: string | undefined
                trackingNumber?: string | undefined
                updatedAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/orders': {
      $post:
        | {
            input: {
              json: {
                shippingAddress: {
                  name: string
                  postalCode: string
                  prefecture: string
                  city: string
                  address1: string
                  address2?: string | undefined
                  phone?: string | undefined
                }
                paymentMethod: 'credit_card' | 'bank_transfer' | 'convenience_store' | 'cod'
                billingAddress?:
                  | {
                      name: string
                      postalCode: string
                      prefecture: string
                      city: string
                      address1: string
                      address2?: string | undefined
                      phone?: string | undefined
                    }
                  | undefined
                notes?: string | undefined
                couponCode?: string | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: {
              json: {
                shippingAddress: {
                  name: string
                  postalCode: string
                  prefecture: string
                  city: string
                  address1: string
                  address2?: string | undefined
                  phone?: string | undefined
                }
                paymentMethod: 'credit_card' | 'bank_transfer' | 'convenience_store' | 'cod'
                billingAddress?:
                  | {
                      name: string
                      postalCode: string
                      prefecture: string
                      city: string
                      address1: string
                      address2?: string | undefined
                      phone?: string | undefined
                    }
                  | undefined
                notes?: string | undefined
                couponCode?: string | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                shippingAddress: {
                  name: string
                  postalCode: string
                  prefecture: string
                  city: string
                  address1: string
                  address2?: string | undefined
                  phone?: string | undefined
                }
                paymentMethod: 'credit_card' | 'bank_transfer' | 'convenience_store' | 'cod'
                billingAddress?:
                  | {
                      name: string
                      postalCode: string
                      prefecture: string
                      city: string
                      address1: string
                      address2?: string | undefined
                      phone?: string | undefined
                    }
                  | undefined
                notes?: string | undefined
                couponCode?: string | undefined
              }
            }
            output: {
              id: string
              orderNumber: string
              status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
              items: {
                id: string
                productId: string
                productName: string
                quantity: number
                price: number
                total: number
                sku?: string | undefined
                imageUrl?: string | undefined
              }[]
              total: number
              createdAt: string
              subtotal?: number | undefined
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              shippingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              billingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              paymentMethod?: string | undefined
              paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | undefined
              notes?: string | undefined
              trackingNumber?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/orders/:orderId': {
      $get:
        | {
            input: { param: { orderId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { orderId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { orderId: string } }
            output: {
              id: string
              orderNumber: string
              status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
              items: {
                id: string
                productId: string
                productName: string
                quantity: number
                price: number
                total: number
                sku?: string | undefined
                imageUrl?: string | undefined
              }[]
              total: number
              createdAt: string
              subtotal?: number | undefined
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              shippingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              billingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              paymentMethod?: string | undefined
              paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | undefined
              notes?: string | undefined
              trackingNumber?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/orders/:orderId/cancel': {
      $post:
        | {
            input: { param: { orderId: string } } & { json: { reason?: string | undefined } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { param: { orderId: string } } & { json: { reason?: string | undefined } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { orderId: string } } & { json: { reason?: string | undefined } }
            output: {
              id: string
              orderNumber: string
              status: 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'
              items: {
                id: string
                productId: string
                productName: string
                quantity: number
                price: number
                total: number
                sku?: string | undefined
                imageUrl?: string | undefined
              }[]
              total: number
              createdAt: string
              subtotal?: number | undefined
              discount?: number | undefined
              tax?: number | undefined
              shipping?: number | undefined
              shippingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              billingAddress?:
                | {
                    name: string
                    postalCode: string
                    prefecture: string
                    city: string
                    address1: string
                    address2?: string | undefined
                    phone?: string | undefined
                  }
                | undefined
              paymentMethod?: string | undefined
              paymentStatus?: 'pending' | 'paid' | 'failed' | 'refunded' | undefined
              notes?: string | undefined
              trackingNumber?: string | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/inventory/:productId': {
      $get:
        | {
            input: { param: { productId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { productId: string } }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { productId: string } }
            output: {
              quantity: number
              status: 'in_stock' | 'low_stock' | 'out_of_stock'
              reservedQuantity?: number | undefined
              lowStockThreshold?: number | undefined
              trackInventory?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/inventory/:productId': {
      $put:
        | {
            input: { param: { productId: string } } & {
              json: {
                quantity?: number | undefined
                lowStockThreshold?: number | undefined
                trackInventory?: boolean | undefined
              }
            }
            output: {
              code: string
              message: string
              details?: { field?: string | undefined; message?: string | undefined }[] | undefined
            }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { productId: string } } & {
              json: {
                quantity?: number | undefined
                lowStockThreshold?: number | undefined
                trackInventory?: boolean | undefined
              }
            }
            output: {
              quantity: number
              status: 'in_stock' | 'low_stock' | 'out_of_stock'
              reservedQuantity?: number | undefined
              lowStockThreshold?: number | undefined
              trackInventory?: boolean | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  },
  '/'
>
export default routes
