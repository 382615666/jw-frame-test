import Vue from 'vue'
import VueRouter from 'vue-router'
import Element from 'element-ui'

import VueComponents from '@jw/vue-components-v2'

import 'element-ui/lib/theme-chalk/index.css';

import root from './routes'

import App from './App.vue'
import utils from '@/utils'

Vue.config.productionTip = false

Vue.use(Element)
Vue.use(VueRouter)
Vue.use(VueComponents)

export default {
  init (el = '#app', routes = [], options = {}) {
    const index = routes.findIndex (item => item.path === '/')
    // 寻找 /  路径
    if (~index) {
      routes = utils.mergeRoute(routes, root)
    } else {
      routes.push(root)
    }
    const router = new VueRouter({
      routes
    })
    options = Object.assign({
      ...options
    }, {
      router,
      render: h => h(App)
    })
    window.jw = window.jw || {}
    window.jw.app = new Vue(options).$mount(el)
  }
}
