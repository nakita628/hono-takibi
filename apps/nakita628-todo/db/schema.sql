-- Migration: Create todos table
-- Description: Initial schema for Todo application

CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

-- Index for faster queries on completed status
CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);

-- Index for ordering by creation date
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);
