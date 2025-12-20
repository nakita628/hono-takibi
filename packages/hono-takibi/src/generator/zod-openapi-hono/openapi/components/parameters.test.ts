import { describe, expect, it } from 'vitest'
import { parameters } from './parameters.js'

// Test run
// pnpm vitest run ./src/generator/zod-openapi-hono/openapi/components/parameters.test.ts

describe('parameters', () => {
  it('parameters exportSchema false exportType false', () => {
    const result = parameters({
      parameters: {
        "B": {
          "name": "B",
          "in": "query",
          "required": false,
          "schema": {
            "type": "string"
          }
        },
        "C": {
          "name": "C",
          "in": "path",
          "required": true,
          "schema": {
            "type": "string"
          }
        },
        "A": {
          "name": "A",
          "in": "header",
          "required": false,
          "schema": {
            "type": "string"
          }
        }
      }
    }, false, false)

  })})