// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 放在函数内
export const state = ()=>{
  return {
    // 用户登陆状态
    user:null
  }
}

export const mutations = {
  setUser(state,payload){
    state.user = payload
  }
}

const cookieparser = process.server? require('cookieparser'):undefined

export const actions = {
  // 服务端渲染期间自动调用，仅在服务端运行
  // 作用：初始化容器数据，传递数据给客户端
  nuxtServerInit({commit},{req}){
    let user = null
    if(req.headers.cookie){
      const parsed = cookieparser.parse(req.headers.cookie)
      try{
        // 把字符串还原成对象
        user = JSON.parse(parsed.user)
        // console.log(user)
      }catch(err){

      }
    }
    commit('setUser',user)
  }
}