# Primitives

* [Zod Primitives](https://zod.dev/?id=primitives)

## Zod Primitives

Supported Zod primitives.

```ts
// primitive values
z.string() ✅
z.number() ✅
z.bigint() ✅
z.boolean() ✅
z.date() ✅
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

