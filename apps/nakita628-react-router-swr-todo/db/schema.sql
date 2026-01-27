-- Schema for Todo application (SWR + Kysely)

CREATE TABLE IF NOT EXISTS todos (
  id TEXT PRIMARY KEY,
  content TEXT NOT NULL,
  completed INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_todos_completed ON todos(completed);
CREATE INDEX IF NOT EXISTS idx_todos_created_at ON todos(created_at);
