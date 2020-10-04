<template>
  <el-container>
    <el-aside width="auto" class="sidebar">
      <router-link to="/" :class="['logo', isCollapse && 'collapse']">
        <img :src="require('@/assets/images/logo.png')" alt="Back to Home">
        <h1>Edu Boss</h1>
      </router-link>
      <app-aside :is-collapse.sync="isCollapse"/>
    </el-aside>
    <el-container>
      <el-header height="auto">
        <app-header :is-collapse.sync="isCollapse"/>
      </el-header>
      <el-main>
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import Vue from 'vue'
import AppAside from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'LayoutIndex',
  components: {
    AppAside, AppHeader
  },
  data () {
    return {
      // 是否折叠左侧菜单栏
      isCollapse: true
    }
  }
})
</script>

<style lang="scss" scoped>
.el-container {
  min-height: 100vh;
  min-width: 960px;
}

.el-aside {
  &.sidebar {
    position: sticky;
    top: 0;
    max-height: 100vh;
    background-color: #f8f9fb;
    user-select: none;
  }

  .logo {
    display: flex;
    justify-content: center;
    align-items: center;
    color: #495057;
    line-height: 50px;
    text-decoration: none;
    text-align: center;

    img {
      margin: 10px;
      width: 30px;
    }

    &.collapse {
      h1 {
        width: 0;
      }
    }
    h1 {
      display: inline-block;
      margin: 0;
      width: 95px;
      overflow: hidden;
      font-size: 20px;
      white-space: nowrap;
      transition: width .3s;
    }
  }
}

.el-header {
  background-color: #fff;
}

.el-main {
  background-color: #e9eef3;
}

</style>
