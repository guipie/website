<template>
  <div class="container">
    <div v-for="i in news" :key="i.newsId" class="container-item">
      <GpContent :news="i"></GpContent>
    </div>
  </div>
</template>


<script>
import GpContent from "~/components/content.vue";
export default {
  components: { GpContent },
  fetch({ store }) {
    return Promise.all([
      store.dispatch('news/fetchNewsList', { wheres: JSON.stringify([{ "name": "VideoUrl", "value": "/", displayType: "like" }]) })
    ])
  },
  computed: {
    news() {
      return this.$store.state.news.news.data;
    },
    total() {
      return this.$store.state.news.news.total;
    }
  },
}
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
