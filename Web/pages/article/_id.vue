<template>
  <div class="container">
    <el-card class="news-detail" shadow="hover">
      <div slot="header" style="font:18px large;">
        {{ detail.title }}
      </div>
      <div class="detail-body" v-if="detail.type=='article'">
        <p v-html="detail.content"></p>
      </div>
      <div class="detail-body" v-else-if="detail.type=='pic'">
        <el-image @click="$openPreviews(covers)" v-for="url in covers" :src="url" :key="url" style="cursor:pointer;"
          fit="scale-down">
        </el-image>
      </div>
      <div class="detail-body" v-else-if="detail.type=='video'">
        <VideoPlayer :videoUrl="detail.videoUrl" :poster="getFileUrl(detail.coverImageUrls)" :newsId="detail.newsId">
        </VideoPlayer>
      </div>
      <div class="detail-body" v-else-if="detail.type=='voice'">
        <p>{{detail.summary}}</p>
        <VoicePlayer :voiceUrl="detail.voiceUrl" :poster="getFileUrl(detail.coverImageUrls)" :newsId="detail.newsId">
        </VoicePlayer>
      </div>
      <div class="detail-body" v-else>
        <p>{{detail.summary}}</p>
      </div>
    </el-card>
    <newsComment :type="'news'"></newsComment>
  </div>
</template>
<script>  
import {
  GetFileUrl
} from '@/environment'
import VideoPlayer from "@/components/content/video-player.vue";
import VoicePlayer from "@/components/content/voice-player.vue";
import NewsComment from '~/components/comment';
export default {
  name: "GpDetail",
  fetch ({ store, params }) {
    this.newsId = params.id;
    return Promise.all([
      store.dispatch('news/fetchOneNews', params.id),
    ])
  },
  computed: {
    detail () {
      return this.$store.state.news.detail;
    },
    covers () {
      let cs = this.detail.coverImageUrls.split(",");
      return cs.map(m => { return GetFileUrl(m); });
    }
  },
  data () {
    return {
      newsId: 0
    }
  },
  mounted () {
    console.log(this.playList)
  },
  methods: {
    getFileUrl (url) {
      return GetFileUrl(url);
    }
  },
  components: { VideoPlayer, VoicePlayer, NewsComment },
  head () {
    return {
      title: this.detail.title + '-诡瞥,恐怖灵异网站',
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.detail.title || "诡瞥,恐怖灵异网站"
        },
        {
          hid: 'description',
          name: 'description',
          content: this.detail.summary || "诡瞥,恐怖灵异网站"
        }
      ]
    }
  },
}
</script> 
<style>
.detail-body {
  font: 14px Base;
}
.detail-body image {
  width: 100%;
}
.detail-body img {
  width: 100%;
}
</style>