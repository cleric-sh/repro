# Maximum call stack size exceeded error in `tsserver`

The code in this repository produces an error in `tsserver` in `vscode`'s Extension Host.

The `pkg` workspace represents a locally built package in a workspace that is referenced by `consumer`.

## Steps to repro

1. `pnpm i`
1. Open the Output > Extension Host view
1. Go to `consumer/index.ts`
1. Trigger autocomplete / suggestions intellisense action inside the `HomePage` class, as per comments.
1. Observe the error in Output.

1. Go to `pkg/dist/Container.d.ts`
1. Comment out the `traverse` fn and uncomment the alternative.
1. Go to `consumer/index.ts` and trigger suggestions again.
1. Note that the suggestions are now working and the error is not emitted.

## The blame

In this case, passing arguments to the lambda causes the error:

```ts
  $traverse<T>(...args: [typeof TraverseArgs<T>]): unknown
```                             This arg --> ^

Whereas the following does not:
```ts
  $traverse<T>(...args: [typeof TraverseArgs]): unknown
```

## The error

The error produced is:
```
Maximum call stack size exceeded
RangeError: Maximum call stack size exceeded
    at String.replace (<anonymous>)
    at Object.toFileNameLowerCase [as getCanonicalFileName] (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:3364:46)
    at getCanonicalFileName (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:127619:17)
    at toPath (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:8901:10)
    at toPath3 (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:126111:12)
    at getResolvedProjectReferenceToRedirect (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:127453:78)
    at getRedirectReferenceForResolution (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:126074:22)
    at getCompilerOptionsForFile (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:127520:20)
    at Object.getDefaultResolutionModeForFile2 [as getDefaultResolutionModeForFile] (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:128547:62)
    at resolveExternalModule (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:53540:151)
    at resolveExternalModuleNameWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:53517:61)
    at resolveExternalModuleName (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:53514:12)
    at getAlternativeContainingModules (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:53999:32)
    at getWithAlternativeContainers (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54064:58)
    at getContainersOfSymbol (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54031:14)
    at getSymbolChain (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:56557:27)
    at lookupSymbolChainWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:56542:36)
    at lookupSymbolChain (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:56536:14)
    at symbolToTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:56710:21)
    at serializeTypeName (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57259:14)
    at Object.serializeTypeName (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54836:16)
    at tryVisitTypeQuery (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136241:39)
    at visitExistingNodeTreeSymbolsWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136439:24)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136189:22)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
    at typeToTypeNodeWorker (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55291:16)
    at typeToTypeNodeHelper (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55072:24)
    at serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:57306:14)
    at Object.serializeExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:54794:16)
    at visitExistingNodeTreeSymbols (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136194:27)
    at visitNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:93631:19)
    at tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136179:25)
    at Object.tryReuseExistingTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:136171:14)
    at createAnonymousTypeNode (<redacted>/node_modules/.pnpm/typescript@5.7.3/node_modules/typescript/lib/typescript.js:55469:53)
	at n.create (/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/typescript-language-features/dist/extension.js:1:486366)
	at y.dispatchResponse (/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/typescript-language-features/dist/extension.js:1:480336)
	at y.dispatchMessage (/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/typescript-language-features/dist/extension.js:1:479134)
	at ChildProcess.<anonymous> (/Applications/Visual Studio Code.app/Contents/Resources/app/extensions/typescript-language-features/dist/extension.js:1:478627)
	at ChildProcess.emit (node:events:518:28)
	at emit (node:internal/child_process:950:14)
	at process.processTicksAndRejections (node:internal/process/task_queues:83:21)
2025-02-04 14:21:53.264 [error] [vscode.typescript-language-features] provider FAILED
```