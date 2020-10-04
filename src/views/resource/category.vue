<template>
  <div>
    <el-card shadow="never">
      <el-button size="small" @click="handleCreate">添加</el-button>
    </el-card>
    <el-table
      :data="categories"
      stripe
      border
      style="width: 100%"
      v-loading="isLoading"
    >
      <el-table-column
        prop="id"
        label="编号"
        width="100"
        align="center"
      >
      </el-table-column>
      <el-table-column
        prop="name"
        label="资源名称"
        align="center"
        width="180">
      </el-table-column>
      <el-table-column
        width="180"
        prop="createdTime"
        align="center"
        label="创建时间">
      </el-table-column>
      <el-table-column
        prop="sort"
        label="排序"
        align="center"
        width="150">
      </el-table-column>
      <el-table-column
        min-width="180"
        label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 添加/编辑 -->
    <el-dialog
      :visible.sync="modifyVisible"
      width="500px"
      :title="isEdit ? '编辑分类' : '添加分类'"
    >
      <el-form :model="modifyForm" :rules="modifyRules" label-width="120px" ref="modifyForm">
        <el-form-item label="名称" prop="name">
          <el-input size="small" v-model="modifyForm.name" placeholder="请输入资源名称"/>
        </el-form-item>
        <el-form-item label="排序" prop="sort">
          <el-input-number size="small" v-model="modifyForm.sort" controls-position="right" :min="0"/>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="onModifySubmit">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { createOrUpdateCategory, deleteCategory, getResourceCategories } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceCategory',
  data () {
    return {
      // loading 状态
      isLoading: true,
      // 资源分类 表格
      categories: [],
      // 弹框显隐
      modifyVisible: false,
      // 表单
      modifyForm: {
        // 资源名称
        name: '',
        // 排序
        sort: 0
      },
      // 表单校验规则
      modifyRules: {},
      // 创建/编辑
      isEdit: false
    }
  },
  created () {
    this.loadResourcesCategories()
  },
  methods: {
    async loadResourcesCategories () {
      this.isLoading = true
      const { data } = await getResourceCategories()
      if (data.code === '000000') {
        this.categories = data.data
      }
      this.isLoading = false
    },
    // 添加按钮事件
    handleCreate () {
      this.modifyVisible = true
      this.isEdit = false
    },
    // 编辑按钮事件
    handleEdit (item: any) {
      // 弹框
      this.modifyVisible = true
      // 区分出创建还是编辑
      this.isEdit = true
      // 表单数据回填
      this.modifyForm = { ...item }
    },
    // 添加表单提交
    async onModifySubmit () {
      this.isLoading = true
      try {
        // 表单验证
        await (this.$refs.modifyForm as Form).validate
        // 发起请求
        const { data } = await createOrUpdateCategory(this.modifyForm)
        // 请求响应校验
        if (data.code === '000000') {
          this.$message.success('提交成功')
          // 关闭弹框
          this.modifyVisible = false
          // 重载表格
          await this.loadResourcesCategories()
          // 重置表单
          await (this.$refs.modifyForm as Form).resetFields()
        } else {
          this.$message.error(data.message)
        }
      } catch (err) {
        console.log('提交失败', err)
      } finally {
        this.isLoading = false
      }
    },
    // 删除按钮事件
    handleDelete (item: any) {
      this.$confirm('是否要删除该分类?', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          const { data } = await deleteCategory(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            await this.loadResourcesCategories() // 更新数据列表
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    }
  }
})
</script>

<style lang="scss" scoped>
.el-input, .el-input-number {
  width: 250px;
}
</style>
