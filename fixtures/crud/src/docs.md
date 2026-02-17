<h1 id="crude-crud-api">Crude CRUD API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

A crude yet complete CRUD API for task management.

<h1 id="crude-crud-api-default">Default</h1>

## Health check

<a id="opIdgetIndex"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/ \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /`

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

<h3 id="health-check-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|Inline|

<h3 id="health-check-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="crude-crud-api-tasks">tasks</h1>

## List tasks

<a id="opIdgetTasks"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/tasks \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /tasks`

<h3 id="list-tasks-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|status|query|string|false|none|
|limit|query|integer|false|none|
|offset|query|integer|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|status|pending|
|status|in_progress|
|status|done|

> Example responses

> 200 Response

```json
{
  "tasks": [
    {
      "id": "string",
      "title": "string",
      "description": "string",
      "status": "pending",
      "tags": [
        "string"
      ],
      "createdAt": "1970-01-01T00:00:00Z",
      "updatedAt": "1970-01-01T00:00:00Z"
    }
  ],
  "total": 0
}
```

<h3 id="list-tasks-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Task list|Inline|

<h3 id="list-tasks-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|tasks|[[Task](#schematask)]|true|none|none|
|» id|string|true|none|none|
|» title|string|true|none|none|
|» description|string|false|none|none|
|» status|string|true|none|none|
|» tags|[string]|false|none|none|
|» createdAt|string(date-time)|true|none|none|
|» updatedAt|string(date-time)|false|none|none|
|total|integer|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## Create task

<a id="opIdpostTasks"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /api/tasks \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"title":"string","description":"string","status":"pending","tags":["string"]}' \
  src/index.ts
```

`POST /tasks`

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ]
}
```

<h3 id="create-task-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreateTask](#schemacreatetask)|true|none|
|» title|body|string|true|none|
|» description|body|string|false|none|
|» status|body|string|false|none|
|» tags|body|[string]|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|pending|
|» status|in_progress|
|» status|done|

> Example responses

> 201 Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

> 400 Response

```json
{
  "message": "string",
  "code": "string"
}
```

<h3 id="create-task-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[Task](#schematask)|
|400|Bad Request|Validation error|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Get task by ID

<a id="opIdgetTasksTaskId"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /api/tasks/{taskId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /tasks/{taskId}`

<h3 id="get-task-by-id-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|taskId|path|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

> 404 Response

```json
{
  "message": "string",
  "code": "string"
}
```

<h3 id="get-task-by-id-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Task detail|[Task](#schematask)|
|404|Not Found|Not found|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Update task

<a id="opIdputTasksTaskId"></a>

> Code samples

```bash
hono request \
  -X PUT \
  -P /api/tasks/{taskId} \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{"title":"string","description":"string","status":"pending","tags":["string"]}' \
  src/index.ts
```

`PUT /tasks/{taskId}`

> Body parameter

```json
{
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ]
}
```

<h3 id="update-task-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|taskId|path|string|true|none|
|body|body|[UpdateTask](#schemaupdatetask)|true|none|
|» title|body|string|false|none|
|» description|body|string|false|none|
|» status|body|string|false|none|
|» tags|body|[string]|false|none|

#### Enumerated Values

|Parameter|Value|
|---|---|
|» status|pending|
|» status|in_progress|
|» status|done|

> Example responses

> 200 Response

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

> 400 Response

```json
{
  "message": "string",
  "code": "string"
}
```

> 404 Response

```json
{
  "message": "string",
  "code": "string"
}
```

<h3 id="update-task-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|Updated|[Task](#schematask)|
|400|Bad Request|Validation error|[Error](#schemaerror)|
|404|Not Found|Not found|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

## Delete task

<a id="opIddeleteTasksTaskId"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /api/tasks/{taskId} \
  -H 'Accept: application/json' \
  src/index.ts
```

`DELETE /tasks/{taskId}`

<h3 id="delete-task-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|taskId|path|string|true|none|

> Example responses

> 404 Response

```json
{
  "message": "string",
  "code": "string"
}
```

<h3 id="delete-task-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|204|No Content|Deleted|None|
|404|Not Found|Not found|[Error](#schemaerror)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Task">Task</h2>
<!-- backwards compatibility -->
<a id="schematask"></a>
<a id="schema_Task"></a>
<a id="tocStask"></a>
<a id="tocstask"></a>

```json
{
  "id": "string",
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ],
  "createdAt": "1970-01-01T00:00:00Z",
  "updatedAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string|true|none|none|
|title|string|true|none|none|
|description|string|false|none|none|
|status|string|true|none|none|
|tags|[string]|false|none|none|
|createdAt|string(date-time)|true|none|none|
|updatedAt|string(date-time)|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|in_progress|
|status|done|

<h2 id="tocS_CreateTask">CreateTask</h2>
<!-- backwards compatibility -->
<a id="schemacreatetask"></a>
<a id="schema_CreateTask"></a>
<a id="tocScreatetask"></a>
<a id="tocscreatetask"></a>

```json
{
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|true|none|none|
|description|string|false|none|none|
|status|string|false|none|none|
|tags|[string]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|in_progress|
|status|done|

<h2 id="tocS_UpdateTask">UpdateTask</h2>
<!-- backwards compatibility -->
<a id="schemaupdatetask"></a>
<a id="schema_UpdateTask"></a>
<a id="tocSupdatetask"></a>
<a id="tocsupdatetask"></a>

```json
{
  "title": "string",
  "description": "string",
  "status": "pending",
  "tags": [
    "string"
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|title|string|false|none|none|
|description|string|false|none|none|
|status|string|false|none|none|
|tags|[string]|false|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|status|pending|
|status|in_progress|
|status|done|

<h2 id="tocS_Error">Error</h2>
<!-- backwards compatibility -->
<a id="schemaerror"></a>
<a id="schema_Error"></a>
<a id="tocSerror"></a>
<a id="tocserror"></a>

```json
{
  "message": "string",
  "code": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|
|code|string|false|none|none|
