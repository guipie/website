<template>
  <div>
    <div class="jinsom-bbs-header-info">
      <div class="jinsom-bbs-header-info-avatar">
        <img
          loading="lazy"
          :src="bbsDetail.bgImg || '/zanwei.gif'"
          class="avatar opacity"
          :alt="bbsDetail.description"
        />
      </div>
      <div class="jinsom-bbs-header-info-btn clear">
        <a href="#" class="name">{{ bbsDetail.name }}</a>
        <div
          :class="'opacity follow ' + (isFollow ? 'disable' : '')"
          ref="followDiv"
          @click="followBbs()"
        >
          <i class="jinsom-icon jinsom-guanzhu"></i>
          {{ isFollow ? "已关注" : "关注" }}
        </div>
        <!-- <i class="jinsom-icon jinsom-liaotian"></i> 群聊 -->
        <span class="jinsom-bbs-follow-info">
          <span
            >关注：<b class="num">{{ parseInt(Math.random() * 100) }}</b></span
          >
          <span
            >内容：<b>{{ parseInt(Math.random() * 100) }}</b></span
          >
        </span>
        <nuxt-link :to="`/bbs/${bbsDetail.name}/create`">
          <el-button type="primary" style="float: right"> 发帖 </el-button>
        </nuxt-link>
      </div>
      <div class="jinsom-bbs-header-info-desc clear">{{ bbsDetail.description }}</div>
    </div>
    <nuxt-child></nuxt-child>
  </div>
</template>

<script>
export default {
  layout: "empty",
  async asyncData({ route, redirect, $http, store }) {
    let [res] = await Promise.all([
      $http.post("AppApi/newsType/" + encodeURI(route.params.category)),
    ]);
    if (res.data.id > 0) {
      let [isFollow] = await Promise.all([
        $http.post("AppApi/newsType/Follow/Exist/" + res.data.id),
      ]);
      //获取该论坛帖子列表
      store.commit("bbs/setCurrentBBS", res.data);
      let wheres = [{ name: "BbsId", value: res.data.id }];
      await Promise.all([
        store.dispatch("news/fetchNewsList", {
          page: route.query.page || 1,
          sort: "ModifyDate",
          rows: 5,
          wheres: JSON.stringify(wheres),
        }),
      ]);
      return { bbsDetail: res.data, isFollow };
    } else redirect("/404?p=" + route.path);
  },
  watchQuery: true,
  watchQuery: ["page"],
  mounted() {},
  methods: {
    followBbs() {
      this.$http.post("AppApi/newsType/follow/" + this.bbsDetail.id).then((res) => {
        if (res.status) this.isFollow = true;
      });
    },
  },
};
</script>
<style lang="css">
@import "@/assets/styles/bbs.css";
</style>
