
<template>
  <el-container>
    <el-aside style="width: 33%" v-if="news.coverImageUrls">
      <el-image
        style="width: 100%; max-height: 160px"
        fit="contain"
        :src="cover"
        :preview-src-list="covers"
        lazy
      >
        <div slot="error" class="image-slot">图被偷走了.</div>
      </el-image>
      <i
        v-if="videoUrl"
        class="el-icon-video-play"
        style="postion: absolute"
      ></i>
    </el-aside>
    <el-container>
      <el-main>
        <h5 class="content-title">
          <a :href="'/article/' + news.newsId">{{ news.title }} </a>
        </h5>
        <span class="description">{{ news.summary }}</span>
      </el-main>
      <el-footer style="height: auto">
        <!-- <el-avatar
          size="small"
          src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
        ></el-avatar>
        <el-link style="padding-bottom: 10px" type="info" :underline="false">
          信息链接
        </el-link>
        <span style="float: right">
          <el-link type="info" icon="el-icon-chat-square">12</el-link>
          <el-link type="info" icon="el-icon-view">12</el-link>
        </span> -->
      </el-footer>
    </el-container>
  </el-container>
</template>
<script>
import {
  File_Domain
} from '~/environment'
export default {
  props: {
    news: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    }
  },
  computed: {
    cover() {
      return this.covers.length > 0 ? this.covers[0] : "";
    },
    covers() {
      let cs = this.news.coverImageUrls.split(",");
      return cs.map(m => { if (m.startsWith("http")) return m; else return File_Domain + m; });
    },
    videoUrl() {
      let url = this.news.videoUrl;
      if (url) {
        if (url.startsWith("http"))
          return url;
        else
          return File_Domain + url;
      }
      return "";
    }
  }
}
</script>

<style>
.el-aside {
  position: relative;
  font-size: 40px;
  width: 33%;
  overflow: hidden;
}
.el-aside img {
  padding: 5px;
  width: 100%;
  height: 100%;
}
.el-aside i {
  position: absolute;
  left: 40%;
  top: 30%;
}
.el-main {
  padding: 10px;
}
.content-title {
  margin-top: 2px;
  margin-bottom: 0.618rem;
  font-weight: 700;
  color: var(--link-hover-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content-title a {
  margin-left: 0;
  transition: margin 0.25s;
  color: #ffffff;
}
.description {
  font-size: smaller;
  color: #757373;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>