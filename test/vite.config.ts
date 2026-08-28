import { defineConfig } from 'vite-plus'

export default defineConfig({
  // oxlint-disable-next-line typescript/no-deprecated -- vite-plus does not accept the `oxc` replacement yet
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
    // CLAUDE.md-sanctioned cast/`any` allowances (type safety #1) apply to the whole project.
    //
    // Rules in the correctness / suspicious / perf categories (including every vitest rule this
    // suite relies on) are already errors via `categories` above and are not restated; this list
    // only adds rules from the pedantic / style / restriction / nursery categories, which no
    // category enables.
    rules: {
      'typescript/consistent-type-assertions': 'off',
      'typescript/no-unsafe-type-assertion': 'off',
      eqeqeq: 'error',
      'no-new-func': 'error',
      'no-return-assign': 'error',
      'no-else-return': 'error',
      'no-lonely-if': 'error',
      'prefer-object-spread': 'error',
      'symbol-description': 'error',
      'typescript/no-deprecated': 'error',
      'typescript/restrict-plus-operands': 'error',
      'typescript/no-confusing-void-expression': 'error',
      'typescript/only-throw-error': 'error',
      'typescript/prefer-promise-reject-errors': 'error',
      'typescript/prefer-reduce-type-parameter': 'error',
      'typescript/prefer-includes': 'error',
      'typescript/prefer-string-starts-ends-with': 'error',
      'typescript/prefer-optional-chain': 'error',
      'typescript/use-unknown-in-catch-callback-variable': 'error',
      'typescript/return-await': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/throw-new-error': 'error',
      // `import/no-default-export` stays off here: every `hosts/*.ts` fixture is imported
      // as a Hono app through its default export, which is the shape the runtime tests need.
      'import/no-mutable-exports': 'error',
      'import/first': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-console': 'error',
      'no-plusplus': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      'typescript/no-misused-promises': 'error',
      'typescript/require-await': 'error',
      'typescript/prefer-readonly': 'error',
      'typescript/prefer-nullish-coalescing': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'unicorn/no-array-for-each': 'error',
      // Runtime tests are type-checked per case with lib ES2022, which predates `toSorted`.
      'unicorn/no-array-sort': 'off',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
    },
  },
  // Style (printWidth / quotes / semicolons / import sorting) is inherited from the root
  // vite.config.ts; only the paths this workspace skips are declared here.
  fmt: {
    ignorePatterns: ['**/node_modules/**', '__generated__/**'],
  },
})
