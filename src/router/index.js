import Vue from 'vue'
import Router from 'vue-router'

// import Index from '@/pages/Index/template.vue'
// import Login from '@/pages/Login/template.vue'
// import Create from '@/pages/Create/template.vue'
// import Detail from '@/pages/Detail/template.vue'
// import My from '@/pages/My/template.vue'
// import User from '@/pages/User/template.vue'
// import Register from '@/pages/Register/template.vue'
// import Edit from '@/pages/Edit/template.vue'
import { store } from '../store'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      component: () => import ('@/pages/Index/template.vue')
    },
    {
      path: '/user/:userId',
      component: () => import ('@/pages/User/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/detail/:blogId',
      component: () => import ('@/pages/Detail/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/my',
      component: () => import ('@/pages/My/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/edit/:blogId',
      component: () => import ('@/pages/Edit/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/login',
      component: () => import ('@/pages/Login/template.vue')
    },
    {
      path: '/create',
      component: () => import ('@/pages/Create/template.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/register',
      component: () => import ('@/pages/Register/template.vue')
    }
  ]
})

// const router = new Router({
//   routes: [
//     {
//       path: '/',
//       component: Index
//     },
//     {
//       path: '/user/:userId',
//       component: User,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/detail/:blogId',
//       component: Detail,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/my',
//       component: My,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/edit/:blogId',
//       component: Edit,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/login',
//       component: Login
//     },
//     {
//       path: '/create',
//       component: Create,
//       meta: { requiresAuth: true }
//     },
//     {
//       path: '/register',
//       component: Register
//     }
//   ]
// })

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    store.dispatch('checkLogin').then(isLogin =>{
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath }
        })
      } else {
        next()
      }
    })
  } else {
    next() // 确保一定要调用 next()
  }
})

export default router;