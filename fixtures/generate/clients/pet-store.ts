// import { hc } from 'hono/client'
// import type routes from '../types/pet-store'

// export type Client = ReturnType<typeof hc<typeof routes>>

// export const hcWithType = (...args: Parameters<typeof hc>): Client =>
//   hc<typeof routes>(...args)

// export const client = hcWithType('/')


import { hc } from 'hono/client'
import type routes from '../types/pet-store'
import type { OpenAPIHono } from '@hono/zod-openapi'

export type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never

export type RemoveIndexSignature<T> = {
  [K in keyof T as
    string extends K ? never
    : number extends K ? never
    : symbol extends K ? never
    : K
  ]: T[K]
}

export type StripRoutesIndex<R> = RemoveIndexSignature<Expand<R>>

// ✅ OpenAPIHono は 0〜3 型引数まで、なので 3→2→1→0 の順でマッチ
export type StripOpenApiHonoIndex<T> =
  T extends OpenAPIHono<infer E, infer S, infer BasePath>
    ? OpenAPIHono<E, StripRoutesIndex<S>, BasePath>
    : T extends OpenAPIHono<infer E, infer S>
      ? OpenAPIHono<E, StripRoutesIndex<S>>
      : T extends OpenAPIHono<infer E>
        ? OpenAPIHono<E>
        : T

export type AddType = StripOpenApiHonoIndex<typeof routes>

export const client = hc<AddType>('/')