import creditContractInstance from "../src/contract";
import { CreditContract } from "../src/contract";
import { smartContract as SmartContract, Moac } from "jcc-moac-utils";
import sinon from "sinon";
const sandbox = sinon.createSandbox();

describe("test contract.ts", () => {
  let instance;

  const contractAddress = "0xf5d4e7dd6f46402004f085be51dbfcc023532264";
  const node = "http://localhost";
  const mainnet = false;

  describe("test creditContractInstance", () => {
    test("init should be a function", () => {
      expect(typeof creditContractInstance.init).toBe("function");
    });

    test("destroy should be a function", () => {
      expect(typeof creditContractInstance.destroy).toBe("function");
    });

    test("should be inited once if success and be inited again if had been destroyed", () => {
      instance = creditContractInstance.init(contractAddress, node, mainnet);
      expect(instance instanceof CreditContract).toBe(true);
      let inst = creditContractInstance.init(contractAddress, node, mainnet);
      expect(instance).toBe(inst);
      creditContractInstance.destroy();
      inst = creditContractInstance.init(contractAddress, node, mainnet);
      expect(instance).not.toBe(inst);
    })
  })

  describe("test queryCredit", () => {
    const address = "0x5edccedfe9952f5b828937b325bd1f132aa09f60"

    afterEach(() => {
      sandbox.restore();
    });

    test("if request success", async () => {
      const stub = sandbox.stub(SmartContract.prototype, "callABI").resolves(true);
      const state = await instance.queryCredit(address);
      expect(stub.calledOnceWithExactly("queryCredit", address)).toBe(true);
      expect(state).toBe(true);
    })
  })
})