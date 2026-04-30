import { defineConfig } from 'vite-plus'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  test: {
    include: ['packages/**/src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**', 'apps/**'],
    coverage: {
      include: ['packages/hono-takibi/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**', '**/dist/**'],
      reporter: ['text', 'text-summary'],
    },
  },
  lint: {
    ignorePatterns: [
      '**/apps/**',
      '**/dist/**',
      '**/docs/**',
      '**/fixtures/**',
      '**/routeTree.gen.ts',
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', '**/fixtures/**'],
    printWidth: 100,
    singleQuote: true,
    semi: false,
    sortPackageJson: true,
    experimentalSortImports: {},
  },
  staged: {
    '*.{js,ts,tsx}': 'vp check --fix',
  },
})
