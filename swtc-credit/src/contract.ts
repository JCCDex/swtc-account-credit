import { Moac, smartContract as SmartContract } from "jcc-moac-utils";
import abi from "./abi/swtc-account-credit";

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
    const isRisk = await super.callABI("queryCredit", address);
    return isRisk;
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
