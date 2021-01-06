<template>
  <div>
  </div>
</template>
<script> 
export default {
  name: 'voice',
  props: ["currentPage"],
  fetch ({ store, route }) {
    console.log(route);
    let wheres = [{ name: "Type", value: "voice" }];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, sort: "CreateDate", wheres: JSON.stringify(wheres) }),
    ])
  },
  watch: {
    currentPage (v) {
      let wheres = [{ name: "Type", value: "voice" }];
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