import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    index: './src/index.ts',
    'vite-plugin/index': './src/vite-plugin/index.ts',
    'config/index': './src/config/index.ts',
    'generator/zod-openapi-hono/openapi/index': './src/generator/zod-openapi-hono/openapi/index.ts',
    'core/rpc/index': './src/core/rpc/index.ts',
    'core/hooks/index': './src/core/hooks/index.ts',
    'core/type/index': './src/core/type/index.ts',
    'core/docs/index': './src/core/docs/index.ts',
  },
  format: 'esm',
  dts: true,
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
})
