import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home/index'  // 重定向到首页
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView,
    children: [{
      path: 'index',
      component: () => import('../views/index/IndexView.vue')  
    },{
      path: 'video',
      component: () => import('../views/video/VideoView.vue')  
    },{
      path: 'show',
      component: () => import('../views/show/ShowView.vue')  
    },{
      path: 'me',
      component: () => import('../views/me/MeView.vue')  
    }]
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/AboutView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
