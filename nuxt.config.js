module.exports = {
  router:{
    // 给导航按钮添加高亮样式
    linkActiveClass:'active',
    // 自定义router
    extendRoutes(routes,resolve){
      // 删除默认 router配置
      routes.splice(0)
      // ...[] 不然每次都要写 push
      routes.push(...[
        {
          path:'/',
          component:resolve(__dirname,'pages/layout/'),
          children:[
            {
              path:'',
              name:'home',
              component:resolve(__dirname,'pages/home/')
            },
            {
              path:'/login',
              name:'login',
              component:resolve(__dirname,'pages/login/')
            },
            {
              path:'/register',
              name:'register',
              component:resolve(__dirname,'pages/login/')
            },
            {
              path:'/profile/:username',
              name:'profile',
              component:resolve(__dirname,'pages/profile/')
            },
            {
              path:'/settings',
              component:resolve(__dirname,'pages/setting/')
            },
            {
              path:'/editor',
              component:resolve(__dirname,'pages/editor/')
            },
            {
              path:'/article/:slug',
              name:'article',
              component:resolve(__dirname,'pages/article/')
            }
          ]
        }
      ])
    }
  },
  // 注册插件
  plugins:[
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}