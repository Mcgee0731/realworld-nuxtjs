import axios from 'axios'

const request = axios.create({
  // 替换备选接口
  // baseURL:'https://conduit.productionready.io'
  baseURL:'http://realworld.api.fed.lagounews.com/'
})

// 请求拦截器 (纯客户端方式在此请求)
// 任何请求都要经过请求拦截器
// 可在请求拦截器中做公共业务处理，例如 统一设置token
// request.interceptors.request.use(function (config){
//   // console.log("config:",config)
//   // 此处无法获取 vuex中的token,nuxt 提供plugins 
//   config.headers.Authorization = `Token `
//   return config
// },function (error){
//   // 请求失败（请求还没有发出去）就会进入这里
//   return Promise.reject(error)
// })

export default request

