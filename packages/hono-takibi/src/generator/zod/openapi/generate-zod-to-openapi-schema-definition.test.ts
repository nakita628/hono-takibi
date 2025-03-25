import { describe, expect, it } from 'vitest'
import { generateZodToOpenAPISchemaDefinition } from './generate-zod-to-openapi-schema-definition'
import type { Config } from '../../../config'

const testSchemaName = 'A'
const testZodSchema = 'z.object({a:z.string().openapi({example:"a"})})'

const generateSchemaDefinitionTestCases: {
  schemaName: string
  zodSchema: string
  config: Config
  expected: string
}[] = [
  // schema: PascalCase, type: PascalCase
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: false },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: false },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'PascalCase', export: true },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'PascalCase', export: true },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof ASchema>`,
  },

  // schema: PascalCase, type: camelCase
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: false },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: false },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: false },
      type: { name: 'camelCase', export: true },
    },
    expected: `const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof ASchema>`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'PascalCase', export: true },
      type: { name: 'camelCase', export: true },
    },
    expected: `export const ASchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof ASchema>`,
  },

  // schema: camelCase, type: PascalCase
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: false },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: false },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'PascalCase', export: true },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof aSchema>`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'PascalCase', export: true },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type A = z.infer<typeof aSchema>`,
  },

  // schema: camelCase, type: camelCase
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: false },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: false },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: false },
      type: { name: 'camelCase', export: true },
    },
    expected: `const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>`,
  },
  {
    schemaName: testSchemaName,
    zodSchema: testZodSchema,
    config: {
      schema: { name: 'camelCase', export: true },
      type: { name: 'camelCase', export: true },
    },
    expected: `export const aSchema = z.object({a:z.string().openapi({example:"a"})}).openapi('A')

export type a = z.infer<typeof aSchema>`,
  },
]

describe('generateSchemaDefinition', () => {
  it.concurrent.each(generateSchemaDefinitionTestCases)(
    'generateSchemaDefinition($schemaName, $zodSchema, $config) -> $expected',
    async ({ schemaName, zodSchema, config, expected }) => {
      const result = generateZodToOpenAPISchemaDefinition(schemaName, zodSchema, config)
      expect(result).toBe(expected)
    },
  )
})
