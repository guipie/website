<template>
  <div>
    <NewsCreate></NewsCreate>
  </div>
</template>

<script>
import NewsCreate from '@/components/content/create'
export default {
  layout: function (context) {
    return 'empty'
  },
  components: { NewsCreate },
  head () {
    return {
      title: this.title,
      meta: [
        {
          hid: "keywords",
          name: "keywords",
          content: "创建内容-诡瞥社区",
        },
        {
          hid: "description",
          name: "description",
          content: "创建优质内容,尽在诡瞥社区.",
        },
      ],
    };
  }
}
</script>

<style>
</style>