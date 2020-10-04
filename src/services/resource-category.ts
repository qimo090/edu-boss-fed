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

// 增
export const createOrUpdateCategory = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/resource/category/saveOrderUpdate',
    data
  })
}

// 删
export const deleteCategory = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/resource/category/${id}`
  })
}
