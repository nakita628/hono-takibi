import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export async function getDocuments(arg: {
  query: { author?: string; reviewer?: string; approver?: string }
}) {
  return await client.documents.$get(arg)
}

/**
 * POST /documents
 */
export async function postDocuments(arg: {
  json: {
    title: string
    content: {
      format?: 'markdown' | 'html' | 'plain' | 'rich'
      body?: string
      attachments?: {
        id: string
        name: string
        url: string
        mimeType?: string
        size?: number
        uploadedBy?: { id: string; name?: string; email?: string; avatar?: string }
        uploadedAt?: string
      }[]
    }
    reviewers?: string[]
    tags?: { name: string; color?: string }[]
    parentDocument?: string
    templateId?: string
  }
}) {
  return await client.documents.$post(arg)
}

/**
 * GET /documents/{documentId}
 */
export async function getDocumentsDocumentId(arg: { param: { documentId: string } }) {
  return await client['documents'][':documentId']['$get'](arg)
}

/**
 * PUT /documents/{documentId}
 */
export async function putDocumentsDocumentId(arg: {
  param: { documentId: string }
  json: {
    title?: string
    content?: {
      format?: 'markdown' | 'html' | 'plain' | 'rich'
      body?: string
      attachments?: {
        id: string
        name: string
        url: string
        mimeType?: string
        size?: number
        uploadedBy?: { id: string; name?: string; email?: string; avatar?: string }
        uploadedAt?: string
      }[]
    }
    reviewers?: string[]
    approver?: string
    tags?: { name: string; color?: string }[]
    status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
  }
}) {
  return await client['documents'][':documentId']['$put'](arg)
}

/**
 * GET /documents/{documentId}/versions
 */
export async function getDocumentsDocumentIdVersions(arg: { param: { documentId: string } }) {
  return await client['documents'][':documentId']['versions']['$get'](arg)
}

/**
 * POST /documents/{documentId}/share
 */
export async function postDocumentsDocumentIdShare(arg: {
  param: { documentId: string }
  json: {
    recipients: {
      userId: string
      permission: 'view' | 'comment' | 'edit' | 'admin'
      expiresAt?: string
      notifyUser?: boolean
    }[]
    message?: string
  }
}) {
  return await client['documents'][':documentId']['share']['$post'](arg)
}

/**
 * GET /users/{userId}/documents
 */
export async function getUsersUserIdDocuments(arg: { param: { userId: string } }) {
  return await client['users'][':userId']['documents']['$get'](arg)
}

/**
 * POST /compare
 */
export async function postCompare(arg: {
  json: {
    source: {
      id: string
      title: string
      content: {
        format?: 'markdown' | 'html' | 'plain' | 'rich'
        body?: string
        attachments?: {
          id: string
          name: string
          url: string
          mimeType?: string
          size?: number
          uploadedBy?: { id: string; name?: string; email?: string; avatar?: string }
          uploadedAt?: string
        }[]
      }
      author: { id: string; name?: string; email?: string; avatar?: string }
      reviewers?: { id: string; name?: string; email?: string; avatar?: string }[]
      approver?: { id: string; name?: string; email?: string; avatar?: string }
      collaborators?: {
        user?: { id: string; name?: string; email?: string; avatar?: string }
        permission?: 'view' | 'comment' | 'edit' | 'admin'
        addedAt?: string
        addedBy?: { id: string; name?: string; email?: string; avatar?: string }
      }[]
      tags?: { name: string; color?: string }[]
      metadata?: {
        createdAt?: string
        updatedAt?: string
        createdBy?: { id: string; name?: string; email?: string; avatar?: string }
        updatedBy?: { id: string; name?: string; email?: string; avatar?: string }
      }
      status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      currentVersion?: string
      linkedDocuments?: {
        id: string
        title: string
        status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      }[]
      parentDocument?: {
        id: string
        title: string
        status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      }
    }
    target: {
      id: string
      title: string
      content: {
        format?: 'markdown' | 'html' | 'plain' | 'rich'
        body?: string
        attachments?: {
          id: string
          name: string
          url: string
          mimeType?: string
          size?: number
          uploadedBy?: { id: string; name?: string; email?: string; avatar?: string }
          uploadedAt?: string
        }[]
      }
      author: { id: string; name?: string; email?: string; avatar?: string }
      reviewers?: { id: string; name?: string; email?: string; avatar?: string }[]
      approver?: { id: string; name?: string; email?: string; avatar?: string }
      collaborators?: {
        user?: { id: string; name?: string; email?: string; avatar?: string }
        permission?: 'view' | 'comment' | 'edit' | 'admin'
        addedAt?: string
        addedBy?: { id: string; name?: string; email?: string; avatar?: string }
      }[]
      tags?: { name: string; color?: string }[]
      metadata?: {
        createdAt?: string
        updatedAt?: string
        createdBy?: { id: string; name?: string; email?: string; avatar?: string }
        updatedBy?: { id: string; name?: string; email?: string; avatar?: string }
      }
      status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      currentVersion?: string
      linkedDocuments?: {
        id: string
        title: string
        status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      }[]
      parentDocument?: {
        id: string
        title: string
        status?: 'draft' | 'in_review' | 'approved' | 'published' | 'archived'
      }
    }
    options?: { ignoreWhitespace?: boolean; ignoreCase?: boolean; showLineNumbers?: boolean }
  }
}) {
  return await client.compare.$post(arg)
}

/**
 * GET /templates
 */
export async function getTemplates() {
  return await client.templates.$get()
}

/**
 * POST /templates
 */
export async function postTemplates(arg: {
  json: {
    name: string
    description?: string
    content: {
      format?: 'markdown' | 'html' | 'plain' | 'rich'
      body?: string
      attachments?: {
        id: string
        name: string
        url: string
        mimeType?: string
        size?: number
        uploadedBy?: { id: string; name?: string; email?: string; avatar?: string }
        uploadedAt?: string
      }[]
    }
    defaultReviewers?: string[]
    defaultApprover?: string
    defaultTags?: { name: string; color?: string }[]
    category?: string
    variables?: {
      name: string
      type: 'text' | 'number' | 'date' | 'user' | 'document'
      required?: boolean
      defaultValue?: string
      description?: string
    }[]
  }
}) {
  return await client.templates.$post(arg)
}

/**
 * POST /workflows
 */
export async function postWorkflows(arg: {
  json: {
    name: string
    description?: string
    steps: {
      name: string
      type: 'review' | 'approval' | 'notification' | 'custom'
      assignee?: { id: string; name?: string; email?: string; avatar?: string }
      requiredPermission?: 'view' | 'comment' | 'edit' | 'admin'
      nextSteps?: { condition?: string; stepName?: string }[]
      timeout?: number
      escalateTo?: { id: string; name?: string; email?: string; avatar?: string }
    }[]
    defaultAssignees?: { [key: string]: string }
  }
}) {
  return await client.workflows.$post(arg)
}
