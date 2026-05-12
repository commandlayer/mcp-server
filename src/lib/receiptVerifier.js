// REMOVED — this file implemented a 4th incompatible receipt format
// (receipt.payload / receipt.signer / receipt.hash / receipt.signature) that
// was never used anywhere in the codebase. The verifyReceipt tool proxies to
// the runtime via commandlayerApi.js.
//
// When @commandlayer/runtime-core is published to npm, local verification
// should use its verifyReceiptSignature() export instead.
//
// Do not add new code here. This file will be deleted in a future cleanup.
