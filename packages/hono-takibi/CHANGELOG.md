# Changelog

## [0.33.0](https://github.com/nakita628/hono-takibi/compare/v0.32.7...v0.33.0) (2026-11-22)


### Features

* **template:** name handler files in kebab case, by the first path segment ([#512](https://github.com/nakita628/hono-takibi/issues/512)) ([db5ec8f](https://github.com/nakita628/hono-takibi/commit/db5ec8f3070624f17d18f5e82ee311e09c5ea08a))

## [0.32.7](https://github.com/nakita628/hono-takibi/compare/v0.32.6...v0.32.7) (2026-11-22)


### Bug Fixes

* **zod:** apply a declared type beside allOf / anyOf / oneOf ([#495](https://github.com/nakita628/hono-takibi/issues/495)) ([29a1684](https://github.com/nakita628/hono-takibi/commit/29a1684a240bf0b0e8e04439b01f2683bbd6ccea))
* **zod:** apply sibling combinators and strict allOf members, and keep schemas in the document ([#496](https://github.com/nakita628/hono-takibi/issues/496)) ([a7330a8](https://github.com/nakita628/hono-takibi/commit/a7330a88bca0db3d43bcddca813284f499af17ba))

## [0.32.6](https://github.com/nakita628/hono-takibi/compare/v0.32.5...v0.32.6) (2026-11-22)


### Bug Fixes

* **deps:** update dependency oxfmt to ^0.78.0 ([2e0a777](https://github.com/nakita628/hono-takibi/commit/2e0a77721feedfdf6295905d2288a140dd0a36bc))
* **deps:** update dependency oxfmt to ^0.78.0 ([cbd224f](https://github.com/nakita628/hono-takibi/commit/cbd224f755d4874e85fe5595b947b4600cf23059))
* **zod:** address review round 2 — type-aware lint and knip hints ([#471](https://github.com/nakita628/hono-takibi/issues/471)) ([a90ed11](https://github.com/nakita628/hono-takibi/commit/a90ed112019235347437348aa8db30943d602576))
* **zod:** distribute sibling shape into nullable/defaulted branches ([#471](https://github.com/nakita628/hono-takibi/issues/471)) ([c6aead2](https://github.com/nakita628/hono-takibi/commit/c6aead2b0f2d623ae5830924523c2e773fa01610))
* **zod:** drop the success-gate parse in the unevaluatedProperties check ([#480](https://github.com/nakita628/hono-takibi/issues/480)) ([d6a9c73](https://github.com/nakita628/hono-takibi/commit/d6a9c7367f7efb6558096511457f1af2e8a84e6d))
* **zod:** keep check-pipe for x-catch branches; distribute allOf $ref nullable members ([#471](https://github.com/nakita628/hono-takibi/issues/471)) ([ed6757b](https://github.com/nakita628/hono-takibi/commit/ed6757bd4e6bf5d6baf9fd1ba76e2fb4f39b753c))
