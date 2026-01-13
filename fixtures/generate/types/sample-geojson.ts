declare const routes: import('@hono/zod-openapi').OpenAPIHono<
  import('hono/types').Env,
  {
    '/': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
  } & {
    '/projects': {
      $get:
        | {
            input: { query: { chiban: string } }
            output: {
              id: string
              polygon?:
                | {
                    type:
                      | 'Point'
                      | 'MultiPoint'
                      | 'LineString'
                      | 'MultiLineString'
                      | 'Polygon'
                      | 'MultiPolygon'
                    bbox?: number[] | undefined
                    coordinates: number[][][][]
                  }
                | {
                    type:
                      | 'Point'
                      | 'MultiPoint'
                      | 'LineString'
                      | 'MultiLineString'
                      | 'Polygon'
                      | 'MultiPolygon'
                    bbox?: number[] | undefined
                    coordinates: number[][][]
                  }
                | undefined
              centre?:
                | { type: 'Point'; bbox?: number[] | undefined; coordinates: number[] }
                | undefined
              createdAt: string
              updatedAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { query: { chiban: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 400
          }
        | {
            input: { query: { chiban: string } }
            output: { message: string }
            outputFormat: 'json'
            status: 500
          }
    }
  },
  '/'
>
export default routes
