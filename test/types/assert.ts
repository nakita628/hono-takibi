/** `true` only for `any` — `unknown extends T` cannot tell the two apart. */
export type IsAny<T> = 0 extends 1 & T ? true : false

/** `true` when T is anything but `any`. */
export type NotAny<T> = IsAny<T> extends false ? true : false

/**
 * Compile-time assertion: the argument must be statically `true`.
 *
 * The single use of `T` is the mechanism, not an oversight — the `extends true` constraint is
 * what fails the build when an assertion resolves to `false`.
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- the constraint on T is the assertion
export const assertType = <T extends true>(_assertion: T): void => undefined
