import type { OpenAPIHono } from '@hono/zod-openapi'

type RemoveIndexSignature<T> = {
  [K in keyof T as string extends K
    ? never
    : number extends K
      ? never
      : symbol extends K
        ? never
        : K]: T[K]
}

declare const routes: OpenAPIHono<
  Env,
  RemoveIndexSignature<
    {
      '/': { $get: { input: {}; output: { message: string }; outputFormat: 'json'; status: 200 } }
    } & {
      '/projects': {
        $get:
          | {
              input: { query: { chiban: string } }
              output: {
                id: string
                createdAt: string
                updatedAt: string
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
    }
  >,
  '/'
>
export default routes
