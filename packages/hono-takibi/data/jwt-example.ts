import type { OpenAPISpec } from '../src/types'

export const jwtExample: OpenAPISpec = {
  openapi: '3.0.3',
  info: {
    title: 'JWT Authentication API',
    version: '1.0.0',
  },
  servers: [
    {
      url: 'http://localhost:8080/api',
    },
  ],
  paths: {
    '/auth/login': {
      post: {
        summary: 'User Login to Retrieve JWT',
        description:
          'Authenticate the user by providing a username and password. On success, a JWT is returned.\n',
        requestBody: {
          description: 'User credentials for login',
          required: true,
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  username: {
                    type: 'string',
                    example: 'user@example.com',
                  },
                  password: {
                    type: 'string',
                    example: 'password123',
                  },
                },
                required: ['username', 'password'],
              },
            },
          },
        },
        responses: {
          '200': {
            description: 'Successful login, JWT token issued',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    token: {
                      type: 'string',
                      description: 'JWT token',
                      example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Login failed (invalid credentials)',
          },
        },
      },
    },
    '/protected': {
      get: {
        summary: 'Protected Endpoint',
        description: 'Access a resource that requires a valid JWT.',
        security: [
          {
            jwt: [],
          },
        ],
        responses: {
          '200': {
            description: 'Access granted to the protected resource',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                      example: 'Access to protected data granted.',
                    },
                  },
                },
              },
            },
          },
          '401': {
            description: 'Access denied (invalid or missing JWT)',
          },
        },
      },
    },
  },
  components: {
    securitySchemes: {
      jwt: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
}
