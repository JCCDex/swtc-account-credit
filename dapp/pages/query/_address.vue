<template>
  <div class="swtc-account-credit-container">
    <div style="position: fixed; height: 100%; width: 100%; top: 0;">
      <div class="swtc-account-credit-tab-bar">
        <div class="swtc-account-credit-tabs swtc-account-credit-tabs-bottom">
          <div class="swtc-account-credit-tabs-content-wrap" style="touch-action: pan-x pan-y; position: relative; left: 0%;flex-direction: column">
            <query-header :title="$t('query_result')" />
            <div ref="scroll" flex class="scroll-wrapper" style="height: calc(100% - 0.9rem);background-color: #fff;">
              <div flex="dir:top cross: center" style="width: 100%;">
                <p style="color: #24262C; margin:0.43rem 0.55rem 0 0.55rem;">
                  {{ $t("query_address", { address }) }}
                </p>
                <p v-if="hasRisk" class="swtc-account-credit-largest-font-size" style="margin-top:0.43rem;color: #F76358;">
                  {{ $t("risk") }}
                </p>
                <p v-else class="swtc-account-credit-largest-font-size" style="margin-top:0.43rem;color: #3ABA67;">
                  {{ $t("safe") }}
                </p>
                <p v-if="hasRisk" style="margin:0.17rem 0.72rem 0 0.72rem;">
                  {{ $t("risk_declare") }}
                </p>
                <p v-else style="margin:0.17rem 0.72rem 0 0.72rem;">
                  {{ $t("safe_declare") }}
                </p>

                <div style="margin:0.42rem 0.2rem 0 0.2rem;">
                  <div flex="dir:top cross: center" style="background-color: #F4FAFF; padding:0.2rem;">
                    <p class="swtc-account-credit-larger-font-size" style="text-align:left;color:#008EFF">
                      {{ $t("how_to_transfer") }}
                    </p>
                    <div flex="cross: center" style="text-align:left;color:#24262C;margin-top:0.41rem;">
                      <div flex-box="0" class="swtc-account-credit-icon-circle" style="margin-right:0.16rem;">
                        1
                      </div>
                      <p>{{ $t("transfer_tip.tip1") }}</p>
                    </div>
                    <div flex="cross: center" style="margin-top:0.22rem;">
                      <div v-touch:longtap="scan" class="swtc-account-credit-qrcode" />
                      <p flex="dir:bottom" style="width:2rem;padding-bottom:0.1rem;">
                        {{ $t("transfer_tip.download_weidex") }}
                      </p>
                    </div>
                    <div flex="cross: center" style="text-align:left;color:#24262C;margin-top:0.41rem;">
                      <div flex-box="0" class="swtc-account-credit-icon-circle" style="margin-right:0.16rem;">
                        2
                      </div>
                      <p>{{ $t("transfer_tip.tip2") }}</p>
                    </div>
                  </div>
                </div>

                <div class="swtc-account-credit-lock-bottom-container" flex-box="1" flex="dir:top cross: center">
                  <div flex-box="1" flex="cross:bottom">
                    <copyright-footer />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import QueryHeader from "@/components/header";
import CopyrightFooter from "@/components/footer";
import creditContractInstance from "@/js/contract";
import tpInfo from "@/js/tp";
import tp from "tp-js-sdk";

export default {
  name: "QueryResult",
  components: {
    QueryHeader,
    CopyrightFooter
  },
  data() {
    return {
      address: "",
      hasRisk: false
    };
  },
  async asyncData({ params }) {
    const address = params.address;
    const node = await tpInfo.getNode();
    const hasRisk = await creditContractInstance.init(node).queryCredit(address);
    return { address, hasRisk };
  },
  mounted() {
    this.init();
  },
  updated() {
    this.bs.refresh();
  },
  deactivated() {
    this.$destroy();
  },
  beforeDestroy() {
    this.bs.destroy();
  },
  methods: {
    init() {
      this.bs = new BScroll(this.$refs.scroll, {
        scrollY: true,
        click: true
      });
    },
    scan() {
      if (tpInfo.isConnected()) {
        tp.invokeQRScanner().then(url => {
          window.open(url);
        });
      }
    }
  }
};
</script>
<style lang="scss">
.swtc-account-credit-qrcode {
  width: 3rem;
  height: 3rem;
  background: url("../../assets/images/weidex-qrcode.png");
  background-size: 100% 100%;
  background-repeat: no-repeat;
}
</style>
