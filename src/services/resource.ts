/*
* 资源相关的模块
* */

import request from '@/utils/request'

interface Resource {
  // 主键ID
  id: number;
  // 资源名称
  name: string;
  // 创建起始时间
  startCreateTime: string;
  // 创建结束时间
  endCreateTime: string;
  // 资源路径
  url: string;
  // 资源分类ID
  categoryId: number;
  // 当前页
  current: number;
  // 页长
  size: number;
}

// 获取资源列表
export const getResourcePages = (data: Resource) => {
  return request({
    method: 'POST',
    url: '/boss/resource/getResourcePages',
    data
  })
}

// 获取资源分类
