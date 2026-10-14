import { describe, expect, it } from 'vite-plus/test'

import type { Components } from '../../../../openapi/index.js'
import { parametersCode } from './parameters.js'

// `parametersCode` delegates each parameter's schema to `makeParameterSchema` (covered in
// helper/openapi.test.ts); what is proven here is the component wrapper around it.
describe('parametersCode', () => {
  it('should return empty string when no parameters', () => {
    const components: Components = {}
    expect(parametersCode(components, true, false)).toBe('')
  })

  it('should generate path parameter with export', () => {
    const components: Components = {
      parameters: {
        userId: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})`,
    )
  })

  it('should generate parameter without export', () => {
    const components: Components = {
      parameters: {
        page: {
          name: 'page',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, false, false)
    expect(result).toBe(
      String.raw`const PageParamsSchema=z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"page","in":"query","schema":{"type":"integer"},"required":false}})`,
    )
  })

  it('should generate parameter with export and type', () => {
    const components: Components = {
      parameters: {
        limit: {
          name: 'limit',
          in: 'query',
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, true)
    expect(result).toBe(
      String.raw`export const LimitParamsSchema=z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).exactOptional().openapi({param:{"name":"limit","in":"query","schema":{"type":"integer"},"required":false}})

export type LimitParams=z.infer<typeof LimitParamsSchema>`,
    )
  })

  it('should extract schema from content when schema is not provided', () => {
    const components = {
      parameters: {
        filter: {
          name: 'filter',
          in: 'query',
          content: {
            'application/json': {
              schema: { type: 'string' },
            },
          },
        },
      },
    } as unknown as Components
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      `export const FilterParamsSchema=z.preprocess((val)=>{if(typeof val!=='string')return val;try{return JSON.parse(val)}catch{return val}},z.string()).exactOptional().openapi({param:{"name":"filter","in":"query","content":{"application/json":{"schema":{"type":"string"}}},"required":false}})`,
    )
  })

  it('coerces a string-wire parameter through the shared parameter schema', () => {
    const components: Components = {
      parameters: {
        id: {
          name: 'id',
          in: 'path',
          required: true,
          schema: { type: 'integer' },
        },
      },
    }
    const result = parametersCode(components, true, false)
    expect(result).toBe(
      String.raw`export const IdParamsSchema=z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),z.int()).openapi({param:{"name":"id","in":"path","required":true,"schema":{"type":"integer"}}})`,
    )
  })

  // `Readonly<string>` is `string`, and on a branded scalar `.readonly()` would wrap the brand
  // and lose the primitive: the scalar is written as it is.
  // `Readonly<string>` は `string` のままであり、brand 付きスカラーでは `.readonly()` が brand を
  // 包んでプリミティブを失わせる。スカラーはそのまま書き出される。
  it('wraps no scalar parameter in readonly', () => {
    const components: Components = {
      parameters: {
        userId: {
          name: 'userId',
          in: 'path',
          required: true,
          schema: { type: 'string' },
        },
      },
    }
    const result = parametersCode(components, true, false, true)
    expect(result).toBe(
      `export const UserIdParamsSchema=z.string().openapi({param:{"name":"userId","in":"path","required":true,"schema":{"type":"string"}}})`,
    )
  })

  // A parameter that refers to a branded schema keeps `number & $brand<'Skip'>`: the handler
  // hands it to a use case as it came in.
  // brand 付きスキーマを参照するパラメータは `number & $brand<'Skip'>` を保つ。ハンドラーは
  // 受け取ったままユースケースに渡せる。
  it('keeps the brand of a parameter that refers to a branded scalar', () => {
    const components: Components = {
      schemas: { Skip: { type: 'integer', minimum: 0, 'x-brand': 'Skip' } },
      parameters: {
        skip: {
          name: 'skip',
          in: 'query',
          required: true,
          schema: { $ref: '#/components/schemas/Skip' },
        },
      },
    }
    const result = parametersCode(components, true, false, true)
    expect(result).toBe(
      String.raw`export const SkipParamsSchema=z.preprocess((val)=>(typeof val==='string'&&/^-?(\d+(\.\d*)?|\.\d+)([eE][+-]?\d+)?$/.test(val)&&(!/^-?\d+$/.test(val)||Number.isSafeInteger(Number(val)))?Number(val):val),SkipSchema.openapi({param:{"name":"skip","in":"query","required":true,"schema":{"$ref":"#/components/schemas/Skip"}}}))`,
    )
  })

  // `.readonly()` belongs to the container: an object parameter is still immutable.
  // `.readonly()` は入れ物に付く。object のパラメータは変わらず不変である。
  it('puts readonly on an object parameter', () => {
    const components: Components = {
      parameters: {
        filter: {
          name: 'filter',
          in: 'query',
          required: true,
          schema: { type: 'object', properties: { name: { type: 'string' } } },
        },
      },
    }
    const result = parametersCode(components, true, false, true)
    expect(result).toBe(
      `export const FilterParamsSchema=z.object({name:z.string().exactOptional()}).readonly().openapi({param:{"name":"filter","in":"query","required":true,"schema":{"type":"object","properties":{"name":{"type":"string"}}}},"required":[]})`,
    )
  })
})
