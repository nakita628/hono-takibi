import path from 'node:path'

import type { parseConfig } from '../config/index.js'
import {
  callbacks,
  components,
  defineTemplate,
  docs,
  examples,
  headers,
  hooks,
  links,
  mediaTypes,
  mock,
  parameters,
  pathItems,
  requestBodies,
  responses,
  route,
  rpc,
  schemas,
  securitySchemes,
  takibi,
  template,
  test,
  type,
  webhooks,
} from '../core/index.js'
import type { OpenAPI } from '../openapi/index.js'

export function makeJob(
  openAPI: OpenAPI,
  config: Extract<ReturnType<typeof parseConfig>, { ok: true }>['value'],
) {
  const defineOn = config['zod-openapi']?.template?.define === true
  const appOutput = config['zod-openapi']?.output ?? config['zod-openapi']?.routes?.output
  const componentsOutput =
    config['zod-openapi']?.components?.output ??
    (defineOn && appOutput ? `${path.dirname(appOutput)}/components/index.ts` : undefined)
  // OpenAPI 3.x Components Object kinds, in declaration / config-field order.
  const componentKinds = [
    'schemas',
    'responses',
    'parameters',
    'examples',
    'requestBodies',
    'headers',
    'securitySchemes',
    'links',
    'callbacks',
    'pathItems',
    'mediaTypes',
  ] as const
  // Import-path resolution map keyed by component kind. When `components.output` is set,
  // every kind resolves to that single file; otherwise each kind keeps its per-type config.
  const rawComponents = config['zod-openapi']?.components
  const componentsResolve: { readonly [k: string]: { readonly output: string } } | undefined =
    componentsOutput
      ? Object.fromEntries(componentKinds.map((kind) => [kind, { output: componentsOutput }]))
      : rawComponents
        ? Object.fromEntries(
            componentKinds.flatMap((kind) => {
              const value = rawComponents[kind]
              return value ? ([[kind, value]] as const) : []
            }),
          )
        : undefined
  return [
    config['zod-openapi']?.output && !defineOn
      ? {
          name: 'zod-openapi',
          output: config['zod-openapi'].output,
          split: false,
          run: (output: string) =>
            ((p: string): p is `${string}.ts` => p.endsWith('.ts'))(output)
              ? takibi(openAPI, output, {
                  ...(config['zod-openapi']?.readonly !== undefined
                    ? { readonly: config['zod-openapi'].readonly }
                    : {}),
                  exportSchemas: config['zod-openapi']?.exportSchemas ?? false,
                  exportSchemasTypes: config['zod-openapi']?.exportSchemasTypes ?? false,
                  exportResponses: config['zod-openapi']?.exportResponses ?? false,
                  exportParameters: config['zod-openapi']?.exportParameters ?? false,
                  exportParametersTypes: config['zod-openapi']?.exportParametersTypes ?? false,
                  exportExamples: config['zod-openapi']?.exportExamples ?? false,
                  exportRequestBodies: config['zod-openapi']?.exportRequestBodies ?? false,
                  exportHeaders: config['zod-openapi']?.exportHeaders ?? false,
                  exportHeadersTypes: config['zod-openapi']?.exportHeadersTypes ?? false,
                  exportSecuritySchemes: config['zod-openapi']?.exportSecuritySchemes ?? false,
                  exportLinks: config['zod-openapi']?.exportLinks ?? false,
                  exportCallbacks: config['zod-openapi']?.exportCallbacks ?? false,
                  exportPathItems: config['zod-openapi']?.exportPathItems ?? false,
                  exportMediaTypes: config['zod-openapi']?.exportMediaTypes ?? false,
                  exportMediaTypesTypes: config['zod-openapi']?.exportMediaTypesTypes ?? false,
                })
              : Promise.resolve({ ok: false, error: `Invalid output format: ${output}` } as const),
        }
      : undefined,
    config['zod-openapi']?.webhooks
      ? {
          name: 'webhooks',
          output: config['zod-openapi'].webhooks.output,
          split: config['zod-openapi'].webhooks.split === true,
          run: (output: string) =>
            webhooks(
              openAPI,
              { output, split: config['zod-openapi']?.webhooks?.split === true },
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    componentsOutput
      ? {
          name: 'components',
          output: componentsOutput,
          split: false,
          run: (output: string) => components(openAPI, output, config['zod-openapi']?.readonly),
        }
      : undefined,
    config['zod-openapi']?.components?.schemas
      ? {
          name: 'schemas',
          output: config['zod-openapi'].components.schemas.output,
          split: config['zod-openapi'].components.schemas.split === true,
          run: (output: string) =>
            schemas(
              openAPI.components?.schemas,
              output,
              config['zod-openapi']?.components?.schemas?.split === true,
              config['zod-openapi']?.components?.schemas?.exportTypes === true,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.parameters
      ? {
          name: 'parameters',
          output: config['zod-openapi'].components.parameters.output,
          split: config['zod-openapi'].components.parameters.split === true,
          run: (output: string) =>
            parameters(
              openAPI.components?.parameters,
              output,
              config['zod-openapi']?.components?.parameters?.split === true,
              config['zod-openapi']?.components?.parameters?.exportTypes === true,
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.headers
      ? {
          name: 'headers',
          output: config['zod-openapi'].components.headers.output,
          split: config['zod-openapi'].components.headers.split === true,
          run: (output: string) =>
            headers(
              openAPI.components?.headers,
              output,
              config['zod-openapi']?.components?.headers?.split === true,
              config['zod-openapi']?.components?.headers?.exportTypes === true,
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.examples
      ? {
          name: 'examples',
          output: config['zod-openapi'].components.examples.output,
          split: config['zod-openapi'].components.examples.split === true,
          run: (output: string) =>
            examples(
              openAPI.components?.examples,
              output,
              config['zod-openapi']?.components?.examples?.split === true,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.links
      ? {
          name: 'links',
          output: config['zod-openapi'].components.links.output,
          split: config['zod-openapi'].components.links.split === true,
          run: (output: string) =>
            links(
              openAPI.components?.links,
              output,
              config['zod-openapi']?.components?.links?.split === true,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.callbacks
      ? {
          name: 'callbacks',
          output: config['zod-openapi'].components.callbacks.output,
          split: config['zod-openapi'].components.callbacks.split === true,
          run: (output: string) =>
            callbacks(
              openAPI.components?.callbacks,
              output,
              config['zod-openapi']?.components?.callbacks?.split === true,
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.pathItems
      ? {
          name: 'pathItems',
          output: config['zod-openapi'].components.pathItems.output,
          split: config['zod-openapi'].components.pathItems.split === true,
          run: (output: string) =>
            pathItems(
              openAPI.components ?? {},
              { output, split: config['zod-openapi']?.components?.pathItems?.split === true },
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.mediaTypes
      ? {
          name: 'mediaTypes',
          output: config['zod-openapi'].components.mediaTypes.output,
          split: config['zod-openapi'].components.mediaTypes.split === true,
          run: (output: string) =>
            mediaTypes(
              openAPI.components?.mediaTypes,
              output,
              config['zod-openapi']?.components?.mediaTypes?.split === true,
              config['zod-openapi']?.readonly,
              componentsResolve,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.securitySchemes
      ? {
          name: 'securitySchemes',
          output: config['zod-openapi'].components.securitySchemes.output,
          split: config['zod-openapi'].components.securitySchemes.split === true,
          run: (output: string) =>
            securitySchemes(
              openAPI.components?.securitySchemes,
              output,
              config['zod-openapi']?.components?.securitySchemes?.split === true,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.requestBodies
      ? {
          name: 'requestBodies',
          output: config['zod-openapi'].components.requestBodies.output,
          split: config['zod-openapi'].components.requestBodies.split === true,
          run: (output: string) =>
            requestBodies(
              openAPI.components?.requestBodies,
              output,
              config['zod-openapi']?.components?.requestBodies?.split === true,
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.components?.responses
      ? {
          name: 'responses',
          output: config['zod-openapi'].components.responses.output,
          split: config['zod-openapi'].components.responses.split === true,
          run: (output: string) =>
            responses(
              openAPI.components?.responses,
              output,
              config['zod-openapi']?.components?.responses?.split === true,
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config['zod-openapi']?.routes
      ? {
          name: 'routes',
          output: config['zod-openapi'].routes.output,
          split: config['zod-openapi'].routes.split === true,
          run: (output: string) =>
            route(
              openAPI,
              { output, split: config['zod-openapi']?.routes?.split === true },
              componentsResolve,
              config['zod-openapi']?.readonly,
            ),
        }
      : undefined,
    config.type
      ? {
          name: 'type',
          output: config.type.output,
          split: false,
          run: (output: string) =>
            ((p: string): p is `${string}.ts` => p.endsWith('.ts'))(output)
              ? type(openAPI, output, config.type?.readonly)
              : Promise.resolve({ ok: false, error: `Invalid output format: ${output}` } as const),
        }
      : undefined,
    config.rpc
      ? {
          name: 'rpc',
          output: config.rpc.output,
          split: config.rpc.split === true,
          run: (output: string) =>
            rpc(
              openAPI,
              output,
              config.rpc?.import ?? '',
              config.rpc?.split === true,
              config.rpc?.client ?? 'client',
              config.rpc?.parseResponse ?? false,
              config.basePath,
              config.rpc?.docs ?? false,
            ),
        }
      : undefined,
    ...(
      [
        'swr',
        'tanstack-query',
        'preact-query',
        'solid-query',
        'vue-query',
        'svelte-query',
        'angular-query',
      ] as const
    ).map((library) => {
      const cfg = config[library]
      return cfg
        ? {
            name: library,
            output: cfg.output,
            split: cfg.split === true,
            run: (output: string) =>
              hooks(openAPI, output, cfg.import, library, {
                split: cfg.split === true,
                clientName: cfg.client ?? 'client',
              }),
          }
        : undefined
    }),
    config.test
      ? {
          name: 'test',
          output: config.test.output,
          split: false,
          run: (output: string) =>
            test(
              openAPI,
              output,
              config.test?.import ?? '',
              config.basePath,
              config.test?.testFramework,
            ),
        }
      : undefined,
    config.mock
      ? {
          name: 'mock',
          output: config.mock.output,
          split: false,
          run: (output: string) =>
            mock(openAPI, output, config.basePath, config['zod-openapi']?.readonly),
        }
      : undefined,
    config.docs
      ? {
          name: 'docs',
          output: config.docs.output,
          split: false,
          run: (output: string) =>
            docs(
              openAPI,
              output,
              config.docs?.entry,
              config.basePath,
              config.docs?.curl,
              config.docs?.baseUrl,
            ),
        }
      : undefined,
    config['zod-openapi']?.template && defineOn && appOutput && componentsOutput
      ? {
          name: 'template',
          output: appOutput,
          split: false,
          run: (output: string) =>
            defineTemplate(
              openAPI,
              output,
              componentsOutput,
              config['zod-openapi']?.template?.test ?? false,
              config.basePath,
              config['zod-openapi']?.template?.pathAlias,
              config['zod-openapi']?.routes?.import,
              config['zod-openapi']?.template?.testFramework,
              config['zod-openapi']?.readonly,
              config['zod-openapi']?.template?.output,
            ),
        }
      : config['zod-openapi']?.template && !defineOn && appOutput
        ? {
            name: 'template',
            output: appOutput,
            split: false,
            run: (output: string) =>
              template(
                openAPI,
                output,
                config['zod-openapi']?.template?.test ?? false,
                config.basePath,
                config['zod-openapi']?.template?.pathAlias,
                config['zod-openapi']?.routes?.import,
                config['zod-openapi']?.template?.routeHandler ?? false,
                config['zod-openapi']?.template?.testFramework,
              ),
          }
        : undefined,
  ].filter((job) => job !== undefined)
}
