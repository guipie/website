<template>
  <div :id="'player_' + newsId"></div>
</template>

<script>
import { isBrowser } from "@/environment";
let currentPlayer = null;
export default {
  props: {
    videoUrl: {
      type: String,
      required: true,
    },
    poster: {
      type: String,
    },
    newsId: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {};
  },
  mounted() {
    this.palyerInit();
  },
  methods: {
    palyerInit() {
      if (isBrowser) {
        let _this = this;
        let Player = require("xgplayer");
        currentPlayer = new Player({
          id: "player_" + this.newsId,
          url: this.videoUrl,
          preloadTime: 10, // 默认预加载 10 秒
          videoInit: true, //初始化显示视频首帧
          // autoplay: true,
          // muted: true,
          poster: this.poster || "",
          playsinline: true,
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          fluid: true, //使播放器宽度跟随父元素的宽度大小变化
          errorTips: `<div class="content"><img src="/img/playerror.png" alt="">
                      <div class="promptText">抱歉，播放器出错了，您关闭所有播放器及音乐再试.</div>`,
        });
      }
    },
  },
};
</script>
<style scoped>
/*西瓜播放器*/
.jinsom-post-video .xgplayer {
  width: 400px !important;
  max-height: 600px;
}
.jinsom-post-video .xgplayer-nostart,
.jinsom-post-video .xgplayer-is-enter {
  height: 225px !important;
}
.xgplayer-skin-default .xgplayer-enter .xgplayer-enter-spinner {
  height: 50px !important;
  width: 50px !important;
}
.jinsom-pop-video .layui-layer-content {
  overflow: inherit !important;
  height: inherit !important;
}
.jinsom-pop-video .xgplayer {
  height: 380px !important;
}
</style>
