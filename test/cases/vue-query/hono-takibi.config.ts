import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: '../../specs/users.yaml',
  // The hooks call the client the client block generates, so the app is scaffolded here too.
  // Its handlers are stubs the harness fills in for tsc; at run time the host in
  // hosts/users-app.ts answers, handed every request by the fetch the test installs.
  // フックは client ブロックが生成するクライアントを呼び出すため、アプリもここで scaffold する。
  // そのハンドラは tsc のためにハーネスが埋めるスタブであり、実行時は hosts/users-app.ts の
  // ホストが、テストが差し込む fetch からすべてのリクエストを受け取って応答する。
  output: '../../__generated__/vue-query/src/routes.ts',
  template: { routeHandler: true },
  client: { output: '../../__generated__/vue-query/src/client.ts' },
  'vue-query': {
    output: '../../__generated__/vue-query/hooks.ts',
  },
})
