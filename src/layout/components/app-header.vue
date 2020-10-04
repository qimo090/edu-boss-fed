<template>
  <div class="header">
    <div class="header-left">
      <el-button type="text" class="hamburger" @click="oChangeCollapse">
        <i :class="isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold' "/>
      </el-button>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
        <el-breadcrumb-item>{{ $route.meta.title || '' }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-dropdown>
      <span class="el-dropdown-link">
        <el-avatar
          shape="square" :size="30"
          :src="userInfo.portrait"
        >
          <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="">
        </el-avatar>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>{{ userInfo.userName }}</el-dropdown-item>
        <el-dropdown-item divided @click.native="handleLogout">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUserInfo } from '@/services/user'

export default Vue.extend({
  name: 'app-header',
  props: {
    isCollapse: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      userInfo: {
        portrait: '',
        userName: ''
      }
    }
  },
  created () {
    this.loadUserInfo()
  },
  methods: {
    async loadUserInfo () {
      const { data } = await getUserInfo()
      this.userInfo = data.content
    },
    handleLogout () {
      this.$confirm('确定退出登录吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 1. 清除登录状态
        this.$store.commit('setUser', null)
        // 2. 跳转登录
        this.$router.push('/login')
        this.$message({
          type: 'success',
          message: '退出登录!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '取消退出'
        })
      })
    },
    oChangeCollapse () {
      this.$emit('update:isCollapse', !this.isCollapse)
    }
  }
})
</script>

<style lang="scss" scoped>
.header {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-left {
    display: flex;
    align-items: center;

    .hamburger {
      margin-right: 10px;
      padding: 15px 15px 15px 0;
      font-size: 20px;
      border: 0;
      border-radius: 0;
    }
  }
}
</style>
