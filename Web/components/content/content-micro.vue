<template>
  <div>
    <el-card class="box-card" shadow="hover">
      <el-row slot="header">
        <el-col :span="12">
          <el-avatar :size="40" :src="getFileUrl(news.headImageUrl)"> </el-avatar>
          <span class="user-name">{{ news.userTrueName }}</span>
        </el-col>
        <el-col :span="12" style="text-align: right">
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
          <nuxt-link
            style="color: #757373; text-decoration: none"
            target="_blank"
            :to="`/${news.newsId}`"
          >
            {{ news.summary }}</nuxt-link
          >
        </p>
        <el-row v-if="news.type == 'pic'">
          <el-col :span="8" v-for="url in covers" :key="url">
            <el-image
              @click="$openPreviews(covers)"
              style="cursor: pointer"
              :src="url"
              fit="scale-down"
            ></el-image>
          </el-col>
        </el-row>
        <el-row v-if="news.type == 'video'" style="max-width: 400px">
          <VideoPlayer
            :videoUrl="news.videoUrl"
            :poster="getFileUrl(news.coverImageUrls)"
            :newsId="news.newsId"
          >
          </VideoPlayer>
        </el-row>
        <el-row v-if="news.type == 'voice'">
          <VoicePlayer
            :voiceUrl="news.voiceUrl"
            :poster="getFileUrl(news.coverImageUrls)"
            :newsId="news.newsId"
          >
          </VoicePlayer>
        </el-row>
      </div>
      <el-divider></el-divider>
      <el-row class="footer">
        <el-col class="time" :span="12">
          {{ DateDiff(news.createDate) }}
        </el-col>
        <el-col class="interact" :span="12">
          <el-button
            class="el-icon-star-off"
            @click="
              news.disabled = true;
              praises(news);
            "
            :disabled="news.praiseDisabled"
          >
            {{ news.praiseCount }}
          </el-button>
          <el-button class="el-icon-chat-square" @click="comments(news.newsId)">
            {{ news.commentCount }}
          </el-button>
          <el-popover placement="bottom" width="160">
            <div style="width: 200px" :id="'shareGp' + news.newsId"></div>
            <el-button
              slot="reference"
              class="el-icon-share"
              @click="share(news)"
            ></el-button>
          </el-popover>
        </el-col>
      </el-row>
    </el-card>
    <el-dialog title="留下你的诡记" :visible.sync="commentsDialog" width="50%" center>
      <div>
        <Comments :type="'news'"></Comments>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { DateDiff } from "@/plugins/common";
import VideoPlayer from "@/components/content/video-player.vue";
import VoicePlayer from "@/components/content/voice-player.vue";
import Comments from "@/components/content/comment.vue";
export default {
  head: {
    script: [
      { src: "https://cdn.bootcss.com/social-share.js/1.0.16/js/social-share.min.js" },
    ],
    link: [
      {
        rel: "stylesheet",
        href: "https://cdn.bootcss.com/social-share.js/1.0.16/css/share.min.css",
      },
    ],
  },
  props: {
    news: {
      type: Object,
      required: true,
    },
  },
  components: { VideoPlayer, VoicePlayer, Comments },
  data() {
    return {
      commentsDialog: false,
    };
  },
  computed: {
    covers() {
      let cs = (this.news.coverImageUrls || "").split(",");
      return cs.map((m) => {
        return this.$website.GetFileUrl(m);
      });
    },
  },
  methods: {
    share(news) {
      var $config = {
        url: "/" + news.newsId, // 网址，默认使用 window.location.href
        source: "", // 来源（QQ空间会用到）, 默认读取head标签：<meta name="site" content="http://overtrue" />
        title: news.title, // 标题，默认读取 document.title 或者 <meta name="title" content="share.js" />
        origin: "", // 分享 @ 相关 twitter 账号
        description: news.summary, // 描述, 默认读取head标签：<meta name="description" content="PHP弱类型的实现原理分析" />
        image: this.covers, // 图片, 默认取网页中第一个img标签
        // sites: ['qzone', 'qq', 'weibo', 'wechat', 'douban'], // 启用的站点
        disabled: ["google", "facebook", "twitter"], // 禁用的站点
        wechatQrcodeTitle: "微信扫一扫：分享", // 微信二维码提示文字
        wechatQrcodeHelper: "<p>微信扫一下二维码</p><p>可将本文分享至朋友圈。</p>",
      };

      socialShare("#shareGp" + news.newsId, $config);
    },
    comments(newsId) {
      this.$store.commit("comment/setComments", {});
      this.commentsDialog = true;
      this.$store.dispatch("comment/fetchRootComments", [
        { name: "Type", value: "news" },
        { name: "RelationId", value: newsId },
      ]);
    },
    praises(news) {
      let clone = {
        ...news,
        ...{ praiseDisabled: true },
        ...{ praiseCount: news.praiseCount + 1 },
      };
      this.$store.commit("news/updateNews", clone);
      this.$http.post("AppApi/newsPraise/add", {
        MainData: { NewsId: news.newsId },
        noLoading: true,
      });
    },
    getFileUrl(url) {
      return GetFileUrl(url);
    },
    DateDiff(date) {
      return DateDiff(date);
    },
    handleCommand(key) {
      debugger;
    },
  },
};
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
.footer .interact {
  text-align: right;
  font: 12px Extra small;
}
.interact button {
  color: #000000;
  cursor: pointer;
  border: none;
}
.footer .right {
  color: #000000;
  font-size: 10px;
}
</style>
