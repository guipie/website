<template>

</template>
<script>
export default {
  data() {
    return {
      pageData: {},
      logs: []
    }
  },
  computed: {
    current() {
      return this.pageData.currentPage;
    }
  },
  watch: {
    current(newValue, oldValue) {
      if (newValue != oldValue)
        this.logs = [];
    }
  }
}
</script>