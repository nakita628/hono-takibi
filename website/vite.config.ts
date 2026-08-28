import { defineConfig } from 'vite-plus'

// oxlint-disable-next-line import/no-default-export -- Vite resolves the config through its default export
export default defineConfig({
  lint: {
    ignorePatterns: [
      '**/node_modules/**',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
      'test-results/**',
    ],
    // Setting `plugins` replaces oxlint's default list — restate the defaults, then add
    // import and vue (Playground.vue is linted through its script block).
    plugins: ['typescript', 'unicorn', 'oxc', 'import', 'vue'],
    options: {
      typeAware: true,
      // typeCheck stays off: vitepress resolves vite 7 while @typespec/bundler ships vite 8
      // types, so `typespecBundle()` in .vitepress/config.ts fails TS2322 on the upstream
      // version skew alone (plain `tsc --noEmit` fails the same way). Enable once the two
      // dependencies agree on a vite major.
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
      // Side-effect imports are how a VitePress theme loads its CSS and how
      // vitepress-plugin-group-icons injects its virtual stylesheet.
      'import/no-unassigned-import': ['error', { allow: ['**/*.css', 'virtual:*'] }],
      // `_TypeSpecLibrary_` is the export shape of @typespec/bundler's emitted bundles.
      'no-underscore-dangle': ['error', { allow: ['_TypeSpecLibrary_'] }],
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
    // Architecture rules: `.vitepress/lib` → `components` → `theme` is the browser layering
    // (lib is the leaf; theme reaches lib only through components), while `.vitepress/config.ts`,
    // `lib/typespec/vite.ts` and the Playwright files are the node side and must not pull in
    // browser-only modules. Regexes match relative specifiers only, so external packages never
    // collide with a banned directory name.
    overrides: [
      {
        // Browser leaf: everything here ships to the client, so no node builtins and no
        // reaching up into components / theme. The node-only exception is typespec/vite.ts.
        files: ['.vitepress/lib/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+(components|theme)(/.*)?$',
                  message: 'lib is the leaf layer: it may not import components or theme',
                },
                {
                  regex: '^node:',
                  message:
                    'lib is browser code; node-only wiring lives in .vitepress/lib/typespec/vite.ts',
                },
              ],
            },
          ],
        },
      },
      {
        // Node-only VitePress wiring — node builtins are its job; the layering ban stays.
        files: ['.vitepress/lib/typespec/vite.ts'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+(components|theme)(/.*)?$',
                  message: 'lib is the leaf layer: it may not import components or theme',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['.vitepress/components/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+theme(/.*)?$',
                  message: 'components may only import lib',
                },
                {
                  regex: '^node:',
                  message: 'components are browser code: no node builtins',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['.vitepress/theme/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+lib(/.*)?$',
                  message: 'theme composes components; reach lib through a component',
                },
                {
                  regex: '^node:',
                  message: 'theme is browser code: no node builtins',
                },
              ],
            },
          ],
        },
      },
      {
        // Node-side site config: must not import browser modules (components / theme).
        // VitePress consumes it through its default export.
        files: ['.vitepress/config.ts'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^\\./(components|theme)(/.*)?$',
                  message: 'config.ts runs in node: it may not import browser modules',
                },
              ],
            },
          ],
          'import/no-default-export': 'off',
        },
      },
      {
        // Framework contracts: VitePress themes, ambient module declarations and the
        // Playwright config are all consumed through default exports.
        files: ['.vitepress/theme/index.ts', '.vitepress/env.d.ts', 'playwright.config.ts'],
        rules: {
          'import/no-default-export': 'off',
        },
      },
      {
        // The monaco-editor type graph (via @guolao/vue-monaco-editor) resolves to `error`
        // under oxlint-tsgolint, while plain tsc resolves it fine — every monaco member
        // access here would be a false positive. Both modules also sit on the dynamically
        // imported bundle boundary, where values arrive untyped by construction.
        files: ['.vitepress/lib/monaco/index.ts', '.vitepress/lib/typespec/index.ts'],
        rules: {
          'typescript/no-unsafe-argument': 'off',
          'typescript/no-unsafe-assignment': 'off',
          'typescript/no-unsafe-member-access': 'off',
          'typescript/no-unsafe-call': 'off',
          'typescript/no-unsafe-return': 'off',
        },
      },
      {
        // async-without-await implements TypeSpec's Promise-returning CompilerHost /
        // ServerHost contracts.
        files: ['.vitepress/lib/typespec/index.ts'],
        rules: {
          'typescript/require-await': 'off',
        },
      },
      {
        // `as OpenAPI` is the single sanctioned cast (CLAUDE.md type safety #1).
        files: ['.vitepress/lib/openapi/index.ts'],
        rules: {
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
        },
      },
      {
        // e2e drives the served site over HTTP; site internals stay out of reach.
        files: ['e2e/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex: '^(\\.\\./)+\\.vitepress(/.*)?$',
                  message: 'e2e tests talk to the served site, not to its internals',
                },
              ],
            },
          ],
        },
      },
    ],
  },
  // Style (printWidth / quotes / semicolons / import sorting) is inherited from the root
  // vite.config.ts, and so is htmlWhitespaceSensitivity: 'strict' (it protects
  // Playground.vue's whitespace-pre-wrap error pane and only works at the root); only the
  // paths this workspace skips are declared here.
  fmt: {
    ignorePatterns: [
      '**/node_modules/**',
      '.vitepress/cache/**',
      '.vitepress/dist/**',
      'test-results/**',
    ],
  },
})
