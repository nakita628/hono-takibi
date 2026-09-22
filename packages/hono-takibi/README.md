![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/icon/hono-takibi.png)

# Hono Takibi

![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/img/hono-takibi.png)

**[Hono Takibi](https://hono-takibi.dev/)** generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

From one document it can generate:

- [Zod](https://zod.dev/) schemas and [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) route definitions
- App entry, handler stubs and test files
- RPC client and hooks for SWR, TanStack Query, Preact / Solid / Vue / Svelte / Angular Query
- Mock server, TypeScript types and API reference docs

📖 **Documentation: [hono-takibi.dev](https://hono-takibi.dev/)** · 🔥 **[Playground](https://hono-takibi.dev/playground)**

## Quick Start

```bash
npm install -D hono-takibi
```

Pass an OpenAPI (`.yaml`, `.json`) or TypeSpec (`.tsp`) document and an output file:

```bash
npx hono-takibi openapi.yaml -o src/routes.ts
```

For anything beyond a single routes file, create `hono-takibi.config.ts`:

```ts
import { defineConfig } from 'hono-takibi'

export default defineConfig({
  input: 'openapi.yaml',
  output: './src/routes.ts',
})
```

```bash
npx hono-takibi
```

## Documentation

- [Getting Started](https://hono-takibi.dev/docs)
- [Configuration](https://hono-takibi.dev/docs/guides/config)
- [Template](https://hono-takibi.dev/docs/guides/template)
- [Client](https://hono-takibi.dev/docs/guides/client)
- [Test & Mock](https://hono-takibi.dev/docs/guides/test-mock)
- [API Docs](https://hono-takibi.dev/docs/guides/api-docs)
- [Vendor Extensions](https://hono-takibi.dev/docs/guides/vendor)
- [Vite Plugin](https://hono-takibi.dev/docs/guides/vite-plugin)

## Projects Using Hono Takibi

- **[resend-local](https://github.com/y-hiraoka/resend-local)** — A local emulator for the Resend email API.

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita628/hono-takibi?tab=MIT-1-ov-file) for more information.
