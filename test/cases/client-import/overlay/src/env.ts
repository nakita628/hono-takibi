import * as z from 'zod'

export const EnvSchema = z
  .object({
    /** The origin the API is served from. */
    CLIENT_IMPORT_API_URL: z.url('CLIENT_IMPORT_API_URL must be a URL').meta({
      description: 'The origin the client sends its requests to.',
      example: 'https://api.example.com',
    }),
  })
  .meta({
    title: 'Client environment',
    description:
      'The environment variables the client needs. Parsed once at module load, so a missing or malformed URL is a boot failure rather than a request-time one.',
  })

const result = EnvSchema.safeParse(process.env)

if (!result.success) {
  throw new Error(`Invalid env : ${result.error.message}`)
}

export const env = result.data
