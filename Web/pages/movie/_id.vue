<template>
  <div class="container" v-cloak>
    <el-card class="movie-detail" shadow="hover" v-if="detail">
      <div slot="header" class="clearfix">
        <span>{{ detail.name }}</span>
        <el-button
          style="float: right; padding: 3px 0; font-size: x-small"
          type="text"
        >
          所有影视均在互联网采集，请勿轻信视频里的广告
        </el-button>
      </div>
      <component
        ref="myPlayer"
        :playUrl="playUrl"
        :is="assembly"
        mode="out-in"
      ></component>
      <div v-if="!assembly" style="height: 300px">
        <i class="el-icon-loading"></i>.......
        {{ errorTxt }}
      </div>
      <div class="bottom clearfix">
        <el-tabs type="card" v-model="playCard">
          <el-tab-pane
            style="padding-bottom: 15px"
            v-for="(p, index) in playList"
            :label="p.type"
            :key="index"
            :name="(index + 1).toString()"
            lazy
          >
            <transition
              name="el-zoom-in-center"
              v-for="item in p.urls"
              :key="item"
            >
              <el-button
                v-show="playCard == index + 1"
                :disabled="playUrl == item.split('$')[1]"
                @click="startPlay(p.playPage, item.split('$')[1])"
                style="margin-left: 0px"
                size="mini"
              >
                {{ item.split('$')[0] }}
              </el-button>
            </transition>
          </el-tab-pane>
        </el-tabs>
      </div>
    </el-card>
  </div>
</template>
<script> 
import xg_mp4_player from "@/components/movie_player/xg_mp4_player.vue";
import xg_hls_player from "@/components/movie_player/xg_hls_player.vue";
import iframe_player from "@/components/movie_player/iframe_player.vue";
export default {
  fetch({ store, params }) {
    return Promise.all([
      store.dispatch('movie/fetchMovie', params.id),
    ])
  },
  computed: {
    detail() {
      return this.$store.state.movie.detail;
    },
    playList() {
      let list = this.$store.state.movie.playList;
      this.assembly = list[0].playPage;
      this.playUrl = list[0].urls[0].split('$')[1];
      return list;
    },
  },
  watch: {
    assembly() {
    }
  },
  data() {
    return {
      assembly: '',
      playCard: "1",
      playUrl: "",
      errorTxt: ""
    }
  },
  mounted() {
    console.log(this.playList)
  },
  methods: {
    startPlay(page, url) {
      this.assembly = page;
      this.playUrl = url;
    }
  },
  components: {
    xg_mp4_player,
    xg_hls_player,
    iframe_player
  },
  head() {
    return {
      title: this.detail?.name + "最新更新,全集在线观看",
      meta: [
        {
          hid: 'keywords',
          name: 'keywords',
          content: this.detail?.name + ",最新更新,在线观看,迅雷下载"
        },
        {
          hid: 'description',
          name: 'description',
          content: this.detail?.Content || "高清影视资源"
        }
      ]
    }
  },
}
</script>
<style>
.movie-detail {
  padding: 0px;
  margin: 0px;
  border: none;
}
.movie-detail .el-card__body {
  padding: 0px;
  margin: 0px;
}
.bottom {
  margin-top: 13px;
  line-height: 12px;
}
.bottom button:active {
  background-image: none;
  outline: 0;
  color: #675a5a;
  -webkit-box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
  box-shadow: inset 0 3px 5px rgba(0, 0, 0, 0.125);
}
.clearfix:before,
.clearfix:after {
  display: table;
}

.clearfix:after {
  clear: both;
}
.bottom .is-disabled {
  color: #675a5a;
}
.bottom .is-disabled:hover {
  color: #675a5a;
}
</style>