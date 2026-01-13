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
                | (
                    | ((({
                        type:
                          | 'Feature'
                          | 'FeatureCollection'
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                          | 'GeometryCollection'
                        bbox?: number[] | undefined
                      } & {
                        type:
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                          | 'GeometryCollection'
                      }) & {
                        type:
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                      }) & { coordinates: number[][][][] })
                    | ((({
                        type:
                          | 'Feature'
                          | 'FeatureCollection'
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                          | 'GeometryCollection'
                        bbox?: number[] | undefined
                      } & {
                        type:
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                          | 'GeometryCollection'
                      }) & {
                        type:
                          | 'Point'
                          | 'MultiPoint'
                          | 'LineString'
                          | 'MultiLineString'
                          | 'Polygon'
                          | 'MultiPolygon'
                      }) & { coordinates: number[][][] })
                  )
                | undefined
              centre?:
                | ((({
                    type:
                      | 'Feature'
                      | 'FeatureCollection'
                      | 'Point'
                      | 'MultiPoint'
                      | 'LineString'
                      | 'MultiLineString'
                      | 'Polygon'
                      | 'MultiPolygon'
                      | 'GeometryCollection'
                    bbox?: number[] | undefined
                  } & {
                    type:
                      | 'Point'
                      | 'MultiPoint'
                      | 'LineString'
                      | 'MultiLineString'
                      | 'Polygon'
                      | 'MultiPolygon'
                      | 'GeometryCollection'
                  }) & {
                    type:
                      | 'Point'
                      | 'MultiPoint'
                      | 'LineString'
                      | 'MultiLineString'
                      | 'Polygon'
                      | 'MultiPolygon'
                  }) & { type: 'Point'; coordinates: number[] })
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
