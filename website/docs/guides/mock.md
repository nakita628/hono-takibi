---
title: Mock
prev:
  text: 'Client'
  link: '/docs/guides/client'
next:
  text: 'API Docs'
  link: '/docs/guides/api-docs'
---

# Mock

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

Try it without installing anything: the [Playground](/playground)'s **Mock** view runs the generated server in your browser behind a [Scalar](https://scalar.com/) API reference, so every **Send** is answered by this code. The options above the reference are the ones of this `mock` config: `useExamples`, `locale`, `seed`, `delay`, `arrayMin` and `arrayMax`.
