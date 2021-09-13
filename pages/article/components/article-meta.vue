<template>
  <div class="article-meta">
    <nuxt-link 
      :to="{name:'profile',params:{username:article.author.username}}">
        <img :src="article.author.image" />
    </nuxt-link>
    <div class="info">
      <nuxt-link 
        :to="{name:'profile',params:{username:article.author.username}}" class="author">
        {{article.author.username}}
      </nuxt-link>
      <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
    </div>
    <button class="btn btn-sm btn-outline-secondary" :class="{active:article.author.following}" @click="followfnc">
      <i class="ion-plus-round"></i>
      &nbsp;
      {{article.author.following?"Follow":"UnFollow"}} {{article.author.username}} <span class="counter"></span>
    </button>
    &nbsp;&nbsp;
    <button class="btn btn-sm btn-outline-primary" :class="{active:article.author.favorited}" @click="favoritefnc">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">({{article.author.favoritesCount?article.author.favoritesCount:0}})</span>
    </button>
  </div>
</template>

<script>
import {followUser,unfollowUser} from '@/api/user'
import {getFavorite,getUnFavorite} from '@/api/article'
export default {
  props:{
    article:{
      type: Object,
      required: true
    }
  },
  methods:{
    async followfnc(){
      // console.log(this.article)
      if(this.article.author.following){
        await unfollowUser(this.article.author.username)
        this.article.author.following = false
      }else
      {
        await followUser(this.article.author.username)
        this.article.author.following = true
      }
    },
    async favoritefnc(){
      if(this.article.favorited){
        await getUnFavorite(this.article.slug)
        this.article.favorited = false
      }else
      {
        await getFavorite(this.article.slug)
        this.article.favorited = true
      }
    }
  }
}
</script>

<style>

</style>