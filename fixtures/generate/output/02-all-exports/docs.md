---
title: All Exports API v1.0.0
language_tabs:
  - bash: Bash
toc_footers: []
includes: []
search: true
highlight_theme: darkula
headingLevel: 2

---

<h1 id="all-exports-api">All Exports API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

# Authentication

- HTTP Authentication, scheme: bearer

<h1 id="all-exports-api-default">Default</h1>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users \
  src/index.ts
```

`GET /users`

<h3 id="getusers-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|page|query|integer|false|none|

> Example responses

> 200 Response

```json
[
  {
    "id": 0,
    "name": "string",
    "email": "user@example.com"
  }
]
```

<h3 id="getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|A list of users|[UserList](#schemauserlist)|

<aside class="success">
This operation does not require authentication
</aside>

## createUser

<a id="opIdcreateUser"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /users \
  -H 'Accept: application/json' \
  src/index.ts
```

`POST /users`

> Body parameter

```json
{
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="createuser-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|object|false|none|
|» name|body|string|true|none|
|» email|body|string(email)|true|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="createuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[User](#schemauser)|

<aside class="success">
This operation does not require authentication
</aside>

## getUserById

<a id="opIdgetUserById"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{id} \
  -H 'Accept: application/json' \
  -H "Authorization: Bearer ${ACCESS_TOKEN}" \
  src/index.ts
```

`GET /users/{id}`

<h3 id="getuserbyid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|id|path|integer|true|none|

> Example responses

> 200 Response

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

<h3 id="getuserbyid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[User](#schemauser)|

<aside class="warning">
To perform this operation, you must be authenticated by means of one of the following methods:
BearerAuth
</aside>

# Schemas

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": 0,
  "name": "string",
  "email": "user@example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|name|string|true|none|none|
|email|string(email)|true|none|none|

<h2 id="tocS_UserList">UserList</h2>
<!-- backwards compatibility -->
<a id="schemauserlist"></a>
<a id="schema_UserList"></a>
<a id="tocSuserlist"></a>
<a id="tocsuserlist"></a>

```json
[
  {
    "id": 0,
    "name": "string",
    "email": "user@example.com"
  }
]
```
