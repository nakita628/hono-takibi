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
  RemoveIndexSignature<{
    '/array': {
      $get: {
        input: {}
        output: {
          string_array: string[]
          number_array: number[]
          boolean_array: boolean[]
          nested_array: string[][]
          deep_nested_array: number[][][]
          first_element_fixed: string[]
          optional_elements_array: string[]
          min5_array: string[]
          max5_array: string[]
          length5_array: string[]
          nonempty_array: string[]
          unique_array: string[]
          mixed_array: (string | number | boolean)[]
          object_array: { id: number; name: string; active?: boolean | undefined }[]
          fixed_values_array: ('small' | 'medium' | 'large')[]
          email_array: string[]
          sorted_number_array: number[]
          at_least_one_even_number: number[]
          optional_array?: string[] | undefined
        }
        outputFormat: 'json'
        status: 200
      }
    }
  }>,
  '/'
>
export default routes
