import { defineConfig } from 'vite-plus'

export default defineConfig({
  build: {
    sourcemap: true,
  },
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    include: [
      'packages/**/src/**/*.test.ts',
      'test/runtime/**/*.test.ts',
      'test/runtime/**/*.test.tsx',
      'test/__generated__/mock/**/*.test.ts',
      'test/__generated__/template/**/*.test.ts',
    ],
    exclude: ['**/node_modules/**', '**/dist/**', 'apps/**'],
    // Regenerates test/__generated__ from test/specs before the suite runs.
    globalSetup: ['./test/scripts/global-setup.ts'],
    // process.chdir-based tests (bare index.ts outputs) rely on per-file process isolation.
    pool: 'forks',
    coverage: {
      include: ['packages/hono-takibi/src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**', '**/dist/**'],
      reporter: ['text', 'text-summary'],
    },
  },
  lint: {
    // website/ is a standalone VitePress site outside the pnpm workspace, with its own
    // vitepress/vue deps the root typecheck can't resolve — exclude it from lint/typecheck.
    ignorePatterns: [
      '**/apps/**',
      '**/dist/**',
      '**/website/**',
      'test/__generated__/**',
      // Overlay sources are copy templates completed inside __generated__/<case>
      // after generation; they only resolve (aliases, relative routes) in that
      // destination, where the per-case tsc checks them.
      'test/cases/*/overlay/**',
    ],
    options: {
      typeAware: true,
      typeCheck: true,
    },
  },
  fmt: {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', 'test/__generated__/**'],
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
