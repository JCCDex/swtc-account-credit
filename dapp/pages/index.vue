<template>
  <div class="swtc-account-credit-container">
    <div style="position: fixed; height: 100%; width: 100%; top: 0;">
      <div ref="scroll" flex class="scroll-wrapper" style="height: 100%;overflow-y:scroll;">
        <div flex-box="1" flex="dir:top cross: center">
          <div flex="main:center cross:center dir:top" style="margin: 0.5rem 0.3rem 0 0.3rem;">
            <img src="~/assets/images/home-header.png" width="50%" />
            <p style="margin-top: 0.38rem;color: #24262C" class="swtc-account-credit-larger-font-size">
              {{ $t("risk_evaluation") }}
            </p>
            <p style="margin-top: 0.21rem;">
              {{ $t("query_declare") }}
            </p>
            <van-field v-model="address" center type="text" :placeholder="$t('pls_input_address')" style="margin-top: 0.4rem;" @focus="disableScroll" @blur="enableScroll" />

            <button :disabled="!queryEnable" class="swtc-account-credit-button swtc-account-credit-search-button" style="width: 100%;margin-top: 0.4rem;" @click="goto">
              {{ $t("query") }}
            </button>
          </div>
          <div v-show="showFooter" flex-box="1" flex="cross:bottom">
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
import scrollIntoView from "@/mixins/scrollIntoView";
import { browser } from "@/js/util";

export default {
  name: "Main",
  components: {
    CopyrightFooter
  },
  mixins: [scrollIntoView],
  data() {
    return {
      address: "",
      showFooter: true,
      innerHeight: window.innerHeight
    };
  },
  computed: {
    queryEnable() {
      return jtWallet.isValidAddress(this.address.trim());
    }
  },
  mounted() {
    this.init();
    if (browser.versions.android) {
      window.addEventListener("resize", this.keyup);
    }
  },
  beforeDestroy() {
    this.bs && this.bs.destroy();
    if (browser.versions.android) {
      window.removeEventListener("resize", this.keyup);
    }
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
    },
    disableScroll() {
      if (browser.versions.ios) {
        this.bs && this.bs.disable();
      }
    },
    enableScroll() {
      if (browser.versions.ios) {
        this.bs && this.bs.enable();
      }
    },
    keyup() {
      const newInnerHeight = window.innerHeight;
      if (this.innerHeight > newInnerHeight) {
        // keyup event
        this.showFooter = false;
      } else {
        // keydown event
        this.showFooter = true;
      }
    }
  }
};
</script>
<style lang="scss"></style>
