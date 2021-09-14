<template>
  <div class="settings-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">Your Settings</h1>

          <form @submit.prevent="update">
            <fieldset>
                <fieldset class="form-group">
                  <input class="form-control" type="text" placeholder="URL of profile picture" v-model="image_">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="text" placeholder="Your Name" v-model="username_">
                </fieldset>
                <fieldset class="form-group">
                  <textarea class="form-control form-control-lg" rows="8" placeholder="Short bio about you" v-model="bio_"></textarea>
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="email_">
                </fieldset>
                <fieldset class="form-group">
                  <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="password_">
                </fieldset>
                <button class="btn btn-lg btn-primary pull-xs-right">
                  Update Settings
                </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getUser,updateUser} from '@/api/user'
export default {
  name:"SettingIndex",
  middleware:'userlogin',
  async created(){
    const {data} = await getUser()
    const {user} = data
    this.image_ = user.image
    this.username_ = user.username
    this.email_ = user.email
    this.password_ = user.password
  },
  data(){
    return {
      image_:'',
      username_:'',
      bio_:'',
      email_:'',
      password_:''
    }
  },
  methods:{
    async update(){
      const {data} = await updateUser({
        user:{
          email:this.email_,
          bio:this.bio_,
          image:this.image_
        }
      })
      const {user} = data
      this.image_ = user.image
      this.username_ = user.username
      this.email_ = user.email
      this.password_ = user.password
    }
  }
}
</script>

<style>

</style>