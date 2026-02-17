type Task = {
  id: string
  title: string
  description?: string
  status: 'pending' | 'in_progress' | 'done'
  tags?: string[]
  createdAt: string
  updatedAt?: string
}

let counter = 0

const tasks = new Map<string, Task>()

export function listTasks(
  status?: string,
  limit = 20,
  offset = 0,
): { tasks: Task[]; total: number } {
  let items = [...tasks.values()]
  if (status) {
    items = items.filter((t) => t.status === status)
  }
  const total = items.length
  return { tasks: items.slice(offset, offset + limit), total }
}

export function getTask(id: string): Task | undefined {
  return tasks.get(id)
}

export function createTask(input: {
  title: string
  description?: string
  status?: 'pending' | 'in_progress' | 'done'
  tags?: string[]
}): Task {
  const id = String(++counter)
  const now = new Date().toISOString()
  const task: Task = {
    id,
    title: input.title,
    description: input.description,
    status: input.status ?? 'pending',
    tags: input.tags,
    createdAt: now,
  }
  tasks.set(id, task)
  return task
}

export function updateTask(
  id: string,
  input: {
    title?: string
    description?: string
    status?: 'pending' | 'in_progress' | 'done'
    tags?: string[]
  },
): Task | undefined {
  const task = tasks.get(id)
  if (!task) return undefined
  const updated: Task = {
    ...task,
    ...Object.fromEntries(Object.entries(input).filter(([, v]) => v !== undefined)),
    updatedAt: new Date().toISOString(),
  }
  tasks.set(id, updated)
  return updated
}

export function deleteTask(id: string): boolean {
  return tasks.delete(id)
}
