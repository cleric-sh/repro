import type { TraverseArgs } from './traverse';

export declare class Container<P> {
  /**
   * This line (including generic arg for 'TraverseArgs') produces 'Maximum call stack size exceeded' in Extension Host.
   * Go to 'consumer/index.ts' to trigger the error.
   */
  $traverse<T>(...args: [typeof TraverseArgs<T>]): unknown

  /**
   * The same line without the generic arg for 'TraverseArgs' does not emit the same error.
   */
  // $traverse<T>(...args: [typeof TraverseArgs]): unknown
}