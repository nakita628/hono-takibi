declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/one-of': {
      $post: {
        input: {
          json:
            | { type: 'credit_card'; cardNumber: string; expiry: string }
            | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        }
        output:
          | { type: 'credit_card'; cardNumber: string; expiry: string }
          | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/any-of': {
      $post: {
        input: { json: { keyword: string } | { category: number } }
        output: { keyword: string } | { category: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/all-of': {
      $post: {
        input: {
          json: {
            name: string
            email: string
            employeeId: number
            department?: string | undefined
            startDate?: string | undefined
          }
        }
        output: {
          name: string
          email: string
          employeeId: number
          department?: string | undefined
          startDate?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/not': {
      $post: {
        input: { json: { [x: string]: unknown } }
        output: { [x: string]: unknown }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/not-ref': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/not-enum': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/not-const': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/not-composition': {
      $get: { input: {}; output: { [x: string]: unknown }; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/all-of-sibling': {
      $get: {
        input: {}
        output: { id: number; createdAt: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/nullable-one-of': {
      $get: {
        input: {}
        output:
          | { type: 'credit_card'; cardNumber: string; expiry: string }
          | { type: 'bank_transfer'; bankCode: string; accountNumber: string }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/any-of-three': {
      $get: { input: {}; output: string | number | string; outputFormat: 'json'; status: 200 }
    }
  } & {
    '/any-of-ref': {
      $get: {
        input: {}
        output:
          | { name: string; purring?: boolean | undefined }
          | { name: string; barkVolume?: number | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
