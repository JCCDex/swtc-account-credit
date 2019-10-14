import { smartContract as SmartContract, Moac, SolidityFunction } from "jcc-moac-utils";
import { isMainnet } from "./util";
const abi = require("@/abi/swtc-account-credit-abi.json");
const ethers = require("ethers");
const abiCoder = ethers.utils.defaultAbiCoder;

/**
 * hijacking `call` to return origin bytes so that we could decode it by ethers abi coder.
 * [origin code](https://github.com/MOACChain/chain3/blob/master/lib/chain3/function.js#L130)
 */
Object.defineProperty(SolidityFunction.prototype, "call", {
  get() {
    return function() {
      return new Promise((resolve, reject) => {
        const args = Array.prototype.slice.call(arguments).filter(function(a) {
          return a !== undefined;
        });
        const defaultBlock = this.extractDefaultBlock(args);
        const payload = this.toPayload(args);
        this._mc.call(payload, defaultBlock, function(error, output) {
          if (error) return reject(error);
          console.log("output: ", output);
          return resolve(output);
        });
      });
    };
  }
});

export class CreditContract extends SmartContract {
  private _contractAddress: string;

  constructor(contractAddress: string) {
    super();
    this._contractAddress = contractAddress;
  }

  public initContract(moac: Moac) {
    super.init(this._contractAddress, moac, abi);
  }

  async queryCredit(address: string): Promise<boolean> {
    const abiItem = abi.find(item => item.name == "queryCredit");
    const output = await super.callABI("queryCredit", address);
    const decodeData = abiCoder.decode(abiItem.outputs, output);
    return decodeData[0];
  }
}

const creditContractInstance = (() => {
  let inst: CreditContract | null = null;

  const init = (node: string): CreditContract => {
    if (inst === null) {
      const contractAddress = process.env.CONTRACT;
      const mainnet = isMainnet();
      const moac = new Moac(node, mainnet);
      moac.initChain3();
      inst = new CreditContract(contractAddress);
      inst.initContract(moac);
    }

    return inst;
  };

  const destroy = () => {
    inst = null;
  };

  return {
    destroy,
    init
  };
})();

export default creditContractInstance;
