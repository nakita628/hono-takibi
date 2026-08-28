import { defineConfig } from 'vite-plus'

// oxlint-disable-next-line import/no-default-export -- Vite resolves the config through its default export
export default defineConfig({
  pack: {
    entry: {
      cli: './src/index.ts',
      index: './src/config/index.ts',
      'vite-plugin/index': './src/vite-plugin/index.ts',
      'generator/zod-openapi-hono/openapi/index':
        './src/generator/zod-openapi-hono/openapi/index.ts',
      'core/rpc/index': './src/core/rpc/index.ts',
      'core/hooks/index': './src/core/hooks/index.ts',
      'core/type/index': './src/core/type/index.ts',
      'core/docs/index': './src/core/docs/index.ts',
    },
    dts: true,
    // tsdown defaults to `.mjs` / `.d.mts` for node; `bin` and `exports` point at `.js` / `.d.ts`.
    outExtensions: () => ({ js: '.js', dts: '.d.ts' }),
  },
  test: {
    include: ['src/**/*.test.ts'],
    exclude: ['**/node_modules/**', '**/dist/**'],
    // process.chdir-based tests (bare index.ts outputs) rely on per-file process isolation.
    pool: 'forks',
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**', '**/dist/**'],
      reporter: ['text', 'text-summary'],
    },
  },
  lint: {
    ignorePatterns: ['**/dist/**', 'out/**', 'tmp/**', 'tmp-*/**'],
    // Setting `plugins` replaces oxlint's default list — restate the defaults, then add import.
    plugins: ['typescript', 'unicorn', 'oxc', 'import'],
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
    // reason, never as `'off'` here.
    //
    // Rules in the correctness / suspicious / perf categories are already errors via
    // `categories` above and are not restated; this list only adds rules from the
    // pedantic / style / restriction / nursery categories, which no category enables.
    rules: {
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-console': 'error',
      'no-plusplus': 'error',
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      'typescript/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      'typescript/no-misused-promises': 'error',
      'typescript/require-await': 'error',
      'typescript/prefer-readonly': 'error',
      'typescript/prefer-nullish-coalescing': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'typescript/no-unsafe-argument': 'error',
      'typescript/no-unsafe-assignment': 'error',
      'typescript/no-unsafe-member-access': 'error',
      'typescript/no-unsafe-call': 'error',
      'typescript/no-unsafe-return': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'import/no-cycle': 'error',
      'import/no-duplicates': 'error',
      // Hardening beyond the defaults: rules below were verified to hold across
      // `src` before being turned on, so any new violation is a real regression.
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
      'import/no-default-export': 'error',
      'import/no-mutable-exports': 'error',
      'import/first': 'error',
    },
    // Architecture rules for src: each directory may import only the siblings listed in its
    // message. Regexes match relative specifiers only, so external packages such as
    // `zod/v4/core` never collide with a banned directory name.
    overrides: [
      {
        files: [
          'src/utils/**',
          'src/format/**',
          'src/fsp/**',
          'src/merge/**',
          'src/openapi/**',
          'src/config/**',
        ],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^\\.\\./',
                  message: 'leaf module: no project-internal imports allowed',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/guard/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(cli|config|core|emit|format|fsp|generator|helper|merge|shared|utils|vite-plugin)(/.*)?$',
                  message: 'guard may only import openapi',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/emit/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(cli|config|core|generator|guard|helper|merge|openapi|shared|utils|vite-plugin)(/.*)?$',
                  message: 'emit may only import format, fsp',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/generator/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(cli|config|core|emit|format|fsp|merge|shared|vite-plugin)(/.*)?$',
                  message: 'generator may only import utils, guard, helper, openapi',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/helper/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+(cli|config|core|shared|vite-plugin)(/.*)?$',
                  message:
                    'helper may only import utils, guard, generator, openapi, emit, format, fsp, merge',
                },
                {
                  regex: '^\\./index(\\.js)?$',
                  message:
                    'import helper modules directly, not via the helper/index.ts barrel (cycle risk)',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/core/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+(cli|config|shared|vite-plugin)(/.*)?$',
                  message:
                    'core may only import utils, guard, helper, generator, openapi, emit, format, fsp, merge',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/shared/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(cli|emit|format|fsp|generator|guard|helper|merge|utils|vite-plugin)(/.*)?$',
                  message: 'shared may only import config, core, openapi',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/cli/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(emit|fsp|generator|guard|helper|merge|utils|vite-plugin)(/.*)?$',
                  message: 'cli may only import config, core, format, openapi, shared',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/vite-plugin/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+(cli|core|emit|fsp|generator|helper|merge|utils)(/.*)?$',
                  message: 'vite-plugin may only import config, format, guard, openapi, shared',
                },
              ],
            },
          ],
        },
      },
      {
        // `as OpenAPI` is the single sanctioned cast (CLAUDE.md type safety #1).
        files: ['src/openapi/index.ts'],
        rules: {
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
        },
      },
      {
        // honoTakibiVite(): any is intentional — avoids forcing Vite/Rollup type
        // installs on consumers (CLAUDE.md type safety #2).
        files: ['src/vite-plugin/index.ts'],
        rules: {
          'typescript/no-explicit-any': 'off',
        },
      },
      {
        // Test files may cast and use `any` (CLAUDE.md type safety #1); the type-safety rules that
        // exist only to police those casts are scoped off here, nothing else is.
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: ['vitest'],
        rules: {
          'no-restricted-imports': 'off',
          'typescript/no-explicit-any': 'off',
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
          'typescript/no-unsafe-argument': 'off',
          'typescript/no-unsafe-assignment': 'off',
          'typescript/no-unsafe-member-access': 'off',
          'typescript/no-unsafe-call': 'off',
          'typescript/no-unsafe-return': 'off',
          // Test files sit outside tsconfig.json, so type-aware lint sees the default lib,
          // which predates `toSorted`; `.sort()` on fresh arrays stays allowed here.
          'unicorn/no-array-sort': 'off',
          // The other vitest rules this suite relies on (no-focused-tests, expect-expect, ...)
          // sit in the correctness / suspicious categories, so enabling the plugin is enough.
          // The suite asserts inside try/catch and conditionals throughout (~600 sites).
          'vitest/no-conditional-expect': 'off',
        },
      },
    ],
  },
  // Style (printWidth / quotes / semicolons / import sorting) is inherited from the root
  // vite.config.ts; only the paths this workspace skips are declared here.
  fmt: {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', 'out/**', 'tmp/**', 'tmp-*/**'],
  },
})
