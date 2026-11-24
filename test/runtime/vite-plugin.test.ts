// The Vite plugin (cases/vite-plugin, with the TypeSpec input specs/vite-plugin.tsp).
//
// A dev server started with `honoTakibiVite()` reads hono-takibi.config.ts from Vite's
// root and generates on startup. The test deletes the generated output, starts a server,
// and waits for the output to come back.
//
// The root is the case directory and the working directory is not: the config, its input
// and its output are all found from the root, as under `vite --root`.
//
// Vite プラグインの検証(cases/vite-plugin。入力は TypeSpec の specs/vite-plugin.tsp)。
//
// `honoTakibiVite()` を指定して起動した開発サーバーは、Vite の root から
// hono-takibi.config.ts を読み込み、起動時にコード生成を行う。このテストでは、生成済みの
// 出力を削除してからサーバーを起動し、出力が再び生成されるのを待つ。
//
// root はケースのディレクトリで、作業ディレクトリとは異なる。設定ファイル、入力、出力は
// すべて root を基準に解決される(`vite --root` と同じ状況)。
import { existsSync, readFileSync, rmSync } from 'node:fs'
import path from 'node:path'

import { honoTakibiVite } from 'hono-takibi/vite-plugin'
import { createServer } from 'vite'
import { expect, it, vi } from 'vite-plus/test'

