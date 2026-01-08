declare const routes: import('/workspaces/hono-takibi/node_modules/.pnpm/@hono+zod-openapi@1.2.0_hono@4.11.3_zod@4.3.5/node_modules/@hono/zod-openapi/dist/index').OpenAPIHono<
  import('/workspaces/hono-takibi/node_modules/.pnpm/hono@4.11.3/node_modules/hono/dist/types/types').Env,
  {
    '/projects': {
      $get:
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'active' | 'on_hold' | 'completed' | 'archived' | undefined
                search?: string | undefined
              }
            }
            output: {
              data: {
                id: string
                name: string
                status: 'active' | 'on_hold' | 'completed' | 'archived'
                createdAt: string
                description?: string | undefined
                color?: string | undefined
                owner?:
                  | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                  | undefined
                team?:
                  | {
                      id: string
                      name: string
                      description?: string | undefined
                      members?:
                        | {
                            id: string
                            name: string
                            email: string
                            avatarUrl?: string | undefined
                          }[]
                        | undefined
                      createdAt?: string | undefined
                    }
                  | undefined
                startDate?: string | undefined
                endDate?: string | undefined
                taskCount?: number | undefined
                completedTaskCount?: number | undefined
                progress?: number | undefined
                updatedAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'active' | 'on_hold' | 'completed' | 'archived' | undefined
                search?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
    }
  } & {
    '/projects': {
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                color?: string | undefined
                teamId?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                color?: string | undefined
                teamId?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              status: 'active' | 'on_hold' | 'completed' | 'archived'
              createdAt: string
              description?: string | undefined
              color?: string | undefined
              owner?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              team?:
                | {
                    id: string
                    name: string
                    description?: string | undefined
                    members?:
                      | {
                          id: string
                          name: string
                          email: string
                          avatarUrl?: string | undefined
                        }[]
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              startDate?: string | undefined
              endDate?: string | undefined
              taskCount?: number | undefined
              completedTaskCount?: number | undefined
              progress?: number | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                color?: string | undefined
                teamId?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 400
          }
    }
  } & {
    '/projects/:projectId': {
      $get:
        | {
            input: { param: { projectId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } }
            output: {
              id: string
              name: string
              status: 'active' | 'on_hold' | 'completed' | 'archived'
              createdAt: string
              description?: string | undefined
              color?: string | undefined
              owner?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              team?:
                | {
                    id: string
                    name: string
                    description?: string | undefined
                    members?:
                      | {
                          id: string
                          name: string
                          email: string
                          avatarUrl?: string | undefined
                        }[]
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              startDate?: string | undefined
              endDate?: string | undefined
              taskCount?: number | undefined
              completedTaskCount?: number | undefined
              progress?: number | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { projectId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/projects/:projectId': {
      $put:
        | {
            input: { param: { projectId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                status?: 'active' | 'on_hold' | 'completed' | 'archived' | undefined
                color?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                status?: 'active' | 'on_hold' | 'completed' | 'archived' | undefined
                color?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: {
              id: string
              name: string
              status: 'active' | 'on_hold' | 'completed' | 'archived'
              createdAt: string
              description?: string | undefined
              color?: string | undefined
              owner?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              team?:
                | {
                    id: string
                    name: string
                    description?: string | undefined
                    members?:
                      | {
                          id: string
                          name: string
                          email: string
                          avatarUrl?: string | undefined
                        }[]
                      | undefined
                    createdAt?: string | undefined
                  }
                | undefined
              startDate?: string | undefined
              endDate?: string | undefined
              taskCount?: number | undefined
              completedTaskCount?: number | undefined
              progress?: number | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
        | {
            input: { param: { projectId: string } } & {
              json: {
                name?: string | undefined
                description?: string | undefined
                status?: 'active' | 'on_hold' | 'completed' | 'archived' | undefined
                color?: string | undefined
                startDate?: string | undefined
                endDate?: string | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
    }
  } & {
    '/projects/:projectId': {
      $delete:
        | {
            input: { param: { projectId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { projectId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/projects/:projectId/members': {
      $get:
        | {
            input: { param: { projectId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } }
            output: {
              user: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              role: 'owner' | 'admin' | 'member' | 'viewer'
              joinedAt: string
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/projects/:projectId/members': {
      $post:
        | {
            input: { param: { projectId: string } } & {
              json: { userId: string; role: 'admin' | 'member' | 'viewer' }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } } & {
              json: { userId: string; role: 'admin' | 'member' | 'viewer' }
            }
            output: {
              user: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              role: 'owner' | 'admin' | 'member' | 'viewer'
              joinedAt: string
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/projects/:projectId/tasks': {
      $get:
        | {
            input: { param: { projectId: string } } & {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' | undefined
                assignee?: string | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } } & {
              query: {
                page?: number | undefined
                limit?: number | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' | undefined
                assignee?: string | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
              }
            }
            output: {
              data: {
                id: string
                title: string
                status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
                priority: 'low' | 'medium' | 'high' | 'urgent'
                createdAt: string
                description?: string | undefined
                project?: { id: string; name: string; color?: string | undefined } | undefined
                assignee?:
                  | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                  | undefined
                reporter?:
                  | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                  | undefined
                milestone?: { id: string; name: string } | undefined
                dueDate?: string | undefined
                estimatedHours?: number | undefined
                actualHours?: number | undefined
                tags?: string[] | undefined
                attachments?:
                  | {
                      id: string
                      filename: string
                      url: string
                      mimeType?: string | undefined
                      filesize?: number | undefined
                      uploadedBy?:
                        | {
                            id: string
                            name: string
                            email: string
                            avatarUrl?: string | undefined
                          }
                        | undefined
                      uploadedAt?: string | undefined
                    }[]
                  | undefined
                subtasks?: { id: string; title: string; completed: boolean }[] | undefined
                updatedAt?: string | undefined
              }[]
              pagination: { page: number; limit: number; total: number; totalPages: number }
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/projects/:projectId/tasks': {
      $post:
        | {
            input: { param: { projectId: string } } & {
              json: {
                title: string
                subtasks: { title: string }[]
                description?: string | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
                assigneeId?: string | undefined
                milestoneId?: string | undefined
                dueDate?: string | undefined
                estimatedHours?: number | undefined
                tags?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } } & {
              json: {
                title: string
                subtasks: { title: string }[]
                description?: string | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
                assigneeId?: string | undefined
                milestoneId?: string | undefined
                dueDate?: string | undefined
                estimatedHours?: number | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              title: string
              status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
              priority: 'low' | 'medium' | 'high' | 'urgent'
              createdAt: string
              description?: string | undefined
              project?: { id: string; name: string; color?: string | undefined } | undefined
              assignee?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              reporter?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              milestone?: { id: string; name: string } | undefined
              dueDate?: string | undefined
              estimatedHours?: number | undefined
              actualHours?: number | undefined
              tags?: string[] | undefined
              attachments?:
                | {
                    id: string
                    filename: string
                    url: string
                    mimeType?: string | undefined
                    filesize?: number | undefined
                    uploadedBy?:
                      | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
              subtasks?: { id: string; title: string; completed: boolean }[] | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/tasks/:taskId': {
      $get:
        | {
            input: { param: { taskId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 404
          }
        | {
            input: { param: { taskId: string } }
            output: {
              id: string
              title: string
              status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
              priority: 'low' | 'medium' | 'high' | 'urgent'
              createdAt: string
              description?: string | undefined
              project?: { id: string; name: string; color?: string | undefined } | undefined
              assignee?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              reporter?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              milestone?: { id: string; name: string } | undefined
              dueDate?: string | undefined
              estimatedHours?: number | undefined
              actualHours?: number | undefined
              tags?: string[] | undefined
              attachments?:
                | {
                    id: string
                    filename: string
                    url: string
                    mimeType?: string | undefined
                    filesize?: number | undefined
                    uploadedBy?:
                      | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
              subtasks?: { id: string; title: string; completed: boolean }[] | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/tasks/:taskId': {
      $put:
        | {
            input: { param: { taskId: string } } & {
              json: {
                title?: string | undefined
                description?: string | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
                assigneeId?: string | undefined
                milestoneId?: string | undefined
                dueDate?: string | undefined
                estimatedHours?: number | undefined
                tags?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } } & {
              json: {
                title?: string | undefined
                description?: string | undefined
                status?: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' | undefined
                priority?: 'low' | 'medium' | 'high' | 'urgent' | undefined
                assigneeId?: string | undefined
                milestoneId?: string | undefined
                dueDate?: string | undefined
                estimatedHours?: number | undefined
                tags?: string[] | undefined
              }
            }
            output: {
              id: string
              title: string
              status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
              priority: 'low' | 'medium' | 'high' | 'urgent'
              createdAt: string
              description?: string | undefined
              project?: { id: string; name: string; color?: string | undefined } | undefined
              assignee?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              reporter?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              milestone?: { id: string; name: string } | undefined
              dueDate?: string | undefined
              estimatedHours?: number | undefined
              actualHours?: number | undefined
              tags?: string[] | undefined
              attachments?:
                | {
                    id: string
                    filename: string
                    url: string
                    mimeType?: string | undefined
                    filesize?: number | undefined
                    uploadedBy?:
                      | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
              subtasks?: { id: string; title: string; completed: boolean }[] | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/tasks/:taskId': {
      $delete:
        | {
            input: { param: { taskId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | { input: { param: { taskId: string } }; output: {}; outputFormat: string; status: 204 }
    }
  } & {
    '/tasks/:taskId/status': {
      $patch:
        | {
            input: { param: { taskId: string } } & {
              json: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } } & {
              json: { status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled' }
            }
            output: {
              id: string
              title: string
              status: 'todo' | 'in_progress' | 'in_review' | 'done' | 'cancelled'
              priority: 'low' | 'medium' | 'high' | 'urgent'
              createdAt: string
              description?: string | undefined
              project?: { id: string; name: string; color?: string | undefined } | undefined
              assignee?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              reporter?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                | undefined
              milestone?: { id: string; name: string } | undefined
              dueDate?: string | undefined
              estimatedHours?: number | undefined
              actualHours?: number | undefined
              tags?: string[] | undefined
              attachments?:
                | {
                    id: string
                    filename: string
                    url: string
                    mimeType?: string | undefined
                    filesize?: number | undefined
                    uploadedBy?:
                      | { id: string; name: string; email: string; avatarUrl?: string | undefined }
                      | undefined
                    uploadedAt?: string | undefined
                  }[]
                | undefined
              subtasks?: { id: string; title: string; completed: boolean }[] | undefined
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/tasks/:taskId/comments': {
      $get:
        | {
            input: { param: { taskId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } }
            output: {
              id: string
              content: string
              author: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              createdAt: string
              updatedAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/tasks/:taskId/comments': {
      $post:
        | {
            input: { param: { taskId: string } } & { json: { content: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } } & { json: { content: string } }
            output: {
              id: string
              content: string
              author: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              createdAt: string
              updatedAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/tasks/:taskId/time-entries': {
      $get:
        | {
            input: { param: { taskId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } }
            output: {
              id: string
              duration: number
              date: string
              user: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              description?: string | undefined
              createdAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/tasks/:taskId/time-entries': {
      $post:
        | {
            input: { param: { taskId: string } } & {
              json: { duration: number; date: string; description?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { taskId: string } } & {
              json: { duration: number; date: string; description?: string | undefined }
            }
            output: {
              id: string
              duration: number
              date: string
              user: { id: string; name: string; email: string; avatarUrl?: string | undefined }
              description?: string | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/projects/:projectId/milestones': {
      $get:
        | {
            input: { param: { projectId: string } }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } }
            output: {
              id: string
              name: string
              status: 'open' | 'closed'
              description?: string | undefined
              dueDate?: string | undefined
              taskCount?: number | undefined
              completedTaskCount?: number | undefined
              progress?: number | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/projects/:projectId/milestones': {
      $post:
        | {
            input: { param: { projectId: string } } & {
              json: { name: string; description?: string | undefined; dueDate?: string | undefined }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: { param: { projectId: string } } & {
              json: { name: string; description?: string | undefined; dueDate?: string | undefined }
            }
            output: {
              id: string
              name: string
              status: 'open' | 'closed'
              description?: string | undefined
              dueDate?: string | undefined
              taskCount?: number | undefined
              completedTaskCount?: number | undefined
              progress?: number | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  } & {
    '/teams': {
      $get:
        | {
            input: {}
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {}
            output: {
              id: string
              name: string
              description?: string | undefined
              members?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }[]
                | undefined
              createdAt?: string | undefined
            }[]
            outputFormat: 'json'
            status: 200
          }
    }
  } & {
    '/teams': {
      $post:
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                memberIds?: string[] | undefined
              }
            }
            output: { code: string; message: string }
            outputFormat: 'json'
            status: 401
          }
        | {
            input: {
              json: {
                name: string
                description?: string | undefined
                memberIds?: string[] | undefined
              }
            }
            output: {
              id: string
              name: string
              description?: string | undefined
              members?:
                | { id: string; name: string; email: string; avatarUrl?: string | undefined }[]
                | undefined
              createdAt?: string | undefined
            }
            outputFormat: 'json'
            status: 201
          }
    }
  },
  '/'
>
export default routes
