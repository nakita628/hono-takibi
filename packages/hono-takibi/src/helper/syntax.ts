import { parseSync, visitorKeys } from 'oxc-parser'
import type { Declaration, Node, Program, Span, Statement } from 'oxc-parser'

/**
 * Parses a TypeScript module for reading. What a caller takes from the tree is a position,
 * a name or a kind; the text of a node is sliced from `code` by its position, so that what
 * is written back is the source as it was, comments included.
 *
 * A module that does not parse comes back with an empty tree and the errors that stopped
 * it: the parser recovers nothing past a syntax error. A caller that reads a file a hand
 * edit may have broken asks for the errors, and leaves such a file alone.
 */
export function parseSource(code: string): {
  readonly program: Program
  readonly errors: readonly string[]
} {
  const { program, errors } = parseSync('module.ts', code, { lang: 'ts', sourceType: 'module' })
  return { program, errors: errors.map((error) => error.message) }
}

/** The tree of a module known to parse, such as one the generator just wrote. */
export function parseModule(code: string): Program {
  return parseSource(code).program
}

export function textOf(code: string, node: Span) {
  return code.slice(node.start, node.end)
}

function isNode(value: unknown): value is Node {
  return (
    typeof value === 'object' &&
    value !== null &&
    'type' in value &&
    typeof value.type === 'string' &&
    'start' in value
  )
}

/**
 * Calls `visit` on `node` and on every node under it, each child in the order the grammar
 * lists them. A node whose children the parser does not list is walked over its fields.
 */
export function walk(node: Node, visit: (node: Node) => void): void {
  visit(node)
  const keys =
    visitorKeys[node.type] ?? Object.keys(node).filter((key) => key !== 'type' && key !== 'parent')
  for (const key of keys) {
    // Read by name rather than through `Object.entries`: a node has many more fields than
    // children, and a tree of a large document has hundreds of thousands of nodes.
    const child: unknown = Reflect.get(node, key)
    if (Array.isArray(child)) {
      for (const item of child) {
        if (isNode(item)) walk(item, visit)
      }
    } else if (isNode(child)) {
      walk(child, visit)
    }
  }
}

/** The nodes under `node` that `is` picks out, in tree order, the node itself included. */
export function descendantsWhere<T extends Node>(
  node: Node,
  is: (candidate: Node) => candidate is T,
) {
  const found: T[] = []
  walk(node, (candidate) => {
    if (is(candidate)) found.push(candidate)
  })
  return found
}

/**
 * The names of the identifiers under `node`, in source order, each occurrence counted: a
 * reference, a binding, a property name or a type name alike, as the TypeScript parser
 * counted them. Nothing inside a string, a template or a regular expression is one.
 */
export function identifierNames(node: Node): readonly string[] {
  const found: { readonly name: string; readonly start: number }[] = []
  walk(node, (candidate) => {
    if (candidate.type === 'Identifier') {
      found.push({ name: candidate.name, start: candidate.start })
    }
  })
  found.sort((a, b) => a.start - b.start)
  return found.map((entry) => entry.name)
}

/**
 * A top-level statement with its `export` taken off. TypeScript puts the modifier on the
 * statement, so `export const x = …` is a variable statement there and is read as the
 * variable declaration here, with `exported` telling the two apart. Default exports of a
 * function or class are declarations too; any other statement is itself.
 */
export function declarationOf(statement: Statement): {
  readonly node: Declaration | Statement
  readonly exported: boolean
} {
  if (statement.type === 'ExportNamedDeclaration' && statement.declaration !== null) {
    return { node: statement.declaration, exported: true }
  }
  if (
    statement.type === 'ExportDefaultDeclaration' &&
    (statement.declaration.type === 'FunctionDeclaration' ||
      statement.declaration.type === 'ClassDeclaration')
  ) {
    return { node: statement.declaration, exported: true }
  }
  return { node: statement, exported: false }
}
