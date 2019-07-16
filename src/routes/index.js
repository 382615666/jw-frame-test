import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/app/layout')
  }
]

export default routes
