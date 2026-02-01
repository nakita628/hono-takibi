/**
 * Test code generator module
 *
 * Generates Vitest test files from OpenAPI specifications
 * using faker.js for mock data and Hono's app.request for portless testing.
 *
 * @module generator/test
 */

export type { SchemaToFakerOptions } from './faker-mapping.js'
export {
  FORMAT_TO_FAKER,
  PROPERTY_NAME_TO_FAKER,
  schemaToFaker,
  TYPE_TO_FAKER,
} from './faker-mapping.js'

export { extractTestCases, generateHandlerTestCode, generateTestFile } from './test-generator.js'
