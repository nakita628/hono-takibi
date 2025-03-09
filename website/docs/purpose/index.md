---
date: 2025-03-09
title: Purpose
description: Purpose
---

# Purpose

If an **[OpenAPI](https://www.openapis.org/)** definition exists, **[Zod OpenAPI Hono](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)** Hono is effectively ready for use. This project is developed with the goal of automatically generating routine code, allowing developers to focus on implementing business logic.

## Migration to Zod OpenAPI Hono

If your project is looking to migrate, whether from legacy systems or to **[Zod OpenAPI Hono](https://github.com/honojs/middleware/tree/main/packages/zod-openapi)**, and you already have an OpenAPI definition, **[Hono Takibi](https://github.com/nakita628/hono-takibi)** can help make the transition smooth and effortless.

```mermaid
flowchart TD
    subgraph "Legacy Frameworks"
        B["Ruby Framework"]
        C["PHP Framework"]
        D["Perl Framework"]
        E["Other"]
    end
    
    subgraph "Node.js Frameworks"
        F["Express"]
        G["NestJS"]
        H["Other"]
    end

    A["OpenAPI Definition"]
    I["Hono"]
    B --> A
    C --> A
    D --> A
    E --> A
    F --> A
    G --> A
    H --> A
    A --> I
```

## Development Flow Example

```mermaid
graph TD
    L[Legacy Code] --> A[OpenAPI Definition]
    G[Generative AI] --> A
    A --> B[Hono Takibi]
    B --> C[Zod Schema Generation]
    B --> D[Route Definition Generation]
    C --> E[Business Logic Implementation]
    D --> E
    E --> F[Type-safe API Implementation]
```