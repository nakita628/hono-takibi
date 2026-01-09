import type { ClientRequestOptions } from 'hono/client'
import { client } from '../clients/18-multiple-same-refs'

/**
 * GET /documents
 */
export async function getDocuments(args: {
  query: { author?: string; reviewer?: string; approver?: string }
  options?: ClientRequestOptions
}) {
  return await client.documents.$get(args)
}

/**
 * POST /documents
 */
export async function postDocuments(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.documents.$post(args)
}

/**
 * GET /documents/{documentId}
 */
export async function getDocumentsDocumentId(args: {
  param: { documentId: string }
  options?: ClientRequestOptions
}) {
  return await client['documents'][':documentId']['$get'](args)
}

/**
 * PUT /documents/{documentId}
 */
export async function putDocumentsDocumentId(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['documents'][':documentId']['$put'](args)
}

/**
 * GET /documents/{documentId}/versions
 */
export async function getDocumentsDocumentIdVersions(args: {
  param: { documentId: string }
  options?: ClientRequestOptions
}) {
  return await client['documents'][':documentId']['versions']['$get'](args)
}

/**
 * POST /documents/{documentId}/share
 */
export async function postDocumentsDocumentIdShare(args: {
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
  options?: ClientRequestOptions
}) {
  return await client['documents'][':documentId']['share']['$post'](args)
}

/**
 * GET /users/{userId}/documents
 */
export async function getUsersUserIdDocuments(args: {
  param: { userId: string }
  options?: ClientRequestOptions
}) {
  return await client['users'][':userId']['documents']['$get'](args)
}

/**
 * POST /compare
 */
export async function postCompare(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.compare.$post(args)
}

/**
 * GET /templates
 */
export async function getTemplates(args?: { options?: ClientRequestOptions }) {
  return await client.templates.$get(args)
}

/**
 * POST /templates
 */
export async function postTemplates(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.templates.$post(args)
}

/**
 * POST /workflows
 */
export async function postWorkflows(args: {
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
  options?: ClientRequestOptions
}) {
  return await client.workflows.$post(args)
}
