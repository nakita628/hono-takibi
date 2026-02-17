declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/expressions': {
      $post: {
        input: {
          json:
            | { type: 'literal'; value: string | number | boolean }
            | { type: 'unary'; operator: '-' | '!'; operand: unknown }
            | { type: 'binary'; operator: '+' | '-' | '*' | '/'; left: unknown; right: unknown }
        }
        output:
          | { type: 'literal'; value: string | number | boolean }
          | { type: 'unary'; operator: '-' | '!'; operand: unknown }
          | { type: 'binary'; operator: '+' | '-' | '*' | '/'; left: unknown; right: unknown }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/shapes': {
      $post: {
        input: {
          json:
            | { kind: 'circle'; radius: number }
            | { kind: 'rectangle'; width: number; height: number }
            | { kind: 'triangle'; base: number; height: number }
            | { kind: 'polygon'; sides: number; sideLength: number }
            | { kind: 'ellipse'; semiMajor: number; semiMinor: number }
        }
        output:
          | { kind: 'circle'; radius: number }
          | { kind: 'rectangle'; width: number; height: number }
          | { kind: 'triangle'; base: number; height: number }
          | { kind: 'polygon'; sides: number; sideLength: number }
          | { kind: 'ellipse'; semiMajor: number; semiMinor: number }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/documents': {
      $post: {
        input: {
          json:
            | {
                id: string
                title: string
                createdAt: string
                docType: 'article'
                body: string
                wordCount?: number | undefined
              }
            | {
                id: string
                title: string
                createdAt: string
                docType: 'spreadsheet'
                rows: number
                columns: number
              }
        }
        output:
          | {
              id: string
              title: string
              createdAt: string
              docType: 'article'
              body: string
              wordCount?: number | undefined
            }
          | {
              id: string
              title: string
              createdAt: string
              docType: 'spreadsheet'
              rows: number
              columns: number
            }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/configs': {
      $post: {
        input: {
          json: {
            version: number
            host: string
            port: number
            tlsEnabled: boolean
            certPath?: string | undefined
          }
        }
        output: {
          version: number
          host: string
          port: number
          tlsEnabled: boolean
          certPath?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/nullable-union': {
      $get: {
        input: {}
        output:
          | { status: 'success'; data: { [x: string]: unknown } }
          | { status: 'error'; message: string; code?: number | undefined }
        outputFormat: 'json'
        status: 200
      }
    }
  } & {
    '/nested-circular': {
      $get: {
        input: {}
        output: {
          id: number
          name: string
          parent?: unknown | undefined
          children?: unknown[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
