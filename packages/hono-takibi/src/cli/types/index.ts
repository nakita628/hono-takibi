export type Naming = 'PascalCase' | 'camelCase'
export type Ok<T> = { ok: true; value: T }
export type Err<E> = { ok: false; error: E }
export type Result<T, E = string> = Ok<T> | Err<E>
export const ok = <T>(v: T): Ok<T> => ({ ok: true, value: v })
export const err = <E>(e: E): Err<E> => ({ ok: false, error: e })

export type CliFlags = {
  input: string
  output: string
  exportType?: boolean
  exportSchema?: boolean
  typeCase?: Naming
  schemaCase?: Naming
  template: boolean
  test: boolean
  basePath?: string
}
