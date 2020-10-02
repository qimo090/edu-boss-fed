/*
* 用户相关的模块
* */

import qs from 'qs'
import request from '@/utils/request'

interface User {
  phone: string;
  password: string;
}

export const login = (data: User) => {
  return request({
    method: 'POST',
    url: '/front/user/login',
    data: qs.stringify(data)
  })
}

export const getUserInfo = () => {
  return request({
    method: 'get',
    url: '/front/user/getInfo'
  })
}
