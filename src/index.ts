import { expect, Locator } from 'playwright/test'

export type M = ReturnType<typeof expect<Locator>>

export function expects(...names: string[]): M {
  return {} as M
}