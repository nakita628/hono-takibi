// type-app: the declaration file says of each route what an app built from the generated
// routes says, so that a client typed by either one sees the same thing (#608). The routes
// are compiled with it, which is what checks the annotation of a circular schema.
// type-app: 宣言ファイルが各ルートについて述べる内容は、生成されたルートから組み立てたアプリが
// 述べる内容と同じでなければならない。どちらで型付けしたクライアントからも同じものが見える
// ようにするためである(#608)。ルートも一緒にコンパイルされるので、循環スキーマの型注釈も
// ここで検査される。
import { OpenAPIHono } from '@hono/zod-openapi'
import type { z } from '@hono/zod-openapi'
import type { InferResponseType } from 'hono/client'
import { hc } from 'hono/client'

import {
  getAnythingRoute,
  getBesideRoute,
  getCallbackRoute,
  getReportRoute,
  getTreeRoute,
  postInputRoute,
  postPatchRoute,
} from '../__generated__/type-app/routes'
import type routes from '../__generated__/type-app/type'
import { assertType } from './assert'
import type { Equal, IsAny, IsAssignable, NotAny } from './assert'

/** `true` only for `unknown`: `any` is told apart first. */
type IsUnknown<T> = IsAny<T> extends true ? false : unknown extends T ? true : false

type SchemaOf<T> = T extends OpenAPIHono<infer _E, infer S, infer _B> ? S : never

// The handlers are never run: only what the routes make of the app's type is read.
// ハンドラは実行されない。ルートがアプリの型にもたらすものだけを読む。
const handler = (() => undefined) as never
const app = new OpenAPIHono()
  .openapi(getBesideRoute, handler)
  .openapi(getTreeRoute, handler)
  .openapi(getReportRoute, handler)
  .openapi(getAnythingRoute, handler)
  .openapi(getCallbackRoute, handler)
  .openapi(postInputRoute, handler)
  .openapi(postPatchRoute, handler)

type App = SchemaOf<typeof app>
type Typed = SchemaOf<typeof routes>

const client = hc<typeof routes>('http://localhost')

type Tree = { p: string; kids: Tree[] }

export function assertions() {
  // #634: the properties beside `allOf` are in the type, as they are in the Zod output.
  // #634: `allOf` の横の properties は、Zod の出力と同じく型にも含まれる。
  type BesideOut = Typed['/beside']['$get']['output']
  assertType<NotAny<BesideOut>>(true)
  assertType<Equal<BesideOut, { p: string; a?: string | undefined }>>(true)
  assertType<Equal<BesideOut, App['/beside']['$get']['output']>>(true)

  // The same in a schema that refers to itself.
  // 自分自身を参照するスキーマでも同じである。
  type TreeOut = Typed['/tree']['$get']['output']
  assertType<NotAny<TreeOut>>(true)
  assertType<Equal<TreeOut, Tree>>(true)
  assertType<
    Equal<
      z.infer<(typeof getTreeRoute.responses)[200]['content']['application/json']['schema']>,
      Tree
    >
  >(true)

  // #633: `text/plain` is a typed text body; `application/xml` is a bare `Response` in the
  // app, and a response whose body is not typed in the declaration file. The status stays.
  // #633: `text/plain` は型付きのテキスト本文である。`application/xml` はアプリでは素の
  // `Response` であり、宣言ファイルでは本文に型のないレスポンスになる。ステータスは残る。
  type ReportOut = Typed['/report']['$get']
  type TextOut = Extract<ReportOut, { status: 200 }>
  assertType<Equal<TextOut['output'], string>>(true)
  assertType<Equal<TextOut['outputFormat'], 'text'>>(true)
  assertType<Equal<TextOut, Extract<App['/report']['$get'], { outputFormat: 'text' }>>>(true)
  type XmlOut = Extract<ReportOut, { status: 201 }>
  assertType<Equal<XmlOut['status'], 201>>(true)
  assertType<Equal<XmlOut['outputFormat'], string>>(true)
  assertType<Equal<keyof XmlOut['output'], never>>(true)
  assertType<Equal<InferResponseType<typeof client.report.$get, 200>, string>>(true)

  // #632: a schema written `z.any()` is `any` on both sides; one checked on
  // `z.unknown()`, and the values of `z.looseObject({})`, are `unknown` as the schema
  // outputs them.
  // #632: `z.any()` と書かれるスキーマは、どちらの側でも `any` である。`z.unknown()` の上で
  // 検査されるスキーマと `z.looseObject({})` の値は、スキーマの出力どおり `unknown` である。
  type AnythingOut = Typed['/anything']['$get']['output']
  type AnythingApp = App['/anything']['$get']['output']
  type AnythingZod = z.infer<
    (typeof getAnythingRoute.responses)[200]['content']['application/json']['schema']
  >
  assertType<IsAny<AnythingOut['u']>>(true)
  assertType<IsAny<AnythingApp['u']>>(true)
  assertType<IsAny<AnythingOut['list'][number]>>(true)
  assertType<IsAny<AnythingApp['list'][number]>>(true)
  assertType<IsUnknown<AnythingOut['m']>>(true)
  assertType<IsUnknown<AnythingZod['m']>>(true)
  assertType<IsUnknown<AnythingOut['o'][string]>>(true)
  assertType<IsUnknown<AnythingZod['o'][string]>>(true)

  // #629: beside `patternProperties` a value is not known to be what
  // `additionalProperties` says, in the type as in the output of the schema.
  // #629: `patternProperties` の横では、値が `additionalProperties` の言うものだとは限らない。
  // 型でも、スキーマの出力でも同じである。
  type CallbackOut = Typed['/callback']['$get']['output']
  type CallbackZod = z.infer<
    (typeof getCallbackRoute.responses)[200]['content']['application/json']['schema']
  >
  assertType<IsUnknown<CallbackOut[string]>>(true)
  assertType<IsUnknown<CallbackZod[string]>>(true)
  assertType<IsAssignable<CallbackZod, CallbackOut>>(true)

  // #631: what a route takes in is what its schemas read. A parameter that is not a string
  // is read from text by a schema that takes `unknown`, a boolean by `z.stringbool()`, which
  // takes a string, and an optional property may be left out but is not `undefined`.
  // #631: ルートが受け取るものは、そのスキーマが読むものである。文字列でないパラメータは
  // `unknown` を受け取るスキーマがテキストから読み、boolean は文字列を受け取る
  // `z.stringbool()` が読む。オプショナルなプロパティは省略できるが、`undefined` ではない。
  type InputTyped = Typed['/input']['$post']['input']
  type InputApp = App['/input']['$post']['input']
  assertType<IsUnknown<InputTyped['query']['q']>>(true)
  assertType<Equal<InputTyped['query'], InputApp['query']>>(true)
  assertType<Equal<InputTyped['form'], { n?: string }>>(true)
  assertType<Equal<InputTyped['form'], InputApp['form']>>(true)

  // The same component is `| undefined` where it is handed out and not where it is taken in.
  // 同じコンポーネントでも、返すときは `| undefined` が付き、受け取るときは付かない。
  type PatchTyped = Typed['/patch']['$post']
  type PatchApp = App['/patch']['$post']
  assertType<Equal<PatchTyped['input']['json'], { id: string; note?: string }>>(true)
  assertType<Equal<PatchTyped['input']['json'], PatchApp['input']['json']>>(true)
  assertType<Equal<PatchTyped['output'], { id: string; note?: string | undefined }>>(true)
  assertType<Equal<PatchTyped['output'], PatchApp['output']>>(true)
}
