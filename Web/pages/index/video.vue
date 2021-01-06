<template>
  <div>
  </div>
</template>
<script> 
export default {
  name: 'video',
  props: ["currentPage"],
  fetch ({ store, route }) {
    let wheres = [{ name: "Type", value: "video" }];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, sort: "CreateDate", wheres: JSON.stringify(wheres) }),
    ])
  },
  watch: {
    currentPage (v) {
      let wheres = [{ name: "Type", value: "video" }];
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