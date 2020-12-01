<template>
  <div id="player"></div>
</template> 
 
<script> 
let currentPlayer;
export default {
  props: {
    playUrl: {
      type: String,
      required: true
    }
  },
  watch: {
    playUrl(val) {
      currentPlayer.src = val;
      if (!this.init) {
        currentPlayer.destroy(false);
        this.palyerInit();
      }
    }
  },
  data() {
    return {
      init: false
    }
  },
  mounted() {
    currentPlayer.src = "";
    this.palyerInit();
  },
  beforeDestroy: function () {
    currentPlayer.destroy(true);
  },
  methods: {
    palyerInit() {
      if (process.browser) {
        let _this = this;
        let HlsJsPlayer = require("xgplayer-hls.js");
        currentPlayer = new HlsJsPlayer({
          id: 'player',
          url: this.playUrl,
          preloadTime: 30, // 默认预加载 30 秒
          videoInit: true,
          autoplay: true,
          playsinline: true,
          playbackRate: [0.5, 0.75, 1, 1.5, 2],
          fluid: true
        });
        currentPlayer.once('complete', () => {
          console.log("complete");
          _this.init = true;
        })
      }
    }
  }
} 
</script>