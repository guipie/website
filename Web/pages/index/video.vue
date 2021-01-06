<template>
  <div>
  </div>
</template>
<script> 
export default {
  fetch ({ store, route }) {
    let wheres = [{ name: "Type", value: "video" }];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, ...{ wheres: JSON.stringify(wheres) } }),
    ])
  },
}
</script>
<style scoped>
</style>