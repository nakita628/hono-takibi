import { describe, expect, it } from 'vitest'
import { generateDescription } from './generate-description'

const generateDescriptionTestCases = [
  {
    description: 'Successful operation',
    expected: `{description:'Successful operation',},`,
  },
  {
    description: 'Invalid ID supplied',
    expected: `{description:'Invalid ID supplied',},`,
  },
  {
    description: 'Pet not found',
    expected: `{description:'Pet not found',},`,
  },
  {
    description: 'Validation exception',
    expected: `{description:'Validation exception',},`,
  },
]

describe('generateDescription', () => {
  it.concurrent.each(generateDescriptionTestCases)(
    `generateDescription($description) -> $expected`,
    async ({ description, expected }) => {
      const result = generateDescription(description)
      expect(result).toBe(expected)
    },
  )
})
