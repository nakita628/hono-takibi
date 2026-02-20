<h1 id="opennext-twitter-clone-api">OpenNext Twitter Clone API v1.0.0</h1>

> Scroll down for code samples, example requests and responses. Select a language for code samples from the tabs above or the mobile navigation menu.

OpenNext Twitter Clone API

<h1 id="opennext-twitter-clone-api-comments">comments</h1>

## postComments

<a id="opIdpostComments"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /comments \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "body": "string"
  }' \
  src/app/api/[[...route]]/route.ts
```

`POST /comments`

> Body parameter

```json
{
  "body": "string"
}
```

<h3 id="postcomments-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|postId|query|string(uuid)|true|none|
|body|body|[CreateCommentRequest](#schemacreatecommentrequest)|true|none|
|» body|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="postcomments-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[Comment](#schemacomment)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-current">current</h1>

## getCurrentUser

<a id="opIdgetCurrentUser"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /current \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /current`

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "followers": [
    {
      "followerId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "followingId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "following": [
    {}
  ],
  "hasNotification": true
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getcurrentuser-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[CurrentUser](#schemacurrentuser)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-edit">edit</h1>

## patchEdit

<a id="opIdpatchEdit"></a>

> Code samples

```bash
hono request \
  -X PATCH \
  -P /edit \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "name": "string",
    "username": "string",
    "bio": "string",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com"
  }' \
  src/app/api/[[...route]]/route.ts
```

`PATCH /edit`

> Body parameter

```json
{
  "name": "string",
  "username": "string",
  "bio": "string",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com"
}
```

<h3 id="patchedit-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[EditUserRequest](#schemaedituserrequest)|true|none|
|» name|body|string|false|none|
|» username|body|string|false|none|
|» bio|body|string|false|none|
|» coverImage|body|string(uri)|false|none|
|» profileImage|body|string(uri)|false|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "emailVerified": "string",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "hasNotification": true
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="patchedit-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[User](#schemauser)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-follow">follow</h1>

## postFollowUesrId

<a id="opIdpostFollowUesrId"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /follow \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  }' \
  src/app/api/[[...route]]/route.ts
```

`POST /follow`

> Body parameter

```json
{
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

<h3 id="postfollowuesrid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[FollowUserRequest](#schemafollowuserrequest)|true|none|
|» userId|body|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="postfollowuesrid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[MessageResponse](#schemamessageresponse)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteFollowUserId

<a id="opIddeleteFollowUserId"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /follow \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  }' \
  src/app/api/[[...route]]/route.ts
```

`DELETE /follow`

> Body parameter

```json
{
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

<h3 id="deletefollowuserid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[FollowUserRequest](#schemafollowuserrequest)|true|none|
|» userId|body|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="deletefollowuserid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[MessageResponse](#schemamessageresponse)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-like">like</h1>

## postLikePostId

<a id="opIdpostLikePostId"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /like \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  }' \
  src/app/api/[[...route]]/route.ts
```

`POST /like`

> Body parameter

```json
{
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

<h3 id="postlikepostid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LikePostRequest](#schemalikepostrequest)|true|none|
|» postId|body|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "string"
    }
  ]
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="postlikepostid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[PostWithLikes](#schemapostwithlikes)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## deleteLikePostId

<a id="opIddeleteLikePostId"></a>

> Code samples

```bash
hono request \
  -X DELETE \
  -P /like \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
  }' \
  src/app/api/[[...route]]/route.ts
```

`DELETE /like`

> Body parameter

```json
{
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

<h3 id="deletelikepostid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[LikePostRequest](#schemalikepostrequest)|true|none|
|» postId|body|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "string"
    }
  ]
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="deletelikepostid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[PostWithLikes](#schemapostwithlikes)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-notifications">notifications</h1>

## getNotificationsUserId

<a id="opIdgetNotificationsUserId"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /notifications/{userId} \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /notifications/{userId}`

<h3 id="getnotificationsuserid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string(uuid)|true|none|

> Example responses

> 200 Response

```json
[
  {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "body": "string",
    "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "createdAt": "string"
  }
]
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getnotificationsuserid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|Inline|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<h3 id="getnotificationsuserid-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[Notification](#schemanotification)]|false|none|none|
|» id|string(uuid)|true|none|none|
|» body|string|true|none|none|
|» userId|string(uuid)|true|none|none|
|» createdAt|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## postNotificationsUserId

<a id="opIdpostNotificationsUserId"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /notifications \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`POST /notifications`

> Example responses

> 200 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="postnotificationsuserid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-posts">posts</h1>

## getPosts

<a id="opIdgetPosts"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /posts`

<h3 id="getposts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|query|string(uuid)|true|none|

> Example responses

> 200 Response

```json
[
  {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "body": "string",
    "createdAt": "string",
    "updatedAt": "string",
    "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "user": {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "name": "string",
      "username": "string",
      "bio": "string",
      "email": "user@example.com",
      "emailVerified": "string",
      "image": "http://example.com",
      "coverImage": "http://example.com",
      "profileImage": "http://example.com",
      "createdAt": "string",
      "updatedAt": "string",
      "hasNotification": true
    },
    "comments": [
      {
        "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "body": "string",
        "createdAt": "string",
        "updatedAt": "string",
        "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
      }
    ],
    "likes": [
      {
        "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
        "createdAt": "string"
      }
    ]
  }
]
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getposts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|Inline|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<h3 id="getposts-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[PostWithDetails](#schemapostwithdetails)]|false|none|none|
|» id|string(uuid)|true|none|none|
|» body|string|true|none|none|
|» createdAt|string|true|none|none|
|» updatedAt|string|true|none|none|
|» userId|string(uuid)|true|none|none|
|» user|[User](#schemauser)|true|none|none|
|» » id|string(uuid)|true|none|none|
|» » name|string|true|none|none|
|» » username|string|true|none|none|
|» » bio|string|false|none|none|
|» » email|string(email)|true|none|none|
|» » emailVerified|string|true|none|none|
|» » image|string(uri)|true|none|none|
|» » coverImage|string(uri)|true|none|none|
|» » profileImage|string(uri)|true|none|none|
|» » createdAt|string|true|none|none|
|» » updatedAt|string|true|none|none|
|» » hasNotification|boolean|false|none|none|
|» comments|[[Comment](#schemacomment)]|true|none|none|
|» » id|string(uuid)|true|none|none|
|» » body|string|true|none|none|
|» » createdAt|string|true|none|none|
|» » updatedAt|string|true|none|none|
|» » userId|string(uuid)|true|none|none|
|» » postId|string(uuid)|true|none|none|
|» likes|[[Like](#schemalike)]|true|none|none|
|» » userId|string(uuid)|true|none|none|
|» » postId|string(uuid)|true|none|none|
|» » createdAt|string|true|none|none|

<aside class="success">
This operation does not require authentication
</aside>

## postPosts

<a id="opIdpostPosts"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /posts \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "body": "string"
  }' \
  src/app/api/[[...route]]/route.ts
```

`POST /posts`

> Body parameter

```json
{
  "body": "string"
}
```

<h3 id="postposts-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[CreatePostRequest](#schemacreatepostrequest)|true|none|
|» body|body|string|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

> 401 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="postposts-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[Post](#schemapost)|
|401|Unauthorized|Access is unauthorized.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## getPostsPostId

<a id="opIdgetPostsPostId"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /posts/{postId} \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /posts/{postId}`

<h3 id="getpostspostid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|postId|path|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "username": "string",
    "bio": "string",
    "email": "user@example.com",
    "emailVerified": "string",
    "image": "http://example.com",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com",
    "createdAt": "string",
    "updatedAt": "string",
    "hasNotification": true
  },
  "comments": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "body": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "user": {}
    }
  ],
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    }
  ],
  "_count": {
    "likes": 0
  }
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getpostspostid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[PostDetail](#schemapostdetail)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-register">register</h1>

## postRegister

<a id="opIdpostRegister"></a>

> Code samples

```bash
hono request \
  -X POST \
  -P /register \
  -H 'Content-Type: application/json' \
  -H 'Accept: application/json' \
  -d '{
    "email": "user@example.com",
    "name": "string",
    "username": "string",
    "password": "string"
  }' \
  src/app/api/[[...route]]/route.ts
