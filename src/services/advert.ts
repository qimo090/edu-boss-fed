/*
* 广告相关的模块
* */

import request from '@/utils/request'

// 查
export const getAdvert = (data: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/getAdList',
    params: data
  })
}
