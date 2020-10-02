/*
* 资源分类相关的模块
* */

import request from '@/utils/request'

// 获取资源分类列表
export const getResourceCategories = () => {
  return request({
    method: 'GET',
    url: '/boss/resource/category/getAll'
  })
}
