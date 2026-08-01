---
title: Vendor Extensions (x-\*)
prev: 
  text: 'Configuration'
  link: '/docs/guides/config'
next:
  text: 'Vite Plugin'
  link: '/docs/guides/vite-plugin'
---

# Vendor

## Vendor Extensions (x-\*)

hono-takibi reads `x-*` vendor extensions on your OpenAPI / JSON Schema to customize the generated Zod. Each extension maps 1:1 to a Zod feature.

```yaml
name:
  type: string
  minLength: 1
  maxLength: 50
  x-error-message: 'Name must be a string'
  x-minLength-message: 'Name cannot be empty'
  x-maxLength-message: 'Name must be at most 50 characters'
```

```ts
z.string({ error: 'Name must be a string' })
  .min(1, { error: 'Name cannot be empty' })
  .max(50, { error: 'Name must be at most 50 characters' })
```

All custom message extensions follow the `x-<keyword>-message` naming convention and map directly to Zod validator error messages.

#### Common (any schema type)

| Extension            | Applies to                                                     |
| -------------------- | -------------------------------------------------------------- |
| `x-error-message`    | All schemas (fallback when keyword-specific message is absent) |
| `x-required-message` | Required properties                                            |
| `x-const-message`    | `const`                                                        |
| `x-enum-message`     | `enum`                                                         |

#### Numeric (number / integer)

| Extension                    | Applies to         |
| ---------------------------- | ------------------ |
| `x-minimum-message`          | `minimum`          |
| `x-maximum-message`          | `maximum`          |
| `x-exclusiveMinimum-message` | `exclusiveMinimum` |
| `x-exclusiveMaximum-message` | `exclusiveMaximum` |
| `x-multipleOf-message`       | `multipleOf`       |

#### String

| Extension             | Applies to                                 |
| --------------------- | ------------------------------------------ |
| `x-minLength-message` | `minLength`                                |
| `x-maxLength-message` | `maxLength`                                |
| `x-pattern-message`   | `pattern`                                  |
| `x-length-message`    | Exact length (`minLength` === `maxLength`) |

#### Array

| Extension               | Applies to    |
| ----------------------- | ------------- |
| `x-minItems-message`    | `minItems`    |
| `x-maxItems-message`    | `maxItems`    |
| `x-uniqueItems-message` | `uniqueItems` |
| `x-contains-message`    | `contains`    |
| `x-minContains-message` | `minContains` |
| `x-maxContains-message` | `maxContains` |

#### Object

| Extension                        | Applies to             |
| -------------------------------- | ---------------------- |
| `x-minProperties-message`        | `minProperties`        |
| `x-maxProperties-message`        | `maxProperties`        |
| `x-additionalProperties-message` | `additionalProperties` |
| `x-propertyNames-message`        | `propertyNames`        |
| `x-patternProperties-message`    | `patternProperties`    |
| `x-dependentRequired-message`    | `dependentRequired`    |
| `x-dependentSchemas-message`     | `dependentSchemas`     |

#### Combinators

| Extension               | Applies to                                                                                                       |
| ----------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `x-allOf-message`       | `allOf`                                                                                                          |
| `x-anyOf-message`       | `anyOf`                                                                                                          |
| `x-oneOf-message`       | `oneOf`                                                                                                          |
| `x-not-message`         | `not`                                                                                                            |
| `x-implication-message` | Implication pattern (`A → B`) encoded as `anyOf:[{not:A},{required:B}]`; takes precedence over `x-anyOf-message` |

#### Conditional

| Extension        | Applies to |
| ---------------- | ---------- |
| `x-if-message`   | `if`       |
| `x-then-message` | `then`     |
| `x-else-message` | `else`     |

#### Typeless / Array Applicator

| Extension                         | Applies to                      |
| --------------------------------- | ------------------------------- |
| `x-properties-message`            | `properties` (typeless schemas) |
| `x-prefixItems-message`           | `prefixItems`                   |
| `x-items-message`                 | `items`                         |
| `x-unevaluatedProperties-message` | `unevaluatedProperties`         |
| `x-unevaluatedItems-message`      | `unevaluatedItems`              |

### Behavior Extensions

#### String Pre-validation Transforms

| Extension       | Generated                     | Value                                   |
| --------------- | ----------------------------- | --------------------------------------- |
| `x-trim`        | `z.string().trim()`           | `true`                                  |
| `x-toLowerCase` | `z.string().toLowerCase()`    | `true`                                  |
| `x-toUpperCase` | `z.string().toUpperCase()`    | `true`                                  |
| `x-normalize`   | `z.string().normalize('NFC')` | `'NFC'` / `'NFD'` / `'NFKC'` / `'NFKD'` |

```yaml
homepage:
  type: string
  format: url
  x-trim: true
```

```ts
z.string().trim().pipe(z.url())
```

#### String Validation Checks

| Extension     | Generated                | Value  |
| ------------- | ------------------------ | ------ |
| `x-lowercase` | `z.string().lowercase()` | `true` |
| `x-uppercase` | `z.string().uppercase()` | `true` |

```yaml
slug:
  type: string
  x-lowercase: true
```

```ts
z.string().lowercase()
```

#### Preprocess

**`x-preprocess`**

```yaml
username:
  type: string
  x-preprocess: 'z.preprocess((val) => typeof val === "string" ? val.trim() : val, z.string())'
```

```ts
z.preprocess((val) => (typeof val === 'string' ? val.trim() : val), z.string())
```

#### Type Coercion

**`x-coerce`**

```yaml
asNumber:
  type: number
  x-coerce: true
asDate:
  type: string
  format: date-time
  x-coerce: true
```

```ts
z.coerce.number()
z.coerce.date()
```

**`x-stringbool`**

