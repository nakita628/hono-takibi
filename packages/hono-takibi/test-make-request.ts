import { makeRequest, makeRequestParams, makeRequestBody } from './src/helper/openapi.js';
import { params } from './src/generator/zod-openapi-hono/openapi/routes/params/index.js';
import { requestParamsArray } from './src/utils/index.js';

// Test requestParamsArray
const paramsObj = {
  query: { id: 'z.string()' },
  path: { name: 'z.number()' }
};
console.log('requestParamsArray:', requestParamsArray(paramsObj));

// Test with parameters only
const parameters = [{ name: 'id', in: 'path' as const, schema: { type: 'string' as const } }];
console.log('params:', params(parameters));
console.log('makeRequestParams:', makeRequestParams(parameters));
console.log('makeRequest (params only):', makeRequest(parameters, undefined));

// Test with request body only
const body = { content: { 'application/json': { schema: { type: 'object' as const } } } };
console.log('makeRequestBody:', makeRequestBody(body));
console.log('makeRequest (body only):', makeRequest(undefined, body));

// Test with both
console.log('makeRequest (both):', makeRequest(parameters, body));
