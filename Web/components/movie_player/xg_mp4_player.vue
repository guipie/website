<template>
  <div id="player"></div>
</template>

<script>
import { isBrowser } from "@/environment";
let currentPlayer;
export default {
  props: {
    playUrl: {
      type: String,
      required: true,
    },
  },
  watch: {
    playUrl(val) {
      (currentPlayer || {}).src = val;
      if (!this.init) {
        currentPlayer.destroy(false);
        this.palyerInit();
      }
    },
  },
  data() {
    return {
      init: false,
    };
  },
  mounted() {
    this.palyerInit();
  },
  beforeDestroy: function () {
    (currentPlayer || {}).src = "";
    currentPlayer.destroy(true);
  },
  methods: {
    palyerInit() {
      if (isBrowser) {
        let _this = this;
        let Player = require("xgplayer");
        require("xgplayer-mp4");
        currentPlayer = new Player({
          id: "player",
          url: this.playUrl,
          preloadTime: 30, // 默认预加载 30 秒
          videoInit: true,
          autoplay: true,
          playsinline: true,
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          fluid: true,
        });
        currentPlayer.once("complete", () => {
          console.log("complete");
          _this.init = true;
        });
      }
    },
  },
};
</script>
