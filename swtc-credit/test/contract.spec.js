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
      const stub = sandbox.stub(instance.moac.getChain3().mc, "call");
      stub.yields(null, "0x0000000000000000000000000000000000000000000000000000000000000001")
      const spy = sandbox.spy(SmartContract.prototype, "callABI");
      const state = await instance.queryCredit(address);
      const args = stub.args[0];
      expect(args[0]).toEqual({
        to: '0xf5d4e7dd6f46402004f085be51dbfcc023532264',
        data: '0x6b6f71c20000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000002a30783565646363656466653939353266356238323839333762333235626431663133326161303966363000000000000000000000000000000000000000000000'
      });
      expect(args[1]).toBe(undefined);
      expect(typeof args[2]).toBe("function");
      expect(state).toBe(true);
      expect(spy.calledOnceWithExactly("queryCredit", address)).toBe(true);
    })

    test("if request fail", async () => {
      try {
        const stub = sandbox.stub(instance.moac.getChain3().mc, "call");
        stub.yields(new Error("could not connect to node"), null);
        await instance.queryCredit(address);
      } catch (error) {
        expect(error.message).toBe("could not connect to node");
      }
    })
  })
})