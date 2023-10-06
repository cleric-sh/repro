export type KeysNotNever<T> = Exclude<{
  [P in keyof T]: [T[P]] extends [never] ? never : P;
}[keyof T], undefined>;