```yaml
notify:
  type: boolean
  x-stringbool: true
```

```ts
z.stringbool()
```

```yaml
notify:
  type: boolean
  x-stringbool:
    truthy: ['yes', 'on']
    falsy: ['no', 'off']
    case: 'sensitive'
```

```ts
z.stringbool({ truthy: ['yes', 'on'], falsy: ['no', 'off'], case: 'sensitive' })
```

#### Codec

**`x-codec`**

```yaml
updatedAt:
  type: string
  format: date-time
  x-codec: 'z.codec(z.iso.datetime(), z.date(), { decode: (isoString) => new Date(isoString), encode: (date) => date.toISOString() })'
```

```ts
z.codec(z.iso.datetime(), z.date(), {
  decode: (isoString) => new Date(isoString),
  encode: (date) => date.toISOString(),
})
```

#### Custom Validation

**`x-refine`**

```yaml
password:
  type: string
  x-refine: '.refine((val) => val.length >= 8, { message: "Password must be at least 8 characters" }).refine((val) => /[A-Z]/.test(val), { message: "Password must contain an uppercase letter" })'
```

```ts
z.string()
  .refine((val) => val.length >= 8, { message: 'Password must be at least 8 characters' })
  .refine((val) => /[A-Z]/.test(val), { message: 'Password must contain an uppercase letter' })
```

**`x-superRefine`**

```yaml
normalizedEmail:
  type: string
  format: email
  x-superRefine: '.superRefine((val, ctx) => { if (val.endsWith("@blocked.example")) ctx.addIssue({ code: "custom", message: "Blocked domain" }) })'
```

```ts
z.email().superRefine((val, ctx) => {
  if (val.endsWith('@blocked.example')) {
    ctx.addIssue({ code: 'custom', message: 'Blocked domain' })
  }
})
```

#### Transform & Pipe

**`x-transform`**

```yaml
code:
  type: string
  x-transform: 'z.string().transform((val) => val.toUpperCase())'
```

```ts
z.string().transform((val) => val.toUpperCase())
```

**`x-pipe`**

```yaml
port:
  type: string
  x-pipe: 'z.string().pipe(z.number().int().positive())'
```

```ts
z.string().pipe(z.number().int().positive())
```

#### Default & Fallback Values

**`x-prefault`**

```yaml
greeting:
  type: string
  x-prefault: 'hello'
```

```ts
z.string().prefault('hello')
```

**`x-catch`**

```yaml
retries:
  type: integer
  x-catch: 0
```

```ts
z.int().catch(0)
```

#### Immutability

**`x-readonly`**

```yaml
config:
  type: object
  properties:
    name:
      type: string
  x-readonly: true
```

```ts
z.object({ name: z.string() }).readonly()
```

#### String Content Checks

**`x-startsWith` / `x-endsWith` / `x-includes`**

```yaml
url:
  type: string
  x-startsWith: 'https://'
  x-endsWith: '.com'
path:
  type: string
  x-includes: '/api/'
```

```ts
z.string().startsWith('https://').endsWith('.com')
z.string().includes('/api/')
```

#### Format-Specific Options

```yaml
htmlEmail:
  type: string
  format: email
  x-emailPattern: 'html5' # email pattern preset
uuidV7:
  type: string
  format: uuid
  x-uuidVersion: v7 # uuid version
httpsUrl:
  type: string
  format: uri
  x-urlProtocol: '^https$' # url protocol regex
  x-urlNormalize: true
preciseDatetime:
  type: string
  format: date-time
  x-isoPrecision: 3 # iso datetime precision / offset / local
  x-isoOffset: true
```

| Extension        | Maps to                         | Values                                                |
| ---------------- | ------------------------------- | ----------------------------------------------------- |
| `x-emailPattern` | `z.email({ pattern })`          | `html5` / `rfc5322` / `unicode`                       |
| `x-emailRegex`   | `z.email({ pattern: /.../ })`   | custom regex string                                   |
| `x-uuidVersion`  | `z.uuid({ version })`           | `v1` / `v2` / `v3` / `v4` / `v5` / `v6` / `v7` / `v8` |
| `x-urlProtocol`  | `z.url({ protocol: /.../ })`    | regex string                                          |
| `x-urlHostname`  | `z.url({ hostname: /.../ })`    | regex string                                          |
| `x-urlNormalize` | `z.url({ normalize })`          | `true` / `false`                                      |
| `x-isoPrecision` | `z.iso.datetime({ precision })` | fractional second digits                              |
| `x-isoOffset`    | `z.iso.datetime({ offset })`    | `true` / `false`                                      |
| `x-isoLocal`     | `z.iso.datetime({ local })`     | `true` / `false`                                      |
| `x-macDelimiter` | `z.mac({ delimiter })`          | `:` / `-` / `.`                                       |
| `x-jwtAlg`       | `z.jwt({ alg })`                | `HS256` etc.                                          |
| `x-hashAlg`      | `z.hash(alg, ...)`              | `sha256` etc.                                         |
| `x-hashEnc`      | `z.hash(alg, { enc })`          | `hex` / `base64` / `base64url`                        |

### Branded Types (x-brand)

Use the `x-brand` vendor extension to generate [Zod branded types](https://zod.dev/api?id=branded-types), creating nominal types that are structurally identical but semantically distinct:

```yaml
components:
  schemas:
    Cat:
      type: object
      properties:
        name:
          type: string
      required:
        - name
      x-brand: Cat
    Dog:
      type: object
      properties:
        name:
          type: string
      required:
        - name
      x-brand: Dog
```

```ts
// Generated output
const CatSchema = z.object({ name: z.string() }).brand<'Cat'>().openapi('Cat')

const DogSchema = z.object({ name: z.string() }).brand<'Dog'>().openapi('Dog')
```