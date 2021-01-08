
<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <el-row slot="header">
        <el-col :span="12">
          <el-avatar :size="40" :src="getFileUrl(news.headImageUrl)">
          </el-avatar>
          <span class="user-name">{{news.userTrueName}}</span>
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-dropdown @command="handleCommand">
            <span class="el-dropdown-link">
              <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="a">黄金糕</el-dropdown-item>
              <el-dropdown-item command="b">狮子头</el-dropdown-item>
              <el-dropdown-item command="c">螺蛳粉</el-dropdown-item>
              <el-dropdown-item command="d" disabled>双皮奶</el-dropdown-item>
              <el-dropdown-item command="e" divided>蚵仔煎</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-col>
      </el-row>
      <div class="micro-summary">
        <p>
          <nuxt-link style="color: #757373;text-decoration: none;" target="_blank" :to="`/${news.newsId}`">
            {{news.summary }}</nuxt-link>
        </p>
        <el-row v-if="news.type=='pic'">
          <el-col :span="8" v-for="url in covers" :key="url">
            <el-image @click="$openPreviews(covers)" style="cursor:pointer;" :src="url" fit="scale-down"></el-image>
          </el-col>
        </el-row>
        <el-row v-if="news.type=='video'" style="max-width:400px;">
          <VideoPlayer :videoUrl="news.videoUrl" :poster="getFileUrl(news.coverImageUrls)" :newsId="news.newsId">
          </VideoPlayer>
        </el-row>
        <el-row v-if="news.type=='voice'">
          <VoicePlayer :voiceUrl="news.voiceUrl" :poster="getFileUrl(news.coverImageUrls)" :newsId="news.newsId">
          </VoicePlayer>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row class="footer">
        <el-col class="time" :span="12">
          {{DateDiff(news.createDate)}}
        </el-col>
        <el-col :span="12" style="text-align:right;">
          <el-button class="right" @click="" type="text" icon="el-icon-star-off">
            赞<span>42</span>
          </el-button>
          <el-button class="right" type="text" icon="el-icon-chat-square" @click="comments(news.newsId)">
            回复<span>1</span>
          </el-button>
          <el-button class="right" type="text" icon="el-icon-share" @click="">
          </el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="留下你的诡记" :visible.sync="commentsDialog" width="50%" center>
      <div>
        <Comments :newsId="commentsRelationId"></Comments>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  GetFileUrl
} from '~/environment'
import {
  DateDiff
} from '~/plugins/common'
import VideoPlayer from "@/components/content/video-player.vue";
import VoicePlayer from "@/components/content/voice-player.vue";
import Comments from "@/components/content/comment.vue";
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  components: { VideoPlayer, VoicePlayer, Comments },
  data () {
    return {
      commentsDialog: false,
      commentsRelationId: 0
    }
  },
  computed: {
    covers () {
      let cs = this.news.coverImageUrls.split(",");
      return cs.map(m => { return GetFileUrl(m); });
    }
  },
  methods: {
    comments (newsId) {
      this.commentsRelationId = newsId;
      this.commentsDialog = true;
    },
    getFileUrl (url) {
      return GetFileUrl(url);
    },
    DateDiff (date) { return DateDiff(date); },
    handleCommand (key) {
      debugger
    }
  },
}
</script>

<style scope>
.box-card {
  margin-bottom: 20px;
}

.el-card__header {
  padding: 10px;
}
.el-card__body {
  padding: 0px;
}
.el-divider--horizontal {
  margin: 0px;
}
.user-name {
  font-size: smaller;
  color: #757373;
  padding-bottom: 5px;
}
.micro-summary {
  font-size: smaller;
  /* display: -webkit-box; */
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  padding: 0px 15px;
  word-spacing: 2px;
  letter-spacing: 0.5px;
}
.footer {
  padding-top: 3px;
}
.footer .time {
  font: 10px Extra small;
  padding: 8px;
  color: #8f98a0;
  letter-spacing: 1px;
}
.footer .right {
  color: #000000;
  font-size: 10px;
}
</style>