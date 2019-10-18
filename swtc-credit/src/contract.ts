import ethers = require("ethers");
import { Moac, smartContract as SmartContract, SolidityFunction } from "jcc-moac-utils";
import abi from "./abi/swtc-account-credit";
const abiCoder = ethers.utils.defaultAbiCoder;

// hijacking `call` to return origin bytes so that we could decode it by ethers abi coder.
// source: https://github.com/MOACChain/chain3/blob/master/lib/chain3/function.js#L130
Object.defineProperty(SolidityFunction.prototype, "call", {
  get() {
    return function (..._args) {
      return new Promise((resolve, reject) => {
        const args = Array.prototype.slice.call(_args).filter(function (a) {
          return a !== undefined;
        });
        const defaultBlock = this.extractDefaultBlock(args);
        const payload = this.toPayload(args);
        this._mc.call(payload, defaultBlock, function (error, output) {
          if (error) {
            return reject(error);
          }
          return resolve(output);
        });
      });
    };
  }
});

export class CreditContract extends SmartContract {
  private _contractAddress: string;

  constructor(address: string) {
    super();
    this._contractAddress = address;
  }

  public initContract(moac: Moac) {
    super.init(this._contractAddress, moac, abi);
  }

  public async queryCredit(address: string): Promise<boolean> {
    const abiItem = abi.find((item) => item.name === "queryCredit");
    const output = await super.callABI("queryCredit", address);
    const decodeData = abiCoder.decode(abiItem.outputs, output);
    return decodeData[0];
  }
}

const creditContractInstance = (() => {
  let inst: CreditContract | null = null;

  const init = (contract: string, node: string, mainnet: boolean): CreditContract => {
    if (inst === null) {
      const moac = new Moac(node, mainnet);
      moac.initChain3();
      inst = new CreditContract(contract);
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
