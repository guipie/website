<template>
  <div>
    <el-carousel class="carousel" indicator-position="outside">
      <el-carousel-item v-for="item in bannerNews" :key="item.mappingId">
        <nuxt-link :to="'/article/' + item.mappingId">
          <h3 class="carousel-h3">{{ item.description || item.title }}</h3>
          <el-image :src="getBannerImg(item.bannerImg)"></el-image>
        </nuxt-link>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { GetFileUrl } from "@/environment";
export default {
  computed: {
    bannerNews () {
      return this.$store.state.news.bannerNews.data;
    }
  },
  mounted () {
    this.$store.dispatch("news/fetchBannerNews")
  },
  methods: {
    getBannerImg (url) {
      return GetFileUrl(url);
    },
  },
}
</script>

<style>
</style>