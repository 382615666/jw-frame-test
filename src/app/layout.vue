<template>
    <jw-frame :menus="menus" ref="frame1" title="应用系统" :currentMenuPath="currentMenuPath" :tools="['top','breadcrumb']"  style="border: 1px solid #314058;">
        <div slot="top" style="float: right">
            aaaaa
        </div>
    </jw-frame>
</template>
<script>
    export default {
      data () {
        return {
          currentMenuPath: '/jw-frame',
          menus: [{
            id: '0ebb95b7-8f13-4ef8-ba2f-01dd4a6994dc',
            title: '系统管理',
            icon: 'fa fa-qrcode',
            path: '/jw-frame',
            component: {
              template: `<h1> 应用页面 </h1>`
            },
            children: []
          }, {
            id: '1c516407-4a29-404a-8835-c9d72d939095',
            title: '客户管理',
            icon: 'fa fa-rss-square',
            path: '/customer',
            children: [{
              id: '1c516407-4a29-404a-8835-c9d72d939095',
              title: '客户资料',
              icon: 'fa fa-rss-square',
              path: '/customer/customer',
              component: {
                template: `<h1> 应用页面 </h1>`
              }
            },
              {
                id: '1c516407-4a29-404a-8835-c9d72d939095',
                title: '联系人资料',
                icon: 'fa fa-rss-square',
                path: '/customer/contact',
                component: {
                  template: `<h1> 应用页面 </h1>`
                }
              }]
          }]
        }
      }
    }
</script>
