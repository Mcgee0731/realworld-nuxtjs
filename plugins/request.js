// 代替 utils/request.js 因为要添加拦截器同时获取数据，只能使用nuxt插件

import axios from 'axios'

export const request = axios.create({
  baseURL:'http://realworld.api.fed.lagounews.com/'
})
// 通过插件机制获取上下文对象，（query，params，req，res，app，store）
// 插件需要在 config中注册
// 插件导出函数必须作为默认导出
export default (context)=>{
  // console.log(context);
  const {store} = context
  request.interceptors.request.use(function (config){
    const {user} = store.state
    if(user && user.token){
      config.headers.Authorization = `Token ${user.token}`
    }
    return config
  },function (error){
    
    return Promise.reject(error)
  })
}

