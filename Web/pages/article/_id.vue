<template>
  <div class="container">
    <el-card class="news-detail" shadow="hover">
      <div slot="header" class="clearfix">
        <h3>{{ detail.title }}</h3>
      </div>
      <div class="detail-body">
        <xg_mp4_player
          v-if="detail.videoUrl"
          :playUrl="getVideoUrl()"
          :playType="'mp4'"
        ></xg_mp4_player>
        <p v-else v-html="detail.content"></p>
      </div>
    </el-card>
  </div>
</template>
<script>  
import {
  GetFileUrl
} from '@/environment'
import xg_mp4_player from "~/components/moviePlayer/xg_mp4_player.vue";
export default {
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('news/fetchOneNews', params.id),
    ])
  },
  computed: {
    detail() {
      return this.$store.state.news.detail;
    },
    videoUrl() {

    }
  },
  data() {
    return {
    }
  },
  mounted() {
    console.log(this.playList)
  },
  methods: {
    getVideoUrl() { return GetFileUrl(this.detail.videoUrl); }
  },
  components: { xg_mp4_player },
  head() {
    return {
      title: this.detail?.title || 'guipie',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.article?.title
        },
        {
          hid: 'description',
          name: 'description',
          content: this.detail?.Summary || "guipie"
        }
      ]
    }
  },
}
</script> 
<style>
.detail-body image {
  width: 100%;
}
.detail-body img {
  width: 100%;
}
</style>