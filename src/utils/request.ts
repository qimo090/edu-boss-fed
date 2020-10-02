import axios from 'axios'
import qs from 'qs'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'

function redirectToLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function refreshToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

const request = axios.create({})

// 请求拦截器
request.interceptors.request.use((config) => {
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = store.state.user.access_token
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

let isRefreshing = false
let requests: (() => void)[] = []
// 响应拦截器
request.interceptors.response.use((response) => {
  return response
}, async (error) => {
  if (error.response) { // 请求响应了，但是状态码不是2xx
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) {
      if (!store.state.user) {
        await redirectToLogin()
        return Promise.reject(error)
      }

      if (!isRefreshing) {
        isRefreshing = true
        return refreshToken().then(res => {
          if (!res.data.success) {
            throw new Error('刷新 Token 失败')
          }
          // 成功
          store.commit('setUser', res.data.content)
          // 重新发送请求
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(() => {
          // 失败
          store.commit('setUser', null)
          redirectToLogin()
          return Promise.reject(error)
        }).finally(() => {
          isRefreshing = false
        })
      }
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没有权限，请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务器错误，请联系管理员')
    }
  } else if (error.request) { // 请求发出去没有收到响应
    Message.error('请求超时，请刷新重试')
  } else { // 请求本身可能出现的问题
    Message.error(`请求失败：${error.message}`)
  }

  // 把请求失败的错误抛出
  return Promise.reject(error)
})

export default request
