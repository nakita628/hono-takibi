---
date: 2025-03-10
title: Settings
description: Settings
prev: 
  text: Hono Takibi
  link: /docs
next: 
  text: Purpose
  link: /docs/purpose
---

# Settings

## hono-takibi.json

Default Behavior (camelCase schemas, PascalCase types)

:::code-group
```json [hono-takibi.json]
{
  "input": "src/openapi.yaml",
  "output": "src/index.ts",
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
| `name` | `"PascalCase"` \| `"camelCase"` | `"PascalCase"` | Naming convention for generated schema variables |
| `export` | `boolean` | `false` | When true, exports all schema definitions |

### Type Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `name` | `"PascalCase"` \| `"camelCase"` | `"PascalCase"` | Naming convention for generated type definitions |
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
> ```bash
> npx hono-takibi
> ```