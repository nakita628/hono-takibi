import { defineConfig } from 'vite-plus'

export default defineConfig({
  esbuild: {
    jsx: 'automatic',
  },
  test: {
    include: [
      'runtime/**/*.test.ts',
      'runtime/**/*.test.tsx',
      '__generated__/mock/**/*.test.ts',
      '__generated__/template/**/*.test.ts',
    ],
    exclude: ['**/node_modules/**'],
    // Regenerates __generated__ from specs before the suite runs (needs hono-takibi built).
    globalSetup: ['./scripts/global-setup.ts'],
    pool: 'forks',
  },
  lint: {
    ignorePatterns: [
      '**/node_modules/**',
      '__generated__/**',
      // Overlay sources are copy templates completed inside __generated__/<case>
      // after generation; they only resolve (aliases, relative routes) in that
      // destination, where the per-case tsc checks them.
      'cases/*/overlay/**',
    ],
    // Setting `plugins` replaces oxlint's default list — restate the defaults, then add
    // import and vitest (every source here is test code or its harness).
    plugins: ['typescript', 'unicorn', 'oxc', 'import', 'vitest'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    categories: {
      correctness: 'error',
      suspicious: 'error',
      perf: 'error',
    },
    // Strict by design: exceptions live next to the code as `oxlint-disable-next-line` with a
    // reason, never as `'off'` here. Everything under test/ is test code or its harness, so the
    // CLAUDE.md-sanctioned cast/`any` allowances (型安全 #1) apply to the whole project.
    rules: {
      'typescript/consistent-type-assertions': 'off',
      'typescript/no-unsafe-type-assertion': 'off',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-shadow': 'error',
      'no-underscore-dangle': 'error',
      'no-console': 'error',
      'no-plusplus': 'error',
      'no-await-in-loop': 'error',
      'no-unused-vars': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/await-thenable': 'error',
      'typescript/no-misused-promises': 'error',
      'typescript/consistent-return': 'error',
      'typescript/require-await': 'error',
      'typescript/prefer-readonly': 'error',
      'typescript/prefer-nullish-coalescing': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-array-for-each': 'error',
      // Runtime tests are type-checked per case with lib ES2022, which predates `toSorted`.
      'unicorn/no-array-sort': 'off',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
      'vitest/no-focused-tests': 'error',
      'vitest/no-disabled-tests': 'error',
      'vitest/no-conditional-expect': 'error',
      'vitest/no-commented-out-tests': 'error',
      'vitest/expect-expect': 'error',
      'vitest/require-mock-type-parameters': 'error',
    },
  },
  fmt: {
    ignorePatterns: ['**/node_modules/**', '__generated__/**'],
    printWidth: 100,
    singleQuote: true,
    semi: false,
    sortPackageJson: true,
    experimentalSortImports: {},
  },
})
