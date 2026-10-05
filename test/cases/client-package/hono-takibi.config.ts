import { defineConfig } from 'hono-takibi'

// The client in a package of its own, between the package of the app and the package of
// the frontend. `client.import` names the module the client imports the app type from and
// `client.package` the name the hooks of another package import the client by; the hooks
// in the package of the client keep importing it relatively. The three package.json files
// come from seed/, so each output directory is a package when the generator runs.
// アプリのパッケージとフロントエンドのパッケージの間に、独立したパッケージとして置かれる
// クライアント。`client.import` はクライアントがアプリの型を import するモジュール、
// `client.package` は別パッケージのフックがクライアントを import する名前である。クライアントと
// 同じパッケージのフックは従来どおり相対パスで import する。3 つの package.json は seed/ から
// 配置され、生成器の実行時には各出力ディレクトリがパッケージになっている。
export default defineConfig({
  input: '../../specs/users.yaml',
  output: '../../__generated__/client-package/server/src/index.ts',
  template: { define: true },
  client: {
    output: '../../__generated__/client-package/client/src/lib/client.ts',
    import: '@fixtures/client-package-server',
    package: '@fixtures/client-package-client',
  },
  swr: { output: '../../__generated__/client-package/client/src/swr.ts' },
  'tanstack-query': { output: '../../__generated__/client-package/web/src/hooks.ts' },
})
