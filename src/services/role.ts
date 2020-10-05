/*
* 角色分类相关的模块
* */

import request from '@/utils/request'

// 获取资源分类列表
export const getRoles = (data: any) => {
  return request({
    method: 'POST',
    url: 'boss/role/getRolePages',
    data
  })
}

// // 增
// export const createOrUpdateCategory = (data: any) => {
//   return request({
//     method: 'POST',
//     url: 'boss/resource/category/saveOrderUpdate',
//     data
//   })
// }
//
// // 删
// export const deleteCategory = (id: number) => {
//   return request({
//     method: 'DELETE',
//     url: `/boss/resource/category/${id}`
//   })
// }
