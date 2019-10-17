import tpInfo from "@/js/tp";

export default async function({ route, redirect }) {
  if (route.path === "/") {
    const currentWallet = await tpInfo.getCurrentWallet();
    if (!currentWallet) {
      return;
    }
    if (currentWallet.blockchain === "jingtum") {
      return redirect("/query/" + currentWallet.address);
    }
  }
}
