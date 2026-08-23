import { defineConfig } from 'vite-plus'

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
    rules: {
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
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      'typescript/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      'typescript/no-unsafe-type-assertion': 'error',
      'typescript/no-unnecessary-type-assertion': 'error',
      'typescript/no-unnecessary-type-arguments': 'error',
      'typescript/no-floating-promises': 'error',
      'typescript/await-thenable': 'error',
      'typescript/no-misused-promises': 'error',
      'typescript/consistent-return': 'error',
      'typescript/require-await': 'error',
      'typescript/prefer-readonly': 'error',
      'typescript/prefer-nullish-coalescing': 'error',
      'typescript/switch-exhaustiveness-check': 'error',
      'typescript/no-unsafe-argument': 'error',
      'typescript/no-unsafe-assignment': 'error',
      'typescript/no-unsafe-member-access': 'error',
      'typescript/no-unsafe-call': 'error',
      'typescript/no-unsafe-return': 'error',
      'unicorn/consistent-function-scoping': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/no-array-sort': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-spread': 'error',
      'unicorn/prefer-string-replace-all': 'error',
      'import/no-cycle': 'error',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
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
        // `as OpenAPI` is the single sanctioned cast (CLAUDE.md 型安全 #1).
        files: ['src/openapi/index.ts'],
        rules: {
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
        },
      },
      {
        // honoTakibiVite(): any is intentional — avoids forcing Vite/Rollup type
        // installs on consumers (CLAUDE.md 型安全 #2).
        files: ['src/vite-plugin/index.ts'],
        rules: {
          'typescript/no-explicit-any': 'off',
        },
      },
      {
        // Test files may cast and use `any` (CLAUDE.md 型安全 #1); the type-safety rules that
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
          // The suite asserts inside try/catch and conditionals throughout (~600 sites).
          'vitest/no-conditional-expect': 'off',
          'vitest/no-focused-tests': 'error',
          'vitest/no-disabled-tests': 'error',
          'vitest/no-commented-out-tests': 'error',
          'vitest/expect-expect': 'error',
          'vitest/require-mock-type-parameters': 'error',
        },
      },
    ],
  },
  fmt: {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', 'out/**', 'tmp/**', 'tmp-*/**'],
    printWidth: 100,
    singleQuote: true,
    semi: false,
    sortPackageJson: true,
    experimentalSortImports: {},
  },
})
