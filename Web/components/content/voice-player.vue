<template>
  <div :id="'player_'+newsId"></div>
</template>
<script> 

let player = null;
export default {
  props: {
    voiceUrl: {
      type: String,
      required: true,
    },
    newsId: {
      type: Number,
      required: true
    },
    poster: { type: String }
  },
  data () {
    return {};
  },
  mounted () {
    this.palyerInit();
  },
  methods: {
    palyerInit () {
      if (process.browser)
      {
        require("xgplayer");
        let Music = require('xgplayer-music');
        player = new Music({
          id: 'player_' + this.newsId,
          url: [
            {
              src: this.voiceUrl,
              name: '',
              vid: '000001',
              poster: this.poster
            }
          ],
          volume: 0.8,
          volumeShow: true,
          width: '100%',
          height: 50,
          // preloadNext: true,
          switchKeepProgress: false
        })
      }
    }
  },
};
</script> 