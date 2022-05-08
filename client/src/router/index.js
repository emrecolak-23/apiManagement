import { createRouter, createWebHistory } from 'vue-router'
import { isTokenExist } from '@/utils';
import store from '@/store';
const routes = [
  {
    name: 'HomeView',
    path: '/',
    component: () => import('@/views/HomeView.vue'),
    beforeEnter: async (to, from, next) => {
      // ...
      if(isTokenExist()) {
        const result = await store.dispatch('auth/authorize', localStorage.token)
        if (result){
          next();
        } else {
          next({name: 'LoginView'})
        }
      } else {
        next({name:'LoginView'})
      }
    },
    children: [
      {
        path: '/',
        component: () => import('@/components/Dashboard/DashboardContent.vue'),
        name: 'DashboardContent',
      },
      {
        path: 'api-create',
        component: () => import('@/components/Api/ApiCreate.vue'),
        name: 'ApiCreate',
      },
      {
        path: 'api-list',
        component: () => import('@/components/Api/ApiList.vue'),
        name: 'ApiList'
      },
      {
        path: '/error',
        component: () => import('@/components/Api/ApiError.vue'),
        name: 'ApiError'
      },
      {
        path: '/:slug',
        component: () => import('@/components/Api/ApiDetail.vue'),
        name: 'ApiDetail'
      },
      {
        path: 'account-activity',
        component: () => import('@/components/Account/AccountActivities.vue'),
        name: 'AccountActivities'
      },
      {
        path: 'account-settings',
        component: () => import('@/components/Account/AccountSettings.vue'),
        name: 'AccountSettings'
      }
    ]
  },
  {
    name: 'LoginView',
    path: '/login',
    component: () => import('@/views/LoginView.vue'),
    beforeEnter: (to, from, next) => {
      if(!isTokenExist()) {
        next()
      } else {
        next({name: 'HomeView'})
      }
    }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
