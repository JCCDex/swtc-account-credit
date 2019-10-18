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

// Contract
const contractAddress = "";

// Moac node
const node = "";

// true or false
const mainnet = false;

// If the value is true shows the wallet has risk, you should transfer all tokens to new wallet from the risk wallet.
const hasRisk = await creditContractInstance.init(contractAddress, node, mainnet).queryCredit(swtcAddress);
```
