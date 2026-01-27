import type { Generated } from 'kysely'

/**
 * Database schema for the todos table.
 *
 * ```mermaid
 * erDiagram
 *   todos {
 *     string id PK "UUID primary key"
 *     string content "1-140 characters"
 *     integer completed "0 = not completed, 1 = completed"
 *     datetime created_at "Creation timestamp"
 *     datetime updated_at "Last update timestamp"
 *   }
 * ```
 */
export interface TodoTable {
  id: string
  content: string
  completed: Generated<number>
  created_at: Generated<string>
  updated_at: Generated<string>
}

/**
 * Database interface containing all tables.
 */
export interface Database {
  todos: TodoTable
}
