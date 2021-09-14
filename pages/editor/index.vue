<template>
  <div class="editor-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-10 offset-md-1 col-xs-12">
          <form>
            <fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control form-control-lg" placeholder="Article Title" v-model="title_" required>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="What's this article about?" v-model="desc_" required>
              </fieldset>
              <fieldset class="form-group">
                  <textarea class="form-control" rows="8" placeholder="Write your article (in markdown)" v-model="context_" required></textarea>
              </fieldset>
              <fieldset class="form-group">
                  <input type="text" class="form-control" placeholder="Enter tags" v-model="tags_" ><div class="tag-list"></div>
              </fieldset>
              <button class="btn btn-lg pull-xs-right btn-primary" type="button" @click="onSubmit">
                  Publish Article
              </button>
            </fieldset>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import { createArticle } from '@/api/article'
import MarkdownIt from 'markdown-it'
export default {
  // 在路由匹配组件渲染之前会先执行中间件
  middleware:'userlogin',//['userlogin']
  data(){
    return {
      title_:'',
      desc_:'',
      context_:'',
      tags_:''
    }
  },
  methods:{
    async onSubmit(){
      const { data } = await createArticle({
        article:{
          title:this.title_,
          description:this.desc_,
          body:this.context_,
          tagList:this.taglist_
        }
      })
      console.log(data)
      this.title_ = ''
      this.desc_ = ''
      this.context_=''
      this.tags_=''
    }
  },
  computed:{
    taglist_(){
      return this.tags_ ? this.tags_.split(","):''
    },
    // deschandler(){
    //   const md = new MarkdownIt()
    //   const context = md.render(this.context_)
    //   return context
    // }
  }
}
</script>

<style>

</style>