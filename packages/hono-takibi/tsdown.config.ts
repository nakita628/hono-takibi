import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'vite-plugin/index': './src/vite-plugin/index.ts',
    'config/index': './src/config/index.ts',
    'generator/zod-openapi-hono/openapi/index': './src/generator/zod-openapi-hono/openapi/index.ts',
    'core/rpc/index': './src/core/rpc/index.ts',
    'core/swr/index': './src/core/swr/index.ts',
    'core/tanstack-query/index': './src/core/tanstack-query/index.ts',
    'core/svelte-query/index': './src/core/svelte-query/index.ts',
    'core/vue-query/index': './src/core/vue-query/index.ts',
    'core/type/index': './src/core/type/index.ts',
  },
  format: 'esm',
  dts: true,
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
})
