<template>
  <div class="user">
    <el-card shadow="never">
      <el-form inline ref="form" :model="form" label-width="80px">
        <el-form-item label="手机号" prop="name">
          <el-input size="small" v-model="form.phone" placeholder="请输入手机号"/>
        </el-form-item>
        <el-form-item>
          <el-button size="small" type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
          <el-button size="small" @click="onReset" :disabled="isLoading">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-table :data="roles" stripe border style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
      <el-table-column prop="id" label="用户ID" width="100" align="center"/>
      <el-table-column prop="portrait" label="头像" width="60" align="center">
        <template slot-scope="scope">
          <el-avatar :size="30" :src="scope.row.portrait">
            <img src="https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png" alt="">
          </el-avatar>
        </template>
      </el-table-column>
      <el-table-column prop="name" label="用户名" width="180" align="center"/>
      <el-table-column prop="phone" label="手机号" width="130" align="center"/>
      <el-table-column prop="createTime" label="注册时间" width="180" align="center"/>
      <el-table-column min-width="180" label="操作">
        <!--          <template slot-scope="scope">-->
        <!--          </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getUsers } from '@/services/user'

export default Vue.extend({
  name: 'UserIndex',
  data () {
    return {
      // 角色列表
      roles: [],
      total: 0,
      // loading
      isLoading: true,
      // 查询
      form: {
        phone: '',
        currentPage: 1,
        pageNum: 1,
        size: 50
      }
    }
  },
  created () {
    this.loadUsers()
  },
  methods: {
    // 角色列表
    async loadUsers () {
      this.isLoading = true
      const { data } = await getUsers(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    // 查询
    onSubmit () {
      this.form.current = 1
      this.loadUsers()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.currentPage = 1 // 重置回到第1页
      this.loadUsers()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
