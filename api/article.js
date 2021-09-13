// import request from '@/utils/request'
import {request} from '@/plugins/request'

// 获取公共文章列表
export const getArticles = params =>{
  return request({
    method:'GET',
    url:'/api/articles',
    params
  })
}

// 获取关注的文章列表
export const getFeedArticles = params =>{
  return request({
    method:'GET',
    url:'/api/articles/feed',
    // 用户验证，接口要求 Authorization: Token jwt.token.here
    // 获取用户token 写在请求拦截器中，而不是这里
    // headers:{
      // Authorization: `Token 用户token`
    // },
    params
  })
}
// 点赞
export const getFavorite = slug=>{
  return request({
    method:'POST',
    url:`/api/articles/${slug}/favorite`
  })
}
// 取消点赞
export const getUnFavorite = slug=>{
  return request({
    method:'DELETE',
    url:`/api/articles/${slug}/favorite`
  })
}
// 文章详情页
export const getArticle = slug=>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}`
  })
}
// 文章评论
export const getComments = slug=>{
  return request({
    method:'GET',
    url:`/api/articles/${slug}/comments`
  })
}


// 文章评论
export const addComments = (slug,data)=>{
  return request({
    method:'POST',
    url:`/api/articles/${slug}/comments`,
    data
  })
}