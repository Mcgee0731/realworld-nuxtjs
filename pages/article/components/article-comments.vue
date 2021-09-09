<template>
  <div>
    <form class="card comment-form" @submit.prevent="onComment">
      <div class="card-block">
        <textarea class="form-control" placeholder="Write a comment..." rows="3" v-model="textVal"></textarea>
      </div>
      <div class="card-footer">
        <img :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
        Post Comment
        </button>
      </div>
    </form>
    
    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">{{comment.body}}</p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{name:'profile',params:{username:comment.author.username}}" class="comment-author">
          <img :src="comment.author.image" class="comment-author-img" />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{name:'profile',params:{username:comment.author.username}}" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD,YYYY')}}</span>
      </div>
    </div>

  </div>
</template>

<script>
import {getComments,addComments} from '@/api/article'
import { mapState} from 'vuex'
export default { 
  props:{
    article:{
      type:Object,
      required:true
    }
  },
  data(){
    return {
      comments:[], // 文章列表
      textVal:""
    }
  },
  // 评论不需要 seo
  async created () {
    const { data } = await getComments(this.article.slug)
    // console.log(data)
    this.comments = data.comments
  },
  computed:{
    ...mapState(['user'])
  },
  methods:{
    async onComment(){

      const {data} = await addComments(this.$route.params.slug,{
        comment:{
          body:this.textVal
        }
      })
      console.log(data)
    }
  }
}
</script>

<style>

</style>