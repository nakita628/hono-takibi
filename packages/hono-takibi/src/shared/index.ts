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
  const defineOn = config.template?.define === true
  const appOutput = config.output ?? config.routes?.output
  // `template.output` is the route/handler directory; both template modes accept it (define
  // defaults to `src/routes`, non-define falls back to `handlers` next to the app entry).
  const defineHandlerDir = defineOn ? config.template?.output : undefined
  const componentsOutput =
    config.components?.output ??
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
  const rawComponents = config.components
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
    config.output && !defineOn
      ? {
          name: 'zod-openapi',
          output: config.output,
          split: false,
          run: (output: string) =>
            ((p: string): p is `${string}.ts` => p.endsWith('.ts'))(output)
              ? takibi(openAPI, output, {
                  ...(config.readonly !== undefined ? { readonly: config.readonly } : {}),
                  exportSchemas: config.exportSchemas,
                  exportSchemasTypes: config.exportSchemasTypes,
                  exportResponses: config.exportResponses,
                  exportParameters: config.exportParameters,
                  exportParametersTypes: config.exportParametersTypes,
                  exportExamples: config.exportExamples,
                  exportRequestBodies: config.exportRequestBodies,
                  exportHeaders: config.exportHeaders,
                  exportHeadersTypes: config.exportHeadersTypes,
                  exportSecuritySchemes: config.exportSecuritySchemes,
                  exportLinks: config.exportLinks,
                  exportCallbacks: config.exportCallbacks,
                  exportPathItems: config.exportPathItems,
                  exportMediaTypes: config.exportMediaTypes,
                  exportMediaTypesTypes: config.exportMediaTypesTypes,
                })
              : Promise.resolve({ ok: false, error: `Invalid output format: ${output}` } as const),
        }
      : undefined,
    config.webhooks
      ? {
          name: 'webhooks',
          output: config.webhooks.output,
          split: config.webhooks.split === true,
          run: (output: string) =>
            webhooks(
              openAPI,
              { output, split: config.webhooks?.split === true },
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    componentsOutput
      ? {
          name: 'components',
          output: componentsOutput,
          split: false,
          run: (output: string) => components(openAPI, output, config.readonly),
        }
      : undefined,
    config.components?.schemas
      ? {
          name: 'schemas',
          output: config.components.schemas.output,
          split: config.components.schemas.split === true,
          run: (output: string) =>
            schemas(
              openAPI.components?.schemas,
              output,
              config.components?.schemas?.split === true,
              config.components?.schemas?.exportTypes === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.parameters
      ? {
          name: 'parameters',
          output: config.components.parameters.output,
          split: config.components.parameters.split === true,
          run: (output: string) =>
            parameters(
              openAPI.components?.parameters,
              output,
              config.components?.parameters?.split === true,
              config.components?.parameters?.exportTypes === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.headers
      ? {
          name: 'headers',
          output: config.components.headers.output,
          split: config.components.headers.split === true,
          run: (output: string) =>
            headers(
              openAPI.components?.headers,
              output,
              config.components?.headers?.split === true,
              config.components?.headers?.exportTypes === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.examples
      ? {
          name: 'examples',
          output: config.components.examples.output,
          split: config.components.examples.split === true,
          run: (output: string) =>
            examples(
              openAPI.components?.examples,
              output,
              config.components?.examples?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.links
      ? {
          name: 'links',
          output: config.components.links.output,
          split: config.components.links.split === true,
          run: (output: string) =>
            links(
              openAPI.components?.links,
              output,
              config.components?.links?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.callbacks
      ? {
          name: 'callbacks',
          output: config.components.callbacks.output,
          split: config.components.callbacks.split === true,
          run: (output: string) =>
            callbacks(
              openAPI.components?.callbacks,
              output,
              config.components?.callbacks?.split === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.pathItems
      ? {
          name: 'pathItems',
          output: config.components.pathItems.output,
          split: config.components.pathItems.split === true,
          run: (output: string) =>
            pathItems(
              openAPI.components ?? {},
              { output, split: config.components?.pathItems?.split === true },
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.mediaTypes
      ? {
          name: 'mediaTypes',
          output: config.components.mediaTypes.output,
          split: config.components.mediaTypes.split === true,
          run: (output: string) =>
            mediaTypes(
              openAPI.components?.mediaTypes,
              output,
              config.components?.mediaTypes?.split === true,
              config.readonly,
              componentsResolve,
            ),
        }
      : undefined,
    config.components?.securitySchemes
      ? {
          name: 'securitySchemes',
          output: config.components.securitySchemes.output,
          split: config.components.securitySchemes.split === true,
          run: (output: string) =>
            securitySchemes(
              openAPI.components?.securitySchemes,
              output,
              config.components?.securitySchemes?.split === true,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.requestBodies
      ? {
          name: 'requestBodies',
          output: config.components.requestBodies.output,
          split: config.components.requestBodies.split === true,
          run: (output: string) =>
            requestBodies(
              openAPI.components?.requestBodies,
              output,
              config.components?.requestBodies?.split === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.components?.responses
      ? {
          name: 'responses',
          output: config.components.responses.output,
          split: config.components.responses.split === true,
          run: (output: string) =>
            responses(
              openAPI.components?.responses,
              output,
              config.components?.responses?.split === true,
              componentsResolve,
              config.readonly,
            ),
        }
      : undefined,
    config.routes
      ? {
          name: 'routes',
          output: config.routes.output,
          split: config.routes.split === true,
          run: (output: string) =>
            route(
              openAPI,
              { output, split: config.routes?.split === true },
              componentsResolve,
              config.readonly,
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
              config.test?.basePath ?? config.basePath,
              config.test?.testFramework,
            ),
        }
      : undefined,
    config.mock
      ? {
          name: 'mock',
          output: config.mock.output,
          split: false,
          run: (output: string) => mock(openAPI, output, config.basePath, config.readonly),
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
    config.template && defineOn && appOutput && componentsOutput && defineHandlerDir
      ? {
          name: 'template',
          output: appOutput,
          split: false,
          run: (output: string) =>
            defineTemplate(
              openAPI,
              output,
              componentsOutput,
              config.template?.test ?? false,
              config.basePath,
              config.template?.pathAlias,
              config.routes?.import,
              defineHandlerDir,
              config.template?.testFramework,
              config.readonly,
            ),
        }
      : config.template && !defineOn && appOutput
        ? {
            name: 'template',
            output: appOutput,
            split: false,
            run: (output: string) =>
              template(
                openAPI,
                output,
                config.template?.test ?? false,
                config.basePath,
                config.template?.pathAlias,
                config.routes?.import,
                config.template?.define === false ? config.template.routeHandler : false,
                config.template?.testFramework,
                config.template?.output,
              ),
          }
        : undefined,
  ].filter((job) => job !== undefined)
}
