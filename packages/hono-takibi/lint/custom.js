// Repo-specific convention plugin (an oxlint JS plugin using the alpha ESLint-compatible API).
// It reads the meaning of an initializer from the AST, which a glob cannot express. The rules
// are the structural half of nakita628/hekireki's plugin, kept to the ones this package can
// actually hold:
//   custom/effect-gen-return   every `Effect.gen` is written as
//                              `function name(...) { return Effect.gen(function* () { ... }) }`
//                              (a trailing `.pipe(...)` is allowed for scoping / recovery)
//   custom/no-effect-fn        `Effect.fn` / `Effect.fnUntraced` never appear — the shape above is
//                              the one way to write an Effect-returning function
//   custom/no-effect-flatmap   `Effect.flatMap` / `Effect.andThen` never appear — control flow is
//                              written as straight-line `Effect.gen`
//   custom/function-declaration a module-level function is a `function` declaration, not an
//                              anonymous function bound to a const (an annotated const keeps its
//                              contextual type and is allowed)
//   custom/predicate-is-name   a pure boolean predicate reads as a question: `is*`,
//                              `has*` or `can*`
//   custom/no-effect-run       `Effect.runPromise` and friends appear only where the program
//                              meets a world that is not an Effect — the Vite plugin's hooks and
//                              the test helpers. Everywhere else an Effect is a value that is
//                              returned, so it stays composable and its requirements stay visible
//   custom/effect-promise-import `Effect.promise` only wraps a dynamic `import()`. Anywhere else
//                              it turns a rejection into a defect, which walks past `catch`,
//                              `orElse` and `mapError` alike; `Effect.tryPromise` is the one that
//                              puts the failure in the error channel
//   custom/type-pascal-case    a `type` alias is PascalCase
//   custom/identifier-case     a variable, a parameter and a function are camelCase, PascalCase
//                              or UPPER_SNAKE_CASE: no snake_case and no stray underscores
//   custom/no-undeclared-dependency a bare specifier in `src` names a `dependency` or a
//                              `peerDependency` of package.json. oxlint has no
//                              `import/no-extraneous-dependencies`; without this a
//                              `devDependency` reaching shipped code passes every check here
//                              and fails at the consumer's first import
//   custom/no-partial-assertion a test compares the whole value. The asymmetric matchers
//                              (`expect.stringContaining`, `expect.objectContaining`, ...) bring
//                              a partial comparison back inside `toStrictEqual`, and
//                              `expect(code.includes('x')).toBe(true)` is `toContain` spelled as
//                              a boolean; `jest/no-restricted-matchers` sees neither
//   custom/no-dangling-doc-reference a comment that names a Markdown file (`README.md`,
//                              `website/docs/guides/vendor.md`) names one that exists, beside the
//                              file or in a directory above it up to the repository root. A
//                              reason that points at a document nobody can open is no reason
//
// Tests are exempt from the structural rules: a test arranges and asserts imperatively when that
// is the clearest way to spell the fixture out. `no-partial-assertion` is the one rule that
// reads only tests.
import { existsSync } from 'node:fs'
import { builtinModules } from 'node:module'
import path from 'node:path'

import MANIFEST from '../package.json' with { type: 'json' }

const TEST_FILE = /\.test\.tsx?$/u
const SHIPPED_FILE = /(^|\/)src\//u
// camelCase, PascalCase or UPPER_SNAKE_CASE. A leading `_` marks a binding that is taken out
// of a rest pattern and not read, and a leading `$` is how OpenAPI spells `$ref`.
const IDENTIFIER_CASE =
  /^[_$]?(?:[a-z][A-Za-z0-9]*|[A-Z][A-Za-z0-9]*|[A-Z][A-Z0-9]*(?:_[A-Z0-9]+)+)?$/u
const DECLARED = new Set([
  ...Object.keys(MANIFEST.dependencies),
  ...Object.keys(MANIFEST.peerDependencies ?? {}),
  ...Object.keys(MANIFEST.optionalDependencies ?? {}),
])
const BUILTINS = new Set(builtinModules)
const PREDICATE_PREFIX = /^(is|has|can)[A-Z]/u
const PASCAL_CASE = /^[A-Z][A-Za-z0-9]*$/u
const EFFECT_RUNNERS = new Set([
  'runPromise',
  'runPromiseExit',
  'runSync',
  'runSyncExit',
  'runFork',
  'runCallback',
])
const FUNCTION_TYPES = new Set([
  'FunctionDeclaration',
  'FunctionExpression',
  'ArrowFunctionExpression',
])

