<template>
  <div>
  </div>
</template>
<script> 
export default {
  fetch ({ store, route }) {
    return Promise.all([
      store.dispatch('news/fetchNewsList', { sort: "IsRecommend,CreateDate" }),
    ])
  },
}
</script>
<style scoped>
</style>