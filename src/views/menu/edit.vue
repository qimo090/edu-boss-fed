<template>
  <create-or-edit :is-edit="true"/>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'

export default Vue.extend({
  name: 'MenuEdit',
  components: {
    CreateOrEdit
  }
})
</script>

<style lang="scss" scoped>

</style>
