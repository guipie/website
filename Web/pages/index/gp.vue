<template>
  <div>
  </div>
</template>
<script> 
export default {
  fetch ({ store, route }) {
    let unionWheres = [[{ name: "Type", value: "micro" },{ name: "Type", value: "pic" }]];
    return Promise.all([
      store.dispatch('news/fetchNewsList', { page: 1, ...{ unionWheres: JSON.stringify(unionWheres) } }),
    ])
  },
}
</script>
<style scoped>
</style>