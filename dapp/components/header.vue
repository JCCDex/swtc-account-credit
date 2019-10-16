<template>
  <header class="swtc-account-credit-header swtc-account-credit-large-font-size" flex="main:center cross:center">
    {{ title }}
  </header>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: ""
    }
  }
};
</script>
<style lang="scss">
.swtc-account-credit-header {
  position: relative;
  height: 0.9rem;
  width: 100%;
  line-height: 0.9rem;
  color: #24262c;
  background-color: #f4faff;
}
</style>
