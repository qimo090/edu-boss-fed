/*
* 课程分类相关的模块
* */

import request from '@/utils/request'

// 查
export const getCourses = (data: any) => {
  return request({
    method: 'POST',
    url: '/boss/course/getQueryCourses',
    data
  })
}