// `expect.<name>(...)`: each matches a value it has only partly seen.
const ASYMMETRIC_MATCHERS = new Set([
  'stringContaining',
  'stringMatching',
  'objectContaining',
  'arrayContaining',
  'any',
  'anything',
])
// `expect(value.<name>(...))`: each asks a question about part of the value.
const PARTIAL_QUESTIONS = new Set([
  'includes',
  'some',
  'every',
  'find',
  'findIndex',
  'findLast',
  'findLastIndex',
  'indexOf',
  'lastIndexOf',
  'startsWith',
  'endsWith',
  'match',
  'matchAll',
  'search',
  'test',
  'has',
])

function filenameOf(context) {
  return context.filename ?? context.getFilename?.() ?? ''
}

function isTestPath(filename) {
  return TEST_FILE.test(filename)
}

// A Markdown file named in prose: `README.md`, `../../README.md`, `website/docs/guides/vendor.md`.
// URLs are taken out first: the page a link names is not a file of this repository.
const URL_IN_TEXT = /\bhttps?:\/\/\S+/gu
const MARKDOWN_REFERENCE = /(?<![\w./-])((?:\.{1,2}\/)?[\w-]+(?:\/[\w.-]+)*\.md)(?![\w-])/gu

// The directories a reference may be read against: the file's own and every one above it,
// up to the repository root (the first directory holding `.git`).
function searchDirectoriesOf(filename) {
  const directories = []
  let directory = path.dirname(path.resolve(filename))
  for (;;) {
    directories.push(directory)
    const parent = path.dirname(directory)
    // oxlint-disable-next-line node/no-sync -- a rule visitor is synchronous; oxlint cannot await it
    if (existsSync(path.join(directory, '.git')) || parent === directory) return directories
    directory = parent
  }
}

function effectMember(node) {
  return node.type === 'MemberExpression' &&
    node.object.type === 'Identifier' &&
    node.object.name === 'Effect' &&
    node.property.type === 'Identifier'
    ? node.property.name
    : null
}

/**
 * Whether an expression is a dynamic `import()`, or a `Promise.all([...])` of them.
 *
 * Those are the promises that cannot reject for a reason the program could answer: the
 * module is a sibling in the same bundle, so a failure is a broken install, not a case.
 */
function isDynamicImport(node) {
  if (!node) return false
  if (node.type === 'ImportExpression') return true
  if (node.type !== 'CallExpression') return false
  const isPromiseAll =
    node.callee.type === 'MemberExpression' &&
    node.callee.object.type === 'Identifier' &&
    node.callee.object.name === 'Promise' &&
    node.callee.property.type === 'Identifier' &&
    node.callee.property.name === 'all'
  if (!isPromiseAll) return false
  const [list] = node.arguments
  return (
    list?.type === 'ArrayExpression' &&
    list.elements.length > 0 &&
    list.elements.every(isDynamicImport)
  )
}

/** The package a bare specifier names: `@scope/name/sub` is `@scope/name`, `name/sub` is `name`. */
function packageOf(specifier) {
  const segments = specifier.split('/')
  return specifier.startsWith('@') ? segments.slice(0, 2).join('/') : segments[0]
}

function isBareSpecifier(specifier) {
  return !specifier.startsWith('.') && !specifier.startsWith('/') && !specifier.startsWith('node:')
}

/** Every identifier a binding pattern declares. */
function bindingsOf(pattern) {
  if (!pattern) return []
  if (pattern.type === 'Identifier') return [pattern]
  if (pattern.type === 'AssignmentPattern') return bindingsOf(pattern.left)
  if (pattern.type === 'RestElement') return bindingsOf(pattern.argument)
  if (pattern.type === 'TSParameterProperty') return bindingsOf(pattern.parameter)
  if (pattern.type === 'ArrayPattern') return pattern.elements.flatMap(bindingsOf)
  if (pattern.type === 'ObjectPattern') {
    return pattern.properties.flatMap((property) =>
      bindingsOf(property.type === 'RestElement' ? property : property.value),
    )
  }
  return []
}

