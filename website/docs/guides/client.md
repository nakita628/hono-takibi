---
title: Client
prev:
  text: 'Template'
  link: '/docs/guides/template'
next:
  text: 'Test & Mock'
  link: '/docs/guides/test-mock'
---

# Client

Generates typed wrappers around the [Hono RPC client](https://hono.dev/docs/guides/rpc), and hooks for your query library.

`import` is the module that exports your Hono client, and `client` is the name of that export.

## RPC

```ts
export default defineConfig({
  input: 'openapi.yaml',
  rpc: {
    output: './src/rpc.ts',
    import: '../lib',
    client: 'client',
  },
})
```

## Query hooks

Supported: `swr`, `tanstack-query`, `preact-query`, `solid-query`, `vue-query`, `svelte-query`, `angular-query`.

```ts
export default defineConfig({
  input: 'openapi.yaml',
  'tanstack-query': {
    output: './src/tanstack-query.ts',
    import: '../lib',
    client: 'client',
  },
})
```

```ts
const { data } = useUsersId({ param: { id: '1' } })
const { mutate } = usePostUsers()
```

Add `x-pagination: true` to a GET operation to get an infinite query hook.
