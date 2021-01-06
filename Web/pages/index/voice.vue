<template>
  <div>
  </div>
</template>
<script> 
export default {
  fetch ({ store, route }) {
    console.log(route);
    let wheres = [{ name: "Type", value: "voice" }];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, ...{ wheres: JSON.stringify(wheres) } }),
    ])
  },
}
</script>
<style scoped>
</style>