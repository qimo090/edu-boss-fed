<template>
  <div class="advert">
    <el-card>
      <el-button size="small">添加广告</el-button>
    </el-card>
    <el-table
      :data="adverts"
      stripe
      border
      v-loading="isLoading"
    >
      <el-table-column prop="id" label="编号" align="center" width="120"/>
      <el-table-column prop="name" label="广告名称" align="center" width="120"/>
      <el-table-column prop="spaceId" label="广告位置" align="center" width="150"/>
      <el-table-column prop="img" label="广告图片" align="center" width="150">
        <template slot-scope="scope">
          <el-image
            :src="scope.row.img" :alt="scope.row.name" style="height: 80px"
            :preview-src-list="[scope.row.img]"
          />
        </template>
      </el-table-column>
      <el-table-column prop="id" label="时间" align="center" width="250">
        <template slot-scope="scope">
          <p>开始时间：{{ scope.row.startTimeFormatString }}</p>
          <p>到期时间：{{ scope.row.endTimeFormatString }}</p>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="上线/下线" align="center" width="120">
        <template slot-scope="scope">
          <el-switch
            :value="scope.row.status === 1"
            active-color="#40586f"
            inactive-color="#dcdfe6">
          </el-switch>
        </template>
      </el-table-column>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdvert } from '@/services/advert'

export default Vue.extend({
  name: 'AdvertIndex',
  data () {
    return {
      adverts: [],
      isLoading: true
    }
  },
  created () {
    this.loadAdverts()
  },
  methods: {
    async loadAdverts () {
      this.isLoading = true
      const { data } = await getAdvert()
      this.adverts = data.content
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
