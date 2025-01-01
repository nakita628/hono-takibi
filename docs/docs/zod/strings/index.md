---
prev: false
next: false
---

# Strings

* [Zod Strings](https://zod.dev/?id=strings)

## Strings

Supported Zod string validation

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
