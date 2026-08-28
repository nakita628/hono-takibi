Type-level regression fixtures.

Each file asserts that the generics a generated hook declares (`TData` / `TError` /
`TOnMutateResult` / `TPageParam`) actually reach the caller — a hook can compile fine while
silently resolving a generic to `any` or to the library default, which no runtime test catches.

These are compiled by `tsc -p cases/<framework>` (see each case's tsconfig `include`), so a
regression fails `runtime/typecheck.test.ts`.
