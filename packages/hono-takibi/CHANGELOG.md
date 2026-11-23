# Changelog

## [0.35.5](https://github.com/nakita628/hono-takibi/compare/v0.35.4...v0.35.5) (2026-11-23)


### Bug Fixes

* four small generator bugs from the 0.35.3 review ([#595](https://github.com/nakita628/hono-takibi/issues/595), [#599](https://github.com/nakita628/hono-takibi/issues/599), [#602](https://github.com/nakita628/hono-takibi/issues/602), [#603](https://github.com/nakita628/hono-takibi/issues/603)) ([#620](https://github.com/nakita628/hono-takibi/issues/620)) ([6c2d9c9](https://github.com/nakita628/hono-takibi/commit/6c2d9c95b15cb074d3d94ef6e6071b6e20bdb98a))

## [0.35.4](https://github.com/nakita628/hono-takibi/compare/v0.35.3...v0.35.4) (2026-11-23)


### Bug Fixes

* **hooks:** number a prefix key getter whose name is taken ([#536](https://github.com/nakita628/hono-takibi/issues/536)) ([#561](https://github.com/nakita628/hono-takibi/issues/561)) ([62f67d2](https://github.com/nakita628/hono-takibi/commit/62f67d2ea5c05ddccf8324b9139d88665cb4f461))

## [0.35.3](https://github.com/nakita628/hono-takibi/compare/v0.35.2...v0.35.3) (2026-11-23)


### Bug Fixes

* **template:** leave operations without responses out of index.ts ([#545](https://github.com/nakita628/hono-takibi/issues/545)) ([#559](https://github.com/nakita628/hono-takibi/issues/559)) ([b3dd1eb](https://github.com/nakita628/hono-takibi/commit/b3dd1eb193b1ac5b56e5290a7729920af571de5e))

## [0.35.2](https://github.com/nakita628/hono-takibi/compare/v0.35.1...v0.35.2) (2026-11-23)


### Bug Fixes

* **template:** write the segment index to __index.ts, not over the barrel index.ts ([#557](https://github.com/nakita628/hono-takibi/issues/557)) ([dbadbd9](https://github.com/nakita628/hono-takibi/commit/dbadbd925cbf46cb69fcee9e015d722ffa408406))

## [0.35.1](https://github.com/nakita628/hono-takibi/compare/v0.35.0...v0.35.1) (2026-11-23)


### Bug Fixes

* **hooks:** escape a path that contains ' in the query keys ([#553](https://github.com/nakita628/hono-takibi/issues/553)) ([05c192c](https://github.com/nakita628/hono-takibi/commit/05c192c965c9d4cd6f9cd6a9446b22cc84951588))

## [0.35.0](https://github.com/nakita628/hono-takibi/compare/v0.34.0...v0.35.0) (2026-11-23)


### ⚠ BREAKING CHANGES

* **hooks:** generate angular-query hooks for @tanstack/angular-query ([#551](https://github.com/nakita628/hono-takibi/issues/551))

### Features

* **hooks:** generate angular-query hooks for @tanstack/angular-query ([#551](https://github.com/nakita628/hono-takibi/issues/551)) ([09bdfa5](https://github.com/nakita628/hono-takibi/commit/09bdfa5fe4d4e817bd0f355a12b97ea6c914e411))

## [0.34.0](https://github.com/nakita628/hono-takibi/compare/v0.33.7...v0.34.0) (2026-11-23)


### Features

* **template:** with a # pathAlias, write fully specified imports so the output runs on Node ([#549](https://github.com/nakita628/hono-takibi/issues/549)) ([1927c3e](https://github.com/nakita628/hono-takibi/commit/1927c3ed9447e40762ffdb829e478da5d8396c75))

## [0.33.7](https://github.com/nakita628/hono-takibi/compare/v0.33.6...v0.33.7) (2026-11-23)


### Bug Fixes

* **zod:** declare a schema pointed at inside a component schema as a component ([#538](https://github.com/nakita628/hono-takibi/issues/538)) ([c1ce9a3](https://github.com/nakita628/hono-takibi/commit/c1ce9a39af2939765cfa997feae24750fdc242f8))

## [0.33.6](https://github.com/nakita628/hono-takibi/compare/v0.33.5...v0.33.6) (2026-11-23)


### Bug Fixes

* **zod:** read a pointer through a $ref on its way ([#537](https://github.com/nakita628/hono-takibi/issues/537)) ([74340da](https://github.com/nakita628/hono-takibi/commit/74340da081b780bd73df54e03064c47d67bd1b77))

## [0.33.5](https://github.com/nakita628/hono-takibi/compare/v0.33.4...v0.33.5) (2026-11-23)


### Bug Fixes

* **zod:** do not write a sibling oneOf / anyOf, not or patternProperties into the document when it copies too much out of the components ([#533](https://github.com/nakita628/hono-takibi/issues/533)) ([e031e45](https://github.com/nakita628/hono-takibi/commit/e031e456b483d71abb488679b48c4d6e9a62cdbf))
* **zod:** resolve a $ref that points inside a component schema to the schema it names ([#535](https://github.com/nakita628/hono-takibi/issues/535)) ([a3b83a2](https://github.com/nakita628/hono-takibi/commit/a3b83a2d15370544c0fd66a36293c3923d17d1bc))

## [0.33.4](https://github.com/nakita628/hono-takibi/compare/v0.33.3...v0.33.4) (2026-11-23)


### Bug Fixes

* **type:** apply the null of a nullable allOf member to the whole intersection ([#529](https://github.com/nakita628/hono-takibi/issues/529)) ([ad4f053](https://github.com/nakita628/hono-takibi/commit/ad4f053b2038eae271896d885415a9737cd69c13))

## [0.33.3](https://github.com/nakita628/hono-takibi/compare/v0.33.2...v0.33.3) (2026-11-23)


### Bug Fixes

* type output keys, enums and status codes, schema-less response content, api export, digit-led handler names, long handler chains, repeated sibling references ([#525](https://github.com/nakita628/hono-takibi/issues/525)) ([c6b3125](https://github.com/nakita628/hono-takibi/commit/c6b3125dc0d6f1e4759cf3282814a4cdeb538019))

## [0.33.2](https://github.com/nakita628/hono-takibi/compare/v0.33.1...v0.33.2) (2026-11-23)


### Bug Fixes

* type-check contentSchema strings, in-segment path parameters, and GET hooks named like library imports ([#523](https://github.com/nakita628/hono-takibi/issues/523)) ([d3de6d1](https://github.com/nakita628/hono-takibi/commit/d3de6d1ccd0400400a8f327ebefb28548afca942))

## [0.33.1](https://github.com/nakita628/hono-takibi/compare/v0.33.0...v0.33.1) (2026-11-22)


### Bug Fixes

* **routes:** declare the path parameters a template names and the document leaves out ([#514](https://github.com/nakita628/hono-takibi/issues/514)) ([9bb41e4](https://github.com/nakita628/hono-takibi/commit/9bb41e4b70565567aa40ac2a5131de2ec43e1a66))

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
