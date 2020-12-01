<template>
  <iframe
    allowfullscreen="true"
    id="framPlayer"
    :src="playUrl"
    frameborder="0"
    scrolling="no"
    style="width: 100%; height: 100%; min-height: 350px"
  ></iframe>
</template>
<script>
export default {
  props: ["playUrl"],
  watch: {
    playUrl(val) {
    }
  }
}
</script>