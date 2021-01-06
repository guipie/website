<template>
  <div>
  </div>
</template>
<script> 
export default {
  name: 'all',
  props: ["currentPage"],
  fetch ({ store, query }) {
    console.log(query);
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: query.page || 1, sort: "CreateDate" }),
    ])
  },
  watch: {
    currentPage (v) {
      this.$store.dispatch('news/fetchNewsList', { page: v, sort: "CreateDate" });
    }
  }
}
</script>
<style scoped>
</style>