const testRoot = path.resolve(import.meta.dirname, '..')
const caseDir = path.join(testRoot, 'cases', 'vite-plugin')
const routesFile = path.join(testRoot, '__generated__', 'vite-plugin', 'routes.ts')
// The output directory is removed first, so the file that appears can only have been written by
// the plugin. The generated file has to hold the route of the TypeSpec input, not merely exist.
//
// The wait is on the content, not on the path: `fs.writeFile` opens the file before it
// writes, so for a moment the file exists and is empty. A wait on `existsSync` alone can
// end inside that moment and read ''.
// 最初に出力ディレクトリを削除するため、その後に現れるファイルは、
// プラグインが書き出したものに限られる。生成されたファイルは、存在するだけでなく、
// TypeSpec 入力のルートを含んでいなければならない。
//
// 待機条件はパスではなく内容にする。`fs.writeFile` は書き込みの前にファイルを open するため、
// 一瞬だけ「存在するが空」の状態になる。`existsSync` だけを待つと、その瞬間に抜けて
// '' を読んでしまうことがある。
const expected = `import { createRoute, z } from '@hono/zod-openapi'

const TodoSchema = z
  .object({
    id: z.int32(),
    title: z.string().min(1),
    description: z.string().exactOptional(),
    completed: z.boolean(),
    createdAt: z.iso.datetime({ offset: true }),
    updatedAt: z.iso.datetime({ offset: true }),
  })
  .openapi({ required: ['id', 'title', 'completed', 'createdAt', 'updatedAt'] })
  .openapi('Todo')

const TodoListSchema = z
  .object({ total: z.int32(), items: z.array(TodoSchema) })
  .openapi({ required: ['total', 'items'] })
  .openapi('TodoList')

const ErrorSchema = z
  .object({ message: z.string(), code: z.string().exactOptional() })
  .openapi({ required: ['message'] })
  .openapi('Error')

const CreateTodoInputSchema = z
  .object({ title: z.string().min(1).max(200), description: z.string().exactOptional() })
  .openapi({ required: ['title'] })
  .openapi('CreateTodoInput')

const UpdateTodoInputSchema = z
  .object({
    title: z.string().min(1).max(200).exactOptional(),
    description: z.string().exactOptional(),
    completed: z.boolean().exactOptional(),
  })
  .openapi({ required: [] })
  .openapi('UpdateTodoInput')

export const getTodosRoute = createRoute({
  method: 'get',
  path: '/todos',
  tags: ['Todos'],
  operationId: 'Todos_list',
  request: {
    query: z.object({
      limit: z
        .preprocess(
          (val) =>
            typeof val === 'string' &&
            /^-?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+-]?\\d+)?$/.test(val) &&
            (!/^-?\\d+$/.test(val) || Number.isSafeInteger(Number(val)))
              ? Number(val)
              : val,
          z.int32(),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'limit',
            in: 'query',
            required: false,
            schema: { type: 'integer', format: 'int32' },
            explode: false,
          },
        }),
      offset: z
        .preprocess(
          (val) =>
            typeof val === 'string' &&
            /^-?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+-]?\\d+)?$/.test(val) &&
            (!/^-?\\d+$/.test(val) || Number.isSafeInteger(Number(val)))
              ? Number(val)
              : val,
          z.int32(),
        )
        .exactOptional()
        .openapi({
          param: {
            name: 'offset',
            in: 'query',
            required: false,
            schema: { type: 'integer', format: 'int32' },
            explode: false,
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoListSchema } },
    },
  },
})

export const postTodosRoute = createRoute({
  method: 'post',
  path: '/todos',
  tags: ['Todos'],
  operationId: 'Todos_create',
  request: {
    body: { content: { 'application/json': { schema: CreateTodoInputSchema } }, required: true },
  },
  responses: {
    201: {
      description: 'The request has succeeded and a new resource has been created as a result.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    400: {
      description: 'The server could not understand the request due to invalid syntax.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getTodosIdRoute = createRoute({
  method: 'get',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_get',
  request: {
    params: z.object({
      id: z
        .preprocess(
          (val) =>
            typeof val === 'string' &&
            /^-?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+-]?\\d+)?$/.test(val) &&
            (!/^-?\\d+$/.test(val) || Number.isSafeInteger(Number(val)))
              ? Number(val)
              : val,
          z.int32(),
        )
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const deleteTodosIdRoute = createRoute({
  method: 'delete',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_remove',
  request: {
    params: z.object({
      id: z
        .preprocess(
          (val) =>
            typeof val === 'string' &&
            /^-?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+-]?\\d+)?$/.test(val) &&
            (!/^-?\\d+$/.test(val) || Number.isSafeInteger(Number(val)))
              ? Number(val)
              : val,
          z.int32(),
        )
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
  },
  responses: {
    204: {
      description: 'There is no content to send for this request, but the headers may be useful. ',
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const patchTodosIdRoute = createRoute({
  method: 'patch',
  path: '/todos/{id}',
  tags: ['Todos'],
  operationId: 'TodoById_update',
  request: {
    params: z.object({
      id: z
        .preprocess(
          (val) =>
            typeof val === 'string' &&
            /^-?(\\d+(\\.\\d*)?|\\.\\d+)([eE][+-]?\\d+)?$/.test(val) &&
            (!/^-?\\d+$/.test(val) || Number.isSafeInteger(Number(val)))
              ? Number(val)
              : val,
          z.int32(),
        )
        .openapi({
          param: {
            name: 'id',
            in: 'path',
            required: true,
            schema: { type: 'integer', format: 'int32' },
          },
        }),
    }),
    body: { content: { 'application/json': { schema: UpdateTodoInputSchema } }, required: true },
  },
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: { 'application/json': { schema: TodoSchema } },
    },
    400: {
      description: 'The server could not understand the request due to invalid syntax.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
    404: {
      description: 'The server cannot find the requested resource.',
      content: { 'application/json': { schema: ErrorSchema } },
    },
  },
})

export const getHealthRoute = createRoute({
  method: 'get',
  path: '/health',
  tags: ['Health'],
  operationId: 'Health_check',
  responses: {
    200: {
      description: 'The request has succeeded.',
      content: {
        'application/json': {
          schema: z.object({ status: z.literal('ok') }).openapi({ required: ['status'] }),
        },
      },
    },
  },
})
`

it('the vite plugin generates from the .tsp input when the dev server starts', async () => {
  rmSync(path.dirname(routesFile), { recursive: true, force: true })
  expect(existsSync(routesFile)).toBe(false)

  const server = await createServer({
    root: caseDir,
    logLevel: 'silent',
    server: { middlewareMode: true },
    plugins: [honoTakibiVite()],
  })
  await vi.waitFor(
    () => {
      expect(existsSync(routesFile)).toBe(true)
      expect(readFileSync(routesFile, 'utf8')).toBe(expected)
    },
    { timeout: 30_000 },
  )
  await server.close()

  // Every path of the TypeSpec input is there, compiled to OpenAPI and then to routes.
  // TypeSpec 入力のすべてのパスが、OpenAPI を経てルートにコンパイルされている。
  expect(readFileSync(routesFile, 'utf8')).toBe(expected)
}, 60_000)
