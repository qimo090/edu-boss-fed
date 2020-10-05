<template>
  <div class="advert-space">
    <el-card>
      <el-button size="small">添加广告位</el-button>
    </el-card>
    <el-table :data="advertSpaces" v-loading="isLoading" stripe border>
      <el-table-column label="spaceKey" prop="spaceKey" align="center" width="120"/>
      <el-table-column label="名称" prop="name" align="center" width="180"/>
      <el-table-column label="创建时间" prop="createTime" align="center" width="250"/>
      <el-table-column label="更新时间" prop="updateTime" align="center" width="250"/>
      <el-table-column label="操作"></el-table-column>
    </el-table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { getAdvertSpace } from '@/services/advert-space'

export default Vue.extend({
  name: 'AdvertSpaceIndex',
  data () {
    return {
      isLoading: true,
      advertSpaces: []
    }
  },
  created () {
    this.loadAdvertSpaces()
  },
  methods: {
    async loadAdvertSpaces () {
      this.isLoading = true
      const { data } = await getAdvertSpace()
      this.advertSpaces = data.content
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>

</style>
