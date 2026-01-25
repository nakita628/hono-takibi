import type { Generated } from 'kysely'

/**
 * Database schema for the todos table.
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
