<template>
  <div>
  </div>
</template>
<script> 
export default {
  name: 'ariticles',
  props: ["currentPage"],
  fetch ({ store, route }) {
    let wheres = [{ name: "Type", value: "article" }];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, sort: "CreateDate", wheres: JSON.stringify(wheres) }),
    ])
  },
  watch: {
    currentPage (v) {
      let wheres = [{ name: "Type", value: "article" }];
      this.$store.dispatch('news/fetchNewsList', {
        page: v,
        sort: "CreateDate",
        wheres: JSON.stringify(wheres)
      })
    }
  }
}
</script>
<style scoped>
</style>