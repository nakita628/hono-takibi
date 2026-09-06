<!--
Title: `type(scope): summary` — imperative mood, no trailing period. Write it for the
person reading the release notes, not for the diff.

  type   feat | fix | perf | refactor | docs | test | build | ci | chore
  scope  a generator (zod, routes, app, mock, test, docs, client, …) | openapi | cli | config
         | vite-plugin | website | test | docs | ci

  fix(zod): keep `.nullable()` on a `$ref` to a nullable component schema
  feat(cli): print the files a run wrote
-->

## Why

<!-- The bug, the missing capability or the request behind this change. Link the issue: `Closes #123`. -->

## What

<!-- What changed, as someone running the CLI or reading the generated code sees it. One to three sentences. -->

## Where

<!-- Scope: which generator (routes, Zod schemas, mock, test, docs, client hooks), the OpenAPI parser, the CLI, the config, the Vite plugin, the website. Name what is deliberately left out. -->

## Who

<!-- Who notices: every user, users of one generator or one client library, contributors only. Breaking for anyone? -->

## When

<!-- Release impact: `none` | `next release` | `version bumped to x.y.z`. -->

## How

<!--
The approach in a sentence, then the evidence. For a generator change, the spec and the
output it now writes — `test/__generated__` is not committed, so paste the lines that changed
or add a case under `test/cases`; for a website change, a screenshot of the page. Tick only
what you ran; paste the output of anything that failed.
-->

- [ ] `pnpm check`
- [ ] `pnpm test`
- [ ] `pnpm --filter ./test typecheck`, when generated output changed
- [ ] `pnpm --filter ./website test:e2e`, when the website changed
