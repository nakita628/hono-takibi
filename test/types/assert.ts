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

/**
 * `true` only when A and B are the same type: each is assignable to the other — one direction is
 * not enough — and `any` on either side matches only `any`, since it is assignable both ways.
 */
export type Equal<A, B> =
  IsAny<A> extends true
    ? IsAny<B>
    : IsAny<B> extends true
      ? false
      : [A] extends [B]
        ? [B] extends [A]
          ? true
          : false
        : false

/** `true` when A is assignable to B. */
export type IsAssignable<A, B> = [A] extends [B] ? true : false

/** `true` when T declares the key K. */
export type HasKey<T, K extends PropertyKey> = K extends keyof T ? true : false
