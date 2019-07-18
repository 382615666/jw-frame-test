<template>
    <jw-frame :menus="menus" ref="frame1" title="应用系统" :currentMenuPath="currentMenuPath" :tools="['top','breadcrumb']"  style="border: 1px solid #314058;">
        <div slot="top" style="float: right">
            aaaaa
        </div>
    </jw-frame>
</template>
<script>
    import utils from '@/utils/index'
    export default {
      data () {
        return {
          currentMenuPath: '/jw-frame',
          menus: []
        }
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
                // files.js.forEach(item => {
                //   this.loadScript(item, () => {
                    // const routes = window.jw.routes
                    // if (/\/app(\.\w+)?.js$/.test(item)) {
                    //   resolve()
                      // setTimeout(() => {
                      //   window.jw.app.$router.addRoutes(routes[routes.length - 1])
                      // }, 500)
                    // }
                  // })
                // })
              })
            })
          })
          Promise.all(promises).then(() => {
            setTimeout(() => {
              window.jw.routes.forEach(item => {
                window.jw.app.$router.addRoutes(item)
              })
              // window.jw.routes 此处的数据格式为 [file1路由 = [], file2路由 = [] ...]
              const routes = utils.mergeArrayRoute([...window.jw.routes, window.jw.app.$router.options.routes])
              console.log(utils.formatRoute(routes[0].children))
              this.menus = utils.formatRoute(routes[0].children)
              // console.log(this.menus)
            }, 300)
          }).catch((e) => {
            window.console.error('js文件加载失败，请确认js文件是否存在！')
          })
        }
      },
      mounted() {
        this.load()
      }
    }
</script>
