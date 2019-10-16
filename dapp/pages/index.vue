<template>
  <div class="swtc-account-credit-container">
    <div style="position: fixed; height: 100%; width: 100%; top: 0;">
      <div ref="scroll" flex class="scroll-wrapper" style="height: 100%;">
        <div flex-box="1" flex="dir:top cross: center">
          <div flex="main:center cross:center dir:top" style="margin: 0.5rem 0.3rem 0 0.3rem;">
            <img src="~/assets/images/home-header.png" width="50%" />
            <p style="margin-top: 0.38rem;color: #24262C" class="swtc-account-credit-larger-font-size">
              {{ $t("risk_evaluation") }}
            </p>
            <p style="margin-top: 0.21rem;">
              {{ $t("query_declare") }}
            </p>
            <van-field v-model="address" center type="string" :placeholder="$t('pls_input_address')" style="margin-top: 0.4rem;" />

            <button :disabled="!queryEnable" class="swtc-account-credit-button swtc-account-credit-search-button" style="width: 100%;margin-top: 0.4rem;" @click="goto">
              {{ $t("query") }}
            </button>
          </div>
          <div flex-box="1" flex="cross:bottom">
            <copyright-footer />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import BScroll from "@better-scroll/core";
import CopyrightFooter from "@/components/footer";
import { jtWallet } from "jcc_wallet";

export default {
  name: "Main",
  components: {
    CopyrightFooter
  },
  data() {
    return {
      address: ""
    };
  },
  computed: {
    queryEnable() {
      return jtWallet.isValidAddress(this.address.trim());
    }
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
    goto() {
      this.$router.push("/query/" + this.address.trim());
    }
  }
};
</script>
<style lang="scss"></style>
