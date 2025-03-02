import { describe, expect, it } from 'vitest'
import { generateZodIntersection } from './generate-zod-intersection'

const generateZodIntersectionTestCases: {
  schemas: string[]
  expected: string
}[] = [
  {
    schemas: [
      'geoJsonObjectSchema',
      'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])})',
    ],
    expected:
      'z.intersection(geoJsonObjectSchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon","GeometryCollection"])}))',
  },
  {
    schemas: [
      'geometrySchema',
      'z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"])})',
    ],
    expected:
      'z.intersection(geometrySchema,z.object({type:z.enum(["Point","MultiPoint","LineString","MultiLineString","Polygon","MultiPolygon"])}))',
  },
  {
    schemas: [
      'geometryElementSchema',
      'z.object({coordinates:z.array(z.array(linearRingSchema))})',
    ],
    expected:
      'z.intersection(geometryElementSchema,z.object({coordinates:z.array(z.array(linearRingSchema))}))',
  },
]

describe('generateZodIntersection', () => {
  it.concurrent.each(generateZodIntersectionTestCases)(
    'should generate a Zod intersection schema for %s',
    ({ schemas, expected }) => {
      const result = generateZodIntersection(schemas)
      expect(result).toBe(expected)
    },
  )
})
