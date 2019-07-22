<template>
  <router-view  :menus="menus" :currentMenuPath="currentMenuPath"></router-view>
</template>
<script>
  import routes from '@/routes'
  import utils from '@/utils/index'
  export default {
    data () {
      return {
        currentMenuPath: '',
        menus: []
      }
    },
    beforeCreate () {
      this.$router.beforeEach((to, from, next) => {
        this.currentMenuPath = to.path
        next()
      })
    },
    created() {
    },
    methods: {
      loadScript: utils.loadFile('script'),
      loadCss: utils.loadFile('link', {
        src: 'href',
        parent: document.head,
        attrs: {
          rel: 'stylesheet'
        }
      }),
      load () {
        const promises = window.jw.sources.map(item => {
          return new Promise(resolve => {
            this.loadScript(item, () => {
              const assets = window.jw.assets
              const files = assets[assets.length - 1]
              files.css.forEach(item => {
                this.loadCss(item)
              })
              // chunk-vendor.[hash].js
              this.loadScript(`${files.js[0]}?t=${Date.now()}`)
              // app.[hash].js
              this.loadScript(`${files.js[1]}?t=${Date.now()}`, () => {
                resolve()
              })
            })
          })
        })
        Promise.all(promises).then(() => {
          setTimeout(() => {
            let temp = []
            window.jw.routes.map(item => {
              item.forEach(it => {
                temp.push(it)
              })
            })
            routes[0].children = temp
            window.jw.app.$router.addRoutes(routes)
            // window.jw.routes 此处的数据格式为 [file1路由 = [], file2路由 = [] ...]
            this.menus = utils.formatRoute(utils.mergeArrayRoute([window.jw.app.$router.options.routes[0].children, ...window.jw.routes]))
            this.currentMenuPath = this.$route.fullPath
          }, 200)
          }).catch(e => {
          window.console.error(e)
        })
      }
    },
    mounted() {
      this.load()
    }
  }
</script>
