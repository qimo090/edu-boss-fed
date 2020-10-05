<template>
  <div class="course">
    <el-table :data="courses" v-loading="isLoading" stripe border>
      <el-table-column prop="id" label="编号" width="80" align="center"/>
      <el-table-column prop="courseName" label="课程名称" width="150"/>
      <el-table-column
        prop="price" label="价格" width="120" align="center"
        :formatter="row => row.price ? `￥${row.price}` : `￥0`"
      />
      <el-table-column prop="sortNum" label="排序" width="120" align="center"/>
      <el-table-column label="状态" width="120" align="center">
        <template slot-scope="scope">
          <i :class="['status', scope.row.status === 1 ? 'status-success' : 'status-danger']"></i>
        </template>
      </el-table-column>
      <el-table-column label="操作" min-width="120"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getCourses } from '@/services/course'

export default Vue.extend({
  name: 'CourseIndex',
  data () {
    return {
      // 课程列表
      courses: [],
      // 表单加载loading
      isLoading: true,
      // 查询表单
      form: {
        courseName: '',
        currentPage: 1,
        pageSize: 200,
        status: ''
      }
    }
  },
  created () {
    this.loadCourses()
  },
  methods: {
    async loadCourses () {
      this.isLoading = true
      const { data } = await getCourses(this.form)
      if (data.code === '000000') {
        this.courses = data.data.records
      }
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.status {
  display: inline-block;
  cursor: pointer;
  width: .875rem;
  height: .875rem;
  vertical-align: middle;
  border-radius: 50%;
}

.status-success {
  background: #51cf66;
}

.status-danger {
  background: #ff6b6b;
}
</style>
