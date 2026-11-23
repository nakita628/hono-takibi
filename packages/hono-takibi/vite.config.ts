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
      'generator/mock/index': './src/generator/mock/index.ts',
      'core/rpc/index': './src/core/rpc/index.ts',
      'core/hooks/index': './src/core/hooks/index.ts',
      'core/type/index': './src/core/type/index.ts',
      'core/docs/index': './src/core/docs/index.ts',
      'generate/index': './src/generate/index.ts',
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
    // The suite drives real files, real generators and `node dist/cli.js` subprocesses;
    // under a fully parallel run the 5s default is contention, not a hung test.
    testTimeout: 30_000,
    coverage: {
      include: ['src/**/*.ts'],
      exclude: ['**/*.test.ts', '**/*.d.ts', '**/node_modules/**', '**/dist/**'],
      reporter: ['text', 'text-summary'],
    },
  },
  lint: {
    ignorePatterns: ['**/dist/**', 'out/**', 'tmp/**', 'tmp-*/**'],
    // Node-only package: declaring the runtime is what lets rules that resolve globals
    // (`no-undef`, `unicorn/prefer-global-this`) tell `process` apart from a typo.
    env: { node: true, es2024: true },
    // Setting `plugins` replaces oxlint's default list — restate the defaults, then add
    // import / promise / node, and jest for the tests: its rules read `describe` / `it` /
    // `expect` by name, which is how the tests call them through `vite-plus/test`, and it has
    // rules the vitest plugin has no counterpart of (`no-restricted-matchers`, `no-export`).
    plugins: ['typescript', 'unicorn', 'oxc', 'import', 'promise', 'node', 'jsdoc', 'jest'],
    // The repository conventions a glob cannot express (Effect program shape, function
    // declarations, predicate naming); see lint/custom.js.
    jsPlugins: ['./lint/custom.js'],
    options: {
      typeAware: true,
      typeCheck: true,
      // A rule that stops firing must have its `oxlint-disable` comment deleted with it,
      // otherwise the suppression silently outlives its reason.
      reportUnusedDisableDirectives: 'deny',
      // Nothing here is configured as a warning; this keeps a rule that defaults to
      // `warn` from slipping through `vp check` unnoticed.
      denyWarnings: true,
    },
    categories: {
      correctness: 'error',
      suspicious: 'error',
      perf: 'error',
    },
    // Strict by design: exceptions live next to the code as `oxlint-disable-next-line` with a
    // reason, never as `'off'` here. A rule that does not fit this codebase at all is left
    // out of the list entirely, with a comment where it would have gone saying why.
    //
    // Rules in the correctness / suspicious / perf categories are already errors via
    // `categories` above and are not restated; this list only adds rules from the
    // pedantic / style / restriction / nursery categories, which no category enables.
    rules: {
      // The tests (jest plugin). Codegen tests own a byte-for-byte contract: equality is strict,
      // a primitive is compared with toBe, and nothing is a snapshot — the expected text is in
      // the test, where a reviewer reads it. A test runs, is named once, and asserts
      // unconditionally.
      'jest/valid-expect': ['error', { maxArgs: 2 }],
      'jest/no-identical-title': 'error',
      'jest/no-disabled-tests': 'error',
      'jest/no-focused-tests': 'error',
      'jest/no-duplicate-hooks': 'error',
      'jest/no-test-return-statement': 'error',
      // A hook that sets up a directory or a server asserts that it did.
      'jest/no-standalone-expect': [
        'error',
        { additionalTestBlockFunctions: ['beforeAll', 'beforeEach', 'afterAll', 'afterEach'] },
      ],
      'jest/no-done-callback': 'error',
      'jest/no-export': 'error',
      'jest/no-alias-methods': 'error',
      'jest/prefer-to-be': 'error',
      'jest/prefer-strict-equal': 'error',
      'jest/prefer-to-have-length': 'error',
      'jest/prefer-equality-matcher': 'error',
      'jest/prefer-comparison-matcher': 'error',
      'jest/prefer-todo': 'error',
      'jest/no-restricted-matchers': [
        'error',
        {
          toMatchSnapshot: 'Write the expected value out with toBe / toStrictEqual.',
          toMatchInlineSnapshot: 'Write the expected value out with toBe / toStrictEqual.',
          toThrowErrorMatchingSnapshot: 'Name the error the call throws.',
          toThrowErrorMatchingInlineSnapshot: 'Name the error the call throws.',
          toEqual: 'Use toStrictEqual: toEqual passes on undefined properties and other classes.',
          // A matcher that checks part of a value lets a regression in the rest of it pass. The
          // rule matches the start of the chain, so `expect(x).not.toContain()` is
          // `not.toContain`: each matcher is restricted behind every modifier too.
          ...Object.fromEntries(
            Object.entries({
              toContain: 'Compare the whole value with toBe / toStrictEqual.',
              toContainEqual: 'Compare the whole value with toStrictEqual.',
              toMatch: 'Compare the whole string with toBe.',
              toMatchObject: 'Compare the whole object with toStrictEqual.',
              toHaveProperty: 'Compare the whole object with toStrictEqual.',
              toBeDefined: 'Compare with the value itself.',
              toBeTruthy: 'Compare with the value itself.',
              toBeFalsy: 'Compare with the value itself.',
            }).flatMap(([matcher, message]) =>
              ['', 'not.', 'resolves.', 'rejects.', 'resolves.not.', 'rejects.not.'].map(
                (modifier) => [`${modifier}${matcher}`, message],
              ),
            ),
          ),
        },
      ],
      'custom/effect-gen-return': 'error',
      'custom/no-effect-fn': 'error',
      'custom/no-effect-flatmap': 'error',
      'custom/function-declaration': 'error',
      'custom/predicate-is-name': 'error',
      'custom/no-partial-assertion': 'error',
      // `@internal` and friends are modifiers, so their text belongs to the description;
      // `check-tag-names` is what catches a tag that is merely misspelled.
      'jsdoc/empty-tags': 'error',
      'jsdoc/check-tag-names': 'error',
      'custom/no-effect-run': 'error',
      'custom/effect-promise-import': 'error',
      'custom/type-pascal-case': 'error',
      // Purpose: keep a comment from pointing at a Markdown file that does not exist.
      // oxlint-disable-next-line custom/no-dangling-doc-reference -- the NG example names a missing file on purpose
      // NG:      // `as OpenAPI` is allowed (CLAUDE.md type safety #1).   <- no CLAUDE.md
      // OK:      // `as OpenAPI` is the single sanctioned cast in `src`.
      'custom/no-dangling-doc-reference': 'error',
      eqeqeq: 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      'no-param-reassign': ['error', { props: true }],
      'no-console': 'error',
      'no-plusplus': 'error',
      // `_tag` is Effect's discriminant on tagged errors and data types; every other
      // dangling underscore stays a smell.
      'no-underscore-dangle': ['error', { allow: ['_tag'] }],
      // Paired with `env: { node: true }` above, so `process` resolves and a typo does not.
      'no-undef': 'error',
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

      // --- Hardening beyond the enabled categories -------------------------
      // Everything below sits in `pedantic` / `style` / `restriction` / `nursery`,
      // which oxlint leaves off by default. The list mirrors the one in
      // nakita628/hekireki; only rules reachable from this codebase are named, so
      // class / enum / namespace / DOM rules are deliberately absent rather than
      // enabled as dead weight.

      // Escape hatches out of the type system, and the unsound types that survive `strict`.
      'typescript/ban-ts-comment': 'error',
      'typescript/prefer-ts-expect-error': 'error',
      'typescript/no-unsafe-function-type': 'error',
      'typescript/no-empty-object-type': 'error',
      'typescript/no-invalid-void-type': 'error',
      'typescript/no-non-null-asserted-nullish-coalescing': 'error',
      'typescript/non-nullable-type-assertion-style': 'error',
      'typescript/no-dynamic-delete': 'error',
      'typescript/strict-void-return': 'error',

      // Declaration style. `consistent-type-definitions: 'type'` locks in the repo-wide
      // `type X = {...}`; the default of this rule is the opposite ('interface'), so the
      // option is load-bearing, not decoration.
      'typescript/consistent-type-definitions': ['error', 'type'],
      'typescript/consistent-type-exports': 'error',
      'typescript/consistent-generic-constructors': 'error',
      'typescript/array-type': 'error',
      'typescript/method-signature-style': 'error',
      'typescript/no-inferrable-types': 'error',
      'typescript/dot-notation': 'error',
      'typescript/prefer-for-of': 'error',
      'typescript/prefer-find': 'error',
      'typescript/prefer-function-type': 'error',
      // ESM-only package: a `require` call would not survive the build.
      'typescript/no-require-imports': 'error',
      'typescript/no-import-type-side-effects': 'error',

      // Rejections and throws must carry an Error, or the CLI reports `[object Object]`
      // instead of an actionable message.
      'no-throw-literal': 'error',
      'unicorn/error-message': 'error',
      'unicorn/prefer-type-error': 'error',

      // Node / ESM hygiene.
      'unicorn/prefer-module': 'error',
      'unicorn/prefer-global-this': 'error',
      'unicorn/require-module-specifiers': 'error',
      // `unicorn/import-style` is deliberately absent: it wants `node:path` as a default
      // import, and `path` is a domain noun here (OpenAPI Path Item objects), so the
      // namespace shadows a local in nearly every file that needs it.
      'unicorn/prefer-export-from': 'error',
      'unicorn/prefer-import-meta-properties': 'error',
      // `no-abusive-eslint-disable` pairs with `reportUnusedDisableDirectives` above: a
      // suppression must name the rule it silences and must still be earning its place.
      'unicorn/no-abusive-eslint-disable': 'error',
      'unicorn/no-anonymous-default-export': 'error',

      // String and array work: this is what a codegen library does all day.
      'prefer-template': 'error',
      'no-useless-concat': 'error',
      'no-multi-str': 'error',
      'unicorn/consistent-template-literal-escape': 'error',
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/require-array-join-separator': 'error',
      'unicorn/prefer-negative-index': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-object-from-entries': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      // `unicorn/prefer-code-point` is deliberately absent: `charCodeAt` feeds the
      // identifier-hash fallback in src/utils, where the UTF-16 code unit is the value
      // that has been baked into generated names.
      'unicorn/prefer-native-coercion-functions': 'error',
      'unicorn/consistent-empty-array-spread': 'error',
      'unicorn/prefer-single-call': 'error',
      'unicorn/no-useless-collection-argument': 'error',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-unnecessary-array-flat-depth': 'error',
      'unicorn/no-magic-array-flat-depth': 'error',
      'unicorn/no-unnecessary-slice-end': 'error',
      'unicorn/no-length-as-slice-end': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-immediate-mutation': 'error',

      // Regex and numbers.
      'unicorn/prefer-regexp-test': 'error',
      'prefer-regex-literals': 'error',
      'require-unicode-regexp': 'error',
      'no-div-regex': 'error',
      'no-regex-spaces': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/prefer-math-min-max': 'error',
      'unicorn/prefer-math-trunc': 'error',
      'unicorn/prefer-modern-math-apis': 'error',
      'unicorn/numeric-separators-style': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/escape-case': 'error',
      'unicorn/no-hex-escape': 'error',
      radix: 'error',
      'prefer-numeric-literals': 'error',
      'prefer-exponentiation-operator': 'error',
      // `no-implicit-coercion` is deliberately absent: its fix rewrites `!!(a && b)` to
      // `Boolean(a && b)`, and TypeScript's aliased-condition narrowing (`const ok = !!(a && b)`
      // implying `a` and `b` later) does not survive the call form. The rule would trade a
      // real type guarantee for a stylistic one.
      'unicorn/no-typeof-undefined': 'error',

      // Control flow and declarations. `curly` is `multi-line` rather than `all` so the
      // guard-clause form (`if (!x) return null` on one line) stays legal, while a body
      // that wraps onto its own line must be braced.
      curly: ['error', 'multi-line'],
      'no-useless-return': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/prefer-logical-operator-over-ternary': 'error',
      'unicorn/prefer-default-parameters': 'error',
      'unicorn/no-object-as-default-parameter': 'error',
      'unicorn/no-unreadable-iife': 'error',
      'unicorn/no-useless-switch-case': 'error',
      'default-case-last': 'error',
      'default-param-last': 'error',
      'no-fallthrough': 'error',
      'no-case-declarations': 'error',
      'array-callback-return': 'error',
      'no-loop-func': 'error',
      'no-inner-declarations': 'error',
      'block-scoped-var': 'error',
      'init-declarations': 'error',
      'no-redeclare': 'error',
      'no-multi-assign': 'error',
      'no-sequences': 'error',
      'no-useless-assignment': 'error',
      'no-unreachable-loop': 'error',
      // Hoisted `function` declarations are safe to reference above their definition;
      // `const` / `class` are the TDZ hazard this rule is for.
      'no-use-before-define': ['error', { functions: false }],
      'func-style': ['error', 'declaration', { allowArrowFunctions: true }],
      'arrow-body-style': 'error',
      'prefer-arrow-callback': 'error',
      'guard-for-in': 'error',
      'no-labels': 'error',
      'no-label-var': 'error',
      'no-extra-label': 'error',
      'no-lone-blocks': 'error',
      yoda: 'error',
      'no-self-compare': 'error',

      // Objects and globals.
      'object-shorthand': 'error',
      'operator-assignment': 'error',
      'prefer-object-has-own': 'error',
      'no-prototype-builtins': 'error',
      'no-object-constructor': 'error',
      'no-array-constructor': 'error',
      'no-new-wrappers': 'error',
      'unicorn/new-for-builtins': 'error',
      'prefer-rest-params': 'error',
      'no-implicit-globals': 'error',
      'no-extra-bind': 'error',
      'no-useless-computed-key': 'error',
      'unicorn/no-useless-promise-resolve-reject': 'error',
      'unicorn/prefer-structured-clone': 'error',
      'unicorn/prefer-optional-catch-binding': 'error',
      // The rule's default name is `error`; restating it keeps a stray `e` from
      // creeping back in.
      'unicorn/catch-error-name': ['error', { name: 'error' }],

      // Code injection surfaces (`eval` itself is already `correctness`).
      'no-script-url': 'error',
      'no-bitwise': 'error',
      // `void promise` is the marker `typescript/no-floating-promises` prescribes for a
      // deliberate fire-and-forget; `void 0` stays banned.
      'no-void': ['error', { allowAsStatement: true }],
      'no-empty': 'error',
      'no-empty-function': 'error',
      'unicode-bom': 'error',
      // `capIsNew: false`: Effect Schema's constructors are capitalized functions
      // (`Schema.TemplateLiteral`, `Schema.Literals`) called without `new`. The other
      // half of the rule — `new` on a lowercase function — stays on.
      'new-cap': ['error', { capIsNew: false }],
      // A parked TODO is debt that belongs in an issue, not in the source.
      'no-warning-comments': 'error',
      // A `${...}` inside a single-quoted string is almost always a template literal
      // that lost its backticks — a real hazard when the product is emitted source.
      'no-template-curly-in-string': 'error',

      // promise / node rules sit outside the enabled categories, so the ones that matter
      // for an async Node CLI are named explicitly.
      'promise/param-names': 'error',
      'promise/valid-params': 'error',
      'promise/spec-only': 'error',
      'promise/no-new-statics': 'error',
      'promise/no-multiple-resolved': 'error',
      'promise/no-return-wrap': 'error',
      'promise/no-return-in-finally': 'error',
      'promise/no-nesting': 'error',
      'promise/no-promise-in-callback': 'error',
      'promise/no-callback-in-promise': 'error',
      'promise/catch-or-return': 'error',
      'promise/always-return': 'error',
      'promise/prefer-catch': 'error',
      // `promise/prefer-await-to-then` is deliberately absent: it matches any `.catch()`,
      // and zod's `.catch(fallback)` — all over the generator fixtures — is a schema
      // method, not a promise.
      'node/no-exports-assign': 'error',
      'node/no-new-require': 'error',
      'node/no-mixed-requires': 'error',
      'node/global-require': 'error',
      'node/no-path-concat': 'error',
      'node/handle-callback-err': 'error',
      'node/callback-return': 'error',

      // Module graph. `extensions` keeps relative specifiers `.js`-suffixed, which
      // NodeNext resolution requires at runtime and `tsc` does not check.
      'import/extensions': ['error', 'always', { ignorePackages: true }],
      'import/export': 'error',
      'import/unambiguous': 'error',
      'import/no-commonjs': 'error',
      'import/no-named-default': 'error',
      // A namespace import hides which names a module takes from another. The modules of
      // `@effect/platform-node` are the exception: each is named for the service it provides
      // (`NodeFileSystem.layer`), which is how Effect's own code and documentation spell them.
      'import/no-namespace': ['error', { ignore: ['@effect/platform-node/*'] }],
      'import/no-unassigned-import': 'error',
      'import/no-named-as-default': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/consistent-type-specifier-style': 'error',
      // Dependency hygiene. `import/no-extraneous-dependencies` is not implemented by oxlint;
      // `custom/no-undeclared-dependency` below does its work.
      'import/no-self-import': 'error',
      'import/no-absolute-path': 'error',
      'import/no-empty-named-blocks': 'error',
      // Naming: the identifiers a reader scans first.
      'no-shadow-restricted-names': 'error',
      'no-delete-var': 'error',
      // --- Second hardening pass --------------------------------------------
      // Every rule below was measured against `src` before being turned on: it either
      // held already, or the handful of sites it found were rewritten in the same change.

      // Module graph and dependencies. `custom/no-undeclared-dependency` stands in for
      // `import/no-extraneous-dependencies`, which oxlint does not implement: a bare
      // specifier in shipped code must be a `dependency` or `peerDependency` of
      // package.json, since a `devDependency` reaching `src` breaks the published package.
      'custom/no-undeclared-dependency': 'error',
      'import/named': 'error',
      'import/newline-after-import': 'error',
      'import/no-amd': 'error',
      'import/no-dynamic-require': 'error',
      'import/no-webpack-loader-syntax': 'error',
      // A type import and a value import of one module stay two statements
      // (`import/consistent-type-specifier-style`); anything else is one.
      'no-duplicate-imports': ['error', { allowSeparateTypeImports: true }],
      // A ratchet, not a target: the widest module today imports 13 others, and a module
      // that needs more is doing the work of two.
      'import/max-dependencies': ['error', { max: 13 }],
      // The process is configured by a config file and flags, never by the environment,
      // and only the CLI entry decides when it ends.
      'node/no-process-env': 'error',
      'unicorn/no-process-exit': 'error',
      // An Effect program reads files through the FileSystem service; a `*Sync` call
      // blocks the event loop under `concurrency: 'unbounded'`.
      'node/no-sync': 'error',
      // A promise is built by `Effect.tryPromise` around an API that returns one, not by hand.
      'promise/avoid-new': 'error',
      'no-promise-executor-return': 'error',

      // Naming. A vague name is banned outright, and a one-letter name is kept to the
      // conventional ones: `k` / `v` for an entry, `s` / `p` / `n` / `m` / `i` for the
      // string, path, name, match and index of a one-line callback, `a` / `b` for a
      // comparator, `z` for zod, and single capitals for type parameters.
      'custom/identifier-case': 'error',
      'id-length': [
        'error',
        {
          min: 2,
          properties: 'never',
          exceptions: [
            '_',
            'k',
            'v',
            's',
            'p',
            'n',
            'm',
            'i',
            'a',
            'b',
            'z',
            'T',
            'K',
            'A',
            'E',
            'M',
          ],
        },
      ],
      'id-denylist': [
        'error',
        'data',
        'tmp',
        'temp',
        'foo',
        'bar',
        'cb',
        'err',
        'e',
        'res',
        'req',
        'obj',
        'val',
        'arr',
        'str',
        'fn',
        'ret',
        'idx',
        'cnt',
        'num',
        'buf',
        'ctx',
        'elem',
        'el',
        'cur',
        'x',
        'y',
      ],
      'func-name-matching': 'error',

      // Size ratchets. The limits are the tightest that hold today, so the deepest
      // nesting in the codebase is as deep as it gets.
      'max-depth': ['error', 4],
      'max-nested-callbacks': ['error', 4],
      'max-classes-per-file': ['error', 2],

      // Conditions. A condition is a boolean, a string or a number that is there, or an
      // explicit question: an `any`, an object the types call always present and a union of
      // a schema with a boolean (`items`, `additionalProperties`) are asked with `isPresent`
      // or compared, so `0`, `false` and `null` are never dropped by accident. An optional
      // string stays a condition: `if (description)` means "written and not empty" in some
      // 200 places, and that is what it should mean.
      // A number is never a condition (`allowNumber: false`): `if (minimum)` loses `0`.
      'typescript/strict-boolean-expressions': [
        'error',
        { allowNullableBoolean: true, allowNullableString: true, allowNumber: false },
      ],
      // What the types call impossible is not asked. Where the document may hold what
      // `OpenAPI` does not describe (a key with nothing after it, a `type` that is an
      // object), the value is read as `unknown` or asked through a guard (`isRecord`,
      // `isPresent`), which says so; a bare `x !== null` on a type without `null` does not.
      'typescript/no-unnecessary-condition': 'error',

      // Types. The repository writes a dictionary as an index signature
      // (`{ readonly [k: string]: X }`), which can be `readonly` where `Record` cannot say so
      // without a wrapper.
      'typescript/consistent-indexed-object-style': ['error', 'index-signature'],
      'typescript/adjacent-overload-signatures': 'error',
      'typescript/unified-signatures': 'error',
      'typescript/ban-tslint-comment': 'error',
      'typescript/no-unnecessary-qualifier': 'error',
      // No enums, namespaces or parameter properties: none of them survives type stripping,
      // and a union of literals says what an enum says.
      'typescript/no-namespace': 'error',
      'typescript/no-mixed-enums': 'error',
      'typescript/prefer-enum-initializers': 'error',
      'typescript/prefer-literal-enum-member': 'error',
      'oxc/no-const-enum': 'error',
      'typescript/parameter-properties': 'error',
      'typescript/no-empty-interface': 'error',
      // The two classes of this package are tagged errors; these keep a third honest.
      'typescript/class-literal-property-style': 'error',
      'typescript/prefer-return-this-type': 'error',
      'typescript/related-getter-setter-pairs': 'error',
      'accessor-pairs': 'error',
      'grouped-accessor-pairs': 'error',
      'class-methods-use-this': 'error',
      'no-constructor-return': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-this-assignment': 'error',
      'unicorn/prefer-class-fields': 'error',
      'unicorn/custom-error-definition': 'error',

      // Regex and strings.
      'typescript/prefer-regexp-exec': 'error',
      'unicorn/no-console-spaces': 'error',
      'unicorn/require-number-to-fixed-digits-argument': 'error',

      // Control flow.
      'default-case': 'error',
      'unicorn/switch-case-braces': ['error', 'avoid'],
      'unicorn/switch-case-break-position': 'error',
      'unicorn/prefer-ternary': 'error',
      'unicorn/no-negation-in-equality-check': 'error',
      'logical-assignment-operators': 'error',
      'no-eq-null': 'error',
      'sort-vars': 'error',
      'vars-on-top': 'error',
      'oxc/branches-sharing-code': 'error',
      'oxc/bad-bitwise-operator': 'error',

      // Objects, arrays and built-ins.
      'no-proto': 'error',
      'no-alert': 'error',
      // `unicorn/no-array-method-this-argument` is deliberately absent: it reads the mapper
      // of `Effect.forEach(items, f)` as the `thisArg` of an array method.
      'unicorn/no-instanceof-array': 'error',
      'unicorn/no-new-buffer': 'error',
      'unicorn/no-unnecessary-array-splice-count': 'error',
      'unicorn/no-useless-iterator-to-array': 'error',
      'unicorn/prefer-prototype-methods': 'error',
      'unicorn/prefer-reflect-apply': 'error',
      'unicorn/prefer-date-now': 'error',
      'unicorn/consistent-date-clone': 'error',
      'unicorn/prefer-event-target': 'error',
      'unicorn/prefer-bigint-literals': 'error',
      'unicorn/text-encoding-identifier-case': 'error',
      'unicorn/explicit-timer-delay': 'error',
      'unicorn/consistent-assert': 'error',
      'unicorn/prefer-top-level-await': 'error',
      'unicorn/require-module-attributes': 'error',

      // JSDoc: a tag that is written says something.
      'jsdoc/check-access': 'error',
      'jsdoc/no-blank-blocks': 'error',
      'jsdoc/require-param-name': 'error',
      'jsdoc/require-param-description': 'error',
      'jsdoc/require-returns-description': 'error',
      'jsdoc/check-property-names': 'error',
      'jsdoc/implements-on-classes': 'error',
      'jsdoc/no-defaults': 'error',
      'jsdoc/require-property': 'error',
      'jsdoc/require-property-description': 'error',
      'jsdoc/require-property-name': 'error',
      'jsdoc/require-throws-description': 'error',
      'jsdoc/require-yields-description': 'error',

      // `unicorn/filename-case` is deliberately absent: the component modules are named
      // after the OpenAPI Components Object keys they emit (`mediaTypes.ts`, `pathItems.ts`,
      // `requestBodies.ts`, `securitySchemes.ts`), which are also the config field names.
      // Kebab-casing them would break a correspondence that is worth more than the rule.
    },
    // Architecture rules for src: each directory may import only the siblings listed in its
    // message. Regexes match relative specifiers only, so external packages such as
    // `zod/v4/core` never collide with a banned directory name.
    overrides: [
      {
        files: [
          'src/utils/**',
          'src/error/**',
          'src/file/**',
          'src/merge/**',
          'src/openapi/**',
          'src/config/**',
          'src/constants/**',
        ],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  // `constants` is plain data with no imports of its own, so a leaf may read it.
                  regex: '^\\.\\./(?!constants(/|$))',
                  message: 'leaf module: no project-internal imports allowed but constants',
                },
              ],
            },
          ],
        },
      },
      {
        files: ['src/format/**'],
        rules: {
          'no-restricted-imports': [
            'error',
            {
              patterns: [
                {
                  regex:
                    '^(\\.\\./)+(cli|config|core|emit|file|generator|guard|helper|merge|openapi|shared|utils|vite-plugin)(/.*)?$',
                  message: 'format may only import error',
                },
              ],
            },
          ],
        },
      },
      {
        // The places an Effect meets something that is not one: the Vite plugin's hooks are
        // Vite's own Promise/callback API, `generate` hands a Promise to a program that
        // generates code itself, and the test helpers hand a result back to a test.
        // Everywhere else an Effect is returned, not run.
        files: ['src/vite-plugin/**', 'src/generate/**', 'src/testing/**'],
        rules: { 'custom/no-effect-run': 'off' },
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
                    '^(\\.\\./)+(cli|config|core|emit|file|format|generator|helper|merge|shared|utils|vite-plugin)(/.*)?$',
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
                  message: 'emit may only import format, file',
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
                    '^(\\.\\./)+(cli|config|core|emit|file|format|merge|shared|vite-plugin)(/.*)?$',
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
                  // `config` is a leaf that imports nothing of the project, so naming its
                  // type here closes no cycle.
                  regex: '^(\\.\\./)+(cli|core|shared|vite-plugin)(/.*)?$',
                  message:
                    'helper may only import utils, guard, generator, openapi, emit, format, file, merge, config',
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
                    'core may only import utils, guard, helper, generator, openapi, emit, format, file, merge',
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
                  regex: '^(\\.\\./)+(cli|emit|generator|guard|merge|utils|vite-plugin)(/.*)?$',
                  // `file` is already below `shared` through `core`, which imports it
                  // directly; naming it here only forced `shared` to re-derive the two
                  // filesystem calls it needs from the raw service.
                  message: 'shared may only import config, core, file, format, helper, openapi',
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
                  regex: '^(\\.\\./)+(emit|file|generator|helper|merge|utils|vite-plugin)(/.*)?$',
                  message: 'cli may only import config, core, format, guard, openapi, shared',
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
                  regex: '^(\\.\\./)+(cli|core|emit|generator|merge|utils)(/.*)?$',
                  message:
                    'vite-plugin may only import config, file, format, guard, helper, openapi, shared',
                },
              ],
            },
          ],
        },
      },
      {
        // The convention plugin is an oxlint JS plugin: it walks an untyped ESTree and its
        // contract with oxlint is a default export.
        files: ['lint/**'],
        rules: {
          'import/no-default-export': 'off',
          'import/no-anonymous-default-export': 'off',
          'typescript/no-unsafe-argument': 'off',
          'typescript/no-unsafe-assignment': 'off',
          'typescript/no-unsafe-call': 'off',
          'typescript/no-unsafe-member-access': 'off',
          'typescript/no-unsafe-return': 'off',
          'typescript/strict-boolean-expressions': 'off',
          'typescript/no-unnecessary-condition': 'off',
        },
      },
      {
        // `as OpenAPI` is the single sanctioned cast in `src`.
        files: ['src/openapi/index.ts'],
        rules: {
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
        },
      },
      {
        // honoTakibiVite(): any is intentional — avoids forcing Vite/Rollup type
        // installs on consumers.
        files: ['src/vite-plugin/index.ts'],
        rules: {
          'typescript/no-explicit-any': 'off',
        },
      },
      {
        // Test files may cast and use `any`; the type-safety rules that exist only to police
        // those casts are scoped off here, nothing else is.
        files: ['**/*.test.ts', '**/*.spec.ts'],
        plugins: ['vitest'],
        rules: {
          // A test arranges and asserts imperatively when that is the clearest way to
          // spell a fixture out; the structural rules describe `src`, not the suite.
          'custom/effect-gen-return': 'off',
          'custom/function-declaration': 'off',
          'custom/predicate-is-name': 'off',
          // `let` declared per suite and assigned in a hook is the shape of a fixture,
          // not an uninitialized binding waiting to bite.
          'init-declarations': 'off',
          // Stub callbacks (`() => {}` passed to a plugin hook or a spy) are the point.
          'no-empty-function': 'off',
          // Mock implementations return whatever is convenient; the contract they stand
          // in for is what the assertions check.
          'typescript/strict-void-return': 'off',
          // Assertions frequently nest a narrowing `if` inside a guard, which reads as a
          // lonely `if` while spelling out the case under test.
          'unicorn/no-lonely-if': 'off',
          'no-restricted-imports': 'off',
          'typescript/no-explicit-any': 'off',
          'typescript/consistent-type-assertions': 'off',
          'typescript/no-unsafe-type-assertion': 'off',
          // `strict-boolean-expressions` stays on, as set for `src` above.
          // Purpose: catch a condition that is always true, which hides the assertion behind it.
          // NG:      if (result) expect(result.data).toBe('x')   // a safeParse result is an object
          // OK:      if (result.success) expect(result.data).toBe('x')
          // `no-unnecessary-condition` is off: test files sit outside tsconfig.json, so the
          // checker reads them without `noUncheckedIndexedAccess`, and every guard on an
          // indexed value (`if (lines[0] === undefined)`) would read as dead.
          'typescript/no-unnecessary-condition': 'off',
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
          'jest/no-conditional-expect': 'off',
          // The jest plugin does not know vitest's `describe(name, options, fn)`, and reports
          // the options object as a callback that is not a function. `vitest/valid-describe-callback`
          // reads the signature as it is.
          'jest/valid-describe-callback': 'off',
          // Fixtures feed and assert on source text that contains a literal `${...}`;
          // there that is the value under test, not a lost backtick.
          'no-template-curly-in-string': 'off',
          // The suite drives real files and subprocesses: it reads and writes
          // synchronously, waits on hand-built promises and nests `describe` callbacks.
          'node/no-sync': 'off',
          'promise/avoid-new': 'off',
          'no-promise-executor-return': 'off',
          'max-nested-callbacks': 'off',
          // A fixture names its throwaway values as briefly as it likes.
          'id-length': 'off',
          'id-denylist': 'off',
          'custom/identifier-case': 'off',
          'custom/no-undeclared-dependency': 'off',
          'vitest/consistent-each-for': 'error',
          'vitest/consistent-vitest-vi': 'error',
          'vitest/consistent-test-filename': 'error',
          'vitest/max-nested-describe': 'error',
          'vitest/no-import-node-test': 'error',
          'vitest/no-unneeded-async-expect-function': 'error',
          'vitest/prefer-called-exactly-once-with': 'error',
          'vitest/prefer-called-once': 'error',
          'vitest/prefer-mock-promise-shorthand': 'error',
          'vitest/prefer-mock-return-shorthand': 'error',
          'vitest/prefer-strict-boolean-matchers': 'error',
          'vitest/prefer-strict-equal': 'error',
          'vitest/prefer-to-be': 'error',
          'vitest/prefer-to-be-object': 'error',
          'vitest/prefer-to-contain': 'error',
          'vitest/prefer-to-have-length': 'error',
          'vitest/prefer-comparison-matcher': 'error',
          'vitest/prefer-expect-resolves': 'error',
          'vitest/prefer-todo': 'error',
          'vitest/prefer-importing-vitest-globals': 'error',
          'vitest/no-identical-title': 'error',
          'vitest/valid-expect': 'error',
          'vitest/valid-title': 'error',
          'vitest/valid-describe-callback': 'error',
          // An `expect` outside a test case is never run and never reported.
          'vitest/no-standalone-expect': 'error',
          'vitest/no-test-return-statement': 'error',
          'vitest/no-test-prefixes': 'error',
          'vitest/no-duplicate-hooks': 'error',
          'vitest/prefer-hooks-on-top': 'error',
          'vitest/prefer-hooks-in-order': 'error',
          'vitest/consistent-test-it': 'error',
          'vitest/no-alias-methods': 'error',
          'vitest/prefer-equality-matcher': 'error',
          // `vitest/prefer-called-with` is deliberately absent: the vite-plugin suite
          // asserts that a hook fired at all, and pinning arguments there would test the
          // plugin's internal call shape rather than its contract.
          'vitest/require-to-throw-message': 'error',
          'vitest/prefer-each': 'error',
          'vitest/prefer-spy-on': 'error',
          'vitest/no-mocks-import': 'error',
          // Snapshots are a partial-match assertion by another name, so they are kept
          // small and literal where they appear at all.
          'vitest/no-interpolation-in-snapshots': 'error',
          'vitest/no-large-snapshots': 'error',
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
