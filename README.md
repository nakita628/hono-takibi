![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/icon/hono-takibi.png)

# Hono Takibi

![img](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/img/hono-takibi.png)

```bash
npm install -D hono-takibi
```

## OpenAPI to Hono Code Generator

**[Hono Takibi](https://www.npmjs.com/package/hono-takibi)** generates type-safe [Hono](https://hono.dev/) code from [OpenAPI](https://www.openapis.org/) / [TypeSpec](https://typespec.io/) specifications.

- OpenAPI schemas to [Zod](https://zod.dev/) schemas
- [@hono/zod-openapi](https://hono.dev/examples/zod-openapi) route definitions
- App entry point + handler stubs + test files
- Client library hooks (TanStack Query, SWR, Svelte Query, Vue Query)
- RPC client, mock server, TypeScript types
- API reference docs with [hono-cli](https://github.com/honojs/cli) commands

## Quick Start

### CLI

```bash
npx hono-takibi path/to/input.{yaml,json,tsp} -o path/to/output.ts
```

### Configuration File

Create `hono-takibi.config.ts`:

```ts
import { defineConfig } from "hono-takibi/config";

export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
  },
});
```

```bash
npx hono-takibi
```

### Example

input:

```yaml
openapi: 3.1.0
info:
  title: Hono Takibi API
  version: '1.0.0'
paths:
  /:
    get:
      summary: Welcome
      description: Returns a welcome message from Hono Takibi.
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  message:
                    type: string
                    example: Hono Takibi🔥
                required:
                  - message
```

output:

```ts
import { createRoute, z } from "@hono/zod-openapi";

export const getRoute = createRoute({
  method: "get",
  path: "/",
  summary: "Welcome",
  description: "Returns a welcome message from Hono Takibi.",
  responses: {
    200: {
      description: "OK",
      content: {
        "application/json": {
          schema: z
            .object({
              message: z.string().openapi({ example: "Hono Takibi🔥" }),
            })
            .openapi({ required: ["message"] }),
        },
      },
    },
  },
});
```

## Vite Plugin

Auto-regenerate on file changes:

```ts
// vite.config.ts
import { honoTakibiVite } from "hono-takibi/vite-plugin";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [honoTakibiVite()],
});
```

![](https://raw.githubusercontent.com/nakita628/hono-takibi/refs/heads/main/assets/vite/hono-takibi-vite.gif)

## Template & Test Generation

Generate a complete app structure with handler stubs and test files:

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
    template: {
      test: true,
      pathAlias: "@/",
    },
  },
});
```

This generates:

- `src/index.ts` - App entry point with route registrations
- `src/handlers/*.ts` - Handler stubs for each resource
- `src/handlers/*.test.ts` - Vitest test files with `@faker-js/faker` mock data

Re-running after updating your OpenAPI spec is safe — your hand-written handler logic and test customizations are preserved. Only new routes are added as stubs.

> **Note:** If you remove a path from your OpenAPI spec and re-run, the corresponding handler and test files will be deleted. Make sure to back up or migrate any custom logic before removing API definitions.

### Route Handler Modes

By default (`routeHandler: false` or omitted), each handler file imports the shared app and registers routes inline via `.openapi()`:

```ts
// src/index.ts
import { OpenAPIHono } from "@hono/zod-openapi";

const app = new OpenAPIHono();

export default app;
```

```ts
// src/handlers/health.ts
import { getHealthRoute } from "@/routes";
import app from "@";

export const healthHandler = app.openapi(getHealthRoute, (c) => {});
```

The app mounts handlers via `.route()`:

```ts
// src/index.ts (after implementing route registration)
import { OpenAPIHono } from "@hono/zod-openapi";
import { healthHandler } from "./handlers/health";

const app = new OpenAPIHono();

export const api = app.route("/", healthHandler);

export default app;
```

With `routeHandler: true`, each handler exports a `RouteHandler` typed function and the app registers routes in `index.ts`:

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
    template: {
      pathAlias: "@/",
      routeHandler: true,
    },
  },
});
```

```ts
// src/index.ts
import { OpenAPIHono } from "@hono/zod-openapi";
import { getHealthRoute } from "@/routes";
import { getHealthRouteHandler } from "@/handlers";

const app = new OpenAPIHono();

export const api = app.openapi(getHealthRoute, getHealthRouteHandler);

export default app;
```

```ts
// src/handlers/health.ts
import type { RouteHandler } from "@hono/zod-openapi";
import type { getHealthRoute } from "@/routes";

export const getHealthRouteHandler: RouteHandler<typeof getHealthRoute> =
  async (c) => {};
```

## Client Library Integrations

Supported: TanStack Query, SWR, Svelte Query, Vue Query, RPC Client.

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
    exportSchemas: true,
  },
  "tanstack-query": {
    output: "./src/tanstack-query",
    import: "../client",
    split: true,
    client: "client",
  },
});
```

## Test & Mock Generation

### Test Generation

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
  },
  test: {
    output: "./src/test.ts",
    import: "../index",
  },
});
```

### Mock Server Generation

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
    readonly: true,
  },
  mock: {
    output: "./src/mock.ts",
  },
});
```

### API Reference Docs

Generate API reference Markdown with [hono-cli](https://github.com/honojs/cli) `hono request` commands that can be run directly without starting a server:

```ts
export default defineConfig({
  input: "openapi.yaml",
  "zod-openapi": {
    output: "./src/routes.ts",
    readonly: true,
  },
  docs: {
    output: "./docs/api.md",
    entry: "src/index.ts",
  },
});
```


## Full Config Reference

> `split: true` - `output` is a **directory** (many files + `index.ts`).
> `split` omitted or `false` - `output` is a **single `.ts` file**.
> `output` and `routes` are **mutually exclusive** in `zod-openapi`.

```ts
// hono-takibi.config.ts
import { defineConfig } from "hono-takibi/config";

export default defineConfig({
  // OpenAPI spec file (.yaml, .json, or .tsp)
  input: "openapi.yaml",

  // oxfmt format options for generated code
  format: {
    printWidth: 100,
    tabWidth: 2,
    useTabs: false,
    endOfLine: "lf",
    insertFinalNewline: true,
    semi: true,
    singleQuote: false,
    jsxSingleQuote: false,
    quoteProps: "as-needed",
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    objectWrap: "preserve",
    arrowParens: "always",
    singleAttributePerLine: false,
    proseWrap: "preserve",
    htmlWhitespaceSensitivity: "css",
    vueIndentScriptAndStyle: false,
    embeddedLanguageFormatting: "auto",
  },

  // Main code generation (Zod + OpenAPI + Hono)
  "zod-openapi": {
    // Output: use 'output' for single file, or 'routes' for split mode (mutually exclusive)
    output: "./src/routes.ts",
    readonly: true, // Add 'as const' to generated schemas
    basePath: "/api", // Base path prefix for all routes

    // Template generation (app entry point + handler stubs + tests)
    template: {
      test: true, // Generate test files
      routeHandler: false, // false: inline .openapi() (default), true: RouteHandler exports
      pathAlias: "@/", // TypeScript path alias for imports
    },

    // Export options (OpenAPI Components Object)
    exportSchemas: true,
    exportSchemasTypes: true,
    exportResponses: true,
    exportParameters: true,
    exportParametersTypes: true,
    exportExamples: true,
    exportRequestBodies: true,
    exportHeaders: true,
    exportHeadersTypes: true,
    exportSecuritySchemes: true,
    exportLinks: true,
    exportCallbacks: true,
    exportPathItems: true,
    exportMediaTypes: true,
    exportMediaTypesTypes: true,

    // Split routes into separate files
    routes: {
      output: "./src/routes",
      split: true,
      import: "@packages/routes", // Custom import path (monorepo support)
    },

    // Split components into separate files
    components: {
      schemas: {
        output: "./src/schemas",
        exportTypes: true,
        split: true,
        import: "../schemas",
      },
      responses: {
        output: "./src/responses",
        split: true,
        import: "../responses",
      },
      parameters: {
        output: "./src/parameters",
        exportTypes: true,
        split: true,
        import: "../parameters",
      },
      examples: {
        output: "./src/examples",
        split: true,
        import: "../examples",
      },
      requestBodies: {
        output: "./src/requestBodies",
        split: true,
        import: "../requestBodies",
      },
      headers: {
        output: "./src/headers",
        exportTypes: true,
        split: true,
        import: "../headers",
      },
      securitySchemes: {
        output: "./src/securitySchemes",
        split: true,
        import: "../securitySchemes",
      },
      links: {
        output: "./src/links",
        split: true,
        import: "../links",
      },
      callbacks: {
        output: "./src/callbacks",
        split: true,
        import: "../callbacks",
      },
      pathItems: {
        output: "./src/pathItems",
        split: true,
        import: "../pathItems",
      },
      mediaTypes: {
        output: "./src/mediaTypes",
        exportTypes: true,
        split: true,
        import: "../mediaTypes",
      },
      webhooks: {
        output: "./src/webhooks",
        split: true,
        import: "../webhooks",
      },
    },
  },

  // TypeScript type generation
  type: {
    output: "./src/types.ts",
    readonly: true,
  },

  // RPC client generation
  rpc: {
    output: "./src/rpc",
    import: "../client", // Import path for the Hono RPC client
    split: true,
    client: "client", // Export name of the client instance
    parseResponse: true, // Use parseResponse for type-safe responses
  },

  // Client library integrations (TanStack Query, SWR, Svelte Query, Vue Query)
  "tanstack-query": {
    output: "./src/tanstack-query",
    import: "../client",
    split: true,
    client: "client",
  },
  "svelte-query": {
    output: "./src/svelte-query",
    import: "../client",
    split: true,
    client: "client",
  },
  swr: {
    output: "./src/swr",
    import: "../client",
    split: true,
    client: "client",
  },
  "vue-query": {
    output: "./src/vue-query",
    import: "../client",
    split: true,
    client: "client",
  },

  // Test generation
  test: {
    output: "./src/test.ts",
    import: "../index", // Import path for the app instance
  },

  // Mock server generation
  mock: {
    output: "./src/mock.ts",
  },

  // API reference docs generation
  docs: {
    output: "./docs/api.md",
    entry: "src/index.ts", // App entry point for hono request commands
  },
});
```

## Limitations

**This package is in active development and may introduce breaking changes without prior notice.**

- Not all OpenAPI features are supported
- Complex schemas might not convert correctly
- Some OpenAPI validations may not be perfectly converted to Zod

We strongly recommend:

- Pinning to exact versions in production
- Testing thoroughly when updating versions
- Reviewing generated code after updates

## Contributing

We welcome feedback and contributions to improve the tool!

If you find any issues with the generated code or have suggestions for improvements, please:

- Open an issue at [GitHub Issues](https://github.com/nakita628/hono-takibi/issues)
- Submit a pull request with your improvements

## License

Distributed under the MIT License. See [LICENSE](https://github.com/nakita628/hono-takibi?tab=MIT-1-ov-file) for more information.