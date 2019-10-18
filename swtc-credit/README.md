# swtc-credit

> ts sdk for querying risk of SWTC wallet

## Installtion

```shell
npm i swtc-credit
```

## How to query risk of SWTC wallet

```javascript
import creditContractInstance from "swtc-credit";

// Your SWTC address
const swtcAddress = "";

// Contract have been depolyed on production node, don't change.
const contractAddress = "0xf5d4e7dd6f46402004f085be51dbfcc023532264";

// Moac node
const node = "";

// Main net, don't change.
const mainnet = true;

// If the value is true shows the wallet has risk, you should transfer all tokens to new wallet from the risk wallet.
const hasRisk = await creditContractInstance.init(contractAddress, node, mainnet).queryCredit(swtcAddress);
```
