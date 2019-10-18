import tp from "tp-js-sdk";

interface IWallet {
  name: string;
  address: string;
  blockchain: string;
}

const tpInfo = (() => {
  let currentWallet: IWallet = null;
  let node: string = null;
  let isConnectedState: boolean = null;

  const isConnected = (): boolean => {
    if (isConnectedState === null) {
      isConnectedState = tp.isConnected();
    }
    return isConnectedState;
  };

  const getCurrentWallet = async (): Promise<IWallet> => {
    if (!isConnected()) {
      currentWallet = null;
      return currentWallet;
    }

    if (currentWallet === null) {
      try {
        const res = await tp.getCurrentWallet();
        if (res && res.result) {
          currentWallet = res.data;
        }
      } catch (error) {
        currentWallet = null;
      }
    }
    return currentWallet;
  };

  const getNode = async (): Promise<string> => {
    if (!isConnected()) {
      node = process.env.NODE;
      return node;
    }

    if (node === null) {
      try {
        const res = await tp.getNodeUrl({ blockchain: "moac" });
        if (res && res.result) {
          node = res.data.nodeUrl;
        }
      } catch (error) {
        console.log("request default node error: ", error);
      }
    }
    return node || process.env.NODE;
  };

  const destroy = () => {
    currentWallet = null;
    node = null;
    isConnectedState = null;
  };

  return {
    destroy,
    getCurrentWallet,
    getNode,
    isConnected
  };
})();

export default tpInfo;
