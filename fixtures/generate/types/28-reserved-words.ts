declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/class': {
      $get: {
        input: {}
        output: {
          class?: string | undefined
          extends?: string | undefined
          implements?: string[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  } & { '/interface': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/type': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/function': { $post: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/return': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/import': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/export': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/default': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/new': { $post: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/delete': { $delete: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/void': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/null': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/true': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/false': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/if': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/else': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/for': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/while': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/switch': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/case': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/break': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/continue': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/try': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/catch': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/finally': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/throw': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/async': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/await': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/yield': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/static': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/public': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/private': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/protected': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/abstract': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/final': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/extends': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/implements': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/package': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/enum': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/const': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/let': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/var': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/this': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/super': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/self': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/constructor': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/prototype': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & { '/toString': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } } } & {
    '/valueOf': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/hasOwnProperty': { $get: { input: {}; output: {}; outputFormat: string; status: 200 } }
  } & {
    '/name-collisions': {
      $get: {
        input: {}
        output: {
          User?: string | undefined
          user?: string | undefined
          USER?: string | undefined
          id?: string | undefined
          ID?: string | undefined
          Id?: string | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  },
  '/'
>
export default routes
