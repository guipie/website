<template>
  <div class="container">
    <div>
      <div>
        <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="30" show-word-limit>
        </el-input>
      </div>
    </div>
    <div v-for="i in news" :key="i.newsId" class="container-item">
      <GpContent :news="i"></GpContent>
    </div>
  </div>
</template>
<script>
import { GetFileUrl } from "@/environment";
import GpContent from "~/components/content.vue";
export default {
  components: { GpContent },
  fetch ({ store }) {
    return Promise.all([store.dispatch("news/fetchNewsList")]);
  },
  mounted () { },
  computed: {
    types () {
      return this.$store.state.news.news.data;
    },
    news () {
      return this.$store.state.news.news.data;
    },
    total () {
      return this.$store.state.news.news.total;
    },
  },
  methods: {
    getBannerImg (url) {
      return GetFileUrl(url);
    },
  },
};
</script>

<style>
.container .container-item {
  background: #000;
  margin-top: 5px;
}
.container .container-item:hover {
  background: rgb(14, 13, 13);
}
</style>
