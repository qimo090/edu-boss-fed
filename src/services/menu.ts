/*
* 菜单相关的模块
* */

import request from '@/utils/request'

interface Menu {
  // 上级菜单, -1 表示没有上级菜单
  parentId: number;
  // 菜单名称
  name: string;
  // 跳转路径
  href: string;
  // 菜单图标
  icon: string;
  // 排序
  orderNum: number;
  // 描述
  description: string;
  // 是否显示
  shown: boolean;
}

// 创建/修改菜单
export const createOrUpdateMenu = (data: Menu) => {
  return request({
    method: 'POST',
    url: '/boss/menu/saveOrUpdate',
    data
  })
}

// 获取一级菜单
export const getEditMenuInfo = (id: number | string = -1) => {
  return request({
    method: 'GET',
    url: '/boss/menu/getEditMenuInfo',
    params: {
      id
    }
  })
}

// 获取所有菜单
export const getAllMenus = () => {
  return request({
    method: 'GET',
    url: '/boss/menu/getAll'
  })
}

// 删除菜单
export const deleteMenu = (id: number) => {
  return request({
    method: 'DELETE',
    url: `/boss/menu/${id}`
  })
}
