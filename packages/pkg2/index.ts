/**
 * An ArgsFn can be defined as any function with a single object parameter.
 * Or, in other words, whose arguments can be described by a single type.
 */

import { AOf } from "@cleric/common"

interface ObjWithFunc { fn: (args: { value: string }) => string }

type X = AOf<ObjWithFunc['fn'], { value: "foo" }>