<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{isLogin ? 'Sign in' : 'Sign up'}}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <!-- <a href="">Need an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <!-- 这里有个双层遍历 errors 格式 {xxx:["xxx","bbbb"]} 使用占位符，不生成dom -->
            <template v-for="(val,key) in errors">
              <li v-for="(item,index) in val" :key="index">{{key}}{{item}}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset v-if="!isLogin" class="form-group">
              <input v-model="user.username" class="form-control form-control-lg" type="text" placeholder="Your Name">
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.email" class="form-control form-control-lg" type="email" placeholder="Email" required>
            </fieldset>
            <fieldset class="form-group">
              <input v-model="user.password" class="form-control form-control-lg" type="password" placeholder="Password" minlength="8" required>
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{isLogin ? 'Sign in' : 'Sign up'}}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { login, register } from '@/api/user'
// 仅在客户端加载 js-cookie
const Cookie = process.client ? require('js-cookie'): undefined
export default {
  name:'LoginIndex',
  middleware:'notuserlogin',
  computed:{
    isLogin(){
      // console.log(this.$route)
      // 注意下，router必须在config设置，才能有name
      return this.$route.name === 'login'
    }
  },
  data(){
    return {
      user:{
        username:'',
        email:'',
        password:''
      },
      errors:{}
    }
  },
  methods:{
    async onSubmit(){
      try {
        const {data} = this.isLogin 
        ? await login({
          user:this.user
        }) 
        : await register({
          user:this.user
        })
        // 获取服务器返回的登陆信息
        console.log(data.user)
        
        // 保存用户登陆状态
        this.$store.commit('setUser',data.user)
        // 数据持久化
        Cookie.set('user',JSON.stringify(data.user))
        
        // 页面跳转 
        this.$router.push('/')

      } catch (error) {
        // console.dir(error)
        this.errors = error.response.data.errors
      }
    }
  }
}
</script>

<style>

</style>