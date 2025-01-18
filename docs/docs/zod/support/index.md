---
prev: false
next: false
---

# Zod Support List

## Primitives

* [Primitives](https://zod.dev/?id=primitives)

```ts
// primitive values
z.string() ✅
z.number() ✅
z.bigint() ✅
z.boolean() ✅
z.date() ❌
z.symbol() ❌

// empty types
z.undefined() ❌
z.null() ✅
z.void() ❌

// catch-all types
// allows any value
z.any() ✅
z.unknown() ✅

// never type
// allows no values
z.never() ✅
```



## Literals

* [Literals](https://zod.dev/?id=literals)

```ts
z.literal("tuna") ❌
```

## Strings

* [Strings](https://zod.dev/?id=strings)

```ts
// validations
z.string().max(*) ❌
z.string().min(*) ❌
z.string().length(*) ❌
z.string().email() ✅
z.string().url() ✅
z.string().emoji() ✅
z.string().uuid() ✅
z.string().nanoid() ✅
z.string().cuid() ✅
z.string().cuid2() ✅
z.string().ulid() ✅
z.string().ip() ✅
z.string().cidr() ✅

// transforms
z.string().trim() ✅ // trim whitespace
z.string().toLowerCase() ✅ // toLowerCase
z.string().toUpperCase() ✅ // toUpperCase

// added in Zod 3.23
z.string().date() ✅ // ISO 8601; by default only `Z` timezone allowed
z.string().time() ✅ // defaults to allow both IPv4 and IPv6
z.string().duration() ✅ // defaults to allow both IPv4 and IPv6
z.string().base64() ✅
```

## Datetimes

* [Datetimes](https://zod.dev/?id=datetimes)

```ts
z.string().datetime() ✅
```

## Dates

* [Dates](https://zod.dev/?id=dates)

```ts
z.date() ❌
```


## Times

* [Times](https://zod.dev/?id=times)

```ts
z.string().time() ❌
```

## IP addresses

* [IP addresses](https://zod.dev/?id=ip-addresses)

```ts
z.string().ip() ✅
```

## IP ranges (CIDR)

* [IP ranges (CIDR)](https://zod.dev/?id=ip-ranges-cidr)

```
z.string().cidr() ✅
```

## Numbers

* [Numbers](https://zod.dev/?id=numbers)

```ts
z.number().gt(5) ❌
z.number().gte(5) ❌
z.number().lt(5) ❌
z.number().lte(5) ❌ // alias .max(5)

z.number().int() ✅ // value must be an integer

z.number().positive()❌ //     > 0
z.number().nonnegative()❌ //  >= 0
z.number().negative()❌ //     < 0
z.number().nonpositive() ❌ //  <= 0

z.number().multipleOf(5) ❌ // Evenly divisible by 5. Alias .step(5)

z.number().finite() ❎ // value must be finite, not Infinity or -Infinity
z.number().safe() ❌ // value must be between Number.MIN_SAFE_INTEGER and Number.MAX_SAFE_INTEGER
```

## BigInts

* [BigInts](https://zod.dev/?id=bigints)

```ts
z.bigint().gt(5n) ❌
z.bigint().gte(5n) ❌ // alias `.min(5n)`
z.bigint().lt(5n) ❌
z.bigint().lte(5n) ❌ // alias `.max(5n)`

z.bigint().positive() ❌ // > 0n
z.bigint().nonnegative() ❌ // >= 0n
z.bigint().negative() ❌ // < 0n
z.bigint().nonpositive() ❌ // <= 0n

z.bigint().multipleOf(5n) ❌ // Evenly divisible by 5n.
```

## NaNs

* [NaNs](https://zod.dev/?id=nans)

```ts
z.nan({
  required_error: "isNaN is required",
  invalid_type_error: "isNaN must be 'not a number'",
}) ❌
```

## booleans

* [Booleans](https://zod.dev/?id=booleans)

```ts
const isActive = z.boolean({
  required_error: "isActive is required",
  invalid_type_error: "isActive must be a boolean",
}) ❌
```


## Zod enums

* [Zod enums](https://zod.dev/?id=zod-enums)

```ts
const geoJsonObjectSchema = z
  .object({
    type: z.enum([
      'Feature',
      'FeatureCollection',
      'Point',
      'MultiPoint',
      'LineString',
      'MultiLineString',
      'Polygon',
      'MultiPolygon',
      'GeometryCollection',
    ]),
    bbox: z.array(z.number()).optional(),
  })
  .openapi('GeoJsonObject') ✅
```

## Native enums

* [Native enums](https://zod.dev/?id=native-enums)

```ts
enum Fruits {
  Apple,
  Banana,
}

const FruitEnum = z.nativeEnum(Fruits);
type FruitEnum = z.infer<typeof FruitEnum>; // Fruits

FruitEnum.parse(Fruits.Apple); // passes
FruitEnum.parse(Fruits.Banana); // passes
FruitEnum.parse(0); // passes
FruitEnum.parse(1); // passes
FruitEnum.parse(3); // fails ❌
```

## Optionals

* [Optionals](https://zod.dev/?id=optionals)

```ts
z.optional(z.string()) ✅
```


## Nullables

* [Nullables](https://zod.dev/?id=nullables)

```ts
const featureSchema = z
  .intersection(
    geoJsonObjectSchema,
    z.object({
      geometry: geometrySchema.nullable(),
      properties: z.object({}),
      id: z.union([z.number(), z.string()]).optional(),
    }),
  )
  .openapi('Feature') ✅
```

## Objects

* [Objects](https://zod.dev/?id=objects)

```ts
const orderSchema = z
  .object({
    id: z.number().int().openapi({ example: 10 }),
    petId: z.number().int().openapi({ example: 198772 }),
    quantity: z.number().int().openapi({ example: 7 }),
    shipDate: z.string().datetime(),
    status: z.enum(['placed', 'approved', 'delivered']).openapi({ example: 'approved' }),
    complete: z.boolean(),
  })
  .partial()
  .openapi('Order') ✅
```

- `.shape` ❌
- `.keyof` ❌
- `.extend` ❌
- `.merge` ❌
- `pick` ❌
- `omit` ❌
- `.partial` ✅
- `.deepPartial` ❌
- `.required` ❌
- `.passthrough` ❌
- `.strict` ❌
- `.strip` ❌
- `.catchall` ❌


## Arrays

* [Arrays](https://zod.dev/?id=arrays)

```ts
const lineStringCoordinatesSchema = z.array(positionSchema).openapi('LineStringCoordinates') ✅
```

- `.element` ❌
- `.nonempty` ❌
- `.min` ❌
- `.max` ❌

## Tuples

* [Tuples](https://zod.dev/?id=tuples)

❌

## Unions

* [Unions](https://zod.dev/?id=unions)

```ts
const projectSchema = z
  .object({
    id: z.string().uuid(),
    polygon: z.union([multiPolygonSchema, polygonSchema]).optional(),
    centre: pointSchema.optional(),
    createdAt: z.string().datetime(),
    updatedAt: z.string().datetime(),
  })
  .openapi('Project') ✅
```

## Discriminated unions

* [Discriminated unions](https://zod.dev/?id=discriminated-unions)

❌

## Records

* [Records](https://zod.dev/?id=records)

```ts
export const getStoreInventoryRoute = createRoute({
  tags: ['store'],
  method: 'get',
  path: '/store/inventory',
  summary: 'Returns pet inventories by status',
  description: 'Returns a map of status codes to quantities',
  security: [{ api_key: [] }],
  responses: {
    200: {
      description: 'successful operation',
      content: { 'application/json': { schema: z.record(z.string(), z.number().int()) } },
    },
  },
}) ✅
```

## Maps

* [Maps](https://zod.dev/?id=maps)

❌

## Sets

* [Sets](https://zod.dev/?id=sets)

❌

## Intersections

* [Intersections](https://zod.dev/?id=intersections)

```ts
const pointSchema = z
  .intersection(
    geometryElementSchema,
    z.object({ type: z.enum(['Point']), coordinates: positionSchema }),
  )
  .openapi('Point') ✅
```

## Recursive types

* [Recursive types](https://zod.dev/?id=recursive-types)

❌

## ZodType with ZodEffects

* [ZodType with ZodEffects](https://zod.dev/?id=zodtype-with-zodeffects)

❌

## JSON type

* [JSON type](https://zod.dev/?id=json-type)

❌

## Promises

* [Promises](https://zod.dev/?id=promises)

❌

## Instanceof

* [Instanceof](https://zod.dev/?id=instanceof)

❌

## Functions

* [Functions](https://zod.dev/?id=functions)

❌


## Preprocess

* [Preprocess](https://zod.dev/?id=preprocess)

❌


## Custom schemas

* [Custom schemas](https://zod.dev/?id=custom-schemas)

❌

## Schema methods

* [Schema methods](https://zod.dev/?id=schema-methods)

- `.parse` ❌
- `.parseAsync` ❌
- `.safeParse` ❌
- `.safeParseAsync` ❌
- `.refine` ❌
- `.superRefine` ❌
- `.transform` ❌

- `.default` ✅

```ts
z.number().default(1) ✅
```

- `.describe` ❌
- `.catch` ❌

- `.optional` ✅

```ts
z.array(z.number()).optional() ✅
```

- `.nullable` ✅

```ts
const featureSchema = z
  .intersection(
    geoJsonObjectSchema,
    z.object({
      geometry: geometrySchema.nullable(),
      properties: z.object({}),
      id: z.union([z.number(), z.string()]).optional(),
    }),
  )
  .openapi('Feature') ✅
```

- `.nullish` ❌

- `.array` ✅

```ts
z.array(positionSchema).openapi('LinearRing') ✅
```

- `.promise` ❌
- `.or` ❌
- `.and` ❌
- `.brand` ❌
- `.readonly` ❌

- `.pipe` ✅

```ts
export const getPostsRoute = createRoute({
  tags: ['Post'],
  method: 'get',
  path: '/posts',
  summary: 'Retrieve a list of posts',
  description:
    'Retrieve a paginated list of posts. Specify the page number and the number of posts per page.',
  request: {
    query: z.object({
      page: z.string().pipe(z.coerce.number().int().min(0).default(1).openapi({ example: 1 })),
      rows: z.string().pipe(z.coerce.number().int().min(0).default(10).openapi({ example: 10 })),
    }),
  },
  responses: {
    200: {
      description: 'Successfully retrieved a list of posts.',
      content: { 'application/json': { schema: z.array(postSchema) } },
    },
    400: {
      description: 'Invalid request due to bad input.',
      content: { 'application/json': { schema: errorSchema } },
    },
    500: {
      description: 'Internal server error.',
      content: { 'application/json': { schema: errorSchema } },
    },
  },
}) ✅
```