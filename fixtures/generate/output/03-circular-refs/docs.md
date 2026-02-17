<h1 id="circular-references-api">Circular References API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

<h1 id="circular-references-api-default">Default</h1>

## getTree

<a id="opIdgetTree"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /tree \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /tree`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="gettree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[TreeNode](#schematreenode)|

<aside class="success">
This operation does not require authentication
</aside>

## createTree

<a id="opIdcreateTree"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /tree \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "id": 0,
    "value": "string",
    "children": [
      {}
    ]
  }' \
  src/index.ts
```

`POST /tree`

> Body parameter

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="createtree-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[TreeNode](#schematreenode)|true|none|
|» id|body|integer|true|none|
|» value|body|string|true|none|
|» children|body|[[TreeNode](#schematreenode)]|false|none|

> Example responses

> 201 Response

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {}
  ]
}
```

<h3 id="createtree-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|Created|[TreeNode](#schematreenode)|

<aside class="success">
This operation does not require authentication
</aside>

## getGraph

<a id="opIdgetGraph"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /graph \
  -H 'Accept: application/json' \
  src/index.ts
```

`GET /graph`

> Example responses

> 200 Response

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {}
    }
  }
}
```

<h3 id="getgraph-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|OK|[NodeA](#schemanodea)|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_TreeNode">TreeNode</h2>
<!-- backwards compatibility -->
<a id="schematreenode"></a>
<a id="schema_TreeNode"></a>
<a id="tocStreenode"></a>
<a id="tocstreenode"></a>

```json
{
  "id": 0,
  "value": "string",
  "children": [
    {
      "id": 0,
      "value": "string",
      "children": [
        {}
      ]
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|value|string|true|none|none|
|children|[[TreeNode](#schematreenode)]|false|none|none|

<h2 id="tocS_NodeA">NodeA</h2>
<!-- backwards compatibility -->
<a id="schemanodea"></a>
<a id="schema_NodeA"></a>
<a id="tocSnodea"></a>
<a id="tocsnodea"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[NodeB](#schemanodeb)|false|none|none|

<h2 id="tocS_NodeB">NodeB</h2>
<!-- backwards compatibility -->
<a id="schemanodeb"></a>
<a id="schema_NodeB"></a>
<a id="tocSnodeb"></a>
<a id="tocsnodeb"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[NodeC](#schemanodec)|false|none|none|

<h2 id="tocS_NodeC">NodeC</h2>
<!-- backwards compatibility -->
<a id="schemanodec"></a>
<a id="schema_NodeC"></a>
<a id="tocSnodec"></a>
<a id="tocsnodec"></a>

```json
{
  "id": 0,
  "ref": {
    "id": 0,
    "ref": {
      "id": 0,
      "ref": {
        "id": 0,
        "ref": {}
      }
    }
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|integer|true|none|none|
|ref|[NodeA](#schemanodea)|false|none|none|
