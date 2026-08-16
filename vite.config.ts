import { defineConfig } from 'vite-plus'

export default defineConfig({
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
      // Scratch output of manual CLI runs.
      'out/**',
    ],
    // Setting `plugins` replaces oxlint's default list — restate the defaults, then add import.
    plugins: ['typescript', 'unicorn', 'oxc', 'import'],
    options: {
      typeAware: true,
      typeCheck: true,
    },
    categories: {
      suspicious: 'error',
    },
    rules: {
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-param-reassign': 'error',
      // Codegen closures intentionally reuse names like `schema`; shadowing is idiomatic here.
      'no-shadow': 'off',
      // `_enum` / `in_` / `_CUSTOM_CODE_GUARD` avoid keyword collisions in generated identifiers.
      'no-underscore-dangle': 'off',
      'typescript/no-explicit-any': 'error',
      'typescript/no-non-null-assertion': 'error',
      'typescript/consistent-type-imports': 'error',
      'typescript/consistent-type-assertions': ['error', { assertionStyle: 'never' }],
      'typescript/no-floating-promises': 'error',
      'typescript/await-thenable': 'error',
      'typescript/no-misused-promises': 'error',
      // Codegen 原則 #5 sanctions inline closures duplicated per function body.
      'unicorn/consistent-function-scoping': 'off',
      // Guard-clause early returns (bare `return`) beside value returns are idiomatic here.
      'typescript/consistent-return': 'off',
      // helper ⇄ generator/zod-to-openapi mutual recursion and barrel access are by design.
      'import/no-cycle': 'off',
      'import/no-self-import': 'error',
      'import/no-duplicates': 'error',
    },
    // Architecture rules for packages/hono-takibi/src: each directory may import only the
    // siblings listed in its message. Regexes match relative specifiers only, so external
    // packages such as `zod/v4/core` never collide with a banned directory name.
    overrides: [
      {
        files: [
          'packages/hono-takibi/src/utils/**',
          'packages/hono-takibi/src/format/**',
          'packages/hono-takibi/src/fsp/**',
          'packages/hono-takibi/src/merge/**',
          'packages/hono-takibi/src/openapi/**',
          'packages/hono-takibi/src/config/**',
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
        files: ['packages/hono-takibi/src/guard/**'],
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
        files: ['packages/hono-takibi/src/emit/**'],
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
        files: ['packages/hono-takibi/src/generator/**'],
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
        files: ['packages/hono-takibi/src/helper/**'],
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
        files: ['packages/hono-takibi/src/core/**'],
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
        files: ['packages/hono-takibi/src/shared/**'],
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
        files: ['packages/hono-takibi/src/cli/**'],
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
        files: ['packages/hono-takibi/src/vite-plugin/**'],
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
        files: ['packages/hono-takibi/src/openapi/index.ts'],
        rules: {
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
        },
      },
      {
        // honoTakibiVite(): any is intentional — avoids forcing Vite/Rollup type
        // installs on consumers (CLAUDE.md 型安全 #2).
        files: ['packages/hono-takibi/src/vite-plugin/index.ts'],
        rules: {
          'typescript/no-explicit-any': 'off',
        },
      },
      {
        // test/** covers the runtime-test harness (hosts, scripts) alongside co-located tests;
        // casts are sanctioned in test code (CLAUDE.md 型安全 #1).
        files: ['**/*.test.ts', '**/*.test.tsx', '**/*.spec.ts', 'test/**'],
        plugins: ['vitest'],
        rules: {
          'no-restricted-imports': 'off',
          'typescript/no-explicit-any': 'off',
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
          'typescript/no-unnecessary-type-assertion': 'off',
          'typescript/no-unnecessary-type-arguments': 'off',
          'unicorn/no-array-sort': 'off',
          'vitest/no-focused-tests': 'error',
          // Existing test style asserts inside try/catch, comments out with intent,
          // and keeps assertion-free smoke tests (e.g. "does not throw" generations).
          'vitest/no-conditional-expect': 'off',
          'vitest/require-mock-type-parameters': 'off',
          'vitest/no-commented-out-tests': 'off',
          'vitest/expect-expect': 'off',
        },
      },
    ],
  },
  fmt: {
    ignorePatterns: ['**/node_modules/**', '**/dist/**', 'test/__generated__/**', 'out/**'],
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
