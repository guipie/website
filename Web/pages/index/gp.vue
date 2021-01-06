<template>
  <div>
  </div>
</template>
<script> 
export default {
  name: 'gp',
  props: ["currentPage"],
  fetch ({ store, query }) {
    return Promise.all([
      store.dispatch('news/fetchNewsList', {
        page: query.page || 1,
        sort: "CreateDate",
        unionWheres: JSON.stringify([[{ name: "Type", value: "micro" }, { name: "Type", value: "pic" }]])
      }),
    ])
  },
  watch: {
    currentPage (v) {
      this.$store.dispatch('news/fetchNewsList', {
        page: v,
        sort: "CreateDate",
        unionWheres: JSON.stringify([[{ name: "Type", value: "micro" }, { name: "Type", value: "pic" }]])
      })
    }
  }
}
</script>
<style scoped>
</style>