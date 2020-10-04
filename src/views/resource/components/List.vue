<template>
  <div class="resource-list">
    <el-card shadow="never">
      <el-form ref="form" inline :model="form" label-width="80px" size="mini">
        <el-form-item prop="name" label="资源名称">
          <el-input size="small" v-model="form.name" placeholder="请输入资源名称"/>
        </el-form-item>
        <el-form-item prop="url" label="资源路径">
          <el-input size="small" v-model="form.url" placeholder="请输入资源路径"/>
        </el-form-item>
        <el-form-item prop="categoryId" label="资源分类">
          <el-select
            size="small"
            v-model="form.categoryId"
            placeholder="全部"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in resourceCategories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            size="small"
            type="primary"
            @click="onSubmit"
            :disabled="isLoading"
          >查询搜索
          </el-button>
          <el-button
            size="small"
            @click="onReset"
            :disabled="isLoading"
          >重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card shadow="never">
      <el-button size="small" @click="handleCreate">添加</el-button>
      <el-button size="small" @click="$router.push({ name: 'resource-category' })">资源分类</el-button>
    </el-card>
    <el-table
      :data="resources"
      stripe
      border
      style="width: 100%; margin-bottom: 20px"
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
        width="180">
      </el-table-column>
      <el-table-column
        prop="url"
        width="250"
        label="资源路径">
      </el-table-column>
      <el-table-column
        prop="description"
        width="180"
        label="描述">
      </el-table-column>
      <el-table-column
        width="180"
        prop="createdTime"
        :formatter="row => new Date(row.createdTime).toLocaleString()"
        label="添加时间">
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

    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :disabled="isLoading"
      :current-page.sync="form.current"
      :page-sizes="[5, 10, 20]"
      :page-size="form.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!-- create/update -->
    <el-dialog
      width="500px"
      :visible.sync="modifyVisible"
      :title="isEdit ? '编辑资源' : '添加资源'"
      class="dialog-form"
    >
      <el-form ref="modifyForm" :rules="modifyRules" :model="modifyForm" label-width="120px">
        <el-form-item label="资源名称" prop="name">
          <el-input size="small" v-model="modifyForm.name" placeholder="请输入资源名称"/>
        </el-form-item>
        <el-form-item label="资源路径" prop="url">
          <el-input size="small" v-model="modifyForm.url" placeholder="请输入资源路径"/>
        </el-form-item>
        <el-form-item label="资源分类" prop="categoryId">
          <el-select
            size="small"
            v-model="modifyForm.categoryId"
            placeholder="全部"
            clearable
          >
            <el-option
              :label="item.name"
              :value="item.id"
              v-for="item in resourceCategories"
              :key="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input
            type="textarea"
            :autosize="{ minRows: 6, maxRows: 6 }" size="small" v-model="modifyForm.description"
            placeholder="请输入资源描述"
          />
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
import { createOrUpdateResource, deleteResource, getResourcePages } from '@/services/resource'
import { getResourceCategories } from '@/services/resource-category'

export default Vue.extend({
  name: 'ResourceList',
  data () {
    return {
      // 资源列表
      resources: [],
      // 表单加载loading
      isLoading: true,
      // 资源分类列表
      resourceCategories: [],
      // 列表数据总数量
      total: 0,
      // 查询表单
      form: {
        name: '',
        url: '',
        // 页码
        current: 1,
        // 页长
        size: 10,
        // 资源分类ID
        categoryId: null
      },
      // ===== create/update =====
      // 判定是否是编辑
      isEdit: false,
      // 是否显示弹框
      modifyVisible: false,
      // 添加/修改 表单数据
      modifyForm: {
        // 资源唯一标识 创建时为null
        id: null,
        // 资源名称
        name: '测试资源001',
        // 资源路径
        url: '/boss/course/lesson/001',
        // 资源分类ID
        categoryId: null,
        // 描述
        description: '测试'
      },
      // 添加/修改 规则
      modifyRules: {
        name: [
          { required: true, message: '请输入资源名称', trigger: 'blur' }
        ],
        url: [
          { required: true, message: '请输入资源路径', trigger: 'blur' }
        ],
        categoryId: [
          // { required: true, message: '请选择资源分类', trigger: 'change' }
        ],
        description: [
          { required: false, message: '请输入资源描述', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.loadResources()
    this.loadResourcesCategories()
  },
  methods: {
    async loadResources () {
      this.isLoading = true
      const { data } = await getResourcePages(this.form)
      if (data.code === '000000') {
        this.resources = data.data.records
        this.total = data.data.total
      }
      this.isLoading = false
    },
    async loadResourcesCategories () {
      const { data } = await getResourceCategories()
      console.log(data)
      if (data.code === '000000') {
        this.resourceCategories = data.data
      }
    },
    // 查询
    onSubmit () {
      this.form.current = 1
      this.loadResources()
    },
    // 添加按钮事件
    handleCreate () {
      this.modifyVisible = true
      this.isEdit = false
    },
    // 添加表单提交
    async onModifySubmit () {
      this.isLoading = true
      try {
        // 表单验证
        await (this.$refs.modifyForm as Form).validate
        // 发起请求
        const { data } = await createOrUpdateResource(this.modifyForm)
        // 请求响应校验
        if (data.code === '000000') {
          this.$message.success('提交成功')
          // 关闭弹框
          this.modifyVisible = false
          // 重载表格
          await this.loadResources()
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
    // 编辑按钮事件
    handleEdit (item: any) {
      // 弹框
      this.modifyVisible = true
      // 区分出创建还是编辑
      this.isEdit = true
      // 表单数据回填
      this.modifyForm = { ...item }
    },
    // 删除按钮事件
    handleDelete (item: any) {
      this.$confirm('确认删除吗？', '删除提示', {})
        .then(async () => {
          // 请求删除操作
          const { data } = await deleteResource(item.id)
          if (data.code === '000000') {
            this.$message.success('删除成功')
            await this.loadResources() // 更新数据列表
          }
        })
        .catch(err => {
          console.log(err)
          this.$message.info('已取消删除')
        })
    },
    handleSizeChange (val: number) {
      this.form.size = val
      this.form.current = 1 // 每页大小改变重新查询第1页数据
      this.loadResources()
    },
    handleCurrentChange (val: number) {
      // 请求获取对应页码的数据
      this.form.current = val // 修改要查询的页码
      this.loadResources()
    },
    onReset () {
      (this.$refs.form as Form).resetFields()
      this.form.current = 1 // 重置回到第1页
      this.loadResources()
    }
  }
})
</script>

<style lang="scss" scoped>
.dialog-form {
  .el-input, .el-select, .el-textarea {
    width: 250px;
  }
}
</style>
