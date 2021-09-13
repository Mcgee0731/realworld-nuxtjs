<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{article.title}}</h1>
        <!-- 个人信息条 -->
        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <div class="col-md-12" v-html="article.body">
          <!-- <p>
          Web development technologies have evolved at an incredible clip over the past few years.
          </p>
          <h2 id="introducing-ionic">Introducing RealWorld.</h2>
          <p>It's a great solution for learning how other frameworks work.</p> -->
        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">
        <div class="col-xs-12 col-md-8 offset-md-2">
          <article-comments :article="article" />
        </div>
      </div>

    </div>

  </div>
</template>

<script>
import {getArticle} from '@/api/article'
import MarkdownIt from 'markdown-it'
import ArticleMeta from './components/article-meta.vue'
import ArticleComments from './components/article-comments.vue'
export default {
  components: { ArticleMeta, ArticleComments },
  async asyncData({params}){
    const {data} = await getArticle(params.slug)
    // console.log(data)
    const {article} = data
    const md = new MarkdownIt()
    article.body = md.render(article.body)
    return {
      article
    }
  },
  // 定制页面 Meta
  head(){
    return {
      title:`${this.article.title} - RealWorld`,
      meta:[
        // hid 唯一标识，子组件覆盖父组件 建议和 name一致
        {hid:'description',name:'description',content:this.article.description}
      ]
    }
  }
}
</script>

<style>

</style>