```

`POST /register`

> Body parameter

```json
{
  "email": "user@example.com",
  "name": "string",
  "username": "string",
  "password": "string"
}
```

<h3 id="postregister-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|body|body|[RegisterRequest](#schemaregisterrequest)|true|none|
|» email|body|string(email)|true|none|
|» name|body|string|true|none|
|» username|body|string|true|none|
|» password|body|string|true|none|

> Example responses

> 201 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "emailVerified": "string",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "hasNotification": true
}
```

> 404 Response

```json
{
  "message": "string"
}
```

> 409 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

> 503 Response

```json
{
  "message": "string"
}
```

<h3 id="postregister-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|201|Created|The request has succeeded and a new resource has been created as a result.|[User](#schemauser)|
|404|Not Found|The server cannot find the requested resource.|[MessageResponse](#schemamessageresponse)|
|409|Conflict|The request conflicts with the current state of the server.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|
|503|Service Unavailable|Service unavailable.|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

<h1 id="opennext-twitter-clone-api-users">users</h1>

## getUserUserId

<a id="opIdgetUserUserId"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users/{userId} \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /users/{userId}`

<h3 id="getuseruserid-parameters">Parameters</h3>

|Name|In|Type|Required|Description|
|---|---|---|---|---|
|userId|path|string(uuid)|true|none|

> Example responses

> 200 Response

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "emailVerified": "string",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "hasNotification": true,
  "_count": {
    "followers": 0,
    "following": 0
  }
}
```

> 404 Response

```json
{
  "message": "string"
}
```

> 422 Response

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getuseruserid-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|[UserWithFollowCount](#schemauserwithfollowcount)|
|404|Not Found|The server cannot find the requested resource.|[MessageResponse](#schemamessageresponse)|
|422|Unprocessable Entity|Client error|[ValidationError](#schemavalidationerror)|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<aside class="success">
This operation does not require authentication
</aside>

## getUsers

<a id="opIdgetUsers"></a>

> Code samples

```bash
hono request \
  -X GET \
  -P /users \
  -H 'Accept: application/json' \
  src/app/api/[[...route]]/route.ts
```

`GET /users`

> Example responses

> 200 Response

```json
[
  {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "username": "string",
    "bio": "string",
    "email": "user@example.com",
    "emailVerified": "string",
    "image": "http://example.com",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com",
    "createdAt": "string",
    "updatedAt": "string",
    "hasNotification": true
  }
]
```

> 500 Response

```json
{
  "message": "string"
}
```

<h3 id="getusers-responses">Responses</h3>

|Status|Meaning|Description|Schema|
|---|---|---|---|
|200|OK|The request has succeeded.|Inline|
|500|Internal Server Error|Server error|[MessageResponse](#schemamessageresponse)|

<h3 id="getusers-responseschema">Response Schema</h3>

Status Code **200**

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|*anonymous*|[[User](#schemauser)]|false|none|none|
|» id|string(uuid)|true|none|none|
|» name|string|true|none|none|
|» username|string|true|none|none|
|» bio|string|false|none|none|
|» email|string(email)|true|none|none|
|» emailVerified|string|true|none|none|
|» image|string(uri)|true|none|none|
|» coverImage|string(uri)|true|none|none|
|» profileImage|string(uri)|true|none|none|
|» createdAt|string|true|none|none|
|» updatedAt|string|true|none|none|
|» hasNotification|boolean|false|none|none|

<aside class="success">
This operation does not require authentication
</aside>

# Schemas

<h2 id="tocS_Comment">Comment</h2>
<!-- backwards compatibility -->
<a id="schemacomment"></a>
<a id="schema_Comment"></a>
<a id="tocScomment"></a>
<a id="tocscomment"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|
|postId|string(uuid)|true|none|none|

<h2 id="tocS_MessageResponse">MessageResponse</h2>
<!-- backwards compatibility -->
<a id="schemamessageresponse"></a>
<a id="schema_MessageResponse"></a>
<a id="tocSmessageresponse"></a>
<a id="tocsmessageresponse"></a>

```json
{
  "message": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|message|string|true|none|none|

<h2 id="tocS_ValidationErrorDetail">ValidationErrorDetail</h2>
<!-- backwards compatibility -->
<a id="schemavalidationerrordetail"></a>
<a id="schema_ValidationErrorDetail"></a>
<a id="tocSvalidationerrordetail"></a>
<a id="tocsvalidationerrordetail"></a>

```json
{
  "pointer": "string",
  "detail": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|pointer|string|true|none|none|
|detail|string|true|none|none|

<h2 id="tocS_ValidationError">ValidationError</h2>
<!-- backwards compatibility -->
<a id="schemavalidationerror"></a>
<a id="schema_ValidationError"></a>
<a id="tocSvalidationerror"></a>
<a id="tocsvalidationerror"></a>

```json
{
  "type": "about:blank",
  "title": "Unprocessable Content",
  "status": 422,
  "detail": "Request validation failed",
  "errors": [
    {
      "pointer": "string",
      "detail": "string"
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|type|string|true|none|none|
|title|string|true|none|none|
|status|number|true|none|none|
|detail|string|true|none|none|
|errors|[[ValidationErrorDetail](#schemavalidationerrordetail)]|true|none|none|

#### Enumerated Values

|Property|Value|
|---|---|
|type|about:blank|
|title|Unprocessable Content|
|status|422|
|detail|Request validation failed|

<h2 id="tocS_CreateCommentRequest">CreateCommentRequest</h2>
<!-- backwards compatibility -->
<a id="schemacreatecommentrequest"></a>
<a id="schema_CreateCommentRequest"></a>
<a id="tocScreatecommentrequest"></a>
<a id="tocscreatecommentrequest"></a>

```json
{
  "body": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|body|string|true|none|none|

<h2 id="tocS_Follow">Follow</h2>
<!-- backwards compatibility -->
<a id="schemafollow"></a>
<a id="schema_Follow"></a>
<a id="tocSfollow"></a>
<a id="tocsfollow"></a>

```json
{
  "followerId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "followingId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "createdAt": "1970-01-01T00:00:00Z"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|followerId|string(uuid)|true|none|none|
|followingId|string(uuid)|true|none|none|
|createdAt|string(date-time)|true|none|none|

<h2 id="tocS_CurrentUser">CurrentUser</h2>
<!-- backwards compatibility -->
<a id="schemacurrentuser"></a>
<a id="schema_CurrentUser"></a>
<a id="tocScurrentuser"></a>
<a id="tocscurrentuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "followers": [
    {
      "followerId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "followingId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "1970-01-01T00:00:00Z"
    }
  ],
  "following": [
    {}
  ],
  "hasNotification": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|name|string|true|none|none|
|username|string|true|none|none|
|bio|string|false|none|none|
|email|string(email)|true|none|none|
|image|string(uri)|true|none|none|
|coverImage|string(uri)|true|none|none|
|profileImage|string(uri)|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|followers|[[Follow](#schemafollow)]|true|none|none|
|following|[[Follow](#schemafollow)]|true|none|none|
|hasNotification|boolean|true|none|none|

<h2 id="tocS_User">User</h2>
<!-- backwards compatibility -->
<a id="schemauser"></a>
<a id="schema_User"></a>
<a id="tocSuser"></a>
<a id="tocsuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "emailVerified": "string",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "hasNotification": true
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|name|string|true|none|none|
|username|string|true|none|none|
|bio|string|false|none|none|
|email|string(email)|true|none|none|
|emailVerified|string|true|none|none|
|image|string(uri)|true|none|none|
|coverImage|string(uri)|true|none|none|
|profileImage|string(uri)|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|hasNotification|boolean|false|none|none|

<h2 id="tocS_EditUserRequest">EditUserRequest</h2>
<!-- backwards compatibility -->
<a id="schemaedituserrequest"></a>
<a id="schema_EditUserRequest"></a>
<a id="tocSedituserrequest"></a>
<a id="tocsedituserrequest"></a>

```json
{
  "name": "string",
  "username": "string",
  "bio": "string",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|name|string|false|none|none|
|username|string|false|none|none|
|bio|string|false|none|none|
|coverImage|string(uri)|false|none|none|
|profileImage|string(uri)|false|none|none|

<h2 id="tocS_FollowUserRequest">FollowUserRequest</h2>
<!-- backwards compatibility -->
<a id="schemafollowuserrequest"></a>
<a id="schema_FollowUserRequest"></a>
<a id="tocSfollowuserrequest"></a>
<a id="tocsfollowuserrequest"></a>

```json
{
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|userId|string(uuid)|true|none|none|

<h2 id="tocS_Like">Like</h2>
<!-- backwards compatibility -->
<a id="schemalike"></a>
<a id="schema_Like"></a>
<a id="tocSlike"></a>
<a id="tocslike"></a>

```json
{
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "createdAt": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|userId|string(uuid)|true|none|none|
|postId|string(uuid)|true|none|none|
|createdAt|string|true|none|none|

<h2 id="tocS_PostWithLikes">PostWithLikes</h2>
<!-- backwards compatibility -->
<a id="schemapostwithlikes"></a>
<a id="schema_PostWithLikes"></a>
<a id="tocSpostwithlikes"></a>
<a id="tocspostwithlikes"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "string"
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|
|likes|[[Like](#schemalike)]|true|none|none|

<h2 id="tocS_LikePostRequest">LikePostRequest</h2>
<!-- backwards compatibility -->
<a id="schemalikepostrequest"></a>
<a id="schema_LikePostRequest"></a>
<a id="tocSlikepostrequest"></a>
<a id="tocslikepostrequest"></a>

```json
{
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|postId|string(uuid)|true|none|none|

<h2 id="tocS_Notification">Notification</h2>
<!-- backwards compatibility -->
<a id="schemanotification"></a>
<a id="schema_Notification"></a>
<a id="tocSnotification"></a>
<a id="tocsnotification"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "createdAt": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|userId|string(uuid)|true|none|none|
|createdAt|string|true|none|none|

<h2 id="tocS_PostWithDetails">PostWithDetails</h2>
<!-- backwards compatibility -->
<a id="schemapostwithdetails"></a>
<a id="schema_PostWithDetails"></a>
<a id="tocSpostwithdetails"></a>
<a id="tocspostwithdetails"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "username": "string",
    "bio": "string",
    "email": "user@example.com",
    "emailVerified": "string",
    "image": "http://example.com",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com",
    "createdAt": "string",
    "updatedAt": "string",
    "hasNotification": true
  },
  "comments": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "body": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    }
  ],
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "createdAt": "string"
    }
  ]
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|
|user|[User](#schemauser)|true|none|none|
|comments|[[Comment](#schemacomment)]|true|none|none|
|likes|[[Like](#schemalike)]|true|none|none|

<h2 id="tocS_Post">Post</h2>
<!-- backwards compatibility -->
<a id="schemapost"></a>
<a id="schema_Post"></a>
<a id="tocSpost"></a>
<a id="tocspost"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|

<h2 id="tocS_CreatePostRequest">CreatePostRequest</h2>
<!-- backwards compatibility -->
<a id="schemacreatepostrequest"></a>
<a id="schema_CreatePostRequest"></a>
<a id="tocScreatepostrequest"></a>
<a id="tocscreatepostrequest"></a>

```json
{
  "body": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|body|string|true|none|none|

<h2 id="tocS_CommentWithUser">CommentWithUser</h2>
<!-- backwards compatibility -->
<a id="schemacommentwithuser"></a>
<a id="schema_CommentWithUser"></a>
<a id="tocScommentwithuser"></a>
<a id="tocscommentwithuser"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "username": "string",
    "bio": "string",
    "email": "user@example.com",
    "emailVerified": "string",
    "image": "http://example.com",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com",
    "createdAt": "string",
    "updatedAt": "string",
    "hasNotification": true
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|
|postId|string(uuid)|true|none|none|
|user|[User](#schemauser)|true|none|none|

<h2 id="tocS_PostDetail">PostDetail</h2>
<!-- backwards compatibility -->
<a id="schemapostdetail"></a>
<a id="schema_PostDetail"></a>
<a id="tocSpostdetail"></a>
<a id="tocspostdetail"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "body": "string",
  "createdAt": "string",
  "updatedAt": "string",
  "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "user": {
    "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
    "name": "string",
    "username": "string",
    "bio": "string",
    "email": "user@example.com",
    "emailVerified": "string",
    "image": "http://example.com",
    "coverImage": "http://example.com",
    "profileImage": "http://example.com",
    "createdAt": "string",
    "updatedAt": "string",
    "hasNotification": true
  },
  "comments": [
    {
      "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "body": "string",
      "createdAt": "string",
      "updatedAt": "string",
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "postId": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
      "user": {}
    }
  ],
  "likes": [
    {
      "userId": "497f6eca-6276-4993-bfeb-53cbbbba6f08"
    }
  ],
  "_count": {
    "likes": 0
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|body|string|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|userId|string(uuid)|true|none|none|
|user|[User](#schemauser)|true|none|none|
|comments|[[CommentWithUser](#schemacommentwithuser)]|true|none|none|
|likes|[object]|true|none|none|
|_count|object|true|none|none|

<h2 id="tocS_RegisterRequest">RegisterRequest</h2>
<!-- backwards compatibility -->
<a id="schemaregisterrequest"></a>
<a id="schema_RegisterRequest"></a>
<a id="tocSregisterrequest"></a>
<a id="tocsregisterrequest"></a>

```json
{
  "email": "user@example.com",
  "name": "string",
  "username": "string",
  "password": "string"
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|email|string(email)|true|none|none|
|name|string|true|none|none|
|username|string|true|none|none|
|password|string|true|none|none|

<h2 id="tocS_UserWithFollowCount">UserWithFollowCount</h2>
<!-- backwards compatibility -->
<a id="schemauserwithfollowcount"></a>
<a id="schema_UserWithFollowCount"></a>
<a id="tocSuserwithfollowcount"></a>
<a id="tocsuserwithfollowcount"></a>

```json
{
  "id": "497f6eca-6276-4993-bfeb-53cbbbba6f08",
  "name": "string",
  "username": "string",
  "bio": "string",
  "email": "user@example.com",
  "emailVerified": "string",
  "image": "http://example.com",
  "coverImage": "http://example.com",
  "profileImage": "http://example.com",
  "createdAt": "string",
  "updatedAt": "string",
  "hasNotification": true,
  "_count": {
    "followers": 0,
    "following": 0
  }
}
```

### Properties

|Name|Type|Required|Restrictions|Description|
|---|---|---|---|---|
|id|string(uuid)|true|none|none|
|name|string|true|none|none|
|username|string|true|none|none|
|bio|string|false|none|none|
|email|string(email)|true|none|none|
|emailVerified|string|true|none|none|
|image|string(uri)|true|none|none|
|coverImage|string(uri)|true|none|none|
|profileImage|string(uri)|true|none|none|
|createdAt|string|true|none|none|
|updatedAt|string|true|none|none|
|hasNotification|boolean|false|none|none|
|_count|object|true|none|none|
