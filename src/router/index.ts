import Vue from 'vue'
import store from '@/store'
import VueRouter, { RouteConfig } from 'vue-router'
import Layout from '@/layout/index.vue'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: 'login' */'@/views/login/index.vue')
  },
  {
    path: '/',
    component: Layout,
    meta: {
      requiresAuth: true
    },
    children: [
      {
        path: '/',
        name: 'home',
        meta: {
          title: '首页'
        },
        component: () => import(/* webpackChunkName: 'home' */'@/views/home/index.vue')
      },
      {
        path: '/role',
        name: 'role',
        meta: {
          title: '角色列表'
        },
        component: () => import(/* webpackChunkName: 'role' */'@/views/role/index.vue')
      },
      {
        path: '/menu',
        name: 'menu',
        meta: {
          title: '菜单列表'
        },
        component: () => import(/* webpackChunkName: 'menu' */'@/views/menu/index.vue')
      },
      {
        path: '/menu/create',
        name: 'menu-create',
        meta: {
          title: '添加菜单'
        },
        component: () => import(/* webpackChunkName: 'menu-create-edit' */'@/views/menu/create.vue')
      },
      {
        path: '/menu/:id/edit',
        name: 'menu-edit',
        meta: {
          title: '编辑菜单'
        },
        component: () => import(/* webpackChunkName: ''menu-create-edit' */'@/views/menu/edit.vue')
      },
      {
        path: '/resource',
        name: 'resource',
        meta: {
          title: '资源列表'
        },
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/index.vue')
      },
      {
        path: '/resource_category',
        name: 'resource-category',
        meta: {
          title: '资源分类'
        },
        component: () => import(/* webpackChunkName: 'resource' */'@/views/resource/category.vue')
      },
      {
        path: '/course',
        name: 'course',
        meta: {
          title: '课程管理'
        },
        component: () => import(/* webpackChunkName: 'course' */'@/views/course/index.vue')
      },
      {
        path: '/user',
        name: 'user',
        meta: {
          title: '用户管理'
        },
        component: () => import(/* webpackChunkName: 'user' */'@/views/user/index.vue')
      },
      {
        path: '/advert',
        name: 'advert',
        meta: {
          title: '广告列表'
        },
        component: () => import(/* webpackChunkName: 'advert' */'@/views/advert/index.vue')
      },
      {
        path: '/advert-space',
        name: 'advert-space',
        meta: {
          title: '广告位列表'
        },
        component: () => import(/* webpackChunkName: 'advert-space' */'@/views/advert-space/index.vue')
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: '404' */'@/views/error-page/404.vue')
  }
]

const router = new VueRouter({
  routes
})

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (store.state.user) {
      next()
    } else {
      next({
        name: 'login',
        query: {
          redirect: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
