---
title: API Docs
prev:
  text: 'Test & Mock'
  link: '/docs/guides/test-mock'
next:
  text: 'Vendor Extensions'
  link: '/docs/guides/vendor'
---

# API Docs

Generates a Markdown reference with one request example per operation.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  docs: {
    output: './docs/api.md',
    entry: 'src/index.ts', // app entry the examples import
  },
})
```

Set `curl: true` with a `baseUrl` to get `curl` commands instead:

```ts
export default defineConfig({
  input: 'openapi.yaml',
  docs: {
    output: './docs/api.md',
    curl: true,
    baseUrl: 'http://localhost:3000',
  },
})
```
