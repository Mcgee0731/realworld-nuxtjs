<template>
  <div class="profile-page">

    <div class="user-info">
      <div class="container">
        <div class="row">

          <div class="col-xs-12 col-md-10 offset-md-1">
            <img :src="user.image" class="user-img" />
            <h4>{{user.username}}</h4>
            <p>
              {{user.bio}}
            </p>
            <button class="btn btn-sm btn-outline-secondary action-btn" @click="goSetting">
              <i class="ion-plus-round"></i>
              &nbsp;
              Edit Profile Settings 
            </button>
          </div>

        </div>
      </div>
    </div>

    <div class="container">
      <div class="row">

        <div class="col-xs-12 col-md-10 offset-md-1">
          <div class="articles-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'profile',query:{tab:'my_article'}}" :class="{active:tab==='my_article'}" exact>My Articles</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'profile',query:{tab:'favorited_article'}}" :class="{active:tab==='favorited_article'}" exact>Favorited Articles</nuxt-link>
              </li>
            </ul>
          </div>

          <div v-for="article in articles" :key="article.slug" class="article-preview" >
            <div class="article-meta">
              <nuxt-link :to="{name:'profile',params:{username:article.author.username}}"><img src="http://i.imgur.com/Qr71crq.jpg" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{name:'profile',params:{username:article.author.username}}" class="author">{{article.author.username}}}</nuxt-link>
                <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active:article.favorited}">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

        </div>

      </div>
    </div>

  </div>
</template>

<script>
import  { mapState } from 'vuex'
import { getArticles } from '@/api/article'
export default {
  name:'ProfileIndex',
  middleware:'userlogin',
  computed:{
    ...mapState(['user'])
  },
  methods:{
    goSetting(){
      this.$router.push('/settings')
    }
  },
  async asyncData({store,query}){
    // console.log(query.tab)
    let tab = query.tab || 'my_article'
    let listObj = store.state.user &&  tab === 'my_article'
    ? {
      author:store.state.user.username
    }
    : {
      favorited:store.state.user.username
    }
    
    const {data} = await getArticles(listObj)
    // console.log(data);
    const {articles,articlesCount} = data

    return {
      articles,
      articlesCount,
      tab
    }
  },
  watchQuery:['tab']
}
</script>

<style>

</style>