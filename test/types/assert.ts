/**
 * `true` only for `any` — `unknown extends T` cannot tell the two apart.
 * `any` の場合にのみ `true` になる。`unknown extends T` では、この2つを区別できない。
 */
export type IsAny<T> = 0 extends 1 & T ? true : false

/**
 * `true` when T is anything but `any`.
 * T が `any` 以外であれば `true` になる。
 */
export type NotAny<T> = IsAny<T> extends false ? true : false

/**
 * Compile-time assertion: the argument must be statically `true`.
 *
 * The single use of `T` is the mechanism, not an oversight — the `extends true` constraint is
 * what fails the build when an assertion resolves to `false`.
 *
 * コンパイル時のアサーション。引数は、静的に `true` でなければならない。
 * `T` を1度しか使っていないのは見落としではなく、仕組みそのものである。
 * アサーションが `false` に解決された場合、`extends true` の制約によってビルドが失敗する。
 */
// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- the constraint on T is the assertion
export const assertType = <T extends true>(_assertion: T): void => undefined

/**
 * `true` only when A and B are the same type: each is assignable to the other — one direction is
 * not enough — and `any` on either side matches only `any`, since it is assignable both ways.
 *
 * A と B が同じ型である場合にのみ `true` になる。互いに代入可能であることが条件であり、
 * 片方向だけでは不十分である。また、どちらかが `any` の場合は、
 * 相手も `any` のときにのみ一致する。`any` は双方向に代入可能なためである。
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

/**
 * `true` when A is assignable to B.
 * A が B に代入可能であれば `true` になる。
 */
export type IsAssignable<A, B> = [A] extends [B] ? true : false

/**
 * `true` when T declares the key K.
 * T がキー K を宣言していれば `true` になる。
 */
export type HasKey<T, K extends PropertyKey> = K extends keyof T ? true : false
