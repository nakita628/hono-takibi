---
date: 2024-01-18
title: Settings
description: Settings
prev: 
  text: Hono Takibi
  link: /docs
next: 
  text: Zod Support List
  link: /docs/zod/support
---

# Settings

## hono-takibi.json

Default Behavior (camelCase schemas, PascalCase types)

:::code-group
```json [hono-takibi.json]
{
  "input": "src/openapi/openapi.yaml",
  "output": "src/openapi/index.ts",
  "schema": {
    "name": "camelCase",
    "export": false
  },
  "type": {
    "name": "PascalCase",
    "export": false
  }
}
```
:::

## Configuration

You can customize the code generation behavior by creating a `hono-takibi.json` file in your project root.

### Schema Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `"camelCase"` \| `"PascalCase"` | `"camelCase"` | Naming convention for generated schema variables |
| `export` | `boolean` | `false` | When true, exports all schema definitions |

### Type Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `"camelCase"` \| `"PascalCase"` | `"PascalCase"` | Naming convention for generated type definitions |
| `export` | `boolean` | `false` | When true, exports all type definitions |

## Input and Output

You can specify input and output paths in two ways:

1. Command line arguments:

2. Configuration file (`hono-takibi.json`):

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | `string` | `""` | Input file path |
| `output` | `string` | `""` | Output file path |

> **⚠️** When using a configuration file, command line arguments are not required. The configuration file settings take precedence over command line arguments.
>
> **🔥** When you have configured `hono-takibi.json`, you can simply run:
> :::code-group
> ```sh [npm]
> npx hono-takibi
> ```
> :::
