<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'App',
  components: {}
})
</script>

<style lang="scss">
//@import "~@/styles/variables.scss";

.text {
  color: $success-color;
}
</style>
