<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">NustJS Conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li v-if="user" class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'home',query:{tab:'your_feed'}}" :class="{active:tab === 'your_feed'}" exact>Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'home',query:{tab:'global_feed'}}" :class="{active:tab==='global_feed'}" exact>Global Feed</nuxt-link>
              </li>
              <li v-if="tag" class="nav-item">
                <nuxt-link class="nav-link" :to="{name:'home',query:{tab:'tag',tag:tag}}" :class="{active:tab==='tag'}" exact>#{{tag}}</nuxt-link>
              </li>
            </ul>
          </div>
          <div v-for="article in articles" :key="article.slug" class="article-preview">
            <div class="article-meta">
              <!-- <a href="profile.html"><img src="http://i.imgur.com/Qr71crq.jpg" /></a> -->
              <nuxt-link :to="{name:'profile',params:{username:article.author.username}}">
                <img :src="article.image" />
              </nuxt-link>
              <div class="info">
                <!-- <a href="" class="author">Eric Simons</a> -->
                <nuxt-link to="" class="author">
                  {{article.author.username}}
                </nuxt-link>  
                <!-- 推荐一个 处理日期的轻量 包 dayjs -->
                <span class="date">{{article.createdAt | date('MMM DD,YYYY')}}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" :class="{active:article.favorited}" @click="onFavorite(article)" :disabled="article.favoriteDisabled">
                <i class="ion-heart"></i> {{article.favoritesCount}}
              </button>
            </div>
            <nuxt-link :to="{name:'article',params:{slug:article.slug}}" class="preview-link">
              <h1>{{article.title}}</h1>
              <p>{{article.description}}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>

          <nav>
            <ul class="pagination">
              <li v-for="page in totalPage" :key="page" class="page-item" :class="{active:page === pageIdx}">
                <!-- 这里用a，是因为 a会刷新页面 这样重新调用 asyncData传入新页码，并加载 -->
                <!-- <a class="page-link" :href="'/?page='+page">{{page}}</a> -->

                <!-- query变化不会导致页面刷新，不会调用 asyncData，为了解决使用 watchQuery  -->
                <nuxt-link class="page-link" :to="{name:'home',query:{page:page,tag:$route.query.tag,tab:tab}}">{{page}}</nuxt-link>
              </li>
            </ul>
          </nav>

        </div>

        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>

            <div class="tag-list">
              <nuxt-link v-for="item in tags" :key="item" :to="{name:'home',query:{tag:item,tab:'tag'}}" class="tag-pill tag-default">{{item}}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
import {getArticles,getFeedArticles,getFavorite,getUnFavorite} from '@/api/article'
import {getTags} from '@/api/tag'
import { mapState } from 'vuex'
export default {
  name:'HomeIndex',
  async asyncData({query,store}){
    let pageIdx = Number.parseInt(query.page || 1) // 我们希望通过，页签 localhost:3000/?page="xxx"访问
    let limit = 50 // 每页几条
    // const {data} = await getArticles({
    //   limit,
    //   offset: ( pageIdx-1 ) * limit
    // })
    // console.log(data)
    
    // const {data:dataTags} = await getTags()
    // console.log(dataTags)
    
    const {tag} = query
    const tab = query.tab || 'global_feed'
    // 判断 所有 or 喜欢文章列表，需要身份验证
    // Authorization: Token jwt.token.here
    const loadArticles = store.state.user && tab === 'your_feed' 
    ? getFeedArticles
    : getArticles

    const [articleRes, tagRes] = await Promise.all([
      loadArticles({
        limit,
        offset:( pageIdx-1 ) * limit,
        tag
      }),
      getTags()
    ])
    
    const { articles, articlesCount } =  articleRes.data
    const { tags } = tagRes.data

    // 增加属性，对点赞按钮实现禁用
    articles.forEach(article=>article.favoriteDisabled = false)

    // 返回要给对象可以直接用
    return {
      articles,
      articlesCount,
      limit,
      pageIdx,
      tags,
      tag,
      tab
    }
  },
  computed:{
    totalPage(){
      return Math.ceil(this.articlesCount / this.limit)
    },
    ...mapState(['user'])
  },
  // 处理 query变化，数组接收多个参数，触发监听 /?page=
  watchQuery:['page','tag','tab'],
  methods:{
    async onFavorite(article){
      // console.log(article);
      article.favoriteDisabled = true
      if(article.favorited){
        // 取消点赞
        await getUnFavorite(article.slug)
        article.favorited = false
        article.favoritesCount-=1
      }else{
        // 添加点赞
        await getFavorite(article.slug)
        article.favorited = true
        article.favoritesCount+=1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>