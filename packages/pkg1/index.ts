import { Simplify } from "type-fest";
import type { KeysNotNever } from "./KeysNotNever";

/**
 * An ArgsFn can be defined as any function with a single object parameter.
 * Or, in other words, whose arguments can be described by a single type.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AFn = (args: any) => unknown;

/**
 * Given an ArgsFn, return the type of its Args object.
 */

type _AOf<F extends AFn> = (F extends (args: infer U) => unknown ? U : never);


export type ExtendWith<F extends AFn> = Record<string, unknown> & {
  [P in (keyof _AOf<F>)]?: unknown;
}


type Unset = { __unset__: "UNSET" }

/**
 * Given an ArgsFn, extend the type of its Args with properties in O.
 * Properties in O added to Args, or replace existing properties.
 * Properties in O that are set to 'never', remove the corresponding properties from Args.
 */

export type AOf<
  F extends AFn,
  E extends ExtendWith<F> = Unset
> = Unset extends E ? _AOf<F> : Simplify<Omit<_AOf<F>, keyof E> & Pick<E, KeysNotNever<E>>>;