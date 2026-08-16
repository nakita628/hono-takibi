import { defineConfig } from 'tsdown'

export default defineConfig({
  entry: {
    cli: './src/index.ts',
    index: './src/config/index.ts',
    'vite-plugin/index': './src/vite-plugin/index.ts',
    'generator/zod-openapi-hono/openapi/index': './src/generator/zod-openapi-hono/openapi/index.ts',
    'core/rpc/index': './src/core/rpc/index.ts',
    'core/hooks/index': './src/core/hooks/index.ts',
    'core/type/index': './src/core/type/index.ts',
    'core/docs/index': './src/core/docs/index.ts',
  },
  dts: true,
  outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
})