function enclosingFunction(node) {
  if (!node) return null
  return FUNCTION_TYPES.has(node.type) ? node : enclosingFunction(node.parent)
}

// `Effect.gen(...)` may be followed by `.pipe(...)` calls; return the outermost call of that chain.
function outermostPipe(node) {
  const parent = node.parent
  if (
    parent?.type === 'MemberExpression' &&
    parent.object === node &&
    parent.property.type === 'Identifier' &&
    parent.property.name === 'pipe' &&
    parent.parent?.type === 'CallExpression' &&
    parent.parent.callee === parent
  ) {
    return outermostPipe(parent.parent)
  }
  return node
}

function isExpectCall(node) {
  return (
    node.type === 'CallExpression' &&
    node.callee.type === 'Identifier' &&
    node.callee.name === 'expect'
  )
}

/** The partial question an `expect(...)` argument asks, if it asks one: `includes`, `some`, ... */
function partialQuestionOf(node) {
  if (!node) return null
  if (node.type === 'ChainExpression') return partialQuestionOf(node.expression)
  if (node.type === 'UnaryExpression') return partialQuestionOf(node.argument)
  if (node.type === 'LogicalExpression') {
    return partialQuestionOf(node.left) ?? partialQuestionOf(node.right)
  }
  if (
    node.type === 'CallExpression' &&
    node.callee.type === 'MemberExpression' &&
    node.callee.property.type === 'Identifier' &&
    PARTIAL_QUESTIONS.has(node.callee.property.name)
  ) {
    return node.callee.property.name
  }
  return null
}

function declarationOf(statement) {
  return statement.type === 'ExportNamedDeclaration' ? statement.declaration : statement
}

function isAnonymousFunctionInit(init) {
  return (
    init !== null &&
    init !== undefined &&
    (init.type === 'ArrowFunctionExpression' || init.type === 'FunctionExpression')
  )
}

// A function whose every `return` yields a boolean literal or a comparison — the shape a
// predicate has before anyone gives it a name.
function returnsBoolean(node) {
  if (node.type === 'ArrowFunctionExpression' && node.body.type !== 'BlockStatement') {
    return isBooleanExpression(node.body)
  }
  const body = node.body
  if (body?.type !== 'BlockStatement') return false
  const returns = body.body.filter((statement) => statement.type === 'ReturnStatement')
  return returns.length > 0 && returns.every((statement) => isBooleanExpression(statement.argument))
}

function isBooleanExpression(node) {
  if (!node) return false
  if (node.type === 'Literal') return typeof node.value === 'boolean'
  if (node.type === 'UnaryExpression') return node.operator === '!'
  if (node.type === 'BinaryExpression') {
    return ['===', '!==', '==', '!=', '<', '<=', '>', '>=', 'instanceof', 'in'].includes(
      node.operator,
    )
  }
  if (node.type === 'LogicalExpression') {
    return isBooleanExpression(node.left) && isBooleanExpression(node.right)
  }
  return false
}

