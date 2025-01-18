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

## .shape

* [.shape](https://zod.dev/?id=shape)

```ts
Dog.shape.name // => string schema
Dog.shape.age // => number schema ❌
```

## .keyof

* [.keyof](https://zod.dev/?id=keyof)

```ts
const keySchema = Dog.keyof()
keySchema // ZodEnum<["name", "age"]> ❌
```

## .extend

* [.extend](https://zod.dev/?id=extend)

```ts
const DogWithBreed = Dog.extend({
  breed: z.string(),
}) ❌
```

## .merge

* [.merge](https://zod.dev/?id=merge)

```ts
const BaseTeacher = z.object({ students: z.array(z.string()) });
const HasID = z.object({ id: z.string() });

const Teacher = BaseTeacher.merge(HasID);
type Teacher = z.infer<typeof Teacher>; // => { students: string[], id: string } ❌
```

## .pick/.omit

* [.pick/.omit](https://zod.dev/?id=pickomit)

```ts
const Recipe = z.object({
  id: z.string(),
  name: z.string(),
  ingredients: z.array(z.string()),
})
```

&emsp;pick

```ts
const JustTheName = Recipe.pick({ name: true });
type JustTheName = z.infer<typeof JustTheName>;
// => { name: string } ❌
```

&emsp;omit

```ts
const NoIDRecipe = Recipe.omit({ id: true });

type NoIDRecipe = z.infer<typeof NoIDRecipe>;
// => { name: string, ingredients: string[] } ❌
```


## .partial

* [.partial](https://zod.dev/?id=partial)

```ts
const addressSchema = z
  .object({
    street: z.string().openapi({ example: '437 Lytton' }),
    city: z.string().openapi({ example: 'Palo Alto' }),
    state: z.string().openapi({ example: 'CA' }),
    zip: z.string().openapi({ example: '94301' }),
  })
  .partial()
  .openapi('Address') ✅
```

## .deepPartial

* [.deepPartial](https://zod.dev/?id=deeppartial)

```ts
const user = z.object({
  username: z.string(),
  location: z.object({
    latitude: z.number(),
    longitude: z.number(),
  }),
  strings: z.array(z.object({ value: z.string() })),
});

const deepPartialUser = user.deepPartial()

/*
{
  username?: string | undefined,
  location?: {
    latitude?: number | undefined;
    longitude?: number | undefined;
  } | undefined,
  strings?: { value?: string}[]
}
*/ ❌
```

## .required

* [.required](https://zod.dev/?id=required)

```ts
const user = z
  .object({
    email: z.string(),
    username: z.string(),
  })
  .partial();
// { email?: string | undefined; username?: string | undefined }
```

```ts
const requiredUser = user.required();
// { email: string; username: string } ❌
```

## .passthrough

* [.passthrough](https://zod.dev/?id=passthrough)

```ts
const person = z.object({
  name: z.string(),
});

person.parse({
  name: "bob dylan",
  extraKey: 61,
})
// => { name: "bob dylan" }
// extraKey has been stripped
```

```ts
person.passthrough().parse({
  name: "bob dylan",
  extraKey: 61,
})
// => { name: "bob dylan", extraKey: 61 } ❌
```

## .strict

* [.strict](https://zod.dev/?id=strict)

```ts
const person = z
  .object({
    name: z.string(),
  })
  .strict();

person.parse({
  name: "bob dylan",
  extraKey: 61,
});
// => throws ZodError ❌
```

## .strip

* [.strip](https://zod.dev/?id=strip)

❌

## .catchall

* [.catchall](https://zod.dev/?id=catchall)

```ts
const person = z
  .object({
    name: z.string(),
  })
  .catchall(z.number());

person.parse({
  name: "bob dylan",
  validExtraKey: 61, // works fine
});

person.parse({
  name: "bob dylan",
  validExtraKey: false, // fails
});
// => throws ZodError ❌
```
