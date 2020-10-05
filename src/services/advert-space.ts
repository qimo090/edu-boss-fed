/*
* 广告位相关的模块
* */

import request from '@/utils/request'

// 查
export const getAdvertSpace = (data: any) => {
  return request({
    method: 'GET',
    url: '/front/ad/space/getAllSpaces',
    params: data
  })
}
