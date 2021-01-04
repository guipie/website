<template>
  <div>
  </div>
</template>
<script> 
export default {
  fetch ({ store, route }) {
    console.log(route);
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 2 }),
    ])
  },
}
</script>
<style scoped>
</style>