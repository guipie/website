<template>
  <div>
    <div class="jinsom-bbs-header-info" style="padding-top: 100px">
      <div class="jinsom-bbs-header-info-avatar">
        <a
          href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90"
        >
          <img
            loading="lazy"
            src="/zanwei.gif"
            class="avatar opacity"
            alt="搞笑、动图、段子"
          />
        </a>
      </div>
      <div class="jinsom-bbs-header-info-btn clear">
        <a
          href="https://jjhuashui.com/archives/category/%e6%90%9e%e7%ac%91%e3%80%81%e5%8a%a8%e5%9b%be%e3%80%81%e6%ae%b5%e5%ad%90"
          class="name"
          >搞笑、动图、段子</a
        >
        <span class="opacity follow">
          <i class="jinsom-icon jinsom-guanzhu"></i>关注
        </span>
        <!-- <i class="jinsom-icon jinsom-liaotian"></i> 群聊 -->
        <span class="jinsom-bbs-follow-info">
          <span>关注：<b class="num">22</b></span>
          <span>内容：<b>10</b></span>
        </span>
        <nuxt-link :to="`/bbs/${bbsId}/create`">
          <el-button type="primary" style="float: right"> 发帖 </el-button>
        </nuxt-link>
      </div>
      <div class="jinsom-bbs-header-info-desc clear">大家可以发有意思的搞笑的东西哦</div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  layout: "empty",
  head: {
    link: [{ rel: "stylesheet", href: require("@/assets/styles/bbs.css") }],
  },
  async asyncData({ route, store, error }) {
    return { bbsId: route.params.id };
  },
  computed: {
    bbsDetail() {
      return this.$store.state.bbs.bbsDetail;
    },
  },
  methods: {
    goBack() {
      console.log("go back");
    },
  },
};
</script>

<style></style>
