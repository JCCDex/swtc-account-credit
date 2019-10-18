# swtc-account-credit

A dapp for querying risk of SWTC wallet from contract which is deployed on MOAC.

SWTC钱包风险评估DAPP

[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)

## How to query risk of SWTC wallet

query risk via [queryCredit](https://github.com/JCCDex/swtc-account-credit/blob/master/dapp/js/contract.ts#L42) API.

```javascript
import creditContractInstance from "contract";

// Your SWTC address
const swtcAddress = "";

// Moac node
const node = "";

// If the value is true shows the wallet has risk, you should transfer all tokens to new wallet from the risk wallet.
const hasRisk = await creditContractInstance.init(node).queryCredit(swtcAddress);
```