export default {
  meta: { name: 'custom' },
  rules: {
    'effect-gen-return': {
      meta: {
        docs: {
          description:
            'Effect.gen is written as `function name() { return Effect.gen(function* () { ... }) }`',
        },
      },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        return {
          CallExpression(node) {
            if (effectMember(node.callee) !== 'gen') return
            const body = node.arguments[0]
            if (body?.type !== 'FunctionExpression' || !body.generator || body.id) {
              context.report({
                node,
                message:
                  'Write the generator inline and anonymous: `Effect.gen(function* () { ... })`.',
              })
              return
            }
            const outer = outermostPipe(node)
            const owner =
              outer.parent?.type === 'ReturnStatement' ? enclosingFunction(outer.parent) : null
            if (
              owner !== null &&
              (owner.type === 'FunctionDeclaration' || owner.type === 'FunctionExpression')
            ) {
              return
            }
            context.report({
              node,
              message:
                'An Effect program is the return value of a `function`: `export function name(input) { return Effect.gen(function* () { ... }) }`. Neither a const-bound arrow nor an inline argument — the declaration names the program, and the reader finds every step under one `return`.',
            })
          },
        }
      },
    },
    'no-effect-fn': {
      meta: { docs: { description: 'Effect.fn / Effect.fnUntraced never appear' } },
      create(context) {
        return {
          MemberExpression(node) {
            const name = effectMember(node)
            if (name === 'fn' || name === 'fnUntraced') {
              context.report({
                node,
                message: `\`Effect.${name}\` hides the function behind a factory call. Write \`export function name(input) { return Effect.gen(function* () { ... }) }\` instead.`,
              })
            }
          },
        }
      },
    },
    'no-effect-flatmap': {
      meta: {
        docs: {
          description: 'Effect.flatMap/andThen never appear — write straight-line Effect.gen',
        },
      },
      create(context) {
        return {
          MemberExpression(node) {
            const name = effectMember(node)
            if (name === 'flatMap' || name === 'andThen') {
              context.report({
                node,
                message: `\`Effect.${name}\` buries the control flow one closure deep. Write the step as a plain \`yield*\` inside \`Effect.gen\`, with failures as early-return guards.`,
              })
            }
          },
        }
      },
    },
    'function-declaration': {
      meta: { docs: { description: 'module-level functions are function declarations' } },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        return {
          Program(node) {
            for (const statement of node.body) {
              const declaration = declarationOf(statement)
              if (declaration?.type !== 'VariableDeclaration') continue
              for (const declarator of declaration.declarations) {
                if (declarator.id.type !== 'Identifier' || declarator.id.typeAnnotation) continue
                if (!isAnonymousFunctionInit(declarator.init)) continue
                context.report({
                  node: declarator.id,
                  message: `Declare \`${declarator.id.name}\` as \`function ${declarator.id.name}(...) { ... }\`. A named declaration reads as what it is, hoists, and shows up by name in stack traces; an anonymous function bound to a const is only warranted when the const carries a contextual type annotation.`,
                })
              }
            }
          },
        }
      },
    },
    'no-effect-run': {
      meta: { docs: { description: 'Effect runners appear only at a boundary' } },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        return {
          MemberExpression(node) {
            const name = effectMember(node)
            if (name === null || !EFFECT_RUNNERS.has(name)) return
            context.report({
              node,
              message: `\`Effect.${name}\` ends the program here. Return the Effect instead and let the caller run it — the only places that may run one are where an Effect meets something that is not one (the Vite plugin's hooks, the test helpers), and those are exempted by path.`,
            })
          },
        }
      },
    },
    'effect-promise-import': {
      meta: { docs: { description: '`Effect.promise` only wraps a dynamic import' } },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        return {
          CallExpression(node) {
            if (effectMember(node.callee) !== 'promise') return
            const [thunk] = node.arguments
            const body = FUNCTION_TYPES.has(thunk?.type) ? thunk.body : null
            if (isDynamicImport(body)) return
            context.report({
              node,
              message:
                '`Effect.promise` promises the promise cannot reject: a rejection becomes a defect, which `orElse`, `catch` and `mapError` all walk straight past. Only a dynamic `import()` of a bundled sibling is that safe. Use `Effect.tryPromise` so the failure lands in the error channel.',
            })
          },
        }
      },
    },
    'type-pascal-case': {
      meta: { docs: { description: 'a type alias is PascalCase' } },
      create(context) {
        return {
          TSTypeAliasDeclaration(node) {
            if (!node.id || PASCAL_CASE.test(node.id.name)) return
            context.report({
              node: node.id,
              message: `Name the type \`${node.id.name}\` in PascalCase, the way every other type here is written.`,
            })
          },
        }
      },
    },
    'identifier-case': {
      meta: { docs: { description: 'bindings are camelCase, PascalCase or UPPER_SNAKE_CASE' } },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        function check(identifiers) {
          for (const identifier of identifiers) {
            if (IDENTIFIER_CASE.test(identifier.name)) continue
            context.report({
              node: identifier,
              message: `Name \`${identifier.name}\` in camelCase (PascalCase for a schema or a class, UPPER_SNAKE_CASE for a module constant). An underscore inside a name is the casing of another language, and one at either end promises a privacy JavaScript does not keep.`,
            })
          }
        }
        function checkFunction(node) {
          check([...(node.id ? [node.id] : []), ...node.params.flatMap(bindingsOf)])
        }
        return {
          VariableDeclarator(node) {
            check(bindingsOf(node.id))
          },
          FunctionDeclaration: checkFunction,
          FunctionExpression: checkFunction,
          ArrowFunctionExpression: checkFunction,
          CatchClause(node) {
            check(bindingsOf(node.param))
          },
        }
      },
    },
    'no-undeclared-dependency': {
      meta: { docs: { description: 'shipped code imports only declared dependencies' } },
      create(context) {
        const filename = filenameOf(context)
        if (isTestPath(filename) || !SHIPPED_FILE.test(filename.replaceAll('\\', '/'))) return {}
        function check(source) {
          if (source?.type !== 'Literal' || typeof source.value !== 'string') return
          if (!isBareSpecifier(source.value)) return
          const name = packageOf(source.value)
          if (DECLARED.has(name)) return
          context.report({
            node: source,
            message: BUILTINS.has(name)
              ? `Import the Node built-in as \`node:${source.value}\`.`
              : `\`${name}\` is not a \`dependency\` or \`peerDependency\` of package.json, so it is not installed where this package is. Declare it, or keep the import out of \`src\`.`,
          })
        }
        return {
          ImportDeclaration(node) {
            check(node.source)
          },
          ExportNamedDeclaration(node) {
            check(node.source)
          },
          ExportAllDeclaration(node) {
            check(node.source)
          },
          ImportExpression(node) {
            check(node.source)
          },
        }
      },
    },
    'no-partial-assertion': {
      meta: { docs: { description: 'a test compares the whole value' } },
      create(context) {
        if (!isTestPath(filenameOf(context))) return {}
        return {
          CallExpression(node) {
            if (isExpectCall(node)) {
              const question = partialQuestionOf(node.arguments[0])
              if (question) {
                context.report({
                  node,
                  message: `\`expect(value.${question}(...))\` checks one part of the value and lets a regression in the rest pass. Compare the whole value with toBe / toStrictEqual.`,
                })
              }
              return
            }
            const name =
              node.callee.type === 'MemberExpression' &&
              node.callee.object.type === 'Identifier' &&
              node.callee.object.name === 'expect' &&
              node.callee.property.type === 'Identifier'
                ? node.callee.property.name
                : null
            if (name && ASYMMETRIC_MATCHERS.has(name)) {
              context.report({
                node,
                message: `\`expect.${name}(...)\` matches a value it has only partly seen. Write the whole expected value out.`,
              })
            }
          },
        }
      },
    },
    'no-dangling-doc-reference': {
      meta: { docs: { description: 'a comment names only Markdown files that exist' } },
      create(context) {
        const filename = filenameOf(context)
        return {
          Program() {
            const directories = searchDirectoriesOf(filename)
            for (const comment of context.sourceCode.getAllComments()) {
              const text = comment.value.replaceAll(URL_IN_TEXT, '')
              for (const [, reference] of text.matchAll(MARKDOWN_REFERENCE)) {
                if (
                  // oxlint-disable-next-line node/no-sync -- a rule visitor is synchronous; oxlint cannot await it
                  directories.some((directory) => existsSync(path.join(directory, reference)))
                ) {
                  continue
                }
                context.report({
                  loc: comment.loc,
                  message: `\`${reference}\` does not exist beside this file or in any directory above it. Write the reason out here, or name the document that holds it.`,
                })
              }
            }
          },
        }
      },
    },
    'predicate-is-name': {
      meta: { docs: { description: 'a pure boolean predicate reads as a question' } },
      create(context) {
        if (isTestPath(filenameOf(context))) return {}
        return {
          FunctionDeclaration(node) {
            if (!node.id || PREDICATE_PREFIX.test(node.id.name) || !returnsBoolean(node)) return
            context.report({
              node: node.id,
              message: `\`${node.id.name}\` answers a yes/no question, so name it \`is\`/\`has\`/\`can\` — e.g. \`is${node.id.name[0].toUpperCase()}${node.id.name.slice(1)}\` — and the call site reads as the question it asks.`,
            })
          },
        }
      },
    },
  },
}
