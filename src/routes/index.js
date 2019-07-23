import VueRouter from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('@/app/layout'),
    children: [
      {
        path: 'heihei',
        meta: {
          title: 'heihei'
        },
        component: () => import('@/app/heihei')
      }
    ]
  }
]

export default routes
