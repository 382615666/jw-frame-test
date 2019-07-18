import app from './app'

const routes = [
  {
    path: '/',
    children: [
      {
        path: 'jw-frame',
        meta: {
          title: 'frame'
        },
        component: {
          template: `<h1> 应用页面 </h1>`
        }
      }
    ]
  }
]

app.init('#app', routes)
