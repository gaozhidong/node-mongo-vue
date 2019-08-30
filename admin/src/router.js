import Vue from 'vue'
import Router from 'vue-router'
import Main from './views/Main.vue'
// login

import Login from './views/Login.vue'

// 分类
import CategoryEdit from './views/CategoryEdit.vue'
import CategoryList from './views/CategoryList.vue'
// 物品
import ItemEdit from './views/ItemEdit.vue'
import ItemList from './views/ItemList.vue'
// 英雄
import HeroEdit from './views/HeroEdit.vue'
import HeroList from './views/HeroList.vue'
// 文章
import ArticleEdit from './views/ArticleEdit.vue'
import ArticleList from './views/ArticleList.vue'
// 广告位
import AdEdit from './views/AdEdit.vue'
import AdList from './views/AdList.vue'

// 管理员
import AdminUserEdit from './views/AdminUserEdit.vue'
import AdminUserList from './views/AdminUserList.vue'


Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        isPublic: true,
      }
    },
    {
      path: '/',
      name: 'main',
      component: Main,
      children: [
        // 分类
        {
          path: '/categories/create',
          component: CategoryEdit
        },
        {
          path: '/categories/edit/:id',
          component: CategoryEdit,
          props: true,
        },
        {
          path: '/categories/list',
          component: CategoryList
        },
        //物品
        {
          path: '/items/create',
          component: ItemEdit
        },
        {
          path: '/items/edit/:id',
          component: ItemEdit,
          props: true,
        },
        {
          path: '/items/list',
          component: ItemList
        },
        // 英雄
        {
          path: '/heroes/create',
          component: HeroEdit
        },
        {
          path: '/heroes/edit/:id',
          component: HeroEdit,
          props: true,
        },
        {
          path: '/heroes/list',
          component: HeroList
        },
        // 文章
        {
          path: '/articles/create',
          component: ArticleEdit
        },
        {
          path: '/articles/edit/:id',
          component: ArticleEdit,
          props: true,
        },
        {
          path: '/articles/list',
          component: ArticleList
        },
        // 广告位
        {
          path: '/ads/create',
          component: AdEdit
        },
        {
          path: '/ads/edit/:id',
          component: AdEdit,
          props: true,
        },
        {
          path: '/ads/list',
          component: AdList
        },
        // 管理员
        {
          path: '/admin_users/create',
          component: AdminUserEdit
        },
        {
          path: '/admin_users/edit/:id',
          component: AdminUserEdit,
          props: true,
        },
        {
          path: '/admin_users/list',
          component: AdminUserList
        },
      ]
    },
  ]
})


router.beforeEach((to, from, next) => {
  if (!to.meta.isPublic && localStorage.token) {
    return next('/login')
  }
  next()
})


export default router