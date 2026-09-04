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
//
// Tests are exempt from the structural rules: a test arranges and asserts imperatively when that
// is the clearest way to spell the fixture out.
const TEST_FILE = /\.test\.tsx?$/u
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

function filenameOf(context) {
  return context.filename ?? context.getFilename?.() ?? ''
}

function isTestPath(filename) {
  return TEST_FILE.test(filename)
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
