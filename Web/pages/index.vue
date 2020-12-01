<template>
  <div class="container">
    <el-carousel class="carousel" indicator-position="outside">
      <el-carousel-item v-for="item in bannerNews" :key="item.mappingId">
        <nuxt-link :to="'/article/' + item.mappingId">
          <h3 class="carousel-h3">{{ item.description || item.title }}</h3>
          <el-image :src="getBannerImg(item.bannerImg)"></el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
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
  fetch({ store }) {
    return Promise.all([store.dispatch("news/fetchNewsList"), store.dispatch("news/fetchBannerNews")]);
  },
  mounted() {},
  computed: {
    types() {
      return this.$store.state.news.news.data;
    },
    news() {
      return this.$store.state.news.news.data;
    },
    bannerNews() {
      return this.$store.state.news.bannerNews.data;
    },
    total() {
      return this.$store.state.news.news.total;
    },
  },
  methods: {
    getBannerImg(url) {
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
