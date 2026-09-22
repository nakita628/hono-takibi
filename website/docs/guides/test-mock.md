---
title: Test & Mock
prev:
  text: 'Client'
  link: '/docs/guides/client'
next:
  text: 'API Docs'
  link: '/docs/guides/api-docs'
---

# Test & Mock

## Tests

Generates one request test per operation against your app.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  test: {
    output: './src/test.ts',
    import: '.', // module that exports the app
    testFramework: 'vitest', // "vitest" (default) | "vite-plus" | "bun"
  },
})
```

## Mock server

Generates handlers that answer with [faker.js](https://fakerjs.dev/) data shaped by each response schema.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  mock: {
    output: './src/mock.ts',
  },
})
```

Pick another declared response with the `Prefer` header:

```sh
curl -H 'Prefer: code=404' http://localhost:3000/orders/1
```
