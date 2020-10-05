<template>
  <div class="role">
    <el-card shadow="never">
      <div slot="header">
        <el-form inline ref="form" :model="form" label-width="80px">
          <el-form-item label="输入搜索" prop="name">
            <el-input size="small" v-model="form.name" placeholder="请输入角色名称"/>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="onSubmit" :disabled="isLoading">查询搜索</el-button>
            <el-button size="small" @click="onReset" :disabled="isLoading">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
      <div>
        <el-button size="small">添加角色</el-button>
      </div>
    </el-card>
    <el-table :data="roles" stripe border style="width: 100%; margin-bottom: 20px" v-loading="isLoading">
      <el-table-column prop="id" label="编号" width="100" align="center"/>
      <el-table-column prop="name" label="角色名称" width="180" align="center"/>
      <el-table-column prop="description" label="描述" width="250" align="center"/>
      <el-table-column prop="createdTime" label="添加时间" width="180" align="center"/>
      <el-table-column min-width="180" label="操作">
        <!--          <template slot-scope="scope">-->
        <!--          </template>-->
      </el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getRoles } from '@/services/role'

export default Vue.extend({
  name: 'RoleIndex',
  data () {
    return {
      // 角色列表
      roles: [],
      total: 0,
      // loading
      isLoading: true,
      // 查询
      form: {
        current: 1,
        name: '',
        pageNum: 1,
        size: 50
      }
    }
  },
  created () {
    this.loadRoles()
  },
  methods: {
    // 角色列表
    async loadRoles () {
      this.isLoading = true
      const { data } = await getRoles(this.form)
      if (data.code === '000000') {
        this.roles = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    // 查询
    onSubmit () {
      this.form.current = 1
      this.loadRoles()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadRoles()
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
